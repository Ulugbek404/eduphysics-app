import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Crown, ChevronDown, TrendingUp, TrendingDown, Minus, Loader2 } from 'lucide-react';
import { db } from '../../firebase';
import { collection, query, orderBy, limit, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

// ─── Constants ────────────────────────────────────────────────────────────────
const REGIONS = [
    "Toshkent sh.", "Toshkent vil.", "Samarqand", "Farg'ona",
    "Andijon", "Namangan", "Buxoro", "Xorazm",
    "Qashqadaryo", "Surxondaryo", "Jizzax", "Sirdaryo",
    "Navoiy", "Qoraqalpog'iston"
];

const TIME_FIELDS = {
    "Bugun": "dailyXP",
    "Hafta": "weeklyXP",
    "Oy": "monthlyXP",
    "Barcha vaqt": "totalXP",
};

const AVATAR_COLORS = [
    'bg-indigo-600', 'bg-violet-600', 'bg-blue-600',
    'bg-emerald-600', 'bg-amber-600', 'bg-rose-600', 'bg-cyan-600',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getBadge(level) {
    if (level >= 20) return "Fizika Ustasi 👑";
    if (level >= 10) return "Ilm Peshqadami ⚡";
    if (level >= 5) return "Bilim Sipohi 🛡️";
    return "Yangi Boshlovchi 🌱";
}

function getInitials(name = '') {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';
}

function avatarColor(uid = '') {
    const idx = uid.charCodeAt(0) % AVATAR_COLORS.length;
    return AVATAR_COLORS[idx];
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function SkeletonRow() {
    return (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 animate-pulse">
            <div className="w-7 h-4 bg-slate-700 rounded" />
            <div className="w-10 h-10 bg-slate-700 rounded-full" />
            <div className="flex-1 space-y-2">
                <div className="h-3 bg-slate-700 rounded w-3/5" />
                <div className="h-2.5 bg-slate-800 rounded w-2/5" />
            </div>
            <div className="h-4 w-16 bg-slate-700 rounded" />
        </div>
    );
}

// ─── Podium Card ─────────────────────────────────────────────────────────────
function PodiumCard({ user, rank, isCurrentUser }) {
    if (!user) return null;
    const heights = { 1: 'h-28', 2: 'h-20', 3: 'h-14' };
    const orders = { 1: 'order-2', 2: 'order-1', 3: 'order-3' };
    const borders = { 1: 'border-yellow-400 shadow-yellow-400/30', 2: 'border-slate-300 shadow-slate-300/20', 3: 'border-amber-600 shadow-amber-600/20' };
    const medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
    const textSizes = { 1: 'text-base', 2: 'text-sm', 3: 'text-sm' };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (rank - 1) * 0.1 }}
            className={`flex flex-col items-center gap-2 ${orders[rank]}`}
        >
            {rank === 1 && <span className="text-2xl">👑</span>}
            {rank !== 1 && <div className="h-8" />}

            {/* Avatar */}
            <div className={`relative w-14 h-14 rounded-full border-2 ${borders[rank]} shadow-lg flex items-center justify-center font-bold text-white text-lg
                ${isCurrentUser ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-950' : ''}
                ${avatarColor(user.uid)}`}>
                {getInitials(user.displayName)}
                <span className="absolute -bottom-1 -right-1 text-base">{medals[rank]}</span>
            </div>

            {/* Name */}
            <div className="text-center max-w-[90px]">
                <p className={`font-bold text-white truncate ${textSizes[rank]}`}>{user.displayName || 'Foydalanuvchi'}</p>
                <p className="text-indigo-400 text-xs font-bold">{(user[Object.values(TIME_FIELDS)[0]] || user.totalXP || 0).toLocaleString()} XP</p>
                <p className="text-slate-500 text-[10px]">{getBadge(user.level || 1)}</p>
            </div>

            {/* Podium stand */}
            <div className={`w-20 ${heights[rank]} rounded-t-lg flex items-center justify-center
                ${rank === 1 ? 'bg-gradient-to-t from-yellow-600 to-yellow-400' :
                    rank === 2 ? 'bg-gradient-to-t from-slate-500 to-slate-300' :
                        'bg-gradient-to-t from-amber-800 to-amber-600'}
                text-white font-black text-xl`}>
                {rank}
            </div>
        </motion.div>
    );
}

