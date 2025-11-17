import { useCart } from "./CartContext";
import "../css/Cart.css"
import { useNavigate } from "react-router-dom";

export default function Carrito() {
    const { items, removeFromCart, clearCart, addToCart, decrement } = useCart();
    const navigate = useNavigate();

    if (items.length === 0) {
        return <h2>El carrito está vacío.</h2>;
    }

    const total = items.reduce((acc, item) => acc + item.Precio * item.cantidad, 0);

    return (
        <div className="carrito-principal">
            <h1>Carrito</h1>
            <h3>Total de ítems: {items.reduce((acc, i) => acc + i.cantidad, 0)}</h3>
            {items.map(item => (

                <div key={item.id} className="carrito-item">

                    <img src={item.imageUrl} alt={item.nombre} className="img-cart" />

                    <h3>{item.Nombre}</h3>
                    <p>Precio: ${item.Precio}</p>

                    <div className="contador-cart">
                        <button className="btn-count"
                            onClick={() => decrement(item.id)}>
                            -
                        </button>

                        <span>Cantidad: {item.cantidad}</span>
                        
                        <button className="btn-count"
                            onClick={() => addToCart(item)}>
                            +
                        </button>
                    </div>

                    <button onClick={() => removeFromCart(item.id)} className="btn-quitar">
                        Quitar</button>

                </div>
            
            ))}

            <div className="acciones-cart">
                <button className="btn-vaciar-cart" onClick={clearCart}> Vaciar carrito</button>

                <h3> total: ${total.toFixed(2)}</h3>

                <button
                    className="btn-pagar-cart"
                    onClick={() => navigate("/checkout")}>
                    Pagar
                </button>
            </div>
        </div>
    );
}