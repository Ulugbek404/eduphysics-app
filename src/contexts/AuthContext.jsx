import { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
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

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Persistence sozlash - foydalanuvchi login qolsin
        setPersistence(auth, browserLocalPersistence).catch(console.error);

        // Auth state o'zgarishini kuzatish
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                console.log('User logged in:', currentUser.displayName);
            }
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
            console.log('Login successful:', result.user.displayName);
            return result.user;
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message);
            throw err;
        }
    };

    // Email bilan ro'yxatdan o'tish
    const signUpWithEmail = async (email, password, displayName) => {
        try {
            setError(null);
            const result = await createUserWithEmailAndPassword(auth, email, password);
            // Display name qo'shish
            await updateProfile(result.user, { displayName });
            console.log('Sign up successful:', displayName);
            return result.user;
        } catch (err) {
            console.error('Sign up error:', err);
            setError(err.message);
            throw err;
        }
    };

    // Email bilan kirish
    const loginWithEmail = async (email, password) => {
        try {
            setError(null);
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log('Email login successful:', result.user.email);
            return result.user;
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
            console.log('Password reset email sent to:', email);
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
            console.log('Logout successful');
        } catch (err) {
            console.error('Logout error:', err);
            setError(err.message);
        }
    };

    const value = {
        user,
        loading,
        error,
        loginWithGoogle,
        signUpWithEmail,
        loginWithEmail,
        resetPassword,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook - AuthContext'ni ishlatish uchun
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

export default AuthContext;
