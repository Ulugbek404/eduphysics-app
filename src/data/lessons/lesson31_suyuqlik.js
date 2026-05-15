// 31-§. Suyuqlikning xossalari
export const lesson31 = {
    id: '9-l-60',
    chapter_id: '9-ch-04',
    title: '31-§. Suyuqlikning xossalari',
    description: "Suyuqlik qatlamlarining asosiy fizik mexanikasi. Sirt taranglik kuchi va uning molekulyar sirlari.",
    order_number: 1,
    duration_minutes: 40,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 5,
    difficulty: 'medium',

    content: {
        key_concepts: [
            'Suyuqliklarning tuzilishiga xos asosiy belgilar',
            'Sirt tarangligi kuchi va uning mexanizmlari',
            'Sirt tarangligi koeffitsiyenti (sigma)',
            'Sirt energiyasi haqida'
        ],

        theory: `Suyuqliklar – gazlar va qattiq jismlar oralig'idagi o'ziga xos holatdir. Qattiq jismlardan farqli o'laroq, suyuqliklarning aniq shakli yo'q, lekin idish shaklini qabul qilish xususiyati bor. Ularning molekulalari muvozanat vaziyatiga ega bo'lib, o'sha nuqta atrofida tebranadi, lekin bu muvozanat nuqtalariga "bog'lanib" qolmagan, ya'ni bir joydan ikkinchi joyga sakrash imkoni bor (shuning uchun oqadi).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sirt tarangligi kuchi va mexanizmi

Suyuqlikning eng ajoyib xususiyatlaridan biri uning "sirt tarangligi"dir.
Istalgan suyuqlik molekulasini olamiz: 
Agar u suyuqlikning chuqur ichida (masalan, piyola tubiga yaqin) bo'lsa, u atrofidagicha teng sondagi boshqa molekulalar tomonidan barcha tomonlarga birdek tortiladi (koogeziya tortishish kuchi). G'oyat tortish kuchi natijaviy tahlilda nol bo'lib, zarracha deyarli erkin yuradi.
Ammo... Molekula suyuqlikning ustki yuzasida (havo bilan chegarasida) joylashgan bo'lsa vaziyat mutlaqo o'zgaradi! Uning atrofida (pastda va yonda) suyuqlik molekulalari bor, lekin tepada gaz (havo) turaveradi. Gazda molekulalar orasidagi masofa uzoq. Shuning uchun sirtqi qatlamdagi molekulalar qolgan 'o'z' do'stlari tomonidan asosan ichkariga, suyuqlik qariga qarab qattiq tortiladi.

Bu assimetrik molekulyar tortishish sababli, suv o'z sirtini "kichraytirishga", huddi ingichka cho'ziluvchan rezinadek o'ziga siqishga majbur bo'ladi. Shu effekt tufayli koinotdagi suv doim dumaloq tomchi shaklini (eng kichkina yuzani minimal darajada yopuvchi sfera shaklini) oladi! Hovuzda suv o'rgimchaklari qanday botmay yuradi? Chunki sirt xuddi mato simon tortilgan.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sirt tarangligi koeffitsiyenti (σ)

Formulaga solamiz: Agar suyuqlik sirtini biror cheklovchi kontur chizig'i (shakli) ushlab turgan bo'lsa, u shu kontur perimetri uzunligi $(l)$ bo'ylab sirtdan ichkariga qaratilgan shunday kuch b-n tortadiki, sirt qisqarishni istaydi. Buni Taranglik kuchi ($F$) deb ataymiz.
Tajriba ko'rsatadiki, $F$ to'g'ri proportsional kontakt uzunligi $l$ ga: 
$F_{tar} = \\sigma \\cdot l$

Bu yerdagi proporsionallik koeffitsenti $\\sigma$ ("sigma") — bu moddaning o'ziga xos sirt taranglik koeffitsienti deyilib, N/m (Nyuton-metr) da pichiladi. Yoki Termodinamikada bu Joul energiya / m^2  ($J/m^2$) degani (Sirtning $1 m^2$ yuzini yaratishga kerakli qo'shimcha energiya energiyasi).

HARORAT TASIRI:
Harorat ko'tarilganida suyuqlik issiqlik energiyasi kinetik rejimda molekulalarni tez-tez silkitadi. Bu degani bog'lanish bo'shashadi, demak $\\sigma$ koeffitsient kichrayadi! Qaynoq suv sovugiga nisbatan kiyimlarni va lattni tez ho'llaydi va darcha kir yuvish sovuni yordamida esa "sigma" kuchsizlanib kirlarni yulqish oson bo'ladi.`,

        formulas: [
            {
                name: 'Sirt taranglik kuchi',
                formula: 'F = \\sigma \\cdot l',
                text: 'F = sigma * l',
                description: 'Bu yerda F - sirt taranglik kuchi (Nyuton), sigma - moddaning sirt taranglik koeffitsiyenti (N/m), l - suyuqlik chekgarasi kontakt perimetr uzunligi (metrda).'
            },
            {
                name: 'Sirt energiyasi',
                formula: 'E_s = \\sigma \\cdot S',
                text: 'E_s = sigma * S',
                description: 'Suyuqlik yuzasi S ga teng bo\'lsa, u yuzini tutib turuvchi ichki sirt molekulyar energiyasi (Joul dagi) ifodasi.'
            },
            {
                name: 'So\'pikli (ikkita sirtga ega) parda kuchi',
                formula: 'F = \\sigma \\cdot 2l',
                text: 'F = sigma * 2l',
                description: 'Havo va maxsus ramka orasidagi yupqa parda ikkita ochiq sirt qatlamiga ega bo\'ladi (Tepasi ham havo, pasti ham havo), shuning uchun 2l qilinadi.'
            }
        ],

        examples: [
            {
                title: "Suvdagi tomnining tushishi (Kuch tenglashishi)",
                problem: "Suv kapillyaring trubkasidan tomchilamoqda. Suvning sirt tarangligi (sigma) 0.073 N/m. Tomchi yuzasigidagi aylanayotgan kanal radiusi r=1 mm (0.001 m). Suv tomchisining aynan uzilishidan oldingi M massasini toping. g = 10 m/s^2",
                given_data: { "sigma (suv)": "0.073 N/m", "r (radius)": "0.001 m", "g": "10 m/s^2" },
                solution_steps: [
                    "Kanal trubkasining atrof perimetri aylanaga teng, ya'ni aloqa chizig'i uzunligi: l = 2 * pi * r",
                    "Shu perimetr ustida suv sirt taranglik kuchi (F_tar) tomchini pastga tushirmaslik b-n ushlab turibdi: F_tar = sigma * l = sigma * 2 * pi * r",
                    "Suv qachon uziladi? Qachonki og'irlik kuchi (F_og) taranglikdan oshganda. Demak muvozanat dami: m * g = sigma * 2 * pi * r",
                    "m = (sigma * 2 * pi * r) / g",
                    "Hisob: m = (0.073 * 2 * 3.14 * 0.001) / 10 = (0.458 / 1000) / 10 = 0.0000458 kg = 45.8 mg."
                ],
                solution: "Tomchi faqat 45.8 milligramm massaga yetganida bo'g'zidan uzilib pastga qulaydi.",
                answer: "45.8 mg",
                difficulty: 'hard'
            },
            {
                title: "Simli ramkada sovun pardasi",
                problem: "Tomonlari l=10 sm bo'lgan to'g'ri burchakli U sim ramkada ko'char sim yotibdi. Uning orasida pufakli sovun pardasi bor. Sovunnig sigmasi 0.04 N/m. Agar ko'char sim pardani tarang tutishiga F kuchi qarshilik qilsa, F=?",
                given_data: { "sigma": "0.04 N/m", "uzunlik, l": "0.1 m" },
                solution_steps: [
                    "Ramka to'g'ri to'rtburchak, kontakt uzunligi bu darcha bo'yi l.",
                    "Lekin Sovun pardasida ikkita sirt mavjudku (tashqi faza havo ikkala tarafni ushlabdi).",
                    "Formula zanjiri: F = sigma * (2 * l)",
                    "F = 0.04 * (2 * 0.1) = 0.04 * 0.2 = 0.008 N."
                ],
                solution: "Ramkani siqishga ko'rsatayotgan kuchi atigi 8 milli nyutondir (0.008N).",
                answer: "0.008 N",
                difficulty: 'medium'
            },
            {
                title: "Haroratni o'zgarishi tajribasi",
                problem: "Suv qizdirilganda (sigma kamayganda), choy ichidagi yuzada kuchi nima o'zgaradi?",
                given_data: {},
                solution_steps: [
                    "Taqqoslash: Suv bug'yigisi kuchlimi yoki sovug'i? Sovuqda boglanish zarracha ko'p.",
                    "Harorat qizishida kinetik molekular tebranish shiddatlasi ortib, bog'larni uzadi, natijada parda tarang kuchi (sigma) tushadi."
                ],
                solution: "Tarangik kuchi harorat ko'paytishiga teskari ta'sir etadi. Juda ko'payganda u singadi.",
                answer: "Sirt tarangligi kuchi kamayadi",
                difficulty: 'easy'
            }
        ]
    },

    questions: [
        {
            id: 1,
            question: "Suyuqliklarda molekulalar qanday vaziyatda harakatlanadi?",
            options: ["Gazga o'xshab mutlaq nazoratsiz", "Qattiqliklarga uxshab bir nuqtada tebranib va doim yangi nuqtaga sakrab", "Faqat issiqda", "Bitta yopiq zonadan chiqmaydi"],
            correct: 1,
            explanation: "Suyuqlik moziyi molekulasining tebranish qatlamlar b-n yangi yuziga sakrash xaraktiga mos (shunga suv oqadi).",
            difficulty: 'easy'
        },
        {
            id: 2,
            question: "Sirtiga kelib qolgan molekula nima uchun ichkariga qarab intiladi?",
            options: ["Tashqarida havo undan og'irlik", "Sababi ichkaridagi do'st molekulalar uni o'z tomon tortadi o'rtasidagi simmietriya buzilgan", "U gravitatsiyaga teskari qaraydi", "Havoda gaz bosimi undan kattaligidan"],
            correct: 1,
            explanation: "Asos sirtda yotgan tomchi yuzasida pastqi suvlar tortadi, havoda u molekula b-n ilinuvchi deayrli hech kim yuq.",
            difficulty: 'medium'
        },
        {
            id: 3,
            question: "Sigma koeffitsiyenti o'lchov birligi nima bo'ladi SI-sistemasida?",
            options: ["Nyuton kvadrat N/m^2", "N/m (yoki Joul/m^2)", "Vatt/sek", "Faqat m/s"],
            correct: 1,
            explanation: "Tarangik koeffisynti bir metr kontakt uzunligidagi kuch demak N/m",
            difficulty: 'easy'
        },
        {
            id: 4,
            question: "Agar maxsus shisha kapillyarida sigmasi katta suyuqlik turgan bo'lsa uni sovitganda tomchilsh vaziyati nechlik o'zi kuttiradi?",
            options: ["Uzilish sekinlashadi chunki sigma kattalashib tomchi og'irlashin o'zi ushlab turoladi uzoqroq", "Juda tez tushadi uzilib", "O'zgarmaydi formula ta'sirig yoq"],
            correct: 0,
            explanation: "Sovutish sigma qiymatini ortadi. Tomchi m*g ogirlik qilsa ham sigma unga javob qaytarib, yiriklashgani sari ushab qola oladi.",
            difficulty: 'hard'
        },
        {
            id: 5,
            question: "Oddiy toza parda u-n emas, balkim Sovunli Ramkalarda kuch uchun kontakt \"2\" songa ko'paytiriladi $(2 \\cdot l)$, Nima uchun?",
            options: ["Ikkita temiri bog'ida u", "Oyna sovunisida ikkita gaz fazasi bilan ochiq 2-tomonli sirt qavati bolalikgi uchun", "Kimyoviy hissobdan"],
            correct: 1,
            explanation: "Parda shishadek narsa: chap beti xam yupqa qatlam sirtiga, ong yuzisi ham. Tortish kuchi ikkilanadi.",
            difficulty: 'medium'
        }
    ]
};
