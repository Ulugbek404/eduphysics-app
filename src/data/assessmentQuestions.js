// Physics Assessment Questions Database
// 50+ questions covering all 9th grade physics topics

export const assessmentQuestions = [
    // ========== KINEMATIKA (Easy) ==========
    {
        id: 1,
        topic: 'kinematika',
        difficulty: 'easy',
        question: 'Tezlik nima?',
        options: [
            'Jismning vaqt birligi ichida bosib o\'tgan yo\'li',
            'Jismning massasi',
            'Jismning tezlanishi',
            'Jismning energiyasi'
        ],
        correct: 0,
        explanation: 'Tezlik - jismning vaqt birligi ichida bosib o\'tgan yo\'li. Formula: v = s/t'
    },
    {
        id: 2,
        topic: 'kinematika',
        difficulty: 'easy',
        question: 'Quyidagi formulalardan qaysi biri to\'g\'ri?',
        options: [
            'v = s/t',
            'v = m × a',
            'v = F/m',
            'v = E/t'
        ],
        correct: 0,
        explanation: 'Tezlik formulasi: v = s/t (yo\'l / vaqt)'
    },
    {
        id: 3,
        topic: 'kinematika',
        difficulty: 'medium',
        question: 'Avtomobil 2 soatda 120 km yo\'l bosdi. Uning o\'rtacha tezligi qancha?',
        options: [
            '60 km/soat',
            '120 km/soat',
            '240 km/soat',
            '30 km/soat'
        ],
        correct: 0,
        explanation: 'v = s/t = 120/2 = 60 km/soat'
    },
    {
        id: 4,
        topic: 'kinematika',
        difficulty: 'medium',
        question: 'Tekis tezlanuvchan harakatda tezlik qanday o\'zgaradi?',
        options: [
            'Vaqt o\'tishi bilan bir xil miqdorda ortadi yoki kamayadi',
            'O\'zgarmaydi',
            'Tasodifiy o\'zgaradi',
            'Faqat kamayadi'
        ],
        correct: 0,
        explanation: 'Tekis tezlanuvchan harakatda tezlik vaqt o\'tishi bilan bir xil miqdorda o\'zgaradi'
    },
    {
        id: 5,
        topic: 'kinematika',
        difficulty: 'hard',
        question: 'Jism tinch holatdan 5 m/s² tezlanish bilan harakatlansa, 4 sekunddan keyin tezligi qancha bo\'ladi?',
        options: [
            '20 m/s',
            '10 m/s',
            '5 m/s',
            '25 m/s'
        ],
        correct: 0,
        explanation: 'v = v₀ + at = 0 + 5×4 = 20 m/s'
    },

    // ========== DINAMIKA (Easy) ==========
    {
        id: 6,
        topic: 'dinamika',
        difficulty: 'easy',
        question: 'Nyutonning birinchi qonuni nima haqida?',
        options: [
            'Jism inersiyasi haqida',
            'Kuch va tezlanish haqida',
            'Ta\'sir va aks ta\'sir haqida',
            'Energiya haqida'
        ],
        correct: 0,
        explanation: 'Nyutonning I qonuni - inertsiya qonuni. Jism o\'z holatini saqlab qolishga intiladi'
    },
    {
        id: 7,
        topic: 'dinamika',
        difficulty: 'easy',
        question: 'Kuch nima?',
        options: [
            'Jismning harakat holatini o\'zgartiruvchi ta\'sir',
            'Jismning massasi',
            'Jismning tezligi',
            'Jismning energiyasi'
        ],
        correct: 0,
        explanation: 'Kuch - jismning harakat holatini yoki shaklini o\'zgartiruvchi ta\'sir'
    },
    {
        id: 8,
        topic: 'dinamika',
        difficulty: 'medium',
        question: 'Nyutonning ikkinchi qonuni formulasi qaysi?',
        options: [
            'F = ma',
            'F = mv',
            'F = mgh',
            'F = kx'
        ],
        correct: 0,
        explanation: 'Nyutonning II qonuni: F = ma (kuch = massa × tezlanish)'
    },
    {
        id: 9,
        topic: 'dinamika',
        difficulty: 'medium',
        question: '10 kg massali jismga 50 N kuch ta\'sir etsa, tezlanishi qancha?',
        options: [
            '5 m/s²',
            '10 m/s²',
            '50 m/s²',
            '500 m/s²'
        ],
        correct: 0,
        explanation: 'a = F/m = 50/10 = 5 m/s²'
    },
    {
        id: 10,
        topic: 'dinamika',
        difficulty: 'hard',
        question: 'Ishqalanish kuchi qaysi omillarga bog\'liq?',
        options: [
            'Normal bosim kuchi va ishqalanish koeffitsiyenti',
            'Faqat jism massasi',
            'Faqat tezlik',
            'Faqat yo\'l uzunligi'
        ],
        correct: 0,
        explanation: 'Fᵢₛₕ = μN (ishqalanish koeffitsiyenti × normal kuch)'
    },

    // ========== ENERGIYA (Easy) ==========
    {
        id: 11,
        topic: 'energiya',
        difficulty: 'easy',
        question: 'Energiya nima?',
        options: [
            'Jismning ish bajarish qobiliyati',
            'Jismning massasi',
            'Jismning tezligi',
            'Jismning hajmi'
        ],
        correct: 0,
        explanation: 'Energiya - jismning ish bajarish qobiliyati'
    },
    {
        id: 12,
        topic: 'energiya',
        difficulty: 'medium',
        question: 'Kinetik energiya formulasi qaysi?',
        options: [
            'Eₖ = mv²/2',
            'Eₖ = mgh',
            'Eₖ = Fh',
            'Eₖ = ma'
        ],
        correct: 0,
        explanation: 'Kinetik energiya: Eₖ = mv²/2'
    },
    {
        id: 13,
        topic: 'energiya',
        difficulty: 'medium',
        question: 'Potensial energiya formulasi qaysi?',
        options: [
            'Eₚ = mgh',
            'Eₚ = mv²/2',
            'Eₚ = Fs',
            'Eₚ = ma'
        ],
        correct: 0,
        explanation: 'Potensial energiya: Eₚ = mgh (massa × g × balandlik)'
    },
    {
        id: 14,
        topic: 'energiya',
        difficulty: 'hard',
        question: 'Energiyaning saqlanish qonuni nimani bildiradi?',
        options: [
            'Energiya yo\'qolmaydi, faqat bir turdan ikkinchisiga o\'tadi',
            'Energiya doimo ortadi',
            'Energiya doimo kamayadi',
            'Energiya o\'zgarmaydi'
        ],
        correct: 0,
        explanation: 'Energiya saqlanish qonuni: energiya yo\'qolmaydi va yaratilmaydi, faqat bir turdan ikkinchisiga o\'tadi'
    },

    // ========== TOK QONUNLARI (Easy) ==========
    {
        id: 15,
        topic: 'elektr',
        difficulty: 'easy',
        question: 'Elektr toki nima?',
        options: [
            'Zaryadlangan zarralarning tartibli harakati',
            'Elektronlarning tasodifiy harakati',
            'Protonlarning harakati',
            'Neytronlarning harakati'
        ],
        correct: 0,
        explanation: 'Elektr toki - zaryadlangan zarralarning tartibli harakati'
    },
    {
        id: 16,
        topic: 'elektr',
        difficulty: 'easy',
        question: 'Om qonuni formulasi qaysi?',
        options: [
            'I = U/R',
            'I = UR',
            'I = U + R',
            'I = U - R'
        ],
        correct: 0,
        explanation: 'Om qonuni: I = U/R (tok kuchi = kuchlanish / qarshilik)'
    },
    {
        id: 17,
        topic: 'elektr',
        difficulty: 'medium',
        question: '12 V kuchlanishda 4 Om qarshilikdan qancha tok o\'tadi?',
        options: [
            '3 A',
            '8 A',
            '16 A',
            '48 A'
        ],
        correct: 0,
        explanation: 'I = U/R = 12/4 = 3 A'
    },
    {
        id: 18,
        topic: 'elektr',
        difficulty: 'medium',
        question: 'Elektr quvvat formulasi qaysi?',
        options: [
            'P = UI',
            'P = U/I',
            'P = U + I',
            'P = U - I'
        ],
        correct: 0,
        explanation: 'Elektr quvvat: P = UI (kuchlanish × tok kuchi)'
    },
    {
        id: 19,
        topic: 'elektr',
        difficulty: 'hard',
        question: 'Ketma-ket ulangan qarshiliklarning umumiy qarshiligi qanday topiladi?',
        options: [
            'R = R₁ + R₂ + R₃',
            'R = R₁ × R₂ × R₃',
            '1/R = 1/R₁ + 1/R₂',
            'R = R₁ - R₂'
        ],
        correct: 0,
        explanation: 'Ketma-ket ulashda: R = R₁ + R₂ + R₃ + ...'
    },

    // ========== OPTIKA (Easy) ==========
    {
        id: 20,
        topic: 'optika',
        difficulty: 'easy',
        question: 'Yorug\'lik nima?',
        options: [
            'Elektromagnit to\'lqin',
            'Mexanik to\'lqin',
            'Tovush to\'lqini',
            'Issiqlik to\'lqini'
        ],
        correct: 0,
        explanation: 'Yorug\'lik - elektromagnit to\'lqin'
    },
    {
        id: 21,
        topic: 'optika',
        difficulty: 'easy',
        question: 'Yorug\'likning qaytish qonuni nimani bildiradi?',
        options: [
            'Tushish burchagi = qaytish burchagi',
            'Tushish burchagi > qaytish burchagi',
            'Tushish burchagi < qaytish burchagi',
            'Burchaklar bog\'liq emas'
        ],
        correct: 0,
        explanation: 'Qaytish qonuni: tushish burchagi qaytish burchagiga teng'
    },
    {
        id: 22,
        topic: 'optika',
        difficulty: 'medium',
        question: 'Sinish hodisasi qachon sodir bo\'ladi?',
        options: [
            'Yorug\'lik bir muhitdan ikkinchisiga o\'tganda',
            'Yorug\'lik bir muhitda tarqalganda',
            'Yorug\'lik to\'xtaganda',
            'Yorug\'lik qaytganda'
        ],
        correct: 0,
        explanation: 'Sinish - yorug\'lik bir muhitdan ikkinchisiga o\'tganda yo\'nalishini o\'zgartirishi'
    },
    {
        id: 23,
        topic: 'optika',
        difficulty: 'hard',
        question: 'Yig\'uvchi linzaning fokus masofasi qanday bo\'ladi?',
        options: [
            'Musbat',
            'Manfiy',
            'Nol',
            'Cheksiz'
        ],
        correct: 0,
        explanation: 'Yig\'uvchi linzaning fokus masofasi musbat, sochuvchi linzaniki manfiy'
    },

    // ========== ATOM FIZIKASI (Easy) ==========
    {
        id: 24,
        topic: 'atom',
        difficulty: 'easy',
        question: 'Atom nimalardan tashkil topgan?',
        options: [
            'Yadro va elektronlar',
            'Faqat protonlar',
            'Faqat neytronlar',
            'Faqat elektronlar'
        ],
        correct: 0,
        explanation: 'Atom yadro (proton + neytron) va elektronlardan iborat'
    },
    {
        id: 25,
        topic: 'atom',
        difficulty: 'medium',
        question: 'Protonning zaryadi qanday?',
        options: [
            'Musbat (+)',
            'Manfiy (-)',
            'Neytral (0)',
            'O\'zgaruvchan'
        ],
        correct: 0,
        explanation: 'Proton musbat (+) zaryadlangan, elektron manfiy (-), neytron neytral'
    },
    {
        id: 26,
        topic: 'atom',
        difficulty: 'medium',
        question: 'Radioaktivlik nima?',
        options: [
            'Atom yadrolarining o\'z-o\'zidan parchalanishi',
            'Atomlarning birlashishi',
            'Elektronlarning harakati',
            'Protonlarning harakati'
        ],
        correct: 0,
        explanation: 'Radioaktivlik - beqaror atom yadrolarining o\'z-o\'zidan parchalanishi'
    },

    // ========== QOSHIMCHA SAVOLLAR ==========
    {
        id: 27,
        topic: 'kinematika',
        difficulty: 'hard',
        question: 'Erkin tushish tezlanishi Yerda taxminan qanchaga teng?',
        options: [
            '10 m/s²',
            '5 m/s²',
            '20 m/s²',
            '15 m/s²'
        ],
        correct: 0,
        explanation: 'g ≈ 10 m/s² (aniqrog\'i 9.8 m/s²)'
    },
    {
        id: 28,
        topic: 'dinamika',
        difficulty: 'hard',
        question: 'Nyutonning uchinchi qonuni nimani bildiradi?',
        options: [
            'Har bir ta\'sirga teng va qarama-qarshi aks ta\'sir mavjud',
            'Jism inersiyaga ega',
            'F = ma',
            'Energiya saqlanadi'
        ],
        correct: 0,
        explanation: 'Nyutonning III qonuni: ta\'sir va aks ta\'sir kuchlari teng va qarama-qarshi yo\'nalgan'
    },
    {
        id: 29,
        topic: 'energiya',
        difficulty: 'hard',
        question: '5 kg massali jism 10 m balandlikda. Uning potensial energiyasi qancha? (g=10 m/s²)',
        options: [
            '500 J',
            '50 J',
            '5000 J',
            '100 J'
        ],
        correct: 0,
        explanation: 'Eₚ = mgh = 5 × 10 × 10 = 500 J'
    },
    {
        id: 30,
        topic: 'elektr',
        difficulty: 'hard',
        question: 'Parallel ulangan qarshiliklarning umumiy qarshiligi qanday topiladi?',
        options: [
            '1/R = 1/R₁ + 1/R₂',
            'R = R₁ + R₂',
            'R = R₁ × R₂',
            'R = R₁ - R₂'
        ],
        correct: 0,
        explanation: 'Parallel ulashda: 1/R = 1/R₁ + 1/R₂ + ...'
    }
];

