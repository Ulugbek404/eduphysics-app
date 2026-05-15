// ICHKI ENERGIYA VA TERMODINAMIKA ELEMENTLARI — BARCHA DARSLAR
// 9-sinf, 2-bob

export const termodinamikaLessons = [
  {
    id: '9-l-30',
    chapter_id: '9-ch-01',
    title: '15-§. Ichki energiya',
    description: 'Ichki energiya tushunchasi. Jismning ichki energiyasi qanday qismlardan iborat ekanligi va uni o\'zgartirish usullari.',
    order_number: 1,
    duration_minutes: 20,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 5,
    difficulty: 'easy',
    content: {
      key_concepts: [
        'Mexanik energiya (Kinetik va Potensial)',
        'Makroskopik va mikroskopik parametrlar',
        'Zarrachalar kinetik va potensial energiyasi',
        'Ichki energiya ta\'rifi'
      ],
      theory: `Tabiatda energiyaning ko'plab turlari mavjud. Siz avval mexanik energiya — harakatlanuvchi va o'zaro ta'sirlashuvchi jismlar energiyasi bilan tanishgansiz. Lekin modda ichidagi energiya haqida nima deyish mumkin?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Mexanik energiya va ichki energiya

Har qanday jism makroskopik kinetik ($E_k$) va makroskopik potensial ($E_p$) energiyaga ega bo'lishi mumkin. 
Lekin jismni tashkil qiluvchi zarrachalar (molekulalar, atomlar) ham to'xtovsiz harakat qilgani uchun mikroskopik kinetik energiyaga ($E_{k0}$), shuningdek, ular bir-biri bilan o'zaro tortishish va itarish kuchlari bilan ta'sirlashgani uchun mikroskopik potensial energiyaga ($E_{p0}$) ega bo'ladi.

Ichki energiya ($U$) deb jismni tashkil etuvchi barcha zarrachalarning issiqlik harakati kinetik energiyalari va ularning o'zaro ta'sir potensial energiyalari yig'indisiga aytiladi.

Formulasi:
$$U = E_{k.ichki} + E_{p.ichki}$$

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ichki energiyani o'zgartirish usullari

Jismning ichki energiyasi uning harorati va hajmiga bog'liq. Uni ikki usul bilan o'zgartirish mumkin:
1. Ish bajarish orqali
2. Issiqlik uzatish orqali

Masalan, sovuq qo'llaringizni bir-biriga ishqalaganingizda (ish bajarish) ular isiydi. Natijada qarshilik kuchi ustidan bajarilgan ish qo'llarning ichki energiyasi ortishiga va ularning isishiga olib keladi. Qizigan pechka yoniga kelsangiz, siz hech qanday ish bajarmasangiz ham issiqlik uzatish orqali isiysiz.

Ideal gazlarda zarralar o'rtasidagi o'zaro ta'sir (potensial energiya) nolga teng deb olinadi. Shuning uchun ideal gazning ichki energiyasi faqat molekulalarning ilgarilanma harakati kinetik energiyasidan iborat bo'ladi. Bir atomli ideal gaz ichki energiyasi formulasi:
$$U = \\frac{3}{2} \\cdot \\frac{m}{\\mu} R T$$`,
      formulas: [
        { name: 'Bir atomli ideal gaz ichki energiyasi', formula: 'U = \\frac{3}{2} \\nu R T', text: 'U = 1.5 * (m/μ) * R * T', description: 'Bu yerda R - universal gaz doimiysi, T - mutlaq temperatura (Kelvin)' }
      ]
    },
    questions: [
      { id: 1, question: "Ichki energiya nima?", options: ["Jismning balandligi", "Zarrachalar kinetik va potensial energiyalari yig'indisi", "Faqat issiqlik harakati", "Jismning og'irligi"], correct: 1, explanation: "Ta'rifga ko'ra jism zarralari kinetik va potensial energiyalari yig'indisi ichki energiya deb ataladi.", difficulty: "easy" }
    ]
  },
  {
    id: '9-l-31',
    chapter_id: '9-ch-01',
    title: '16-§. Termodinamik ish',
    description: 'Gaz ishi qanday hisoblanadi? Gazning kengayishi va siqilishida bajariladigan ish, uning izojarayonlarga bog\'liqligi.',
    order_number: 2,
    duration_minutes: 25,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 5,
    difficulty: 'medium',
    content: {
      key_concepts: [
        'Mexanikada ish tushunchasi',
        'Gaz ishi va uning p-V diagrammasi',
        'Izobarik jarayonda ish'
      ],
      theory: `Mexanikada o'zgarmas $F$ kuch yo'nalishida jism $\\Delta s$ masofaga siljiganda kuchning bajargan ishi $A = F \\cdot \\Delta s$ formula bilan hisoblanadi.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Gazning ishi

Gaz porshenli silindr ichida bo'lsin. Gaz o'z bosimi $p$ tufayli porshenga ma'lum bir $F = p \\cdot S$ kuch bilan ta'sir qiladi ($S$ - porshen yuzasi).
Agar gaz isib, kengaysa va porshen $\\Delta h$ masofaga siljisa, tizim (gaz) tashqi kuchlar ustidan ish bajaradi:
$$A = F \\cdot \\Delta h = p \\cdot S \\cdot \\Delta h$$
Ammo $S \\cdot \\Delta h = \\Delta V$ (hajm o'zgarishi) ga teng. Demak, o'zgarmas bosimda (izobarik jarayonda) gaz ishi uchun quyidagi formula kelib chiqadi:
$$A = p \\cdot \\Delta V = p(V_2 - V_1)$$

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ishdan foydalanish qoidalari:
- Agar gaz kengaysa ($V_2 > V_1$), unda ish **musbat** bo'ladi ($A > 0$). Gaz ijobiy ish bajaradi.
- Agar gaz siqilsa ($V_2 < V_1$), unda ish **manfiy** bo'ladi ($A < 0$). Bu yerda tashqi kuchlar gaz ustida ish bajaradi. Buni $A' = -A$ deb belgilanadi (tashqi kuchlar ishi).
- Izoxorik jarayonda ($V = \\text{const}$), $\\Delta V = 0$ bo'lgani uchun, hajm o'zgarmaydi va **ish bajarilmaydi** ($A = 0$).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Grafiklar (p-V diagrammasi)

Fizikada p-V (bosim va hajm) koordinatalarda jarayon grafigi chizilgan bo'lsa, bosim chizig'i ostidagi yuza (maydon) bajarilgan ishga teng bo'ladi. Murakkab egri chiziqli jarayonlarda ishni geometrik figura yuzi orqali hisoblash qulaydir.`,
      formulas: [
        { name: 'Izobarik gaz ishi', formula: 'A = p(V_2 - V_1)', text: 'A = p * ΔV', description: 'O\'zgarmas bosim ostida kengaygan gaz ishi' }
      ]
    },
    questions: [
      { id: 1, question: "Izoxorik jarayonda gaz qancha ish bajaradi?", options: ["Maksimal ish", "Nol", "Manfiy ish", "Bosimga bog'liq"], correct: 1, explanation: "Izoxorik jarayonda hajm o'zgarmagani uchun ish nolga teng (A = pΔV = 0)", difficulty: "easy" }
    ]
  },
  {
    id: '9-l-32',
    chapter_id: '9-ch-01',
    title: '17-§. Issiqlik miqdori',
    description: 'Modda haroratini oshirish uchun zarur issiqlik miqdori va solishtirma issiqlik sig\'imi tushunchasi.',
    order_number: 3,
    duration_minutes: 20,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 5,
    difficulty: 'easy',
    content: {
      theory: `Ichki energiya issiqlik uzatish orqali o'zgarganda uzatilgan energiya o'lchovi **issiqlik miqdori** deyiladi va $Q$ harfi bilan belgilanadi.

SI sistemasida uning birligi ham Joule ($1 \\ \\text{J}$) hisoblanadi.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Solishtirma issiqlik sig'imi

Amaliyotda turli jismlarni bir xil haroratga isitish uchun berilishi kerak bo'lgan issiqlik miqdori bir xil yemasligini ko'rishimiz mumkin. Masalan, 1 kg suvni isitish uchun 1 kg moyni isitishdan ko'ra ko'proq yoqilg'i ketadi.
Bu xususiyatni ifodalash uchun **solishtirma issiqlik sig'imi** tushunchasi kiritilgan va $c$ harfi bilan belgilanadi. Birligi: $[\\text{J}/(\\text{kg}\\cdot\\text{K})]$.

Massasi $m$ bo'lgan jismning temperaturasini o'zgartirish ($T_1$ dan $T_2$ gacha) uchun sarflanadigan (yoki jism sovuq hisoblansa — ajraladigan) issiqlik miqdori:
$$Q = c \\cdot m \\cdot \\Delta T = c \\cdot m \\cdot (T_2 - T_1)$$

- Suvning solishtirma issiqlik sig'imi juda katta bo'lib, $c = 4200 \\ \\text{J}/(\\text{kg}\\cdot\\text{K})$. Bu degani 1 kg suvning haroratini 1 gradusga oshirish uchun 4200 J energiya kerak bo'ladi.
- Jism isiyotganda atrof-muhitdan energiya qabul qiladi ($Q > 0$). Jism soviganda esa ichki energiyasi kamayib, atrofga energiya chiqaradi ($Q < 0$).`,
      formulas: [
        { name: 'Issiqlik miqdori', formula: 'Q = c \\cdot m \\cdot \\Delta T', text: 'Q = cm(t2-t1)', description: 'Jism isiganda yutadigan va soviganda chiqaradigan issiqlik' }
      ]
    },
    questions: [
      { id: 1, question: "Solishtirma issiqlik sig'imining birligi qaysi?", options: ["J", "W/m", "J/(kg*K)", "kg/J"], correct: 2, explanation: "Formulasiga (c=Q/(mΔT)) qarab kelgizib chiqaramiz.", difficulty: "easy" }
    ]
  },
  {
    id: '9-l-33',
    chapter_id: '9-ch-01',
    title: '18-§. Masalalar yechish',
    description: 'Ichki energiya, gaz ishi va issiqlik miqdoriga oid murakkab aralash masalalarni yechish va tahlil qilish.',
    order_number: 4,
    duration_minutes: 30,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 5,
    difficulty: 'hard',
    content: {
      theory: `Ushbu darsda biz oldingi mavzularda o'rganilgan formulalarni masalalar yechishda qanday qo'llashni o'rganamiz. Masala yechish fizika qonunlarini qanchalik to'g'ri va aniq tushunganimizni ko'rsatib beradi.

Quyidagi qadamlar orqali har qanday issiqlik masalasini onson yechish mumkin:
1. **Berilgan**larni Xalqaro birliklar sistemasi (SI) ga o'tkazing. Massani kg ga, haroratni Kelvinga (ba'zan farq uchun Selsiy o'zida qolsa ham qulay), hajmni metr kubga ($m^3$) konvertatsiya qiling.
2. Jism kimyoviy qanday modda ekanini toping va mos jadvallardan solishtirma issiqlik sig'imi ($c$) yoki gaz holati uchun molyar massasi ($\\mu$) ni aniqlang.
3. Kerakli umumiy formulani tanlang (Masalan: $Q = c m \\Delta t$, $A = p \\Delta V$, $\\Delta U$).
4. Noma'lum miqdor ifodalanib qiymati hisoblab chiqiladi.`,
      examples: [
        {
          title: "Ideal gaz ishi (1-masala)",
          problem: "Bosim o'zgarmas 2 · 10^5 Pa bo'lganida havoning hajmi 2 l dan 5 l gacha qizidi. Kengayishda u qancha ish bajaradi?",
          solution: "Bajarilgan ish A = pΔV. Berilganlarni SI ga o'tkazamiz: V1 = 0.002 m^3, V2 = 0.005 m^3. ΔV = 0.003 m^3. A = 2·10^5 * 0.003 = 600 J.",
          answer: "600 J",
          difficulty: "easy"
        },
        {
          title: "Issiqlik miqdori (2-masala)",
          problem: "Massasi 200 g bo'lgan suv 10°C dan qaynash darajasigacha (100°C) isishi uchun qancha issiqlik miqdori kerak bo'ladi? (c=4200)",
          solution: "Formula Q=cmΔT. m = 0.2 kg. ΔT = 100 - 10 = 90. Q = 4200 * 0.2 * 90 = 75600 J = 75.6 kJ.",
          answer: "75.6 kJ",
          difficulty: "medium"
        }
      ]
    },
    questions: [
      { id: 1, question: "10 litr hajmli gaz izobarik yo'l bilan 30 litrgacha kengaydi. Agar bosim 100 kPa bo'lsa, necha Joul ish qilingan?", options: ["200 J", "2000 J", "20000 J", "4000 J"], correct: 1, explanation: "ΔV = 0.03 - 0.01 = 0.02 m³. A = 100,000 * 0.02 = 2000 J.", difficulty: "medium" }
    ]
  },
  {
    id: '9-l-34',
    chapter_id: '9-ch-01',
    title: '19-§. Amaliy mashg\'ulot',
    description: 'Jismlarda issiqlik muvozanatini o\'rganishga bag\'ishlangan sinf mashg\'uloti, kalorimetr bilan ishlash usullari.',
    order_number: 5,
    duration_minutes: 20,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 3,
    difficulty: 'easy',
    content: {
      theory: `**Issiqlik muvozanati** deganda o'zaro issiqlik almashinayotgan jismlar haroratining bir xil bo'lib qolishi (o'zgarmas holat) aytiladi. O'zidan issiqlik berayotgan issiq jismning harorati pasayadi, qabul qilib olayotgan sovuq jism harorati esa ortadi va oxir-oqibat, ikkalasi ham bir xil haroratli chiziqqa — $T_{aralashma}$ ga tushadi.

Energiya saqlanish qonuniga ko'ra yopiq sistemada (hech qanday issiqlik yitishi bo'lmasa) issiq jismlar qancha issiqlik miqdorini bersa, sovuq jismlari shuncha oladi:
$$|Q_{berilgan}| = Q_{olingan}$$
Bu tenglama **issiqlik balansi tenglamasi** deb yuritiladi.

Bu mashg'ulotda kalorimetr (tashqi muhitdan issiqlikdan saqlovchi maxsus idish) va turli metallardan, suvdan foydalanib o'zaro aralashtiriladi va yakuniy haroratlar hisoblanadi.`
    },
    questions: [
      { id: 1, question: "Issiqlik balansi tenglamasi qaysi qonunga asoslangan?", options: ["Termodinamika 2-qonuni", "Massaning saqlanish qonuni", "Energiyaning saqlanish qonuni", "Paskal qonuni"], correct: 2, explanation: "U zarrachalarning energiyasi saqlanadigan yopiq sistema asosida kelib chiqqan", difficulty: "easy" }
    ]
  },
  {
    id: '9-l-35',
    chapter_id: '9-ch-01',
    title: '20-§. Laboratoriya ishi',
    description: 'Qattiq jismlarning solishtirma issiqlik sig\'imini aniqlash. Silindrik cismlarning jadvallardagi o\'rni bilan taqqoslash.',
    order_number: 6,
    duration_minutes: 45,
    video_url: 'tez_kunda',
    has_lab: true,
    test_count: 0,
    difficulty: 'hard',
    content: {
      theory: `Usbu laboratoriya ishi kalorimetr qurilmasidan foydalanib bir nechta qattiq jismlar (temir, alyuminiy, mis, qo'rg'oshin kabi materiallar) o'ziga qancha issiqlik energiyasi saqlab olishi mumkinligini (issiqlik sig'imini) amalda sinab ko'rishga qaratilgan.

**Kerakli asbob va jihozlar:**
1. Kalorimetr qurilmasi
2. Termometr
3. Qaynayotgan suv bo'lgan menzurka
4. Turli massali va xilma-xil qattiq metall silindrchalar
5. Massa o'lchash tarozisi

**Ishning bajarish tartibi:**
Laboratoriyani boshlash tugmasini bosib, virtual muhitda silindrchani qaynoq suvda isitish va sovuq kalorimetr suvi haroratini o'lchash bosqichlarini amalda o'z ko'zingiz bilan bajarasiz. So'ng $c_x$ noma'lum solishtirma sig'imni quyidagi tenglamadan topamiz:
$$c_{suv} m_{suv} (t_{yakuniy} - t_{suv}) = c_x m_x (t_{qaynoq} - t_{yakuniy})$$`
    },
    questions: []
  },
  {
    id: '9-l-36',
    chapter_id: '9-ch-01',
    title: '21-§. Yoqilg\'ining solishtirma yonish issiqligi',
    description: 'Olov va yoqilg\'ining energetik miqdorlari va formulasi (Q = qm)',
    order_number: 7,
    duration_minutes: 20,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 4,
    difficulty: 'easy',
    content: {
      key_concepts: [
        'Organik yoqilg\'ilar qanday yonadi',
        'Yonishdagi kimyoviy energiya ajralishi',
        'Solishtirma yonish issiqligi formulasi'
      ],
      theory: `Yoqilg'i yonganda issiqlik ajralib chiqadi. Bu haqiqat insoniyat osiy yashash tarzi (pechka isitish, motorni yurgizish va samolyotlar) uchun yagona turtkidir.

Fizik nuqtai nazardan yonish — u kimyoviy jarayon, bunda uglerod turli kislorod bilan qo'shilib, kovalent bog'lanishlarni o'zgartiradi va buning natijasida harorat ortishiga va ulkan **ish bajarishga** yaroqli energiyani ajratadi.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Yonish issiqligi

Turli moddalarni yondirganda har xil issiqlik ajratadi. Masalan, 1 kg pilla poyasini yoqqanda bergan issiqlik bilam 1 kg benzin yoqqani ancha farq qiladi. Buni hisobga oluvchi parametr bu **Yoqilg'ining solishtirma yonish issiqligi** ($q$) deyiladi.
Birligi: Joule taqsim kg ($J/kg$). 

Massasi $m$ bo'lgan yoqilg'i to'liq yonganda ajralib chiqadigan umumiy issiqlik miqdori ($Q$):
$$Q = q \\cdot m$$`,
      formulas: [
        { name: 'Yonish issiqligi', formula: 'Q = qm', text: 'Q=q*m', description: 'Massali yoqilg\'ining bera oladigan energiyasi' }
      ]
    },
    questions: [
      { id: 1, question: "Q qanday formuladan topiladi yonishda?", options: ["Q = cΔt", "Q = λm", "Q = qm", "Q = Lm"], correct: 2, explanation: "Solishtirma yonish q ga ko'paytiramiz.", difficulty: "easy" }
    ]
  },
  {
    id: '9-l-37',
    chapter_id: '9-ch-01',
    title: '22-§. Termodinamikaning birinchi qonuni',
    description: 'Energiya saqlanish qonunining termodinamik holatlar uchun umumlashtirilishi.',
    order_number: 8,
    duration_minutes: 30,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 5,
    difficulty: 'medium',
    content: {
      theory: `Ushbu qonun koinotning eng fundamental siri — energiya qaerdandir paydo bo'lmasligi va mutlaqo yo'qolmasligini tasdiqlaydi.

Porshen ostiga gaz joylab, unga tashqaridan qandaydir issiqlik uzatilsa ($Q$), bu energiya ikki qismga sarflanadi:
1) Gaz ichi haroratini (porshen tursa ham tezkor molekulalarni) qizitish, ya'ni **ichki nergiyani oshirish** ($\\Delta U$)
2) Gaz qizigan sari hajm hisobiga porshenni yuqoriga ko'taradi — **ish bajaradi** ($A$)

Shuning uchun Termodinamikaning 1-qonuni formulasi:
$$Q = \\Delta U + A$$

**Ta'rifi**: Sistemaga tashqaridan berilgan issiqlik miqdori uning ichki energiyasining o'zgarishiga va sistemaning tashqi jismlar ustidan bajaradigan ishiga sarflanadi.

Agar tashqi gaz o'z hajmini siqsa (siz u tarafga bo'lsa), unda $A < 0$ yoki $A' = -A$.
Shunda formula quyidagini xulosalaydi: 
Energiya berilsa +Q; olinsa -Q, bajarsa +A, siqilsa +A', qizisa +U, sovisa -U.`
    },
    questions: []
  },
  {
    id: '9-l-38',
    chapter_id: '9-ch-01',
    title: '23-§. Masalalar yechish',
    description: 'I qonun va yoqilg\'ilarni bog\'lovchi tenglamalarni jamlab masalalar o\'rganish',
    order_number: 9,
    duration_minutes: 30,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 3,
    difficulty: 'hard',
    content: { theory: 'Ushbu darsning mazmuni olingan formulalarni qiyin va misolli qo\'lamalarga aylantirishdir.' },
    questions: []
  },
  {
    id: '9-l-39',
    chapter_id: '9-ch-01',
    title: '24-§. Issiqlik jarayonlarining qaytmasligi. Termodinamikaning ikkinchi qonuni',
    description: 'Qaytuvchan va qaytmas jarayonlar. Tabiatning bitta yo\'nalishi (entropiya va xaos)',
    order_number: 10,
    duration_minutes: 25,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 5,
    difficulty: 'medium',
    content: {
      theory: `1-qonun issiqlik berilsa, uni boshqa turdagi energiyaga aylanishini (hech qanday foiz yitimsiz) o'qitgan bo'lardi, lekin kundalik hayot va termodinamikaning ikkinchi qonuni hamma narsa tabiatda **faqatgina bir tomonlamalikka moyil** ekanini namoyish etadi.

Termodinamikaning 2-qonuni bir nechta ko'rinishlarda o'qiladi. Eng mashhurlari (Klauzius ta'rifi):
> Issiqlikning o'z-o'zidan sovuq jismdan issiqroq jismga o'tishini taminlovchi jarayon tabiatan sodir bo'lishi mumkin emas.

Yoki Kelvin-Plank ta'rifi:
> Shunday davriy mashina yaratish mumkin emaski, uning yagona ishi bitta isitgichdan (yoki rezervuardan) olgan issiqliklarini to'liqligicha yo'qotishsiz faqat ishga aylantirsin.`
    },
    questions: []
  },
  {
    id: '9-l-40',
    chapter_id: '9-ch-01',
    title: '25-§. Laboratoriya ishi',
    description: 'Turli temperaturali suv aralashtirilganda issiqlik miqdorlarini taqqoslash',
    order_number: 11,
    duration_minutes: 45,
    video_url: 'tez_kunda',
    has_lab: true,
    test_count: 0,
    difficulty: 'medium',
    content: { theory: `Ushbu laboratoriya issiqlik balansi orqali $Q_1$ (isigan muzdek suv oldigan energiya massasi) va $Q_2$ (issiq suv yo'qotgan) ko'rsatkichlarni real amaliy termoelementlar yordamida farqini solishtiradi.` },
    questions: []
  },
  {
    id: '9-l-41',
    chapter_id: '9-ch-01',
    title: 'II bobni takrorlash uchun test topshiriqlari',
    description: 'Bob yuzasidan o`rganilgan asosiy atamalar va nazariy tamoyillar bo`yicha jamlanma nazorat testlari',
    order_number: 12,
    duration_minutes: 20,
    video_url: null,
    has_lab: false,
    test_count: 15,
    difficulty: 'medium',
    content: { theory: `Bu dars to'liqligicha tekshiruv testlari to'plamidir. Chapdagi tugmadan 'Testlarga o'tish' qulayliklaridan foydalaning!` },
    questions: [
      { id: 1, question: "Moddiy gaz asosan qanday jism?", options: ["Mukammal jism", "Faqat bir xil atom", "Potensial energiya deyarli nolga teng deb olingan tizim", "Faqat plazma"], correct: 2, explanation: "Ideal gaz atomlari o'zaro deyarli tortishmaydi." }
    ]
  },
  {
    id: '9-l-42',
    chapter_id: '9-ch-01',
    title: 'II bob yuzasidan muhim xulosalar',
    description: 'Bob yakuni va olingan eng dolzarb tushunchalar',
    order_number: 13,
    duration_minutes: 10,
    video_url: null,
    has_lab: false,
    test_count: 0,
    difficulty: 'easy',
    content: {
      theory: `Biz 2-bobni muvaffaqiyatli yakunladik va quyidagi eng barqaror bilim tarmoqlarini xulosaladik:
- Ideal gaz energiyasi U faqat kinetik bo'lib hajm va bosim parametrlarida uchraydi. Gazning harorati absolut Kelvinga (T) tayanib to'g'ri proportsionallika ega.
- Ish porshen tomonga hajmiy o'zgartirish o'laroq bo'y cho'zadi (A = p*dV).
- Energiya saqlanadi (1-qonun). Gaz kengaysagina unga tushgan yordamni to'la ishlasa ajib.
- Koinotda issiqlik almashinishi har doim iliqroqdan g'aladiga faqat yo'nalishli tushaydi (2-qonun).`
    },
    questions: []
  }
];
