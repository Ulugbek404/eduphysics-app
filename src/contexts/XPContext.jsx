import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { doc, onSnapshot, updateDoc, increment, arrayUnion, collection, addDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

// ─── XP Mukofotlari ───────────────────────────────────────────────────────────
export const XP_REWARDS = {
    LESSON_COMPLETE: 50,
    TEST_COMPLETE: 100,
    LAB_COMPLETE: 75,
    DAILY_LOGIN: 10,
    PERFECT_SCORE: 150,
    MISSION_DAILY: 40,
    MISSION_WEEKLY: 150,
    ACHIEVEMENT: 200,
    AI_MESSAGE: 5,
    FORMULA_LEARNED: 25,
};

// ─── Level hisoblash ──────────────────────────────────────────────────────────
export const calcLevel = (xp) => Math.floor(xp / 500) + 1;
export const xpForNextLevel = (xp) => {
    const level = calcLevel(xp);
    return level * 500;
};
export const xpInCurrentLevel = (xp) => xp % 500;

// ─── Context ──────────────────────────────────────────────────────────────────
const XPContext = createContext(null);

// ─── Toast state (module-level so MissionsContext can push too) ───────────────
let globalPushToast = null;
export const pushXPToast = (msg) => { if (globalPushToast) globalPushToast(msg); };

// ─── Provider ────────────────────────────────────────────────────────────────
export function XPProvider({ children }) {
    const { user } = useAuth();
    const [totalXP, setTotalXP] = useState(0);
    const [level, setLevel] = useState(1);
    const [toasts, setToasts] = useState([]);
    const [checkMissionsFn, setCheckMissionsFn] = useState(null);

    // Foydalanuvchi ma'lumotlarini cache — getDoc ni kamaytirish uchun
    const userMetaRef = useRef({ displayName: '', region: '' });

    // Register the missions checker (MissionsContext will inject this)
    const registerMissionsChecker = useCallback((fn) => {
        setCheckMissionsFn(() => fn);
    }, []);

    // Push toast
    const pushToast = useCallback((msg) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, ...msg }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
    }, []);

    // Register globally so MissionsContext can also show toasts
    useEffect(() => {
        globalPushToast = pushToast;
        return () => { globalPushToast = null; };
    }, [pushToast]);

    // Real-time Firestore listener
    useEffect(() => {
        if (!user?.uid) return;
        const ref = doc(db, 'users', user.uid);
        const unsub = onSnapshot(
            ref,
            (snap) => {
                if (snap.exists()) {
                    const data = snap.data();
                    const xp = data.xp || 0;
                    setTotalXP(xp);
                    setLevel(calcLevel(xp));
                    // Region va displayName ni cache qilib saqlaymiz
                    userMetaRef.current = {
                        displayName: data.displayName || user.displayName || '',
                        region: data.region || '',
                    };
                }
            },
            (error) => {
                console.warn('XP listener error (non-fatal):', error?.code || error?.message);
            }
        );
        return unsub;
    }, [user?.uid, user?.displayName]);

    // addXP — yagona XP qo'shish funksiyasi
    const addXP = useCallback(async (amount, reason = 'misc') => {
        if (!user?.uid || amount <= 0) return;
        try {
            // 1. Firestore ga yoz — xp VA totalXP ham, activeDates ham
            const today = new Date().toISOString().split('T')[0]; // "2026-05-04"
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
                xp: increment(amount),
                totalXP: increment(amount),          // Admin panel shu fieldni o'qiydi
                activeDates: arrayUnion(today),      // "Bugun faol" hisoblagichi uchun
                lastLogin: serverTimestamp(),
            });

            // 2. XP loglari
            const logsRef = collection(db, 'xpLogs', user.uid, 'logs');
            await addDoc(logsRef, { amount, reason, timestamp: serverTimestamp() });

            // 3. Leaderboard yangilash — increment() bilan, getDoc shart emas!
            const { displayName, region } = userMetaRef.current;
            const payload = {
                uid: user.uid,
                displayName: user.displayName || displayName || 'Foydalanuvchi',
                totalXP: increment(amount),
                weeklyXP: increment(amount),
                monthlyXP: increment(amount),
                dailyXP: increment(amount),
                level: calcLevel(totalXP + amount),
                region: region,
                updatedAt: serverTimestamp(),
            };
            const globalRef = doc(db, 'leaderboard', 'global', 'users', user.uid);
            await setDoc(globalRef, payload, { merge: true });
            if (region) {
                const regionRef = doc(db, 'leaderboard', region, 'users', user.uid);
                await setDoc(regionRef, payload, { merge: true });
            }

            // 4. Missiyalarni tekshir
            if (checkMissionsFn) checkMissionsFn(reason);

            // 5. Toast ko'rsat
            pushToast({ amount, reason });
        } catch (err) {
            console.error('addXP error:', err);
        }
    }, [user?.uid, user?.displayName, totalXP, checkMissionsFn, pushToast]);

    return (
        <XPContext.Provider value={{ totalXP, level, addXP, registerMissionsChecker }}>
            {children}
            {/* ── XP Toast Container ── */}
            <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
                {toasts.map(t => (
                    <div
                        key={t.id}
                        className="pointer-events-auto flex items-center gap-3 bg-slate-800 border border-indigo-500/40 shadow-xl shadow-indigo-500/20 rounded-2xl px-5 py-3 animate-slide-in-right"
                        style={{ animation: 'slideInRight 0.35s cubic-bezier(.17,.67,.83,.67)' }}
                    >
                        <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-lg">
                            ⚡
                        </div>
                        <div>
                            <p className="text-indigo-400 font-bold text-sm">+{t.amount} XP</p>
                            <p className="text-slate-400 text-xs">{XP_REASON_LABELS[t.reason] || t.reason}</p>
                        </div>
                        <div className="ml-1 text-xl">🎉</div>
                    </div>
                ))}
            </div>
            <style>{`
                @keyframes slideInRight {
                    from { transform: translateX(120%); opacity: 0; }
                    to   { transform: translateX(0);     opacity: 1; }
                }
            `}</style>
        </XPContext.Provider>
    );
}

const XP_REASON_LABELS = {
    LESSON_COMPLETE: "Dars tugallandi!",
    TEST_COMPLETE: "Test yakunlandi!",
    LAB_COMPLETE: "Laboratoriya tugallandi!",
    DAILY_LOGIN: "Kunlik kirish bonusi",
    PERFECT_SCORE: "Mukammal natija!",
    MISSION_DAILY: "Kunlik missiya bajarildi!",
    MISSION_WEEKLY: "Haftalik missiya bajarildi!",
    ACHIEVEMENT: "Yutuq ochildi!",
    AI_MESSAGE: "AI bilan suhbat",
    FORMULA_LEARNED: "Formula o'rganildi! 🧪",
    mission_complete: "Missiya bajarildi!",
};

export const useXP = () => {
    const ctx = useContext(XPContext);
    if (!ctx) throw new Error('useXP must be used within XPProvider');
    return ctx;
};
