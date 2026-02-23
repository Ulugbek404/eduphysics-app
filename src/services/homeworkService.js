import { GoogleGenerativeAI } from '@google/generative-ai';

// ✅ .env dagi kalit nomlariga mos
const API_KEYS = [
    import.meta.env.VITE_GEMINI_API_KEY,
    import.meta.env.VITE_GEMINI_API_KEY_1,
    import.meta.env.VITE_GEMINI_API_KEY_2,
].filter(Boolean);

const MODEL_NAME = "gemini-2.5-flash";
let currentKeyIndex = 0;

const safeParseJSON = (text) => {
    const codeMatch = text.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
    const raw = codeMatch ? codeMatch[1] : text;
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    try { return JSON.parse(jsonMatch[0]); } catch { return null; }
};

const generateWithFallback = async (prompt) => {
    for (let attempt = 0; attempt < API_KEYS.length; attempt++) {
        try {
            const key = API_KEYS[currentKeyIndex % API_KEYS.length];
            const genAI = new GoogleGenerativeAI(key);
            const model = genAI.getGenerativeModel({
                model: MODEL_NAME,
                generationConfig: { temperature: 0.7, maxOutputTokens: 4096 }
            });
            const result = await model.generateContent(prompt);
            return result.response.text();
        } catch (error) {
            currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
            if (attempt === API_KEYS.length - 1) throw error;
        }
    }
};

export async function solveProblem(problemText, topic = '') {
    try {
        const prompt = `Sen 9-sinf fizika o'qituvchisisan. Masalani O'ZBEK tilida yech.
MASALA: ${problemText}
MAVZU: ${topic || 'Fizika'}

FAQAT quyidagi JSON formatida javob ber, boshqa hech narsa yozma:
{
  "steps": [
    {"number": 1, "title": "Berilganlar", "explanation": "...", "formula": "", "calculation": "", "result": ""},
    {"number": 2, "title": "Yechish", "explanation": "...", "formula": "...", "calculation": "...", "result": "..."}
  ],
  "finalAnswer": "Javob: ...",
  "topic": "${topic}"
}`;
        const text = await generateWithFallback(prompt);
        const data = safeParseJSON(text) || parseTextSolution(text);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: "AI bilan ulanishda xato: " + error.message, data: null };
    }
}

export async function checkSolution(apiKeyIgnored, problemText, studentSolution) {
    try {
        const prompt = `Sen 9-sinf fizika o'qituvchisisan. O'quvchi yechimini O'ZBEK tilida tekshir.
MASALA: ${problemText}
O'QUVCHI YECHIMI: ${studentSolution}

FAQAT quyidagi JSON formatida javob ber:
{
  "status": "correct",
  "score": 85,
  "feedback": "Umumiy izoh...",
  "errors": [{"type": "Xato turi", "description": "...", "suggestion": "..."}],
  "correctSolution": {"steps": [], "finalAnswer": "To'g'ri javob..."},
  "suggestions": ["Maslahat 1"]
}
status: "correct" yoki "incorrect" yoki "partial"`;
        const text = await generateWithFallback(prompt);
        const data = safeParseJSON(text) || parseTextFeedback(text);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: "AI bilan ulanishda xato: " + error.message, data: null };
    }
}

export async function generatePracticeProblem(apiKeyIgnored, topic, difficulty = 'medium') {
    try {
        const difficultyMap = { easy: "Oson", medium: "O'rta", hard: "Qiyin" };
        const prompt = `Sen 9-sinf fizika o'qituvchisisan. "${topic}" mavzusida ${difficultyMap[difficulty]} darajadagi masala yarat. O'ZBEK tilida.

FAQAT quyidagi JSON formatida javob ber:
{
  "problem": "Masala matni...",
  "given": ["m = 5 kg", "F = 10 N"],
  "find": "Tezlanishni toping",
  "solution": {"steps": [], "finalAnswer": "a = 2 m/s²"},
  "topic": "${topic}",
  "difficulty": "${difficulty}",
  "hints": ["Maslahat 1", "Maslahat 2"]
}`;
        const text = await generateWithFallback(prompt);
        const data = safeParseJSON(text) || parseTextProblem(text);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: "AI bilan ulanishda xato: " + error.message, data: null };
    }
}

export async function explainConcept(apiKeyIgnored, question, context = '') {
    try {
        const prompt = `Sen 9-sinf o'quvchisiga fizika tushuntirayotgan do'stona o'qituvchisan. O'ZBEK tilida tushuntir.
SAVOL: ${question}
${context ? `KONTEKST: ${context}` : ''}

FAQAT quyidagi JSON formatida javob ber:
{
  "explanation": "Tushunarli tushuntirish...",
  "examples": ["Misol 1", "Misol 2"],
  "analogy": "Kundalik hayotdan analogiya...",
  "formula": "F = ma (agar kerak bo'lsa)",
  "relatedConcepts": ["Bog'liq mavzu"],
  "tips": ["Maslahat"]
}`;
        const text = await generateWithFallback(prompt);
        const data = safeParseJSON(text) || { explanation: text };
        return { success: true, data };
    } catch (error) {
        return { success: false, error: "AI bilan ulanishda xato: " + error.message, data: null };
    }
}

function parseTextSolution(text) {
    return {
        steps: [{ number: 1, title: "Yechim", explanation: text, formula: "", calculation: "", result: "" }],
        finalAnswer: "Yuqoridagi yechimga qarang", topic: ""
    };
}
function parseTextFeedback(text) {
    return { status: "partial", score: 50, errors: [], correctSolution: { steps: [], finalAnswer: "" }, feedback: text, suggestions: [] };
}
function parseTextProblem(text) {
    return { problem: text, given: [], find: "", solution: { steps: [], finalAnswer: "" }, topic: "", difficulty: "medium", hints: [] };
}
