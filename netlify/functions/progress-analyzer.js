const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");

/**
 * Progress Analyzer - Serverless Function
 * 
 * O'quvchi progressini tahlil qilib, shaxsiylashtirilgan tavsiyalar beradi.
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
            userStats,          // O'quvchi statistikasi
            completedLessons,   // Tugatilgan darslar
            testResults,        // Test natijalari
            userLevel           // O'quvchi darajasi
        } = JSON.parse(event.body);

        if (!userStats) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'User stats required' })
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

        const model = new ChatGoogleGenerativeAI({
            modelName: "gemini-2.0-flash-exp",
            apiKey: apiKey,
            temperature: 0.7,
            maxOutputTokens: 2048,
        });

        // O'quvchi ma'lumotlarini tayyorlash
        const statsText = `
O'QUVCHI STATISTIKASI:
- Level: ${userLevel}
- XP: ${userStats.xp || 0}
- O'qilgan vaqt: ${Math.floor((userStats.timeSpent || 0) / 60)} daqiqa
- Yechilgan testlar: ${userStats.testsSolved || 0} ta
- O'rtacha natija: ${userStats.testsSolved ? Math.round(userStats.totalScore / userStats.testsSolved) : 0}%
- Bajarilgan lablar: ${userStats.completedLabs || 0} ta
- Tugatilgan darslar: ${completedLessons?.length || 0} ta

TEST NATIJALARI:
${testResults && testResults.length > 0
                ? testResults.map((t, i) => `${i + 1}. ${t.topic}: ${t.score}% (${t.date})`).join('\n')
                : 'Hali test yechilmagan'
            }
    `.trim();

        const systemPrompt = `Sen tajribali fizika o'qituvchisi va o'quv maslahatchi san.

VAZIFA: O'quvchi progressini tahlil qilib, shaxsiylashtirilgan tavsiyalar ber.

FORMAT:
Javobni FAQAT quyidagi JSON formatda qaytar:

{
  "overallAssessment": "Umumiy baho (1-2 jumla)",
  "strengths": ["Kuchli tomon 1", "Kuchli tomon 2"],
  "weaknesses": ["Zaif tomon 1", "Zaif tomon 2"],
  "recommendations": [
    {
      "title": "Tavsiya sarlavhasi",
      "description": "Batafsil tavsiya",
      "priority": "high|medium|low"
    }
  ],
  "nextSteps": ["Keyingi qadam 1", "Keyingi qadam 2", "Keyingi qadam 3"],
  "motivationalMessage": "Motivatsion xabar (ijobiy va ilhomlantiruvchi)"
}

QOIDALAR:
1. Tahlil aniq va foydali bo'lsin
2. Tavsiyalar amaliy va bajarilishi mumkin bo'lsin
3. Ijobiy va rag'batlantiruvchi uslubda yoz
4. O'zbek tilida yoz
5. Har bir bo'limda 2-3 ta element bo'lsin`;

        const messages = [
            new SystemMessage(systemPrompt),
            new HumanMessage(`Quyidagi o'quvchi ma'lumotlarini tahlil qil va tavsiyalar ber:\n\n${statsText}`)
        ];

        const response = await model.invoke(messages);

        // JSON ni tozalash
        let cleanJson = response.content
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        const analysis = JSON.parse(cleanJson);

        // Validatsiya
        if (!analysis.overallAssessment || !analysis.recommendations) {
            throw new Error('Invalid analysis format');
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                analysis,
                metadata: {
                    analyzedAt: new Date().toISOString(),
                    userLevel,
                    dataPoints: {
                        lessonsCompleted: completedLessons?.length || 0,
                        testsCompleted: userStats.testsSolved || 0,
                        averageScore: userStats.testsSolved
                            ? Math.round(userStats.totalScore / userStats.testsSolved)
                            : 0
                    }
                }
            })
        };

    } catch (error) {
        console.error('Progress Analyzer Error:', error);

        let errorMessage = 'Tahlil qilishda xatolik. Qaytadan urinib ko\'ring.';

        if (error instanceof SyntaxError) {
            errorMessage = 'AI javobini o\'qishda xatolik.';
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
