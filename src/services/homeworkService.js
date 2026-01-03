import { GoogleGenerativeAI } from '@google/generative-ai';

const MODEL_NAME = "gemini-2.0-flash-exp";

/**
 * Fizika masalasini AI yordamida yechish
 * @param {string} apiKey - Gemini API key
 * @param {string} problemText - Masala matni
 * @param {string} topic - Mavzu nomi
 * @returns {Promise<Object>} Yechim ma'lumotlari
 */
export async function solveProblem(apiKey, problemText, topic = '') {
    if (!apiKey) {
        throw new Error('API kalit topilmadi');
    }

    const prompt = `
Sen 9-sinf fizika o'qituvchisisan. Quyidagi masalani qadam-baqadam yech:

MASALA: ${problemText}
${topic ? `MAVZU: ${topic}` : ''}

TALABLAR:
1. Har bir qadamni alohida ko'rsat
2. Har bir qadamni tushuntir
3. Formulalarni LaTeX formatida yoz (masalan: $F = ma$)
4. Hisoblashlarni aniq ko'rsat
5. Final javobni aniq ko'rsat
6. O'zbek tilida yoz

FORMAT (JSON formatida javob ber):
{
  "steps": [
    {
      "number": 1,
      "title": "Qadam nomi",
      "explanation": "Tushuntirish",
      "formula": "$formula$",
      "calculation": "Hisoblash",
      "result": "Natija"
    }
  ],
  "finalAnswer": "Final javob",
  "topic": "Mavzu nomi"
}
`;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // JSON parsing
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const data = JSON.parse(jsonMatch[0]);
            return {
                success: true,
                data: data,
                rawText: text
            };
        } else {
            // Agar JSON formatida bo'lmasa, oddiy text qaytarish
            return {
                success: true,
                data: parseTextSolution(text),
                rawText: text
            };
        }
    } catch (error) {
        console.error('Problem solving error:', error);
        throw error;
    }
}

/**
 * O'quvchi yechimini tekshirish
 * @param {string} apiKey - Gemini API key
 * @param {string} problemText - Masala matni
 * @param {string} studentSolution - O'quvchi yechimi
 * @returns {Promise<Object>} Tahlil natijalari
 */
export async function checkSolution(apiKey, problemText, studentSolution) {
    if (!apiKey) {
        throw new Error('API kalit topilmadi');
    }

    const prompt = `
Sen 9-sinf fizika o'qituvchisisan. O'quvchining yechimini tahlil qil:

MASALA: ${problemText}

O'QUVCHI YECHIMI:
${studentSolution}

VAZIFA:
1. Yechimni tekshir
2. Xatolarni top va tushuntir
3. To'g'ri yechim yo'lini ko'rsat
4. Ijobiy feedback ber
5. Yaxshilash uchun maslahat ber

FORMAT (JSON formatida javob ber):
{
  "status": "correct|incorrect|partial",
  "score": 0-100,
  "errors": [
    {
      "type": "Xato turi",
      "description": "Xato tavsifi",
      "suggestion": "Tuzatish maslahati"
    }
  ],
  "correctSolution": {
    "steps": [...],
    "finalAnswer": "..."
  },
  "feedback": "Umumiy feedback",
  "suggestions": ["Maslahat 1", "Maslahat 2"]
}
`;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return {
                success: true,
                data: JSON.parse(jsonMatch[0]),
                rawText: text
            };
        } else {
            return {
                success: true,
                data: parseTextFeedback(text),
                rawText: text
            };
        }
    } catch (error) {
        console.error('Solution checking error:', error);
        throw error;
    }
}

/**
 * Amaliyot masalasi generatsiya qilish
 * @param {string} apiKey - Gemini API key
 * @param {string} topic - Mavzu
 * @param {string} difficulty - Qiyinlik darajasi (easy, medium, hard)
 * @returns {Promise<Object>} Yangi masala
 */
export async function generatePracticeProblem(apiKey, topic, difficulty = 'medium') {
    if (!apiKey) {
        throw new Error('API kalit topilmadi');
    }

    const difficultyMap = {
        easy: 'Oson',
        medium: "O'rta",
        hard: 'Qiyin'
    };

    const prompt = `
9-sinf fizika uchun "${topic}" mavzusida ${difficultyMap[difficulty]} darajadagi amaliyot masalasi yarat.

TALABLAR:
1. Real hayotga yaqin masala bo'lsin
2. Aniq raqamlar bilan
3. Yechimi bo'lsin
4. O'zbek tilida

FORMAT (JSON formatida javob ber):
{
  "problem": "Masala matni",
  "given": ["Ma'lumot 1", "Ma'lumot 2"],
  "find": "Nima topish kerak",
  "solution": {
    "steps": [...],
    "finalAnswer": "..."
  },
  "topic": "${topic}",
  "difficulty": "${difficulty}",
  "hints": ["Maslahat 1", "Maslahat 2"]
}
`;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return {
                success: true,
                data: JSON.parse(jsonMatch[0]),
                rawText: text
            };
        } else {
            return {
                success: true,
                data: parseTextProblem(text),
                rawText: text
            };
        }
    } catch (error) {
        console.error('Problem generation error:', error);
        throw error;
    }
}

/**
 * Fizika tushunchasini tushuntirish
 * @param {string} apiKey - Gemini API key
 * @param {string} question - Savol
 * @param {string} context - Kontekst (optional)
 * @returns {Promise<Object>} Tushuntirish
 */
export async function explainConcept(apiKey, question, context = '') {
    if (!apiKey) {
        throw new Error('API kalit topilmadi');
    }

    const prompt = `
Sen 9-sinf o'quvchisi uchun fizika tushuntirayotgan do'stona o'qituvchisan.

SAVOL: ${question}
${context ? `KONTEKST: ${context}` : ''}

TALABLAR:
1. Oddiy, tushunarli tilda tushuntir
2. Kundalik hayotdan misollar kel
3. Analogiyalar ishlatib tushuntir
4. Qisqa va aniq bo'lsin
5. Agar kerak bo'lsa, formula ko'rsat (LaTeX formatida)
6. O'zbek tilida

FORMAT (JSON formatida javob ber):
{
  "explanation": "Asosiy tushuntirish",
  "examples": ["Misol 1", "Misol 2"],
  "analogy": "Analogiya",
  "formula": "$formula$",
  "relatedConcepts": ["Bog'liq tushuncha 1", "Bog'liq tushuncha 2"],
  "tips": ["Maslahat 1", "Maslahat 2"]
}
`;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return {
                success: true,
                data: JSON.parse(jsonMatch[0]),
                rawText: text
            };
        } else {
            return {
                success: true,
                data: { explanation: text },
                rawText: text
            };
        }
    } catch (error) {
        console.error('Concept explanation error:', error);
        throw error;
    }
}

// Helper functions for parsing non-JSON responses

function parseTextSolution(text) {
    // Oddiy text yechimni parsing qilish
    return {
        steps: [{
            number: 1,
            title: "Yechim",
            explanation: text,
            formula: "",
            calculation: "",
            result: ""
        }],
        finalAnswer: "Yuqoridagi yechimga qarang",
        topic: ""
    };
}

function parseTextFeedback(text) {
    return {
        status: "partial",
        score: 50,
        errors: [],
        correctSolution: { steps: [], finalAnswer: "" },
        feedback: text,
        suggestions: []
    };
}

function parseTextProblem(text) {
    return {
        problem: text,
        given: [],
        find: "",
        solution: { steps: [], finalAnswer: "" },
        topic: "",
        difficulty: "medium",
        hints: []
    };
}
