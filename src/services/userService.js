import { doc, getDoc, setDoc, updateDoc, increment, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * User progress olish yoki yaratish
 * @param {string} userId - User ID
 * @param {object} userInfo - User ma'lumotlari (displayName, email, photoURL)
 * @returns {Promise<object>} User progress data
 */
export async function getUserProgress(userId, userInfo = {}) {
    try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Mavjud progress qaytarish
            return docSnap.data();
        } else {
            // Yangi user uchun default progress yaratish
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
                lastLoginAt: serverTimestamp()
            };

            await setDoc(docRef, defaultData);
            console.log('New user progress created:', userId);
            return defaultData;
        }
    } catch (error) {
        console.error('Error getting user progress:', error);
        throw error;
    }
}

/**
 * XP qo'shish
 * @param {string} userId - User ID
 * @param {number} xpAmount - Qo'shiladigan XP miqdori
 */
export async function addUserXP(userId, xpAmount) {
    try {
        const docRef = doc(db, 'users', userId);
        await updateDoc(docRef, {
            xp: increment(xpAmount),
            lastLoginAt: serverTimestamp()
        });
        console.log(`Added ${xpAmount} XP to user ${userId}`);
    } catch (error) {
        console.error('Error adding XP:', error);
        throw error;
    }
}

/**
 * Level yangilash
 * @param {string} userId - User ID
 * @param {number} newLevel - Yangi level
 */
export async function updateUserLevel(userId, newLevel) {
    try {
        const docRef = doc(db, 'users', userId);
        await updateDoc(docRef, {
            level: newLevel
        });
        console.log(`User ${userId} level updated to ${newLevel}`);
    } catch (error) {
        console.error('Error updating level:', error);
        throw error;
    }
}

/**
 * Darsni tugatish
 * @param {string} userId - User ID
 * @param {string} lessonId - Dars ID
 */
export async function markLessonComplete(userId, lessonId) {
    try {
        const docRef = doc(db, 'users', userId);
        await updateDoc(docRef, {
            completedLessons: arrayUnion(lessonId)
        });
        console.log(`Lesson ${lessonId} marked complete for user ${userId}`);
    } catch (error) {
        console.error('Error marking lesson complete:', error);
        throw error;
    }
}

/**
 * Quiz natijasini saqlash
 * @param {string} userId - User ID
 * @param {object} quizData - Quiz ma'lumotlari {quizId, score, totalQuestions, topic}
 */
export async function saveQuizResult(userId, quizData) {
    try {
        const docRef = doc(db, 'users', userId);
        const result = {
            ...quizData,
            completedAt: serverTimestamp()
        };

        await updateDoc(docRef, {
            quizResults: arrayUnion(result)
        });
        console.log(`Quiz result saved for user ${userId}:`, quizData);
    } catch (error) {
        console.error('Error saving quiz result:', error);
        throw error;
    }
}

/**
 * Achievement qo'shish
 * @param {string} userId - User ID
 * @param {string} achievementId - Achievement ID
 */
export async function addAchievement(userId, achievementId) {
    try {
        const docRef = doc(db, 'users', userId);
        await updateDoc(docRef, {
            achievements: arrayUnion(achievementId)
        });
        console.log(`Achievement ${achievementId} added for user ${userId}`);
    } catch (error) {
        console.error('Error adding achievement:', error);
        throw error;
    }
}

/**
 * Streak yangilash (kunlik kirish)
 * @param {string} userId - User ID
 */
export async function updateStreak(userId) {
    try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const lastLogin = data.lastLoginAt?.toDate();
            const now = new Date();

            // Oxirgi kirishdan 1 kun o'tganmi?
            const oneDayMs = 24 * 60 * 60 * 1000;
            const timeDiff = now - lastLogin;

            let newStreak = data.streak || 0;

            if (timeDiff < oneDayMs) {
                // Bugun allaqachon kirgan
                return;
            } else if (timeDiff < 2 * oneDayMs) {
                // Kecha kirgan - streak davom etadi
                newStreak += 1;
            } else {
                // 1 kundan ko'p vaqt o'tgan - streak yangilanadi
                newStreak = 1;
            }

            await updateDoc(docRef, {
                streak: newStreak,
                lastLoginAt: serverTimestamp()
            });

            console.log(`Streak updated to ${newStreak} for user ${userId}`);
        }
    } catch (error) {
        console.error('Error updating streak:', error);
        throw error;
    }
}

/**
 * User ma'lumotlarini yangilash
 * @param {string} userId - User ID
 * @param {object} updates - Yangilanadigan ma'lumotlar
 */
export async function updateUserData(userId, updates) {
    try {
        const docRef = doc(db, 'users', userId);
        await updateDoc(docRef, {
            ...updates,
            lastLoginAt: serverTimestamp()
        });
        console.log(`User data updated for ${userId}`);
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error;
    }
}
