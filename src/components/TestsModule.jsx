import React, { useState } from 'react';
import { CheckCircle, AlertCircle, ChevronRight, Play, RotateCcw } from 'lucide-react';
import { testsData } from '../data/testsData';

// 3. TESTLAR MODULI
export default function TestsModule({ addXP, addNotification }) {
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [isTestActive, setIsTestActive] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [testResults, setTestResults] = useState(null);

    // Chapter selection view
    if (!selectedChapter) {
        return <TestChapterGrid onSelect={setSelectedChapter} />;
    }

    // Test results view
    if (showResults && testResults) {
        return (
            <TestResults
                results={testResults}
                chapter={selectedChapter}
                onRetry={() => {
                    setShowResults(false);
                    setIsTestActive(false);
                    setCurrentQuestionIndex(0);
                    setSelectedAnswers({});
                    setTestResults(null);
                }}
                onBack={() => {
                    setSelectedChapter(null);
                    setShowResults(false);
                    setIsTestActive(false);
                    setCurrentQuestionIndex(0);
                    setSelectedAnswers({});
                    setTestResults(null);
                }}
            />
        );
    }

    // Test active view
    if (isTestActive) {
        const currentQuestion = selectedChapter.questions[currentQuestionIndex];
        const isLastQuestion = currentQuestionIndex === selectedChapter.questions.length - 1;

        const handleAnswer = (answerIndex) => {
            setSelectedAnswers({
                ...selectedAnswers,
                [currentQuestion.id]: answerIndex
            });
        };

        const handleNext = () => {
            if (isLastQuestion) {
                // Calculate results
                let correctCount = 0;
                selectedChapter.questions.forEach(q => {
                    if (selectedAnswers[q.id] === q.correctAnswer) {
                        correctCount++;
                    }
                });

                const totalQuestions = selectedChapter.questions.length;
                const percentage = Math.round((correctCount / totalQuestions) * 100);
                const xpEarned = correctCount * 10;

                setTestResults({
                    correctCount,
                    totalQuestions,
                    percentage,
                    xpEarned,
                    answers: selectedAnswers
                });

                // Add XP
                if (addXP) {
                    addXP(xpEarned);
                }

                if (addNotification) {
                    addNotification(`Test tugallandi! +${xpEarned} XP`, 'success');
                }

                setShowResults(true);
            } else {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        };

        return (
            <TestQuizInterface
                question={currentQuestion}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={selectedChapter.questions.length}
                selectedAnswer={selectedAnswers[currentQuestion.id]}
                onAnswer={handleAnswer}
                onNext={handleNext}
                onBack={() => {
                    setIsTestActive(false);
                    setCurrentQuestionIndex(0);
                    setSelectedAnswers({});
                }}
                isLastQuestion={isLastQuestion}
            />
        );
    }

    // Test intro view
    return (
        <TestIntro
            chapter={selectedChapter}
            onStart={() => setIsTestActive(true)}
            onBack={() => setSelectedChapter(null)}
        />
    );
}

// Test Chapter Grid
function TestChapterGrid({ onSelect }) {
    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Fizika Testlari</h2>
                <p className="text-slate-400">Bilimingizni sinab ko'ring va XP yig'ing!</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testsData.chapters.map((chapter) => (
                    <TestChapterCard
                        key={chapter.id}
                        chapter={chapter}
                        onClick={() => onSelect(chapter)}
                    />
                ))}
            </div>
        </div>
    );
}

