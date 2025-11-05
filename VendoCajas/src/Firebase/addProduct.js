import {db, storage} from './config.js';
import { collection, addDoc } from "firebase/firestore"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function addProduct(nombre, precio, descripcion, imagen) {
    try {
        // Upload image to Firebase Storage
        const storageRef = ref (storage, `productos/${File.name}`);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL (storageRef);

        const docRef = await addDoc(collection(db, "productos"), {
            nombre,
            precio,
            description,
            imagenUrl: imageUrl
        });

        console.log("producto agregado con ID:", docRef.id);
    } catch (e) {
        console.error("error al agregar el producto:", e);
    }
}