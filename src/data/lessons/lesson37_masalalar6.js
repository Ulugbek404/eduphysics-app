// 37-§. Masalalar yechish
export const lesson37 = {
    id: '9-l-66',
    chapter_id: '9-ch-04',
    title: '37-§. Masalalar yechish (Guk va deformatsiya)',
    description: "Materialning qattiqligi, cho'zilishi va Yung modulli ostida kelib chiquvchi muhandislik amaliy tahlillari.",
    order_number: 7,
    duration_minutes: 25,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 5,
    difficulty: 'hard',

    content: {
        key_concepts: [
            'Kuchlanish va Epsilon muvofatdorligida zanjir',
            'Diametr qinqiqligidagi sirt asosini qayta qurish'
        ],

        theory: `Mustahqkamlik amaliyotisiz metall inshootlarni barpo qilib bo'lmaydi. Binolar qulamasligi u-n uni tortib turgin temirlarga maksimal ruxsat etkizilgan $\\sigma_{ruxsat}$ kuchlanishi chegarasida bahlo beradi injinerlar. Eslang formulasini (Guk qoidalar):
F = \\sigma * S 
va O'ziz Guk toza holda : \\sigma = E * (Delta l / l_0).
Maydon S ko'pincha radius dorgali tortilgan sym bo'lgan u-n: $S = \\pi \\cdot r^2$ kabi ochiladi masalada hisobi u-n.`,

        formulas: [
            {
                name: 'Moddiy kengayaigan muammosi Guki zanjirida',
                formula: 'F = \\frac{E \\cdot S \\cdot \\Delta l}{l_0}',
                text: 'F = E * S * DeltaL / l_0',
                description: 'Qachoniki kuch F kerakliki lekin srazi hamma Epsilon (dl/l) tula bo\'sa uni yigidigan umum topimi tenglamasi. (K-biki k*x)'
            }
        ],

        examples: [
            {
                title: "Trosni xavfli kutariglishi osmondi",
                problem: "Radius(r) 2mm (S dagi Pi*R^2 u-n m^2= o'zingsiga ochasiz), uzinligi (L_0= 4 metr) po'latdan tuqilgan tros yukqa boglandi. P'latning Yungi E = 200 GPa (bu 2 * 10^{11} Pa dir). Yukning pastga ezilishi unga 5000 N tashqi kuvatsn ishi kurdi cho'zmiga. Qancha dl sm ga Tros cho'zilib uzinlashdki tavakkali?",
                given_data: {"r": "0.002 m", "L0": "4 m", "E": "2 * 10^{11} Pa", "F": "5000 N"},
                solution_steps: [
                    "Birncha kesma yuzi S ini kvadratiga surab olamzika aylanasimi. S = 3.14 * (0.002)^2 = 3.14 * 0.000004 = 0.00001256 m^2.",
                    "F= E * S * (Dl / L0)",
                    "Deltal(dl) topimi: Dl = (F * L0) / (E * S)",
                    "Hisobka qoyamziki: Dl = (5000 * 4) / (200 000 000 000 * 0.00001256)",
                    "Tepadagi F*L0 = 20 000. Pastdagi esa: 2 * 10^11 * 1.256 * 10^-5 = 2.51 * 10^6 = 2 512 000.",
                    "Bo'lish Dl = 20000 / 2512000 = 0.0079 metr"
                ],
                solution: "Deltl ni metri qogogzida sm yoki mm ga alamashtirsak yengil foshdi. Dl= 7.9 millimetriga ! (Atiga shu uncha yukta bir sm xam yozilmadi)",
                answer: "Dl = ~7.9 mm",
                difficulty: 'hard'
            },
            {
                title: "Ruxsat darajasini sigmasi",
                problem: "Strukturaga 300 Mpa maxsimum tarangikiga (Ruxsatiga sigma) bardoshi yoza olingni fandi. Kesimisi sim S= 50 mm2 b-n xuddi shu metall turgan bopkeda, siz uni nechi N kuchligina koatairlib ilonib uqata olas zindonga xabardor qilib?",
                given_data: {"sigma_max":"300 * 10^6 Pa", "S":"50 mm2 = 50 * 10^{-6} m2"},
                solution_steps: [
                    "Eng ohirgis ruxsat kuchi aslidiki formulada: F_max = sigma_max * S",
                    "F_max = (300 000 000) * (0.000050)",
                    "Sifaralari qirqilqadi daryoda, F = 300 * 50 = 15 000 N."
                ],
                solution: "Yani jism 1.5 tonnani(15000 N mg desak) ko'taradi faqat! Undan osish maxsismumsigmanini yuqotib uzilib keteadi ulov yariom boib yitiladi.",
                answer: "Eng Maksimal F = 15000 N barodoshidi borida",
                difficulty: 'medium'
            }
        ]
    },
    
    questions: [
        {
            id: 1,
            question: "Guk tahlillarida osildgan Temirning qaysiki husuyasi uni osan chuzilmashini sababi E bilan ko'rsata qildik biz unini?",
            options: ["Epsilon mantiqi yoziga", "Yungning zot moduli E si uzigagina", "Faqatsigimasi pskal."],
            correct: 1,
            explanation: "Asosli materialqiki o'zigi farqi moduli Yungda, yogochikin boshqi aliminki boshqa, po'litniki qattiqrk zot boladi u.",
            difficulty: 'easy'
        },
        {
            id: 2,
            question: "Agar S kesmsimiz kvadrat shakliga xossaliksa unda yuzani pi_r_kvadrat dirmizimi msalqadi yoq a * b ga xudisiykmi?",
            options: ["Pi bilan ishlemizz yana ham o'qa baribir tross aymla yuzi bolagadi xisobiyda", "S = a^2 ga tugar chunki shaklkasi qirrali ustun devoriday tuwtik", "S xoxmaga foga"],
            correct: 1,
            explanation: "Yo'q kesmiq diametri aylanda pir^2 buladi haqqikqan xam. Ammo shaklkasi temiri blokka yoki relskaya bosa u sirtika qira 1 ta va 2tasida asrab S= a * b tortilanizik.",
            difficulty: 'medium'
        },
        {
            id: 3,
            question: "Guk qoshilgan kuch F qaysidira proporsiniol miqdoigda tekis o'tadi uzayishing (Delta l iga)?",
            options: ["Tugri qatiy o'zogini proprsionali F oshisa dl xami unga mos tekksi osyuradsi (Ealstik icidan olqonca)", "Teskariyki proprosioaliz", "F faqt g ukada qatnasha omadi"],
            correct: 0,
            explanation: "Guk aytadiki Qnchali ezsang shunchik izimiyam oshadi xudo tugarip proporsiyalik.",
            difficulty: 'easy'
        },
        {
            id: 4,
            question: "Yengilliy mantiqi 2: L_0 = 1m. dl = 1sm. Nsibiy uzulshiki foizu epsiloni nech qildi asrlarfzi hisopda?",
            options: ["0.01 (yoki 1%)", "10%", "Nolki qolmadi", "1 m deb"],
            correct: 0,
            explanation: "L0=100sm aslikda. Eps= 1sm / 100sm = 0.01 qaydiga o'tirliadi. Zot 1izla asidna % foizga kishiklik.",
            difficulty: 'easy'
        },
        {
            id: 5,
            question: "Elastikli mudhshligi tamolil yuzuz kelib buzldish kuchi maxsulim qancha kattaroq Ruxstatik sigmanini xam ezib yoqolib kitsai? nimga etdimi?",
            options: ["Yovuz plastikiydan qolb ketadi sinikchi", "O'zligini saqlagan", "Sigma nolga o'tgab tustdi"],
            correct: 0,
            explanation: "Ealstqidan otkaniga barbdosiy Ruxsatikidan utganga yorily u plastkiyi pchoqi gijmisi boshldi",
            difficulty: 'medium'
        }
    ]
};
