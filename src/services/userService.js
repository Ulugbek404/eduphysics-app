/**
 * NurFizika — userService.js
 * Barcha Firestore operatsiyalari cache orqali
 */
import {
    doc, collection, getDoc, setDoc, updateDoc,
    increment, arrayUnion, serverTimestamp, getDocs,
    query, orderBy, limit, addDoc
} from 'firebase/firestore';

import { db } from '../firebase';
import { cachedFetch, clearCache, clearUserCache, setCache, TTL } from '../utils/cache';

// ─── User Ma'lumotlari ────────────────────────────────────────────────────────

/**
 * User progress olish yoki yaratish — CACHE BILAN
 */
export async function getUserProgress(userId, userInfo = {}) {
    return cachedFetch(
        `user_${userId}`,
        async () => {
            try {
                const docRef = doc(db, 'users', userId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return docSnap.data();
                } else {
                    const defaultData = {
                        displayName: userInfo.displayName || 'User',
                        email: userInfo.email || '',
                        photoURL: userInfo.photoURL || '',
                        xp: 0,
                        level: 1,
                        streak: 0,
                        completedLessons: [],
                        quizResults: [],
                        achievements: [],
                        createdAt: serverTimestamp(),
                        lastLoginAt: serverTimestamp(),
                    };
                    await setDoc(docRef, defaultData);
                    return defaultData;
                }
            } catch (error) {
                console.error('getUserProgress error:', error);
                throw error;
            }
        },
        TTL.USER_DATA
    );
}

// ─── XP Qo'shish ─────────────────────────────────────────────────────────────

/**
 * XP qo'shish — cache tozalanadi
 */
export async function addUserXP(userId, xpAmount) {
    try {
        const docRef = doc(db, 'users', userId);
        await updateDoc(docRef, {
            xp: increment(xpAmount),
            lastLoginAt: serverTimestamp(),
        });
        clearCache(`user_${userId}`); // Yangi XP ko'rinishi uchun
    } catch (error) {
        console.error('addUserXP error:', error);
        throw error;
    }
}

// ─── Darsni Tugatish ─────────────────────────────────────────────────────────

/**
 * Darsni tugallash — cache tozalanadi
 */
export async function markLessonComplete(userId, lessonId) {
    try {
        const docRef = doc(db, 'users', userId);
        await updateDoc(docRef, {
            completedLessons: arrayUnion(lessonId),
        });
        clearCache(`user_${userId}`); // Progress yangilangani uchun
    } catch (error) {
        console.error('markLessonComplete error:', error);
        throw error;
    }
}

// ─── Quiz Natijasini Saqlash ──────────────────────────────────────────────────

export async function saveQuizResult(userId, quizData) {
    try {
        const docRef = doc(db, 'users', userId);
        await updateDoc(docRef, {
            quizResults: arrayUnion({ ...quizData, completedAt: serverTimestamp() }),
        });
        clearCache(`user_${userId}`);
    } catch (error) {
        console.error('saveQuizResult error:', error);
        throw error;
    }
}

// ─── Achievement ──────────────────────────────────────────────────────────────

export async function addAchievement(userId, achievementId) {
    try {
        const docRef = doc(db, 'users', userId);
        await updateDoc(docRef, {
            achievements: arrayUnion(achievementId),
        });
        clearCache(`user_${userId}`);
    } catch (error) {
        console.error('addAchievement error:', error);
        throw error;
    }
}

// ─── Streak Yangilash ─────────────────────────────────────────────────────────

export async function updateStreak(userId) {
    try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return;

        const data = docSnap.data();
        const lastLogin = data.lastLoginAt?.toDate();
        const now = new Date();
        const oneDayMs = 24 * 60 * 60 * 1000;
        const timeDiff = now - lastLogin;

        let newStreak = data.streak || 0;
        if (timeDiff < oneDayMs) return; // Bugun allaqachon kirgan
        else if (timeDiff < 2 * oneDayMs) newStreak += 1;
        else newStreak = 1;

        await updateDoc(docRef, {
            streak: newStreak,
            lastLoginAt: serverTimestamp(),
        });
        clearCache(`user_${userId}`);
    } catch (error) {
        console.error('updateStreak error:', error);
        throw error;
    }
}

