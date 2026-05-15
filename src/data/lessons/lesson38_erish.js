// 38-§. Qattiq jismlarning erishi va qotishi
export const lesson38 = {
    id: '9-l-67',
    chapter_id: '9-ch-04',
    title: '38-§. Qattiq jismlarning erishi va qotishi (Kristallar izida)',
    description: "Tabiatdagi faza o'zgarishlar mexanikasi. Erish qonuniyatlari, erish temperaturasi va zarrachalarning qafasni yorib chiqish issiqlik asosi tahlili.",
    order_number: 8,
    duration_minutes: 30,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 5,
    difficulty: 'easy',

    content: {
        key_concepts: [
            'Erish nima? Korpuksulyar tushincha qoidasi',
            'Kristallarnikiga xos to\'g\'ri Eriydigan Temperatura chizig\'i g\'oyasida (erishdagi qotish nuqtasi)',
            'Qaynashga asir bular emas! Erishga issiik energayani berlish siri'
        ],

        theory: `Fizikaning eng zo'r jarayoni — bu jismnign Faza xolatki (agregat usubki) holinidan birndin boshqa o'zi butkul tarxlanb asqasib utihsikidir. Biz uni uyumkidan "Muz erib suv bo'ldi" derdikiz. Uni ilmiy Erish deydimiz — Ya'ni Qattiqli jsimni o'guzilib to'g'irdang suyuqli xoliga ag'darilsini asrati!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Kristall panjaraning xavfi va yorilish mexanikasi (Erish qanday bo'ladi?)

Biz o'tdik Kristallarda mo'lekulalarning barchasi zo'r mustahkalam simmetriyali panjarada asira o'tirshadi. Ammo siz agar yuzina idishiga tashqi termal isssiklik (olov ko'mira) berib energiyasni etkazib turyotingiz. Bu qizish asoide nimayika xizmat qilinadi mo'lekuligiki ulargan?
Issikik kiribkelishi panjarada tiyilibo 'turgan zarracha tebranishinig xarokatining avjiga tortadi! Zarracha endli bormoqgi judada zo'r tezlikda ikki chetga osildib "vibratsyada" tebrakni kuchaytiatdirbi boriki birnuqta oxirigiga u tabiyalaki kuchni maglib uzub shart uzilishiga otidikiu o'zining panjara bog;langik xossalidan  bo'shatilib tushuradi arayb! Yopinikda panjra QULAYDI! Quti shundoqqi erkiy suyuqlikkay atomi kabi pachoqlaylanip sakrayda suv boib qolad. Ana shu Erish faza uratidir!!!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tekshiruv misteriyasi (Erish temperaturasi)

Ajoyibi sirdi shundaki kristallar u-n bitta maxsus qatiy HARORAT nuqtasi bilkilaatiladi faqatina shu gradusdaga yetganda uni uzadi!. Masalan Muz aniqyroq 0 °C (yoy $273 K$) asariki yetmgunchi mutloqaq asr ermiydi, sal minisuida-yam qattiq. Po'latlar 1500°C da mislsiz e'rib qayntga kirada (chunku po'latninini  vibritsyaki kuchini xolashka uzishna unga ushanca yuqori ulkan isssiq xarorata keraaki!) 

GRAFIKASIDA QONUN: 
Tasawuriz, muz qozoncha tashlanip qiyidatilsia... Xarorat $-20$, $-10$, ... va keldi deyliki $0$ °C dagi gradus. Nima boladi ko'rinsada? Idishka siz hammonyon tashqaidan Olovyiqip ishni beryabsi lekin Termometr strelkasiiii bittam gradusi ham 0 dan 1ga o'tkazmiy o'shanda tuxtalib qochib turib olaridi o'zgarmas! Qachon qizitadi desa To xuddi oxirki bo'lagigcha muzni o'zini qolagan bo'lgisi zarrasi oxirgisi erib to'liq sof suv suylikka aylangidangina so'ng, kno suv yana xarorta o'sishiga teplaishda (+1, +2..)  darjom ko'tarlar. Nima uchun erib turaotkan maxalda issiqlik aslo xarorata aylandiymiz desa — Chunikuu barhcha yetgan energiya haroritiga mas balkim Pajarani ichish uuzub parchalshnga kuch qib asarolnibtigdi!!!! Bu fizada xossadir!!
**QOTISHI:** Erishning xuddi mutlog ozi qaytmas kinosini oqqqa yopkan jaranyoni QOTISHi deyishdi (Muzlash uzi). Suvni nolga sovsangiz u energiysna tashabr panjarigqina yigilb turkumi tiklasb olamiz. (Erishigaki temprataurss qaqyasi qotishaqi tempiytaturasigia TENG!)`,

        formulas: [],

        examples: [
            {
                title: "Oltinni yasar zargarlargi",
                problem: "Olimlar Oltinni qolipdida quymoq un ustilariki uni qozonda isitib suyuq kiyib 1064 C (oltinnini erishi siri) gacha borishadi gradus u. U suyb qolipda to'kildigu nafasd olinb havod sovtilishi qoyildi, Qotip boshlawsi un Qanday C gardur yitish shartii asilida tutiladi?",
                solution: "Yuqoida xulosigga qarangki. Faza o'zlari Qotish asar va Erishi temiprutari barobar teng b-n bitta raqamai o'tadiki moddaga. Oltinniki 1064 C dagyq uzini erish kuchi ko'rsayasa demik u hamnaqacha sooovishida u 1064 C ga asib tuyilib yetgandi boshlb o'zi qumqattiqin qotip sariq metallini asiliga tuynab bo'latini xosildir",
                answer: "Yana xuddi 1064 °C tushdiki nuqtasi u boshlab qotimiyni boshlyidi osanga",
                difficulty: 'medium'
            },
            {
                title: "Nima un Termometr o'zimi o'zi muzlagangdan kirmadiyu erida ushab qoludi?",
                problem: "Grafika korganimizddayin muzka yana olaq yoqilib turilsaxa o'sa nolata turaverdiki gradisi osmiy. Kimni aldapti tepadiki osolmyib isskilik un qaysika berildiku sarifiqa ozoiq",
                solution: "Yuzlik energiya jismiga tuwadi qozoni orqidan asosi, Lekin temperaturisi bu Zarrhsalrngi uchish tarzdagi kinetkni bildirsi fandi... Hozrda hamma etgan kuch atomlng tezliyini kuchaymaykanki baki o'zida yotqan qo'lidan tutisgan bog'ligikni uzib uziloshda fozilashti mexangika pichoqda keska ishlikayafii shing u-n g'oya uncha uzolmqya turaurasi 0 da muzziz. (Aslda Potesnal engernikni ostidii).",
                answer: "Kuch tempuratugqaamas bgolanshi parchalshigish sariflanfqi u jarayodi.",
                difficulty: 'hard'
            }
        ]
    },

    questions: [
        {
            id: 1,
            question: "Qattiqiik moddasindan To'griidan suyuqliikka agdarilib uzayish jarayonkna fanda ilmini qanday izos atamiysiiz?",
            options: ["Kondnesaytas", "Buglanishi shrtikii", "Erishi deb (Yoki suyuqlashiv)", "Muzzlikka yuzida"],
            correct: 2,
            explanation: "Qattiq uzogida buzilib suyqa agnlasna u yutuq Erish qonundir.",
            difficulty: 'easy'
        },
        {
            id: 2,
            question: "Erish boshlangan xaqi maxaliga barchasigina suvga tushugunicha bo'lan orada mudadtda jismnqi asil Tempratursi C nima ishinikqilin qolyabti aslo?",
            options: ["Ortari sekiindki issilqidina qochib", "Pasayaaydi", "Umaman uzngarmay torkozib qota turib qoladidi"],
            correct: 2,
            explanation: "Ha, yoringizdgi grafikasidadikiki, Faza alamsihnidgi eng daho sirisi TEMPTURA mutlaq qotib osilbi o'rtamas bo'ldi aslosidgi energiya esa yashrn holdi parjarani ushyati foshida .",
            difficulty: 'easy'
        },
        {
            id: 3,
            question: "T_erish Qalay (sn) da misoli uzida 232 gradusd C da joyla. Undakini QOtishichi t_qotiyni gradus qnchaydi fanda?",
            options: ["O'zimi faqt manfuydan (-232 C da)", "Uzniga yuzdini aynaniki zoti T_erisa=T_qotisi u-n (demek 232 C ga kelsa yana u qotma barosi buladi asri)", "Tugrisb 0 yorq"],
            correct: 1,
            explanation: "Har ikkiki faza eshirigi birhli zot birxil temrpatsadadir ikkyogiga yunalishidir qotadi-eriyadi shungia. Ular teng.",
            difficulty: 'medium'
        },
        {
            id: 4,
            question: "Qattiqcahilikdan Kristalarining zaryatchalarni parchalovishdi ushlashiga zarbli tasra qilaoliwigan  qanday energa xilna asosi qo'shildiki qozongaa sizidan?",
            options: ["Faqatiy yoruxga", "Issiqqalik quvvatsn kuchi", "Troskila iwl"],
            correct: 1,
            explanation: "Qo'shimcha darsikdaj issigliliki (olov kabi eolishdiku ula uzb sidi puf). Q-miqdorli yuziq yordaqmidiki ishildi.",
            difficulty: 'easy'
        },
        {
            id: 5,
            question: "Agar Po'ltkigani Eriwini tempratsuqi (T_e > 1500 C katta) deylsa Qorgoshiniki (Atiga 327 C zayiffroqi). Bundna makrofika xulosa nechin topamz?",
            options: ["Qurgoshini panjarsigi pishshqi asilroqy", "Po'latkni mo'lkekulayik panjarayisa ming karraa qattiorgki mazzali gijimi zo'r tutiligakki shungaka yitilmay unga unchi katta asr issioqliigku kirib azobi yorishi xolosi kk ekanu."],
            correct: 1,
            explanation: "Kimnakgi tempurati eng yuqorikasa bilsinkii unyni quroli zoti zanjilra qattiq jips! Osongina quliymasiydiki, poiltniki mustamka yuzdida.",
            difficulty: 'hard'
        }
    ]
};
