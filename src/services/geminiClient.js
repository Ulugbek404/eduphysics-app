/**
 * geminiClient.js — Markaziy Gemini AI ulanish qatlami
 * Primary + 2 backup kalit, avtomatik fallback
 * Model: gemini-2.5-flash
 */
import { GoogleGenerativeAI } from '@google/generative-ai';

const MODEL_NAME = 'gemini-2.5-flash';

// .env dan API kalitlarini ol, yo'q bo'lsa homeworkService kalitlaridan foydalaniladi
const API_KEYS = [
    import.meta.env.VITE_GEMINI_API_KEY,
    import.meta.env.VITE_GEMINI_API_KEY_1,
    import.meta.env.VITE_GEMINI_API_KEY_2,
].filter(Boolean); // faqat .env dan keladi — kod ichida HECH QACHON yozma

let currentKeyIndex = 0;

/**
 * Keyingi kalitga o'tish (rate limit uchun)
 */
function rotateKey() {
    currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
}

/**
 * Gemini model instance olish
 * @param {string} systemInstruction - System prompt
 */
function getModel(systemInstruction = '') {
    const apiKey = API_KEYS[currentKeyIndex];
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({
        model: MODEL_NAME,
        ...(systemInstruction ? { systemInstruction } : {}),
    });
}

/**
 * Asosiy so'rov yuborish funksiyasi (avtomatik fallback)
 * @param {string} prompt - So'rov matni
 * @param {string} systemInstruction - System prompt (ixtiyoriy)
 * @param {number} retries - Qayta urinishlar
 * @returns {Promise<string>} - AI javobi
 */
export async function generateContent(prompt, systemInstruction = '', retries = 0) {
    try {
        const model = getModel(systemInstruction);
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        const is429 = error.message?.includes('429') || error.status === 429;
        const hasMoreKeys = retries < API_KEYS.length - 1;

        if (is429 && hasMoreKeys) {
            rotateKey();
            return generateContent(prompt, systemInstruction, retries + 1);
        }

        throw error;
    }
}

/**
 * Chat suhbati uchun — chatHistory ni kontekst sifatida qo'shadi
 * @param {string} message - Yangi xabar
 * @param {Array} history - [{role:'user'|'ai', text:'...'}]
 * @param {string} systemInstruction - System prompt
 */
export async function generateChat(message, history = [], systemInstruction = '') {
    // Suhbat tarixini prompt ga qo'shish
    const historyText = history.slice(-8).map(m =>
        `${m.role === 'user' ? 'Foydalanuvchi' : 'Ustoz'}: ${m.text}`
    ).join('\n');

    const fullPrompt = historyText
        ? `${historyText}\nFoydalanuvchi: ${message}\nUstoz:`
        : message;

    return generateContent(fullPrompt, systemInstruction);
}

/**
 * JSON javob olish — parse xatosi bo'lsa fallback qaytaradi
 * @param {string} prompt
 * @param {string} systemInstruction
 * @param {any} fallback - Parse xatosida qaytariladigan qiymat
 */
export async function generateJSON(prompt, systemInstruction = '', fallback = null) {
    const text = await generateContent(prompt, systemInstruction);
    const match = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (!match) return fallback;
    try {
        return JSON.parse(match[0]);
    } catch {
        return fallback;
    }
}

export { MODEL_NAME };
