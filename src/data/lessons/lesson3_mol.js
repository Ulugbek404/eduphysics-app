// DARS 3: MODDA MIQDORI
// TO'LIQ KONTENT

export const lesson3 = {
    id: '9-l-22',
    chapter_id: '9-ch-02',
    title: 'Modda miqdori',
    description: "Mol — modda miqdorining o'lchov birligi. Modda miqdorini hisoblash usullari.",
    order_number: 3,
    duration_minutes: 45,
    video_url: 'https://www.youtube.com/embed/tH9ClacGlD4',
    has_lab: false,
    test_count: 6,
    difficulty: 'easy',

    content: {
        key_concepts: [
            'Mol — modda miqdori birligi',
            'Modda miqdori formulasi',
            'Mol va massa bog\'liqligi',
            'Mol va molekulalar soni bog\'liqligi'
        ],

        theory: `Kundalik hayotda narsalarni sanash uchun turli birliklardan foydalanamiz: 1 o'nlab tuxum (12 ta), 1 bog'lam gul, 1 quti konfet. Xuddi shunday, kimyo va fizikada zarrachalarni sanash uchun maxsus birlik kerak bo'ldi — MOL.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MOL NIMA?

Mol — Xalqaro birliklar tizimida (SI) modda miqdorining asosiy o'lchov birligi.

1 mol — shunday miqdordagi moddaki, unda 6.02 × 10²³ ta zarracha (atom yoki molekula) bor.

Bu juda katta son! Nima uchun bunday katta son kerak?

Chunki molekulalar juda kichik va ularga oid miqdorlar juda katta sonlarda bo'ladi. Masalan, bitta stakan suvda taxminan 8.36 × 10²⁴ ta molekula bor. Bunday katta sonlar bilan ishlash noqulay. Shuning uchun mol tushunchasidan foydalanamiz.

Mol — bu "kimyoviy o'nlab" deb tushunish mumkin:
• 1 o'nlab = 12 ta narsa
• 1 mol = 6.02 × 10²³ ta zarracha

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MODDA MIQDORI FORMULASI

Modda miqdori ikki xil usulda hisoblanadi:

1-USUL: Massa orqali
ν = m / M

2-USUL: Zarrachalar soni orqali
ν = N / NA

Bu yerda:
• ν (nu — yunoncha harf) — modda miqdori (mol)
• m — moddaning massasi (kg yoki g)
• M — molyar massa (kg/mol yoki g/mol)
• N — zarrachalar (molekulalar yoki atomlar) soni
• NA — Avogadro soni (6.02 × 10²³ mol⁻¹)

Bu ikki formulani birlashtirish mumkin:
ν = m / M = N / NA

Bundan boshqa foydali formulalar chiqarish mumkin:
• m = ν × M (massani topish)
• N = ν × NA (zarrachalar sonini topish)
• M = m / ν (molyar massani topish)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MODDA MIQDORI BILAN ISHLASH QOIDALARI

1. Birliklar mos kelishi kerak:
   Agar M g/mol da bo'lsa, m ham grammda bo'lishi kerak.
   Agar M kg/mol da bo'lsa, m ham kilogrammda bo'lishi kerak.

2. Modda miqdori doimo musbat: ν > 0

3. Molyar massa davriy jadvaldan olinadi — bu o'zgarmas qiymat.

4. Avogadro soni ham o'zgarmas: NA = 6.02 × 10²³ mol⁻¹

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MODDA MIQDORINING AMALIY AHAMIYATI

Modda miqdori tushunchasi nafaqat fizikada, balki kimyoda, biologiyada va tibbiyotda ham qo'llaniladi:

• Kimyoviy reaksiyalar: Reaksiyalarda moddalarning mol nisbatlarini bilish muhim
• Dori-darmonlar: Dori dozasi ko'pincha modda miqdoriga bog'liq
• Sanoat: Kimyoviy ishlab chiqarishda aniq mol hisoblar zarur
• Tibbiyot: Qondagi moddalar konsentratsiyasini hisoblash

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MASALA YECHISH ALGORITMI

1. Berilgan ma'lumotlarni yozing
2. Topish kerak bo'lgan kattalikni aniqlang
3. Kerakli formulani tanlang
4. Birliklarni tekshiring (g va g/mol yoki kg va kg/mol)
5. Qiymatlarni formulaga qo'ying
6. Hisoblang va javobni yozing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

XULOSA

• Mol — zarrachalar sonini ifodalovchi qulay birlik
• 1 mol = 6.02 × 10²³ ta zarracha
• ν = m/M — massadan modda miqdorini topish
• ν = N/NA — zarrachalar sonidan modda miqdorini topish
• Mol tushunchasi fizika va kimyoda asosiy vositalardan biri

KEYINGI DARSDA: Masalalar yechish — Darslar 1-3 bo'yicha amaliy mashqlar.`,

        formulas: [
            {
                name: 'Modda miqdori (massadan)',
                formula: '\\nu = \\frac{m}{M}',
                text: 'ν = m / M',
                description: 'Massadan modda miqdorini hisoblash',
                variables: [
                    { symbol: 'ν', name: 'Modda miqdori', unit: 'mol' },
                    { symbol: 'm', name: 'Massa', unit: 'kg' },
                    { symbol: 'M', name: 'Molyar massa', unit: 'kg/mol' }
                ]
            },
            {
                name: 'Modda miqdori (zarrachalar sonidan)',
                formula: '\\nu = \\frac{N}{N_A}',
                text: 'ν = N / NA',
                description: 'Zarrachalar sonidan modda miqdorini hisoblash',
                variables: [
                    { symbol: 'ν', name: 'Modda miqdori', unit: 'mol' },
                    { symbol: 'N', name: 'Zarrachalar soni', unit: '' },
                    { symbol: 'N_A', name: 'Avogadro soni', unit: 'mol⁻¹' }
                ]
            },
            {
                name: 'Birlashtirilgan formula',
                formula: '\\nu = \\frac{m}{M} = \\frac{N}{N_A}',
                text: 'ν = m/M = N/NA',
                description: 'Modda miqdorining umumiy ifodasi',
                variables: [
                    { symbol: 'ν', name: 'Modda miqdori', unit: 'mol' },
                    { symbol: 'm', name: 'Massa', unit: 'kg' },
                    { symbol: 'M', name: 'Molyar massa', unit: 'kg/mol' },
                    { symbol: 'N', name: 'Zarrachalar soni', unit: '' },
                    { symbol: 'N_A', name: 'Avogadro soni', unit: 'mol⁻¹' }
                ]
            }
        ],

        examples: [
            {
                title: "Kislorodda necha mol?",
                problem: "32 g kislorod (O₂) da necha mol bor?",
                given_data: { "m": "32 g", "M(O₂)": "32 g/mol" },
                solution_steps: [
                    "Formula: ν = m / M",
                    "ν = 32 / 32",
                    "ν = 1 mol"
                ],
                solution: "Kislorod O₂ ning molyar massasi 32 g/mol. ν = m/M = 32/32 = 1 mol.",
                answer: "ν = 1 mol",
                difficulty: 'easy'
            },
            {
                title: "2 mol suvning massasi",
                problem: "2 mol suv (H₂O) ning massasi qancha?",
                given_data: { "ν": "2 mol", "M(H₂O)": "18 g/mol" },
                solution_steps: [
                    "Formula: m = ν × M",
                    "m = 2 × 18",
                    "m = 36 g"
                ],
                solution: "m = νM = 2 × 18 = 36 g. 2 mol suvning massasi 36 gramm.",
                answer: "m = 36 g",
                difficulty: 'easy'
            },
            {
                title: "Ko'p bosqichli masala",
                problem: "44 g karbonat angidrid (CO₂) da nechta molekula bor?",
                given_data: { "m": "44 g", "M(CO₂)": "44 g/mol", "NA": "6.02 × 10²³ mol⁻¹" },
                solution_steps: [
                    "1-qadam: Modda miqdorini topamiz: ν = m/M = 44/44 = 1 mol",
                    "2-qadam: Molekulalar soni: N = ν × NA",
                    "N = 1 × 6.02 × 10²³",
                    "N = 6.02 × 10²³ ta molekula"
                ],
                solution: "Avval mol topamiz: ν = 44/44 = 1 mol. Keyin N = νNA = 1 × 6.02×10²³ = 6.02×10²³.",
                answer: "N = 6.02 × 10²³ ta molekula",
                difficulty: 'medium'
            },
            {
                title: "Massani topish",
                problem: "3.01 × 10²³ ta azot (N₂) molekulasining massasi qancha?",
                given_data: { "N": "3.01 × 10²³", "M(N₂)": "28 g/mol", "NA": "6.02 × 10²³ mol⁻¹" },
                solution_steps: [
                    "1-qadam: Modda miqdori: ν = N/NA = 3.01×10²³ / 6.02×10²³ = 0.5 mol",
                    "2-qadam: Massa: m = ν × M = 0.5 × 28 = 14 g"
                ],
                solution: "ν = N/NA = 3.01×10²³/6.02×10²³ = 0.5 mol. m = νM = 0.5×28 = 14 g.",
                answer: "m = 14 g",
                difficulty: 'medium'
            }
        ]
    },

    questions: [
        {
            id: 1, question: "Mol nima?",
            options: ["Massa birligi", "Modda miqdori birligi", "Hajm birligi", "Kuch birligi"],
            correct: 1, explanation: "Mol — SI tizimida modda miqdorining asosiy o'lchov birligi.", difficulty: 'easy'
        },
        {
            id: 2, question: "1 molda nechta zarracha bor?",
            options: ["10²³", "6.02 × 10²³", "6.02 × 10²²", "10²⁴"],
            correct: 1, explanation: "1 mol = 6.02 × 10²³ ta zarracha. Bu Avogadro soni.", difficulty: 'easy'
        },
        {
            id: 3, question: "Modda miqdorini topish formulasi qaysi?",
            options: ["ν = m × M", "ν = m / M", "ν = M / m", "ν = m + M"],
            correct: 1, explanation: "ν = m/M — bu modda miqdorini massadan topish formulasi.", difficulty: 'easy'
        },
        {
            id: 4, question: "36 g suv (H₂O) da necha mol bor? (M = 18 g/mol)",
            options: ["1 mol", "2 mol", "3 mol", "18 mol"],
            correct: 1, explanation: "ν = m/M = 36/18 = 2 mol.", difficulty: 'medium'
        },
        {
            id: 5, question: "3 mol vodorod (H₂) ning massasi? (M = 2 g/mol)",
            options: ["2 g", "3 g", "6 g", "12 g"],
            correct: 2, explanation: "m = ν × M = 3 × 2 = 6 g.", difficulty: 'medium'
        },
        {
            id: 6, question: "12.04 × 10²³ ta molekula — bu necha mol?",
            options: ["0.5 mol", "1 mol", "2 mol", "3 mol"],
            correct: 2, explanation: "ν = N/NA = 12.04×10²³ / 6.02×10²³ = 2 mol.", difficulty: 'medium'
        }
    ]
};
