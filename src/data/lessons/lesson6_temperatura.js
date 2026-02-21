// DARS 6: TEMPERATURA
export const lesson6 = {
    id: '9-l-25', chapter_id: '9-ch-02',
    title: 'Temperatura',
    description: "Temperatura tushunchasi, Kelvin va Selsiy shkalasi, absolyut nol, molekulalarning kinetik energiyasi.",
    order_number: 6, duration_minutes: 45, video_url: 'https://www.youtube.com/embed/UekvCbX8N0s', has_lab: false, test_count: 8, difficulty: 'medium',
    content: {
        key_concepts: ['Temperaturaning fizik ma\'nosi', 'Kelvin va Selsiy shkalasi', 'Absolyut nol', 'Boltsman doimiysi', 'Molekulalarning kinetik energiyasi'],
        theory: `Har kuni biz "issiq", "sovuq", "iliq" so'zlarini ishlatamiz. Lekin fizikada temperatura nima? U faqat "issiqlik darajasi" emas — u molekulalar harakatining o'lchovidir!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TEMPERATURA NIMA?

Fizik ma'noda temperatura — bu moddaning molekulalarining O'RTACHA KINETIK ENERGIYASINING o'lchovi.

Bu nima degani?
• Issiq jism — uning molekulalari tez harakat qiladi (kinetik energiyasi katta)
• Sovuq jism — uning molekulalari sekin harakat qiladi (kinetik energiyasi kichik)

Demak, temperatura molekulalarning harakatlanish tezligini ifodalaydi!

Muhim: Temperatura ALOHIDA molekulaning emas, barcha molekulalarning O'RTACHA kinetik energiyasini ko'rsatadi. Ba'zi molekulalar tezroq, ba'zilari sekinroq — lekin o'rtacha qiymat temperaturaga teng.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TEMPERATURA SHKALASI

Temperaturani o'lchash uchun turli shkalalar ishlatiladi:

SELSIY SHKALASI (°C)
• Taklif qilgan: Anders Selsiy (1742)
• 0°C — suvning muzlash temperaturasi
• 100°C — suvning qaynash temperaturasi
• Kundalik hayotda ishlatiladi

KELVIN SHKALASI (K)
• Taklif qilgan: Lord Kelvin (Uilyam Tomson)
• SI tizimida asosiy temperatura birligi
• 0 K — absolyut nol (eng past mumkin bo'lgan temperatura)
• Manfiy temperatura yo'q!

Konvertatsiya formulasi:
T(K) = t(°C) + 273

Misollar:
• 0°C = 273 K
• 20°C = 293 K (xona harorati)
• 100°C = 373 K (qaynash)
• -273°C = 0 K (absolyut nol)
• 37°C = 310 K (inson tanasining normal harorati)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ABSOLYUT NOL

Absolyut nol — bu mumkin bo'lgan eng past temperatura.

T = 0 K = -273.15°C

Bu temperaturada:
• Molekulalar harakati to'xtaydi (nazariy jihatdan)
• Kinetik energiya nolga teng
• Bu temperaturaga etib bo'lmaydi — faqat yaqinlashish mumkin

Olimlar absolyut nolga juda yaqin temperaturalarga erishgan:
• 2003 yilda: 0.5 nanokelvin (0.5 × 10⁻⁹ K)
• Kosmosda eng sovuq joy: 2.7 K (kosmik fon nurlanishi)
• Suyuq geliy: 4.2 K (-269°C)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MOLEKULALARNING O'RTACHA KINETIK ENERGIYASI

Ideal gaz molekulasining o'rtacha kinetik energiyasi temperaturaga to'g'ridan-to'g'ri proporsional:

E = (3/2)kT

Bu yerda:
• E — bir molekulaning o'rtacha kinetik energiyasi (J)
• k — Boltsman doimiysi = 1.38 × 10⁻²³ J/K
• T — absolyut temperatura (K)

Bu formula nima deydi?
• Temperatura 2 marta oshsa, kinetik energiya ham 2 marta oshadi
• Absolyut nolda (T = 0 K) kinetik energiya nolga teng
• Bu formula BARCHA ideal gazlar uchun ishlaydi

Muhim: Bu formulada molekulaning massasi yo'q! Demak, bir xil temperaturadagi barcha gaz molekulalari bir xil o'rtacha kinetik energiyaga ega — og'ir yoki yengil bo'lishidan qat'i nazar.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TERMOMETRLAR

Temperaturani o'lchash asboblari — termometrlar. Turli xillari bor:

1. Simob termometr: -39°C dan 357°C gacha (simobning suyuqlanish va qaynash T si)
2. Spirtli termometr: -115°C dan 78°C gacha
3. Elektron termometr: -50°C dan 300°C gacha
4. Infraqizil termometr: -50°C dan 1000°C gacha (kontaktsiz)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TEMPERATURANING AMALIY AHAMIYATI

• Tibbiyot: Tana harorati — kasallik belgisi (36.6°C — normal)
• Ob-havo: Havo temperaturasi — kundalik prognoz
• Sanoat: Metalllarni ishlashda temperatura nazorati muhim
• Oziq-ovqat: Saqlash temperaturasi (muzlatkich: 4°C, muzlash: -18°C)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

XULOSA

1. Temperatura — molekulalarning o'rtacha kinetik energiyasining o'lchovi
2. T(K) = t(°C) + 273 — Kelvin va Selsiy orasidagi bog'lanish
3. Absolyut nol: 0 K = -273°C — molekulalar harakati to'xtaydi
4. E = (3/2)kT — kinetik energiya va temperatura bog'liqligi
5. k = 1.38 × 10⁻²³ J/K — Boltsman doimiysi

KEYINGI DARSDA: Gaz molekulalarining harakat tezligi.`,

        formulas: [
            { name: "Kelvin-Selsiy konvertatsiyasi", formula: 'T = t + 273', text: 'T(K) = t(°C) + 273', description: "Selsiydan Kelvin ga o'tish", variables: [{ symbol: 'T', name: 'Absolyut temperatura', unit: 'K' }, { symbol: 't', name: 'Selsiy temperaturasi', unit: '°C' }] },
            { name: "O'rtacha kinetik energiya", formula: 'E_k = \\frac{3}{2} k T', text: 'E = (3/2)kT', description: "Molekulaning o'rtacha kinetik energiyasi", variables: [{ symbol: 'E_k', name: 'Kinetik energiya', unit: 'J' }, { symbol: 'k', name: 'Boltsman doimiysi', unit: 'J/K' }, { symbol: 'T', name: 'Temperatura', unit: 'K' }] },
            { name: "Boltsman doimiysi", formula: 'k = 1{,}38 \\times 10^{-23} \\text{ J/K}', text: 'k = 1.38 × 10⁻²³ J/K', description: "Boltsman doimiysi", variables: [{ symbol: 'k', name: 'Boltsman doimiysi', unit: 'J/K' }] },
            { name: "R va k bog'liqligi", formula: 'k = \\frac{R}{N_A}', text: 'k = R / NA', description: "Universal gaz doimiysi va Boltsman doimiysi", variables: [{ symbol: 'R', name: 'Universal gaz doimiysi', unit: 'J/(mol·K)' }, { symbol: 'N_A', name: 'Avogadro soni', unit: 'mol⁻¹' }] }
        ],

        examples: [
            { title: "Konvertatsiya", problem: "20°C ni Kelvin ga aylantiring.", given_data: { "t": "20°C" }, solution_steps: ["T = t + 273", "T = 20 + 273 = 293 K"], solution: "T = 20 + 273 = 293 K", answer: "T = 293 K", difficulty: 'easy' },
            { title: "Kinetik energiya", problem: "27°C dagi ideal gaz molekulasining o'rtacha kinetik energiyasini toping.", given_data: { "t": "27°C → T = 300 K", "k": "1.38 × 10⁻²³ J/K" }, solution_steps: ["T = 27 + 273 = 300 K", "E = (3/2)kT", "E = 1.5 × 1.38 × 10⁻²³ × 300", "E = 6.21 × 10⁻²¹ J"], solution: "E = 1.5 × 1.38×10⁻²³ × 300 = 6.21×10⁻²¹ J.", answer: "E ≈ 6.21 × 10⁻²¹ J", difficulty: 'medium' },
            { title: "Temperatura topish", problem: "Molekulalarning o'rtacha kinetik energiyasi 9.315 × 10⁻²¹ J bo'lsa, temperatura qancha?", given_data: { "E": "9.315 × 10⁻²¹ J", "k": "1.38 × 10⁻²³ J/K" }, solution_steps: ["E = (3/2)kT → T = 2E/(3k)", "T = 2 × 9.315 × 10⁻²¹ / (3 × 1.38 × 10⁻²³)", "T = 1.863 × 10⁻²⁰ / 4.14 × 10⁻²³", "T = 450 K = 177°C"], solution: "T = 2E/(3k) = 2×9.315×10⁻²¹/(3×1.38×10⁻²³) = 450 K.", answer: "T = 450 K = 177°C", difficulty: 'hard' }
        ]
    },
    questions: [
        { id: 1, question: "Temperatura fizik jihatdan nimani ifodalaydi?", options: ["Jismning issiqligini", "Molekulalarning o'rtacha kinetik energiyasini", "Jismning massasini", "Bosimni"], correct: 1, explanation: "Temperatura — molekulalarning o'rtacha kinetik energiyasining o'lchovi.", difficulty: 'easy' },
        { id: 2, question: "Absolyut nol qancha?", options: ["-100°C", "-273°C", "0°C", "-373°C"], correct: 1, explanation: "Absolyut nol = 0 K = -273.15°C. Bu eng past mumkin bo'lgan temperatura.", difficulty: 'easy' },
        { id: 3, question: "100°C = ? K", options: ["100 K", "173 K", "273 K", "373 K"], correct: 3, explanation: "T = t + 273 = 100 + 273 = 373 K.", difficulty: 'easy' },
        { id: 4, question: "Boltsman doimiysi k = ?", options: ["8.314", "6.02 × 10²³", "1.38 × 10⁻²³", "273"], correct: 2, explanation: "k = 1.38 × 10⁻²³ J/K — Boltsman doimiysi.", difficulty: 'easy' },
        { id: 5, question: "Temperatura 2 marta oshsa, kinetik energiya qanday o'zgaradi?", options: ["O'zgarmaydi", "2 marta oshadi", "4 marta oshadi", "2 marta kamayadi"], correct: 1, explanation: "E = (3/2)kT formulasiga ko'ra T 2 marta oshsa, E ham 2 marta oshadi (to'g'ri proporsional).", difficulty: 'medium' },
        { id: 6, question: "300 K = ? °C", options: ["27°C", "73°C", "300°C", "573°C"], correct: 0, explanation: "t = T - 273 = 300 - 273 = 27°C.", difficulty: 'easy' },
        { id: 7, question: "E = (3/2)kT formulasida molekulaning massasi bormi?", options: ["Ha, m kerak", "Yo'q, M kerak", "Yo'q, massa yo'q", "Ha, m₀ kerak"], correct: 2, explanation: "E = (3/2)kT formulasida massa yo'q. Barcha gaz molekulalari bir xil T da bir xil o'rtacha kinetik energiyaga ega.", difficulty: 'medium' },
        { id: 8, question: "Absolyut nolda molekulalar holati?", options: ["Juda tez harakat", "Tartibli harakat", "Harakatsiz (nazariy)", "O'rtacha harakat"], correct: 2, explanation: "Absolyut nolda (0 K) nazariy jihatdan molekulalar harakati to'xtaydi. Amalda bu temperaturaga etib bo'lmaydi.", difficulty: 'medium' }
    ]
};
