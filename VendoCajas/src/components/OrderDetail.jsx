import { useEffect,useState } from "react";
import {Form, useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore"
import {db} from "../firebase/config";
import "../css/OrderDetail.css";

export default function OrderDetail() {
const {id} = useParams();
const [orden, setOrden] = useState(null);

useEffect(() => {
    const fetchOrder = async () => {
        try{
            const docRef = doc(db, "ordenes", id);
            const snap = await getDoc(docRef);
            if (snap.exists()){
                setOrden(snap.data());
            } else {
                console.warn("No se encontro la orden");
            }
        }catch (err){
            console.error("Error al obtener la orden", err);
        }
    };
fetchOrder();
}, [id]);

if (!orden) return <h2 className="cargando-ticket"> Cargando ticket...</h2>;

return (
    <div className="Ticket-container">
        <h1>Ticket de compra:</h1>
        <p><strong>ID de orden:</strong>{id}</p>
        <p><strong>Cliente:</strong>{orden.comprador.Nombre}</p>
        <p><strong>Email:</strong>{orden.comprador.email}</p>
        <p><strong>Fecha:</strong>{new Date(orden.fecha).toLocaleString()}</p>

        <h3>Productos:</h3>
        <ul>
            {orden.items.map((p) => (
                <li key={p.id}>
                   {p.Nombre} x{p.cantidad} - ${p.precio * p.cantidad}     
                </li>
            ))}
        </ul>

<h2> Total pagado: ${orden.total}</h2>
        <p>ultimos 4 numeros de la tarjeta: {orden.pago.cardLast4}</p>

    </div>
);

}