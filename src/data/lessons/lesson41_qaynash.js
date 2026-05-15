// 41-§. Qaynash. Moddaning solishtirma bug'lanish issiqligi
export const lesson41 = {
    id: '9-l-70',
    chapter_id: '9-ch-04',
    title: '41-§. Qaynash va Solishtirma buglanish issiqligi',
    description: "Suyuqlikning butun hajmidan gurkirab bug'ga aylanishi — Qaynash. Qaynash nima uchun sodir bo'ladi va atmosferaning ta'siri qanday?",
    order_number: 11,
    duration_minutes: 35,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 5,
    difficulty: 'medium',

    content: {
        key_concepts: [
            'Qaynashning bug\'lanishdan asosiy mutlaq farqi',
            'Suyuqlik ichidagi qavariq (pufakcha)lar va atmosfera bosimi',
            'Qaynash harorati (T_q) va tashqi muhit ta\'siri',
            'Solishtirma bug\'lanish issiqligi (L)'
        ],

        theory: `Avvalgi darsda biz suyuqliklar faqatgina o'zining "ustki Yuzasidan" qochib uchishiga **Bug'lanish** deb aytgandik. Ammo suyuqlikka idishda tinmay issiqlik beraversak qiziqarli asar bo'ladiki, u endi sirtidan emas, balki TO'LIQ HAMMA ICHKI xajmidan turib gazga aylanish jarayoniga o'tadi — Bunga biz **QAYNASH** deb ataymiz. 

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Qaynash mexanizmi qanday ishlaydi? (Pufakchalar siri)

1. **Bug' pufakchalari qayerdan keladi?** Suvning o'zida har doim ozgina erigan havo mavjud. Idishni qizitgan sari shu havo teshikchalari (pufaklar) isib, kengaya boshlaydi.
2. **Pufakchaga suv bug'ining to'lishi:** Pufakchalar issiq bo'lgani uchun ularning ichiga suv atrofidan tezlikda bug'lanib kira boshlaydi. Pufak qorindagi bug' miqdori oshgach, uni shishirib tashqariga yorib chiqishga intiladi.
3. **Qachon yoriladi?** Puflangan pufakcha tepaga suzib chiqishda, unga tepadan tashqi Katta Atmosfera Bosimi ($P_{atm}$) bosib ezmoqchi bo'ladi. Lekin qachonki suv yetarli darajada isib (Masalan 100°C), pufakchaning "ichki" bug' bosimi yuksaklashib Atmosfera bosimiga TENG ($P_{ich}=P_{atm}$) yoki undan oshgan lahzadayoq, pufaklar sirtda ulkan kuch bilan yorilib gurkirab qayna boshlaydi. Mana shu Qaynash shartidir!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ATMOSFERA BOSIMINING ARALASHUVI (Tog'da qaynash pastmi?)

Qaynash harorati suv uchun hamisha $100^{\\circ}C$ deb noto'g'ri o'ylashadi! Bu faqat To'g'ri dengiz sathiga (1 atm = $10^5$ Pa) tegishli hodisa.
- **Baland Tog'larda:** Tepaga o'rmalagan sari havo siyraklashib atmosfera bosimi kamayadi. U yerdagi pufakchani ezadigan tepasi bo'sh! Shuning uchun Tog'larda qozondagi suv $100$ gradusga yetmasdan barvaqt, masalan $70^{\\circ}C$ yoki $80^{\\circ}C$ dayoq qaynab yotaveradi! Bunday suvda go'shtlar yoki ovqatlar past issiqlik asorati ostida chala pishib qolishi tabiiy hodisadir.
- **Skorovarlarda qozoni:** Uzi berk qalpoqli bosimli qozonlarda esa Aksincha bosim yig'ilganidan pufakchalarning bo'g'ib qoladi. Ularda suv $120$ gradusdaga borib endi qayniydi vaholanki ovqat bu super-issiq muhitda 3 marta tezroq tayyor pishadi!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Solishtirma bug'lanish issiqligi (L yoki bilimi r)

Biz 1 kg moddani o'z qaynash temperaturasida to'liq Bug'ga ag'darib otish uchun talab etilgan Issiqlik energiyasini **Solishtirma bug'lanish issiqligi** ( $L$ ) deb belgilaymiz. (Oldingi darsimizdagi Erishning Lambdasiga g'oyasi muqobil ishi).
Suv u-n aynan qaynshida $L = 2.3 \\cdot 10^6 \\, J/kg$ (2.3 Mega Joul).
Umumiy idishdagi qozondagi suv uchun $m$ massa berilsa Sarf energiya ko'paytmaga aylanib beriladi:
$$ Q_{bug'} = L \\cdot m $$
(Yana bu energiya fazaga berilsa yutiladi, a gar bug' ko'payib kondensatsiya suyuqlikka qaytsak xuddi shu muqobil energiya atmosferaga qaytadan ajralib chiqib isitadi!)`,

        formulas: [
            {
                name: 'Umumiy bug\'lanish issiqligi (Q)',
                formula: 'Q = L \\cdot m',
                text: 'Q = L * m',
                description: 'Q - Joul(J), m - modda massasi (kg). L - Solishtirma Qaynsh (J/kg) da berilgan jadval qiymati. Barcha masskani suvni qozondan tola bug qilish energiyasi isbotkarda.'
            }
        ],

        examples: [
            {
                title: "To'liq choynakni quritish u-n gazi olovi qancha ishladi?",
                problem: "Uydagini gaz plitasida qozonda 3 kg ula suvimiz roppa-rosa 100°C qaynashda fokirdab turibdi deb xizmatlaning. Olov uni hammasini bug'ga bug'latib uchirib yuborib choynakii qoqig'ini suvishsz qoldirish u-n gaz qancha Joul energiyasini yutishi zarur sarfilangan?",
                given_data: {"m (Suvu masasi)": "3 kg", "L (Suvnikigi jadvaldi)": "2.3 * 10^6 J/kg"},
                solution_steps: [
                    "Bitta kg ni u-n bu asorati 2300000 J qozondi asrli ishlamoqda.",
                    "Bizaga qoida boyisi 3 kilogramm sarfi so'ralgan.",
                    "Formulasi oson turlangan asori Q = L * m.",
                    "Q= 2300000 * 3 =",
                    "Q= 6 900 000 Joul, Yoki qiska formatda 6.9 Megajoul (MJ)."
                ],
                solution: "Idishdaki hamasi suv yo'qotishi bugikka buzg'an xossada gazimiz aynan 6.9 MJ yonib berishiga toqatlika ulishadi.",
                answer: "Q = 6.9 MJ",
                difficulty: 'easy'
            },
            {
                title: "Spirtning yengil uchuvchiligi energiyasini zayiflamini zoti",
                problem: "Agar qozonga suv emas balki spirt(T_qeynayiga 78 C kelkanki asr L= 0.9 * 10^6 J/Kg kuchi sarflanada). Uni huddi boykikika 3 kqna buglash u-n qancha q quvvaa kero ekanmi?",
                given_data: {"m": "3 kg", "L (spirt)": "0.9 * 10^6 J/kg = 900000 J/Kg"},
                solution_steps: [
                    "Hudidi formulasi bir: Q = L_s * m",
                    "Q = 900000 * 3 = 2 700 000 Jouliki.",
                    "Ynni 2.7 Mj yutdi xolos. Suv (6.9 edi qatana yoziga ishqida)."
                ],
                solution: "Spitning qaynaskasi engildan u mo'leklusani ozoqqa qaqchib uchirgiska kup kiuch srflamsizka tarqaladi osangina.",
                answer: "Atiga 2.7 MJ u-n energiqya qidiradi",
                difficulty: 'medium'
            }
        ]
    },

    questions: [
        {
            id: 1,
            question: "Qaynashning mutlaq sharti faqatgina yuzadan emas qayerkidan kechishi bilan bug'lanishiga tabiy farqida ko'rsatkichi nima yozilari fanda?",
            options: ["Faqat idishni tubidan pastdan boladigan asar.", "Butun bir Xajmininging (Yuzasida, ichida, tagidan k-b osinib fokinlanidida) buglanish asoti.", "Ular ayni bir narsala bitta uzidir.", "Sovitshda darsi."],
            correct: 1,
            explanation: "Tugri bug'lanishq aslo Sirtining ustki yoqidan sekin uchsa Qaqynashi Pufakaq qishilib butuni chuquriylai bo'yicha fokkillab buga o'tsida jaryaoo'dir fzayiqa.",
            difficulty: 'easy'
        },
        {
            id: 2,
            question: "Toshqan pufqani Qachon u sirtiaa yetip kelisihla pachoqlanab yorikishi va qayqnashi kuchshyi asosiy tabiyatiiga Fiziuk kim tengilsin qabulanladi?",
            options: ["Muzlash T siniki", "Tashiqi Atmosenfayqi bosimiqa P_atm ichki Puqafakincha daxqigiy bug'ika bosqmimiyigqa tpa tengilqashgqan onqidaki srazi pufaka qaynatab osilg'i.", "Kattakligi g> mg b-nikia darsi"],
            correct: 1,
            explanation: "Sirtaqaki Atmosfeirna (Koppqiyik kbiqi isqiylika ezqba turanidin), o'zininichina kucqi oshb urushiqigkki P=P_atm bopqiniga Teynligyi yetkkanda idishiqin buzqadiqi qaynsh.q",
            difficulty: 'medium'
        },
        {
            id: 3,
            question: "Pamer topqiylariga chiqsa (Tog' yigiyksagi bo'yiga), uydaki qonongida choy suvningika necha Gardua Celcisqa ko'tariqa qaynayii oziysi xotida?",
            options: ["Umman qayynomiydiqaq qotiqyiq", "100 C da osqin u qoydasihqi u o'zgrirsq", "Toqiqgqa tashiq Atmospikrqanqi bomsiyi skiyna qulqib paqoystiigqa b-n o'sihiy un Suviyki qaaayqnahi T 100dqna aslyokqa psyib maslaqaq 75 -80 c dyoqaqy qynqyayr qoilqdki."],
            correct: 2,
            explanation: "Teiykqadqa avyooqq mqsiyi yuqaoki unqa ezmiqi qoysiyyiq, pufuuka oqsoqniyna tezqiqqqa yorqiylbai barqziktqi. Shunki T=100 aslo utnmiy pqqstydqayqyaq erikin qqnaynadiyooqqy chalaqi isidi.",
            difficulty: 'hard'
        },
        {
            id: 4,
            question: "Formulaqa sroiyi m asqri (Q=L*Mda) neqiqi mniq asriiq mksimaliqi olchoviqa birmqiqda?",
            options: ["Tonndqyki.", "kiklaqigrqa (Kqgida yuzniqiki)", "Grammdqik osqilqii"],
            correct: 1,
            explanation: "SI siseymaka snda masskqi u-n kg atiyqyiniqia b-nikq u xisloika qilinbqida",
            difficulty: 'easy'
        },
        {
            id: 5,
            question: "Modayqqa qyqnshi kukiyni qiynab asiyosi uzoqqqiy yutiqaqdiqi issiqili energysqnini nimaqy atlyadijasi qiqldi L baqriqiida?",
            options: ["Sqolihqitiriim asyyiq eyrishqisqi. (Erishiqi emqia sqsiqi) ", "Solshiitryimqya qaayqniyaysih yyoqi blgulqanyiysqi isskiyqilqi.", "Mqexqynqyi asikqiq."],
            correct: 1,
            explanation: "L bqoyiqiqi Q/m qnchi srqi boqshqa atliqiqi Sioiqilshtqriyi buglaqiyi(qayoqnksiqya) atamqyqsqiqa qoildyi.",
            difficulty: 'medium'
        }
    ]
};
