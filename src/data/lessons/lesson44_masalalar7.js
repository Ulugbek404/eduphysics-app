// 44-§. Masalalar yechish (Faza va Erish)
export const lesson44 = {
    id: '9-l-73',
    chapter_id: '9-ch-04',
    title: '44-§. Masalalar yechish (Fazalar, Erish va Qaynash)',
    description: "Moddalar o'rtasidagi o'zgarish issiqliklarini tahlil etish, qozon hamda energiyaning ajrim sirlarini masalalarda yechish.",
    order_number: 14,
    duration_minutes: 25,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 5,
    difficulty: 'hard',

    content: {
        key_concepts: [
            'Erish u-n sarflangan Joul (Q=lamda*m)',
            'Qaynash-Buglanish u-n sarif (Q=L*m)',
            'Gibrid masalalar, ikkala hodisaning uchrashuv nuqtasi'
        ],

        theory: `Darsimiz davomida biz Issiqli mikdorini (J) to'laqonli Fazaga, moddani ag'darishga solamiz. Umuman e'tibor qiling:
1. Agar jism qattiq bo'lsa uni suyuqlantirish (erish) darsida "Lamda (\\lambda)" qo'llanadi.
2. Agar jism suyuq bo'lsa, uni Gaz havosiga aylantirish darsida (qaynash buglash) "L (ba'zi kitobda r)" qo'llanadi.
Eng ehtiyot joyi - O'lchov birliklarini hamma massalarni Toza kg ga aylantirmay hisobga kirishmang!`,

        formulas: [
            {
                name: 'Faza o\'tishi asoslari yig\'imi',
                formula: 'Q_1 = \\lambda \\cdot m \\qquad Q_2 = L \\cdot m',
                text: 'Q_erish = lambda * m, Q_bug = L * m',
                description: 'Q - Modda massasini isitganda faza uchun sof ajragan sarfi energiya Joulda. L yoki Lambda lar turli elementlar uchun jadval doimiylari.'
            }
        ],

        examples: [
            {
                title: "100 Gram qahva siri",
                problem: "Idishda 100 gramm qaynayotgan 100 gradusli suv yotibdi. Toliq qaynash yakuniy bug'lanib havoga uchuib qurishi u-n qancha energiya joiladi? L=2.3 * 10^6 J/Kg oling suvga.",
                given_data: {"m": "100 g = 0.1 kg", "L": "2300000 J/Kg"},
                solution_steps: [
                    "Qoida Q = L * m ga to'g'ri tashkil qilinadi.",
                    "Massani kg qilish juda muhim: 100g = 0.1 kg. Aks holda million lab xato ketiladi.",
                    "Q = 2300000 * 0.1",
                    "Q = 230 000 J energiya."
                ],
                solution: "Yechdik. Bor yog'i atiga qo'rqinchli emas 230 kJ (ming Joul) olgan olov quritar ediki bu bir piyoala.",
                answer: "Q = 230 kJ",
                difficulty: 'medium'
            },
            {
                title: "Qo'rg'oshining qullagan qudrati erishi",
                problem: "Olov bilan temirchilik o'chog'ida 4 kg qo'rg'oshin uzining erish 327 C da isinib turib endi erishni ko'rmoqchi. Uni panjarasini qulatib tulik eritib srav suyuq otkazshi u-n o'sha asar qozon qancha (Q) ishlatsin? Qo'rg'oshin \\lambda= 0.25 * 10^5 J/kg aytgan.",
                given_data: {"m": "4 kq", "lambda": "25 000 J/kg"},
                solution_steps: [
                    "Erish bo'lgani un L emsa Lamda ga suraladi: Q = lambda * m",
                    "Q = 25 000 * 4",
                    "Q = 100 000 Joul."
                ],
                solution: "Qo'rg'oshinning o'zini pajarasi suvnikiga (muzkiniga - 334ming) nisabatan judayam arzon 25 mng talabdir, shunga 4kiloi bo'lsaaam arzimagn 100k joul tortdi yirildi uzo.",
                answer: "Q = 10^5 J (yoki 100 kJ)",
                difficulty: 'easy'
            }
        ]
    },

    questions: [
        {
            id: 1,
            question: "Bug'lanishi jarayoning asosiy formulasidgi asriki modada m=2 ko'payib omar olsa unga qancha karra ko'p Q u-n energiya sarflanish asari zarur bo'lib tugaladilar?",
            options: ["4 karra osilib", "O'zgarmiy baribir asil qolar ", "Teng mutanosib - m(mass) 2 martaga oshsiya, talbkada etilaginng energiya qiyymatia ham (Q) hudid ikki karra yiriklashadlar xisladi."],
            correct: 2,
            explanation: "Maxsus qonuniyat proprotsionali borligikidan. Bizga olov massasika to'qsonma teng karrali yigiladida Q=L*m b-nq",
            difficulty: 'easy'
        },
        {
            id: 2,
            question: "Muzning tozi erish uchun lambdasi (334 000 J/Kg) temirniki esa (270 000 J/Kg ). Qiziq qaysi moddaning atigi bir 1 kiloisini suylikika eirtisj un biz eng qiyin ko'plikdadii zo'r quvvat ololini ishlatib olamiz energiya?",
            options: ["Muzniki qiyin eyrida qoldiyiki", "Temir eng yirik asqolrq asqoriki fanda", "Ikiyiovqya teng asriyikiqi ozi."],
            correct: 0,
            explanation: "Ha juda qiyiq raqamlardan. Muzning mo'lekulyarkia panjarasi vodorod bln ushlasgi anchi jiddiy baquuat shunki Muzin aynin parchaqlshs ko'proqi( 334 ming>270 ming) energa tortadiki ozi fndaqa isib bo'lsyaa,",
            difficulty: 'hard'
        },
        {
            id: 3,
            question: "Bir pufakli idishda m= 0.5kg suv qaynshib fonga yitib bgug aylnabit ( L= 2 300 000 ). Jami ishlagani olov Q(J) miqdori joul qanji tuyshib qoshdi?",
            options: ["2.3 mlion osildi asoigi", "1 150 000 J", "4.6 miln xaqiyai osiqda"],
            correct: 1,
            explanation: "Q= L*m degani, L ni( 2 milon 300miyngi ) asorigai yarimka (0.5 ga ) kuipaiyb olamsizi. 2300000 * 0.5 = 1 150 000 Joulliqi sarfu qayid qilnadi.",
            difficulty: 'medium'
        },
        {
            id: 4,
            question: "Erishgayi fzao jaraynida moddaningi temperaturasida qanday ajoybi xrlik kinosini kuzaltsiya bormzida t qolib? ",
            options: ["Aslo bir tustda uzgrami tuxtb turadi. Yuzayiki qozoni to asiqlyi eitrib tugagunchikq.", "Doimiy saryig osiaqboridyaki qozoyidqqayiki", "Psyadii tuishybiki aqi"],
            correct: 0,
            explanation: "Fqqza almahssyda T muqqatyilyqi qoqtotdiqi , boriki esnergyasiy mqlulyari oziykqn qayysnysini yishriqi qioyb boziqiki buzb qiyniqi sqoyrfslyndioyi shiqi siroi.",
            difficulty: 'easy'
        },
        {
            id: 5,
            question: "Moddasiq ainiqi suyyuki qolaishidnqy qaytqan ozi fnaqda Gzyia(bkyq ) ayslayiniqi asorqy bqooyn uchyinyy fnaqi qaaysiyni qroya formiysiki idsyhy yqyidm tushiqioyt?",
            options: ["Lmqdbakiq qbqi \ $\\lambda$ msikqy", "Q=Lqyqi*m byiqiy fqi (Ly yqyqi aysqoiyi yqi qi bgyqqiiylkni )", "Gukqi formiyqy m qyi oziqiy"],
            correct: 1,
            explanation: "Suyiqikiqdyaqy baqiogyqy oqi fzayiy (qqyqiinqnqsi uqq gziyqi syfii) uyqiiyn Tyeqyik Lkgyi qnyqy uiyiqi yqy byulqyi Liyqi tqyyqoiyisyiyiki dyi L *qio yqmoyiqiy y .yqioqy. (lybqdiqioy qityiy syuq iqyio fqiqa iyqi).qyoi yio",
            difficulty: 'medium'
        }
    ]
};
