// DARS 12: IZOXORIK JARAYON (Sharl qonuni)
export const lesson12 = {
    id: '9-l-31', chapter_id: '9-ch-02',
    title: 'Izoxorik jarayon',
    description: "Sharl qonuni — o'zgarmas hajmda bosim va temperatura bog'liqligi.",
    order_number: 12, duration_minutes: 45, video_url: '', has_lab: false, test_count: 6, difficulty: 'medium',
    content: {
        key_concepts: ['Izoxorik jarayon', 'Sharl qonuni', 'P-T diagramma (izoxora)', 'Bosim va temperatura proporsional'],
        theory: `Uchinchi va oxirgi izojarayonni o'rganamiz — IZOXORIK JARAYON. Bu safar hajm o'zgarmas.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Izoxorik jarayon nima?

Izoxorik jarayon — bu hajm o'zgarmas qolgan (V = const) holda bosim va temperaturaning o'zgarishi.

"Izo" — teng, bir xil
"Xorik" — hajm (yunon. χώρος — joy, makon)
"Izoxorik" — bir xil hajmli

Qachon sodir bo'ladi? — Yopiq, qattiq idishda gaz qizdirilganda yoki sovutilganda. Idish kengaymaydi, shuning uchun hajm o'zgarmaydi.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sharl qonuni

Bu qonunni fransuz fizigi Jak Sharl 1787 yilda kashf etgan.

Qonun: O'zgarmas hajmda ideal gazning bosimi temperaturaga TO'G'RIDAN-TO'G'RI PROPORSIONAL.

P/T = const (V = const, m = const)

Yoki: P₁/T₁ = P₂/T₂

Bu nimani anglatadi?
• Temperatura 2 marta oshsa → bosim 2 marta oshadi
• Temperatura 3 marta kamaysa → bosim 3 marta kamayadi
• P/T nisbati doimo bir xil

DIQQAT: Temperatura KELVIN da bo'lishi SHART!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Grafik — izoxora

P-T diagrammada izoxorik jarayon TO'G'RI CHIZIQ shaklida chiziladi (0 nuqtadan boshlangan).

Xususiyatlari:
• To'g'ri chiziq T = 0 K da P = 0 ga boradi
• Hajm kichik bo'lsa → chiziq tik (ko'proq qiyalik, tezroq bosim oshadi)
• Hajm katta bo'lsa → chiziq yotiq (kamroq qiyalik)

P-V diagrammada: vertikal to'g'ri chiziq (V o'zgarmaydi)
V-T diagrammada: gorizontal chiziq (V o'zgarmaydi)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hayotiy misollar

1. Avtomobil shinasi: Uzoq yo'l yurib, shina qiziganda — bosim oshadi (V ≈ const)
2. Yopiq idishdagi gaz balloni: Qizdirish xavfli — bosim oshadi, portlashi mumkin!
3. Aerozol balloni: Olovga tashlash mumkin emas — bosim oshib, portlaydi
4. Bosim pishirgich: Yopiq qozon ichida bug' hosil bo'lib, bosim oshadi

⚠️ XAVFSIZLIK: Yopiq idishdagi gazni qizdirish xavfli! Bosim haddan tashqari oshsa — portlash sodir bo'ladi. Gaz ballonlarini olovdan uzoq saqlang!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Uchta izojarayonni solishtirish

| Jarayon | O'zgarmas | Qonun | Formula | Grafik (asosiy) |
|---------|-----------|-------|---------|-----------------|
| Izotermik | T | Boyl-Mariot | PV = const | P-V: giperbola |
| Izobarik | P | Gay-Lyussak | V/T = const | V-T: to'g'ri chiziq |
| Izoxorik | V | Sharl | P/T = const | P-T: to'g'ri chiziq |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Xulosa
• Izoxorik: V = const
• P/T = const (Sharl)
• P va T to'g'ridan proporsional
• Yopiq idishlarda kuzatiladi

KEYINGI DARSDA: Amaliy mashg'ulot — Molekula o'lchamini baholash.`,

        formulas: [
            { name: "Sharl qonuni", formula: '\\frac{P_1}{T_1} = \\frac{P_2}{T_2}', text: 'P₁/T₁ = P₂/T₂', description: "V = const bo'lganda", variables: [{ symbol: 'P₁,P₂', name: 'Bosimlar', unit: 'Pa' }, { symbol: 'T₁,T₂', name: 'Temperaturalar', unit: 'K' }] },
            { name: "Izoxorik shart", formula: '\\frac{P}{T} = \\text{const}', text: 'P/T = const', description: "V va m o'zgarmas", variables: [] },
            { name: "Izoxorikda bosim", formula: 'P_2 = P_1 \\cdot \\frac{T_2}{T_1}', text: 'P₂ = P₁ × T₂/T₁', description: "Yangi temperaturada bosimni topish", variables: [] }
        ],

        examples: [
            { title: "Shina bosimi", problem: "Shinada bosim 2 atm (T = 27°C). Yo'lda 87°C ga qizidi. Bosim?", given_data: { "P₁": "2 atm", "T₁": "27°C = 300 K", "T₂": "87°C = 360 K", "V": "const" }, solution_steps: ["P₁/T₁ = P₂/T₂", "P₂ = P₁ × T₂/T₁", "P₂ = 2 × 360/300 = 2.4 atm"], solution: "P₂ = 2 × 360/300 = 2.4 atm.", answer: "P₂ = 2.4 atm", difficulty: 'easy' },
            { title: "Gaz balloni", problem: "Ballon bosimi 20°C da 150 atm. 50°C ga qizisa, bosim?", given_data: { "P₁": "150 atm", "T₁": "293 K", "T₂": "323 K" }, solution_steps: ["P₂ = P₁ × T₂/T₁", "P₂ = 150 × 323/293", "P₂ ≈ 165.4 atm"], solution: "P₂ = 150 × 323/293 ≈ 165.4 atm.", answer: "P₂ ≈ 165.4 atm", difficulty: 'medium' },
            { title: "Temperatura topish", problem: "Idishdagi bosim 1 atm (0°C). Bosim 2 atm ga oshdi. T = ?", given_data: { "P₁": "1 atm", "T₁": "273 K", "P₂": "2 atm" }, solution_steps: ["T₂ = T₁ × P₂/P₁", "T₂ = 273 × 2/1 = 546 K", "t₂ = 546 - 273 = 273°C"], solution: "T₂ = 273 × 2 = 546 K = 273°C.", answer: "T₂ = 546 K = 273°C", difficulty: 'medium' }
        ]
    },
    questions: [
        { id: 1, question: "Izoxorik jarayonda nima o'zgarmas?", options: ["Bosim", "Temperatura", "Hajm", "Massa faqat"], correct: 2, explanation: "Izoxorik (izo=teng, xorik=hajm): V = const.", difficulty: 'easy' },
        { id: 2, question: "Sharl qonuni?", options: ["PV = const", "V/T = const", "P/T = const", "PT = const"], correct: 2, explanation: "V = const da P/T = const — Sharl qonuni.", difficulty: 'easy' },
        { id: 3, question: "T 3 marta oshsa, P qanday? (V=const)", options: ["3 marta kamayadi", "O'zgarmaydi", "3 marta oshadi", "9 marta oshadi"], correct: 2, explanation: "P/T = const, T 3 marta oshsa, P ham 3 marta oshadi.", difficulty: 'easy' },
        { id: 4, question: "P-T diagrammada izoxora?", options: ["Giperbola", "Parabola", "To'g'ri chiziq", "Egri chiziq"], correct: 2, explanation: "P/T = const, P = const × T — bu to'g'ri chiziq.", difficulty: 'medium' },
        { id: 5, question: "Yopiq idish qizdirilganda nima sodir bo'ladi?", options: ["Hajm oshadi", "Bosim oshadi", "Massa oshadi", "Hech narsa"], correct: 1, explanation: "Yopiq idishda V = const. T oshsa, P oshadi (Sharl qonuni).", difficulty: 'easy' },
        { id: 6, question: "P₁=3atm, T₁=300K, T₂=450K. P₂=? (V=const)", options: ["2 atm", "3 atm", "4.5 atm", "6 atm"], correct: 2, explanation: "P₂ = P₁×T₂/T₁ = 3×450/300 = 4.5 atm.", difficulty: 'medium' }
    ]
};

