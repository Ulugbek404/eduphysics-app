import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Target, BookOpen, ClipboardList, Bot,
    Flame, FlaskConical, GraduationCap, Trophy,
    CheckCircle, Lock, Zap, Star
} from 'lucide-react';
import { useXP, calcLevel, xpForNextLevel, xpInCurrentLevel } from '../contexts/XPContext';
import { useMissions } from '../contexts/MissionsContext';
import { useLanguage } from '../contexts/LanguageContext';
import LeaderboardTab from '../components/leaderboard/LeaderboardTab';

// ─── Icon Map ─────────────────────────────────────────────────────────────────
const ICON_MAP = {
    BookOpen: <BookOpen size={20} />,
    ClipboardList: <ClipboardList size={20} />,
    Bot: <Bot size={20} />,
    Flame: <Flame size={20} />,
    FlaskConical: <FlaskConical size={20} />,
    GraduationCap: <GraduationCap size={20} />,
};

// ─── XP Level Bar ─────────────────────────────────────────────────────────────
function XPBar({ totalXP }) {
    const { t } = useLanguage();
    const level = calcLevel(totalXP);
    const inLevel = xpInCurrentLevel(totalXP);
    const needed = 500;
    const pct = Math.min((inLevel / needed) * 100, 100);

    return (
        <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
                <span className="theme-text font-bold text-[14px]">{t('missions_level') || 'Daraja'} {level}</span>
                <span className="theme-muted text-[13px] font-medium">{inLevel} / {needed} XP</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full bg-[#0d9488]"
                />
            </div>
            <p className="theme-muted text-[12px] mt-2 font-medium">{t('missions_to_next') || 'Keyingi darajaga:'} {needed - inLevel} XP</p>
        </div>
    );
}

// ─── Mission Card ─────────────────────────────────────────────────────────────
function MissionCard({ mission, index }) {
    const { t } = useLanguage();
    const { completed, current, target, title, xp, icon } = mission;
    const pct = Math.min((current / target) * 100, 100);

    return (
        <div
            className="relative rounded-2xl border-[0.5px] p-5 transition-all duration-300"
            style={{
                backgroundColor: completed ? 'var(--sidebar-item-active-bg)' : 'var(--bg-card)',
                borderColor: completed ? 'var(--border-brand-soft)' : 'var(--border-color)',
            }}
            onMouseEnter={e => { if (!completed) e.currentTarget.style.borderColor = 'var(--brand-400)'; }}
            onMouseLeave={e => { if (!completed) e.currentTarget.style.borderColor = 'var(--border-color)'; }}
        >
            <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border-[0.5px]"
                    style={{
                        backgroundColor: completed ? 'var(--bg-card)' : 'var(--bg-primary)',
                        borderColor: completed ? 'var(--border-brand-soft)' : 'var(--border-color)',
                        color: completed ? '#0d9488' : 'var(--text-muted)',
                    }}
                >
                    {ICON_MAP[icon] || <Target size={20} />}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <h3
                            className="font-bold text-[15px]"
                            style={{ color: completed ? '#0d9488' : 'var(--text-primary)' }}
                        >
                            {title}
                        </h3>
                        <span
                            className="flex-shrink-0 flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-sm border-[0.5px]"
                            style={{
                                backgroundColor: completed ? 'var(--bg-card)' : 'var(--bg-primary)',
                                borderColor: completed ? 'var(--border-brand-soft)' : 'var(--border-color)',
                                color: completed ? '#0d9488' : 'var(--text-secondary)',
                            }}
                        >
                            <Zap size={10} /> +{xp} XP
                        </span>
                    </div>

                    {/* Progress bar */}
                    <div
                        className="h-1.5 rounded-full overflow-hidden mb-2 border-[0.5px]"
                        style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
                    >
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.06 }}
                            className={`h-full rounded-full transition-all ${completed ? 'bg-[#0d9488]' : 'bg-[#14b8a6]'}`}
                        />
                    </div>

                    <p className="theme-text-secondary text-[13px] font-medium">
                        {completed
                            ? `✓ ${t('missions_completed') || 'Bajarildi!'}`
                            : `${current}/${target} ${t('missions_completed_lower') || 'bajarildi'}`}
                    </p>
                </div>
            </div>

            {/* Completed overlay checkmark */}
            {completed && (
                <div className="absolute top-4 right-4">
                    <CheckCircle size={20} className="text-[#0d9488]" />
                </div>
            )}
        </div>
    );
}

