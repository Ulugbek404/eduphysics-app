// DARS 3: MODDA MIQDORI. AVOGADRO DOIMIYSI
// TO'LIQ KONTENT

export const lesson3 = {
    id: '9-l-22',
    chapter_id: '9-ch-02',
    title: 'Modda miqdori',
    description: "Modda miqdori, Avogadro doimiysi, molyar massa va konsentratsiya tushunchalarini o'rganish.",
    order_number: 3,
    duration_minutes: 45,
    video_url: 'https://www.youtube.com/embed/_DFRhRgxsRA',
    has_lab: false,
    test_count: 6,
    difficulty: 'easy',

    content: {
        key_concepts: [
            'Mol — modda miqdori birligi',
            'Avogadro doimiysi (NA)',
            'Molyar massa va nisbiy molekulyar massa',
            'Molekulalar soni va konsentratsiyasi'
        ],

        theory: `🔹 **Modda miqdori**

Makroskopik (*makro* — so‘zi yunoncha *katta* degan ma’noni anglatadi) jismning tarkibida atom yoki molekulalar nihoyatda ko‘p bo‘lganligidan, ularning sonini massasi **12 g** bo‘lgan uglerod moddasidagi atomlar soni bilan taqqoslash qabul qilingan.

📌 **1 mol** — moddaning shunday miqdoriki, undagi atom yoki molekulalar soni **12 g** ugleroddagi atomlar soniga teng.

Bu ta’rifdan barcha moddalarning **1 mol** miqdoridagi molekula (yoki atom)lar soni o‘zaro teng degan o‘ta muhim xulosa kelib chiqadi. Xalqaro birliklar sistemasi (XBS) da modda miqdorini **mol**da ifodalash qabul qimonadi. Modda miqdori yunoncha **ν (nyu)** harfi bilan belgilanadi.

━━━

🔹 **Avogadro doimiysi**

📌 **Avogadro doimiysi** — miqdori **1 mol** bo‘lgan moddadagi molekulalar soni italyan olimi *Amedeo Avogadro* sharafiga shunday ataladi. U fundamental fizik kattalik bo‘lib, **N_A** deb belgilanadi. Uning qiymati: **N_A = 6,022 · 10²³ mol⁻¹** ga teng.

Agar modda miqdori **ν** ga teng bo‘lsa, undagi molekulalar soni **N** quyidagicha aniqlanadi:
**N = ν · N_A   (1)**

Modda miqdorini topish uchun modda tarkibidagi molekulalar sonini Avogadro soniga bo‘lish kerak:
**ν = N / N_A   (2)**

📖 **Amedeo Avogadro** (1776–1856) — mashhur italyan fizigi va kimyogari. Turin universiteti professori bo‘lgan. U modda miqdori va gazlar molekulyar nazariyasi asoschisi hisoblanadi. Uning 1811-yilda ilgari surgan gipotezasi keyinchalik fizikaning eng muhim qonunlaridan biriga aylandi va uning sharafiga fundamental doimiy *Avogadro soni* deb nomlandi.

━━━

🔹 **Molyar massa va Nisbiy molekulyar massa**

📌 **Molyar massa** — miqdori **1 mol** bo‘lgan moddaning massasiga aytiladi va **M** harfi bilan belgilanadi.

Ta’rifga ko‘ra, moddaning molyar massasi uning bitta molekulasining massasi **m₀** bilan Avogadro doimiysining ko‘paytmasiga teng:
**M = m₀ · N_A   (3)**

Molyar massaning birligi XBS da **kg/mol** qabul qilingan. (3) ifodadan foydalanib bitta molekulaning massasini osongina hisoblash mumkin:
**m₀ = M / N_A   (4)**

Demak, har qanday modda molekulasining massasini aniqlash uchun uning molyar massasini Avogadro doimiysiga bo‘lish kifoya.

Nisbiy molekulyar massa **M_r = m₀ / ( (1/12) · m₀_C )** ifodasidan bitta molekula massasi **m₀** ni topib, (3) formulaga qo‘ysak, **M = (1/12) · m₀_C · M_r · N_A** ifoda kelib chiqadi. Bu ifodaga uglerod atomining massasi va Avogadro doimiysining qiymatlarini qo‘ysak, quyidagi sodda va qulay bog‘lanish hosil bo‘ladi:
**M = M_r · 10⁻³ kg/mol   yoki   M = M_r g/mol**

Demak, molyar massa son jihatidan nisbiy molekulyar massaga teng, faqat uning o‘lchov birligi **g/mol** da ifodalanadi. Kimyoviy elementlar davriy sistemasi yordamida istalgan moddaning nisbiy molekulyar massasini aniqlab, uning molyar massasini topishimiz mumkin.
• **Karbonat angidrid gazi (CO₂):** karbonat angidrid gazining molekulasi uchun nisbiy molekulyar massa **M_r(CO₂) = 44 u** ga teng. U holda karbonat angidrid gazi uchun molyar massa **M = 44 g/mol = 0,044 kg/mol** bo‘ladi.

━━━

🔹 **Molekulalar sonini hisoblash**

Ixtiyoriy moddaning massasini topish uchun uni tashkil qilgan molekulalar sonini bitta molekulaning massasiga ko‘paytirish kerak:
**m = m₀ · N   (5)**

(4) tenglikni (5) ifodaga qo‘ysak:
**m = (M / N_A) · N   (6)**

(1) ifodani inobatga olsak, (6) ifodadan quyidagi formula kelib chiqadi:
**ν = m / M   (7)**

U holda (1) tenglikni (7) ifodaga ko‘ra yozsak:
**N = (m / M) · N_A   (8)**

Bu ifoda yordamida massasi ma’lum bo‘lgan har qanday modda tarkibidagi molekulalar yoki atomlar sonini aniqlash mumkin.

━━━

🔹 **Molekulalar konsentratsiyasi**

📌 **Molekulalar konsentratsiyasi** — hajm birligidagi molekulalar soniga aytiladi va **n** harfi bilan belgilanadi.

Ta’rifga ko‘ra, modda molekulalarining konsentratsiyasi quyidagicha hisoblanadi:
**n = N / V   (9)**
bunda **N** — idishdagi molekulalar soni, **V** — idish hajmi. Konsentratsiyaning XBS dagi birligi: **[n] = m⁻³** (metr minus uchinchi darajasi).

(9) ifodadagi **N** ning o‘rniga (8) ifodani qo‘yib, konsentratsiyani aniqlashning yana bir muhim formulasini hosil qilamiz:
**n = N / V = (1/V) · (m/M) · N_A = (ρ / M) · N_A   (10)**

Ushbu (10) ifodadan foydalanib modda zichligi **ρ** ni ham topishimiz mumkin:
**ρ = n · m₀**

━━━

🔹 **Masala yechish namunasi**

✏️ **1-masala:** Hajmi **54 cm³** bo‘lgan suvdagi molekulalar sonini aniqlang.
• **Berilgan:**
  V = 54 cm³ = 54 · 10⁻⁶ m³
  ρ = 1 g/cm³ = 1000 kg/m³
  M = 18 g/mol = 18 · 10⁻³ kg/mol
  N_A = 6,02 · 10²³ mol⁻¹
• **Topish kerak:** N = ?
• **Formulasi:** m = ρ · V;  N = (m / M) · N_A  =>  **N = (ρ · V · N_A) / M**
• **Hisoblash:**
  m = 1 g/cm³ · 54 cm³ = 54 g
  N = (54 / 18) · 6,02 · 10²³ = 3 · 6,02 · 10²³ = **1,806 · 10²⁴ ta**
• **Javob:** N = 1,806 · 10²⁴ ta

✏️ **2-masala:** **136 mol** simob qancha hajmni egallaydi? Simobning zichligi **13,6 g/cm³**, molyar massasi **200 g/mol**.
• **Berilgan:**
  ν = 136 mol
  ρ = 13,6 g/cm³ = 13,6 · 10³ kg/m³
  M = 200 · 10⁻³ kg/mol
• **Topish kerak:** V = ?
• **Formulasi:** ν = m / M  =>  m = ν · M;  V = m / ρ  =>  **V = (ν · M) / ρ**
• **Hisoblash:** V = (136 · 200 · 10⁻³) / (13,6 · 10³) = 27,2 / 13600 = **0,002 m³ = 2 dm³ = 2 litr**
• **Javob:** V = 2 · 10⁻³ m³ (yoki 2 litr)

━━━

❓ **Savol va topshiriqlar:**
1. Modda miqdori deb nimaga aytiladi? Uning o‘lchov birligi nima?
2. Avogadro doimiysining son qiymatini ayting va uni izohlang.
3. Molyar massa deb qanday kattalikka aytiladi? Ozon, karbonat angidrid va metan gazi uchun molyar massa nimaga teng?
4. Moddadagi molekulalar soni qanday hisoblanadi?
5. Idishdagi suv molekulalarining konsentratsiyasini qanday aniqlaysiz? Idishning o‘lchov darajasi ml da berilgan.

🔹 **Mashqlar va amaliy masalalar:**
1. Massasi **270 g** bo‘lgan suvdagi modda miqdorini aniqlang.
2. Miqdori **8 mol** bo‘lgan karbonat angidrid (**CO₂**) gazining massasi nimaga teng?
3. Massasi **7 g** bo‘lgan azot (**N₂**) tarkibidagi molekulalar sonini aniqlang.
4. Moddaning molyar massasi **36 g/mol** ga teng bo‘lsa, shu modda bitta molekulasining massasini aniqlang.`,

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
                name: 'Molekulalar konsentratsiyasi',
                formula: 'n = \\frac{N}{V} = \\frac{\\rho}{M} N_A',
                text: 'n = N / V = (ρ / M) * NA',
                description: 'Hajm birligidagi zarrachalar soni',
                variables: [
                    { symbol: 'n', name: 'Konsentratsiya', unit: 'm⁻³' },
                    { symbol: 'N', name: 'Zarrachalar soni', unit: '' },
                    { symbol: 'V', name: 'Hajm', unit: 'm³' },
                    { symbol: 'ρ', name: 'Zichlik', unit: 'kg/m³' },
                    { symbol: 'M', name: 'Molyar massa', unit: 'kg/mol' },
                    { symbol: 'N_A', name: 'Avogadro doimiysi', unit: 'mol⁻¹' }
                ]
            }
        ],

        examples: [
            {
                title: "Karbonat angidridda necha mol?",
                problem: "88 g karbonat angidrid (CO₂) da necha mol bor?",
                given_data: { "m": "88 g", "M(CO₂)": "44 g/mol" },
                solution_steps: [
                    "Formula: ν = m / M",
                    "ν = 88 / 44",
                    "ν = 2 mol"
                ],
                solution: "Karbonat angidrid CO₂ ning molyar massasi 44 g/mol. ν = m/M = 88/44 = 2 mol.",
                answer: "ν = 2 mol",
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
                title: "Suvdagi molekulalar soni",
                problem: "54 g suvdagi molekulalar sonini aniqlang.",
                given_data: { "m": "54 g", "M(H₂O)": "18 g/mol", "NA": "6.02 × 10²³ mol⁻¹" },
                solution_steps: [
                    "1-qadam: Modda miqdorini topamiz: ν = m/M = 54/18 = 3 mol",
                    "2-qadam: Molekulalar soni: N = ν × NA",
                    "N = 3 × 6.02 × 10²³ = 1.806 × 10²⁴"
                ],
                solution: "Avval molni topamiz: ν = 54/18 = 3 mol. Keyin N = νNA = 3 × 6.02×10²³ = 1.806×10²⁴.",
                answer: "N = 1.806 × 10²⁴ ta molekula",
                difficulty: 'medium'
            },
            {
                title: "Azot molekulasining massasi",
                problem: "Azot (N₂) ning bir molekulasining massasini toping.",
                given_data: { "M(N₂)": "28 g/mol = 0.028 kg/mol", "NA": "6.02 × 10²³ mol⁻¹" },
                solution_steps: [
                    "Azot gazi formulasi: N₂ — 2 ta azot atomi",
                    "Molyar massa: M = 28 g/mol = 0.028 kg/mol",
                    "Bir molekulaning massasi: m₀ = M / NA",
                    "m₀ = 0.028 / (6.02 × 10²³)",
                    "m₀ ≈ 4.65 × 10⁻²⁶ kg"
                ],
                solution: "Azot N₂ ning molyar massasi 28 g/mol. Bir molekula massasi: m₀ = M/NA = 0.028/(6.02×10³⁴) ≈ 4.65×10⁻²⁶ kg.",
                answer: "m₀ ≈ 4.65 × 10⁻²⁶ kg",
                difficulty: 'medium'
            }
        ]
    },

    questions: [
        {
            id: 1, question: "Modda miqdorining o'lchov birligi nima?",
            options: ["Kilogramm (kg)", "Mol (mol)", "Metr kub (m³)", "Kelvin (K)"],
            correct: 1, explanation: "Xalqaro birliklar sistemasida modda miqdori 'mol'da o'lchanadi. Belgisi: ν.", difficulty: 'easy'
        },
        {
            id: 2, question: "Avogadro doimiysining qiymati qancha?",
            options: ["6.02 × 10²² mol⁻¹", "6.02 × 10²³ mol⁻¹", "6.02 × 10²⁴ mol⁻¹", "6.02 × 10²⁵ mol⁻¹"],
            correct: 1, explanation: "Avogadro doimiysi NA = 6.02 × 10²³ mol⁻¹ — 1 moldagi zarrachalar soni.", difficulty: 'easy'
        },
        {
            id: 3, question: "Molyar massa nima?",
            options: ["Bir dona molekula massasi", "1 mol moddaning massasi", "Hajm birligidagi zarrachalar soni", "Zichlik ko'paytmasi"],
            correct: 1, explanation: "Molyar massa — 1 mol moddaning massasidir. O'lchov birligi kg/mol yoki g/mol.", difficulty: 'easy'
        },
        {
            id: 4, question: "Karbonat angidrid (CO₂) ning molyar massasi qancha?",
            options: ["16 g/mol", "32 g/mol", "44 g/mol", "28 g/mol"],
            correct: 2, explanation: "CO₂: M_r = 12 + 16×2 = 44. Molyar massasi: M = 44 g/mol.", difficulty: 'medium'
        },
        {
            id: 5, question: "Hajm birligidagi zarrachalar soniga nima deyiladi?",
            options: ["Modda miqdori", "Zichlik", "Molyar massa", "Molekulalar konsentratsiyasi"],
            correct: 3, explanation: "Hajm birligidagi molekulalar soniga konsentratsiya deyiladi. n = N / V.", difficulty: 'medium'
        },
        {
            id: 6, question: "270 g suvda (H₂O) necha mol bor? (M = 18 g/mol)",
            options: ["10 mol", "15 mol", "20 mol", "5 mol"],
            correct: 1, explanation: "ν = m / M = 270 / 18 = 15 mol.", difficulty: 'hard'
        }
    ]
};
