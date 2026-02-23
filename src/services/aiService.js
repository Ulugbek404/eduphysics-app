/**
 * aiService.js — Gemini API ga to'g'ridan-to'g'ri ulangan AI funksiyalar
 * Netlify Functions o'chirildi, geminiClient orqali ishlaydi
 */
import { generateChat, generateJSON, generateContent } from './geminiClient';

const TUTOR_SYSTEM = `Sen NurFizika platformasining AI fizika ustozisan. 
9-sinf o'quvchilariga o'zbek tilida, tushunarli va qisqa javob ber. 
Formulalarni ko'rsatganda LaTeX format ishlatma, oddiy yoz. 
Har doim do'stona va rag'batlantiruvchi bo'l.`;

// ─── 1. AI Tutor ───────────────────────────────────────────────────────────
/**
 * Real-time fizika suhbati
 * @param {string} question - Savol
 * @param {Array} chatHistory - [{role, text}]
 * @param {string} topic - Mavzu (ixtiyoriy)
 */
export async function askAITutor(question, chatHistory = [], topic = '') {
    try {
        const topicNote = topic ? `\n[Mavzu: ${topic}]` : '';
        const answer = await generateChat(
            question + topicNote,
            chatHistory,
            TUTOR_SYSTEM
        );
        return { success: true, answer };
    } catch (error) {
        return { success: false, error: error.message || 'Xatolik yuz berdi' };
    }
}

// ─── 2. Progress Analyzer ──────────────────────────────────────────────────
/**
 * O'quvchi progressini tahlil qiladi
 * @param {object} userData - { totalXP, currentLevel, completedTopics, testScores, streakDays }
 */
export async function analyzeProgress(userData) {
    const {
        totalXP = 0,
        currentLevel = 1,
        completedTopics = [],
        testScores = {},
        streakDays = 0,
        // legacy support
        userStats,
        completedLessons,
        userLevel,
    } = userData;

    const xp = totalXP || userStats?.xp || 0;
    const level = currentLevel || userLevel || 1;
    const topics = completedTopics.length ? completedTopics : (completedLessons || []);
    const streak = streakDays || userStats?.streak || 0;

    const prompt = `
O'quvchi ma'lumotlari:
- Daraja: ${level}
- Umumiy XP: ${xp}
- Streak: ${streak} kun
- Tugatilgan mavzular: ${topics.join(', ') || 'hali yo\'q'}
- Test natijalari: ${JSON.stringify(testScores) || 'mavjud emas'}

Quyidagi JSON formatida o'zbek tilida tahlil ber:
{
  "strengths": ["kuchli tomon 1", "kuchli tomon 2"],
  "weaknesses": ["zaif tomon 1", "zaif tomon 2"],
  "recommendation": "keyingi nima o'qisin (1 gap)",
  "motivationalMsg": "rag'batlantiruvchi xabar (1 gap)",
  "overallAssessment": "umumiy baho (2-3 gap)",
  "nextSteps": ["qadam 1", "qadam 2", "qadam 3"],
  "recommendations": [
    {"title": "...", "description": "...", "priority": "high|medium|low"}
  ]
}`;

    try {
        const data = await generateJSON(prompt, TUTOR_SYSTEM, null);
        if (!data) return { success: false, error: 'Tahlil olinmadi' };
        return { success: true, analysis: data };
    } catch (error) {
        return { success: false, error: error.message || 'Tahlil xatolik' };
    }
}

// ─── 3. Adaptive Quiz Generator ───────────────────────────────────────────
/**
 * Darajaga mos test savollari generatsiya
 * @param {string} topic - Mavzu
 * @param {string} difficulty - "easy" | "medium" | "hard"
 * @param {string[]} previousErrors - Oldingi xato mavzular
 */
export async function generateAdaptiveQuiz(topic, difficulty = 'medium', previousErrors = []) {
    const diffMap = { easy: 'Oson', medium: "O'rta", hard: 'Qiyin' };
    const errNote = previousErrors.length
        ? `\nO'quvchi avval bu mavzularda xato qilgan: ${previousErrors.join(', ')}`
        : '';

    const prompt = `
9-sinf fizika uchun "${topic}" mavzusida ${diffMap[difficulty]} darajada 5 ta test savol yarat.${errNote}

JSON massiv formatida javob ber:
[
  {
    "question": "savol matni",
    "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
    "correct": 0,
    "explanation": "to'g'ri javob tushuntirishi"
  }
]
Barcha javoblar o'zbek tilida bo'lsin.`;

    try {
        const questions = await generateJSON(prompt, TUTOR_SYSTEM, []);
        if (!Array.isArray(questions) || !questions.length) {
            return { success: false, error: 'Savollar olinmadi' };
        }
        return { success: true, questions };
    } catch (error) {
        return { success: false, error: error.message || 'Quiz xatolik' };
    }
}

// ─── Legacy export (Netlify-based — endi ishlatilmaydi) ───────────────────
export async function testAPIConnection() {
    try {
        const res = await generateContent('Salom');
        return !!res;
    } catch {
        return false;
    }
}

export default { askAITutor, analyzeProgress, generateAdaptiveQuiz, testAPIConnection };
