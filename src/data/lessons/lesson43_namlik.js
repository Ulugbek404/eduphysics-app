// 43-§. Laboratoriya ishi. Havoning nisbiy namligini aniqlash
export const lesson43 = {
    id: '9-l-72',
    chapter_id: '9-ch-04',
    title: '43-§. Laboratoriya ishi. Havoning nisbiy namligini aniqlash',
    description: "Psixrometr va Psixrometrik jadval vositasida havoning namlik % miqdorini aniq topish bo'yicha amaliy mashg'ulot.",
    order_number: 13,
    duration_minutes: 45,
    video_url: 'tez_kunda',
    has_lab: true,
    test_count: 5,
    difficulty: 'easy',

    content: {
        key_concepts: [
            'Tajriba asosi: Quruq va Xo\'l termometrlarni yonma-yon o\'rnatish',
            'Haroratlar ayirmasini hisoblash (ΔT = T_q - T_x)',
            'Psixrometrik jadvaldan foydalanish usuli'
        ],

        theory: `📌 MAQSADI: Dars o'tayotgan Fizika laboratoriya xonangizning Havosidagi Nisbiy namlik darajasini (foizda $\\varphi %$) tayyor "Avgust psixrometri" yoki ibtidoiy termometrlar yordamida o'lchab aniqlashdir!

Kerakli asbob-uskunalar (Anjomlar):
1. Ikkita bir xil aniqlikdagi laboratoriya termometri.
2. Qisqa paxtadan to'qilgan doka yoki bint parchasi (Termometr tagini o'rash u-n).
3. Kichik idishda xona haroratidagi suv.
4. Psixrometrik jadval.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tajriba ishining bajarilish qadamlari:

🔹 **Birinchi qadam (Quruq bo'lim qaydi):**
Birinchi termometr ochiq havoda turadi. U xonaning aniq havosi haroratini o'lchaydi. Buni **$T_{quruq}$** yoki $t_1$ deb belgilang (Masalan: $+22^{\\circ} C$).

🔹 **Ikkinchi qadam (Xo'l termometr asari):**
Ikkinchi termometrning simobli (yoki spirtli) pastki dumaloq qismini xo'l dokaga o'raysiz. Dokaning cheti idishdagi suvga tegib tursin (dooka doim ho'l bo'lishi kerak). 
Kuting... 10-15 daqiqadan so'ng Bug'lanish hodisasi kuchayib, bug'langanda issiqlik yutilishi hisobiga termometr ko'rsatkichi pasayadi. Ushbu sovigan haroratni ham ezib oling: bu **$T_{xo'l}$** yoki $t_2$. (Masalan: $+18^{\\circ} C$).

🔹 **Uchinchi qadam (Jadval tahlili):**
Bu 2 ta haroratning FARQ (delta) sini topamiz:
$$\\Delta T = T_{quruq} - T_{xo'l}$$
(Bizimzi misolda: $22 - 18 = 4^{\\circ} C$ farq).

Endi "Psixrometrik jadval" ga qaraylik:
- Chapdagi ustundan **Quruq Termometr ($T_q$)** ni izlaysiz (22°C qatori).
- Tepasidagi gorizontal qatordan **Haroratlar Farqi ($\\Delta T$)** ni izlaysiz (4°C ustuni).
- Shu qator va ustun kesishgan joyidagi son siz qidirayotgan havo namligi foizidir (Fi %)!`,

        formulas: [
            {
                name: 'Termometrlar ko\'rsatkichlari farqi',
                formula: '\\Delta T = T_{quruq} - T_{xo\'l}',
                text: 'Delta_T = T_quruq - T_xol',
                description: 'Quruq va ho\'l termometr ko\'rsatkichlar ayirmasi. Ushbu delta qancha katta bo\'lsa, havo shuncha quruq degani.'
            }
        ],

        examples: [
            {
                title: "Oddiy o'lchov natijasi",
                problem: "Laboratoriyada quruq termometr 25°C ni ko'rsatdi, ho'l termometr esa 20°C ni ko'rsatdi. Havoning nisbiy namligini bajaring (farq 5 bo'lganda jadvalda 63% yozilgan deb tasavvur qiling).",
                solution_steps: [
                    "Farq: dt = 25 - 20 = 5 °C",
                    "Jadvalga qaraymiz: 25 gradus qatori va 5 gradus farqi ustuni qayerda kesishgan bo'lsa o'sha sonni topamiz.",
                    "Berilgan ma'lumotga asosan u son 63."
                ],
                solution: "Demak, sinfxonasida o'rnatilgan ob-havo namligi aynan 63 foiz ekan.",
                answer: "63 %",
                difficulty: 'easy'
            },
            {
                title: "100% Namlikdagi farq",
                problem: "Tropik bug'lanish kamerasida o'quvchi ikkala termometrni ham ko'rdi. Ikkalasi ham bir xilda 30°C harorat ko'rsatib turibdi. Bu nechi foiz namlik degani?",
                solution_steps: [
                    "Quruq ham 30, Ho'l ham 30.",
                    "Farq: dt = 30 - 30 = 0 °C.",
                    "Farqning nolga aylanishi havoning endi zarracha ham bug' qabul qila olmasligini, bug'lanish to'xtaganligini bildiradi."
                ],
                solution: "Agar farq bo'lmasa namlik g'irt 100% degani, ya'ni to'yingan havo (yomg'ir boshlanishi mumkin).",
                answer: "100 %",
                difficulty: 'medium'
            }
        ]
    },

    questions: [
        {
            id: 1,
            question: "Nisbiy namlikni amalda asbob asnosida o'lchash jarayonida aynan ikkita termometrli qaysi apparatdan foydalanamiz?",
            options: ["Psixrometr", "Monometr", "Arometr", "Termoskop"],
            correct: 0,
            explanation: "Ikkita (Quruq va Xo'l) termometr tutgan asbob u Psixrometr deb yuritiladi havo namini topishga.",
            difficulty: 'easy'
        },
        {
            id: 2,
            question: "Nega xo'l termometr doim quruq termometrdan sovuqroq (past ko'rsatkichli) bo'ladi amalda?",
            options: ["Chunki unga suv o'rab quyilgani u-n u chiriydi", "Bug'lanayotgan suv termometrdan issiqlik energiyasini olib qochadi va asbobi soviydi", "Spirti ko'payib ketgani uchun"],
            correct: 1,
            explanation: "Suyuqlik bug'langanda u doim atrof va jismlarni yashirin issiqligini olib soviydi. Xo'l mato ham bug'lanib asbobi muzlatadi.",
            difficulty: 'medium'
        },
        {
            id: 3,
            question: "Psixrometrik jadvalda namlik foizini topish u-n ustunga qaysi sonni topib kiritish kerak?",
            options: ["Faqat xo'l termometr gradusini", "Ikki termometr graduslari ayirmasini (farqini)", "Issiq harorat t-nisiq qoshasini"],
            correct: 1,
            explanation: "Jadval 2 o'qli ishlaydi. 1chisi quruqniki, 2chis tepadagisi esa aynan ularning ayirmadi Delta dt (farqi) ni qo'yib tekshiriladi.",
            difficulty: 'easy'
        },
        {
            id: 4,
            question: "Soch tolasi tabiatidan havodagi namlik foizini asboblash orqali o'lchovchi yana nima zoti mavjud fizika darsligida?",
            options: ["Gigrometr (Sochli gigrometr)", "To'qima sim", "Ampermetr"],
            correct: 0,
            explanation: "Sochning namda cho'zilishi yoki qurisa qisqarishi xossasiga tayanilgan asbob fanda - Sochli Gigrometr deyiladi.",
            difficulty: 'easy'
        },
        {
            id: 5,
            question: "Qachon ikki termometr farqi nol bo'ladi (dt = 0°C)?",
            options: ["Havo mutlaq qurib qolganda", "Havo namligi 100% ga to'yingan onida (bug'lana olmasdan iziga tushganda)", "Faqat qish faslida"],
            correct: 1,
            explanation: "Xavo 100 foizga suvga to'yib qolsa, dakkadagi suv haologa boshqa bug'lanub o'tolmaydi. Bug'lanish bumasligi asbob sovimaydi degani. Shu on u Tquruq=Txo'l teng qoladi.",
            difficulty: 'hard'
        }
    ]
};