// DARS 13: AMALIY MASHG'ULOT
export const lesson13 = {
    id: '9-l-32', chapter_id: '9-ch-02',
    title: "Amaliy mashg'ulot: Molekula o'lchamini baholash",
    description: "Laboratoriya ishi — oddiy tajriba orqali molekula o'lchamini taxminiy aniqlash.",
    order_number: 13, duration_minutes: 45, video_url: '', has_lab: true, test_count: 5, difficulty: 'medium',
    content: {
        key_concepts: ["Molekula o'lchamini tajribada aniqlash", "Moy tomchisi usuli", "Ilmiy metod", "Tajriba natijalarini tahlil"],
        theory: `Bu darsda amaliy tajriba o'tkazamiz — oddiy usullar bilan molekula o'lchamini baholaymiz!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Maqsad

Moy tomchisining suvda tarqalishini kuzatib, oleyin kislotasi molekulasining taxminiy o'lchamini aniqlash.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nazariy asos

Moy suvga tomizilganda u yupqa qatlam bo'lib tarqaladi. Agar moy bir molekula qalinligida tarqalsa, biz molekulaning o'lchamini hisoblashimiz mumkin.

Formulalar:
• Moy tomchisining hajmi: V_tomchi
• Tarqalgan doiraning diametri: D
• Tarqalgan doiraning yuzasi: S = πD²/4
• Qatlam qalinligi (≈ molekula diametri): d = V_tomchi / S

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Zarur asboblar

1. Keng idish (diameter 20-30 cm) — suv uchun
2. Oleyin kislotasi yoki o'simlik moyi
3. Pipetka (tomchi hajmini bilish uchun)
4. Lineyka (millimetrovkali)
5. Talk kukuni yoki lyukopodiy (suvga sepish)
6. Kichik shisha (eritma tayyorlash)
7. Kalkulyator

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tajriba tartibi

1-QADAM: Eritma tayyorlash
• Oleyin kislotani spirtda eritamiz (1:200 nisbatda)
• Bu eritma juda yupqa tomchi olish imkonini beradi

2-QADAM: Suv tayyorlash
• Keng idishga suv quying
• Suv yuzasiga talk kukunini yupqa qatlam qilib seping
  (talk — moy doirasini ko'rish uchun kerak)

3-QADAM: Tomchi tomizish
• Pipetka bilan eritma tomchisini suv yuzasiga tomizing
• Talk yorilib, moy doirasi ko'rinadi

4-QADAM: O'lchash
• Doiraning diametrini lineyka bilan o'lchang (D)
• Tajribani 3-5 marta takrorlang
• O'rtacha natijani hisoblang

5-QADAM: Hisoblash
• Tomchi hajmi: V (pipetka orqali aniq ma'lum, ~0.02 mL)
• Doira yuzasi: S = πD²/4
• Molekula diametri: d = V/S

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Namunaviy natijalar

Misol:
• V_tomchi = 0.02 mL = 2 × 10⁻⁸ m³ (eritma 1:200, toza moy hajmi ≈ 10⁻¹⁰ m³)
• D = 20 cm = 0.2 m
• S = π × (0.2)² / 4 = 0.0314 m²
• d = 10⁻¹⁰ / 0.0314 ≈ 3.18 × 10⁻⁹ m

Bu natija haqiqiy qiymatga yaqin (oleyin kislotasi ~2-3 nm).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Xavfsizlik qoidalari
• Oleyin kislotani ehtiyotkorlik bilan ishlating
• Spirt yonuvchan — olovdan uzoq!
• Tajribadan keyin qo'llarni yuvish

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Xulosa

Bu oddiy tajriba bizga:
1. Molekulalar juda kichikligini isbotlaydi (~10⁻⁹-10⁻¹⁰ m)
2. Oddiy asboblar bilan ham ilmiy natija olish mumkinligini ko'rsatadi
3. Fizikada tajriba va nazariyaning bog'liqligini namoyish qiladi

KEYINGI DARSDA: Yakuniy masalalar — barcha mavzulardan masalalar yechish.`,

        formulas: [
            { name: "Molekula diametri", formula: 'd = \\frac{V}{S} = \\frac{4V}{\\pi D^2}', text: 'd = V/S = 4V/(πD²)', description: "Moy tomchisi tajribasidan", variables: [{ symbol: 'd', name: 'Molekula diametri', unit: 'm' }, { symbol: 'V', name: 'Tomchi hajmi', unit: 'm³' }, { symbol: 'S', name: "Tarqalgan yuza", unit: 'm²' }, { symbol: 'D', name: 'Doira diametri', unit: 'm' }] },
            { name: "Doira yuzasi", formula: 'S = \\frac{\\pi D^2}{4}', text: 'S = πD²/4', description: "Moy tarqalgan doiraning yuzasi", variables: [{ symbol: 'S', name: 'Yuza', unit: 'm²' }, { symbol: 'D', name: 'Diametr', unit: 'm' }] }
        ],

        examples: [
            { title: "Tajriba natijasi", problem: "Moy tomchisi (V = 10⁻¹⁰ m³) D = 15 cm doira hosil qildi. Molekula diametrini toping.", given_data: { "V": "10⁻¹⁰ m³", "D": "15 cm = 0.15 m" }, solution_steps: ["S = πD²/4 = 3.14 × (0.15)²/4 = 0.01767 m²", "d = V/S = 10⁻¹⁰/0.01767", "d ≈ 5.66 × 10⁻⁹ m ≈ 5.66 nm"], solution: "S = 0.01767 m². d = 10⁻¹⁰/0.01767 ≈ 5.66 nm.", answer: "d ≈ 5.66 nm", difficulty: 'medium' }
        ]
    },
    questions: [
        { id: 1, question: "Moy tomchisi tajribasida nima o'lchanadi?", options: ["Massa", "Temperatura", "Doira diametri", "Bosim"], correct: 2, explanation: "Moy tarqalgan doiraning diametrini o'lchab, molekula qalinligini hisoblaymiz.", difficulty: 'easy' },
        { id: 2, question: "Talk kukuni nima uchun ishlatiladi?", options: ["Moyni eritish", "Doirani ko'rish uchun", "Suvni tozalash", "Temperaturani o'lchash"], correct: 1, explanation: "Talk kukuni suv yuzasida moy tarqalgan doirani aniq ko'rish imkonini beradi.", difficulty: 'easy' },
        { id: 3, question: "Molekula diametri taxminan?", options: ["10⁻³ m", "10⁻⁶ m", "10⁻¹⁰ m", "10⁻¹⁵ m"], correct: 2, explanation: "Molekula diametri taxminan 10⁻¹⁰ m = 0.1 nm.", difficulty: 'easy' },
        { id: 4, question: "d = V/S formulasida S nima?", options: ["Hajm", "Bosim", "Tarqalgan yuza", "Massa"], correct: 2, explanation: "S — moy tomchisi suv yuzasida tarqalgan doiraning yuzasi.", difficulty: 'easy' },
        { id: 5, question: "Nima uchun tajriba 3-5 marta takrorlanadi?", options: ["Vaqtni sarflash", "Aniqlikni oshirish", "Moyni sarflash", "Ko'p ma'lumot"], correct: 1, explanation: "Tajribani takrorlash xatolarni kamaytiradi va o'rtacha natija aniqroq bo'ladi.", difficulty: 'easy' }
    ]
};

