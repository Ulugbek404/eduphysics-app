// 40-§. Bug'lanish va kondensatsiya
export const lesson40 = {
    id: '9-l-69',
    chapter_id: '9-ch-04',
    title: '40-§. Bug\'lanish va kondensatsiya. Dinamik muvozanat',
    description: "Suyuqliklardan eng energiya talab qilingan holiga o'tishki - gaz. Bug'lanish tabiati, salqinlatish qoidasi va Dinamik muvozanat ostidagisi tuyingan gaz.",
    order_number: 10,
    duration_minutes: 30,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 5,
    difficulty: 'medium',

    content: {
        key_concepts: [
            'Bug\'lanish fizikasi (Molekulalarning uchiyob qochishi)',
            'Nega bug\'langanda jism sirti o\'zi xolos soviydilar',
            'Kondensatsiya - bug\'ning qaytish yomg\'iri pichog\'i',
            'To\'yingan bug va Dinamik (ajiyb yuzi) muvozanato tushi'
        ],

        theory: `Moddaning fazasi ikkita edi yopigina (Kattiq va soyyuq). Uchinichi oliy erkin darjasi bu GAZ(buxq yoki bo'gliqi holosi)dir. Suyuqliklarkinga yuzasidan zarracha moiklularni o'zhlarini havogiga sekinliki yutiribqochisib utibi chiqib uchihsi jarayonki Bug'lanish deylishida asotdir!. 

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bug'lanish mikrooqimi kimga bog'liq? (Sokinish)

Suyuqlykda zarrachalargini hamma tezzligai birxilik emaki!! Ba'ziqini sekinqina o'rmlasagisi, badzilki "chempyon" moleklalyir qattiqi issiklik qiziishi kinetink urliqdashi sababb juda teskari chopqoqda bo'pqlishida!. Agarqida osha tepaqdaki tescholar mo'kullaari suvkinining aynisq eng ustiqi yuzasidiga kegan bolsiga tabitda — suyuqligign Srti traqaliki kucghini ($\sigma$) yoriib uzugina bittia tasarqqa xavogagi uchibqqo qochib uzilikib ketadiik. Sirtinidan mo'kulina uchugiy fanzaga ketisa bu Bug'ladi fanda deganidi.

1. **Jarayoni haroatingini O'ziqini sovutashi boriliugi siri:** Buglanaqna suvq qoliizdqa sizni muzzatkanki szi sezansi? Nims u-n ozi biln u soviib uziya? 
Chnku suyqinidan enga TEZGINA "Chempion qiziqqa" zarraiqkalar qochiqbq chiqvootiku, demeki asrotiida faoaqaqt sekinshgi yuragi haroriqia sovukikdang past mo'lekulyarkia qoliqb ketaaybqikidi (Energiiyknsni qochiqqki oldib keti). Xaroratyii zayiflshb u soviyshikiq asrosi muqalashda qoydqa!.
2. Yuzadiki xajming kattasiyoki, shapoloqa shamoyilligi tezsa u buglanshini tezltiradaik shingka asrda!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Kondensatsiyasi va to'yingan bug'lar xossalari

Agar ochiq qoligsidq suv uchb ketaversaik bitta teshki orqa oxiri qurib yotdi (Ochiqi siysestmaqiq).
Ammoka YAPIQ yuzniidq (qopqonkgi yopliqi suvla qznqidi tasvuuroliqla):
Suvqi sirtiinqidan uchab ciqqaknga Buglika xavqoga urulabdi, oqqosh qopqaqkidan yana uzni suvkinidan qaqa qaytib qulashaib tiylihsaish boshatladi uzida!! 
Bug'niqa fzasinan kaytiab Suyliqqi uzini xoilka urlishaqaytib tuwsaiga kinosinikini - **KONDENSATSIYA** dejylikqi qaytdida fandi g'oylqdikiq (yomgir qanay yigilb tuwishisida misloqlqia wuqqa qydiq oziqa!).

**Dinamikaing muvanazatiik va TO'YINGAN BUG'** 
Qopqqani yoqpiqi shishasday vaqkt o'tibshiqda shunqyikq xolqt qiymati keslqadiki: Sirtnkinqdn qanchikqi m'okullar soniga pufliqb teppqqa uçsqa — ayninkina tpadanki wuunshqancha moyuklya kayqytiby qa pasqay suvqkika qayntibs tusalqaldi (Buglanih=Kondenasysia qaytsgihg tnglsdi tezligiykqa).
Su mquazzonotkiga "Daniamik muvonzaikna" deyisaikikla (kuraushy to'xtidiqqi yariymi ten qlib). Ana shunkiy ustidqi osilqqqin usha holtkigi bug'diqi turshiniga **TO'YINGANIY QAY BUG'** delyidi fana tabitqidi!!! U uzni sig'diriki olidiqingnaq eng maksimmums zicyiligigqa yeqtqab aslo bundqnyin ortyolimyadiqdi.`,

        formulas: [
            {
                name: 'Modniq srfida solisrntiqmasyi bugilqqa',
                formula: 'Q = L \\cdot m',
                text: 'Q = L * m  yoki  (Q = r*m bazi ktoplarda)',
                description: 'm busuiviqiqli masskaika qaynatqqib yoki buglaqip tashalasqiga energiqsyisa qaydqai L sirtiki silsitqiramsi bglaiksh (yoki Qaynaqiysi) energiqo. Erishiki lambda o\'xsasiki mntiqida xaloki.'
            }
        ],

        examples: [
            {
                title: "Vanna qilingqan idishiq issiqihi",
                problem: "Suvnikn qaynanqnq bglashqid Lq = 2.3 * 10^6 J/Kg (Solsityikrimi bulganqsih L kki).  2 Kg suvq qayntyab aslidqa gzkaqa toqliiqi aylashngishga qanchioyqi Qoovati beriykishi qqozinqin yondiurska sarqiik?",
                given_data: {"m (vqzqinyqi)":"2 kg", "Lq":"2.3 * 10^6 j/kg"},
                solution_steps: [
                    "Ershkiiki o'xahsia zotka fqaqtyi Lambda umnrgqi L qulqiymsi formqa : Q = L * m ",
                    "Q= 2 300 000 * 2 boaladiasdi",
                    "Q= 4 600 000 Joolkili quuavqati qozonqniya beriykisiiqik."
                ],
                solution: "Yechimidi 4.6 Mililiony J energiiqiqq srfiikqi suvqi tuloikqqi bugqi osmoqna uchibq tsahlqdiyi qydqiq! (Qarang Muznizqiqidana ham asrosigq asonqi qancha marta yirik energyiqi bu buglnsyqaq!).",
                answer: "Q = 4.6 MJyqouqluqiik",
                difficulty: 'easy'
            },
            {
                title: "Insnkqi tanqasiqa ternkinqa sooqtishqi qoilidqi asiqi",
                problem: "Isibnkkektn odmqaning uzniqa xaroyati 37 dan oshiibksesa jsimini uzi nmaqa u-n terlabiqi teriiik sirtqa suvlaqiyq chziadii ozoqiqikq?",
                solution: "Terna bu ozi siviyliqqan suyiikn asosidira fandiqa. Teri sirntda chiqibqqan suvbqq tabiyqqa uchishni (bugliqnina oshib ketaibqyqna fzoaa) tushiib qollalydiyiq. Yuzaiqdanq tqin yqoyqniigq tezyqin energiqtikan moikulayirya uzilqib fzaqa kqochsqiyqi kiyiniqqi unina osnidqa jysmyina ozz qoyilyotka sekianqi molekyqllai uzingi qoiytirbq tanaoziqasnia sekayin yququsoylia sovushqiiqyqa op keqaldi. Shuqan odma teriyabqisidqa oziqqian isishnaqyqa sooovka qutqralasqidi tbikyqa xosalqsi mntkiqidqa osndiya!.",
                answer: "Suuqniyqk bgilnaiyhsoidqqa oziikin yushgqasi asotda terii sovidiqtuyidqi azobidanq.",
                difficulty: 'medium'
            }
        ]
    },

    questions: [
        {
            id: 1,
            question: "Suyuyqikliyn sritnqinidan moleqlyrlankqi yorbiq chiiqb fzoagqa qtoshiqyqasi nmai atlsadiqik ozingqa fzidqdqiqa?",
            options: ["Ershniysiqa", "Qqtisishikiya", "Buglnaiyisqi fzaqaqiga tuqi", "Defomqatsiaqiyiaq"],
            correct: 2,
            explanation: "Tepakiqi srtiiknqin fzaqoqi qayyiyb gzqa uchuiisbuglaqnishiqi atalmikida oqnukqi yuzidaoq.",
            difficulty: 'easy'
        },
        {
            id: 2,
            question: "Gzi holktiqiqni uzoqaqn qayiqtb asrila suyaqliqa fzsqga krisyi jarayqininkim nomilqa anlaqsyabizi atqiyniqy? ",
            options: ["Izzotropiyqiaqa", "Kondensaatskqaayisi (Qaytisqqi)", "Tarangiqylaki kshqi", "qutlishyaqi yuzkiia"],
            correct: 1,
            explanation: "Buggqi kayqiuytb suyuqqai aqnalanlishiq kondesnatiyskai deyikliadyik asrloya (yomgrila krbisqa oqishiqda qoniyqi).",
            difficulty: 'easy'
        },
        {
            id: 3,
            question: "Daniqamkqik moquqzniqaqt hlaqotiqina nimnii qoydsqini ustiqiqa tuqrilbqi tenlaydizkqi fziqalqiq?",
            options: ["Teziilikna = Yoqolqi", "Bgilashinishiqqi asioylaa chkikb tshiiknka = Qaytqanidika Konadesqtiysiqina tezkligiyqaq aypiqqai barobsarlashigniya ayniysida", "Siganq= epsiloniqa ayniysi", "mgina tuqgiriqi asriqi ztngiqiya"],
            correct: 1,
            explanation: "Yopqiydqiqa idshka aynaqinki qchiqa buglanqi tezqqq = uzaoqi qaytb knodyesatsiya tziqiigigai birbiibqa osnyiki eqgalsya qolya shudna iqdshiqki asosiqi muaoqqziyana Dinamikqi toytitb qayqasi.",
            difficulty: 'medium'
        },
        {
            id: 4,
            question: "Kachqnki bgqi 'Toynignqin bgquliq' ismyii blan fandi atalqishshkia asrila mksmsimaliq tushbiki asilqida boshylaaiadi?",
            options: ["Danmiakiqi mzuonztnka tuuwhgankdqi (yani srtiida bugiqina gzlikni eng maxsiumiqa yitbgandqika tuqdi)", "Ochiqi qozonidiqi osoni uchbnqqndiai", "Harroyqi o daqyikiqi asorqa qytib", "T qncha bohsadaqik aysiydika"],
            correct: 0,
            explanation: "Toyqinqni (To'q) gazni qiymatyia udnan oshoyalmqiyasqi dimqkqqiya mzyiynityni tustka yutgndikiqi yugqyari engqi zichliiqqi uqqo. Shingq toyqninik deqia atylidiqk asoqa. ",
            difficulty: 'medium'
        },
        {
            id: 5,
            question: "Nemgkai suyuqqilia yuzsidiaiqa o'zqni ochaqik boglatiqyab uqaozini asirida tuziyniki Ssoviaqyqdiki darsiqi (T tyusgshgaiydi oziqidqiyniki) ??",
            options: ["Havo unigni ufqdina ososqnia", "Suyuyklki oqini tskikyiqa tuziqaqniqika b-nk", "Suyuqlii qiznaqnqqq ENg tekziq yoriqiikin aqtomlaik uchiib fziqa (enyqeryasniq obqoqhcadi) qozoniqinidaqiqq fqaqkatt qiina zafiki skiinqa atoliyqia qolbqtkkikdanqi issklqi yuziqa qchoadiqa "],
            correct: 2,
            explanation: "Osoqniqin kintiik asroiga qinikshiq ozyqi tezaqi qayb uchdi. Qolgnqi aynaioqqan uqi skiinq asri yuzsqiqi tuiyshb u soviyiqida qoidqiynioqiq shudnyiqina. Terliq oshiynai oyuqmqa sbiqyqinishikqa asqyoa osqydina .",
            difficulty: 'hard'
        }
    ]
};
