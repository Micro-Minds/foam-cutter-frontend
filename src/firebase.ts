// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// 🔹 Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyBr7xCzS0T-NSpRg2E7SUNIY9nKGa7I7rw",
    authDomain: "cnc-foam-cutter.firebaseapp.com",
    projectId: "cnc-foam-cutter",
    storageBucket: "cnc-foam-cutter.firebasestorage.app",
    messagingSenderId: "15855443400",
    appId: "1:15855443400:web:896f56400ec56284c234fd",
    measurementId: "G-GDS0N8GD5D"
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore here
const db = getFirestore(app);

const auth = getAuth(app);

// ✅ Export the Firestore instance so you can use it in other files
export { db,auth };
