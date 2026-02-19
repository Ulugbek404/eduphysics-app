
import React, { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw, Trophy } from 'lucide-react';

export default function LessonQuiz({ lessonId, onComplete }) {
    // Mock questions generator (since we don't have real DB yet)
    const questions = [
        {
            id: 1,
            question: "Tezlikning birligi nima?",
            options: ["m/s", "km/soat", "m/s²", "N"],
            correct: 0,
            explanation: "Xalqaro birliklar sistemasida (SI) tezlik birligi m/s (metr sekund) qabul qilingan."
        },
        {
            id: 2,
            question: "Vektors kattalik bu magistr...",
            options: ["Faqat qiymatga ega", "Yo'nalishga ega", "Ham qiymat, ham yo'nalishga ega", "Massaga ega"],
            correct: 2,
            explanation: "Vektor kattaliklar ham son qiymatga, ham yo'nalishga ega bo'ladi."
        },
        {
            id: 3,
            question: "S = v * t formulasi nimani anglatadi?",
            options: ["Tezlik", "Yo'l", "Vaqt", "Kuch"],
            correct: 1,
            explanation: "S - yo'l, v - tezlik, t - vaqt. Bu to'g'ri chiziqli tekis harakat formulasi."
        }
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);

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
            const finalScore = Math.round(((score + (selectedOption === questions[currentQuestion].correct ? 1 : 0)) / questions.length) * 100);
            if (onComplete) onComplete(finalScore);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
        setIsAnswerChecked(false);
    };

    if (showResult) {
        const finalPercentage = Math.round((score / questions.length) * 100);
        return (
            <div className="text-center p-8 bg-slate-800 rounded-2xl border border-slate-700">
                <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trophy className={finalPercentage >= 80 ? 'text-yellow-400' : 'text-slate-400'} size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Test Yakunlandi!</h3>
                <p className="text-slate-400 mb-6">Sizning natijangiz:</p>
                <div className="text-4xl font-bold text-blue-400 mb-8">{finalPercentage}%</div>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={restartQuiz}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors text-white"
                    >
                        <RefreshCw size={20} />
                        Qayta ishlash
                    </button>
                </div>
            </div>
        );
    }

    const question = questions[currentQuestion];

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="flex justify-between items-center mb-6">
                <span className="text-slate-400 text-sm">Savol {currentQuestion + 1} / {questions.length}</span>
                <span className="text-slate-400 text-sm">Ball: {score}</span>
            </div>

            {/* Question */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">{question.question}</h3>

                <div className="space-y-3">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionSelect(index)}
                            disabled={isAnswerChecked}
                            className={`w-full p-4 text-left rounded-xl border transition-all ${isAnswerChecked
                                    ? index === question.correct
                                        ? 'bg-green-500/10 border-green-500 text-green-400'
                                        : index === selectedOption
                                            ? 'bg-red-500/10 border-red-500 text-red-400'
                                            : 'bg-slate-700/50 border-slate-700 text-slate-400'
                                    : selectedOption === index
                                        ? 'bg-blue-500/10 border-blue-500 text-blue-400'
                                        : 'bg-slate-700/50 border-slate-700 text-slate-300 hover:bg-slate-700'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <span>{option}</span>
                                {isAnswerChecked && index === question.correct && <CheckCircle size={20} className="text-green-500" />}
                                {isAnswerChecked && index === selectedOption && index !== question.correct && <XCircle size={20} className="text-red-500" />}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Explanation & Next Button */}
            {isAnswerChecked && (
                <div className="animate-fadeIn">
                    <div className={`p-4 rounded-xl mb-6 ${selectedOption === question.correct
                            ? 'bg-green-500/10 border border-green-500/20'
                            : 'bg-red-500/10 border border-red-500/20'
                        }`}>
                        <p className="text-sm text-slate-300">
                            <span className="font-bold block mb-1">Izoh:</span>
                            {question.explanation}
                        </p>
                    </div>

                    <button
                        onClick={nextQuestion}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-500/20"
                    >
                        {currentQuestion < questions.length - 1 ? 'Keyingi savol' : 'Natijani ko\'rish'}
                    </button>
                </div>
            )}

            {!isAnswerChecked && (
                <button
                    onClick={checkAnswer}
                    disabled={selectedOption === null}
                    className={`w-full py-4 font-bold rounded-xl transition-all ${selectedOption !== null
                            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                >
                    Tekshirish
                </button>
            )}
        </div>
    );
}
