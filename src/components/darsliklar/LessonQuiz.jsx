
import React, { useState, useCallback } from 'react';
import { CheckCircle, XCircle, RefreshCw, Trophy, Sparkles, Loader2, RotateCcw, Brain } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { generateContent } from '../../services/geminiClient';
import { shuffleArray } from '../../utils/arrayHelpers';

/**
 * LessonQuiz — AI generatsiya + statik fallback
 * Dark/Light ikkala rejimda ham to'g'ri ishlaydi
 */
export default function LessonQuiz({ lessonId, onComplete, questions: lessonQuestions }) {
    const { t } = useLanguage();

    // Statik fallback savollar
    const defaultQuestions = [
        {
            id: 1,
            question: "Molekulyar-kinetik nazariyaga ko'ra, moddalar nimalardan tashkil topgan?",
            options: ["Energiyadan", "Maydonlardan", "Molekula va atomlardan", "To'lqinlardan"],
            correct: 2,
            explanation: "MKN ning asosiy qoidasi — barcha moddalar kichik zarrachalar (molekula va atomlar)dan tashkil topgan."
        },
        {
            id: 2,
            question: "Browncha harakati nima?",
            options: [
                "Molekulalarning tartibli harakati",
                "Suyuqlik yoki gazdagi kichik zarrachalarning tartibsiz harakati",
                "Elektronlarning aylanishi",
                "Atomlarning tebranishi"
            ],
            correct: 1,
            explanation: "Browncha harakati — suyuqlik yoki gazdagi kichik zarrachalarning molekulalar tomonidan urilishi natijasida tartibsiz harakati."
        },
        {
            id: 3,
            question: "Diffuziya qaysi holatda eng tez sodir bo'ladi?",
            options: ["Qattiq jismlarda", "Suyuqliklarda", "Gazlarda", "Barcha holatlarda bir xil"],
            correct: 2,
            explanation: "Gazlarda molekulalar eng erkin va tez harakat qilgani uchun diffuziya eng tez bo'ladi."
        }
    ];

    const staticQuestions = (lessonQuestions && lessonQuestions.length > 0) ? lessonQuestions : defaultQuestions;
    
    // Helper to prepare questions (shuffle options)
    const prepareQuestions = useCallback((qList) => {
        return qList.map(q => ({
            ...q,
            // Store original correct answer's text to find it after shuffling
            correctText: q.options[q.correct],
            options: shuffleArray([...q.options])
        })).map(q => ({
            ...q,
            // Update correct index based on new position of correctText
            correct: q.options.indexOf(q.correctText)
        }));
    }, []);

    // ── STATE ────────────────────────────────────────────────────
    const [questions, setQuestions] = useState(() => {
        const saved = localStorage.getItem(`quiz_state_${lessonId}`);
        if (saved) {
            const parsed = JSON.parse(saved);
            return parsed.questions || prepareQuestions(shuffleArray([...staticQuestions]));
        }
        return prepareQuestions(shuffleArray([...staticQuestions]));
    });

    const [currentQuestion, setCurrentQuestion] = useState(() => {
        const saved = localStorage.getItem(`quiz_state_${lessonId}`);
        return saved ? JSON.parse(saved).currentQuestion : 0;
    });

    const [score, setScore] = useState(() => {
        const saved = localStorage.getItem(`quiz_state_${lessonId}`);
        return saved ? JSON.parse(saved).score : 0;
    });

    const [showResult, setShowResult] = useState(() => {
        const saved = localStorage.getItem(`quiz_state_${lessonId}`);
        return saved ? JSON.parse(saved).showResult : false;
    });

    const [selectedOption, setSelectedOption] = useState(() => {
        const saved = localStorage.getItem(`quiz_state_${lessonId}`);
        return saved ? JSON.parse(saved).selectedOption : null;
    });

    const [isAnswerChecked, setIsAnswerChecked] = useState(() => {
        const saved = localStorage.getItem(`quiz_state_${lessonId}`);
        return saved ? JSON.parse(saved).isAnswerChecked : false;
    });

    const [isAIMode, setIsAIMode] = useState(() => {
        const saved = localStorage.getItem(`quiz_state_${lessonId}`);
        return saved ? JSON.parse(saved).isAIMode : false;
    });

    const [isGenerating, setIsGenerating] = useState(false);
    const [aiError, setAiError] = useState(null);

    // ── PERSISTENCE ───────────────────────────────────────────────
    React.useEffect(() => {
        const state = {
            questions,
            currentQuestion,
            score,
            showResult,
            selectedOption,
            isAnswerChecked,
            isAIMode
        };
        localStorage.setItem(`quiz_state_${lessonId}`, JSON.stringify(state));
    }, [lessonId, questions, currentQuestion, score, showResult, selectedOption, isAnswerChecked, isAIMode]);

    // ── AI SAVOL GENERATSIYASI ────────────────────────────────────
    const generateAIQuestions = useCallback(async () => {
        setIsGenerating(true);
        setAiError(null);

        // Dars ID dan mavzuni aniqlash
        const topicMap = {
            '9-l-20': 'Modda tuzilishining molekulyar-kinetik nazariyasi, Browncha harakati, diffuziya',
            '9-l-21': "Molekulaning massasi va o'lchami, Avogadro soni, molyar massa",
            '9-l-22': "Modda miqdori (mol), molekulalar soni hisoblash, kimyoviy miqdor",
        };
        const topic = topicMap[lessonId] || 'fizika asoslari';

        const randomSeed = Math.floor(Math.random() * 1000000);
        const timeStamp = Date.now();

        const prompt = `Sen fizika o'qituvchisi sifatida ${topic} mavzusida 5 ta test savoli tuzishing kerak.

QOIDALAR:
- Savollar o'zbek tilida bo'lsin
- Har bir savolda 4 ta variant bo'lsin (A, B, C, D)
- Faqat BITTA to'g'ri javob bo'lsin
- Savollar turli xil bo'lsin — har safar boshqacha
- Qiyinligi: 2 ta oson, 2 ta o'rta, 1 ta qiyin
- Tasodifiylik uchun maxfiylik raqami: ${randomSeed}_${timeStamp} (Bunga e'tibor bermay, mutlaqo yangi savollar o'ylab top)

JAVOB FORMATI (faqat JSON):
[
  {
    "id": 1,
    "question": "savol matni",
    "options": ["A variant", "B variant", "C variant", "D variant"],
    "correct": 0,
    "explanation": "nima uchun bu to'g'ri izoh"
  }
]

MUHIM: Faqat JSON massiv qaytar, boshqa hech narsa yozma!`;

        try {
            const response = await generateContent(prompt);
            const match = response.match(/\[[\s\S]*\]/);
            if (!match) throw new Error('JSON topilmadi');

            const parsed = JSON.parse(match[0]);

            // Validatsiya
            if (!Array.isArray(parsed) || parsed.length === 0) throw new Error('Noto\'g\'ri format');

            const valid = parsed.filter(q =>
                q.question &&
                Array.isArray(q.options) && q.options.length >= 2 &&
                typeof q.correct === 'number'
            );

            if (valid.length < 2) throw new Error('Yetarli savol yo\'q');

            const prepared = prepareQuestions(valid);
            setQuestions(prepared);
            setIsAIMode(true);
            setCurrentQuestion(0);
            setScore(0);
            setShowResult(false);
            setSelectedOption(null);
            setIsAnswerChecked(false);
        } catch (err) {
            console.warn('AI savol generatsiya xatosi:', err);
            setAiError('AI savollar yaratishda xatolik. Standart savollar ishlatilmoqda.');
            // Statik savollarni qayta yuklash
            setQuestions(staticQuestions);
            setIsAIMode(false);
        } finally {
            setIsGenerating(false);
        }
    }, [lessonId, staticQuestions]);

    // ── QUIZ MANTIQ ───────────────────────────────────────────────
    const handleOptionSelect = (index) => {
        if (isAnswerChecked) return;
        setSelectedOption(index);
    };

    const checkAnswer = () => {
        setIsAnswerChecked(true);
        if (selectedOption === questions[currentQuestion].correct) {
            setScore(score + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setIsAnswerChecked(false);
        } else {
            setShowResult(true);
            const lastCorrect = selectedOption === questions[currentQuestion].correct ? 1 : 0;
            const finalScore = Math.round(((score + lastCorrect) / questions.length) * 100);
            if (onComplete) onComplete(finalScore);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
        setIsAnswerChecked(false);
        setAiError(null);
        // Clear persistence on explicit restart
        localStorage.removeItem(`quiz_state_${lessonId}`);
    };

    // ── NATIJA EKRANI ─────────────────────────────────────────────
    if (showResult) {
        const finalPercentage = Math.round((score / questions.length) * 100);
        const isGood = finalPercentage >= 80;
        const isMedium = finalPercentage >= 50;

        return (
            <div className="text-center p-8 theme-card rounded-2xl border theme-border">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                    isGood ? 'bg-yellow-500/20' : isMedium ? 'bg-blue-500/20' : 'bg-slate-500/20'
                }`}>
                    <Trophy size={48} className={isGood ? 'text-yellow-400' : isMedium ? 'text-blue-400' : 'text-slate-400'} />
                </div>

                <h3 className="text-2xl font-bold theme-text mb-2">
                    {t('quiz_finished') || 'Test Yakunlandi!'}
                </h3>
                <p className="theme-muted mb-2">{t('quiz_result') || 'Sizning natijangiz:'}</p>

                <div className={`text-5xl font-bold mb-2 ${
                    isGood ? 'text-yellow-400' : isMedium ? 'text-blue-400' : 'text-red-400'
                }`}>
                    {finalPercentage}%
                </div>

                <p className="theme-muted text-sm mb-8">
                    {questions.length} ta savoldan {score} tasiga to'g'ri javob berdingiz
                </p>

                {aiError && (
                    <p className="text-amber-500 text-xs mb-4 bg-amber-500/10 rounded-lg px-3 py-2">
                        ⚠️ {aiError}
                    </p>
                )}

                <div className="flex flex-wrap gap-3 justify-center">
                    <button
                        onClick={restartQuiz}
                        className="flex items-center gap-2 px-5 py-3 theme-card hover:bg-blue-500/10 border theme-border rounded-xl transition-colors theme-text font-medium"
                    >
                        <RotateCcw size={18} />
                        {t('quiz_retry') || 'Qayta ishlash'}
                    </button>
                    <button
                        onClick={generateAIQuestions}
                        disabled={isGenerating}
                        className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl transition-all font-medium disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20"
                    >
                        {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                        {isGenerating ? 'Generatsiya...' : 'AI yangi savollar'}
                    </button>
                </div>
            </div>
        );
    }

    // ── YÜKLENIYOR ────────────────────────────────────────────────
    if (isGenerating) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[300px] gap-6">
                <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl flex items-center justify-center">
                        <Brain size={40} className="text-purple-400" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl border-2 border-purple-500 opacity-50 animate-ping" />
                </div>
                <div className="text-center">
                    <p className="theme-text font-bold text-lg mb-1">AI savollar tayyorlanmoqda...</p>
                    <p className="theme-muted text-sm">Gemini AI yangi, noyob savollar yaratmoqda</p>
                </div>
                <div className="flex gap-1.5">
                    {[0, 1, 2, 3].map(i => (
                        <div
                            key={i}
                            className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"
                            style={{ animationDelay: `${i * 150}ms` }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // ── SAVOL EKRANI ──────────────────────────────────────────────
    const question = questions[currentQuestion];

    return (
        <div className="max-w-2xl mx-auto space-y-6">

            {/* AI/Static Badge + AI tugmasi */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {isAIMode ? (
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-purple-500/15 text-purple-500 dark:text-purple-400 border border-purple-500/30 rounded-full text-xs font-semibold">
                            <Sparkles size={12} /> AI savollar
                        </span>
                    ) : (
                        <span className="flex items-center gap-1.5 px-3 py-1 theme-card border theme-border rounded-full text-xs font-medium theme-muted">
                            📚 Standart savollar
                        </span>
                    )}
                    <span className="theme-muted text-sm">
                        {currentQuestion + 1} / {questions.length}
                    </span>
                </div>
                <button
                    onClick={generateAIQuestions}
                    disabled={isGenerating}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/30 text-purple-500 dark:text-purple-400 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                >
                    <Sparkles size={12} />
                    AI yangi test
                </button>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 theme-card border theme-border rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 rounded-full"
                    style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                />
            </div>

            {/* Score */}
            <div className="flex justify-end">
                <span className="theme-muted text-sm">{t('common_score') || 'Ball'}: <span className="theme-text font-bold">{score}</span></span>
            </div>

            {/* Question Card */}
            <div className="theme-card rounded-2xl p-6 border theme-border">
                <h3 className="text-xl font-bold theme-text mb-5 leading-relaxed">{question.question}</h3>

                <div className="space-y-3">
                    {question.options.map((option, index) => {
                        let cls = '';
                        if (isAnswerChecked) {
                            if (index === question.correct) {
                                // To'g'ri javob — yashil + yengil pulse
                                cls = 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 animate-pop';
                            } else if (index === selectedOption) {
                                // Noto'g'ri tanlov — qizil + silkinish
                                cls = 'bg-red-500/15 border-red-500 text-red-500 dark:text-red-400 animate-shake';
                            } else {
                                cls = 'theme-card border theme-border theme-muted opacity-60';
                            }
                        } else if (selectedOption === index) {
                            cls = 'bg-brand-500/15 border-brand-500 text-brand-600 dark:text-brand-400';
                        } else {
                            cls = 'theme-card border theme-border theme-text hover:border-brand-500/50 hover:bg-brand-500/5 cursor-pointer';
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(index)}
                                disabled={isAnswerChecked}
                                className={`w-full p-4 text-left rounded-xl border transition-all duration-200 ${cls}`}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <span className="flex-shrink-0 w-7 h-7 rounded-full border border-current flex items-center justify-center text-xs font-bold opacity-70">
                                            {String.fromCharCode(65 + index)}
                                        </span>
                                        <span className="font-medium">{option}</span>
                                    </div>
                                    {isAnswerChecked && index === question.correct && (
                                        <CheckCircle size={20} className="text-emerald-500 flex-shrink-0" />
                                    )}
                                    {isAnswerChecked && index === selectedOption && index !== question.correct && (
                                        <XCircle size={20} className="text-red-500 flex-shrink-0" />
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Explanation after check */}
            {isAnswerChecked && question.explanation && (
                <div className={`p-4 rounded-xl border ${
                    selectedOption === question.correct
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                        : 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300'
                }`}>
                    <p className="text-sm font-semibold mb-1">
                        {selectedOption === question.correct ? '✅ To\'g\'ri!' : '❌ Noto\'g\'ri!'}
                    </p>
                    <p className="text-sm opacity-90">{question.explanation}</p>
                </div>
            )}

            {/* Buttons */}
            {isAnswerChecked ? (
                <button
                    onClick={nextQuestion}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 hover:-translate-y-0.5"
                >
                    {currentQuestion < questions.length - 1
                        ? (t('quiz_next') || 'Keyingi savol →')
                        : (t('quiz_see_results') || "Natijani ko'rish 🏆")}
                </button>
            ) : (
                <button
                    onClick={checkAnswer}
                    disabled={selectedOption === null}
                    className={`w-full py-4 font-bold rounded-xl transition-all ${
                        selectedOption !== null
                            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 hover:-translate-y-0.5'
                            : 'theme-card border theme-border theme-muted cursor-not-allowed'
                    }`}
                >
                    {t('quiz_check') || 'Tekshirish'}
                </button>
            )}

            {aiError && (
                <p className="text-amber-500 text-xs text-center bg-amber-500/10 rounded-lg px-3 py-2">
                    ⚠️ {aiError}
                </p>
            )}
        </div>
    );
}
