import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain, CheckCircle, XCircle, ArrowRight, ArrowLeft,
    Clock, Award, TrendingUp, Sparkles, BarChart2
} from 'lucide-react';
import {
    getAssessmentQuestions,
    calculateTopicScores,
    determineUserLevel,
    getLevelName,
    topicNames
} from '../data/assessmentQuestions';

/**
 * Knowledge Assessment Test Component
 * 15-question adaptive test to determine user's physics knowledge level
 */
export default function AssessmentTest({ onComplete, onSkip }) {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [testStarted, setTestStarted] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [timeSpent, setTimeSpent] = useState(0);

    // Initialize test
    useEffect(() => {
        const testQuestions = getAssessmentQuestions();
        setQuestions(testQuestions);
    }, []);

    // Start test
    const handleStartTest = () => {
        setTestStarted(true);
        setStartTime(Date.now());
    };

    // Handle answer selection
    const handleSelectOption = (optionIndex) => {
        if (showExplanation) return; // Prevent changing after submission
        setSelectedOption(optionIndex);
    };

    // Submit answer and move to next
    const handleSubmitAnswer = () => {
        if (selectedOption === null) return;

        const currentQuestion = questions[currentIndex];
        const isCorrect = selectedOption === currentQuestion.correct;

        // Save answer
        const newAnswer = {
            questionId: currentQuestion.id,
            topic: currentQuestion.topic,
            difficulty: currentQuestion.difficulty,
            selectedOption,
            correctOption: currentQuestion.correct,
            isCorrect
        };

        setAnswers([...answers, newAnswer]);
        setShowExplanation(true);
    };

    // Move to next question
    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedOption(null);
            setShowExplanation(false);
        } else {
            // Test completed
            const endTime = Date.now();
            setTimeSpent(Math.round((endTime - startTime) / 1000)); // seconds
            setTestCompleted(true);
        }
    };

    // Move to previous question
    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setSelectedOption(null);
            setShowExplanation(false);
        }
    };

    // Calculate results
    const calculateResults = () => {
        const topicScores = calculateTopicScores(answers);
        const totalCorrect = answers.filter(a => a.isCorrect).length;
        const overallScore = Math.round((totalCorrect / answers.length) * 100);
        const level = determineUserLevel(overallScore);

        return {
            topicScores,
            totalCorrect,
            totalQuestions: answers.length,
            overallScore,
            level,
            timeSpent
        };
    };

    // Complete test and return results
    const handleCompleteTest = () => {
        const results = calculateResults();
        onComplete(results);
    };

    // Render welcome screen
    if (!testStarted) {
        return (
            <WelcomeScreen
                onStart={handleStartTest}
                onSkip={onSkip}
            />
        );
    }

    // Render results screen
    if (testCompleted) {
        const results = calculateResults();
        return (
            <ResultsScreen
                results={results}
                onComplete={handleCompleteTest}
            />
        );
    }

    // Render test questions
    const currentQuestion = questions[currentIndex];
    if (!currentQuestion) return <div>Yuklanmoqda...</div>;

    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white p-4 md:p-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Brain className="text-blue-400" />
                            Bilim Darajasini Aniqlash
                        </h1>
                        <div className="flex items-center gap-2 text-slate-400">
                            <Clock size={18} />
                            <span className="text-sm">
                                {currentIndex + 1} / {questions.length}
                            </span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500"
                        />
                    </div>
                </div>

                {/* Question Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700/50 mb-6"
                    >
                        {/* Question */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full">
                                    {topicNames[currentQuestion.topic]}
                                </span>
                                <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs font-medium rounded-full">
                                    Savol {currentIndex + 1}
                                </span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white">
                                {currentQuestion.question}
                            </h2>
                        </div>

                        {/* Options */}
                        <div className="space-y-3 mb-6">
                            {currentQuestion.options.map((option, index) => {
                                const isSelected = selectedOption === index;
                                const isCorrect = index === currentQuestion.correct;
                                const showCorrect = showExplanation && isCorrect;
                                const showWrong = showExplanation && isSelected && !isCorrect;

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleSelectOption(index)}
                                        disabled={showExplanation}
                                        className={`
                      w-full p-4 rounded-xl text-left transition-all duration-200
                      ${isSelected && !showExplanation ? 'bg-blue-500/20 border-blue-500' : 'bg-slate-700/30 border-slate-600'}
                      ${showCorrect ? 'bg-green-500/20 border-green-500' : ''}
                      ${showWrong ? 'bg-red-500/20 border-red-500' : ''}
                      ${!showExplanation ? 'hover:bg-slate-700/50 cursor-pointer' : 'cursor-not-allowed'}
                      border-2 flex items-center gap-3
                    `}
                                    >
                                        <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                      ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-slate-500'}
                      ${showCorrect ? 'border-green-500 bg-green-500' : ''}
                      ${showWrong ? 'border-red-500 bg-red-500' : ''}
                    `}>
                                            {showCorrect && <CheckCircle size={16} className="text-white" />}
                                            {showWrong && <XCircle size={16} className="text-white" />}
                                            {!showExplanation && isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                        </div>
                                        <span className="flex-1">{option}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Explanation */}
                        {showExplanation && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`
                  p-4 rounded-xl border-2
                  ${selectedOption === currentQuestion.correct
                                        ? 'bg-green-500/10 border-green-500/30'
                                        : 'bg-red-500/10 border-red-500/30'}
                `}
                            >
                                <div className="flex items-start gap-2">
                                    {selectedOption === currentQuestion.correct ? (
                                        <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
                                    ) : (
                                        <XCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                                    )}
                                    <div>
                                        <p className="font-semibold mb-1">
                                            {selectedOption === currentQuestion.correct ? 'To\'g\'ri!' : 'Noto\'g\'ri'}
                                        </p>
                                        <p className="text-sm text-slate-300">
                                            {currentQuestion.explanation}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <ArrowLeft size={18} />
                        Orqaga
                    </button>

                    {!showExplanation ? (
                        <button
                            onClick={handleSubmitAnswer}
                            disabled={selectedOption === null}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Tekshirish
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-medium transition-colors flex items-center gap-2"
                        >
                            {currentIndex < questions.length - 1 ? 'Keyingi' : 'Yakunlash'}
                            <ArrowRight size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

// Welcome Screen Component
function WelcomeScreen({ onStart, onSkip }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
                        <Brain size={48} className="text-white" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">
                        Xush kelibsiz! 👋
                    </h1>
                    <p className="text-xl text-slate-300 mb-2">
                        Sizning bilim darajangizni aniqlash uchun
                    </p>
                    <p className="text-lg text-slate-400">
                        qisqa test topshiring
                    </p>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 mb-6">
                    <h2 className="text-xl font-bold mb-4">Test haqida:</h2>
                    <ul className="space-y-3 text-slate-300">
                        <li className="flex items-start gap-3">
                            <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
                            <span><strong>15 ta savol</strong> - barcha mavzulardan</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Clock className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
                            <span><strong>~10 daqiqa</strong> - vaqt cheklanmagan</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <TrendingUp className="text-purple-400 flex-shrink-0 mt-0.5" size={20} />
                            <span><strong>Shaxsiy reja</strong> - natijaga qarab tayyorlanadi</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Sparkles className="text-yellow-400 flex-shrink-0 mt-0.5" size={20} />
                            <span><strong>AI tavsiyalar</strong> - zaif tomonlaringizni aniqlash</span>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={onStart}
                        className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                    >
                        <Brain size={24} />
                        Testni Boshlash
                    </button>
                    <button
                        onClick={onSkip}
                        className="px-6 py-4 bg-slate-700 hover:bg-slate-600 rounded-xl font-medium transition-colors"
                    >
                        Keyinroq
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

// Results Screen Component
function ResultsScreen({ results, onComplete }) {
    const { topicScores, totalCorrect, totalQuestions, overallScore, level, timeSpent } = results;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getLevelStars = (level) => {
        if (level === 'advanced') return '⭐⭐⭐';
        if (level === 'intermediate') return '⭐⭐';
        return '⭐';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex p-4 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl mb-4">
                        <Award size={48} className="text-white" />
                    </div>
                    <h1 className="text-4xl font-bold mb-2">
                        🎉 Test Yakunlandi!
                    </h1>
                    <p className="text-xl text-slate-300">
                        Sizning natijalaringiz tayyorlandi
                    </p>
                </motion.div>

                {/* Overall Score */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-2 border-blue-500/30 rounded-2xl p-8 mb-6 text-center"
                >
                    <div className="text-6xl font-bold mb-2">{overallScore}%</div>
                    <div className="text-2xl font-semibold mb-2">
                        {getLevelName(level)} {getLevelStars(level)}
                    </div>
                    <div className="text-slate-300">
                        {totalCorrect} / {totalQuestions} to'g'ri javob
                    </div>
                    <div className="text-sm text-slate-400 mt-2">
                        Vaqt: {formatTime(timeSpent)}
                    </div>
                </motion.div>

                {/* Topic Scores */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 mb-6"
                >
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <BarChart2 className="text-blue-400" />
                        Mavzular bo'yicha natijalar
                    </h2>
                    <div className="space-y-4">
                        {Object.entries(topicScores).map(([topic, score]) => (
                            <div key={topic}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium">{topicNames[topic]}</span>
                                    <span className={`
                    font-bold
                    ${score.percentage >= 80 ? 'text-green-400' : ''}
                    ${score.percentage >= 50 && score.percentage < 80 ? 'text-yellow-400' : ''}
                    ${score.percentage < 50 ? 'text-red-400' : ''}
                  `}>
                                        {score.percentage}%
                                    </span>
                                </div>
                                <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${score.percentage}%` }}
                                        transition={{ delay: 0.6, duration: 0.5 }}
                                        className={`
                      absolute inset-y-0 left-0 rounded-full
                      ${score.percentage >= 80 ? 'bg-green-500' : ''}
                      ${score.percentage >= 50 && score.percentage < 80 ? 'bg-yellow-500' : ''}
                      ${score.percentage < 50 ? 'bg-red-500' : ''}
                    `}
                                    />
                                </div>
                                <div className="text-xs text-slate-400 mt-1">
                                    {score.correct} / {score.total} to'g'ri
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* AI Recommendation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-2xl p-6 mb-6"
                >
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-purple-500/10 rounded-xl">
                            <Sparkles className="text-purple-400" size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold mb-2">🤖 AI Tavsiya</h3>
                            <p className="text-slate-300 mb-4">
                                {level === 'beginner' && 'Asoslardan boshlang! Kinematika va Dinamika mavzularini puxta o\'rganing.'}
                                {level === 'intermediate' && 'Yaxshi bilim darajasi! Zaif mavzularni mustahkamlang va qiyin masalalar yeching.'}
                                {level === 'advanced' && 'Ajoyib natija! Murakkab masalalar va olimpiada topshiriqlari bilan mashq qiling.'}
                            </p>
                            <div className="text-sm text-slate-400">
                                Sizning shaxsiy o'quv rejangiz tayyorlandi va dashboard'da ko'rishingiz mumkin.
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Action Button */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    onClick={onComplete}
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                    Dashboard'ga O'tish
                    <ArrowRight size={24} />
                </motion.button>
            </div>
        </div>
    );
}
