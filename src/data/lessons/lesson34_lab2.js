// 34-§. Laboratoriya ishi
export const lesson34 = {
    id: '9-l-63',
    chapter_id: '9-ch-04',
    title: '34-§. Laboratoriya ishi',
    description: "Suyuqlikning sirt taranglik koeffitsiyentini tomchi usulida tadqiqiy o'lchash va amaliy isbatlash.",
    order_number: 4,
    duration_minutes: 45,
    video_url: 'tez_kunda',
    has_lab: true,
    test_count: 5,
    difficulty: 'medium',

    content: {
        key_concepts: [
            'Tajriba predmeti: Tomchi uzilishi mexanikasi',
            'Shtangensirkuldan kapillyar o\'lchovi olish',
            'Sigma(σ) = F_taranglik asosisda kuzatishlar'
        ],

        theory: `📌 MAQSADI: Suyuqlikning (suv, spirt kabi moddalarning) sirt taranglik koeffitsiyenti ($\\sigma$) ni aynan tomchilash nazariyasi yordamida amaliy tarzda topish, tortishish qoidalari kuchining (M*g = Sigma*L) formulasini empirik haqiqatida kuzatish.

Kerakli asbob-uskunalar (Anjomlar):
1. Shtativ qisqichi b-n.
2. Tibbiyot shpritsi (yoki tomizgich - pipetka).
3. Aniqlikdagi laboratoriya tarozisi.
4. Menorka yoki stakan, suv (hamda toza shisha idishda o'sha tomchilarni tutish u-n).
5. Shtangensirkul yoki mikrometr (pipetkaknayini tashqi uchi diametrinis(d) millimetrda aniq bilish uchun o'lchov asbobi).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tajriba ishining bajarilish qadamlari:

🔹 **Birinchi qadam (O'lchov ishlarini hozirlash):**
Ishni pipetkaning ochiq taglik chizig'i ya'ni mo'lukalar suv qirrasi ilinadigan diametr $(d)$ sini o'lchashdan boshlang. Uni mm da topib srazi $(d)$ ni daftarga yozasiz, keyin kontakt halqa chizig'i formulasida $l = \\pi \\cdot d$ ni oldindan bilib tulasiz.  Massasini sanash keshin bo'lishchi u-n, yig'ib olinadigan tushgan xolli idish og'irligini $m_{idish}$ sanb quring.

🔹 **Ikkinchi qadam (Sekin tomzish amaliyoti):**
Ichidan xavo qib kiritib so'rilgan suyuqlikdan shprits naychsin bosgan holdda sekiiin, bir maromda tomchilashishni rejalash. Suvning ehtiyotkorona bir o'zi tomchilashi eng asosiysa. Jami $N$ ta mitti tomchini stakanga uzib yigib oling (Aniqlik katta bulib hisob qilingani yaxshiroq, ms u-n 50 ta yoki 100 ta tomchi qo'shing).

🔹 **Uchinchi qadam (Kalkulyatsiya hisobi):**
Yig'ilib stakanda namlangan suvniyana qayta taroziga qoyasiz. Yangi og'irligi $m_{tolik}$ chiqqan vaxt, $m_1 = m_{tolik} - m_{idish}$ o'zining asliga qoldaniz. M1 — asldan o'sha $N$ ta tomchi barcha suvinig yig'indi ogriqliq.
Hozir bitta dona suvning tomchisiga tekkan ulushni topdik desak:
$$ m_{doimiy} = \\frac{m_1}{N} $$

Endi asosiy tenglik eshi ishtirokig kiramiz: Bo'g'izda osilgan 1 ta suv m1 massasining pastga qaratilgan erkin tushush kuchini ($m_0 * g$) , huddi shuncha pipetka ustidagi $\\sigma \\cdot \\pi \\cdot d$ tarangki kuchi muozanatlab ushab turadigo holiga keltik:
$$ m_0 \\cdot g = \\sigma \\cdot \\pi \\cdot d $$
Biz qidirayotgan Tajribning yig'ilgan so'z yuzi sigmani $\\sigma$ xaqini ajratamiz:
$$ \\sigma = \\frac{m_0 \\cdot g}{\\pi \\cdot d} = \\frac{m_{suv\\to'la} \\cdot g}{N \\cdot \\pi \\cdot d} $$

Natijalarni jadvallarga yozib tulasiz va kutarilgan aslini xaqiqat sirt tarangning miqdori koeffisenti ekanlini izbozlaysz!`,

        formulas: [
            {
                name: 'Bitta tomhchi og\'irligi ulushi',
                formula: 'm_0 = \\frac{M}{N}',
                text: 'm_0 = M / N',
                description: 'M bu bitta ishda tushgan 100 ta(N) tomchining jami m og\'irlik massasi.'
            },
            {
                name: 'Tajribada maxsus taranglik sigma formula (N/m)',
                formula: '\\sigma = \\frac{m_0 \\cdot g}{\\pi \\cdot d}',
                text: 'sigma = m_0 * g / (pi * d)',
                description: 'Pipetka uslubiy diametridan d olinadi va maxrajda muvozatlashtilirub kuchi biln bulinib asos sigmani ko\'rsatiladi (N/m).'
            },
            {
                name: 'Idish hisobdan ayirish asari',
                formula: 'M = M_{suv+idish} - M_{bo\'sh}',
                text: 'M = M_suvli - M_idish',
                description: 'Toza amaliy harajatda o\'ta muhi idish nollika e\'tibor tenglmasi'
            }
        ],

        examples: [
            {
                title: "O'zi tushgan sonli Tajriba yechib ko'rsatigchi 1",
                problem: "Laboratoriyada bizda Pipetka uchining(d) = 2mm (0.002m) ga ega bo'lishini bildik. Uning suvidan sekingina stakanga 100 ta tomchi sizoqlab turdi (N=100). Bu 100 ta tomchini og'irligi keyn stakanda qo'b o'lchanganda aslo toza suv o'zi m = 4.6 Gram (ya'ni 0.0046 Kg) kelganligi kurinib tushib aniqlandi. Sigma nechaga amaliy kuttirdi?",
                given_data: {"N(Tomchi sonda)": "100 ta", "m (yigi masa)": "0.0046 kg", "d":"0.002 m", "pi":"3.14 olinadi aslo", "g":"9.8 m/s2 darsiyda 10"},
                solution_steps: [
                    "Bitta tomchi u-n ulishni m0 ni surab olamiz m0 = m / N",
                    "m0 = 0.0046 kg / 100 ta = 0.000046 kg ogirlikkka ega (osilib singani).",
                    "Sigma Formula izida = m0 * 10 / (3.14 * 0.002) bo'lgancha urishdi.",
                    "Sgima = (0.00046) / 0.00628 = 0.0732 N/m! (Tabiatan aniq shunga yaqinlashdik)."
                ],
                solution: "Yig'ilgan empirik formuladigi tenglsar uni rosdan sigma 0.073 ni fosh otdi tajribamiz mukammal",
                answer: "0.0732 N/m chamasida",
                difficulty: 'hard'
            },
            {
                title: "N_tomhchi osishi va ishonch xolati",
                problem: "Nechuk endilar, Tajribada 1 taina uzilib tuwgan suvdaki aniq tortgan bolmasmedi nega aynan minimum 50 yoki 100 ta tomhatish suralar talbda??",
                given_data: {},
                solution_steps: [
                    "Laboratoriya olchovining absolut muammosi Bor — tarozilar miligrammi tochno tutomiydi bita suvni uzida (bita suv balkim 0.004 milligram kelar).",
                    "1 ta yoki 2 ta kichik kabi tushishi tarozining strelkasida katta xato angalatadi (O'lchash minimal yoyiglik nisbat noaniqlik kradi).",
                    "Lekin ko'p misoln 100 tasini ulgu qimligida uni birgali masasyi gramlarda seziralik bo'y kutaradi taroziga malulm anilanadi."
                ],
                solution: "1 tasi juda yengilligidan tarozide xatolarga oson yengiladi, 50-100 ta son xatoni 50-100 karra siqadi pastlatadi maxrajiga.",
                answer: "Xatoliklar kichiqladi va nisbiy ishonch foiz aniq ortadi",
                difficulty: 'easy'
            },
            {
                title: "Xarorat muhitni o'zgarishi va stakan ko'rishi",
                problem: "Suv qizib ketgani xol laboratoriyada pleytka ishga solinib pishrilib turadi. Buning sabab tajribada N ta 100 donag Tomchi qanaqa ko'lam sonlarni egalliridi?",
                given_data: {},
                solution_steps: [
                    ". Issiq xolda suvning sigmasi zailfshib tutolmaydigan bb pasaydi.",
                    "Demak sigma m0 ni uzoqqa tortolmokchi, tezrog' uzulub pasakaka tushveradi (og'irligi yengilida qocha boshliydi tomcha).",
                    "buda demak m2_doimiy 0.004 emas balki masalan 0.002 milligramm oson quliydi."
                ],
                solution: "Massa doimny yengilroq uzuladi sabakbi osolmasiz bo'shashqan issiqiik sirtsiz. Bitta o'sha stakan yigishiga 100tasemas, uje borki 150 ta tomchigacha ko'p uzilib tushatdi tezrogakiga.",
                answer: "Tomchilar osilish ogirligi yengilladi",
                difficulty: 'medium'
            }
        ]
    },

    questions: [
        {
            id: 1,
            question: "Laborotiya naychasining tishqi teshki yo'lini(Diametring) nimada yordamli maxsus aniq topadilar laboratoriyada ozoqqa?",
            options: ["Dovdir metrda (santimtli)", "Shtangensirkul eng qulay va mm ichiga aniq", "Kompas pichogigda", "Menurazida"],
            correct: 1,
            explanation: "Teshik atigi 1mm 2mm lar atrofda mikromet yoki Shtangesirkul 0.1 mmlara qatiy aniq isonchlik ulchayadi metrka ulaomaydimiz oson.",
            difficulty: 'easy'
        },
        {
            id: 2,
            question: "N ta sonlar tomhchilashi maqsadli olinishi fizik qoydada asosi nima deya xatb turiladi?",
            options: ["Daftarni turdirish un", "Xatoki foizi katta massa bilan bulinganda ancha qisqarishi nollanib kamayadi xisobi (katta tarozi osonga olarli u-n)", "Uzoqz chuntish", "Oqtuvchi shu suzni dediki shunga"],
            correct: 1,
            explanation: "Eng katt asbobimiz shkafli tarozi (millligrarni xos emas xossada). O'shanga shprits 1tala mitti osonni sezolmay ko'p tashashadilar olchovi oshib nisbiy hatoy tushirilsin.",
            difficulty: 'medium'
        },
        {
            id: 3,
            question: "Gipotetik masala darsiday, Oy (kosmos asabi tabitda jixatlanish, g ogirligi atigasi Yerdikidn 6 martda kichiklki osmon yuzidir) da tajriba pipetkasin o\'tkazsalik nima kurar uziladi tomchi?",
            options: ["Umuman yuzuz tushmydi naychida osilib towa bo'la turadi xali bar", "Tomchi ulkan shar bo'lib 6 marta kata va ohirlawidagini erkinroq bo'lganda singan uzular o'sha sigma qolib b-n", "Sigma qotib pasakaka buladi"],
            correct: 1,
            explanation: "Mg g ni kichiqroq qilb Oy tortomiydi. Lekin Sigma ulkani suvda tortib uwa qolvotti. Demak suv tomchisi Oyy yerida osilib rosayam katta anor kabi bumagunchasi uzilmayotkan ekan yirik tomchi kuraridik m0 kattaroq..",
            difficulty: 'hard'
        },
        {
            id: 4,
            question: "Tajriba m0 formula aniq massani o'ynatkach (M0=Mjami / N), Pi degani maxrajda qayerdan tishli aloqaga tushub oturgandi?",
            options: ["Arximed islatggani un", "Aloqa (kontur) aylona perimetri 2PiR yo Pi*Diamtr kabi bo'ganida teshigi dumalaoq b-n uziligidan.", "Suvdidgi zihcligidan pipetkanik dori", "Burchagi teta tushishidand"],
            correct: 1,
            explanation: "Shprits yoki pipetka Tushi alabat dumaloqa quvoq uchi bilan xolatidada. Tomhisi atrofisida silinib perimtrei (l = Pi*d) tutinib tuwarkan unga pipetku uchi sabai aylana pishimiduriku.",
            difficulty: 'easy'
        },
        {
            id: 5,
            question: "Issiqliyib tushurli spirt (suv amas), bilan o'sha naychadan tekishilganda tomhci raqamai N nima bulardi?",
            options: ["Ortaridi", "Kammroq edlardi ozuqqa", "0 tushunmadi aslo", "qaynb kitdi"],
            correct: 0,
            explanation: "Spirt sigmasi suvdan 3 martga kichiqarooq zaif . u umuman kuchlik ushlab bosiomay m0 sini mitti mitti bulib darcha dldrib 100taga mos emas balki tezlatib 200 ta 300tasih tushib beruvratidiki mitti tomchisi bilan",
            difficulty: 'medium'
        }
    ]
};
