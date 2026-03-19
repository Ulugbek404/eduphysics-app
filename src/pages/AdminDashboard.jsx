import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    collection, query, where, orderBy, limit, onSnapshot,
    addDoc, updateDoc, deleteDoc, doc, getDoc, setDoc,
    serverTimestamp, getDocs
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import {
    Users, LayoutDashboard, BookOpen, Megaphone, Settings,
    Search, Eye, Zap, Send, LogOut, Atom, TrendingUp, Activity,
    X, CheckCircle, Clock, AlertCircle, Info, AlertTriangle,
    Shield, Ban, ChevronRight, Edit, Trash2, Plus, Save,
    Bell, Filter, RefreshCw, BarChart2, Globe, ChevronDown,
    UserCheck, UserX, Star, Award, Calendar, FileText, Download,
    Radio, Gamepad2, ArrowRight, Menu, MessageSquare
} from 'lucide-react';

// ── Helpers ──────────────────────────────────────────────────────────────────
const todayStr = () => new Date().toISOString().slice(0, 10);
const daysBetween = d => d ? Math.floor((Date.now() - new Date(d)) / 86400000) : 999;
const lastSevenDays = () => Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - 6 + i); return d.toISOString().slice(0, 10);
});
const DAYS_UZ = ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'];
const fmtDate = ts => ts?.toDate ? ts.toDate().toLocaleDateString('uz-UZ') : '—';

// XP ni istalgan field nomi bilan olish
const getXP = s => s?.xp || s?.totalXP || s?.currentXP || 0;

// activeDates massivida berilgan YYYY-MM-DD kuni borligini tekshirish
// activeDates elementlari string ('2025-01-01') yoki timestamp bo'lishi mumkin
const hasActiveDate = (activeDates, dateStr) => {
    if (!Array.isArray(activeDates)) return false;
    return activeDates.some(d => {
        if (typeof d === 'string') return d.slice(0, 10) === dateStr;
        if (d?.toDate) return d.toDate().toISOString().slice(0, 10) === dateStr;
        if (d instanceof Date) return d.toISOString().slice(0, 10) === dateStr;
        return String(d).slice(0, 10) === dateStr;
    });
};

// So'nggi faol kunni topish
const getLastActive = activeDates => {
    if (!Array.isArray(activeDates) || activeDates.length === 0) return null;
    const dates = activeDates.map(d => {
        if (typeof d === 'string') return d.slice(0, 10);
        if (d?.toDate) return d.toDate().toISOString().slice(0, 10);
        if (d instanceof Date) return d.toISOString().slice(0, 10);
        return String(d).slice(0, 10);
    });
    return dates.sort().at(-1);
};