// DARS 14: YAKUNIY MASALALAR
export const lesson14 = {
    id: '9-l-33', chapter_id: '9-ch-02',
    title: "Yakuniy masalalar va takrorlash",
    description: "Barcha mavzulardan yakuniy masalalar yechish va bobni takrorlash.",
    order_number: 14, duration_minutes: 50, video_url: '', has_lab: false, test_count: 10, difficulty: 'hard',
    content: {
        key_concepts: ['Barcha formulalarni qo\'llash', 'Murakkab masalalar', "Bilimlarni mustahkamlash", "Imtihonga tayyorgarlik"],
        theory: `Bu yakuniy darsda I bob (Molekulyar-kinetik nazariya) bo'yicha barcha mavzularni takrorlaymiz va turli darajadagi masalalar yechamiz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Barcha formulalar

1. MOLEKULA VA MOL:
   • m₀ = M/NA — bir molekula massasi
   • N = (m × NA)/M — molekulalar soni
   • ν = m/M = N/NA — modda miqdori

2. IDEAL GAZ:
   • PV = νRT — Klapeyron-Mendeleyev
   • PV = (m/M)RT
   • P = ρRT/M

3. TEMPERATURA VA ENERGIYA:
   • T(K) = t(°C) + 273
   • E = (3/2)kT
   • v = √(3RT/M)

4. IZOJARAYONLAR:
   • Izotermik (T=const): PV = const
   • Izobarik (P=const): V/T = const
   • Izoxorik (V=const): P/T = const

5. BIRLASHTILGAN:
   • P₁V₁/T₁ = P₂V₂/T₂

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Doimiylar

• NA = 6.02 × 10²³ mol⁻¹
• R = 8.314 J/(mol·K)
• k = 1.38 × 10⁻²³ J/K

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Oson masalalar

1. Azot atomining massasi (M = 14 g/mol)
   m₀ = M/NA = 0.014/6.02×10²³ = 2.33×10⁻²⁶ kg

2. 54 g suv = necha mol?
   ν = m/M = 54/18 = 3 mol

3. 0°C → Kelvin: T = 0 + 273 = 273 K

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

O'rta masalalar

4. 2 mol O₂ 27°C da 0.02 m³ da. Bosim?
   P = νRT/V = 2×8.314×300/0.02 = 249420 Pa ≈ 2.46 atm

5. 127°C da N₂ tezligi?
   v = √(3RT/M) = √(3×8.314×400/0.028) = √356314 ≈ 597 m/s

6. Gaz 1 atm da 10 L, 27°C. Hajm 2 marta kamayib, T = 127°C bo'lsa P?
   P₂ = P₁V₁T₂/(T₁V₂) = 1×10×400/(300×5) = 2.67 atm

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Qiyin masalalar

7. 10 L idishda 27°C da kislorod, bosim 5 atm. Shu idishga 32 g kislorod qo'shilsa (T o'zgarmaydi), bosim qancha bo'ladi?
   n₁ = P₁V/(RT) = 5×101325×0.01/(8.314×300) = 2.03 mol
   n₂ = 32/32 = 1 mol
   P₂ = (n₁+n₂)RT/V = 3.03×8.314×300/0.01 = 755754 Pa ≈ 7.46 atm

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Imtihonga maslahatlar

1. Formulalarni yod oling — tushunib yod oling, mexanik emas
2. Birliklarni doimo tekshiring (kg, m³, Pa, K)
3. °C ni K ga aylantirni unutmang!
4. Avval formula yozing, keyin son qo'ying
5. Javobni mantiqiy tekshiring

Barcha mavzularni o'rganganingiz bilan tabriklaymiz! 🎉`,

        formulas: [
            { name: "Klapeyron-Mendeleyev", formula: 'PV = \\nu RT', text: 'PV = νRT', description: "Ideal gazning asosiy tenglamasi", variables: [{ symbol: 'P', name: 'Bosim', unit: 'Pa' }, { symbol: 'V', name: 'Hajm', unit: 'm³' }, { symbol: 'ν', name: 'Mol', unit: 'mol' }] },
            { name: "Birlashtilgan qonun", formula: '\\frac{P_1V_1}{T_1} = \\frac{P_2V_2}{T_2}', text: 'P₁V₁/T₁ = P₂V₂/T₂', description: "Barcha 3 parametr o'zgarsa", variables: [] },
            { name: "Tezlik", formula: 'v = \\sqrt{\\frac{3RT}{M}}', text: 'v = √(3RT/M)', description: "O'rtacha kvadratik tezlik", variables: [] },
            { name: "Kinetik energiya", formula: 'E = \\frac{3}{2}kT', text: 'E = (3/2)kT', description: "Molekulaning o'rtacha kinetik energiyasi", variables: [] }
        ],

        examples: [
            { title: "Kompleks masala 1", problem: "2 mol kislorod (O₂) 27°C, 0.02 m³ da. Bosim va molekulalar tezligi?", given_data: { "ν": "2 mol", "T": "300 K", "V": "0.02 m³", "M": "0.032 kg/mol" }, solution_steps: ["P = νRT/V = 2×8.314×300/0.02 = 249420 Pa ≈ 2.46 atm", "v = √(3RT/M) = √(3×8.314×300/0.032)", "v = √233569 ≈ 483 m/s"], solution: "P ≈ 2.46 atm, v ≈ 483 m/s.", answer: "P ≈ 249 kPa, v ≈ 483 m/s", difficulty: 'medium' },
            { title: "Kompleks masala 2", problem: "Gaz 1 atm, 10 L, 300 K. Hajm 5 L ga kamayib, T = 400 K. P₂ = ?", given_data: { "P₁": "1 atm", "V₁": "10 L", "T₁": "300 K", "V₂": "5 L", "T₂": "400 K" }, solution_steps: ["P₁V₁/T₁ = P₂V₂/T₂", "P₂ = P₁V₁T₂/(T₁V₂)", "P₂ = 1 × 10 × 400 / (300 × 5)", "P₂ = 4000/1500 ≈ 2.67 atm"], solution: "P₂ = 1×10×400/(300×5) ≈ 2.67 atm.", answer: "P₂ ≈ 2.67 atm", difficulty: 'hard' },
            { title: "Kompleks masala 3", problem: "Idishda 10 L O₂, 5 atm, 27°C. 32 g O₂ qo'shildi. Yangi bosim?", given_data: { "V": "10 L = 0.01 m³", "P₁": "5 atm", "T": "300 K", "qo'shilgan": "32 g O₂" }, solution_steps: ["ν₁ = P₁V/(RT) = 5×101325×0.01/(8.314×300) ≈ 2.03 mol", "ν_qo'sh = 32/32 = 1 mol", "ν₂ = 2.03 + 1 = 3.03 mol", "P₂ = ν₂RT/V = 3.03×8.314×300/0.01 ≈ 755754 Pa ≈ 7.46 atm"], solution: "Dastlabki mol: 2.03. Qo'shilgan: 1 mol. Jami: 3.03 mol. P₂ ≈ 7.46 atm.", answer: "P₂ ≈ 7.46 atm", difficulty: 'hard' }
        ]
    },
    questions: [
        { id: 1, question: "NA = ?", options: ["8.314", "1.38 × 10⁻²³", "6.02 × 10²³", "273"], correct: 2, explanation: "NA = 6.02 × 10²³ mol⁻¹ — Avogadro soni.", difficulty: 'easy' },
        { id: 2, question: "PV = νRT da R = ?", options: ["6.02 × 10²³", "8.314", "1.38 × 10⁻²³", "22.4"], correct: 1, explanation: "R = 8.314 J/(mol·K) — universal gaz doimiysi.", difficulty: 'easy' },
        { id: 3, question: "36 g H₂O = necha mol?", options: ["1", "2", "18", "36"], correct: 1, explanation: "ν = m/M = 36/18 = 2 mol.", difficulty: 'easy' },
        { id: 4, question: "Izotermik jarayonda qaysi formula ishlatiladi?", options: ["PV=const", "V/T=const", "P/T=const", "PT=const"], correct: 0, explanation: "T=const da PV = const (Boyl-Mariot).", difficulty: 'easy' },
        { id: 5, question: "-73°C = ? K", options: ["73", "200", "346", "400"], correct: 1, explanation: "T = -73 + 273 = 200 K.", difficulty: 'easy' },
        { id: 6, question: "3 mol He 400 K da 0.01 m³ da. P = ?", options: ["500 kPa", "750 kPa", "998 kPa", "1247 kPa"], correct: 2, explanation: "P = νRT/V = 3×8.314×400/0.01 = 997680 Pa ≈ 998 kPa.", difficulty: 'medium' },
        { id: 7, question: "v = √(3RT/M) da M oshsa v qanday?", options: ["Oshadi", "Kamayadi", "O'zgarmaydi", "Aniqlab bo'lmaydi"], correct: 1, explanation: "v ∝ 1/√M. M oshsa, v kamayadi.", difficulty: 'medium' },
        { id: 8, question: "Gay-Lyussak qonuni qaysi jarayonga tegishli?", options: ["Izotermik", "Izobarik", "Izoxorik", "Adiabatik"], correct: 1, explanation: "Izobarik (P=const) da V/T = const — Gay-Lyussak qonuni.", difficulty: 'medium' },
        { id: 9, question: "500 K da O₂ tezligi taxminan?", options: ["200 m/s", "400 m/s", "625 m/s", "900 m/s"], correct: 2, explanation: "v = √(3×8.314×500/0.032) = √390094 ≈ 625 m/s.", difficulty: 'hard' },
        { id: 10, question: "P₁=2atm, V₁=6L, T₁=300K → V₂=3L, T₂=600K. P₂=?", options: ["2 atm", "4 atm", "8 atm", "16 atm"], correct: 2, explanation: "P₂ = P₁V₁T₂/(T₁V₂) = 2×6×600/(300×3) = 7200/900 = 8 atm.", difficulty: 'hard' }
    ]
};
