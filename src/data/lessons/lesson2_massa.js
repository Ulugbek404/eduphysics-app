// DARS 2: MOLEKULANING MASSASI VA O'LCHAMI
// TO'LIQ KONTENT — ~3000 so'z

export const lesson2 = {
    id: '9-l-21',
    chapter_id: '9-ch-02',
    title: "Molekulaning massasi va o'lchami",
    description: "Avogadro soni, molyar massa, bir molekulaning massasini hisoblash va molekulalar sonini aniqlash.",
    order_number: 2,
    duration_minutes: 50,
    video_url: 'https://www.youtube.com/embed/YXBlRPlKOv0',
    has_lab: false,
    test_count: 8,
    difficulty: 'medium',

    content: {
        key_concepts: [
            'Avogadro soni',
            'Molyar massa',
            "Bir molekulaning massasi",
            'Molekulalar sonini hisoblash',
            "Molekulaning o'lchami"
        ],

        theory: `Oldingi darsda biz moddalarning molekula va atomlardan tashkil topganligini o'rgandik. Endi muhim savol tug'iladi: molekulaning massasi qancha? O'lchami qanday?

Molekulalar juda kichik bo'lgani uchun ularni oddiy tarozida o'lchab bo'lmaydi. Shuning uchun fiziklar maxsus usullar va birliklar ishlab chiqishgan.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AVOGADRO SONI

Italiyalik olim Amedeo Avogadro (1776-1856) moddalar bilan ishlashda muhim tushunchani kiritdi.

Avogadro soni (NA) — 1 mol moddada bo'ladigan zarrachalar (atom yoki molekulalar) soni.

NA = 6.02 × 10²³ mol⁻¹

Bu son juda katta! Qanday tasavvur qilish mumkin?
• Agar siz sekundiga 1 tadan sanasangiz, 6.02 × 10²³ ta sanash uchun 19 × 10¹⁵ yil kerak bo'ladi — bu yerning umridan million marta ko'p!
• Agar 6.02 × 10²³ ta guruch donini Yer yuziga yoysangiz, butun Yer 1 km qalinlikda guruch bilan qoplanadi

Avogadro soni tabiiy doimiylardan biri bo'lib, u barcha moddalar uchun bir xil. 1 mol vodorodni olsangiz ham, 1 mol temirni olsangiz ham — ikkalasida 6.02 × 10²³ ta zarracha bo'ladi.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MOL NIMA?

Mol — xalqaro birliklar tizimida (SI) modda miqdorining o'lchov birligi.

1 mol — shunday miqdordagi moddaki, unda 6.02 × 10²³ ta zarracha (atom yoki molekula) bor.

Mol — bu o'nlab, yuzlab kabi sanash birligi, faqat juda katta miqdorlar uchun:
• 1 o'nlab = 12 ta
• 1 mol = 602 000 000 000 000 000 000 000 ta

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MOLYAR MASSA

Molyar massa (M) — 1 mol moddaning massasi.

Birlik: g/mol yoki kg/mol

Molyar massa qiymatini davriy jadvaldan olish mumkin:
• Vodorod (H): M = 1 g/mol = 0.001 kg/mol
• Kislorod (O): M = 16 g/mol = 0.016 kg/mol
• Uglerod (C): M = 12 g/mol = 0.012 kg/mol
• Azot (N): M = 14 g/mol = 0.014 kg/mol
• Temir (Fe): M = 56 g/mol = 0.056 kg/mol

Murakkab molekulalar uchun molyar massani atomlar massasini qo'shib topamiz:
• Suv (H₂O): M = 2×1 + 16 = 18 g/mol
• Karbonat angidrid (CO₂): M = 12 + 2×16 = 44 g/mol
• Kislorod gazi (O₂): M = 2×16 = 32 g/mol

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BIR MOLEKULANING MASSASI

Bir molekulaning massasini quyidagi formula bilan topamiz:

m₀ = M / NA

Bu yerda:
• m₀ — bir molekulaning massasi (kg)
• M — molyar massa (kg/mol)
• NA — Avogadro soni (6.02 × 10²³ mol⁻¹)

Misol: Suv molekulasining massasi:
m₀ = 0.018 / (6.02 × 10²³) = 2.99 × 10⁻²⁶ kg

Ko'ryapsizmi, molekula massasi juda kichik!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MOLEKULALAR SONINI HISOBLASH

Berilgan massadagi molekulalar sonini topish formulasi:

N = (m × NA) / M

Bu yerda:
• N — molekulalar soni
• m — moddaning massasi (kg)
• NA — Avogadro soni
• M — molyar massa (kg/mol)

Boshqa foydali formulalar:
• N = ν × NA (bu yerda ν — modda miqdori, mol)
• ν = m / M (modda miqdori)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MOLEKULANING O'LCHAMI

Molekulalar juda kichik, ularni oddiy ko'z bilan ko'rib bo'lmaydi.

Molekulaning diametri taxminan: d ≈ 10⁻¹⁰ m = 0.1 nm (nanometr)

Taqqoslash uchun:
• Soch tolasining diametri ≈ 0.05 mm = 5 × 10⁻⁵ m
• Molekula diametri ≈ 10⁻¹⁰ m
• Soch tolasi molekuladan 500 000 marta yo'g'on!

Molekulaning hajmini sferaga yaqinlashtirish usulida hisoblash mumkin:
V₀ = (4/3)π(d/2)³ = πd³/6

Amaliy usullar bilan molekula o'lchamini aniqlash:
1. Moy tomchisi usuli — suvga moy tomchisi tomiziladi, u yupqa qatlam bo'lib tarqaladi
2. Rentgen nurlari usuli — kristallardagi atom oralig'ini o'lchaydi
3. Elektron mikroskop — zamonaviy usul

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ASOSIY XULOSA

1. Avogadro soni NA = 6.02 × 10²³ mol⁻¹ — 1 moldagi zarrachalar soni
2. Molyar massa M — 1 mol moddaning massasi (g/mol)
3. Bir molekulaning massasi: m₀ = M / NA
4. Molekulalar soni: N = (m × NA) / M
5. Molekulaning diametri: d ≈ 10⁻¹⁰ m

KEYINGI DARSDA: Modda miqdori — mol bilan ishlash va masalalar yechish.`,

        formulas: [
            {
                name: 'Avogadro soni',
                formula: 'N_A = 6{,}02 \\times 10^{23} \\text{ mol}^{-1}',
                text: 'NA = 6.02 × 10²³ mol⁻¹',
                description: '1 mol moddada bo\'ladigan zarrachalar soni',
                variables: [
                    { symbol: 'N_A', name: 'Avogadro soni', unit: 'mol⁻¹' }
                ]
            },
            {
                name: 'Molyar massa',
                formula: 'M = m_0 \\times N_A',
                text: 'M = m₀ × NA',
                description: '1 mol moddaning massasi',
                variables: [
                    { symbol: 'M', name: 'Molyar massa', unit: 'kg/mol' },
                    { symbol: 'm_0', name: 'Bir molekulaning massasi', unit: 'kg' },
                    { symbol: 'N_A', name: 'Avogadro soni', unit: 'mol⁻¹' }
                ]
            },
            {
                name: "Bir molekulaning massasi",
                formula: 'm_0 = \\frac{M}{N_A}',
                text: 'm₀ = M / NA',
                description: "Bir molekula yoki atomning massasi",
                variables: [
                    { symbol: 'm_0', name: 'Bir molekula massasi', unit: 'kg' },
                    { symbol: 'M', name: 'Molyar massa', unit: 'kg/mol' },
                    { symbol: 'N_A', name: 'Avogadro soni', unit: 'mol⁻¹' }
                ]
            },
            {
                name: 'Molekulalar soni',
                formula: 'N = \\frac{m \\cdot N_A}{M}',
                text: 'N = (m × NA) / M',
                description: 'Berilgan massadagi molekulalar soni',
                variables: [
                    { symbol: 'N', name: 'Molekulalar soni', unit: '' },
                    { symbol: 'm', name: 'Moddaning massasi', unit: 'kg' },
                    { symbol: 'N_A', name: 'Avogadro soni', unit: 'mol⁻¹' },
                    { symbol: 'M', name: 'Molyar massa', unit: 'kg/mol' }
                ]
            }
        ],

        examples: [
            {
                title: "Suvning molyar massasi",
                problem: "Suv (H₂O) ning molyar massasini hisoblang.",
                given_data: { "H atom massasi": "1 g/mol", "O atom massasi": "16 g/mol", "Formula": "H₂O" },
                solution_steps: [
                    "Suv formulasi: H₂O — 2 ta vodorod, 1 ta kislorod",
                    "H ning massasi: 1 × 2 = 2 g/mol",
                    "O ning massasi: 16 g/mol",
                    "Jami: M(H₂O) = 2 + 16 = 18 g/mol = 0.018 kg/mol"
                ],
                solution: "Suv formulasi H₂O. Vodorod atomining massasi 1 g/mol, kislorodniki 16 g/mol. Suvda 2 ta vodorod bor: 2×1=2. Jami: 2+16=18 g/mol.",
                answer: "M(H₂O) = 18 g/mol = 0.018 kg/mol",
                difficulty: 'easy'
            },
            {
                title: "1 litr suvdagi molekulalar soni",
                problem: "1 litr suvda nechta molekula bor?",
                given_data: { "V": "1 litr = 0.001 m³", "ρ": "1000 kg/m³", "M": "0.018 kg/mol", "NA": "6.02 × 10²³ mol⁻¹" },
                solution_steps: [
                    "Massani topamiz: m = ρ × V = 1000 × 0.001 = 1 kg",
                    "Formuladan: N = (m × NA) / M",
                    "N = (1 × 6.02 × 10²³) / 0.018",
                    "N = 6.02 × 10²³ / 0.018",
                    "N ≈ 3.34 × 10²⁵ molekula"
                ],
                solution: "Avval massani topamiz: m = ρV = 1000 × 0.001 = 1 kg. Keyin molekulalar sonini: N = mNA/M = (1 × 6.02×10²³)/0.018 ≈ 3.34 × 10²⁵.",
                answer: "N ≈ 3.34 × 10²⁵ molekula",
                difficulty: 'medium'
            },
            {
                title: "Kislorod molekulasining massasi",
                problem: "Kislorod (O₂) ning bir molekulasining massasini toping.",
                given_data: { "M(O₂)": "32 g/mol = 0.032 kg/mol", "NA": "6.02 × 10²³ mol⁻¹" },
                solution_steps: [
                    "Kislorod gazi formulasi: O₂ — 2 ta kislorod atomi",
                    "Molyar massa: M = 2 × 16 = 32 g/mol = 0.032 kg/mol",
                    "Bir molekulaning massasi: m₀ = M / NA",
                    "m₀ = 0.032 / (6.02 × 10²³)",
                    "m₀ ≈ 5.31 × 10⁻²⁶ kg"
                ],
                solution: "Kislorod O₂ ning molyar massasi 32 g/mol. Bir molekula massasi: m₀ = M/NA = 0.032/(6.02×10²³) ≈ 5.31×10⁻²⁶ kg.",
                answer: "m₀ ≈ 5.31 × 10⁻²⁶ kg",
                difficulty: 'easy'
            },
            {
                title: "Temir bo'lagidagi atomlar",
                problem: "56 g temirda nechta atom bor?",
                given_data: { "m": "56 g = 0.056 kg", "M(Fe)": "56 g/mol = 0.056 kg/mol", "NA": "6.02 × 10²³ mol⁻¹" },
                solution_steps: [
                    "Modda miqdorini topamiz: ν = m / M = 56 / 56 = 1 mol",
                    "Atomlar soni: N = ν × NA",
                    "N = 1 × 6.02 × 10²³",
                    "N = 6.02 × 10²³ ta atom"
                ],
                solution: "56 g temir — bu aynan 1 mol. Demak, unda NA = 6.02 × 10²³ ta atom bor.",
                answer: "N = 6.02 × 10²³ ta atom",
                difficulty: 'easy'
            }
        ]
    },

    questions: [
        {
            id: 1, question: "Avogadro soni qancha?",
            options: ["6.02 × 10²²", "6.02 × 10²³", "6.02 × 10²⁴", "6.02 × 10²⁵"],
            correct: 1, explanation: "Avogadro soni NA = 6.02 × 10²³ mol⁻¹ — 1 moldagi zarrachalar soni.", difficulty: 'easy'
        },
        {
            id: 2, question: "1 mol moddada nechta molekula bor?",
            options: ["10²³", "6.02 × 10²³", "10²⁴", "6.02 × 10²⁴"],
            correct: 1, explanation: "1 mol har qanday moddada aynan 6.02 × 10²³ ta zarracha bor — bu Avogadro soni.", difficulty: 'easy'
        },
        {
            id: 3, question: "Molyar massa nima?",
            options: ["Bir molekulaning massasi", "1 mol moddaning massasi", "Barcha molekulalar massasi", "Atom yadrosi massasi"],
            correct: 1, explanation: "Molyar massa — 1 mol moddaning grammda ifodalangan massasi. U M harfi bilan belgilanadi.", difficulty: 'easy'
        },
        {
            id: 4, question: "Bir molekulaning massasini topish formulasi qaysi?",
            options: ["m₀ = M × NA", "m₀ = M / NA", "m₀ = NA / M", "m₀ = m × NA"],
            correct: 1, explanation: "Bir molekula massasi molyar massani Avogadro soniga bo'lish orqali topiladi: m₀ = M / NA.", difficulty: 'medium'
        },
        {
            id: 5, question: "Suv (H₂O) ning molyar massasi qancha?",
            options: ["16 g/mol", "18 g/mol", "20 g/mol", "32 g/mol"],
            correct: 1, explanation: "H₂O: 2×1 + 16 = 18 g/mol. Vodorodning atom massasi 1, kislorodniki 16.", difficulty: 'easy'
        },
        {
            id: 6, question: "64 g kislorod (O₂) da necha mol bor?",
            options: ["1 mol", "2 mol", "3 mol", "4 mol"],
            correct: 1, explanation: "O₂ ning molyar massasi 32 g/mol. ν = m/M = 64/32 = 2 mol.", difficulty: 'medium'
        },
        {
            id: 7, question: "Molekulaning taxminiy diametri qancha?",
            options: ["10⁻⁵ m", "10⁻⁸ m", "10⁻¹⁰ m", "10⁻¹⁵ m"],
            correct: 2, explanation: "Molekulaning taxminiy diametri 10⁻¹⁰ m = 0.1 nm (nanometr).", difficulty: 'medium'
        },
        {
            id: 8, question: "Avogadro sonini tajribada birinchi kim o'lchagan?",
            options: ["Albert Eynshteyn", "Jean Perrin", "Amedeo Avogadro", "Robert Brown"],
            correct: 1, explanation: "Jean Perrin 1908 yilda Avogadro sonini tajriba orqali aniq o'lchadi va buning uchun 1926 yilda Nobel mukofotiga sazovor bo'ldi.", difficulty: 'hard'
        }
    ]
};
