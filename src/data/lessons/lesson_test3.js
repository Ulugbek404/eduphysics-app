// 3-bob yuzasidan testlar
export const lessonTest3 = {
    id: '9-l-55',
    chapter_id: '9-ch-03',
    title: "3-BOB YUZASIDAN MAXSUS TESTLAR",
    description: "Oldingi bilimlaringiz muhandislik baholarida nazorat qilish blok post tizimi (Test o'yini)",
    order_number: 6,
    duration_minutes: 20,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 15,
    difficulty: 'hard',

    content: {
        key_concepts: [
             'Jami ishlangan ishlarning va nazariyalarning keng formatdagi testlar takrori'
        ],
        theory: "Bobni tushunishni to'liq kafolatlash uchun ushbu 15 lik maxsus test bloki imtixon rejimida taqdim etiladi. E'tibor bilan yechnig va mustaqil xulosa yozishdan charchamang. Siz albatta uddalaysiz!",
        formulas: [],
        examples: []
    },

    questions: [
        {
            id: 1,
            question: "Isitgichsiz issiqlik motor ishlasa bo'ladimi?",
            options: ["Bo'ladi, atrofni yeb ishlashi m-n", "Bo'lmaydi, harorat kuchini ishlata olishimiz kerak", "Ha agar radiator katta bo'lsa"],
            correct: 1,
            explanation: "Sovitici yo'q mator umuman mumkinmasidek isitkishisizam umuan energiya bermaydiku",
            difficulty: 'easy'
        },
        {
            id: 2,
            question: "IYOD ga nega o'shanga o'xshash nomini qo'yishgan?",
            options: ["Unda suv bug'lanmasligi uchun", "Yoqilg'ini porshen orqasi isichida yondirilganlikdan", "Metall arzonligi uchun"],
            correct: 1,
            explanation: "Yoquvchisi bevosita ichida chaqnagani u-n IYOD deyiladi.",
            difficulty: 'easy'
        },
        {
            id: 3,
            question: "Ichki yonuvning 3-chisi nima edi nomida?",
            options: ["Olovlanib ISH bajarishg", "Siqish va egov", "Chiqish ulovidan"],
            correct: 0,
            explanation: "Taktlar: S'orish, Siqish, Ish(oloy), va Chiqarish.",
            difficulty: 'easy'
        },
        {
            id: 4,
            question: "Sham qaysi yoqolgi turuga majbur qushilishi keragidi?",
            options: ["Kerosin va dizelda", "Toza Karbyuratorlik/Benzin motorida", "Poyezd pechida"],
            correct: 1,
            explanation: "Benzin o'zi yuzga uz portlamiydi. U albatta uquqli sham tortishiga muxtoj sezadi.",
            difficulty: 'medium'
        },
        {
            id: 5,
            question: "Termodinamik FIK formulasi?",
            options: ["(Q1-Q2)/Q1", "A / P", "m * g * h / Q1", "(T2-T1)/T1"],
            correct: 0,
            explanation: "Aniq va doimiy FIK asosi ushbudan.",
            difficulty: 'easy'
        },
        {
            id: 6,
            question: "Elektromobil dvigateli IYOD motorizdan asosan nechi marta kuchliroq FIK da?",
            options: ["Teng asosan", "Kamroq", "3 karacha ulkanraq"],
            correct: 2,
            explanation: "EV larda 90-95% FIK ga borgan bo'lsa, benzin mashinada asosan 25-30% xolos.",
            difficulty: 'medium'
        },
        {
            id: 7,
            question: "Tashlanadigan Q2 nol(0) ga teng mator bormi dunyoda?",
            options: ["Bor kosmosida", "Sadi Korno yaratgan", "Ikkinchi termodinamik fanda mumkin emas", "Yo'q chunku muz tugar"],
            correct: 2,
            explanation: "Absolyut qaytmas isrof xech qochon 0 qilinmaydi yopiq termodinamikada.",
            difficulty: 'hard'
        },
        {
            id: 8,
            question: "Radiator nimaga xizmat kelatadi ulovga?",
            options: ["Suv saqlab ichgani", "Sovitish ishqini Q2 qilib xavoga berish uchun", "Konditsioner ishlashi xozar uchun"],
            correct: 1,
            explanation: "Ortiqca issiqlikni atmosferega majmub etadi u.",
            difficulty: 'easy'
        },
        {
            id: 9,
            question: "S_Korno ishqi maksimal formulasiga kim bo'lishi yutadi maxxrjga?",
            options: ["T1", "T2", "t selsiy"],
            correct: 0,
            explanation: "Umumiy energiya bu T1! (T1-T2)/T1.",
            difficulty: 'medium'
        },
        {
            id: 10,
            question: "T2 = 300K, T1 = 600K bo'lsa nima ko'ra olasiz eng zo'rligi qancha?",
            options: ["50%", "30%", "100%"],
            correct: 0,
            explanation: "(600-300)/600 = 300/600 = 0.5 (yoki 50%).",
            difficulty: 'medium'
        },
        {
            id: 11,
            question: "Atmosferaning kislotali yikilishi asosan qaysi birining portlagan uzugasi sababi?",
            options: ["Vodorod yonishi", "SO_2 larning bulut b-n qovushishi", "Chang va shamol"],
            correct: 1,
            explanation: "Zaharli yoqig'lidan tushuchi ugar va azod turlari.",
            difficulty: 'medium'
        },
        {
            id: 12,
            question: "Quyosh elektr usuli asosan nedan yengillik beraoladi bizaga uchoq tabiyatiga?",
            options: ["Zaharli IYOD xoxlashi nol xolatiga, yashil xavo", "Ektorsim tortmaslik u-n xolos xos xarakat"],
            correct: 0,
            explanation: "Zahar tarqotmaydi quyosh energiayasi cheksaiz yashil quvvatdi.",
            difficulty: 'easy'
        },
        {
            id: 13,
            question: "1-takt dvigateldagi nimasi deb alaladi?",
            options: ["Ish chiqarish pufagi", "Kislonok beruvchi sorish kiritilishi"],
            correct: 1,
            explanation: "1chi urinda asosi u-n modda so'riladi.",
            difficulty: 'easy'
        },
        {
            id: 14,
            question: "Dizel uchun sham kerakmasakan unda energiay nedan paydo olob yonib ketadi u o'zi?",
            options: ["Tok bor shundoqam", "Havoni kuchli qisib siqilishida t-ura ko'tarinligani u-n"],
            correct: 1,
            explanation: "Havo kiritilib benihoyat qisiladi va qizgda yonib ketsin.",
            difficulty: 'medium'
        },
        {
            id: 15,
            question: "Qisqasi Dvigateller davri u-n biz insoniyat kelajagi xulosalimi?",
            options: ["Tezrok chala tabiat bo'yicha ketib bo'lganmiz EV larga yashilga tezlashi", "Yo'q benzinda xavfo'yq davom olaruz"],
            correct: 0,
            explanation: "Yagona najod karbon isdan holi usullarni zudlik biln amaliyotimizga tatbiq quroldari EV kabi barpo.",
            difficulty: 'hard'
        }
    ]
};
