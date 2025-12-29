// 9-Sinf Fizika Testlari - 60+ Savol

export const testsData = {
    chapters: [
        // ========================================
        // 1. MEXANIKA TESTLARI
        // ========================================
        {
            id: 'mechanics',
            title: 'Mexanika',
            icon: '🚀',
            color: 'blue',
            totalQuestions: 12,
            questions: [
                {
                    id: 'mech-q1',
                    question: 'Mexanik harakat nima?',
                    options: [
                        'Jismning boshqa jismlarga nisbatan o\'rnini o\'zgartirishi',
                        'Jismning shakli o\'zgarishi',
                        'Jismning massasi o\'zgarishi',
                        'Jismning harorati o\'zgarishi'
                    ],
                    correctAnswer: 0,
                    difficulty: 'easy',
                    explanation: 'Mexanik harakat - jismning boshqa jismlarga nisbatan o\'rnini o\'zgartirishi.'
                },
                {
                    id: 'mech-q2',
                    question: 'Tezlik formulasi qaysi?',
                    options: [
                        'v = s × t',
                        'v = s / t',
                        'v = t / s',
                        'v = s + t'
                    ],
                    correctAnswer: 1,
                    difficulty: 'easy',
                    explanation: 'Tezlik = Yo\'l / Vaqt, ya\'ni v = s / t'
                },
                {
                    id: 'mech-q3',
                    question: '72 km/soat tezlikni m/s ga o\'tkazing.',
                    options: [
                        '10 m/s',
                        '15 m/s',
                        '20 m/s',
                        '25 m/s'
                    ],
                    correctAnswer: 2,
                    difficulty: 'medium',
                    explanation: '72 km/soat = 72 / 3.6 = 20 m/s'
                },
                {
                    id: 'mech-q4',
                    question: 'Tezlanish birligi nima?',
                    options: [
                        'm/s',
                        'm/s²',
                        'km/soat',
                        'm²/s'
                    ],
                    correctAnswer: 1,
                    difficulty: 'easy',
                    explanation: 'Tezlanish birligi - metr/sekund kvadrat (m/s²)'
                },
                {
                    id: 'mech-q5',
                    question: 'Yer yuzasida erkin tushish tezlanishi qancha?',
                    options: [
                        '5 m/s²',
                        '8 m/s²',
                        '10 m/s²',
                        '15 m/s²'
                    ],
                    correctAnswer: 2,
                    difficulty: 'easy',
                    explanation: 'Yer yuzasida g ≈ 10 m/s² (aniq qiymat 9.8 m/s²)'
                },
                {
                    id: 'mech-q6',
                    question: 'Jism 5 sekundda 0 dan 25 m/s gacha tezlashdi. Tezlanishi?',
                    options: [
                        '3 m/s²',
                        '4 m/s²',
                        '5 m/s²',
                        '6 m/s²'
                    ],
                    correctAnswer: 2,
                    difficulty: 'medium',
                    explanation: 'a = (v - v₀) / t = (25 - 0) / 5 = 5 m/s²'
                },
                {
                    id: 'mech-q7',
                    question: 'Nyutonning 2-qonuni qaysi?',
                    options: [
                        'F = m × a',
                        'F = m / a',
                        'F = a / m',
                        'F = m + a'
                    ],
                    correctAnswer: 0,
                    difficulty: 'easy',
                    explanation: 'Nyutonning 2-qonuni: F = m × a (Kuch = Massa × Tezlanish)'
                },
                {
                    id: 'mech-q8',
                    question: 'Jism 80 m balandlikdan erkin tushmoqda. Qancha vaqtda yerga tushadi? (g=10 m/s²)',
                    options: [
                        '2 s',
                        '3 s',
                        '4 s',
                        '5 s'
                    ],
                    correctAnswer: 2,
                    difficulty: 'hard',
                    explanation: 'h = (gt²)/2 → 80 = 5t² → t² = 16 → t = 4 s'
                },
                {
                    id: 'mech-q9',
                    question: 'Traektoriya nima?',
                    options: [
                        'Jism bosib o\'tgan yo\'l',
                        'Jism chizgan chiziq',
                        'Jism tezligi',
                        'Jism massasi'
                    ],
                    correctAnswer: 1,
                    difficulty: 'easy',
                    explanation: 'Traektoriya - jism harakat qilayotganda chizgan chiziq'
                },
                {
                    id: 'mech-q10',
                    question: 'SI sistemasida yo\'l birligi nima?',
                    options: [
                        'Kilometr',
                        'Santimetr',
                        'Metr',
                        'Millimetr'
                    ],
                    correctAnswer: 2,
                    difficulty: 'easy',
                    explanation: 'SI sistemasida yo\'l birligi - metr (m)'
                }
            ]
        },

        // ========================================
        // 2. ENERGIYA TESTLARI
        // ========================================
        {
            id: 'energy',
            title: 'Energiya va Ish',
            icon: '⚡',
            color: 'yellow',
            totalQuestions: 10,
            questions: [
                {
                    id: 'energy-q1',
                    question: 'Mexanik ish formulasi qaysi?',
                    options: [
                        'A = F + s',
                        'A = F × s',
                        'A = F / s',
                        'A = F - s'
                    ],
                    correctAnswer: 1,
                    difficulty: 'easy',
                    explanation: 'Mexanik ish: A = F × s (Kuch × Ko\'chish)'
                },
                {
                    id: 'energy-q2',
                    question: 'Ish birligi nima?',
                    options: [
                        'Nyuton',
                        'Joul',
                        'Vatt',
                        'Metr'
                    ],
                    correctAnswer: 1,
                    difficulty: 'easy',
                    explanation: 'Ish birligi - Joul (J)'
                },
                {
                    id: 'energy-q3',
                    question: '50 N kuch bilan jismni 10 m siljitildi. Bajarilgan ish?',
                    options: [
                        '400 J',
                        '450 J',
                        '500 J',
                        '550 J'
                    ],
                    correctAnswer: 2,
                    difficulty: 'medium',
                    explanation: 'A = F × s = 50 × 10 = 500 J'
                },
                {
                    id: 'energy-q4',
                    question: 'Quvvat formulasi qaysi?',
                    options: [
                        'P = A × t',
                        'P = A / t',
                        'P = t / A',
                        'P = A - t'
                    ],
                    correctAnswer: 1,
                    difficulty: 'easy',
                    explanation: 'Quvvat: P = A / t (Ish / Vaqt)'
                },
                {
                    id: 'energy-q5',
                    question: 'Quvvat birligi nima?',
                    options: [
                        'Joul',
                        'Nyuton',
                        'Vatt',
                        'Metr'
                    ],
                    correctAnswer: 2,
                    difficulty: 'easy',
                    explanation: 'Quvvat birligi - Vatt (Vt yoki W)'
                },
                {
                    id: 'energy-q6',
                    question: 'Dvigatel 10 sekundda 5000 J ish bajaradi. Quvvati?',
                    options: [
                        '400 Vt',
                        '450 Vt',
                        '500 Vt',
                        '550 Vt'
                    ],
                    correctAnswer: 2,
                    difficulty: 'medium',
                    explanation: 'P = A / t = 5000 / 10 = 500 Vt'
                },
                {
                    id: 'energy-q7',
                    question: 'Kinetik energiya formulasi qaysi?',
                    options: [
                        'Ek = mv',
                        'Ek = mv²/2',
                        'Ek = m/v',
                        'Ek = 2mv'
                    ],
                    correctAnswer: 1,
                    difficulty: 'medium',
                    explanation: 'Kinetik energiya: Ek = mv²/2'
                },
                {
                    id: 'energy-q8',
                    question: 'Potensial energiya formulasi qaysi?',
                    options: [
                        'Ep = mh',
                        'Ep = gh',
                        'Ep = mgh',
                        'Ep = mg'
                    ],
                    correctAnswer: 2,
                    difficulty: 'medium',
                    explanation: 'Potensial energiya: Ep = mgh'
                },
                {
                    id: 'energy-q9',
                    question: '1 kVt necha Vt ga teng?',
                    options: [
                        '10 Vt',
                        '100 Vt',
                        '1000 Vt',
                        '10000 Vt'
                    ],
                    correctAnswer: 2,
                    difficulty: 'easy',
                    explanation: '1 kVt = 1000 Vt'
                },
                {
                    id: 'energy-q10',
                    question: 'Energiyaning saqlanish qonuni nimani bildiradi?',
                    options: [
                        'Energiya yo\'qoladi',
                        'Energiya yaratiladi',
                        'Energiya bir turdan ikkinchisiga o\'tadi',
                        'Energiya o\'zgarmaydi'
                    ],
                    correctAnswer: 2,
                    difficulty: 'medium',
                    explanation: 'Energiya yo\'qolmaydi va yaratilmaydi, faqat bir turdan ikkinchisiga o\'tadi'
                }
            ]
        },

        // ========================================
        // 3. MOLEKULYAR FIZIKA TESTLARI
        // ========================================
        {
            id: 'molecular',
            title: 'Molekulyar Fizika',
            icon: '🔬',
            color: 'purple',
            totalQuestions: 10,
            questions: [
                {
                    id: 'mol-q1',
                    question: 'Moddaning eng kichik zarrasi nima?',
                    options: [
                        'Atom',
                        'Molekula',
                        'Elektron',
                        'Proton'
                    ],
                    correctAnswer: 1,
                    difficulty: 'easy',
                    explanation: 'Moddaning kimyoviy xossalarini saqlaydigan eng kichik zarrasi - molekula'
                },
                {
                    id: 'mol-q2',
                    question: 'Diffuziya nima?',
                    options: [
                        'Moddalarning aralashishi',
                        'Moddaning bug\'lanishi',
                        'Moddaning qotishi',
                        'Moddaning erishi'
                    ],
                    correctAnswer: 0,
                    difficulty: 'easy',
                    explanation: 'Diffuziya - moddalarning o\'z-o\'zidan aralashish hodisasi'
                },
                {
                    id: 'mol-q3',
                    question: 'Qaysi holatda diffuziya eng tez bo\'ladi?',
                    options: [
                        'Qattiq jismda',
                        'Suyuqlikda',
                        'Gazda',
                        'Hammasi bir xil'
                    ],
                    correctAnswer: 2,
                    difficulty: 'medium',
                    explanation: 'Gazlarda molekulalar eng erkin, shuning uchun diffuziya eng tez'
                },
                {
                    id: 'mol-q4',
                    question: 'Modda necha xil holatda bo\'ladi?',
                    options: [
                        '2 ta',
                        '3 ta',
                        '4 ta',
                        '5 ta'
                    ],
                    correctAnswer: 1,
                    difficulty: 'easy',
                    explanation: 'Modda 3 ta holatda bo\'ladi: qattiq, suyuq, gaz'
                },
                {
                    id: 'mol-q5',
                    question: 'Qattiq jismda molekulalar qanday harakat qiladi?',
                    options: [
                        'Erkin harakat qiladi',
                        'Tebranma harakat qiladi',
                        'Harakat qilmaydi',
                        'Aylanma harakat qiladi'
                    ],
                    correctAnswer: 1,
                    difficulty: 'medium',
                    explanation: 'Qattiq jismda molekulalar o\'z o\'rnida tebranma harakat qiladi'
                },
                {
                    id: 'mol-q6',
                    question: 'Nima uchun issiq suvda shakar tezroq eriydi?',
                    options: [
                        'Suv ko\'p bo\'ladi',
                        'Molekulalar tezroq harakat qiladi',
                        'Shakar ko\'p bo\'ladi',
                        'Idish katta bo\'ladi'
                    ],
                    correctAnswer: 1,
                    difficulty: 'medium',
                    explanation: 'Issiq suvda molekulalar tezroq harakat qiladi, diffuziya tezlashadi'
                },
                {
                    id: 'mol-q7',
                    question: 'Suyuqlikning asosiy xususiyati nima?',
                    options: [
                        'Shakli doimiy',
                        'Oqish xususiyati',
                        'Siqiladi',
                        'Kengayadi'
                    ],
                    correctAnswer: 1,
                    difficulty: 'easy',
                    explanation: 'Suyuqlikning asosiy xususiyati - oqish xususiyati'
                },
                {
                    id: 'mol-q8',
                    question: 'Gaz idish hajmini to\'ldiradimi?',
                    options: [
                        'Ha',
                        'Yo\'q',
                        'Ba\'zan',
                        'Hech qachon'
                    ],
                    correctAnswer: 0,
                    difficulty: 'easy',
                    explanation: 'Gaz molekulalari juda erkin, shuning uchun idish hajmini to\'ldiradi'
                },
                {
                    id: 'mol-q9',
                    question: 'Molekulalar doimo harakatdami?',
                    options: [
                        'Ha, doimo',
                        'Yo\'q, hech qachon',
                        'Faqat issiq jismda',
                        'Faqat sovuq jismda'
                    ],
                    correctAnswer: 0,
                    difficulty: 'easy',
                    explanation: 'Molekulalar doimo harakatda bo\'ladi (issiqlik harakati)'
                },
                {
                    id: 'mol-q10',
                    question: 'Suvning qaysi holatida molekulalar eng qattiq bog\'langan?',
                    options: [
                        'Suyuq (suv)',
                        'Qattiq (muz)',
                        'Gaz (bug\')',
                        'Hammasi bir xil'
                    ],
                    correctAnswer: 1,
                    difficulty: 'medium',
                    explanation: 'Muzda (qattiq holat) molekulalar eng qattiq bog\'langan'
                }
            ]
        },

        // ========================================
        // 4. ELEKTR TESTLARI
        // ========================================
        {
            id: 'electricity',
            title: 'Elektr va Magnetizm',
            icon: '⚡',
            color: 'cyan',
            totalQuestions: 12,
            questions: [
                {
                    id: 'elec-q1',
                    question: 'Elektr toki nima?',
                    options: [
                        'Zaryadlarning tartibli harakati',
                        'Zaryadlarning tartibsiz harakati',
                        'Zaryadlarning tinch turishi',
                        'Zaryadlarning yo\'qolishi'
                    ],
                    correctAnswer: 0,
                    difficulty: 'easy',
                    explanation: 'Elektr toki - zaryadlangan zarralarning tartibli harakati'
                },
                {
                    id: 'elec-q2',
                    question: 'Tok kuchi birligi nima?',
                    options: [
                        'Volt',
                        'Om',
                        'Amper',
                        'Vatt'
                    ],
                    correctAnswer: 2,
                    difficulty: 'easy',
                    explanation: 'Tok kuchi birligi - Amper (A)'
                },
                {
                    id: 'elec-q3',
                    question: 'Om qonuni qaysi?',
                    options: [
                        'I = U + R',
                        'I = U × R',
                        'I = U / R',
                        'I = R / U'
                    ],
                    correctAnswer: 2,
                    difficulty: 'easy',
                    explanation: 'Om qonuni: I = U / R'
                },
                {
                    id: 'elec-q4',
                    question: 'Kuchlanish birligi nima?',
                    options: [
                        'Amper',
                        'Volt',
                        'Om',
                        'Vatt'
                    ],
                    correctAnswer: 1,
                    difficulty: 'easy',
                    explanation: 'Kuchlanish birligi - Volt (V)'
                },
                {
                    id: 'elec-q5',
                    question: 'Qarshilik birligi nima?',
                    options: [
                        'Amper',
                        'Volt',
                        'Om',
                        'Vatt'
                    ],
                    correctAnswer: 2,
                    difficulty: 'easy',
                    explanation: 'Qarshilik birligi - Om (Ω)'
                },
                {
                    id: 'elec-q6',
                    question: 'Zanjirda U=12V, R=4Ω. Tok kuchi?',
                    options: [
                        '2 A',
                        '3 A',
                        '4 A',
                        '5 A'
                    ],
                    correctAnswer: 1,
                    difficulty: 'medium',
                    explanation: 'I = U / R = 12 / 4 = 3 A'
                },
                {
                    id: 'elec-q7',
                    question: 'Zanjirda I=2A, U=10V. Qarshilik?',
                    options: [
                        '3 Ω',
                        '4 Ω',
                        '5 Ω',
                        '6 Ω'
                    ],
                    correctAnswer: 2,
                    difficulty: 'medium',
                    explanation: 'R = U / I = 10 / 2 = 5 Ω'
                },
                {
                    id: 'elec-q8',
                    question: 'Ampermetr nima uchun ishlatiladi?',
                    options: [
                        'Kuchlanishni o\'lchash',
                        'Tok kuchini o\'lchash',
                        'Qarshilikni o\'lchash',
                        'Quvvatni o\'lchash'
                    ],
                    correctAnswer: 1,
                    difficulty: 'easy',
                    explanation: 'Ampermetr tok kuchini o\'lchash uchun ishlatiladi'
                },
                {
                    id: 'elec-q9',
                    question: 'Voltmetr nima uchun ishlatiladi?',
                    options: [
                        'Tok kuchini o\'lchash',
                        'Kuchlanishni o\'lchash',
                        'Qarshilikni o\'lchash',
                        'Quvvatni o\'lchash'
                    ],
                    correctAnswer: 1,
                    difficulty: 'easy',
                    explanation: 'Voltmetr kuchlanishni o\'lchash uchun ishlatiladi'
                },
                {
                    id: 'elec-q10',
                    question: 'Elektr toki qaysi yo\'nalishda harakat qiladi?',
                    options: [
                        'Musbatdan manfiyga',
                        'Manfiydan musbatga',
                        'Har ikki tomonga',
                        'Harakat qilmaydi'
                    ],
                    correctAnswer: 0,
                    difficulty: 'easy',
                    explanation: 'Shartli ravishda tok musbat zaryaddan manfiy zaryadga harakat qiladi'
                },
                {
                    id: 'elec-q11',
                    question: 'Magnit maydonini kim kashf etgan?',
                    options: [
                        'Nyuton',
                        'Galiley',
                        'Ersted',
                        'Arximed'
                    ],
                    correctAnswer: 2,
                    difficulty: 'medium',
                    explanation: 'Magnit maydonini daniyalik olim Ersted kashf etgan'
                },
                {
                    id: 'elec-q12',
                    question: 'Elektromagnit nima?',
                    options: [
                        'Doimiy magnit',
                        'Tok o\'tganda magnit bo\'ladigan sim',
                        'Tabiiy magnit',
                        'Magnit emas'
                    ],
                    correctAnswer: 1,
                    difficulty: 'medium',
                    explanation: 'Elektromagnit - tok o\'tganda magnit xossasi paydo bo\'ladigan qurilma'
                }
            ]
        },

        // ========================================
        // 5. OPTIKA TESTLARI
        // ========================================
        {
            id: 'optics',
            title: 'Optika',
            icon: '🔆',
            color: 'amber',
            totalQuestions: 10,
            questions: [
                {
                    id: 'opt-q1',
                    question: 'Yorug\'lik tezligi qancha?',
                    options: [
                        '300 000 m/s',
                        '300 000 km/s',
                        '3 000 km/s',
                        '30 000 km/s'
                    ],
                    correctAnswer: 1,
                    difficulty: 'easy',
                    explanation: 'Yorug\'lik tezligi c = 300 000 km/s'
                },
                {
                    id: 'opt-q2',
                    question: 'Qaytish qonuni qaysi?',
                    options: [
                        'α > β',
                        'α < β',
                        'α = β',
                        'α + β = 90°'
                    ],
                    correctAnswer: 2,
                    difficulty: 'easy',
                    explanation: 'Qaytish qonuni: tushish burchagi = qaytish burchagi (α = β)'
                },
                {
                    id: 'opt-q3',
                    question: 'Nur ko\'zguga 30° burchak ostida tushdi. Qaytish burchagi?',
                    options: [
                        '20°',
                        '25°',
                        '30°',
                        '35°'
                    ],
                    correctAnswer: 2,
                    difficulty: 'medium',
                    explanation: 'Qaytish qonuniga ko\'ra: α = β = 30°'
                },
                {
                    id: 'opt-q4',
                    question: 'Tekis ko\'zguda tasvir qanday bo\'ladi?',
                    options: [
                        'Haqiqiy',
                        'Xayoliy',
                        'Katta',
                        'Kichik'
                    ],
                    correctAnswer: 1,
                    difficulty: 'easy',
                    explanation: 'Tekis ko\'zguda tasvir xayoliy bo\'ladi'
                },
                {
                    id: 'opt-q5',
                    question: 'Linza necha turga bo\'linadi?',
                    options: [
                        '1 ta',
                        '2 ta',
                        '3 ta',
                        '4 ta'
                    ],
                    correctAnswer: 1,
                    difficulty: 'easy',
                    explanation: 'Linza 2 turga bo\'linadi: yig\'uvchi va sochuvchi'
                },
                {
                    id: 'opt-q6',
                    question: 'Yig\'uvchi linzaning o\'rtasi qanday?',
                    options: [
                        'Yupqa',
                        'Qalin',
                        'Tekis',
                        'Egri'
                    ],
                    correctAnswer: 1,
                    difficulty: 'easy',
                    explanation: 'Yig\'uvchi linzaning o\'rtasi qalin bo\'ladi'
                },
                {
                    id: 'opt-q7',
                    question: 'Optik kuch formulasi qaysi?',
                    options: [
                        'D = f',
                        'D = 1/f',
                        'D = f²',
                        'D = 2f'
                    ],
                    correctAnswer: 1,
                    difficulty: 'medium',
                    explanation: 'Optik kuch: D = 1/f'
                },
                {
                    id: 'opt-q8',
                    question: 'Optik kuch birligi nima?',
                    options: [
                        'Metr',
                        'Dioptr',
                        'Santimetr',
                        'Millimetr'
                    ],
                    correctAnswer: 1,
                    difficulty: 'easy',
                    explanation: 'Optik kuch birligi - dioptr (D)'
                },
                {
                    id: 'opt-q9',
                    question: 'Linzaning fokus masofasi 0.5 m. Optik kuchi?',
                    options: [
                        '1 D',
                        '1.5 D',
                        '2 D',
                        '2.5 D'
                    ],
                    correctAnswer: 2,
                    difficulty: 'medium',
                    explanation: 'D = 1/f = 1/0.5 = 2 D'
                },
                {
                    id: 'opt-q10',
                    question: 'Sochuvchi linza qanday tasvir beradi?',
                    options: [
                        'Haqiqiy',
                        'Xayoliy',
                        'Katta',
                        'Kichik'
                    ],
                    correctAnswer: 1,
                    difficulty: 'medium',
                    explanation: 'Sochuvchi linza doimo xayoliy tasvir beradi'
                }
            ]
        },

        // ========================================
        // 6. ATOM FIZIKASI TESTLARI
        // ========================================
        {
            id: 'atomic',
            title: 'Atom Fizikasi',
            icon: '⚛️',
            color: 'green',
            totalQuestions: 10,
            questions: [
                {
                    id: 'atom-q1',
                    question: 'Atom nimalardan iborat?',
                    options: [
                        'Faqat protonlar',
                        'Faqat elektronlar',
                        'Yadro va elektronlar',
                        'Faqat neytronlar'
                    ],
                    correctAnswer: 2,
                    difficulty: 'easy',
                    explanation: 'Atom yadro (proton va neytronlar) va elektronlardan iborat'
                },
                {
                    id: 'atom-q2',
                    question: 'Protonning zaryadi qanday?',
                    options: [
                        'Musbat',
                        'Manfiy',
                        'Neytral',
                        'O\'zgaruvchan'
                    ],
                    correctAnswer: 0,
                    difficulty: 'easy',
                    explanation: 'Proton musbat zaryadga ega (+)'
                },
                {
                    id: 'atom-q3',
                    question: 'Elektronning zaryadi qanday?',
                    options: [
                        'Musbat',
                        'Manfiy',
                        'Neytral',
                        'O\'zgaruvchan'
                    ],
                    correctAnswer: 1,
                    difficulty: 'easy',
                    explanation: 'Elektron manfiy zaryadga ega (-)'
                },
                {
                    id: 'atom-q4',
                    question: 'Neytronning zaryadi qanday?',
                    options: [
                        'Musbat',
                        'Manfiy',
                        'Neytral (0)',
                        'O\'zgaruvchan'
                    ],
                    correctAnswer: 2,
                    difficulty: 'easy',
                    explanation: 'Neytron zaryadsiz (neytral)'
                },
                {
                    id: 'atom-q5',
                    question: 'Atom massasining ko\'p qismi qayerda?',
                    options: [
                        'Elektronlarda',
                        'Yadroda',
                        'Atrofda',
                        'Hamma joyda bir xil'
                    ],
                    correctAnswer: 1,
                    difficulty: 'easy',
                    explanation: 'Atom massasining 99.9% i yadroda'
                },
                {
                    id: 'atom-q6',
                    question: 'Radioaktivlik nima?',
                    options: [
                        'Atom yadrolarining parchalanishi',
                        'Atom yadrolarining birlashishi',
                        'Elektronlarning harakati',
                        'Protonlarning harakati'
                    ],
                    correctAnswer: 0,
                    difficulty: 'medium',
                    explanation: 'Radioaktivlik - atom yadrolarining o\'z-o\'zidan parchalanishi'
                },
                {
                    id: 'atom-q7',
                    question: 'Necha xil radioaktiv nurlanish bor?',
                    options: [
                        '1 ta',
                        '2 ta',
                        '3 ta',
                        '4 ta'
                    ],
                    correctAnswer: 2,
                    difficulty: 'easy',
                    explanation: '3 xil: alfa (α), beta (β), gamma (γ)'
                },
                {
                    id: 'atom-q8',
                    question: 'Qaysi nurlanish eng xavfli?',
                    options: [
                        'Alfa',
                        'Beta',
                        'Gamma',
                        'Hammasi bir xil'
                    ],
                    correctAnswer: 2,
                    difficulty: 'medium',
                    explanation: 'Gamma nurlanish eng katta o\'tish qobiliyatiga ega, shuning uchun eng xavfli'
                },
                {
                    id: 'atom-q9',
                    question: 'Uglerod atomi 6 ta proton va 6 ta neytronga ega. Massa soni?',
                    options: [
                        '6',
                        '10',
                        '12',
                        '18'
                    ],
                    correctAnswer: 2,
                    difficulty: 'medium',
                    explanation: 'Massa soni A = protonlar + neytronlar = 6 + 6 = 12'
                },
                {
                    id: 'atom-q10',
                    question: 'Neytral atomda protonlar va elektronlar soni qanday?',
                    options: [
                        'Protonlar ko\'p',
                        'Elektronlar ko\'p',
                        'Teng',
                        'Har xil'
                    ],
                    correctAnswer: 2,
                    difficulty: 'easy',
                    explanation: 'Neytral atomda protonlar va elektronlar soni teng'
                }
            ]
        }
    ]
};

// Helper functions
export function getTestChapterById(id) {
    return testsData.chapters.find(ch => ch.id === id);
}

export function getTotalQuestions() {
    return testsData.chapters.reduce((total, chapter) => total + chapter.questions.length, 0);
}

export function getQuestionsByDifficulty(chapterId, difficulty) {
    const chapter = getTestChapterById(chapterId);
    return chapter ? chapter.questions.filter(q => q.difficulty === difficulty) : [];
}
