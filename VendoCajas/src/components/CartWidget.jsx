import { Link } from "react-router-dom"
import { useCart } from "./CartContext";
import { ShoppingCart } from "lucide-react"
import "../css/CartWidget.css"

export default function CartWidget() {
    const { items } = useCart();
    const totalItems = items.reduce((acc, i) => acc + i.cantidad, 0);

    return (
        <Link to="/cart" className="cart-widget">
            <ShoppingCart className="cart-icon" />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>
    );
}