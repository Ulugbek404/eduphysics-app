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
    const level = calcLevel(totalXP);
    const inLevel = xpInCurrentLevel(totalXP);
    const needed = 500;
    const pct = Math.min((inLevel / needed) * 100, 100);

    return (
        <div className="flex-1">
            <div className="flex justify-between items-center mb-1.5">
                <span className="text-white font-bold text-sm">Daraja {level}</span>
                <span className="text-slate-400 text-xs">{inLevel} / {needed} XP</span>
            </div>
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                />
            </div>
            <p className="text-slate-600 text-xs mt-1">Keyingi darajaga: {needed - inLevel} XP</p>
        </div>
    );
}

// ─── Mission Card ─────────────────────────────────────────────────────────────
function MissionCard({ mission, index }) {
    const { completed, current, target, title, xp, icon } = mission;
    const pct = Math.min((current / target) * 100, 100);

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.06 }}
            className={`relative rounded-2xl border p-4 transition-all duration-300 ${completed
                ? 'border-emerald-500/50 bg-emerald-950/25 shadow-lg shadow-emerald-500/10'
                : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
        >
            <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center border ${completed
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                    : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                    }`}>
                    {ICON_MAP[icon] || <Target size={20} />}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className={`font-semibold text-sm ${completed ? 'text-emerald-300' : 'text-white'}`}>
                            {title}
                        </h3>
                        <span className={`flex-shrink-0 flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${completed
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                            : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                            }`}>
                            <Zap size={10} /> +{xp} XP
                        </span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-1.5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.06 }}
                            className={`h-full rounded-full transition-all ${completed ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-violet-500'
                                }`}
                        />
                    </div>

                    <p className="text-slate-500 text-xs">
                        {completed
                            ? '✓ Bajarildi!'
                            : `${current}/${target} bajarildi`}
                    </p>
                </div>
            </div>

            {/* Completed overlay checkmark */}
            {completed && (
                <div className="absolute top-3 right-3">
                    <CheckCircle size={18} className="text-emerald-400" />
                </div>
            )}
        </motion.div>
    );
}

// ─── Achievement Card ─────────────────────────────────────────────────────────
function AchievementCard({ ach, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.07 }}
            className={`relative rounded-2xl border p-5 text-center transition-all duration-300 ${ach.earned
                ? 'border-yellow-500/50 bg-yellow-950/20 shadow-lg shadow-yellow-500/10'
                : 'border-slate-800/60 bg-slate-900/40'
                }`}
        >
            {/* Emoji icon */}
            <div className={`text-4xl mb-3 transition-all ${ach.earned ? '' : 'grayscale opacity-40'}`}>
                {ach.icon}
            </div>

            <h3 className={`font-bold text-sm mb-1 ${ach.earned ? 'text-yellow-300' : 'text-slate-500'}`}>
                {ach.title}
            </h3>
            <p className={`text-xs mb-3 leading-snug ${ach.earned ? 'text-slate-400' : 'text-slate-600'}`}>
                {ach.desc}
            </p>

            <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border ${ach.earned
                ? 'bg-yellow-500/15 border-yellow-500/40 text-yellow-400'
                : 'bg-slate-800/60 border-slate-700/40 text-slate-600'
                }`}>
                <Star size={10} /> +{ach.xp} XP
            </span>

            {/* Lock overlay */}
            {!ach.earned && (
                <div className="absolute inset-0 flex items-end justify-center pb-3 pointer-events-none">
                    <div className="bg-slate-900/80 rounded-lg px-2 py-1 flex items-center gap-1">
                        <Lock size={10} className="text-slate-600" />
                        <span className="text-slate-600 text-[10px]">Qulflangan</span>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

// ─── TABS ─────────────────────────────────────────────────────────────────────
const TABS = [
    { id: 'daily', label: 'Kunlik', icon: <Target size={15} /> },
    { id: 'weekly', label: 'Haftalik', icon: <Flame size={15} /> },
    { id: 'achieve', label: 'Yutuqlar', icon: <Trophy size={15} /> },
    { id: 'reyting', label: 'Reyting', icon: <Trophy size={15} className="text-yellow-400" /> },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MissionsPage() {
    const navigate = useNavigate();
    const { totalXP } = useXP();
    const { dailyMissions, weeklyMissions, achievements } = useMissions();
    const [activeTab, setActiveTab] = useState('daily');

    const dailyDone = dailyMissions.filter(m => m.completed).length;
    const weeklyDone = weeklyMissions.filter(m => m.completed).length;
    const achieveDone = achievements.filter(a => a.earned).length;

    return (
        <div className="h-screen overflow-y-auto custom-scrollbar font-sans text-slate-100">
            <div className="max-w-3xl mx-auto px-6 pb-24 pt-6">

                {/* Back */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium text-sm">Ortga qaytish</span>
                </button>

                {/* ── Hero / XP Card ── */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-3xl border border-slate-800 bg-gradient-to-br from-indigo-950/50 via-slate-900/80 to-violet-950/50 backdrop-blur-sm p-6 mb-7 overflow-hidden"
                >
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute -top-8 -right-8 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-violet-600/10 rounded-full blur-3xl" />
                    </div>

                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5">
                        {/* XP display */}
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-500/30 flex-shrink-0">
                                <span className="text-2xl font-black text-white">{calcLevel(totalXP)}</span>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs">Umumiy XP</p>
                                <p className="text-2xl font-black text-white">{totalXP.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Level progress bar */}
                        <XPBar totalXP={totalXP} />
                    </div>

                    {/* Mission summary chips */}
                    <div className="relative z-10 flex gap-3 mt-5 text-xs">
                        <div className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/50 rounded-full px-3 py-1.5">
                            <Target size={11} className="text-indigo-400" />
                            <span className="text-slate-300">{dailyDone}/{dailyMissions.length} kunlik</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/50 rounded-full px-3 py-1.5">
                            <Flame size={11} className="text-orange-400" />
                            <span className="text-slate-300">{weeklyDone}/{weeklyMissions.length} haftalik</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/50 rounded-full px-3 py-1.5">
                            <Trophy size={11} className="text-yellow-400" />
                            <span className="text-slate-300">{achieveDone}/{achievements.length} yutuq</span>
                        </div>
                    </div>
                </motion.div>

                {/* ── Tab bar ── */}
                <div className="flex gap-1 bg-slate-900/80 border border-slate-800 rounded-2xl p-1 mb-6">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === tab.id
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* ── Tab Content ── */}
                <AnimatePresence mode="wait">
                    {activeTab === 'daily' && (
                        <motion.div key="daily" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="space-y-3"
                        >
                            <p className="text-slate-500 text-xs mb-4">Har kuni yangilanadi · {dailyDone}/{dailyMissions.length} bajarildi</p>
                            {dailyMissions.map((m, i) => <MissionCard key={m.id} mission={m} index={i} />)}
                        </motion.div>
                    )}

                    {activeTab === 'weekly' && (
                        <motion.div key="weekly" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="space-y-3"
                        >
                            <p className="text-slate-500 text-xs mb-4">Har dushanba yangilanadi · {weeklyDone}/{weeklyMissions.length} bajarildi</p>
                            {weeklyMissions.map((m, i) => <MissionCard key={m.id} mission={m} index={i} />)}
                        </motion.div>
                    )}

                    {activeTab === 'achieve' && (
                        <motion.div key="achieve" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <p className="text-slate-500 text-xs mb-4">Bir marta beriladigan yutuqlar · {achieveDone}/{achievements.length} ochilgan</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
