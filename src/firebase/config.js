import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCUVNOIFMyTgNF3ROEK57R9fp6LWnyTLRM",
  authDomain: "olxclone-6b8f3.firebaseapp.com",
  projectId: "olxclone-6b8f3",
  storageBucket: "olxclone-6b8f3.appspot.com",
  messagingSenderId: "308017106871",
  appId: "1:308017106871:web:0990e00683894529696232",
  measurementId: "G-N5NKC0CCZF"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export default firebase;

export const db = getFirestore(firebase)
export const storage = getStorage(firebase)