// ─── Rank Row ─────────────────────────────────────────────────────────────────
function RankRow({ user, rank, xpField, isCurrentUser }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (rank - 4) * 0.03 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${isCurrentUser
                    ? 'bg-indigo-950 border-indigo-700'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
        >
            {/* Rank */}
            <span className="text-slate-400 font-bold text-sm w-6 text-center">{rank}</span>

            {/* Avatar */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${avatarColor(user.uid)}`}>
                {getInitials(user.displayName)}
            </div>

            {/* Name + region */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm text-white truncate">{user.displayName || 'Foydalanuvchi'}</p>
                    {isCurrentUser && (
                        <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.5 rounded-full font-bold">Sen</span>
                    )}
                    {user.region && (
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-full border border-slate-700">
                            {user.region}
                        </span>
                    )}
                </div>
                <p className="text-slate-500 text-[11px]">{getBadge(user.level || 1)}</p>
            </div>

            {/* Level */}
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700 font-semibold flex-shrink-0">
                Lv.{user.level || 1}
            </span>

            {/* XP */}
            <span className="text-indigo-400 font-bold text-sm flex-shrink-0 w-20 text-right">
                {((user[xpField] ?? user.totalXP) || 0).toLocaleString()}
            </span>
        </motion.div>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function LeaderboardTab() {
    const { user } = useAuth();

    // Controls
    const [mode, setMode] = useState('global');  // 'global' | 'region'
    const [timeKey, setTimeKey] = useState('Hafta');
    const [region, setRegion] = useState(REGIONS[0]);

    // Data
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [myRank, setMyRank] = useState(null);
    const [myData, setMyData] = useState(null);

    const xpField = TIME_FIELDS[timeKey];

    // ── Fetch leaderboard ──
    useEffect(() => {
        setLoading(true);
        const docId = mode === 'global' ? 'global' : region;
        const colRef = collection(db, 'leaderboard', docId, 'users');
        const q = query(colRef, orderBy(xpField, 'desc'), limit(50));

        const unsub = onSnapshot(q, (snap) => {
            const data = snap.docs.map((d, i) => ({ uid: d.id, rank: i + 1, ...d.data() }));
            setUsers(data);

            // Find current user's rank
            if (user?.uid) {
                const found = data.find(u => u.uid === user.uid);
                if (found) {
                    setMyRank(found.rank);
                    setMyData(found);
                } else {
                    // Not in top 50 — try fetching their doc
                    const myRef = doc(db, 'leaderboard', docId, 'users', user.uid);
                    getDoc(myRef).then(snap => {
                        if (snap.exists()) {
                            setMyData({ uid: user.uid, ...snap.data() });
                            setMyRank(snap.data()?.rank || '50+');
                        }
                    });
                }
            }
            setLoading(false);
        }, () => setLoading(false));

        return unsub;
    }, [mode, region, xpField, user?.uid]);

    const top3 = users.slice(0, 3);
    const rest = users.slice(3);

    const rankChange = myData?.rankChange ?? 0;

    return (
        <div className="pb-28">
            {/* ── Controls ── */}
            <div className="space-y-3 mb-6">
                {/* Mode toggle */}
                <div className="flex gap-1 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
                    {['global', 'region'].map(m => (
                        <button key={m}
                            onClick={() => setMode(m)}
                            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${mode === m ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {m === 'global' ? 'Umumiy 🌐' : "Hudud bo'yicha 📍"}
                        </button>
                    ))}
                </div>

                {/* Region dropdown */}
                <AnimatePresence>
                    {mode === 'region' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="relative">
                                <select
                                    value={region}
                                    onChange={e => setRegion(e.target.value)}
                                    className="w-full appearance-none bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm pr-10 focus:outline-none focus:border-indigo-500 cursor-pointer"
                                >
                                    {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Time chips */}
                <div className="flex gap-2 flex-wrap">
                    {Object.keys(TIME_FIELDS).map(t => (
                        <button key={t}
                            onClick={() => setTimeKey(t)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${timeKey === t
                                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-500/20'
                                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                                }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Body ── */}
            {loading ? (
                <div className="space-y-3">
                    {Array(6).fill(0).map((_, i) => <SkeletonRow key={i} />)}
                </div>
            ) : users.length === 0 ? (
                <div className="flex flex-col items-center gap-4 py-16 text-slate-500">
                    <Trophy size={48} className="opacity-30" />
                    <p className="font-semibold">Hali hech kim yo'q. Birinchi bo'l! 🚀</p>
                </div>
            ) : (
                <>
                    {/* ── Podium ── */}
                    {top3.length >= 2 && (
                        <div className="flex items-end justify-center gap-4 mb-8 px-4">
                            <PodiumCard user={top3[1]} rank={2} isCurrentUser={top3[1]?.uid === user?.uid} />
                            <PodiumCard user={top3[0]} rank={1} isCurrentUser={top3[0]?.uid === user?.uid} />
                            <PodiumCard user={top3[2]} rank={3} isCurrentUser={top3[2]?.uid === user?.uid} />
                        </div>
                    )}

                    {/* ── Rest list ── */}
                    <div className="space-y-2">
                        {rest.map(u => (
                            <RankRow key={u.uid} user={u} rank={u.rank} xpField={xpField} isCurrentUser={u.uid === user?.uid} />
                        ))}
                    </div>
                </>
            )}

            {/* ── Sticky: Mening O'rnim ── */}
            {myData && (
                <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
                    <div className="max-w-3xl mx-auto pointer-events-auto">
                        <motion.div
                            initial={{ y: 60 }}
                            animate={{ y: 0 }}
                            className="bg-slate-900/95 backdrop-blur-md border-t border-slate-700 px-5 py-3 flex items-center gap-4"
                        >
                            {/* Rank */}
                            <div className="flex flex-col items-center">
                                <span className="text-slate-500 text-[10px] uppercase tracking-wider">O'rnim</span>
                                <span className="text-white font-black text-xl">#{myRank}</span>
                            </div>

                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${avatarColor(user?.uid)}`}>
                                {getInitials(myData.displayName || user?.displayName)}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm text-white truncate">{myData.displayName || 'Sen'}</p>
                                <p className="text-slate-400 text-xs">{((myData[xpField] ?? myData.totalXP) || 0).toLocaleString()} XP</p>
                            </div>

                            {/* Movement */}
                            <div className={`flex items-center gap-1 text-sm font-bold ${rankChange > 0 ? 'text-emerald-400' :
                                    rankChange < 0 ? 'text-red-400' : 'text-slate-500'
                                }`}>
                                {rankChange > 0 ? <TrendingUp size={16} /> : rankChange < 0 ? <TrendingDown size={16} /> : <Minus size={16} />}
                                {rankChange !== 0 && `${Math.abs(rankChange)}`}
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </div>
    );
}