// ─── User Ma'lumotlarini Yangilash ───────────────────────────────────────────

export async function updateUserData(userId, updates) {
    try {
        const docRef = doc(db, 'users', userId);
        await updateDoc(docRef, { ...updates, lastLoginAt: serverTimestamp() });
        clearCache(`user_${userId}`);
    } catch (error) {
        console.error('updateUserData error:', error);
        throw error;
    }
}

// ─── Level Yangilash ──────────────────────────────────────────────────────────

export async function updateUserLevel(userId, newLevel) {
    try {
        await updateDoc(doc(db, 'users', userId), { level: newLevel });
        clearCache(`user_${userId}`);
    } catch (error) {
        console.error('updateUserLevel error:', error);
        throw error;
    }
}

// ─── Region Yangilash ─────────────────────────────────────────────────────────

export async function updateUserRegion(uid, region) {
    try {
        await updateDoc(doc(db, 'users', uid), { region });
        clearCache(`user_${uid}`);
    } catch (error) {
        console.error('updateUserRegion error:', error);
    }
}

// ─── Leaderboard Yangilash ────────────────────────────────────────────────────

export async function updateLeaderboard(uid, userData) {
    try {
        const { displayName, totalXP, weeklyXP = 0, monthlyXP = 0,
            dailyXP = 0, level = 1, region = '', avatarColor = '' } = userData;
        const payload = {
            uid,
            displayName: displayName || 'Foydalanuvchi',
            totalXP: totalXP || 0,
            weeklyXP, monthlyXP, dailyXP,
            level, region, avatarColor,
            updatedAt: serverTimestamp(),
        };

        await setDoc(doc(db, 'leaderboard', 'global', 'users', uid), payload, { merge: true });
        if (region) {
            await setDoc(doc(db, 'leaderboard', region, 'users', uid), payload, { merge: true });
        }

        // Leaderboard cache tozalanadi — yangi ma'lumot ko'rinishi uchun
        clearCache('leaderboard_global_weekly');
        clearCache('leaderboard_global_monthly');
        clearCache('leaderboard_global_all');
        if (region) {
            clearCache(`leaderboard_${region}_weekly`);
        }
    } catch (error) {
        console.error('updateLeaderboard error:', error);
    }
}

// ─── Leaderboard Olish — CACHE BILAN ─────────────────────────────────────────

export async function getLeaderboard(type = 'global', timeFilter = 'weekly') {
    const cacheKey = `leaderboard_${type}_${timeFilter}`;
    return cachedFetch(
        cacheKey,
        async () => {
            const orderField = timeFilter === 'weekly' ? 'weeklyXP'
                : timeFilter === 'monthly' ? 'monthlyXP' : 'totalXP';
            const q = query(
                collection(db, 'leaderboard', type, 'users'),
                orderBy(orderField, 'desc'),
                limit(50)
            );
            const snap = await getDocs(q);
            return snap.docs.map(d => d.data());
        },
        TTL.LEADERBOARD
    );
}

// ─── Logout — barcha user cache tozalanadi ────────────────────────────────────

export function onUserLogout(uid) {
    clearUserCache(uid);
}

// ─── Stats Yangilash — Firestore increment ────────────────────────────────────

/**
 * Foydalanuvchi statistikasini Firestore increment bilan yangilaydi.
 * testsSolved, timeSpent, totalScore, completedLabs
 */
