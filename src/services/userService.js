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
