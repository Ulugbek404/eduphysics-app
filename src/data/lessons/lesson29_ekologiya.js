// 29-§. Issiqlik mashinalari va tabiatni muhofaza qilish
export const lesson29 = {
    id: '9-l-53',
    chapter_id: '9-ch-03',
    title: '29-§. Issiqlik mashinalari va tabiatni muhofaza qilish',
    description: "Issiqlik dvigatellarining insoniyat sivilizatsiyasi sabablaridan kelayotgan tabiat zaxarlanishi, parnik effekti, yashil energiya va uning ekologik darajalar yechimlari tahlili.",
    order_number: 4,
    duration_minutes: 30,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 5,
    difficulty: 'easy',

    content: {
        key_concepts: [
            'Dvigatellarning ekologiyaga (atmosferaga) ulkan zarba asablari',
            'Is gazi, Karbon dioksid va kislotali yomg\'irlar',
            'Iqlimning isishi — Parnik(issiqxona) effekti siri',
            'Tabiatga yordam va zamonaviy dori turlari. Yashil energiya texnologik inqiloblari'
        ],

        theory: `Iqtisodiy barqarorlik va zamonaviy asr avtomobillar hamda sanoat markazlari xisobiga amalga oshib kelmoqda. Biroq texnik o'sishda tabiatning biz ko'ra olmayotgan zararlari haddan ziyod chuqurlashmoqda!

Ichki yonish qoidalardagi asosiy modda uglerod ($C$) kislorod ($O$) bilan yonib Karbonat Dioksidi ($CO_2$) ni ulgaytiradi. Har yili atmosferaga yuz millionlab tonnalab zararli chiqindilar sepiladi va atrof muvozanatiga katta zarar tarqatmoqda:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Asosiy ekologik xavf va tarmoq oqibatlari

1. **Atmosferaning ifloslanishi va qisilishi (Smoglar):**  Avtomobillarning quyuq is gazi va chala yongan uglevodorod maxsulari ayniqsa shaharlarni ulkan kulrang "kepka" yoki o'sha mashhur **smog** degan chala yoqimsiz havo tumanlarini keltirlb chiqaradi. Insonning nafas asoratlariga katta bosim tushadi.
2. **Kislota Yomgirlari:** Qora issiqliklarning dvigateli tarkibida azod (Moshina tututida) va oltingugurt dioksidi ($SO_2$) bor (ayniqsa eski dizeldan). Yomg'ir sirtidagi namlik gaz bilan birkasa u yerga oltingugurt kislotasi va har hil shirin suv o'lgan zahri yomg'ir bo'b o'rmonni qurutadi barbad etadi. Termo-elekstrastansiylarda juda ko'p uchrashgan xodimi.
3. **Parnik Effekt (Issiqxona Xavfi) - Global Isish:** Quyosh kosmosdan nuri yerga tegsa qaytarish reaksiyasi tufahli koinotga singib soviydi. Ammo bizning o'sha xuddi $CO_2$ gazi kabi quyuq havomiz, yerdan endi qaytib chiqib ketadigan infraqizil past chastotali to'lqinlarni atrofga qoyb yubormidan o'zining yuzisida ob qoladi! (Issiqxonaga o'xshab issiqlik shishadan kiradi-da trubkalandan tashqari chiqmayti). Yildan yilga Yer gradusi normadanda qizib ketvotti - qutbli eng issiq muzlatgich eriyabti, okean suv sathi portlash kabi xavfli balandlataydi!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Muhofaza qilish va yashil energiya (Green energy) xaloskori

Biz butkul tabiatni omon saqlab qolish uchun Termodinamik eski dvigatellardan va ularning yonilgisidan voz kechish asriga qadam tashlayapmamiz. Sivilizatsiyani saqlab qoladigan eng katta qurol bu Fizikaning boshqa novdalari hisoblaniladi:
- **ELEKTROMOBIL (EV) va GIBRID tizimlar:** Mashinada dvigatel emas, bateriya va sof tok rotori ishlatsa, is gubkasi va glushitel kerak bo'lmiydi ($0\\%$ chiqindi). Zahar yo'qoladi. 
- **Quyosh Batareyalari:** Yarimo'tkazgich panellari (P-N tur) termik kuyishga ega emas. Tabiatning eng boy va ekologik sof nurlarini fototokga uzatuvchi cheksiz keladigan baxtdir.
- **Shamol energetikasi:** Shamol tezligi havoning harakat kinetikasi (Korno dvigateli yo'q, u faqat ventilyator turbinasi orrali foydali mexanik elektrok ishga aylantiriladi). 
- Qo'shimchasiga, avtomobil oyna stoykalaridagi moylar va yonish gazlarga filtr tutqunlik (katalizator) texnik nazoratini kuchaytirib ketishimiz mumkin.`,

        formulas: [],

        examples: [
            {
                title: "Parnik effektini maishiy hayotda tushunish",
                problem: "Oynali issiqxonaga yoz yoki quyoshli bahorda kirsangiz hatto tashqaridagi harorat sovuq bulsa ham mudhish issiq bo'ladi. Sababi nimaga bog'liq? Xuddi shuni Yer globusi tushunchasida termik solishtiting:",
                solution: "Yorqin shaffof oyna nurli kuchni tekin o'tkazadi (quyosh juda ko'p kiradi). Maxsulot va o'simlik uni emib soviyotganda undan o'zining muttasil qaytariluvchi qorong'i infra-nur (uzoq isssiqlik sirtini) balqishni istidi. Oyna sirti esa bunisi u-n juda qalin tutqich (no-shaffoflik) ga o'tadi — oyna issiqni qaytib chiqormaydi! Yerda CO_2 yigilib qolib u xuddi qalin oyna vazifasini kosmos qatlamlarigacha yopib tashlamoqda.",
                answer: "Isiqxona nurni qabul qilb atrofga uni chiqarib sovutmaydigan devordir. Tabiat ifloslanganda sayyoramiz xuddi shunga aylanishi mumkin",
                difficulty: 'medium'
            }
        ]
    },

    questions: [
        {
            id: 1,
            question: "Qaysi xavfli muammo to'g'ridan to'g'ri IYOD asoratidagi $CO_2$ gazining sababi bilan bog'langan?",
            options: ["Kislorod darajasini tuproqda tushishi", "Zilzilalar o'pqoni", "Global Issiqlik (Parnik effekti)", "Kosmik teshiklar oson ochilishi"],
            correct: 2,
            explanation: "Asosiy va eng ulkan masala global isishga karbondioksidni va is gazlarini eng kuchli hislarni o'rnatishi.",
            difficulty: 'easy'
        },
        {
            id: 2,
            question: "Smog o'zi nima va qanday paydo bo'ladi fanda?",
            options: ["Dengizardan suv tortilib tushgan osmon yili", "Ishchi asoratidgi qora chala yongan tutun va sanoat zarrali havosi osmonni tushib tuman xolaga keltirmogi", "Yashil energiyaning eng sifatli shisha manbai"],
            correct: 1,
            explanation: "Smog shahar avtomobilar xolati yig'ilgan zaharli quyi atmosfera tuman havosi",
            difficulty: 'easy'
        },
        {
            id: 3,
            question: "Kislotali yomg'ir qanday komponentni bulutda erishi yordamida ro'yob beradi?",
            options: ["Natriy H2", "Oltingugurt dioksid ($SO_2$) kabi azod turlari yonib uchishi sababida", "Faqat issiqlik"],
            correct: 1,
            explanation: "$SO_2$ va $NO_2$ turlar gazlar suv buluti orasida kimyoviy jarayonlardan kislotalik ph xolartadi.",
            difficulty: 'medium'
        },
        {
            id: 4,
            question: "Qaysi mashina fizaik jihatdan havo sirtini is gazi yo'llarida bulgamasik ehtimoli bilan to'la e'tirof etiladi:",
            options: ["Termo-Elektr qozon Stansiyasi", "Dizel ulovlar yuk poezd", "Zamonaviy to'la Elektromobil", "Karbyurator sport avtomati"],
            correct: 2,
            explanation: "Batareydan zaryad oluvchi texnik vositada dvigatel qozoni portlaydi degan termin yo'q (Olov yo'qlik xisobi).",
            difficulty: 'easy'
        },
        {
            id: 5,
            question: "Yashil energiyaga (Green tech) misol qila olinadigan qatorni xulosa qiling?",
            options: ["Shamol eshigi, Quyosh panellari", "Ko'mir yoqalg'isi pechi, Uranni siqish, Traktorlar", "Suv osti atom kemalari, Neft zavodini turbinasi"],
            correct: 0,
            explanation: "Faqat shamol, suv yo'riqarili oqishi va Quyosh eng barqaror zararsiz tizim bo'ladi fanda.",
            difficulty: 'easy'
        }
    ]
};
