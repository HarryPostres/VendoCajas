import { db, storage } from './config.js';
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function addProduct(nombre, precio, descripcion, imagen) {
    try {


        // Upload image to Firebase Storage
        const storageRef = ref(storage, `productos/${file.name}`);
        await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(storageRef);

        const docRef = await addDoc(collection(db, "Productos"), {
            Nombre,
            Precio,
            Descripcion,
            imagenUrl: imageUrl
        });

        console.log("producto agregado con ID:", docRef.id);
    } catch (e) {
        console.error("Error al agregar el producto:", e);
    }
}