const getStatus = activeDates => {
    const d = daysBetween(getLastActive(activeDates));
    if (d <= 2) return { label: 'Faol', bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30', dot: 'bg-emerald-400' };
    if (d <= 7) return { label: 'Kam faol', bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30', dot: 'bg-yellow-400' };
    return { label: 'Nofaol', bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', dot: 'bg-red-400' };
};

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
    useEffect(() => { const t = setTimeout(onClose, 3200); return () => clearTimeout(t); }, [onClose]);
    return (
        <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-medium
            ${type === 'error' ? 'bg-red-900/95 border-red-500/40 text-red-200' : 'bg-emerald-900/95 border-emerald-500/40 text-emerald-200'}`}>
            {type === 'error' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
            {msg}
            <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100"><X size={14} /></button>
        </div>
    );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
const Skel = ({ h = 'h-10', w = 'w-full' }) => <div className={`${h} ${w} bg-slate-800 rounded-xl animate-pulse`} />;

// ── SVG Bar Chart ─────────────────────────────────────────────────────────────
function BarChart({ students }) {
    const days = lastSevenDays();
    const counts = days.map(d => students.filter(s => hasActiveDate(s.activeDates, d)).length);
    const mx = Math.max(...counts, 1);
    const W = 460, H = 140, pad = 28, bw = 54;
    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-36">
            {[0, .5, 1].map((r, i) => <line key={i} x1={30} x2={W - 8} y1={H - pad - r * (H - pad - 10)} y2={H - pad - r * (H - pad - 10)} stroke="#334155" strokeWidth="0.5" strokeDasharray="4,4" />)}
            {counts.map((c, i) => {
                const bh = (c / mx) * (H - pad - 10), bx = 30 + i * bw + 8, by = H - pad - bh;
                const day = new Date(days[i]);
                return <g key={i}>
                    <rect x={bx} y={by} width={bw - 16} height={bh} rx="4" fill={days[i] === todayStr() ? '#6366f1' : '#4f46e5'} opacity="0.85" />
                    <text x={bx + (bw - 16) / 2} y={H - 8} textAnchor="middle" fill="#94a3b8" fontSize="10">{DAYS_UZ[day.getDay()]}</text>
                    {c > 0 && <text x={bx + (bw - 16) / 2} y={by - 4} textAnchor="middle" fill="#a5b4fc" fontSize="9">{c}</text>}
                </g>;
            })}
        </svg>
    );
}

// ── Donut Chart ───────────────────────────────────────────────────────────────
function DonutChart({ students }) {
    const total = students.length || 1;
    const segs = [
        { val: students.filter(s => getXP(s) < 500).length, color: '#3b82f6', label: 'Boshlang\'ich', sub: '0–499 XP' },
        { val: students.filter(s => getXP(s) >= 500 && getXP(s) < 1500).length, color: '#6366f1', label: 'O\'rta', sub: '500–1499 XP' },
        { val: students.filter(s => getXP(s) >= 1500).length, color: '#8b5cf6', label: 'Ilg\'or', sub: '1500+ XP' },
    ];
    const r = 55, cx = 70, cy = 70, circ = 2 * Math.PI * r;
    let off = 0;
    return (
        <div className="flex items-center gap-6">
            <svg viewBox="0 0 140 140" className="w-32 h-32 flex-shrink-0">
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1e293b" strokeWidth="20" />
                {segs.map((s, i) => {
                    const dash = (s.val / total) * circ;
                    const arc = { dash, off }; off += dash;
                    return <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth="20"
                        strokeDasharray={`${arc.dash} ${circ - arc.dash}`}
                        strokeDashoffset={-arc.off}
                        transform={`rotate(-90 ${cx} ${cy})`} />;
                })}
                <text x={cx} y={cy - 5} textAnchor="middle" fill="#f1f5f9" fontSize="20" fontWeight="bold">{total}</text>
                <text x={cx} y={cy + 12} textAnchor="middle" fill="#94a3b8" fontSize="9">o'quvchi</text>
            </svg>
            <div className="space-y-2.5">
                {segs.map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                        <div>
                            <p className="text-slate-300 text-xs font-medium">{s.label}</p>
                            <p className="text-slate-500 text-xs">{s.sub} — {s.val} ta</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── XP Ring ───────────────────────────────────────────────────────────────────
function XPRing({ xp = 0, size = 64 }) {
    const lv = Math.floor(xp / 500) + 1, pct = (xp % 500) / 500, r = size / 2 - 6, circ = 2 * Math.PI * r, cx = size / 2;
    return (
        <svg width={size} height={size} className="flex-shrink-0">
            <circle cx={cx} cy={cx} r={r} fill="none" stroke="#1e293b" strokeWidth="5" />
            <circle cx={cx} cy={cx} r={r} fill="none" stroke="#6366f1" strokeWidth="5"
                strokeDasharray={`${pct * circ} ${circ}`} strokeDashoffset={circ * 0.25}
                transform={`rotate(-90 ${cx} ${cx})`} />
            <text x={cx} y={cx - 3} textAnchor="middle" fill="#f1f5f9" fontSize={size * 0.18} fontWeight="bold">L{lv}</text>
            <text x={cx} y={cx + 10} textAnchor="middle" fill="#94a3b8" fontSize={size * 0.13}>{xp}</text>
        </svg>
    );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
function StatCard({ icon: Icon, label, value, sub, color }) {
    return (
        <div className="relative overflow-hidden group rounded-2xl p-5 flex items-start gap-4 bg-slate-900/40 border border-slate-700/50 backdrop-blur-xl hover:border-indigo-500/30 hover:bg-slate-800/60 transition-all duration-300 shadow-xl">
            {/* Background glow effect */}
            <div className={`absolute -inset-2 bg-gradient-to-r ${color.replace('bg-', 'from-').replace('-600', '-500')} to-transparent opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 rounded-[2rem]`} />

            <div className={`relative p-3.5 rounded-xl ${color} flex-shrink-0 shadow-lg shadow-black/20 ring-1 ring-white/10`}>
                <Icon size={22} className="text-white drop-shadow-md" />
            </div>
            <div className="relative z-10 flex-1">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">{label}</p>
                <div className="flex items-baseline gap-2">
                    <p className="text-white text-3xl font-extrabold tracking-tight">{value}</p>
                </div>
                {sub && <p className="text-slate-500 text-xs mt-1.5 font-medium">{sub}</p>}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 6 — CONTACTS
// ─────────────────────────────────────────────────────────────────────────────
const AdminContacts = () => {
    const [messages, setMessages] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        const q = collection(db, "contacts");
        const unsub = onSnapshot(q, snap => {
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            data.sort((a, b) => {
                const ta = a.createdAt?.toMillis?.() || 0;
                const tb = b.createdAt?.toMillis?.() || 0;
                return tb - ta;
            });
            setMessages(data);
        }, err => {
            console.error("[AdminContacts] Xatolik:", err);
            if (err.code === 'permission-denied') {
                alert("Xatolik: Firestore Permission Denied. Siz admin emassiz yoki Rules xato.");
            }
        });
        return () => unsub();
    }, []);

    const markAsRead = async (id) => {
        await updateDoc(doc(db, "contacts", id), { read: true });
    };

    const deleteMessage = async (id) => {
        if (!window.confirm('Xabarni o\'chirishni tasdiqlaysizmi?')) return;
        await deleteDoc(doc(db, "contacts", id));
        setSelected(null);
    };

    const unreadCount = messages.filter(m => !m.read).length;

    return (
        <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
                <div>
                   <h2 className="text-white font-bold text-xl">Kelib tushgan xabarlar</h2>
                   <p className="text-slate-400 text-sm mt-1">Foydalanuvchilar qoldirgan murojaatlar ro'yxati</p>
                </div>
                {unreadCount > 0 && (
                    <span className="px-3 py-1 bg-pink-500/20 text-pink-400 border border-pink-500/30 text-xs rounded-lg font-bold">
                        {unreadCount} yangi xabar
                    </span>
                )}
            </div>

            {messages.length === 0 ? (
                <div className="bg-slate-900/40 border border-slate-700/50 backdrop-blur-md rounded-2xl py-20 text-center text-slate-500 shadow-xl">
                    <MessageSquare size={48} className="mx-auto mb-4 opacity-30 text-indigo-400" />
                    <p className="font-semibold">Hali xabar yo'q</p>
                </div>
            ) : (
                <div className="grid gap-3 max-w-4xl">
                    {messages.map(msg => (
                        <div
                            key={msg.id}
                            onClick={() => { setSelected(msg); markAsRead(msg.id); }}
                            className={`p-5 rounded-2xl border cursor-pointer transition-all hover:-translate-y-0.5 shadow-md
                                ${!msg.read
                                    ? 'border-indigo-500/40 bg-indigo-500/10 hover:shadow-indigo-500/20'
                                    : 'border-slate-700/50 bg-slate-900/40 hover:bg-slate-800/60 hover:border-slate-600/50'}`}>
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        {!msg.read && (
                                            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                                        )}
                                        <p className="text-white font-bold truncate text-[15px]">
                                            {msg.name}
                                        </p>
                                        <span className="px-2 py-0.5 rounded border border-slate-700 text-slate-400 text-[10px] shrink-0 font-medium">
                                            {msg.email}
                                        </span>
                                    </div>
                                    <p className={`text-sm truncate mt-1 ${!msg.read ? 'text-indigo-200 font-semibold' : 'text-slate-300'}`}>
                                        {msg.subject}
                                    </p>
                                    <p className="text-slate-500 text-sm mt-1.5 truncate max-w-[80%]">
                                        {msg.message}
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                   <p className="text-slate-500 text-[11px] font-semibold tracking-wide">
                                       {msg.createdAt?.toDate().toLocaleDateString('uz')}
                                   </p>
                                   <p className="text-slate-600 text-[10px] mt-1">
                                       {msg.createdAt?.toDate().toLocaleTimeString('uz')}
                                   </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Xabar detail modal */}
            {selected && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                     onClick={(e) => { if(e.target === e.currentTarget) setSelected(null); }}>
                    <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/50 rounded-2xl p-6 md:p-8 shadow-2xl animate-fadeIn">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-inner flex-shrink-0">
                                    {selected.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-xl leading-tight">
                                        {selected.subject}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                        <p className="text-slate-300 text-sm font-medium">{selected.name}</p>
                                        <span className="text-slate-600 text-xs text-sm">•</span>
                                        <p className="text-indigo-400 text-sm">{selected.email}</p>
                                        <span className="text-slate-600 text-xs text-sm">•</span>
                                         <p className="text-slate-500 text-xs font-semibold">
                                            {selected.createdAt?.toDate().toLocaleString('uz')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setSelected(null)}
                                className="text-slate-500 hover:text-white bg-slate-800 p-2 rounded-lg transition-colors border border-transparent hover:border-slate-700">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 custom-scrollbar max-h-[50vh] overflow-y-auto">
                           <p className="text-slate-200 leading-relaxed text-[15px] whitespace-pre-wrap">
                                {selected.message}
                            </p>
                        </div>

                        <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-800">
                             <a
                                href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(selected.email)}&su=${encodeURIComponent('RE: ' + selected.subject)}&body=${encodeURIComponent('Salom ' + selected.name + ',\n\n')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20 border border-indigo-500/50">
                                 📧 Gmail orqali javob berish
                             </a>
                            <button
                                onClick={() => deleteMessage(selected.id)}
                                className="px-5 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-sm font-bold rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all flex items-center gap-2">
                                <Trash2 size={16} /> O'chirish
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// TAB 1 — OVERVIEW
// ─────────────────────────────────────────────────────────────────────────────
function OverviewTab({ students, loading }) {
    const today = todayStr();
    const activeToday = students.filter(s => hasActiveDate(s.activeDates, today)).length;
    const totalXP = students.reduce((sum, s) => sum + getXP(s), 0);
    const blocked = students.filter(s => s.blocked === true).length;

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {loading ? [1, 2, 3, 4].map(i => <Skel key={i} h="h-28" />) : <>
                    <StatCard icon={Users} label="Jami o'quvchilar" value={students.length} sub="Ro'yxatdan o'tgan" color="bg-indigo-600" />
                    <StatCard icon={Activity} label="Bugun faol" value={activeToday} sub={`${today}`} color="bg-emerald-600" />
                    <StatCard icon={Zap} label="Umumiy XP" value={totalXP.toLocaleString()} sub="Barcha o'quvchilar" color="bg-violet-600" />
                    <StatCard icon={Ban} label="Bloklangan" value={blocked} sub="Akkauntlar" color="bg-red-700" />
                </>}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Bar chart */}
                <div className="bg-slate-900/40 border border-slate-700/50 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:border-slate-600/50 transition-colors">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="text-base font-bold text-white">Haftalik Faollik</p>
                            <p className="text-xs text-slate-500 mt-0.5">So'nggi 7 kunda faol o'quvchilar soni</p>
                        </div>
                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                            <TrendingUp size={16} className="text-indigo-400" />
                        </div>
                    </div>
                    {loading ? <Skel h="h-36" /> : <BarChart students={students} />}
                </div>
                {/* Donut chart */}
                <div className="bg-slate-900/40 border border-slate-700/50 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:border-slate-600/50 transition-colors">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="text-base font-bold text-white">O'quvchi Darajalari</p>
                            <p className="text-xs text-slate-500 mt-0.5">XP darajasi bo'yicha taqsimot</p>
                        </div>
                        <div className="p-2 bg-violet-500/10 rounded-lg">
                            <Star size={16} className="text-violet-400" />
                        </div>
                    </div>
                    {loading ? <Skel h="h-36" /> : <DonutChart students={students} />}
                </div>
            </div>

            {/* Recent students */}
            <div className="bg-slate-900/40 border border-slate-700/50 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
                <div className="px-6 py-5 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/20">
                    <p className="text-base font-bold text-white flex items-center gap-2">
                        <UserCheck size={18} className="text-indigo-400" />
                        So'nggi Qo'shilganlar
                    </p>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">Oxirgi 5 ta</span>
                </div>
                <div className="divide-y divide-slate-700/30">
                    {loading
                        ? [1, 2, 3].map(i => <div key={i} className="px-6 py-4"><Skel h="h-10" /></div>)
                        : [...students]
                            .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
                            .slice(0, 5)
                            .map(s => {
                                const st = getStatus(s.activeDates);
                                return (
                                    <div key={s.uid || s.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-800/40 transition-colors group">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-inner ring-1 ring-white/20 group-hover:scale-105 transition-transform duration-300">
                                            {(s.displayName || s.email || '?')[0].toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-slate-200 text-sm font-semibold truncate group-hover:text-indigo-300 transition-colors">{s.displayName || '—'}</p>
                                            <p className="text-slate-500 text-xs truncate">{s.email}</p>
                                        </div>
                                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${st.bg} ${st.text} ${st.border}`}>{st.label}</span>
                                        <div className="text-right w-20">
                                            <span className="text-white text-sm font-bold block">{s.totalXP || 0}</span>
                                            <span className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold block mt-0.5">XP</span>
                                        </div>
                                    </div>
                                );
                            })
                    }
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 2 — STUDENTS
// ─────────────────────────────────────────────────────────────────────────────
function StudentsTab({ students, loading, showToast, onRefresh }) {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all'); // all | active | inactive | blocked
    const [selected, setSelected] = useState(null); // student detail modal
    const [actionLoading, setActionLoading] = useState('');

    const filtered = useMemo(() => {
        let list = students;
        if (search) list = list.filter(s =>
            (s.displayName || '').toLowerCase().includes(search.toLowerCase()) ||
            (s.email || '').toLowerCase().includes(search.toLowerCase())
        );
        if (filter === 'active') list = list.filter(s => daysBetween(s.activeDates?.at(-1)) <= 2);
        if (filter === 'inactive') list = list.filter(s => daysBetween(s.activeDates?.at(-1)) > 7);
        if (filter === 'blocked') list = list.filter(s => s.blocked);
        return list;
    }, [students, search, filter]);

    const handleBlock = async (student) => {
        setActionLoading(student.uid);
        try {
            await updateDoc(doc(db, 'users', student.uid), { blocked: !student.blocked });
            showToast(student.blocked ? `${student.displayName || student.email} blokdan chiqarildi` : `${student.displayName || student.email} bloklandi`, 'success');
            if (selected?.uid === student.uid) setSelected(p => ({ ...p, blocked: !p.blocked }));
        } catch { showToast("Xatolik yuz berdi", 'error'); }
        setActionLoading('');
    };

    const handleDelete = async (student) => {
        if (!window.confirm(`${student.displayName || student.email} ni o'chirishni tasdiqlaysizmi?`)) return;
        setActionLoading(student.uid);
        try {
            await deleteDoc(doc(db, 'users', student.uid));
            showToast("O'quvchi o'chirildi", 'success');
            if (selected?.uid === student.uid) setSelected(null);
        } catch { showToast("O'chirishda xatolik", 'error'); }
        setActionLoading('');
    };

    const FILTERS = [
        { id: 'all', label: 'Barchasi' },
        { id: 'active', label: '🟢 Faol' },
        { id: 'inactive', label: '🔴 Nofaol' },
        { id: 'blocked', label: '🚫 Bloklangan' },
    ];

    return (
        <div className="animate-fadeIn space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        type="search" autoComplete="off"
                        value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Ism yoki email bo'yicha qidirish..."
                        className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500/50 focus:outline-none transition-all"
                    />
                </div>
                <div className="flex gap-1.5 flex-wrap">
                    {FILTERS.map(f => (
                        <button key={f.id} onClick={() => setFilter(f.id)}
                            className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${filter === f.id ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}>
                            {f.label}
                        </button>
                    ))}
                </div>
                <button onClick={onRefresh} className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all hover:bg-slate-700">
                    <RefreshCw size={15} />
                </button>
            </div>

            {/* Count */}
            <p className="text-slate-500 text-xs">{filtered.length} ta o'quvchi topildi</p>

            {/* Table / Cards */}
            <div className="bg-slate-900/40 border border-slate-700/50 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
                {/* Desktop table header - hidden on mobile */}
                <div className="hidden md:grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_auto] gap-4 px-6 py-4 border-b border-slate-700/50 text-[11px] text-slate-400 font-bold uppercase tracking-widest bg-slate-800/30">
                    <span>Foydalanuvchi</span>
                    <span>Email</span>
                    <span>Holat</span>
                    <span>XP / Level</span>
                    <span>Qo'shilgan</span>
                    <span>Amallar</span>
                </div>
                <div className="divide-y divide-slate-700/30">
                    {loading
                        ? [1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="px-5 py-4"><Skel h="h-8" /></div>
                        ))
                        : filtered.length === 0
                            ? <div className="py-16 text-center text-slate-600">
                                <Users size={40} className="mx-auto mb-3 opacity-30" />
                                <p>O'quvchi topilmadi</p>
                            </div>
                            : filtered.map(s => {
                                const st = getStatus(s.activeDates);
                                const lv = Math.floor((s.totalXP || 0) / 500) + 1;
                                return (
                                    <div key={s.uid || s.id}
                                        className={`hover:bg-slate-800/40 transition-colors group ${s.blocked ? 'opacity-50 grayscale' : ''}`}>
                                        {/* Mobile card layout */}
                                        <div className="md:hidden px-4 py-4 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                                {(s.displayName || s.email || '?')[0].toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-slate-200 text-sm font-semibold truncate">{s.displayName || '—'}</p>
                                                <p className="text-slate-500 text-xs truncate">{s.email}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${st.bg} ${st.text} ${st.border}`}>{st.label}</span>
                                                    <span className="text-slate-400 text-xs">{(s.totalXP || 0)} XP</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <button onClick={() => setSelected(s)} className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 transition-all"><Eye size={14} /></button>
                                                <button onClick={() => handleBlock(s)} disabled={actionLoading === s.uid} className="p-1.5 rounded-lg text-slate-400 hover:text-yellow-400 transition-all">
                                                    {s.blocked ? <UserCheck size={14} /> : <Ban size={14} />}
                                                </button>
                                                <button onClick={() => handleDelete(s)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 transition-all"><Trash2 size={14} /></button>
                                            </div>
                                        </div>
                                        {/* Desktop row layout */}
                                        <div className={`hidden md:grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_auto] gap-4 items-center px-6 py-4`}>
                                            {/* User */}
                                            <div className="flex items-center gap-3.5 min-w-0">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-inner ring-1 ring-white/20 group-hover:scale-105 transition-transform duration-300">
                                                    {(s.displayName || s.email || '?')[0].toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-slate-200 text-sm font-semibold truncate group-hover:text-indigo-300 transition-colors">{s.displayName || '—'}</p>
                                                    {s.blocked && <span className="text-[10px] font-bold uppercase tracking-widest text-red-400 mt-0.5 block">Bloklangan</span>}
                                                </div>
                                            </div>
                                            {/* Email */}
                                            <p className="text-slate-400 text-xs truncate font-medium">{s.email}</p>
                                            {/* Status */}
                                            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border w-fit ${st.bg} ${st.text} ${st.border}`}>{st.label}</span>
                                            {/* XP */}
                                            <div>
                                                <p className="text-white text-sm font-bold">{(s.totalXP || 0).toLocaleString()} <span className="text-[10px] text-slate-500 font-semibold tracking-wider">XP</span></p>
                                                <p className="text-indigo-400 text-xs font-semibold mt-0.5">Daraja {lv}</p>
                                            </div>
                                            {/* Date */}
                                            <p className="text-slate-400 text-xs font-medium">{fmtDate(s.createdAt)}</p>
                                            {/* Actions */}
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => setSelected(s)}
                                                    className="p-2 rounded-xl text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all border border-transparent hover:border-indigo-500/20" title="Ko'rish">
                                                    <Eye size={15} />
                                                </button>
                                                <button onClick={() => handleBlock(s)}
                                                    disabled={actionLoading === s.uid}
                                                    className={`p-2 rounded-xl border transition-all ${s.blocked ? 'text-emerald-400 hover:bg-emerald-500/10 border-transparent hover:border-emerald-500/20' : 'text-slate-400 hover:text-yellow-400 hover:bg-yellow-500/10 border-transparent hover:border-yellow-500/20'}`}
                                                    title={s.blocked ? 'Blokdan chiqarish' : 'Bloklash'}>
                                                    {actionLoading === s.uid
                                                        ? <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                                        : s.blocked ? <UserCheck size={15} /> : <Ban size={15} />}
                                                </button>
                                                <button onClick={() => handleDelete(s)}
                                                    className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20" title="O'chirish">
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                    }
                </div>
            </div>

            {/* Detail Modal */}
            {selected && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl">
                        <div className="flex items-center justify-between p-5 border-b border-slate-800">
                            <h3 className="text-white font-bold">O'quvchi Ma'lumotlari</h3>
                            <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-white transition-colors"><X size={18} /></button>
                        </div>
                        <div className="p-5 space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold">
                                    {(selected.displayName || selected.email || '?')[0].toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-white text-lg font-bold">{selected.displayName || '—'}</p>
                                    <p className="text-slate-400 text-sm">{selected.email}</p>
                                    <p className="text-slate-500 text-xs mt-1">UID: {selected.uid?.slice(0, 12)}...</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: 'Jami XP', value: `${(selected.totalXP || 0).toLocaleString()} XP` },
                                    { label: 'Daraja', value: `${Math.floor((selected.totalXP || 0) / 500) + 1}` },
                                    { label: 'Streak', value: `${selected.streakDays || 0} k` },
                                    { label: 'Holat', value: getStatus(selected.activeDates).label },
                                    { label: 'Qo\'shilgan', value: fmtDate(selected.createdAt) },
                                    { label: 'Faol kunlar', value: `${(selected.activeDates || []).length} t` },
                                ].map(({ label, value }) => (
                                    <div key={label} className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
                                        <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold mb-0.5">{label}</p>
                                        <p className="text-slate-200 text-sm font-bold">{value}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button onClick={() => handleBlock(selected)}
                                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2
                                        ${selected.blocked ? 'bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30'
                                            : 'bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30 border border-yellow-500/30'}`}>
                                    {selected.blocked ? <><UserCheck size={14} />Blokdan chiqarish</> : <><Ban size={14} />Bloklash</>}
                                </button>
                                <button onClick={() => handleDelete(selected)}
                                    className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/30 transition-all flex items-center justify-center gap-2">
                                    <Trash2 size={14} />O'chirish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 3 — ANNOUNCEMENTS
// ─────────────────────────────────────────────────────────────────────────────
function AnnouncementsTab({ showToast }) {
    const { user } = useAuth();
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ title: '', body: '', type: 'info', audience: 'all' });
    const [sending, setSending] = useState(false);
    const [deleting, setDeleting] = useState('');

    useEffect(() => {
        const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'), limit(30));
        const unsub = onSnapshot(q, snap => {
            setAnnouncements(snap.docs.map(d => ({ id: d.id, ...d.data() })));
            setLoading(false);
        }, () => setLoading(false));
        return unsub;
    }, []);

    const handleSend = async () => {
        if (!form.title.trim() || !form.body.trim()) return showToast("Sarlavha va matn kiritilishi shart!", 'error');
        setSending(true);
        try {
            await addDoc(collection(db, 'announcements'), {
                ...form,
                createdAt: serverTimestamp(),
                createdBy: user?.email || 'admin',
                createdByUid: user?.uid,
            });
            showToast("E'lon muvaffaqiyatli yuborildi ✅", 'success');
            setForm({ title: '', body: '', type: 'info', audience: 'all' });
        } catch { showToast("Yuborishda xatolik!", 'error'); }
        setSending(false);
    };

    const handleDelete = async (id) => {
        setDeleting(id);
        try {
            await deleteDoc(doc(db, 'announcements', id));
            showToast("E'lon o'chirildi", 'success');
        } catch { showToast("O'chirishda xatolik", 'error'); }
        setDeleting('');
    };

    const TYPES = [
        { id: 'info', label: 'Ma\'lumot', color: 'text-blue-400', bg: 'bg-blue-500/20 border-blue-500/30', icon: Info },
        { id: 'success', label: 'Muvaffaqiyat', color: 'text-emerald-400', bg: 'bg-emerald-500/20 border-emerald-500/30', icon: CheckCircle },
        { id: 'warning', label: 'Ogohlantirish', color: 'text-yellow-400', bg: 'bg-yellow-500/20 border-yellow-500/30', icon: AlertTriangle },
        { id: 'error', label: 'Muhim', color: 'text-red-400', bg: 'bg-red-500/20 border-red-500/30', icon: AlertCircle },
    ];

    const getTypeStyle = (type) => TYPES.find(t => t.id === type) || TYPES[0];

    return (
        <div className="animate-fadeIn grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: new announcement form */}
            <div className="space-y-4">
                <div className="bg-slate-900/40 border border-slate-700/50 backdrop-blur-md rounded-2xl p-6 shadow-xl space-y-5">
                    <p className="text-base font-bold text-white flex items-center gap-2">
                        <Megaphone size={18} className="text-indigo-400" /> Yangi E'lon
                    </p>

                    {/* Title */}
                    <div>
                        <label className="text-xs text-slate-400 font-semibold tracking-wider uppercase mb-2 block">Sarlavha *</label>
                        <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                            placeholder="E'lon sarlavhasi"
                            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-inner" />
                    </div>

                    {/* Body */}
                    <div>
                        <label className="text-xs text-slate-400 font-semibold tracking-wider uppercase mb-2 block">Matn *</label>
                        <textarea value={form.body} onChange={e => setForm(p => ({ ...p, body: e.target.value }))}
                            placeholder="E'lon matni..."
                            rows={4}
                            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none shadow-inner custom-scrollbar" />
                    </div>

                    {/* Type */}
                    <div>
                        <label className="text-xs text-slate-400 font-semibold tracking-wider uppercase mb-2 block">Tur</label>
                        <div className="grid grid-cols-2 gap-3">
                            {TYPES.map(t => (
                                <button key={t.id} onClick={() => setForm(p => ({ ...p, type: t.id }))}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all shadow-sm
                                        ${form.type === t.id ? `${t.bg} ${t.color} ring-1 ring-${t.color.split('-')[1]}-500/30 scale-100` : 'border-slate-700/50 text-slate-400 hover:border-slate-600 hover:bg-slate-800/50 bg-slate-800/30 scale-95 hover:scale-100'}`}>
                                    <t.icon size={16} />
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Audience */}
                    <div>
                        <label className="text-xs text-slate-400 font-semibold tracking-wider uppercase mb-2 block">Kim uchun</label>
                        <select value={form.audience} onChange={e => setForm(p => ({ ...p, audience: e.target.value }))}
                            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm font-medium text-white focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-inner custom-select">
                            <option value="all">Barcha o'quvchilar</option>
                            <option value="students">Faqat o'quvchilar</option>
                            <option value="active">Faol o'quvchilar</option>
                        </select>
                    </div>

                    <button onClick={handleSend} disabled={sending}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold tracking-wide py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 border border-indigo-500/50">
                        {sending
                            ? <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                            : <Send size={18} />}
                        Yuborish
                    </button>
                </div>
            </div>

            {/* Right: sent announcements */}
            <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-260px)] custom-scrollbar pr-1">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Yuborilgan E'lonlar</p>
                {loading ? [1, 2, 3].map(i => <Skel key={i} h="h-28" />) :
                    announcements.length === 0
                        ? <div className="text-center py-12 text-slate-600">
                            <Megaphone size={36} className="mx-auto mb-3 opacity-30" />
                            <p className="text-sm">Hali e'lon yo'q</p>
                        </div>
                        : announcements.map(a => {
                            const ts = getTypeStyle(a.type);
                            const Icon = ts.icon;
                            return (
                                <div key={a.id} className={`bg-slate-800/50 border rounded-2xl p-4 ${ts.bg}`}>
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <Icon size={14} className={ts.color} />
                                            <p className={`text-sm font-semibold truncate ${ts.color}`}>{a.title}</p>
                                        </div>
                                        <button onClick={() => handleDelete(a.id)} disabled={deleting === a.id}
                                            className="text-slate-600 hover:text-red-400 transition-colors flex-shrink-0 ml-1">
                                            {deleting === a.id
                                                ? <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                                : <X size={14} />}
                                        </button>
                                    </div>
                                    <p className="text-slate-400 text-xs leading-relaxed">{a.body}</p>
                                    <div className="flex items-center gap-3 mt-2.5">
                                        <span className="text-slate-600 text-xs">{fmtDate(a.createdAt)}</span>
                                        <span className="text-slate-600 text-xs">· {a.createdBy}</span>
                                        <span className="text-slate-600 text-xs ml-auto">👥 {a.audience === 'all' ? 'Barcha' : a.audience}</span>
                                    </div>
                                </div>
                            );
                        })
                }
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 4 — SOZLAMALAR (Admin settings)
// ─────────────────────────────────────────────────────────────────────────────
function AdminSettingsTab({ showToast }) {
    const { user } = useAuth();
    const [form, setForm] = useState({ appName: 'NurFizika', maintenanceMode: false, allowRegistration: true, maxStudents: 1000 });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getDoc(doc(db, 'config', 'app')).then(snap => {
            if (snap.exists()) setForm(p => ({ ...p, ...snap.data() }));
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, 'config', 'app'), { ...form, updatedAt: serverTimestamp(), updatedBy: user?.email });
            showToast('Sozlamalar saqlandi ✅', 'success');
        } catch { showToast('Saqlashda xatolik!', 'error'); }
        setSaving(false);
    };

    if (loading) return <div className="space-y-4">{[1, 2, 3].map(i => <Skel key={i} h="h-16" />)}</div>;

    const toggles = [
        { key: 'maintenanceMode', label: 'Texnik ishlar rejimi', desc: 'Yoqilsa, faqat adminlar kira oladi', iconBg: 'bg-yellow-500/20', iconColor: 'text-yellow-400', icon: Settings },
        { key: 'allowRegistration', label: "Ro'yxatdan o'tishga ruxsat", desc: "Yangi o'quvchilar ro'yxatdan o'ta oladi", iconBg: 'bg-emerald-500/20', iconColor: 'text-emerald-400', icon: UserCheck },
    ];

    return (
        <div className="animate-fadeIn max-w-xl space-y-5">
            <div className="bg-slate-900/40 border border-slate-700/50 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
                <div className="px-6 py-5 border-b border-slate-700/50 bg-slate-800/20">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Settings size={14} className="text-violet-400" />
                        Umumiy Sozlamalar
                    </p>
                </div>
                <div className="divide-y divide-slate-700/30">
                    {toggles.map((
                        // eslint-disable-next-line no-unused-vars
                        { key, label, desc, iconBg, iconColor, icon: Icon }
                    ) => (
                        <div key={key} className="flex items-center justify-between px-6 py-5 hover:bg-slate-800/40 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${iconBg} shadow-inner ring-1 ring-white/10 group-hover:scale-105 transition-transform duration-300`}>
                                    <Icon size={20} className={iconColor} />
                                </div>
                                <div>
                                    <p className="text-white text-sm font-bold group-hover:text-violet-300 transition-colors">{label}</p>
                                    <p className="text-slate-500 text-xs font-medium mt-0.5">{desc}</p>
                                </div>
                            </div>
                            <button onClick={() => setForm(p => ({ ...p, [key]: !p[key] }))}
                                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 shadow-inner
                                    ${form[key] ? 'bg-violet-500 ring-2 ring-violet-500/30' : 'bg-slate-700/80 border border-slate-600'}`}>
                                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-md ${form[key] ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>
                    ))}
                    <div className="px-6 py-5">
                        <label className="text-xs text-slate-400 font-semibold tracking-wider uppercase mb-2 block">Maksimal o'quvchilar soni</label>
                        <input type="number" value={form.maxStudents}
                            onChange={e => setForm(p => ({ ...p, maxStudents: parseInt(e.target.value) || 0 }))}
                            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white text-sm focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all shadow-inner" />
                    </div>
                </div>
            </div>

            <button onClick={handleSave} disabled={saving}
                className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold tracking-wide py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20 border border-violet-500/50">
                {saving
                    ? <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    : <Save size={18} />}
                Saqlash
            </button>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 5 — LIVE TEST
// ─────────────────────────────────────────────────────────────────────────────
const PHYSICS_CHAPTERS = [
    { id: 'mexanika', title: 'Mexanika', icon: '🚀' },
    { id: 'energiya', title: 'Energiya va Ish', icon: '⚡' },
    { id: 'molekulyar', title: 'Molekulyar Fizika', icon: '🔬' },
    { id: 'elektr', title: 'Elektr va Magnetizm', icon: '⚡' },
    { id: 'optika', title: 'Optika', icon: '🔆' },
    { id: 'atom', title: 'Atom Fizikasi', icon: '⚛️' },
];

const generateRoomCode = () => `NF-${Math.floor(1000 + Math.random() * 9000)}`;

function LiveTestTab({ showToast }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [deletingId, setDeletingId] = useState('');

    const [form, setForm] = useState({
        title: '', topic: '', difficulty: 'medium',
        questionCount: 10, scheduledAt: '', roomCode: generateRoomCode(), description: '',
    });

    // Rooms listener (real-time)
    useEffect(() => {
        const q = query(collection(db, 'rooms'), limit(20));
        const unsub = onSnapshot(q, snap => {
            const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            // Eng yangilarini oldingiga qo'yamiz
            list.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
            setRooms(list);
            setLoading(false);
        }, () => setLoading(false));
        return unsub;
    }, []);

    // Announcements — xonani o'chirishda kerak
    useEffect(() => {
        const q = query(collection(db, 'announcements'), where('type', '==', 'live_test'));
        const unsub = onSnapshot(q, snap => {
            setAnnouncements(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        }, () => { });
        return unsub;
    }, []);

    const handleSubmit = async () => {
        if (!form.title.trim() || !form.topic) return showToast('Sarlavha va mavzuni tanlang!', 'error');
        if (!form.scheduledAt) return showToast('Boshlanish vaqtini tanlang!', 'error');
        setSending(true);
        try {
            // 0. Bug 2 fix: avvalgi sessiondagi eski players ni tozalash
            const playersSnap = await getDocs(collection(db, 'rooms', form.roomCode, 'players'));
            if (!playersSnap.empty) {
                await Promise.all(playersSnap.docs.map(d =>
                    deleteDoc(doc(db, 'rooms', form.roomCode, 'players', d.id))
                ));
            }
            // Shuningdek eski answers ni ham tozalash
            const answersSnap = await getDocs(collection(db, 'rooms', form.roomCode, 'answers'));
            if (!answersSnap.empty) {
                await Promise.all(answersSnap.docs.map(d =>
                    deleteDoc(doc(db, 'rooms', form.roomCode, 'answers', d.id))
                ));
            }

            // 1. Announcements ga
            await addDoc(collection(db, 'announcements'), {
                type: 'live_test', title: form.title, body: form.description || `${form.topic} bo'yicha live test`,
                topic: form.topic, difficulty: form.difficulty, roomCode: form.roomCode,
                questionCount: form.questionCount, scheduledAt: new Date(form.scheduledAt),
                status: 'upcoming', audience: 'all',
                createdBy: user?.email || 'admin', createdByUid: user?.uid, createdAt: serverTimestamp(),
            });
            // 2. Rooms ga (answeredCount: 0 — LiveRoom.jsx talab qiladi)
            await setDoc(doc(db, 'rooms', form.roomCode), {
                hostId: user.uid, title: form.title, topic: form.topic,
                difficulty: form.difficulty, questionCount: form.questionCount,
                scheduledAt: new Date(form.scheduledAt), status: 'waiting',
                questions: [], currentQuestion: -1, answeredCount: 0,
                createdAt: serverTimestamp(),
            });
            showToast(`Live Test yaratildi! Kod: ${form.roomCode} ✅`, 'success');
            setForm({ title: '', topic: '', difficulty: 'medium', questionCount: 10, scheduledAt: '', roomCode: generateRoomCode(), description: '' });
        } catch (e) { showToast('Xatolik: ' + e.message, 'error'); }
        setSending(false);
    };

    const deleteRoom = async (roomId) => {
        if (!window.confirm(`"${roomId}" xonasini o'chirishni tasdiqlaysizmi?`)) return;
        setDeletingId(roomId);
        try {
            // Rooms dan o'chirish
            await deleteDoc(doc(db, 'rooms', roomId));
            // Shu xonaga tegishli announcement ni ham o'chirish
            const relatedAnn = announcements.find(a => a.roomCode === roomId);
            if (relatedAnn) {
                await deleteDoc(doc(db, 'announcements', relatedAnn.id));
            }
            showToast('Xona va e\'lon o\'chirildi ✅', 'success');
        } catch { showToast('O\'chirishda xato', 'error'); }
        setDeletingId('');
    };

    return (
        <div className="animate-fadeIn grid grid-cols-[1fr_1fr] gap-6">
            {/* Form */}
            <div className="space-y-4">
                <div className="bg-slate-900/40 border border-slate-700/50 backdrop-blur-md rounded-2xl p-6 shadow-xl space-y-5">
                    <p className="text-base font-bold text-white flex items-center gap-2">
                        <Gamepad2 size={18} className="text-red-400" /> Yangi Live Test
                    </p>
                    <div>
                        <label className="text-xs text-slate-400 font-semibold tracking-wider uppercase mb-2 block">Sarlavha *</label>
                        <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                            placeholder="Masalan: Mexanika BOJ" className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all shadow-inner" />
                    </div>
                    <div>
                        <label className="text-xs text-slate-400 font-semibold tracking-wider uppercase mb-2 block">Mavzu *</label>
                        <select value={form.topic} onChange={e => setForm(p => ({ ...p, topic: e.target.value }))}
                            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white text-sm focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all shadow-inner custom-select">
                            <option value="">Mavzu tanlang</option>
                            {PHYSICS_CHAPTERS.map(ch => <option key={ch.id} value={ch.title}>{ch.icon} {ch.title}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs text-slate-400 font-semibold tracking-wider uppercase mb-2 block">Qiyinlik</label>
                        <div className="grid grid-cols-3 gap-3">
                            {[{ id: 'easy', label: '🟢 Oson', sub: '25s' }, { id: 'medium', label: '🟡 O\'rta', sub: '20s' }, { id: 'hard', label: '🔴 Qiyin', sub: '15s' }].map(d => (
                                <button key={d.id} onClick={() => setForm(p => ({ ...p, difficulty: d.id }))}
                                    className={`py-2 rounded-xl border transition-all shadow-sm flex flex-col items-center justify-center gap-0.5
                                        ${form.difficulty === d.id ? 'border-red-500/50 bg-red-500/10 ring-1 ring-red-500/30' : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-800/50'}`}>
                                    <p className="text-white text-xs font-bold">{d.label}</p>
                                    <p className="text-slate-400 text-[10px] font-semibold tracking-widest">{d.sub}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-slate-400 font-semibold tracking-wider uppercase mb-2 block">Savollar</label>
                            <select value={form.questionCount} onChange={e => setForm(p => ({ ...p, questionCount: +e.target.value }))}
                                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white text-sm focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all shadow-inner custom-select">
                                {[5, 10, 15, 20].map(n => <option key={n} value={n}>{n} ta</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 font-semibold tracking-wider uppercase mb-2 block">Vaqt *</label>
                            <input type="datetime-local" value={form.scheduledAt}
                                onChange={e => setForm(p => ({ ...p, scheduledAt: e.target.value }))}
                                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white text-sm focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all shadow-inner" />
                        </div>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-red-400/80 uppercase tracking-widest mb-1">Xona kodi</p>
                            <p className="text-white text-2xl font-black tracking-widest">{form.roomCode}</p>
                        </div>
                        <button onClick={() => setForm(p => ({ ...p, roomCode: generateRoomCode() }))}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors px-3 py-1.5 rounded-lg text-xs font-bold border border-red-500/20">
                            🔄 Yangilash
                        </button>
                    </div>
                    <button onClick={handleSubmit} disabled={sending}
                        className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold tracking-wide py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 border border-red-500/50">
                        {sending ? <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> : <Radio size={18} />}
                        Live Test Yaratish
                    </button>
                </div>
            </div>
            <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-260px)] custom-scrollbar pr-2">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest pl-1">Faol Xonalar</p>
                {loading ? [1, 2].map(i => <Skel key={i} h="h-32" />) :
                    rooms.length === 0
                        ? <div className="text-center py-16 text-slate-500 bg-slate-900/40 border border-slate-700/50 backdrop-blur-md rounded-2xl shadow-inner">
                            <Radio size={48} className="mx-auto mb-4 opacity-30 text-red-500" />
                            <p className="text-sm font-medium">Faol xonalar yo'q</p>
                        </div>
                        : rooms.map(r => (
                            <div key={r.id} className="bg-slate-900/40 border border-slate-700/50 backdrop-blur-md rounded-2xl p-5 shadow-xl hover:border-red-500/30 hover:shadow-red-500/10 transition-all group relative overflow-hidden">
                                {r.status === 'playing' && <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-bl-full blur-xl" />}

                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <div>
                                        <p className="font-bold text-white text-base">{r.title}</p>
                                        <div className="flex items-center gap-3 mt-1.5">
                                            <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5"><BookOpen size={14} className="text-indigo-400" /> {r.topic}</p>
                                            <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5"><Clock size={14} className="text-emerald-400" /> {fmtDate({ seconds: new Date(r.scheduledAt).getTime() / 1000 })}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 shadow-inner">
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Xona Kodi</p>
                                            <p className="text-indigo-400 font-black tracking-widest text-sm">{r.roomCode}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between border-t border-slate-700/50 pt-4 mt-2 relative z-10">
                                    <div className="flex gap-2">
                                        <div className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700 text-[11px] font-semibold text-slate-300">
                                            {r.questionCount} savol
                                        </div>
                                        <div className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700 text-[11px] font-semibold text-slate-300">
                                            {(r.participants || []).length} qatnashchi
                                        </div>
                                        <div className={`px-2.5 py-1 rounded-md border text-[11px] font-bold tracking-wider uppercase flex items-center gap-1
                                            ${r.status === 'playing' ? 'bg-red-500/10 text-red-400 border-red-500/30' : r.status === 'finished' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'}`}>
                                            {r.status === 'playing' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
                                            {r.status === 'playing' ? '🔴 LIVE' : r.status === 'finished' ? '✅ Tugadi' : '⏳ Kutmoqda'}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {r.status !== 'finished' && (
                                            <button onClick={() => navigate(`/testlar/live/${r.id}`)}
                                                className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-indigo-500/30 transition-colors flex items-center gap-1">
                                                <Radio size={12} /> Kirish
                                            </button>
                                        )}
                                        <button onClick={() => deleteRoom(r.id)} disabled={deletingId === r.id}
                                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all disabled:opacity-50">
                                            {deletingId === r.id
                                                ? <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                                : <Trash2 size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN ADMIN DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
const TABS = [
    { id: 'overview', label: 'Bosh Sahifa', icon: LayoutDashboard, iconBg: 'bg-indigo-500/20', iconColor: 'text-indigo-400', key: 'admin_dashboard' },
    { id: 'students', label: "O'quvchilar", icon: Users, iconBg: 'bg-emerald-500/20', iconColor: 'text-emerald-400', key: 'admin_users' },
    { id: 'announcements', label: "E'lonlar", icon: Megaphone, iconBg: 'bg-yellow-500/20', iconColor: 'text-yellow-400', key: 'admin_announcements' },
    { id: 'livetest', label: 'Live Test', icon: Radio, iconBg: 'bg-red-500/20', iconColor: 'text-red-400', key: 'admin_live' },
    { id: 'contacts', label: 'Xabarlar', icon: MessageSquare, iconBg: 'bg-pink-500/20', iconColor: 'text-pink-400', key: 'admin_contacts' },
    { id: 'settings', label: 'Sozlamalar', icon: Settings, iconBg: 'bg-violet-500/20', iconColor: 'text-violet-400', key: 'admin_settings' },
];

export default function AdminDashboard() {
    const { user, userData, logout } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [students, setStudents] = useState([]);
    const [studentsLoading, setStudentsLoading] = useState(true);
    const [toast, setToast] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const showToast = useCallback((msg, type = 'success') => setToast({ msg, type }), []);

    // Real-time students — barcha userlarni olamiz, admin emas bo'lganlarni ko'rsatamiz
    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'users'), snap => {
            const all = snap.docs.map(d => ({ id: d.id, uid: d.id, ...d.data() }));
            setStudents(all.filter(u => u.role !== 'admin'));
            setStudentsLoading(false);
        }, err => {
            console.error('Users listener error:', err);
            setStudentsLoading(false);
        });
        return unsub;
    }, []);

    const currentTab = TABS.find(t => t.id === activeTab);

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <OverviewTab students={students} loading={studentsLoading} />;
            case 'students': return <StudentsTab students={students} loading={studentsLoading} showToast={showToast} onRefresh={() => { }} />;
            case 'announcements': return <AnnouncementsTab showToast={showToast} />;
            case 'livetest': return <LiveTestTab showToast={showToast} />;
            case 'contacts': return <AdminContacts />;
            case 'settings': return <AdminSettingsTab showToast={showToast} />;
            default: return null;
        }
    };

    return (
        <div className="h-screen bg-[#0a0f1c] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.15),rgba(255,255,255,0))] text-white flex flex-col overflow-hidden font-sans">
            {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

            {/* Mobile overlay — sidebardan PAST bo'lishi kerak */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/70 z-[90] lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Top bar (Glassmorphism) */}
            <div className="relative z-[50] flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-800/50 bg-[#0a0f1c]/80 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                    {/* Hamburger for mobile */}
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                        <Menu size={20} />
                    </button>
                    <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl shadow-lg shadow-indigo-500/20 ring-1 ring-white/10">
                        <Atom size={22} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">{t('admin_title') || 'NurFizika Admin'}</h1>
                        <p className="text-[11px] font-medium text-indigo-400 uppercase tracking-widest mt-0.5">{t('admin_dashboard') || 'Boshqaruv Paneli'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-700/50 rounded-2xl px-2.5 py-2 hover:bg-slate-800/50 transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-bold shadow-inner ring-1 ring-white/20">
                            {(userData?.displayName || user?.email || 'A')[0].toUpperCase()}
                        </div>
                        <div className="text-xs pr-2 hidden sm:block">
                            <p className="text-white font-semibold">{userData?.displayName || 'Admin'}</p>
                            <p className="text-slate-400 truncate max-w-[120px]">{user?.email}</p>
                        </div>
                        <span className="hidden sm:inline-block ml-1 px-2 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold rounded-lg border border-indigo-500/20 uppercase tracking-wider">ADMIN</span>
                    </div>
                    <button onClick={logout}
                        className="p-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 bg-slate-900/50 border border-slate-700/50 transition-all hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/10 group"
                        title={t('nav_logout') || 'Chiqish'}>
                        <LogOut size={18} className="transition-transform group-hover:-translate-x-0.5" />
                    </button>
                </div>
            </div>

            {/* Body — z-index YO'Q (stacking context yaratmaydi) */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar — Mobile: fixed overlay (pure), Desktop: flex column */}
                <aside className={`
                    fixed inset-y-0 left-0 z-[100]
                    lg:relative lg:inset-auto
                    w-[260px] flex-shrink-0 border-r border-slate-800/50
                    bg-[#0a0f1c]/98 lg:bg-[#0a0f1c]/40 backdrop-blur-xl
                    flex flex-col p-4 gap-1.5 overflow-y-auto
                    transition-transform duration-300 shadow-2xl lg:shadow-none
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    {/* Close on mobile */}
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden self-end mb-2 p-1.5 text-slate-400 hover:text-white rounded-lg">
                        <X size={18} />
                    </button>
                    {/* Navigation */}
                    <div className="space-y-1 mt-2">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-3">Menyu</p>
                        {TABS.map(tab => {
                            const Icon = tab.icon;
                            const active = activeTab === tab.id;
                            
                            return (
                                <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                                    className={`w-full flex items-center gap-3.5 p-3 rounded-xl transition-all duration-300 text-left group relative overflow-hidden
                                        ${active ? 'bg-indigo-500/10 border border-indigo-500/30 shadow-lg shadow-indigo-500/5' : 'hover:bg-slate-800/40 border border-transparent blur-0'}`}>
                                    {/* Active state ambient glow behind the button */}
                                    {active && <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-50" />}

                                    <div className={`relative z-10 p-2 rounded-xl transition-all duration-300 ${active ? `${tab.iconBg} ring-1 ring-white/10` : 'bg-slate-800/80 group-hover:bg-slate-700/80'} flex-shrink-0`}>
                                        <Icon size={16} className={active ? tab.iconColor : 'text-slate-400 group-hover:text-slate-300'} />
                                    </div>
                                    <span className={`relative z-10 text-sm font-semibold tracking-wide transition-colors ${active ? 'text-white drop-shadow-sm' : 'text-slate-400 group-hover:text-slate-200'}`}>
                                        {t(tab.key) || tab.label}
                                    </span>
                                    {active && <ChevronRight size={14} className="relative z-10 ml-auto text-indigo-400" />}
                                </button>
                            );
                        })}
                    </div>

                    {/* Stats quick view */}
                    <div className="mt-8 mb-4">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-3">Holat</p>
                        <div className="bg-slate-900/40 border border-slate-700/50 rounded-2xl p-4 space-y-3 mx-1 backdrop-blur-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-medium text-slate-400">Jami o'q.</span>
                                <span className="text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">{students.length}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-medium text-slate-400">Bugun faol</span>
                                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                                    {students.filter(s => (s.activeDates || []).includes(todayStr())).length}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-medium text-slate-400">Bloklangan</span>
                                <span className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-md">
                                    {students.filter(s => s.blocked).length}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pb-2 px-1">
                        <button onClick={() => navigate('/dashboard')}
                            className="w-full flex items-center gap-3 p-3.5 rounded-xl text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 hover:border-indigo-500/50 hover:text-indigo-200 transition-all text-sm font-semibold shadow-lg shadow-black/10 group">
                            <Globe size={16} className="text-indigo-400 group-hover:text-indigo-300 transition-colors flex-shrink-0" />
                            <span className="flex-1 text-left">O'quv Saytiga</span>
                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                        </button>
                    </div>
                </aside>

                {/* Main content — fills full width on mobile, leaves space for sidebar on desktop */}
                <main className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 w-full min-w-0">
                    {/* Section header */}
                    {currentTab && (
                        <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-800/60">
                            <div className={`p-2.5 rounded-xl ${currentTab.iconBg} flex-shrink-0`}>
                                <currentTab.icon size={20} className={currentTab.iconColor} />
                            </div>
                            <div>
                                <h2 className="text-base sm:text-lg font-bold text-white">{t(currentTab.key) || currentTab.label}</h2>
                                <p className="text-slate-400 text-xs mt-0.5 hidden sm:block">
                                    {activeTab === 'overview' && 'Umumiy statistika va tezkor ko\'rinish'}
                                    {activeTab === 'students' && `${students.length} ta o'quvchi boshqarish`}
                                    {activeTab === 'announcements' && 'Barcha o\'quvchilarga e\'lon yuborish'}
                                    {activeTab === 'livetest' && 'Live Test yaratish'}
                                    {activeTab === 'contacts' && 'Xabarlar'}
                                    {activeTab === 'settings' && 'Ilova konfiguratsiyasi'}
                                </p>
                            </div>
                        </div>
                    )}
                    {renderContent()}
                </main>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fadeIn { animation: fadeIn 0.2s ease forwards; }
            `}</style>
        </div>
    );
}
