// 33-§. Masalalar yechish
export const lesson33 = {
    id: '9-l-62',
    chapter_id: '9-ch-04',
    title: '33-§. Masalalar yechish (Sirt taranglik va kapillyar)',
    description: "Formulalarni chuqur egallash maqsadidagi kapillyar va taranglik hisoblari aralashmasidan kelib chiqgan kompleks amaliy tahlil darsi.",
    order_number: 3,
    duration_minutes: 25,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 5,
    difficulty: 'hard',

    content: {
        key_concepts: [
            'Suyuqliklar doirasidagi yechim strategiyalari',
            'Diametr orqali balandlik tahlili (h formula manipulyatsiyasi)'
        ],

        theory: `Sirt taranglik kuchi va u orqali yaratilgan mo'jizaviy Laplas bosimlar qoidasi hozirgi fizika qoidalariga bo'ysinib ko'zga zarradek torinmaydigan asboblar texnalogiyalar isshda keng xiznat olib booriadi. Shular qatorida naychadan chiqayotgan tomchinig ham uning tabiy diametri radiusi, suv balandliki massasiga ula qilingan aralashmalik qiziq tengliklarini xal qilish kerak.`,

        formulas: [
            {
                name: 'Massaning zichlikdan xosilasi (Umumiy islatma)',
                formula: 'm = \\rho \\cdot V',
                text: 'm = r(zichlik) * hajmm',
                description: 'Qachonki masa tayyor berilmasa. Porshenda naychaning hajmi silindr hajmi shaklida (V = Pi * r^2 * h) deya bilish kerak.'
            },
            {
                name: 'Kengaygan kontur sim',
                formula: 'F = \\sigma \\cdot (2l + 2a)',
                text: 'F = sigma * (Butun Perimetr)',
                description: 'Aloqa chizigini to\'la o\'ylash kere. Masalan kvadrat bo\'lsa uni 4ta tomoni uzunlikki qilinadi 4*a. Doirami? 2*Pi*r sirt qobigi qilib kiritamiz.'
            },
            {
                name: 'Energetiki ish',
                formula: 'A = \\Delta E = \\sigma \\cdot \\Delta S',
                text: 'A = sigma * Delta_S',
                description: 'Agar siz ko\'pik pardani cho\'zsangiz tabiy yuzasi kattalashgani deltaS xisoblanadi va sigma ga ko\'paytirib ish sarfini yoqadigan mantiq. '
            }
        ],

        examples: [
            {
                title: "Massali tomchi (Bo'yin uzilish diametri topilsichi)",
                problem: "Suv (sigma= 0.073 N/m) ni ohista tomizadigan pipetkadan uzulotgan tommchinnng og'irlgi 23 mg ekanligi shart qilisiz. Shu Pipetkaning havo b-n chiqadigan diametri taxminan qalinlgi qanchalik bo'lgan o'zi fanda? g=10.",
                given_data: {"m": "23 mg = 0.000023 kg", "sigma":"0.073 N/m"},
                solution_steps: [
                    "Tomchi uzilishi oldida taranglik tutqichi butun xajm osilganini aniq va yagona muvozonan ushab qolaldi: mg = sigma * L",
                    "Aylana aloqa deb L = pi * d olinadi. Nima uchi 2*pi*r emas? Chunku ikki radiusi d (daimetrku).",
                    "O'rinboshli izlanadi: d = m*g / (sigma * pi)",
                    "d = (0.000023 * 10) / (0.073 * 3.14) = 0.00023 / 0.229 = 0.001 metr (1 mm)"
                ],
                solution: "Yechish maxrajining 1 mm diametriga etib kordik. Tiyibb ketadigan pipetka uchi shpilka kabi 1mm xissasi bulagan.",
                answer: "d = 1 mm",
                difficulty: 'medium'
            },
            {
                title: "Ikki naycha solishtiruvi (Oddiy proportsiya sirli logikasi)",
                problem: "Bir chimdim mo'yqalam kapillyarlarini tahlili. r1 radiusli idish naynda suv balandligi h1=6 sm. Agar siz uni o'rniga yordamli r2=  3*r1 qilib (uch kara katta) mo'yqalam qalsangiz baladlik h2 ni qancha sm tepalaydi?",
                given_data: {"h1":"6 sm", "shart":"r2 = 3 * r1", "sigma va p": "O'zagarmaydi - konstant"},
                solution_steps: [
                    "Balandlik proporsionalligid asosan 1/r bog'liq (Juren).",
                    "Shuning uchun, radius n kara ko'payb ortsaydi, naycha kalinligida ko'tariliishi balanlkik xisosi qiyinlab n kara ga tushadi h / n.",
                    "Bizda r 3 karraga oshibdi (qalin naycha endi) demak H kuchini unga nisbatda 3 hissa susayb pastlatib qo'yadi",
                    "h2 = h1 / 3 = 6sm / 3 = 2 sm."
                ],
                solution: "Kengroq qilsangiz mo'yqalam suv tortish bo'yi atiga uckaradn tushub qolvotti 2 sm chizigiga.",
                answer: "h2=2sm",
                difficulty: 'easy'
            },
            {
                title: "Energiya Sarfidan tortilgan ish (qiyinib ketgan pardani cho'zish)",
                problem: "Qirrasi 5 sm b-n simdan qayrilgan taypoq kvadrat ramkachasi tutqichi sovunning unga botirilgan suvdan yupqa yuz yupqagina qora plyonka  pardasini tashkil etildi (sigma=0.04 N/m). Uni siz o'ntomonli qirrasidan ilib kengaytirdingiza maydoni kvadratdan 100 sm^2 xajmida tortilgan kattalashgan to'rtburchakga uzayizdingiz. Shundagi qo'lingiz ishi necha J?",
                given_data: {"boshlagich uzuna":"a=5 sm, u s1= 25 sm^2", "oxirgi kenglik":"s2 = 100 sm^2", "sigma":"0.04"},
                solution_steps: [
                    "Eng avvalo yuzalarimiz sm^2 dan m^2 ga aylatirib metrikada ishtirokiga moslsah kerak: S1 = 25 / 10000 = 0.0025 m^2 ; S2 = 100 / 10000 = 0.010 m^2",
                    "Formulamizda A ishlangan kuchi A = sigma * DeltaS * 2. Sababi parda ikkita tarafdankuplyonksi sirti ishtirokchi! ",
                    "DeltaS = S2 - S1 = 0.010 - 0.0025 = 0.0075 m^2 (Bitta sirt yuzi ozgargani faqat)",
                    "A = 0.04 * 0.0075 * 2 = 0.0006 J (yoki 0.6 mJ)."
                ],
                solution: "Qo'shimcha mexanik kuch talabi kordinkida, atiga oz munchagina energiyni sovunni ozidan ximiyasin chuzigachasi isroflangani etdi. (Esangizmi Parda sirtlar juft bo'ldi!).",
                answer: "0.6 Milli Joul sarfi A ish",
                difficulty: 'hard'
            }
        ]
    },

    questions: [
        {
            id: 1,
            question: "Juren formula xisobidagi (h tezkor) miqdor suyuqlikning turiga daxri bormi?",
            options: ["Umuman yo'q", "Faqat havogaga", "Bor chunki Sigma sirt koeffitsienti v p-zichlik aynan modda tabiat turlarini ko'rsatgichlarikudur uzida maxsus", "Diametrka"],
            correct: 2,
            explanation: "Ha, masalan yog', benzin, suv har xill tabiyat va zchilukka o'zi sigmaga aloqador shu u-N xar xilli toritwadi.",
            difficulty: 'easy'
        },
        {
            id: 2,
            question: "Tomchining kapillyarda erkin xoldi uzilish momentiga formulalani nimaning shablonidan tenglashtiriladi iqrorligida?",
            options: ["Porshen * bosim = H", "Tortishuv sirt kuchi va og\'irlik (mg) muvazanoatda kuch tengligasi b-n idrok izlanib yopiladiku", "Asosan havo yoqpni"],
            correct: 1,
            explanation: "m*g aynan sirtning yuquori tutqichiga chidolmay singani osilinishid",
            difficulty: 'easy'
        },
        {
            id: 3,
            question: "Suv kapillyari (ho'llayotkan) nayi diamteri (D) ikki martda (2marta) kichiklatirib ixcham bo'lsa balnadli nima ishi ozgarishi bo'ldi ?",
            options: ["Hechqanaqa qolmadi osilib", "Balandligi 2-KARRAGA katta qilib yuqori o'tadi", "Yarmi chiqib yarim sig'may quladi", "3 marta kutar"],
            correct: 1,
            explanation: "Ilgari qaidda h  ~ 1/R . R radius qanchaly kichik(ikki marataga), H xuddi shunaqa barobar xaligi propotsiya oshkordkadi H x 2 .",
            difficulty: 'medium'
        },
        {
            id: 4,
            question: "A ish parda kvadratida maydonni cho'zib osboryatkanimizda negali A formulasa 2soniga zarblash shart edi masalarda kordigik?",
            options: ["Formula faqat idishniki yuzasi qaliq", "Sirt havo bilan taqishidan ham tashqi yuzasi ham idish ichkarsida ham xavo boligani un pardalari 2 ta ochiqlik tekislikda", "Yoziqlik emasligi chunku"],
            correct: 1,
            explanation: "Raqaqada turgan sovun teshigda yupqasida uchi xam tagi ham xavo tekgany uzini qatlamli sirti  u-n 2 barobrladi.",
            difficulty: 'medium'
        },
        {
            id: 5,
            question: "Qaysi xolatlarda sirt tarangning miqdori niyat energiyasini yoqotishishdan nolga bo'lyap deb etirfoyat etib quloysiz (sigma=0)?",
            options: ["Aslo xarorati Kritik tempuratasiga yitib qaynab erib bosim tushunib bulganda", "Muzxonasida past qorda", "Termodimika muzlashidagina (-273)"],
            correct: 0,
            explanation: "Kritik haroratida gazlashtirilib suyqligi xossalri to'liq pufek gazi o'rtasida farqy yoqsizlangan holda suyuqliki eridi .",
            difficulty: 'hard'
        }
    ]
};
