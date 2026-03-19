import { createContext, useContext, useState, useEffect } from 'react';
import { clearUserCache } from '../utils/cache';
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
    sendEmailVerification,
    updateProfile
} from 'firebase/auth';
import {
    doc, getDoc, setDoc, updateDoc, serverTimestamp
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
            if (currentUser) {
                // ── Email/parol foydalanuvchisi tasdiqlanganmi? ──────────────
                const isEmailProvider = currentUser.providerData
                    .some(p => p.providerId === 'password');

                if (isEmailProvider && !currentUser.emailVerified) {
                    // Tasdiqlanmagan — logout va bloklash
                    await signOut(auth);
                    setUser(null);
                    setUserData(null);
                    setLoading(false);
                    return;
                }

                setUser(currentUser);
                const data = await fetchUserData(currentUser.uid);

                // Bloklangan foydalanuvchi tekshiruvi
                if (data?.blocked) {
                    await signOut(auth);
                    setUser(null);
                    setUserData(null);
                    setLoading(false);
                    return;
                }

                // Email tasdiqlangan bo'lsa Firestore ga sync
                if (currentUser.emailVerified && data && !data.emailVerified) {
                    try {
                        await updateDoc(doc(db, 'users', currentUser.uid), {
                            emailVerified: true,
                        });
                    } catch (e) { /* ignore — doc may not exist yet */ }
                }
            } else {
                setUser(null);
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
            } else {
                // Bloklangan foydalanuvchini tekshirish
                const data = snap.data();
                if (data?.blocked) {
                    await signOut(auth);
                    const err = new Error('Akkauntingiz bloklangan. Admin bilan bog\'laning.');
                    setError(err.message);
                    throw err;
                }
            }
            await fetchUserData(result.user.uid);
            return result.user;
        } catch (err) {
            console.error('Login error:', err);
            if (!err.message.includes('bloklangan')) setError(err.message);
            throw err;
        }
    };

    // Email + rol bilan ro'yxatdan o'tish (ustoz yoki o'quvchi)
    const signUpWithEmailAndRole = async (email, password, displayName, role = 'student') => {
        try {
            setError(null);
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, { displayName });

            // Tasdiqlash xati yuborish
            await sendEmailVerification(result.user, {
                url: window.location.origin + '/login',
                handleCodeInApp: false,
            });

            // Firestore ga yoz (emailVerified: false)
            await setDoc(doc(db, 'users', result.user.uid), {
                uid: result.user.uid,
                email,
                displayName,
                role,
                emailVerified: false,
                region: '',
                currentLevel: 1,
                totalXP: 0,
                streakDays: 0,
                activeDates: [],
                createdAt: serverTimestamp(),
            });

            // Admin uchun — darhol kirishga ruxsat (email tekshirilmaydi)
            if (role === 'admin') {
                await fetchUserData(result.user.uid);
                return { user: result.user, role };
            }

            // Oddiy foydalanuvchi — signOut, verify sahifaga
            await signOut(auth);
            setUserData(null);
            return { user: result.user, role, needsVerification: true, email };
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

            // Bloklangan foydalanuvchini tekshirish
            if (data?.blocked) {
                await signOut(auth);
                setUserData(null);
                const err = new Error('Akkauntingiz bloklangan. Admin bilan bog\'laning.');
                setError(err.message);
                throw err;
            }

            // Email tasdiqlanganmi? (admin uchun tekshirilmaydi)
            if (!result.user.emailVerified && data?.role !== 'admin') {
                await signOut(auth);
                setUserData(null);
                const err = new Error('EMAIL_NOT_VERIFIED');
                err.email = email;
                throw err;
            }

            // role ni qaytaramiz — LoginPage yo'nalishni aniqlash uchun
            return { user: result.user, role: data?.role || 'student' };
        } catch (err) {
            console.error('Email login error:', err);
            if (!err.message.includes('bloklangan') && !err.message.includes('EMAIL_NOT_VERIFIED')) {
                setError(err.message);
            }
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
            const uid = auth.currentUser?.uid;
            // localStorage eski kalitlarini tozalash
            if (uid) {
                const keysToRemove = [
                    `progress_${uid}`,
                    `assessment_completed_${uid}`,
                    `assessment_results_${uid}`,
                ];
                keysToRemove.forEach(k => localStorage.removeItem(k));
                localStorage.removeItem('userStats');
                clearUserCache(uid);
            }
            await signOut(auth);
            setUserData(null);
        } catch (err) {
            console.error('Logout error:', err);
            setError(err.message);
        }
    };


    // Rol yordamchilari
    const isAdmin = userData?.role === 'admin';
    const isTeacher = userData?.role === 'teacher'; // orqaga moslash uchun saqlanadi
    const isStudent = userData?.role === 'student' || (!userData?.role && !isAdmin);

    const value = {
        user,
        userData,
        loading,
        error,
        isAdmin,
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
