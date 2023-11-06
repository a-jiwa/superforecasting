import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import getFirestore

const firebaseConfig = {
    apiKey: "AIzaSyBkzFozctyvIFv3dfleTgvAIcsnvN1j8Z8",
    authDomain: "test-8fb1a.firebaseapp.com",
    projectId: "test-8fb1a",
    storageBucket: "test-8fb1a.appspot.com",
    messagingSenderId: "288621812511",
    appId: "1:288621812511:web:71df7236416445a7a32e2a",
    measurementId: "G-90G4EGVT3B"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app); // Initialize Firestore with app instance
const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider('apple.com');
const facebookProvider = new FacebookAuthProvider();

export {
    auth,
    db, // Exporting db
    googleProvider,
    appleProvider,
    facebookProvider,
    signInWithEmailAndPassword,
    signInWithPopup
};