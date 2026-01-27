import { GoogleGenerativeAI } from '@google/generative-ai';

const MODEL_NAME = "gemini-2.5-flash";
const API_KEYS = [
    "AIzaSyCC8uEzh1px6KKsXP8FEkh_JS_3F1ErtDQ",
    "AIzaSyBUzgU8ARMbZX1OYGv0f_cIqQJqaWdlGVM"
];

const getGenAI = () => {
    const apiKey = API_KEYS[Math.floor(Math.random() * API_KEYS.length)];
    return new GoogleGenerativeAI(apiKey);
};

export async function solveProblem(problemText, topic = '') {
    try {
        const genAI = getGenAI();
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const prompt = `
Fizika masalasini yech:
MASALA: ${problemText}
MAVZU: ${topic}

TALABLAR:
1. Berilganlarni yoz
2. Formulalarni yoz
3. Hisoblashlarni ko'rsat
4. Javobni aniq yoz
5. O'zbek tilida
6. JSON formatida javob ber

FORMAT:
{
  "steps": [
    {
      "number": 1,
      "title": "Berilganlar",
      "explanation": "...",
      "formula": "...",
      "calculation": "...",
      "result": "..."
    }
  ],
  "finalAnswer": "...",
  "topic": "${topic}"
}
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        let data;
        if (jsonMatch) {
            try {
                data = JSON.parse(jsonMatch[0]);
            } catch (e) {
                data = parseTextSolution(text);
            }
        } else {
            data = parseTextSolution(text);
        }

        return {
            success: true,
            data: data,
            rawText: text
        };
    } catch (error) {
        console.error('Problem solving error:', error);
        throw error;
    }
}

export async function checkSolution(apiKeyIgnored, problemText, studentSolution) {
    // API Key parametrini ignore qilamiz, o'zimiznikini ishlatamiz
    try {
        const genAI = getGenAI();
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

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
    "steps": [],
    "finalAnswer": "..."
  },
  "feedback": "Umumiy feedback",
  "suggestions": ["Maslahat 1", "Maslahat 2"]
}
`;

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

export async function generatePracticeProblem(apiKeyIgnored, topic, difficulty = 'medium') {
    try {
        const genAI = getGenAI();
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

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
    "steps": [],
    "finalAnswer": "..."
  },
  "topic": "${topic}",
  "difficulty": "${difficulty}",
  "hints": ["Maslahat 1", "Maslahat 2"]
}
`;

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

export async function explainConcept(apiKeyIgnored, question, context = '') {
    try {
        const genAI = getGenAI();
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

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

function parseTextSolution(text) {
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
