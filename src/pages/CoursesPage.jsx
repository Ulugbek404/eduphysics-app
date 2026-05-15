import React, { useState, useEffect } from 'react';
import { useGrades } from '../hooks/useGrades';
import { useProgress } from '../hooks/useProgress';
import GradeCard from '../components/darsliklar/GradeCard';
import { BookOpen, ArrowLeft, PlayCircle, Target, Trophy, Zap, ChevronRight, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useXP } from '../contexts/XPContext';
import { useMissions } from '../contexts/MissionsContext';

// ─── Yordamchi: XP bo'yicha level va unvon hisoblash ───────────────────────
function getLevelData(xp) {
    const levels = [
        { min: 0, max: 100, level: 1, title: "Yangi boshlovchi", color: "from-slate-500 to-slate-400" },
        { min: 100, max: 300, level: 2, title: "Fizika havaskori", color: "from-blue-600 to-blue-400" },
        { min: 300, max: 600, level: 3, title: "Tajribali o'quvchi", color: "from-teal-600 to-teal-400" },
        { min: 600, max: 1000, level: 4, title: "Bilim izlovchi", color: "from-purple-600 to-pink-400" },
        { min: 1000, max: 2000, level: 5, title: "Fizika ustasi", color: "from-amber-500 to-yellow-400" },
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
    const { t } = useLanguage();
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
        <div className="h-screen overflow-y-auto custom-scrollbar theme-bg theme-text font-sans">
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
                        className="flex items-center gap-2 px-4 py-2 theme-card theme-card-hover rounded-xl border-[0.5px] theme-border transition-all theme-muted hover:theme-text"
                    >
                        <ArrowLeft size={18} />
                        <span className="font-medium">{t('nav_back') || 'Ortga qaytish'}</span>
                    </button>

                    <div className="px-4 py-1.5 theme-card rounded-full border-[0.5px] theme-border">
                        <span className="text-sm font-semibold flex items-center gap-2">
                            <span className="text-[#0d9488]">NurFizika</span>
                            <span className="theme-muted">|</span>
                            <span className="theme-text">{t('nav_lessons') || 'Darsliklar'}</span>
                        </span>
                    </div>

                    <div className="w-[140px]"></div>
                </div>

                {/* Hero Section */}
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold theme-text mb-4">
                        {t('courses_select_grade') || 'Sinfingizni tanlang'}
                    </h1>
                    <p className="theme-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
                        {t('courses_grade_desc') || "Hozirda 9-sinf to'liq ishga tushirilgan. Qolgan sinflar tez orada qo'shiladi. 🚀"}
                    </p>
                </div>

                {/* ═══ GAMIFICATION CARDS ═══ */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-14">

                    {/* 1 — Continue Learning */}
                    <div
                        onClick={() => {
                            if (lastLesson?.path) {
                                navigate(lastLesson.path);
                            } else {
                                navigate('/darsliklar/grade-9');
                            }
                        }}
                        className="cursor-pointer group theme-card border-[0.5px] theme-border rounded-2xl p-5 hover:-translate-y-1 transition-all duration-200"
                        style={{ '--hover-border': 'var(--brand-400)' }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand-400)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2.5 rounded-xl" style={{ backgroundColor: 'rgba(13,148,136,0.12)', color: '#0d9488' }}>
                                <PlayCircle size={20} strokeWidth={2} />
                            </div>
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-all duration-200 mt-1 text-[#0d9488]" style={{ color: 'var(--text-muted)' }} />
                        </div>

                        <p className="text-[11px] font-semibold text-[#0d9488] tracking-wider mb-1 uppercase">
                            {t('courses_continue') || 'Davom ettirish'}
                        </p>
                        <h3 className="text-[15px] font-bold theme-text mb-2 leading-snug">
                            {t('courses_back_to_last') || 'Oxirgi darsga qaytish'}
                        </h3>
                        <p className="text-[13px] theme-muted line-clamp-2 leading-relaxed">
                            {lastLesson?.title
                                ? `"${lastLesson.title}"`
                                : (t('courses_no_last_lesson') || 'Hali birorta dars ochmadingiz. Boshlang! 👆')}
                        </p>

                        <div
                            className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#0d9488] px-3 py-1.5 rounded-md border-[0.5px]"
                            style={{ backgroundColor: 'rgba(13,148,136,0.1)', borderColor: 'var(--border-brand-soft)' }}
                        >
                            <PlayCircle size={14} />
                            {lastLesson ? (t('common_continue') || 'Davom etish') : (t('common_start') || 'Boshlash')}
                        </div>
                    </div>

                    {/* 2 — Daily Quest */}
                    <div
                        className="group theme-card border-[0.5px] theme-border rounded-2xl p-5 hover:-translate-y-1 transition-all duration-200"
                        onMouseEnter={e => e.currentTarget.style.borderColor = '#f59e0b'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-xl">
                                <Flame size={20} strokeWidth={2} />
                            </div>
                            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-md border-[0.5px] border-amber-500/20">
                                +{lessonMission.xp} XP
                            </span>
                        </div>

                        <p className="text-[11px] font-semibold text-amber-600 dark:text-amber-500 tracking-wider mb-1 uppercase">
                            {t('courses_daily_quest') || 'Kunlik Topshiriq'}
                        </p>
                        <h3 className="text-[15px] font-bold theme-text mb-2">
                            {t('courses_quest_desc') || 'Bugun 5 ta test yeching'}
                        </h3>

                        {/* Quest Progress */}
                        <div className="mt-3">
                            <div className="flex justify-between items-center mb-1.5">
                                <span className="text-[12px] theme-muted">{t('common_completed') || 'Bajarildi'}</span>
                                <span className="text-[12px] font-bold text-amber-600 dark:text-amber-500">
                                    {dailyQuest.completed}/{dailyQuest.target}
                                </span>
                            </div>
                            <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                                <div
                                    className="h-full bg-amber-500 rounded-full transition-all duration-1000"
                                    style={{ width: `${Math.min((dailyQuest.completed / dailyQuest.target) * 100, 100)}%` }}
                                />
                            </div>
                        </div>

                        <div className="mt-3 flex items-center gap-1.5 text-[12px] theme-muted">
                            <Zap size={14} className="text-amber-600 dark:text-amber-500" />
                            {dailyQuest.completed >= dailyQuest.target
                                ? <span className="text-[#0d9488] font-semibold">{t('courses_quest_done') || '✅ Topshiriq bajarildi!'}</span>
                                : <span>{(t('courses_quest_left') || 'Yana {n} ta qoldi').replace('{n}', dailyQuest.target - dailyQuest.completed)}</span>
                            }
                        </div>
                    </div>

                    {/* 3 — Level & XP */}
                    <div
                        onClick={() => navigate('/progress')}
                        className="cursor-pointer group theme-card border-[0.5px] theme-border rounded-2xl p-5 hover:-translate-y-1 transition-all duration-200"
                        onMouseEnter={e => e.currentTarget.style.borderColor = '#8b5cf6'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl">
                                <Trophy size={20} strokeWidth={2} />
                            </div>
                            <div className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-purple-500 text-white-fixed">
                                Lv. {levelData.level}
                            </div>
                        </div>

                        <p className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 tracking-wider mb-1 uppercase">
                            {t('courses_your_level') || 'Sizning Darajangiz'}
                        </p>
                        <h3 className="text-[15px] font-bold theme-text mb-0.5">
                            {(t('courses_level_title') || 'Level {level}: {title}').replace('{level}', levelData.level).replace('{title}', levelData.title)}
                        </h3>
                        <p className="text-[12px] theme-muted mb-3">
                            {(t('courses_xp_collected') || "{xp} XP to'plandi").replace('{xp}', totalXP)}
                        </p>

                        {/* XP Progress */}
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <span className="text-[12px] theme-muted">{t('courses_next_level') || 'Keyingi levelgacha'}</span>
                                <span className="text-[12px] font-bold text-purple-600 dark:text-purple-400">
                                    {levelData.xpInLevel}/{levelData.xpToNext} XP
                                </span>
                            </div>
                            <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                                <div
                                    className="h-full bg-purple-500 rounded-full transition-all duration-1000"
                                    style={{ width: `${levelData.progress}%` }}
                                />
                            </div>
                        </div>

                        <div className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3 py-1.5 rounded-md border-[0.5px] border-purple-500/20">
                            <BookOpen size={14} />
                            {t('courses_view_progress') || "Progressni ko'rish"}
                        </div>
                    </div>

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
