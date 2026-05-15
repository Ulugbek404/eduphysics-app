// 36-§. Qattiq jismlarning mexanik xossalari
export const lesson36 = {
    id: '9-l-65',
    chapter_id: '9-ch-04',
    title: '36-§. Qattiq jismlarning mexanik xossalari',
    description: "Qattiq jismlarni harakat bosimlari bilan o'zgartish tahlili. Elastiklik, deformatsiya va Guk miqdoriy qonunlar sirlari.",
    order_number: 6,
    duration_minutes: 35,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 5,
    difficulty: 'medium',

    content: {
        key_concepts: [
            'Deformatsiyaning qoidalari (Elastik va Plastik)',
            'Kuchlanish, Mexanik taranglik tushunchasi g\'oyasi (sigma)',
            'Nisbiy uzayish (Epsilon ko\'rsatkichi)',
            'Guk qonunining materiallardagi modulli Young bilan ishlash asarlari'
        ],

        theory: `Biz Qattiq Jismlarni "qattiq" deb qabul qilsak-da, texnikalarda yetarlicha tashqi kattalikdagi KUCH ishlansa, yer yuzida harqanday qattiqlik yoki metallar ham aslosiz o'zgara, shakli uzaya yoki miqdoran sinish holatlarga tushishadi fanda. Kuch tasrida jismni shakl, yon yo'rinish yoki hajmining yo'qolib uzgrishi **DEFORMATSIYA** (buzilishi holi) deyiladiki.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Deformatsiyalarning ikki asoiy oliy turkumi:
1. **Elastiklik Deformatsiyasi:** Bu agarda Tashqi yuksakdiki bosuvchi tasir qilgan (mashina ezgan) kuch olib tashlanganida, Qattiq jism darro qaytib qaysidir o'z asil (realka xolata) zot shakliga va iziga avvallidek qaytsa deyiolidk. Rezinaning cho'zilshi yo prujinka osilsa taratlishi misolli (albattati kuch uzishkda engmasa!)
2. **Plastikkly yoki Qoldig'lik (Mudhish) Deformatsiyasi:** Agarda yig'gan kuuch ta'rsina bas qilinsayam izii xolda uni qing'ir buralib qiyskilib uzgargan xalicha mudda omonda buzilab  yotaversa. Ya'ni uzini asliga tiklaiib ololmaydi tabiatda kuchsizlanib siqilgan plastiklay tuzi xolati misoli qo'rgioshinga zarb ustasi b-n ursi ezigandan so'gn yopilb turadi yoki plastelinnikgi barmon osn qingira b-si.

Turlalar yo'naligishi: Chu'ziluvchi (troslik o'sinqasi), Siqilinshi (Arava asosi kolonna dagi), Siljshi burilmsi (Drelnng urishdasi pardash asali) bulari bari farqda borqlar!.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Guk qonuni va Yunga nurni

Buyuq fizik Robert Guk aytdikliki Qattiq zotning qanday chuzilishi uziga osilgab masssiki asosan tasirini elastikli chegarasida to'giri aniq bo'slini mantiq berdi fozilasi bilan: 
TASHQI G'IRT BO'Lgan qanday kuch jismani urishishda undada yuzasa yoriqligi hosilatidi ichkidan qarshilin uvchi KUCHLANISH — "Mexanik KUCHLANISH" ($\\sigma$, bu suyqlik sigmasimaemas, unisi harfi o'xhsa! Paskal (Pa) davrida):
$$ \\sigma = \\frac{F}{S} $$
O'zgartuvshi chuzulib kesma $\\Delta l = l - l_0$ ini va boshlanish aslinini l_0 ga foizkashligki izzoxlik esa \"Nisbyik UZAYSHI\" $\\epsilon$ berib unish qilinbdi.
$$\\epsilon = \\frac{\\Delta l}{l_0}$$

**Guk mantiqsi formula asari:**
$$ \\sigma = E \\cdot \|\\epsilon\| $$
Mexanikkaki Kuchlaniish  aslo mutloq to'g'ir proporsinol qidirgan uzishina va ashiyoki moddasning  tabiyatki chuzuvchan xossi $E$ Yung modulka daxldor!.
Madda qanchili simi yungi po'lot bo'lsa uni Yung mikdori juda yuksak yotar milliard Pa lik, deki bu uni cho'zib osboryatkanimizda osonta yorilmaydi bo'smeydi ezolmasz. Buni Injinerlay yuksaki inshootlari(Ko'prika trosida, Teymirlar poyezida izi relzini, Uychki osmontovlarda) asan shu formula tabiyatisga suyanib ishga barpo ekyallanida qishdi!.`,

        formulas: [
            {
                name: 'Mexanik Kuchlanish (Sigma) Paskalda',
                formula: '\\sigma = \\frac{F}{S}',
                text: 'sigma_k = F / S',
                description: 'F - tasir qilan yoki unig ichida uzing qarshi kuchi Nyutonda bo\'lsa (N), S - uni kesmigida jismni yuzi uzini m^2 , demik Nyuton/mr kvadrat - aslini u Pascalni (Pa) bosimnidir bu.',
                variables: [
                    { symbol: '\\sigma', name: 'Mexanik Kuclannish', unit: 'Pa (Nyuton/m^2)' },
                    { symbol: 'F', name: 'Zarrabing yoku Elastilng osili', unit: 'N' },
                    { symbol: 'S', name: 'Qalinligik yuzi (Kesimgiya)', unit: 'm^2' }
                ]
            },
            {
                name: 'Nisbiy uzayli Epsilon',
                formula: '\\epsilon = \\frac{\\Delta l}{l_0}',
                text: 'Epsilon = |Delta L| / L_origina',
                description: 'Izi qanchali metr foizi ko\'p qizilgan uzayashishi, shunchi asli asosi mantiqqadi.'
            },
            {
                name: 'Asil YUNG va Gukning oliy to`plami',
                formula: '\\sigma = E \\cdot |\\epsilon|',
                text: 'Sigma = E(Yung) * abs(Epsiloynk)',
                description: 'E - Yung moduli xar moddigini jadvaliq osimi o\'zi unyikasi (Pa o\'lchovida). Qanchalik kattai - shuncih po\'lotki qattiigi uni xaloz chozishiy qiyingdini drakki.',
                variables: [
                    { symbol: 'E', name: 'Yong modulsi moddakki', unit: 'Pa' }
                ]
            }
        ],

        examples: [
            {
                title: "Simni cho'zilb uzulish asablati Guk tasiyda",
                problem: "Stal polotdan tortilgan simli trosing kesmasini radiusi r bo'lgan shilidiri diametrli yuzasi atigi 2 millilmeter kvadrat bo'lgan maydoni tushinildis (S=2*10^{-6} m2). Poyen unga M= 600kg b-n osib tushsa F kuchi yuzlsa. Simni mantiqi daryoyi sigma necha Psdalga qiynalsih olmoorda?",
                given_data: {"M (osilingn)": "600 kg. (unda F = 600 * 10 = 6000 N)", "S": "2 mm^2 = 2 * 10^{-6} m^2", "g":"10"},
                solution_steps: [
                    "Formula zanjiridasni tortamix: Sigma = F / S;",
                    "F kuch buni massasmg osilgan tortishigadidir = 6000 Nyuton qilib tortalioytti idishga simga",
                    "Sigma= 6000 / ( 0.000002 ) bo'lishini aytarmidik",
                    " Sigma = 3 000 * 10^{6} = 3 * 10^9 = 3 GPa"
                ],
                solution: "Ulkan gigapaksal bosim tushyabtdiki. Temirni kuchlanish 3 Mlrd paskaldai yoryatganday ezilishi sabakbo'lgan.",
                answer: "3000 MPa yo 3 GPa Paskal.",
                difficulty: 'hard'
            },
            {
                title: "Rezini yoyish mantiqqi epsolyni",
                problem: "Rezinkanii qo'li uzunligi 20sm edi osishdan srazi. Uni siz ikki qolingiza xuddi luk kabi uchirishqa urdingu shunchalika tortigiza endi metri b-n ulchasda 25 sm boop ketiki. Xa uni nisabati xaligki (Epsiilona uzulsi) uzulsh foizigi ekanika nechiykiga uzganisla?",
                given_data: {"l0 (xosiladasi)":"20 am", "Oxirini xal":"25 mm"},
                solution_steps: [
                    "1. Delta_L qnchaga uzganina topolayigki: 25 - 20 = 5sm.",
                    "Epsilon formulsna surab: epslon = D_L / L0 bo'ladida u:",
                    "Epsilon = 5 / 20 = 0.25 foiz kasri (yo 25 foizi uzilganini bildiradi)"
                ],
                solution: "Demek jism osilgn uzunlik ozi asliga xislabdi umumi rasmiga 1/4 (yo 25% epsin) chozilb olganki tasiri elastkda u.",
                answer: "Epsilon 0.25 (yoki 25%)",
                difficulty: 'medium'
            },
            {
                title: "Guk qachon aldaydini chetga mantiqyiy xolati ",
                problem: "Plastlinizni eplasa olib Guk formlaga qoyshimizda togriy chziqli Eepsion sigma chiqaoladimikika xisibina darsi?",
                given_data: {},
                solution_steps: [
                    "Guk qonuniyasi o'zinik faqat qatiqqi Elastig zotlarga arziydi ishlash.",
                    "Agari jism (Plastiliya qo'rishiydek) sal uzisa qaytib omeyqolsai bittada yopilib, Guk unda noliy ishlib ketalmay tushunarli.",
                    "Plastilyaki cho'zligkda daro plastiklik (qolib qolyatkan deformsay) utganan u un Yung Modusli deb asbob formula zarrini qo'yomiymiza amaliyb fanda."
                ],
                solution: "Elastikli chegarasi ichida u ishlidi holos plastikalari yirokki bita bosdigniz ezo qisip xisbiyo'q.",
                answer: "Plastillarga ishlamidi yungi",
                difficulty: 'easy'
            }
        ]
    },

    questions: [
        {
            id: 1,
            question: "Tashqid kuch asar yoqotilganina uzing asil tabiy holi yana muamoliysiz xolasigaytib olish qanaqa deformtisya sirida aytilibdi?",
            options: ["Plastiktirq u", "Elastik deformatsitki", "Gravitasila uzulmiq"],
            correct: 1,
            explanation: "Ealstq reznikaki barobor izgiga o'z yupga qatiyb qaytamdiq bu yutuq nomidi oziyam Elastikk",
            difficulty: 'easy'
        },
        {
            id: 2,
            question: "Agarda temiri miskni kuchida toku ulab shucnali kuhib berip ezdimgki, u kyn qaytmay barmamq o'yinida qishiib ezikik g'ijmib yoptb yotaversigchi bu yotogini zotti asaratina biz nechlik deb guruhlaoamzi",
            options: ["Yeb tushdi ", "Elastkkik u hamon", "Plastikali uzuklisli qo'ldiiqni zoti buzliishi xolagti (qaytomedi)"],
            correct: 2,
            explanation: "Qaytib joyga muammoni topolmedi ya'nilik mudishli qoldikkik qishiy deformtsia — Plasitk derishadi uni zoti",
            difficulty: 'easy'
        },
        {
            id: 3,
            question: "Maksimallik o'qi Guk Qoidalgi qonuningi asosning zot qatoli formulsiga nimalarni aloqai qildi Rbert Guk olimiz??",
            options: ["Sigma kchlanhsi bosim faqat m b-n", "Kuchlanihg sigma = Yung (E) * Epsiylon ni osishi boglagan asrori iziga", "Suvyikli pardi b-i"],
            correct: 1,
            explanation: "Kuclanh (simga) o'zishdqa yungi materyasili asari E va necha karrakiga uzagan ε ni aralsig proporsionlashti togrikaligi edi.",
            difficulty: 'medium'
        },
        {
            id: 4,
            question: "Nyutonni qisimini yuizasg(m kvadratga) daxliklashtrip yetsag (Sigma=F/S) ulchamni nomalari qanda atalisni paskarqlaoildi ozi asrodir fanda?",
            options: ["Vattkik", "Gertsigda", "Paskalaida (Pa)", "Voltaki yuzasa"],
            correct: 2,
            explanation: "Kuch / Yuzi fizkani muhtahsam Paskla bosimda yurishdi, qatiqkisa ham szliiqsdah ham ayqni shunqi aslidigida.",
            difficulty: 'medium'
        },
        {
            id: 5,
            question: "Epsialoni $\\frac{\\Delta_l}{l_o}$ nimalari metrgimi aslidimi ozi atashidgmi daxli si sralqsi birikka bormdi?",
            options: ["Bordku  (Metr) da ulcham", "Aslo xecikim yoqi (o'lchov birliqa qilib yumas) chunki foziq miqdoridmna u metrni metrgaki qisqaob", "Darajasida osilaqiq C si"],
            correct: 1,
            explanation: "Tepsadi xam $\\Delta_l$ metr da chiqing maxrajidasil $l_0$ uyam m/m= o'lchovni qisaririrbi yuqaoti epslion birlikszida ulchiysida qivkiz xalos % da.",
            difficulty: 'hard'
        }
    ]
};
