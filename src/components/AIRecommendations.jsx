import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Target, BookOpen, AlertCircle, Loader, ChevronRight } from 'lucide-react';
import { analyzeProgress } from '../services/aiService';

/**
 * AI Recommendations Component
 * 
 * O'quvchi uchun shaxsiylashtirilgan tavsiyalar va progress tahlili
 */

export default function AIRecommendations({
    userStats,
    completedLessons,
    userLevel,
    theme = 'dark'
}) {
    const [analysis, setAnalysis] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    // Theme classes
    const themeClasses = {
        dark: {
            bg: 'bg-slate-800',
            border: 'border-slate-700',
            text: 'text-white',
            textMuted: 'text-slate-400',
            card: 'bg-slate-900',
        },
        white: {
            bg: 'bg-white',
            border: 'border-gray-200',
            text: 'text-gray-900',
            textMuted: 'text-gray-600',
            card: 'bg-gray-50',
        },
        black: {
            bg: 'bg-gray-950',
            border: 'border-gray-800',
            text: 'text-white',
            textMuted: 'text-gray-400',
            card: 'bg-black',
        }
    };

    const tc = themeClasses[theme] || themeClasses.dark;

    // Progress tahlilini olish
    const fetchAnalysis = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await analyzeProgress({
                userStats,
                completedLessons,
                testResults: [], // Bu yerda test natijalarini qo'shish mumkin
                userLevel
            });

            if (result.success) {
                setAnalysis(result.analysis);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('Tahlil qilishda xatolik yuz berdi');
        } finally {
            setIsLoading(false);
        }
    };

    // Component mount bo'lganda avtomatik tahlil qilish
    useEffect(() => {
        if (userStats && userStats.testsSolved > 0) {
            fetchAnalysis();
        }
    }, []);

    // Loading state
    if (isLoading) {
        return (
            <div className={`${tc.bg} rounded-2xl border ${tc.border} p-8 text-center`}>
                <Loader className="animate-spin mx-auto mb-4 text-blue-500" size={40} />
                <p className={tc.textMuted}>AI tahlil qilmoqda...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className={`${tc.bg} rounded-2xl border ${tc.border} p-6`}>
                <div className="flex items-start gap-3">
                    <AlertCircle className="text-red-500 flex-shrink-0" size={24} />
                    <div>
                        <h3 className={`font-bold ${tc.text} mb-1`}>Xatolik</h3>
                        <p className={tc.textMuted}>{error}</p>
                        <button
                            onClick={fetchAnalysis}
                            className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            Qaytadan urinish
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // No data state
    if (!analysis && userStats?.testsSolved === 0) {
        return (
            <div className={`${tc.bg} rounded-2xl border ${tc.border} p-8 text-center`}>
                <Sparkles className="mx-auto mb-4 text-slate-500" size={48} />
                <h3 className={`font-bold ${tc.text} mb-2`}>AI Tavsiyalar</h3>
                <p className={tc.textMuted}>
                    Tavsiyalar olish uchun birinchi testlarni yeching va darslarni o'qing.
                </p>
                <button
                    onClick={fetchAnalysis}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-medium transition-all"
                >
                    Tahlil qilish
                </button>
            </div>
        );
    }

    // Main content
    if (!analysis) return null;

    return (
        <div className="space-y-4">
            {/* Overall Assessment */}
            <div className={`${tc.bg} rounded-2xl border ${tc.border} p-6 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 p-6 opacity-10">
                    <Sparkles size={80} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="text-yellow-500" size={24} />
                        <h3 className={`text-xl font-bold ${tc.text}`}>AI Tahlili</h3>
                    </div>
                    <p className={`${tc.text} leading-relaxed`}>{analysis.overallAssessment}</p>
                </div>
            </div>

            {/* Strengths and Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Strengths */}
                <div className={`${tc.bg} rounded-2xl border ${tc.border} p-6`}>
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="text-green-500" size={20} />
                        <h4 className={`font-bold ${tc.text}`}>Kuchli Tomonlar</h4>
                    </div>
                    <ul className="space-y-2">
                        {analysis.strengths?.map((strength, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                <span className={tc.textMuted}>{strength}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Weaknesses */}
                <div className={`${tc.bg} rounded-2xl border ${tc.border} p-6`}>
                    <div className="flex items-center gap-2 mb-4">
                        <Target className="text-orange-500" size={20} />
                        <h4 className={`font-bold ${tc.text}`}>Yaxshilash Kerak</h4>
                    </div>
                    <ul className="space-y-2">
                        {analysis.weaknesses?.map((weakness, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                                <span className="text-orange-500 mt-1">→</span>
                                <span className={tc.textMuted}>{weakness}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Recommendations */}
            <div className={`${tc.bg} rounded-2xl border ${tc.border} p-6`}>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <BookOpen className="text-blue-500" size={20} />
                        <h4 className={`font-bold ${tc.text}`}>Tavsiyalar</h4>
                    </div>
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className={`text-sm ${tc.textMuted} hover:text-blue-500 flex items-center gap-1`}
                    >
                        {showDetails ? 'Yashirish' : 'Batafsil'}
                        <ChevronRight size={16} className={`transition-transform ${showDetails ? 'rotate-90' : ''}`} />
                    </button>
                </div>

                <div className="space-y-3">
                    {analysis.recommendations?.map((rec, idx) => (
                        <div
                            key={idx}
                            className={`${tc.card} rounded-xl p-4 border ${tc.border} ${rec.priority === 'high' ? 'border-l-4 border-l-red-500' :
                                    rec.priority === 'medium' ? 'border-l-4 border-l-yellow-500' :
                                        'border-l-4 border-l-green-500'
                                }`}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                    <h5 className={`font-bold ${tc.text} mb-1`}>{rec.title}</h5>
                                    {showDetails && (
                                        <p className={`text-sm ${tc.textMuted}`}>{rec.description}</p>
                                    )}
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${rec.priority === 'high' ? 'bg-red-500/10 text-red-500' :
                                        rec.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-500' :
                                            'bg-green-500/10 text-green-500'
                                    }`}>
                                    {rec.priority === 'high' ? 'Muhim' : rec.priority === 'medium' ? 'O\'rtacha' : 'Past'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Next Steps */}
            <div className={`${tc.bg} rounded-2xl border ${tc.border} p-6`}>
                <h4 className={`font-bold ${tc.text} mb-4`}>Keyingi Qadamlar</h4>
                <div className="space-y-2">
                    {analysis.nextSteps?.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-sm font-bold">
                                {idx + 1}
                            </span>
                            <p className={tc.textMuted}>{step}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Motivational Message */}
            {analysis.motivationalMessage && (
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                    <p className="text-center font-medium leading-relaxed">
                        {analysis.motivationalMessage}
                    </p>
                </div>
            )}

            {/* Refresh Button */}
            <div className="text-center">
                <button
                    onClick={fetchAnalysis}
                    className={`text-sm ${tc.textMuted} hover:text-blue-500 underline`}
                >
                    Tahlilni yangilash
                </button>
            </div>
        </div>
    );
}
