/**
 * sanitize.js — Input tozalash va xavfsizlik
 * NurFizika loyihasi uchun
 *
 * Ishlatish:
 *   import { sanitizeText, sanitizeHtml, validateEmail } from '../utils/sanitize';
 *
 *   const cleanName = sanitizeText(userInput, { maxLength: 50 });
 */

// ─── Matn tozalash ────────────────────────────────────────────────────────────

/**
 * Oddiy matn inputini tozalaydi
 * - HTML teglarni olib tashlaydi
 * - Xavfli belgilarni escape qiladi
 * - Uzunlikni cheklaydi
 *
 * @param {string} value - kiruvchi matn
 * @param {object} options
 * @param {number} [options.maxLength=500] - maksimal uzunlik
 * @param {boolean} [options.allowNewlines=false] - yangi satrga ruxsat
 * @returns {string}
 */
export function sanitizeText(value, { maxLength = 500, allowNewlines = false } = {}) {
  if (typeof value !== 'string') return '';

  let cleaned = value
    // HTML teglarni olib tashlash
    .replace(/<[^>]*>/g, '')
    // Script injection oldini olish
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    // Maxsus HTML belgilarni escape
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .trim();

  if (!allowNewlines) {
    cleaned = cleaned.replace(/[\r\n]/g, ' ');
  }

  return cleaned.slice(0, maxLength);
}

/**
 * Ism-familiya uchun tozalash (faqat harflar, bo'shliq, apostrophe)
 * @param {string} value
 * @returns {string}
 */
export function sanitizeName(value) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/[^a-zA-ZА-Яа-яёЁOʻoʻGʻgʻ'\- ]/g, '')
    .trim()
    .slice(0, 100);
}

/**
 * Maktab nomi uchun tozalash
 * @param {string} value
 * @returns {string}
 */
export function sanitizeSchool(value) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/[^a-zA-ZА-Яа-яёЁOʻoʻGʻgʻ0-9'\-. №]/g, '')
    .trim()
    .slice(0, 150);
}

/**
 * Telefon raqamini tozalash — faqat +998 XX XXX XX XX format
 * @param {string} value
 * @returns {string}
 */
export function sanitizePhone(value) {
  if (typeof value !== 'string') return '';
  // Faqat raqamlar, +, bo'shliq
  const cleaned = value.replace(/[^+\d ]/g, '').trim();
  return cleaned.slice(0, 17); // +998 90 123 45 67 = 17 ta belgi
}

/**
 * Bio (o'zingiz haqingizda) uchun tozalash
 * @param {string} value
 * @returns {string}
 */
export function sanitizeBio(value) {
  return sanitizeText(value, { maxLength: 300, allowNewlines: false });
}

/**
 * AI chat message uchun tozalash
 * @param {string} value
 * @returns {string}
 */
export function sanitizeChatMessage(value) {
  return sanitizeText(value, { maxLength: 2000, allowNewlines: true });
}

// ─── Validatsiya ──────────────────────────────────────────────────────────────

/**
 * Email manzilni tekshiradi
 * @param {string} email
 * @returns {boolean}
 */
export function validateEmail(email) {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim()) && email.length <= 254;
}

/**
 * O'zbek telefon raqamini tekshiradi (+998 XX XXX XX XX)
 * @param {string} phone
 * @returns {boolean}
 */
export function validateUzPhone(phone) {
  if (!phone) return true; // bo'sh bo'lsa OK (majburiy emas)
  const cleaned = phone.replace(/\D/g, '');
  return /^998\d{9}$/.test(cleaned);
}

/**
 * Parol kuchini tekshiradi
 * @param {string} password
 * @returns {{ valid: boolean, score: number, message: string }}
 */
export function validatePassword(password) {
  if (!password) return { valid: false, score: 0, message: "Parol kiriting" };

  let score = 0;
  const issues = [];

  if (password.length >= 8) score++;
  else issues.push("Kamida 8 ta belgi bo'lishi kerak");

  if (password.length >= 12) score++;

  if (/[A-Z]/.test(password)) score++;
  else issues.push("Kamida 1 ta katta harf (A-Z)");

  if (/[0-9]/.test(password)) score++;
  else issues.push("Kamida 1 ta raqam (0-9)");

  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) score++;

  const valid = password.length >= 6; // Firebase minimal talabi
  const messages = ['Juda zaif', 'Zaif', "O'rtacha", 'Yaxshi', 'Kuchli', 'Juda kuchli'];
  const message = issues.length > 0 ? issues[0] : messages[Math.min(score, 5)];

  return { valid, score, message };
}

// ─── Paket: form uchun barcha sanitize ────────────────────────────────────────

/**
 * ProfileTab form ma'lumotlarini to'liq tozalaydi
 * @param {object} formData
 * @returns {object} - tozalangan form ma'lumotlari
 */
export function sanitizeProfileForm(formData) {
  return {
    displayName: sanitizeName(formData.displayName || ''),
    phone: sanitizePhone(formData.phone || ''),
    school: sanitizeSchool(formData.school || ''),
    region: sanitizeText(formData.region || '', { maxLength: 50 }),
    grade: sanitizeText(formData.grade || '', { maxLength: 5 }),
    bio: sanitizeBio(formData.bio || ''),
  };
}

/**
 * Contact form ma'lumotlarini tozalaydi
 * @param {object} formData
 * @returns {object}
 */
export function sanitizeContactForm(formData) {
  return {
    name: sanitizeName(formData.name || ''),
    email: sanitizeText(formData.email || '', { maxLength: 254 }),
    subject: sanitizeText(formData.subject || '', { maxLength: 100 }),
    message: sanitizeText(formData.message || '', { maxLength: 1000, allowNewlines: true }),
  };
}
