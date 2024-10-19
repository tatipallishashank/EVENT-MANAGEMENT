// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBJMXW220HfvFTKjMFArtaHFkci5g9i5gI",
  authDomain: "courses-4d59c.firebaseapp.com",
  projectId: "courses-4d59c",
  storageBucket: "courses-4d59c.appspot.com",
  messagingSenderId: "725245883467",
  appId: "1:725245883467:web:e6a5a1213ddabd1e9509ce",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