// Topic names in Uzbek
export const topicNames = {
    kinematika: 'Kinematika',
    dinamika: 'Dinamika',
    energiya: 'Energiya',
    elektr: 'Elektr toki',
    optika: 'Optika',
    atom: 'Atom fizikasi'
};

// Difficulty levels
export const difficultyLevels = {
    easy: 'Oson',
    medium: 'O\'rta',
    hard: 'Qiyin'
};

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Get random questions for assessment (15 questions)
export function getAssessmentQuestions() {
    const questions = [];
    const topics = Object.keys(topicNames);

    // Get 2-3 questions from each topic with varying difficulty
    topics.forEach(topic => {
        const topicQuestions = assessmentQuestions.filter(q => q.topic === topic);

        // Get 1 easy, 1 medium, 1 hard (if available)
        const easy = topicQuestions.filter(q => q.difficulty === 'easy')[0];
        const medium = topicQuestions.filter(q => q.difficulty === 'medium')[0];
        const hard = topicQuestions.filter(q => q.difficulty === 'hard')[0];

        if (easy) questions.push(easy);
        if (medium) questions.push(medium);
        if (hard && questions.length < 15) questions.push(hard);
    });

    // Shuffle questions order
    const shuffledQuestions = shuffleArray(questions.slice(0, 15));

    // Shuffle answer options for each question
    return shuffledQuestions.map(question => {
        const options = [...question.options];
        const correctAnswer = options[question.correct];

        // Shuffle options
        const shuffledOptions = shuffleArray(options);

        // Find new index of correct answer
        const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);

        return {
            ...question,
            options: shuffledOptions,
            correct: newCorrectIndex
        };
    });
}

// Calculate score by topic
export function calculateTopicScores(answers) {
    const scores = {};

    Object.keys(topicNames).forEach(topic => {
        const topicQuestions = answers.filter(a => a.topic === topic);
        const correct = topicQuestions.filter(a => a.isCorrect).length;
        const total = topicQuestions.length;

        scores[topic] = {
            correct,
            total,
            percentage: total > 0 ? Math.round((correct / total) * 100) : 0
        };
    });

    return scores;
}

// Determine user level based on overall score
export function determineUserLevel(overallScore) {
    if (overallScore >= 80) return 'advanced';
    if (overallScore >= 50) return 'intermediate';
    return 'beginner';
}

// Get level name in Uzbek
export function getLevelName(level) {
    const levels = {
        beginner: 'Boshlang\'ich',
        intermediate: 'O\'rta',
        advanced: 'Yuqori'
    };
    return levels[level] || 'Noma\'lum';
}
