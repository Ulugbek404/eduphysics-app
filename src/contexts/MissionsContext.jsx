import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
    doc, getDoc, setDoc, updateDoc, onSnapshot, serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';
import { useXP, pushXPToast } from './XPContext';

// ─── Mission Definitions ──────────────────────────────────────────────────────
export const DAILY_MISSIONS_TEMPLATE = [
    { id: 'daily_lesson', title: "Bitta dars tugalla", icon: 'BookOpen', target: 1, xp: 50, trigger: 'LESSON_COMPLETE' },
    { id: 'daily_test', title: "Test ishlat", icon: 'ClipboardList', target: 1, xp: 40, trigger: 'TEST_COMPLETE' },
    { id: 'daily_ai', title: "AI Ustoz bilan suhbatlash", icon: 'Bot', target: 3, xp: 30, trigger: 'AI_MESSAGE' },
];

export const WEEKLY_MISSIONS_TEMPLATE = [
    { id: 'week_streak', title: "5 kun ketma-ket login", icon: 'Flame', target: 5, xp: 100, trigger: 'DAILY_LOGIN' },
    { id: 'week_labs', title: "2 ta laboratoriya tugalla", icon: 'FlaskConical', target: 2, xp: 150, trigger: 'LAB_COMPLETE' },
    { id: 'week_lessons', title: "10 ta mavzu tugalla", icon: 'GraduationCap', target: 10, xp: 200, trigger: 'LESSON_COMPLETE' },
];

export const ACHIEVEMENTS_TEMPLATE = [
    { id: 'first_lesson', title: "Boshlang'ich", desc: "Birinchi darsni tugalla", icon: '⭐', xp: 200, trigger: 'LESSON_COMPLETE', conditionKey: 'totalLessons', conditionVal: 1 },
    { id: 'ten_lessons', title: "Izlanuvchan", desc: "10 ta dars tugalla", icon: '📚', xp: 300, trigger: 'LESSON_COMPLETE', conditionKey: 'totalLessons', conditionVal: 10 },
    { id: 'perfect', title: "Daho", desc: "Testda 90%+ natija ol", icon: '🧠', xp: 250, trigger: 'PERFECT_SCORE', conditionKey: null, conditionVal: 0 },
    { id: 'all_labs', title: "Laborant", desc: "Barcha 6 laboratoriyani tugalla", icon: '🥼', xp: 400, trigger: 'LAB_COMPLETE', conditionKey: 'totalLabs', conditionVal: 6 },
    { id: 'week_streak_5', title: "Sodiq O'quvchi", desc: "5 kun ketma-ket kir", icon: '🔥', xp: 300, trigger: 'DAILY_LOGIN', conditionKey: 'streakDays', conditionVal: 5 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const todayStr = () => new Date().toISOString().slice(0, 10);
const weekStart = () => {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff)).toISOString().slice(0, 10);
};
const freshTasks = (template) => template.map(t => ({ ...t, current: 0, completed: false }));

// ─── Context ──────────────────────────────────────────────────────────────────
const MissionsContext = createContext(null);

