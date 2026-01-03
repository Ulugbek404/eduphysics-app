/**
 * AI Service Module
 * 
 * Netlify Functions bilan bog'lanish uchun service layer.
 * LangChain-powered AI funksiyalarni frontend'dan chaqirish.
 */

// API base URL (development va production uchun)
const API_BASE_URL = import.meta.env.DEV
    ? 'http://localhost:8888/.netlify/functions'
    : '/.netlify/functions';

/**
 * AI Tutor - Fizika savollariga javob beradi
 * @param {string} question - O'quvchi savoli
 * @param {Array} chatHistory - Oldingi suhbat tarixi
 * @returns {Promise<Object>} AI javobi
 */
export async function askAITutor(question, chatHistory = []) {
    try {
        const response = await fetch(`${API_BASE_URL}/ai-tutor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question,
                chatHistory: chatHistory.map(msg => ({
                    role: msg.role,
                    content: msg.text
                }))
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'AI Tutor xatolik');
        }

        const data = await response.json();
        return {
            success: true,
            answer: data.answer,
            timestamp: data.timestamp,
            model: data.model
        };

    } catch (error) {
        console.error('AI Tutor Error:', error);
        return {
            success: false,
            error: error.message || 'Xatolik yuz berdi'
        };
    }
}

/**
 * Adaptiv Test Generator - Qiyinlik darajasi avtomatik sozlanadi
 * @param {Object} params - Test parametrlari
 * @returns {Promise<Object>} Test savollari
 */
export async function generateAdaptiveQuiz(params) {
    const {
        topic,
        difficulty = 'medium',
        questionCount = 5,
        userLevel = 1,
        previousScore = 0
    } = params;

    try {
        const response = await fetch(`${API_BASE_URL}/adaptive-quiz`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                topic,
                difficulty,
                questionCount,
                userLevel,
                previousScore
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Test yaratishda xatolik');
        }

        const data = await response.json();
        return {
            success: true,
            questions: data.questions,
            metadata: data.metadata
        };

    } catch (error) {
        console.error('Adaptive Quiz Error:', error);
        return {
            success: false,
            error: error.message || 'Xatolik yuz berdi'
        };
    }
}

/**
 * Progress Analyzer - O'quvchi progressini tahlil qiladi
 * @param {Object} userData - O'quvchi ma'lumotlari
 * @returns {Promise<Object>} Tahlil va tavsiyalar
 */
export async function analyzeProgress(userData) {
    const {
        userStats,
        completedLessons = [],
        testResults = [],
        userLevel = 1
    } = userData;

    try {
        const response = await fetch(`${API_BASE_URL}/progress-analyzer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userStats,
                completedLessons,
                testResults,
                userLevel
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Tahlil qilishda xatolik');
        }

        const data = await response.json();
        return {
            success: true,
            analysis: data.analysis,
            metadata: data.metadata
        };

    } catch (error) {
        console.error('Progress Analyzer Error:', error);
        return {
            success: false,
            error: error.message || 'Xatolik yuz berdi'
        };
    }
}

/**
 * Test Connection - API ishlayotganini tekshirish
 * @returns {Promise<boolean>}
 */
export async function testAPIConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/ai-tutor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question: 'Test'
            })
        });

        return response.ok;
    } catch (error) {
        console.error('API Connection Test Failed:', error);
        return false;
    }
}

// Export all functions
export default {
    askAITutor,
    generateAdaptiveQuiz,
    analyzeProgress,
    testAPIConnection
};