// ─── Achievement Card ─────────────────────────────────────────────────────────
function AchievementCard({ ach, index }) {
    const { t } = useLanguage();
    return (
        <div
            className="relative rounded-2xl border-[0.5px] p-6 text-center transition-all duration-300"
            style={{
                backgroundColor: ach.earned ? 'rgba(234,179,8,0.08)' : 'var(--bg-card)',
                borderColor: ach.earned ? 'rgba(234,179,8,0.3)' : 'var(--border-color)',
            }}
        >
            {/* Emoji icon */}
            <div className={`text-[40px] mb-4 transition-all ${ach.earned ? '' : 'grayscale opacity-40'}`}>
                {ach.icon}
            </div>

            <h3
                className="font-bold text-[15px] mb-2"
                style={{ color: ach.earned ? '#b45309' : 'var(--text-muted)' }}
            >
                {ach.title}
            </h3>
            <p
                className="text-[13px] mb-4 leading-relaxed"
                style={{ color: ach.earned ? '#d97706' : 'var(--text-muted)', opacity: ach.earned ? 1 : 0.7 }}
            >
                {ach.desc}
            </p>

            <span
                className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-md border-[0.5px]"
                style={{
                    backgroundColor: ach.earned ? 'var(--bg-card)' : 'var(--bg-primary)',
                    borderColor: ach.earned ? 'rgba(234,179,8,0.3)' : 'var(--border-color)',
                    color: ach.earned ? '#b45309' : 'var(--text-muted)',
                }}
            >
                <Star size={12} /> +{ach.xp} XP
            </span>

            {/* Lock overlay */}
            {!ach.earned && (
                <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
                    <div
                        className="rounded-md px-3 py-1.5 flex items-center gap-1.5 border-[0.5px]"
                        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
                    >
                        <Lock size={12} className="theme-muted" />
                        <span className="theme-muted text-[11px] font-bold uppercase tracking-wider">{t('missions_locked') || 'Qulflangan'}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── TABS ─────────────────────────────────────────────────────────────────────
const getTabs = (t) => [
    { id: 'daily', label: t('missions_daily') || 'Kunlik', icon: <Target size={15} /> },
    { id: 'weekly', label: t('missions_weekly') || 'Haftalik', icon: <Flame size={15} /> },
    { id: 'achieve', label: t('missions_achievements') || 'Yutuqlar', icon: <Trophy size={15} /> },
    { id: 'reyting', label: t('missions_rating') || 'Reyting', icon: <Trophy size={15} className="text-yellow-500" /> },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MissionsPage() {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { totalXP } = useXP();
    const { dailyMissions, weeklyMissions, achievements } = useMissions();
    const [activeTab, setActiveTab] = useState('daily');

    const dailyDone = dailyMissions.filter(m => m.completed).length;
    const weeklyDone = weeklyMissions.filter(m => m.completed).length;
    const achieveDone = achievements.filter(a => a.earned).length;

    return (
        <div className="h-screen overflow-y-auto custom-scrollbar theme-bg font-sans">
            <div className="max-w-3xl mx-auto px-6 pb-24 pt-8">

                {/* Back */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 theme-muted hover:theme-text transition-colors mb-6 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-semibold text-[14px]">{t('nav_back') || 'Ortga qaytish'}</span>
                </button>

                {/* ── Hero / XP Card ── */}
                <div
                    className="relative rounded-2xl border-[0.5px] p-8 mb-8 overflow-hidden theme-card"
                    style={{ borderColor: 'var(--border-color)' }}
                >
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6">
                        {/* XP display */}
                        <div className="flex items-center gap-5">
                            <div
                                className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 border-[0.5px]"
                                style={{ backgroundColor: 'rgba(13,148,136,0.12)', borderColor: 'var(--border-brand-soft)' }}
                            >
                                <span className="text-[32px] font-black text-[#0d9488]">{calcLevel(totalXP)}</span>
                            </div>
                            <div>
                                <p className="theme-muted text-[14px] font-medium">{t('missions_total_xp') || 'Umumiy XP'}</p>
                                <p className="text-[32px] font-black theme-text">{totalXP.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Level progress bar */}
                        <XPBar totalXP={totalXP} />
                    </div>

                    {/* Mission summary chips */}
                    <div
                        className="relative z-10 flex gap-3 mt-8 pt-6 border-t-[0.5px] text-[13px] font-bold flex-wrap"
                        style={{ borderColor: 'var(--border-color)' }}
                    >
                        <div
                            className="flex items-center gap-2 rounded-md px-3 py-1.5 border-[0.5px]"
                            style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
                        >
                            <Target size={14} className="text-[#0d9488]" />
                            <span className="theme-text">{dailyDone}/{dailyMissions.length} <span className="theme-muted font-medium">{t('missions_daily_lower') || 'kunlik'}</span></span>
                        </div>
                        <div
                            className="flex items-center gap-2 rounded-md px-3 py-1.5 border-[0.5px]"
                            style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
                        >
                            <Flame size={14} className="text-[#0d9488]" />
                            <span className="theme-text">{weeklyDone}/{weeklyMissions.length} <span className="theme-muted font-medium">{t('missions_weekly_lower') || 'haftalik'}</span></span>
                        </div>
                        <div
                            className="flex items-center gap-2 rounded-md px-3 py-1.5 border-[0.5px]"
                            style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
                        >
                            <Trophy size={14} className="text-yellow-500" />
                            <span className="theme-text">{achieveDone}/{achievements.length} <span className="theme-muted font-medium">{t('missions_achievement_lower') || 'yutuq'}</span></span>
                        </div>
                    </div>
                </div>

                {/* ── Tab bar ── */}
                <div
                    className="flex gap-1 rounded-xl p-1.5 mb-8 border-[0.5px]"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
                >
                    {getTabs(t).map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-[14px] font-bold transition-all duration-200"
                            style={activeTab === tab.id
                                ? { backgroundColor: '#0d9488', color: '#ffffff' }
                                : { color: 'var(--text-secondary)', backgroundColor: 'transparent' }
                            }
                            onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'var(--bg-primary)'; }}
                            onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'transparent'; }}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* ── Tab Content ── */}
                <AnimatePresence mode="wait">
                    {activeTab === 'daily' && (
                        <motion.div key="daily" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="space-y-4"
                        >
                            <p className="theme-muted text-[14px] font-medium mb-5">{t('missions_daily_desc') || 'Har kuni yangilanadi'} · <span className="text-[#0d9488] font-bold">{dailyDone}/{dailyMissions.length}</span> {t('missions_completed_lower') || 'bajarildi'}</p>
                            {dailyMissions.map((m, i) => <MissionCard key={m.id} mission={m} index={i} />)}
                        </motion.div>
                    )}

                    {activeTab === 'weekly' && (
                        <motion.div key="weekly" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="space-y-4"
                        >
                            <p className="theme-muted text-[14px] font-medium mb-5">{t('missions_weekly_desc') || 'Har dushanba yangilanadi'} · <span className="text-[#0d9488] font-bold">{weeklyDone}/{weeklyMissions.length}</span> {t('missions_completed_lower') || 'bajarildi'}</p>
                            {weeklyMissions.map((m, i) => <MissionCard key={m.id} mission={m} index={i} />)}
                        </motion.div>
                    )}

                    {activeTab === 'achieve' && (
                        <motion.div key="achieve" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <p className="theme-muted text-[14px] font-medium mb-5">{t('missions_achieve_desc') || 'Bir marta beriladigan yutuqlar'} · <span className="text-[#0d9488] font-bold">{achieveDone}/{achievements.length}</span> {t('missions_unlocked_lower') || 'ochilgan'}</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                                {achievements.map((a, i) => <AchievementCard key={a.id} ach={a} index={i} />)}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'reyting' && (
                        <motion.div key="reyting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <LeaderboardTab />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
