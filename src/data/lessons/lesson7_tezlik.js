// DARS 7: GAZ MOLEKULALARINING HARAKAT TEZLIGI
export const lesson7 = {
    id: '9-l-26', chapter_id: '9-ch-02',
    title: 'Gaz molekulalarining harakat tezligi',
    description: "O'rtacha kvadratik tezlik, Maxwell taqsimoti, tezlik va temperaturaning bog'liqligi.",
    order_number: 7, duration_minutes: 50, video_url: 'https://www.youtube.com/embed/5JEr0jx29Yg', has_lab: false, test_count: 8, difficulty: 'hard',
    content: {
        key_concepts: ["O'rtacha kvadratik tezlik", 'Maxwell taqsimoti', 'Tezlik va temperatura bog\'liqligi', 'Tezlik va massa bog\'liqligi'],
        theory: `Oldingi darsda biz temperaturaning molekulalarning kinetik energiyasi bilan bog'liqligini o'rgandik. Endi muhim savol: molekulalar qanday TEZLIKDA harakat qiladi?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MOLEKULALAR TEZLIGI

Gaz molekulalari juda tez harakat qiladi! Lekin hamma molekula bir xil tezlikda emas — ba'zilari tez, ba'zilari sekin.

Masalan, xona haroratida (20°C = 293 K):
• Vodorod (H₂) molekulalari: ~1800 m/s (ovoz tezligidan 5 marta tez!)
• Azot (N₂) molekulalari: ~510 m/s (ovoz tezligiga yaqin)
• Kislorod (O₂) molekulalari: ~480 m/s
• CO₂ molekulalari: ~400 m/s

Nima uchun yengil molekulalar tezroq? Chunki bir xil temperaturada barcha molekulalarning o'rtacha kinetik energiyasi teng: E = (3/2)kT. Agar massa kichik bo'lsa, tezlik katta bo'lishi kerak.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

O'RTACHA KVADRATIK TEZLIK

Molekulalarning tezligini ifodalash uchun o'rtacha kvadratik tezlik ishlatiladi:

v = √(3RT/M) = √(3kT/m₀)

Bu yerda:
• v — o'rtacha kvadratik tezlik (m/s)
• R = 8.314 J/(mol·K) — universal gaz doimiysi
• T — absolyut temperatura (K)
• M — molyar massa (kg/mol)
• k — Boltsman doimiysi
• m₀ — bir molekulaning massasi (kg)

Nima uchun "kvadratik"? Chunki avval tezliklarning kvadratlari o'rtachalanadi, keyin ildiz olinadi.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BOSHQA TEZLIK TURLARI

Fizikada uchta muhim tezlik tushunchasi bor:

1. O'RTACHA KVADRATIK TEZLIK (eng ko'p ishlatiladi)
   v_kv = √(3RT/M)

2. O'RTACHA ARIFMETIK TEZLIK
   <v> = √(8RT/πM)
   Bu tezlik kvadratikdan biroz kichik: <v> ≈ 0.92 × v_kv

3. ENG EHTIMOLIY TEZLIK
   v_eht = √(2RT/M)
   Bu tezlikka ega molekulalar soni eng ko'p
   v_eht ≈ 0.82 × v_kv

Bir-biriga nisbati: v_eht < <v> < v_kv

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MAXWELL TAQSIMOTI

Jeyms Klerk Maxwell 1860-yilda molekulalar tezligining taqsimotini kashf qildi.

Maxwell taqsimoti shuni ko'rsatadiki:
• Barcha molekulalar bir xil tezlikda emas
• Ko'p molekulalar "eng ehtimoliy tezlik" atrofida to'plangan
• Juda tez va juda sekin molekulalar kam
• Taqsimot "qo'ng'iroq" (bell) shakliga o'xshaydi

Temperatura oshganda Maxwell egri chizig'i:
• O'ngga siljiydi (o'rtacha tezlik oshadi)
• Pastroq va kengroq bo'ladi (tezliklar diapazoni kengayadi)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TEZLIK VA TEMPERATURA BOG'LIQLIGI

v = √(3RT/M) formulasidan ko'rinib turibdiki:
• Temperatura oshsa → tezlik oshadi (lekin T ga emas, √T ga proporsional)
• T 4 marta oshsa → v 2 marta oshadi (√4 = 2)
• T 9 marta oshsa → v 3 marta oshadi (√9 = 3)

TEZLIK VA MASSA BOG'LIQLIGI

• Massa katta bo'lsa → tezlik kichik (teskari proporsional √M ga)
• Vodorod (M = 2) kislorod (M = 32) dan 4 marta tez: √(32/2) = √16 = 4

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AMALIY TATBIQLAR

Molekulalar tezligi hayotda muhim ahamiyatga ega:

• Kosmik tezlik va atmosfera: Yengil gazlar (vodorod, geliy) Yerning tortishishidan "qochib ketishi" mumkin. Shuning uchun Yer atmosferasida H₂ va He kam.
• Ovoz tezligi: Ovoz tezligi gaz molekulalarining tezligiga yaqin (~340 m/s havoda). Bu tasodif emas — ovoz molekulalar orqali tarqaladi.
• Vakuum texnologiyasi: Molekulalarning tezligini bilish vakuum nasoslari loyihalashda muhim.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

XULOSA

1. Gaz molekulalari juda tez harakat qiladi (yuzlab m/s)
2. O'rtacha tezlik: v = √(3RT/M)
3. Tezlik temperaturaga √T ga proporsional
4. Yengil molekulalar og'irlardan tezroq
5. Maxwell taqsimoti — turli tezlikdagi molekulalar soni

KEYINGI DARSDA: Masalalar yechish — 4-7 mavzular bo'yicha amaliy mashqlar.`,

        formulas: [
            { name: "O'rtacha kvadratik tezlik", formula: 'v = \\sqrt{\\frac{3RT}{M}}', text: 'v = √(3RT/M)', description: "Molekulalarning o'rtacha kvadratik tezligi", variables: [{ symbol: 'v', name: "O'rtacha tezlik", unit: 'm/s' }, { symbol: 'R', name: 'Gaz doimiysi', unit: 'J/(mol·K)' }, { symbol: 'T', name: 'Temperatura', unit: 'K' }, { symbol: 'M', name: 'Molyar massa', unit: 'kg/mol' }] },
            { name: "O'rtacha arifmetik tezlik", formula: '\\langle v \\rangle = \\sqrt{\\frac{8RT}{\\pi M}}', text: '<v> = √(8RT/πM)', description: "Barcha tezliklarning o'rtacha qiymati", variables: [{ symbol: '<v>', name: "O'rtacha tezlik", unit: 'm/s' }] },
            { name: "Eng ehtimoliy tezlik", formula: 'v_{eht} = \\sqrt{\\frac{2RT}{M}}', text: 'v_eht = √(2RT/M)', description: "Eng ko'p molekulalar ega bo'lgan tezlik", variables: [{ symbol: 'v_{eht}', name: "Eng ehtimoliy tezlik", unit: 'm/s' }] },
            { name: "Kinetik energiyadan", formula: 'v = \\sqrt{\\frac{3kT}{m_0}}', text: 'v = √(3kT/m₀)', description: "Boltsman doimiysi orqali", variables: [{ symbol: 'k', name: 'Boltsman doimiysi', unit: 'J/K' }, { symbol: 'm_0', name: 'Molekula massasi', unit: 'kg' }] }
        ],

        examples: [
            { title: "Kislorod molekulasi tezligi", problem: "20°C da kislorod (O₂) molekulasining o'rtacha kvadratik tezligini toping.", given_data: { "t": "20°C → T = 293 K", "M(O₂)": "32 g/mol = 0.032 kg/mol", "R": "8.314 J/(mol·K)" }, solution_steps: ["T = 20 + 273 = 293 K", "v = √(3RT/M)", "v = √(3 × 8.314 × 293 / 0.032)", "v = √(7308.5 / 0.032)", "v = √228390 ≈ 478 m/s"], solution: "v = √(3×8.314×293/0.032) = √228390 ≈ 478 m/s.", answer: "v ≈ 478 m/s", difficulty: 'medium' },
            { title: "Vodorod vs kislorod", problem: "Bir xil temperaturada vodorod (H₂) va kislorod (O₂) tezliklarining nisbatini toping.", given_data: { "M(H₂)": "2 g/mol", "M(O₂)": "32 g/mol" }, solution_steps: ["v₁/v₂ = √(M₂/M₁)", "v(H₂)/v(O₂) = √(32/2)", "= √16 = 4"], solution: "v(H₂)/v(O₂) = √(M(O₂)/M(H₂)) = √(32/2) = √16 = 4.", answer: "Vodorod 4 marta tez", difficulty: 'medium' },
            { title: "Temperatura topish", problem: "Azot (N₂) molekulalari 600 m/s tezlikda harakat qilsa, temperatura qancha?", given_data: { "v": "600 m/s", "M(N₂)": "0.028 kg/mol", "R": "8.314 J/(mol·K)" }, solution_steps: ["v = √(3RT/M) → T = Mv²/(3R)", "T = 0.028 × 600² / (3 × 8.314)", "T = 0.028 × 360000 / 24.942", "T = 10080 / 24.942 ≈ 404 K = 131°C"], solution: "T = Mv²/(3R) = 0.028×360000/(3×8.314) ≈ 404 K.", answer: "T ≈ 404 K = 131°C", difficulty: 'hard' }
        ]
    },
    questions: [
        { id: 1, question: "O'rtacha kvadratik tezlik formulasi?", options: ["v = 3RT/M", "v = √(3RT/M)", "v = √(RT/M)", "v = 3√(RT/M)"], correct: 1, explanation: "O'rtacha kvadratik tezlik v = √(3RT/M).", difficulty: 'easy' },
        { id: 2, question: "Xona haroratida havo molekulalarining taxminiy tezligi?", options: ["5 m/s", "50 m/s", "500 m/s", "5000 m/s"], correct: 2, explanation: "Xona haroratida (293 K) havo molekulalari taxminan 500 m/s tezlikda harakat qiladi.", difficulty: 'easy' },
        { id: 3, question: "Temperatura 4 marta oshsa, tezlik necha marta oshadi?", options: ["4 marta", "2 marta", "8 marta", "16 marta"], correct: 1, explanation: "v ∝ √T. T 4 marta oshsa, v = √4 = 2 marta oshadi.", difficulty: 'medium' },
        { id: 4, question: "Qaysi gaz molekulalari tezroq?", options: ["O₂ (M=32)", "N₂ (M=28)", "H₂ (M=2)", "CO₂ (M=44)"], correct: 2, explanation: "v ∝ 1/√M. Eng yengil gaz — H₂ (M=2), shuning uchun u eng tez.", difficulty: 'easy' },
        { id: 5, question: "Maxwell taqsimoti nimani ko'rsatadi?", options: ["Bosimni", "Tezliklar taqsimotini", "Temperaturani", "Massani"], correct: 1, explanation: "Maxwell taqsimoti gaz molekulalarining turli tezliklarda qanday taqsimlanganini ko'rsatadi.", difficulty: 'medium' },
        { id: 6, question: "Eng ehtimoliy tezlik v_kv ga nisbatan qanday?", options: ["Kattaroq", "Teng", "Kichikroq", "2 marta katta"], correct: 2, explanation: "v_eht < <v> < v_kv. Eng ehtimoliy tezlik o'rtacha kvadratik tezlikdan kichik.", difficulty: 'hard' },
        { id: 7, question: "Nima uchun Yer atmosferasida vodorod kam?", options: ["Yonadi", "Molekulalari juda tez va qochib ketadi", "Suvda eriydi", "Ko'rinmaydi"], correct: 1, explanation: "H₂ molekulalari juda tez (~1800 m/s), kosmik tezlikka yaqin va Yer tortishishidan qochib ketadi.", difficulty: 'medium' },
        { id: 8, question: "300 K da azot (N₂, M=0.028) tezligi taxminan?", options: ["274 m/s", "517 m/s", "1000 m/s", "100 m/s"], correct: 1, explanation: "v = √(3×8.314×300/0.028) = √267257 ≈ 517 m/s.", difficulty: 'hard' }
    ]
};
