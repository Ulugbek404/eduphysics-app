import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase konfiguratsiyasi
// TODO: Firebase Console'dan o'z config'ingizni oling va bu yerga qo'ying
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "DEMO_API_KEY",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "eduphysics-app.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "eduphysics-app",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "eduphysics-app.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef"
};

// Firebase'ni ishga tushirish
const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore Database
export const db = getFirestore(app);

export default app;
