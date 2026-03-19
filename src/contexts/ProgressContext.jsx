import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import {
    doc, onSnapshot, updateDoc, arrayUnion, serverTimestamp, setDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { updateUserStats, trackTodayActivity } from '../services/userService';

const ProgressContext = createContext();

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgress must be used within ProgressProvider');
    }
    return context;
};

export const ProgressProvider = ({ children }) => {
    const { user } = useAuth();

    const [progress, setProgress] = useState({
        userId: null,
        xp: 0,
        level: 1,
        streak: 0,
        completedLessons: [],
        quizResults: [],
        achievements: [],
        stats: {
            totalLessonsCompleted: 0,
            totalTestsCompleted: 0,
            totalLabsCompleted: 0,
            totalTimeSpent: 0,
            averageTestScore: 0,
        },
        assessmentCompleted: false,
        assessmentResults: null,
    });
    const [loading, setLoading] = useState(true);

    // ── Firestore real-time listener ──────────────────────────────────────────
    useEffect(() => {
        if (!user?.uid) {
            setLoading(false);
            return;
        }

        const unsub = onSnapshot(
            doc(db, 'users', user.uid),
            (snap) => {
                if (snap.exists()) {
                    const d = snap.data();
                    setProgress({
                        userId: user.uid,
                        xp: d.xp || 0,
                        level: d.level || 1,
                        streak: d.streak || d.streakDays || 0,
                        completedLessons: d.completedLessons || [],
                        quizResults: d.quizResults || [],
                        achievements: d.achievements || [],
                        stats: {
                            totalLessonsCompleted: d.stats?.totalLessonsCompleted || (d.completedLessons?.length ?? 0),
                            totalTestsCompleted: d.stats?.testsSolved || 0,
                            totalLabsCompleted: d.stats?.completedLabs || 0,
                            totalTimeSpent: d.stats?.timeSpent || 0,
                            averageTestScore: d.stats?.averageScore || 0,
                        },
                        assessmentCompleted: d.assessmentCompleted || false,
                        assessmentResults: d.assessmentResults || null,
                    });
                }
                setLoading(false);
            },
            (err) => {
                console.warn('ProgressContext listener error:', err?.code || err?.message);
                setLoading(false);
            }
        );

        return () => unsub();
    }, [user?.uid]);

    // ── Complete lesson ────────────────────────────────────────────────────────
    const completeLesson = useCallback(async (lessonId) => {
        if (!user?.uid) return;
        try {
            await updateDoc(doc(db, 'users', user.uid), {
                completedLessons: arrayUnion(lessonId),
            });
            await trackTodayActivity(user.uid);
            // stats.totalLessonsCompleted Firestore trigger orqali yangilanadi (onSnapshot)
        } catch (err) {
            console.error('completeLesson error:', err);
        }
    }, [user?.uid]);

    // ── Complete test ──────────────────────────────────────────────────────────
    const completeTest = useCallback(async (testId, score) => {
        if (!user?.uid) return;
        try {
            await updateDoc(doc(db, 'users', user.uid), {
                quizResults: arrayUnion({ testId, score, completedAt: new Date().toISOString() }),
            });
            await updateUserStats(user.uid, {
                testsSolved: 1,
                totalScore: score,
            });
            await trackTodayActivity(user.uid);
        } catch (err) {
            console.error('completeTest error:', err);
        }
    }, [user?.uid]);

    // ── Complete lab ───────────────────────────────────────────────────────────
    const completeLab = useCallback(async (labId) => {
        if (!user?.uid) return;
        try {
            await updateDoc(doc(db, 'users', user.uid), {
                completedLabs: arrayUnion(labId),
            });
            await updateUserStats(user.uid, { completedLabs: 1 });
            await trackTodayActivity(user.uid);
        } catch (err) {
            console.error('completeLab error:', err);
        }
    }, [user?.uid]);

    // ── Track daily activity ───────────────────────────────────────────────────
    const trackDailyActivity = useCallback(async () => {
        if (!user?.uid) return;
        try {
            const today = new Date().toISOString().split('T')[0];
            // activeDates array ga qo'shamiz (AdminDashboard streak uchun)
            await updateDoc(doc(db, 'users', user.uid), {
                activeDates: arrayUnion(today),
                lastActiveAt: serverTimestamp(),
            });
        } catch (err) {
            console.error('trackDailyActivity error:', err);
        }
    }, [user?.uid]);

    // ── Unlock achievement ──────────────────────────────────────────────────────
    const unlockAchievement = useCallback(async (achievementId) => {
        if (!user?.uid) return;
        try {
            await updateDoc(doc(db, 'users', user.uid), {
                achievements: arrayUnion(achievementId),
            });
        } catch (err) {
            console.error('unlockAchievement error:', err);
        }
    }, [user?.uid]);

    const value = {
        progress,
        loading,
        completeLesson,
        completeTest,
        completeLab,
        trackDailyActivity,
        unlockAchievement,
    };

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
};
