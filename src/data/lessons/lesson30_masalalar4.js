// 30-§. Masalalar yechish
export const lesson30 = {
    id: '9-l-54',
    chapter_id: '9-ch-03',
    title: '30-§. Masalalar yechish (Murakkab)',
    description: "Issiqlik dvigatellarini chuqur tahlil kilish. Amaliy o'rganish.",
    order_number: 5,
    duration_minutes: 20,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 0,
    difficulty: 'hard',

    content: {
        key_concepts: [
            'Murakkab misollarni mantiqli anglash',
            'Sanoqli ko\'rsatkichlar bilan yuzaga keladigan isroflar zanjirini kesib utish',
            'Muhandislik xulosa tayyorgarligi'
        ],

        theory: `Mustaqil o'ylash - darsni oxirida kerakli amaliyotga ulaydigan eng xavfsiz bilim! Oldingi masalalarda Korno va oddiy samarador ko'rildi, endigilarini sal murakkab harakatlarda birlashtiramiz. Diqqat bilan tahlil qiling:`,

        formulas: [
            {
                name: 'Massaning issiqligini eslash',
                formula: 'Q = q \\cdot m',
                text: 'Q = q * m',
                description: 'Q1 (Yonilg\'i sarmoyasini topish orqali porshenda portlagan kuch)'
            }
        ],

        examples: [
            {
                title: "Dvigateldagi Massviy Benzin yuki yordamiga boglik masala",
                problem: "Avtomobilning dvigateli FIK 25%. A=40 MJ ish bajarish uchun qancha benzin massasi(m) yoqilishi shart? (q = 46.10^6 J/Kg deb oling)",
                given_data: { "FIK": "0.25 (25%)", "A (Foydali ish)": "40 000 000 J (40 MJ)", "q (Solishtirma energiya)": "46 * 10^6 J/Kg" },
                solution_steps: [
                    "Q1 = A / FIK (To'liq isrofsiz energiya) asliga o'tishimiz:",
                    "Q1 = 40 000 000 / 0.25 = 160 000 000 Joul bo'ladi qozon ishi",
                    "Ammok q qadrasi bizga m massasi so'ragan. Formula: Q_{olinadigan} = q * m",
                    "Demak: m = Q1 / q",
                    "m = 160 000 000 / 46 000 000 = 160 / 46  = 3.47 Kg."
                ],
                solution: "Dvigatel o'rtacha quvvatda 3.47 Kg (~ 4-5 litra xali og'irligi) sof benzin o'zinikka oladi yeb tashlab",
                answer: "Taxminan 3.47 Kg benzin sarflanilinadi.",
                difficulty: 'hard'
            },
            {
                title: "Ekologiyadagi chiqindagi Karbon miqdorlari (Oddiy logicheskiy xajmiy munosabat) ",
                problem: "10 litr bezin taxminan CO2 ifloslashtirishda 25 Kilogramgacha iflos tutun bo'lib o'rmonda chiziladi. 1 ta traktor 100 litn bezinni kuydirib ishladi. Savol: havo nechi kg karbon isidan ezildi? EV ishlatililsachi?",
                solution: "Logikada: Maza qilib 100 ni 10 litrga xisoblaymiz = 10 karra bo'lingida. 25 * 10 = 250 KG (!). Yarim tonnani xavoga ko'tardi bitta ulov. Endi EV(Elektromobil): Dvigatel yo'q, 0 benzin -> is gazi nol xossalardan ajrab tushdi!.",
                answer: "1 mashina uchundi kunlik atrofga 250 kg zahar sepiladi. EV nol zaharni ifodalaydi. Shuning uchuham qanotlidir elektromotorlar tabiatda.",
                difficulty: 'medium'
            }
        ]
    },

    questions: [] // No tests as per requirement
};
