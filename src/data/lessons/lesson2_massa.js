// DARS 2: MOLEKULANING MASSASI VA O'LCHAMI
// TO'LIQ KONTENT — ~3000 so'z

export const lesson2 = {
    id: '9-l-21',
    chapter_id: '9-ch-02',
    title: "Molekulaning massasi va o'lchami",
    description: "Avogadro soni, molyar massa, bir molekulaning massasini hisoblash va molekulalar sonini aniqlash.",
    order_number: 2,
    duration_minutes: 50,
    video_url: 'https://www.youtube.com/embed/vWaVF5QaDsk',
    has_lab: false,
    test_count: 8,
    difficulty: 'medium',

    content: {
        key_concepts: [
            'Broun harakati va amaliy modellar',
            'Molekula o\'lchamlari va zaytun moyi tajribasi',
            'IBM firmasi va Tunnelli mikroskop kashfiyoti',
            'Massa atom birligi (u)',
            'Nisbiy atom va molekulyar massa'
        ],

        theory: `🔹 **Broun harakatini kuzatish (Oddiy amaliy tajriba)**

🧪 **Uy sharoitidagi kuzatish:** Kechasi yotoqxonangizdagi chiroqni o‘chirib, fonar yordamida nur shu’lasini hosil qiling. Biror gazlama matoni nur shu’lasi yo‘liga silkiting. Yorug‘lik nurida havodagi chang zarralarining **to‘xtovsiz va tartibsiz harakat** qilayotganini ko‘rasiz. Bu tajriba modda zarralarining to‘xtovsiz harakatchanligini isbotlaydi.

🧪 **Mexanik model asosida molekulalarning tartibsiz harakatini ko‘rsatish:**
• **Kerakli jihozlar:** oq va qora rangdagi sharchalar (taxminan 20 tadan), tekis asosli chuqurroq idish (tarelka), flomaster.
• **Maqsad:** molekulalar tartibsiz harakatlanadi, degan gipotezani mexanik model asosida o‘rganish.
• **Bajarish tartibi:** Idishning ichki asosini flomasterda chizib, teng ikkiga ajrating. Idish asosining birinchi yarmiga oq rangdagi sharcha donalarini, ikkinchi yarmiga qora rangdagi sharcha donalarini soling. Idishni silkitib uning ichidagi sharcha donalarini harakatga keltiring.
• **Kuzatish va Xulosa:** Silkitish natijasida oq va qora sharchalar butunlay aralashib ketadi. Bu mexanik model molekulalarning tartibsiz harakati natijasida moddalarning o‘zaro aralashishini (diffuziyani) yaqqol tushuntiradi.

━━━

🔹 **Molekulalar**

Moddalar mayda zarralardan — **molekula** va **atom**lardan tashkil topganligini bilib oldingiz.

📌 Moddaning kimyoviy xossasini o‘zida saqlab qoladigan eng kichik zarrasiga **molekula** deyiladi.

Molekula bir xil yoki har xil kimyoviy elementlarning bir necha atomidan tashkil topadi. **Metallar** va **inert gazlar** tabiatda atom holda uchraydi. Metall va inert gazlardan boshqa moddalarning molekulasi eng kamida ikkita atomdan tashkil topgan bo‘ladi:
• **Vodorod gazi:** vodorod (H₂) molekulalaridan, har bir vodorod molekulasi esa 2 ta vodorod (H) atomidan iborat.
• **Kislorod moddasi:** kislorod (O₂) molekulalaridan, har bir kislorod molekulasi 2 ta kislorod (O) atomidan tuzilgan.
• **Suv moddasi:** suv (H₂O) molekulalaridan tashkil topgan. Har bir suv molekulasi 2 ta vodorod (H) va 1 ta kislorod (O) atomidan iborat.

━━━

🔹 **Molekulalarning o‘lchami**

Molekulalar juda kichik bo‘lganligidan ularni ko‘z bilan ko‘rib bo‘lmaydi. Ammo mana shu ko‘zga ko‘rinmas, nihoyatda mayda zarralar birikib, biz ko‘ra oladigan jismlar va moddalarni hosil qiladi. Molekulalarning o‘lchamini aniqlash imkonini beradigan ko‘pgina usullar mavjud. Shunday usullardan biri — **zaytun moyi tomchisining suv sirtida yoyilishi**ni ko‘rib chiqaylik. Agar idish katta bo‘lsa, moy qatlami suv ustini to‘liq qoplamaydi.

☕ **Moy qatlami tajribasi:** Hajmi 1 mm³ bo‘lgan zaytun moyi tomchisi suv sirtida taxminan 0,6 m² yuzani egallar ekan. Moy tomchisi suv yuzida eng katta yuzaga yoyilganda moy qatlamining qalinligini bitta molekula diametriga yaqin deb tasavvur qilish mumkin. Demak, moy qatlamining qalinligini aniqlab, molekula o‘lchamini taqriban hisoblash mumkin.

Moy qatlamining qalinligini quyidagicha aniqlaymiz. Moy qatlamining hajmi V, uning yoyilgan yuzasi S bilan qalinligi d ning ko‘paytmasiga teng:
**V = S · d   (1)**

Bu tenglikdan moy qatlamining qalinligi, ya’ni zaytun moyi molekulasining diametri quyidagiga teng bo‘ladi:
**d = V / S = 1 mm³ / 0,6 m² = 10⁻⁹ m³ / 0,6 m² ≈ 1,7 · 10⁻⁹ m**

Bunday o‘lchamdagi molekulani eng kuchli optik mikroskopda ham ilg‘ab bo‘lmaydi. O‘lchashda olingan natijalar asosida biz atomni radiusi **10⁻¹⁰ m** ga yaqin bo‘lgan shar ko‘rinishida tasavvur qilishimiz mumkin. Molekulalar bir nechta atomlardan tarkib topganligi uchun ularning diametri atomning diametridan kattaroq bo‘ladi.
• Vodorod molekulasining diametri: **d ≈ 2,3 · 10⁻¹⁰ m**
• Suv molekulasining diametri: **d ≈ 3 · 10⁻¹⁰ m**

💡 **Kattalashtirishni tasavvur qilish:** Bu o‘lchamlar shu qadar kichikki, ularni tasavvur qilish juda qiyin. Masalan, agar molekulani olmadek bo‘lguncha kattalashtirilsa, shuncha marta kattalashtirilgan olma **Yer sayyorasi**dek bo‘ladi! Yana shunday bir qiyoslash: agar tabiatdagi hamma narsa 10⁸ marta kattalashsa, bo‘yi 1 m bo‘lgan bolaning bo‘yi **100 000 km** ga yetadi.

📖 **Tunnelli Mikroskop:** Hozirgi kunda maxsus asboblar yordamida alohida atomlar va molekulalarning joylashish manzarasini hamda ularning o‘lchamini aniq o‘lchash imkoni mavjud. Shunday zamonaviy asboblardan biri **tunnelli mikroskop** bo‘lib, u 1980-yillarda mashhur *IBM (International Business Machines)* firmasi xodimlari tomonidan yaratilgan. Bu kashfiyotning mualliflari bo‘lgan *Gerd Binning* va *Geynrix Rorer*ga **1986-yili Nobel mukofoti** berilgan. Tunnelli mikroskop o‘lchamni **100 million marta** kattalashtirish imkoniyatiga ega. U yordamida uglerod atomining diametri **1,4 · 10⁻¹⁰ m** ga teng ekanligi va boshqa atomlarning o‘lchamlari ham aniqlangan. Tunnelli mikroskop yordamida moddani tashkil qilgan zarra tasvirining olinishi, moddaning atom va molekulalardan tashkil topganligiga ishonch hosil qilindi.

━━━

🔹 **Molekulaning massasi**

Molekulaning o‘lchami haqidagi ma’lumotlardan foydalanib, ularning massasini hisoblaymiz. Aytaylik, suv molekulasining diametri taxminan d ≈ 3 · 10⁻¹⁰ m bo‘lsa, u holda uning hajmi ham taxminan V ≈ d³ ≈ (3 · 10⁻¹⁰ m)³ ga teng bo‘ladi. Suv molekulalari bir-biriga zich tegib turadi deb, 1 m³ suvdagi molekulalar sonini hisoblaymiz:
**N = 1 m³ / (3 · 10⁻¹⁰ m)³ ≈ 3,7 · 10²⁸ ta**

1 m³ suvning massasi 1000 kg ga teng ekanligidan suv molekulasining massasini hisoblaymiz:
**m₀ = 1000 kg / (3,7 · 10²⁸) ≈ 2,7 · 10⁻²⁶ kg**

Hisoblash natijasiga ko‘ra, suv molekulasining massasi nihoyatda kichik ekanligi ko‘rinib turibdi. Atom (yoki molekula)larning o‘lchamlari qanchalik kichik bo‘lmasin, ularning massalari aniqlangan:
• Suv molekulasining massasi: **m₀(suv) ≈ 2,7 · 10⁻²⁶ kg**
• Kislorod molekulasining massasi: **m₀(kislorod) ≈ 5,32 · 10⁻²⁶ kg**
• Uglerod atomining massasi: **m₀(uglerod) ≈ 1,992 · 10⁻²⁶ kg**
• Simob atomining massasi: **m₀(simob) ≈ 3,337 · 10⁻²⁵ kg**

━━━

🔹 **Nisbiy atom (molekular) massa**

Yuqorida moddani tashkil qilgan molekulaning massasi juda kichik ekanligi ta’kidlab o‘tildi. Ammo bunday kichik massani oddiy tarozida o‘lchab bo‘lmaydi. Shu sababli atomning massasini ifodalash uchun maxsus **massa atom birligi (u)** tushunchasi kiritilgan.

📌 **Massa atom birligi (m.a.b.):** Xalqaro kelishuvga muvofiq barcha modda atomlarining massasini ¹²C uglerod atomi massasining 1/12 qismi bilan taqqoslash qabul qilingan. Massa atom birligi qiymati: **1 u ≈ 1,66 · 10⁻²⁷ kg** ga teng.

📌 **Nisbiy atom massasi:** Berilgan modda atomi massasining (m₀) uglerod atom massasi (m₀_C) 1/12 qismining nisbatiga, shu moddaning nisbiy atom massasi deyiladi.

Formulasi:
**A_r = m₀ / ( (1/12) · m₀_C )   (2)**

(2) ifodaga ko‘ra kislorod atomining nisbiy atom massasi:
**A_r = 5,32 · 10⁻²⁶ kg / (1,66 · 10⁻²⁷ kg) ≈ 16 u**

Nisbiy atom massa o‘lchovsiz kattalikdir. Barcha kimyoviy elementlarning nisbiy atom massasi *D.I.Mendeleyev*ning kimyoviy elementlar davriy sistemasida berilgan. Murakkab modda molekulasining nisbiy molekulyar massasini topish uchun uning tarkibiga kiruvchi elementlarning nisbiy atom massalarini qo‘shish kerak.
• **Suv (H₂O) molekulasining nisbiy molekulyar massasi:** ikkita vodorod atomining nisbiy massasiga bitta kislorod atomining nisbiy massasini qo‘shamiz:
**Mr(H₂O) = 1 · 2 + 16 = 18 u**

━━━

🔹 **Masala yechish namunasi**

✏️ **Masala:** Bir dona suv molekulasining massasi 3 · 10⁻²⁶ kg ga teng bo‘lsa, 12 cm³ suvda qancha molekula bor?
• **Berilgan:**
  m₀ = 3 · 10⁻²⁶ kg
  V = 12 cm³ = 12 · 10⁻⁶ m³
  ρ = 1000 kg/m³
• **Topish kerak:** N = ?
• **Formulasi:** m = ρ · V;   N = m / m₀  =>  **N = (ρ · V) / m₀**
• **Birliklar:** [N] = (kg/m³ · m³) / kg = birliklar
• **Hisoblash:** N = (10³ · 12 · 10⁻⁶) / (3 · 10⁻²⁶) = **4 · 10²³ ta**
• **Javob:** N = 4 · 10²³ ta

━━━

❓ **Savol va topshiriqlar:**
1. Molekulaga ta’rif bering va misollar keltiring.
2. Molekulaning o‘lchamini qanday aniqlash mumkin?
3. Atom va molekulaning o‘lchami qanday tartibda bo‘ladi?
4. Massaning atom birligi qilib qanday kattalik olingan?
5. Moddaning nisbiy molekulyar massasi qanday aniqlanadi?

🔹 **Mashqlar va amaliy masalalar:**
1. Massasi 2,4 kg bo‘lgan ko‘mirda qancha uglerod atomi borligini hisoblang. Uglerod atomining massasini 2 · 10⁻²⁶ kg ga teng deb oling.
2. Hajmi 0,2 mm³ bo‘lgan moy suv ustida yoyilib, taxminan 0,8 m² yuzali yupqa parda hosil qildi. Moy molekulalari suv yuzasida bir qavat bo‘lib tekis yoyilgan deb hisoblab, moy molekulasining chiziqli o‘lchamini aniqlang.
3. Bitta suv molekulasining massasi 3 · 10⁻²⁶ kg. Hajmi 5 cm³ bo‘lgan suvda qancha suv molekulasi bor?
4. Idishdagi suvda 10²⁴ ta suv molekulasi bo‘lsa, suvning hajmi qanday? Suv molekulasining diametrini 3 · 10⁻¹⁰ m ga teng deb oling.
5. Moy molekulasining diametri taxminan 2,6 · 10⁻¹⁰ m bo‘lsa, 35 cm³ moyda qancha moy molekulasi borligini aniqlang.`,

        

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
