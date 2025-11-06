import {useEffect, useState} from 'react';
import { addProduct }  from '../Firebase/addProduct';
import {db } from '../Firebase/config.js';
import { collection, getDocs } from 'firebase/firestore';

/* 
async function AddProductKart() {
    const productosCol =collection (db, 'productos');
    const snapshot = await getDocs(productosCol);
    const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
    return lista;
} */



function AddProductKart() {
    const [productos, setProductos] = useState([]);


useEffect(() =>{
    const fetchProductos = async () => {
        try{
            const querySnapshot = await getDocs(collection(db, "Productos"));

            console.log("Documentos encontrados:", querySnapshot.docs.length);
            querySnapshot.docs.forEach(doc => console.log("Doc:", doc.id, doc.data()));



            const productosData = querySnapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data()
            }));
            setProductos(productosData);
        }catch(error){
            console.error("Error al cargar productos:", error);
        }
    };
    fetchProductos();
}, []);

return (

    <div className='productos-container'>
        <h2>Productos disponibles</h2>

        <div className='productos-grid'>
           {productos.length > 0 ? (
            productos.map((prod) =>(
                <div className='card-producto' key={prod.id}>
                    <img 
                    src={prod.imageUrl}
                    alt={prod.nombre}
                    className='card-img'
                    />
                    
                    <h3>{prod.Nombre}</h3>
                    <p className='precio'>${prod.Precio}</p>
                    <p className='descripcion'>{prod.Descripcion}</p>

                    <div className='card-botones'>
                        <button className='btn-agregar'>Agregar al carrito</button>
                        <button className='btn-detalles'>Ver detalles</button>
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
