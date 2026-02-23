import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    collection, query, where, orderBy, limit,
    onSnapshot, addDoc, serverTimestamp, getDocs
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import {
    Users, BarChart2, ClipboardList, Bell,
    Search, Eye, Zap, Send, LogOut, Atom,
    TrendingUp, BookOpen, FlaskConical, Award,
    ChevronDown, X, CheckCircle, Clock, AlertCircle
} from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const todayStr = () => new Date().toISOString().slice(0, 10);

const daysBetween = (dateStr) => {
    if (!dateStr) return 999;
    const d = new Date(dateStr);
    const now = new Date();
    return Math.floor((now - d) / 86400000);
};

const lastSevenDays = () => {
    const days = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        days.push(d.toISOString().slice(0, 10));
    }
    return days;
};

const DAYS_UZ = ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'];
const CHAPTERS = ['Mexanika', 'Tebranishlar', 'Molekulyar', 'Elektr', 'Tok', 'Optika'];

const getStatus = (activeDates) => {
    const last = activeDates?.at?.(-1);
    const d = daysBetween(last);
    if (d <= 3) return { label: 'Faol', color: 'emerald', bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' };
    if (d <= 7) return { label: 'Kam faol', color: 'yellow', bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' };
    return { label: 'Nofaol', color: 'red', bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' };
};

// ─── Skeleton Card ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 animate-pulse">
        <div className="h-4 bg-slate-700 rounded w-24 mb-3" />
        <div className="h-8 bg-slate-700 rounded w-16" />
    </div>
);

// ─── SVG Bar Chart (Kunlik faollik) ──────────────────────────────────────────
function DailyActivityChart({ students }) {
    const days = lastSevenDays();
    const counts = days.map(d =>
        students.filter(s => (s.activeDates || []).includes(d)).length
    );
    const maxC = Math.max(...counts, 1);
    const W = 480; const H = 160; const padL = 30; const padB = 28;
    const barW = (W - padL - 16) / 7;

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-44">
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((r, i) => (
                <line key={i} x1={padL} x2={W - 8} y1={H - padB - r * (H - padB - 10)} y2={H - padB - r * (H - padB - 10)}
                    stroke="#334155" strokeWidth="0.5" strokeDasharray="4,4" />
            ))}
            {counts.map((c, i) => {
                const bh = (c / maxC) * (H - padB - 10);
                const bx = padL + i * barW + barW * 0.15;
                const by = H - padB - bh;
                const dayDate = new Date(days[i]);
                return (
                    <g key={i}>
                        <rect x={bx} y={by} width={barW * 0.7} height={bh}
                            rx="4"
                            fill={days[i] === todayStr() ? '#6366f1' : '#4f46e5'}
                            opacity="0.85" />
                        <text x={bx + barW * 0.35} y={H - 8} textAnchor="middle"
                            fill="#94a3b8" fontSize="10">
                            {DAYS_UZ[dayDate.getDay()]}
                        </text>
                        {c > 0 && (
                            <text x={bx + barW * 0.35} y={by - 4} textAnchor="middle"
                                fill="#a5b4fc" fontSize="9">{c}</text>
                        )}
                    </g>
                );
            })}
            {/* Y-axis */}
            <text x={padL - 4} y={H - padB} textAnchor="end" fill="#64748b" fontSize="9">0</text>
            <text x={padL - 4} y={H - padB - (H - padB - 10)} textAnchor="end" fill="#64748b" fontSize="9">{maxC}</text>
        </svg>
    );
}

