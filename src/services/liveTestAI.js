/**
 * NurFizika Live Test — AI savollar generatsiyasi
 * Gemini 2.5 Flash modeli
 */
export const generateLiveQuestions = async (topic, difficulty = 'medium', count = 10) => {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const MODEL = 'gemini-2.5-flash';
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

    const difficultyMap = {
        easy: "oson, asosiy tushunchalar va formulalar",
        medium: "o'rta, formulalar va hisoblashlar",
        hard: "qiyin, murakkab masalalar va analitik savollar",
    };

    const prompt = `${topic} bo'yicha ${difficultyMap[difficulty] || difficultyMap.medium} darajada ${count} ta test savoli tuz. O'zbek tilida.

Qoidalar:
- Har safar BOSHQACHA savollar
- 4 ta variant (A, B, C, D)
- Faqat 1 ta to'g'ri javob
- Fizika 9-sinf dasturi doirasida
- Savollar aniq va tushunarli

FAQAT JSON massiv qaytaring (boshqa hech narsa yo'q):
[
  {
    "question": "Savol matni",
    "options": ["A variant", "B variant", "C variant", "D variant"],
    "correct": 0,
    "explanation": "Qisqa tushuntirish"
  }
]`;

    const res = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.8 },
        }),
    });

    if (!res.ok) throw new Error(`API xatosi: ${res.status}`);

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const clean = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(clean);
};
