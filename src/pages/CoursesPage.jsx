import React, { useState, useEffect } from 'react';
import { useGrades } from '../hooks/useGrades';
import { useProgress } from '../hooks/useProgress';
import GradeCard from '../components/darsliklar/GradeCard';
import { BookOpen, ArrowLeft, PlayCircle, Target, Trophy, Zap, ChevronRight, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useXP } from '../contexts/XPContext';
import { useMissions } from '../contexts/MissionsContext';

// ─── Yordamchi: XP bo'yicha level va unvon hisoblash ───────────────────────
function getLevelData(xp) {
    const levels = [
        { min: 0, max: 100, level: 1, title: "Yangi Boshlovchi", color: "from-slate-500 to-slate-400" },
        { min: 100, max: 300, level: 2, title: "Fizika Havaskori", color: "from-blue-600 to-blue-400" },
        { min: 300, max: 600, level: 3, title: "Tajribali O'quvchi", color: "from-indigo-600 to-purple-400" },
        { min: 600, max: 1000, level: 4, title: "Bilim Izlovchi", color: "from-purple-600 to-pink-400" },
        { min: 1000, max: 2000, level: 5, title: "Fizika Ustasi", color: "from-amber-500 to-yellow-400" },
        { min: 2000, max: 9999, level: 6, title: "Professor", color: "from-emerald-500 to-teal-400" },
    ];
    const current = levels.find(l => xp >= l.min && xp < l.max) || levels[levels.length - 1];
    const progress = Math.round(((xp - current.min) / (current.max - current.min)) * 100);
    return { ...current, progress, xpInLevel: xp - current.min, xpToNext: current.max - current.min };
}

