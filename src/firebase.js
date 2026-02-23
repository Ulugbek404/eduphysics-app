import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase konfiguratsiyasi
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app = null;
let auth = null;
let googleProvider = null;
let db = null;

try {
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
        throw new Error('Firebase API kalitlari topilmadi. .env faylini tekshiring.');
    }

    // ✅ Double-init oldini olish — getApps() bilan tekshir
    app = getApps().length === 0
        ? initializeApp(firebaseConfig)
        : getApp();

    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    db = getFirestore(app);

} catch (error) {
    console.error('Firebase ishga tushishida xatolik:', error);
}

export { auth, googleProvider, db };
export default app;
