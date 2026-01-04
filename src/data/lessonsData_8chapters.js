// 9-Sinf Fizika Dasturi - 8 Bob bilan Yangilangan

export const lessonsData = {
    chapters: [
        // ========================================
        // 1-BOB: MEXANIKA (7-bet)
        // ========================================
        {
            id: 'mechanics',
            title: 'Mexanika',
            description: 'Jismlarning harakati va kinematika',
            icon: '🚀',
            color: 'blue',
            pdfStartPage: 7,
            pdfEndPage: 38,
            lessons: [
                {
                    id: 'mech-1',
                    title: 'Mexanik Harakat. Moddiy Nuqta. Sanoq Sistemasi',
                    description: 'Mexanik harakat tushunchasi, moddiy nuqta, sanoq sistemasi',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 7,
                    pdfPageEnd: 10,
                    hasPdf: true
                }
                // Qolgan darslar keyinroq qo'shiladi
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
            pdfEndPage: 44,
            lessons: [
                {
                    id: 'osc-1',
                    title: 'Erkin va Majburiy Tebranishlar',
                    description: 'Tebranish turlari, amplituda, davr, chastota',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 39,
                    pdfPageEnd: 41,
                    hasPdf: true
                }
            ]
        },

        // ========================================
        // 3-BOB: MOLEKULYAR FIZIKA (45-bet)
        // ========================================
        {
            id: 'molecular',
            title: 'Molekulyar Fizika',
            description: 'Moddaning tuzilishi va issiqlik hodisalari',
            icon: '🔬',
            color: 'green',
            pdfStartPage: 45,
            pdfEndPage: 60,
            lessons: [
                {
                    id: 'mol-1',
                    title: 'Moddaning Molekulyar Tuzilishi',
                    description: 'Molekulalar, atomlar, modda holatlari',
                    duration: '15 min',
                    xp: 50,
                    pdfPage: 45,
                    pdfPageEnd: 48,
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
                    title: 'Elektr Zaryadi. Kulon Qonuni',
                    description: 'Musbat va manfiy zaryadlar, Kulon qonuni',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 61,
                    pdfPageEnd: 64,
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
                    title: 'Elektr Toki. Tok Kuchi',
                    description: 'Elektr toki tushunchasi, tok kuchi',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 78,
                    pdfPageEnd: 81,
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
                    title: 'Magnit Maydoni. Doimiy Magnitlar',
                    description: 'Magnit qutblari, magnit maydon chiziqlari',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 90,
                    pdfPageEnd: 93,
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
                    title: 'Yorug\'likning Qaytishi',
                    description: 'Yorug\'lik qaytish qonunlari, ko\'zgu',
                    duration: '15 min',
                    xp: 50,
                    pdfPage: 112,
                    pdfPageEnd: 115,
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
                    title: 'Atom Tuzilishi. Rezerford Tajribasi',
                    description: 'Atom modellari, Rezerford tajribasi',
                    duration: '20 min',
                    xp: 50,
                    pdfPage: 141,
                    pdfPageEnd: 144,
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
