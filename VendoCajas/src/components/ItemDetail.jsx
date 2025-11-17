import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../Firebase/config";
import { doc, getDoc } from "firebase/firestore";
import '../css/ItemDetail.css';
import {useCart} from "./CartContext.jsx";
import { useNotification } from "./NotificationContext";

export default function DetallesProductos() {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const {addToCart} = useCart();
    const {showNotification} = useNotification();

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const productoRef = doc(db, "Productos", id);
                const docSnap = await getDoc(productoRef);

                if (docSnap.exists()) {
                    setProducto(docSnap.data());
                } else {
                    console.log("Producto no encontrado!");
                }
            } catch (error) {
                console.error("Error al obtener el producto:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducto();
    }, [id]);

    if (loading) return <p>Cargando...</p>;
    if (!producto) return <p>Producto no encontrado.</p>;

    const handleAdd = () => {
        addToCart({id, ...producto});
        showNotification("¡Producto agregado al carrito!")
    }

    return (
        <div id='app-layout-detalles'>
            <main className='main-content-detalles'>

                <div className="div-img-detalles"> <img src={producto.imageUrl} alt={producto.nombre} className="img-detalles" /> </div>
                <div className="info-detalles">
                    <h1>{producto.Nombre}</h1>
                    <p className="precio-detalles">${producto.Precio}</p>
                    <p className="descipcion-detalles">{producto.Descripcion}</p>

                    <button className="btn-agregar-detalles" onClick={handleAdd}> Agregar al carrito</button>
                </div>


            </main>
        </div>
    );
}