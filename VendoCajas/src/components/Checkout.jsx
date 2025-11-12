import {useState} from "react";
import {useCart} from "./CartContext";
import "../css/Checkout.css"

export default function Checkout(){
    const {items} = useCart();
    const total = items.reduce((acc, item) => acc + item.Precio * item.cantidad, 0);

    const [formData, setFormData] = useState({
        nombre:"",
        email:"",
        dni:"",
        direccion:"",
        localidad:"",
        provincia:"",
        codigoPostal:"",

        cardName:"",
        cardExpiry:"",
        cardCvv:"",
    });

    const [errors, setErrors]= useState({});
    const [successMsg, setSuccesMsg] = useState(null);

    

    const handleChange = (e) => {
        const {name, value} = e.target;
        let v = value;
    };

    if (name === "cardNumber"){
        v = value.replace(/\D/g,"").slice(0,19);
        v = v.replace(/(.{4})/g, "$1 ").trim();
    }

    if(name ==="cardCvv"){
        v = value.replace(/\D/g, "").slice(0, 4);
    }

    if (name === "cardExpiry") {
        v = value.replace(/[^\d\/]/g,"").sllice(0, 5);
        if (v.length === 2 && !v.includes("/")) v = v + "/";
    };

    const luhnCheck = (num) => {
        const digits = num.replace(/\s+/g, "").split("").reverse().map((d) => parseInt(d, 10));
        if(digits.some(isNaN)) return false;
        let sum = 0;
        for (let i = 0; i < digits.length; i++){
            let d = digits[i];
            if (i % 2 === 1)
                d = d * 2;
            if(d > 9)d = d - 9;
        }
    return sum % 10 === 0
    };


    //validaciones
const validate = () => {
    const e = {};



    if (!formData.nombre.trim()) e.nombre = "Nombre requerido";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.mail = "Email invalido";
    if (!formData.dni.trim()) e.dni = "DNI requerido";
    if (!formData.direccion.trim()) e.direccion = "Dirección requerida";
    if (!formData.localidad.trim()) e.localidad = "Localidad requerida";
    if (!formData.provincia.trim()) e.provincia = "Provincia requerida";
    if (!formData.codigoPostal.trim()) e.codigoPostal = "Código postal requerido";



    /* seguir desde  const rawCardNumber*/





    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccesMsg(null);

        if(!validate()){
            window.scrollTo({top: 0, behavior:"smooth"});
            return;
        }





    };

    if (items.length === 0){
        return <h2 style={{textAlign: "center"}}> El carrito está vacío.</h2>;
    }

    return(
        <div className="checkout-container">
            <h1>Finalizar compra</h1>
        
        <form className= "checkout-form" onSubmit={handleSubmit}>

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
                type="email"
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
                type="localidad"
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

        <fieldset className="fieldset">
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

        <button type="submit" className= "btn-confirmar" >
            Confirmar compra
        </button>
        </form>
        </div>
    );
}