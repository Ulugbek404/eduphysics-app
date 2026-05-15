// ============================================================
//  NurFizika — Formulalar Ma'lumotlar Bazasi
//  src/data/formulas.js
//
//  SESSIYA 1 — Kinematika (22), SESSIYA 2 — Dinamika (18)
//  Ko'p tilli: nameEn, descRu, descEn maydonlari qo'shilgan.
// ============================================================

// ─── FORMULA KATEGORIYALARI (3 tilda) ───────────────────────
export const FORMULA_CATEGORIES = [
  { id: "kinematika",       label: "Kinematika",                  labelRu: "Кинематика",                   labelEn: "Kinematics",                   icon: "⚡", color: "purple", count: 22 },
  { id: "dinamika",         label: "Dinamika",                    labelRu: "Динамика",                     labelEn: "Dynamics",                     icon: "💪", color: "blue",   count: 18 },
  { id: "ish_energiya",     label: "Ish, quvvat, energiya",       labelRu: "Работа, Мощность, Энергия",    labelEn: "Work, Power, Energy",           icon: "⚙️", color: "amber",  count: 16 },
  { id: "impuls_statika",   label: "Impuls va statika",           labelRu: "Импульс и Статика",            labelEn: "Impulse & Statics",            icon: "⚖️", color: "teal",   count: 12 },
  { id: "tebranish_tolqin", label: "Tebranishlar va to'lqinlar",  labelRu: "Колебания и Волны",            labelEn: "Oscillations & Waves",         icon: "〰️", color: "coral",  count: 15 },
  { id: "molekulyar",       label: "Molekulyar fizika",           labelRu: "Молекулярная Физика",          labelEn: "Molecular Physics",            icon: "🔬", color: "green",  count: 18 },
  { id: "termodinamika",    label: "Termodinamika",               labelRu: "Термодинамика",                labelEn: "Thermodynamics",               icon: "🌡️", color: "red",    count: 14 },
  { id: "elektrostatika",   label: "Elektrostatika",              labelRu: "Электростатика",               labelEn: "Electrostatics",               icon: "⚡", color: "blue",   count: 16 },
  { id: "elektr_toki",      label: "Doimiy elektr toki",          labelRu: "Постоянный Электрический Ток", labelEn: "Direct Current",               icon: "🔌", color: "purple", count: 22 },
  { id: "magnit",           label: "Magnit maydoni",              labelRu: "Магнитное Поле",               labelEn: "Magnetic Field",               icon: "🧲", color: "pink",   count: 14 },
  { id: "em_tebranish",     label: "Elektromagnit tebranishlar",  labelRu: "Электромагнитные Колебания",   labelEn: "Electromagnetic Oscillations", icon: "📡", color: "teal",   count: 10 },
  { id: "optika",           label: "Optika",                      labelRu: "Оптика",                       labelEn: "Optics",                       icon: "🔭", color: "amber",  count: 20 },
  { id: "atom_yadro",       label: "Atom va yadro fizikasi",      labelRu: "Атомная и Ядерная Физика",     labelEn: "Atomic & Nuclear Physics",     icon: "⚛️", color: "coral",  count: 16 },
];

// ─── BARCHA FORMULALAR ───────────────────────────────────────
export const FORMULAS = [

  // ════════════════════════════════════════════════════════
  //  KINEMATIKA  (kin_001 → kin_022)
  // ════════════════════════════════════════════════════════

  // 1. O'rtacha tezlik
  {
    id: "kin_001",
    category: "kinematika",
    subcategory: "tekis_harakat",
    name: "O'rtacha tezlik",
    nameRu: "Средняя скорость",
    formula: "v = s / t",
    latex: "v = \\dfrac{s}{t}",
    variables: [
      {
        symbol: "v",
        name: "Tezlik",
        unit: "m/s",
        description: "Jismning o'rtacha tezligi"
      },
      {
        symbol: "s",
        name: "Yo'l",
        unit: "m",
        description: "Jism bosib o'tgan masofa"
      },
      {
        symbol: "t",
        name: "Vaqt",
        unit: "s",
        description: "Harakatga ketgan vaqt"
      }
    ],
    calculator: {
      solveFor: "v",
      inputs: ["s", "t"],
      defaultValues: { s: 100, t: 10 },
      formulaFn: "(s, t) => s / t",
      resultUnit: "m/s",
      resultLabel: "Tezlik"
    },
    description: "Jism bir tekis harakat qilganda, bosib o'tilgan yo'lni ketgan vaqtga bo'lish orqali o'rtacha tezlik topiladi.",
    example: "Avtomobil 100 metrni 10 sekundda bosib o'tdi. Tezligi: v = 100 / 10 = 10 m/s",
    tags: ["tezlik", "kinematika", "harakat", "yo'l", "vaqt", "tekis harakat"],
    difficulty: 1,
    grade: 9,
    lesson_link: "kinematika-1",
    xp_reward: 5
  },

  // 2. Tezlanish ta'rifi
  {
    id: "kin_002",
    category: "kinematika",
    subcategory: "tekis_tezlangan",
    name: "Tezlanish",
    nameRu: "Ускорение",
    formula: "a = (v - v₀) / t",
    latex: "a = \\dfrac{v - v_0}{t}",
    variables: [
      {
        symbol: "a",
        name: "Tezlanish",
        unit: "m/s²",
        description: "Jismning tezlanishi (tezlikning vaqt birligidagi o'zgarishi)"
      },
      {
        symbol: "v",
        name: "Oxirgi tezlik",
        unit: "m/s",
        description: "Harakatning oxiridagi tezlik"
      },
      {
        symbol: "v₀",
        name: "Boshlang'ich tezlik",
        unit: "m/s",
        description: "Harakatning boshlangʻichdagi tezlik"
      },
      {
        symbol: "t",
        name: "Vaqt",
        unit: "s",
        description: "O'tgan vaqt"
      }
    ],
    calculator: {
      solveFor: "a",
      inputs: ["v", "v0", "t"],
      defaultValues: { v: 20, v0: 0, t: 5 },
      formulaFn: "(v, v0, t) => (v - v0) / t",
      resultUnit: "m/s²",
      resultLabel: "Tezlanish"
    },
    description: "Tezlanish — jismning tezligi vaqt birligida qancha o'zgarishini ko'rsatadi. Musbat qiymat tezlashish, manfiy — sekinlashishni bildiradi.",
    example: "Mashina 0 dan 20 m/s gacha 5 sekundda tezlashdi. a = (20 - 0) / 5 = 4 m/s²",
    tags: ["tezlanish", "kinematika", "tezlik", "vaqt", "tekis tezlangan"],
    difficulty: 1,
    grade: 9,
    lesson_link: "kinematika-2",
    xp_reward: 5
  },

  // 3. Tekis tezlangan harakat — tezlik
  {
    id: "kin_003",
    category: "kinematika",
    subcategory: "tekis_tezlangan",
    name: "Tekis tezlangan harakat (tezlik)",
    nameRu: "Равноускоренное движение (скорость)",
    formula: "v = v₀ + a·t",
    latex: "v = v_0 + a \\cdot t",
    variables: [
      {
        symbol: "v",
        name: "Oxirgi tezlik",
        unit: "m/s",
        description: "t vaqtdagi tezlik"
      },
      {
        symbol: "v₀",
        name: "Boshlang'ich tezlik",
        unit: "m/s",
        description: "Boshlanish momentidagi tezlik"
      },
      {
        symbol: "a",
        name: "Tezlanish",
        unit: "m/s²",
        description: "Doimiy tezlanish"
      },
      {
        symbol: "t",
        name: "Vaqt",
        unit: "s",
        description: "O'tgan vaqt"
      }
    ],
    calculator: {
      solveFor: "v",
      inputs: ["v0", "a", "t"],
      defaultValues: { v0: 0, a: 4, t: 5 },
      formulaFn: "(v0, a, t) => v0 + a * t",
      resultUnit: "m/s",
      resultLabel: "Tezlik"
    },
    description: "Tekis tezlangan harakatda tezlik boshlang'ich tezlik va tezlanishning vaqt ko'paytmasini qo'shib topiladi.",
    example: "Boshlang'ich tezlik 0, tezlanish 4 m/s², 5 sekunddan keyin: v = 0 + 4·5 = 20 m/s",
    tags: ["tekis tezlangan", "tezlik", "tezlanish", "kinematika", "v0"],
    difficulty: 1,
    grade: 9,
    lesson_link: "kinematika-2",
    xp_reward: 5
  },

  // 4. Tekis tezlangan harakat — yo'l
  {
    id: "kin_004",
    category: "kinematika",
    subcategory: "tekis_tezlangan",
    name: "Tekis tezlangan harakat (yo'l)",
    nameRu: "Равноускоренное движение (путь)",
    formula: "s = v₀·t + (a·t²)/2",
    latex: "s = v_0 t + \\dfrac{a t^2}{2}",
    variables: [
      {
        symbol: "s",
        name: "Yo'l",
        unit: "m",
        description: "Jism bosib o'tgan masofa"
      },
      {
        symbol: "v₀",
        name: "Boshlang'ich tezlik",
        unit: "m/s",
        description: "Boshlanish momentidagi tezlik"
      },
      {
        symbol: "a",
        name: "Tezlanish",
        unit: "m/s²",
        description: "Doimiy tezlanish"
      },
      {
        symbol: "t",
        name: "Vaqt",
        unit: "s",
        description: "O'tgan vaqt"
      }
    ],
    calculator: {
      solveFor: "s",
      inputs: ["v0", "a", "t"],
      defaultValues: { v0: 0, a: 4, t: 5 },
      formulaFn: "(v0, a, t) => v0 * t + (a * t * t) / 2",
      resultUnit: "m",
      resultLabel: "Yo'l"
    },
    description: "Tekis tezlangan harakatda jism bosib o'tgan masofa boshlang'ich tezlik va tezlanish orqali hisoblanadi.",
    example: "Boshlang'ich tezlik 0, tezlanish 4 m/s², 5 sekundda: s = 0·5 + (4·25)/2 = 50 m",
    tags: ["tekis tezlangan", "yo'l", "masofa", "tezlanish", "kinematika"],
    difficulty: 2,
    grade: 9,
    lesson_link: "kinematika-2",
    xp_reward: 10
  },

  // 5. Tezlik va yo'l orqali tezlik
  {
    id: "kin_005",
    category: "kinematika",
    subcategory: "tekis_tezlangan",
    name: "Tezlik va yo'l orqali tezlik",
    nameRu: "Скорость через путь (без времени)",
    formula: "v² = v₀² + 2·a·s",
    latex: "v^2 = v_0^2 + 2as",
    variables: [
      {
        symbol: "v",
        name: "Oxirgi tezlik",
        unit: "m/s",
        description: "s yo'ldan so'nggi tezlik"
      },
      {
        symbol: "v₀",
        name: "Boshlang'ich tezlik",
        unit: "m/s",
        description: "Boshlanish momentidagi tezlik"
      },
      {
        symbol: "a",
        name: "Tezlanish",
        unit: "m/s²",
        description: "Doimiy tezlanish"
      },
      {
        symbol: "s",
        name: "Yo'l",
        unit: "m",
        description: "Bosib o'tilgan masofa"
      }
    ],
    calculator: {
      solveFor: "v",
      inputs: ["v0", "a", "s"],
      defaultValues: { v0: 0, a: 4, s: 50 },
      formulaFn: "(v0, a, s) => Math.sqrt(v0 * v0 + 2 * a * s)",
      resultUnit: "m/s",
      resultLabel: "Tezlik"
    },
    description: "Vaqt berilmagan holatlarda, boshlang'ich tezlik, tezlanish va yo'l orqali oxirgi tezlikni topish mumkin.",
    example: "v₀=0, a=4 m/s², s=50 m bo'lsa: v² = 0 + 2·4·50 = 400 → v = 20 m/s",
    tags: ["tezlik", "yo'l", "tezlanish", "kinematika", "vaqtsiz"],
    difficulty: 2,
    grade: 9,
    lesson_link: "kinematika-2",
    xp_reward: 10
  },

  // 6. O'rtacha tezlik (tezlangan harakat)
  {
    id: "kin_006",
    category: "kinematika",
    subcategory: "tekis_tezlangan",
    name: "O'rtacha tezlik (tezlangan harakat)",
    nameRu: "Средняя скорость (равноускоренное)",
    formula: "v_ort = (v + v₀) / 2",
    latex: "\\bar{v} = \\dfrac{v + v_0}{2}",
    variables: [
      {
        symbol: "v_ort",
        name: "O'rtacha tezlik",
        unit: "m/s",
        description: "Harakat davomidagi o'rtacha tezlik"
      },
      {
        symbol: "v",
        name: "Oxirgi tezlik",
        unit: "m/s",
        description: "Harakatning oxiridagi tezlik"
      },
      {
        symbol: "v₀",
        name: "Boshlang'ich tezlik",
        unit: "m/s",
        description: "Boshlanish momentidagi tezlik"
      }
    ],
    calculator: {
      solveFor: "v_ort",
      inputs: ["v", "v0"],
      defaultValues: { v: 20, v0: 0 },
      formulaFn: "(v, v0) => (v + v0) / 2",
      resultUnit: "m/s",
      resultLabel: "O'rtacha tezlik"
    },
    description: "Tekis tezlangan harakatda o'rtacha tezlik boshlang'ich va oxirgi tezliklarning arifmetik o'rtachasi.",
    example: "Mashina 0 dan 20 m/s gacha tezlashdi. O'rtacha tezlik: (0 + 20) / 2 = 10 m/s",
    tags: ["o'rtacha tezlik", "kinematika", "tezlangan", "arifmetik o'rtacha"],
    difficulty: 1,
    grade: 9,
    lesson_link: "kinematika-2",
    xp_reward: 5
  },

  // 7. Erkin tushish — tezlik
  {
    id: "kin_007",
    category: "kinematika",
    subcategory: "erkin_tushish",
    name: "Erkin tushish (tezlik)",
    nameRu: "Свободное падение (скорость)",
    formula: "v = g·t",
    latex: "v = g \\cdot t",
    variables: [
      {
        symbol: "v",
        name: "Tezlik",
        unit: "m/s",
        description: "t sekunddagi tushish tezligi"
      },
      {
        symbol: "g",
        name: "Erkin tushish tezlanishi",
        unit: "m/s²",
        description: "g ≈ 9.8 m/s² (Yer yuzasida)",
        constant: true,
        value: 9.8
      },
      {
        symbol: "t",
        name: "Vaqt",
        unit: "s",
        description: "Tushish boshlanganidan o'tgan vaqt"
      }
    ],
    calculator: {
      solveFor: "v",
      inputs: ["t"],
      defaultValues: { t: 3 },
      formulaFn: "(t) => 9.8 * t",
      resultUnit: "m/s",
      resultLabel: "Tushish tezligi"
    },
    description: "Boshlang'ich tezliksiz erkin tushayotgan jismning tezligi gravitatsiya tezlanishi va vaqt ko'paytmasiga teng.",
    example: "Tosh 3 sekundda erkin tushdi. Tezligi: v = 9.8 · 3 = 29.4 m/s",
    tags: ["erkin tushish", "gravitatsiya", "g", "tezlik", "kinematika"],
    difficulty: 1,
    grade: 9,
    lesson_link: "kinematika-3",
    xp_reward: 5
  },

  // 8. Erkin tushish — balandlik
  {
    id: "kin_008",
    category: "kinematika",
    subcategory: "erkin_tushish",
    name: "Erkin tushish (balandlik)",
    nameRu: "Свободное падение (высота)",
    formula: "h = (g·t²) / 2",
    latex: "h = \\dfrac{g t^2}{2}",
    variables: [
      {
        symbol: "h",
        name: "Balandlik",
        unit: "m",
        description: "Jism tushgan masofa"
      },
      {
        symbol: "g",
        name: "Erkin tushish tezlanishi",
        unit: "m/s²",
        description: "g ≈ 9.8 m/s²",
        constant: true,
        value: 9.8
      },
      {
        symbol: "t",
        name: "Vaqt",
        unit: "s",
        description: "Tushish vaqti"
      }
    ],
    calculator: {
      solveFor: "h",
      inputs: ["t"],
      defaultValues: { t: 3 },
      formulaFn: "(t) => (9.8 * t * t) / 2",
      resultUnit: "m",
      resultLabel: "Balandlik"
    },
    description: "Erkin tushishda jism t sekund ichida bosib o'tgan balandlikni topish formulasi.",
    example: "Jism 3 sekundda tushdi. Balandligi: h = (9.8 · 9) / 2 = 44.1 m",
    tags: ["erkin tushish", "balandlik", "gravitatsiya", "g", "kinematika"],
    difficulty: 1,
    grade: 9,
    lesson_link: "kinematika-3",
    xp_reward: 5
  },

  // 9. Erkin tushish — tezlik va balandlik
  {
    id: "kin_009",
    category: "kinematika",
    subcategory: "erkin_tushish",
    name: "Erkin tushish (tezlik va balandlik)",
    nameRu: "Свободное падение (скорость и высота)",
    formula: "v² = 2·g·h",
    latex: "v^2 = 2gh",
    variables: [
      {
        symbol: "v",
        name: "Tushish tezligi",
        unit: "m/s",
        description: "h balandlikdan tushgandan keyingi tezlik"
      },
      {
        symbol: "g",
        name: "Erkin tushish tezlanishi",
        unit: "m/s²",
        description: "g ≈ 9.8 m/s²",
        constant: true,
        value: 9.8
      },
      {
        symbol: "h",
        name: "Balandlik",
        unit: "m",
        description: "Tushish bosholangan balandlik"
      }
    ],
    calculator: {
      solveFor: "v",
      inputs: ["h"],
      defaultValues: { h: 45 },
      formulaFn: "(h) => Math.sqrt(2 * 9.8 * h)",
      resultUnit: "m/s",
      resultLabel: "Tushish tezligi"
    },
    description: "Vaqt berilmagan holda balandlikdan erkin tushuvchi jismning yerdagi tezligini topish uchun ishlatiladi.",
    example: "h = 45 m dan tushadi: v = √(2·9.8·45) = √882 ≈ 29.7 m/s",
    tags: ["erkin tushish", "tezlik", "balandlik", "vaqtsiz", "kinematika"],
    difficulty: 2,
    grade: 9,
    lesson_link: "kinematika-3",
    xp_reward: 10
  },

  // 10. Yuqoriga otilgan jism — maksimal balandlik
  {
    id: "kin_010",
    category: "kinematika",
    subcategory: "otilgan_jism",
    name: "Yuqoriga otilgan jism (max balandlik)",
    nameRu: "Тело, брошенное вверх (максимальная высота)",
    formula: "H = v₀² / (2g)",
    latex: "H = \\dfrac{v_0^2}{2g}",
    variables: [
      {
        symbol: "H",
        name: "Maksimal balandlik",
        unit: "m",
        description: "Jism ko'tarilgan eng baland nuqta"
      },
      {
        symbol: "v₀",
        name: "Boshlang'ich tezlik",
        unit: "m/s",
        description: "Jism yuqoriga otilgan tezlik"
      },
      {
        symbol: "g",
        name: "Erkin tushish tezlanishi",
        unit: "m/s²",
        description: "g ≈ 9.8 m/s²",
        constant: true,
        value: 9.8
      }
    ],
    calculator: {
      solveFor: "H",
      inputs: ["v0"],
      defaultValues: { v0: 20 },
      formulaFn: "(v0) => (v0 * v0) / (2 * 9.8)",
      resultUnit: "m",
      resultLabel: "Maksimal balandlik"
    },
    description: "Yuqoriga to'g'ri chizig'i bo'ylab otilgan jism, tezligi nolga yetganda maksimal balandlikka erishadi.",
    example: "Jism v₀=20 m/s bilan otildi. H = 400 / (2·9.8) = 20.4 m",
    tags: ["yuqoriga otilgan", "balandlik", "kinematika", "maksimal", "gravitatsiya"],
    difficulty: 2,
    grade: 9,
    lesson_link: "kinematika-3",
    xp_reward: 10
  },

  // 11. Yuqoriga otilgan jism — havoda vaqt
  {
    id: "kin_011",
    category: "kinematika",
    subcategory: "otilgan_jism",
    name: "Yuqoriga otilgan jism (havoda vaqt)",
    nameRu: "Тело, брошенное вверх (время полёта)",
    formula: "t = 2·v₀ / g",
    latex: "t = \\dfrac{2v_0}{g}",
    variables: [
      {
        symbol: "t",
        name: "Uchish vaqti",
        unit: "s",
        description: "Jism havoda bo'lgan umumiy vaqt (ko'tarilish + tushish)"
      },
      {
        symbol: "v₀",
        name: "Boshlang'ich tezlik",
        unit: "m/s",
        description: "Jism yuqoriga otilgan tezlik"
      },
      {
        symbol: "g",
        name: "Erkin tushish tezlanishi",
        unit: "m/s²",
        description: "g ≈ 9.8 m/s²",
        constant: true,
        value: 9.8
      }
    ],
    calculator: {
      solveFor: "t",
      inputs: ["v0"],
      defaultValues: { v0: 20 },
      formulaFn: "(v0) => (2 * v0) / 9.8",
      resultUnit: "s",
      resultLabel: "Uchish vaqti"
    },
    description: "Yuqoriga otilgan jism ko'tarilish vaqti va tushish vaqti teng bo'lib, umumiy uchish vaqti shu formula bilan topiladi.",
    example: "v₀=20 m/s: t = 2·20 / 9.8 = 40 / 9.8 ≈ 4.08 s",
    tags: ["yuqoriga otilgan", "uchish vaqti", "vaqt", "kinematika", "gravitatsiya"],
    difficulty: 2,
    grade: 9,
    lesson_link: "kinematika-3",
    xp_reward: 10
  },

  // 12. Gorizontal otilish — gorizontal yo'l
  {
    id: "kin_012",
    category: "kinematika",
    subcategory: "otilgan_jism",
    name: "Gorizontal otilish (gorizontal yo'l)",
    nameRu: "Горизонтальный бросок (горизонтальный путь)",
    formula: "x = v₀·t",
    latex: "x = v_0 \\cdot t",
    variables: [
      {
        symbol: "x",
        name: "Gorizontal yo'l",
        unit: "m",
        description: "Gorizontal yo'nalishda bosib o'tilgan masofa"
      },
      {
        symbol: "v₀",
        name: "Gorizontal tezlik",
        unit: "m/s",
        description: "Boshlang'ich gorizontal tezlik (o'zgarmaydi)"
      },
      {
        symbol: "t",
        name: "Vaqt",
        unit: "s",
        description: "Uchish vaqti"
      }
    ],
    calculator: {
      solveFor: "x",
      inputs: ["v0", "t"],
      defaultValues: { v0: 15, t: 3 },
      formulaFn: "(v0, t) => v0 * t",
      resultUnit: "m",
      resultLabel: "Gorizontal yo'l"
    },
    description: "Gorizontal otilishda, gorizontal yo'nalishda havo qarshiligi bo'lmaganda tezlik o'zgarmasdan, masofa = tezlik × vaqt.",
    example: "v₀=15 m/s, t=3 s: x = 15·3 = 45 m",
    tags: ["gorizontal otilish", "gorizontal", "yo'l", "kinematika", "parabolik"],
    difficulty: 2,
    grade: 9,
    lesson_link: "kinematika-4",
    xp_reward: 10
  },

  // 13. Gorizontal otilish — vertikal yo'l
  {
    id: "kin_013",
    category: "kinematika",
    subcategory: "otilgan_jism",
    name: "Gorizontal otilish (vertikal yo'l)",
    nameRu: "Горизонтальный бросок (вертикальный путь)",
    formula: "y = (g·t²) / 2",
    latex: "y = \\dfrac{g t^2}{2}",
    variables: [
      {
        symbol: "y",
        name: "Vertikal yo'l",
        unit: "m",
        description: "Pastga tushgan masofa"
      },
      {
        symbol: "g",
        name: "Erkin tushish tezlanishi",
        unit: "m/s²",
        description: "g ≈ 9.8 m/s²",
        constant: true,
        value: 9.8
      },
      {
        symbol: "t",
        name: "Vaqt",
        unit: "s",
        description: "Uchish vaqti"
      }
    ],
    calculator: {
      solveFor: "y",
      inputs: ["t"],
      defaultValues: { t: 3 },
      formulaFn: "(t) => (9.8 * t * t) / 2",
      resultUnit: "m",
      resultLabel: "Vertikal tushish"
    },
    description: "Gorizontal otilishda vertikal harakat erkin tushish kabi bo'ladi — gorizontal tezlikdan mustaqil.",
    example: "t=3 s: y = (9.8·9)/2 = 44.1 m pastga tushib ketadi",
    tags: ["gorizontal otilish", "vertikal", "erkin tushish", "kinematika"],
    difficulty: 2,
    grade: 9,
    lesson_link: "kinematika-4",
    xp_reward: 10
  },

  // 14. Burchak ostida otilish — max balandlik
  {
    id: "kin_014",
    category: "kinematika",
    subcategory: "ottilgan_burchak",
    name: "Burchak ostida otilish (max balandlik)",
    nameRu: "Бросок под углом (максимальная высота)",
    formula: "H = v₀²·sin²α / (2g)",
    latex: "H = \\dfrac{v_0^2 \\sin^2\\alpha}{2g}",
    variables: [
      {
        symbol: "H",
        name: "Maksimal balandlik",
        unit: "m",
        description: "Jism ko'tarilgan eng yuqori nuqta"
      },
      {
        symbol: "v₀",
        name: "Boshlang'ich tezlik",
        unit: "m/s",
        description: "Otilgan tezlik"
      },
      {
        symbol: "α",
        name: "Burchak",
        unit: "°",
        description: "Gorizontal bilan hosil qilingan otilish burchagi"
      },
      {
        symbol: "g",
        name: "Erkin tushish tezlanishi",
        unit: "m/s²",
        description: "g ≈ 9.8 m/s²",
        constant: true,
        value: 9.8
      }
    ],
    calculator: {
      solveFor: "H",
      inputs: ["v0", "alpha"],
      defaultValues: { v0: 20, alpha: 45 },
      formulaFn: "(v0, alpha) => (v0 * v0 * Math.pow(Math.sin(alpha * Math.PI / 180), 2)) / (2 * 9.8)",
      resultUnit: "m",
      resultLabel: "Maksimal balandlik"
    },
    description: "Burchak ostida otilgan jismning ko'tarilgan eng baland nuqtasi boshlang'ich tezlik va otilish burchagiga bog'liq.",
    example: "v₀=20 m/s, α=45°: H = (400·0.5) / (2·9.8) = 200/19.6 ≈ 10.2 m",
    tags: ["burchak ostida otilish", "balandlik", "burchak", "kinematika", "parabolik"],
    difficulty: 3,
    grade: 9,
    lesson_link: "kinematika-4",
    xp_reward: 15
  },

  // 15. Burchak ostida otilish — uchish masofasi
  {
    id: "kin_015",
    category: "kinematika",
    subcategory: "ottilgan_burchak",
    name: "Burchak ostida otilish (uchish masofasi)",
    nameRu: "Бросок под углом (дальность полёта)",
    formula: "L = v₀²·sin(2α) / g",
    latex: "L = \\dfrac{v_0^2 \\sin 2\\alpha}{g}",
    variables: [
      {
        symbol: "L",
        name: "Uchish masofasi",
        unit: "m",
        description: "Jism uchib o'tgan gorizontal masofa"
      },
      {
        symbol: "v₀",
        name: "Boshlang'ich tezlik",
        unit: "m/s",
        description: "Otilgan tezlik"
      },
      {
        symbol: "α",
        name: "Burchak",
        unit: "°",
        description: "Otilish burchagi (α=45° da masofa maksimal)"
      },
      {
        symbol: "g",
        name: "Erkin tushish tezlanishi",
        unit: "m/s²",
        description: "g ≈ 9.8 m/s²",
        constant: true,
        value: 9.8
      }
    ],
    calculator: {
      solveFor: "L",
      inputs: ["v0", "alpha"],
      defaultValues: { v0: 20, alpha: 45 },
      formulaFn: "(v0, alpha) => (v0 * v0 * Math.sin(2 * alpha * Math.PI / 180)) / 9.8",
      resultUnit: "m",
      resultLabel: "Uchish masofasi"
    },
    description: "α=45° da uchish masofasi maksimal bo'ladi. Burchak oshsa yoki kamaysa masofa qisqaradi.",
    example: "v₀=20 m/s, α=45°: L = 400·sin(90°) / 9.8 = 400/9.8 ≈ 40.8 m",
    tags: ["burchak ostida otilish", "uchish masofasi", "burchak", "kinematika", "parabolik"],
    difficulty: 3,
    grade: 9,
    lesson_link: "kinematika-4",
    xp_reward: 15
  },

  // 16. Burchak ostida otilish — uchish vaqti
  {
    id: "kin_016",
    category: "kinematika",
    subcategory: "ottilgan_burchak",
    name: "Burchak ostida otilish (uchish vaqti)",
    nameRu: "Бросок под углом (время полёта)",
    formula: "t = 2·v₀·sinα / g",
    latex: "t = \\dfrac{2 v_0 \\sin\\alpha}{g}",
    variables: [
      {
        symbol: "t",
        name: "Uchish vaqti",
        unit: "s",
        description: "Jism havoda bo'lgan umumiy vaqt"
      },
      {
        symbol: "v₀",
        name: "Boshlang'ich tezlik",
        unit: "m/s",
        description: "Otilgan tezlik"
      },
      {
        symbol: "α",
        name: "Burchak",
        unit: "°",
        description: "Otilish burchagi"
      },
      {
        symbol: "g",
        name: "Erkin tushish tezlanishi",
        unit: "m/s²",
        description: "g ≈ 9.8 m/s²",
        constant: true,
        value: 9.8
      }
    ],
    calculator: {
      solveFor: "t",
      inputs: ["v0", "alpha"],
      defaultValues: { v0: 20, alpha: 45 },
      formulaFn: "(v0, alpha) => (2 * v0 * Math.sin(alpha * Math.PI / 180)) / 9.8",
      resultUnit: "s",
      resultLabel: "Uchish vaqti"
    },
    description: "Burchak ostida otilgan jismning uchish vaqti vertikal tezlik komponentasi va gravitatsiyaga bog'liq.",
    example: "v₀=20 m/s, α=45°: t = 2·20·sin45° / 9.8 = 40·0.707/9.8 ≈ 2.88 s",
    tags: ["burchak ostida otilish", "uchish vaqti", "burchak", "kinematika"],
    difficulty: 3,
    grade: 9,
    lesson_link: "kinematika-4",
    xp_reward: 15
  },

  // 17. Doiraviy harakat tezligi
  {
    id: "kin_017",
    category: "kinematika",
    subcategory: "doiraviy_harakat",
    name: "Doiraviy harakat tezligi",
    nameRu: "Скорость при движении по окружности",
    formula: "v = 2πR / T",
    latex: "v = \\dfrac{2\\pi R}{T}",
    variables: [
      {
        symbol: "v",
        name: "Chiziqli tezlik",
        unit: "m/s",
        description: "Doira bo'ylab chiziqli tezlik"
      },
      {
        symbol: "R",
        name: "Radius",
        unit: "m",
        description: "Doiraning radiusi"
      },
      {
        symbol: "T",
        name: "Davr",
        unit: "s",
        description: "Bir to'liq aylanish vaqti"
      }
    ],
    calculator: {
      solveFor: "v",
      inputs: ["R", "T"],
      defaultValues: { R: 5, T: 2 },
      formulaFn: "(R, T) => (2 * Math.PI * R) / T",
      resultUnit: "m/s",
      resultLabel: "Chiziqli tezlik"
    },
    description: "Doiraviy harakatda jism bir davr (T) da doiraning to'liq aylanasini bosib o'tadi.",
    example: "R=5 m, T=2 s: v = 2π·5 / 2 = 5π ≈ 15.7 m/s",
    tags: ["doiraviy harakat", "tezlik", "radius", "davr", "kinematika"],
    difficulty: 2,
    grade: 9,
    lesson_link: "kinematika-5",
    xp_reward: 10
  },

  // 18. Markazga intilma tezlanish
  {
    id: "kin_018",
    category: "kinematika",
    subcategory: "doiraviy_harakat",
    name: "Markazga intilma tezlanish",
    nameRu: "Центростремительное ускорение",
    formula: "a = v² / R",
    latex: "a_c = \\dfrac{v^2}{R}",
    variables: [
      {
        symbol: "a",
        name: "Markazga intilma tezlanish",
        unit: "m/s²",
        description: "Doira markaziga yo'nalgan tezlanish"
      },
      {
        symbol: "v",
        name: "Chiziqli tezlik",
        unit: "m/s",
        description: "Doira bo'ylab tezlik"
      },
      {
        symbol: "R",
        name: "Radius",
        unit: "m",
        description: "Doiraning radiusi"
      }
    ],
    calculator: {
      solveFor: "a",
      inputs: ["v", "R"],
      defaultValues: { v: 10, R: 5 },
      formulaFn: "(v, R) => (v * v) / R",
      resultUnit: "m/s²",
      resultLabel: "Markazga intilma tezlanish"
    },
    description: "Doiraviy harakatda jism doim markaz tomonga tezlanishga ega — bu jismning yo'nalishdagi o'zgarishini ta'minlaydi.",
    example: "v=10 m/s, R=5 m: a = 100/5 = 20 m/s²",
    tags: ["markazga intilma", "tezlanish", "doiraviy harakat", "radius", "kinematika"],
    difficulty: 2,
    grade: 9,
    lesson_link: "kinematika-5",
    xp_reward: 10
  },

  // 19. Burchak tezligi
  {
    id: "kin_019",
    category: "kinematika",
    subcategory: "doiraviy_harakat",
    name: "Burchak tezligi",
    nameRu: "Угловая скорость",
    formula: "ω = 2π / T = 2π·f",
    latex: "\\omega = \\dfrac{2\\pi}{T} = 2\\pi f",
    variables: [
      {
        symbol: "ω",
        name: "Burchak tezligi",
        unit: "rad/s",
        description: "Birlik vaqtda aylanilgan burchak"
      },
      {
        symbol: "T",
        name: "Davr",
        unit: "s",
        description: "Bir to'liq aylanish vaqti"
      },
      {
        symbol: "f",
        name: "Chastota",
        unit: "Hz",
        description: "Bir sekundda aylanishlar soni"
      }
    ],
    calculator: {
      solveFor: "omega",
      inputs: ["T"],
      defaultValues: { T: 2 },
      formulaFn: "(T) => (2 * Math.PI) / T",
      resultUnit: "rad/s",
      resultLabel: "Burchak tezligi"
    },
    description: "Burchak tezligi jism bir sekundda qancha radian burilishini ko'rsatadi. T va f orqali topish mumkin.",
    example: "T=2 s: ω = 2π/2 = π ≈ 3.14 rad/s",
    tags: ["burchak tezligi", "omega", "davr", "chastota", "doiraviy", "kinematika"],
    difficulty: 2,
    grade: 9,
    lesson_link: "kinematika-5",
    xp_reward: 10
  },

  // 20. Chiziqli va burchak tezlik bog'liqligi
  {
    id: "kin_020",
    category: "kinematika",
    subcategory: "doiraviy_harakat",
    name: "Chiziqli va burchak tezlik bog'liqligi",
    nameRu: "Связь линейной и угловой скоростей",
    formula: "v = ω·R",
    latex: "v = \\omega \\cdot R",
    variables: [
      {
        symbol: "v",
        name: "Chiziqli tezlik",
        unit: "m/s",
        description: "Doira bo'ylab chiziqli tezlik"
      },
      {
        symbol: "ω",
        name: "Burchak tezligi",
        unit: "rad/s",
        description: "Burchak tezligi"
      },
      {
        symbol: "R",
        name: "Radius",
        unit: "m",
        description: "Doiraning radiusi"
      }
    ],
    calculator: {
      solveFor: "v",
      inputs: ["omega", "R"],
      defaultValues: { omega: 3.14, R: 5 },
      formulaFn: "(omega, R) => omega * R",
      resultUnit: "m/s",
      resultLabel: "Chiziqli tezlik"
    },
    description: "Chiziqli tezlik burchak tezligi va radius ko'paytmasiga teng. Radius kattaroq bo'lsa, chiziqli tezlik ham katta bo'ladi.",
    example: "ω=π rad/s, R=5 m: v = π·5 = 5π ≈ 15.7 m/s",
    tags: ["chiziqli tezlik", "burchak tezligi", "radius", "doiraviy", "kinematika"],
    difficulty: 2,
    grade: 9,
    lesson_link: "kinematika-5",
    xp_reward: 10
  },

  // 21. Aylanish davri va chastota
  {
    id: "kin_021",
    category: "kinematika",
    subcategory: "doiraviy_harakat",
    name: "Davr va chastota bog'liqligi",
    nameRu: "Связь периода и частоты",
    formula: "T = 1 / f",
    latex: "T = \\dfrac{1}{f}",
    variables: [
      {
        symbol: "T",
        name: "Davr",
        unit: "s",
        description: "Bir to'liq aylanish uchun ketadigan vaqt"
      },
      {
        symbol: "f",
        name: "Chastota",
        unit: "Hz (1/s)",
        description: "Bir sekundda aylanishlar soni"
      }
    ],
    calculator: {
      solveFor: "T",
      inputs: ["f"],
      defaultValues: { f: 2 },
      formulaFn: "(f) => 1 / f",
      resultUnit: "s",
      resultLabel: "Davr"
    },
    description: "Davr va chastota teskari bog'liqlikda: chastota oshsa davr qisqaradi, davr oshsa chastota kamayadi.",
    example: "Motor minutiga 120 marta aylansa, f=2 Hz, T=1/2=0.5 s",
    tags: ["davr", "chastota", "doiraviy", "Hz", "aylanish", "kinematika"],
    difficulty: 1,
    grade: 9,
    lesson_link: "kinematika-5",
    xp_reward: 5
  },

  // 22. Markazga intilma kuch
  {
    id: "kin_022",
    category: "kinematika",
    subcategory: "doiraviy_harakat",
    name: "Markazga intilma kuch",
    nameRu: "Центростремительная сила",
    formula: "F = m·v² / R = m·ω²·R",
    latex: "F_c = \\dfrac{mv^2}{R} = m\\omega^2 R",
    variables: [
      {
        symbol: "F",
        name: "Markazga intilma kuch",
        unit: "N",
        description: "Doira markaziga yo'nalgan kuch"
      },
      {
        symbol: "m",
        name: "Massa",
        unit: "kg",
        description: "Jismning massasi"
      },
      {
        symbol: "v",
        name: "Chiziqli tezlik",
        unit: "m/s",
        description: "Doira bo'ylab tezlik"
      },
      {
        symbol: "R",
        name: "Radius",
        unit: "m",
        description: "Doiraning radiusi"
      },
      {
        symbol: "ω",
        name: "Burchak tezligi",
        unit: "rad/s",
        description: "Burchak tezligi (muqobil usul)"
      }
    ],
    calculator: {
      solveFor: "F",
      inputs: ["m", "v", "R"],
      defaultValues: { m: 2, v: 10, R: 5 },
      formulaFn: "(m, v, R) => (m * v * v) / R",
      resultUnit: "N",
      resultLabel: "Markazga intilma kuch"
    },
    description: "Doiraviy harakatni ta'minlash uchun jismga doim markaz tomonga yo'nalgan kuch ta'sir qilishi kerak.",
    example: "m=2 kg, v=10 m/s, R=5 m: F = 2·100/5 = 40 N",
    tags: ["markazga intilma kuch", "dinamika", "doiraviy harakat", "kuch", "tezlik", "radius"],
    difficulty: 2,
    grade: 9,
    lesson_link: "kinematika-5",
    xp_reward: 10
  },

  // ════════════════════════════════════════════════════════
  //  DINAMIKA  (din_001 → din_018)
  // ════════════════════════════════════════════════════════

  // 1. Nyuton 1-qonuni — inersiya
  {
    id: "din_001",
    category: "dinamika",
    subcategory: "nyuton_qonunlari",
    name: "Nyuton 1-qonuni (Inersiya)",
    nameRu: "Первый закон Ньютона (инерция)",
    formula: "F_yig = 0 → a = 0",
    latex: "\\sum F = 0 \\Rightarrow a = 0",
    variables: [
      {
        symbol: "ΣF",
        name: "Natija kuch",
        unit: "N",
        description: "Barcha kuchlarning vektorial yig'indisi"
      },
      {
        symbol: "a",
        name: "Tezlanish",
        unit: "m/s²",
        description: "Natija kuch nol bo'lsa, tezlanish ham nolga teng"
      }
    ],
    calculator: {
      solveFor: "a",
      inputs: ["F"],
      defaultValues: { F: 0 },
      formulaFn: "(F) => F === 0 ? 0 : null",
      resultUnit: "m/s²",
      resultLabel: "Tezlanish"
    },
    description: "Agar jismga ta'sir etuvchi kuchlarning yig'indisi nolga teng bo'lsa, jism tinch holatda yoki tekis to'g'ri chiziqli harakatda qoladi. Bu inersiya xossasi deyiladi.",
    example: "Kosmosda motorni o'chirgan raketa to'g'ri chizig'i bo'ylab bir xil tezlikda uchishda davom etadi — chunki hech qanday kuch ta'sir qilmaydi.",
    tags: ["nyuton", "inersiya", "1-qonun", "dinamika", "kuch", "tezlanish"],
    difficulty: 1,
    grade: 9,
    lesson_link: "dinamika-1",
    xp_reward: 5
  },

  // 2. Nyuton 2-qonuni
  {
    id: "din_002",
    category: "dinamika",
    subcategory: "nyuton_qonunlari",
    name: "Nyuton 2-qonuni",
    nameRu: "Второй закон Ньютона",
    formula: "F = m·a",
    latex: "F = ma",
    variables: [
      {
        symbol: "F",
        name: "Kuch",
        unit: "N",
        description: "Jismga ta'sir etuvchi natija kuch"
      },
      {
        symbol: "m",
        name: "Massa",
        unit: "kg",
        description: "Jismning inersial massasi"
      },
      {
        symbol: "a",
        name: "Tezlanish",
        unit: "m/s²",
        description: "Jism olgan tezlanish"
      }
    ],
    calculator: {
      solveFor: "F",
      inputs: ["m", "a"],
      defaultValues: { m: 5, a: 4 },
      formulaFn: "(m, a) => m * a",
      resultUnit: "N",
      resultLabel: "Kuch"
    },
    description: "Jism olgan tezlanish unga ta'sir etuvchi kuchga to'g'ri, massasiga teskari proporsional. Fizikaning eng asosiy qonuni.",
    example: "m=5 kg jism a=4 m/s² tezlanish olishi uchun F = 5·4 = 20 N kuch kerak.",
    tags: ["nyuton", "2-qonun", "kuch", "massa", "tezlanish", "dinamika"],
    difficulty: 1,
    grade: 9,
    lesson_link: "dinamika-1",
    xp_reward: 5
  },

  // 3. Nyuton 3-qonuni
  {
    id: "din_003",
    category: "dinamika",
    subcategory: "nyuton_qonunlari",
    name: "Nyuton 3-qonuni",
    nameRu: "Третий закон Ньютона",
    formula: "F₁₂ = -F₂₁",
    latex: "\\vec{F}_{12} = -\\vec{F}_{21}",
    variables: [
      {
        symbol: "F₁₂",
        name: "1-jism 2-jismga ta'sir etuvchi kuch",
        unit: "N",
        description: "1-jismning 2-jismga ko'rsatadigan kuchi"
      },
      {
        symbol: "F₂₁",
        name: "2-jism 1-jismga ta'sir etuvchi kuch",
        unit: "N",
        description: "2-jismning 1-jismga ko'rsatadigan reaksiya kuchi"
      }
    ],
    calculator: {
      solveFor: "F21",
      inputs: ["F12"],
      defaultValues: { F12: 10 },
      formulaFn: "(F12) => -F12",
      resultUnit: "N",
      resultLabel: "Reaksiya kuchi (F₂₁)"
    },
    description: "Har bir ta'sir kuchiga teng miqdorli, lekin qarama-qarshi yo'nalishli reaksiya kuchi mavjud. Kuchlar har doim juft bo'lib, turli jismlarga ta'sir etadi.",
    example: "Raketa gaz chiqaradi (ta'sir), gaz raketani oldinga itaradi (reaksiya). Ikkalasi teng, lekin qarama-qarshi.",
    tags: ["nyuton", "3-qonun", "ta'sir", "reaksiya", "dinamika", "kuch"],
    difficulty: 1,
    grade: 9,
    lesson_link: "dinamika-1",
    xp_reward: 5
  },

  // 4. Og'irlik kuchi
  {
    id: "din_004",
    category: "dinamika",
    subcategory: "nyuton_qonunlari",
    name: "Og'irlik kuchi",
    nameRu: "Сила тяжести",
    formula: "F = m·g",
    latex: "F_g = mg",
    variables: [
      {
        symbol: "F",
        name: "Og'irlik kuchi",
        unit: "N",
        description: "Jismga ta'sir etuvchi tortishish kuchi"
      },
      {
        symbol: "m",
        name: "Massa",
        unit: "kg",
        description: "Jismning massasi"
      },
      {
        symbol: "g",
        name: "Erkin tushish tezlanishi",
        unit: "m/s²",
        description: "g ≈ 9.8 m/s² (Yer yuzasida)",
        constant: true,
        value: 9.8
      }
    ],
    calculator: {
      solveFor: "F",
      inputs: ["m"],
      defaultValues: { m: 10 },
      formulaFn: "(m) => m * 9.8",
      resultUnit: "N",
      resultLabel: "Og'irlik kuchi"
    },
    description: "Yer jismlarni o'ziga tortadi. Bu tortish kuchi jismning massasiga va erkin tushish tezlanishiga bog'liq.",
    example: "m=10 kg jismning og'irlik kuchi: F = 10·9.8 = 98 N",
    tags: ["og'irlik", "gravitatsiya", "kuch", "massa", "dinamika", "g"],
    difficulty: 1,
    grade: 9,
    lesson_link: "dinamika-1",
    xp_reward: 5
  },

  // 5. Elastiklik kuchi — Guk qonuni
  {
    id: "din_005",
    category: "dinamika",
    subcategory: "elastiklik",
    name: "Elastiklik kuchi (Guk qonuni)",
    nameRu: "Закон Гука (сила упругости)",
    formula: "F = k·x",
    latex: "F = kx",
    variables: [
      {
        symbol: "F",
        name: "Elastiklik kuchi",
        unit: "N",
        description: "Prujina yoki elastik jism ko'rsatadigan qaytaruvchi kuch"
      },
      {
        symbol: "k",
        name: "Qattiqlik koeffitsienti",
        unit: "N/m",
        description: "Prujinaning qattiqlik o'lchami"
      },
      {
        symbol: "x",
        name: "Deformatsiya",
        unit: "m",
        description: "Prujina uzaygan yoki qisqargan masofa"
      }
    ],
    calculator: {
      solveFor: "F",
      inputs: ["k", "x"],
      defaultValues: { k: 200, x: 0.05 },
      formulaFn: "(k, x) => k * x",
      resultUnit: "N",
      resultLabel: "Elastiklik kuchi"
    },
    description: "Guk qonuniga ko'ra, elastiklik kuchi deformatsiyaga to'g'ri proporsional. Bu faqat elastik chegara doirasida amal qiladi.",
    example: "k=200 N/m prujina 5 sm cho'zilsa: F = 200·0.05 = 10 N qaytaruvchi kuch hosil bo'ladi.",
    tags: ["Guk qonuni", "elastiklik", "prujina", "deformatsiya", "kuch", "dinamika"],
    difficulty: 1,
    grade: 9,
    lesson_link: "dinamika-2",
    xp_reward: 5
  },

  // 6. Ishqalanish kuchi (kinetik)
  {
    id: "din_006",
    category: "dinamika",
    subcategory: "ishqalanish",
    name: "Kinetik ishqalanish kuchi",
    nameRu: "Сила кинетического трения",
    formula: "F_ish = μ·N",
    latex: "F_{tr} = \\mu N",
    variables: [
      {
        symbol: "F_ish",
        name: "Ishqalanish kuchi",
        unit: "N",
        description: "Sirt bilan jism orasidagi kinetik ishqalanish kuchi"
      },
      {
        symbol: "μ",
        name: "Ishqalanish koeffitsienti",
        unit: "o'lchamsiz",
        description: "Kinetik ishqalanish koeffitsienti (0 dan 1 gacha odatda)"
      },
      {
        symbol: "N",
        name: "Normal reaktsiya kuchi",
        unit: "N",
        description: "Sirtning jismga ta'sir etuvchi normal kuchi"
      }
    ],
    calculator: {
      solveFor: "F_ish",
      inputs: ["mu", "N"],
      defaultValues: { mu: 0.3, N: 98 },
      formulaFn: "(mu, N) => mu * N",
      resultUnit: "N",
      resultLabel: "Ishqalanish kuchi"
    },
    description: "Kinetik ishqalanish kuchi — harakatdagi jismga sirt tomonidan qarama-qarshi yo'nalishda ta'sir etuvchi kuch.",
    example: "μ=0.3, N=98 N (m=10 kg gorizontalda): F_ish = 0.3·98 = 29.4 N",
    tags: ["ishqalanish", "kinetik", "koeffitsient", "normal kuch", "dinamika"],
    difficulty: 1,
    grade: 9,
    lesson_link: "dinamika-2",
    xp_reward: 5
  },

  // 7. Tinchlikdagi ishqalanish
  {
    id: "din_007",
    category: "dinamika",
    subcategory: "ishqalanish",
    name: "Tinchlikdagi (statik) ishqalanish kuchi",
    nameRu: "Сила статического трения",
    formula: "F_stat ≤ μ₀·N",
    latex: "F_{stat} \\leq \\mu_0 N",
    variables: [
      {
        symbol: "F_stat",
        name: "Statik ishqalanish kuchi",
        unit: "N",
        description: "Tinch turgan jismga ta'sir etuvchi maksimal ishqalanish kuchi"
      },
      {
        symbol: "μ₀",
        name: "Statik ishqalanish koeffitsienti",
        unit: "o'lchamsiz",
        description: "Statik koeffitsient (kinetikdan kattaroq bo'ladi)"
      },
      {
        symbol: "N",
        name: "Normal reaktsiya kuchi",
        unit: "N",
        description: "Sirtning normal ta'sir kuchi"
      }
    ],
    calculator: {
      solveFor: "F_max",
      inputs: ["mu0", "N"],
      defaultValues: { mu0: 0.4, N: 98 },
      formulaFn: "(mu0, N) => mu0 * N",
      resultUnit: "N",
      resultLabel: "Maksimal statik ishqalanish"
    },
    description: "Tinch turgan jismni harakat qildirish uchun qo'yilgan kuch μ₀·N dan oshishi kerak. Statik koeffitsient odatda kinetikdan katta.",
    example: "μ₀=0.4, N=98 N: Jismni siljitish uchun F > 0.4·98 = 39.2 N kerak.",
    tags: ["statik ishqalanish", "tinchlik", "koeffitsient", "dinamika", "kuch"],
    difficulty: 2,
    grade: 9,
    lesson_link: "dinamika-2",
    xp_reward: 10
  },

  // 8. Normal reaktsiya kuchi (gorizontal sirt)
  {
    id: "din_008",
    category: "dinamika",
    subcategory: "nyuton_qonunlari",
    name: "Normal reaktsiya kuchi (gorizontal sirt)",
    nameRu: "Нормальная реакция опоры (горизонт)",
    formula: "N = m·g",
    latex: "N = mg",
    variables: [
      {
        symbol: "N",
        name: "Normal reaktsiya kuchi",
        unit: "N",
        description: "Gorizontal sirtning jismga perpendikulyar ta'sir kuchi"
      },
      {
        symbol: "m",
        name: "Massa",
        unit: "kg",
        description: "Jismning massasi"
      },
      {
        symbol: "g",
        name: "Erkin tushish tezlanishi",
        unit: "m/s²",
        description: "g ≈ 9.8 m/s²",
        constant: true,
        value: 9.8
      }
    ],
    calculator: {
      solveFor: "N",
      inputs: ["m"],
      defaultValues: { m: 10 },
      formulaFn: "(m) => m * 9.8",
      resultUnit: "N",
      resultLabel: "Normal reaktsiya kuchi"
    },
    description: "Gorizontal sirtda tinch turgan jismga sirt tomonidan yuqoriga yo'nalgan normal reaktsiya kuchi og'irlik kuchiga teng va qarama-qarshi.",
    example: "m=10 kg jism gorizontalda turadi: N = 10·9.8 = 98 N",
    tags: ["normal kuch", "reaktsiya", "gorizontal", "dinamika", "og'irlik"],
    difficulty: 1,
    grade: 9,
    lesson_link: "dinamika-2",
    xp_reward: 5
  },

  // 9. Qiyalikdagi normal reaktsiya
  {
    id: "din_009",
    category: "dinamika",
    subcategory: "ishqalanish",
    name: "Qiyalikdagi normal reaktsiya kuchi",
    nameRu: "Нормальная реакция на наклонной плоскости",
    formula: "N = m·g·cosα",
    latex: "N = mg\\cos\\alpha",
    variables: [
      {
        symbol: "N",
        name: "Normal reaktsiya kuchi",
        unit: "N",
        description: "Qiyalik sirtining jismga perpendikulyar ta'sir kuchi"
      },
      {
        symbol: "m",
        name: "Massa",
        unit: "kg",
        description: "Jismning massasi"
      },
      {
        symbol: "g",
        name: "Erkin tushish tezlanishi",
        unit: "m/s²",
        description: "g ≈ 9.8 m/s²",
        constant: true,
        value: 9.8
      },
      {
        symbol: "α",
        name: "Qiyalik burchagi",
        unit: "°",
        description: "Qiyalikning gorizontal bilan bog'liq burchagi"
      }
    ],
    calculator: {
      solveFor: "N",
      inputs: ["m", "alpha"],
      defaultValues: { m: 10, alpha: 30 },
      formulaFn: "(m, alpha) => m * 9.8 * Math.cos(alpha * Math.PI / 180)",
      resultUnit: "N",
      resultLabel: "Normal reaktsiya kuchi"
    },
    description: "Qiyalik (tiyrak) tekislikdagi jismga qiyalik sirtidan perpendikulyar yo'nalishda normal kuch ta'sir etadi. U burchak oshgan sari kamayadi.",
    example: "m=10 kg, α=30°: N = 10·9.8·cos30° = 98·0.866 = 84.9 N",
    tags: ["qiyalik", "normal kuch", "burchak", "dinamika", "tiyrak tekislik"],
    difficulty: 2,
    grade: 9,
    lesson_link: "dinamika-3",
    xp_reward: 10
  },

  // 10. Qiyalikda harakat (ishqalanishsiz)
  {
    id: "din_010",
    category: "dinamika",
    subcategory: "ishqalanish",
    name: "Qiyalikda harakat tezlanishi (ishqalanishsiz)",
    nameRu: "Ускорение на наклонной плоскости (без трения)",
    formula: "a = g·sinα",
    latex: "a = g\\sin\\alpha",
    variables: [
      {
        symbol: "a",
        name: "Tezlanish",
        unit: "m/s²",
        description: "Jismning qiyalik bo'ylab pastga tezlanishi"
      },
      {
        symbol: "g",
        name: "Erkin tushish tezlanishi",
        unit: "m/s²",
        description: "g ≈ 9.8 m/s²",
        constant: true,
        value: 9.8
      },
      {
        symbol: "α",
        name: "Qiyalik burchagi",
        unit: "°",
        description: "Qiyalikning gorizontal bilan burchagi"
      }
    ],
    calculator: {
      solveFor: "a",
      inputs: ["alpha"],
      defaultValues: { alpha: 30 },
      formulaFn: "(alpha) => 9.8 * Math.sin(alpha * Math.PI / 180)",
      resultUnit: "m/s²",
      resultLabel: "Tezlanish"
    },
    description: "Ishqalanishi yo'q qiyalik bo'ylab sirg'anayotgan jismning tezlanishi faqat burchak va g ga bog'liq. Massadan mustaqil!",
    example: "α=30° qiyalikda (ishqalanishsiz): a = 9.8·sin30° = 9.8·0.5 = 4.9 m/s²",
    tags: ["qiyalik", "tezlanish", "ishqalanishsiz", "dinamika", "sinα"],
    difficulty: 2,
    grade: 9,
    lesson_link: "dinamika-3",
    xp_reward: 10
  },

  // 11. Qiyalikda harakat (ishqalanish bilan)
  {
    id: "din_011",
    category: "dinamika",
    subcategory: "ishqalanish",
    name: "Qiyalikda harakat tezlanishi (ishqalanish bilan)",
    nameRu: "Ускорение на наклонной плоскости (с трением)",
    formula: "a = g·(sinα - μ·cosα)",
    latex: "a = g(\\sin\\alpha - \\mu\\cos\\alpha)",
    variables: [
      {
        symbol: "a",
        name: "Tezlanish",
        unit: "m/s²",
        description: "Qiyalik bo'ylab tezlanish (ishqalanish hisobga olingan)"
      },
      {
        symbol: "g",
        name: "Erkin tushish tezlanishi",
        unit: "m/s²",
        description: "g ≈ 9.8 m/s²",
        constant: true,
        value: 9.8
      },
      {
        symbol: "α",
        name: "Qiyalik burchagi",
        unit: "°",
        description: "Qiyalikning gorizontal bilan burchagi"
      },
      {
        symbol: "μ",
        name: "Ishqalanish koeffitsienti",
        unit: "o'lchamsiz",
        description: "Kinetik ishqalanish koeffitsienti"
      }
    ],
    calculator: {
      solveFor: "a",
      inputs: ["alpha", "mu"],
      defaultValues: { alpha: 30, mu: 0.2 },
      formulaFn: "(alpha, mu) => 9.8 * (Math.sin(alpha * Math.PI / 180) - mu * Math.cos(alpha * Math.PI / 180))",
      resultUnit: "m/s²",
      resultLabel: "Tezlanish"
    },
    description: "Ishqalanish bor qiyalikda tezlanish sinα tarkibidan μ·cosα ni ayirib topiladi. Agar sinα < μ·cosα bo'lsa, jism siljiymaydi.",
    example: "α=30°, μ=0.2: a = 9.8·(sin30°−0.2·cos30°) = 9.8·(0.5−0.173) = 3.2 m/s²",
    tags: ["qiyalik", "ishqalanish", "tezlanish", "dinamika", "burchak"],
    difficulty: 3,
    grade: 9,
    lesson_link: "dinamika-3",
    xp_reward: 15
  },

  // 12. Atwood mashinasi tezlanishi
  {
    id: "din_012",
    category: "dinamika",
    subcategory: "nyuton_qonunlari",
    name: "Atwood mashinasi tezlanishi",
    nameRu: "Машина Атвуда (ускорение)",
    formula: "a = g·(m₁ - m₂) / (m₁ + m₂)",
    latex: "a = \\dfrac{(m_1 - m_2)g}{m_1 + m_2}",
    variables: [
      {
        symbol: "a",
        name: "Tezlanish",
        unit: "m/s²",
        description: "Sistemaning tezlanishi"
      },
      {
        symbol: "m₁",
        name: "Birinchi jism massasi",
        unit: "kg",
        description: "Og'irroq jismning massasi"
      },
      {
        symbol: "m₂",
        name: "Ikkinchi jism massasi",
        unit: "kg",
        description: "Yengilroq jismning massasi"
      },
      {
        symbol: "g",
        name: "Erkin tushish tezlanishi",
        unit: "m/s²",
        description: "g ≈ 9.8 m/s²",
        constant: true,
        value: 9.8
      }
    ],
    calculator: {
      solveFor: "a",
      inputs: ["m1", "m2"],
      defaultValues: { m1: 6, m2: 4 },
      formulaFn: "(m1, m2) => 9.8 * (m1 - m2) / (m1 + m2)",
      resultUnit: "m/s²",
      resultLabel: "Tezlanish"
    },
    description: "Atwood mashinasida arqonga bog'langan ikki jism blok orqali tortishadi. Tezlanish massalar farqi va yig'indisiga bog'liq.",
    example: "m₁=6 kg, m₂=4 kg: a = 9.8·(6−4)/(6+4) = 9.8·2/10 = 1.96 m/s²",
    tags: ["Atwood", "tezlanish", "massa", "blok", "dinamika", "sistema"],
    difficulty: 3,
    grade: 9,
    lesson_link: "dinamika-3",
    xp_reward: 15
  },

  // 13. Butun dunyo tortishish qonuni
  {
    id: "din_013",
    category: "dinamika",
    subcategory: "gravitatsiya",
    name: "Butun dunyo tortishish qonuni",
    nameRu: "Закон всемирного тяготения",
    formula: "F = G·m₁·m₂ / R²",
    latex: "F = \\dfrac{Gm_1 m_2}{R^2}",
    variables: [
      {
        symbol: "F",
        name: "Tortishish kuchi",
        unit: "N",
        description: "Ikki jism orasidagi gravitatsion tortishish kuchi"
      },
      {
        symbol: "G",
        name: "Gravitatsion doimiy",
        unit: "N·m²/kg²",
        description: "G = 6.67 × 10⁻¹¹ N·m²/kg²",
        constant: true,
        value: 6.674e-11
      },
      {
        symbol: "m₁",
        name: "Birinchi jism massasi",
        unit: "kg",
        description: "Birinchi jismning massasi"
      },
      {
        symbol: "m₂",
        name: "Ikkinchi jism massasi",
        unit: "kg",
        description: "Ikkinchi jismning massasi"
      },
      {
        symbol: "R",
        name: "Masofa",
        unit: "m",
        description: "Jismlar markazlari orasidagi masofa"
      }
    ],
    calculator: {
      solveFor: "F",
      inputs: ["m1", "m2", "R"],
      defaultValues: { m1: 5.972e24, m2: 80, R: 6.371e6 },
      formulaFn: "(m1, m2, R) => (6.674e-11 * m1 * m2) / (R * R)",
      resultUnit: "N",
      resultLabel: "Tortishish kuchi"
    },
    description: "Har qanday ikki jism ularning massalari ko'paytmasiga to'g'ri va ular orasidagi masofaning kvadratiga teskari proporsional kuch bilan bir-birini tortadi.",
    example: "Yer (5.97×10²⁴ kg) 80 kg odamni tortadi: F = G·M·m/R² ≈ 784 N (≈ og'irlik kuchi)",
    tags: ["tortishish", "gravitatsiya", "Newton", "G", "massa", "masofa", "dinamika"],
    difficulty: 2,
    grade: 9,
    lesson_link: "dinamika-4",
    xp_reward: 10
  },

  // 14. Erkin tushish tezlanishi (sayyora uchun)
  {
    id: "din_014",
    category: "dinamika",
    subcategory: "gravitatsiya",
    name: "Sayyora yuzasidagi erkin tushish tezlanishi",
    nameRu: "Ускорение свободного падения на планете",
    formula: "g = G·M / R²",
    latex: "g = \\dfrac{GM}{R^2}",
    variables: [
      {
        symbol: "g",
        name: "Erkin tushish tezlanishi",
        unit: "m/s²",
        description: "Sayyora yuzasidagi gravitatsion tezlanish"
      },
      {
        symbol: "G",
        name: "Gravitatsion doimiy",
        unit: "N·m²/kg²",
        description: "G = 6.67 × 10⁻¹¹",
        constant: true,
        value: 6.674e-11
      },
      {
        symbol: "M",
        name: "Sayyora massasi",
        unit: "kg",
        description: "Sayyoraning umumiy massasi"
      },
      {
        symbol: "R",
        name: "Sayyora radiusi",
        unit: "m",
        description: "Sayyoraning markazi va yuzasi orasidagi masofa"
      }
    ],
    calculator: {
      solveFor: "g",
      inputs: ["M", "R"],
      defaultValues: { M: 5.972e24, R: 6.371e6 },
      formulaFn: "(M, R) => (6.674e-11 * M) / (R * R)",
      resultUnit: "m/s²",
      resultLabel: "g (tezlanish)"
    },
    description: "Turli sayyoralarda g har xil bo'ladi. Yerda ≈9.8 m/s², Oyda ≈1.62 m/s², Marsda ≈3.72 m/s².",
    example: "Yer: M=5.97×10²⁴ kg, R=6.371×10⁶ m → g = 6.67×10⁻¹¹·5.97×10²⁴/(6.371×10⁶)² ≈ 9.8 m/s²",
    tags: ["g", "erkin tushish", "sayyora", "gravitatsiya", "G", "dinamika"],
    difficulty: 3,
    grade: 9,
    lesson_link: "dinamika-4",
    xp_reward: 15
  },

  // 15. Birinchi kosmik tezlik
  {
    id: "din_015",
    category: "dinamika",
    subcategory: "gravitatsiya",
    name: "Birinchi kosmik tezlik",
    nameRu: "Первая космическая скорость",
    formula: "v₁ = √(g·R)",
    latex: "v_1 = \\sqrt{gR} = \\sqrt{\\dfrac{GM}{R}}",
    variables: [
      {
        symbol: "v₁",
        name: "Birinchi kosmik tezlik",
        unit: "m/s",
        description: "Sun'iy yo'ldosh uchun minimal orbital tezlik"
      },
      {
        symbol: "g",
        name: "Erkin tushish tezlanishi",
        unit: "m/s²",
        description: "Sayyora yuzasidagi g",
        constant: true,
        value: 9.8
      },
      {
        symbol: "R",
        name: "Sayyora radiusi",
        unit: "m",
        description: "Sayyora markazi va yuzasi orasidagi masofa"
      }
    ],
    calculator: {
      solveFor: "v1",
      inputs: ["R"],
      defaultValues: { R: 6.371e6 },
      formulaFn: "(R) => Math.sqrt(9.8 * R)",
      resultUnit: "m/s",
      resultLabel: "Birinchi kosmik tezlik"
    },
    description: "Sayyora yuzasiga yaqin sun'iy yo'ldosh uchun zarur bo'lgan minimal orbital tezlik. Yer uchun ≈7.9 km/s.",
    example: "Yer uchun R=6.371×10⁶ m: v₁ = √(9.8·6.371×10⁶) = √(62.4×10⁶) ≈ 7900 m/s = 7.9 km/s",
    tags: ["kosmik tezlik", "orbital", "yo'ldosh", "gravitatsiya", "dinamika"],
    difficulty: 3,
    grade: 9,
    lesson_link: "dinamika-4",
    xp_reward: 15
  },

  // 16. Yo'ldosh harakati davri
  {
    id: "din_016",
    category: "dinamika",
    subcategory: "gravitatsiya",
    name: "Sun'iy yo'ldosh harakati davri",
    nameRu: "Период обращения спутника",
    formula: "T = 2π·√(R³ / (G·M))",
    latex: "T = 2\\pi\\sqrt{\\dfrac{R^3}{GM}}",
    variables: [
      {
        symbol: "T",
        name: "Orbital davr",
        unit: "s",
        description: "Yo'ldoshning bir to'liq aylanish vaqti"
      },
      {
        symbol: "R",
        name: "Orbital radius",
        unit: "m",
        description: "Sayyora markazi va yo'ldosh orasidagi masofa"
      },
      {
        symbol: "G",
        name: "Gravitatsion doimiy",
        unit: "N·m²/kg²",
        description: "G = 6.67×10⁻¹¹",
        constant: true,
        value: 6.674e-11
      },
      {
        symbol: "M",
        name: "Sayyora massasi",
        unit: "kg",
        description: "Markaziy sayyoraning massasi"
      }
    ],
    calculator: {
      solveFor: "T",
      inputs: ["R", "M"],
      defaultValues: { R: 6.371e6, M: 5.972e24 },
      formulaFn: "(R, M) => 2 * Math.PI * Math.sqrt(Math.pow(R, 3) / (6.674e-11 * M))",
      resultUnit: "s",
      resultLabel: "Orbital davr"
    },
    description: "Kepler 3-qonuniga asoslangan. Orbital radius ulkan bo'lgan sari davr ko'payadi (Yer atrofida ~84 min, Oy ~27 kun).",
    example: "R=6.371×10⁶ m, M=5.97×10²⁴ kg: T = 2π√(R³/GM) ≈ 5060 s ≈ 84 min",
    tags: ["yo'ldosh", "orbital davr", "Kepler", "sayyora", "gravitatsiya", "dinamika"],
    difficulty: 3,
    grade: 9,
    lesson_link: "dinamika-4",
    xp_reward: 15
  },

  // 17. Og'irliksizlik holati
  {
    id: "din_017",
    category: "dinamika",
    subcategory: "gravitatsiya",
    name: "Og'irliksizlik holati",
    nameRu: "Состояние невесомости",
    formula: "N = 0, a = g",
    latex: "N = 0 \\Leftrightarrow a = g",
    variables: [
      {
        symbol: "N",
        name: "Normal reaktsiya kuchi",
        unit: "N",
        description: "Og'irliksizlik holatida tayanch reaktsiyasi nolga teng"
      },
      {
        symbol: "a",
        name: "Tezlanish",
        unit: "m/s²",
        description: "Jism erkin tushish tezlanishiga teng tezlanish olganida og'irliksizlik yuz beradi"
      },
      {
        symbol: "g",
        name: "Erkin tushish tezlanishi",
        unit: "m/s²",
        description: "g ≈ 9.8 m/s²",
        constant: true,
        value: 9.8
      }
    ],
    calculator: {
      solveFor: "N",
      inputs: ["m", "a"],
      defaultValues: { m: 70, a: 9.8 },
      formulaFn: "(m, a) => m * (9.8 - a)",
      resultUnit: "N",
      resultLabel: "Apparentlik og'irligi"
    },
    description: "Jism erkin tushish tezlanishiga teng tezlanish olganda og'irliksizlik yuz beradi. Bu holatda tayanch kuchi N=0. Kosmosda doimiy og'irliksizlik.",
    example: "Lift erkin tushganda (a=g=9.8 m/s²): N = m(g-a) = m·0 = 0 — og'irliksizlik!",
    tags: ["og'irliksizlik", "erkin tushish", "lift", "kosmik", "dinamika", "N=0"],
    difficulty: 2,
    grade: 9,
    lesson_link: "dinamika-4",
    xp_reward: 10
  },

  // 18. Lift — apparentlik og'irligi
  {
    id: "din_018",
    category: "dinamika",
    subcategory: "nyuton_qonunlari",
    name: "Apparentlik og'irligi (Lift effekti)",
    nameRu: "Кажущийся вес (в лифте)",
    formula: "N = m·(g ± a)",
    latex: "N = m(g \\pm a)",
    variables: [
      {
        symbol: "N",
        name: "Apparentlik og'irligi",
        unit: "N",
        description: "Lift harakatida tayanch ko'rsatadigan kuch (sezilgan og'irlik)"
      },
      {
        symbol: "m",
        name: "Massa",
        unit: "kg",
        description: "Jismning massasi"
      },
      {
        symbol: "g",
        name: "Erkin tushish tezlanishi",
        unit: "m/s²",
        description: "g ≈ 9.8 m/s²",
        constant: true,
        value: 9.8
      },
      {
        symbol: "a",
        name: "Lift tezlanishi",
        unit: "m/s²",
        description: "Yuqoriga harakatda '+', pastga harakatda '−'"
      }
    ],
    calculator: {
      solveFor: "N",
      inputs: ["m", "a", "dir"],
      defaultValues: { m: 70, a: 2 },
      formulaFn: "(m, a) => m * (9.8 + a)",
      resultUnit: "N",
      resultLabel: "Apparentlik og'irligi (↑ holat)"
    },
    description: "Lift yuqoriga tezlanganda N = m(g+a) — og'irlik ortadi. Pastga tezlanganda N = m(g−a) — og'irlik kamayadi. a=g bo'lganda og'irliksizlik.",
    example: "m=70 kg, lift a=2 m/s² bilan yuqoriga: N = 70·(9.8+2) = 70·11.8 = 826 N (oddiy 686 N o'rniga)",
    tags: ["lift", "apparentlik og'irlik", "tezlanish", "dinamika", "Nyuton"],
    difficulty: 2,
    grade: 9,
    lesson_link: "dinamika-4",
    xp_reward: 10
  },

  // ════════════════════════════════════════════════════════
  //  ISH, QUVVAT, ENERGIYA  (ish_001 → ish_016)
  // ════════════════════════════════════════════════════════

  // 1. Mexanik ish ta'rifi
  {
    id: "ish_001",
    category: "ish_energiya",
    subcategory: "ish",
    name: "Mexanik ish",
    nameRu: "Механическая работа",
    formula: "A = F·s·cosα",
    latex: "A = Fs\\cos\\alpha",
    variables: [
      { symbol: "A", name: "Ish", unit: "J", description: "Bajarilgan mexanik ish" },
      { symbol: "F", name: "Kuch", unit: "N", description: "Jismga ta'sir etuvchi kuch" },
      { symbol: "s", name: "Ko'chish", unit: "m", description: "Jismning ko'chishi" },
      { symbol: "α", name: "Burchak", unit: "°", description: "Kuch va ko'chish vektorlari orasidagi burchak" }
    ],
    calculator: {
      solveFor: "A",
      inputs: ["F", "s", "alpha"],
      defaultValues: { F: 50, s: 10, alpha: 0 },
      formulaFn: "(F, s, alpha) => F * s * Math.cos(alpha * Math.PI / 180)",
      resultUnit: "J",
      resultLabel: "Bajarilgan ish"
    },
    description: "Mexanik ish kuchning ko'chish yo'nalishidagi tashkil etuvchisi va masofa ko'paytmasiga teng. α=90° da (perpendikulyar) ish bajarilmaydi (A=0).",
    example: "F=50N kuch jismni 10m ga tortdi (α=0°). A = 50·10·cos0° = 500 J",
    tags: ["ish", "kuch", "ko'chish", "burchak", "energiya"],
    difficulty: 1, grade: 9, lesson_link: "ish-1", xp_reward: 5
  },

  // 2. Ish (vertikal ko'tarish)
  {
    id: "ish_002",
    category: "ish_energiya",
    subcategory: "ish",
    name: "Vertikal ko'tarishda bajarilgan ish",
    nameRu: "Работа при равномерном подъеме",
    formula: "A = m·g·h",
    latex: "A = mgh",
    variables: [
      { symbol: "A", name: "Ish", unit: "J", description: "Og'irlikka qarshi bajarilgan ish" },
      { symbol: "m", name: "Massa", unit: "kg", description: "Ko'tarilayotgan jism massasi" },
      { symbol: "g", name: "Erkin tushish tezlanishi", unit: "m/s²", constant: true, value: 9.8 },
      { symbol: "h", name: "Balandlik", unit: "m", description: "Ko'tarilgan balandlik" }
    ],
    calculator: {
      solveFor: "A",
      inputs: ["m", "h"],
      defaultValues: { m: 10, h: 5 },
      formulaFn: "(m, h) => m * 9.8 * h",
      resultUnit: "J",
      resultLabel: "Bajarilgan ish"
    },
    description: "Jismni yuqoriga tekis ko'tarishda og'irlik kuchiga qarshi bajarilgan ish uning potensial energiyasi o'zgarishiga teng.",
    example: "m=10kg jismni h=5m ga ko'tarish ishi: A = 10·9.8·5 = 490 J",
    tags: ["ish", "ko'tarish", "og'irlik kuchi", "balandlik", "energiya"],
    difficulty: 1, grade: 9, lesson_link: "ish-1", xp_reward: 5
  },

  // 3. Quvvat ta'rifi
  {
    id: "ish_003",
    category: "ish_energiya",
    subcategory: "quvvat",
    name: "Quvvat (umumiy)",
    nameRu: "Мощность",
    formula: "P = A / t",
    latex: "P = \\dfrac{A}{t}",
    variables: [
      { symbol: "P", name: "Quvvat", unit: "W", description: "Ish bajarish tezligi" },
      { symbol: "A", name: "Ish", unit: "J", description: "Bajarilgan ish" },
      { symbol: "t", name: "Vaqt", unit: "s", description: "Ish bajarishga ketgan vaqt" }
    ],
    calculator: {
      solveFor: "P",
      inputs: ["A", "t"],
      defaultValues: { A: 1000, t: 10 },
      formulaFn: "(A, t) => A / t",
      resultUnit: "W",
      resultLabel: "Quvvat"
    },
    description: "Quvvat — vaqt birligi ichida bajarilgan ish miqdori. U ishning qanchalik tez bajarilganini bildiradi.",
    example: "Dvigatel 10s da 1000 J ish bajardi. Quvvati: P = 1000 / 10 = 100 W",
    tags: ["quvvat", "ish", "vaqt", "energiya", "P"],
    difficulty: 1, grade: 9, lesson_link: "quvvat-1", xp_reward: 5
  },

  // 4. Quvvat (tezlik orqali)
  {
    id: "ish_004",
    category: "ish_energiya",
    subcategory: "quvvat",
    name: "Quvvat (kuch va tezlik orqali)",
    nameRu: "Мощность через скорость",
    formula: "P = F·v",
    latex: "P = Fv",
    variables: [
      { symbol: "P", name: "Quvvat", unit: "W", description: "Harakatlantiruvchi quvvat" },
      { symbol: "F", name: "Kuch", unit: "N", description: "Harakatlantiruvchi kuch" },
      { symbol: "v", name: "Tezlik", unit: "m/s", description: "Jismning tezligi" }
    ],
    calculator: {
      solveFor: "P",
      inputs: ["F", "v"],
      defaultValues: { F: 200, v: 25 },
      formulaFn: "(F, v) => F * v",
      resultUnit: "W",
      resultLabel: "Quvvat"
    },
    description: "Avtomobil yoki mexanizmning quvvati uning tortish kuchi va tezligi ko'paytmasiga teng. Quvvat o'zgarmas bo'lsa, tezlik oshganda tortish kuchi kamayadi.",
    example: "Avtomobil v=25m/s tezlikda F=200N qarshilikni yengmoqda: P = 200·25 = 5000 W = 5 kW",
    tags: ["quvvat", "tezlik", "kuch", "avtomobil"],
    difficulty: 2, grade: 9, lesson_link: "quvvat-1", xp_reward: 10
  },

  // 5. Kinetik energiya
  {
    id: "ish_005",
    category: "ish_energiya",
    subcategory: "energiya",
    name: "Kinetik energiya",
    nameRu: "Кинетическая энергия",
    formula: "Ek = m·v² / 2",
    latex: "E_k = \\dfrac{mv^2}{2}",
    variables: [
      { symbol: "Ek", name: "Kinetik energiya", unit: "J", description: "Harakatlanayotgan jismning energiyasi" },
      { symbol: "m", name: "Massa", unit: "kg", description: "Jism massasi" },
      { symbol: "v", name: "Tezlik", unit: "m/s", description: "Jism tezligi" }
    ],
    calculator: {
      solveFor: "Ek",
      inputs: ["m", "v"],
      defaultValues: { m: 1000, v: 20 },
      formulaFn: "(m, v) => (m * v * v) / 2",
      resultUnit: "J",
      resultLabel: "Kinetik energiya"
    },
    description: "Kinetik energiya harakatdagi jismning ish bajarish qobiliyatini ifodalaydi. Tezlik 2 marta oshsa, kinetik energiya 4 marta oshadi.",
    example: "m=1000kg mashina v=20m/s da harakatlanmoqda: Ek = 1000·400 / 2 = 200000 J = 200 kJ",
    tags: ["energiya", "kinetik", "harakat", "tezlik", "massa"],
    difficulty: 1, grade: 9, lesson_link: "energiya-1", xp_reward: 5
  },

  // 6. Potensial energiya
  {
    id: "ish_006",
    category: "ish_energiya",
    subcategory: "energiya",
    name: "Potensial energiya (tortishish)",
    nameRu: "Потенциальная энергия гравитации",
    formula: "Ep = m·g·h",
    latex: "E_p = mgh",
    variables: [
      { symbol: "Ep", name: "Potensial energiya", unit: "J", description: "Balandlikk ko'tarilgan jism energiyasi" },
      { symbol: "m", name: "Massa", unit: "kg", description: "Jism massasi" },
      { symbol: "g", name: "Erkin tushish tezlanishi", unit: "m/s²", constant: true, value: 9.8 },
      { symbol: "h", name: "Balandlik", unit: "m", description: "Nolinchi sathdan balandlik" }
    ],
    calculator: {
      solveFor: "Ep",
      inputs: ["m", "h"],
      defaultValues: { m: 50, h: 10 },
      formulaFn: "(m, h) => m * 9.8 * h",
      resultUnit: "J",
      resultLabel: "Potensial energiya"
    },
    description: "Og'irlik kuchi maydonida balandlikka ko'tarilgan jism potensial energiyaga ega bo'ladi.",
    example: "h=10m balandlikdagi m=50kg tosh: Ep = 50·9.8·10 = 4900 J",
    tags: ["energiya", "potensial", "gravitatsiya", "balandlik", "massa"],
    difficulty: 1, grade: 9, lesson_link: "energiya-1", xp_reward: 5
  },

  // 7. Elastik potensial energiya
  {
    id: "ish_007",
    category: "ish_energiya",
    subcategory: "energiya",
    name: "Deformatsiyalangan jismning potensial energiyasi",
    nameRu: "Потенциальная энергия деформированного тела",
    formula: "Ep = k·x² / 2",
    latex: "E_p = \\dfrac{kx^2}{2}",
    variables: [
      { symbol: "Ep", name: "Potensial energiya", unit: "J", description: "Prujina energiyasi" },
      { symbol: "k", name: "Qattiqlik", unit: "N/m", description: "Prujina qattiqlik koeffitsienti" },
      { symbol: "x", name: "Deformatsiya", unit: "m", description: "Cho'zilish yoki siqilish" }
    ],
    calculator: {
      solveFor: "Ep",
      inputs: ["k", "x"],
      defaultValues: { k: 200, x: 0.1 },
      formulaFn: "(k, x) => (k * x * x) / 2",
      resultUnit: "J",
      resultLabel: "Elastik energiya"
    },
    description: "Cho'zilgan yoki siqilgan prujinaning elastiklik kuchi hisobiga ish bajarish imkoniyati.",
    example: "k=200N/m prujina x=0.1m (10cm) cho'zildi: Ep = 200·0.01 / 2 = 1 J",
    tags: ["energiya", "potensial", "elastik", "prujina", "guk"],
    difficulty: 2, grade: 9, lesson_link: "energiya-2", xp_reward: 10
  },

  // 8. Mexanik energiya saqlanish qonuni
  {
    id: "ish_008",
    category: "ish_energiya",
    subcategory: "energiya",
    name: "Mexanik energiyaning saqlanish qonuni",
    nameRu: "Закон сохранения механической энергии",
    formula: "Ek₁ + Ep₁ = Ek₂ + Ep₂",
    latex: "E_{k1} + E_{p1} = E_{k2} + E_{p2}",
    variables: [
      { symbol: "E₁", name: "Boshlang'ich energiya", unit: "J", description: "1-holatdagi to'liq energiya" },
      { symbol: "E₂", name: "Oxirgi energiya", unit: "J", description: "2-holatdagi to'liq energiya" }
    ],
    calculator: {
      solveFor: "E2",
      inputs: ["E1"],
      defaultValues: { E1: 500 },
      formulaFn: "(E1) => E1",
      resultUnit: "J",
      resultLabel: "Saqlangan energiya"
    },
    description: "Yopiq sistemada (ishqalanish yo'q) kinetik va potensial energiyalar yig'indisi doimiy bo'lib qoladi. Bir-biriga aylanadi.",
    example: "Jism balanddan tushmoqda. Boshida Ep=500J, Ek=0. Tushayotganda Ep=200J bo'lsa, kinetik Ek=300J bo'ladi.",
    tags: ["saqlanish", "energiya", "kinetik", "potensial", "to'liq energiya"],
    difficulty: 2, grade: 9, lesson_link: "energiya-3", xp_reward: 10
  },

  // 9. Ish-energiya teoremasi
  {
    id: "ish_009",
    category: "ish_energiya",
    subcategory: "ish",
    name: "Kinetik energiya teoremasi",
    nameRu: "Теорема о кинетической энергии",
    formula: "A = Ek₂ - Ek₁",
    latex: "A = \\Delta E_k",
    variables: [
      { symbol: "A", name: "Teng ta'sir etuvchi kuch ishi", unit: "J", description: "Bajarilgan to'liq yig'indi ish" },
      { symbol: "Ek₂", name: "Oxirgi kinetik energiya", unit: "J", description: "Harakat so'ngida E_k" },
      { symbol: "Ek₁", name: "Boshlang'ich kinetik energiya", unit: "J", description: "Harakat boshida E_k" }
    ],
    calculator: {
      solveFor: "A",
      inputs: ["Ek2", "Ek1"],
      defaultValues: { Ek2: 1200, Ek1: 500 },
      formulaFn: "(Ek2, Ek1) => Ek2 - Ek1",
      resultUnit: "J",
      resultLabel: "Bajarilgan ish"
    },
    description: "Jismga ta'sir qiluvchi barcha kuchlarning bajargan natijaviy ishi jismning kinetik energiyasi o'zgarishiga teng.",
    example: "Mashina 500J dan 1200J gacha kinetik energiyasini oshirdi. Motor bajargan foydali ish A = 1200 - 500 = 700 J",
    tags: ["teorema", "ish", "kinetik energiya", "o'zgarish"],
    difficulty: 3, grade: 9, lesson_link: "energiya-3", xp_reward: 15
  },

  // 10. Ishqalanish kuchi bajargan ish
  {
    id: "ish_010",
    category: "ish_energiya",
    subcategory: "ish",
    name: "Ishqalanish kuchi ishi",
    nameRu: "Работа силы трения",
    formula: "A_ish = -F_ish·s",
    latex: "A_{tr} = -F_{tr}s",
    variables: [
      { symbol: "A_ish", name: "Ish", unit: "J", description: "Ishqalanish kuchi bajargan manfiy ish" },
      { symbol: "F_ish", name: "Ishqalanish kuchi", unit: "N", description: "Harakatga qarshi kuch" },
      { symbol: "s", name: "Ko'chish", unit: "m", description: "Bosib o'tilgan masofa" }
    ],
    calculator: {
      solveFor: "A_ish",
      inputs: ["F", "s"],
      defaultValues: { F: 30, s: 10 },
      formulaFn: "(F, s) => -F * s",
      resultUnit: "J",
      resultLabel: "Ishqalanish ishi"
    },
    description: "Ishqalanish kuchi doim harakatga qarshi bo'lgani uchun, u bajargan ish manfiy bo'ladi. U mexanik energiyani issiqlikka aylantiradi.",
    example: "F_ish=30N, s=10m: A_ish = -30·10 = -300 J",
    tags: ["ishqalanish", "manfiy ish", "issiklik", "energiya"],
    difficulty: 2, grade: 9, lesson_link: "ish-2", xp_reward: 10
  },

  // 11. FIK ta'rifi
  {
    id: "ish_011",
    category: "ish_energiya",
    subcategory: "fik",
    name: "Foydali ish koeffitsienti (FIK)",
    nameRu: "КПД (Коэффициент полезного действия)",
    formula: "η = (A_foydali / A_to'la) × 100%",
    latex: "\\eta = \\frac{A_{foy}}{A_{tol}} \\cdot 100\\%",
    variables: [
      { symbol: "η", name: "FIK", unit: "%", description: "Samaradorlik" },
      { symbol: "A_foy", name: "Foydali ish", unit: "J", description: "Qilingan maqsadli ish" },
      { symbol: "A_tol", name: "To'la ish", unit: "J", description: "Sarf qilingan to'liq ish (yoki energiya)" }
    ],
    calculator: {
      solveFor: "eta",
      inputs: ["Afoy", "Atol"],
      defaultValues: { Afoy: 800, Atol: 1000 },
      formulaFn: "(Afoy, Atol) => (Afoy / Atol) * 100",
      resultUnit: "%",
      resultLabel: "FIK"
    },
    description: "FIK — sarflangan energiyaning qancha qismi foydali ishga ketganini ko'rsatadi. Har doim 100% dan kichik.",
    example: "Sarf: 1000J energiya (A_tol), ko'tarish ishi A_foy=800J. η = 800/1000 = 80%",
    tags: ["fik", "samaradorlik", "ish", "eta", "quvvat"],
    difficulty: 1, grade: 9, lesson_link: "fik-1", xp_reward: 5
  },

  // 12. FIK qiyalik
  {
    id: "ish_012",
    category: "ish_energiya",
    subcategory: "fik",
    name: "Qiyalik tekislikning FIK",
    nameRu: "КПД наклонной плоскости",
    formula: "η = (m·g·h) / (F·l) = 1 / (1 + μ·ctgα)",
    latex: "\\eta = \\frac{mgh}{Fl}",
    variables: [
      { symbol: "η", name: "FIK", unit: "%", description: "Qiyalik orqali ko'tarish samaradorligi" },
      { symbol: "m", name: "Massa", unit: "kg", description: "Jism massasi" },
      { symbol: "h", name: "Balandlik", unit: "m", description: "Ko'tarilgan vertikal balandlik" },
      { symbol: "F", name: "Tortish kuchi", unit: "N", description: "Sarf qilingan kuch" },
      { symbol: "l", name: "Qiyalik uzunligi", unit: "m", description: "Bosib o'tilgan yo'l" }
    ],
    calculator: {
      solveFor: "eta",
      inputs: ["m", "h", "F", "l"],
      defaultValues: { m: 10, h: 2, F: 60, l: 4 },
      formulaFn: "(m, h, F, l) => ((m * 9.8 * h) / (F * l)) * 100",
      resultUnit: "%",
      resultLabel: "FIK"
    },
    description: "Qiyalik tekislik orqali yukni ko'tarishda foydali ish (mgh), sarflangan ish esa tortish kuchining bajargan ishi (F·l).",
    example: "m=10kg (98N) yuk h=2m ga l=4m qiyalik orqali F=60N bilan tortildi: η = (98·2)/(60·4) = 196/240 ≈ 81.6%",
    tags: ["fik", "qiyalik", "mexanizm", "ishqalanish"],
    difficulty: 3, grade: 9, lesson_link: "fik-2", xp_reward: 15
  },

  // 13. FIK blok
  {
    id: "ish_013",
    category: "ish_energiya",
    subcategory: "fik",
    name: "Blok tizimining FIK",
    nameRu: "КПД системы блоков",
    formula: "η = (G·h) / (F·s) × 100%",
    latex: "\\eta = \\dfrac{Gh}{Fs} \\cdot 100\\%",
    variables: [
      { symbol: "η", name: "FIK", unit: "%", description: "Blok tizimi samaradorligi" },
      { symbol: "G", name: "Yuk og'irligi", unit: "N", description: "Ko'tarilayotgan yuk (mg)" },
      { symbol: "h", name: "Yuk ko'tarilishi", unit: "m", description: "Yukning balandlikka ko'tarilishi" },
      { symbol: "F", name: "Tortish kuchi", unit: "N", description: "Arqonni tortuvchi kuch" },
      { symbol: "s", name: "Arqon tortilishi", unit: "m", description: "Tortilgan arqon uzunligi (masalan, siljuvchi blokda s = 2h)" }
    ],
    calculator: {
      solveFor: "eta",
      inputs: ["G", "h", "F", "s"],
      defaultValues: { G: 1000, h: 1, F: 550, s: 2 },
      formulaFn: "(G, h, F, s) => ((G * h) / (F * s)) * 100",
      resultUnit: "%",
      resultLabel: "FIK"
    },
    description: "Oddiy mexanizmlar (masalan, siljuvchi blok) yordamida kuchdan yutib, yo'ldan yutqazamiz (Oltin qoida). FIK ishqalanish hisobiga 100% dan kam.",
    example: "1000N yuk h=1m ko'tarildi (Foydali 1000J). Arqon s=2m ga, F=550N kuch tortildi (Sarf 1100J). η = 1000/1100 ≈ 90.9%",
    tags: ["fik", "blok", "oltin qoida", "kuch"],
    difficulty: 2, grade: 9, lesson_link: "fik-2", xp_reward: 10
  },

  // 14. O'zgarish qonuni
  {
    id: "ish_014",
    category: "ish_energiya",
    subcategory: "energiya",
    name: "Energiyaning aylanish qonuni (ishqalanish bilan)",
    nameRu: "Изменение механической энергии с трением",
    formula: "E₂ - E₁ = A_ishqalanish",
    latex: "E_2 - E_1 = A_{tr}",
    variables: [
      { symbol: "E₂", name: "Oxirgi mexanik energiya", unit: "J", description: "Harakat so'ngida to'liq energiya" },
      { symbol: "E₁", name: "Boshlang'ich mexanik energiya", unit: "J", description: "Harakat boshida energiya" },
      { symbol: "A_ish", name: "Ishqalanish ishi", unit: "J", description: "Odatda manfiy" }
    ],
    calculator: {
      solveFor: "A_ish",
      inputs: ["E2", "E1"],
      defaultValues: { E2: 800, E1: 1000 },
      formulaFn: "(E2, E1) => E2 - E1",
      resultUnit: "J",
      resultLabel: "Yo'qolgan ish (issiklikka)"
    },
    description: "Agar sistemada ishqalanish yoki qarshilik kuchlari mavjud bo'lsa, mexanik energiya saqlanmaydi — bir qismi issiqlikka aylanadi.",
    example: "E₁=1000J edi, pastga tushgach E₂=800J bo'ldi. Demak, 200J havo qarshiligiga (A=-200J) sarflandi.",
    tags: ["energiya", "saqlanmaslik", "ishqalanish", "issiqlik"],
    difficulty: 3, grade: 9, lesson_link: "energiya-3", xp_reward: 15
  },

  // 15. Og'irlik ishi
  {
    id: "ish_015",
    category: "ish_energiya",
    subcategory: "ish",
    name: "Og'irlik kuchining bajargan ishi",
    nameRu: "Работа силы тяжести",
    formula: "A = m·g·(h₁ - h₂) = -(Ep₂ - Ep₁)",
    latex: "A = mg(h_1 - h_2)",
    variables: [
      { symbol: "A", name: "Og'irlik ishi", unit: "J", description: "Jism pastga tushganda bajaradi" },
      { symbol: "m", name: "Massa", unit: "kg", description: "Jism massasi" },
      { symbol: "h₁", name: "Boshlang'ich balandlik", unit: "m", description: "Harakat boshlangan joy" },
      { symbol: "h₂", name: "Oxirgi balandlik", unit: "m", description: "Harakat tugagan joy" }
    ],
    calculator: {
      solveFor: "A",
      inputs: ["m", "h1", "h2"],
      defaultValues: { m: 5, h1: 10, h2: 2 },
      formulaFn: "(m, h1, h2) => m * 9.8 * (h1 - h2)",
      resultUnit: "J",
      resultLabel: "Bajargan ish"
    },
    description: "Og'irlik kuchining bajargan ishi faqat boshlang'ich va oxirgi balandliklarga bog'liq. U potensial energiya o'zgarishining manfiysiga teng.",
    example: "5kg tosh 10m balandlikdan 2m ga tushdi. A = 5·9.8·(10-2) = 49·8 = 392 J ish",
    tags: ["og'irlik", "ish", "potensial energiya", "balandlik", "massa"],
    difficulty: 2, grade: 9, lesson_link: "ish-2", xp_reward: 10
  },

  // 16. To'liq mexanik energiya
  {
    id: "ish_016",
    category: "ish_energiya",
    subcategory: "energiya",
    name: "To'liq mexanik energiya",
    nameRu: "Полная механическая энергия",
    formula: "E = Ek + Ep",
    latex: "E = E_k + E_p",
    variables: [
      { symbol: "E", name: "To'liq energiya", unit: "J", description: "Sistemaning umiumiy ishlash imkoniyati" },
      { symbol: "Ek", name: "Kinetik energiya", unit: "J", description: "Harakat tufayli" },
      { symbol: "Ep", name: "Potensial energiya", unit: "J", description: "O'zaro ta'sir tufayli" }
    ],
    calculator: {
      solveFor: "E",
      inputs: ["Ek", "Ep"],
      defaultValues: { Ek: 120, Ep: 300 },
      formulaFn: "(Ek, Ep) => Ek + Ep",
      resultUnit: "J",
      resultLabel: "To'liq energiya"
    },
    description: "Jismning to'liq mexanik energiyasi uning shu oniy vaqtdagi kinetik va potensial energiyalari yig'indisi deb ataladi.",
    example: "Havodagi samolyot tezligi sababli 120MJ kinetik, balandligi sababli 300MJ potensial energiyaga ega. Umumiy E=420MJ.",
    tags: ["to'liq energiya", "kinetik", "potensial", "mexanika"],
    difficulty: 1, grade: 9, lesson_link: "energiya-2", xp_reward: 5
  },

  // ════════════════════════════════════════════════════════
  //  IMPULS VA STATIKA  (imp_001 → imp_012)
  // ════════════════════════════════════════════════════════

  // 1. Jism impulsi
  {
    id: "imp_001",
    category: "impuls_statika",
    subcategory: "impuls",
    name: "Jism impulsi",
    nameRu: "Импульс тела",
    formula: "p = m·v",
    latex: "p = mv",
    variables: [
      { symbol: "p", name: "Impuls", unit: "kg·m/s", description: "Jismning harakat miqdori" },
      { symbol: "m", name: "Massa", unit: "kg", description: "Jism massasi" },
      { symbol: "v", name: "Tezlik", unit: "m/s", description: "Jism tezligi" }
    ],
    calculator: {
      solveFor: "p",
      inputs: ["m", "v"],
      defaultValues: { m: 10, v: 5 },
      formulaFn: "(m, v) => m * v",
      resultUnit: "kg·m/s",
      resultLabel: "Impuls"
    },
    description: "Jism impulsi uning massasi va tezligi ko'paytmasiga teng vektor kattalikdir. Yo'nalishi tezlik yo'nalishi bilan bir xil.",
    example: "10 kg massali tosh 5 m/s tezlikda uchmoqda. Impulsi p = 10 · 5 = 50 kg·m/s",
    tags: ["impuls", "harakat miqdori", "massa", "tezlik"],
    difficulty: 1, grade: 9, lesson_link: "impuls-1", xp_reward: 5
  },

  // 2. Kuch impulsi
  {
    id: "imp_002",
    category: "impuls_statika",
    subcategory: "impuls",
    name: "Kuch impulsi",
    nameRu: "Импульс силы",
    formula: "F·t = Δp",
    latex: "F\\Delta t = \\Delta p",
    variables: [
      { symbol: "F", name: "Kuch", unit: "N", description: "Ta'sir etuvchi o'rtacha kuch" },
      { symbol: "t", name: "Vaqt", unit: "s", description: "Ta'sir etish vaqti" },
      { symbol: "Δp", name: "Impuls o'zgarishi", unit: "kg·m/s", description: "Jism impulsining o'zgarishi" }
    ],
    calculator: {
      solveFor: "dp",
      inputs: ["F", "t"],
      defaultValues: { F: 100, t: 0.5 },
      formulaFn: "(F, t) => F * t",
      resultUnit: "kg·m/s",
      resultLabel: "Impuls o'zgarishi"
    },
    description: "Kuchning ta'sir vaqtiga ko'paytmasi kuch impulsi deyiladi. U jismning impuls o'zgarishiga teng (Nyutonning ikkinchi qonuni boshqa ko'rinishi).",
    example: "100 N kuch 0.5 s davomida ta'sir qildi. Impuls o'zgarishi Δp = 100 · 0.5 = 50 kg·m/s",
    tags: ["kuch", "impuls", "o'zgarish", "vaqt", "nyuton"],
    difficulty: 2, grade: 9, lesson_link: "impuls-2", xp_reward: 10
  },

  // 3. Impuls saqlanish qonuni
  {
    id: "imp_003",
    category: "impuls_statika",
    subcategory: "toqnashuv",
    name: "Impulsning saqlanish qonuni",
    nameRu: "Закон сохранения импульса",
    formula: "m₁·v₁ + m₂·v₂ = m₁·v₁' + m₂·v₂'",
    latex: "m_1 v_1 + m_2 v_2 = m_1 v'_1 + m_2 v'_2",
    variables: [
      { symbol: "p", name: "Boshlang'ich impuls", unit: "kg·m/s", description: "Sistemaning to'qnashuvgacha to'liq impulsi" },
      { symbol: "p'", name: "Oxirgi impuls", unit: "kg·m/s", description: "Sistemaning to'qnashuvdan keyingi to'liq impulsi" }
    ],
    calculator: {
      solveFor: "p_after",
      inputs: ["p_before"],
      defaultValues: { p_before: 200 },
      formulaFn: "(p) => p",
      resultUnit: "kg·m/s",
      resultLabel: "Oxirgi impuls"
    },
    description: "Yopiq sistemada barcha jismlar impulslarining geometrik (vektor) yig'indisi har qanday o'zaro ta'sirlarda o'zgarmas qoladi.",
    example: "Ikki jism to'qnashmoqda, to'qnashuvgacha umumiy impuls 200 bo'lsa, to'qnashgandan so'ng ham umumiy impuls 200 ga teng bo'ladi.",
    tags: ["impuls", "saqlanish", "to'qnashuv", "sistema"],
    difficulty: 2, grade: 9, lesson_link: "toqnashuv-1", xp_reward: 10
  },

  // 4. To'liq elastik to'qnashuv
  {
    id: "imp_004",
    category: "impuls_statika",
    subcategory: "toqnashuv",
    name: "Markaziy to'liq elastik to'qnashuv",
    nameRu: "Абсолютно упругий удар",
    formula: "v₁' = (m₁-m₂)·v₁ / (m₁+m₂)",
    latex: "v_1' = \\frac{m_1 - m_2}{m_1 + m_2} v_1",
    variables: [
      { symbol: "v₁'", name: "Yangi tezlik", unit: "m/s", description: "1-jismning to'qnashuvdan keyingi tezligi (2-jism tinch turganda)" },
      { symbol: "m₁", name: "1-massa", unit: "kg", description: "Harakatlanuvchi jism massasi" },
      { symbol: "m₂", name: "2-massa", unit: "kg", description: "Tinch turgan jism massasi" },
      { symbol: "v₁", name: "Boshlang'ich tezlik", unit: "m/s", description: "1-jismning boshlang'ich tezligi" }
    ],
    calculator: {
      solveFor: "v1_prime",
      inputs: ["m1", "m2", "v1"],
      defaultValues: { m1: 2, m2: 3, v1: 10 },
      formulaFn: "(m1, m2, v1) => ((m1 - m2) / (m1 + m2)) * v1",
      resultUnit: "m/s",
      resultLabel: "1-jismning oxirgi tezligi"
    },
    description: "To'liq elastik to'qnashuvda hamma impuls va hamma kinetik energiya saqlanadi. Agar 2-jism boshida tinch tursa yuqoridagi formula o'rinli.",
    example: "2 kg shar 10 m/s tezlik bilan tinch turgan 3 kg sharga urildi: v₁' = (2-3)/(2+3) · 10 = -2 m/s (orqaga qaytadi).",
    tags: ["elastik", "to'qnashuv", "impuls", "energiya saqlanishi"],
    difficulty: 3, grade: 9, lesson_link: "toqnashuv-2", xp_reward: 15
  },

  // 5. To'liq noelastik to'qnashuv
  {
    id: "imp_005",
    category: "impuls_statika",
    subcategory: "toqnashuv",
    name: "To'liq noelastik to'qnashuv",
    nameRu: "Неупругий удар",
    formula: "v' = (m₁·v₁ + m₂·v₂) / (m₁+m₂)",
    latex: "v' = \\frac{m_1 v_1 + m_2 v_2}{m_1 + m_2}",
    variables: [
      { symbol: "v'", name: "Umumiy tezlik", unit: "m/s", description: "Jismlar yopishib olgandan keyingi tezlik" },
      { symbol: "m₁", name: "1-massa", unit: "kg", description: "Birinchi jism massasi" },
      { symbol: "v₁", name: "1-tezlik", unit: "m/s", description: "Birinchi jism tezligi" },
      { symbol: "m₂", name: "2-massa", unit: "kg", description: "Ikkinchi jism massasi" },
      { symbol: "v₂", name: "2-tezlik", unit: "m/s", description: "Ikkinchi jism tezligi (qarama-qarshi bo'lsa manfiy)" }
    ],
    calculator: {
      solveFor: "v_prime",
      inputs: ["m1", "v1", "m2", "v2"],
      defaultValues: { m1: 5, v1: 4, m2: 3, v2: 0 },
      formulaFn: "(m1, v1, m2, v2) => (m1 * v1 + m2 * v2) / (m1 + m2)",
      resultUnit: "m/s",
      resultLabel: "Umumiy tezlik"
    },
    description: "To'qnashgandan keyin jismlar birlashib ketadi (masalan plastilin). Mexanik energiya to'liq saqlanmaydi (issiqlikka aylanadi).",
    example: "5 kg tosh 4 m/s tezlikda tinch turgan 3 kg aravachaga tushdi: v' = (5·4 + 0) / 8 = 2.5 m/s",
    tags: ["noelastik", "to'qnashuv", "yopishish", "impuls"],
    difficulty: 2, grade: 9, lesson_link: "toqnashuv-2", xp_reward: 10
  },

  // 6. Raketa harakati
  {
    id: "imp_006",
    category: "impuls_statika",
    subcategory: "impuls",
    name: "Konsantin Tsiolkovskiy raketasi formulasi",
    nameRu: "Формула Циолковского для ракеты",
    formula: "v = u·ln(m₀/m)",
    latex: "v = u \\ln\\left(\\frac{m_0}{m}\\right)",
    variables: [
      { symbol: "v", name: "Raketa tezligi", unit: "m/s", description: "Oxirgi tezlik" },
      { symbol: "u", name: "Gaz tezligi", unit: "m/s", description: "Raketaga nisbatan gazning oqib chiqish tezligi" },
      { symbol: "m₀", name: "Boshlang'ich massa", unit: "kg", description: "Raketaning yoqilg'i bilan massasi" },
      { symbol: "m", name: "Oxirgi massa", unit: "kg", description: "Yoqilg'i yongandan keyingi massa" }
    ],
    calculator: {
      solveFor: "v",
      inputs: ["u", "m0", "m"],
      defaultValues: { u: 3000, m0: 100, m: 20 },
      formulaFn: "(u, m0, m) => u * Math.log(m0 / m)",
      resultUnit: "m/s",
      resultLabel: "Raketa tezligi"
    },
    description: "Raketaning oxirgi tezligi gazning siqilish tezligiga va raketaning boshlang'ich/oxirgi massalari nisbati natural logarifmiga bog'liq.",
    example: "Gaz 3000 m/s da otilmoqda, massa 5 marta kamaydi (m₀/m = 5): v = 3000 · ln(5) ≈ 3000 · 1.61 = 4828 m/s",
    tags: ["raketa", "reaktiv", "tsiolkovskiy", "impuls"],
    difficulty: 3, grade: 9, lesson_link: "impuls-3", xp_reward: 15
  },

  // 7. Reaktiv harakat printsipi
  {
    id: "imp_007",
    category: "impuls_statika",
    subcategory: "impuls",
    name: "Reaktiv harakat (qisqa onli)",
    nameRu: "Реактивное движение",
    formula: "v_rak = (m_gaz · v_gaz) / m_rak",
    latex: "m_r v_r = m_g v_g",
    variables: [
      { symbol: "v_rak", name: "Raketa tezligi", unit: "m/s", description: "Olingan tezlik" },
      { symbol: "m_gaz", name: "Gaz massasi", unit: "kg", description: "Ajralib chiqqan gaz yoxud parcha massasi" },
      { symbol: "v_gaz", name: "Gaz tezligi", unit: "m/s", description: "Otilib chiqish tezligi" },
      { symbol: "m_rak", name: "Raketa massasi", unit: "kg", description: "Qolgan jism massasi" }
    ],
    calculator: {
      solveFor: "v_rak",
      inputs: ["m_gaz", "v_gaz", "m_rak"],
      defaultValues: { m_gaz: 10, v_gaz: 500, m_rak: 100 },
      formulaFn: "(mg, vg, mr) => (mg * vg) / mr",
      resultUnit: "m/s",
      resultLabel: "Raketa tezligi"
    },
    description: "Jismdan uning bir qismi ma'lum tezlikda ajralib chiqishi hisobiga yuzaga keladigan harakat reaktiv harakat deyiladi (impuls saqlanishiga asoslangan).",
    example: "100 kg raketadan 10 kg gaz 500 m/s tezlikda orqaga otildi. Raketa tezligi v_rak = (10·500)/100 = 50 m/s bo'ladi.",
    tags: ["reaktiv", "impuls", "gaz", "tezlik"],
    difficulty: 2, grade: 9, lesson_link: "impuls-3", xp_reward: 10
  },

  // 8. Muvozanat sharti (kuchlar)
  {
    id: "imp_008",
    category: "impuls_statika",
    subcategory: "muvozanat",
    name: "Muvozanatning 1-sharti",
    nameRu: "Первое условие равновесия",
    formula: "ΣF = 0",
    latex: "\\sum \\vec{F} = 0",
    variables: [
      { symbol: "ΣF", name: "Natijaviy kuch", unit: "N", description: "Barcha kuchlarning vektor yig'indisi" }
    ],
    calculator: {
      solveFor: "F_net",
      inputs: ["F_up", "F_down"],
      defaultValues: { F_up: 50, F_down: 50 },
      formulaFn: "(f1, f2) => Math.abs(f1 - f2)",
      resultUnit: "N",
      resultLabel: "Farq (Nol bo'lishi kerak)"
    },
    description: "Jism (yoki moddiy nuqta) harakatsiz turishi yoki tekis to'g'ri chiziqli harakatlanishi uchun unga ta'sir etuvchi barcha kuchlar tenglashgan bo'lishi kerak.",
    example: "Yuqoriga 50N tayanch reaktsiyasi va pastga 50N og'irlik kuchi ta'sir etmoqda, yig'indi nol, jism tinch.",
    tags: ["statika", "kuch", "muvozanat", "tinchlik"],
    difficulty: 1, grade: 9, lesson_link: "statika-1", xp_reward: 5
  },

  // 9. Muvozanat sharti (momentlar)
  {
    id: "imp_009",
    category: "impuls_statika",
    subcategory: "muvozanat",
    name: "Momentlar qoidasi (2-shart)",
    nameRu: "Правило моментов",
    formula: "ΣM = 0",
    latex: "\\sum M = 0 \\quad (M_1 = M_2)",
    variables: [
      { symbol: "M", name: "Kuch momenti", unit: "N·m", description: "Aylantiruvchi ta'sir" }
    ],
    calculator: {
      solveFor: "equilibrium",
      inputs: ["M_cw", "M_ccw"],
      defaultValues: { M_cw: 100, M_ccw: 100 },
      formulaFn: "(m1, m2) => Math.abs(m1 - m2)",
      resultUnit: "N·m",
      resultLabel: "Momentlar farqi (0 bo'lsa muvozanat)"
    },
    description: "Qo'zg'almas o'q atrofida aylana oladigan jism muvozanatda bo'lishi uchun soat mili yo'nalishidagi momentlar yig'indisi qarshi yönalishdagi yig'indiga teng bo'lishi kerak.",
    example: "O'ng tomonda M=100 N·m va chap tomonda M=100 N·m — aylanish bo'lmaydi.",
    tags: ["moment", "muvozanat", "aylanish", "statika"],
    difficulty: 1, grade: 9, lesson_link: "statika-2", xp_reward: 5
  },

  // 10. Kuch momenti
  {
    id: "imp_010",
    category: "impuls_statika",
    subcategory: "statika",
    name: "Kuch momenti",
    nameRu: "Момент силы",
    formula: "M = F·d",
    latex: "M = Fd",
    variables: [
      { symbol: "M", name: "Moment", unit: "N·m", description: "Kuchning aylantiruvchi ta'siri" },
      { symbol: "F", name: "Kuch", unit: "N", description: "Ta'sir etuvchi kuch" },
      { symbol: "d", name: "Kuch yelkasi", unit: "m", description: "Aylanish o'qidan kuch chizig'igacha bo'lgan eng qisqa masofa (perpendikulyar)" }
    ],
    calculator: {
      solveFor: "M",
      inputs: ["F", "d"],
      defaultValues: { F: 20, d: 0.5 },
      formulaFn: "(F, d) => F * d",
      resultUnit: "N·m",
      resultLabel: "Kuch momenti"
    },
    description: "Kuchning aylana o'q atrofida jismni aylantirish qobiliyatini ifodalaydigan kattalik.",
    example: "Eshik tutqichidan tortamiz (F=20N), menteşagacha d=0.5m masofa bor. Moment: M = 20 · 0.5 = 10 N·m",
    tags: ["kuch", "moment", "yelka", "aylanish"],
    difficulty: 1, grade: 9, lesson_link: "statika-2", xp_reward: 5
  },

  // 11. Richag qonuni
  {
    id: "imp_011",
    category: "impuls_statika",
    subcategory: "statika",
    name: "Richag muvozanati qonuni",
    nameRu: "Правило рычага",
    formula: "F₁·l₁ = F₂·l₂",
    latex: "\\frac{F_1}{F_2} = \\frac{l_2}{l_1}",
    variables: [
      { symbol: "F₁", name: "1-kuch", unit: "N", description: "Chap tomondagi kuch" },
      { symbol: "l₁", name: "1-yelka", unit: "m", description: "1-kuchning yelkasi" },
      { symbol: "F₂", name: "2-kuch", unit: "N", description: "O'ng tomondagi kuch" },
      { symbol: "l₂", name: "2-yelka", unit: "m", description: "2-kuchning yelkasi" }
    ],
    calculator: {
      solveFor: "F2",
      inputs: ["F1", "l1", "l2"],
      defaultValues: { F1: 100, l1: 2, l2: 0.5 },
      formulaFn: "(F1, l1, l2) => (F1 * l1) / l2",
      resultUnit: "N",
      resultLabel: "2-kuch"
    },
    description: "Richag muvozanatda bo'lishi uchun unga ta'sir etayotgan kuchlar ularning yelkalariga teskari proporsional bo'lishi kerak.",
    example: "F₁=100 N katta tosh (l₁=2m). Biz l₂=0.5m tarafdan bosyapmiz. F₂ = (100·2)/0.5 = 400 N kuch kerak (yoki aksincha - yelkadan yutish).",
    tags: ["richag", "muvozanat", "oltin qoida", "kuch", "yelka"],
    difficulty: 2, grade: 9, lesson_link: "statika-3", xp_reward: 10
  },

  // 12. Og'irlik markazi koordinatalari
  {
    id: "imp_012",
    category: "impuls_statika",
    subcategory: "statika",
    name: "Og'irlik (Massa) markazi",
    nameRu: "Центр тяжести / Центр масс",
    formula: "x_c = (m₁·x₁ + m₂·x₂) / (m₁ + m₂)",
    latex: "x_c = \\frac{\\sum m_i x_i}{\\sum m_i}",
    variables: [
      { symbol: "x_c", name: "Markaz koordinatasi", unit: "m", description: "Og'irlik markazining x o'qidagi o'rni" },
      { symbol: "m₁", name: "1-massa", unit: "kg", description: "Birinchi jism massasi" },
      { symbol: "x₁", name: "1-koordinata", unit: "m", description: "Birinchi jism o'rni" },
      { symbol: "m₂", name: "2-massa", unit: "kg", description: "Ikkinchi jism massasi" },
      { symbol: "x₂", name: "2-koordinata", unit: "m", description: "Ikkinchi jism o'rni" }
    ],
    calculator: {
      solveFor: "xc",
      inputs: ["m1", "x1", "m2", "x2"],
      defaultValues: { m1: 2, x1: 0, m2: 8, x2: 10 },
      formulaFn: "(m1, x1, m2, x2) => (m1 * x1 + m2 * x2) / (m1 + m2)",
      resultUnit: "m",
      resultLabel: "Og'irlik markazi joyi"
    },
    description: "Sistemaning og'irlik markazi barcha massalar yig'indisining xuddi bitta nuqtada to'plangan deb hisoblanadigan koordinatasidir.",
    example: "x=0 da 2kg m₁ turibdi, x=10 da 8kg m₂ turibdi. Markaz: x_c = (2·0 + 8·10) / (2+8) = 80/10 = 8 m da bo'ladi.",
    tags: ["markaz", "massa", "og'irlik", "statika", "koordinata"],
    difficulty: 3, grade: 9, lesson_link: "statika-4", xp_reward: 15
  },

  // ════════════════════════════════════════════════════════
  //  TEBRANISHLAR VA TO'LQINLAR (teb_001 → teb_015)
  // ════════════════════════════════════════════════════════

  // 1. Garmonik tebranish tenglamasi
  {
    id: "teb_001",
    category: "tebranish_tolqin",
    subcategory: "garmonik_tebranish",
    name: "Garmonik tebranish tenglamasi",
    nameRu: "Уравнение гармонических колебаний",
    formula: "x = A·cos(ωt + φ₀)",
    latex: "x = A \\cos(\\omega t + \\phi_0)",
    variables: [
      { symbol: "x", name: "Siljish", unit: "m", description: "Vaqt momentidagi koordinata" },
      { symbol: "A", name: "Amplituda", unit: "m", description: "Eng katta siljish" },
      { symbol: "ω", name: "Siklik chastota", unit: "rad/s", description: "Burchak chastotasi" },
      { symbol: "t", name: "Vaqt", unit: "s", description: "Boshlang'ichdan o'tgan vaqt" },
      { symbol: "φ₀", name: "Boshlang'ich faza", unit: "rad", description: "t=0 dagi faza" }
    ],
    calculator: {
      solveFor: "x",
      inputs: ["A", "omega", "t", "phi0"],
      defaultValues: { A: 2, omega: 3.14, t: 1, phi0: 0 },
      formulaFn: "(A, w, t, phi) => A * Math.cos(w * t + phi)",
      resultUnit: "m",
      resultLabel: "Siljish x"
    },
    description: "Sinus yoki kosinus qonuni bo'yicha vaqt o'tishi bilan o'zgaruvchi tebranishlar garmonik tebranishlar deyiladi.",
    example: "Amplituda 2 m, ω=3.14, t=1 s, φ₀=0. x = 2·cos(3.14) = 2·(-1) = -2 m.",
    tags: ["tebranish", "garmonik", "amplituda", "faza", "siljish"],
    difficulty: 2, grade: 9, lesson_link: "tebranish-1", xp_reward: 10
  },

  // 2. Tebranish davri
  {
    id: "teb_002",
    category: "tebranish_tolqin",
    subcategory: "garmonik_tebranish",
    name: "Tebranish davri",
    nameRu: "Период колебаний",
    formula: "T = 1 / f",
    latex: "T = \\frac{1}{f}",
    variables: [
      { symbol: "T", name: "Davr", unit: "s", description: "Bitta to'la tebranish uchun ketgan vaqt" },
      { symbol: "f", name: "Chastota", unit: "Hz", description: "Birlik vaqt ichidagi tebranishlar soni" }
    ],
    calculator: {
      solveFor: "T",
      inputs: ["f"],
      defaultValues: { f: 50 },
      formulaFn: "(f) => 1 / f",
      resultUnit: "s",
      resultLabel: "Tebranish davri"
    },
    description: "Tebranish davri — bitta to'la tebranishni amalga oshirish uchun ketgan vaqtdir. U chastotaga teskari kattalik.",
    example: "Sanoat toki chastotasi f=50 Hz. Uning tebranish davri T = 1/50 = 0.02 s.",
    tags: ["davr", "chastota", "tebranish"],
    difficulty: 1, grade: 9, lesson_link: "tebranish-1", xp_reward: 5
  },

  // 3. Siklik chastota
  {
    id: "teb_003",
    category: "tebranish_tolqin",
    subcategory: "garmonik_tebranish",
    name: "Siklik chastota",
    nameRu: "Циклическая частота",
    formula: "ω = 2π / T = 2π·f",
    latex: "\\omega = \\frac{2\\pi}{T} = 2\\pi f",
    variables: [
      { symbol: "ω", name: "Siklik chastota", unit: "rad/s", description: "2π sekund ichidagi tebranishlar soni" },
      { symbol: "T", name: "Davr", unit: "s", description: "Bitta to'la tebranish vaqti" },
      { symbol: "f", name: "Chastota", unit: "Hz", description: "Oddiy chastota" }
    ],
    calculator: {
      solveFor: "omega",
      inputs: ["f"],
      defaultValues: { f: 5 },
      formulaFn: "(f) => 2 * Math.PI * f",
      resultUnit: "rad/s",
      resultLabel: "Siklik chastota"
    },
    description: "Siklik (burchak) chastota 2π (bitta to'la aylana yoki sikl) vaqt ichida nechta tebranish bajarilganini bildiradi.",
    example: "Chastota 5 Hz. Siklik chastota ω = 2·3.1415·5 ≈ 31.4 rad/s.",
    tags: ["siklik", "chastota", "omega", "davr"],
    difficulty: 1, grade: 9, lesson_link: "tebranish-1", xp_reward: 5
  },

  // 4. Matematik mayatnik davri
  {
    id: "teb_004",
    category: "tebranish_tolqin",
    subcategory: "mayatnik",
    name: "Matematik mayatnik davri",
    nameRu: "Период математического маятника",
    formula: "T = 2π·√(l/g)",
    latex: "T = 2\\pi \\sqrt{\\frac{l}{g}}",
    variables: [
      { symbol: "T", name: "Davr", unit: "s", description: "Tebranish davri" },
      { symbol: "l", name: "Uzunlik", unit: "m", description: "Mayatnik ipining uzunligi" },
      { symbol: "g", name: "Erkin tushish tezlanishi", unit: "m/s²", description: "Gravitatsiya tezlanishi (~9.8 m/s²)" }
    ],
    calculator: {
      solveFor: "T",
      inputs: ["l", "g"],
      defaultValues: { l: 1, g: 9.8 },
      formulaFn: "(l, g) => 2 * Math.PI * Math.sqrt(l / g)",
      resultUnit: "s",
      resultLabel: "Mayatnik davri"
    },
    description: "Matematik mayatnikning davri faqat ipning uzunligi va gravitatsiyaga bog'liq. Jism massasiga va amplitudaga (kichik burchaklarda) bog'liq emas.",
    example: "Uzunligi 1 m bo'lgan ipsimon mayatnik davri T = 2π·√(1/9.8) ≈ 2.0 s (sekund mayatnik).",
    tags: ["matematik mayatnik", "davr", "uzunlik", "gravitatsiya"],
    difficulty: 2, grade: 9, lesson_link: "mayatnik-1", xp_reward: 10
  },

  // 5. Prujinali mayatnik davri
  {
    id: "teb_005",
    category: "tebranish_tolqin",
    subcategory: "mayatnik",
    name: "Prujinali mayatnik davri",
    nameRu: "Период пружинного маятника",
    formula: "T = 2π·√(m/k)",
    latex: "T = 2\\pi \\sqrt{\\frac{m}{k}}",
    variables: [
      { symbol: "T", name: "Davr", unit: "s", description: "Prujinali tizim tebranish davri" },
      { symbol: "m", name: "Massa", unit: "kg", description: "Prujinaga osilgan jism massasi" },
      { symbol: "k", name: "Bikrlik", unit: "N/m", description: "Prujina bikrligi kosnefiyenti" }
    ],
    calculator: {
      solveFor: "T",
      inputs: ["m", "k"],
      defaultValues: { m: 2, k: 50 },
      formulaFn: "(m, k) => 2 * Math.PI * Math.sqrt(m / k)",
      resultUnit: "s",
      resultLabel: "Tebranish davri"
    },
    description: "Prujinali mayatnikning davri yukning massasiga to'g'ri va prujinaning bikrligiga teskari proporsional ildizga bog'liq.",
    example: "2 kg massa 50 N/m bikrlikka ega prujinada: T = 2π·√(2/50) = 2π·0.2 ≈ 1.25 s.",
    tags: ["prujinali", "mayatnik", "davr", "massa", "bikrlik"],
    difficulty: 2, grade: 9, lesson_link: "mayatnik-2", xp_reward: 10
  },

  // 6. Tebranishda max tezlik
  {
    id: "teb_006",
    category: "tebranish_tolqin",
    subcategory: "garmonik_tebranish",
    name: "Maksimal tezlik (tebranishda)",
    nameRu: "Максимальная скорость колебаний",
    formula: "v_max = A·ω",
    latex: "v_{max} = A \\omega",
    variables: [
      { symbol: "v_max", name: "Max tezlik", unit: "m/s", description: "Jismning tebranish markazidan o'tishdagi maksimal tezligi" },
      { symbol: "A", name: "Amplituda", unit: "m", description: "Maksimal siljish" },
      { symbol: "ω", name: "Siklik chastota", unit: "rad/s", description: "Burchak chastotasi" }
    ],
    calculator: {
      solveFor: "vmax",
      inputs: ["A", "omega"],
      defaultValues: { A: 0.5, omega: 6.28 },
      formulaFn: "(a, w) => a * w",
      resultUnit: "m/s",
      resultLabel: "Maksimal tezlik"
    },
    description: "Jism tebranishning muvozanat vaziyatidan o'tayotgan paytda eng katta tezlikka ega bo'ladi.",
    example: "Amplituda 0.5 m, siklik chastota 6.28 rad/s. v_max = 0.5 · 6.28 = 3.14 m/s.",
    tags: ["tezlik", "max", "amplituda", "tebranish"],
    difficulty: 2, grade: 9, lesson_link: "tebranish-2", xp_reward: 10
  },

  // 7. Tebranishda max tezlanish
  {
    id: "teb_007",
    category: "tebranish_tolqin",
    subcategory: "garmonik_tebranish",
    name: "Maksimal tezlanish (tebranishda)",
    nameRu: "Максимальное ускорение колебаний",
    formula: "a_max = A·ω²",
    latex: "a_{max} = A \\omega^2",
    variables: [
      { symbol: "a_max", name: "Max tezlanish", unit: "m/s²", description: "Jismning chekka nuqtalardagi maksimal tezlanishi" },
      { symbol: "A", name: "Amplituda", unit: "m", description: "Maksimal siljish" },
      { symbol: "ω", name: "Siklik chastota", unit: "rad/s", description: "Burchak chastotasi" }
    ],
    calculator: {
      solveFor: "amax",
      inputs: ["A", "omega"],
      defaultValues: { A: 0.5, omega: 6.28 },
      formulaFn: "(a, w) => a * w * w",
      resultUnit: "m/s²",
      resultLabel: "Maksimal tezlanish"
    },
    description: "Jism muvozanat nuqtasidan eng uzoq bo'lgan joyda uni joyiga qaytaruvchi kuch maksimal bo'lgani uchun tezlanish ham maksimal bo'ladi.",
    example: "Amplituda 0.5 m, ω = 3.14. a_max = 0.5 · (3.14)² ≈ 4.93 m/s².",
    tags: ["tezlanish", "max", "amplituda", "garmonik"],
    difficulty: 2, grade: 9, lesson_link: "tebranish-2", xp_reward: 10
  },

  // 8. Tebranish energiyasi
  {
    id: "teb_008",
    category: "tebranish_tolqin",
    subcategory: "garmonik_tebranish",
    name: "Tebranishning to'liq energiyasi",
    nameRu: "Полная энергия колебаний",
    formula: "E = k·A² / 2 = m·(A·ω)² / 2",
    latex: "E = \\frac{k A^2}{2}",
    variables: [
      { symbol: "E", name: "To'liq energiya", unit: "J", description: "Sistemaning mexanik energiyasi" },
      { symbol: "k", name: "Bikrlik koeft.", unit: "N/m", description: "Tebranma tizim qattiqligi" },
      { symbol: "A", name: "Amplituda", unit: "m", description: "Eng katta og'ish" }
    ],
    calculator: {
      solveFor: "E",
      inputs: ["k", "A"],
      defaultValues: { k: 200, A: 0.1 },
      formulaFn: "(k, A) => (k * A * A) / 2",
      resultUnit: "J",
      resultLabel: "Tebranish energiyasi"
    },
    description: "Bir o'lchamli tebranma tizimning to'liq mexanik energiyasi (ishqalanishsiz holkatda) o'zgarmas bo'lib, uning amplitudasi kvadratiga proporsional.",
    example: "Prujina (k=200 N/m) 0.1 m ga cho'zildi. E = 200 · 0.01 / 2 = 1 J.",
    tags: ["energiya", "to'liq", "tebranish", "amplituda"],
    difficulty: 2, grade: 9, lesson_link: "tebranish-energiya", xp_reward: 10
  },

  // 9. Rezonans
  {
    id: "teb_009",
    category: "tebranish_tolqin",
    subcategory: "garmonik_tebranish",
    name: "Rezonans holati",
    nameRu: "Условие резонанса",
    formula: "ω_tashqi = ω₀",
    latex: "\\omega_{ext} = \\omega_0",
    variables: [
      { symbol: "ω_tashqi", name: "Majburlovchi chastota", unit: "rad/s", description: "Tashqi davriy kuch chastotasi" },
      { symbol: "ω₀", name: "Xususiy chastota", unit: "rad/s", description: "Tizimning o'z tebranish chastotasi" }
    ],
    calculator: {
      solveFor: "resonance",
      inputs: ["w_ext", "w_0"],
      defaultValues: { w_ext: 50, w_0: 50 },
      formulaFn: "(w1, w2) => Math.abs(w1 - w2)",
      resultUnit: "rad/s farq",
      resultLabel: "Farq (nol bo'lsa rezonans)"
    },
    description: "Tashqi majbur etuvchi kuchning chastotasi tizimning xususiy chastotasiga tenglashganida, tebranish amplitudasi keskin ortib ketadi.",
    example: "Ko'prikning o'z chastotasi 2 Hz. Askarlar 2 Hz da qadam tashlasa, tebranishlar qo'shilib rezonans kelib chiqadi.",
    tags: ["rezonans", "chastota", "majburiy", "amplituda"],
    difficulty: 1, grade: 9, lesson_link: "rezonans", xp_reward: 5
  },

  // 10. Majburiy tebranish amplitudasi
  {
    id: "teb_010",
    category: "tebranish_tolqin",
    subcategory: "garmonik_tebranish",
    name: "Majburiy tebranish amplitudasi (soddalashtirilgan)",
    nameRu: "Амплитуда вынужденных колебаний",
    formula: "A = F₀ / |k - m·ω²|",
    latex: "A = \\frac{F_0}{|k - m\\omega^2|}",
    variables: [
      { symbol: "A", name: "Amplituda", unit: "m", description: "Barqaror tebranishning qulashi" },
      { symbol: "F₀", name: "Kuch amplitudasi", unit: "N", description: "Tashqi o'zgaruvchi kuch" },
      { symbol: "k", name: "Bikrlik", unit: "N/m", description: "Tizim qattiqligi" },
      { symbol: "m", name: "Massa", unit: "kg", description: "Jism massasi" },
      { symbol: "ω", name: "Tashqi chastota", unit: "rad/s", description: "Majbur etuvchi siklik chastota" }
    ],
    calculator: {
      solveFor: "A",
      inputs: ["F0", "k", "m", "w"],
      defaultValues: { F0: 10, k: 100, m: 2, w: 5 },
      formulaFn: "(F, k, m, w) => F / Math.abs(k - m * w * w)",
      resultUnit: "m",
      resultLabel: "Amplituda"
    },
    description: "Ideal tuzilmada tashqi chastota (k/m) ildiziga yaqinlashganda mahraj nolga yaqinlashadi, mos ravishda amplituda cheksizlikka (rezonans) ketadi.",
    example: "F=10, k=100, m=2, ω=5. A = 10 / |100 - 2·25| = 10 / 50 = 0.2 m.",
    tags: ["majburiy", "tebranish", "kuch", "rezonans"],
    difficulty: 3, grade: 9, lesson_link: "rezonans", xp_reward: 15
  },

  // 11. To'lqin tezligi
  {
    id: "teb_011",
    category: "tebranish_tolqin",
    subcategory: "tolqin",
    name: "To'lqin tarqalish tezligi",
    nameRu: "Скорость распространения волны",
    formula: "v = λ·f = λ / T",
    latex: "v = \\lambda f = \\frac{\\lambda}{T}",
    variables: [
      { symbol: "v", name: "To'lqin tezligi", unit: "m/s", description: "To'lqin frontining harakat tezligi" },
      { symbol: "λ", name: "To'lqin uzunligi", unit: "m", description: "Ikki qo'shni do'nglik orasi" },
      { symbol: "f", name: "Chastota", unit: "Hz", description: "Manbaning tebranish chastotasi" }
    ],
    calculator: {
      solveFor: "v",
      inputs: ["lambda_", "f"],
      defaultValues: { lambda_: 2, f: 50 },
      formulaFn: "(l, f) => l * f",
      resultUnit: "m/s",
      resultLabel: "Tezlik"
    },
    description: "To'lqin tezligi uning uzunligi va qancha vakt ichida bir marta tiklanishi (chastotasi) ko'paytmasiga teng.",
    example: "To'lqin uzunligi 2m, chastotasi 50 Hz. v = 2 · 50 = 100 m/s.",
    tags: ["to'lqin", "tezlik", "chastota", "uzunlik"],
    difficulty: 1, grade: 9, lesson_link: "tolqin-1", xp_reward: 5
  },

  // 12. To'lqin uzunligi
  {
    id: "teb_012",
    category: "tebranish_tolqin",
    subcategory: "tolqin",
    name: "To'lqin uzunligi",
    nameRu: "Длина волны",
    formula: "λ = v·T",
    latex: "\\lambda = vT",
    variables: [
      { symbol: "λ", name: "To'lqin uzunligi", unit: "m", description: "Davr davomida tarqalish masofasi" },
      { symbol: "v", name: "Tezlik", unit: "m/s", description: "To'lqin tarqalish tezligi" },
      { symbol: "T", name: "Davr", unit: "s", description: "Bitta tebranish davri" }
    ],
    calculator: {
      solveFor: "lambda",
      inputs: ["v", "T"],
      defaultValues: { v: 340, T: 0.01 },
      formulaFn: "(v, T) => v * T",
      resultUnit: "m",
      resultLabel: "To'lqin uzunligi"
    },
    description: "To'lqin uzunligi — bu to'lqinning bitta tebranish davrida o'tadigan masofasi.",
    example: "Tovush v=340 m/s, T=0.01 s. λ = 340 · 0.01 = 3.4 m.",
    tags: ["to'lqin", "uzunlik", "masofa", "tezlik"],
    difficulty: 1, grade: 9, lesson_link: "tolqin-1", xp_reward: 5
  },

  // 13. To'lqin tenglamasi
  {
    id: "teb_013",
    category: "tebranish_tolqin",
    subcategory: "tolqin",
    name: "To'g'ri to'lqin tenglamasi",
    nameRu: "Уравнение бегущей волны",
    formula: "y = A·sin(ωt - kx)",
    latex: "y = A \\sin(\\omega t - kx)",
    variables: [
      { symbol: "y", name: "Siljish", unit: "m", description: "Muhit zarrachasining muvozanatdan siljishi" },
      { symbol: "A", name: "Amplituda", unit: "m", description: "Maksimal siljish" },
      { symbol: "ω", name: "Siklik chastota", unit: "rad/s", description: "Vaqt chastotasi" },
      { symbol: "t", name: "Vaqt", unit: "s", description: "O'qilgan on" },
      { symbol: "k", name: "To'lqin soni", unit: "rad/m", description: "Fazo chastotasi (2π/λ)" },
      { symbol: "x", name: "Masofa", unit: "m", description: "Zarrachaning koordinatasi" }
    ],
    calculator: {
      solveFor: "y",
      inputs: ["A", "w", "t", "k", "x"],
      defaultValues: { A: 0.5, w: 3.14, t: 1, k: 1.57, x: 2 },
      formulaFn: "(A, w, t, k, x) => A * Math.sin(w*t - k*x)",
      resultUnit: "m",
      resultLabel: "Siljish"
    },
    description: "Muhit ichida tarqalayotgan to'lqin zarrachalarining holati ham vaqtga (t), ham uning masofadagi o'rniga (x) bog'liq.",
    example: "Ma'lum nuqta x=2, t=1 da hisoblanadi. (Ichki funksiya radianlarda hisoblanadi).",
    tags: ["to'lqin", "tenglama", "harakat", "siljish", "fazo"],
    difficulty: 3, grade: 9, lesson_link: "tolqin-2", xp_reward: 15
  },

  // 14. To'lqin soni
  {
    id: "teb_014",
    category: "tebranish_tolqin",
    subcategory: "tolqin",
    name: "To'lqin soni",
    nameRu: "Волновое число",
    formula: "k = 2π / λ",
    latex: "k = \\frac{2\\pi}{\\lambda}",
    variables: [
      { symbol: "k", name: "To'lqin soni", unit: "rad/m", description: "2π uzunlikdagi to'lqinlar soni" },
      { symbol: "λ", name: "To'lqin uzunligi", unit: "m", description: "Bitta to'lqin uzunligi" }
    ],
    calculator: {
      solveFor: "k",
      inputs: ["lambda_"],
      defaultValues: { lambda_: 3.1415 },
      formulaFn: "(l) => 2 * Math.PI / l",
      resultUnit: "rad/m",
      resultLabel: "To'lqin soni"
    },
    description: "To'lqin soni to'lqin uzunligiga teskari kattalik bo'lib fazoviy chastotani anglatadi (2π masofaga qancha to'lqin joylashadi).",
    example: "λ = 3.14 m. k = 6.28 / 3.14 ≈ 2 rad/m.",
    tags: ["to'lqin", "son", "lambda", "fazo"],
    difficulty: 2, grade: 9, lesson_link: "tolqin-2", xp_reward: 10
  },

  // 15. Tovush intensivligi
  {
    id: "teb_015",
    category: "tebranish_tolqin",
    subcategory: "tolqin",
    name: "Tovush intensivligi",
    nameRu: "Интенсивность звука",
    formula: "I = P / S",
    latex: "I = \\frac{P}{S}",
    variables: [
      { symbol: "I", name: "Intensivlik", unit: "W/m²", description: "Birlik yuzaga tushuvchi akustik quvvat" },
      { symbol: "P", name: "Quvvat", unit: "W", description: "Tovush manbaining quvvati" },
      { symbol: "S", name: "Yuza", unit: "m²", description: "Sferik front yuzasi (4πr²)" }
    ],
    calculator: {
      solveFor: "I",
      inputs: ["P", "S"],
      defaultValues: { P: 100, S: 10 },
      formulaFn: "(P, S) => P / S",
      resultUnit: "W/m²",
      resultLabel: "Intensivlik"
    },
    description: "Tovush to'lqinining energiyasi uning har bir kvadrat metr yuzaga qancha tushayotganligi intensivlik deyiladi.",
    example: "Karnay 100 W quvvatni 10 m² maydonga sochmoqda. I = 100/10 = 10 W/m².",
    tags: ["tovush", "intensivlik", "quvvat", "yuza", "akustika"],
    difficulty: 2, grade: 9, lesson_link: "akustika", xp_reward: 10
  },

  // ════════════════════════════════════════════════════════
  //  MOLEKULYAR FIZIKA (mol_001 → mol_018)
  // ════════════════════════════════════════════════════════

  // 1. Molyar massa
  {
    id: "mol_001",
    category: "molekulyar",
    subcategory: "mol_hisob",
    name: "Molyar massa",
    nameRu: "Молярная масса",
    formula: "M = m / ν",
    latex: "M = \\frac{m}{\\nu}",
    variables: [
      { symbol: "M", name: "Molyar massa", unit: "kg/mol", description: "Bir mol moddaning massasi" },
      { symbol: "m", name: "Massa", unit: "kg", description: "Modda massasi" },
      { symbol: "ν", name: "Modda miqdori", unit: "mol", description: "Mollar soni" }
    ],
    calculator: {
      solveFor: "M",
      inputs: ["m", "nu"],
      defaultValues: { m: 0.036, nu: 2 },
      formulaFn: "(m, nu) => m / nu",
      resultUnit: "kg/mol",
      resultLabel: "Molyar massa"
    },
    description: "Bir mol berilgan moddadagi zarralarning (molekulalar, atomlar) umumiy massasi Molyar massa deb ataladi.",
    example: "Suvning massasi m=0.036 kg, miqdori ν=2 mol. M = 0.036 / 2 = 0.018 kg/mol.",
    tags: ["mol", "massa", "molyar", "miqdor"],
    difficulty: 1, grade: 10, lesson_link: "mol-1", xp_reward: 5
  },

  // 2. Mol soni (Modda miqdori)
  {
    id: "mol_002",
    category: "molekulyar",
    subcategory: "mol_hisob",
    name: "Modda miqdori (Mol soni)",
    nameRu: "Количество вещества",
    formula: "ν = N / Nₐ = m / M",
    latex: "\\nu = \\frac{N}{N_A} = \\frac{m}{M}",
    variables: [
      { symbol: "ν", name: "Mol soni", unit: "mol", description: "Moddadagi mollar soni" },
      { symbol: "N", name: "Zarralar soni", unit: "ta", description: "Molekula yoki atomlar soni" },
      { symbol: "Nₐ", name: "Avogadro doimiysi", unit: "1/mol", description: "6.022 × 10²³" }
    ],
    calculator: {
      solveFor: "nu",
      inputs: ["N", "Na"],
      defaultValues: { N: 12.04e23, Na: 6.02e23 },
      formulaFn: "(N, Na) => N / Na",
      resultUnit: "mol",
      resultLabel: "Modda miqdori"
    },
    description: "Modda miqdori zarralar sonining Avogadro soniga nisbati bilan topiladi (yoki massa orqali).",
    example: "Agar N = 12.04×10²³ ta molekula bo'lsa: ν = (12.04·10²³) / (6.02·10²³) = 2 mol.",
    tags: ["mol", "zarra", "avogadro", "miqdor"],
    difficulty: 1, grade: 10, lesson_link: "mol-1", xp_reward: 5
  },

  // 3. Zarralar soni
  {
    id: "mol_003",
    category: "molekulyar",
    subcategory: "mol_hisob",
    name: "Zarralar soni",
    nameRu: "Число частиц",
    formula: "N = ν · Nₐ",
    latex: "N = \\nu N_A",
    variables: [
      { symbol: "N", name: "Zarralar soni", unit: "ta", description: "Atom yoki molekulalar umumiy soni" },
      { symbol: "ν", name: "Mol soni", unit: "mol", description: "Modda miqdori" },
      { symbol: "Nₐ", name: "Avogadro doimiysi", unit: "1/mol", description: "6.022 × 10²³" }
    ],
    calculator: {
      solveFor: "N",
      inputs: ["nu", "Na"],
      defaultValues: { nu: 3, Na: 6.022e23 },
      formulaFn: "(nu, Na) => nu * Na",
      resultUnit: "ta",
      resultLabel: "Zarralar soni"
    },
    description: "Berilgan holdagi barcha molekulalar miqdorini topish uchun mollar sonini Avogadro soniga ko'paytiramiz.",
    example: "3 mol kislorodda: N = 3 · 6.022×10²³ ≈ 18.06×10²³ ta molekula bor.",
    tags: ["zarra", "soni", "avogadro", "mol"],
    difficulty: 1, grade: 10, lesson_link: "mol-1", xp_reward: 5
  },

  // 4. MKT ning asosiy tenglamasi
  {
    id: "mol_004",
    category: "molekulyar",
    subcategory: "ideal_gaz",
    name: "MKT ning asosiy tenglamasi",
    nameRu: "Основное уравнение МКТ",
    formula: "P = ⅓·n·m₀·⟨v²⟩ = ⅔·n·⟨Ek⟩",
    latex: "P = \\frac{1}{3} n m_0 \\langle v^2 \\rangle",
    variables: [
      { symbol: "P", name: "Bosim", unit: "Pa", description: "Ideal gaz bosimi" },
      { symbol: "n", name: "Konsentratsiya", unit: "1/m³", description: "Hajm birligidagi molekulalar soni" },
      { symbol: "m₀", name: "Molekula massasi", unit: "kg", description: "Bitta molekulaning massasi" },
      { symbol: "v_kv²", name: "O'rt. kv. tezlik kvadrati", unit: "m²/s²", description: "Tezlik kvadratining o'rtachasi" }
    ],
    calculator: {
      solveFor: "P",
      inputs: ["n", "m0", "v_sq"],
      defaultValues: { n: 1e25, m0: 5e-26, v_sq: 250000 },
      formulaFn: "(n, m0, v_sq) => (1/3) * n * m0 * v_sq",
      resultUnit: "Pa",
      resultLabel: "Gaz bosimi"
    },
    description: "Ideal gaz bosimi molekulalarning devorga urilishidan kelib chiqadi. U qandaydir konsentratsiya va kinetik energiyaga bog'liq.",
    example: "n = 10²⁵ m⁻³, m₀=5·10⁻²⁶ kg, v²=250000. P = 1/3 · 10²⁵ · 5·10⁻²⁶ · 250000 ≈ 41666 Pa.",
    tags: ["mkt", "asosiy", "bosim", "molekula", "tezlik"],
    difficulty: 3, grade: 10, lesson_link: "ideal-gaz-1", xp_reward: 15
  },

  // 5. Mendeleyev-Klapeyron tenglamasi
  {
    id: "mol_005",
    category: "molekulyar",
    subcategory: "ideal_gaz",
    name: "Mendeleyev-Klapeyron tenglamasi",
    nameRu: "Уравнение Менделеева-Клапейрона",
    formula: "P·V = ν·R·T",
    latex: "PV = \\nu R T = \\frac{m}{M} RT",
    variables: [
      { symbol: "P", name: "Bosim", unit: "Pa", description: "Gaz bosimi" },
      { symbol: "V", name: "Hajm", unit: "m³", description: "Gaz hajmi" },
      { symbol: "ν", name: "Mol soni", unit: "mol", description: "Modda miqdori" },
      { symbol: "T", name: "Temperatura", unit: "K", description: "Absolyut harorat (Kelvinda)" },
      { symbol: "R", name: "Univ. gaz doimiysi", unit: "J/(mol·K)", description: "8.31 J/(mol·K)" }
    ],
    calculator: {
      solveFor: "P",
      inputs: ["V", "nu", "T", "R"],
      defaultValues: { V: 0.1, nu: 2, T: 300, R: 8.314 },
      formulaFn: "(V, nu, t, r) => (nu * r * t) / V",
      resultUnit: "Pa",
      resultLabel: "Bosim"
    },
    description: "Ideal gaz holatini ifodalovchi eng asosiy tenglama. Har qanday parametrni boshqalari orqali topishga imkon beradi.",
    example: "ν=2 mol, T=300 K, V=0.1 m³ bo'lsa, P = (2·8.31·300) / 0.1 = 49860 Pa.",
    tags: ["holat", "ideal_gaz", "mendeleyev", "klapeyron"],
    difficulty: 2, grade: 10, lesson_link: "ideal-gaz-2", xp_reward: 10
  },

  // 6. Konsentratsiya va harorat orqali bosim
  {
    id: "mol_006",
    category: "molekulyar",
    subcategory: "ideal_gaz",
    name: "Bosim tenglamasi (Boltsman orqali)",
    nameRu: "Уравнение состояния P = nkT",
    formula: "P = n·k·T",
    latex: "P = n k T",
    variables: [
      { symbol: "P", name: "Bosim", unit: "Pa", description: "Gaz bosimi" },
      { symbol: "n", name: "Konsentratsiya", unit: "1/m³", description: "Birlik hajmdagi zarralar soni" },
      { symbol: "k", name: "Boltsman doimiysi", unit: "J/K", description: "1.38 × 10⁻²³ J/K" },
      { symbol: "T", name: "Temperatura", unit: "K", description: "Absolyut temperatura" }
    ],
    calculator: {
      solveFor: "P",
      inputs: ["n", "k", "T"],
      defaultValues: { n: 2.68e25, k: 1.38e-23, T: 273 },
      formulaFn: "(n, k, T) => n * k * T",
      resultUnit: "Pa",
      resultLabel: "Bosim"
    },
    description: "Bosimni mikroskopik parametrlar - konsentratsiya va mutlaq harorat orqali bo'g'lovchi formula.",
    example: "Normal sharoitda n ≈ 2.68·10²⁵ m⁻³, T = 273 K. P = 2.68e25 · 1.38e-23 · 273 ≈ 101000 Pa (1 atm)",
    tags: ["bosim", "konsentratsiya", "boltsman", "ideal_gaz"],
    difficulty: 2, grade: 10, lesson_link: "ideal-gaz-2", xp_reward: 10
  },

  // 7. Gaz konsentratsiyasi
  {
    id: "mol_007",
    category: "molekulyar",
    subcategory: "molekula_tezlik",
    name: "Konsentratsiya",
    nameRu: "Концентрация молекул",
    formula: "n = N / V",
    latex: "n = \\frac{N}{V}",
    variables: [
      { symbol: "n", name: "Konsentratsiya", unit: "1/m³", description: "Birlik hajmdagi zarrachalar" },
      { symbol: "N", name: "Zarralar soni", unit: "ta", description: "Jami molekulalar soni" },
      { symbol: "V", name: "Hajm", unit: "m³", description: "Idish hajmi" }
    ],
    calculator: {
      solveFor: "n",
      inputs: ["N", "V"],
      defaultValues: { N: 10000000, V: 0.5 },
      formulaFn: "(N, V) => N / V",
      resultUnit: "1/m³",
      resultLabel: "Konsentratsiya"
    },
    description: "Moddaning bir kubometr hajmdagi zarralari sonini ko'rsatuvchi mikroskopik parametr.",
    example: "Idish hajmi 0.5 m³ va ichida 1e7 molekula bo'lsa, konsentratsiya 2e7 1/m³ ga teng.",
    tags: ["n", "konsentratsiya", "zarra", "hajm"],
    difficulty: 1, grade: 10, lesson_link: "ideal-gaz-1", xp_reward: 5
  },

  // 8. Izotermik jarayon
  {
    id: "mol_008",
    category: "molekulyar",
    subcategory: "gaz_jarayonlar",
    name: "Boyl-Mariott qonuni (Izotermik)",
    nameRu: "Закон Бойля-Мариотта",
    formula: "P₁V₁ = P₂V₂",
    latex: "P_1 V_1 = P_2 V_2 \\quad (T = const)",
    variables: [
      { symbol: "P₁", name: "Bosh. bosim", unit: "Pa", description: "Jarayongacha bo'lgan bosim" },
      { symbol: "V₁", name: "Bosh. hajm", unit: "m³", description: "Jarayongacha bo'lgan hajm" },
      { symbol: "P₂", name: "Oxirgi bosim", unit: "Pa", description: "Jarayondan keyingi bosim" },
      { symbol: "V₂", name: "Oxirgi hajm", unit: "m³", description: "Jarayondan keyingi hajm" }
    ],
    calculator: {
      solveFor: "P2",
      inputs: ["P1", "V1", "V2"],
      defaultValues: { P1: 100000, V1: 2, V2: 1 },
      formulaFn: "(P1, V1, V2) => (P1 * V1) / V2",
      resultUnit: "Pa",
      resultLabel: "Oxirgi bosim"
    },
    description: "O'zgarmas massali va haroratli gaz hajmi siqilganda, uning bosimi hajmga teskari proporsional ortadi.",
    example: "Bosim 100,000 Pa, hajm 2 m³. Hajm 2 marta qisqardi (1 m³ gacha). Bosim 200,000 Pa ga chiqadi.",
    tags: ["izotermik", "boyl", "mariott", "jarayon", "harorat o'zgarmas"],
    difficulty: 2, grade: 10, lesson_link: "izojarayon-1", xp_reward: 10
  },

  // 9. Izoxorik jarayon
  {
    id: "mol_009",
    category: "molekulyar",
    subcategory: "gaz_jarayonlar",
    name: "Sharl qonuni (Izoxorik)",
    nameRu: "Закон Шарля",
    formula: "P₁ / T₁ = P₂ / T₂",
    latex: "\\frac{P_1}{T_1} = \\frac{P_2}{T_2} \\quad (V = const)",
    variables: [
      { symbol: "P₁", name: "Bosh. bosim", unit: "Pa", description: "Boshlang'ich holatdagi bosim" },
      { symbol: "T₁", name: "Bosh. harorat", unit: "K", description: "Boshlang'ich holatdagi harorat" },
      { symbol: "P₂", name: "Oxirgi bosim", unit: "Pa", description: "Qizigandan keyingi bosim" },
      { symbol: "T₂", name: "Oxirgi harorat", unit: "K", description: "Qizigandan keyingi harorat" }
    ],
    calculator: {
      solveFor: "P2",
      inputs: ["P1", "T1", "T2"],
      defaultValues: { P1: 100000, T1: 300, T2: 600 },
      formulaFn: "(p1, t1, t2) => (p1 * t2) / t1",
      resultUnit: "Pa",
      resultLabel: "Oxirgi bosim"
    },
    description: "Hajm o'zgarmaganda (masalan yopiq yelim idish) gazning harorati ortishi bilan uning bosimi ham o'sha nisbatda ortadi.",
    example: "Gaz 300 K dan 600 K ga qizdirildi. P₁ = 10⁵ Pa. Demak bosim ham ikki marta ortib 2·10⁵ Pa bo'ladi.",
    tags: ["izoxor", "sharl", "jarayon", "hajm o'zgarmas"],
    difficulty: 2, grade: 10, lesson_link: "izojarayon-2", xp_reward: 10
  },

  // 10. Izobarik jarayon
  {
    id: "mol_010",
    category: "molekulyar",
    subcategory: "gaz_jarayonlar",
    name: "Gay-Lyussak qonuni (Izobarik)",
    nameRu: "Закон Гей-Люссака",
    formula: "V₁ / T₁ = V₂ / T₂",
    latex: "\\frac{V_1}{T_1} = \\frac{V_2}{T_2} \\quad (P = const)",
    variables: [
      { symbol: "V₁", name: "Bosh. hajm", unit: "m³", description: "Qizdirishgacha hajm" },
      { symbol: "T₁", name: "Bosh. harorat", unit: "K", description: "Boshlang'ich temperatura" },
      { symbol: "V₂", name: "Oxirgi hajm", unit: "m³", description: "Qizdirgandan so'ng hajm" },
      { symbol: "T₂", name: "Oxirgi harorat", unit: "K", description: "Oxirgi temperatura" }
    ],
    calculator: {
      solveFor: "V2",
      inputs: ["V1", "T1", "T2"],
      defaultValues: { V1: 5, T1: 300, T2: 360 },
      formulaFn: "(v1, t1, t2) => (v1 * t2) / t1",
      resultUnit: "m³",
      resultLabel: "Oxirgi hajm"
    },
    description: "O'zgarmas bosimda, masalan piston ostida kengayayotgan gazda, haroratning oshishi hajmning to'g'ri proportsionda o'sishiga olib keladi.",
    example: "5 m³ gaz 300 K dan 360 K ga qizidi (1.2 marta oshdi). Demak, hajm ham 1.2 marta oshadi: V = 6 m³.",
    tags: ["izobar", "gay_lyussak", "jarayon", "bosim o'zgarmas"],
    difficulty: 2, grade: 10, lesson_link: "izojarayon-3", xp_reward: 10
  },

  // 11. Birlashtirilgan gaz qonuni
  {
    id: "mol_011",
    category: "molekulyar",
    subcategory: "gaz_jarayonlar",
    name: "Klapeyron tenglamasi (birlashtirilgan)",
    nameRu: "Объединенный газовый закон",
    formula: "P₁·V₁/T₁ = P₂·V₂/T₂",
    latex: "\\frac{P_1 V_1}{T_1} = \\frac{P_2 V_2}{T_2} = const",
    variables: [
      { symbol: "P₁, P₂", name: "Bosimlar", unit: "Pa", description: "Holatlardagi bosim" },
      { symbol: "V₁, V₂", name: "Hajmlar", unit: "m³", description: "Holatlardagi hajm" },
      { symbol: "T₁, T₂", name: "Haroratlar", unit: "K", description: "Holatlardagi harorat" }
    ],
    calculator: {
      solveFor: "T2",
      inputs: ["P1", "V1", "T1", "P2", "V2"],
      defaultValues: { P1: 100000, V1: 1, T1: 300, P2: 200000, V2: 0.5 },
      formulaFn: "(p1, v1, t1, p2, v2) => (p2 * v2 * t1) / (p1 * v1)",
      resultUnit: "K",
      resultLabel: "Oxirgi harorat"
    },
    description: "Oshkoran massa ostida istalgan termodinamik holat o'tishlari uchun shu tenglik saqlaniladi.",
    example: "Bosim 2 marta, hajm 0.5 marta (yarmiga) oshdi. P₁·V₁ = 2·0.5 = 1, demak Harorat o'zgarmabdi (T₂ = 300K).",
    tags: ["klapeyron", "birlashtirilgan", "qonun"],
    difficulty: 3, grade: 10, lesson_link: "izojarayon-4", xp_reward: 15
  },

  // 12. O'rtacha kinetik energiya
  {
    id: "mol_012",
    category: "molekulyar",
    subcategory: "molekula_tezlik",
    name: "Ilgarilanma harakat o'rtacha energiyasi",
    nameRu: "Средняя кинетическая энергия",
    formula: "E_kin = 3/2 · k · T",
    latex: "\\langle E_k \\rangle = \\frac{3}{2} kT",
    variables: [
      { symbol: "E_kin", name: "Kinetik energiya", unit: "J", description: "Bitta molekulaning energiyasi" },
      { symbol: "k", name: "Boltsman doimiysi", unit: "J/K", description: "1.38 × 10⁻²³" },
      { symbol: "T", name: "Harorat", unit: "K", description: "Mutlaq harorat" }
    ],
    calculator: {
      solveFor: "Ek",
      inputs: ["T"],
      defaultValues: { T: 300 },
      formulaFn: "(T) => 1.5 * 1.38e-23 * T",
      resultUnit: "J",
      resultLabel: "Energiya"
    },
    description: "Bitta bir atomli gaz molekulasining tasodifiy ilgarilanma harakatining o'rtacha kinetik energiyasi faqat haroratning o'ziga bog'liq.",
    example: "T=300K haroratda har bir molekula Ek = 1.5 · 1.38·10⁻²³ · 300 ≈ 6.21·10⁻²¹ J energiyaga ega.",
    tags: ["kinetik", "energiya", "molekula", "boltsman"],
    difficulty: 2, grade: 10, lesson_link: "kinetika-1", xp_reward: 10
  },

  // 13. Kvadratik o'rtacha tezlik
  {
    id: "mol_013",
    category: "molekulyar",
    subcategory: "molekula_tezlik",
    name: "Kvadratik o'rtacha tezlik",
    nameRu: "Среднеквадратичная скорость",
    formula: "v_kvo = √(3RT/M)",
    latex: "v_{rms} = \\sqrt{\\frac{3RT}{M}} = \\sqrt{\\frac{3kT}{m_0}}",
    variables: [
      { symbol: "v", name: "Tezlik", unit: "m/s", description: "Kvadratik o'rtacha tezlik" },
      { symbol: "R", name: "Gaz doimiysi", unit: "J/(mol·K)", description: "8.31" },
      { symbol: "T", name: "Harorat", unit: "K", description: "Kelvin shkalasi" },
      { symbol: "M", name: "Molyar massa", unit: "kg/mol", description: "Gazning molyar massasi" }
    ],
    calculator: {
      solveFor: "v",
      inputs: ["R", "T", "M"],
      defaultValues: { R: 8.314, T: 300, M: 0.028 },
      formulaFn: "(R, T, M) => Math.sqrt((3 * R * T) / M)",
      resultUnit: "m/s",
      resultLabel: "O'rt. kv. tezlik"
    },
    description: "Molekulalarning energiyasini hisobga oluvchi samarali tezlik. Haroratga to'g'ri, massaga teskari nisbatda.",
    example: "Azot gazi (M=0.028 kg/mol) 300 K da: v = √(3·8.31·300 / 0.028) ≈ 516 m/s.",
    tags: ["tezlik", "kvadratik o'rtacha", "maksvel"],
    difficulty: 2, grade: 10, lesson_link: "kinetika-2", xp_reward: 10
  },

  // 14. Eng ehtimoliy tezlik
  {
    id: "mol_014",
    category: "molekulyar",
    subcategory: "molekula_tezlik",
    name: "Eng ehtimoliy tezlik",
    nameRu: "Наиболее вероятная скорость",
    formula: "v_eht = √(2RT/M)",
    latex: "v_p = \\sqrt{\\frac{2RT}{M}}",
    variables: [
      { symbol: "v", name: "Ehtimoliy tezlik", unit: "m/s", description: "Eng ko'p uchraydigan tezlik" },
      { symbol: "R", name: "Gaz doim.", unit: "J/(mol·K)", description: "8.314" },
      { symbol: "T", name: "Temperatura", unit: "K", description: "Gazning harorati" },
      { symbol: "M", name: "Molyar massa", unit: "kg/mol", description: "Modda massasi" }
    ],
    calculator: {
      solveFor: "v",
      inputs: ["T", "M"],
      defaultValues: { T: 300, M: 0.028 },
      formulaFn: "(T, M) => Math.sqrt((2 * 8.314 * T) / M)",
      resultUnit: "m/s",
      resultLabel: "Ehtimoliy tezlik"
    },
    description: "Gazdagi molekulalarning asosan ega bo'lish ehtimoli eng yuqori ekanligini ko'rsatuvchi tezlik kattaligi.",
    example: "Azot (M=0.028) uchun 300K da: v ≈ 422 m/s.",
    tags: ["tezlik", "ehtimoliy", "maksvel"],
    difficulty: 3, grade: 10, lesson_link: "kinetika-2", xp_reward: 15
  },

  // 15. O'rtacha arifmetik tezlik
  {
    id: "mol_015",
    category: "molekulyar",
    subcategory: "molekula_tezlik",
    name: "O'rtacha arifmetik tezlik",
    nameRu: "Средняя арифметическая скорость",
    formula: "<v> = √(8RT/πM)",
    latex: "\\langle v \\rangle = \\sqrt{\\frac{8RT}{\\pi M}}",
    variables: [
      { symbol: "v", name: "O'rtacha tezlik", unit: "m/s", description: "Barcha tezliklar yig'indisining o'rtachasi" },
      { symbol: "T", name: "Harorat", unit: "K", description: "Temperatura" },
      { symbol: "M", name: "Molyar massa", unit: "kg/mol", description: "Gaz og'irligi" }
    ],
    calculator: {
      solveFor: "v",
      inputs: ["T", "M"],
      defaultValues: { T: 300, M: 0.028 },
      formulaFn: "(T, M) => Math.sqrt((8 * 8.314 * T) / (Math.PI * M))",
      resultUnit: "m/s",
      resultLabel: "Arifmetik tezlik"
    },
    description: "Barcha molekulalar tezlik moduli yig'indisining molekulalar soniga nisbatan o'rtacha arifmetik qiymati.",
    example: "Azot 300K da eng ehtimoliy (~422), kvadratik (~516), arifmetik o'rtacha esa ular orasida ~476 m/s atrofida bo'ladi.",
    tags: ["tezlik", "arifmetik", "o'rtacha", "maksvel"],
    difficulty: 3, grade: 10, lesson_link: "kinetika-2", xp_reward: 15
  },

  // 16. To'yingan bug' bosimi
  {
    id: "mol_016",
    category: "molekulyar",
    subcategory: "namlik",
    name: "To'yingan bug' bosimi temperaturaga bog'liqligi",
    nameRu: "Давление насыщенного пара",
    formula: "P_bug' faqat T ga bog'liq",
    latex: "P \\approx P_0 e^{ - \\frac{L}{RT} }",
    variables: [
      { symbol: "P", name: "To'yingan bosim", unit: "Pa", description: "Qaynab turgan bug' bosimi" },
      { symbol: "T", name: "Temperatura", unit: "K", description: "Bug' harorati" }
    ],
    calculator: {
      solveFor: "P",
      inputs: ["t_celsius"],
      defaultValues: { t_celsius: 100 },
      formulaFn: "(t) => 611.2 * Math.exp(17.67 * t / (t + 243.5))",
      resultUnit: "Pa",
      resultLabel: "Deyarli aynan to'yingan bosim"
    },
    description: "Suyuqlik bilan muvozanatda bo'lgan to'yingan bug' bosimi bug'lanish yuzi yoki hajmiga emas eksponensial tarzda faqat haroratga bog'liq (Tetens qoidasi orqali hisoblanyapti).",
    example: "Suv t=100°C da P ≈ 101.3 kPa (1 atmosfera). Shu vaqt qaynatish boshlanadi.",
    tags: ["bug'", "bosim", "to'yingan", "harorat", "namlik"],
    difficulty: 2, grade: 10, lesson_link: "fazoviy-otish", xp_reward: 10
  },

  // 17. Havo namligi (Nisbiy)
  {
    id: "mol_017",
    category: "molekulyar",
    subcategory: "namlik",
    name: "Havo namligi (Nisbiy namlik)",
    nameRu: "Относительная влажность",
    formula: "φ = (P / P₀) × 100%",
    latex: "\\phi = \\frac{p_a}{p_0} \\cdot 100\\%",
    variables: [
      { symbol: "φ", name: "Nisbiy namlik", unit: "%", description: "Bug'ning to'yinish darajasi" },
      { symbol: "P", name: "Zichlik/Bosim", unit: "Pa", description: "Havodagi mavjud namlik (partsial bosim)" },
      { symbol: "P₀", name: "To'yingan bosim", unit: "Pa", description: "Berilgan haroratda gipottetik to'yingan bug' bosimi" }
    ],
    calculator: {
      solveFor: "phi",
      inputs: ["P", "P0"],
      defaultValues: { P: 1000, P0: 2330 },
      formulaFn: "(P, P0) => (P / P0) * 100",
      resultUnit: "%",
      resultLabel: "Nisbiy namlik"
    },
    description: "Havoda mavjud bo'lgan haqiqiy suv bug'i bosimining (yoki zichligining) ayni shu haroratdagi to'yingan suv bug'i bosimiga (zichligiga) foizdagi nisbati.",
    example: "Xonada P=1000 Pa, u haroratda (masalan 20°C) to'yingan bosim 2330 Pa. φ = (1000/2330)*100 ≈ 43%.",
    tags: ["namlik", "nisbiy", "bug'", "partsial"],
    difficulty: 1, grade: 10, lesson_link: "namlik", xp_reward: 5
  },

  // 18. Sirt tarangligi kuchi
  {
    id: "mol_018",
    category: "molekulyar",
    subcategory: "namlik",
    name: "Sirt taranglik kuchi",
    nameRu: "Сила поверхностного натяжения",
    formula: "F = σ · l",
    latex: "F = \\sigma l",
    variables: [
      { symbol: "F", name: "Sirt taranglik kuchi", unit: "N", description: "Sirtning yupqa pardasi qarshiligi" },
      { symbol: "σ", name: "Koeffitsient", unit: "N/m", description: "Suyuqlik jinsi hamda haroratiga bog'liq (sirt tarangligi)" },
      { symbol: "l", name: "Chegara uzunligi", unit: "m", description: "Suyuqlik sirtini chegaralab turgan uzunlik" }
    ],
    calculator: {
      solveFor: "F",
      inputs: ["sigma", "l"],
      defaultValues: { sigma: 0.073, l: 0.1 },
      formulaFn: "(sigma, l) => sigma * l",
      resultUnit: "N",
      resultLabel: "Kuch"
    },
    description: "Suyuqlik molekulalarining o'zaro tortishishi tufayli sirt iloji boricha kichikroq bo'lishga (yig'ilishga) intiladi. F — ana shu intilish kuchi.",
    example: "Suv σ=0.073 N/m, kontur l=0.1 m bo'lsa: F = 0.073 · 0.1 = 0.0073 N.",
    tags: ["sirt", "taranglik", "kuch", "suyuqlik"],
    difficulty: 1, grade: 10, lesson_link: "suyuqlik-1", xp_reward: 5
  },

  // ════════════════════════════════════════════════════════
  //  TERMODINAMIKA (termo_001 → termo_014)
  // ════════════════════════════════════════════════════════

  // 1. Issiqlik miqdori
  {
    id: "termo_001",
    category: "termodinamika",
    subcategory: "issiqlik_miqdori",
    name: "Issiqlik miqdori (isitish/sovutish)",
    nameRu: "Количество теплоты (нагревание/охлаждение)",
    formula: "Q = c·m·ΔT",
    latex: "Q = c m \\Delta T",
    variables: [
      { symbol: "Q", name: "Issiqlik miqdori", unit: "J", description: "Olingan yoki berilgan energiya" },
      { symbol: "c", name: "Sol. issiqlik sig'imi", unit: "J/(kg·K)", description: "Modda doimiysi" },
      { symbol: "m", name: "Massa", unit: "kg", description: "Jism massasi" },
      { symbol: "ΔT", name: "Harorat o'zgarishi", unit: "K", description: "Oxirgi va boshlang'ich harorat farqi" }
    ],
    calculator: {
      solveFor: "Q",
      inputs: ["c", "m", "dT"],
      defaultValues: { c: 4200, m: 2, dT: 50 },
      formulaFn: "(c, m, dT) => c * m * dT",
      resultUnit: "J",
      resultLabel: "Issiqlik miqdori"
    },
    description: "Jism haroratini o'zgartirish uchun qancha energiya kerakligini (yoki ajralishini) hisoblaydi.",
    example: "2 kg suvni 50°C ga isitish uchn: Q = 4200 · 2 · 50 = 420,000 J (420 kJ).",
    tags: ["issiqlik", "miqdor", "isitish", "harorat"],
    difficulty: 1, grade: 8, lesson_link: "issiqlik-1", xp_reward: 5
  },

  // 2. Solishtirma issiqlik sig'imi
  {
    id: "termo_002",
    category: "termodinamika",
    subcategory: "issiqlik_miqdori",
    name: "Solishtirma issiqlik sig'imi",
    nameRu: "Удельная теплоемкость",
    formula: "c = Q / (m·ΔT)",
    latex: "c = \\frac{Q}{m \\Delta T}",
    variables: [
      { symbol: "c", name: "Sol. issiqlik sig'imi", unit: "J/(kg·K)", description: "1 kg moddani 1°C isitish energiyasi" },
      { symbol: "Q", name: "Issiqlik miqdori", unit: "J", description: "Berilgan issiqlik" },
      { symbol: "m", name: "Massa", unit: "kg", description: "Modda massasi" },
      { symbol: "ΔT", name: "Harorat o'zgarishi", unit: "K", description: "Temperatura farqi" }
    ],
    calculator: {
      solveFor: "c",
      inputs: ["Q", "m", "dT"],
      defaultValues: { Q: 8400, m: 1, dT: 2 },
      formulaFn: "(q, m, dt) => q / (m * dt)",
      resultUnit: "J/(kg·K)",
      resultLabel: "C (Solishtirma iss. sig'imi)"
    },
    description: "Bir kg massali jismning temperaturasini bir kelvinga o'zgartirish uchun zarur bo'lgan energiya miqdori.",
    example: "Q=8400, m=1, ΔT=2. c = 8400 / 2 = 4200 J/kg·K (suv).",
    tags: ["solishtirma", "sig'im", "issiqlik", "c"],
    difficulty: 2, grade: 8, lesson_link: "issiqlik-1", xp_reward: 10
  },

  // 3. Eritish issiqligi
  {
    id: "termo_003",
    category: "termodinamika",
    subcategory: "issiqlik_miqdori",
    name: "Eritish issiqlik miqdori",
    nameRu: "Количество теплоты плавления",
    formula: "Q = λ·m",
    latex: "Q = \\lambda m",
    variables: [
      { symbol: "Q", name: "Eritish issiqligi", unit: "J", description: "Jismni to'liq eritish uchun energiya" },
      { symbol: "λ", name: "Sol. eritish issiqligi", unit: "J/kg", description: "Modda doimiysi" },
      { symbol: "m", name: "Massa", unit: "kg", description: "Eriyotgan massa" }
    ],
    calculator: {
      solveFor: "Q",
      inputs: ["lambda_", "m"],
      defaultValues: { lambda_: 330000, m: 2 },
      formulaFn: "(L, m) => L * m",
      resultUnit: "J",
      resultLabel: "Sarflanadigan issiqlik"
    },
    description: "Eritish haroratida turgan moddani suyuqlik holatiga to'liq o'tkazish uchun kerak bo'ladigan energiya.",
    example: "2 kg muzni eritish: λ = 3.3×10⁵. Q = 330000 · 2 = 660,000 J.",
    tags: ["eritish", "λ", "lambda", "kristal", "agregat"],
    difficulty: 1, grade: 8, lesson_link: "eritish", xp_reward: 5
  },

  // 4. Bug'latish issiqligi
  {
    id: "termo_004",
    category: "termodinamika",
    subcategory: "issiqlik_miqdori",
    name: "Bug'latish issiqlik miqdori",
    nameRu: "Количество теплоты парообразования",
    formula: "Q = L·m",
    latex: "Q = L m",
    variables: [
      { symbol: "Q", name: "Bug'latish issiqligi", unit: "J", description: "Suyuqlikni bug'latish uchun kerakli energiya" },
      { symbol: "L", name: "Sol. bug'latish issiqligi", unit: "J/kg", description: "Modda issiqligi doimiysi" },
      { symbol: "m", name: "Massa", unit: "kg", description: "Bug'lanadigan qism" }
    ],
    calculator: {
      solveFor: "Q",
      inputs: ["L", "m"],
      defaultValues: { L: 2260000, m: 1.5 },
      formulaFn: "(l, m) => l * m",
      resultUnit: "J",
      resultLabel: "Bug'latish energiyasi"
    },
    description: "Suyuqlik qaynash haroratida turganda uni to'liq bug'ga aylantirish uchun sarflanadigan issiqlik miqdori.",
    example: "1.5 kg suv: L = 2.26×10⁶. Q = 2.26×10⁶ · 1.5 = 3,390,000 J (3.39 MJ).",
    tags: ["bug'latish", "L", "agregat", "suyuqlik"],
    difficulty: 1, grade: 8, lesson_link: "buglatish", xp_reward: 5
  },

  // 5. Yonish issiqligi
  {
    id: "termo_005",
    category: "termodinamika",
    subcategory: "issiqlik_miqdori",
    name: "Yonish issiqlik miqdori",
    nameRu: "Количество теплоты сгорания",
    formula: "Q = q·m",
    latex: "Q = q m",
    variables: [
      { symbol: "Q", name: "Ajralgan energiya", unit: "J", description: "Yoqilg'i yonganda ajraladi" },
      { symbol: "q", name: "Sol. yonish issiqligi", unit: "J/kg", description: "Yoqilg'ining ajratish doimiysi" },
      { symbol: "m", name: "Massa", unit: "kg", description: "Yoqilgan massasi" }
    ],
    calculator: {
      solveFor: "Q",
      inputs: ["q", "m"],
      defaultValues: { q: 44000000, m: 3 },
      formulaFn: "(q, m) => q * m",
      resultUnit: "J",
      resultLabel: "Ajralgan issiqlik"
    },
    description: "Berilgan massadagi yoqilg'i to'liq yonganda qancha issiqlik energiyasi ajralishini ko'rsatadi.",
    example: "3 kg benzin yonganda q=4.4×10⁷: Q = 4.4×10⁷ · 3 = 1.32×10⁸ J (132 MJ).",
    tags: ["yonish", "yoqilg'i", "q", "ajralish"],
    difficulty: 1, grade: 8, lesson_link: "yonish", xp_reward: 5
  },

  // 6. Termodinamikaning 1-qonuni
  {
    id: "termo_006",
    category: "termodinamika",
    subcategory: "termodinamika_qonunlari",
    name: "Termodinamikaning I qonuni",
    nameRu: "Первый закон термодинамики",
    formula: "Q = ΔU + A",
    latex: "Q = \\Delta U + A",
    variables: [
      { symbol: "Q", name: "Issiqlik miqdori", unit: "J", description: "Tizimga berilgan energiya" },
      { symbol: "ΔU", name: "Ichki energiya o'zg.", unit: "J", description: "Ichki yig'ilgan energiya ortishi" },
      { symbol: "A", name: "Bajarilgan ish", unit: "J", description: "Tizim tashqi jismlar ustida bajargan ishi" }
    ],
    calculator: {
      solveFor: "Q",
      inputs: ["dU", "A"],
      defaultValues: { dU: 500, A: 200 },
      formulaFn: "(dU, a) => dU + a",
      resultUnit: "J",
      resultLabel: "Berilgan elektr/issiqlik Q"
    },
    description: "Tizimga berilgan isssiqlik miqdori uning ichki energiyasini oshirishga va tashqi kuchlarga qarshi ish bajarishga sarflanadi (Energiyaning saqlanish qonuni).",
    example: "Gaz 500 J ichki energiyaga yig'di va 200 J ish qildi. Tizimga Q = 500+200 = 700 J berilgan.",
    tags: ["termodinamika", "1-qonun", "energiya", "ish", "issiqlik"],
    difficulty: 2, grade: 10, lesson_link: "termodinamika-1", xp_reward: 10
  },

  // 7. Ichki energiya o'zgarishi
  {
    id: "termo_007",
    category: "termodinamika",
    subcategory: "termodinamika_qonunlari",
    name: "Ichki energiya o'zgarishi",
    nameRu: "Изменение внутренней энергии",
    formula: "ΔU = Q - A",
    latex: "\\Delta U = Q - A",
    variables: [
      { symbol: "ΔU", name: "Ichki energiya o'zg.", unit: "J", description: "Gaz molekulalarining umumiy energiyasi o'zgarishi" },
      { symbol: "Q", name: "Berilgan issiqlik", unit: "J", description: "Sirtdan kirgan issiqlik (ajralsa manfiy)" },
      { symbol: "A", name: "Bajarilgan ish", unit: "J", description: "Kengayish ishi (m: siqilish bo'lsa manfiy)" }
    ],
    calculator: {
      solveFor: "dU",
      inputs: ["Q", "A"],
      defaultValues: { Q: 800, A: -100 },
      formulaFn: "(q, a) => q - a",
      resultUnit: "J",
      resultLabel: "Ichki energiya o'zgardigi ΔU"
    },
    description: "Agar gaz issiqlik olib (Q>0) uning ustida tashqi kuchlar ish bajarsa (siqilsa A<0), ichki energiya sezilarli ravishda oshadi.",
    example: "Tizim 800 J oldi. Siqildi (A = -100 J). ΔU = 800 - (-100) = 900 J o'sdi.",
    tags: ["delta U", "ichki energiya", "1-qonun"],
    difficulty: 2, grade: 10, lesson_link: "termodinamika-1", xp_reward: 10
  },

  // 8. Ideal gaz ichki energiyasi
  {
    id: "termo_008",
    category: "termodinamika",
    subcategory: "termodinamika_qonunlari",
    name: "Ideal gaz ichki energiyasi",
    nameRu: "Внутренняя энергия идеального газа",
    formula: "U = (i/2)·ν·R·T",
    latex: "U = \\frac{i}{2} \\nu R T",
    variables: [
      { symbol: "U", name: "Ichki energiya", unit: "J", description: "Barcha zarralarning umumiy Ek" },
      { symbol: "i", name: "Erkinlik darajasi", unit: "birlik", description: "Bir atomli=3, Ikki atomli=5, Ko'p=6" },
      { symbol: "ν", name: "Mol soni", unit: "mol", description: "Gaz miqdori" },
      { symbol: "T", name: "Harorat", unit: "K", description: "Mutlaq harorat" },
      { symbol: "R", name: "Gaz doim.", unit: "J/mol·K", description: "8.31" }
    ],
    calculator: {
      solveFor: "U",
      inputs: ["i", "nu", "T", "R"],
      defaultValues: { i: 3, nu: 2, T: 300, R: 8.314 },
      formulaFn: "(i, nu, T, R) => (i/2) * nu * R * T",
      resultUnit: "J",
      resultLabel: "U (Ichki energiya)"
    },
    description: "Ideal gazda potensial energiya nol deb hisoblanadi. Shuning uchun uning ichki energiyasi molekulalari soniga va haroratiga mutanosib.",
    example: "2 mol Geliy (i=3) 300K da: U = 1.5 · 2 · 8.31 · 300 ≈ 7479 J.",
    tags: ["ichki energiya", "U", "ideal gaz", "erkinlik"],
    difficulty: 3, grade: 10, lesson_link: "ichki-energiya", xp_reward: 15
  },

  // 9. Gazning ishi
  {
    id: "termo_009",
    category: "termodinamika",
    subcategory: "termodinamika_qonunlari",
    name: "Gazning bajargan ishi (izobarik)",
    nameRu: "Работа газа (изобарный процесс)",
    formula: "A = P·ΔV",
    latex: "A = P \\Delta V = P(V_2 - V_1)",
    variables: [
      { symbol: "A", name: "Ish", unit: "J", description: "Gaz kengayganda topilgan mexanik ish" },
      { symbol: "P", name: "Bosim", unit: "Pa", description: "O'zgarmas bosim" },
      { symbol: "ΔV", name: "O'zgargan hajm", unit: "m³", description: "Oxirgi hajm - Boshlang'ich hajm" }
    ],
    calculator: {
      solveFor: "A",
      inputs: ["P", "V1", "V2"],
      defaultValues: { P: 100000, V1: 0.1, V2: 0.3 },
      formulaFn: "(p, v1, v2) => p * (v2 - v1)",
      resultUnit: "J",
      resultLabel: "Bajarilgan ish"
    },
    description: "Gat doimiy bosim ostida o'z hajmini o'zgartirganda bajaradigan termodinamik ish.",
    example: "1 atm (100,000 Pa) bosimda gaz 0.1 m³ dan 0.3 m³ ga kengaydi. ΔV=0.2 m³, A = 100,000 · 0.2 = 20,000 J (20 kJ).",
    tags: ["ish", "gaz", "izobarik", "A", "kengayish"],
    difficulty: 2, grade: 10, lesson_link: "gaz_ishi", xp_reward: 10
  },

  // 10. Issiqlik mashinasi FIK (Karnot uslubi, ideal izchil)
  {
    id: "termo_010",
    category: "termodinamika",
    subcategory: "issiqlik_mashinasi",
    name: "Ideal mashina FIK (Karnot)",
    nameRu: "КПД идеальной машины (Цикл Карно)",
    formula: "η = 1 - T₂ / T₁",
    latex: "\\eta = 1 - \\frac{T_2}{T_1}",
    variables: [
      { symbol: "η", name: "FIK", unit: "ulush", description: "Foydali ish koeffitsienti" },
      { symbol: "T₂", name: "Sovutkich har.", unit: "K", description: "Sovuq radiator harorati" },
      { symbol: "T₁", name: "Isitkich har.", unit: "K", description: "Issiq manba harorati" }
    ],
    calculator: {
      solveFor: "eta",
      inputs: ["T1", "T2"],
      defaultValues: { T1: 600, T2: 300 },
      formulaFn: "(t1, t2) => 1 - (t2 / t1)",
      resultUnit: "",
      resultLabel: "FIK (maxsus 1 dan kichik son). Ko'paytiring yuz"
    },
    description: "Karnot sikli asosida ishlovchi ideal (mutlaqo ishqalanishsiz va issiklik yo'qotishlarsiz) motorning cheklangan foydali ish koeffitsienti.",
    example: "T₁ = 600 K, T₂ = 300 K. η = 1 - 300/600 = 0.5 (yoki 50%).",
    tags: ["FIK", "karnot", "termodinamika", "eta", "kelvin"],
    difficulty: 2, grade: 10, lesson_link: "karnot-sikl", xp_reward: 10
  },

  // 11. Haqiqiy issiqlik mashinasi FIK
  {
    id: "termo_011",
    category: "termodinamika",
    subcategory: "issiqlik_mashinasi",
    name: "Haqiqiy issiqlik mashinasi FIK",
    nameRu: "Реальный КПД тепловой машины",
    formula: "η = (Q₁ - Q₂) / Q₁ = A / Q₁",
    latex: "\\eta = \\frac{Q_1 - Q_2}{Q_1} = \\frac{A}{Q_1}",
    variables: [
      { symbol: "η", name: "FIK", unit: "ulush", description: "Olingan foyda ulushi" },
      { symbol: "Q₁", name: "Olingan issiqlik", unit: "J", description: "Isitkichdan kelgan energiya" },
      { symbol: "Q₂", name: "Berilgan issiqlik", unit: "J", description: "Sovutkichga o'tgan energiya" },
      { symbol: "A", name: "Ish", unit: "J", description: "Bajarilgan foydali ish" }
    ],
    calculator: {
      solveFor: "eta",
      inputs: ["Q1", "Q2"],
      defaultValues: { Q1: 1000, Q2: 600 },
      formulaFn: "(q1, q2) => (q1 - q2) / q1",
      resultUnit: "",
      resultLabel: "FIK (masalan 0.4 = 40%)"
    },
    description: "Har kungi dvigatellarda yonilg'i bergan issiqlikning aynan qancha qismi toza mexanik ishga aylangani.",
    example: "Isitkichdan Q₁=1000 J olingan, radiatorga Q₂=600 J yo'qolgan. Foydali ish A=400. FIK η = 400/1000 = 0.40.",
    tags: ["haqiqiy", "FIK", "A", "Q", "mashina"],
    difficulty: 2, grade: 10, lesson_link: "karnot-sikl", xp_reward: 10
  },

  // 12. Karnot siklining maks energiya FIK ni foizda (formula qulayroq foizda)
  {
    id: "termo_012",
    category: "termodinamika",
    subcategory: "issiqlik_mashinasi",
    name: "Maksimal FIK % da",
    nameRu: "Максимальный КПД (в %)",
    formula: "η_max = ((T₁ - T₂) / T₁) × 100%",
    latex: "\\eta_{max} = \\frac{T_1 - T_2}{T_1} \\cdot 100\\%",
    variables: [
      { symbol: "η_max", name: "FIK %", unit: "%", description: "Samaradorlik foizi" },
      { symbol: "T₁", name: "Isitkich K", unit: "K", description: "Qizg'in tana harorati" },
      { symbol: "T₂", name: "Sovutkich K", unit: "K", description: "Atrof-muhit harorati" }
    ],
    calculator: {
      solveFor: "eta_per",
      inputs: ["T1", "T2"],
      defaultValues: { T1: 1000, T2: 300 },
      formulaFn: "(t1, t2) => ((t1 - t2) / t1) * 100",
      resultUnit: "%",
      resultLabel: "Foydali ish koeffitsienti"
    },
    description: "Ideal holda issiqlik motorining nima imkoniyatga ega bo'lishini ko'rsatib, har qanday issiqlik dvigatelining FIK qiymati albatta 1 dan (100% dan) kichik ekanligini anglatadi.",
    example: "T1=1000 K, T2=300 K bo'lsa: ( 700 / 1000 ) × 100% = 70% bo'lishi mumkin eng ko'pi bilan.",
    tags: ["karnot", "max", "foiz", "termodinamika 2-qonun"],
    difficulty: 2, grade: 10, lesson_link: "karnot-sikl", xp_reward: 10
  },

  // 13. Issiqlik nasosi
  {
    id: "termo_013",
    category: "termodinamika",
    subcategory: "issiqlik_mashinasi",
    name: "Issiqlik nasosi samaradorligi (Koeft)",
    nameRu: "Коэффициент преобразования (Тепловой насос)",
    formula: "k = Q₁ / A",
    latex: "k = \\frac{Q_1}{A}",
    variables: [
      { symbol: "k", name: "Xolodilnik koeft.", unit: "", description: "Elektr sarfi foydasiga hosil bo'lgach (odatda 1 dan katta bo'ladi isitishda)" },
      { symbol: "Q₁", name: "Isitilgan joyga (yoki xonaga) o'tgan energiya", unit: "J", description: "Maqsad issiqligi" },
      { symbol: "A", name: "Setdagi yoki kompressordagi Ish", unit: "J", description: "Tashqaridan sarflanadi g'ayrida" }
    ],
    calculator: {
      solveFor: "k",
      inputs: ["Q1", "A"],
      defaultValues: { Q1: 4000, A: 1000 },
      formulaFn: "(q, a) => q / a",
      resultUnit: "",
      resultLabel: "Samaradorlik koeftsi (COP)"
    },
    description: "Qishda xonani isitishda qo'llaniladigan konditsioner / nasos tashqaridan sovuqni siqib qancha tok olib uyning ichiga shundan ham ko'proq issiqlik bersa o'sha narsa K hisoblanadi.",
    example: "A=1000 J elektr energiya olinib tashqaridagi sovuq havodan kinetik energiya (3000 J) tortib olinib uyga Q1=4000 J tashlanaversa COP = 4.0 dir.",
    tags: ["nasos", "konditsioner", "issiqlik nasosi", "k", "samaradorlik"],
    difficulty: 3, grade: 10, lesson_link: "issiqlik-nasosi", xp_reward: 15
  },

  // 14. Entropiya
  {
    id: "termo_014",
    category: "termodinamika",
    subcategory: "termodinamika_qonunlari",
    name: "Entropiya o'zgarishi (Qaytuvchi)",
    nameRu: "Изменение энтропии",
    formula: "ΔS = Q / T",
    latex: "\\Delta S = \\frac{Q}{T}",
    variables: [
      { symbol: "ΔS", name: "Entropiya o'zgarishi", unit: "J/K", description: "Tartibsizlikni o'lchaydigan kattalik" },
      { symbol: "Q", name: "Olingan issiqlik", unit: "J", description: "Uzluksiz sistema ichidagi issiqlik" },
      { symbol: "T", name: "Mutlaq harorat", unit: "K", description: "Jarayon vaqtidagi konstanta T" }
    ],
    calculator: {
      solveFor: "dS",
      inputs: ["Q", "T"],
      defaultValues: { Q: 600, T: 300 },
      formulaFn: "(q, t) => q / t",
      resultUnit: "J/K",
      resultLabel: "Entropiya (ΔS)"
    },
    description: "Modда holatining tartibsizligini va entropiyaning o'sishi borliq termodinamik strelkasining yagona ochiq tizim doirasida noldan yuqoriligini bildiradi.",
    example: "Q=600 J harorat T=300K da berildi. Uning o'zgargan entropiyasi ΔS = 600 / 300 = 2 J/K.",
    tags: ["entropiya", "2-qonun", "delta S", "tartibsizlik"],
    difficulty: 3, grade: 11, lesson_link: "entropiya", xp_reward: 15
  },

  // ════════════════════════════════════════════════════════
  //  ELEKTROSTATIKA (elek_001 → elek_016)
  // ════════════════════════════════════════════════════════

  // 1. Kulon qonuni
  {
    id: "elek_001",
    category: "elektrostatika",
    subcategory: "kulon",
    name: "Kulon qonuni",
    nameRu: "Закон Кулона",
    formula: "F = k·|q₁|·|q₂| / r²",
    latex: "F = k \\frac{|q_1 q_2|}{r^2}",
    variables: [
      { symbol: "F", name: "Elektr kuchi", unit: "N", description: "Zaryadlar orasidagi ta'sir kuchi" },
      { symbol: "k", name: "Kulon doimiysi", unit: "N·m²/C²", description: "9×10⁹ N·m²/C²" },
      { symbol: "q₁, q₂", name: "Zaryadlar", unit: "C", description: "Nuqtaviy zaryadlar kattaligi" },
      { symbol: "r", name: "Masofa", unit: "m", description: "Zaryadlar orasidagi masofa" }
    ],
    calculator: {
      solveFor: "F",
      inputs: ["q1", "q2", "r"],
      defaultValues: { q1: 1e-6, q2: 2e-6, r: 0.1 },
      formulaFn: "(q1, q2, r) => 9e9 * Math.abs(q1 * q2) / (r * r)",
      resultUnit: "N",
      resultLabel: "O'zaro ta'sir kuchi"
    },
    description: "Ikkita qo'zg'almas nuqtaviy zaryadning o'zaro ta'sir kuchi zaryadlar modullari ko'paytmasiga to'g'ri proportsional va ular orasidagi masofa kvadratiga teskari proportsional.",
    example: "q₁=1 μC, q₂=2 μC, r=0.1 m: F = 9×10⁹ · 10⁻⁶ · 2×10⁻⁶ / 0.01 = 1.8 N.",
    tags: ["kulon", "zaryad", "kuch", "elektrostatika"],
    difficulty: 2, grade: 8, lesson_link: "kulon", xp_reward: 10
  },

  // 2. Elektr maydoni kuchlanganligi
  {
    id: "elek_002",
    category: "elektrostatika",
    subcategory: "elektr_maydoni",
    name: "Elektr maydoni kuchlanganligi",
    nameRu: "Напряженность электрического поля",
    formula: "E = F / q",
    latex: "E = \\frac{F}{q}",
    variables: [
      { symbol: "E", name: "Kuchlanganlik", unit: "V/m (yoki N/C)", description: "Maydonning kuch xarakteristikasi" },
      { symbol: "F", name: "Ta'sir kuchi", unit: "N", description: "Sinov zaryadiga ta'sir kuchi" },
      { symbol: "q", name: "Sinov zaryadi", unit: "C", description: "Maydonga kiritilgan zaryad" }
    ],
    calculator: {
      solveFor: "E",
      inputs: ["F", "q"],
      defaultValues: { F: 0.05, q: 1e-6 },
      formulaFn: "(f, q) => f / q",
      resultUnit: "V/m",
      resultLabel: "Kuchlanganlik"
    },
    description: "Maydonga kiritilgan musbat birlik zaryadga maydon tomonidan qanday kuch ta'sir qilishini ko'rsatadi.",
    example: "F = 0.05 N, q = 1 μC. E = 0.05 / 10⁻⁶ = 50,000 V/m.",
    tags: ["kuchlanganlik", "maydon", "elektr", "E"],
    difficulty: 1, grade: 8, lesson_link: "kuchlanganlik-1", xp_reward: 5
  },

  // 3. Nuqtaviy zaryad maydoni
  {
    id: "elek_003",
    category: "elektrostatika",
    subcategory: "elektr_maydoni",
    name: "Nuqtaviy zaryad maydon kuchlanganligi",
    nameRu: "Напряженность поля точечного заряда",
    formula: "E = k·|q| / r²",
    latex: "E = k \\frac{|q|}{r^2}",
    variables: [
      { symbol: "E", name: "Kuchlanganlik", unit: "V/m", description: "Muayyan nuqtadagi maydon" },
      { symbol: "q", name: "Zaryad", unit: "C", description: "Maydon manbayi bo'lgan zaryad" },
      { symbol: "r", name: "Masofa", unit: "m", description: "Zaryaddan nuqtagacha masofa" }
    ],
    calculator: {
      solveFor: "E",
      inputs: ["q", "r"],
      defaultValues: { q: 2e-6, r: 0.5 },
      formulaFn: "(q, r) => 9e9 * Math.abs(q) / (r * r)",
      resultUnit: "V/m",
      resultLabel: "Kuchlanganlik"
    },
    description: "Nuqtaviy zaryad yaratgan elektr maydon kuchlanganligi masofa uzoqlashgani sari kvadratga mutanosib ravishda kamayadi.",
    example: "q = 2 μC, r = 0.5 m. E = 9×10⁹ · 2×10⁻⁶ / 0.25 = 72,000 V/m.",
    tags: ["nuqtaviy", "zaryad", "maydon", "E"],
    difficulty: 2, grade: 8, lesson_link: "kuchlanganlik-1", xp_reward: 10
  },

  // 4. Tekis kondensator maydoni
  {
    id: "elek_004",
    category: "elektrostatika",
    subcategory: "elektr_maydoni",
    name: "Cheksiz tekislikning maydon kuchlanganligi",
    nameRu: "Поле равномерно заряженной плоскости",
    formula: "E = σ / (2ε₀)",
    latex: "E = \\frac{\\sigma}{2\\varepsilon_0}",
    variables: [
      { symbol: "E", name: "Kuchlanganlik", unit: "V/m", description: "Tekislik maydoni" },
      { symbol: "σ", name: "Sirt zaryad zich.", unit: "C/m²", description: "Birlik yuzadagi zaryad q/S" },
      { symbol: "ε₀", name: "Elektr doimiysi", unit: "F/m", description: "8.85 × 10⁻¹²" }
    ],
    calculator: {
      solveFor: "E",
      inputs: ["sigma"],
      defaultValues: { sigma: 1e-6 },
      formulaFn: "(sigma) => sigma / (2 * 8.85e-12)",
      resultUnit: "V/m",
      resultLabel: "Kuchlanganlik"
    },
    description: "Cheksiz tekislikning yon atrofidagi elektr maydon bir jinsli bo'lib masofaga mutlaqo bog'liq bo'lmay qoladi (ideal holda). Shundan xulosa - 2 plastinali kondensator ichida E = σ/ε₀ bo'ladi.",
    example: "σ = 1 μC/m². E = 10⁻⁶ / (2·8.85·10⁻¹²) ≈ 56,500 V/m.",
    tags: ["tekislik", "zaryad zichligi", "elektr maydon", "E"],
    difficulty: 3, grade: 10, lesson_link: "gauss-teoremasi", xp_reward: 15
  },

  // 5. Potensial
  {
    id: "elek_005",
    category: "elektrostatika",
    subcategory: "potensial",
    name: "Elektr maydon potensiali",
    nameRu: "Потенциал электрического поля",
    formula: "φ = W / q = k·q / r",
    latex: "\\phi = \\frac{W}{q} = k \\frac{q}{r}",
    variables: [
      { symbol: "φ", name: "Potensial", unit: "V", description: "Maydonning energetik xarakteristikasi" },
      { symbol: "W", name: "Potensial energiya", unit: "J", description: "Zaryadning o'sha nuqtadagi energiyasi" },
      { symbol: "q", name: "Zaryad", unit: "C", description: "Birlik zaryad" }
    ],
    calculator: {
      solveFor: "phi",
      inputs: ["q", "r"],
      defaultValues: { q: 1e-6, r: 0.1 },
      formulaFn: "(q, r) => 9e9 * q / r",
      resultUnit: "V",
      resultLabel: "Potensial"
    },
    description: "Maydonning energetik tabiati, qandaydir zaryad u yerda saqlash mumkin bo'lgan maksimal potensial energiyaning birlik zaryadga nisbati.",
    example: "q = 1 μC, r = 0.1 m. φ = 9×10⁹ · 10⁻⁶ / 0.1 = 90,000 V.",
    tags: ["potensial", "kuchlanish", "energiya", "phi"],
    difficulty: 2, grade: 8, lesson_link: "potensial-1", xp_reward: 10
  },

  // 6. Potensiallar farqi (Kuchlanish)
  {
    id: "elek_006",
    category: "elektrostatika",
    subcategory: "potensial",
    name: "Potensiallar farqi (Kuchlanish)",
    nameRu: "Разность потенциалов (напряжение)",
    formula: "U = φ₁ - φ₂ = A / q",
    latex: "U = \\phi_1 - \\phi_2 = \\frac{A}{q}",
    variables: [
      { symbol: "U", name: "Kuchlanish", unit: "V", description: "Ikki nuqta orasidagi potensial tushishi" },
      { symbol: "A", name: "Bajarilgan ish", unit: "J", description: "Zaryadni siljitganda maydon ishi" },
      { symbol: "q", name: "Zaryad", unit: "C", description: "Ko'chgan zaryad miqdori" }
    ],
    calculator: {
      solveFor: "U",
      inputs: ["A", "q"],
      defaultValues: { A: 0.05, q: 1e-6 },
      formulaFn: "(a, q) => a / q",
      resultUnit: "V",
      resultLabel: "Kuchlanish (Farq U)"
    },
    description: "Zaryadni elektr maydonining bir nuqtasidan ikkinchisiga ko'chirishda bajarilgan ishning zaryad miqdoriga nisbati.",
    example: "1 μC zaryadni ko'chirish uchun 0.05 J ish bajarildi. U = 0.05 / 10⁻⁶ = 50,000 V.",
    tags: ["kuchlanish", "potensial", "farq", "ish"],
    difficulty: 2, grade: 8, lesson_link: "potensial-2", xp_reward: 10
  },

  // 7. Maydon va potensial bog'liqligi
  {
    id: "elek_007",
    category: "elektrostatika",
    subcategory: "elektr_maydoni",
    name: "Kuchlanganlik va potensial bog'liqligi",
    nameRu: "Связь напряженности и разности потенциалов",
    formula: "E = U / d",
    latex: "E = \\frac{U}{d}",
    variables: [
      { symbol: "E", name: "Kuchlanganlik", unit: "V/m", description: "Bir jinsli maydon" },
      { symbol: "U", name: "Kuchlanish", unit: "V", description: "Nuqtalar orasidagi potensial farqi" },
      { symbol: "d", name: "Masofa", unit: "m", description: "Nuqtalar orasi yoki qoplamalar orasi" }
    ],
    calculator: {
      solveFor: "E",
      inputs: ["U", "d"],
      defaultValues: { U: 220, d: 0.01 },
      formulaFn: "(u, d) => u / d",
      resultUnit: "V/m",
      resultLabel: "Elektr maydoni E"
    },
    description: "Bir jinsli maydonda (masalan yassi kondensator) kuchlanganlik va kuchlanish o'zaro to'g'ri proportsionda masofaga teskari proportsionda bo'ladi.",
    example: "U = 220 V, plastinalar orasidagi masofa 1 sm (0.01 m). E = 220 / 0.01 = 22,000 V/m.",
    tags: ["bog'lanish", "E", "U", "maydon", "bir jinsli"],
    difficulty: 1, grade: 8, lesson_link: "boglanish", xp_reward: 5
  },

  // 8. Elektr maydonda bajarilgan ish
  {
    id: "elek_008",
    category: "elektrostatika",
    subcategory: "potensial",
    name: "Elektr maydonning ishi",
    nameRu: "Работа электрического поля",
    formula: "A = q·U = q·(φ₁ - φ₂)",
    latex: "A = q U = q(\\phi_1 - \\phi_2)",
    variables: [
      { symbol: "A", name: "Bajargan ish", unit: "J", description: "Zarra energiya o'zgarishi" },
      { symbol: "q", name: "Zaryad", unit: "C", description: "Ko'chadigan elektr zaryadi" },
      { symbol: "U", name: "Kuchlanish", unit: "V", description: "Siljigan oraliqdagi potensial tushishi" }
    ],
    calculator: {
      solveFor: "A",
      inputs: ["q", "U"],
      defaultValues: { q: 1.6e-19, U: 100 },
      formulaFn: "(q, u) => q * u",
      resultUnit: "J",
      resultLabel: "Bajarilgan ish"
    },
    description: "Maydon kuchlari yoki sinovchi kuchlar zaryadni kuchlanishi U bo'lgan masofaga urganda sarflagan energiya (Masalan elektron-volt shu asosda olingan).",
    example: "1 elektron (1.6·10⁻¹⁹ C) 100 V potensiallar farqini o'tsa tezlanish oladi: A = 100 · 1.6e-19 = 1.6×10⁻¹⁷ J.",
    tags: ["ish", "tayyor ish", "elektron-volt", "kuchlanish"],
    difficulty: 2, grade: 9, lesson_link: "elektr_ish", xp_reward: 10
  },

  // 9. Kondensator sig'imi
  {
    id: "elek_009",
    category: "elektrostatika",
    subcategory: "kondensator",
    name: "Elektr sig'imi ta'rifi",
    nameRu: "Электрическая емкость",
    formula: "C = q / U",
    latex: "C = \\frac{q}{U}",
    variables: [
      { symbol: "C", name: "Elekt sig'im", unit: "F", description: "Farad. Kondensator sig'imi" },
      { symbol: "q", name: "Zaryad", unit: "C", description: "Biror plastinasi zaryadi modduli" },
      { symbol: "U", name: "Kuchlanish", unit: "V", description: "Plastinalar potensiallar farqi" }
    ],
    calculator: {
      solveFor: "C",
      inputs: ["q", "u"],
      defaultValues: { q: 1e-6, u: 50 },
      formulaFn: "(q, u) => q / u",
      resultUnit: "F",
      resultLabel: "Elektr sig'im C"
    },
    description: "Kondensator 1 Volt kuchlanish ostida bo'lganda plastinalarida ushlab qololadigan elektr miqdorini tushuntiradi. (Prak.da µF, pF kabi olinadi).",
    example: "Zaryadi 1μC, kuchlanishi 50 V. Sig'imi: C = 10⁻⁶ / 50 = 0.02 μF (20 nF).",
    tags: ["sig'im", "kondensator", "farad"],
    difficulty: 1, grade: 9, lesson_link: "kondensator-1", xp_reward: 5
  },

  // 10. Tekis kondensator sig'imi
  {
    id: "elek_010",
    category: "elektrostatika",
    subcategory: "kondensator",
    name: "Tekis kondensator sig'imi",
    nameRu: "Емкость плоского конденсатора",
    formula: "C = ε₀·ε·S / d",
    latex: "C = \\frac{\\varepsilon_0 \\varepsilon S}{d}",
    variables: [
      { symbol: "C", name: "Sig'im", unit: "F", description: "Kondensator parametrli sig'imi" },
      { symbol: "ε₀", name: "El. doimiysi", unit: "F/m", description: "8.85·10⁻¹²" },
      { symbol: "ε", name: "Dielektrik", unit: "", description: "O'rtasidagi material xossasi (havo 1)" },
      { symbol: "S", name: "Yuza", unit: "m²", description: "Qoplamaning maydoni" },
      { symbol: "d", name: "Masofa", unit: "m", description: "Qoplamalar orasi" }
    ],
    calculator: {
      solveFor: "C",
      inputs: ["eps", "S", "d"],
      defaultValues: { eps: 2, S: 0.01, d: 0.001 },
      formulaFn: "(eps, s, d) => (8.85e-12 * eps * s) / d",
      resultUnit: "F",
      resultLabel: "Sig'im"
    },
    description: "Yassi qoplamalarga ega qurilma fizik o'lchamlari doirasida qanday miqdorda elektron toplay olishiga ko'rsatma.",
    example: "ε=2, S=0.01 m², d=1 mm. C = (8.85·10⁻¹² · 2 · 0.01) / 0.001 = 177 pF.",
    tags: ["tekis", "kondensator", "yuza", "dielektrik"],
    difficulty: 2, grade: 9, lesson_link: "kondensator-2", xp_reward: 10
  },

  // 11. Kondensator energiyasi
  {
    id: "elek_011",
    category: "elektrostatika",
    subcategory: "kondensator",
    name: "Kondensator energiyasi",
    nameRu: "Энергия заряженного конденсатора",
    formula: "W = C·U² / 2 = q² / (2C) = q·U / 2",
    latex: "W = \\frac{CU^2}{2} = \\frac{q^2}{2C}",
    variables: [
      { symbol: "W", name: "Energiya", unit: "J", description: "Kondensatorda to'plangan energiya" },
      { symbol: "C", name: "Sig'im", unit: "F", description: "Faradda sig'im" },
      { symbol: "U", name: "Kuchlanish", unit: "V", description: "Zaryadlangan potensial" }
    ],
    calculator: {
      solveFor: "W",
      inputs: ["C", "u"],
      defaultValues: { C: 1e-6, u: 220 },
      formulaFn: "(c, u) => (c * u * u) / 2",
      resultUnit: "J",
      resultLabel: "To'plangan energiya"
    },
    description: "Zaryadlangan kondensator elektr maydoni o'zida energiya saqlaydi deb hisoblanadi. Energiyani chaqnatish (qisqa tutashtirish) bilan ko'rish mumkin.",
    example: "C = 1 μF, U = 220 V. W = 10⁻⁶ · 220² / 2 = 0.0242 J.",
    tags: ["energiya", "kondensator", "kuchlanish", "maydon"],
    difficulty: 2, grade: 9, lesson_link: "kondensator-3", xp_reward: 10
  },

  // 12. Ketma-ket ulanish (Kondensator)
  {
    id: "elek_012",
    category: "elektrostatika",
    subcategory: "kondensator",
    name: "Ketma-ket ulanish",
    nameRu: "Последовательное соединение",
    formula: "1/C = 1/C₁ + 1/C₂",
    latex: "\\frac{1}{C} = \\frac{1}{C_1} + \\frac{1}{C_2}",
    variables: [
      { symbol: "C", name: "Umumiy sig'im", unit: "F", description: "Sistema umumiy sig'imi" },
      { symbol: "C₁, C₂", name: "Elektr sig'imlari", unit: "F", description: "Ulangan qurilmalar" }
    ],
    calculator: {
      solveFor: "C",
      inputs: ["C1", "C2"],
      defaultValues: { C1: 6, C2: 3 },
      formulaFn: "(c1, c2) => (c1 * c2) / (c1 + c2)",
      resultUnit: "F (v h.k)",
      resultLabel: "Umumiy ekvivalent sig'im"
    },
    description: "Kondensatorlar bir-biriga ketma-ket ulanganda zaryad q o'zgarmas saqlanadi, umumiy sig'imi esa doim ulardagi eng kichigidan ham kichik bo'ladi.",
    example: "C₁ = 6 μF, C₂ = 3 μF. C_umumiy = (6·3)/(6+3) = 18/9 = 2 μF.",
    tags: ["ulash", "ketma-ket", "kondensator", "sig'im"],
    difficulty: 2, grade: 9, lesson_link: "zanjir-1", xp_reward: 10
  },

  // 13. Parallel ulanish
  {
    id: "elek_013",
    category: "elektrostatika",
    subcategory: "kondensator",
    name: "Parallel ulanish",
    nameRu: "Параллельное соединение",
    formula: "C = C₁ + C₂",
    latex: "C = C_1 + C_2",
    variables: [
      { symbol: "C", name: "Umumiy sig'im", unit: "F", description: "Batareya sig'imi" },
      { symbol: "C₁, C₂", name: "Ulangan sig'imlar", unit: "F", description: "Plastinalarga biriktirilganlari" }
    ],
    calculator: {
      solveFor: "C",
      inputs: ["c1", "c2"],
      defaultValues: { c1: 4, c2: 5 },
      formulaFn: "(c1, c2) => Number(c1) + Number(c2)",
      resultUnit: "F (yoki mkF/nF)",
      resultLabel: "Ekvivalent sig'im"
    },
    description: "Kondensatorlar parallel yig'ilganda ulardagi kuchlanish U bir xil saqlanadi, lentalar ko'ndalang yuzi S ortib yagonadek harakat qilgani uchun sig'im yig'iladi.",
    example: "C₁ = 4 μF, C₂ = 5 μF. C_eq = 4+5 = 9 μF.",
    tags: ["parallel", "ulash", "kondensator", "sig'im"],
    difficulty: 1, grade: 9, lesson_link: "zanjir-1", xp_reward: 5
  },

  // 14. Elektr dipol
  {
    id: "elek_014",
    category: "elektrostatika",
    subcategory: "elektr_maydoni",
    name: "Elektr dipol momenti",
    nameRu: "Электрический дипольный момент",
    formula: "p = q · l",
    latex: "p = q l",
    variables: [
      { symbol: "p", name: "Dipol momenti", unit: "C·m", description: "Dipol kuchining vektori" },
      { symbol: "q", name: "Zaryad", unit: "C", description: "Nuqtaviy qutb zaryadi (moduli)" },
      { symbol: "l", name: "Masoqa (yelka)", unit: "m", description: "+q dan -q gacha bo'lgan yo'nalgan vektor" }
    ],
    calculator: {
      solveFor: "p",
      inputs: ["q", "l"],
      defaultValues: { q: 1.6e-19, l: 1e-10 },
      formulaFn: "(q, l) => q * l",
      resultUnit: "C·m",
      resultLabel: "Dipol momenti"
    },
    description: "Bir xil kattalikdagi va qarama-qarshi ishoradagi (-q va +q) ikkita qutbli elektron zaryad tizimi bo'lib moddalarning qutblanganini xarakterlaydi.",
    example: "Suv molekulasida elektron p ≈ 1.6e-19 C ko'paytirilgan radius atom e-10= 1.6e-29 Cm atrofida aylanadi.",
    tags: ["dipol", "moment", "zarra", "elektr"],
    difficulty: 3, grade: 11, lesson_link: "dipol", xp_reward: 15
  },

  // 15. Dielektrik o'tkazuvchanlik
  {
    id: "elek_015",
    category: "elektrostatika",
    subcategory: "elektr_maydoni",
    name: "Muhitning dielektrik o'tkazuvchanligi",
    nameRu: "Относительная диэлектрическая проницаемость",
    formula: "ε = E₀ / E",
    latex: "\\varepsilon = \\frac{E_0}{E}",
    variables: [
      { symbol: "ε", name: "Dielektrik", unit: "", description: "O'lchovsiz absolyut koeftsi" },
      { symbol: "E₀", name: "Maydon (vakuum)", unit: "V/m", description: "G'ovaksiz maydon kuchlanganligi" },
      { symbol: "E", name: "Maydon (muhit)", unit: "V/m", description: "Kuchsizlangan haqiqiy daxil" }
    ],
    calculator: {
      solveFor: "eps",
      inputs: ["E0", "E"],
      defaultValues: { E0: 200, E: 100 },
      formulaFn: "(e1, e2) => e1 / e2",
      resultUnit: "",
      resultLabel: "Dielektrik epsilon"
    },
    description: "Muhitning (namlik, shisha kabilarni) ichkariga kiradigan elektr zaryadlari bilan o'zini qanday ekranga olishi natijasida maydon necha marta ko'proq bosilishi.",
    example: "E₀ = 200, Shishaga kirganda E=100. ε = 200/100 = 2 (Suvda 81 bo'ladi).",
    tags: ["dielektrik", "ε", "kuchsizlanish", "maydon"],
    difficulty: 2, grade: 9, lesson_link: "dielektrik-1", xp_reward: 10
  },

  // 16. Elektr maydon energiyasi zichligi
  {
    id: "elek_016",
    category: "elektrostatika",
    subcategory: "kondensator",
    name: "Elektr maydon energiyasi zichligi",
    nameRu: "Плотность энергии электрического поля",
    formula: "w = ε₀·ε·E² / 2",
    latex: "w = \\frac{\\varepsilon_0 \\varepsilon E^2}{2}",
    variables: [
      { symbol: "w", name: "Energiya zichligi", unit: "J/m³", description: "Bir kubometr hajmdagi E maydon energiyasi" },
      { symbol: "ε₀", name: "El doimiysi", unit: "F/m", description: "Fazoviy ruxsat" },
      { symbol: "E", name: "Kuchlanganlik", unit: "V/m", description: "Energetik zichlik kvadratiga mos tushadi" }
    ],
    calculator: {
      solveFor: "w",
      inputs: ["eps", "E"],
      defaultValues: { eps: 1, E: 1000 },
      formulaFn: "(eps, E) => (8.85e-12 * eps * E * E) / 2",
      resultUnit: "J/m³",
      resultLabel: "Zichlik (w)"
    },
    description: "Fazoning muayyan hajmidagi elektr maydoni o'z inersiyasiga egami deb keladigan energiyaning metrik bahosi.",
    example: "ε=1 havo, E=1000 V/m. w = 8.85·10⁻¹² · 10⁶ / 2 ≈ 4.4×10⁻⁶ J/m³.",
    tags: ["energiya", "zichlik", "maydon zichligi", "volum", "E"],
    difficulty: 3, grade: 11, lesson_link: "maydon_energiya", xp_reward: 15
  },

  // ════════════════════════════════════════════════════════
  // ════════════════════════════════════════════════════════
  //  DOIMIY ELEKTR TOKI (tok_001 → tok_022)
  // ════════════════════════════════════════════════════════

  // 1. Elektr toki ta'rifi
  {
    id: "tok_001",
    category: "elektr_toki",
    subcategory: "tok_asoslari",
    name: "Elektr toki kuchi",
    nameRu: "Сила электрического тока",
    formula: "I = q / t",
    latex: "I = \\frac{q}{t}",
    variables: [
      { symbol: "I", name: "Tok kuchi", unit: "A", description: "O'tkazgichdan o'tayotgan tok" },
      { symbol: "q", name: "Zaryad", unit: "C", description: "O'zlashtirilgan o'tayotgan zaryad miqdori" },
      { symbol: "t", name: "Vaqt", unit: "s", description: "Jarayon vaqti" }
    ],
    calculator: {
      solveFor: "I",
      inputs: ["q", "t"],
      defaultValues: { q: 10, t: 2 },
      formulaFn: "(q, t) => q / t",
      resultUnit: "A",
      resultLabel: "Tok kuchi (I)"
    },
    description: "O'tkazgichning ko'ndalang kesimidan vaqt birligi ichida o'tib ketgan zaryad miqdori.",
    example: "2 sekundda 10 Kulon o'tdi. I = 10 / 2 = 5 A.",
    tags: ["tok", "amper", "zaryad", "vaqt", "I"],
    difficulty: 1, grade: 8, lesson_link: "elektr_tok", xp_reward: 5
  },

  // 2. Ohm qonuni (zanjir qismi)
  {
    id: "tok_002",
    category: "elektr_toki",
    subcategory: "ohm_qonuni",
    name: "Zanjir qismi uchun Om qonuni",
    nameRu: "Закон Ома для участка цепи",
    formula: "I = U / R",
    latex: "I = \\frac{U}{R}",
    variables: [
      { symbol: "I", name: "Tok kuchi", unit: "A", description: "Zanjir qismidagi tok" },
      { symbol: "U", name: "Kuchlanish", unit: "V", description: "Qism uchlaridagi potensiallar farqi" },
      { symbol: "R", name: "Qarshilik", unit: "Ω", description: "Elektr qarshiligi" }
    ],
    calculator: {
      solveFor: "I",
      inputs: ["U", "R"],
      defaultValues: { U: 220, R: 44 },
      formulaFn: "(u, r) => u / r",
      resultUnit: "A",
      resultLabel: "Izlangan tok (I)"
    },
    description: "O'tkazgichning qandaydir qismidagi tok kuchi uning uchlaridagi kuchlanishga to'g'ri proportsional va uning qarshiligiga teskari proportsional.",
    example: "U = 220 V, R = 44 Ω bo'lsa, tok kuchi I = 220 / 44 = 5 A.",
    tags: ["ohm", "om", "tok kuchi", "kuchlanish", "qarshilik"],
    difficulty: 1, grade: 8, lesson_link: "om_qonuni_1", xp_reward: 5
  },

  // 3. Qarshilik formulasi
  {
    id: "tok_003",
    category: "elektr_toki",
    subcategory: "qarshilik",
    name: "O'tkazgich qarshiligi",
    nameRu: "Сопротивление проводника",
    formula: "R = ρ·l / S",
    latex: "R = \\frac{\\rho l}{S}",
    variables: [
      { symbol: "R", name: "Qarshilik", unit: "Ω", description: "Umumiy elektr qarshilik" },
      { symbol: "ρ", name: "Solish. qarshilik", unit: "Ω·mm²/m (yoki Ω·m)", description: "Modda ko'rsatkichi" },
      { symbol: "l", name: "Uzunligi", unit: "m", description: "Sim / o'tkazgich uzunligi" },
      { symbol: "S", name: "Ko'ndalang yuza", unit: "mm²", description: "Kesim yuzi" }
    ],
    calculator: {
      solveFor: "R",
      inputs: ["rho", "l", "S"],
      defaultValues: { rho: 0.017, l: 100, S: 2 },
      formulaFn: "(rho, l, s) => (rho * l) / s",
      resultUnit: "Ω",
      resultLabel: "R (Qarshilik)"
    },
    description: "Elektr qarshilik moddaning tabiatiga (solishtirma qarshiligiga), uning uzunligiga, shuningdek yo'g'onligiga tayanadi.",
    example: "Mis uchin ρ ≈ 0.017. 100 m sim va 2 mm² yo'g'onlashtirilgan: R = 0.017·100 / 2 = 0.85 Ω.",
    tags: ["qarshilik", "rho", "solishtirma", "sim"],
    difficulty: 2, grade: 8, lesson_link: "qarshilik_1", xp_reward: 10
  },

  // 4. Qarshilikning temperaturaga bog'liqligi
  {
    id: "tok_004",
    category: "elektr_toki",
    subcategory: "qarshilik",
    name: "Qarshilikning temperaturaga bog'liqligi",
    nameRu: "Зависимость сопротивления от температуры",
    formula: "R = R₀·(1 + α·ΔT)",
    latex: "R = R_0 (1 + \\alpha \\Delta T)",
    variables: [
      { symbol: "R", name: "Yangi qarshilik", unit: "Ω", description: "Qizigach qarshilik qiymati" },
      { symbol: "R₀", name: "Boshlang'ich R", unit: "Ω", description: "Odatda 0 yoki 20°C dagi" },
      { symbol: "α", name: "Term koeffitsient", unit: "1/K", description: "Modda parametri" },
      { symbol: "ΔT", name: "Harorat o'zgarishi", unit: "K", description: "Qancha qiziganligi" }
    ],
    calculator: {
      solveFor: "R",
      inputs: ["R0", "alpha", "dT"],
      defaultValues: { R0: 10, alpha: 0.004, dT: 50 },
      formulaFn: "(r0, al, dt) => r0 * (1 + al * dt)",
      resultUnit: "Ω",
      resultLabel: "R (Yangi qarshiligi)"
    },
    description: "Metallarning qarshiligi harorat oshishi bilan mutanosib o'sadi, yarimo'tkazgichlarda esa kamayadi. Bu yerda asosan metall formula.",
    example: "R₀ = 10 Ω, α = 0.004, qizish 50 gradus: R = 10(1 + 0.004·50) = 10(1 + 0.2) = 12 Ω.",
    tags: ["harorat", "qarshilik", "alpha", "qizish"],
    difficulty: 2, grade: 10, lesson_link: "tok_harorat", xp_reward: 10
  },

  // 5. Ketma-ket ulanish (R)
  {
    id: "tok_005",
    category: "elektr_toki",
    subcategory: "qarshilik",
    name: "Qarshiliklarni ketma-ket ulanishi",
    nameRu: "Последовательное соединение проводников",
    formula: "R = R₁ + R₂ + R₃ ...",
    latex: "R = R_1 + R_2 + R_3",
    variables: [
      { symbol: "R", name: "Umumiy", unit: "Ω", description: "Zanjir umumiy qarshiligi" },
      { symbol: "R₁", name: "1-chi uzluksiz", unit: "Ω", description: "Qarshilik elementi" },
      { symbol: "R₂", name: "2-chi uzluksiz", unit: "Ω", description: "Qarshilik elementi" }
    ],
    calculator: {
      solveFor: "R",
      inputs: ["r1", "r2"],
      defaultValues: { r1: 5, r2: 15 },
      formulaFn: "(r1, r2) => Number(r1) + Number(r2)",
      resultUnit: "Ω",
      resultLabel: "Umumiy ekvivalent R"
    },
    description: "Ikkita yoki undan ortiq sim ketma-ket ulanganida poyezd singari qarshilik qo'shilib boradi, tok kuchi esa aynan hammada bir xil I o'tadi.",
    example: "5 va 15 va 10 ohmlik qarshiliklar: R = 5+15+10 = 30 Ω.",
    tags: ["ketma-ket", "qarshilik", "ulash", "zanjir"],
    difficulty: 1, grade: 8, lesson_link: "zanjir_qoidasi", xp_reward: 5
  },

  // 6. Parallel ulash umumiy
  {
    id: "tok_006",
    category: "elektr_toki",
    subcategory: "qarshilik",
    name: "Qarshiliklarni parallel ulanishi",
    nameRu: "Параллельное соединение",
    formula: "1/R = 1/R₁ + 1/R₂ ...",
    latex: "\\frac{1}{R} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots",
    variables: [
      { symbol: "R", name: "Tarmoq tortkimi", unit: "Ω", description: "Parallel qism ekvivalenti" },
      { symbol: "R₁", name: "1-tarmoq", unit: "Ω", description: "Boshqa tok o'tish yuli" },
      { symbol: "R₂", name: "2-tarmoq", unit: "Ω", description: "Parallel shoxobcha" }
    ],
    calculator: {
      solveFor: "R",
      inputs: ["r1", "r2"],
      defaultValues: { r1: 6, r2: 3 },
      formulaFn: "(r1, r2) => 1 / (1/r1 + 1/r2)",
      resultUnit: "Ω",
      resultLabel: "Guruh ekvivalent"
    },
    description: "Tarmoqlangan shartlarda zaryad o'qlariga alternativ yo'l paydo bo'ladi bu esa zanjir umumiy qarshiligi tushishini kafolatlaydi, U kuchlanish barqaror bo'ladi.",
    example: "6 va 3 ohmli sim parallel bog'landi: 1/R = 1/6 + 1/3 = 1/2. Demak R = 2 Ω.",
    tags: ["parallel", "qarshilik", "ulanish"],
    difficulty: 2, grade: 8, lesson_link: "zanjir_qoidasi", xp_reward: 10
  },

  // 7. Ikki parallel R (soddalashgan formula)
  {
    id: "tok_007",
    category: "elektr_toki",
    subcategory: "qarshilik",
    name: "Ikki resistor parallel (qisqa)",
    nameRu: "Два резистора параллельно",
    formula: "R = (R₁·R₂) / (R₁ + R₂)",
    latex: "R = \\frac{R_1 R_2}{R_1 + R_2}",
    variables: [
      { symbol: "R", name: "Umumiy", unit: "Ω", description: "Ikkita rezistor" },
      { symbol: "R₁", name: "R1", unit: "Ω", description: "" },
      { symbol: "R₂", name: "R2", unit: "Ω", description: "" }
    ],
    calculator: {
      solveFor: "R",
      inputs: ["r1", "r2"],
      defaultValues: { r1: 10, r2: 10 },
      formulaFn: "(r1, r2) => (r1 * r2) / (Number(r1) + Number(r2))",
      resultUnit: "Ω",
      resultLabel: "Tayyor R"
    },
    description: "Faqat IKKITA qarshilik uchun qulay kasr. Yuqori ko'paytma, pastki qismi esa yig'indi.",
    example: "10 va 10 ohmlik qarshilik: R = (10·10)/(10+10) = 100/20 = 5 Ω.",
    tags: ["ikki", "parallel", "tez", "resistor"],
    difficulty: 1, grade: 8, lesson_link: "zanjir_qoidasi", xp_reward: 5
  },

  // 8. Elektr quvvat
  {
    id: "tok_008",
    category: "elektr_toki",
    subcategory: "quvvat_energiya",
    name: "To'g'ri tokning elektr quvvati",
    nameRu: "Мощность постоянного тока",
    formula: "P = U·I = I²·R = U² / R",
    latex: "P = UI = I^2 R = \\frac{U^2}{R}",
    variables: [
      { symbol: "P", name: "Elektr quvvat", unit: "W (Vatt)", description: "Elektr tizimi ishlash tezligi" },
      { symbol: "U", name: "Kuchlanish", unit: "V", description: "Qismdagi farq" },
      { symbol: "I", name: "Tok", unit: "A", description: "Jarayon amperi" },
      { symbol: "R", name: "Qarshilik", unit: "Ω", description: "O'zini namoziyat qilgan moslama R" }
    ],
    calculator: {
      solveFor: "P",
      inputs: ["U", "I"],
      defaultValues: { U: 220, I: 5 },
      formulaFn: "(u, i) => u * i",
      resultUnit: "W",
      resultLabel: "Aktiv quvvat"
    },
    description: "Birlik vaqt ichida qilingan ish yoki ajralgan issiqlik asosan jismdagi tok kuchi orqali U va I ning to'g'ridan to'g'ri mahsuli sanaladi.",
    example: "Lampa 220V tok tarmogida 5A olmoqda. Uning quvvati = 220 · 5 = 1100 W (1.1 kW).",
    tags: ["quvvat", "P", "vatt"],
    difficulty: 1, grade: 8, lesson_link: "quvvat", xp_reward: 5
  },

  // 9. Elektr energiyasi (Ish)
  {
    id: "tok_009",
    category: "elektr_toki",
    subcategory: "quvvat_energiya",
    name: "Elektr energiyasi ishi",
    nameRu: "Работа электрического тока",
    formula: "W = P·t = U·I·t",
    latex: "W = A = U I t",
    variables: [
      { symbol: "W (A)", name: "Ish / Energiya", unit: "J (Wh)", description: "Hisoblagich (schetchik) yozuvchi ko'lam" },
      { symbol: "P", name: "Quvvati", unit: "W", description: "" },
      { symbol: "t", name: "Vaqt", unit: "s", description: "Yongan / ishlagan muddat" }
    ],
    calculator: {
      solveFor: "W",
      inputs: ["P", "t"],
      defaultValues: { P: 1000, t: 3600 },
      formulaFn: "(p, t) => p * t",
      resultUnit: "J",
      resultLabel: "Bajarilgan ish/Energiya"
    },
    description: "Elektr moslamalari muayyan quvvat bilan (P=UI) necha vaqt sarflasalar roppa-rosa shuningdek elektr maydonidan mexanik yoki issiqlik amali o'tgan sanaladi.",
    example: "1 kW (1000 W) pechka 1 soat (3600s) ishlasa W = 1000 · 3600 = 3,600,000 Joul (yoki 1 kV-soat).",
    tags: ["ish", "energiya", "kVsot", "quvvat", "zanjir"],
    difficulty: 2, grade: 8, lesson_link: "elektr_ish", xp_reward: 10
  },

  // 10. Ohm qonuni (to'liq)
  {
    id: "tok_010",
    category: "elektr_toki",
    subcategory: "toliiq_zanjir",
    name: "To'liq zanjir uchun Om qonuni",
    nameRu: "Закон Ома для полной цепи",
    formula: "I = ε / (R + r)",
    latex: "I = \\frac{\\mathcal{E}}{R + r}",
    variables: [
      { symbol: "I", name: "Zanjir toki", unit: "A", description: "Glavniy magistraldagi" },
      { symbol: "ε", name: "EMK", unit: "V", description: "Elektr yurituvchi kuch (Batareya voltaji)" },
      { symbol: "R", name: "Tashqi qar", unit: "Ω", description: "Foydali lampochkalar qatori" },
      { symbol: "r", name: "Ichki qar", unit: "Ω", description: "Manbaning (elektorlitning) o'z qarshiligi" }
    ],
    calculator: {
      solveFor: "I",
      inputs: ["E", "R", "r"],
      defaultValues: { E: 12, R: 5, r: 1 },
      formulaFn: "(eps, r1, r2) => eps / (Number(r1) + Number(r2))",
      resultUnit: "A",
      resultLabel: "Asosiy tok (I)"
    },
    description: "Real batareyalar o'n minglab marta zarb yeb sekin ishdan chiqadi: ular o'z 'ichki qarshilik'(r) degan dushmaniga ega bo'lib, energiya qisman yo'qotiladi.",
    example: "ε = 12 V (akkumulyator), r=1 Ω. Chiroq R=5 Ω. I = 12 / (5 + 1) = 12 / 6 = 2 A.",
    tags: ["EMK", "om", "to'liq", "ichki qarshilik"],
    difficulty: 2, grade: 10, lesson_link: "tolik_om", xp_reward: 10
  },

  // 11. Terminal kuchlanish
  {
    id: "tok_011",
    category: "elektr_toki",
    subcategory: "toliiq_zanjir",
    name: "Manbaning tashqi terminal uchi kuchlanishi",
    nameRu: "Напряжение на клеммах источника",
    formula: "U = ε - I·r",
    latex: "U = \\mathcal{E} - I r",
    variables: [
      { symbol: "U", name: "Tashqi qismga keladigan voltaj", unit: "V", description: "Klemma kuchlanish" },
      { symbol: "ε", name: "EMK", unit: "V", description: "Tok yo'g'idagi kuchlanish" },
      { symbol: "I", name: "O'tayotgan tok", unit: "A", description: "Umumiy" },
      { symbol: "r", name: "Ichki q.", unit: "Ω", description: "Manba qarshiligi" }
    ],
    calculator: {
      solveFor: "U",
      inputs: ["E", "I", "r"],
      defaultValues: { E: 12, I: 2, r: 1 },
      formulaFn: "(eps, i, r) => eps - (i * r)",
      resultUnit: "V",
      resultLabel: "Volt (U)"
    },
    description: "Manbadan zanjir yopiq holda tashqariga tok oqayotgan paytda tashkil topgan kuchlanish uning ichidagi tushish I·r miqdorisiz namoyon bo'ladi.",
    example: "EMK = 12, tok 2 A bo'lsa va r=1 bo'lsa: Klemma tashqariga: U = 12 - 2·1 = 10 V qoldi.",
    tags: ["klemma", "U", "pasayish", "emk"],
    difficulty: 2, grade: 10, lesson_link: "tolik_om", xp_reward: 10
  },

  // 12. Qisqa tutashuv
  {
    id: "tok_012",
    category: "elektr_toki",
    subcategory: "toliiq_zanjir",
    name: "Qisqa tutashuv toki",
    nameRu: "Ток короткого замыкания",
    formula: "I_qt = ε / r",
    latex: "I_{kz} = \\frac{\\mathcal{E}}{r}",
    variables: [
      { symbol: "I_qt", name: "Qisqa tok", unit: "A", description: "Maksimal oqim imkoni" },
      { symbol: "ε", name: "EMK", unit: "V", description: "Manba kuchi" },
      { symbol: "r", name: "Ichki q.", unit: "Ω", description: "Juda kichik, batareyaning o'zi munosib emas toki" }
    ],
    calculator: {
      solveFor: "I_qt",
      inputs: ["E", "r"],
      defaultValues: { E: 12, r: 0.1 },
      formulaFn: "(eps, r) => eps / r",
      resultUnit: "A",
      resultLabel: "Dahshatli max tok"
    },
    description: "Tashqi zanjir R qiymati 0 ga tushib qolsa (sim ikkita uchi ulanib qolsa), I_qt faqat EMK ga va juda kichik ichki R ga suyanadi. Yong'in kelib chiqishi mumkin.",
    example: "Avtomobil batareyasi: 12V, ichki r = 0.05 Ω. Sim yonsa I_qt = 12/0.05 = 240 Amper uradi.",
    tags: ["qisqa", "tutashuv", "klimatik", "tok"],
    difficulty: 2, grade: 10, lesson_link: "qisqa_tutashuv", xp_reward: 10
  },

  // 13. Kirxgoff 1 tugun
  {
    id: "tok_013",
    category: "elektr_toki",
    subcategory: "kirxgof",
    name: "Kirxgofning 1-qonuni (tugun)",
    nameRu: "Первое правило Кирхгофа (для узлов)",
    formula: "ΣI = 0  (Σ I_kirdi = Σ I_chiqdi)",
    latex: "\\sum_{i=1}^{n} I_i = 0",
    variables: [
      { symbol: "I_kirdi", name: "Kirayotgan toklar yig'indisi", unit: "A", description: "" },
      { symbol: "I_chiq", name: "Tugunni tark etuvchilar yig'", unit: "A", description: "" }
    ],
    calculator: {
      solveFor: "I_unknown",
      inputs: ["I_in1", "I_in2", "I_out1"],
      defaultValues: { I_in1: 3, I_in2: 2, I_out1: 4 },
      formulaFn: "(in1, in2, out1) => Number(in1) + Number(in2) - Number(out1)",
      resultUnit: "A",
      resultLabel: "Yana bir chiquvchi tarmoq (I2)"
    },
    description: "Tarmoqlangan simlar nuqtasiga qancha elektron oqib kelsa, tushib qolmasdan o'shancha ketishini (zaryad yig'ilmasligini) bildiradi.",
    example: "Tugunga I₁=3A, I₂=2A tok kiryapti, bittasidan I₃=4A chqyapti, uchinchi tarmoq orqali 3+2-4 = 1 A chiqib ketadi.",
    tags: ["kirxgof", "tugun", "tok", "qonun"],
    difficulty: 3, grade: 10, lesson_link: "kirxgof", xp_reward: 15
  },

  // 14. Kirxgoff 2 kontur
  {
    id: "tok_014",
    category: "elektr_toki",
    subcategory: "kirxgof",
    name: "Kirxgofning 2-qonuni (kontur)",
    nameRu: "Второе правило Кирхгофа",
    formula: "Σ(EMK) = Σ(I·R)",
    latex: "\\sum \\mathcal{E} = \\sum I R",
    variables: [
      { symbol: "Σ(EMK)", name: "Konturdagi EMKlar algebrayik sum", unit: "V", description: "Yo'nalish bo'yicha kuch" },
      { symbol: "Σ(I·R)", name: "Kuchlanish tushishlar xulosa", unit: "V", description: "Element xus. uzaytirish" }
    ],
    calculator: {
      solveFor: "E",
      inputs: ["I1", "R1", "I2", "R2"],
      defaultValues: { I1: 2, R1: 4, I2: 1, R2: 2 },
      formulaFn: "(i1, r1, i2, r2) => i1*r1 + i2*r2",
      resultUnit: "V",
      resultLabel: "Umumiy EMK summasi konturda"
    },
    description: "Yopiq elektr kontur bo'ylab aylanib chiqqanda barcha manbalar taminlayotgan va elektr qarshilikda yondirilayotgan toklarni o'zaro tengligini tekshiradi (Energ. saqlanish konturida).",
    example: "Yo'nalishdagi 2 ta qurilma biridan U=2·4=8V, ikkinchiidan 1·2=2V egan. Kontur emk roppa rosa 10 V bo'ladi.",
    tags: ["kontur", "kirxgof", "tarmoq", "2-chi"],
    difficulty: 3, grade: 10, lesson_link: "kirxgof", xp_reward: 20
  },

  // 15. Batareyalar ketma ket
  {
    id: "tok_015",
    category: "elektr_toki",
    subcategory: "toliiq_zanjir",
    name: "Batareyalar ketma-ket yig'ilganida EMK",
    nameRu: "Последовательное соединение источников ЭДС",
    formula: "ε_u = Σε_i, r_u = Σr_i",
    latex: "\\mathcal{E}_u = \\mathcal{E}_1 + \\dots, \\ r_u = r_1 + \\dots",
    variables: [
      { symbol: "ε_u", name: "Yig'ilgan batareyalar emksi", unit: "V", description: "Polusga qutbga o'tkazilganda" },
      { symbol: "r_u", name: "Ichki massiv qars", unit: "Ω", description: "Orqaligidagi" }
    ],
    calculator: {
      solveFor: "eps_u",
      inputs: ["e1", "n"],
      defaultValues: { e1: 1.5, n: 4 },
      formulaFn: "(e1, n) => e1 * n",
      resultUnit: "V",
      resultLabel: "Yangi EMK quvvat (batareya)"
    },
    description: "1.5 V ekan palchik batareykani zaryadsizlanib tugashida + / - ulab to'plaganda 6V kuchlanish olib kelish. Qulay, ammo umumiy oqim ko'paymaydi.",
    example: "Umumiy formula 4 dona 1.5 V li AA batareykalari ulanganida EMK: 6 V ga yetadi.",
    tags: ["batareya", "ketma-ket", "kuchlanish"],
    difficulty: 2, grade: 10, lesson_link: "batareya", xp_reward: 10
  },

  // 16. Batareyalar parallel
  {
    id: "tok_016",
    category: "elektr_toki",
    subcategory: "toliiq_zanjir",
    name: "Bir xil batareyalar parallel",
    nameRu: "Параллельное соединение одинаковых источников ЭДС",
    formula: "ε_u = ε, r_u = r / n",
    latex: "\\mathcal{E}_u = \\mathcal{E}, \\ r_u = \\frac{r}{n}",
    variables: [
      { symbol: "ε_u", name: "Javob batareya voltaji", unit: "V", description: "Tarmoq quvvati o'zgarmasligi" },
      { symbol: "n", name: "Batareylar soni", unit: "", description: "" }
    ],
    calculator: {
      solveFor: "I_max",
      inputs: ["E", "R", "r", "n"],
      defaultValues: { E: 12, R: 5, r: 0.5, n: 2 },
      formulaFn: "(E, R, r, n) => E / (Number(R) + (r/n))",
      resultUnit: "A",
      resultLabel: "Umumiy quvvat oqimi ortishidagi tok"
    },
    description: "Akkumulyatorlarni quvvat muddati / tok sig'ishini ko'paytirish maqsadida qo'shganida batareyalarning terminal kuchlanish o'zgarmaydi. Biroq ichki qarshilik R keskin ozayib, ko'proq tok bera olishi mimkin bo'ladi.",
    example: "Ikkita 12 V / r=0.5. ε qaladi 12, r=0.25 buladi. Katta mashina motorini yoqishga ko'proq tok chiqadi.",
    tags: ["parallel", "akkumulyator", "emk"],
    difficulty: 3, grade: 10, lesson_link: "batareya", xp_reward: 15
  },

  // 17. Joul lens
  {
    id: "tok_017",
    category: "elektr_toki",
    subcategory: "quvvat_energiya",
    name: "Joul-Lents qonuni",
    nameRu: "Закон Джоуля-Ленца",
    formula: "Q = I²·R·t",
    latex: "Q = I^2 R t",
    variables: [
      { symbol: "Q", name: "Ajralgan issiqlik", unit: "J", description: "Isish miqdori" },
      { symbol: "I", name: "Tok", unit: "A", description: "Oqovatgan sim poyezdi" },
      { symbol: "R", name: "Qarshilik", unit: "Ω", description: "Chigiladigan ko'prik yo'qolishida" },
      { symbol: "t", name: "Vaqti", unit: "s", description: "Sekund" }
    ],
    calculator: {
      solveFor: "Q",
      inputs: ["I", "R", "t"],
      defaultValues: { I: 2, R: 10, t: 60 },
      formulaFn: "(i, r, t) => i * i * r * t",
      resultUnit: "J",
      resultLabel: "Issiqlik (Joule)"
    },
    description: "Tok o'tayotgan o'tkazgich qizib, tashqariga uzatiladigan issiqlik energiyasi. Formulada tok kvadrati bilan katta ahamiyat tug'diradi quvvat yo'qolishiga.",
    example: "I=2A, R=10 Ohm qarshilik t=60 sek ishlasa, Q = 2² · 10 · 60 = 4 · 600 = 2400 J olov qzish xavfi.",
    tags: ["Joul lents", "isish", "kabel qizib"],
    difficulty: 1, grade: 8, lesson_link: "joul", xp_reward: 5
  },

  // 18. Elektr o'tkazuvchanlik
  {
    id: "tok_018",
    category: "elektr_toki",
    subcategory: "qarshilik",
    name: "Elektr o'tkazuvchanlik (Simens)",
    nameRu: "Электрическая проводимость",
    formula: "G = 1 / R",
    latex: "G = \\frac{1}{R}",
    variables: [
      { symbol: "G", name: "Otkazuvchisi", unit: "S (Simens)", description: "Yuqori bolsa shuncha xursand" },
      { symbol: "R", name: "Elektr to'siqsi", unit: "Ω", description: "" }
    ],
    calculator: {
      solveFor: "G",
      inputs: ["R"],
      defaultValues: { R: 0.5 },
      formulaFn: "(r) => 1 / r",
      resultUnit: "S",
      resultLabel: "O'tkazuvchanlik G"
    },
    description: "Qarshilikka mutlaqo teskari kattalik bo'lib, zanjir orqali elektronlarni yugurtirishga material qanchalik tayyorligini moliya qiladi.",
    example: "R = 0.5 Ω. G = 1/0.5 = 2 Simens.",
    tags: ["simens", "otkazuvhan", "qarshilik tekkis"],
    difficulty: 2, grade: 10, lesson_link: "otkazuv", xp_reward: 10
  },

  // 19. Tok zichligi
  {
    id: "tok_019",
    category: "elektr_toki",
    subcategory: "tok_asoslari",
    name: "Elektr toki zichligi",
    nameRu: "Плотность тока",
    formula: "j = I / S",
    latex: "j = \\frac{I}{S}",
    variables: [
      { symbol: "j", name: "Zichlik vektori", unit: "A/m²", description: "Sirtdan tik o'tuvchi tarqatish" },
      { symbol: "I", name: "Tok", unit: "A", description: "Liniyani bosgan" },
      { symbol: "S", name: "Umumiy ko'ndalang", unit: "m²", description: "Yuzasi" }
    ],
    calculator: {
      solveFor: "j",
      inputs: ["I", "S"],
      defaultValues: { I: 10, S: 0.0001 },
      formulaFn: "(i, s) => i / s",
      resultUnit: "A/m²",
      resultLabel: "Tok zichligi j"
    },
    description: "Kattagina kabellar ichida barcha hajm / kesim teng munosabati tok tashiyotganini baholaydi.",
    example: "10 A toki 1 sm² (0.0001 m²) simdan o'tmoqda, j = 10 / 0.0001 = 100,000 A/m².",
    tags: ["zichlik", "qalin sim", "j"],
    difficulty: 2, grade: 10, lesson_link: "tok_asoslari_2", xp_reward: 10
  },

  // 20. Drift tezligi
  {
    id: "tok_020",
    category: "elektr_toki",
    subcategory: "tok_asoslari",
    name: "Zaryad tashuvchilarning drift(tartibli) tezligi",
    nameRu: "Скорость дрейфа носителей заряда",
    formula: "v = I / (n·q·S)",
    latex: "v = \\frac{I}{n q S}",
    variables: [
      { symbol: "v", name: "Tezlik(o'rtacha)", unit: "m/s", description: "Erkin e- tezligi (taxmin 1mm/s larda)" },
      { symbol: "n", name: "Konsentratsiya", unit: "1/m³", description: "1 metr kubdagi zaryadcha soni" },
      { symbol: "q", name: "Elektron zaryadi", unit: "C", description: "e = 1.6×10⁻¹⁹" }
    ],
    calculator: {
      solveFor: "v",
      inputs: ["I", "n", "S"],
      defaultValues: { I: 2, n: 8e28, S: 1e-6 },
      formulaFn: "(i, n, s) => i / (n * 1.6e-19 * s)",
      resultUnit: "m/s",
      resultLabel: "Tezlik v"
    },
    description: "Elektronlar yorug'lik tezligida informatsiya tarqatyapti deb aytsakda, ularning tom mutlaq o'zlari o'tkazgich bo'ylab asalaridek 1 mm/s tezlikda ilgarilaydi xolos (qiyos uchun).",
    example: "n=8×10²⁸ mis uchun. S=1mm², I=2A. v = 2 / (8e28 * 1.6e-19 * 1e-6) ≈ 0.15 mm/s.",
    tags: ["drift", "tezlik", "konsentratsiya", "elektron"],
    difficulty: 3, grade: 10, lesson_link: "drift", xp_reward: 15
  },

  // 21. Pot farq va kuchlanish
  {
    id: "tok_021",
    category: "elektr_toki",
    subcategory: "tok_asoslari",
    name: "Potensiallar farqi doimiy yuzasi",
    nameRu: "Разность потенциалов",
    formula: "U = φ₁ - φ₂",
    latex: "U_{AB} = \\phi_A - \\phi_B",
    variables: [
      { symbol: "U", name: "Kuchlanish chiziqda", unit: "V", description: "Tokning suv kabi oqimi bo'lishini kafolati" },
      { symbol: "φ", name: "Volt quvvat asosi", unit: "V", description: "Energiya garmonikasi" }
    ],
    calculator: {
      solveFor: "U",
      inputs: ["phiA", "phiB"],
      defaultValues: { phiA: 100, phiB: 40 },
      formulaFn: "(a, b) => a - b",
      resultUnit: "V",
      resultLabel: "Farq U"
    },
    description: "Doimiy tok barqaror ishlashi uchun bitta terminal(nuqta) da potensial doim yuqori bolishi tartibini qanoati.",
    example: "Mankadagi A sim uzilgan joyda 100V. B chiziqda u 40V, chiroq bundoq ulanganda aslida 60V kuchlanish oladi faqat.",
    tags: ["potensial", "farqi", "phi", "U"],
    difficulty: 1, grade: 8, lesson_link: "om_qonuni_1", xp_reward: 5
  },

  // 22. Manba FIK
  {
    id: "tok_022",
    category: "elektr_toki",
    subcategory: "toliiq_zanjir",
    name: "Zanjir va Batareya foydali ish koeffitsienti",
    nameRu: "КПД источника тока",
    formula: "η = P_foy / P_to'liq = R / (R + r)",
    latex: "\\eta = \\frac{R}{R + r}",
    variables: [
      { symbol: "η", name: "FIK", unit: "ulush", description: "Samarali amaliyat yigindisi" },
      { symbol: "R", name: "Tashqi chiroq/moslama R", unit: "Ω", description: "Foydali bo'lgan ishchi R" },
      { symbol: "r", name: "Batareya ichi qaynoq r", unit: "Ω", description: "Zararli to'sqinchi isishni olib keladi" }
    ],
    calculator: {
      solveFor: "eta",
      inputs: ["R", "r"],
      defaultValues: { R: 4, r: 1 },
      formulaFn: "(R, r) => Number(R) / (Number(R) + Number(r))",
      resultUnit: "Foiz % u-n (ko'p 100ga)",
      resultLabel: "Bajarish koeffitsienti ulush"
    },
    description: "Reallikda batareyalar tashqi simning R qiymatiga teng shart ostida bog'lansa energiyani eng ko'p uza oladi ammo bu vaqtda 50% quvvati isrof bo'lish bilan kuzatilib qoladi (FIK = R/(R+R) = 0.5).",
    example: "R=4 lampa, r=1 ichki motor. η = 4 / 5 = 0.8 => 80% samarador uzatadi. ",
    tags: ["fik", "batareya", "quvvat uzatish"],
    difficulty: 3, grade: 10, lesson_link: "fik", xp_reward: 15
  },

  // ════════════════════════════════════════════════════════
  //  MAGNIT MAYDONI (mag_001 → mag_014)
  // ════════════════════════════════════════════════════════

  // 1. Amper kuchi
  {
    id: "mag_001",
    category: "magnit",
    subcategory: "amper_lorents",
    name: "Amper kuchi",
    nameRu: "Сила Ампера",
    formula: "F = B·I·L·sinα",
    latex: "F = B I L \\sin\\alpha",
    variables: [
      { symbol: "F", name: "Amper kuchi", unit: "N", description: "Magnit maydonning tokli simga ta'siri" },
      { symbol: "B", name: "Magnit induksiya", unit: "T (Tesla)", description: "Maydon kuchi" },
      { symbol: "I", name: "Tok kuchi", unit: "A", description: "Simdan o'tayotgan tok" },
      { symbol: "L", name: "Sim uzunligi", unit: "m", description: "Maydon ichidagi sim qismi" },
      { symbol: "α", name: "Burchak", unit: "grad", description: "Tok va induksiya vektorlari orasidagi" }
    ],
    calculator: {
      solveFor: "F",
      inputs: ["B", "I", "L", "alpha"],
      defaultValues: { B: 0.5, I: 2, L: 0.2, alpha: 90 },
      formulaFn: "(b, i, l, alpha) => b * i * l * Math.sin(alpha * Math.PI / 180)",
      resultUnit: "N",
      resultLabel: "Amper kuchi"
    },
    description: "Magnit maydonida yotgan va tok o'tayotgan har qanday o'tkazgichga maydon chetga suruvchi maxsus kuch bilan ta'sir qiladi.",
    example: "B = 0.5 T, I = 2 A, L = 0.2 m sim maydonga perpendikulyar yotibdi (sin90=1). F = 0.5·2·0.2·1 = 0.2 N.",
    tags: ["amper", "kuch", "magnit", "tok"],
    difficulty: 2, grade: 8, lesson_link: "amper_kuchi", xp_reward: 10
  },

  // 2. To'g'ri o'tkazgich magnit maydoni
  {
    id: "mag_002",
    category: "magnit",
    subcategory: "magnit_maydoni",
    name: "To'g'ri tokning magnit maydoni",
    nameRu: "Магнитное поле прямого тока",
    formula: "B = μ₀·I / (2π·r)",
    latex: "B = \\frac{\\mu_0 I}{2\\pi r}",
    variables: [
      { symbol: "B", name: "Induksiya", unit: "T", description: "Sim atrofidagi maydon kuchlanganligi" },
      { symbol: "μ₀", name: "Magnit doimiy", unit: "T·m/A", description: "4π × 10⁻⁷" },
      { symbol: "I", name: "Tok", unit: "A", description: "Simdagi oqim" },
      { symbol: "r", name: "Masofa", unit: "m", description: "Sim markazidan kuzatuv nuqtasigacha" }
    ],
    calculator: {
      solveFor: "B",
      inputs: ["I", "r"],
      defaultValues: { I: 10, r: 0.1 },
      formulaFn: "(i, r) => (4 * Math.PI * 1e-7 * i) / (2 * Math.PI * r)",
      resultUnit: "T",
      resultLabel: "Magnit maydoni (B)"
    },
    description: "Cheksiz uzun to'g'ri sim atrofida hosil bo'lgan aylanma magnit maydonining uzoqlashgan sari susayishini ko'rsatadi.",
    example: "10 A tok asab simidan r = 0.1 m masofadagi B ni topamiz. B = 2·1e-7·10 / 0.1 = 20 μT.",
    tags: ["sim", "B", "magnit maydoni", "to'g'ri tok"],
    difficulty: 2, grade: 10, lesson_link: "magnit_maydoni_1", xp_reward: 10
  },

  // 3. Solenoid ichidagi magnit maydoni
  {
    id: "mag_003",
    category: "magnit",
    subcategory: "magnit_maydoni",
    name: "Solenoid ichidagi magnit maydoni",
    nameRu: "Магнитное поле внутри соленоида",
    formula: "B = μ₀·μ·n·I",
    latex: "B = \\mu_0 \\mu n I",
    variables: [
      { symbol: "B", name: "Solenoid induksiyasi", unit: "T", description: "" },
      { symbol: "μ₀", name: "Magnit doimiysi", unit: "", description: "4π × 10⁻⁷" },
      { symbol: "μ", name: "Muhit magnit", unit: "", description: "Nisbiy kirituvchanlik (havoda 1)" },
      { symbol: "n", name: "O'ram zichligi", unit: "1/m", description: "1 metr uzunlikka mos keluvchi o'ramlar (N/L)" },
      { symbol: "I", name: "Tok", unit: "A", description: "O'ramlardan aylanayotgan tok" }
    ],
    calculator: {
      solveFor: "B",
      inputs: ["mu", "n", "I"],
      defaultValues: { mu: 1, n: 1000, I: 2 },
      formulaFn: "(mu, n, i) => 4 * Math.PI * 1e-7 * mu * n * i",
      resultUnit: "T",
      resultLabel: "Solenoid maydoni B"
    },
    description: "Zil g'altak (solenoid) ga tok o'tkazilsa, g'altak markazida bir jinsli markazlashgan magnit oqimi paydo bo'ladi.",
    example: "n = 1000 oram/m yig'ilgan solenoid, I = 2 A. B = 4π·10⁻⁷ · 1000 · 2 ≈ 2.51 mT.",
    tags: ["solenoid", "g'altak", "induksiya", "B"],
    difficulty: 2, grade: 10, lesson_link: "solenoid", xp_reward: 10
  },

  // 4. Lorents kuchi
  {
    id: "mag_004",
    category: "magnit",
    subcategory: "amper_lorents",
    name: "Lorents kuchi",
    nameRu: "Сила Лоренца",
    formula: "F = |q|·v·B·sinα",
    latex: "F = |q| v B \\sin\\alpha",
    variables: [
      { symbol: "F", name: "Lorents kuchi", unit: "N", description: "Erkin zaryadga ta'sir ziyoqcha surish kuchi" },
      { symbol: "q", name: "Zaryad", unit: "C", description: "Harakatdagi zarra (proton y. elektron)" },
      { symbol: "v", name: "Tezlik", unit: "m/s", description: "Zarra uchish tezligi" },
      { symbol: "B", name: "Magnit induksiya", unit: "T", description: "Maydon kuchliligi" },
      { symbol: "α", name: "Burchak", unit: "grad", description: "Tezlik va magnit chiziqlari orasidagi" }
    ],
    calculator: {
      solveFor: "F",
      inputs: ["q", "v", "B", "alpha"],
      defaultValues: { q: 1.6e-19, v: 1e6, B: 0.1, alpha: 90 },
      formulaFn: "(q, v, b, al) => Math.abs(q) * v * b * Math.sin(al * Math.PI / 180)",
      resultUnit: "N",
      resultLabel: "Lorents kuchi"
    },
    description: "Magnit maydon harakatda bo'lmagan zaryadga ta'sir eta olmaydi. Uchar zaryadga yuzlanib esa uning trayektoriyasini yonga burib yuboradi.",
    example: "Elektron 10⁶ m/s bilan B=0.1 T maydonga to'g'ri (90°) kirdi. F = 1.6×10⁻¹⁹ · 10⁰⁶ · 0.1 = 1.6×10⁻¹⁴ N.",
    tags: ["lorents", "zaryad", "kuch", "magnit", "B"],
    difficulty: 2, grade: 11, lesson_link: "lorents", xp_reward: 10
  },

  // 5. Siklotron radiusi
  {
    id: "mag_005",
    category: "magnit",
    subcategory: "amper_lorents",
    name: "Magnit maydonda aylanish radiusi",
    nameRu: "Радиус вращения заряда",
    formula: "r = m·v / (|q|·B)",
    latex: "r = \\frac{m v}{|q| B}",
    variables: [
      { symbol: "r", name: "Aylana radiusi", unit: "m", description: "Aylanuvchi yoy egriligi" },
      { symbol: "m", name: "Massa", unit: "kg", description: "Zarra massasi" },
      { symbol: "v", name: "Tezlik", unit: "m/s", description: "Perpendikular qism tezligi" },
      { symbol: "q", name: "Zaryad", unit: "C", description: "Sirt modulli zaryadi" },
      { symbol: "B", name: "Induksiya", unit: "T", description: "Maydon chiziqlari siri" }
    ],
    calculator: {
      solveFor: "r",
      inputs: ["m", "v", "q", "B"],
      defaultValues: { m: 9.1e-31, v: 1e6, q: 1.6e-19, B: 0.1 },
      formulaFn: "(m, v, q, b) => (m * v) / (Math.abs(q) * b)",
      resultUnit: "m",
      resultLabel: "Radius (m)"
    },
    description: "Magnit maydonga tezligi bilan perpendikulyar kirgan zarra aylanani ifodalaydi va Lorents kuchi uning markazga intilma kuchiga ehtiyojdor bulib aylanadi.",
    example: "Elektron r-si B=0.1T, v=1e6m/s larda R = 9.1e-31*1e6 / 1.6e-19*0.1 = 5.7e-5 m.",
    tags: ["radius", "aylanma", "lorents", "zaryad"],
    difficulty: 3, grade: 11, lesson_link: "zaryad_harakat", xp_reward: 15
  },

  // 6. Zaryadning aylanish davri
  {
    id: "mag_006",
    category: "magnit",
    subcategory: "amper_lorents",
    name: "Zarraning aylanish davri",
    nameRu: "Период обращения заряда",
    formula: "T = 2π·m / (|q|·B)",
    latex: "T = \\frac{2\\pi m}{|q| B}",
    variables: [
      { symbol: "T", name: "Aylanish davri", unit: "s", description: "To'liq 1 aylana vaqti" },
      { symbol: "m", name: "Massa", unit: "kg", description: "" },
      { symbol: "q", name: "Zaryad", unit: "C", description: "" },
      { symbol: "B", name: "Magnit maydon", unit: "T", description: "" }
    ],
    calculator: {
      solveFor: "T",
      inputs: ["m", "q", "B"],
      defaultValues: { m: 9.1e-31, q: 1.6e-19, B: 0.1 },
      formulaFn: "(m, q, b) => (2 * Math.PI * m) / (Math.abs(q) * b)",
      resultUnit: "s",
      resultLabel: "Vaqt T"
    },
    description: "Qizig'i shundaki, Lorents radius formulasiga e'tibor qilsangiz zarra aylanish davri uning TEZLIGIGA mutlaqo bog'liq emas. Faqat massasiga ko'ra.",
    example: "Proton B=1 T da T = 2π·1.67e-27 / (1.6e-19 · 1) ≈ 6.5e-8 s da 1 aylanib ulguradi.",
    tags: ["davr", "T", "siklotron", "aylanish"],
    difficulty: 3, grade: 11, lesson_link: "zaryad_harakat", xp_reward: 15
  },

  // 7. Siklotron chastotasi
  {
    id: "mag_007",
    category: "magnit",
    subcategory: "amper_lorents",
    name: "Siklotron (Aylanish) chastotasi",
    nameRu: "Циклотронная частота",
    formula: "f = |q|·B / (2π·m)",
    latex: "f = \\frac{|q| B}{2\\pi m}",
    variables: [
      { symbol: "f", name: "Aylanish chastotasi", unit: "Hz", description: "Sekundiga necha marta mo'ljallanadi" },
      { symbol: "q", name: "Zaryad", unit: "C", description: "" },
      { symbol: "B", name: "Maydon", unit: "T", description: "" },
      { symbol: "m", name: "Massa", unit: "kg", description: "" }
    ],
    calculator: {
      solveFor: "f",
      inputs: ["q", "B", "m"],
      defaultValues: { q: 1.6e-19, B: 1, m: 1.67e-27 },
      formulaFn: "(q, b, m) => (Math.abs(q) * b) / (2 * Math.PI * m)",
      resultUnit: "Hz",
      resultLabel: "Chastota (Hz)"
    },
    description: "T (davr) ning teskarisi bo'lib, zarra bir sekundda necha marta ko'pik aylana o'tdi shaklini ifodalaydi.",
    example: "B=1 T maydonda proton chastotasi f ≈ 1.5×10⁷ Hz (15 MHz).",
    tags: ["chastota", "siklotron", "f"],
    difficulty: 3, grade: 11, lesson_link: "zaryad_harakat", xp_reward: 15
  },

  // 8. Magnit oqim
  {
    id: "mag_008",
    category: "magnit",
    subcategory: "magnit_maydoni",
    name: "Magnit oqimi",
    nameRu: "Магнитный поток",
    formula: "Φ = B·S·cosα",
    latex: "\\Phi = B S \\cos\\alpha",
    variables: [
      { symbol: "Φ", name: "Magnit oqim", unit: "Wb (Veber)", description: "Yuzani teshib chiqqan 'havo' maydoni" },
      { symbol: "B", name: "Induksiya", unit: "T", description: "B" },
      { symbol: "S", name: "Yuza kesimi", unit: "m²", description: "Kontur hosil qilgan joy" },
      { symbol: "α", name: "Normalga burchak", unit: "grad", description: "Kontur perpedikulyar chizigiga oqim" }
    ],
    calculator: {
      solveFor: "Phi",
      inputs: ["B", "S", "alpha"],
      defaultValues: { B: 0.2, S: 0.5, alpha: 0 },
      formulaFn: "(b, s, al) => b * s * Math.cos(al * Math.PI / 180)",
      resultUnit: "Wb",
      resultLabel: "Oqim (Φ)"
    },
    description: "Berilgan yuza orqali o'tayotgan magnit maydon chiziqlarining umumiy sonini (zichligini) tasniflovchi kattalik.",
    example: "0.5 m² yuzadan perpedikulyar tarzda (α=0°, normal bo'ylab, cos0=1) 0.2 T chiziqlar o'tyapti. Φ = 0.2·0.5·1 = 0.1 Wb.",
    tags: ["oqim", "veber", "Phi", "induksiya"],
    difficulty: 2, grade: 11, lesson_link: "magnit_oqim", xp_reward: 10
  },

  // 9. O'zaro induktivlik
  {
    id: "mag_009",
    category: "magnit",
    subcategory: "induktivlik",
    name: "O'zaro induktivlik",
    nameRu: "Взаимная индуктивность",
    formula: "M = Φ₁₂ / I₂",
    latex: "M = \\frac{\\Phi_{12}}{I_2}",
    variables: [
      { symbol: "M", name: "O'zaro induktivlik", unit: "H (Genri)", description: "" },
      { symbol: "Φ₁₂", name: "Ta'sir oqim", unit: "Wb", description: "2-ramka 1-ramkaga yuborgan oqim" },
      { symbol: "I₂", name: "Atrofdagi oqim Toki", unit: "A", description: "Manba tarmoq" }
    ],
    calculator: {
      solveFor: "M",
      inputs: ["Phi", "I"],
      defaultValues: { Phi: 0.05, I: 2 },
      formulaFn: "(phi, i) => phi / i",
      resultUnit: "H (Genri)",
      resultLabel: "O'zaro bog'liqlik M"
    },
    description: "Ikkita kontur yonma yon turganida birining toki narigisiga elektromagnit holatida qancha oqim ulasha olish qobiliyati (Transformator asosi).",
    example: "2A tok 1-g'altakdan otib 2-g'altakda 0.05 Wb yaratsa, M = 0.05/2 = 0.025 H.",
    tags: ["induktivlik", "M", "o'zaro", "ta'sir", "transformator"],
    difficulty: 3, grade: 11, lesson_link: "induktivlik", xp_reward: 15
  },

  // 10. Induktivlik L
  {
    id: "mag_010",
    category: "magnit",
    subcategory: "induktivlik",
    name: "Induktivlik ta'rifi",
    nameRu: "Индуктивность",
    formula: "L = Φ / I",
    latex: "L = \\frac{\\Phi}{I}",
    variables: [
      { symbol: "L", name: "Induktivlik", unit: "H", description: "Konturning magnit 'massasi'" },
      { symbol: "Φ", name: "Oqim", unit: "Wb", description: "Faqat o'ziga taalluqli qism jizgari" },
      { symbol: "I", name: "Tok", unit: "A", description: "G'altakdagi oqim" }
    ],
    calculator: {
      solveFor: "L",
      inputs: ["Phi", "I"],
      defaultValues: { Phi: 0.02, I: 5 },
      formulaFn: "(phi, i) => phi / i",
      resultUnit: "H",
      resultLabel: "Inertsiya(ind) L"
    },
    description: "Elektr zanjirining tok o'zgarganda o'zida qarshi EMK paydo qilib (o'z-o'zini induksiyasi) tok sakrashiga qarshilik ko'rsatish inertsiyasi.",
    example: "5A tok g'altak ichida 0.02 Wb oqim o'ziga o'zi yopsa, L = 0.02 / 5 = 0.004 H (4 mH).",
    tags: ["L", "genri", "induktivlik", "oqim", "tok"],
    difficulty: 2, grade: 11, lesson_link: "induktivlik", xp_reward: 10
  },

  // 11. Magnit maydon energiyasi
  {
    id: "mag_011",
    category: "magnit",
    subcategory: "induktivlik",
    name: "Magnit maydon energiyasi",
    nameRu: "Энергия магнитного поля",
    formula: "W = L·I² / 2",
    latex: "W_m = \\frac{L I^2}{2}",
    variables: [
      { symbol: "W", name: "Energiya", unit: "J", description: "Magnit tasmadagi yashiringan energiya" },
      { symbol: "L", name: "Induktivlik", unit: "H", description: "G'altak miqdori" },
      { symbol: "I", name: "Tok kuchi", unit: "A", description: "To'xtovsiz rejimda oqimi" }
    ],
    calculator: {
      solveFor: "W",
      inputs: ["L", "I"],
      defaultValues: { L: 0.1, I: 4 },
      formulaFn: "(l, i) => (l * i * i) / 2",
      resultUnit: "J",
      resultLabel: "Energiyasi joul"
    },
    description: "G'altakda tok ulanib magnit qonuniga kelgan payt atrofiga to'plab oladigan toza energiya. Tokni uzzangiz bir chaqnash b-n chiqib ketadi (uchqun).",
    example: "0.1 H va 4 A. W = 0.1 · 16 / 2 = 0.8 J.",
    tags: ["energiya", "W", "L", "joul"],
    difficulty: 2, grade: 11, lesson_link: "induktivlik_energiya", xp_reward: 10
  },

  // 12. Transformator koeffitsienti
  {
    id: "mag_012",
    category: "magnit",
    subcategory: "transformator",
    name: "Transformatsiya koeffitsienti",
    nameRu: "Коэффициент трансформации",
    formula: "k = N₁ / N₂ = U₁ / U₂",
    latex: "k = \\frac{N_1}{N_2} = \\frac{U_1}{U_2}",
    variables: [
      { symbol: "k", name: "Koeffitsient", unit: "ulush", description: "Kuchlanishni oz/ko'p kilish qadami" },
      { symbol: "N₁", name: "Birlamchi oram", unit: "ta", description: "Kirish chulg'ami oralari" },
      { symbol: "N₂", name: "Ikkilamchi", unit: "ta", description: "Chiqish chulg'ami" }
    ],
    calculator: {
      solveFor: "k",
      inputs: ["N1", "N2"],
      defaultValues: { N1: 1000, N2: 100 },
      formulaFn: "(n1, n2) => n1 / n2",
      resultUnit: "",
      resultLabel: "K parametr"
    },
    description: "Transformator (faqat o'zgaruvchan tok uchun ishlaydi) kirishdagi va chiqishdagi kuchlanishlar miqdorini taminlashdagi o'ramlar solishtirmasi. k>1 bo'lса pasaytiruvchi.",
    example: "Birlamchi N₁=1000 oram, ikkilamchi N₂=100. k=10 marta pasaytirib beradi U ni.",
    tags: ["transformator", "k", "kuchlanish", "oram"],
    difficulty: 2, grade: 11, lesson_link: "transformator", xp_reward: 10
  },

  // 13. Transformator quvvati (ideal)
  {
    id: "mag_013",
    category: "magnit",
    subcategory: "transformator",
    name: "Transformator ideal quvvatlari",
    nameRu: "Мощности идеального трансформатора",
    formula: "U₁·I₁ = U₂·I₂",
    latex: "U_1 I_1 = U_2 I_2",
    variables: [
      { symbol: "U₁", name: "Kirish kelayotgan", unit: "V", description: "" },
      { symbol: "I₁", name: "Kirish tok", unit: "A", description: "" },
      { symbol: "U₂", name: "Chiqish u2", unit: "V", description: "Olingan" },
      { symbol: "I₂", name: "Chiqishdagi tok", unit: "A", description: "" }
    ],
    calculator: {
      solveFor: "I2",
      inputs: ["U1", "I1", "U2"],
      defaultValues: { U1: 220, I1: 1, U2: 22 },
      formulaFn: "(u1, i1, u2) => (u1 * i1) / u2",
      resultUnit: "A",
      resultLabel: "Ikkilamchi tok"
    },
    description: "Ideal holda quvvat P=U·I tashqarida nobud bo'lmaydi. Kuchlanish pasaytirilganda mos ravishda Tok kuchi I xuddi shuncha oshib ketadi. Energetik mavozoqat.",
    example: "220 V kirishda I=1 A kirsa, U=22 V menda ikkilamchida olganga: I = 220*1/22 = 10 A tok chiqadi.",
    tags: ["ideal", "transformator", "P1=P2"],
    difficulty: 2, grade: 11, lesson_link: "transformator", xp_reward: 10
  },

  // 14. Magnit kuchlanganlik
  {
    id: "mag_014",
    category: "magnit",
    subcategory: "magnit_maydoni",
    name: "Magnit maydon kuchlanganligi (H)",
    nameRu: "Напряженность магнитного поля",
    formula: "H = B / (μ₀·μ)",
    latex: "H = \\frac{B}{\\mu_0 \\mu}",
    variables: [
      { symbol: "H", name: "Kuchlanganlik", unit: "A/m", description: "Atrof muhit zarrichalariga umuman aloqasiz maydonning asli sababchisi (tok) doirasi" },
      { symbol: "B", name: "Induksiya", unit: "T", description: "Umumiy ko'rsatkich" },
      { symbol: "μ", name: "Muhit tasiri", unit: "", description: "" }
    ],
    calculator: {
      solveFor: "H",
      inputs: ["B", "mu"],
      defaultValues: { B: 0.001256, mu: 1 },
      formulaFn: "(B, mu) => B / (4 * Math.PI * 1e-7 * mu)",
      resultUnit: "A/m",
      resultLabel: "H"
    },
    description: "Moddaning (masalan temir yotgan joydagi induksiya keskin oshadi) magnit singdiruvchanligidan uzib ajratilgan toza 'tashkillashtirilgan manbadan' necha marta A/m oqayotgani.",
    example: "B = 1.256 mT havoda (mu=1) turganda uning asl manba kuchlanganligi H = 0.001256 / 1.256e-6 ≈ 1000 A/m.",
    tags: ["H", "kuchlanganlik", "magnit"],
    difficulty: 3, grade: 11, lesson_link: "magnit_maydoni_1", xp_reward: 15
  },

  // ════════════════════════════════════════════════════════
  // ════════════════════════════════════════════════════════
  //  ELEKTROMAGNIT TEBRANISHLAR (em_001 → em_010)
  // ════════════════════════════════════════════════════════

  // 1. LC kontur tabiiy chastotasi (omega)
  {
    id: "em_001",
    category: "em_tebranish",
    subcategory: "lc_kontur",
    name: "Konturning tabiiy siklik chastotasi",
    nameRu: "Собственная циклическая частота LC-контура",
    formula: "ω₀ = 1 / √(L·C)",
    latex: "\\omega_0 = \\frac{1}{\\sqrt{LC}}",
    variables: [
      { symbol: "ω₀", name: "Siklik chastota", unit: "rad/s", description: "Burchak chastotasi" },
      { symbol: "L", name: "Induktivlik", unit: "H", description: "G'altak ko'rsatkichi" },
      { symbol: "C", name: "Sig'im", unit: "F", description: "Kondensator hajmi" }
    ],
    calculator: {
      solveFor: "w0",
      inputs: ["L", "C"],
      defaultValues: { L: 0.01, C: 1e-6 },
      formulaFn: "(l, c) => 1 / Math.sqrt(l * c)",
      resultUnit: "rad/s",
      resultLabel: "ω₀ chastotasi"
    },
    description: "Kondensator va g'altakdan iborat kontur o'zichalik energiyani elektr qutblari bilan magnit qutblari ortasida qanchalik tez o'tkazib o'ynashini ko'rsatadi.",
    example: "L = 0.01 H, C = 1 μF. ω = 1 / √(1e-8) = 1/1e-4 = 10,000 rad/s.",
    tags: ["lc", "kontur", "omega", "chastota"],
    difficulty: 2, grade: 11, lesson_link: "lc_kontur", xp_reward: 10
  },

  // 2. Tomson formulasi
  {
    id: "em_002",
    category: "em_tebranish",
    subcategory: "lc_kontur",
    name: "Tomson formulasi (Davr)",
    nameRu: "Формула Томсона (Период)",
    formula: "T = 2π·√(L·C)",
    latex: "T = 2\\pi \\sqrt{LC}",
    variables: [
      { symbol: "T", name: "Tebranish davri", unit: "s", description: "Bir marta to'liq energiyaning qaytib kelish vaqti" },
      { symbol: "L", name: "Induktivlik", unit: "H", description: "" },
      { symbol: "C", name: "Sig'im", unit: "F", description: "" }
    ],
    calculator: {
      solveFor: "T",
      inputs: ["L", "C"],
      defaultValues: { L: 0.01, C: 1e-6 },
      formulaFn: "(l, c) => 2 * Math.PI * Math.sqrt(l * c)",
      resultUnit: "s",
      resultLabel: "Davr (T)"
    },
    description: "Ideal konturdagi bitta to'la elektromagnit garmonik tebranish uchun ketadigan sekundlar soni.",
    example: "L = 0.01 H, C = 1 μF bo'lsa T = 2π·10⁻⁴ ≈ 0.628 ms (millisekund).",
    tags: ["tomson", "T", "davr", "lc_kontur"],
    difficulty: 1, grade: 11, lesson_link: "lc_kontur", xp_reward: 5
  },

  // 3. LC kontur tebranish chastotasi
  {
    id: "em_003",
    category: "em_tebranish",
    subcategory: "lc_kontur",
    name: "Tebranish chastotasi (Gerts)",
    nameRu: "Частота колебаний",
    formula: "f = 1 / (2π·√(L·C))",
    latex: "f = \\frac{1}{2\\pi \\sqrt{LC}}",
    variables: [
      { symbol: "f", name: "Chastota", unit: "Hz", description: "Sekunddagi to'liq tebranishlar soni" },
      { symbol: "L", name: "Induktivlik", unit: "H", description: "" },
      { symbol: "C", name: "Sig'im", unit: "F", description: "" }
    ],
    calculator: {
      solveFor: "f",
      inputs: ["L", "C"],
      defaultValues: { L: 0.01, C: 1e-6 },
      formulaFn: "(l, c) => 1 / (2 * Math.PI * Math.sqrt(l * c))",
      resultUnit: "Hz",
      resultLabel: "Gerts"
    },
    description: "Radioni aynan qaysi raqamga sozlaganda tutishi ham xuddi shu sig'im va induktivlik xususiyatidan erishiladi.",
    example: "Tinglaganingiz ≈ 0.628 ms uchun tezligi f ≈ 1590 Hz dir.",
    tags: ["hz", "gerts", "radioto'lqin", "f"],
    difficulty: 2, grade: 11, lesson_link: "lc_kontur", xp_reward: 10
  },

  // 4. Zaryad tebranishi
  {
    id: "em_004",
    category: "em_tebranish",
    subcategory: "lc_kontur",
    name: "Kondensatordagi zaryad qonuni",
    nameRu: "Уравнение колебаний заряда",
    formula: "q = Q_max·cos(ω₀t)",
    latex: "q(t) = Q_{\\max} \\cos(\\omega_0 t)",
    variables: [
      { symbol: "q(t)", name: "Ixtiyoriy paytdagi zaryad", unit: "C", description: "Bitta plastinkasiga kelib ketishi" },
      { symbol: "Q_max", name: "Maksimal zaryad", unit: "C", description: "Tebranish amplitudasi" },
      { symbol: "ω₀", name: "Siklik", unit: "rad/s", description: "" },
      { symbol: "t", name: "Vaqt", unit: "s", description: "" }
    ],
    calculator: {
      solveFor: "q",
      inputs: ["Qm", "w0", "t"],
      defaultValues: { Qm: 0.005, w0: 314, t: 0.01 },
      formulaFn: "(qm, w, t) => qm * Math.cos(w * t)",
      resultUnit: "C",
      resultLabel: "Zaryad q"
    },
    description: "Ideal holatda so'nmas tebranish shartiga ko'ra zaryad plitalar orasida xuddi mayatnik prujinasida ipning o'rtaga qarab tortilishiga o'xshaydi.",
    example: "Q_max = 5mC bo'lsa va kosinus T/2 paytida argumentiga 180° bulib, zaryad -5mC ga yetadi (pastroq plitaga o'tgan bo'ladi).",
    tags: ["zaryad", "kosinus", "garmonik", "LC"],
    difficulty: 3, grade: 11, lesson_link: "zaryad_tebra", xp_reward: 15
  },

  // 5. LC konturda tok (hozircha)
  {
    id: "em_005",
    category: "em_tebranish",
    subcategory: "lc_kontur",
    name: "Zanjirdagi tok tebranishi qonuni",
    nameRu: "Уравнение колебаний тока",
    formula: "I(t) = -Q_max·ω₀·sin(ω₀t)",
    latex: "I(t) = -I_{\\max} \\sin(\\omega_0 t)",
    variables: [
      { symbol: "I(t)", name: "Joriy tok", unit: "A", description: "Sim orqali plastinka qarab oqayotgan tok" },
      { symbol: "I_max", name: "Tok amplitudasi", unit: "A", description: "(Q_max × ω₀) qiymatiga teng bo'ladi" }
    ],
    calculator: {
      solveFor: "It",
      inputs: ["Qm", "w0", "t"],
      defaultValues: { Qm: 0.005, w0: 314, t: 0.01 },
      formulaFn: "(qm, w, t) => -qm * w * Math.sin(w * t)",
      resultUnit: "A",
      resultLabel: "Tok I"
    },
    description: "Zaryadning oniy ustidan (q') hosilasi sifatida tok chiqadi. Qachonki plastinka zaryadi nolga tushsa, Simdagi Tok maksimal kuch bilan urib yuraveradi (Induktivlik sabab).",
    example: "Kosinusli zaryad o'rtada (nol) paytida sinusli I (tok) -1 maksimal ampergacha yetib o'tadi.",
    tags: ["tok", "I_m", "sinus", "g'altak toki"],
    difficulty: 3, grade: 11, lesson_link: "zaryad_tebra", xp_reward: 15
  },

  // 6. EM to'lqin tezligi
  {
    id: "em_006",
    category: "em_tebranish",
    subcategory: "em_tolqin",
    name: "Elektromagnit to'lqin tezligi",
    nameRu: "Скорость электромагнитной волны",
    formula: "c = 1 / √(ε₀·μ₀)",
    latex: "c = \\frac{1}{\\sqrt{\\varepsilon_0 \\mu_0}}",
    variables: [
      { symbol: "c", name: "Vakumdagi tezlik", unit: "m/s", description: "3 × 10⁸ ko'rsatkichi" },
      { symbol: "ε₀", name: "Elektr doimiysi", unit: "F/m", description: "8.85 × 10⁻¹²" },
      { symbol: "μ₀", name: "Magnit doimiysi", unit: "H/m", description: "1.256 × 10⁻⁶" }
    ],
    calculator: {
      solveFor: "c",
      inputs: ["e0", "m0"],
      defaultValues: { e0: 8.854187e-12, m0: 1.256637e-6 },
      formulaFn: "(e0, m0) => 1 / Math.sqrt(e0 * m0)",
      resultUnit: "m/s",
      resultLabel: "Yorug'lik tezligi"
    },
    description: "Maksvel fazoda tarqaladigan o'zaro chirmashgan Elektr+Magnit to'lqinini kashf qilib uning mutlaq tezligini ikki qutb yashirin doimiyliklaridan matematik topganda hayratda qolgan (yorug'lik!)",
    example: "Kiritilgan standart qiymatlar orqali uning aniq ≈299 792 458 m/s ekanligi va tabiat mukammalligi nazariy oshkor bo'lgan.",
    tags: ["to'lqin", "c", "yorug'lik", "maksvel"],
    difficulty: 3, grade: 11, lesson_link: "em_tolqin", xp_reward: 15
  },

  // 7. EM to'lqin uzunligi
  {
    id: "em_007",
    category: "em_tebranish",
    subcategory: "em_tolqin",
    name: "Elektromagnit to'lqin uzunligi",
    nameRu: "Длина электромагнитной волны",
    formula: "λ = c / f = c·T",
    latex: "\\lambda = \\frac{c}{f}",
    variables: [
      { symbol: "λ", name: "To'lqin razmeri", unit: "m", description: "Xartgandan keyingi pik" },
      { symbol: "c", name: "Tarqalish tezligi", unit: "m/s", description: "3·10⁸" },
      { symbol: "f", name: "Chastota", unit: "Hz", description: "" }
    ],
    calculator: {
      solveFor: "lambda",
      inputs: ["c", "f"],
      defaultValues: { c: 3e8, f: 100e6 },
      formulaFn: "(c, f) => c / f",
      resultUnit: "m",
      resultLabel: "Uzunlik λ"
    },
    description: "Radio stantsiya chiqaradigan signalni bir sekundlik joyida nechta bo'lakka tekis yetkazib kelgan hudud (FM, AM, Wi-fi larning asosiy fizik o'lchami).",
    example: "FM radiostantsiyasi 100 MGts (1e8) da ishlasa: λ = 3e8 / 1e8 = 3 metr.",
    tags: ["lambda", "uzunlik", "c_f", "tolqin"],
    difficulty: 1, grade: 11, lesson_link: "em_tolqin", xp_reward: 5
  },

  // 8. O'zgaruvchan EMK
  {
    id: "em_008",
    category: "em_tebranish",
    subcategory: "ozgaruvchan_tok",
    name: "O'zgaruvchan tok (Generatsiyalangan EMK)",
    nameRu: "ЭДС переменного тока",
    formula: "e = E_max·sin(ωt)",
    latex: "e(t) = \\mathcal{E}_{\\max} \\sin(\\omega t)",
    variables: [
      { symbol: "e(t)", name: "Har lahzadagi EMK", unit: "V", description: "Joriy kuchlanish nuqtasi" },
      { symbol: "E_max", name: "Amplituda", unit: "V", description: "Eng tepa nuqta (rozetgada 311V)" },
      { symbol: "ω", name: "Chastota", unit: "rad/s", description: "Odatda tarmogda 50 Hz -> 314 rad/s" }
    ],
    calculator: {
      solveFor: "e",
      inputs: ["E", "w", "t"],
      defaultValues: { E: 311, w: 314, t: 0.005 },
      formulaFn: "(em, w, t) => em * Math.sin(w * t)",
      resultUnit: "V",
      resultLabel: "Oniy volt"
    },
    description: "Suv yoki shamol g'ildirogidan harakat olayotgan magnit elektr tokini o'zgaruvchan tizmada ritmik -/+ yo'nalishida chayqatib yuborishidan dunyoga keladi.",
    example: "Rozetkaning 311V E_max i bo'lib t=0.005 (chorak davr)da sin(90°) e=311V yondiradi. t=0.01 dagi e=0 dir.",
    tags: ["sinus", "generator", "kuchlanish", "e_max", "roz"],
    difficulty: 3, grade: 11, lesson_link: "generator", xp_reward: 15
  },

  // 9. O'zgaruvchan ef
  {
    id: "em_009",
    category: "em_tebranish",
    subcategory: "ozgaruvchan_tok",
    name: "Samarali (Effektiv) qiymat",
    nameRu: "Действующее значение тока и напряжения",
    formula: "U_ef = U_max / √2",
    latex: "U_{\\text{эф}} = \\frac{U_{\\max}}{\\sqrt{2}}",
    variables: [
      { symbol: "U_ef", name: "Rozetkadagi yozuv", unit: "V", description: "Uyda '220' deyilsa shudir" },
      { symbol: "U_max", name: "Aslida uradigan maks", unit: "V", description: "Peak to peak dagi pik volt" }
    ],
    calculator: {
      solveFor: "U_ef",
      inputs: ["U_max"],
      defaultValues: { U_max: 311.12 },
      formulaFn: "(um) => um / Math.sqrt(2)",
      resultUnit: "V",
      resultLabel: "Samarali doimiy ekvivalent"
    },
    description: "Chunki tok goh nolda, goh tepada - uni Doimiy Tokga solishtiradigan 'urish' effektiv natijasi yonda qolgan holdagisiga aytiladi. O'lchash asboblar shu haqiqatni ko'rsatadi.",
    example: "U_max = 311 bo'lganda rozetka uyni QANDAY quvvat bilan qizitsa U_ef = 311/1.41 = 220 V doimiy batareya xuddi shunday qizitgan bo'lar edi.",
    tags: ["realsamarali", "ef", "tok", "220v", "max"],
    difficulty: 2, grade: 11, lesson_link: "generator", xp_reward: 10
  },

  // 10. Quvvat va cosfi
  {
    id: "em_010",
    category: "em_tebranish",
    subcategory: "ozgaruvchan_tok",
    name: "O'zgaruvchan tok quvvati (Aktiv)",
    nameRu: "Активная мощность переменного тока",
    formula: "P = U_ef·I_ef·cosφ",
    latex: "P = U I \\cos\\varphi",
    variables: [
      { symbol: "P", name: "Aktiv (Foydali) quvvat", unit: "W (Vatt)", description: "Schetchik yoza olishi" },
      { symbol: "U_ef", name: "Voltaj ef", unit: "V", description: "220 V standart" },
      { symbol: "I_ef", name: "Tok ef", unit: "A", description: "" },
      { symbol: "cosφ", name: "Quvvat koeff.", unit: "ulush", description: "Fazalarning adashib ketishi (1 gacha)" }
    ],
    calculator: {
      solveFor: "P",
      inputs: ["U", "I", "cosphi"],
      defaultValues: { U: 220, I: 5, cosphi: 0.8 },
      formulaFn: "(u, i, cf) => u * i * cf",
      resultUnit: "W",
      resultLabel: "Haqiqiy quvvat"
    },
    description: "Motorni ulasangiz voltaj bilan tok egri chizig'i bir-biridan orqada/oldinda kelib (shiyerlab) sof 220×5 Vatt berolmaydi, oz-moz yo'qotish (cosφ) qonunda bo'ladi.",
    example: "U=220, I=5A (1100Wdek ko'rinadi). Aslida dvigatel cosΦ=0.8 bo'lsa haqiqiy foyda P=1100 · 0.8 = 880 W beradi xolos.",
    tags: ["quvvat", "cosfi", "fazoviy siljish", "ozgaruvchan"],
    difficulty: 3, grade: 11, lesson_link: "ozgaruv_quvvat", xp_reward: 15
  },

  // ════════════════════════════════════════════════════════
  //  OPTIKA (opt_001 → opt_020)
  // ════════════════════════════════════════════════════════

  // 1. Yorug'lik tezligi (Vakuum)
  {
    id: "opt_001",
    category: "optika",
    subcategory: "yoruglik_tarqalishi",
    name: "Yorug'lik tezligi va to'lqin uzunligi",
    nameRu: "Скорость света и длина волны",
    formula: "c = λ·f",
    latex: "c = \\lambda f",
    variables: [
      { symbol: "c", name: "Yorug'lik tezligi", unit: "m/s", description: "Vakuumda 3×10⁸" },
      { symbol: "λ", name: "To'lqin uzunligi", unit: "m", description: "Masofa (rang piklari)" },
      { symbol: "f", name: "Chastota", unit: "Hz", description: "Rangi xususiyati" }
    ],
    calculator: {
      solveFor: "lambda",
      inputs: ["c", "f"],
      defaultValues: { c: 3e8, f: 5e14 },
      formulaFn: "(c, f) => c / f",
      resultUnit: "m",
      resultLabel: "Uzunlik λ"
    },
    description: "Yorug'lik ham aslida elektromagnit to'lqindir. Turli ranglar chastotasi tufayli ularning qadami o'zgarib turadi. Masalan Qizil chastotasi kichikroq, λ uzunroq bo'ladi.",
    example: "Sariq rang chastotasi f=5·10¹⁴ Hz deb olsak, uzunligi λ = 3·10⁸ / 5·10¹⁴ = 6×10⁻⁷ m = 600 nm.",
    tags: ["yorug'lik", "tezlik", "rang"],
    difficulty: 1, grade: 8, lesson_link: "yoruglik", xp_reward: 5
  },

  // 2. Sinish ko'rsatkichi
  {
    id: "opt_002",
    category: "optika",
    subcategory: "sinish_aksettirish",
    name: "Absolyut sinish ko'rsatkichi",
    nameRu: "Абсолютный показатель преломления",
    formula: "n = c / v",
    latex: "n = \\frac{c}{v}",
    variables: [
      { symbol: "n", name: "Muhit ko'rsatkichi", unit: "", description: "Vakuumdan necha barobar qiyin" },
      { symbol: "c", name: "Vakuum tezligi", unit: "m/s", description: "3e8" },
      { symbol: "v", name: "Muhitdagi tezligi", unit: "m/s", description: "Suv yoki shishada sekinlashi" }
    ],
    calculator: {
      solveFor: "v",
      inputs: ["c", "n"],
      defaultValues: { c: 3e8, n: 1.5 },
      formulaFn: "(c, n) => c / n",
      resultUnit: "m/s",
      resultLabel: "Yangi tezlik"
    },
    description: "Yorug'lik vakuumdan shisha yoki suvga kirganda u yerning qalinligida tormozlanadi. Shu sekinlashish necha marta ekanini n aniqlaydi.",
    example: "Shisha qalin n = 1.5. Shishadagi nur tezligi v = 3e8 / 1.5 = 2e8 m/s (200 Ming km/s ga tushadi).",
    tags: ["sinish", "n", "tezlik tushishi", "optika"],
    difficulty: 1, grade: 8, lesson_link: "sinish", xp_reward: 5
  },

  // 3. Snell qonuni
  {
    id: "opt_003",
    category: "optika",
    subcategory: "sinish_aksettirish",
    name: "Yorug'likning sinish qonuni (Snell)",
    nameRu: "Закон преломления Снеллиуса",
    formula: "n₁·sinα = n₂·sinβ",
    latex: "n_1 \\sin\\alpha = n_2 \\sin\\beta",
    variables: [
      { symbol: "n₁", name: "Kirish muhit", unit: "", description: "Havo=1" },
      { symbol: "α", name: "Tushish burchagi", unit: "grad", description: "Normal(tik)ga nisbatan burchi" },
      { symbol: "n₂", name: "Tushgan muhit", unit: "", description: "Suv=1.33" },
      { symbol: "β", name: "Sinish burchagi", unit: "grad", description: "Ichkarida qanday yondan o'tdi" }
    ],
    calculator: {
      solveFor: "beta",
      inputs: ["n1", "alpha", "n2"],
      defaultValues: { n1: 1, alpha: 45, n2: 1.33 },
      formulaFn: "(n1, al, n2) => Math.asin((n1/n2)*Math.sin(al*Math.PI/180))*180/Math.PI",
      resultUnit: "° grad",
      resultLabel: "Sinib otgan β"
    },
    description: "Yorug'lik bir muhitdan zichroq boshqasiga o'tganida chiziq tekis yo'lidan adashib zichroq tomon og'adi. Baliq ovlashdagi xatolar asosi.",
    example: "Havo n=1 dan suv n=1.33 ga 45 gradusda tushsa: sinβ = 1·0.707/1.33 ≈ 0.53 => b ≈ 32° burilib kirdi.",
    tags: ["snell", "sinish", "burchak"],
    difficulty: 3, grade: 8, lesson_link: "sinish", xp_reward: 15
  },

  // 4. To'liq ichki aks etish
  {
    id: "opt_004",
    category: "optika",
    subcategory: "sinish_aksettirish",
    name: "To'liq ichki aks etish",
    nameRu: "Полное внутреннее отражение",
    formula: "sin(α_kr) = n₂ / n₁",
    latex: "\\sin\\alpha_{kr} = \\frac{n_2}{n_1} \\; (n_1 > n_2)",
    variables: [
      { symbol: "α_kr", name: "Kritik burchak", unit: "grad", description: "Qochib chiqolmay qolish chegarasi" },
      { symbol: "n₂", name: "Tashqi (siyrak) muhit", unit: "", description: "Masalan havo n=1" },
      { symbol: "n₁", name: "Ichki (zich) muhit", unit: "", description: "Shisha n=1.5" }
    ],
    calculator: {
      solveFor: "alpha",
      inputs: ["n1", "n2"],
      defaultValues: { n1: 1.5, n2: 1 },
      formulaFn: "(n1, n2) => Math.asin(n2 / n1) * 180 / Math.PI",
      resultUnit: "° grad",
      resultLabel: "Eng past chiqish β"
    },
    description: "Internetdagi Optik tolali simlar shunga asoslangan bo'lib, nur zich narsadan siyrak narsaga o'ta yotganida ma'lum burchakdan yotsa chiqib ketmasdan oyna kabi o'zgada asir bo'lib qaytadi.",
    example: "Shishadan (1.5) havoga(1) yoruglik chiqish kritik burchagi: sin(a) = 1/1.5 = 0.66. α ≈ 42°. Agar 42° dan katta otsangiz asir bo'lib qoladi.",
    tags: ["tolik", "ichki aksetish", "optik tola"],
    difficulty: 3, grade: 11, lesson_link: "ichki_qaytish", xp_reward: 15
  },

  // 5. Ko'zgu formulasi
  {
    id: "opt_005",
    category: "optika",
    subcategory: "linza_kozgu",
    name: "Yassi ko'zgu xossasi",
    nameRu: "Плоское зеркало",
    formula: "d_predmet = d_tasvir, h_p = h_t",
    latex: "d_{ob} = d_{im}, \\quad h_{ob} = h_{im}",
    variables: [
      { symbol: "d_p", name: "Predmet masofasi", unit: "m", description: "Oynaga bo'lgan yiroqligingiz" },
      { symbol: "d_t", name: "Tasvir masofasi", unit: "m", description: "Oynani orqasida ko'ringan yiroqlik" }
    ],
    calculator: {
      solveFor: "d_t",
      inputs: ["d_p"],
      defaultValues: { d_p: 2 },
      formulaFn: "(dp) => dp",
      resultUnit: "m",
      resultLabel: "D tasvir (ichkari)"
    },
    description: "Ertalab oyna oldida ruxiyatingizni to'g'irlayotganda qancha uzoq tursangiz tasvir xuddi o'shancha orqasida turgandek ko'rinadi (va doim simmetrik, miqyosi 1 ga 1 qoladi).",
    example: "Ko'zgudan 2 metr uzoq bolsangiz, tasviringiz ko'zgu sirtidan ham 2 metr orqadir. Oraliq 4 metr.",
    tags: ["ko'zgu", "yassi oynasi", "oyna"],
    difficulty: 1, grade: 8, lesson_link: "kozgu", xp_reward: 5
  },

  // 6. Sferik ko'zgu (Fokus)
  {
    id: "opt_006",
    category: "optika",
    subcategory: "linza_kozgu",
    name: "Sferik ko'zgu formulasi",
    nameRu: "Формула сферического зеркала",
    formula: "1/F = 1/d + 1/f",
    latex: "\\frac{1}{F} = \\frac{1}{d} + \\frac{1}{f} \\quad (F = \\frac{R}{2})",
    variables: [
      { symbol: "F", name: "Fokus", unit: "m", description: "Radius yarmi joyi (Botiqlik nuri yigiladigan)" },
      { symbol: "d", name: "Predmgacha masofa", unit: "m", description: "" },
      { symbol: "f", name: "Tasvirgacha uzun", unit: "m", description: "Agar f noldan past manfiy bo'lsa moxum (xayoliy)" }
    ],
    calculator: {
      solveFor: "f",
      inputs: ["F", "d"],
      defaultValues: { F: 0.5, d: 2 },
      formulaFn: "(F, d) => 1 / (1/F - 1/d)",
      resultUnit: "m",
      resultLabel: "f (Tasvir lokatsiyasi)"
    },
    description: "Tomiri sharda joylashgan qaytaruvchi botiq yoki qavariq sferalarning yorug'lik tasvirini tushirishi.",
    example: "Qoshiqning ichida F=0.5. Oldiga d=2m qoyilsa: 1/f = 1/0.5 - 1/2 = 2 - 0.5 = 1.5 => f = 0.67m (kichrayib haqiqiy otib tushdi).",
    tags: ["sferik", "botiq", "qavariq", "fokus"],
    difficulty: 3, grade: 11, lesson_link: "sfera", xp_reward: 15
  },

  // 7. Kattalashtirish (ko'zgu/linza)
  {
    id: "opt_007",
    category: "optika",
    subcategory: "linza_kozgu",
    name: "Chiziqli kattalashtirish (k)",
    nameRu: "Линейное увеличение",
    formula: "k = h_i / h_o = |f / d|",
    latex: "k = \\frac{H}{h} = \\left| \\frac{f}{d} \\right|",
    variables: [
      { symbol: "k", name: "K/K (Kattalashuv)", unit: "marta", description: "Tasvir necha barobar ulkan" },
      { symbol: "f", name: "Tasvir gacha m.", unit: "m", description: "" },
      { symbol: "d", name: "Asil jism m.", unit: "m", description: "" }
    ],
    calculator: {
      solveFor: "k",
      inputs: ["f", "d"],
      defaultValues: { f: 0.67, d: 2 },
      formulaFn: "(f, d) => Math.abs(f / d)",
      resultUnit: "X",
      resultLabel: "Marta kattalashdi"
    },
    description: "Sferik oyna yoxud Linza tasvirni aslida necha marta zum/gigant qilganini o'lchash kof.",
    example: "Tasvir fokusi 0.67m daligida (d=2 edi): k = 0.67/2 ≈ 0.33. Botiq oyna odamni 3 marta kichraytirdi.",
    tags: ["kattalashtirish", "linza", "foydalik"],
    difficulty: 2, grade: 8, lesson_link: "kattalashtirish", xp_reward: 10
  },

  // 8. Linza formulasi
  {
    id: "opt_008",
    category: "optika",
    subcategory: "linza_kozgu",
    name: "Ingichka linza formulasi",
    nameRu: "Формула тонкой линзы",
    formula: "±(1/F) = 1/d ± 1/f",
    latex: "\\pm\\frac{1}{F} = \\frac{1}{d} \\pm \\frac{1}{f}",
    variables: [
      { symbol: "d", name: "Obyektgacha(d)", unit: "m", description: "Lupa va kitoblaring orasi" },
      { symbol: "f", name: "Tasvirgacha(f)", unit: "m", description: "O'zgartirilgan manzara devor masofasi (yoki ko'zga ko'rinishi)" },
      { symbol: "F", name: "Fokus masofa", unit: "m", description: "Sochiluvchi qavariq manfiy" }
    ],
    calculator: {
      solveFor: "F_fokus",
      inputs: ["d", "f_img"],
      defaultValues: { d: 0.2, f_img: 1.0 },
      formulaFn: "(d, f) => 1 / (1/d + 1/f)",
      resultUnit: "m",
      resultLabel: "Fokus F"
    },
    description: "Ochki olganda muhim: D uzoq bo'lsa linza oldi (musbat f chinsimon), agar qisqa bo'lib qolsa ko'zni orqasiga (manfiy f virtual tasvir) o'tadi.",
    example: "Lupa F=0.15m da qoyildi d=0.1m yaqinidan qongiz qaraldi(d<F): 1/1.5 - 10 = -3.3. f = -0.3. Virtual kattalashdi.",
    tags: ["linza", "kuzoynak", "ingichka"],
    difficulty: 3, grade: 8, lesson_link: "linza", xp_reward: 15
  },

  // 9. Linza quvvati
  {
    id: "opt_009",
    category: "optika",
    subcategory: "linza_kozgu",
    name: "Linzaning optik quvvati (D)",
    nameRu: "Оптическая сила линзы",
    formula: "D = 1 / F",
    latex: "D = \\frac{1}{F}",
    variables: [
      { symbol: "D", name: "Optik kuch", unit: "dptr (Dioptriya)", description: "Qanchalar kuchli bukib sindiradi nur" },
      { symbol: "F", name: "Fokus masofa", unit: "m", description: "Diqqat metrda bolishi shart" }
    ],
    calculator: {
      solveFor: "D",
      inputs: ["F_m"],
      defaultValues: { F_m: 0.5 },
      formulaFn: "(f) => 1 / f",
      resultUnit: "dptr",
      resultLabel: "D"
    },
    description: "+3 dioptriya, -2 dioptriya... Kuzoynak reseptlaridagi o'lchov, u shunchaki uning metrda berilgan fokus masofasini necha kasr ekanini aytadi.",
    example: "Ko'zoynagingiz +2 D bolsa, F = 1/2 = 0.5 metr (50 sm) oldida quyoshni bitta kichik nuqtaga yiga oladi dgan gap yig'uvchidir.",
    tags: ["dioptriya", "D", "kuch", "fokus", "optik"],
    difficulty: 1, grade: 8, lesson_link: "linza", xp_reward: 5
  },

  // 10. Linza k = d_i/d_o (Qaytadan eslatma as usual linzasda k= f/d ishlitladi)
  {
    id: "opt_010",
    category: "optika",
    subcategory: "linza_kozgu",
    name: "Linza kattalashtirish xossasi",
    nameRu: "Увеличение тонкой линзы",
    formula: "k = f / d",
    latex: "k = \\frac{f}{d} = \\frac{H}{h}",
    variables: [
      { symbol: "k", name: "Marta", unit: "X", description: "" },
      { symbol: "f", name: "Proyeksion m", unit: "m", description: "" },
      { symbol: "d", name: "Jism masfosi", unit: "m", description: "" }
    ],
    calculator: {
      solveFor: "H_boy",
      inputs: ["k", "h"],
      defaultValues: { k: 200, h: 0.05 },
      formulaFn: "(k, h) => k * h",
      resultUnit: "m",
      resultLabel: "Olingan boyi H"
    },
    description: "Proyektor kinolarni qanday ekranga yoyishida eng kerakli tenglik.",
    example: "Proyektor d=0.1m masofadan f=20m uzoqdagi ekranga zarba beryapti: k = 20 / 0.1 = 200 marta ulkan qilyapti (0.05 metr kadr - 10 metr devor bulib ketadi).",
    tags: ["proyektor", "kattalashtirish", "linza"],
    difficulty: 2, grade: 8, lesson_link: "linza", xp_reward: 10
  },

  // 11. Linzalar tizimi
  {
    id: "opt_011",
    category: "optika",
    subcategory: "linza_kozgu",
    name: "Linzalar tizimi quvvati",
    nameRu: "Оптическая сила системы линз",
    formula: "D = D₁ + D₂",
    latex: "D_{\\text{um}} = D_1 + D_2 = \\frac{1}{F_1} + \\frac{1}{F_2}",
    variables: [
      { symbol: "D_um", name: "Umumiy", unit: "dptr", description: "Bir nechta ko'zoynak" }
    ],
    calculator: {
      solveFor: "D",
      inputs: ["d1", "d2"],
      defaultValues: { d1: 3, d2: -1.5 },
      formulaFn: "(d1, d2) => Number(d1) + Number(d2)",
      resultUnit: "dptr",
      resultLabel: "Natijaviy dioptriya"
    },
    description: "Ustma-ust taqalgan bir nechta linzalar huddi elektr qarshiliklari parallel yulida kasr bilan summalandigidek doiptriyalari To'g'ridan tog'ri qoshilvoradi.",
    example: "+3D yiguvchiga -1.5D sochiluvchi ulandi. Jami tizim D = 3 - 1.5 = +1.5D quvvatiga susayadi.",
    tags: ["tizim", "linzalar", "qoshish"],
    difficulty: 1, grade: 8, lesson_link: "linza", xp_reward: 5
  },

  // 12. Yorug'lik tarqalish soya
  {
    id: "opt_012",
    category: "optika",
    subcategory: "yoruglik_tarqalishi",
    name: "Geometrik (Soya va yarim soya)",
    nameRu: "Тень и полутень / Закон прямолинейного...",
    formula: "O'xshash uchburchaklar usuli H/h = L/l",
    latex: "\\frac{H}{h} = \\frac{D+d}{d} \\text{ (Soyani uzoqligi)}",
    variables: [
      { symbol: "H", name: "Minoraning o'zi", unit: "m", description: "Baland bino" },
      { symbol: "L", name: "Minora soyasi", unit: "m", description: "Ulkan obyektdan yerga" },
      { symbol: "h", name: "Cho'p bino", unit: "m", description: "Taxta uzunligi" },
      { symbol: "l", name: "Cho'p soya", unit: "m", description: "" }
    ],
    calculator: {
      solveFor: "H",
      inputs: ["L", "h", "l"],
      defaultValues: { L: 15, h: 2, l: 3 },
      formulaFn: "(L, h, l) => (L * h) / l",
      resultUnit: "m",
      resultLabel: "Tog balandlik"
    },
    description: "Geometrik Optikaning eng sodda teoremasi, Thales Fales teoremasidan binolar balandligini yoruglik chizigiga ko'ra poylab olish.",
    example: "2 metrli to'sin 3 metr soya soldi. Ayni shu vaqtda binoning soyasi 15 metr kelyapti. Bino balandligi: H = 15 · 2 / 3 = 10 metr.",
    tags: ["fales", "soya", "boyi", "yoruglik_togri"],
    difficulty: 2, grade: 8, lesson_link: "yoruglik", xp_reward: 10
  },

  // 13. Interferensiya maksimum
  {
    id: "opt_013",
    category: "optika",
    subcategory: "interferensiya",
    name: "Interferensiya maksimum sharti",
    nameRu: "Условие максимума при интерференции",
    formula: "Δd = k·λ  (k = 0,1,2...)",
    latex: "\\Delta d = k \\lambda",
    variables: [
      { symbol: "Δd", name: "Yo'l farqi", unit: "m", description: "Ikkita to'lqinning ustma ust tushishda kelikshgan kechikishi" },
      { symbol: "k", name: "Butun son orderi", unit: "", description: "1,2,3" },
      { symbol: "λ", name: "To'lqin d", unit: "m", description: "O'zining standartligi" }
    ],
    calculator: {
      solveFor: "check_Max",
      inputs: ["dd", "lambda"],
      defaultValues: { dd: 1.2e-6, lambda: 6e-7 },
      formulaFn: "(dd, la) => (dd / la) % 1 === 0 ? 'MAKSIMUM! (Kuchayish yoruglik)' : 'Balkim...'",
      resultUnit: "",
      resultLabel: "Statusi"
    },
    description: "Ikkita kogerent nur ustma-ust tushganida ularning farqi roppa-rosa 'bo'lam butun' to'lqinlardan iborat bo'lsa ekran porlab kuchayib ketadi.",
    example: "Δ = 1200 nm, λ = 600 nm. k = 1200 / 600 = 2 butun chiqdi. Demak o'sha yerda yorqin doira ko'rinadi.",
    tags: ["interferensiya", "maksimum", "to'lqin", "ustma ust"],
    difficulty: 3, grade: 11, lesson_link: "interfer", xp_reward: 15
  },

  // 14. Interferensiya minimum
  {
    id: "opt_014",
    category: "optika",
    subcategory: "interferensiya",
    name: "Interferensiya minimum (qorong'ulik) sharti",
    nameRu: "Условие минимума при интерференции",
    formula: "Δd = (2k + 1)·λ/2",
    latex: "\\Delta d = (2k + 1)\\frac{\\lambda}{2}",
    variables: [
      { symbol: "Δd", name: "Yol farqi", unit: "m", description: "Bosqichma ketgan" },
      { symbol: "λ/2", name: "Yarim to'lqin", unit: "m", description: "Kaltalashib tushgan yomg'ir dambasi singari xosil buziqlik" }
    ],
    calculator: {
      solveFor: "is_Min",
      inputs: ["dd", "lambda"],
      defaultValues: { dd: 9e-7, lambda: 6e-7 },
      formulaFn: "(dd, la) => ( (dd / (la/2)) % 2 !== 0 ) ? 'MINIMUM! (QOP QORA)' : 'Toliq emas'",
      resultUnit: "",
      resultLabel: "Statusi"
    },
    description: "Ikki nur birining qavariqi ikkinchining botiq xolatiga aynan uchma-uch mos kelib qolishi ularning o'chirib, ekranda soyani paydo qiladi.",
    example: "Δ=900, λ/2 = 300. Demak 900 / 300 = 3 (Taq son). Bu yoriq tushgan nuqta o'lik zona hisoblanadi (min).",
    tags: ["minimum", "qora", "interferensiya"],
    difficulty: 3, grade: 11, lesson_link: "interfer", xp_reward: 15
  },

  // 15. Diffraksiya panjarasi
  {
    id: "opt_015",
    category: "optika",
    subcategory: "diffraksiya",
    name: "Diffraksiya panjarasi",
    nameRu: "Дифракционная решетка",
    formula: "d·sinφ = k·λ",
    latex: "d \\sin\\varphi = k\\lambda",
    variables: [
      { symbol: "d", name: "Panjara davri", unit: "m", description: "1 mm / shtrixlar soniga" },
      { symbol: "φ", name: "Og'ish burchagi", unit: "grad", description: "Maksimum nur qayerga uchib qytdi" },
      { symbol: "k", name: "Tartib orderi", unit: "", description: "Markaz=0, birinchi yorqin=1" },
      { symbol: "λ", name: "To'lqin u-i", unit: "nm/m", description: "" }
    ],
    calculator: {
      solveFor: "lambda",
      inputs: ["d_mm", "phi", "k"],
      defaultValues: { d_mm: 0.01, phi: 30, k: 1 },
      formulaFn: "(d, phi, k) => ((d / 1000) * Math.sin(phi * Math.PI / 180)) / k * 1e9",
      resultUnit: "nm (Nano)",
      resultLabel: "Yorug'lik to'lqini"
    },
    description: "Bitta mm ga 100 lab igna chiziqlar tortilgan asbob Yorug'likni kamalakka bo'lib nur tahlilida o'ta aniq spektrometr bo'lib ishlashi.",
    example: "d=0.01 mm, φ=30°. k=1 (1-mks). sin30 = 0.5. To'lqin uzunligi: λ = (10⁻⁵ · 0.5) / 1 = 5×10⁻⁷ m = 500 nm (yashil chiroq).",
    tags: ["diffraksiya", "panjara", "klambda", "spektr"],
    difficulty: 3, grade: 11, lesson_link: "diffraksiya", xp_reward: 20
  },

  // 16. Dispersiya
  {
    id: "opt_016",
    category: "optika",
    subcategory: "yoruglik_tarqalishi",
    name: "Yorug'lik dispersiyasi qonuni",
    nameRu: "Дисперсия света",
    formula: "n = f(λ)",
    latex: "n = a + \\frac{b}{\\lambda^2}",
    variables: [
      { symbol: "n", name: "Muhit izni", unit: "", description: "Sinish mutloq bahosi" },
      { symbol: "λ", name: "Rangi", unit: "m", description: "Masalan violet or red" }
    ],
    calculator: {
      solveFor: "info",
      inputs: ["Tushish"],
      defaultValues: { Tushish: 1 },
      formulaFn: "() => 'Qizil eng tez/oz oshar, Binafsha tormozda/tez tushar'",
      resultUnit: "qonun",
      resultLabel: "Nyuton spektr ajralishi"
    },
    description: "Moddaning sindirish ko'rsatkichi har doim unga urilayotgan yorug'lik rangiga tobe. Prizmada shuning sababidan Oppqoq yorug'lik barcha kamalak rangga ajrab ketadi.",
    example: "Binafsha rang qizilga qaraganda oynada hammadan ham ko'p qotib kuchli sinish burchagida adashadi.",
    tags: ["nyiutn", "dispersiya", "kamalak", "prizma"],
    difficulty: 2, grade: 11, lesson_link: "dispersiya", xp_reward: 10
  },

  // 17. Ko'z yaqin nuqta
  {
    id: "opt_017",
    category: "optika",
    subcategory: "linza_kozgu",
    name: "Sog'lom ko'zning optik sistemasi",
    nameRu: "Устройство глаза (Ближняя точка)",
    formula: "D ≈ 1 / L_yak = 4 дптр",
    latex: "D_{\\text{yaqin}} \\approx \\frac{1}{0.25} = 4 \\text{ dptr}",
    variables: [
      { symbol: "L", name: "Yaqin nuqta", unit: "m", description: "Oqiydigan charchamaslik masifa" }
    ],
    calculator: {
      solveFor: "D",
      inputs: ["L_kozi"],
      defaultValues: { L_kozi: 0.25 },
      formulaFn: "(l) => 1 / l",
      resultUnit: "dptr",
      resultLabel: "Qo'shish ko'z quvvati"
    },
    description: "Biyologiyada odatdagi sog'lom odam o'qiyotgan narsasini yuziga 25 sm dan (0.25 m) yaqin tutishi kiprik soxasi mushaklari nagruzkadan tez toladi. Linza +4D mos ravishda qoyadi uni.",
    example: "Uzoqni ko'rolmayiganlar kitobni tushirib 20 sm ga olganda L=0.2 edi shundan ularga linza yoziladi.",
    tags: ["ko'z", "25 sm", "ochki", "dptr"],
    difficulty: 1, grade: 8, lesson_link: "optik_asboblar", xp_reward: 5
  },

  // 18. Mikroskop
  {
    id: "opt_018",
    category: "optika",
    subcategory: "linza_kozgu",
    name: "Mikroskopning kattalashtirishi",
    nameRu: "Увеличение микроскопа",
    formula: "k_m = k_ob · k_ok",
    latex: "k_m = k_{ob} \\cdot k_{ok} \\approx \\frac{L}{F_{ob}} \\cdot \\frac{25 \\text{cm}}{F_{ok}}",
    variables: [
      { symbol: "k_ob", name: "Obyektiv karra", unit: "X", description: "Pastki morda" },
      { symbol: "k_ok", name: "Okulyar karra", unit: "X", description: "Ko'z qismi trubasi" }
    ],
    calculator: {
      solveFor: "K",
      inputs: ["kob", "kok"],
      defaultValues: { kob: 40, kok: 10 },
      formulaFn: "(b, k) => b * k",
      resultUnit: "X (Marta)",
      resultLabel: "Mikro K"
    },
    description: "Mikroskopda ism uzi ulkanlashib va u yana oxirgi linzada qo'shaloq yaqinlashgani karra qo'shilmaydi, karra ko'paytriladi.",
    example: "Obyektivning ustida x40 yozuvi bor. Oculuyar ustida x10 var. Bu ushbu biolog xulaynani 400 marta ulkan kurmoqda degani.",
    tags: ["mikroskop", "k", "kuzatish", "obyektiv"],
    difficulty: 1, grade: 8, lesson_link: "optik_asboblar", xp_reward: 5
  },

  // 19. Teleskop
  {
    id: "opt_019",
    category: "optika",
    subcategory: "linza_kozgu",
    name: "Teleskopning kattalashtirishi",
    nameRu: "Увеличение телескопа",
    formula: "k_t = F_ob / F_ok",
    latex: "k_T = \\frac{F_{ob}}{F_{ok}}",
    variables: [
      { symbol: "F_ob", name: "Katta ob, Fokus", unit: "m", description: "Yuzasi trubasi old qismi" },
      { symbol: "F_ok", name: "Okulyar fokus", unit: "m", description: "Ko'zi kuzatadigan orqa qismi" }
    ],
    calculator: {
      solveFor: "k",
      inputs: ["Fob", "Fok"],
      defaultValues: { Fob: 1, Fok: 0.05 },
      formulaFn: "(o, k) => o / k",
      resultUnit: "X (marta)",
      resultLabel: "Teleskop zum"
    },
    description: "Samodagi jismlar uzoq, shuning uchun teleskoplardagi trubalarning asosiy uzunligi k ni oshirish uchundir (F_ob katta qilib oblinadi).",
    example: "Teleskop F_obyektiv (katta ko'zgu/linza)gi 1 metr keladign uzoq fokus. Va F_ok = 5 sm (0.05 m). Zoom = 1 / 0.05 = 20 marta osmon ulkanroq ko'rinadi.",
    tags: ["teleskop", "astronomiya", "fokus", "optika"],
    difficulty: 2, grade: 8, lesson_link: "optik_asboblar", xp_reward: 10
  },

  // 20. Fotometrik (Yoritilganlik)
  {
    id: "opt_020",
    category: "optika",
    subcategory: "yoruglik_tarqalishi",
    name: "Yoritilganlik (Fotometriya)",
    nameRu: "Освещенность (Фотометрия)",
    formula: "E = Φ / S = I·cosα / R²",
    latex: "E = \\frac{\\Phi}{S} = \\frac{I}{R^2} \\cos\\alpha",
    variables: [
      { symbol: "E", name: "Yoritilganlik", unit: "lx (lyuks)", description: "Qanchalik stolda dars qilinishi" },
      { symbol: "Φ", name: "To'kish oqim", unit: "lm (lyumen)", description: "Lampochka chiqaradigan asos nur" },
      { symbol: "S", name: "Sirt yuzasi", unit: "m²", description: "Stol kattaligi kengligi" }
    ],
    calculator: {
      solveFor: "E",
      inputs: ["Phi", "S"],
      defaultValues: { Phi: 800, S: 2 },
      formulaFn: "(phi, s) => phi / s",
      resultUnit: "lx (Lyuks)",
      resultLabel: "Ish stolining ruxi (E)"
    },
    description: "Sotib olingan lampochka 800 lyumen bersa, uni nima ustiga qoyayotganligimiz va unda S qanchalik tarqalib singib ketishini, osha obyektning real lux (aqlli ko'rinish) darajasi asosi.",
    example: "12 Vatt svetodiod (≈ 800 lyumen). Stol yuzasi 2 metr². E = 800 / 2 = 400 lux (o'qishga mukammal).",
    tags: ["lux", "lyumen", "E", "qizg'anchiq", "fotometriya"],
    difficulty: 2, grade: 11, lesson_link: "fotometriya", xp_reward: 10
  },

  // ════════════════════════════════════════════════════════
  //  ATOM VA YADRO FIZIKASI (aty_001 → aty_016)
  // ════════════════════════════════════════════════════════

  // 1. Fotoeffekt (Eynshteyn)
  {
    id: "aty_001",
    category: "atom_yadro",
    subcategory: "kvant_fizika",
    name: "Fotoeffekt uchun Eynshteyn tenglamasi",
    nameRu: "Уравнение Эйнштейна для фотоэффекта",
    formula: "h·f = A_chiqish + K_max",
    latex: "hf = A_{ch} + \\frac{mv^2}{2}",
    variables: [
      { symbol: "h·f", name: "Foton energiyasi", unit: "J", description: "Nur zarbasi (h=6.626×10⁻³⁴)" },
      { symbol: "A_ch", name: "Chiqish ishi", unit: "J", description: "Elektronni metall yuzasidan sug'urib olish narxi" },
      { symbol: "K_max", name: "Kinetik en.", unit: "J", description: "Elektronning tashqariga uchib chiqish kuchi (mv²/2)" }
    ],
    calculator: {
      solveFor: "K",
      inputs: ["hf", "Ach"],
      defaultValues: { hf: 5e-19, Ach: 3e-19 },
      formulaFn: "(hf, ach) => hf - ach",
      resultUnit: "J (Joul)",
      resultLabel: "Otilib chiqish E_k"
    },
    description: "Yorug'lik zarrasi (Foton) metallga urilganda bor kuchini 1ta elektronga beradi. Bu kuch himoyani (A_ch) yengsa qolgani uchib ketishiga sarflanadi. Eynshteynga shu uchun Nobel berilgan.",
    example: "Foton 5e-19 J berib 3e-19 tiyin himoyaga (Ach) tolandi. Chiqib qochish tezligi kuchi 2e-19 J (Qizish / tok urishi) degani.",
    tags: ["eynshteyn", "fotoeffekt", "foton"],
    difficulty: 3, grade: 11, lesson_link: "fotoeffekt", xp_reward: 15
  },

  // 2. Foton energiyasi
  {
    id: "aty_002",
    category: "atom_yadro",
    subcategory: "kvant_fizika",
    name: "Foton energiyasi (Plank)",
    nameRu: "Энергия фотона",
    formula: "E = h·f = h·c/λ",
    latex: "E = hf = \\frac{hc}{\\lambda}",
    variables: [
      { symbol: "E", name: "Energiya", unit: "J / eV", description: "Zarra kuchi" },
      { symbol: "h", name: "Plank doimiysi", unit: "J·s", description: "6.63×10⁻³⁴" },
      { symbol: "f", name: "Chastota", unit: "Hz", description: "" }
    ],
    calculator: {
      solveFor: "E",
      inputs: ["f"],
      defaultValues: { f: 1e15 },
      formulaFn: "(f) => 6.626e-34 * f",
      resultUnit: "J",
      resultLabel: "E"
    },
    description: "Maks Plank formulasiga binoan, Yorug'lik uzluksiz to'lqin emas, balki aniq porsiyali paket (Kvant/Foton) lar shaklida energiya tashiydi.",
    example: "f = 1e15 hz ubn nuri sirti energiyasi: E = 6.6e-34 · 1e15 = 6.6e-19 J.",
    tags: ["plank", "foton", "energiya"],
    difficulty: 2, grade: 11, lesson_link: "kvant", xp_reward: 10
  },

  // 3. Foton impulsi
  {
    id: "aty_003",
    category: "atom_yadro",
    subcategory: "kvant_fizika",
    name: "Foton massasi va impulsi",
    nameRu: "Импульс фотона",
    formula: "p = h / λ = E / c",
    latex: "p = \\frac{h}{\\lambda} = \\frac{E}{c}",
    variables: [
      { symbol: "p", name: "Impuls", unit: "kg·m/s", description: "Urilish zarbasi" },
      { symbol: "λ", name: "To'lqin", unit: "m", description: "" }
    ],
    calculator: {
      solveFor: "p",
      inputs: ["lambda"],
      defaultValues: { lambda: 5e-7 },
      formulaFn: "(la) => 6.626e-34 / la",
      resultUnit: "kg*m/s",
      resultLabel: "Zarba impulsi"
    },
    description: "Foton oddiy jismlardek 'massa' ga ega emas (tinchlik massasi 0), ammo juda tez oqayotgani uchun to'siqqa bosim (impuls) o'tkaza oladi. Zarracha hususiyati.",
    example: "λ = 500 nm dagi yashil rang nurlari P = 6.6e-34 / 5e-7 = 1.3e-27 ni tashkil qildi.",
    tags: ["impuls", "zarracha", "foton"],
    difficulty: 2, grade: 11, lesson_link: "kvant", xp_reward: 10
  },

  // 4. de Broyl to'lqini
  {
    id: "aty_004",
    category: "atom_yadro",
    subcategory: "kvant_fizika",
    name: "de Broyl to'lqin uzunligi",
    nameRu: "Длина волны де Бройля",
    formula: "λ = h / (m·v) = h / p",
    latex: "\\lambda = \\frac{h}{p} = \\frac{h}{mv}",
    variables: [
      { symbol: "λ", name: "Moddiy to'lqin", unit: "m", description: "Odam tebranish kattaligi" },
      { symbol: "m", name: "Jism massai", unit: "kg", description: "" },
      { symbol: "v", name: "Tezlik", unit: "m/s", description: "" }
    ],
    calculator: {
      solveFor: "lambda",
      inputs: ["m", "v"],
      defaultValues: { m: 9.1e-31, v: 1e6 },
      formulaFn: "(m, v) => 6.626e-34 / (m * v)",
      resultUnit: "m",
      resultLabel: "λ"
    },
    description: "Fransuz olimiga ko'ra nafaqat fotonlar, balki ODDIY TOSH yoki ELEKTRON (modda) hm ochiq fazoda xuddi to'lqindek tebranib uchadi. Katta tezlik/massa bilan ishlaganda to'lqin nolga yaqin bopqoladi shunga bizga to'sh sezilmidi.",
    example: "Elektron 1 mln tezlikda vatsa = λ = ~ 7×10⁻¹⁰ m. Inson 10 m/s chaqsa to'lqini ≈ 1e-36 m (Absolyut tekis chiziq).",
    tags: ["de broyl", "korpuksulyar-tolqin", "dualizm"],
    difficulty: 3, grade: 11, lesson_link: "dualizm", xp_reward: 15
  },

  // 5. Borning 1-postulati
  {
    id: "aty_005",
    category: "atom_yadro",
    subcategory: "atom_modeli",
    name: "Borning 1-postulati (Orbitalar)",
    nameRu: "Первый постулат Бора",
    formula: "m·v·r = n·h / (2π)",
    latex: "mvr = n\\frac{h}{2\\pi} \\quad (n=1,2,...)",
    variables: [
      { symbol: "mvr", name: "Harakat miqdori momenti", unit: "", description: "Elektron aylanayotgndagi impulsni r ga summasi" },
      { symbol: "n", name: "Orbita tartibi", unit: "", description: "Kvant raqami: 1-daraja, 2-daraja (qavatlar)" }
    ],
    calculator: {
      solveFor: "L",
      inputs: ["n"],
      defaultValues: { n: 1 },
      formulaFn: "(n) => n * (6.626e-34 / (2 * Math.PI))",
      resultUnit: "J·s",
      resultLabel: "Aylana harakat M"
    },
    description: "Elektron yadro atrofida istalgan yulda emas faqat shunday aniq chizilgan 'ruxsat berilgan' radiusli temir yo'llaridagina (n=1,2.. bunde kasr siz) barqaror aylanib yuradi deb Klassik fizika chigarchilishiga kvant mexanika qo'shgan edi.",
    example: "n=1 - Asosiy ruxsat etilgan 1-qavat energetik sathidir.",
    tags: ["bor", "model", "n", "orbita"],
    difficulty: 3, grade: 11, lesson_link: "bor_postulat", xp_reward: 15
  },

  // 6. Borning 2-postulati
  {
    id: "aty_006",
    category: "atom_yadro",
    subcategory: "atom_modeli",
    name: "Borning 2-postulati (Nur sochish)",
    nameRu: "Второй постулат Бора",
    formula: "h·f = E₂ - E₁",
    latex: "hf = E_n - E_m",
    variables: [
      { symbol: "h·f", name: "Foton", unit: "J", description: "Bitta yorug'lik portlashi" },
      { symbol: "E₂", name: "Yuqori oribta", unit: "J", description: "1 barobar kattaroq pot.energiya" },
      { symbol: "E₁", name: "Pastki oribta", unit: "J", description: "" }
    ],
    calculator: {
      solveFor: "E_photon",
      inputs: ["E2", "E1"],
      defaultValues: { E2: -5.44e-19, E1: -2.17e-18 },
      formulaFn: "(e2, e1) => Math.abs(e2 - e1)",
      resultUnit: "J",
      resultLabel: "Porlab ketishi (Foton)"
    },
    description: "Elektron balandroq orbitadan passrog'iga 'sakrab' o'tganda ortiqcha energiyani yorug'lik 'foton'i tarzida chaqnatib atrofga yuboradi. Lazer tamoyiil poydevori.",
    example: "E2 = -3.4 eV dan E1 = -13.6 eV ga tushsa 10.2 eV farq evaziga aniq bir UV rang li nur sochildi degani.",
    tags: ["foton sochish", "sakrash", "bor"],
    difficulty: 2, grade: 11, lesson_link: "bor_postulat", xp_reward: 10
  },

  // 7. Vodorod atomi energiya sathi
  {
    id: "aty_007",
    category: "atom_yadro",
    subcategory: "atom_modeli",
    name: "Vodorod stasionar holatlari E(n)",
    nameRu: "Энергетические уровни водорода",
    formula: "E_n = -13.6 eV / n²",
    latex: "E_n = -\\frac{13.6 \\text{ эВ}}{n^2}",
    variables: [
      { symbol: "E_n", name: "Qavat energiyasi", unit: "eV (elektronvolt)", description: "Elektron qanchalik bogli" },
      { symbol: "n", name: "Bosh kvant son", unit: "", description: "Orbita 1, 2, 3 ..." }
    ],
    calculator: {
      solveFor: "E",
      inputs: ["n"],
      defaultValues: { n: 2 },
      formulaFn: "(n) => -13.6 / (Math.pow(n, 2))",
      resultUnit: "eV",
      resultLabel: "Energiya Joushi"
    },
    description: "Elektron yadroga qancha yaqin (n=1) bo'lsa shunchalik maxkam ushlangan ushbu -13.6 eV minus atomning tuzilishi himoyasi hisoblanadi. n=Infinity ga borib 0 boqoladi (atomni tark).",
    example: "n=2 sath energiyasi E = -13.6 / 4 = -3.4 eV ga teng. Agar nol bo'lsa erkin zarraga aylanadi.",
    tags: ["vodorod", "qavat", "elektronvolt", "kvant_son"],
    difficulty: 3, grade: 11, lesson_link: "bor_postulat", xp_reward: 15
  },

  // 8. Qizil chegara
  {
    id: "aty_008",
    category: "atom_yadro",
    subcategory: "kvant_fizika",
    name: "Fotoeffektning qizil chegarasi",
    nameRu: "Красная граница фотоэффекта",
    formula: "f₀ = A_ch / h  yoki  λ_max = h·c / A_ch",
    latex: "\\nu_{min} = \\frac{A_{ch}}{h}, \\quad \\lambda_{max} = \\frac{hc}{A_{ch}}",
    variables: [
      { symbol: "f₀", name: "Minimal chastota", unit: "Hz", description: "Shundan sal sekin ursa chiqmaydi" },
      { symbol: "A_ch", name: "Muhofaza (chiqish)", unit: "J", description: "" }
    ],
    calculator: {
      solveFor: "f0",
      inputs: ["Ach"],
      defaultValues: { Ach: 4e-19 },
      formulaFn: "(ach) => ach / 6.626e-34",
      resultUnit: "Hz",
      resultLabel: "Past chastota"
    },
    description: "Nur qanchalik kuchli chiroq bolmasin, uning f chastotasi yetarli bo'lmasa fotoeffekt rostan boshlanmaydi. Kritik urish chastotasining o'zi Yetarli 'qizil zona'.",
    example: "Ach = 3e-19 J. f = 3e-19 / 6.6e-34 = 4.5e14 Hz dan kuchli (moviyroq) nur kereg.",
    tags: ["qizil", "chegara", "fotoeffekt"],
    difficulty: 2, grade: 11, lesson_link: "fotoeffekt_qizil", xp_reward: 10
  },

  // 9. Massa defekti
  {
    id: "aty_009",
    category: "atom_yadro",
    subcategory: "yadro",
    name: "Massa defekti",
    nameRu: "Дефект массы",
    formula: "Δm = (Z·m_p + N·m_n) - M_y",
    latex: "\\Delta m = (Z m_p + N m_n) - M_{\\text{yad}}",
    variables: [
      { symbol: "Z", name: "Protonlar soni", unit: "dona", description: "" },
      { symbol: "N", name: "Neytronlar", unit: "dona", description: "A - Z (massadan p ayrilsa)" },
      { symbol: "M_y", name: "Birlashgan yadro", unit: "u (m.a.b.)", description: "Asl tarozidagi massasi" }
    ],
    calculator: {
      solveFor: "dm",
      inputs: ["Z", "N", "M_yadro"],
      defaultValues: { Z: 2, N: 2, M_yadro: 4.0015 },
      formulaFn: "(z, n, my) => (z * 1.00728 + n * 1.00866 - my)",
      resultUnit: "u. (a.m.b)",
      resultLabel: "G'oyib bo'lgan og'irlik"
    },
    description: "Mo'jiza shundaki: alohida turgan 2ta proton va 2 neytron og'irligi, ularni bitta yadro(geliy) qilib yigishtirgandan ko'ra ko'proq! (0.03 m birlikka kamayib, energiyaga charxlanib ketgan).",
    example: "Ikki qo'lda 5kg dan 10kg narsa birlashib 9kg chiqishi bu Massa Defekti. Ayirmasi ulanish energiyasini beradi.",
    tags: ["defekt", "massa", "yadro"],
    difficulty: 3, grade: 11, lesson_link: "massa_defekt", xp_reward: 15
  },

  // 10. Boglanish energiyasi
  {
    id: "aty_010",
    category: "atom_yadro",
    subcategory: "yadro",
    name: "Yadro bog'lanish energiyasi",
    nameRu: "Энергия связи ядра",
    formula: "E_bog = Δm·c²",
    latex: "E_{\\text{sv}} = \\Delta m c^2",
    variables: [
      { symbol: "E_b", name: "Bog'lanish en", unit: "J (yoki MeV)", description: "Qanchalik mustahkam yopishtirirgan" },
      { symbol: "Δm", name: "Massa defekti", unit: "kg", description: "" }
    ],
    calculator: {
      solveFor: "E",
      inputs: ["dm"],
      defaultValues: { dm: 1e-28 },
      formulaFn: "(dm) => dm * 3e8 * 3e8",
      resultUnit: "J (Joul)",
      resultLabel: "Portlash zaxirasi"
    },
    description: "Yo'qolib qolgan Δm massa Eynshteyn formulasi c² orqali bahaybat energiyaga aylangan, yadrolarni parchalamay ushlab turadi. Yadro bombasi asosi.",
    example: "Heliy geliy yadrosida ~28 MeV energiyasi yashiringan holda biriksa, portlab tashqariga chiqarib beradi.",
    tags: ["boglanish", "energiya", "yadro_portlash"],
    difficulty: 3, grade: 11, lesson_link: "massa_defekt", xp_reward: 15
  },

  // 11. Bir nuklonga bog'lanish energiyasi
  {
    id: "aty_011",
    category: "atom_yadro",
    subcategory: "yadro",
    name: "Solishtirma bog'lanish energiyasi",
    nameRu: "Удельная энергия связи",
    formula: "ε = E_bog / A",
    latex: "\\varepsilon = \\frac{E_{\\text{sv}}}{A}",
    variables: [
      { symbol: "ε", name: "Solishtirma", unit: "MeV/nuklon", description: "1 ta a'zoga to'g'ri keladigan kuch" },
      { symbol: "A", name: "Massaviy son", unit: "", description: "Proton + neytron umumiy yigindisi" }
    ],
    calculator: {
      solveFor: "eps",
      inputs: ["E", "A"],
      defaultValues: { E: 28, A: 4 },
      formulaFn: "(e, a) => e / a",
      resultUnit: "MeV",
      resultLabel: "1 ta ga"
    },
    description: "Mendeleyev tablitsasida kimning yadrosi eng pishiq! Temir (Fe) ning ε lari eng yuqori bolganligi uchun parchalanmas barqarordir. Uran esa kottalaship bo'shashadi.",
    example: "Heliy A=4, E_bog = ~28MeV, bittasiga tushgani e = 28/4 = 7 MeV / nuklon.",
    tags: ["solishtirma", "barqarorlik", "temir"],
    difficulty: 2, grade: 11, lesson_link: "yadro_barqa", xp_reward: 10
  },

  // 12. Eynshteyn (Massa/E)
  {
    id: "aty_012",
    category: "atom_yadro",
    subcategory: "yadro",
    name: "Massa va Energiya ekvivalentligi",
    nameRu: "Раздел Энергии и Массы Эйнштейна",
    formula: "E = m·c²",
    latex: "E = mc^2",
    variables: [
      { symbol: "E", name: "Umumiy harakatsizlik en", unit: "J", description: "" },
      { symbol: "m", name: "Jism og'irligi", unit: "kg", description: "Misol stakan ruchka" },
      { symbol: "c²", name: "Vakuum tezligi kvadrati", unit: "", description: "9 × 10¹⁶" }
    ],
    calculator: {
      solveFor: "E",
      inputs: ["m"],
      defaultValues: { m: 0.001 },
      formulaFn: "(m) => m * Math.pow(3e8, 2)",
      resultUnit: "Joul",
      resultLabel: "Kosmik Energiya"
    },
    description: "Har qanday ko'zga ko'rinadigan 1 dona oddiy tosh yohud Qalam... agar uni toza yorug'lik energiyasiga 100% ob ketsak QUVVATI nechchi bo'larkan degan daxshat formuladir.",
    example: "1 gr (0.001 kg) tuz = 0.001 * 9·10¹⁶ = 90 TJ (Tera Joul - deyarli Kichkina shahar portlashi). Buni hali osonlikcha tola energiyaga chiqarolmaymiz.",
    tags: ["mc2", "mashxur", "eynshteyn"],
    difficulty: 1, grade: 10, lesson_link: "relativizm", xp_reward: 5
  },

  // 13. Radioaktiv yemirilish
  {
    id: "aty_013",
    category: "atom_yadro",
    subcategory: "radioaktivlik",
    name: "Radioaktiv yemirilish qonuni",
    nameRu: "Закон радиоактивного распада",
    formula: "N = N₀ · e^(-λt)  (yoxud N₀ / 2^(t/T))",
    latex: "N = N_0 e^{-\\lambda t}",
    variables: [
      { symbol: "N", name: "Qolgan parchalanmagan", unit: "dona", description: "Tirik yadro miqdori" },
      { symbol: "N₀", name: "Boshlangich", unit: "ta", description: "" },
      { symbol: "λ", name: "Konstanta", unit: "s⁻¹", description: "Buzilish moyilligi" }
    ],
    calculator: {
      solveFor: "N",
      inputs: ["N0", "lambda", "t"],
      defaultValues: { N0: 1000, lambda: 0.1, t: 7 },
      formulaFn: "(n0, la, t) => n0 * Math.exp(-la * t)",
      resultUnit: "qoldiq (tirik)",
      resultLabel: "N"
    },
    description: "Og'ir elementlar tarkibidagi yadrolar beqarorligi sabab ozlaridna alha beta urib yengillashib boradi va qog'ozdagi statistika qonunayatlarga asosan soni asta sekin kamayb boqoladi.",
    example: "N0 = 1000 ta, huddi eksponenta tushayotgandek vaqt (t) bilan qolgan modda yarimi nol bolib qisqarib otiradi.",
    tags: ["yemirilish", "eksponenta", "radioaktiv"],
    difficulty: 3, grade: 11, lesson_link: "radioaktivlik", xp_reward: 15
  },

  // 14. Yarim yemirilish davri
  {
    id: "aty_014",
    category: "atom_yadro",
    subcategory: "radioaktivlik",
    name: "Yarim yemirilish davri (T₁/₂)",
    nameRu: "Период полураспада",
    formula: "T = ln(2) / λ ≈ 0.693 / λ",
    latex: "T_{1/2} = \\frac{\\ln 2}{\\lambda}",
    variables: [
      { symbol: "T", name: "Davr", unit: "s, oy, yil", description: "Aynan yarmi yo'qolishiga ketadigan Vaqt" },
      { symbol: "λ", name: "Konstanta", unit: "", description: "" }
    ],
    calculator: {
      solveFor: "T",
      inputs: ["la"],
      defaultValues: { la: 0.05 },
      formulaFn: "(la) => Math.LN2 / la",
      resultUnit: "Vaqt T",
      resultLabel: "Yarimiga kemayish davri"
    },
    description: "Masalan 1 kg modda 500 gramm qolishi uchun aynan davr T kerak. Qolgan yana usha yarmio 250 g qolishi uchun ham YANA T vaqt ketadi (muttasil qisqarish).",
    example: "Karbon-14 izotopi: T≈5730 yil milt uradi, shunihng orqasida arxeoleoglar dionyusovrlarni topilishini nechchi yoshdaligini miqdordan tortib olishadi.",
    tags: ["yarim", "davr", "T_1_2", "yemirilish"],
    difficulty: 2, grade: 11, lesson_link: "radioaktivlik_2", xp_reward: 10
  },

  // 15. Lambda (Tesorovroqlik)
  {
    id: "aty_015",
    category: "atom_yadro",
    subcategory: "radioaktivlik",
    name: "Yemirilish konstantasi",
    nameRu: "Постоянная радиоактивного распада",
    formula: "λ = ln2 / T",
    latex: "\\lambda = \\frac{\\ln 2}{T}",
    variables: [
      { symbol: "λ", name: "Doimiylik", unit: "1/s", description: "Bitta yadroning huddi soniyasiya portlab ketish ehtimoli" },
      { symbol: "T", name: "Yarim davri", unit: "s", description: "" }
    ],
    calculator: {
      solveFor: "lambda",
      inputs: ["T"],
      defaultValues: { T: 13.8 },
      formulaFn: "(t) => Math.LN2 / t",
      resultUnit: "s⁻¹",
      resultLabel: "λ konstant"
    },
    description: "Davri qanchalar tez va qisqa bo'lsa λ ulushi shunxhalik yirtqishdek baland ehtimoliy tezkor radiasiyaga moyildir.",
    example: "Radon ning yarim yemirlishi 3.8 kun (k_ga aylantrgsak), uning lambdasi osmondadir.",
    tags: ["lambda", "ehtimol", "tezlik"],
    difficulty: 2, grade: 11, lesson_link: "radioaktivlik_2", xp_reward: 10
  },

  // 16. Radioaktiv aktivlik
  {
    id: "aty_016",
    category: "atom_yadro",
    subcategory: "radioaktivlik",
    name: "Namunaning radioaktiv faolligi",
    nameRu: "Активность радиоактивного источника",
    formula: "A_ktivlik = λ · N",
    latex: "A = \\lambda N",
    variables: [
      { symbol: "A", name: "Faollik jonsarak", unit: "Bq (Bekkerel)", description: "1 soniyadagi yemirilib ketgan yadrolar zaryadi urishi" },
      { symbol: "λ", name: "Konstanta ehtimoli", unit: "1/s", description: "" },
      { symbol: "N", name: "Hozirgina mavjud tirik soni", unit: "ta", description: "" }
    ],
    calculator: {
      solveFor: "A",
      inputs: ["la", "N"],
      defaultValues: { la: 0.1, N: 1e6 },
      formulaFn: "(la, n) => la * n",
      resultUnit: "Bq",
      resultLabel: "Portlash/s aktivlik"
    },
    description: "1 Bekkerel bu roppa-rosa 1 sekundda 1 dona atom yadrosi qars etib yemirilganlik kuchiga aytiladi. Bu hisoblagich radarlar (geyger trubkasi) ishlash mexnizmi hisobidagi miqdordir.",
    example: "Agar qo'lingizda N=1 000 000 yadro va uning 0.1 yirtqishlik ehtimli bolrsa 1 sekund keyin roppa rosa 100 Mingta atom qarsilladi A=100.000 Bq geya baland urgan hisoblanadi.",
    tags: ["bekkerel", "aktivlik", "radiasiya", "Geyger"],
    difficulty: 2, grade: 11, lesson_link: "aktivlik", xp_reward: 10
  }

];

// ─── YORDAMCHI FUNKSIYALAR ───────────────────────────────────

/** Kategoriya bo'yicha formulalarni filtrlash */
export function getFormulasByCategory(categoryId) {
  return FORMULAS.filter(f => f.category === categoryId);
}

/** ID bo'yicha bitta formulani olish */
export function getFormulaById(id) {
  return FORMULAS.find(f => f.id === id) || null;
}

/** Matn bo'yicha qidirish — 3 tilda (nom, tags, tavsif) */
export function searchFormulas(query) {
  const q = query.toLowerCase().trim();
  if (!q) return FORMULAS;
  return FORMULAS.filter(f =>
    f.name.toLowerCase().includes(q) ||
    f.nameRu.toLowerCase().includes(q) ||
    (f.nameEn && f.nameEn.toLowerCase().includes(q)) ||
    f.description.toLowerCase().includes(q) ||
    (f.descRu && f.descRu.toLowerCase().includes(q)) ||
    (f.descEn && f.descEn.toLowerCase().includes(q)) ||
    f.tags.some(tag => tag.toLowerCase().includes(q)) ||
    f.formula.toLowerCase().includes(q)
  );
}

/** Qiyinlik darajasi bo'yicha filtrlash (1, 2, yoki 3) */
export function getFormulasByDifficulty(level) {
  return FORMULAS.filter(f => f.difficulty === level);
}

/**
 * Tilga mos formula nomini qaytaradi
 * @param {Object} formula
 * @param {'uz'|'ru'|'en'} lang
 */
export function getFormulaName(formula, lang = 'uz') {
  if (lang === 'ru') return formula.nameRu || formula.name;
  if (lang === 'en') return formula.nameEn || formula.name;
  return formula.name;
}

/**
 * Tilga mos formula tavsifini qaytaradi
 * @param {Object} formula
 * @param {'uz'|'ru'|'en'} lang
 */
export function getFormulaDescription(formula, lang = 'uz') {
  if (lang === 'ru') return formula.descRu || formula.description;
  if (lang === 'en') return formula.descEn || formula.description;
  return formula.description;
}

/**
 * Tilga mos formula misolini qaytaradi
 * @param {Object} formula
 * @param {'uz'|'ru'|'en'} lang
 */
export function getFormulaExample(formula, lang = 'uz') {
  if (lang === 'ru') return formula.exampleRu || formula.example;
  if (lang === 'en') return formula.exampleEn || formula.example;
  return formula.example;
}

/**
 * Tilga mos kategoriya nomini qaytaradi
 * @param {Object} category
 * @param {'uz'|'ru'|'en'} lang
 */
export function getCategoryLabel(category, lang = 'uz') {
  if (lang === 'ru') return category.labelRu || category.label;
  if (lang === 'en') return category.labelEn || category.label;
  return category.label;
}

/** Umumiy formula soni */
export const TOTAL_FORMULAS = FORMULAS.length;

// User Requested ALIAS methods
export const getByCategory = (cat) => FORMULAS.filter(f => f.category === cat);
export const getById = (id) => FORMULAS.find(f => f.id === id);
export const TOTAL_COUNT = FORMULAS.length;
