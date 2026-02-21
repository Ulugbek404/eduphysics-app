import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Trophy, Activity, ChevronLeft, ChevronRight } from 'lucide-react';

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

// ─── Bir oy uchun mock XP data ────────────────────────────────────────────────
function generateMonthData(year, month) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const data = {};
    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, month, d);
        const dow = date.getDay(); // 0=Sun
        const isWeekend = dow === 0 || dow === 6;
        const active = Math.random() < (isWeekend ? 0.28 : 0.62);
        data[d] = active ? Math.floor(Math.random() * 140) + 5 : 0;
    }
    return data;
}

// ─── Streak hisoblash ─────────────────────────────────────────────────────────
function calcStreaks(allData) {
    const entries = Object.entries(allData).sort(([a], [b]) => a.localeCompare(b));
    let current = 0, longest = 0, run = 0, totalActive = 0;
    for (const [, xp] of entries) {
        if (xp > 0) { run++; totalActive++; if (run > longest) longest = run; }
        else run = 0;
    }
    // current streak from today backwards
    const todayKey = (() => { const t = new Date(); return `${t.getFullYear()}-${t.getMonth()}-${t.getDate()}`; })();
    for (let i = entries.length - 1; i >= 0; i--) {
        if (entries[i][1] > 0) current++;
        else break;
    }
    return { current, longest, totalActive };
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
function DayCell({ day, xp, year, month }) {
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
    const today = new Date();
    const [viewDate, setViewDate] = useState({ year: today.getFullYear(), month: today.getMonth() });

    // Generate (and memo-ize per month) mock XP data
    const monthXP = useMemo(
        () => generateMonthData(viewDate.year, viewDate.month),
        [viewDate.year, viewDate.month]
    );

    // Calendar grid construction
    const daysInMonth = new Date(viewDate.year, viewDate.month + 1, 0).getDate();
    // Monday-based: Mon=0 … Sun=6
    const firstDayRaw = new Date(viewDate.year, viewDate.month, 1).getDay(); // 0=Sun
    const firstDayMon = (firstDayRaw + 6) % 7; // convert Sun-based to Mon-based
    const totalCells = Math.ceil((firstDayMon + daysInMonth) / 7) * 7;

    const cells = [];
    for (let i = 0; i < totalCells; i++) {
        const dayNum = i - firstDayMon + 1;
        cells.push(dayNum >= 1 && dayNum <= daysInMonth ? dayNum : null);
    }

    // All-time mock streaks (simple: just use current month data flattened)
    const streakData = useMemo(() => {
        const flat = Object.values(monthXP);
        let current = 0, longest = 0, run = 0, totalActive = 0;
        for (const xp of flat) {
            if (xp > 0) { run++; totalActive++; if (run > longest) longest = run; }
            else run = 0;
        }
        // rough: current = tail streak
        for (let i = flat.length - 1; i >= 0; i--) {
            if (flat[i] > 0) current++;
            else break;
        }
        return { current, longest, totalActive };
    }, [monthXP]);

    const prevMonth = () => setViewDate(({ year, month }) =>
        month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 }
    );
    const nextMonth = () => setViewDate(({ year, month }) =>
        month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 }
    );
    const isCurrentMonth = viewDate.year === today.getFullYear() && viewDate.month === today.getMonth();

    const statCards = [
        { icon: <Flame size={20} />, label: 'Joriy seriya', value: `${streakData.current} kun`, color: 'border-orange-500/30 from-orange-600/15 to-red-600/5', iconColor: 'text-orange-400' },
        { icon: <Trophy size={20} />, label: 'Eng yaxshi natija', value: `${streakData.longest} kun`, color: 'border-yellow-500/30 from-yellow-600/15 to-amber-600/5', iconColor: 'text-yellow-400' },
        { icon: <Activity size={20} />, label: 'Faol kunlar', value: `${streakData.totalActive} kun`, color: 'border-indigo-500/30 from-indigo-600/15 to-purple-600/5', iconColor: 'text-indigo-400' },
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
                                ? <DayCell key={i} day={day} xp={monthXP[day] ?? 0} year={viewDate.year} month={viewDate.month} />
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
