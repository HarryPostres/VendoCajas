import {useState} from 'react';
import { addProduct }  from '../Firebase/addProduct';

function addProductForm() {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const[descripcion, setDescripcion] = useState("");
    const[file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert("selecciona una imagen primero");

        try {
            await addProductForm(nombre, precio, descripcion, file);
            alert("producto agregado con exito");

            setNombre("");
            setPrecio("");
            setDescripcion("");
            setFile(null);
        } catch (error) {
            alert("error al agregar producto:" + error.message);
        }
};

return (
    <form onSubmit={handleSubmit} className= "form-add-product">
        <h3>Agregar producto</h3>

        <input
        type="text"
        placeholder='Nombre del producto'
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        />

        <input 
        type="file"
        accept='image/*'
        onChange={(e) => setFile(e.target.filess[0])}
        required
        />

        <button type="submit"> Agregar Producto</button>


    </form>
)
}