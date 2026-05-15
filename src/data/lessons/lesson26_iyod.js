// 26-§. Ichki yonuv dvigatellari (IYOD)
export const lesson26 = {
    id: '9-l-50',
    chapter_id: '9-ch-03',
    title: '26-§. Ichki yonuv dvigatellari',
    description: "Ichki yonuv dvigatellari tuzilishi, 4 taktli dvigatelning ishlash jarayonlari, dizel va karbyuratorli motorlar va elektromobillar.",
    order_number: 1,
    duration_minutes: 45,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 5,
    difficulty: 'medium',

    content: {
        key_concepts: [
            'Ichki yonuv dvigateli qanday ishlaydi?',
            'Silindr, porshen, tirsakli val, tutatuvchi sham (svecha)',
            "To'rt takt: So'rish, siqish, ish takti, chiqarish",
            'Dizel dvigatelining farqi',
            'Zamonaviy dvigatellar va EV (Elektromobillar taqqoslanishi)'
        ],

        theory: `Avtomobillar o'z-o'zidan harakatlanmaydi, ularga muayyan energiya manbai kerak. Ko'pchilik amaliyotdagi avtomobillar, mototsikllar va kemalarning asosiy qalbida Ichki Yonuv Dvigateli (IYOD) yotadi.

Ushbu mashinaning "ichki yonuv" deb atalishining sababi shundaki, yoqilg'i energiya manbai sifatida bevosita dvigatelning ichida, xususan, yopiq uchi bo'lgan **ishchi silindrda** portlab yonadi. Tashqi yonuv dvigatellariga esa (masalan qadimiy poyezdlar) yoqilg'i qozonda yondirilib, olinadigan bug' boshqa bir moslamaga olib o'tilgan.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Dvigatel qismlari

1. **Silindr va Porshen:** Mexanik quti. Tepaga-pastga to'xtovsiz harakat qiladigan porshen yordamida hajmni kengaytiradi va siqadi. Porshen tirsakli valga (val) shatun orqali ulanadi. Val esa chiziqli tepa-past harakatni g'ildiraklar uchun aylanma harakatga aylantirib beradi.
2. **Kiritish va chiqarish klapanlari (Ventricles):** Ularning biri havo (yoki yonilg'i aralashmasi) ni ichkariga kiritadi, ikkinchisi qora tutunni silindr ichidan glushitel orqali havoga chiqarib yuboradi.
3. **Sham (Svecha):** Juda yuqori kuchlanishli uchqun beruvchi moslama. Yoqilg'ini chaqnatish uchun zarur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
To'rt taktli ishlash jarayoni

Ko'pchilik dvigatellar "to'rt taktli" rejimda ishlaydi. 1 takt – bu porshenning chekka tepadan to eng pastigacha yo'nalgan yagona harakati. Ushbu jarayonni Nyuton va termodinamika yordamida tushunamiz:

🔹 **1-takt: So'rish (Kiritish).**
Porshen yuqoridan pastga tushishni boshlaydi. Bunda silindr ichida siyraklanish (vakuum kabi) paydo bo'ladi. Kiritish klapani ochilib, ichkariga benzin bug'lari bilan aralashgan kislorod (yonilg'i aralashmasi) so'rib olinadi. Atrofdagi havo bosimi o'z-o'zidan aralashmani ichkariga itaradi.

🔹 **2-takt: Siqish.**
Porshen pastki nuqtadan yuqoriga qaytib ko'tariladi. Bu paytda ochiq bo'lgan klapan yopiladi. Bo'shliqqa qamalgan aralashma hajmi kichrayib, keskin siqiladi. Gaz siqilganda Termodinamika qoidalariga yuzlanib: uning ichki energiyasi (harorati) va bosimi juda yuqori qiymatgacha ortadi! Masalan, havo harorati 300-400 °C gacha ko'tarilishi mumkin.

🔹 **3-takt: ISH TAKTI (YONISH).**
Porshen eng tepa doiraga qisilib borishi bilan, Sham (svecha) kuchli uchqun tashlaydi. Yuqori haroratda turgan gaz zudlikli reaksiyaga kirishadi, deyarli portlash sodir bo'ladi. Harorat soniya ichida minglab gradusga yetadi, molekulalar tezligi aylanib, gaz bosimi shunchalar ulkan kuch bilan porshenni PASTA qarab zarb bilan uradi (itarib yuboradi). 
Faqat va faqat mana shu 3-taktgina avtomobilga harakat ulashadi (Foydali bo'lgan qadam shu)! Val aylanishni boshlaydi.

🔹 **4-takt: Chiqarish.**
Itingan porshen pastdan val orqali inersiya bilan qayta ko'tariladi. Ammo bu safar silindrda kislorod emas, yongan gazlarning zaharli tutunlari qolgan. Shu nuqtada ikkinchi klapan (chiqarish) ochiladi va yuqoriga ko'tarilayotgan porshen tutunni bosim qilib atmosferaga ("glushitel" ga) siqib yuboradi. Silindrda yana toza joy paydo bo'ladi!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Dizel dvigatellari farqi

Yuk mashinalarida asosan Dizel ishlatiladi. Bu dvigatelda uchqun beruvchi Sham yo'q. U qanday ishlaydi?
Oddiygina qilib aytganda, silindrning o'ziga benzin emas, sof havo kiradi. 2-siqish taktida porshen havoni shunchalik kuchli siqadiki (benzinga nisbatan ancha qattiqroq), havoning harorati tabiiy holda 500-700 °C ga yetib boradi. Bu paytda injektor deb ataluvchi teshikdan Dizel moyi zarrachalari changitib (purkalib) sepiladi. U o'z-o'zidan shu haroratda avtomatik portlab yonib, ish taktni bajaradi.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Zamonaviy taqqoslash: IYOD vs elektromobil (EV)

Hozir darsliklarda inqilob yuzuz bermoqda. Tesla, BYD singari elektromobillar nima uchun benzin avtomobillaridan ustun turadi?
- **Murakkablik va ishqalanish:** IYOD dvigatelida yuzlab siljishli qismlar mavjud. Ularni moylab turish, sovutish har doim xarajat va termodinamik isrof keltiradi. EV (Elektr Motorida) esa faqatgina to'g'ridan to'g'ri o'q (rotor) aylanadi. Ishqalanish qismlari barmoq bilan sanarligicha.
- **FIK farqlari:** Korno fikriga amal qilsak IYOD da ko'p issiqlik asossiz ravishda radiatordan atrof muhitga ataylab yo'qotib yuborilishi shart (sovitish u-n). Foydali energiya 25%-30% dan oshmaydi. Ammo elektromobillarda barcha elektr magnitlanishi harakatga xizmat qilib, FIKni **90% gacha** beminnat yetishtirib beradi.
- **Ajratmalari:** Elektromobilda olov yo'q, chiqarish klapani yo'q. Atrof muhit uchun hech qanday $CO_2$ issiqxona gazlarini zamin bilan bo'lishmaydi. Biz EV avlodiga o'tishimiz fizikaning tabiiy mukammalligini qo'llash hisoblanadi!`,

        formulas: [
            {
                name: 'Kiritish ishi (Sanoq tizimi orqali ish)',
                formula: 'A_{davr} = F \\cdot s = p \\cdot \\Delta V',
                text: 'A = p * ΔV',
                description: 'Ish taktida issiqlik gazi yengadigan masofa'
            }
        ],

        examples: [
            {
                title: "Tezgah taktlarini sanash",
                problem: "4 silindrli mashina har bir silindrda sekundiga 30 marta portlash qilsa, vavl (kuch) 1 daqiqada qancha marta aylanadi?",
                given_data: { "Takt": "Sekundiga 30 ta yonish (Ish takti)" },
                solution_steps: [
                    "Har bir aylanish davri asosan inersiya orqali aylanadi.",
                    "Agar sekundiga 30 ta yonish bo'lsa, 1 minutda 30 * 60 = 1800 ta yonish bo'ladi har silindrda.",
                    "Ular ketma-ket yonib dvigatel barqaror ishlashini taminlaydi."
                ],
                solution: "Bir daqiqa hisobi bilan bu 1800 abarotni aylanadi.",
                answer: "1800 abarot/minutga yitadi",
                difficulty: 'easy'
            }
        ]
    },

    questions: [
        {
            id: 1,
            question: "IYOD dvigatellarining nomi nega ichki yonuv deyiladi?",
            options: ["Dvigatel yashiringanligi uchun", "Yoqilg'i silindrning bevosita o'zida yonishi uchun", "Atrofdagi havoni tortib ishlaganligi uchun", "Yuridik sabablarga ko'ra"],
            correct: 1,
            explanation: "Ichki yonuv degani, tashqarida qozon emas, balkim ishdagi silindrni atayin ichida olov chiqishi demakdir.",
            difficulty: 'easy'
        },
        {
            id: 2,
            question: "Sham (Svecha) nima uchun kerak?",
            options: ["Dvigatelni sovutish uchun", "Benzinni tortib kirish uchun", "Siqilgan 100% gazga portlash u-n elektr uchquni berishga", "Glushitel ichini tozalashga"],
            correct: 2,
            explanation: "Uchqun bo'lmasa issiqlik o'z o'zidan benzin bilan portlab ketmaydi. Bu kerak!.",
            difficulty: 'medium'
        },
        {
            id: 3,
            question: "Dizel motorning benzin motoridan nimasi b-n afzal edi?",
            options: ["Svechasi yo'q va o'zi portlaydi", "Svechasi kattaroq", "Elektr toki chiqaradi", "Hech qanday havo qabul qilmaydi"],
            correct: 0,
            explanation: "Dizelda kuchli siqilish yuzida eng qizigan muhitiga dizel sepsangiz o'zi taroqlanib yonib ketadi.",
            difficulty: 'medium'
        },
        {
            id: 4,
            question: "To'rt takt ishida faqat qay birginasigida jiddiy aylanish vavl qilinadi (Foydali)?",
            options: ["So'rish", "Siqish", "Ish", "Chiqarish"],
            correct: 2,
            explanation: "Qolgan uchtasida porshen shunchaki harakat hisobiga harakatlanadi.",
            difficulty: 'easy'
        },
        {
            id: 5,
            question: "FIK nima u-n elektromobilda benzin mashinadan baland?",
            options: ["Sirtqalishlar va moylash ko'proq ishlashidan", "Elektr tokida isitish energiyaga zoye bo'lmaslik u-n", "Tesla nomi trenddaligi uchun", "Yengilroq plastmassaligi u-n"],
            correct: 1,
            explanation: "Elektromotor energiyani issiqlik emas to'g'ridan to'g'ri rotot chiziqqa ulaydi.",
            difficulty: 'hard'
        }
    ]
};
