// DARS 10: IZOTERMIK JARAYON (Boyl-Mariot qonuni)
export const lesson10 = {
    id: '9-l-29', chapter_id: '9-ch-02',
    title: 'Izotermik jarayon',
    description: "Boyl-Mariot qonuni — o'zgarmas temperaturada bosim va hajm bog'liqligi.",
    order_number: 10, duration_minutes: 45, video_url: 'https://www.youtube.com/embed/-l68WYDtSbk', has_lab: false, test_count: 6, difficulty: 'medium',
    content: {
        key_concepts: ['Izotermik jarayon', 'Boyl-Mariot qonuni', "P-V diagramma (izoterma)", 'Bosim va hajm teskari proporsional'],
        theory: `Endi izojarayonlarni — gazning holatida bitta parametr o'zgarmas qolgandagi jarayonlarni o'rganamiz. Birinchisi — IZOTERMIK JARAYON.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IZOTERMIK JARAYON NIMA?

Izotermik jarayon — bu temperatura o'zgarmas qolgan (T = const) holda bosim va hajmning o'zgarishi.

"Izo" — teng, bir xil (yunon tilida)
"Termik" — issiqlik, temperatura
"Izotermik" — bir xil temperaturali

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BOYL-MARIOT QONUNI

Bu qonunni 1662 yilda Robert Boyl (Angliya) va 1676 yilda Edm Mariot (Fransiya) mustaqil ravishda kashf etishgan.

Qonun: O'zgarmas temperaturada ideal gazning bosimi va hajmi TESKARI PROPORSIONAL.

PV = const (T = const, m = const bo'lganda)

Yoki: P₁V₁ = P₂V₂

Bu nimani anglatadi?
• Hajm 2 marta oshsa → bosim 2 marta kamayadi
• Hajm 3 marta kamaysa → bosim 3 marta oshadi
• P × V ko'paytmasi doimo bir xil qoladi

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GRAFIK — IZOTERMA

P-V diagrammada izotermik jarayon GIPERBOLA shaklida chiziladi.

Xususiyatlari:
• Egri chiziq (giperbola)
• Temperatura yuqori bo'lsa, giperbola yuqoriroq va o'ngga siljigan
• P oshganda V kamayadi (teskari proporsional)

P-T diagrammada: vertikal to'g'ri chiziq (T o'zgarmaydi)
V-T diagrammada: gorizontal to'g'ri chiziq (T o'zgarmaydi)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HAYOTIY MISOLLAR

1. Shprits: Shprits og'zini yopib porshenni bosganingizda — hajm kamayadi, bosim oshadi (T ≈ const)
2. Suv osti cho'milish: Chuqurlikka tushganda bosim oshadi, o'pkadagi havo siqiladi (hajm kamayadi)
3. Velosiped nasosi: Nasosda havoni siqganda — hajm kamayadi, bosim oshadi

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

XULOSA
• Izotermik: T = const
• PV = const (Boyl-Mariot)
• P va V teskari proporsional
• Grafik: P-V da giperbola

KEYINGI DARSDA: Izobarik jarayon — Gay-Lyussak qonuni.`,

        formulas: [
            { name: "Boyl-Mariot qonuni", formula: 'P_1 V_1 = P_2 V_2', text: 'P₁V₁ = P₂V₂', description: "T = const bo'lganda", variables: [{ symbol: 'P₁,P₂', name: 'Bosimlar', unit: 'Pa' }, { symbol: 'V₁,V₂', name: 'Hajmlar', unit: 'm³' }] },
            { name: "Izotermik shart", formula: 'PV = \\text{const}', text: 'PV = const', description: "T va m o'zgarmas bo'lganda", variables: [] },
            { name: "Izotermikda bosim", formula: 'P_2 = \\frac{P_1 V_1}{V_2}', text: 'P₂ = P₁V₁/V₂', description: "Yangi hajmda bosimni topish", variables: [] }
        ],

        examples: [
            { title: "Gaz siqish", problem: "Gaz 2 atm da 10 L hajmda. Hajm 5 L ga siqilsa, bosim?", given_data: { "P₁": "2 atm", "V₁": "10 L", "V₂": "5 L", "T": "const" }, solution_steps: ["P₁V₁ = P₂V₂ (Boyl-Mariot)", "P₂ = P₁V₁/V₂", "P₂ = 2 × 10 / 5 = 4 atm"], solution: "P₂ = 2×10/5 = 4 atm.", answer: "P₂ = 4 atm", difficulty: 'easy' },
            { title: "Hajm topish", problem: "Bosim 3 atm dan 1 atm ga kamaydi. Dastlab hajm 4 L. Yangi hajm?", given_data: { "P₁": "3 atm", "P₂": "1 atm", "V₁": "4 L" }, solution_steps: ["P₁V₁ = P₂V₂", "V₂ = P₁V₁/P₂", "V₂ = 3 × 4 / 1 = 12 L"], solution: "V₂ = 3×4/1 = 12 L.", answer: "V₂ = 12 L", difficulty: 'easy' },
            { title: "Cho'miluvchi", problem: "Sho'ng'uvchi 10 m chuqurlikda. Sirtda hajmi 6 L havo pufagi pastda qancha bo'ladi? (Sirt: 1 atm, 10 m da: 2 atm)", given_data: { "P₁": "1 atm (sirt)", "P₂": "2 atm (10 m chuqur)", "V₁": "6 L" }, solution_steps: ["P₁V₁ = P₂V₂", "V₂ = P₁V₁/P₂ = 1 × 6 / 2", "V₂ = 3 L"], solution: "V₂ = 1×6/2 = 3 L. 10 m chuqurlikda havo hajmi 2 marta kamayadi.", answer: "V₂ = 3 L", difficulty: 'medium' }
        ]
    },
    questions: [
        { id: 1, question: "Izotermik jarayonda nima o'zgarmas?", options: ["Bosim", "Hajm", "Temperatura", "Massa"], correct: 2, explanation: "Izotermik (izo=teng, termik=temperatura): T = const.", difficulty: 'easy' },
        { id: 2, question: "Boyl-Mariot qonunida P va V qanday bog'langan?", options: ["To'g'ridan proporsional", "Teskari proporsional", "Bog'liq emas", "Teng"], correct: 1, explanation: "PV = const, ya'ni P va V teskari proporsional: biri oshsa, biri kamayadi.", difficulty: 'easy' },
        { id: 3, question: "Hajm 3 marta oshsa, bosim qanday o'zgaradi? (T=const)", options: ["3 marta oshadi", "3 marta kamayadi", "O'zgarmaydi", "9 marta kamayadi"], correct: 1, explanation: "P va V teskari proporsional. V 3 marta oshsa, P 3 marta kamayadi.", difficulty: 'easy' },
        { id: 4, question: "P-V diagrammada izoterma qanday shakl?", options: ["To'g'ri chiziq", "Giperbola", "Parabola", "Doira"], correct: 1, explanation: "PV = const — bu giperbola tenglamasi.", difficulty: 'medium' },
        { id: 5, question: "P₁ = 4 atm, V₁ = 5 L. V₂ = 20 L da P₂ = ?", options: ["1 atm", "2 atm", "10 atm", "20 atm"], correct: 0, explanation: "P₂ = P₁V₁/V₂ = 4×5/20 = 1 atm.", difficulty: 'medium' },
        { id: 6, question: "Shprits og'zi yopiq, porshen bosildi. Gaz qanday jarayonda?", options: ["Izobarik", "Izoxorik", "Izotermik", "Adiabatik"], correct: 2, explanation: "Sekin siqilganda T ≈ const — izotermik jarayon.", difficulty: 'medium' }
    ]
};

