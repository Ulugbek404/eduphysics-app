// 32-§. Ho'llash. Kapillyar hodisalar
export const lesson32 = {
    id: '9-l-61',
    chapter_id: '9-ch-04',
    title: '32-§. Ho\'llash. Kapillyar hodisalar',
    description: "Suyuqliklarning qattiq jism bilan kontakti sirlari (Xo'llash) va ingichka naychalardagi kapillyarlik jarayonlari tahlili",
    order_number: 2,
    duration_minutes: 40,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 5,
    difficulty: 'hard',

    content: {
        key_concepts: [
            'Ho\'llash va xullamaslik hodisalari orasidagi farqlar',
            'Chegara burchagi (meniks burchagi)',
            'Kapillyar naychalar tushunchasi',
            'Balandlikka ko\'tarlidagigan kapillyar kuchi va Juren formulasii'
        ],

        theory: `Suyuqlik har doim o'ziga yot bo'lgan qattiq jism sirti bilan to'qnashishga to'g'ri keladi (Masalan idish devoriga tiyilgan suv yoki kiyimga to'kilgan choy). Bu joyda ikkita alohida katta kuchlarning jangi boshlanadi:
1. **Koogeziya:** Suyuqlik molekulalarining O'Z DO'STLARINI qanday qudrat bilan ushlab turish kuchi.
2. **Adgeziya:** Suyuqlik molekulalarining unga TASHQI chetdan teginib turgan (Qattiq Jism yoki mato) yuzasi devori b-n qanday qudrat bn tortilishi kuchi.

Shular kurashadi va mutlaqo qiziq narsalar yuz beradi.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ho'llash va xullamaslik

🔹 **Ho'l qlish hodisasi (Ho'llash):**
Agar Qattiq jismning mo'lekulalari (adgeziya) suvning o'sha zarrachalaridan o'zaro ishonch kuchidan (koogeziyadan) KUCHLIROQ tortsa nima bo'ladi? Suyuqlik darhol tarqalib ketadi yuzada! Buni ho'llash deymiz. Choy to'kilsa yozilib ketadi yog'ochni ustida, idishlarning hoshiyasida suv xuddi tirnashmoqchi bo'lgan mushukkadek idish oynasiga osilib tepaga "U" shaklidagi menisk botiqni chizib xiralashadi. 

🔹 **Ho'llamaslik hodisasi:**
Agar suyuqlikning O'Z ZARRACHALARI bir-biri b-n qattiqroq ushlasa boshqa shishaga qaraganda (masalan simob shishaga tekkanda yoki har qanday suv mumga surtilganda).
Suyuqlik ilojqadar qattiq jismdan qochib doiralashadi va butun boshliq sharcha (tomchi) bolib bir-biri atrofida qamaladi. Sirt mo'ylov xosil qiladi qavariq bo'lgan. Tomchi aslo sirpanib ketmay bo'limacha dumalab ketedi yuzda. Bu umuman Ho'llamaslik degani!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Kapillyar hodisalar (kapillyarlik)

Tabiatda (Daraxtlarning tomiridan tortib shoxining har hujayrasigicha ozuqa qanday boradi?) nasoslar emas, Tabiiy Fizika, ya'ni Kapillyar sistemasi mehnat qiladi.
*Kapillyar* bu lotinchasiga "soch tolasidek yupqa" nay degan ma'nodadir. Yupqa diametrli ingichka trubochkada nayning sirt tarbiyasi shu darajada katta rol o'ynab ketadiki:
- Agar naydagi devor **ho'llaydigan** bo'lsa (suv), u suvni idish devorlari o'ziga jipslasha osilib, uni yuqoriga cheksiz o'z og'irligi ta'sirini tutib to kuchi tortaylik yetguncha balandlikka "surib chiqoradi".
- Agar **ho'llamaydigan** bo'lsa (Simob), nayning o'zini o'rtaga qisadi va u hatto ochiq atmosferadagi umumiy naychani ham tashqi massadan balanidligidan PASTGA (pasga urib) botirib tashlaydi!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Kapillyar balandligi (Juren formulasi)

Shu sirli ravishda naychadan suvning mo'jizakor ko'tarilgan $h$ balandligini aniqlash formulasini birinchi bo'lib fransiyalik fizik Juren toblab bergan. Formuladan sezilinarliki, balandlik faqat va faqat Naychaning kengligi (Radiusi) ga qaram ekan.
$$ h = \\frac{2 \\sigma}{\\rho g r} $$
Bu tenglamaga qaralsa, e'tiborlisi $\\sigma$ qancha baland bo'lsa idish shuncha og'ir suvni tepadagacha tortarkan. Asosiysi esa asosi tagidago radiusga ($r$) teskari proportsional: **Naycha qancha qattiq ingichka tiqinli bulsag, ko'llar shunchalik osmonga qarab naycha orqati sapchidi!**`,

        formulas: [
            {
                name: 'Juren formulasi (Kapillyar ko\'tarilish tezligi g\'oyasi)',
                formula: 'h = \\frac{2 \\sigma}{\\rho g r}',
                text: 'h = (2 * sigma) / (p * g * r)',
                description: 'Bu yerda h ko\'tarilish balandligi (m), sigma sirt tarangligi, p - suyuqlik zichligi (kg/m3), g erkin tushish tezlanishi, r kapillyar ichki naycha radiusi (m).'
            },
            {
                name: 'Laplas Bosimi siri',
                formula: '\\Delta p = \\frac{2 \\sigma}{r}',
                text: 'Delta p = 2 * sigma / r',
                description: 'Kavisli menisk ostkalarida hosil bo\'ladigan ortiqcha molekulyar bosim. Ho\'llaydigan xolatida manfiy qavariqqa bosim ishlaydi. Shu tufayli tortish balandligini yuzada bosim tiklaydi.'
            },
            {
                name: 'Taranglik kuchi Juren og\'irlangan massasini taminlagan yechim',
                formula: 'F_t = M g \\implies \\sigma 2 \\pi r = \\rho \\pi r^2 h g',
                text: 'F_taranglik = m * g',
                description: 'Osilib otgan suvning massasini aynan shu konturni devorsini sigma xissasida engib qolgan muvozanat kuch sharti.'
            }
        ],

        examples: [
            {
                title: "Daraxt va Juren siri",
                problem: "Suv (sigma = 0.073 N/m, va p = 1000 kg/m^3) diametri 0.1 mm bo'lgan ingichka naydan o'tmoqda. Qanday h tizza balandligigacha naycha ichki suvni sirt o'z-o'zidan ko'tarib yuboradi?",
                given_data: { "sigma": "0.073 N/m", "d (diametr)": "0.1 mm = 0.0001 m", "r (radius)": "d/2 = 0.00005 m", "p": "1000 kg/m^3" },
                solution_steps: [
                    "Balandlik formulasini xotirlaymiz: h = 2*sigma / (p*g*r)",
                    "Xajmlarni qo'yamiz: 2 * 0.073 = 0.146",
                    "Maxrajdagi hisob: 1000 * 10 * 0.00005 = 10000 * 0.00005 = 0.5",
                    "Bo'lish: h = 0.146 / 0.5 = 0.292 metr."
                ],
                solution: "Demak bu naychada ochiq idish xolatida mexanikatorsis roppa rosa deyrli 30 sm  ga (0.292 m) tepaga sizib aslo to'kilmay havodan chiqib qolar ekan.",
                answer: "0.292 metr ho'l balandligi.",
                difficulty: 'hard'
            },
            {
                title: "Radiusi taqqoslanishi o'yini",
                problem: "Laboratoriyada suv ostida idishga 2 ta nay kirib turibdi r_1 = 0.2 mm va ikkinchisi yanayam ingichka r_2 = 0.1 m lik diametr. Qaysi naychadigi qalinroq yoki teparoqqa havodan chiqar ekan?",
                given_data: {"r1": "0.2 mm", "r2":"0.1 mm"},
                solution_steps: [
                    "Juren formulasida h radius r ga tezkaridir: h ~ 1/r",
                    "Ya'ni, radius 2 barobar qisqarsa, h balandlik shunga mos ravisha 2 barobar balandga zo'rayib chiqadi.",
                    "r_2 naycha yarim arzon 0.1 bulganligi u-n uni h_2  ikki barobar katta tepadagi masalani egallaydi."
                ],
                solution: "Ingichkarog nay eng baland suvni tortib saqlaydi.",
                answer: "r2 naycha ikki martda ko'tariladi.",
                difficulty: 'easy'
            },
            {
                title: "Simob misoli menisk fojiasi",
                problem: "Suv kapillyarda ho'llaydi deylik u botgan shishadan tepaga oshkoroq chiqadi. A simob u? Nima qoladi yuzani h u-n?",
                given_data: {},
                solution_steps: [
                    "Simob ho'llamydigan deb aytildi nazaida",
                    "O'z zarralari shishadan adgeziyani mag'lub qilib asraydi (koogeziya>>)",
                    "Demak simob idish ichki suv yuzasidan PASTROQ qilib botiqliklarni bo'g'ib naychaniham bosib tashlaydi."
                ],
                solution: "Simob idish darajasidan xam chuqurlikka manfiy h balandlik b-n siriolib qisilgan buladi. Simob pastlaydi.",
                answer: "Pasga tushadi",
                difficulty: 'medium'
            }
        ]
    },

    questions: [
        {
            id: 1,
            question: "Qattiq devor jismiga ta'sir tegib tirgak turgan mo'lekulalarini xalq taqdirida qanday nom atashadilar?",
            options: ["Koogeziya", "Adgeziya", "Arximed asabliklari"],
            correct: 1,
            explanation: "Suyuqlik zarralarining boshqa materiyalari sirti b-n kelishuv tortishish kuchi faqat Adgeziya deb atalar u yopishqoq yuzaning ilmi bo'ladi.",
            difficulty: 'easy'
        },
        {
            id: 2,
            question: "Suv qism choy oynani yuziga tokilsayam deyarli xol qilmay yaltirab mo'ngchoqdek uzi aylansa, demak nima u?",
            options: ["U to'kilganidada xam adgeziyasi yuqori kuchi biln o'xshangan", "Koogeziya darajalar (oz do'tsli asari kuchli adgeziiyadan va oziini ichiga siwqan)", "U spirt asosi deb farq qildi"],
            correct: 1,
            explanation: "Agar yot qattiq jism o'zini tortishishidan ancha zaifligidan ustunlik koogeziyaga o'tib (menisk doirachalab xoloslanib qoladi yotib o'tmaydi)",
            difficulty: 'medium'
        },
        {
            id: 3,
            question: "Jurening muazzam idroki formulasiga o'xshab Agar radius R har xilli kichayrsaidimi kapillyar tortishi qaeri o'zgarar edi?",
            options: ["Nay qanchali yo'g'on bulib kensa diametr , shunga mos xisobda shartli tortish kamligini beradi. Yo'g'ondan kuchi tortmadi naycha.", "Radiusi katta bulsa tortshli ko'p", "Sirt xech aloqadori yoq"],
            correct: 0,
            explanation: "Tog'ri formulada radiusi bo'lishuv maxrajiga pastga chizasi etilgan (h=2sigma/pgr). Radius qanchali tushsa H shuncha ortadi.",
            difficulty: 'easy'
        },
        {
            id: 4,
            question: "Kosmik fazoda (Og'irliksiz xolda g=0) kapillyardagi tomchi suyuqlik qattiq ho'llaydigan naychaga tuwsa nima hol yuzaga tegiladi u-n?",
            options: ["Ktarilish bolamiydi", "Suyuqlik g bo'lmagani u-n to mutlaq nayni tubi tugaguncha pishillab uchib ko'tairlib cheksiz chiqib yotaveradiya", "Faqat bir nuqtadami aylanadi"],
            correct: 1,
            explanation: "Gravitatsiya mg kuchi Jurenda muvozanat uchun g ishtirkoda. Agar tabiyat havoda tortishish g nullga yetsa aslo tarangliki pastka qaytaradigan kuch yoq va oxiridagi tuguncha nay qoladi.",
            difficulty: 'hard'
        },
        {
            id: 5,
            question: "Laplas bosimi kapillyar u-n nima ahamiyati bo'shligi ko'radiki?",
            options: ["Botiq tomonlar ostida havoning bosimi suyuqlik ishqini tekkizlik yuzadagidan ancha kuchayrib yuqori tepaga tortib krtadigon asos hisobida beradi u maxiy muannatt u.", "Qozonni sovutadi"],
            correct: 0,
            explanation: "Menisk botiq egrisidagi havo va suv ziddiyatikida Laplas qonuni Δp chizilib naychadiki havoy yuzni simob bo'lsa bosaib suvni desa chetdan soxta pastini oshadi.",
            difficulty: 'medium'
        }
    ]
};
