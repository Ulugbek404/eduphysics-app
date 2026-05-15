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
    updateProfile
} from 'firebase/auth';
import {
    doc, getDoc, setDoc, updateDoc, serverTimestamp, arrayUnion
} from 'firebase/firestore';

// ─────────────────────────────────────────────────────────────────────────────
// normalizeEmail — Firebase qabul qiladigan formatga keltirish
// 'demo@test'  →  'demo@test.com'
// 'user@abc'   →  'user@abc.com'
// 'x@y.com'    →  'x@y.com'  (o'zgarishsiz)
// ─────────────────────────────────────────────────────────────────────────────
const normalizeEmail = (email) => {
    if (!email || !email.includes('@')) return email;
    const [local, domain] = email.split('@');
    // Domain da nuqta yo'q bo'lsa .com qo'shamiz
    if (!domain.includes('.')) {
        return `${local}@${domain}.com`;
    }
    return email;
};

const AuthContext = createContext();

const hasCachedFirebaseAuth = () => {
    try {
        return Object.keys(localStorage).some(k => k.startsWith('firebase:authUser'));
    } catch { return false; }
};

// ─────────────────────────────────────────────────────────────────────────────
// ensureUserInFirestore — Auth da bor lekin Firestore da yo'q bo'lsa yaratadi.
// Mavjud bo'lsa — hech narsa qilmaydi (overwrite yo'q).
// ─────────────────────────────────────────────────────────────────────────────
const ensureUserInFirestore = async (user, extraData = {}) => {
    if (!user) return;

    try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        // Allaqachon Firestore da bor — hech narsa qilmaymiz
        if (userSnap.exists()) return;

        // Yo'q — yangi hujjat yaratamiz
        await setDoc(userRef, {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || extraData.displayName || 'Foydalanuvchi',
            photoURL: user.photoURL || '',
            role: extraData.role || 'student',
            emailVerified: true, // tasdiqlamasdan to'g'ridan kiritamiz
            region: '',
            currentLevel: 1,
            totalXP: 0,
            streakDays: 0,
            activeDates: [],
            blocked: false,
            provider: user.providerData?.[0]?.providerId || 'unknown',
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
        });

        console.log(`[Auth] Yangi foydalanuvchi Firestore ga qo'shildi: ${user.email}`);
    } catch (err) {
        console.warn('[Auth] ensureUserInFirestore xatosi:', err);
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// lastLogin va activeDates ni yangilash — har kirishda
// ─────────────────────────────────────────────────────────────────────────────
const updateLastLogin = async (uid) => {
    try {
        const today = new Date().toISOString().split('T')[0]; // '2026-05-04'
        await updateDoc(doc(db, 'users', uid), {
            lastLogin: serverTimestamp(),
            activeDates: arrayUnion(today),   // ✅ Admin "Bugun faol" hisoblagichi
        });
    } catch (err) {
        console.warn('[Auth] lastLogin yangilash xatosi:', err);
    }
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

    // ── onAuthStateChanged — sahifa yangilanishida ham sinxronlaydi ──────────
    useEffect(() => {
        if (!auth) {
            setError("Firebase konfiguratsiyasi xatosi.");
            setLoading(false);
            return;
        }

        setPersistence(auth, browserLocalPersistence).catch(console.error);

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // Email verification tekshirilmaydi — barcha foydalanuvchilar kirishi mumkin
                await ensureUserInFirestore(currentUser);
                await updateLastLogin(currentUser.uid); // ✅ activeDates va lastLogin yangilash

                setUser(currentUser);
                const data = await fetchUserData(currentUser.uid);

                // Bloklangan foydalanuvchi tekshiruvi (bu qoladi)
                if (data?.blocked) {
                    await signOut(auth);
                    setUser(null);
                    setUserData(null);
                    setLoading(false);
                    return;
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

    // ── Google bilan kirish ──────────────────────────────────────────────────
    const loginWithGoogle = async () => {
        try {
            setError(null);
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            await ensureUserInFirestore(user);

            const snap = await getDoc(doc(db, 'users', user.uid));
            const data = snap.data();
            if (data?.blocked) {
                await signOut(auth);
                const err = new Error("Akkauntingiz bloklangan. Admin bilan bog'laning.");
                setError(err.message);
                throw err;
            }

            await updateLastLogin(user.uid);
            await fetchUserData(user.uid);

            return user;
        } catch (err) {
            console.error('Login error:', err);
            if (!err.message?.includes('bloklangan')) setError(err.message);
            throw err;
        }
    };

    // ── Email + rol bilan ro'yxatdan o'tish ─────────────────────────────────
    // Email tasdiqlamasdan to'g'ridan-to'g'ri kirish (demo va real akkauntlar uchun)
    const signUpWithEmailAndRole = async (rawEmail, password, displayName, role = 'student') => {
        try {
            setError(null);

            // @ belgisi tekshiruvi (minimal format)
            if (!rawEmail.includes('@')) {
                throw new Error('Email @ belgisini o\'z ichiga olishi kerak');
            }

            // Firebase uchun normalize qilamiz (demo@test → demo@test.com)
            const email = normalizeEmail(rawEmail);

            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, { displayName });

            // Firestore ga yozamiz — email tasdiqlash TALAB ETILMAYDI
            await setDoc(doc(db, 'users', result.user.uid), {
                uid: result.user.uid,
                email,
                displayName,
                photoURL: result.user.photoURL || '',
                role,
                emailVerified: true, // tasdiqlamasdan to'g'ridan ruxsat
                region: '',
                currentLevel: 1,
                totalXP: 0,
                streakDays: 0,
                activeDates: [],
                blocked: false,
                provider: 'password',
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp(),
            });

            // Darhol kirish — hamma uchun (admin va student)
            await fetchUserData(result.user.uid);
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

    // ── Email bilan kirish ───────────────────────────────────────────────────
    const loginWithEmail = async (rawEmail, password) => {
        setError(null);

        // @ belgisi tekshiruvi (minimal)
        if (!rawEmail.includes('@')) {
            const err = new Error('Email @ belgisini o\'z ichiga olishi kerak');
            setError(err.message);
            throw err;
        }

        // Firebase uchun normalize qilamiz (demo@test → demo@test.com)
        const email = normalizeEmail(rawEmail);

        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user = result.user;

            await ensureUserInFirestore(user);

            const data = await fetchUserData(user.uid);

            // Bloklangan foydalanuvchini tekshirish
            if (data?.blocked) {
                await signOut(auth);
                setUserData(null);
                const err = new Error("Akkauntingiz bloklangan. Admin bilan bog'laning.");
                setError(err.message);
                throw err;
            }

            // Email verification tekshiruvi YO'Q — barcha kirishi mumkin
            await updateLastLogin(user.uid);

            return { user, role: data?.role || 'student' };
        } catch (err) {
            if (err.message?.includes('bloklangan')) throw err;

            // Firebase xato kodlari
            if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
                const e = new Error('❌ Email yoki parol noto\'g\'ri');
                setError(e.message);
                throw e;
            }
            if (err.code === 'auth/wrong-password') {
                const e = new Error('❌ Parol noto\'g\'ri');
                setError(e.message);
                throw e;
            }
            if (err.code === 'auth/too-many-requests') {
                const e = new Error('⏳ Ko\'p urinish! 5 daqiqadan keyin qayta urining.');
                setError(e.message);
                throw e;
            }

            console.error('Email login error:', err);
            setError(err.message);
            throw err;
        }
    };

    // ── Parolni tiklash ─────────────────────────────────────────────────────
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

    // ── Chiqish ─────────────────────────────────────────────────────────────
    const logout = async () => {
        try {
            const uid = auth.currentUser?.uid;
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
    const isTeacher = userData?.role === 'teacher';
    const isStudent = userData?.role === 'student' || (!userData?.role && !isAdmin);

    const value = {
        user,
        userData,
        loading,
        error,
        isAdmin,
        isTeacher,
        isStudent,
        isDemoMode: false, // eski kod bilan moslashish uchun
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
