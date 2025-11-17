import { useState } from "react";
import { useCart } from "./CartContext";
import "../css/Checkout.css"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../Firebase/config.js";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const { items } = useCart();
    const total = items.reduce((acc, item) => acc + item.Precio * item.cantidad, 0);
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        dni: "",
        direccion: "",
        localidad: "",
        provincia: "",
        codigoPostal: "",
        cardNumber: "",
        cardExpiry: "",
        cardCvv: "",
    });

    const [errors, setErrors] = useState({});
    const [successMsg, setSuccesMsg] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let v = value;

        if (name === "cardNumber") {
            v = value.replace(/\D/g, "").slice(0, 19);
            v = v.replace(/(.{4})/g, "$1 ").trim();
        }

        if (name === "cardCvv") {
            v = value.replace(/\D/g, "").slice(0, 4);
        }

        if (name === "cardExpiry") {
            v = value.replace(/[^\d]/g, "");
            if (v.length > 2) {
                v = v.slice(0, 2) + "/" + v.slice(2, 4);
            }
            v = v.slice(0, 5);
        }

        setFormData((fd) => ({ ...fd, [name]: v }));

    };

    const luhnCheck = (num) => {
        const digits = num
            .replace(/\s+/g, "")
            .split("")
            .reverse()
            .map((d) => parseInt(d, 10));

        if (digits.some(isNaN)) return false;

        let sum = 0;

        for (let i = 0; i < digits.length; i++) {
            let d = digits[i];

            if (i % 2 === 1) {
                d = d * 2;
                if (d > 9) d = d - 9;
            }

            sum += d;
        }

        return sum % 10 === 0
    };


    const validate = () => {
        const e = {};

        if (!formData.nombre.trim()) e.nombre = "Nombre requerido";
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Email invalido";
        if (!formData.dni.trim()) e.dni = "DNI requerido";
        if (!formData.direccion.trim()) e.direccion = "Dirección requerida";
        if (!formData.localidad.trim()) e.localidad = "Localidad requerida";
        if (!formData.provincia.trim()) e.provincia = "Provincia requerida";
        if (!formData.codigoPostal.trim()) e.codigoPostal = "Código postal requerido";

        const rawCardNumber = (formData.cardNumber || "").replace(/\s+/g, "");
        if (!rawCardNumber) {
            e.cardNumber = "Número de tarjeta requerido";
        } else if (!luhnCheck(rawCardNumber)) {
            e.cardNumber = "Numero de tarjeta inválido"
        }

        if (!formData.cardExpiry.match(/^\d{2}\/\d{2}$/)) {
            e.cardExpiry = "Formato MM/YY requerido"
        } else {
            const [mStr, yStr] = formData.cardExpiry.split("/");
            const mm = parseInt(mStr, 10);
            const yy = parseInt(yStr, 10);
            if (mm < 1 || mm > 12) e.cardExpiry = "Mes inválido";
            else {
                const now = new Date();
                const fullYear = 2000 + yy;
                const exp = new Date(fullYear, mm, 0);
                if (exp < new Date(now.getFullYear(), now.getMonth(), now.getDate())) e.cardExpiry = "Tarjeta vencida";
            }
        }

        if (!formData.cardCvv.match(/^\d{3,4}$/)) e.cardCvv = "CVV inválido";


        setErrors(e);
        return Object.keys(e).length === 0;
    };


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccesMsg(null);

        if (!validate()) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        const orden = {
            comprador: {
                nombre: formData.nombre,
                email: formData.email,
                dni: formData.dni,
                direccion: {
                    calle: formData.direccion,
                    localidad: formData.localidad,
                    provincia: formData.provincia,
                    cp: formData.codigoPostal,
                },
            },

            items: items.map((item) => ({
                id: item.id,
                nombre: item.Nombre || "producto",
                precio: item.Precio,
                cantidad: item.cantidad,
            })),
            total: Number(total.toFixed(2)),
            fecha: new Date().toISOString(),
            pago: {
                metodo: "tarjeta_simulada",
                estado: "pagado_simulado",
                cardLast4: (formData.cardNumber || "").replace(/\s+/g, "").slice(-4),
            },
        };

        try {
            const docRef = await addDoc(collection(db, "ordenes"), orden);
            console.log("orden guardada con ID:", docRef.id);

            setFormData({
                nombre: "",
                email: "",
                dni: "",
                direccion: "",
                localidad: "",
                provincia: "",
                codigoPostal: "",
                cardNumber: "",
                cardExpiry: "",
                cardCvv: "",
            });
            setErrors({});

            navigate(`/orden/${docRef.id}`);
        } catch (err) {
            console.error("Error al guardar la orden", err);
            alert("Ocurrio un error al procesar la compra,  intente mas tarde.");
        }

    };

    if (items.length === 0) {
        return <h2 style={{ textAlign: "center" }}> El carrito está vacío.</h2>;
    }

    return (
        <div className="checkout-container">
            <h1>Finalizar compra</h1>

            <form className="checkout-form" onSubmit={handleSubmit}>

                <fieldset className="fieldset">
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre completo</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Correo electronico</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dni">DNI</label>
                        <input
                            type="text"
                            id="dni"
                            name="dni"
                            value={formData.dni}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="direccion">Dirección</label>
                        <input
                            type="text"
                            id="direccion"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="localidad">Localidad</label>
                        <input
                            type="text"
                            id="localidad"
                            name="localidad"
                            value={formData.localidad}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="provincia">Provincia</label>
                        <input
                            type="text"
                            id="provincia"
                            name="provincia"
                            value={formData.provincia}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="codigoPostal">Código postal</label>
                        <input type="text"
                            id="codigoPostal"
                            name="codigoPostal"
                            value={formData.codigoPostal}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cardNumber">introduzca los datos de su tarjeta</label>
                        <input type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                            required
                        />
                        {errors.cardNumber && <small className="error"> {errors.cardNumber}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="cardExpiry">Fecha de vencimiento</label>
                        <input type="text"
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            required
                        />
                        {errors.cardExpiry && <small className="error"> {errors.cardExpiry}</small>}
                    </div>


                    <div className="form-group">
                        <label htmlFor="cardCvv">Codigo de seguridad</label>
                        <input type="text"
                            id="cardCvv"
                            name="cardCvv"
                            value={formData.cardCvv}
                            onChange={handleChange}
                            placeholder="123"
                            required
                        />
                    </div>
                    {errors.cardCvv && <small className="error"> {errors.cardCvv}</small>}

                </fieldset>

                <div className="checkout-total">
                    <h3>Total a pagar: ${total.toFixed(2)}</h3>
                </div>

                <button type="submit" className="btn-confirmar">
                    Confirmar compra
                </button>
            </form>
        </div>
    );
}