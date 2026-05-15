import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Sparkles, TrendingUp, Target, BookOpen,
    AlertCircle, RefreshCw, Flame, Zap
} from 'lucide-react';
import { analyzeProgress } from '../services/aiService';
import { useXP, calcLevel } from '../contexts/XPContext';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';

function Skeleton({ className }) {
    return <div className={`animate-pulse theme-bg rounded-xl ${className}`} />;
}

function LoadingSkeleton() {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map(i => (
                <div key={i} className="rounded-2xl border theme-border theme-card p-5 space-y-3">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-4/5" />
                </div>
            ))}
        </div>
    );
}

function InfoCard({ icon: Icon, iconColor, title, items, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ delay, type: "spring", stiffness: 300, damping: 20 }}
            className="rounded-2xl border theme-border theme-card backdrop-blur-sm p-5 hover:shadow-lg hover:shadow-indigo-500/10 transition-shadow duration-300"
        >
            <div className="flex items-center gap-2 mb-3">
                <Icon size={18} className={iconColor} />
                <h4 className="theme-text font-semibold text-sm">{title}</h4>
            </div>
            <ul className="space-y-2">
                {items?.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 theme-text-secondary text-sm">
                        <span className={`${iconColor} mt-0.5 flex-shrink-0`}>•</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

export default function AIRecommendations({ userStats, completedLessons, userLevel }) {
    const { totalXP } = useXP();
    const { user } = useAuth();
    const progressCtx = useProgress?.();

    const [analysis, setAnalysis] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const level = calcLevel(totalXP);

    const fetchAnalysis = async () => {
        setIsLoading(true);
        setError(null);
        setAnalysis(null); // ✅ Har safar yangi tavsiya uchun tozalanadi

        try {
            const result = await analyzeProgress({
                totalXP,
                currentLevel: level,
                completedTopics: completedLessons || progressCtx?.completedLessons || [],
                testScores: progressCtx?.gradeStats || {},
                streakDays: userStats?.streak || 0,
            });

            if (result.success) {
                setAnalysis(result.analysis);
            } else {
                setError(result.error || 'Tahlil olinmadi');
            }
        } catch (err) {
            setError("Tarmoq xatoligi. Qayta urinib ko'ring.");
        } finally {
            setIsLoading(false);
        }
    };

    // ── Loading ──
    if (isLoading) return <LoadingSkeleton />;

    // ── Error ──
    if (error) {
        return (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
                <div className="flex items-start gap-3">
                    <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                        <p className="text-red-300 text-sm mb-3">{error}</p>
                        <button onClick={fetchAnalysis}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-sm transition-all">
                            <RefreshCw size={14} /> Qayta urinish
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── Boshlang'ich holat — tugma ko'rsatiladi ──
    if (!analysis) {
        return (
            <div className="rounded-2xl border theme-border theme-card backdrop-blur-sm p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600/30 to-violet-600/30 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4">
                    <Sparkles size={32} className="text-indigo-400" />
                </div>
                <h3 className="theme-text font-bold text-lg mb-2">AI shaxsiy tavsiyalar</h3>
                <p className="theme-text-secondary text-sm mb-6 max-w-xs mx-auto">
                    Sun'iy intellekt sizning o'qish statistikangizni tahlil qilib, 
                    shaxsiy tavsiyalar beradi.
                </p>
                <button
                    onClick={fetchAnalysis}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95"
                >
                    <Sparkles size={16} />
                    AI Tahlilini boshlash
                </button>
            </div>
        );
    }

    // ── Natija ──
    return (
        <div className="space-y-4">
            {/* Overall banner */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded-2xl overflow-hidden theme-card border theme-border p-5"
            >
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={18} className="text-yellow-400" />
                        <span className="theme-text font-bold text-sm">AI Tahlili</span>
                        <span className="ml-auto theme-text-secondary text-xs">Daraja {level} · {totalXP.toLocaleString()} XP</span>
                    </div>
                    <p className="theme-text-secondary text-sm leading-relaxed">{analysis.overallAssessment}</p>
                </div>
            </motion.div>

            {/* Strengths + Weaknesses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard icon={TrendingUp} iconColor="text-emerald-400" title="💪 Kuchli tomonlar"
                    items={analysis.strengths} delay={0.05} />
                <InfoCard icon={Target} iconColor="text-amber-400" title="📈 Rivojlantirish kerak"
                    items={analysis.weaknesses} delay={0.1} />
            </div>

            {/* Recommendation */}
            {analysis.recommendation && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                    className="flex items-start gap-3 rounded-2xl border border-indigo-200 dark:border-indigo-800/30 bg-indigo-50 dark:bg-indigo-950/40 p-4"
                >
                    <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-600/30 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                        <BookOpen size={16} className="text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <div>
                        <p className="theme-text-secondary text-xs mb-1">🎯 Keyingi tavsiya</p>
                        <p className="theme-text text-sm font-semibold">{analysis.recommendation}</p>
                    </div>
                </motion.div>
            )}

            {/* Motivational message */}
            {analysis.motivationalMsg && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="relative overflow-hidden bg-violet-50 dark:bg-gradient-to-r dark:from-violet-600/20 dark:to-indigo-600/20 border border-violet-200 dark:border-violet-500/20 rounded-2xl p-5 text-center"
                >
                    <Flame size={32} className="mx-auto mb-2 text-orange-400" />
                    <p className="theme-text font-semibold text-sm leading-relaxed">{analysis.motivationalMsg}</p>
                </motion.div>
            )}

            {/* Next steps */}
            {analysis.nextSteps?.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                    className="rounded-2xl border theme-border theme-card p-5"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Zap size={16} className="text-indigo-500 dark:text-indigo-400" />
                        <h4 className="theme-text font-semibold text-sm">Keyingi qadamlar</h4>
                    </div>
                    <div className="space-y-2">
                        {analysis.nextSteps.map((step, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-600/20 border border-indigo-200 dark:border-indigo-500/30 text-indigo-500 dark:text-indigo-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                    {i + 1}
                                </span>
                                <p className="theme-text-secondary text-sm">{step}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* ✅ Yangi tavsiya tugmasi */}
            <div className="text-center pt-2">
                <button
                    onClick={fetchAnalysis}
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 px-5 py-2.5 theme-surface hover:theme-bg border theme-border theme-text-secondary hover:theme-text rounded-xl text-sm font-medium transition-all"
                >
                    <RefreshCw size={14} />
                    Yangi tavsiya olish
                </button>
            </div>
        </div>
    );
}
