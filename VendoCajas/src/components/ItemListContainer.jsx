import { useEffect, useState } from 'react';
import { db } from '../Firebase/config.js';
import { collection, getDocs } from 'firebase/firestore';
import '../css/ItemListContainer.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from "./CartContext.jsx";
import { useNotification } from './NotificationContext.jsx';

function AddProductKart({ mostrarAleatorios = false }) {
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { showNotification } = useNotification();

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Productos"));
                console.log("Documentos encontrados:", querySnapshot.docs.length);
                querySnapshot.docs.forEach(doc => console.log("Doc:", doc.id, doc.data()));

                let productosData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));

                if (mostrarAleatorios) {
                    const shuffled = productosData.sort(() => Math.random() - 0.5);
                    productosData = shuffled.slice(0, 3); 
                }


                setProductos(productosData);
            } catch (error) {
                console.error("Error al cargar productos:", error);
            }
        };
        fetchProductos();
    }, [mostrarAleatorios]);


    const handleAddToCart = (prod) => {
        addToCart(prod);
        showNotification("¡Producto agregado al carrito! puede sumar unidades en el carrito.")
    }

    return (

        <div className='productos-container'>
            <h2>Productos disponibles</h2>

            <div className='productos-grid'>
                {productos.length > 0 ? (
                    productos.map((prod) => (
                        <div className='card-producto' key={prod.id}>
                            <img
                                src={prod.imageUrl}
                                alt={prod.Nombre}
                                className='card-img'
                            />

                            <h3>{prod.Nombre}</h3>
                            <p className='precio'>${prod.Precio}</p>

                            <div className='card-botones'>
                                <button className='btn-agregar'
                                    onClick={() => handleAddToCart(prod)}>
                                    Agregar al carrito</button>
                                <button className='btn-detalles'
                                    onClick={() => navigate(`/producto/${prod.id}`)}>
                                    Ver detalles</button>
                            </div>

                        </div>
                    ))
                ) : (
                    <p>No hay productos disponibles.</p>
                )}
            </div>
        </div>
    );
}

export default AddProductKart;








