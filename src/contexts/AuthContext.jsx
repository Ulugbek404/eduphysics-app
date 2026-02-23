import { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider, db } from '../firebase';
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth';
import {
    doc, getDoc, setDoc, serverTimestamp
} from 'firebase/firestore';

const AuthContext = createContext();

const hasCachedFirebaseAuth = () => {
    try {
        return Object.keys(localStorage).some(k => k.startsWith('firebase:authUser'));
    } catch { return false; }
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(hasCachedFirebaseAuth);
    const [error, setError] = useState(null);

    // Firestore'dan foydalanuvchi ma'lumotlarini olish
    const fetchUserData = async (uid) => {
        try {
            const snap = await getDoc(doc(db, 'users', uid));
            if (snap.exists()) {
                setUserData(snap.data());
                return snap.data();
            } else {
                setUserData(null);
                return null;
            }
        } catch (err) {
            console.warn('fetchUserData error:', err);
            setUserData(null);
            return null;
        }
    };

    useEffect(() => {
        if (!auth) {
            setError("Firebase konfiguratsiyasi xatosi.");
            setLoading(false);
            return;
        }

        setPersistence(auth, browserLocalPersistence).catch(console.error);

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                await fetchUserData(currentUser.uid);
            } else {
                setUserData(null);
            }
            setLoading(false);
        }, (err) => {
            console.error('Auth state error:', err);
            setError(err.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Google bilan kirish
    const loginWithGoogle = async () => {
        try {
            setError(null);
            const result = await signInWithPopup(auth, googleProvider);
            // Google bilan kiruvchi ham Firestore ga yoziladi (agar mavjud bo'lmasa)
            const snap = await getDoc(doc(db, 'users', result.user.uid));
            if (!snap.exists()) {
                await setDoc(doc(db, 'users', result.user.uid), {
                    uid: result.user.uid,
                    email: result.user.email,
                    displayName: result.user.displayName || '',
                    role: 'student',
                    region: '',
                    currentLevel: 1,
                    totalXP: 0,
                    streakDays: 0,
                    activeDates: [],
                    createdAt: serverTimestamp(),
                });
            }
            await fetchUserData(result.user.uid);
            return result.user;
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message);
            throw err;
        }
    };

    // Email + rol bilan ro'yxatdan o'tish (ustoz yoki o'quvchi)
    const signUpWithEmailAndRole = async (email, password, displayName, role = 'student') => {
        try {
            setError(null);
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, { displayName });

            // Firestore ga yoz
            await setDoc(doc(db, 'users', result.user.uid), {
                uid: result.user.uid,
                email,
                displayName,
                role,
                region: '',
                currentLevel: 1,
                totalXP: 0,
                streakDays: 0,
                activeDates: [],
                createdAt: serverTimestamp(),
            });

            await fetchUserData(result.user.uid);
            // role ni qaytaramiz — LoginPage yo'nalishni aniqlash uchun
            return { user: result.user, role };
        } catch (err) {
            console.error('Sign up error:', err);
            setError(err.message);
            throw err;
        }
    };

    // Eski signUpWithEmail — mos kelish uchun saqlanadi (role='student')
    const signUpWithEmail = (email, password, displayName) =>
        signUpWithEmailAndRole(email, password, displayName, 'student');

    // Email bilan kirish
    const loginWithEmail = async (email, password) => {
        try {
            setError(null);
            const result = await signInWithEmailAndPassword(auth, email, password);
            const data = await fetchUserData(result.user.uid);
            // role ni qaytaramiz — LoginPage yo'nalishni aniqlash uchun
            return { user: result.user, role: data?.role || 'student' };
        } catch (err) {
            console.error('Email login error:', err);
            setError(err.message);
            throw err;
        }
    };

    // Parolni tiklash
    const resetPassword = async (email) => {
        try {
            setError(null);
            await sendPasswordResetEmail(auth, email);
        } catch (err) {
            console.error('Password reset error:', err);
            setError(err.message);
            throw err;
        }
    };

    // Chiqish
    const logout = async () => {
        try {
            await signOut(auth);
            setUserData(null);
        } catch (err) {
            console.error('Logout error:', err);
            setError(err.message);
        }
    };

    // Rol yordamchilari
    const isTeacher = userData?.role === 'teacher';
    const isStudent = userData?.role === 'student' || !userData?.role;

    const value = {
        user,
        userData,
        loading,
        error,
        isTeacher,
        isStudent,
        loginWithGoogle,
        signUpWithEmail,
        signUpWithEmailAndRole,
        loginWithEmail,
        resetPassword,
        logout,
        fetchUserData,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}

export default AuthContext;
