import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import './DetallesProductos.css';

export default function DetallesProductos() {
    const {id} = useParams();
    const [producto, setProducto] = useState (null);
    const [loading, setLoading] = useState (true);

    useEffect (() => {
        const fetchProducto = async () => {
            try {
                const productoRef = doc (db, "Productos", id);
                const docSnap = await getDoc (productoRef);

                if (docSnap.exists()) {
                    setProducto (docSnap.data());
                } else {
                    console.log ("Producto no encontrado!");
                }
            } catch (error) {
                console.error ("Error al obtener el producto:", error);
            } finally {
                setLoading (false);
            }
        };

        fetchProducto();
    }, [id]);

    if (loading) return <p>Cargando...</p>;
    if (!producto) return <p>Producto no encontrado.</p>;

    return (
<div id='app-layout'>
<main className='main-content'>

    <img src={producto.imagenUrl} alt={producto.nombre} className="detalle-img" />
    <h1>{producto.Nombre}</h1>
    <p className="detalle-precio">${producto.Precio}</p>
    <p className="detalle-descripcion">{producto.Descripcion}</p>

    <button className="btn-agregar"> Agregar al carrito</button>



</main>
</div>
    );
}