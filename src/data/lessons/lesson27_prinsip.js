// 27-§. Issiqlik dvigatellarining ishlash prinsipi
export const lesson27 = {
    id: '9-l-51',
    chapter_id: '9-ch-03',
    title: '27-§. Issiqlik dvigatellarining ishlash prinsipi',
    description: "Issiqlik dvigateli ishlash strukturasi, FIK formulasi, Sadi Korno sikli bo'yicha maksimal ideal cheklovlar.",
    order_number: 2,
    duration_minutes: 35,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 5,
    difficulty: 'hard',

    content: {
        key_concepts: [
            'Dvigatelning asosiy uchinchi ko\'rkam sxemasi',
            'Isitgich (Q1) va Sovitgich (Q2)',
            'Gazi ishtirok etishi (Ishchi jism)',
            'FIK (Foydali ish koeffitsiyenti) hisoblari',
            'Korno ideal mashinasi'
        ],

        theory: `Dvigatellarning turi har xil bo'lishi mumkin (xoh dizel, xoh bug' turbinasi, xoh ximik mator), biroq ularning asosiy mexanik tamoyillarida hech qanday farq yo'q. Ular bor yo'g'i bitta qoidaga amal qiladi: qizdirgan holda kuch orttirib energiyani o'zlashtirish.

Buning uchun dvigatel **3 ta majburiy omilga ega bo'lishi talab etiladi**:
1. **Isitgich** — Yuqori harorat (masalan ko'mir alangasi yoki portlagan benzin). U tizimga o'zining mutlaq issiqlik energiyasi bo'lmish $Q_1$ ini tarqatadi. Uning temperaturasi $T_1$ deyiladi.
2. **Ishchi jism** — Qizish natijasida kengayib ish bajaradigan omil. Odatda gaz yoki suv bug'i shaklida kirib keladi. Qizib borgan sari atrofga katta bosimli bosish berib turbina valini siljitib yo'l beradi.
3. **Sovitgich** — Gaz kengaygan so'ng uning ortiqcha energiyasini surib oluvchi tashqi atrof-muhit radiator yoki fanerli asbob. U $Q_2$ ko'rsatkichli temperaturani muzidek uzatadi. Sovitgich temperaturasi $T_2$ deb ataladi.

Ishning mantig'i: Ishchi jism $Q_1$ ini yedi, turbinani tepgani unga yordam tariqasidagi $A$ deb baholandi. Lekin qolgan keraksiz bosim issiqlikka aylangani sabab, dvigatel sovib yorilib ketmasligiga sovitgich muhit uning havosini havoga haydab uni tortib qoladi $Q_2$. 

Demak olingan foydali ish aniq hisoblansa: 
$$A = Q_1 - Q_2$$

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Foydali ish koeffitsiyenti (FIK) ni hisoblash

Samaradorlik asosi doimo foiz shakliga olib chiqiladi. Yunoncha e'tiborda Eta ($\\eta$) deb berilib:
$$ \\eta = \\frac{A}{Q_1} = \\frac{Q_1 - Q_2}{Q_1} \\cdot 100\\% $$
Bu nima degani? Ya'ni kiritilgan umumiy hamma $Q_1$ yoqilg'i energiya faqat uni bajargan $A$ miqdorida foiz tarqatilishidir. Aslo $Q_2 = 0$ mavjud bo'la olmaydi. Chunki 2-Termodimamika qoidasida energiya butunlay havoga aylana olmaydi!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sadi Korno va eng zo'r mashinalar

1824 yillarda fransuz daho Sadi Korno tabiatdagi jismoniy yutuqdagi "Ideal Issiqlik Mashinasi" nimaligini tasvirlab isbotladi.
Sadi Korno aytdiki: "Siz qanday turkumdagi gaz yo'ki texnologiya ishlatsangizdan qat'iy nazar, eng katta xarajatli foizni isitgich va sovitkichning **TEMPERATURALARI (K)** orqaligina cheklab qo'yasiz!"

$$ \\eta_{max} = \\frac{T_1 - T_2}{T_1} \\cdot 100\\% = (1 - \\frac{T_2}{T_1}) \\cdot 100\\% $$

Moddiy olamda erishish imkoni bo'lgan Korno mashinasi chegarasi: Agar sovitgich xarorati $T_2 = 300 K$ (Ochiq havo) bulsa va Motor qozoni $T_1 = 900 K$ gacha qiyzisa. Uning termodinamik muhandislari yasaydigan eng maksimum qozongan FIKi shunday chiziladi: 
(900 - 300) / 900 = 600 / 900 = 0.66 yoki 66%. Oqibatda qanday mator yasamang, unda hech qachon FIK 66% chiziq yo'lidan o'tolmaydi. Bu fizika chegara xossalari!`,

        formulas: [
            {
                name: 'Foydali Ish',
                formula: 'A = Q_1 - Q_2',
                text: 'A = Q1 - Q2',
                description: 'Q1 olingan, Q2 atmosferaga tashlangan issiqlik',
                variables: [
                    { symbol: 'A', name: 'Mexanik ifodali ish', unit: 'J' },
                    { symbol: 'Q_1', name: 'Isitgichning energiya sarfi (yongan qiymati)', unit: 'J' }
                ]
            },
            {
                name: 'Moddiy FIK',
                formula: '\\eta = \\frac{Q_1 - Q_2}{Q_1}',
                text: 'eta = (Q1-Q2)/Q1',
                description: "Real dvigatel samaradorligi (%)"
            },
            {
                name: 'Korno maksimal FIK',
                formula: '\\eta_{max} = \\frac{T_1 - T_2}{T_1}',
                text: 'eta = (T1-T2)/T1',
                description: 'Temperature orqali faqat mumkin bo\'lgan eng yaxshisi'
            }
        ],

        examples: [
            {
                title: "Dvigatelning Foiziy o'lchovlari",
                problem: "Dvigatel gazining yonganda yoqilg'idan olayotgan mutlaq energiya 12000 Joul. Shu jarayonda sovutush sistemalariga (yo'qotilgan) 8000 Joul uchib ketdi. Unga matorning toza mexanik ravishda bajargan ish foizi FIK qancha?",
                given_data: { "Olingan Q1": "12000 J", "Yo'qotilgan Q2": "8000 J" },
                solution_steps: [
                    "Bajarilgan A = Q1 - Q2 = 12000 J - 8000 J = 4000 J.",
                    "Fik = (A / Q1) * 100%.",
                    "Fik = (4000 / 12000) * 100% = 0.33 * 100% = 33%."
                ],
                solution: "Yitishlarni o'rnaga qolsak 33% energiya ishlayvotti.",
                answer: "33%",
                difficulty: 'easy'
            },
            {
                title: "Korno teoremasi limiti",
                problem: "Isitgich T1 = 800 K gacha portlaydi. Havoda sovutish fani orqali radiator teshigida T2=300 K saqlanmoqda. Korno qonunidagi ideal chegarani toping.",
                given_data: { "T1": "800 K", "T2": "300 K" },
                solution_steps: [
                    "Formula: (T1-T2)/T1",
                    "Ayrima (800 - 300) = 500 K.",
                    "Bo'lish: 500 / 800 = 0.625."
                ],
                solution: "0.625 x 100% = 62.5%. Natijalar ko'rsatayviy matorlar limit 62.5% dir.",
                answer: "62.5%",
                difficulty: 'medium'
            }
        ]
    },

    questions: [
        {
            id: 1,
            question: "Har qanday ximiyoviy yoki issiqlik asosi bilan harakatlanuvchi dvigatellar aniq nechta muhim bo'g'imdan iborat boladi?",
            options: ["Faqat yonilg'i", "2 ta: gaz va porshen", "3 ta: Isitgich, ishchi gaz va Sovitgich", "Cheksiz texnologik ehtiyotdan"],
            correct: 2,
            explanation: "Tabiat issiqlik dvigateliga faqatgina energiya uzatchi (qozon), u harakatda gaz (qon aylanishidek) va baralla havo (tashlaydigan sovutich) bog'lamisiz mavjud bo'lolmaydi.",
            difficulty: 'easy'
        },
        {
            id: 2,
            question: "Foydali ish deyilganda qanday formulani ishga sola olasiz?",
            options: ["A = Q1 + Q2", "A = Q1 / Q2", "A = Q1 - Q2", "A = T1 * T2"],
            correct: 2,
            explanation: "Olinganidan Tashlanganini ayirsangiz barakasi chiqadi (A=Q1-Q2).",
            difficulty: 'easy'
        },
        {
            id: 3,
            question: "Nima uchun FIK 100% (ideal zo'r) amalda umuman mumkin emasligi fanda isbotini topgan?",
            options: ["Sovitish shartli tizimi orqali har doim harorat isrof tabiatda bo'ladi.", "Metallning yetarli isishdan o't bo'lolmaydigidan", "Sirkulyasion nasos yaxshi tarelka qurolida bo'la omayidi", "Formulada T2 - cheksiz berilmagan u-n"],
            correct: 0,
            explanation: "FIK tabiyat termodinamikasining o'zak dushmaniga zid emas. Atrofdan issiqlik qabul qilishning yopilish nuqtasi isrofda!.",
            difficulty: 'medium'
        },
        {
            id: 4,
            question: "Korno formulasida temperaturani qaysi sistemasi ishtirok etishi shart?",
            options: ["Selsiy °C", "Zang va Farangeyt (°F)", "Mutlaq Kelvin (K)", "Hech qanday farqi yo'q, xohlaganingiz"],
            correct: 2,
            explanation: "Faqat Kelvin da yuritiladi. Aks holda manfiy darajalarda xatolik olardi fozilamizda.",
            difficulty: 'hard'
        },
        {
            id: 5,
            question: "1200 K turgan bug'li kotelga (Isitgichga), tashqari sovitgich - 400 K atrofni qurshadi. FIK ning chegarasini aniqlang:",
            options: ["60%", "33%", "66.6%", "40%"],
            correct: 2,
            explanation: "(1200 - 400)/1200 = 800/1200 = 2/3 = 66.6%.",
            difficulty: 'hard'
        }
    ]
};
