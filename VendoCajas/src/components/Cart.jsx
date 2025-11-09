import {useCart} from "./CartContext";
import  "../css/Cart.css"

export default function Carrito () {
    const {items, removeFromCart, clearCart} = useCart();
    if (items.length === 0){
        return <h2>El carrito está vacío.</h2>
}

return (
<div className="carrito-principal">
    <h1>Carrito</h1>
    <h3>Total de ítems: {items.reduce((acc, i) => acc + i.cantidad, 0)}</h3>
{items.map (item => (




    <div key ={item.id} className="carrito-item">
  
        <img src={item.imageUrl} alt={item.nombre} className="img-cart" />

        <h3>{item.Nombre}</h3>
        <p>Precio: ${item.Precio}</p>
        <p>Cantidad: {item.cantidad}</p>

        <button onClick ={() => removeFromCart(item.id)}>Quitar</button>
    </div>
))}

button
</div>
);
}