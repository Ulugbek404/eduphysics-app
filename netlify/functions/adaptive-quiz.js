const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");

/**
 * Adaptiv Test Generator - Serverless Function
 * 
 * O'quvchi darajasiga qarab qiyinlik darajasini avtomatik sozlaydigan
 * test savollarini yaratadi.
 */

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const {
            topic,           // Test mavzusi
            difficulty = 'medium',  // Qiyinlik darajasi: easy, medium, hard
            questionCount = 5,      // Savollar soni
            userLevel = 1,          // O'quvchi darajasi
            previousScore = 0       // Oldingi test natijasi (%)
        } = JSON.parse(event.body);

        if (!topic) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Topic is required' })
            };
        }

        const apiKey = process.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'API key not configured' })
            };
        }

        // Qiyinlik darajasini avtomatik sozlash
        let adaptiveDifficulty = difficulty;
        if (previousScore > 80) {
            adaptiveDifficulty = 'hard';
        } else if (previousScore < 50) {
            adaptiveDifficulty = 'easy';
        }

        const model = new ChatGoogleGenerativeAI({
            modelName: "gemini-2.0-flash-exp",
            apiKey: apiKey,
            temperature: 0.8,
            maxOutputTokens: 4096,
        });

        // Qiyinlik darajasiga qarab prompt yaratish
        const difficultyDescriptions = {
            easy: "Oddiy va asosiy tushunchalar. 9-sinf o'quvchilari uchun boshlang'ich daraja.",
            medium: "O'rtacha qiyinlik. Formulalar va hisob-kitoblar bilan. 9-sinf standart daraja.",
            hard: "Murakkab masalalar. Bir necha formulalarni birlashtirish kerak. Olimpiada darajasi."
        };

        const systemPrompt = `Sen 9-sinf fizika bo'yicha professional test tuzuvchisan.

VAZIFA: "${topic}" mavzusida ${questionCount} ta test savoli tuz.

QIYINLIK DARAJASI: ${adaptiveDifficulty} (${difficultyDescriptions[adaptiveDifficulty]})

O'QUVCHI DARAJASI: Level ${userLevel} (Oldingi natija: ${previousScore}%)

FORMAT:
Javobni FAQAT quyidagi JSON formatda qaytar (boshqa hech qanday matn yozma):

[
  {
    "q": "Savol matni (aniq va qisqa)",
    "options": ["A variant", "B variant", "C variant", "D variant"],
    "ans": 0,
    "explanation": "To'g'ri javobning qisqa tushuntirilishi",
    "difficulty": "easy|medium|hard"
  }
]

QOIDALAR:
1. Savollar o'zbek tilida bo'lsin
2. Har bir savol uchun 4 ta variant
3. "ans" - to'g'ri javob indeksi (0-3)
4. Variantlar mantiqiy va chalg'ituvchi bo'lsin
5. Tushuntirish qisqa va tushunarli (1-2 jumla)
6. Savollar turli xil bo'lsin (nazariy, hisoblash, amaliy)

MAVZU: ${topic}
SAVOLLAR SONI: ${questionCount}`;

        const messages = [
            new SystemMessage(systemPrompt),
            new HumanMessage(`${topic} mavzusida ${questionCount} ta ${adaptiveDifficulty} darajadagi test savoli tuz.`)
        ];

        const response = await model.invoke(messages);

        // JSON ni tozalash
        let cleanJson = response.content
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        // JSON parse qilish
        const questions = JSON.parse(cleanJson);

        // Validatsiya
        if (!Array.isArray(questions) || questions.length === 0) {
            throw new Error('Invalid questions format');
        }

        // Har bir savolni tekshirish
        questions.forEach((q, idx) => {
            if (!q.q || !Array.isArray(q.options) || q.options.length !== 4 || typeof q.ans !== 'number') {
                throw new Error(`Invalid question format at index ${idx}`);
            }
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                questions,
                metadata: {
                    topic,
                    difficulty: adaptiveDifficulty,
                    originalDifficulty: difficulty,
                    questionCount: questions.length,
                    userLevel,
                    previousScore,
                    timestamp: new Date().toISOString()
                }
            })
        };

    } catch (error) {
        console.error('Adaptive Quiz Error:', error);

        let errorMessage = 'Test yaratishda xatolik. Qaytadan urinib ko\'ring.';

        if (error instanceof SyntaxError) {
            errorMessage = 'AI javobini o\'qishda xatolik. Iltimos, qaytadan urinib ko\'ring.';
        }

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: errorMessage,
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            })
        };
    }
};
