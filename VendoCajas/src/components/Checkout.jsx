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
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos de compra", formData);
        console.log("total a pagar:", total.toFixed(2));
        alert("Compra registrada (sin metodo de pago aun).");
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

        <div className="checkout-total">
            <h3>Total a pagar: ${total.toFixed(2)}</h3>
        </div>

        <button type="submi" className= "btn-confirmar" >
            Confirmar compra
        </button>
        </form>
        </div>
    );
}