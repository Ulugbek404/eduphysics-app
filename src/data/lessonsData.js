// 9-Sinf Fizika Dasturi - 8 Bob bilan Yangilangan

export const lessonsData = {
    chapters: [
        // ========================================
        // 1-BOB: MEXANIKA (10-bet)
        // ========================================
        {
            id: 'mechanics',
            title: 'Mexanika',
            description: 'Jismlarning harakati va kinematika',
            icon: '🚀',
            color: 'blue',
            pdfStartPage: 10,
            pdfEndPage: 38,
            lessons: [
                {
                    id: 'mech-1',
                    title: 'Mexanik Harakat. Moddiy Nuqta. Sanoq Sistemasi',
                    description: 'Mexanik harakat tushunchasi, moddiy nuqta, sanoq sistemasi',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 10,
                    pdfPageEnd: 18,
                    hasPdf: true
                },
                {
                    id: 'mech-2',
                    title: 'Nyuton II - Qonuni',
                    description: 'Nyutonning ikkinchi qonuni, F=ma',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 19,
                    pdfPageEnd: 21,
                    hasPdf: true
                },
                {
                    id: 'mech-3',
                    title: 'Tabiatdagi Kuchlar. Mexanik Ish va Energiya',
                    description: 'Gravitatsiya, ishqalanish, mexanik ish, energiya',
                    duration: '30 min',
                    xp: 50,
                    pdfPage: 22,
                    pdfPageEnd: 25,
                    hasPdf: true
                },
                {
                    id: 'mech-4',
                    title: 'Qattiq Jismlarning Aylanma Harakati Dinamikasi',
                    description: 'Aylanma harakat, moment, inersiya momenti',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 26,
                    pdfPageEnd: 31,
                    hasPdf: true
                },
                {
                    id: 'mech-5',
                    title: 'Suyuqlik va Gazlar Mexanikasi',
                    description: 'Suyuqliklar va gazlar harakati, bosim',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 32,
                    pdfPageEnd: 34,
                    hasPdf: true
                },
                {
                    id: 'mech-6',
                    title: 'Bernulli Tenglamasi',
                    description: 'Bernulli tenglamasi va qo\'llanilishi',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 35,
                    pdfPageEnd: 38,
                    hasPdf: true
                }
            ]
        },

        // ========================================
        // 2-BOB: TEBRANISHLAR (39-bet)
        // ========================================
        {
            id: 'oscillations',
            title: 'Tebranishlar',
            description: 'Tebranma harakat va to\'lqinlar',
            icon: '〰️',
            color: 'purple',
            pdfStartPage: 39,
            pdfEndPage: 45,
            lessons: [
                {
                    id: 'osc-1',
                    title: 'Mexanik Tebranishlar va To\'lqinlar',
                    description: 'Tebranish turlari, amplituda, davr, chastota, to\'lqinlar',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 39,
                    pdfPageEnd: 42,
                    hasPdf: true
                },
                {
                    id: 'osc-2',
                    title: 'Matematik Mayatnik',
                    description: 'Matematik mayatnik, davr formulasi',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 43,
                    pdfPageEnd: 43,
                    hasPdf: true
                },
                {
                    id: 'osc-3',
                    title: 'To\'lqin',
                    description: 'To\'lqin turlari, uzunligi, tezligi',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 44,
                    pdfPageEnd: 44,
                    hasPdf: true
                },
                {
                    id: 'osc-4',
                    title: 'Rezonans Hodisasi',
                    description: 'Rezonans, tabiiy chastota',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 45,
                    pdfPageEnd: 45,
                    hasPdf: true
                }
            ]
        },

        // ========================================
        // 3-BOB: MOLEKULYAR FIZIKA (46-bet)
        // ========================================
        {
            id: 'molecular',
            title: 'Molekulyar Fizika',
            description: 'Moddaning tuzilishi va issiqlik hodisalari',
            icon: '🔬',
            color: 'green',
            pdfStartPage: 46,
            pdfEndPage: 60,
            lessons: [
                {
                    id: 'mol-1',
                    title: 'Ideal Gazni Harakterlovchi Kattaliklar. Gazlarning Molekulyar-Kinetik Nazariyasi',
                    description: 'Ideal gaz, bosim, hajm, temperatura, molekulyar-kinetik nazariya',
                    duration: '30 min',
                    xp: 50,
                    pdfPage: 46,
                    pdfPageEnd: 49,
                    hasPdf: true
                },
                {
                    id: 'mol-2',
                    title: 'Mendeleyev-Klapeyron Tenglamasi',
                    description: 'Ideal gaz holat tenglamasi',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 50,
                    pdfPageEnd: 50,
                    hasPdf: true
                },
                {
                    id: 'mol-3',
                    title: 'Adiabatik Protsess',
                    description: 'Adiabatik jarayon, issiqlik almashinuvisiz',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 51,
                    pdfPageEnd: 51,
                    hasPdf: true
                },
                {
                    id: 'mol-4',
                    title: 'Termodinamika Asoslari',
                    description: 'Termodinamika asosiy tushunchalari',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 52,
                    pdfPageEnd: 52,
                    hasPdf: true
                },
                {
                    id: 'mol-5',
                    title: 'Ish va Issiqlik Miqdori. Issiqlik Almashinuvi',
                    description: 'Mexanik ish, issiqlik miqdori, issiqlik o\'tkazuvchanlik',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 53,
                    pdfPageEnd: 54,
                    hasPdf: true
                },
                {
                    id: 'mol-6',
                    title: 'Termodinamikaning I-Qonuni',
                    description: 'Energiyaning saqlanish qonuni',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 55,
                    pdfPageEnd: 57,
                    hasPdf: true
                },
                {
                    id: 'mol-7',
                    title: 'Termodinamikaning II-Qonuni',
                    description: 'Entropiya, issiqlik dvigatellari FIK',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 58,
                    pdfPageEnd: 60,
                    hasPdf: true
                }
            ]
        },

        // ========================================
        // 4-BOB: ELEKTR (61-bet)
        // ========================================
        {
            id: 'electricity',
            title: 'Elektr',
            description: 'Elektr zaryadi va elektr maydoni',
            icon: '⚡',
            color: 'yellow',
            pdfStartPage: 61,
            pdfEndPage: 77,
            lessons: [
                {
                    id: 'elec-1',
                    title: 'Elektrostatika',
                    description: 'Elektr zaryadi, elektr maydoni asoslari',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 61,
                    pdfPageEnd: 61,
                    hasPdf: true
                },
                {
                    id: 'elec-2',
                    title: 'Zaryadning Saqlanish Qonuni',
                    description: 'Elektr zaryadining saqlanish qonuni',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 62,
                    pdfPageEnd: 62,
                    hasPdf: true
                },
                {
                    id: 'elec-3',
                    title: 'Kulon Qonuni',
                    description: 'Zaryadlar orasidagi o\'zaro ta\'sir kuchi',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 63,
                    pdfPageEnd: 66,
                    hasPdf: true
                },
                {
                    id: 'elec-4',
                    title: 'Maydon Potensiali',
                    description: 'Elektr maydon potensiali, potensiallar farqi',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 67,
                    pdfPageEnd: 68,
                    hasPdf: true
                },
                {
                    id: 'elec-5',
                    title: 'Elektr Maydonda O\'tkazgichlar',
                    description: 'O\'tkazgichlar, elektrostatik induksiya',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 69,
                    pdfPageEnd: 70,
                    hasPdf: true
                },
                {
                    id: 'elec-6',
                    title: 'Kondensatorlar',
                    description: 'Kondensator, sig\'im, energiya',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 71,
                    pdfPageEnd: 74,
                    hasPdf: true
                },
                {
                    id: 'elec-7',
                    title: 'Dielektriklar',
                    description: 'Dielektrik moddalar, polyarizatsiya',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 75,
                    pdfPageEnd: 77,
                    hasPdf: true
                }
            ]
        },

        // ========================================
        // 5-BOB: ELEKTR TOKI (78-bet)
        // ========================================
        {
            id: 'electric-current',
            title: 'Elektr Toki',
            description: 'Elektr toki, zanjir, Om qonuni',
            icon: '🔌',
            color: 'orange',
            pdfStartPage: 78,
            pdfEndPage: 89,
            lessons: [
                {
                    id: 'curr-1',
                    title: 'O\'zgarmas Tok',
                    description: 'O\'zgarmas tok tushunchasi',
                    duration: '15 min',
                    xp: 50,
                    pdfPage: 78,
                    pdfPageEnd: 78,
                    hasPdf: true
                },
                {
                    id: 'curr-2',
                    title: 'Tok Kuchi',
                    description: 'Tok kuchi, o\'lchov birligi',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 79,
                    pdfPageEnd: 81,
                    hasPdf: true
                },
                {
                    id: 'curr-3',
                    title: 'Tashqi Kuchlar. Elektr Yurituvchi Kuch va Kuchlanish',
                    description: 'EYK, kuchlanish, potensiallar farqi',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 82,
                    pdfPageEnd: 82,
                    hasPdf: true
                },
                {
                    id: 'curr-4',
                    title: 'Om Qonuni va Uning Integral hamda Differentsial Ko\'rinishlari',
                    description: 'Om qonuni, integral va differentsial shakllar',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 83,
                    pdfPageEnd: 83,
                    hasPdf: true
                },
                {
                    id: 'curr-5',
                    title: 'Qarshilik',
                    description: 'Elektr qarshilik, solishtirma qarshilik',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 84,
                    pdfPageEnd: 85,
                    hasPdf: true
                },
                {
                    id: 'curr-6',
                    title: 'Kirxgof Qoidalari. Joul-Lens Qonuni',
                    description: 'Kirxgof qoidalari, issiqlik ajralishi',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 86,
                    pdfPageEnd: 87,
                    hasPdf: true
                },
                {
                    id: 'curr-7',
                    title: 'Elektrolitlarda Elektr Toki. Elektroliz Qonunlari',
                    description: 'Elektroliz, ionlar harakati',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 88,
                    pdfPageEnd: 88,
                    hasPdf: true
                },
                {
                    id: 'curr-8',
                    title: 'Faradeyning I va II Qonunlari',
                    description: 'Elektroliz qonunlari, Faraday doimiysi',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 89,
                    pdfPageEnd: 89,
                    hasPdf: true
                }
            ]
        },

        // ========================================
        // 6-BOB: ELEKTROMAGNETIZM (90-bet)
        // ========================================
        {
            id: 'electromagnetism',
            title: 'Elektromagnetizm',
            description: 'Magnit maydoni va elektromagnit induksiya',
            icon: '🧲',
            color: 'red',
            pdfStartPage: 90,
            pdfEndPage: 111,
            lessons: [
                {
                    id: 'emag-1',
                    title: 'Elektromagnetizm',
                    description: 'Elektromagnetizm asoslari',
                    duration: '15 min',
                    xp: 50,
                    pdfPage: 90,
                    pdfPageEnd: 90,
                    hasPdf: true
                },
                {
                    id: 'emag-2',
                    title: 'Magnit Maydon. Magnit Maydonini Harakterlovchi Kattaliklar',
                    description: 'Magnit maydon, magnit induksiya, magnit oqimi',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 91,
                    pdfPageEnd: 91,
                    hasPdf: true
                },
                {
                    id: 'emag-3',
                    title: 'Magnetizm',
                    description: 'Magnit xossalari, ferromagnetiklar',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 92,
                    pdfPageEnd: 93,
                    hasPdf: true
                },
                {
                    id: 'emag-4',
                    title: 'Elektr Tokining Magnit Maydoni. Amper Qonuni va Lorens Kuchi',
                    description: 'Amper qonuni, Lorens kuchi, tok o\'tkazgichga ta\'sir',
                    duration: '30 min',
                    xp: 50,
                    pdfPage: 94,
                    pdfPageEnd: 95,
                    hasPdf: true
                },
                {
                    id: 'emag-5',
                    title: 'Bio-Savar-Laplas Qonuni',
                    description: 'Magnit maydon kuchlanganligini hisoblash',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 96,
                    pdfPageEnd: 101,
                    hasPdf: true
                },
                {
                    id: 'emag-6',
                    title: 'Elektromagnit Induksiya',
                    description: 'Faradey qonuni, induksiya EYK',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 102,
                    pdfPageEnd: 105,
                    hasPdf: true
                },
                {
                    id: 'emag-7',
                    title: 'O\'zinduksiya. O\'zaroinduksiya. Induktivlik',
                    description: 'O\'zinduksiya, o\'zaro induksiya, induktivlik koeffitsiyenti',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 106,
                    pdfPageEnd: 107,
                    hasPdf: true
                },
                {
                    id: 'emag-8',
                    title: 'Elektromagnit To\'lqinlar',
                    description: 'Elektromagnit to\'lqinlar, Maksvell nazariyasi',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 108,
                    pdfPageEnd: 111,
                    hasPdf: true
                }
            ]
        },

        // ========================================
        // 7-BOB: OPTIKA (112-bet)
        // ========================================
        {
            id: 'optics',
            title: 'Optika',
            description: 'Yorug\'lik, qaytish, sinish, linzalar',
            icon: '🔆',
            color: 'amber',
            pdfStartPage: 112,
            pdfEndPage: 140,
            lessons: [
                {
                    id: 'opt-1',
                    title: 'Yorug\'likning Tabiati',
                    description: 'Yorug\'lik to\'lqin va zarracha xossalari',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 112,
                    pdfPageEnd: 119,
                    hasPdf: true
                },
                {
                    id: 'opt-2',
                    title: 'Yorug\'likning Sinish Qonunlari',
                    description: 'Sinish qonuni, sindirish ko\'rsatkichi',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 120,
                    pdfPageEnd: 121,
                    hasPdf: true
                },
                {
                    id: 'opt-3',
                    title: 'Optik Tolalar. Meditsina Qurilmalari',
                    description: 'Optik tolalar, tibbiyotda qo\'llanilishi',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 122,
                    pdfPageEnd: 125,
                    hasPdf: true
                },
                {
                    id: 'opt-4',
                    title: 'Linzalar',
                    description: 'Yig\'uvchi va sochuvchi linzalar, linza formulasi',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 126,
                    pdfPageEnd: 128,
                    hasPdf: true
                },
                {
                    id: 'opt-5',
                    title: 'Yorug\'lik Interferentsiyasi',
                    description: 'Interferentsiya hodisasi, kogerent to\'lqinlar',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 129,
                    pdfPageEnd: 130,
                    hasPdf: true
                },
                {
                    id: 'opt-6',
                    title: 'Yorug\'lik Interferentsiyasini Hosil Qilish Usullari',
                    description: 'Yung tajribasi, interferentsiya manzarasi',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 131,
                    pdfPageEnd: 136,
                    hasPdf: true
                },
                {
                    id: 'opt-7',
                    title: 'Yorug\'lik Difraktsiyasi',
                    description: 'Difraktsiya hodisasi, Frenel va Fraungofer difraktsiyasi',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 137,
                    pdfPageEnd: 137,
                    hasPdf: true
                },
                {
                    id: 'opt-8',
                    title: 'Gyuygens Printsipi',
                    description: 'Gyuygens printsipi, to\'lqin fronti',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 138,
                    pdfPageEnd: 138,
                    hasPdf: true
                },
                {
                    id: 'opt-9',
                    title: 'Yagona Tirqish yoki Disk Orqali Difraktsiya',
                    description: 'Tirqishda difraktsiya, difraktsion panjara',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 139,
                    pdfPageEnd: 140,
                    hasPdf: true
                }
            ]
        },

        // ========================================
        // 8-BOB: ATOM FIZIKASI (141-bet)
        // ========================================
        {
            id: 'atomic',
            title: 'Atom Fizikasi',
            description: 'Atom tuzilishi, radioaktivlik, yadro fizikasi',
            icon: '⚛️',
            color: 'cyan',
            pdfStartPage: 141,
            pdfEndPage: 160,
            lessons: [
                {
                    id: 'atom-1',
                    title: 'Atom Tuzilishi',
                    description: 'Atom modellari, elektron, proton, neytron',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 141,
                    pdfPageEnd: 141,
                    hasPdf: true
                },
                {
                    id: 'atom-2',
                    title: 'Rezerfordning Modeli',
                    description: 'Rezerford tajribasi, atom yadrosi',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 142,
                    pdfPageEnd: 143,
                    hasPdf: true
                },
                {
                    id: 'atom-3',
                    title: 'Atomning Yadro Modeli Yaratilishi',
                    description: 'Yadro modeli, zaryadlar taqsimoti',
                    duration: '25 min',
                    xp: 50,
                    pdfPage: 144,
                    pdfPageEnd: 146,
                    hasPdf: true
                },
                {
                    id: 'atom-4',
                    title: 'Bor Postulatlari',
                    description: 'Bor nazariyasi, kvant shartlari, energiya sathlar',
                    duration: '30 min',
                    xp: 50,
                    pdfPage: 147,
                    pdfPageEnd: 160,
                    hasPdf: true
                }
            ]
        }
    ]
};

// Progress hisoblash funksiyasi
export function calculateChapterProgress(chapter, completedLessons) {
    if (!chapter || !chapter.lessons || chapter.lessons.length === 0) return 0;

    const completedCount = chapter.lessons.filter(lesson =>
        completedLessons.includes(lesson.id)
    ).length;

    return Math.round((completedCount / chapter.lessons.length) * 100);
}
