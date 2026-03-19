import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Trophy, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import { doc, onSnapshot, collection, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { trackTodayActivity } from '../../services/userService';

// ─── UZ oy nomlari ────────────────────────────────────────────────────────────
const UZ_MONTHS = [
    'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
    'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr',
];
const DAY_LABELS = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];

// ─── XP → rang sinfi ──────────────────────────────────────────────────────────
function getColorClass(xp) {
    if (xp === 0) return 'bg-slate-800/60 text-slate-600 border-slate-700/40';
    if (xp < 20) return 'bg-indigo-900/80 text-indigo-300 border-indigo-700/50';
    if (xp < 50) return 'bg-indigo-700    text-indigo-100 border-indigo-500/60';
    if (xp < 100) return 'bg-indigo-500    text-white      border-indigo-400/60';
    return 'bg-purple-500    text-white      border-purple-400/60';
}

// ─── Streakni sanalar array dan hisoblash ─────────────────────────────────────
function calcCurrentStreak(activeDates) {
    if (!activeDates?.length) return 0;
    const unique = [...new Set(activeDates)].sort((a, b) => b.localeCompare(a));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let streak = 0;
    let current = new Date(today);
    for (const dateStr of unique) {
        const d = new Date(dateStr);
        d.setHours(0, 0, 0, 0);
        if (d.getTime() === current.getTime()) {
            streak++;
            current.setDate(current.getDate() - 1);
        } else if (d < current) break;
    }
    return streak;
}

// ─── Tooltip ─────────────────────────────────────────────────────────────────
function Tooltip({ text, visible }) {
    if (!visible) return null;
    return (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
            <div className="bg-slate-900/95 border border-slate-600/80 rounded-xl px-3 py-2 text-xs whitespace-nowrap shadow-2xl backdrop-blur-sm">
                <p className="text-slate-200 font-medium">{text}</p>
            </div>
            <div className="w-2 h-2 bg-slate-900/95 border-r border-b border-slate-600/80 rotate-45 mx-auto -mt-1" />
        </div>
    );
}