export async function updateUserStats(userId, statsUpdate) {
    try {
        const userRef = doc(db, 'users', userId);
        const updates = {};

        if (statsUpdate.testsSolved)
            updates['stats.testsSolved'] = increment(statsUpdate.testsSolved);
        if (statsUpdate.timeSpent)
            updates['stats.timeSpent'] = increment(statsUpdate.timeSpent);
        if (statsUpdate.totalScore)
            updates['stats.totalScore'] = increment(statsUpdate.totalScore);
        if (statsUpdate.completedLabs)
            updates['stats.completedLabs'] = increment(statsUpdate.completedLabs);

        if (Object.keys(updates).length > 0) {
            await updateDoc(userRef, updates);
        }
    } catch (err) {
        console.error('updateUserStats error:', err);
    }
}

// ─── Assessment Natijasini Saqlash ────────────────────────────────────────────

/**
 * Assessment natijasini Firestore ga saqlaydi (localStorage emas!)
 */
export async function saveAssessmentResult(userId, results) {
    try {
        await updateDoc(doc(db, 'users', userId), {
            assessmentCompleted: true,
            assessmentResults: results,
            assessmentCompletedAt: serverTimestamp(),
        });
        clearCache(`user_${userId}`);
    } catch (err) {
        console.error('saveAssessmentResult error:', err);
    }
}

// ─── Stats Maydonini Ishga Tushirish ─────────────────────────────────────────

/**
 * Agar stats maydoni yo'q bo'lsa — standart qiymatlar bilan yaratadi.
 * Birinchi kirish da avtomatik chaqiriladi.
 */
export async function initUserStats(userId) {
    try {
        await updateDoc(doc(db, 'users', userId), {
            'stats.timeSpent': 0,
            'stats.testsSolved': 0,
            'stats.totalScore': 0,
            'stats.completedLabs': 0,
            'stats.averageScore': 0,
        });
        clearCache(`user_${userId}`);
    } catch (err) {
        console.error('initUserStats error:', err);
    }
}
// ─── Streak hisoblash (ichki yordamchi) ──────────────────────────────────────

function calculateStreak(activeDates) {
    if (!activeDates?.length) return 0;
    // Noyob sanalar, katta → kichik tartiblangan
    const unique = [...new Set(activeDates)].sort((a, b) => b.localeCompare(a));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let streak = 0;
    let current = new Date(today);
    for (const dateStr of unique) {
        const d = new Date(dateStr);
        d.setHours(0, 0, 0, 0);
        if (d.getTime() === current.getTime()) {
            streak++;
            current.setDate(current.getDate() - 1);
        } else if (d < current) {
            break; // ketma-ketlik uzildi
        }
    }
    return streak;
}

// ─── Bugungi Faollikni Belgilash ──────────────────────────────────────────────

/**
 * Foydalanuvchi har sessiyada bu funksiyani chaqiradi:
 *  - activeDates ga bugungi sanani qo'shadi (arrayUnion — takrorlanmaydi)
 *  - Streak va bestStreak ni yangilaydi
 */
export async function trackTodayActivity(userId) {
    if (!userId) return;
    const today = new Date().toISOString().split('T')[0]; // "2026-03-06"
    try {
        const userRef = doc(db, 'users', userId);
        // 1. Avval activeDates ga today ni qo'shamiz
        await updateDoc(userRef, { activeDates: arrayUnion(today) });

        // 2. Yangilangan doc ni olib streak hisoblaymiz
        const snap = await getDoc(userRef);
        if (!snap.exists()) return;
        const data = snap.data();
        const activeDates = data.activeDates || [];
        const newStreak = calculateStreak(activeDates);
        const currentBest = data.bestStreak || 0;

        // 3. streakDays, bestStreak, lastActiveDate yangilash
        await updateDoc(userRef, {
            streakDays: newStreak,
            lastActiveDate: today,
            bestStreak: newStreak > currentBest ? newStreak : currentBest,
        });
        clearCache(`user_${userId}`);
    } catch (err) {
        console.error('trackTodayActivity error:', err);
    }
}
