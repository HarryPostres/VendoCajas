//FIREBASE

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9SOemYP-CI8G37vr34uluxn5VoJCxiBE",
  authDomain: "vendocajas-1fffe.firebaseapp.com",
  projectId: "vendocajas-1fffe",
  storageBucket: "vendocajas-1fffe.firebasestorage.app",
  messagingSenderId: "420967777335",
  appId: "1:420967777335:web:2706f582ee532e274b2bb2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);