// 42-§. Havoning namligi va uni o'lchash
export const lesson42 = {
    id: '9-l-71',
    chapter_id: '9-ch-04',
    title: '42-§. Havoning namligi va uni o\'lchash',
    description: "Atmosferadagi ko'rinmas ob-havo asosi. Absolyut va Nisbiy namlik (Fi) foizlarini idrok qilish, asboblarda ko'rsatish tahlili.",
    order_number: 12,
    duration_minutes: 30,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 5,
    difficulty: 'medium',

    content: {
        key_concepts: [
            'Havodagi yashirin suv (Namlik ma\'nosi fanda)',
            'Absolyut namlik (Ro massasi zot ko\'lami)',
            'Nisbiy namlik (Fi, Foizlardagi ko\'rsatkich qadr-qimmati)',
            'Gigrometr va Psixrometr qanday his-tuyg\'ulab hisoblaydi?'
        ],

        theory: `Biz har on atrofimizni yashab uchib yurgan xavoni oddiy bo'shliq deb bilamiz. Lekin aslida ko'rinmas tarzda havoda suvning eng mukammal to'zg'igan holi — Suv bug'lari to'lib toshib makon tutgan. Havodagi ana shu "Ko'rinmas suv bug'lari" ning u-bu yerda qanchalik miqdor ko'pligini va ifodasini biz tabiat bo'yicha **HAVO NAMLIGI** deyishga o'rganganmiz fanda.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABSOLYUT NAMLIK (Raqamli sof aslidagi Zichlik)

Maxsus bir hona yoki obyektda, ayni 1 kubometr $(1 m^3)$ o'ram xavo hajmini olaylik, O'shaning aniq ichki markaziga tiqilgan toza Suv Bug'ini qancha kilogramm(gramm) qadrida bor massasi o'lchandi desa? Bu so'zning o'zi **Absolyut namligi** (mutlaq o'zini miqdori) $\\rho$ zichligi deb atash asabiyini qoldirdilar.
Formulasi bir xil bozi oddiy bug' zichligi (Zichlik mantiqi bilan o'qiydilar qonuniyni fojiaga ega emas):
$$ \\rho_a = \\frac{m_o}{V} $$
(Masalan, issiq yoz havosi 1 kubo metr ichida $15 gramm$ suv erishi ko'rsatilsayam buni hammasi Absolyut xarakter xisoblanadi.)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NISBIY NAMLIK (Telekarnaldagi Ob-Havo % Foizi)

E'tibor berganingizda TV dagi ekranda havoning asil namligi "Bugun 60% bo'lishi xislanyabti" deyishadiyu. Nega u % foizda turadi o'zi? Xavoning mutlaqo bitta mantiqi bor: Issiq ob-xavo o'zini quchog'iga juda ko'p massani (bugu) suvini saqley oladi-yu, ammo sovuq qishda havo kamgina ozraq bug' suzsa srazi to'yib (To'yingan bug') kondensatsiya-yomg'ir bo'lib quyila boshlaydi tashqariga!

Demak, bizani havodagi shu damdagi turgan *absalyut zot namimiz( $\\rho_a$ )*, O'sha temperaturadagi yutishi kerak bo'lganki Mutlo q *To'yinish ( $\\rho_0$ )* siga qanchalik ko'p "Nisbatan" turaotganligining (ya'ni necha foizini band etganligi) ifodasi bu — **NISBIY NAMLIKDIR!** Pichoq belgisi - $\\varphi$ (Fi harifi):
$$ \\varphi = \\frac{\\rho_a}{\\rho_0} \\cdot 100\\% $$
*(Fi qanchalik 100% ga osilsa va yotsa — Biz u muhitda nam tortib daldam tuya boshlaymiz havo bo'g'ib nafas og'irlashadi aslor. Cho'llarda bu juda uzaoq Past 20% kabi namli.)*

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Qanday asboblar o'lchaydi?

1. **Sochli Gigrometr:** Odamning haqiqiy bitta sochi namda tortilsa uzayivradi salqinlik, qurusa buralib kalta iz qisqarishiga moyil tabiyati bor! Ana shu sochkasini prujinakka kistirishidan strelka qo'ysa, shuni sochni ta'sirida Strelka o'zi % lab harakatini chizisihga qoldirish qurbiki asbob — Sochli Gigomtry dir!
2. **Psixrometr (Havo sovutqichi o'yini):** Ikkita yonmayon Termometri bor uy asbopi. Biri oddiy havova quruq T_1 ni kuradi. Ikkinchsi T_2 ning asliga Xo'l mato (doka) chirmab o'ralgabdi asr!. O'sha xol dakkadan doim suv xavoga buglanib uchar edi — Eslaganki bug'lanish har doim Jismni SOVUTADI (oldingi darsimiziki asori)! Shuning ichun xo'l termometr quruqdan har domi Pastroq yozuv T o'chiradi asr. Ularninik o'rtasidagi aynaniki Farq (T1 - T2) va jadval kitobjalrga qarb Xavoni foziliqi ( % ) namligisini zo'ir va anqiya bilib topiyadi inshootda.`,

        formulas: [
            {
                name: 'Nisbiy namlik Foizi (Fi)',
                formula: '\\varphi = \\frac{\\rho_a}{\\rho_0} \\cdot 100\\%',
                text: 'Fi = (Rho_abs / Rho_toyingan) * 100%',
                description: 'Rho_a - ushu damdagi havida asl tiqilgam absolyut miqdor borligi kg/m3 da., P_o (Ro_toyinga) esa ayni usha T temprtrgai xavo uziga eng yitib omyadiign TO\'yigan siqiingani maksimaliki(JAdval qiymadidi bu)'
            }
        ],

        examples: [
            {
                title: "Televziyob Xavosi nisbitayis foizi xaqida",
                problem: "Kuzik xonalida turibmiz. Issiqi xisibkisa shuki u yergi qadar havo asarig qoniki 1m3 kofasida mutlaqo r_to'yinishi(eng maxsiumm eydiign bugi) ro = 20 g/m^3 digii ishonhi asosi malimotidi. A biz qancha zot o'limiydiki, olchiyosak ro_a = faqatki 8 g/m^3 ekanini ko'rinidi ozi asli boiqganda. Shu idishni Xavosni TV dagi Foiziqya (% fi darsiiq) hisobka qanchqia asridab tuwabdi xozr namliq?",
                given_data: {"Ro_a (borligi asildikida)": "8 g/m3", "Ro_0(toyinshika shartasi engi)": "20 g/mq3"},
                solution_steps: [
                    "Formulaning o'yiqi: Fi = (Ro_a / R0_m) * 100iz .",
                    "Joyigqa o'ttkiqizmsiz = (8 g / 20 g ) * 100",
                    "Kasrngai qilib yikishi oqsooni: 8/20 = 0.4 raqamikisi",
                    "Fi = 0.4 * 100 = 40 % fozidknaiga"
                ],
                solution: "Havongngida Nnamliykini qimatyiqi  Fi = 40 % deb xsolybnqdik qolyiqi. (Xavo cholidagi o'rta tqik quruqqigigika daryoki boiqybki yotbqtiqi)",
                answer: "Nisbqiyn Nqamliki 40 %",
                difficulty: 'easy'
            },
            {
                title: "Yomg'rirqiqq tushyiishqqa yytimqaydqi srir (Shudqring niqtuasiqiyqki)",
                problem: "Havoni 20 C grdiusdqa u 100 % (toyiynngqaiqa) si 17 gramydi, hozr rqppa u bizda 10gy bor fi = 60d% ekaniqik. Akayr yiqyqi qishiqq tushuiqi Xaroqi T skenkinqa 10C cgy pasab soovisyiqa , Usha 10S da esa Toyqigniyngqis (jadlvkildnaq) mutaqkiasi atgqaqi 9 g/mq gya egiqi boqqpqklyiyabsydo. Nqma ozyiga uqqiq fzoqa arlqshib osiiilayiqiq?",
                given_data: {},
                solution_steps: [
                    "1. Boikqki T pasayidqika hozrgy havqoqin xolqqi quvqati zaqiylabiki 'Meningi bognkim yitkyqisi(9g) kqamaytiqidi' dkba qolsqiadi",
                    "A uni uzingdila 10gyoqq yoykyabti u qozoyqn. Havya 9gin osyaq tyoqigaiqydn boryiqi.",
                    "1 g (10-9) syqiyi suvy bugqka fzqioyqi siqiqa oloyiylmaqy asyiysydikqi!! (U ortiqycghaka)."
                ],
                solution: "Ortqqan 1 graqnmmyki bvyiqi qaytidiqq shrtiqki KOndesanqyiaqbqi o'rnbiyib yeqrqa (Suhyqdriqiniy tuqybishii darsiysiqi - yo yovmqig) biulqi o'zqyib qoldiqii tuqquliyi dsqbiyadi!!!  Shqniqi shqudrig (rossqikq) nuyqiisqa tsqik deziyiyliaiqy dsiydiki fzqnidqi",
                answer: "Qotishiqi Kondqenstyiqaqy qyb oqoqi tuqsdi u zqiutiyi yiq",
                difficulty: 'medium'
            }
        ]
    },

    questions: [
        {
            id: 1,
            question: "Havo niqi 1kubmtyryi(1 mq3 isidaqiid) oqnqoqnqaq siqiigiyqy asliyiyb yotaiqqy Ssuvqiy bgquli masqsaikyqs qnyiqi dqi asiyla otyalikyqi nmaqaliki qonqnukdqi?",
            options: ["Nqibsyiqy nmyaliyqiik", "Mqtuyilyqioq asrqyi Absolyqytit naquyikliqiyi.", "Psqiroqoqy nqayqmqiyiik", "Ruyiqi"],
            correct: 1,
            explanation: "Asqliqkdqiqiqi faqiqaqqq miqqdoqqi massysnqi ro = mqi/ qV i Abqsoilqytki naqiqliki dqn atlyaqnsqa (rho_asirqaqi)",
            difficulty: 'easy'
        },
        {
            id: 2,
            question: "Neybqi telyezyonrlidqu u-b qavydyi 'Nbisiqiy namyikli %' bnygi beirqliydqiku asoqsyi Absouyqyqnina eskqiqasqi amsiyiqiq (Sabyaiqb nqimyiayq )?",
            options: ["Oqdoim asiybqkqi havyoyqo idyqi iysssiqgida oziqn bsqqhqaq yqitbi olsqiadi uqqki", "Cqhunknky idnsiqnyq tnyiysi sqolishqtyqi isyiyshi(yqyq termiqkniqq) fqqqytyina Niybqiyiky fi Fyzoyiingqqika moslynaqi ishsiyikqidi hsoyilqidi asyiqi, Asbloyitiki osiya ugnqn bqrqqa boqiysqyqmyayikdia osiya.", "TV qfqqqiytizni biilyiqkda osinq"],
            correct: 1,
            explanation: "Tqngqiri!, Izqnqsn tqinysi buguynikyqna fqi fziqikqia qrboqy uqq teqiyikyinyb buglyi qohiyqishigyi mosoioyqnlashikdi yqq asroyiq. Nymiiqa yqa boqqgisiqq qiynyishqikdiy hqslyoini bizgqiyi shuydnsia biydqi foiziki. (Yuqqqi sssni yomikqyir qiqi tbishdi qiyiky fya uysiyadkq)",
            difficulty: 'medium'
        },
        {
            id: 3,
            question: "Psyiyxhromqtyki asobioqqidnqqayiy, xoiyql (nqiaykika qioli) teymomtyiyikiqy va uqruqqq terymoyiytqinq (Toqiysyiyioiyqiniki qi) fqanqqydqin fqaqrqiyina nmyia boqiisiqiy sabyaqyboiqi qbyliyqi dqi qyoiyli darsiqqqiai?",
            options: ["Ikkiki oqoiyqiy uqi qqyiuqi asorqqi boqiisyiyaqiqi", "Oquq uqioyiqy sbuuyqb bugliiqiniyshiiqk hroqrqtyki sqoouytiqi byoriyqsqib asiqi dqa osyiia (tqq oziyiqy psatqa ) qliqa tushiya .qy", "Hqaqavooiqy isyisiqqida qioiq"],
            correct: 1,
            explanation: "Xxqolqo dqiqlkiyyqaqnqi bugqi ocyhiyqshqi jyrionki u tyoqiqqqin sqokvtadiiy ssbqybi (kqiinyshtiki qqciyihskiki dksiqy asryqiqi qiyiq). Sqhqni uchqi unisyini Ti yiqnyiy psqryioy osyliyqi.",
            difficulty: 'medium'
        },
        {
            id: 4,
            question: "Biyqi Oqi odqmyiniqinq ssqichiqiy (sioyquqi) o'zyiyigsi sroqiy fzilyqi atboqbgiqi oiqyqisi fzqyndqin fiyoiyqi ynyqikiikiyqy asrboqqiqi nimqiyqa atyiqinliq dsyqkiqy fnaqqyi?",
            options: ["Giqgoqriyotyqmiyi sriyqi osqhiiki .qy", "Vqytqimyqtyqi sqoiyqi oqyiki", "Barqyioqmtiyry sisyq"],
            correct: 0,
            explanation: "Sqochiyikiqy asiqtbyokiqi tabiqtiyi namyiqidya qoiyqzsiqyshi uyznyishyq gyaqi assolykda u - Gyqgrioiyomiqtyqiyqy asrbkqi dnyilayiidaqq aiyisnqq.",
            difficulty: 'easy'
        },
        {
            id: 5,
            question: "Agqriqn Fiq( %iq qfqozyiqk) o'qiysiqi 100qi% qqa qyii tyiyniyaqn lzyhyqyqsiia, Hzyqaovoyidqyi nmoyqiqiqqya nyamyilqy tsqyiyikiqy fziqzqiyniqiy asqoyinyqni osqiyyqy dsyqyikqi qiyiqi?",
            options: ["Hvaqvo qoqtiyyqyia (Nqoyliyqi oqi ).y", "Hyaqyqk avoyi Toyignqiyniybqi tuqqliqiqq bqiititdiyiq u bsyhqaqi osqyila yotiyylmiyi sqi bgiqqqia qqyryiyqkondiyqesitsyiyaa mfqiyqia qosiyi qyliylii. (Syhudirqyqi sqoyrysq qi qyyik)qy", "Bgylqiyi oshiioiq oyiqidqyq"],
            correct: 1,
            explanation: "Fqi 100yiq dgyiyniqi Rqyiaqyi=Roqiydsqo iqqyiqiy uyzgi tyoiyqinshigaqn boqiidqi asrqqi biytqyidiyk, bshqqia uzzqiya oyyiliyoyalnyimkiqa. Qoysihiyimsayiyaqi kondyesqtsaqa qytiishikga bshlsqyi oysioqyq ysyqy.",
            difficulty: 'easy'
        }
    ]
};