// ─── Bir kunlik katakcha ──────────────────────────────────────────────────────
function DayCell({ day, xp, year, month, isToday }) {
    const [hovered, setHovered] = useState(false);
    const dateLabel = `${day} ${UZ_MONTHS[month]} ${year}`;
    const xpLabel = xp > 0 ? `${xp} XP ishlangan` : 'Dars qilinmagan';

    return (
        <div className="relative flex items-center justify-center">
            <motion.div
                whileHover={{ scale: 1.12 }}
                transition={{ duration: 0.15 }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={`
                    w-10 h-10 rounded-xl border flex items-center justify-center
                    cursor-pointer select-none font-semibold text-sm
                    transition-shadow duration-200
                    ${getColorClass(xp)}
                    ${isToday ? 'ring-2 ring-blue-400 ring-offset-1 ring-offset-slate-900' : ''}
                    ${hovered ? 'shadow-lg shadow-indigo-500/20 z-10' : ''}
                `}
            >
                {day}
            </motion.div>
            <Tooltip text={`${dateLabel}: ${xpLabel}`} visible={hovered} />
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ActivityHeatmap() {
    const { user } = useAuth();
    const today = new Date();
    const [viewDate, setViewDate] = useState({ year: today.getFullYear(), month: today.getMonth() });

    // ── Firestore dan user data (activeDates, streakDays, bestStreak) ─────────
    const [activeDates, setActiveDates] = useState([]);
    const [streakDays, setStreakDays] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);

    useEffect(() => {
        if (!user?.uid) return;
        const unsub = onSnapshot(
            doc(db, 'users', user.uid),
            (snap) => {
                if (!snap.exists()) return;
                const data = snap.data();
                const dates = data.activeDates || [];
                setActiveDates(dates);
                setStreakDays(data.streakDays || calcCurrentStreak(dates));
                setBestStreak(data.bestStreak || 0);
            },
            () => { }
        );
        return () => unsub();
    }, [user?.uid]);

    // ── Sahifa ochilganda bugungi kunni belgilash ─────────────────────────────
    useEffect(() => {
        if (user?.uid) {
            trackTodayActivity(user.uid);
        }
    }, [user?.uid]);

    // ── xpLogs dan oylik XP data ──────────────────────────────────────────────
    const [monthXP, setMonthXP] = useState({});

    useEffect(() => {
        if (!user?.uid) return;

        // Oy boshidan oxirigacha sana oralig'i
        const startStr = `${viewDate.year}-${String(viewDate.month + 1).padStart(2, '0')}-01`;
        const endDate = new Date(viewDate.year, viewDate.month + 1, 0);
        const endStr = `${viewDate.year}-${String(viewDate.month + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;

        // xpLogs subcollection dan shu oy uchun ma'lumotlar
        const logsRef = collection(db, 'xpLogs', user.uid, 'logs');
        // Barcha loglarni olib, frontendda filtrar qilamiz (timestamp filter ham mumkin)
        const unsub = onSnapshot(logsRef, (snap) => {
            const dayXP = {};
            snap.docs.forEach(d => {
                const log = d.data();
                let dateStr = null;
                if (log.timestamp?.toDate) {
                    dateStr = log.timestamp.toDate().toISOString().split('T')[0];
                } else if (log.date) {
                    dateStr = log.date;
                }
                if (!dateStr) return;
                // Faqat shu oy
                if (dateStr >= startStr && dateStr <= endStr) {
                    const day = parseInt(dateStr.split('-')[2], 10);
                    dayXP[day] = (dayXP[day] || 0) + (log.amount || 0);
                }
            });

            // activeDates dan ham faollikni belgilash (XP bo'lmasa ham active bo'lishi mumkin)
            activeDates.forEach(dateStr => {
                if (dateStr >= startStr && dateStr <= endStr) {
                    const day = parseInt(dateStr.split('-')[2], 10);
                    if (!dayXP[day]) dayXP[day] = 1; // Kamida 1 — faol bo'lgan
                }
            });

            setMonthXP(dayXP);
        }, () => { });

        return () => unsub();
    }, [user?.uid, viewDate.year, viewDate.month, activeDates]);

    // ── Calendar grid ─────────────────────────────────────────────────────────
    const daysInMonth = new Date(viewDate.year, viewDate.month + 1, 0).getDate();
    const firstDayRaw = new Date(viewDate.year, viewDate.month, 1).getDay(); // 0=Sun
    const firstDayMon = (firstDayRaw + 6) % 7; // Sun-based → Mon-based
    const totalCells = Math.ceil((firstDayMon + daysInMonth) / 7) * 7;

    const cells = [];
    for (let i = 0; i < totalCells; i++) {
        const dayNum = i - firstDayMon + 1;
        cells.push(dayNum >= 1 && dayNum <= daysInMonth ? dayNum : null);
    }

    // Faol kunlar soni (shu oydagi)
    const totalActiveDays = activeDates.length;

    const prevMonth = () => setViewDate(({ year, month }) =>
        month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 }
    );
    const nextMonth = () => setViewDate(({ year, month }) =>
        month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 }
    );
    const isCurrentMonth = viewDate.year === today.getFullYear() && viewDate.month === today.getMonth();
    const todayDay = today.getDate();

    const statCards = [
        {
            icon: <Flame size={20} />,
            label: 'Joriy seriya',
            value: `${streakDays} kun`,
            color: 'border-orange-500/30 from-orange-600/15 to-red-600/5',
            iconColor: 'text-orange-400',
        },
        {
            icon: <Trophy size={20} />,
            label: 'Eng yaxshi natija',
            value: `${bestStreak} kun`,
            color: 'border-yellow-500/30 from-yellow-600/15 to-amber-600/5',
            iconColor: 'text-yellow-400',
        },
        {
            icon: <Activity size={20} />,
            label: 'Faol kunlar',
            value: `${totalActiveDays} kun`,
            color: 'border-indigo-500/30 from-indigo-600/15 to-purple-600/5',
            iconColor: 'text-indigo-400',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
        >
            {/* ── Streak cards ── */}
            <div className="grid grid-cols-3 gap-4">
                {statCards.map((c, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className={`relative rounded-2xl border bg-gradient-to-br ${c.color} p-5 overflow-hidden backdrop-blur-sm`}
                    >
                        <div className="absolute -right-3 -top-3 w-16 h-16 rounded-full bg-white/5" />
                        <div className={`mb-2 ${c.iconColor}`}>{c.icon}</div>
                        <p className="text-xl font-bold text-white">{c.value}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{c.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* ── Calendar card ── */}
            <div className="rounded-2xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm p-6">

                {/* Header: prev / month-year / next */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={prevMonth}
                        className="p-2 rounded-xl bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 text-slate-400 hover:text-white transition-all"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    <AnimatePresence mode="wait">
                        <motion.h3
                            key={`${viewDate.year}-${viewDate.month}`}
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.2 }}
                            className="text-lg font-bold text-white"
                        >
                            {UZ_MONTHS[viewDate.month]} {viewDate.year}
                        </motion.h3>
                    </AnimatePresence>

                    <button
                        onClick={nextMonth}
                        disabled={isCurrentMonth}
                        className={`p-2 rounded-xl border transition-all
                            ${isCurrentMonth
                                ? 'bg-slate-800/30 border-slate-700/30 text-slate-600 cursor-not-allowed'
                                : 'bg-slate-700/50 hover:bg-slate-700 border-slate-600/50 text-slate-400 hover:text-white'
                            }`}
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>

                {/* Day labels */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {DAY_LABELS.map(d => (
                        <div key={d} className="flex items-center justify-center text-xs font-semibold text-slate-500 uppercase tracking-wider h-8">
                            {d}
                        </div>
                    ))}
                </div>

                {/* Calendar grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${viewDate.year}-${viewDate.month}`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25 }}
                        className="grid grid-cols-7 gap-2"
                    >
                        {cells.map((day, i) => (
                            day
                                ? <DayCell
                                    key={i}
                                    day={day}
                                    xp={monthXP[day] ?? 0}
                                    year={viewDate.year}
                                    month={viewDate.month}
                                    isToday={isCurrentMonth && day === todayDay}
                                />
                                : <div key={i} className="w-10 h-10" />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ── Legend ── */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500 px-1">
                <span className="text-slate-600">Kam</span>
                {[
                    { cls: 'bg-slate-800/60', label: '0 XP' },
                    { cls: 'bg-indigo-900/80', label: '1–20 XP' },
                    { cls: 'bg-indigo-700', label: '20–50 XP' },
                    { cls: 'bg-indigo-500', label: '50–100 XP' },
                    { cls: 'bg-purple-500', label: '100+ XP' },
                ].map(({ cls, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                        <div className={`w-4 h-4 rounded-md border border-white/10 ${cls}`} />
                        <span>{label}</span>
                    </div>
                ))}
                <span className="text-slate-600">Ko'p</span>
            </div>
        </motion.div>
    );
}
