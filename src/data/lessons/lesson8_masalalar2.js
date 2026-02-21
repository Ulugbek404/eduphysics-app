// DARS 8: MASALALAR YECHISH (4-7 MAVZULAR)
export const lesson8 = {
    id: '9-l-27', chapter_id: '9-ch-02',
    title: 'Masalalar yechish (4-7 mavzular)',
    description: "Ideal gaz, temperatura va molekula tezligi bo'yicha amaliy masalalar.",
    order_number: 8, duration_minutes: 50, video_url: 'https://www.youtube.com/embed/OOPH2Ms5wRA', has_lab: false, test_count: 6, difficulty: 'hard',
    content: {
        key_concepts: ['Ideal gaz tenglamasi', 'Temperatura konvertatsiyasi', "Molekula tezligi hisoblash", "Ko'p bosqichli masalalar"],
        theory: `Bu darsda 4-7 mavzulardagi formulalarni amalda qo'llaymiz. Ideal gaz tenglamasi, temperatura va molekula tezligi bo'yicha masalalar yechamiz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FORMULALAR TAKRORLASH

Ideal gaz tenglamasi:
PV = νRT = (m/M)RT

Temperatura:
T(K) = t(°C) + 273
E = (3/2)kT

Molekula tezligi:
v = √(3RT/M)

Parametrlar:
R = 8.314 J/(mol·K)
k = 1.38 × 10⁻²³ J/K
NA = 6.02 × 10²³ mol⁻¹

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IDEAL GAZ TENGLAMASI MASALALARI

MASALA 1 (Oson): Gazning bosimini toping
3 mol ideal gaz 27°C da 0.1 m³ idishda. Bosim = ?
Yechish: T = 300 K. P = νRT/V = 3×8.314×300/0.1 = 74826 Pa ≈ 74.8 kPa

MASALA 2 (O'rta): Gazning hajmi
0.5 mol geliy 100°C da 2 atm bosim ostida. Hajm = ?
Yechish: T = 373 K, P = 202650 Pa
V = νRT/P = 0.5×8.314×373/202650 = 1550.2/202650 ≈ 0.00765 m³ ≈ 7.65 L

MASALA 3 (Qiyin): Vazni topish
10 litr idishdagi gaz bosimi 3 atm, T = 127°C. Molyar massa 44 g/mol. Gazning massasi?
Yechish: V = 0.01 m³, P = 303975 Pa, T = 400 K
m = PVM/(RT) = 303975 × 0.01 × 0.044 / (8.314 × 400) = 133.7 / 3325.6 ≈ 0.0402 kg ≈ 40.2 g

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TEMPERATURA MASALALARI

MASALA 4: Kinetik energiyadan temperatura
Gaz molekulasining o'rtacha kinetik energiyasi 6.21 × 10⁻²¹ J. Temperatura?
Yechish: T = 2E/(3k) = 2 × 6.21×10⁻²¹ / (3 × 1.38×10⁻²³) = 12.42×10⁻²¹ / 4.14×10⁻²³ = 300 K = 27°C

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TEZLIK MASALALARI

MASALA 5: Tezlikni solishtirish
Ayni temperaturada geliy (He, M=4) va argon (Ar, M=40) tezliklari nisbati?
Yechish: v(He)/v(Ar) = √(M(Ar)/M(He)) = √(40/4) = √10 ≈ 3.16

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MUSTAQIL MASALALAR
1. 0.2 mol N₂ 500 K da bosimi qancha? (V = 0.005 m³)
2. 327°C da O₂ molekulasining tezligi?
3. Molekula tezligi 600 m/s (M = 0.028 kg/mol). T = ?
4. 5 litr idishdagi gaz bosimi 4 atm, T = 27°C. Necha mol?
5. He va N₂ tezliklari nisbati?

KEYINGI DARSDA: Ideal gaz holatining tenglamalari — batafsil.`,

        formulas: [
            { name: "Ideal gaz tenglamasi", formula: 'PV = \\nu RT', text: 'PV = νRT', description: "Bosh formula", variables: [{ symbol: 'P', name: 'Bosim', unit: 'Pa' }, { symbol: 'V', name: 'Hajm', unit: 'm³' }, { symbol: 'ν', name: 'Mol soni', unit: 'mol' }, { symbol: 'R', name: 'Gaz doimiysi', unit: 'J/(mol·K)' }, { symbol: 'T', name: 'Temperatura', unit: 'K' }] },
            { name: "Kinetik energiya", formula: 'E = \\frac{3}{2} kT', text: 'E = (3/2)kT', description: "Molekulaning o'rtacha kinetik energiyasi", variables: [{ symbol: 'E', name: 'Energiya', unit: 'J' }, { symbol: 'k', name: 'Boltsman doimiysi', unit: 'J/K' }] },
            { name: "O'rtacha tezlik", formula: 'v = \\sqrt{\\frac{3RT}{M}}', text: 'v = √(3RT/M)', description: "O'rtacha kvadratik tezlik", variables: [{ symbol: 'v', name: 'Tezlik', unit: 'm/s' }, { symbol: 'M', name: 'Molyar massa', unit: 'kg/mol' }] }
        ],

        examples: [
            { title: "Bosimni topish", problem: "3 mol ideal gaz 27°C da 0.1 m³ idishda. Bosim?", given_data: { "ν": "3 mol", "T": "27°C = 300 K", "V": "0.1 m³" }, solution_steps: ["T = 27 + 273 = 300 K", "PV = νRT → P = νRT/V", "P = 3 × 8.314 × 300 / 0.1", "P = 7482.6 / 0.1 = 74826 Pa"], solution: "P = 3×8.314×300/0.1 ≈ 74826 Pa.", answer: "P ≈ 74.8 kPa", difficulty: 'easy' },
            { title: "Geliy hajmi", problem: "0.5 mol He 100°C da 2 atm bosimda. Hajm?", given_data: { "ν": "0.5 mol", "T": "100°C = 373 K", "P": "2 atm = 202650 Pa" }, solution_steps: ["V = νRT/P", "V = 0.5 × 8.314 × 373 / 202650", "V = 1550.2 / 202650", "V ≈ 0.00765 m³ = 7.65 L"], solution: "V = 0.5×8.314×373/202650 ≈ 7.65 L.", answer: "V ≈ 7.65 litr", difficulty: 'medium' },
            { title: "Gaz massasi", problem: "10 L gaz, P = 3 atm, T = 127°C, M = 44 g/mol. Massa?", given_data: { "V": "0.01 m³", "P": "303975 Pa", "T": "400 K", "M": "0.044 kg/mol" }, solution_steps: ["PV = (m/M)RT → m = PVM/(RT)", "m = 303975 × 0.01 × 0.044 / (8.314 × 400)", "m = 133.7 / 3325.6", "m ≈ 0.0402 kg ≈ 40.2 g"], solution: "m = PVM/(RT) ≈ 40.2 g.", answer: "m ≈ 40.2 g", difficulty: 'hard' },
            { title: "He va Ar tezliklari", problem: "Bir xil T da He (M=4) va Ar (M=40) tezliklari nisbati?", given_data: { "M(He)": "4 g/mol", "M(Ar)": "40 g/mol" }, solution_steps: ["v₁/v₂ = √(M₂/M₁)", "v(He)/v(Ar) = √(40/4) = √10 ≈ 3.16"], solution: "v(He)/v(Ar) = √(40/4) = √10 ≈ 3.16.", answer: "He 3.16 marta tez", difficulty: 'medium' }
        ]
    },
    questions: [
        { id: 1, question: "2 mol ideal gaz 300 K da 0.05 m³ da. Bosim?", options: ["49.9 kPa", "99.8 kPa", "149.7 kPa", "199.6 kPa"], correct: 1, explanation: "P = νRT/V = 2×8.314×300/0.05 = 99768 Pa ≈ 99.8 kPa.", difficulty: 'medium' },
        { id: 2, question: "127°C = ? K", options: ["127 K", "246 K", "400 K", "527 K"], correct: 2, explanation: "T = 127 + 273 = 400 K.", difficulty: 'easy' },
        { id: 3, question: "500 K da N₂ (M=0.028) tezligi taxminan?", options: ["300 m/s", "530 m/s", "670 m/s", "950 m/s"], correct: 2, explanation: "v = √(3×8.314×500/0.028) = √445714 ≈ 668 m/s ≈ 670 m/s.", difficulty: 'hard' },
        { id: 4, question: "E = 4.14 × 10⁻²¹ J bo'lsa, T = ?", options: ["100 K", "200 K", "300 K", "400 K"], correct: 1, explanation: "T = 2E/(3k) = 2×4.14×10⁻²¹/(3×1.38×10⁻²³) = 200 K.", difficulty: 'medium' },
        { id: 5, question: "1 mol ideal gaz 273 K da 1 atm. V = ?", options: ["11.2 L", "22.4 L", "44.8 L", "2.24 L"], correct: 1, explanation: "V = nRT/P = 1×8.314×273/101325 ≈ 0.0224 m³ = 22.4 L (normal sharoit hajmi).", difficulty: 'medium' },
        { id: 6, question: "H₂ (M=2) CO₂ (M=44) dan necha marta tez?", options: ["2.1", "3.3", "4.7", "22"], correct: 2, explanation: "v₁/v₂ = √(44/2) = √22 ≈ 4.7 marta.", difficulty: 'hard' }
    ]
};
