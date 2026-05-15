/**
 * rateLimiter.js — Mijoz tomonida so'rovlarni cheklash
 * NurFizika loyihasi uchun
 *
 * Ishlatish:
 *   import { checkRateLimit, rateLimiters } from '../utils/rateLimiter';
 *
 *   // AI chat uchun:
 *   if (!checkRateLimit(rateLimiters.aiChat, userId)) {
 *     showToast("Juda ko'p so'rov! Bir daqiqa kutib turing.", 'error');
 *     return;
 *   }
 */

// ─── Konfiguratsiya ─────────────────────────────────────────────────────────
const LIMITS = {
  // AI chat: har 60 sekundda max 5 ta so'rov
  aiChat: { maxRequests: 5, windowMs: 60_000, key: 'rl_ai_chat' },

  // Login urinishlari: har 5 daqiqada max 5 ta
  login: { maxRequests: 5, windowMs: 5 * 60_000, key: 'rl_login' },

  // Parol o'zgartirish: har 15 daqiqada max 3 ta
  passwordChange: { maxRequests: 3, windowMs: 15 * 60_000, key: 'rl_pass_change' },

  // Contact form yuborish: har soatda max 3 ta
  contactForm: { maxRequests: 3, windowMs: 60 * 60_000, key: 'rl_contact' },

  // Umumiy form: har 60 sekundda max 10 ta
  generalForm: { maxRequests: 10, windowMs: 60_000, key: 'rl_general' },

  // Homework submit: har soatda max 10 ta
  homework: { maxRequests: 10, windowMs: 60 * 60_000, key: 'rl_homework' },
};

// ─── Asosiy tekshirish funksiyasi ─────────────────────────────────────────────
/**
 * So'rovni bajarishga ruxsat borligini tekshiradi.
 * @param {object} limiter - LIMITS ichidagi konfiguratsiya (masalan, LIMITS.aiChat)
 * @param {string} [userId] - Foydalanuvchi ID (faqat user'ga bog'liq limit uchun)
 * @returns {boolean} - true = bajarsa bo'ladi, false = bloklangan
 */
export function checkRateLimit(limiter, userId = 'anonymous') {
  const storageKey = `${limiter.key}_${userId}`;
  const now = Date.now();

  let state;
  try {
    state = JSON.parse(sessionStorage.getItem(storageKey) || 'null');
  } catch {
    state = null;
  }

  // Yangi oyna boshlash yoki eski oynani yangilash
  if (!state || now - state.windowStart >= limiter.windowMs) {
    state = { windowStart: now, count: 1 };
    sessionStorage.setItem(storageKey, JSON.stringify(state));
    return true;
  }

  // Limit ichida — ruxsat
  if (state.count < limiter.maxRequests) {
    state.count++;
    sessionStorage.setItem(storageKey, JSON.stringify(state));
    return true;
  }

  // Limit oshib ketdi — bloklangan
  return false;
}

/**
 * Qolgan vaqtni soniyada qaytaradi (UI da ko'rsatish uchun)
 * @param {object} limiter
 * @param {string} userId
 * @returns {number} - soniyalar
 */
export function getRemainingCooldown(limiter, userId = 'anonymous') {
  const storageKey = `${limiter.key}_${userId}`;
  try {
    const state = JSON.parse(sessionStorage.getItem(storageKey) || 'null');
    if (!state) return 0;
    const elapsed = Date.now() - state.windowStart;
    const remaining = limiter.windowMs - elapsed;
    return remaining > 0 ? Math.ceil(remaining / 1000) : 0;
  } catch {
    return 0;
  }
}

/**
 * Limitni qayta tiklash (masalan, muvaffaqiyatli login dan keyin)
 * @param {object} limiter
 * @param {string} userId
 */
export function resetRateLimit(limiter, userId = 'anonymous') {
  const storageKey = `${limiter.key}_${userId}`;
  sessionStorage.removeItem(storageKey);
}

// ─── Export: tayyor konfiguratsiyalar ──────────────────────────────────────────
export const rateLimiters = LIMITS;

// ─── Hook: React komponentlarda oson ishlatish ────────────────────────────────
import { useCallback } from 'react';

/**
 * Rate limiting uchun React hook
 * @example
 * const { check, remainingTime } = useRateLimit(rateLimiters.aiChat, user?.uid);
 * if (!check()) { alert(`${remainingTime()}s kutib turing`); return; }
 */
export function useRateLimit(limiter, userId) {
  const check = useCallback(() => {
    return checkRateLimit(limiter, userId || 'anonymous');
  }, [limiter, userId]);

  const remainingTime = useCallback(() => {
    return getRemainingCooldown(limiter, userId || 'anonymous');
  }, [limiter, userId]);

  return { check, remainingTime };
}
