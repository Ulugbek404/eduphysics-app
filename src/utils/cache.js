/**
 * NurFizika — Smart localStorage Cache
 * Firestore o'qishlarini 90% kamaytiradi
 */

const CACHE_PREFIX = 'nf_';

// ─── TTL Konstantlar ──────────────────────────────────────────────────────────
export const TTL = {
    USER_DATA: 10 * 60 * 1000,  // 10 daqiqa (tez-tez o'zgarmaydi)
    PROGRESS: 5 * 60 * 1000,  //  5 daqiqa (dars tugalganda yangilanadi)
    LEADERBOARD: 3 * 60 * 1000,  //  3 daqiqa (ko'p o'qiladi)
    ASSIGNMENTS: 15 * 60 * 1000,  // 15 daqiqa (sekin o'zgaradi)
    STATIC: Infinity,         // Abadiy (chapters, topics)
};

// ─── Cache O'qish ─────────────────────────────────────────────────────────────
export const getCache = (key) => {
    try {
        const raw = localStorage.getItem(CACHE_PREFIX + key);
        if (!raw) return null;
        const { data, timestamp, ttl } = JSON.parse(raw);
        if (ttl === Infinity || ttl === null) return data;
        if (Date.now() - timestamp > ttl) {
            localStorage.removeItem(CACHE_PREFIX + key);
            return null; // Eskirgan
        }
        return data;
    } catch {
        return null;
    }
};

// ─── Cache Yozish ─────────────────────────────────────────────────────────────
export const setCache = (key, data, ttl = TTL.USER_DATA) => {
    try {
        localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({
            data,
            timestamp: Date.now(),
            ttl: ttl === Infinity ? null : ttl,
        }));
    } catch (e) {
        // localStorage to'lib ketsa — eski cache tozalanadi
        clearOldCache();
        try {
            localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({
                data, timestamp: Date.now(), ttl: ttl === Infinity ? null : ttl,
            }));
        } catch { }
    }
};

// ─── Bitta Cache O'chirish ────────────────────────────────────────────────────
export const clearCache = (key) => {
    localStorage.removeItem(CACHE_PREFIX + key);
};

// ─── Foydalanuvchiga Oid Barcha Cache O'chirish (logout da) ──────────────────
export const clearUserCache = (uid) => {
    const keys = [
        `user_${uid}`,
        `progress_${uid}`,
        `missions_${uid}`,
        `xpLogs_${uid}`,
        `leaderboard_global_weekly`,
        `leaderboard_global_monthly`,
        `leaderboard_global_all`,
    ];
    keys.forEach(k => localStorage.removeItem(CACHE_PREFIX + k));
};

// ─── Barcha NurFizika Cache Tozalash ─────────────────────────────────────────
export const clearAllCache = () => {
    Object.keys(localStorage)
        .filter(k => k.startsWith(CACHE_PREFIX))
        .forEach(k => localStorage.removeItem(k));
};

// ─── Eski Cache Tozalash (localStorage to'lganda) ────────────────────────────
const clearOldCache = () => {
    const entries = Object.keys(localStorage)
        .filter(k => k.startsWith(CACHE_PREFIX))
        .map(k => {
            try {
                const { timestamp } = JSON.parse(localStorage.getItem(k));
                return { key: k, timestamp: timestamp || 0 };
            } catch {
                return { key: k, timestamp: 0 };
            }
        })
        .sort((a, b) => a.timestamp - b.timestamp);
    // Eng eski 5 ta cache o'chiriladi
    entries.slice(0, 5).forEach(e => localStorage.removeItem(e.key));
};

// ─── Smart Fetch (asosiy helper) ─────────────────────────────────────────────
/**
 * Cache bor bo'lsa cache qaytaradi, yo'q bo'lsa Firestore'dan o'qib cache'ga yozadi.
 * @param {string} key - cache kaliti
 * @param {function} fetchFn - async funksiya (Firestore read)
 * @param {number} ttl - TTL.USER_DATA, TTL.PROGRESS, va h.k.
 */
export const cachedFetch = async (key, fetchFn, ttl = TTL.USER_DATA) => {
    const cached = getCache(key);
    if (cached !== null) return cached;       // ✅ Cache hit — Firestore o'qilmadi
    const data = await fetchFn();             // Firestore dan o'qish
    if (data !== null && data !== undefined) {
        setCache(key, data, ttl);
    }
    return data;
};
