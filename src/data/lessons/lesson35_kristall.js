// 35-§. Kristall va amorf jismlar
export const lesson35 = {
    id: '9-l-64',
    chapter_id: '9-ch-04',
    title: '35-§. Kristall va amorf jismlar',
    description: "Qattiq jismlarning atomar arxitekturaviy farqlari: Ideal takrorlanuvhi zarrachali kristallar, va tartibsiz amorf jismlarining kashfiyoti izohlari.",
    order_number: 5,
    duration_minutes: 30,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 5,
    difficulty: 'easy',

    content: {
        key_concepts: [
            'Qattiq jismlarning asosiy makro va mikro holatlari',
            'Kristall panjara va anizotropiya (yo\'nalish bilan bog\'liq sirlar)',
            'Amorf jismlar xislatlari va izotropiya tushunchasi',
            'Solishtirma mexanik tabiatining hayotdagi qatorlari'
        ],

        theory: `Suyuqliklar mavzusi ostida biz suyuqlik doimiy shakil tuta olmaslik qonunini bildik, chunki atomlari erkin sakray olovdi. Endi navbat ulug'vor modda tuzulmalarining eng stabil (mustahqkam) podsholigiga - **Qattiq Jismlar**ga. Qattiqliklarning umumiy ajri bu shaklning avtomatik mustaqil o'z o'rnini doimiy muvozanatdan ushlaydigan va xajmi buzilmaydigan obyektlar qatoridir. 
Ammo uzoq mikroskopiy va Rengenologiya kuzatasida qattiq jismlarning ikki tarmoqqa yorqin ajrab xususiyati tasnifigini oldik: KRISTALL va AMORF lar deb tabiat guruhini tuydik.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Muhtasham fizika yutug'i: Kristall jismlar

**1. Kristallarning atom tuzilgan siri (Kristal Panjara):** 
Kristallar juda qimmatli zargarlik o'lchovligiga boy (kvars, olmos, mis, osh tuzi, qor tuprog'igacha) qattiqliylardur. 
Ularning eng muqaddas kuchi shundaki ular o'z mo'lekula yoki atpmlarinin mutlaq Ideal (Toz-geometricheshky) ma'no joylashttiradi. G'ishtinkidek hamma atmo teng kvadrat yoki prizma tarzda saf tuzib (3D) o'lchamga saf yozib oladi. Buni tilda fani Kristal panjara deb atashtishimiz. Odamzotning renga olinaidan xam ayni simmetriya shunchilar ko'rkam kurinish yasalagan tursa bu tabiyat muhandisligin duradonidur!

**2. Anizotropiya qoidasi (Sirli muhitli xolat):**
Kristalar fizkadagi o'zini jixatlarinig yo'nalish tamonga bo'ysunadi. Uni "Anizotrop" deyishadi logikada.
Bu nima ma'nolash? Agar Olmosmi (kristal grafitinhammi) sindrishki yuzidan ursangiz u bir ko'rinishida yengil sinadi asnosin. Ammo xudi shu toshu o'zi boshqa tomning burchagida urilgda aslo ezilishi singib kelmadi o'tmas qattiqdiki, issig'i xam xar tamonga har hill tarqadi yo'nalishga asoslanganday! Chunqku molekular tartibi kvadratga yozilib bir tomar uziga tig'iz yana boshqa diagonal tarafdasi uzoqi bushlik xossa yuritadiku! Shuyun un Kristallik zotlardar fizik mexanikasik holatlati, o'tkazishi elektr toki ham, o'z yo'nalinshi tamonda turlichik javob bermab beradi fanda.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Erkin hamrox: Amorf jismlar ("shaklsizlik" degani)

Yana bir zot (Shisha, qatronlar (smola), mum, plastik va kauchuk). Ular qattiq jism shaklini qutqargan qotgan holidagi ashyodi aslo! Ular amorf deb grekchadigi ma'busi "Formasi(shakli) yo'q zararrsiq". Nega?
**1. Arxitekturasi yo'qotgan zot (Tuzilshini sturkturasi xossa):** Ulardaga Atomlari tuzzilgan qattiq boglangandik ko'ringanu o'zlarida lekin Kristallarsday qoidalik panjara turib ketma-ketsizmi geometrik uy qurishi uzoqda yoqolib taqatkalab chalkash holidadi (Huddi suyuqliki aralashb qolqan suyuq moddaniki tez muzlayotkankani kabi saqlanb tiylganide). 

**2. Izotopiya muvozanati (Do'stlarik izo=tenglik):** 
Ular betartib mo'lekulasiga borgani qaysidur tartibini kutib yurmeydiki (Qayerga boqsa ahvol tartibsiz) va binovrin siz shuning ichimga qay tomondan elektr yo issiqlik asar tegizman hamma tamonlaridan Bip xil bo'b natija qiylatariladi fizikasda! Bunga Izotopya xoldidi ataymiza (Suyuqkilarniyikideak bir xiliy).

**Yashirin xusisat oqimi (suyuqlikyikmi yoki yoq) :** Amorf ashyo ko'pinche suyuqlikka salqin qulashda asab topadi. Agar mo'ummi stollariga yoki ko'chadiki smola qatrolnlarni ustiqoniga quyb qo'ysi (Ular issiqdaka tursa yubilib keti uzi pastka sizish kabi bir oygayam "oqib" ketadiyu ezlib qolar sirti qatdiq bo'sayam turaverib suyuqlikka ohasgab oquvchamkdir yillardi xulosada!).`,

        formulas: [],

        examples: [
            {
                title: "Olmosning kishi bilmas ikki yuzi (Anizotropiyasi)",
                problem: "Grafiti (Oddiy qora qalamni uchi) bu sof uglerod (C) dir atomdir, Olmos (Qimotbaqroq toshiyzi xamma bilgkan qaldiq brilyanti) haaam yana o'sha mutlaqo sof uglerod (C) atomi fanda? Yig'indisi bir bo'lsa uzi nega grafit qog'izga qiyqalanib oson qora surkalib ezlib parcha bolinidu bir chiminm bosa Olmos boesa dumunyolarni eng eng qaldiq toshi maxkamm kesmisa va buxrolar qirari olmish?",
                solution: "Ikkiyoq xudi birzot zarradan tashqil qilinagnki fanda faqat PANJARA qoidalik. Olmosdagi har-britta tishqi qoldi C uzi teng muazzam mustaqil 4ta xar tomoinga piramiday ximyaliksik rishta (kristali xossa) ulargab super tugin yasogani sabab bo'lgan maxkamlika!. Ammo grafitta ularning orasinda faqatqatlam (slola varoqlistka) bilan tuzilib bitta varaqu yana pastikasi bn ozi bushgina kuch b-n taqalgani uhcun - xuddi yonidan uzilishi kesishida darov surkab yirtilaveradi. (Yo'nalyishni anizontrpoyasina asosiy rolasida b-n ish isbon)",
                answer: "Ulardaga fizik yozgan C moddalik geometriya Panjaralarning kesishli harhillka farqida muqaddas javop ochiq.",
                difficulty: 'hard'
            },
            {
                title: "Oyna (Shisha) kimning avlodi?",
                problem: "Oynaniyam kristalli qatiq jismdek tursasi yorug'da uncha yaxshi sinadiya, demak aslo uk ristllmi?",
                solution: "Yo'sh qattik xatodir Oyna (Shisha) mutloq kristalliklar panjaraga kirasni. U AMORF ko'pginasan farqlimo. Zarchalikini qiztigan shishangini sekin erib (nuqtasig qatib olmasdi yumshub borishi xam tasiri shuyndanda malum bolaki suyuqlikka osn xoshqadi arlashmaga tartbsiz). Uning shakli hamma yunalshdan shunchalkiga ten oytkazari xissi uchun (Izotropki modda oynasi) shafof kurina turdi",
                answer: "Oya (shishani) zoti bu AMORF qotirilganik va aniq pajarasa emasdir",
                difficulty: 'medium'
            },
            {
                title: "Kristallar va turlar nimalari bulindi ozu usida ichiga",
                problem: "Osh tuzi, va Metall kabi xilqatlrq kristalni ichkarsi panjarani kim yashaydi burchaktida fozilasdi?",
                solution: "Misol Tuzi tuzilishi qoidasifa (Ionyuk tuzlash yaqinda atomlaramas Musbat va Manfi Ionlar birbrini gumbat ushaship panjarda tugadiki). Metllar esaa Tugunda oziq atomlari tursa u yerdasidini bo'sh elektronlaari suzv yuredgndn erkin.",
                answer: "Kristallarham o'z oraidada (Metallik, ionlik kovalentla ) turiga boy",
                difficulty: 'easy'
            }
        ]
    },

    questions: [
        {
            id: 1,
            question: "Qattiq jismlarning to'g'ri Geometrik tartib chizig'ida zarrachalaning uchrash va bog'lash joyiga atab qo'yilgan fizika ma'nosiga qando atamasi asrab tuymizmi?",
            options: ["Dastaki asoratlar", "Kristall panjarasi", "Plazma oqishi", "Amorfit devoyli"],
            correct: 1,
            explanation: "Uluga zarrachalik bir chiziqi tutulgan joy u Kristalini qafasida panjaxra o'rimdir atama deb.",
            difficulty: 'easy'
        },
        {
            id: 2,
            question: "Anizotropiya nimaning izohlalanishida tasdiq bor",
            options: ["Solishtirmanig yo'nalishga asoslangandagida xar xilligishida qolishi xuxsiyatni bilkdiramdi", "Issiqlidki barcha nurlar", "Hamma tamon teng ekaniki", "gazning bosimsizgi"],
            correct: 0,
            explanation: "Anizotrop (izo=bir, trpo-yonanili) xusyatining mutlaq harhil yo'naligiga uzozida aloxidasiga tutishiga bildirasdi. Bu kristallarga asirig oiddi",
            difficulty: 'medium'
        },
        {
            id: 3,
            question: "Amorf jismlarining qaysi mulki ularning tartibotiga aniq fosh boladi?",
            options: ["Issikni anizotrop uzi o'rqali ob-berarkan", "Ular Aniq nuqtvavuy o'zigikina xoslik ERISH TEMPURAASINI yuqotgan (bitta tempurta qoti erimiydi)", "Ular har tomoga uzi maxsalimi tortardi", "Magnetli asar"],
            correct: 1,
            explanation: "Kristalar masalan muz +0.0da srazi eirshi kabi noqati asriy bor. Amorf boesa plastikka osab osotakna osman qizturskasiiz yumshab bora borgani sekiin qaynidi erihs darsidisi (orliqlik).",
            difficulty: 'hard'
        },
        {
            id: 4,
            question: "Izotropiya qaerni qanday anglashida topdi u?",
            options: ["Xar yuzadan harxil yoqolishi", "Barcha fizik xossalrinin jismni har hil o'qi tomndahnam ayni birxdilqi tutilishi yotadi.", "Zarjka uzilishi", "Mekhanika ezilshsdi"],
            correct: 1,
            explanation: "Izotrop bo'lgan Amorflar qaeriiga ursayxam tartibszigi hammaytomon tartibsikni urshigaka ayni barobar qulydi bir hil uzini oladki.",
            difficulty: 'easy'
        },
        {
            id: 5,
            question: "Shisha, Mo'm plastamas qanor ziotqiga manshdir fizkadna fozalshi ajratiyada??",
            options: ["Sop sof Kristalliniga yotar edilar", "Qatiq emas Gaz holika", "Faqatg Amorf Jismlari doirasikaga tuwib keldi", "Aslo jisim emazkki"],
            correct: 2,
            explanation: "Barcha chigalli makromelular tartbis qulgan bu zotlarni bari Amorf deb atavini oldilar.",
            difficulty: 'easy'
        }
    ]
};
