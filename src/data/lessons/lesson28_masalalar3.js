// 28-§. Masalalar yechish
export const lesson28 = {
    id: '9-l-52',
    chapter_id: '9-ch-03',
    title: '28-§. Masalalar yechish',
    description: "Issiqlik dvigatellari bo'yicha masuliyatli murakkab, isroflar va ideal FOYDALI foizlarni miqdoran ko'zdan o'tkazishga yordamchi dars",
    order_number: 3,
    duration_minutes: 20,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 5,
    difficulty: 'hard',

    content: {
        key_concepts: [
            'Dvigateldagi kuch qaysi tomonga burilishini izlanish ishlari',
            'To\'g\'ridan to\'g\'ri Korno formulasi',
            'Haqiqiy isitgichdagi gaz holati ifodalari'
        ],

        theory: `Dvigatel har doim hisoblardagi ideallikdan kam quvvat bera oladi. Muhandisning asosiy ishi — bu ziyon miqdorini aniq xulosalashdir. Shuning u-n quyidagi mashqiy yechimlardan tajribali amaliy ko'nikmalarni uzlashtiring. Formularimiz:

A = Q1 - Q2
η = A / Q1 * 100%
η_max = (T1 - T2) / T1 * 100%

Hali-javob yozishda esingizda bo'lsin, Q1 qozonning issiqligi (yonish Q=qm dan hisoblab xam topiladi ba'zida).`,

        formulas: [
            {
                name: 'Umumiy FIK massiv formulasii',
                formula: '\\eta = \\frac{Q_1 - Q_2}{Q_1} = 1 - \\frac{Q_2}{Q_1}',
                text: 'FIK = 1 - (Q2/Q1)',
                description: 'Kassrdan ajratib olish tartibotimiz',
                variables: [
                    { symbol: 'Q_1', name: 'Olingan', unit: 'J' }
                ]
            }
        ],

        examples: [
            {
                title: "Oson Dvigatel ishqalanishini tekshirish",
                problem: "Agar mashina motorini 25 kJ yonga tushgan benzin kuymigidan 15 kJ atroffga keraksiz sochilib uchyotgan bulsa (sovutishiga porshen orqasidan), uning A = ? Va samarali FIK η = ?",
                given_data: { "Q1": "25 000 J", "Q2, uvol yuzaga keldi": "15 000 J" },
                solution_steps: [
                    "A = Q1 - Q2 ni yozvolamiz",
                    "A = 25 - 15 = 10 kJ toza mashina harakati",
                    "FIK u-n : 10 ni bo'lamiz 25 ga (asliga)"
                ],
                solution: "Foydali ish 10 kJ. Samarasi: (10/25)*100 = 0.40 x 100 = 40%.",
                answer: "A=10kJ, 40%",
                difficulty: 'easy'
            },
            {
                title: "Teskari topshiriq va dizel",
                problem: "Muhandis yangi traktor yasadi va u 30% FIK b-n ishlaydi xolos (η=0.3). Traktor 600 J sof ishini chizadigan motor o'z qozonida qanchalik umumiy issiqlikni portlatgan bulishi zarur Q1=?",
                given_data: { "FIK": "0.3 (30%)", "A": "600 J" },
                solution_steps: [
                    "FIK formulasi η = A / Q1.",
                    "Demak Q1 ni ajratamiz, Q1 = A / η",
                    "Q1 = 600 / 0.3 = 2000 J",
                    "Aqliy e'tirof: 2000 J olovli energiya kere, atigi shundan 600 igina uni foyda keltirvotti, qolgan 1400 havoga qariydi."
                ],
                solution: "Portlash ko'payishi u-n yonishdagi yelimli massasi kuchli yonishlarga Q1 ni topish talab edi: 2000 Joulli kuch olingan",
                answer: "Q1 = 2000 J",
                difficulty: 'medium'
            },
            {
                title: "1-Jadvaldagi Ideal Kornoning og'ir shartlari",
                problem: "Suv osti kemasi bug' bilan yuradi. Qozonda siqilgan energiya T1=900K ni tutib turibdi, atrof okeani sovitgich bozorini u T2=300K da beradi. Kemadagi Korno limits bo'yicha eng zurg'a ko'rsatkich limitini bilib, agar real motor shundan yarim FIK dagina ishlayotgan bo'lsa toping:",
                given_data: { "T1": "900 K", "T2": "300 K", "Shart ijarasi": "Real η kornoning yarmi xolas" },
                solution_steps: [
                    "Oldin eng maksimum mumkin nazariyani limit bilamiz:",
                    "η_max = (900 - 300) / 900 = 600 / 900 = 2/3 ≈ 0.67 (yoki ~67%).",
                    "Lekin savolning so'ngida kema reallikda qishimcha yomon ishqalanishlari ham bor deb aytildi, va bu limitning 50% gina darajasida samarador:",
                    "Real = 67% ni teng ikkiga qismiga aralashamiz = 33.5%!"
                ],
                solution: "Maksimal ilmiy chegarani topib (67%), keyin undanam past ko'rsatkachni keltirdik: 33.5%.",
                answer: "Qoniqarsiz 33 ishlatilvotti foizi",
                difficulty: 'hard'
            }
        ]
    },

    questions: [
        {
            id: 1,
            question: "Agar A ish ko'rsatkichi noldan g'olib katta yotadigan bo'lsa unda Q1 va Q2 oradagi munosabat xulosa taribi qanaqa o'zlashatiladi?",
            options: ["Q1 < Q2", "Q1 = Q2", "Q1 > Q2", "Alohida mutlaq yo'q"],
            correct: 2,
            explanation: "Agar yitkazuv Q2 ob kelyatgan energiya Q1dan yuksak bop ktsa energiya matoringiz teskaridan muzlaydiku! Shu u-n Q1 doim eng galdagi baland cho'qqi massivi (Q1>Q2 va Q1>A).",
            difficulty: 'easy'
        },
        {
            id: 2,
            question: "Motor 5000J ni oldi va 3000J ish bajardi. Savol: Sovitish u-n chiqarib tashlagan radiatsiya issiqligi qancha?",
            options: ["1000 J", "2000 J", "8000 J", "Topish ilojsiz"],
            correct: 1,
            explanation: "Tenglama: 5000J = 3000J + yo'qolgan qism. Oddiy yechib kelganda 2000 J havoga uol topdirganmiz.",
            difficulty: 'easy'
        },
        {
            id: 3,
            question: "Samarali dizel η = 40% (0.4) berilgan holda ish bajarishi u-n 800 J to'liq asliga teng qozondan olingan deb tasawvur qilsangiz, tashlaq Q2 da qiziq havo miqdori qanchagacha?",
            options: ["A = 320, unda Q2 = 480", "Q2 = 800", "Q2 = 0", "A = 200 uzlash"],
            correct: 0,
            explanation: "40% 800ning 320 siga teng (A=320). Qolgan 60 foizi havogadir (Q2 = 480J).",
            difficulty: 'hard'
        },
        {
            id: 4,
            question: "Hajm va havo mutlaq muzlash limit (T2 = 0 K) paydo bulsa ideal η qancha chizasiz?",
            options: ["60%", "70%", "100%", "-100%"],
            correct: 2,
            explanation: "(T1 - 0) / T1 = 1 (foizda bu 100% deyilgani). Lekin 0 K ni topolmaymiz kosmik atrofda xam .",
            difficulty: 'easy'
        },
        {
            id: 5,
            question: "Mator porsheni grakida Q1>0 va Q2<0. Siz qanday fikrdasiz?",
            options: ["Bunday mashina portlaydi", "Matematik normal qoida emas, Q hamma vaqt absolyut modulda olinadi termodinamik FIK taxtida", "Q2=0 ga teng"],
            correct: 1,
            explanation: "Biz mator FIKda yozilgandagi har doim Q1 va Q2 isrolf massivlarini pozitiv qiymat bilan qilib ayrib ifodalaymiz.",
            difficulty: 'medium'
        }
    ]
};
