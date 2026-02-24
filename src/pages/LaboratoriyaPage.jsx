import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Clock, Zap, ChevronRight, CheckCircle,
    FlaskConical, Star, Lock
} from 'lucide-react';

// ─── Lab ma'lumotlari ─────────────────────────────────────────────────────────
const labsData = [
    {
        id: 'ohm', title: "Om Qonuni", chapter: "Elektr",
        difficulty: "Oson", duration: "~10 daqiqa", xp: 50,
        description: "Tok kuchi, kuchlanish va qarshilik o'rtasidagi bog'liqlikni interaktiv tajriba orqali o'rganing.",
        gradient: "from-blue-600 to-cyan-500",
        iconBg: "bg-blue-500/20", icon: "⚡",
        route: "/laboratoriya/ohm",
    },
    {
        id: 'nyuton', title: "Nyuton 2-Qonuni", chapter: "Mexanika",
        difficulty: "O'rta", duration: "~15 daqiqa", xp: 75,
        description: "Kuch, massa va tezlanish orasidagi munosabatni F = ma formulasi orqali kuzating.",
        gradient: "from-orange-500 to-amber-400",
        iconBg: "bg-orange-500/20", icon: "🚀",
        route: "/laboratoriya/nyuton",
    },
    {
        id: 'tushish', title: "Erkin Tushish", chapter: "Mexanika",
        difficulty: "Oson", duration: "~8 daqiqa", xp: 50,
        description: "Balandlik va tushish vaqti o'rtasidagi bog'liqlikni h = ½gt² orqali tadqiq eting.",
        gradient: "from-green-600 to-emerald-400",
        iconBg: "bg-green-500/20", icon: "🌍",
        route: "/laboratoriya/tushish",
    },
    {
        id: 'mayatnik', title: "Mayatnik Tebranishi", chapter: "Tebranishlar",
        difficulty: "O'rta", duration: "~12 daqiqa", xp: 75,
        description: "Ipning uzunligi va tebranish davrining bog'liqligini T = 2π√(l/g) formulasi bilan sinab ko'ring.",
        gradient: "from-purple-600 to-violet-400",
        iconBg: "bg-purple-500/20", icon: "🔮",
        route: "/laboratoriya/mayatnik",
    },
    {
        id: 'linza', title: "Linza va Yorug'lik", chapter: "Optika",
        difficulty: "Qiyin", duration: "~20 daqiqa", xp: 100,
        description: "Fokus masofasi va tasvir hosil bo'lishini yig'uvchi linza orqali tajriba bilan o'rganing.",
        gradient: "from-yellow-500 to-orange-400",
        iconBg: "bg-yellow-500/20", icon: "🔭",
        route: "/laboratoriya/linza",
    },
    {
        id: 'gaz', title: "Ideal Gaz Qonuni", chapter: "Molekulyar",
        difficulty: "Qiyin", duration: "~18 daqiqa", xp: 100,
        description: "Bosim, hajm va temperatura o'rtasidagi PV = nRT bog'liqligini simulyatsiya orqali tekshiring.",
        gradient: "from-red-600 to-pink-500",
        iconBg: "bg-red-500/20", icon: "🧪",
        route: "/laboratoriya/gaz",
    },
];

const CHAPTERS = ['Barchasi', 'Mexanika', 'Elektr', 'Optika', 'Tebranishlar', 'Molekulyar'];
const DIFFICULTY_COLOR = {
    'Oson': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    "O'rta": 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    'Qiyin': 'text-red-400 bg-red-500/10 border-red-500/30',
};

// ─── Circular Progress Ring ───────────────────────────────────────────────────
function CircleRing({ value, max, size = 64, stroke = 6, color = "#6366f1" }) {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const pct = max > 0 ? (value / max) : 0;
    const offset = circ * (1 - pct);
    return (
        <svg width={size} height={size} className="-rotate-90">
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1e293b" strokeWidth={stroke} />
            <circle
                cx={size / 2} cy={size / 2} r={r} fill="none"
                stroke={color} strokeWidth={stroke}
                strokeDasharray={circ} strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.6s ease' }}
            />
        </svg>
    );
}

