/**
 * Gemini Vision orqali uy vazifasini tekshirish
 * Model: gemini-2.5-flash (mavjud modellar bilan mos)
 */
export const checkHomeworkWithAI = async (imageBase64, homeworkTitle = 'Fizika uy vazifasi') => {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    // gemini-2.5-flash — Vision qo'llab-quvvatlaydi
    const MODEL = 'gemini-2.5-flash';
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

    // base64 dan data: prefiksini olib tashlash
    const base64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;

    const prompt = `Siz NurFizika o'quv platformasining AI tekshiruvchisisiz.
O'quvchi quyidagi fizika uy vazifasini yechgan: "${homeworkTitle}"

Rasmda o'quvchining yechimini ko'rib chiqing va FAQAT quyidagi JSON formatida javob bering (hech qanday qo'shimcha matn yo'q):
{
  "grade": "A",
  "score": 90,
  "isCorrect": true,
  "summary": "Qisqa xulosa (1-2 jumla)",
  "correct": ["To'g'ri bajarilgan jihatlar"],
  "mistakes": ["Xatolar (bo'sh bo'lishi mumkin)"],
  "tips": ["Maslahatlar"],
  "xpEarned": 100
}

Qoidalar:
- Barcha matnlar O'ZBEK tilida
- grade: A=90-100%, B=70-89%, C=50-69%, D=50% dan past
- xpEarned: A=100, B=75, C=50, D=25
- Rasm fizika yechimi bo'lmasa: score=0, grade="D", isCorrect=false
- FAQAT JSON qaytaring`;

    const response = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{
                parts: [
                    {
                        inline_data: {
                            mime_type: 'image/jpeg',
                            data: base64Data,
                        },
                    },
                    { text: prompt },
                ],
            }],
            generationConfig: { temperature: 0.1 },
        }),
    });

    if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `API xatosi: ${response.status}`);
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    // JSON blokini tozalash
    const clean = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(clean);
};