// ─── SVG Horizontal Bars (Bob progress) ──────────────────────────────────────
function ChapterProgressChart({ students }) {
    // Simulate chapter progress from totalXP bands
    const avgXP = students.length ? students.reduce((s, u) => s + (u.totalXP || 0), 0) / students.length : 0;
    const chapters = CHAPTERS.map((name, i) => ({
        name,
        pct: Math.min(100, Math.round((avgXP / (200 * (i + 1))) * 100))
    }));
    const H = 200; const W = 480; const barH = 18; const gap = 14; const labelW = 90;

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
            {chapters.map((ch, i) => {
                const y = i * (barH + gap) + 10;
                const bw = ((W - labelW - 40) * ch.pct) / 100;
                return (
                    <g key={i}>
                        <text x={labelW - 6} y={y + barH - 4} textAnchor="end" fill="#94a3b8" fontSize="11">{ch.name}</text>
                        {/* track */}
                        <rect x={labelW} y={y} width={W - labelW - 40} height={barH} rx="5" fill="#1e293b" />
                        {/* fill */}
                        <defs>
                            <linearGradient id={`g${i}`} x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#6366f1" />
                                <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                        </defs>
                        <rect x={labelW} y={y} width={bw} height={barH} rx="5" fill={`url(#g${i})`} opacity="0.9" />
                        <text x={labelW + bw + 6} y={y + barH - 4} fill="#a5b4fc" fontSize="10">{ch.pct}%</text>
                    </g>
                );
            })}
        </svg>
    );
}

