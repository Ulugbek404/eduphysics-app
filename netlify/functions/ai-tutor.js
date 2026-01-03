const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");

/**
 * AI Fizika Tutor - Serverless Function
 * 
 * Bu endpoint o'quvchilarning fizika bo'yicha savollariga javob beradi.
 * LangChain va Google Gemini API dan foydalanadi.
 */

exports.handler = async (event, context) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // OPTIONS request uchun (CORS preflight)
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // Faqat POST request qabul qilamiz
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Request body ni parse qilish
        const { question, chatHistory = [] } = JSON.parse(event.body);

        if (!question || typeof question !== 'string') {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Question is required' })
            };
        }

        // API key ni environment variable dan olish
        const apiKey = process.env.VITE_GEMINI_API_KEY;

        if (!apiKey) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'API key not configured' })
            };
        }

        // LangChain model yaratish
        const model = new ChatGoogleGenerativeAI({
            modelName: "gemini-2.0-flash-exp",
            apiKey: apiKey,
            temperature: 0.7,
            maxOutputTokens: 2048,
        });

        // System instruction - AI ning xatti-harakati
        const systemPrompt = `Sen 9-sinf o'quvchilari uchun 'EduPhysics' ilovasida ishlaydigan professional va do'stona fizik ustozsan.

VAZIFANG:
- Fizika bo'yicha savollarni sodda va tushunarli tushuntirish
- Formulalarni va qonunlarni amaliy misollar bilan izohlash
- O'quvchini ilhomlantirish va qiziqtirish
- Javoblarni o'zbek tilida berish

QOIDALAR:
1. Javoblarni qisqa va aniq ber (3-5 jumla)
2. Murakkab tushunchalarni oddiy misollar bilan tushuntir
3. Formulalar ishlatganda, ularni tushuntirib ber
4. Ilmiy asoslangan ma'lumot ber
5. O'quvchini maqtash va rag'batlantirish

USLUB:
- Do'stona va samimiy
- Ilmiy lekin tushunarli
- Motivatsion va ijobiy
- Qiziqarli misollar bilan`;

        // Chat history ni LangChain formatiga o'tkazish
        const messages = [
            new SystemMessage(systemPrompt),
            ...chatHistory.map(msg =>
                msg.role === 'user'
                    ? new HumanMessage(msg.content)
                    : new SystemMessage(msg.content)
            ),
            new HumanMessage(question)
        ];

        // AI dan javob olish
        const response = await model.invoke(messages);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                answer: response.content,
                timestamp: new Date().toISOString(),
                model: "gemini-2.0-flash-exp"
            })
        };

    } catch (error) {
        console.error('AI Tutor Error:', error);

        // Error handling
        let errorMessage = 'Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.';

        if (error.message.includes('404')) {
            errorMessage = 'AI model topilmadi.';
        } else if (error.message.includes('403') || error.message.includes('401')) {
            errorMessage = 'API kalit noto\'g\'ri yoki muddati tugagan.';
        } else if (error.message.includes('429')) {
            errorMessage = 'Juda ko\'p so\'rovlar. Iltimos, bir oz kuting.';
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