// Test Chapter Card
function TestChapterCard({ chapter, onClick }) {
    const colorClasses = {
        blue: 'from-blue-600 to-blue-400',
        yellow: 'from-yellow-600 to-yellow-400',
        purple: 'from-purple-600 to-purple-400',
        cyan: 'from-cyan-600 to-cyan-400',
        amber: 'from-amber-600 to-amber-400',
        green: 'from-green-600 to-green-400'
    };

    const difficultyCount = {
        easy: chapter.questions.filter(q => q.difficulty === 'easy').length,
        medium: chapter.questions.filter(q => q.difficulty === 'medium').length,
        hard: chapter.questions.filter(q => q.difficulty === 'hard').length
    };

    return (
        <div
            onClick={onClick}
            className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-blue-500 cursor-pointer transition-all group hover:scale-105"
        >
            <div className="text-6xl mb-4">{chapter.icon}</div>
            <h3 className="text-xl font-bold mb-2">{chapter.title}</h3>
            <p className="text-slate-400 text-sm mb-4">{chapter.questions.length} ta savol</p>

            <div className="space-y-2">
                <div className="flex justify-between text-xs">
                    <span className="text-green-400">🟢 Oson: {difficultyCount.easy}</span>
                    <span className="text-yellow-400">🟡 O'rtacha: {difficultyCount.medium}</span>
                    <span className="text-red-400">🔴 Qiyin: {difficultyCount.hard}</span>
                </div>
                <div className={`h-1 bg-gradient-to-r ${colorClasses[chapter.color]} rounded-full`} />
            </div>
        </div>
    );
}

// Test Intro
function TestIntro({ chapter, onStart, onBack }) {
    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
                <ChevronRight className="rotate-180" size={20} />
                <span>Orqaga</span>
            </button>

            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                <div className="text-center space-y-4 mb-8">
                    <div className="text-6xl">{chapter.icon}</div>
                    <h2 className="text-3xl font-bold">{chapter.title}</h2>
                    <p className="text-slate-400">Bilimingizni sinab ko'ring!</p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-slate-900 rounded-xl p-4 text-center">
                        <div className="text-3xl font-bold text-blue-400">{chapter.questions.length}</div>
                        <div className="text-sm text-slate-400 mt-1">Savollar</div>
                    </div>
                    <div className="bg-slate-900 rounded-xl p-4 text-center">
                        <div className="text-3xl font-bold text-yellow-400">{chapter.questions.length * 10}</div>
                        <div className="text-sm text-slate-400 mt-1">Max XP</div>
                    </div>
                    <div className="bg-slate-900 rounded-xl p-4 text-center">
                        <div className="text-3xl font-bold text-green-400">~{chapter.questions.length * 2}</div>
                        <div className="text-sm text-slate-400 mt-1">Daqiqa</div>
                    </div>
                </div>

                <div className="space-y-3 mb-8">
                    <h4 className="font-bold text-white">Qoidalar:</h4>
                    <ul className="space-y-2 text-slate-300">
                        <li className="flex items-start gap-2">
                            <CheckCircle className="text-green-400 mt-1" size={16} />
                            <span>Har bir to'g'ri javob uchun 10 XP</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="text-green-400 mt-1" size={16} />
                            <span>Savollar turli qiyinlik darajasida</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="text-green-400 mt-1" size={16} />
                            <span>Test oxirida natijalarni ko'rasiz</span>
                        </li>
                    </ul>
                </div>

                <button
                    onClick={onStart}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
                >
                    <Play size={24} />
                    Testni Boshlash
                </button>
            </div>
        </div>
    );
}

