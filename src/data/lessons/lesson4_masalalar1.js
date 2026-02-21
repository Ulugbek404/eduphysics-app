// DARS 4: MASALALAR YECHISH (1-3 MAVZULAR)
export const lesson4 = {
    id: '9-l-23',
    chapter_id: '9-ch-02',
    title: 'Masalalar yechish (1-3 mavzular)',
    description: "Molekula massasi, Avogadro soni va modda miqdori bo'yicha amaliy masalalar.",
    order_number: 4,
    duration_minutes: 50,
    video_url: 'https://www.youtube.com/embed/WCbZcje5mMY',
    has_lab: false,
    test_count: 6,
    difficulty: 'medium',
    content: {
        key_concepts: [
            'Formulalarni qo\'llash',
            'Birliklarni konvertatsiya',
            'Ko\'p bosqichli masalalar',
            'Xatolardan saqlash'
        ],
        theory: `Bu darsda birinchi uchta mavzuda o'rgangan formulalarimizni amalda qo'llaymiz. Masalalar yechishda eng muhim narsa — formulalarni to'g'ri tanlash va birliklarni to'g'ri ishlatish.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ASOSIY FORMULALAR TAKRORLASH

1. Bir molekulaning massasi: m₀ = M / NA
2. Molekulalar soni: N = (m × NA) / M
3. Modda miqdori: ν = m / M = N / NA
4. Massa: m = ν × M = m₀ × N
5. Molyar massa: M = m₀ × NA = m / ν

Bu yerda:
• m₀ — bir molekula massasi (kg)
• M — molyar massa (kg/mol)
• NA = 6.02 × 10²³ mol⁻¹
• m — moddaning umumiy massasi (kg)
• N — molekulalar soni
• ν — modda miqdori (mol)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MASALA YECHISH QOIDALARI

1. Berilganlarni yozing — barcha ma'lum kattaliklar
2. Topish kerak — nimani hisoblash kerak?
3. Birliklarni tekshiring — hammasi SI da bo'lishi kerak
4. Formula tanlang — qaysi formulada berilganlar va noma'lum bor?
5. Hisoblang — diqqat bilan
6. Javobni tekshiring — mantiqiy to'g'rimi?

KENG TARQALGAN XATOLAR:
• Birliklarni aralashtirib yuborish (g va kg)
• Avogadro sonini noto'g'ri yozish (10²³ o'rniga 10²²)
• Molyar massani atom massasi bilan aralashturish
• Bo'lish o'rniga ko'paytirish (va aksincha)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OSON MASALALAR

Oson masalalar bitta formula bilan yechiladi. Chunki faqat bitta noma'lum kattalik bor.

MASALA 1: Temir atomining massasi
Topish: Fe atomining massasini toping.
Berilgan: M(Fe) = 56 g/mol = 0.056 kg/mol

Yechish: m₀ = M/NA = 0.056 / (6.02 × 10²³) = 9.3 × 10⁻²⁶ kg
Javob: m₀ ≈ 9.3 × 10⁻²⁶ kg

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

O'RTA MASALALAR

O'rta masalalar 2-3 qadam talab qiladi. Avval bitta kattalikni topib, keyin uni boshqa formulaga qo'yish kerak.

MASALA 2: Suvdagi molekulalar
90 g suv (H₂O) da nechta molekula bor?
Yechish:
1-qadam: ν = m/M = 90/18 = 5 mol
2-qadam: N = ν × NA = 5 × 6.02 × 10²³ = 3.01 × 10²⁴
Javob: N ≈ 3.01 × 10²⁴ ta molekula

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

QIYIN MASALALAR

Qiyin masalalar bir nechta formulani birlashtirish va birliklarni konvertatsiya qilishni talab qiladi.

MASALA 3: Mis simning uzunligi
Bir mol mis (Cu) ni diametri d = 0.5 mm bo'lgan sim shaklida cho'zsa, simning uzunligi qancha bo'ladi?
Berilgan: ν = 1 mol, M(Cu) = 64 g/mol, ρ(Cu) = 8900 kg/m³, d = 0.5 mm

Yechish:
1-qadam: Massa: m = νM = 1 × 0.064 = 0.064 kg
2-qadam: Hajm: V = m/ρ = 0.064/8900 = 7.19 × 10⁻⁶ m³
3-qadam: Sim kesimi: S = π(d/2)² = 3.14 × (0.00025)² = 1.96 × 10⁻⁷ m²
4-qadam: Uzunlik: L = V/S = 7.19 × 10⁻⁶ / 1.96 × 10⁻⁷ = 36.7 m
Javob: L ≈ 36.7 m

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MUSTAQIL ISHLASH UCHUN MASALALAR

1. 100 g oltin (Au, M = 197 g/mol) da nechta atom bor?
2. 5 mol azot (N₂) ning massasi qancha?
3. Nechta suv molekulasi 1 grammni tashkil qiladi?
4. 3.01 × 10²⁴ ta kislorod molekulasining massasi?
5. Qaysi og'irroq: 2 mol suv yoki 1 mol vodorod?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

XULOSA

Masalalar yechishda eng muhim: formulani to'g'ri tanlash, birliklarni to'g'ri ishlatish va javobni mantiqiy tekshirish.

KEYINGI DARSDA: Ideal gaz — gazning molekulyar modeli.`,

        formulas: [
            { name: "Bir molekula massasi", formula: 'm_0 = \\frac{M}{N_A}', text: 'm₀ = M / NA', description: "Bir zarrachaning massasi", variables: [{ symbol: 'm_0', name: 'Molekula massasi', unit: 'kg' }, { symbol: 'M', name: 'Molyar massa', unit: 'kg/mol' }, { symbol: 'N_A', name: 'Avogadro soni', unit: 'mol⁻¹' }] },
            { name: "Molekulalar soni", formula: 'N = \\frac{m \\cdot N_A}{M}', text: 'N = (m × NA) / M', description: "Berilgan massadagi zarrachalar soni", variables: [{ symbol: 'N', name: 'Zarrachalar soni', unit: '' }, { symbol: 'm', name: 'Massa', unit: 'kg' }, { symbol: 'M', name: 'Molyar massa', unit: 'kg/mol' }] },
            { name: "Modda miqdori", formula: '\\nu = \\frac{m}{M} = \\frac{N}{N_A}', text: 'ν = m/M = N/NA', description: "Modda miqdori", variables: [{ symbol: 'ν', name: 'Modda miqdori', unit: 'mol' }, { symbol: 'm', name: 'Massa', unit: 'kg' }, { symbol: 'M', name: 'Molyar massa', unit: 'kg/mol' }] },
            { name: "Massa", formula: 'm = \\nu \\cdot M', text: 'm = ν × M', description: "Mol miqdoridan massa", variables: [{ symbol: 'm', name: 'Massa', unit: 'kg' }, { symbol: 'ν', name: 'Modda miqdori', unit: 'mol' }, { symbol: 'M', name: 'Molyar massa', unit: 'kg/mol' }] }
        ],

        examples: [
            {
                title: "Temir atomining massasi", problem: "Temir (Fe) atomining massasini toping.", given_data: { "M(Fe)": "56 g/mol = 0.056 kg/mol", "NA": "6.02 × 10²³ mol⁻¹" },
                solution_steps: ["Formula: m₀ = M / NA", "m₀ = 0.056 / (6.02 × 10²³)", "m₀ = 9.3 × 10⁻²⁶ kg"], solution: "m₀ = M/NA = 0.056 / 6.02×10²³ = 9.3×10⁻²⁶ kg", answer: "m₀ ≈ 9.3 × 10⁻²⁶ kg", difficulty: 'easy'
            },
            {
                title: "90 g suvdagi molekulalar", problem: "90 g suv (H₂O) da nechta molekula bor?", given_data: { "m": "90 g", "M(H₂O)": "18 g/mol", "NA": "6.02 × 10²³" },
                solution_steps: ["1-qadam: ν = m/M = 90/18 = 5 mol", "2-qadam: N = ν × NA = 5 × 6.02 × 10²³", "N = 3.01 × 10²⁴ ta molekula"], solution: "ν = 90/18 = 5 mol. N = 5 × 6.02×10²³ = 3.01×10²⁴.", answer: "N ≈ 3.01 × 10²⁴ molekula", difficulty: 'medium'
            },
            {
                title: "CO₂ molekulasining massasi", problem: "Karbonat angidrid (CO₂) ning bir molekulasining massasini toping.", given_data: { "C": "12 g/mol", "O": "16 g/mol", "NA": "6.02 × 10²³" },
                solution_steps: ["M(CO₂) = 12 + 2×16 = 44 g/mol = 0.044 kg/mol", "m₀ = M/NA = 0.044/(6.02×10²³)", "m₀ ≈ 7.31 × 10⁻²⁶ kg"], solution: "M = 12+32 = 44 g/mol. m₀ = 0.044/6.02×10²³ ≈ 7.31×10⁻²⁶ kg.", answer: "m₀ ≈ 7.31 × 10⁻²⁶ kg", difficulty: 'medium'
            },
            {
                title: "Mis simning uzunligi", problem: "1 mol mis (Cu) ni d = 0.5 mm sim qilib cho'zsa, uzunligi qancha?", given_data: { "ν": "1 mol", "M(Cu)": "64 g/mol", "ρ(Cu)": "8900 kg/m³", "d": "0.5 mm" },
                solution_steps: ["m = νM = 1 × 0.064 = 0.064 kg", "V = m/ρ = 0.064/8900 = 7.19 × 10⁻⁶ m³", "S = π(d/2)² = 3.14×(0.00025)² = 1.96×10⁻⁷ m²", "L = V/S = 7.19×10⁻⁶ / 1.96×10⁻⁷ ≈ 36.7 m"], solution: "m=0.064 kg, V=7.19×10⁻⁶ m³, S=1.96×10⁻⁷ m², L=V/S≈36.7 m", answer: "L ≈ 36.7 m", difficulty: 'hard'
            }
        ]
    },
    questions: [
        { id: 1, question: "88 g CO₂ da necha mol bor? (M = 44 g/mol)", options: ["1", "2", "3", "4"], correct: 1, explanation: "ν = m/M = 88/44 = 2 mol.", difficulty: 'easy' },
        { id: 2, question: "Vodorod (H₂) molekulasi necha gramm?", options: ["3.32 × 10⁻²⁴ g", "2 g", "1 g", "6.02 × 10²³ g"], correct: 0, explanation: "m₀ = M/NA = 2/(6.02×10²³) = 3.32×10⁻²⁴ g.", difficulty: 'medium' },
        { id: 3, question: "5 mol oltin (Au) ning massasi? (M = 197 g/mol)", options: ["197 g", "394 g", "985 g", "39.4 g"], correct: 2, explanation: "m = νM = 5 × 197 = 985 g.", difficulty: 'easy' },
        { id: 4, question: "1.806 × 10²⁴ ta molekula — necha mol?", options: ["1", "2", "3", "4"], correct: 2, explanation: "ν = N/NA = 1.806×10²⁴ / 6.02×10²³ = 3 mol.", difficulty: 'medium' },
        { id: 5, question: "Qaysi og'irroq: 1 mol temir (56) yoki 1 mol oltin (197)?", options: ["Temir", "Oltin", "Teng", "Aniqlab bo'lmaydi"], correct: 1, explanation: "1 mol oltin = 197 g, 1 mol temir = 56 g. Oltin og'irroq.", difficulty: 'easy' },
        { id: 6, question: "0.5 mol H₂O da nechta molekula bor?", options: ["3.01 × 10²³", "6.02 × 10²³", "12.04 × 10²³", "1.505 × 10²³"], correct: 0, explanation: "N = νNA = 0.5 × 6.02×10²³ = 3.01×10²³.", difficulty: 'medium' }
    ]
};