// ─── Lab Card ─────────────────────────────────────────────────────────────────
function LabCard({ lab, completed, index, onStart }) {
    const isAvailable = lab.id === 'ohm' || lab.id === 'gaz';
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            className={`group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300
                ${completed
                    ? 'border-emerald-500/40 bg-emerald-950/20'
                    : isAvailable
                        ? 'border-slate-800 bg-slate-900/60 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1'
                        : 'border-slate-800/50 bg-slate-900/30 opacity-70'
                }`}
        >
            {/* Cover */}
            <div className={`relative h-36 bg-gradient-to-br ${lab.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-black/20" />
                <span className="text-5xl relative z-10 drop-shadow-lg">{lab.icon}</span>

                {/* Completed overlay */}
                {completed && (
                    <div className="absolute inset-0 bg-emerald-900/60 flex items-center justify-center backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-1">
                            <CheckCircle size={36} className="text-emerald-400" />
                            <span className="text-emerald-300 font-bold text-sm">Tugallandi ✓</span>
                        </div>
                    </div>
                )}

                {/* Lock */}
                {!isAvailable && !completed && (
                    <div className="absolute top-3 right-3 bg-black/40 p-1.5 rounded-lg backdrop-blur-sm">
                        <Lock size={14} className="text-slate-400" />
                    </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${DIFFICULTY_COLOR[lab.difficulty]}`}>
                        {lab.difficulty}
                    </span>
                </div>
                <div className="absolute bottom-3 right-3">
                    <span className="text-[10px] font-semibold bg-black/30 text-white/80 px-2 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1">
                        <Clock size={9} /> {lab.duration}
                    </span>
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-4 gap-3">
                <div>
                    <span className="inline-block text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full mb-2">
                        {lab.chapter}
                    </span>
                    <h3 className="text-white font-bold text-base leading-snug group-hover:text-indigo-300 transition-colors">
                        {lab.title}
                    </h3>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed flex-1">{lab.description}</p>

                {/* XP + Button */}
                <div className="flex items-center justify-between gap-3 pt-1">
                    <span className="flex items-center gap-1 text-indigo-400 text-sm font-bold">
                        <Zap size={14} /> +{lab.xp} XP
                    </span>
                    <button
                        onClick={() => isAvailable && onStart(lab.route)}
                        disabled={!isAvailable}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${isAvailable
                            ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                            : 'bg-slate-700/50 text-slate-600 cursor-not-allowed'
                            }`}
                    >
                        {isAvailable ? (
                            <><ChevronRight size={14} /> Boshlash</>
                        ) : (
                            <><Lock size={12} /> Yaqinda</>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LaboratoriyaPage() {
    const navigate = useNavigate();
    const [activeChapter, setActiveChapter] = useState('Barchasi');
    // Completed labs from localStorage
    const [completedLabs] = useState(() => {
        try { return JSON.parse(localStorage.getItem('completedLabs') || '[]'); }
        catch { return []; }
    });

    const filtered = useMemo(() =>
        activeChapter === 'Barchasi'
            ? labsData
            : labsData.filter(l => l.chapter === activeChapter),
        [activeChapter]
    );

    const totalXP = completedLabs.reduce((sum, id) => {
        const lab = labsData.find(l => l.id === id);
        return sum + (lab?.xp || 0);
    }, 0);

    return (
        <div className="h-screen overflow-y-auto custom-scrollbar font-sans text-slate-100">
            <div className="max-w-7xl mx-auto px-6 pb-24 pt-6">

                {/* Back */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium text-sm">Ortga qaytish</span>
                </button>

                {/* ── Hero ── */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-3xl border border-slate-800 bg-gradient-to-br from-indigo-950/50 via-slate-900/80 to-violet-950/50 backdrop-blur-sm p-8 mb-8 overflow-hidden"
                >
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl" />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                                <FlaskConical size={36} className="text-indigo-400" />
                                Virtual Laboratoriya
                            </h1>
                            <p className="text-slate-400">
                                Fizika qonunlarini interaktiv simulyatsiyalar orqali o'rganing
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-4 flex-shrink-0">
                            {/* Circular progress */}
                            <div className="relative flex items-center justify-center bg-slate-800/60 rounded-2xl border border-slate-700/50 p-4 w-32">
                                <CircleRing value={completedLabs.length} max={labsData.length} size={64} />
                                <div className="absolute flex flex-col items-center">
                                    <span className="text-white font-bold text-sm">{completedLabs.length}/{labsData.length}</span>
                                    <span className="text-slate-500 text-[9px]">tajriba</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2.5">
                                    <p className="text-slate-500 text-[10px] uppercase tracking-wide">Jami</p>
                                    <p className="text-white font-bold">{labsData.length} tajriba</p>
                                </div>
                                <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-xl px-4 py-2.5">
                                    <p className="text-slate-500 text-[10px] uppercase tracking-wide">Yig'ilgan</p>
                                    <p className="text-indigo-400 font-bold flex items-center gap-1">
                                        <Star size={12} /> {totalXP} XP
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Chapter filter ── */}
                <div className="flex gap-2 overflow-x-auto pb-2 mb-7 custom-scrollbar">
                    {CHAPTERS.map(ch => (
                        <button
                            key={ch}
                            onClick={() => setActiveChapter(ch)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap border transition-all duration-200 ${activeChapter === ch
                                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                                : 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-600'
                                }`}
                        >
                            {ch}
                        </button>
                    ))}
                </div>

                {/* ── Cards Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered.map((lab, i) => (
                        <LabCard
                            key={lab.id}
                            lab={lab}
                            completed={completedLabs.includes(lab.id)}
                            index={i}
                            onStart={(route) => navigate(route)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