export function MissionsProvider({ children }) {
    const { user } = useAuth();
    const { addXP, registerMissionsChecker } = useXP();

    const [dailyMissions, setDailyMissions] = useState(freshTasks(DAILY_MISSIONS_TEMPLATE));
    const [weeklyMissions, setWeeklyMissions] = useState(freshTasks(WEEKLY_MISSIONS_TEMPLATE));
    const [achievements, setAchievements] = useState(ACHIEVEMENTS_TEMPLATE.map(a => ({ ...a, earned: false })));
    const [userStats, setUserStats] = useState({ totalLessons: 0, totalLabs: 0, streakDays: 0 });

    const addXPRef = useRef(addXP);
    useEffect(() => { addXPRef.current = addXP; }, [addXP]);

    // ── Initialize missions, then start real-time listener ─────────────────
    // KEY FIX: We use getDoc for initial setup (writes), then onSnapshot for
    // real-time updates ONLY. This prevents write-inside-listener recursion
    // which caused FIRESTORE INTERNAL ASSERTION FAILED (b815).
    useEffect(() => {
        if (!user?.uid) return;
        let mounted = true;
        let unsubscribe = null;

        const startListener = (ref) => {
            unsubscribe = onSnapshot(
                ref,
                (docSnap) => {
                    if (!mounted || !docSnap.exists()) return;
                    const data = docSnap.data();
                    setDailyMissions(data.daily?.tasks || freshTasks(DAILY_MISSIONS_TEMPLATE));
                    setWeeklyMissions(data.weekly?.tasks || freshTasks(WEEKLY_MISSIONS_TEMPLATE));
                    setAchievements(data.achievements || ACHIEVEMENTS_TEMPLATE.map(a => ({ ...a, earned: false })));
                    setUserStats(data.stats || { totalLessons: 0, totalLabs: 0, streakDays: 0 });
                },
                (error) => {
                    // Don't crash — just log. Transient network errors are normal.
                    console.warn('Missions listener error (non-fatal):', error?.code || error?.message);
                }
            );
        };

        const initMissions = async () => {
            const ref = doc(db, 'missions', user.uid);
            try {
                const snap = await getDoc(ref);
                if (!mounted) return;

                if (!snap.exists()) {
                    // First time: create document, then start listening
                    const initial = {
                        daily: { date: todayStr(), tasks: freshTasks(DAILY_MISSIONS_TEMPLATE) },
                        weekly: { weekStart: weekStart(), tasks: freshTasks(WEEKLY_MISSIONS_TEMPLATE) },
                        achievements: ACHIEVEMENTS_TEMPLATE.map(a => ({ ...a, earned: false })),
                        stats: { totalLessons: 0, totalLabs: 0, streakDays: 0 },
                    };
                    await setDoc(ref, initial);
                    if (!mounted) return;

                    // Set state from the initial data we just wrote
                    setDailyMissions(initial.daily.tasks);
                    setWeeklyMissions(initial.weekly.tasks);
                    setAchievements(initial.achievements);

                } else {
                    // Check for daily / weekly resets — write updates BEFORE listening
                    const data = snap.data();
                    const updates = {};

                    let daily = data.daily || { date: todayStr(), tasks: freshTasks(DAILY_MISSIONS_TEMPLATE) };
                    if (daily.date !== todayStr()) {
                        daily = { date: todayStr(), tasks: freshTasks(DAILY_MISSIONS_TEMPLATE) };
                        updates.daily = daily;
                    }

                    let weekly = data.weekly || { weekStart: weekStart(), tasks: freshTasks(WEEKLY_MISSIONS_TEMPLATE) };
                    if (weekly.weekStart !== weekStart()) {
                        weekly = { weekStart: weekStart(), tasks: freshTasks(WEEKLY_MISSIONS_TEMPLATE) };
                        updates.weekly = weekly;
                    }

                    if (Object.keys(updates).length > 0) {
                        await updateDoc(ref, updates);
                        if (!mounted) return;
                    }
                }

                // ✅ ONLY start the real-time listener AFTER all writes are done
                startListener(ref);

            } catch (err) {
                if (mounted) {
                    console.error('Missions init error:', err);
                }
            }
        };

        initMissions();

        return () => {
            mounted = false;
            if (unsubscribe) unsubscribe();
        };
    }, [user?.uid]);

    // ── checkMissions — called by addXP ───────────────────────────────────
    const checkMissions = useCallback(async (trigger) => {
        if (!user?.uid) return;
        const ref = doc(db, 'missions', user.uid);
        const snap = await getDoc(ref);
        if (!snap.exists()) return;
        const data = snap.data();

        const updates = {};
        let newStats = { ...(data.stats || userStats) };

        if (trigger === 'LESSON_COMPLETE') newStats.totalLessons = (newStats.totalLessons || 0) + 1;
        if (trigger === 'LAB_COMPLETE') newStats.totalLabs = (newStats.totalLabs || 0) + 1;
        if (trigger === 'DAILY_LOGIN') newStats.streakDays = (newStats.streakDays || 0) + 1;

        const newDaily = (data.daily?.tasks || freshTasks(DAILY_MISSIONS_TEMPLATE)).map(task => {
            if (task.completed || task.trigger !== trigger) return task;
            const updated = { ...task, current: Math.min(task.current + 1, task.target) };
            if (updated.current >= updated.target) {
                updated.completed = true;
                setTimeout(() => {
                    addXPRef.current(updated.xp, 'MISSION_DAILY');
                    pushXPToast({ amount: updated.xp, reason: `Missiya: ${updated.title}` });
                }, 300);
            }
            return updated;
        });
        updates['daily.tasks'] = newDaily;

        const newWeekly = (data.weekly?.tasks || freshTasks(WEEKLY_MISSIONS_TEMPLATE)).map(task => {
            if (task.completed || task.trigger !== trigger) return task;
            const updated = { ...task, current: Math.min(task.current + 1, task.target) };
            if (updated.current >= updated.target) {
                updated.completed = true;
                setTimeout(() => {
                    addXPRef.current(updated.xp, 'MISSION_WEEKLY');
                    pushXPToast({ amount: updated.xp, reason: `Missiya: ${updated.title}` });
                }, 600);
            }
            return updated;
        });
        updates['weekly.tasks'] = newWeekly;

        const newAchievements = (data.achievements || ACHIEVEMENTS_TEMPLATE.map(a => ({ ...a, earned: false }))).map(ach => {
            if (ach.earned || ach.trigger !== trigger) return ach;
            let condMet = true;
            if (ach.conditionKey === 'totalLessons') condMet = newStats.totalLessons >= ach.conditionVal;
            if (ach.conditionKey === 'totalLabs') condMet = newStats.totalLabs >= ach.conditionVal;
            if (ach.conditionKey === 'streakDays') condMet = newStats.streakDays >= ach.conditionVal;
            if (condMet) {
                setTimeout(() => {
                    addXPRef.current(ach.xp, 'ACHIEVEMENT');
                    pushXPToast({ amount: ach.xp, reason: `🏆 Yutuq: ${ach.title}` });
                }, 1000);
                return { ...ach, earned: true };
            }
            return ach;
        });
        updates['achievements'] = newAchievements;
        updates['stats'] = newStats;

        await updateDoc(ref, updates).catch(err => console.error('checkMissions write error:', err));
    }, [user?.uid, userStats]);

    useEffect(() => {
        registerMissionsChecker(checkMissions);
    }, [checkMissions, registerMissionsChecker]);

    const updateStats = useCallback(async (statUpdates) => {
        if (!user?.uid) return;
        const ref = doc(db, 'missions', user.uid);
        const newStats = { ...userStats, ...statUpdates };
        await updateDoc(ref, { stats: newStats }).catch(() => { });
    }, [user?.uid, userStats]);

    return (
        <MissionsContext.Provider value={{ dailyMissions, weeklyMissions, achievements, userStats, checkMissions, updateStats }}>
            {children}
        </MissionsContext.Provider>
    );
}

export const useMissions = () => {
    const ctx = useContext(MissionsContext);
    if (!ctx) throw new Error('useMissions must be used within MissionsProvider');
    return ctx;
};
