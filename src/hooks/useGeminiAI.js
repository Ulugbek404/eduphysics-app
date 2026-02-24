/**
 * useGeminiAI.js — Markaziy Gemini AI Custom Hook
 *
 * Barcha AI so'rovlari shu hook orqali o'tadi.
 * geminiClient.js dan foydalanadi (global init, 429 fallback).
 *
 * Afzalliklari:
 *  - GoogleGenerativeAI har re-renderda QAYTA yaratilmaydi (global scope'da)
 *  - Barcha funksiyalar useCallback bilan o'ralgan — keraksiz re-render yo'q
 *  - 429 xatosida avtomatik kalit almashtirish (geminiClient ichida)
 *  - isLoading, error holatlari toza boshqariladi
 */
import { useState, useCallback } from 'react';
import { generateContent, generateJSON, generateChat } from '../services/geminiClient';

// ─── System prompt — bir marta aniqlanadi, re-renderda QAYTA yaratilmaydi ───
const PHYSICS_SYSTEM = `Sen NurFizika platformasining AI fizika ustozisan.
9-sinf o'quvchilariga o'zbek tilida, tushunarli va qisqa javob ber.
Formulalarni ko'rsatganda oddiy yoz (LaTeX ishlatma).
Har doim do'stona va rag'batlantiruvchi bo'l.`;

// ─── Quiz prompt generator ────────────────────────────────────────────────────
function buildQuizPrompt(topic) {
    return `Fizika bo'yicha "${topic}" mavzusida 5 ta qiziqarli test savoli tuz.
Javobni FAQAT quyidagi JSON massiv formatida qaytar (boshqa hech qanday matnsiz):
[
  {
    "q": "Savol matni",
    "options": ["A javob", "B javob", "C javob", "D javob"],
    "ans": 0
  }
]
"ans" — to'g'ri javob indeksi (0 dan 3 gacha raqam).
Savollar 9-sinf darajasida, o'zbek tilida bo'lsin.`;
}

// ════════════════════════════════════════════════════════════════════════════
//  useGeminiAI — Custom Hook
// ════════════════════════════════════════════════════════════════════════════
export function useGeminiAI() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // ── 1. Test savollarini generatsiya qilish ──────────────────────────────
    /**
     * @param {string} topic — Test mavzusi
     * @returns {Promise<Array|null>} — Savollar massivi yoki null (xato bo'lsa)
     */
    const generateQuiz = useCallback(async (topic) => {
        if (!topic?.trim()) return null;
        setIsLoading(true);
        setError(null);
        try {
            const prompt = buildQuizPrompt(topic);
            // generateJSON — avtomatik JSON parse + 429 fallback (geminiClient ichida)
            const questions = await generateJSON(prompt, PHYSICS_SYSTEM, null);

            if (!Array.isArray(questions) || questions.length === 0) {
                throw new Error("AI savollar qaytarmadi. Qayta urinib ko'ring.");
            }
            return questions;
        } catch (err) {
            const msg = err.message?.includes('429')
                ? "So'rovlar juda ko'p! Bir oz kuting va qayta urining."
                : "Test tuzishda xatolik. Qayta urinib ko'ring.";
            setError(msg);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []); // ← bo'sh array: funksiya hech qachon qayta yaratilmaydi

    // ── 2. AI Suhbat (Chat) ─────────────────────────────────────────────────
    /**
     * @param {string} message — Foydalanuvchi savoli
     * @param {Array}  history — [{role, text}] suhbat tarixi
     * @param {string} topic   — Mavzu (ixtiyoriy)
     * @returns {Promise<string|null>}
     */
    const sendMessage = useCallback(async (message, history = [], topic = '') => {
        if (!message?.trim()) return null;
        setIsLoading(true);
        setError(null);
        try {
            const topicNote = topic ? `\n[Mavzu: ${topic}]` : '';
            const answer = await generateChat(
                message + topicNote,
                history,
                PHYSICS_SYSTEM
            );
            return answer;
        } catch (err) {
            const msg = err.message?.includes('429')
                ? "So'rovlar juda ko'p! 10 soniya kutib qayta urining. 🔄"
                : "Xatolik yuz berdi. Internet aloqasini tekshiring.";
            setError(msg);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []); // ← bo'sh array: hech qachon qayta yaratilmaydi

    // ── 3. Progress tahlili ─────────────────────────────────────────────────
    /**
     * @param {object} userData — { totalXP, level, completedTopics, ... }
     * @returns {Promise<object|null>}
     */
    const analyzeProgress = useCallback(async (userData) => {
        setIsLoading(true);
        setError(null);
        try {
            const prompt = `
O'quvchi ma'lumotlari:
- Daraja: ${userData.currentLevel || 1}
- Umumiy XP: ${userData.totalXP || 0}
- Streak: ${userData.streakDays || 0} kun
- Tugatilgan mavzular: ${(userData.completedTopics || []).join(', ') || 'hali yo\'q'}

Quyidagi JSON formatida o'zbek tilida tahlil ber:
{
  "strengths": ["kuchli tomon 1"],
  "weaknesses": ["zaif tomon 1"],
  "recommendation": "keyingi nima o'qisin",
  "motivationalMsg": "rag'batlantiruvchi xabar",
  "nextSteps": ["qadam 1", "qadam 2"]
}`;
            const data = await generateJSON(prompt, PHYSICS_SYSTEM, null);
            if (!data) throw new Error('Tahlil olinmadi');
            return data;
        } catch (err) {
            setError(err.message || 'Tahlil xatolik');
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []); // ← bo'sh array

    const clearError = useCallback(() => setError(null), []);

    return {
        isLoading,
        error,
        clearError,
        generateQuiz,
        sendMessage,
        analyzeProgress,
    };
}

export default useGeminiAI;