// ─── Yordamchi: Oxirgi ko'rilgan dars ──────────────────────────────────────
function getLastLesson() {
    try {
        const raw = localStorage.getItem('lastViewedLesson');
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export default function CoursesPage() {
    const { grades } = useGrades();
    const navigate = useNavigate();
    const { totalXP } = useXP();
    const { dailyMissions } = useMissions();

    // Kunlik topshiriq — Firebase missiyalaridan (LESSON_COMPLETE trigger)
    const lessonMission = dailyMissions.find(m => m.trigger === 'LESSON_COMPLETE') ||
        { current: 0, target: 5, xp: 50 };
    const dailyQuest = { completed: lessonMission.current, target: lessonMission.target };

    // Oxirgi ko'rilgan dars (localStorage — navigation vositasi)
    const lastLesson = getLastLesson();

    // Level ma'lumotlari — real XP dan
    const levelData = getLevelData(totalXP);

    return (
        <div className="h-screen overflow-y-auto custom-scrollbar font-sans text-slate-100">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto p-6 pb-24 min-h-full"
            >
                {/* Top Navigation */}
                <div className="flex items-center justify-between mb-12">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all text-slate-400 hover:text-white"
                    >
                        <ArrowLeft size={18} />
                        <span className="font-medium">Ortga qaytish</span>
                    </button>

                    <div className="px-4 py-1.5 bg-slate-800/80 rounded-full border border-slate-700 shadow-xl">
                        <span className="text-sm font-semibold flex items-center gap-2">
                            <span className="text-blue-400">NurFizika</span>
                            <span className="text-slate-600">|</span>
                            <span>Darsliklar</span>
                        </span>
                    </div>

                    <div className="w-[140px]"></div>
                </div>

                {/* Hero Section */}
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Sinfingizni tanlang
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Hozirda <span className="text-blue-400 font-bold">9-sinf</span> to'liq ishga tushirilgan.
                        Qolgan sinflar tez orada qo'shiladi. 🚀
                    </p>
                </div>

                {/* ═══ GAMIFICATION CARDS ═══ */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-14">

                    {/* 1 — Continue Learning */}
                    <motion.div
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => {
                            if (lastLesson?.path) {
                                navigate(lastLesson.path);
                            } else {
                                navigate('/darsliklar/grade-9');
                            }
                        }}
                        className="cursor-pointer group relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/50 p-5 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
                    >
                        {/* Bg glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2.5 bg-blue-500/15 rounded-xl border border-blue-500/20">
                                    <PlayCircle size={24} className="text-blue-400" />
                                </div>
                                <ChevronRight size={18} className="text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-200 mt-1" />
                            </div>

                            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
                                Davom ettirish
                            </p>
                            <h3 className="text-base font-bold text-white mb-2 leading-snug">
                                Oxirgi darsga qaytish
                            </h3>
                            <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                                {lastLesson?.title
                                    ? `"${lastLesson.title}"`
                                    : 'Hali birorta dars ochmadingiz. Boshlang! 👆'}
                            </p>

                            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
                                <PlayCircle size={12} />
                                {lastLesson ? 'Davom etish' : 'Boshlash'}
                            </div>
                        </div>
                    </motion.div>

                    {/* 2 — Daily Quest */}
                    <motion.div
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        className="cursor-default group relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/50 p-5 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2.5 bg-amber-500/15 rounded-xl border border-amber-500/20">
                                    <Flame size={24} className="text-amber-400" />
                                </div>
                                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                                    +{lessonMission.xp} XP
                                </span>
                            </div>

                            <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                                Kunlik Topshiriq
                            </p>
                            <h3 className="text-base font-bold text-white mb-2">
                                Bugun 5 ta test yeching
                            </h3>

                            {/* Quest Progress */}
                            <div className="mt-3">
                                <div className="flex justify-between items-center mb-1.5">
                                    <span className="text-xs text-slate-500">Bajarildi</span>
                                    <span className="text-xs font-bold text-amber-400">
                                        {dailyQuest.completed}/{dailyQuest.target}
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-slate-700/60 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min((dailyQuest.completed / dailyQuest.target) * 100, 100)}%` }}
                                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                                        className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                                    />
                                </div>
                            </div>

                            <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                                <Zap size={12} className="text-amber-500" />
                                {dailyQuest.completed >= dailyQuest.target
                                    ? <span className="text-emerald-400 font-semibold">✅ Topshiriq bajarildi!</span>
                                    : <span>Yana {dailyQuest.target - dailyQuest.completed} ta qoldi</span>
                                }
                            </div>
                        </div>
                    </motion.div>

                    {/* 3 — Level & XP */}
                    <motion.div
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => navigate('/progress')}
                        className="cursor-pointer group relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/50 p-5 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2.5 bg-purple-500/15 rounded-xl border border-purple-500/20">
                                    <Trophy size={24} className="text-purple-400" />
                                </div>
                                <div className={`text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${levelData.color} text-white shadow-sm`}>
                                    Lv. {levelData.level}
                                </div>
                            </div>

                            <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
                                Sizning Darajangiz
                            </p>
                            <h3 className="text-base font-bold text-white mb-0.5">
                                Level {levelData.level}: {levelData.title}
                            </h3>
                            <p className="text-xs text-slate-500 mb-3">
                                {userData.xp} XP to'plandi
                            </p>

                            {/* XP Progress */}
                            <div>
                                <div className="flex justify-between items-center mb-1.5">
                                    <span className="text-xs text-slate-500">Keyingi levelgacha</span>
                                    <span className="text-xs font-bold text-purple-400">
                                        {levelData.xpInLevel}/{levelData.xpToNext} XP
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-slate-700/60 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${levelData.progress}%` }}
                                        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.4 }}
                                        className={`h-full bg-gradient-to-r ${levelData.color} rounded-full`}
                                    />
                                </div>
                            </div>

                            <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 bg-purple-500/10 px-3 py-1.5 rounded-full border border-purple-500/20">
                                <BookOpen size={12} />
                                Progressni ko'rish
                            </div>
                        </div>
                    </motion.div>

                </div>
                {/* ═══════════════════════════ */}

                {/* Grades Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {grades.map(grade => (
                        <div key={grade.id} className="h-full">
                            <GradeCard grade={grade} />
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