// Test Quiz Interface
function TestQuizInterface({ question, questionNumber, totalQuestions, selectedAnswer, onAnswer, onNext, onBack, isLastQuestion }) {
    const difficultyColors = {
        easy: 'text-green-400',
        medium: 'text-yellow-400',
        hard: 'text-red-400'
    };

    const difficultyLabels = {
        easy: 'Oson',
        medium: 'O\'rtacha',
        hard: 'Qiyin'
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <ChevronRight className="rotate-180" size={20} />
                    <span>Chiqish</span>
                </button>

                <div className="text-slate-400">
                    Savol {questionNumber} / {totalQuestions}
                </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
                    style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
                />
            </div>

            {/* Question */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                <div className="flex items-center gap-2 mb-4">
                    <span className={`text-sm font-bold ${difficultyColors[question.difficulty]}`}>
                        {difficultyLabels[question.difficulty]}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-sm text-slate-400">+10 XP</span>
                </div>

                <h3 className="text-2xl font-bold mb-6">{question.question}</h3>

                {/* Options */}
                <div className="space-y-3">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => onAnswer(index)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${selectedAnswer === index
                                ? 'border-blue-500 bg-blue-500/10'
                                : 'border-slate-700 hover:border-slate-600 bg-slate-900'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${selectedAnswer === index
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-slate-700 text-slate-400'
                                    }`}>
                                    {String.fromCharCode(65 + index)}
                                </div>
                                <span className="flex-1">{option}</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Next button */}
                <button
                    onClick={onNext}
                    disabled={selectedAnswer === undefined}
                    className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${selectedAnswer !== undefined
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
                        : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                        }`}
                >
                    {isLastQuestion ? 'Natijani Ko\'rish' : 'Keyingi Savol'}
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}

// Test Results
function TestResults({ results, chapter, onRetry, onBack }) {
    const getGrade = (percentage) => {
        if (percentage >= 90) return { grade: 'A', color: 'text-green-400', message: 'Ajoyib!' };
        if (percentage >= 75) return { grade: 'B', color: 'text-blue-400', message: 'Yaxshi!' };
        if (percentage >= 60) return { grade: 'C', color: 'text-yellow-400', message: 'Qoniqarli' };
        return { grade: 'D', color: 'text-red-400', message: 'Yana harakat qiling' };
    };

    const gradeInfo = getGrade(results.percentage);

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
            <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
                <ChevronRight className="rotate-180" size={20} />
                <span>Testlarga qaytish</span>
            </button>

            {/* Results Card */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                <div className="text-center space-y-6">
                    {/* Grade */}
                    <div>
                        <div className={`text-8xl font-bold ${gradeInfo.color} mb-2`}>{gradeInfo.grade}</div>
                        <div className="text-2xl font-bold text-white mb-1">{gradeInfo.message}</div>
                        <div className="text-slate-400">{chapter.title}</div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-slate-900 rounded-xl p-4">
                            <div className="text-3xl font-bold text-blue-400">{results.correctCount}/{results.totalQuestions}</div>
                            <div className="text-sm text-slate-400 mt-1">To'g'ri javoblar</div>
                        </div>
                        <div className="bg-slate-900 rounded-xl p-4">
                            <div className="text-3xl font-bold text-yellow-400">{results.percentage}%</div>
                            <div className="text-sm text-slate-400 mt-1">Natija</div>
                        </div>
                        <div className="bg-slate-900 rounded-xl p-4">
                            <div className="text-3xl font-bold text-green-400">+{results.xpEarned}</div>
                            <div className="text-sm text-slate-400 mt-1">XP olindi</div>
                        </div>
                    </div>

                    {/* Detailed Results */}
                    <div className="text-left space-y-3">
                        <h4 className="font-bold text-white">Batafsil natijalar:</h4>
                        <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                            {chapter.questions.map((question, index) => {
                                const userAnswer = results.answers[question.id];
                                const isCorrect = userAnswer === question.correctAnswer;

                                return (
                                    <div
                                        key={question.id}
                                        className={`p-4 rounded-xl border ${isCorrect ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            {isCorrect ? (
                                                <CheckCircle className="text-green-400 mt-1" size={20} />
                                            ) : (
                                                <AlertCircle className="text-red-400 mt-1" size={20} />
                                            )}
                                            <div className="flex-1">
                                                <div className="font-bold text-white mb-1">{index + 1}. {question.question}</div>
                                                <div className="text-sm text-slate-400">
                                                    To'g'ri javob: <span className="text-green-400">{question.options[question.correctAnswer]}</span>
                                                </div>
                                                {!isCorrect && userAnswer !== undefined && (
                                                    <div className="text-sm text-red-400">
                                                        Sizning javobingiz: {question.options[userAnswer]}
                                                    </div>
                                                )}
                                                {question.explanation && (
                                                    <div className="text-xs text-slate-500 mt-2 italic">{question.explanation}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            onClick={onRetry}
                            className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                        >
                            <RotateCcw size={20} />
                            Qayta Urinish
                        </button>
                        <button
                            onClick={onBack}
                            className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold transition-all"
                        >
                            Boshqa Test
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
