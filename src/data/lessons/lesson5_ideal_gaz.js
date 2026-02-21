// DARS 5: IDEAL GAZ
export const lesson5 = {
   id: '9-l-24', chapter_id: '9-ch-02',
   title: 'Ideal gaz',
   description: "Ideal gaz modeli, uning xususiyatlari, Klapeyron-Mendeleyev tenglamasi va real gazlardan farqi.",
   order_number: 5, duration_minutes: 50, video_url: 'https://www.youtube.com/embed/B7xsuFR8bk0', has_lab: false, test_count: 8, difficulty: 'hard',
   content: {
      key_concepts: ['Ideal gaz modeli', 'Ideal gazning 3 ta xususiyati', 'Klapeyron-Mendeleyev tenglamasi', 'Universal gaz doimiysi', 'Real va ideal gaz farqi'],
      theory: `Oldingi darslarda biz molekulalar, ularning massasi va modda miqdori haqida o'rgandik. Endi eng muhim tushunchalardan biriga o'tamiz — IDEAL GAZ modeli.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IDEAL GAZ NIMA ?

   Ideal gaz — bu real gazning soddalashtirilgan matematik modeli.Bu modelda ba'zi haqiqiy xususiyatlar e'tiborga olinmaydi, lekin natijalar amaliyotga yaqin chiqadi.

Nima uchun model kerak ? Chunki real gazlar juda murakkab — milliardlab molekulalarning harakatini aniq hisoblash mumkin emas.Shuning uchun fiziklar soddalashtirilgan model yaratdi — ideal gaz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IDEAL GAZNING XUSUSIYATLARI

Ideal gaz modelida 3 ta asosiy taxmin(faraz) qabul qilinadi:

1. MOLEKULALARNING O'LCHAMI E'TIBORGA OLINMAYDI
   Molekulalar "nuqtaviy zarrachalar" deb qaraladi.Ya'ni ularning hajmi gazning umumiy hajmiga nisbatan juda kichik.

2. MOLEKULALAR FAQAT TO'QNASHGANDA TA'SIRLASHADI
   Molekulalar orasida tortishish yoki itarish kuchlari yo'q deb faraz qilinadi. Ular faqat to'g'ridan-to'g'ri to'qnashganda kuch ta'sir etadi.

3. TO'QNASHISHLAR ELASTIK
   Molekulalar to'qnashganda kinetik energiya saqlanadi. Ya'ni energiya yo'qolmaydi.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REAL VA IDEAL GAZ FARQI

Ideal gaz modeli qachon yaxshi ishlaydi ?
• Past bosimda(molekulalar uzoq, ta'sirlashish kam)
• Yuqori temperaturada(harakat tez, tortishish ta'siri kam)

Qachon ishlamaydi ?
• Juda yuqori bosimda(molekulalar yaqin, o'lcham muhim)
• Juda past temperaturada(tortishish muhim, gaz suyuqlikka aylanishi mumkin)

Havo, kislorod, azot, vodorod — odatiy sharoitlarda ideal gazga yaqin.Shuning uchun ideal gaz modeli amaliyotda juda foydali.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   ASOSIY PARAMETRLAR

Gazning holati uchta asosiy parametr bilan tavsiflanadi:

   1. BOSIM(P)
   Gaz molekulalari idish devoriga urilganda kuch hosil qiladi.Bu kuchning birlik yuzaga nisbati — bosim.
   Birlik: Paskal(Pa) = N / m²
   1 atm = 101325 Pa ≈ 10⁵ Pa

2. HAJM(V)
   Gaz egallagan fazoviy hajm.
   Birlik: m³(kubometr)
   1 litr = 10⁻³ m³

   3. TEMPERATURA(T)
   Molekulalarning o'rtacha kinetik energiyasining o'lchovi.
   Birlik: Kelvin(K)
   T(K) = t(°C) + 273

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   KLAPEYRON - MENDELEYEV TENGLAMASI

Bu ideal gazning asosiy tenglamasi:

   PV = νRT

Bu yerda:
• P — bosim(Pa)
• V — hajm(m³)
• ν — modda miqdori(mol)
• R — universal gaz doimiysi = 8.314 J / (mol·K)
• T — absolyut temperatura(K)

Bu tenglamani boshqa shakllarda ham yozish mumkin:

   1. PV = (m / M)RT — massa orqali
2. P = ρRT / M — zichlik orqali(ρ = m / V)
3. PV = NkT — molekulalar soni orqali(k = R / NA)

Bu yerda k = 1.38 × 10⁻²³ J / K — Boltsman doimiysi.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   UNIVERSAL GAZ DOIMIYSI

R = 8.314 J / (mol·K)

Bu doimiy barcha gazlar uchun bir xil! Shuning uchun "universal" deyiladi.

R ning ma'nosi: 1 mol ideal gazning temperaturasi 1 K ga oshganda, u bajaradigan ish.

R va k orasidagi bog'lanish:
k = R / NA = 8.314 / (6.02 × 10²³) = 1.38 × 10⁻²³ J / K

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   GAZ QONUNLARI GRAFIKLARI

Ideal gaz uchun P - V, P - T va V - T diagrammalar muhim ahamiyatga ega.Keyingi darslarda har bir izojarayonda bu grafiklar batafsil o'rganiladi.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   XULOSA

1. Ideal gaz — soddalashtirilgan gaz modeli
2. Uchta asosiy xususiyat: nuqtaviy zarrachalar, faqat to'qnashishda ta'sir, elastik to'qnashish
3. PV = νRT — ideal gazning asosiy tenglamasi
4. R = 8.314 J / (mol·K) — universal gaz doimiysi
5. Model past bosim va yuqori temperaturada yaxshi ishlaydi

KEYINGI DARSDA: Temperatura — fizik ma'nosi va o'lchov shkalari.`,

      formulas: [
         { name: 'Klapeyron-Mendeleyev tenglamasi', formula: 'PV = \\nu R T', text: 'PV = νRT', description: "Ideal gazning asosiy holat tenglamasi", variables: [{ symbol: 'P', name: 'Bosim', unit: 'Pa' }, { symbol: 'V', name: 'Hajm', unit: 'm³' }, { symbol: 'ν', name: 'Modda miqdori', unit: 'mol' }, { symbol: 'R', name: 'Universal gaz doimiysi', unit: 'J/(mol·K)' }, { symbol: 'T', name: 'Temperatura', unit: 'K' }] },
         { name: 'Massa orqali', formula: 'PV = \\frac{m}{M} R T', text: 'PV = (m/M)RT', description: "Massa va molyar massa orqali", variables: [{ symbol: 'm', name: 'Massa', unit: 'kg' }, { symbol: 'M', name: 'Molyar massa', unit: 'kg/mol' }] },
         { name: 'Zichlik orqali', formula: 'P = \\frac{\\rho R T}{M}', text: 'P = ρRT/M', description: "Zichlik orqali bosimni topish", variables: [{ symbol: 'ρ', name: 'Zichlik', unit: 'kg/m³' }] },
         { name: 'Molekulalar soni orqali', formula: 'PV = NkT', text: 'PV = NkT', description: "Boltsman doimiysi orqali", variables: [{ symbol: 'N', name: 'Molekulalar soni', unit: '' }, { symbol: 'k', name: 'Boltsman doimiysi', unit: 'J/K' }] },
         { name: 'Universal gaz doimiysi', formula: 'R = 8{,}314 \\text{ J/(mol·K)}', text: 'R = 8.314 J/(mol·K)', description: "Barcha gazlar uchun bir xil doimiy", variables: [{ symbol: 'R', name: 'Universal gaz doimiysi', unit: 'J/(mol·K)' }] }
      ],

      examples: [
         { title: "Idishdagi gaz bosimi", problem: "2 mol ideal gaz 300 K da 0.05 m³ idishda. Bosim qancha?", given_data: { "ν": "2 mol", "T": "300 K", "V": "0.05 m³", "R": "8.314 J/(mol·K)" }, solution_steps: ["PV = νRT", "P = νRT/V", "P = 2 × 8.314 × 300 / 0.05", "P = 4988.4 / 0.05 = 99768 Pa", "P ≈ 99.8 kPa ≈ 1 atm"], solution: "P = νRT/V = 2×8.314×300/0.05 = 99768 Pa ≈ 1 atm.", answer: "P ≈ 99.8 kPa ≈ 1 atm", difficulty: 'medium' },
         { title: "Havo shari hajmi", problem: "4 g geliy (He) 27°C da 1 atm bosimda qancha hajm egallaydi?", given_data: { "m": "4 g = 0.004 kg", "M(He)": "4 g/mol = 0.004 kg/mol", "T": "27°C = 300 K", "P": "1 atm = 101325 Pa" }, solution_steps: ["ν = m/M = 0.004/0.004 = 1 mol", "V = νRT/P", "V = 1 × 8.314 × 300 / 101325", "V ≈ 0.0246 m³ ≈ 24.6 litr"], solution: "ν = 1 mol. V = νRT/P = 8.314 × 300/101325 ≈ 0.0246 m³.", answer: "V ≈ 24.6 litr", difficulty: 'medium' },
         { title: "Gazning massasi", problem: "10 litr hajmdagi gaz 2 atm bosimda, 27°C da. Molyar massasi 28 g/mol. Massasi?", given_data: { "V": "10 L = 0.01 m³", "P": "2 atm = 202650 Pa", "T": "300 K", "M": "0.028 kg/mol" }, solution_steps: ["PV = (m/M)RT → m = PVM/(RT)", "m = 202650 × 0.01 × 0.028 / (8.314 × 300)", "m = 56.742 / 2494.2", "m ≈ 0.0228 kg ≈ 22.8 g"], solution: "m = PVM/(RT) = 202650×0.01×0.028/(8.314×300) ≈ 22.8 g.", answer: "m ≈ 22.8 g", difficulty: 'hard' }
      ]
   },
   questions: [
      { id: 1, question: "Ideal gazda molekulalar qanday faraz qilinadi?", options: ["Katta sharsimon", "Nuqtaviy zarrachalar", "Uzun zanjirlar", "Yassi disklar"], correct: 1, explanation: "Ideal gaz modelida molekulalar nuqtaviy zarrachalar deb faraz qilinadi — ularning o'lchami e'tiborga olinmaydi.", difficulty: 'easy' },
      { id: 2, question: "Universal gaz doimiysi R ning qiymati?", options: ["1.38 × 10⁻²³ J/K", "8.314 J/(mol·K)", "6.02 × 10²³", "9.8 m/s²"], correct: 1, explanation: "R = 8.314 J/(mol·K) — universal gaz doimiysi.", difficulty: 'easy' },
      { id: 3, question: "Ideal gaz tenglamasi qaysi?", options: ["F = ma", "PV = νRT", "E = mc²", "P = F/S"], correct: 1, explanation: "PV = νRT — Klapeyron-Mendeleyev tenglamasi (ideal gaz holat tenglamasi).", difficulty: 'easy' },
      { id: 4, question: "Ideal gaz modeli qachon yaxshi ishlaydi?", options: ["Yuqori bosim, past T", "Past bosim, yuqori T", "Har doim", "Hech qachon"], correct: 1, explanation: "Past bosimda molekulalar uzoq va o'lchami ahamiyatsiz, yuqori T da tortishish ta'siri kam.", difficulty: 'medium' },
      { id: 5, question: "1 mol ideal gaz 0°C da 1 atm da qancha hajm egallaydi?", options: ["11.2 L", "22.4 L", "44.8 L", "8.314 L"], correct: 1, explanation: "V = νRT/P = 1×8.314×273/101325 ≈ 0.0224 m³ = 22.4 L. Bu normal sharoit hajmi.", difficulty: 'medium' },
      { id: 6, question: "Boltsman doimiysi k = ?", options: ["8.314 J/(mol·K)", "6.02 × 10²³", "1.38 × 10⁻²³ J/K", "273 K"], correct: 2, explanation: "k = R/NA = 8.314/(6.02×10²³) = 1.38×10⁻²³ J/K.", difficulty: 'medium' },
      { id: 7, question: "PV = NkT formulasida N nima?", options: ["Mol soni", "Avogadro soni", "Molekulalar soni", "Neutronlar soni"], correct: 2, explanation: "N — bu berilgan miqdordagi barcha molekulalar soni.", difficulty: 'medium' },
      { id: 8, question: "27°C ni Kelvin ga aylantiring.", options: ["246 K", "273 K", "300 K", "327 K"], correct: 2, explanation: "T = t + 273 = 27 + 273 = 300 K.", difficulty: 'easy' }
   ]
};