// DARS 11: IZOBARIK JARAYON (Gay-Lyussak qonuni)
export const lesson11 = {
    id: '9-l-30', chapter_id: '9-ch-02',
    title: 'Izobarik jarayon',
    description: "Gay-Lyussak qonuni — o'zgarmas bosimda hajm va temperatura bog'liqligi.",
    order_number: 11, duration_minutes: 45, video_url: 'https://www.youtube.com/embed/rLfFPFVT6t0', has_lab: false, test_count: 6, difficulty: 'medium',
    content: {
        key_concepts: ['Izobarik jarayon', 'Gay-Lyussak qonuni', 'V-T diagramma (izobara)', 'Hajm va temperatura proporsional'],
        theory: `Ikkinchi izojarayonni o'rganamiz — IZOBARIK JARAYON. Bu safar bosim o'zgarmas.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IZOBARIK JARAYON NIMA?

Izobarik jarayon — bu bosim o'zgarmas qolgan (P = const) holda hajm va temperaturaning o'zgarishi.

"Izo" — teng, bir xil
"Barik" — bosim (bar — bosim birligi)
"Izobarik" — bir xil bosimli

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GAY-LYUSSAK QONUNI

Bu qonunni fransuz fizigi Jozef Gay-Lyussak 1802 yilda kashf etgan.

Qonun: O'zgarmas bosimda ideal gazning hajmi temperaturaga TO'G'RIDAN-TO'G'RI PROPORSIONAL.

V/T = const (P = const, m = const)

Yoki: V₁/T₁ = V₂/T₂

Bu nimani anglatadi?
• Temperatura 2 marta oshsa → hajm 2 marta oshadi
• Temperatura 3 marta kamaysa → hajm 3 marta kamayadi
• V/T nisbati doimo bir xil

DIQQAT: Temperatura KELVIN da bo'lishi kerak!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GRAFIK — IZOBARA

V-T diagrammada izobarik jarayon TO'G'RI CHIZIQ shaklida chiziladi (0 nuqtadan boshlanadi).

Xususiyatlari:
• To'g'ri chiziq boshlanish nuqtasi T = 0 K da V = 0
• Bosim yuqori bo'lsa, chiziq pastroq (kamroq qiyalik)
• Bosim past bo'lsa, chiziq yuqoriroq (ko'proq qiyalik)

P-V diagrammada: gorizontal to'g'ri chiziq (P o'zgarmaydi)
P-T diagrammada: gorizontal to'g'ri chiziq (P o'zgarmaydi)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HAYOTIY MISOLLAR

1. Havo shari: Issiq havo yuborganda balon kengayadi (P = const — atmosfera bosimi)
2. Termometr: Simob isiganda kengayadi va naycha bo'ylab ko'tariladi
3. Oshxonada: Non pishirganda — xamir ko'tariladi (gaz kengayadi)
4. Avtomobil dvigatel: Silindrdagi gaz kengayadi va porshenni itaradi

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

XULOSA
• Izobarik: P = const
• V/T = const (Gay-Lyussak)
• V va T to'g'ridan proporsional
• Grafik: V-T da to'g'ri chiziq

KEYINGI DARSDA: Izoxorik jarayon — Sharl qonuni.`,

        formulas: [
            { name: "Gay-Lyussak qonuni", formula: '\\frac{V_1}{T_1} = \\frac{V_2}{T_2}', text: 'V₁/T₁ = V₂/T₂', description: "P = const bo'lganda", variables: [{ symbol: 'V₁,V₂', name: 'Hajmlar', unit: 'm³' }, { symbol: 'T₁,T₂', name: 'Temperaturalar', unit: 'K' }] },
            { name: "Izobarik shart", formula: '\\frac{V}{T} = \\text{const}', text: 'V/T = const', description: "P va m o'zgarmas", variables: [] },
            { name: "Izobarikda hajm", formula: 'V_2 = V_1 \\cdot \\frac{T_2}{T_1}', text: 'V₂ = V₁ × T₂/T₁', description: "Yangi temperaturada hajmni topish", variables: [] }
        ],

        examples: [
            { title: "Havo shari", problem: "Havo shari hajmi 20°C da 100 L. 80°C ga qizdirilsa hajm?", given_data: { "V₁": "100 L", "T₁": "20°C = 293 K", "T₂": "80°C = 353 K", "P": "const" }, solution_steps: ["V₁/T₁ = V₂/T₂", "V₂ = V₁ × T₂/T₁", "V₂ = 100 × 353/293", "V₂ ≈ 120.5 L"], solution: "V₂ = 100 × 353/293 ≈ 120.5 L.", answer: "V₂ ≈ 120.5 L", difficulty: 'easy' },
            { title: "Temperaturani topish", problem: "Gaz hajmi 10 L dan 15 L ga oshdi (P=const). Dastlab T₁ = 300 K. T₂ = ?", given_data: { "V₁": "10 L", "V₂": "15 L", "T₁": "300 K" }, solution_steps: ["V₁/T₁ = V₂/T₂", "T₂ = T₁ × V₂/V₁", "T₂ = 300 × 15/10 = 450 K = 177°C"], solution: "T₂ = 300 × 15/10 = 450 K.", answer: "T₂ = 450 K = 177°C", difficulty: 'medium' },
            { title: "Sovutish", problem: "3 L gaz 127°C da. 27°C ga sovutilsa hajm? (P=const)", given_data: { "V₁": "3 L", "T₁": "127°C = 400 K", "T₂": "27°C = 300 K" }, solution_steps: ["V₂ = V₁ × T₂/T₁", "V₂ = 3 × 300/400 = 2.25 L"], solution: "V₂ = 3 × 300/400 = 2.25 L.", answer: "V₂ = 2.25 L", difficulty: 'medium' }
        ]
    },
    questions: [
        { id: 1, question: "Izobarik jarayonda nima o'zgarmas?", options: ["Temperatura", "Hajm", "Bosim", "Massa faqat"], correct: 2, explanation: "Izobarik (izo=teng, barik=bosim): P = const.", difficulty: 'easy' },
        { id: 2, question: "Gay-Lyussak qonuni?", options: ["PV = const", "V/T = const", "P/T = const", "PT = const"], correct: 1, explanation: "P = const da V/T = const — Gay-Lyussak qonuni.", difficulty: 'easy' },
        { id: 3, question: "T 2 marta oshsa, V qanday? (P=const)", options: ["2 marta kamayadi", "O'zgarmaydi", "2 marta oshadi", "4 marta oshadi"], correct: 2, explanation: "V/T = const, T 2 marta oshsa, V ham 2 marta oshadi.", difficulty: 'easy' },
        { id: 4, question: "V-T diagrammada izobara?", options: ["Giperbola", "To'g'ri chiziq", "Parabola", "Vertikal chiziq"], correct: 1, explanation: "V/T = const — bu to'g'ri chiziq V = const × T.", difficulty: 'medium' },
        { id: 5, question: "V₁=6 L, T₁=300 K, T₂=600 K. V₂=? (P=const)", options: ["3 L", "6 L", "12 L", "24 L"], correct: 2, explanation: "V₂ = V₁×T₂/T₁ = 6×600/300 = 12 L.", difficulty: 'medium' },
        { id: 6, question: "Izobarik kengayishga misol?", options: ["Shpritsni siqish", "Yopiq idishni qizdirish", "Havo shari qizdirish", "Gaz siqish"], correct: 2, explanation: "Havo shari atmosfera bosimida (P≈const) qizdirilganda kengayadi — bu izobarik.", difficulty: 'medium' }
    ]
};
