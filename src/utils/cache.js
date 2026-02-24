/**
 * NurFizika — localStorage cache yordamchisi
 * Firestore o'qishlarini kamaytirish uchun
 */

const CACHE_TTL = 5 * 60 * 1000; // 5 daqiqa
const PREFIX = 'nf_cache_';

/**
 * Ma'lumotni cache'dan oladi. Agar cache'da bo'lmasa yoki eskirgan bo'lsa,
 * fetchFn() ni chaqirib yangi ma'lumot oladi va cache'ga yozadi.
 *
 * @param {string} key - cache kaliti
 * @param {function} fetchFn - async funksiya (Firestore read)
 * @param {number} ttl - amal qilish muddati (ms), default 5 daqiqa
 * @returns {Promise<any>} - ma'lumot
 */
export const getCached = async (key, fetchFn, ttl = CACHE_TTL) => {
    try {
        const raw = localStorage.getItem(PREFIX + key);
        if (raw) {
            const { data, timestamp } = JSON.parse(raw);
            if (Date.now() - timestamp < ttl) {
                return data; // ✅ cache ishlatildi — Firestore o'qilmadi
            }
        }
    } catch (e) {
        // Parse xatosi bo'lsa, cache'ni o'chirib yangi o'qiymiz
        localStorage.removeItem(PREFIX + key);
    }

    // Cache yo'q yoki eskirgan — yangi o'qiymiz
    const data = await fetchFn();
    try {
        localStorage.setItem(PREFIX + key, JSON.stringify({
            data,
            timestamp: Date.now(),
        }));
    } catch (e) {
        console.warn('Cache yozish xatosi:', e);
    }
    return data;
};

/**
 * Bitta cache yozuvini tozalash
 * @param {string} key
 */
export const clearCache = (key) => {
    localStorage.removeItem(PREFIX + key);
};

/**
 * Barcha NurFizika cache'larini tozalash
 */
export const clearAllCache = () => {
    Object.keys(localStorage)
        .filter(k => k.startsWith(PREFIX))
        .forEach(k => localStorage.removeItem(k));
};

/**
 * Cache'ga bevosita ma'lumot yozish (masalan, onSnapshot'dan)
 * @param {string} key
 * @param {any} data
 */
export const setCache = (key, data) => {
    try {
        localStorage.setItem(PREFIX + key, JSON.stringify({
            data,
            timestamp: Date.now(),
        }));
    } catch (e) {
        console.warn('Cache yozish xatosi:', e);
    }
};
