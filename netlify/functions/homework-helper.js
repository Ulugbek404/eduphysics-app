const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");

/**
 * Homework Helper - Serverless Function
 * 
 * O'quvchilarning uy vazifalarini yechishda yordam beradi.
 * Rasm yuklash va tahlil qilish imkoniyati bilan.
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
        const { problem, imageData = null } = JSON.parse(event.body);

        if (!problem || typeof problem !== 'string') {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Problem description is required' })
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
            temperature: 0.3, // Aniqroq javoblar uchun past temperature
            maxOutputTokens: 3000,
        });

        // System instruction - Homework Helper xatti-harakati
        const systemPrompt = `Sen 9-sinf o'quvchilariga uy vazifalarini yechishda yordam beradigan professional fizika ustozisan.

VAZIFANG:
- Masalani qadam-baqadam yechish
- Har bir qadamni tushuntirish
- Formulalarni va qonunlarni izohlash
- To'g'ri javobga yo'naltirish (lekin to'g'ridan-to'g'ri javob bermaslik)

QOIDALAR:
1. Masalani to'liq yechma, faqat yo'l ko'rsat
2. Har bir qadamni tushuntir
3. Formulalarni yoz va tushuntir
4. O'quvchini o'ylashga undash
5. Javobni o'zbek tilida ber

USLUB:
- Sabr-toqatli va qo'llab-quvvatlovchi
- Tushuntirishlar aniq va sodda
- Motivatsion
- Qadam-baqadam yondashuv`;

        // Agar rasm yuklangan bo'lsa, uni qo'shamiz
        let userMessage;
        if (imageData) {
            userMessage = new HumanMessage({
                content: [
                    {
                        type: "text",
                        text: `Masala: ${problem}\n\nIltimos, rasmni tahlil qilib, masalani yechishda yordam bering.`
                    },
                    {
                        type: "image_url",
                        image_url: imageData
                    }
                ]
            });
        } else {
            userMessage = new HumanMessage(`Masala: ${problem}\n\nIltimos, bu masalani yechishda qadam-baqadam yordam bering.`);
        }

        const messages = [
            new SystemMessage(systemPrompt),
            userMessage
        ];

        // AI dan javob olish
        const response = await model.invoke(messages);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                solution: response.content,
                timestamp: new Date().toISOString(),
                model: "gemini-2.0-flash-exp",
                hasImage: !!imageData
            })
        };

    } catch (error) {
        console.error('Homework Helper Error:', error);

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