// ─── SVG Donut Chart (Level taqsimoti) ───────────────────────────────────────
function LevelDonutChart({ students }) {
    const lvl1 = students.filter(s => (s.totalXP || 0) < 500).length;
    const lvl2 = students.filter(s => (s.totalXP || 0) >= 500 && (s.totalXP || 0) < 1000).length;
    const lvl3 = students.filter(s => (s.totalXP || 0) >= 1000).length;
    const total = students.length || 1;

    const r = 60; const cx = 80; const cy = 80; const stroke = 22;
    const circ = 2 * Math.PI * r;

    const segments = [
        { val: lvl1, color: '#3b82f6', label: 'Level 1', sub: '0–499 XP' },
        { val: lvl2, color: '#6366f1', label: 'Level 2', sub: '500–999 XP' },
        { val: lvl3, color: '#8b5cf6', label: 'Level 3+', sub: '1000+ XP' },
    ];

    let offset = 0;
    const arcs = segments.map(seg => {
        const dash = (seg.val / total) * circ;
        const arc = { ...seg, dash, offset };
        offset += dash;
        return arc;
    });

    return (
        <div className="flex items-center gap-6">
            <svg viewBox="0 0 160 160" className="w-40 h-40 flex-shrink-0">
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1e293b" strokeWidth={stroke} />
                {arcs.map((a, i) => (
                    <circle key={i} cx={cx} cy={cy} r={r} fill="none"
                        stroke={a.color} strokeWidth={stroke}
                        strokeDasharray={`${a.dash} ${circ - a.dash}`}
                        strokeDashoffset={-a.offset}
                        transform={`rotate(-90 ${cx} ${cy})`} />
                ))}
                <text x={cx} y={cy - 6} textAnchor="middle" fill="#f1f5f9" fontSize="22" fontWeight="bold">{total}</text>
                <text x={cx} y={cy + 12} textAnchor="middle" fill="#94a3b8" fontSize="9">o'quvchi</text>
            </svg>
            <div className="space-y-3">
                {segments.map((s, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: s.color }} />
                        <div>
                            <p className="text-slate-300 text-sm font-medium">{s.label}</p>
                            <p className="text-slate-500 text-xs">{s.sub} — <span className="text-slate-400">{arcs[i].val} o'quvchi</span></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── XP Progress Ring ────────────────────────────────────────────────────────
function XPRing({ xp, size = 80 }) {
    const level = Math.floor(xp / 500) + 1;
    const pct = (xp % 500) / 500;
    const r = size / 2 - 8; const circ = 2 * Math.PI * r; const cx = size / 2;
    return (
        <svg width={size} height={size}>
            <circle cx={cx} cy={cx} r={r} fill="none" stroke="#1e293b" strokeWidth="6" />
            <circle cx={cx} cy={cx} r={r} fill="none" stroke="#6366f1" strokeWidth="6"
                strokeDasharray={`${pct * circ} ${circ}`}
                strokeDashoffset={circ * 0.25}
                transform={`rotate(-90 ${cx} ${cx})`} />
            <text x={cx} y={cx - 3} textAnchor="middle" fill="#f1f5f9" fontSize={size * 0.18} fontWeight="bold">L{level}</text>
            <text x={cx} y={cx + 12} textAnchor="middle" fill="#94a3b8" fontSize={size * 0.12}>{xp} XP</text>
        </svg>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function TeacherDashboard() {
    const { user, userData, logout } = useAuth();
    const navigate = useNavigate();

    // State
    const [students, setStudents] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [sentMessages, setSentMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('students');

    // Student table
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('totalXP');
    const [modal, setModal] = useState(null); // selected student

    // Modal inputs
    const [bonusXP, setBonusXP] = useState('');
    const [msgText, setMsgText] = useState('');
    const [actionMsg, setActionMsg] = useState('');

    // Assignment form
    const [aTitle, setATitle] = useState('');
    const [aDesc, setADesc] = useState('');
    const [aDate, setADate] = useState('');
    const [aSending, setASending] = useState(false);

    // ── Fetch students ─────────────────────────────────────────────────────
    useEffect(() => {
        if (!user?.uid) return;
        const q = query(collection(db, 'users'), where('role', '==', 'student'));
        const unsub = onSnapshot(q,
            (snap) => {
                setStudents(snap.docs.map(d => ({ id: d.id, ...d.data() })));
                setLoading(false);
            },
            (err) => {
                console.warn('students listener:', err.message);
                setLoading(false);
            }
        );
        return unsub;
    }, [user?.uid]);

    // ── Fetch assignments ──────────────────────────────────────────────────
    useEffect(() => {
        if (!user?.uid) return;
        const q = query(
            collection(db, 'assignments'),
            where('teacherId', '==', user.uid),
            orderBy('createdAt', 'desc'),
            limit(10)
        );
        const unsub = onSnapshot(q,
            (snap) => setAssignments(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
            (err) => console.warn('assignments listener:', err.message)
        );
        return unsub;
    }, [user?.uid]);

    // ── Stat cards ─────────────────────────────────────────────────────────
    const stats = useMemo(() => {
        const today = todayStr();
        const activeToday = students.filter(s => (s.activeDates || []).includes(today)).length;
        const avgXP = students.length
            ? Math.round(students.reduce((s, u) => s + (u.totalXP || 0), 0) / students.length)
            : 0;
        return [
            { label: 'Jami o\'quvchilar', value: students.length, icon: Users, color: 'indigo' },
            { label: 'Bugun faol', value: activeToday, icon: TrendingUp, color: 'emerald' },
            { label: 'O\'rtacha XP', value: avgXP, icon: Zap, color: 'violet' },
            { label: 'Jami vazifalar', value: assignments.length, icon: ClipboardList, color: 'blue' },
        ];
    }, [students, assignments]);

    // ── Filtered + sorted students ─────────────────────────────────────────
    const displayed = useMemo(() => {
        let list = students.filter(s =>
            (s.displayName || '').toLowerCase().includes(search.toLowerCase()) ||
            (s.email || '').toLowerCase().includes(search.toLowerCase())
        );
        list = [...list].sort((a, b) => {
            if (sortBy === 'totalXP') return (b.totalXP || 0) - (a.totalXP || 0);
            if (sortBy === 'level') return (b.currentLevel || 0) - (a.currentLevel || 0);
            if (sortBy === 'streak') return (b.streakDays || 0) - (a.streakDays || 0);
            return 0;
        });
        return list;
    }, [students, search, sortBy]);

    // ── Send bonus XP ──────────────────────────────────────────────────────
    const sendBonusXP = useCallback(async () => {
        if (!modal || !bonusXP || isNaN(bonusXP)) return;
        try {
            await addDoc(collection(db, 'notifications', modal.id, 'messages'), {
                text: `🏆 Ustoz sizga +${bonusXP} bonus XP berdi!`,
                fromTeacher: true,
                createdAt: serverTimestamp(),
                read: false,
                type: 'bonus_xp',
                amount: Number(bonusXP),
            });
            setActionMsg(`✅ +${bonusXP} XP muvaffaqiyatli yuborildi!`);
            setBonusXP('');
            setTimeout(() => setActionMsg(''), 3000);
        } catch (e) {
            console.error(e);
        }
    }, [modal, bonusXP]);

    // ── Send notification ──────────────────────────────────────────────────
    const sendNotification = useCallback(async () => {
        if (!modal || !msgText.trim()) return;
        try {
            await addDoc(collection(db, 'notifications', modal.id, 'messages'), {
                text: msgText.trim(),
                fromTeacher: true,
                createdAt: serverTimestamp(),
                read: false,
                type: 'message',
            });
            setSentMessages(prev => [{ studentName: modal.displayName, text: msgText.trim(), at: new Date().toLocaleString('uz') }, ...prev]);
            setActionMsg('✅ Xabar yuborildi!');
            setMsgText('');
            setTimeout(() => setActionMsg(''), 3000);
        } catch (e) {
            console.error(e);
        }
    }, [modal, msgText]);

    // ── Send assignment ────────────────────────────────────────────────────
    const sendAssignment = useCallback(async (e) => {
        e.preventDefault();
        if (!aTitle.trim()) return;
        setASending(true);
        try {
            await addDoc(collection(db, 'assignments'), {
                title: aTitle.trim(),
                description: aDesc.trim(),
                dueDate: aDate || null,
                teacherId: user.uid,
                teacherName: userData?.displayName || 'Ustoz',
                createdAt: serverTimestamp(),
            });
            setATitle(''); setADesc(''); setADate('');
        } catch (e) {
            console.error(e);
        } finally {
            setASending(false);
        }
    }, [aTitle, aDesc, aDate, user?.uid, userData]);

    // ── Color helpers ──────────────────────────────────────────────────────
    const colorMap = {
        indigo: { ring: 'ring-indigo-500/30', bg: 'bg-indigo-500/10', text: 'text-indigo-400' },
        emerald: { ring: 'ring-emerald-500/30', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
        violet: { ring: 'ring-violet-500/30', bg: 'bg-violet-500/10', text: 'text-violet-400' },
        blue: { ring: 'ring-blue-500/30', bg: 'bg-blue-500/10', text: 'text-blue-400' },
    };

    const TABS = [
        { id: 'students', label: "👥 O'quvchilar" },
        { id: 'stats', label: '📊 Statistika' },
        { id: 'assign', label: '📝 Vazifa' },
        { id: 'messages', label: '🔔 Xabarlar' },
    ];

    // ══════════════════════════════════════════════════════════════════════
    return (
        <div className="h-screen bg-slate-950 flex overflow-hidden">

            {/* ── Sidebar ── */}
            <aside className="w-60 fixed inset-y-0 left-0 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800 flex flex-col z-40">
                <div className="p-5 flex items-center gap-3 border-b border-slate-800">
                    <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-2 rounded-xl">
                        <Atom size={22} className="text-white" />
                    </div>
                    <div>
                        <p className="text-white font-bold text-sm">NurFizika</p>
                        <p className="text-indigo-400 text-xs">Ustoz Paneli</p>
                    </div>
                </div>

                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    {TABS.map(t => (
                        <button key={t.id} onClick={() => setActiveTab(t.id)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left
                                ${activeTab === t.id
                                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
                            {t.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800 space-y-2">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-600/30 flex items-center justify-center text-indigo-300 font-bold text-sm">
                            {userData?.displayName?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div className="min-w-0">
                            <p className="text-white text-sm font-medium truncate">{userData?.displayName || 'Ustoz'}</p>
                            <p className="text-slate-500 text-xs truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button onClick={() => { logout(); navigate('/login'); }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl text-sm transition-all duration-200">
                        <LogOut size={15} /> Chiqish
                    </button>
                </div>
            </aside>

            {/* ── Main Content ── */}
            <main className="ml-60 flex-1 p-6 lg:p-8 max-w-[1400px] overflow-y-auto h-screen">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            {TABS.find(t => t.id === activeTab)?.label}
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">
                            Salom, <span className="text-white font-medium">{userData?.displayName}</span> — NurFizika o'qituvchi paneli
                        </p>
                    </div>
                    <span className="bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-sm font-semibold px-4 py-2 rounded-xl">
                        🔐 Ustoz
                    </span>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {loading
                        ? [1, 2, 3, 4].map(i => <SkeletonCard key={i} />)
                        : stats.map((s, i) => {
                            const Icon = s.icon;
                            const c = colorMap[s.color];
                            return (
                                <div key={i} className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 ring-1 ${c.ring} hover:scale-105 transition-all duration-300`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-slate-400 text-sm">{s.label}</p>
                                        <div className={`${c.bg} p-2 rounded-xl`}>
                                            <Icon size={16} className={c.text} />
                                        </div>
                                    </div>
                                    <p className={`text-3xl font-bold ${c.text}`}>{s.value}</p>
                                </div>
                            );
                        })
                    }
                </div>

                {/* ─── TAB 1: O'QUVCHILAR ─── */}
                {activeTab === 'students' && (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                        {/* Search + Sort */}
                        <div className="p-4 border-b border-slate-800 flex flex-wrap gap-3 items-center">
                            <div className="relative flex-1 min-w-[200px]">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    placeholder="Ism yoki email bo'yicha qidirish..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm outline-none focus:border-indigo-500 transition-colors"
                                />
                            </div>
                            <div className="flex gap-2">
                                {[['totalXP', 'XP'], ['level', 'Level'], ['streak', 'Streak']].map(([key, lbl]) => (
                                    <button key={key} onClick={() => setSortBy(key)}
                                        className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${sortBy === key ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
                                        {lbl}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Table */}
                        {loading ? (
                            <div className="p-8 space-y-3">
                                {[1, 2, 3].map(i => <div key={i} className="h-12 bg-slate-800 rounded-xl animate-pulse" />)}
                            </div>
                        ) : displayed.length === 0 ? (
                            <div className="p-16 text-center">
                                <BookOpen size={48} className="text-slate-700 mx-auto mb-4" />
                                <p className="text-slate-500 text-lg font-medium">O'quvchilar topilmadi</p>
                                <p className="text-slate-600 text-sm mt-1">Hali hech qanday o'quvchi ro'yxatdan o'tmagan</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                                            <th className="px-4 py-3 text-left">#</th>
                                            <th className="px-4 py-3 text-left">O'quvchi</th>
                                            <th className="px-4 py-3 text-center">Level</th>
                                            <th className="px-4 py-3 text-center">Jami XP</th>
                                            <th className="px-4 py-3 text-center">Streak</th>
                                            <th className="px-4 py-3 text-center">So'nggi faollik</th>
                                            <th className="px-4 py-3 text-center">Holat</th>
                                            <th className="px-4 py-3 text-center">Amal</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {displayed.map((s, idx) => {
                                            const status = getStatus(s.activeDates);
                                            const last = s.activeDates?.at?.(-1);
                                            const dAgo = daysBetween(last);
                                            return (
                                                <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                                                    <td className="px-4 py-3 text-slate-500">{idx + 1}</td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold text-sm flex-shrink-0">
                                                                {s.displayName?.[0]?.toUpperCase() || '?'}
                                                            </div>
                                                            <div>
                                                                <p className="text-white font-medium">{s.displayName || 'Nomalum'}</p>
                                                                <p className="text-slate-500 text-xs">{s.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <span className="text-violet-400 font-bold">L{s.currentLevel || 1}</span>
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <span className="text-indigo-400 font-semibold">{(s.totalXP || 0).toLocaleString()}</span>
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <span className="text-orange-400 font-medium">🔥 {s.streakDays || 0}</span>
                                                    </td>
                                                    <td className="px-4 py-3 text-center text-slate-400 text-xs">
                                                        {last ? `${dAgo === 0 ? 'Bugun' : `${dAgo} kun oldin`}` : '—'}
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-medium border ${status.bg} ${status.text} ${status.border}`}>
                                                            {status.label}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <button onClick={() => { setModal(s); setActionMsg(''); setBonusXP(''); setMsgText(''); }}
                                                            className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-xl transition-all duration-200">
                                                            <Eye size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* ─── TAB 2: STATISTIKA ─── */}
                {activeTab === 'stats' && (
                    <div className="space-y-6">
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                            <h3 className="text-white font-semibold mb-1">📅 Kunlik faollik (so'nggi 7 kun)</h3>
                            <p className="text-slate-500 text-xs mb-4">Har kuni aktiv bo'lgan o'quvchilar soni</p>
                            {loading ? <div className="h-44 bg-slate-800 rounded-xl animate-pulse" /> : <DailyActivityChart students={students} />}
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6">
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                                <h3 className="text-white font-semibold mb-1">📚 Bob bo'yicha progress</h3>
                                <p className="text-slate-500 text-xs mb-4">O'quvchilar o'rtacha XP asosida baholangan</p>
                                {loading ? <div className="h-44 bg-slate-800 rounded-xl animate-pulse" /> : <ChapterProgressChart students={students} />}
                            </div>

                            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                                <h3 className="text-white font-semibold mb-1">🏆 Level taqsimoti</h3>
                                <p className="text-slate-500 text-xs mb-4">Jami {students.length} o'quvchi XP darajalari bo'yicha</p>
                                {loading ? <div className="h-44 bg-slate-800 rounded-xl animate-pulse" /> : <LevelDonutChart students={students} />}
                            </div>
                        </div>
                    </div>
                )}

                {/* ─── TAB 3: VAZIFA BERISH ─── */}
                {activeTab === 'assign' && (
                    <div className="space-y-6">
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-2xl">
                            <h3 className="text-white font-semibold mb-4">📢 Yangi Vazifa Berish</h3>
                            <form onSubmit={sendAssignment} className="space-y-4">
                                <div>
                                    <label className="text-slate-400 text-sm block mb-1.5">Vazifa mavzusi *</label>
                                    <input
                                        placeholder="Masalan: §5 ni o'qib, 3 ta misol yeching"
                                        value={aTitle}
                                        onChange={e => setATitle(e.target.value)}
                                        required
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-indigo-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-slate-400 text-sm block mb-1.5">Tavsif (ixtiyoriy)</label>
                                    <textarea
                                        placeholder="Vazifa haqida qo'shimcha ma'lumot..."
                                        value={aDesc}
                                        onChange={e => setADesc(e.target.value)}
                                        rows={4}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-indigo-500 transition-colors resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-slate-400 text-sm block mb-1.5">Topshirish muddati</label>
                                    <input
                                        type="date"
                                        value={aDate}
                                        onChange={e => setADate(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-indigo-500 transition-colors"
                                    />
                                </div>
                                <button type="submit" disabled={aSending || !aTitle.trim()}
                                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                                    {aSending ? '⏳ Yuborilmoqda...' : '📢 Barcha o\'quvchilarga Yuborish'}
                                </button>
                            </form>
                        </div>

                        {/* Sent assignments */}
                        {assignments.length > 0 && (
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                                <div className="p-4 border-b border-slate-800">
                                    <h3 className="text-white font-semibold">📋 Yuborilgan Vazifalar</h3>
                                </div>
                                <div className="divide-y divide-slate-800">
                                    {assignments.map(a => (
                                        <div key={a.id} className="p-4 hover:bg-slate-800/30 transition-colors">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="text-white font-medium">{a.title}</p>
                                                    {a.description && <p className="text-slate-400 text-sm mt-1">{a.description}</p>}
                                                </div>
                                                {a.dueDate && (
                                                    <span className="flex items-center gap-1.5 text-orange-400 text-xs bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-lg flex-shrink-0">
                                                        <Clock size={12} /> {a.dueDate}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-slate-600 text-xs mt-2">
                                                {a.createdAt?.toDate?.()?.toLocaleDateString?.('uz') || '—'}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ─── TAB 4: XABARLAR ─── */}
                {activeTab === 'messages' && (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                        <div className="p-4 border-b border-slate-800">
                            <h3 className="text-white font-semibold">📨 Yuborilgan Xabarlar</h3>
                            <p className="text-slate-500 text-xs mt-1">O'quvchilarga yuborganhttps xabarlar tarixi</p>
                        </div>
                        {sentMessages.length === 0 ? (
                            <div className="p-16 text-center">
                                <Bell size={48} className="text-slate-700 mx-auto mb-4" />
                                <p className="text-slate-500 text-lg font-medium">Xabarlar yo'q</p>
                                <p className="text-slate-600 text-sm mt-1">O'quvchi kartasini ochib xabar yuboring</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-800">
                                {sentMessages.map((m, i) => (
                                    <div key={i} className="p-4 flex items-start gap-3 hover:bg-slate-800/30 transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold text-sm flex-shrink-0">
                                            {m.studentName?.[0]?.toUpperCase() || '?'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-white font-medium text-sm">{m.studentName}</p>
                                                <p className="text-slate-600 text-xs flex-shrink-0">{m.at}</p>
                                            </div>
                                            <p className="text-slate-400 text-sm mt-0.5">{m.text}</p>
                                        </div>
                                        <CheckCircle size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* ─── STUDENT DETAIL MODAL ─── */}
            {modal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setModal(null)}>
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl"
                        onClick={e => e.stopPropagation()}>

                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-5 border-b border-slate-800">
                            <div className="flex items-center gap-4">
                                <XPRing xp={modal.totalXP || 0} size={72} />
                                <div>
                                    <h2 className="text-white text-xl font-bold">{modal.displayName || 'Nomalum'}</h2>
                                    <p className="text-slate-400 text-sm">{modal.email}</p>
                                    <div className="flex items-center gap-3 mt-1.5">
                                        <span className="text-orange-400 text-sm">🔥 {modal.streakDays || 0} kun streak</span>
                                        {(() => {
                                            const st = getStatus(modal.activeDates);
                                            return <span className={`text-xs px-2 py-0.5 rounded-lg border ${st.bg} ${st.text} ${st.border}`}>{st.label}</span>;
                                        })()}
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setModal(null)}
                                className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-5 space-y-5">
                            {/* Stats row */}
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { label: 'Jami XP', val: (modal.totalXP || 0).toLocaleString(), color: 'indigo' },
                                    { label: 'Level', val: `Level ${modal.currentLevel || 1}`, color: 'violet' },
                                    { label: 'Mintaqa', val: modal.region || '—', color: 'blue' },
                                ].map((s, i) => (
                                    <div key={i} className={`bg-slate-800/60 border border-slate-700 rounded-xl p-3 text-center`}>
                                        <p className="text-slate-500 text-xs mb-1">{s.label}</p>
                                        <p className={`text-${s.color}-400 font-bold`}>{s.val}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Action message */}
                            {actionMsg && (
                                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-emerald-400 text-sm text-center">
                                    {actionMsg}
                                </div>
                            )}

                            {/* Bonus XP */}
                            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
                                <p className="text-white font-medium mb-3">⚡ Bonus XP Berish</p>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="XP miqdori (masalan: 100)"
                                        value={bonusXP}
                                        onChange={e => setBonusXP(e.target.value)}
                                        min="1" max="1000"
                                        className="flex-1 bg-slate-700 border border-slate-600 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-indigo-500 transition-colors"
                                    />
                                    <button onClick={sendBonusXP} disabled={!bonusXP}
                                        className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap hover:scale-105 active:scale-95">
                                        ⚡ Ber
                                    </button>
                                </div>
                            </div>

                            {/* Send message */}
                            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
                                <p className="text-white font-medium mb-3">📩 Xabar Yuborish</p>
                                <div className="flex gap-2">
                                    <input
                                        placeholder="Xabar matni..."
                                        value={msgText}
                                        onChange={e => setMsgText(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && sendNotification()}
                                        className="flex-1 bg-slate-700 border border-slate-600 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-indigo-500 transition-colors"
                                    />
                                    <button onClick={sendNotification} disabled={!msgText.trim()}
                                        className="bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap hover:scale-105 active:scale-95">
                                        <Send size={15} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
