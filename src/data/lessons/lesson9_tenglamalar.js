// DARS 9: IDEAL GAZ HOLATINING TENGLAMALARI
export const lesson9 = {
    id: '9-l-28', chapter_id: '9-ch-02',
    title: 'Ideal gaz holatining tenglamalari',
    description: "Klapeyron-Mendeleyev tenglamasining turli shakllari va qo'llanilishi.",
    order_number: 9, duration_minutes: 50, video_url: 'https://www.youtube.com/embed/8_XmkR3Y6wU', has_lab: false, test_count: 8, difficulty: 'hard',
    content: {
        key_concepts: ['Klapeyron-Mendeleyev tenglamasi', "Tenglamaning turli shakllari", 'Birlashtirilgan gaz qonuni', 'Amaliy qo\'llash'],
        theory: `Bu darsda ideal gaz tenglamasining barcha shakllarini batafsil o'rganamiz va ularni turli vaziyatlarda qo'llashni o'rganamiz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

KLAPEYRON-MENDELEYEV TENGLAMASI

Ideal gazning asosiy tenglamasi:

PV = νRT

Bu tenglamani turli shakllarda yozish mumkin:

1-SHAKL (mol orqali): PV = νRT
   Qachon ishlatiladi: modda miqdori (mol) ma'lum bo'lganda

2-SHAKL (massa orqali): PV = (m/M)RT
   Qachon ishlatiladi: gazning massasi va molyar massasi ma'lum bo'lganda

3-SHAKL (zichlik orqali): P = ρRT/M
   Qachon ishlatiladi: zichlik ma'lum bo'lganda (ρ = m/V)

4-SHAKL (molekulalar soni orqali): PV = NkT
   Qachon ishlatiladi: molekulalar soni ma'lum bo'lganda
   k = R/NA = 1.38 × 10⁻²³ J/K — Boltsman doimiysi

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BIRLASHTILGAN GAZ QONUNI

Agar gazning massasi o'zgarmasa (m = const), quyidagi tenglik o'rinli:

PV/T = const (o'zgarmas massa uchun)

Bu shuni anglatadi:
P₁V₁/T₁ = P₂V₂/T₂

Bu formula gazning holati o'zgarganda (bosim, hajm yoki temperatura o'zgarganda) parametrlarni hisoblash imkonini beradi.

Bu birlashtilgan gaz qonunidan maxsus holatlar kelib chiqadi:
• T = const → PV = const (Boyl-Mariot qonuni — keyingi dars)
• P = const → V/T = const (Gay-Lyussak qonuni)
• V = const → P/T = const (Sharl qonuni)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NORMAL SHAROIT (N.SH.)

Normal sharoit — bu standart bosim va temperaturada gazning holati:
• P₀ = 101325 Pa = 1 atm
• T₀ = 273.15 K = 0°C

Normal sharoitda 1 mol gazning hajmi:
V₀ = RT₀/P₀ = 8.314 × 273 / 101325 ≈ 0.0224 m³ = 22.4 L

Bu barcha ideal gazlar uchun bir xil! 1 mol vodorod ham, 1 mol kislorod ham normal sharoitda 22.4 litr hajm egallaydi.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AMALIY QO'LLANISHLAR

Havo shari: Issiq havo kengayib, balon ko'tariladi (V va T bog'liq)
Avtomobil shinasi: Harorat oshsa, shina bosimi oshadi (P va T bog'liq)
Siqilgan gaz balloni: Bosim ostida gaz kichik hajmda (P va V bog'liq)
Suv osti sho'ng'in: Chuqurlikda bosim oshadi, havo pufaklari kichrayadi

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

XULOSA
1. PV = νRT — asosiy shakl
2. Turli shakllarda yozish mumkin: massa, zichlik, molekulalar soni orqali
3. P₁V₁/T₁ = P₂V₂/T₂ — birlashtilgan gaz qonuni
4. Normal sharoit: P₀ = 1 atm, T₀ = 273 K, V₀ = 22.4 L/mol

KEYINGI DARSDA: Izotermik jarayon — Boyl-Mariot qonuni.`,

        formulas: [
            { name: "Asosiy tenglama", formula: 'PV = \\nu RT', text: 'PV = νRT', description: "Klapeyron-Mendeleyev", variables: [{ symbol: 'P', name: 'Bosim', unit: 'Pa' }, { symbol: 'V', name: 'Hajm', unit: 'm³' }, { symbol: 'ν', name: 'Mol', unit: 'mol' }, { symbol: 'R', name: 'Gaz doimiysi', unit: 'J/(mol·K)' }, { symbol: 'T', name: 'Temperatura', unit: 'K' }] },
            { name: "Massa orqali", formula: 'PV = \\frac{m}{M} RT', text: 'PV = (m/M)RT', description: "Massa va molyar massa", variables: [{ symbol: 'm', name: 'Massa', unit: 'kg' }, { symbol: 'M', name: 'Molyar massa', unit: 'kg/mol' }] },
            { name: "Birlashtilgan qonun", formula: '\\frac{P_1 V_1}{T_1} = \\frac{P_2 V_2}{T_2}', text: 'P₁V₁/T₁ = P₂V₂/T₂', description: "O'zgarmas massa uchun", variables: [{ symbol: 'P₁,P₂', name: 'Bosimlar', unit: 'Pa' }, { symbol: 'V₁,V₂', name: 'Hajmlar', unit: 'm³' }, { symbol: 'T₁,T₂', name: 'Temperaturalar', unit: 'K' }] },
            { name: "Normal sharoit hajmi", formula: 'V_0 = 22{,}4 \\text{ L/mol}', text: 'V₀ = 22.4 L/mol', description: "1 mol gazning normal sharoitdagi hajmi", variables: [] }
        ],

        examples: [
            { title: "Gazning zichligi", problem: "Azot (N₂) ning 27°C da 1 atm bo'lgandagi zichligini toping.", given_data: { "M(N₂)": "0.028 kg/mol", "T": "300 K", "P": "101325 Pa" }, solution_steps: ["P = ρRT/M → ρ = PM/(RT)", "ρ = 101325 × 0.028 / (8.314 × 300)", "ρ = 2837.1 / 2494.2", "ρ ≈ 1.137 kg/m³"], solution: "ρ = PM/(RT) = 101325×0.028/(8.314×300) ≈ 1.137 kg/m³.", answer: "ρ ≈ 1.14 kg/m³", difficulty: 'medium' },
            { title: "Holat o'zgarishi", problem: "Gaz dastlab P₁ = 1 atm, V₁ = 10 L, T₁ = 300 K. T₂ = 600 K, V₂ = 5 L da bosim?", given_data: { "P₁": "1 atm", "V₁": "10 L", "T₁": "300 K", "T₂": "600 K", "V₂": "5 L" }, solution_steps: ["P₁V₁/T₁ = P₂V₂/T₂", "P₂ = P₁V₁T₂/(T₁V₂)", "P₂ = 1 × 10 × 600 / (300 × 5)", "P₂ = 6000/1500 = 4 atm"], solution: "P₂ = P₁V₁T₂/(T₁V₂) = 1×10×600/(300×5) = 4 atm.", answer: "P₂ = 4 atm", difficulty: 'medium' },
            { title: "Normal sharoitga keltirish", problem: "5 L gaz 2 atm da 27°C. Normal sharoitda hajmi?", given_data: { "V₁": "5 L", "P₁": "2 atm", "T₁": "300 K", "P₂": "1 atm", "T₂": "273 K" }, solution_steps: ["P₁V₁/T₁ = P₂V₂/T₂", "V₂ = P₁V₁T₂/(T₁P₂)", "V₂ = 2×5×273/(300×1)", "V₂ = 2730/300 = 9.1 L"], solution: "V₂ = 2×5×273/(300×1) = 9.1 L.", answer: "V₂ = 9.1 L", difficulty: 'hard' }
        ]
    },
    questions: [
        { id: 1, question: "Normal sharoitda 1 mol gaz hajmi?", options: ["11.2 L", "22.4 L", "44.8 L", "8.314 L"], correct: 1, explanation: "Normal sharoitda 1 mol ideal gaz 22.4 litr hajm egallaydi.", difficulty: 'easy' },
        { id: 2, question: "PV = (m/M)RT formulasida M nima?", options: ["Massa", "Mol", "Molyar massa", "Molekula soni"], correct: 2, explanation: "M — molyar massa (1 mol moddaning massasi, kg/mol).", difficulty: 'easy' },
        { id: 3, question: "P₁V₁/T₁ = P₂V₂/T₂ qachon ishlatiladi?", options: ["Har doim", "m = const bo'lganda", "T = const bo'lganda", "P = const bo'lganda"], correct: 1, explanation: "Birlashtilgan gaz qonuni massa o'zgarmagan (m = const) holda ishlaydi.", difficulty: 'medium' },
        { id: 4, question: "Gaz bosimi 2 marta oshib, hajmi 2 marta kamaysa, T qanday o'zgaradi?", options: ["O'zgarmaydi", "2 marta oshadi", "4 marta oshadi", "2 marta kamayadi"], correct: 0, explanation: "PV/T = const. P×2, V/2 bo'lsa, PV o'zgarmaydi, demak T ham o'zgarmaydi.", difficulty: 'hard' },
        { id: 5, question: "P = ρRT/M dan ρ nimaga teng?", options: ["PM/T", "PM/(RT)", "RT/(PM)", "MR/(PT)"], correct: 1, explanation: "ρ = PM/(RT).", difficulty: 'medium' },
        { id: 6, question: "Normal sharoit qanday belgilanadi?", options: ["P=1atm, T=0°C", "P=2atm, T=0°C", "P=1atm, T=20°C", "P=1atm, T=100°C"], correct: 0, explanation: "Normal sharoit: P₀ = 1 atm = 101325 Pa, T₀ = 273 K = 0°C.", difficulty: 'easy' },
        { id: 7, question: "Havo shari nimaga ko'tariladi?", options: ["Magnit kuch", "Issiq havo yengilroq", "Shamol", "Gravitatsiya"], correct: 1, explanation: "Issiq havo kengayadi, zichligi kamayadi va atrofdagi sovuq havodan yengil bo'ladi — Arximed kuchi ta'sirida ko'tariladi.", difficulty: 'medium' },
        { id: 8, question: "k = R/NA formulasida k nima?", options: ["Kelvin", "Boltsman doimiysi", "Gaz doimiysi", "Koeffitsient"], correct: 1, explanation: "k = R/NA = 1.38×10⁻²³ J/K — Boltsman doimiysi.", difficulty: 'easy' }
    ]
};
