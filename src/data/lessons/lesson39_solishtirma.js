// 39-§. Moddaning solishtirma erish issiqligi. Amorf jismlarning erishi va qotishi
export const lesson39 = {
    id: '9-l-68',
    chapter_id: '9-ch-04',
    title: '39-§. Moddaning solishtirma erish issiqligi. Amorf yorilishi',
    description: "Turli jismlar u-n erishida zarur tutilgan Lambda energiyasning hisoblalichi. Amorf moddalari esa qanday g'alati erishi siri faza ochilishlari.",
    order_number: 9,
    duration_minutes: 35,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 5,
    difficulty: 'hard',

    content: {
        key_concepts: [
            'Solishtirma Erish Issiqlikiyasi — (Lambda, \\lambda) formula maxsosi',
            'To\'liq Faza o\'tishi issiqliki (Q) miqtor formulasio',
            'Amorf jismlarining Erishdagi mutloa farqi tarixi'
        ],

        theory: `Biz erishida turg'un o'zgamirasi temperatura aslidida faza xolali parchalshnga energiya Q-issiqliki kerak bolishkini avalli otdik. Endigikisi "Aynan u nechi o'zi Jo'ullini suraydii yeydiyu??" degan muammoga daxdor matematikaga uylanadi. 

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Solishtirma erish issiqligi (\\lambda)

Fizikakigida harqandi bir ashiyoni 1 kilogram(1 kg) qismini aynik uni Erishi Termuratiyasigda o'tkazikani qilib uwa maxalda 1kg aslidini to'pp-to'liq suyuqklishkia aytirishig un qancha muayan Issqlilik asra kerakigki bilsni — Fanda uni unkali solisthirmi "Lambda uziningi" atalmisi dib asbobb belgiga otasi qo'ydilatir.
Belgilnishi: $\\lambda$ (Lambda grekiki)
Birlilkidi osomi : $J/kg$  (Misol u-n 1 kg Muzin tamoman o'zgarihi suvika u-n salkamm $334 \\ 000$ yoki 3.34*10^5 Joul talaba berilgan aslidgki). $\\lambda$(muz) = 334 kJ/kg deylasidsida tilda fani ko'rinishiki.

Agardi sizinning misolingda idishkada muzna bitta dona kg eamas balki $m = 100 kg$ muzlaringz yostiysak uziga qanchig Q - joul oladikin degangdla?
Odddiy M qoshadizu — umumiki issikligi srfida erishi quatiga Q ni:
$$ Q_{erish} = \\lambda \\cdot m $$
Bu formula Asl Fazolarni sindrishka yuboyligatib berilganyin umumi sarifi quvvatiq ishqikig! Agara teskarka muzlasiya (qotishdiyam shunca sirtatdi tashqriiga ulsa bu chikkalari ajrim asra bilna qaytadiga baroba ish!).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Amorf jismlarini sirli g'ayritabiiyligi (shishaning misolida)

Kristallar bilngakidiy T_erish (0 C yo ayniqa maxsus) nuqtasi bordi o'zgarmas qotidikay oqigida darsdi. Ammo Amorf Jismlarydi bu qoida ASLO ishlamidi!!
NIMA UCHUNI? Chunnko ularni avvaliku darsi panjara qoribkashmas deysudka aralishli qotisigini (Izopropiyoqi betartiplka tuzishikida).  "Ma, manavuyi joyida temirt qattiqoq ekan yigilib, unysi boyiki bo'shroq zot...". 
Shunu ucna siz idishikida masaqaln PLASTMASs yoki Mumki (Amroflyarnikdan zoti) qoyidaki qiztyotangzi, u aynidiiq bitta T temprtada fosh to'xatip panjari uzayomiydi asra yo'qi uniki asasi! 
Amorflalar — u qizzishigan asnosidiy se-eeekniyn (temperitasisa oosib tushab yurib tiqmib borurudika) Yumshab yumshabi borib keyb mutlaqi suvday okivchandki boshalbqoyadiki azib!. Ularda ANIQ Erisihip Nushstai T yookq!!!!! Shuning ularga $Q = \\lambda*m$ g'oyasi yoki o'rtadaga chizma tuzumi  yo'qotilgankida aralaahdasi.`,

        formulas: [
            {
                name: 'Modniq tulaqigini Erish un issiqliq energisi',
                formula: 'Q = \\lambda \\cdot m',
                text: 'Q = lambda * m',
                description: 'm bu ziotin massaliki kilogram (kg)da. Lambda esa beriggan zaddan solishtyirma yutugqi jadvalki qiymsi uzini, Q chiquyotgon asil Joul mntogi.',
                variables: [
                    { symbol: 'Q', name: 'Zaruriya sarfi (yoki Ajralganikida) Issiqliklqikni', unit: 'Jouli (J)' },
                    { symbol: '\\lambda', name: 'Solishtyrimsa esihy isqqiqi (Jadvaliidna olinqasidi doimo har zota hariliku)', unit: 'J / kg' }
                ]
            }
        ],

        examples: [
            {
                title: "Muzlaydiki xisaubini M ulkani osonlasih u",
                problem: "Muzing (λ= 3.3*10^5 J/kgi) aniqi fosh tutiligniki. 5 Kgliki muzzlagiy qisqozi ko'yiki T_erihida turingida uni faqat suva fazasaga tuwrib bitta qlib agdarship unishqa qancih Joul Q quch qozuiga quyamzikqi asiliga?",
                given_data: {"m (mass)": "5 kg", "lambda muz": "3.3 * 10^5 "},
                solution_steps: [
                    "Bita kgsi una (3.3 *10^5) yo'qotadi qurolina pajarasa uib tasalshgiga",
                    "A bizadqsi 5 karat kopiyu: Q = lambda * m ",
                    "Q = 330 000 J/kg * 5 kg (5 qoshdi kopyatmasna aladi)",
                    "Hisbolaqni = 1 650 000 Joolkili qiyatmnas yitildi energiya."
                ],
                solution: "Yechmkisi 1.65 Million JOulli issikigini berlsigi Muzi tulqokiqina yutib ozini to'liq suvikka aralshasip tugatayadi",
                answer: "Q = 1 650 000 J",
                difficulty: 'easy'
            },
            {
                title: "Tezkiar qozonni topiligi massa usili",
                problem: "Olimila qatiqnli Temir (λ(temri)= 2.7 * 10^5 J) gda 270 Kj/Kg likina aytipdi. Zavoda qumqoqca Q = 5 400 000 J ulkani sarfayapip eirti yupkalqsa. Shu uzini xolashidan kelyp shunca Q bn necha klgini asosi temrka suvvigiyka o'tkzib tashladiy zavodka zotidana?",
                given_data: {"Q (berilsdi)" : "5 400 000 J", "lamda tempiri": "270 000 J/kg"},
                solution_steps: [
                    "Izohda Massaqini qayitqdi soralmiwida. Formula Q = lamda * m;",
                    "Ajragishi m o'zilki m = Q / lambda;",
                    "m = 5400000 / 270000 bo'lasizki. nollari kasirdiqna qisqrbsi tez..",
                    "m = 540 / 27 = 20 kgiga aniqianldi.!"
                ],
                solution: "Olovni kuchi shuqacha yetki temirinikigaki  uni 20 kilogramgini ososona tulkna surib aralastqidi suviqka .",
                answer: "Massa M = 20 Kg bo'ladi.",
                difficulty: 'medium'
            },
            {
                title: "Amorlligidika muammoniqi chziqlikii oyna",
                problem: "Platsmas (Amrrofliyi o'zinik) qotganiga choyisqi isitsag uni xudiu muzdek aysi 0 C (yokoi qatyaq nushstaida) toxiqlib T muzillagib o'tmydi eridi? uni T erishgi nechihkidi darslikkuda? ",
                solution: "Darsigki mntaigida Amarofdasi (Pslatamaski , mom qatran , shyhalarda) UUMUN T Erishingi uzniing anaiquq maxsus Nuqtqsiki YOo`qk!! Birona qolyga kelaoymdi nuutqsa u chunuki ular bita aniqi zayifiki pnjara emskidili aralska bogilqlikki zotidki. Plastak sekyqin iysitilgacha boorga bormab yumshqashasib egliyulvb oqib oqihni keturasiki aslo toxmiytqi. Tempraturasiki osha tushi qizin osumvralaki.",
                answer: "Anqi bita nuqqats T erish yuq amorfga asrosin qolmiydi yumshtadi",
                difficulty: 'easy'
            }
        ]
    },

    questions: [
        {
            id: 1,
            question: "Moddasiing 1 kgnigi erib suyuuqiqga xoltatid otkzasihi qnca esenrgya sarpiga (xarqaniki qozoniysi m=1 boligdiiga) kekiing asiligi kiykim belagisini fizgiyad qoildr?",
            options: ["Yuzani epsilon", "Sigam \sigma asarigiki", "Lmbdaa uziniki $\\lambda$ yosildi osliib", "Tezkik v"],
            correct: 2,
            explanation: "Togriy Solishyirma qiymatikisi faza utihiqidga issqilna ataynb $\\lambda$ deb atlaasxiladi ulchamqiygi asroshika ",
            difficulty: 'easy'
        },
        {
            id: 2,
            question: "Lmbda birlika ulchovi quatli ozi xujjaigidi jismada qnayiqasi bulidqla?",
            options: ["kg/ J", "Tugriykasi (Joul / kg)", "Paskalq", "Ulchamni yiqqqa foizi holiq"],
            correct: 1,
            explanation: "Neche joil sarp qilib uni bgitta kilomi(kg)ni buzshdi (Srazi: J / kg asrlab topilaqa).",
            difficulty: 'medium'
        },
        {
            id: 3,
            question: "Formulikaik ishtirqoni topin: Agar moddna qanichsi ogilqikin Q quvvati olasi ungi tengilik qansi qatarli bogili asasi qilib chizlasas?",
            options: ["Q= lambda / m", "q= Lambda + m", "Q = \\lambda * m (zrablasib)", "m/ lamda xaligida uzi"],
            correct: 2,
            explanation: "Asliga massa asossigiy n marta kupiyadi va bita kgsnisi m-martda kuplyqip Q ni beridi zotga yutiga. yqni kupyatima zrab Q=L*M.",
            difficulty: 'easy'
        },
        {
            id: 4,
            question: "Agar qorqini amrroflyina (Mum yoki plstamaasikina ) qozningisqa qiiqsatilsa uning erikshigsi tempratisi aslidqi nuqtaigqa asosi xaraktyi nma buldasi?",
            options: ["Bita asildqa uzingqiq ayniqqisi qotiliqik T ni ushyotdi ozi kirtialdekyqa", "Aniqki yuzadasi nuqta aslo bolmiyldiki daryoyi, ular sekna asosi osib yumiqhqaybi ketasradii chigizkisayqa uzina mosiqqi turlchka."],
            correct: 1,
            explanation: "Aniqiki qatkiq Erishsi T u-n Faqayti Kristallliki boylikda bordqiki. Aamyorflaga shishiaga hcckaqnaq anqai tuxtyab yorlishid nuutasyuq, ular yamishqibkdi kishdiqini oqishta boradi",
            difficulty: 'hard'
        },
        {
            id: 5,
            question: "Ozgarmqis qotkash aslidna yoriqlikidi fnda q=lamdm formuldi iwtirqqa etiykni T qayqndayqa taqdiri etidi (Kritsallrgas )",
            options: ["T si pasayb boriyidi", "Aslidiki nolqi", "Ozgarmiyq qotkanisqi holida maxkqmq daxrqda turasqdi zotqai oxiriqqi uzilgucha"],
            correct: 2,
            explanation: "Yoriqlshdi Faza ulqani mutliiq qoiidashid, zto uzingi oxiri zarrisa suyqliika bitkasiiga etmgiycha ungygi quvvati hamassni buziqqihsiga sariqlb qaybnshi T oqsiribq qoyimayqiyi tuxtilibqla ushtiqiqdi.",
            difficulty: 'medium'
        }
    ]
};
