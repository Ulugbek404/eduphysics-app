import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radio, ArrowRight, Clock, Users, Trophy, Zap, ChevronRight, Gamepad2 } from 'lucide-react';
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

// ── Countdown component ──
function LiveCountdown({ targetTime }) {
    const [diff, setDiff] = useState(() => Math.max(0, targetTime - Date.now()));

    useEffect(() => {
        const t = setInterval(() => {
            const d = Math.max(0, targetTime - Date.now());
            setDiff(d);
            if (d <= 0) clearInterval(t);
        }, 1000);
        return () => clearInterval(t);
    }, [targetTime]);

    if (diff <= 0) return <span className="text-red-400 text-xs font-bold animate-pulse">BOSHLANDI!</span>;

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    return (
        <span className="text-yellow-400 text-xs font-mono font-bold">
            ⏳ {h > 0 ? `${h}s ` : ''}{m}d {s}s
        </span>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// TESTLAR MODULI — NurFizika Live Hub
// ══════════════════════════════════════════════════════════════════════════════
export default function TestsModule() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [roomCode, setRoomCode] = useState('');
    const [liveAnnouncements, setLiveAnnouncements] = useState([]);
    const [activeRooms, setActiveRooms] = useState([]);
    const [recentResults, setRecentResults] = useState([]);

    // ── Live e'lonlar listener ──
    useEffect(() => {
        const q = query(
            collection(db, 'announcements'),
            where('type', '==', 'live_test'),
            orderBy('createdAt', 'desc'),
            limit(10)
        );
        const unsub = onSnapshot(q, snap => {
            const now = new Date();
            setLiveAnnouncements(snap.docs
                .map(d => ({ id: d.id, ...d.data() }))
                .filter(a => a.status !== 'finished')
            );
        }, () => { });
        return unsub;
    }, []);

    // ── Faol xonalar listener ──
    useEffect(() => {
        const q = query(
            collection(db, 'rooms'),
            where('status', 'in', ['waiting', 'playing']),
            limit(8)
        );
        const unsub = onSnapshot(q, snap => {
            setActiveRooms(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        }, () => { });
        return unsub;
    }, []);

    // ── So'nggi tugagan xonalar ──
    useEffect(() => {
        const q = query(
            collection(db, 'rooms'),
            where('status', '==', 'finished'),
            orderBy('finishedAt', 'desc'),
            limit(3)
        );
        const unsub = onSnapshot(q, snap => {
            setRecentResults(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        }, () => { });
        return unsub;
    }, []);

    const handleJoin = () => {
        const code = roomCode.trim().toUpperCase();
        if (code.length >= 4) navigate(`/live/${code}`);
    };

    return (
        <div className="space-y-6 animate-fadeIn">

            {/* ═══════ BO'LIM 1: HERO — NurFizika Live ═══════ */}
            <div className="relative overflow-hidden rounded-3xl p-8"
                style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%)' }}>
                {/* Orqa fon bezaklari */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
                <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/3 rounded-full" />

                <div className="relative flex items-center justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="relative">
                                <div className="w-3.5 h-3.5 bg-red-500 rounded-full" />
                                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75" />
                            </div>
                            <span className="text-white/80 font-medium text-xs uppercase tracking-[0.2em]">
                                Live Multiplayer
                            </span>
                        </div>
                        <h1 className="text-white text-4xl font-bold mb-2">NurFizika Live</h1>
                        <p className="text-white/70 text-base">
                            Xona kodi bilan do'stlaringiz bilan birga test ishlang!
                        </p>
                        <div className="flex items-center gap-4 mt-4 text-white/60 text-sm">
                            <span className="flex items-center gap-1">🤖 AI savollar</span>
                            <span className="flex items-center gap-1">⚡ Realtime raqobat</span>
                            <span className="flex items-center gap-1">🏆 XP mukofot</span>
                        </div>
                    </div>
                    <div className="text-8xl opacity-20 hidden sm:block select-none">🎮</div>
                </div>

                {/* Xona kodi input */}
                <div className="relative mt-6 flex gap-3">
                    <input
                        value={roomCode}
                        onChange={e => setRoomCode(e.target.value.toUpperCase())}
                        onKeyDown={e => e.key === 'Enter' && handleJoin()}
                        placeholder="Xona kodini kiriting: NF-1234"
                        maxLength={7}
                        className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-white text-xl font-mono placeholder-white/30 focus:outline-none focus:border-white/50 tracking-widest"
                    />
                    <button
                        onClick={handleJoin}
                        disabled={roomCode.trim().length < 4}
                        className="bg-white text-indigo-600 font-bold px-8 rounded-2xl hover:bg-indigo-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-lg flex items-center gap-2">
                        Kirish <ArrowRight size={20} />
                    </button>
                </div>
            </div>

            {/* ═══════ BO'LIM 2: FAOL LIVE TESTLAR ═══════ */}
            {(liveAnnouncements.length > 0 || activeRooms.length > 0) && (
                <div>
                    <h2 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                        </span>
                        Faol Live Testlar
                    </h2>
                    <div className="space-y-3">
                        {/* E'lonlardan */}
                        {liveAnnouncements.map(ann => {
                            const scheduled = ann.scheduledAt?.toDate ? ann.scheduledAt.toDate() : ann.scheduledAt ? new Date(ann.scheduledAt) : null;
                            const isLive = ann.status === 'active' || (scheduled && scheduled <= new Date());
                            return (
                                <div key={ann.id}
                                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all hover:scale-[1.005] cursor-pointer ${isLive
                                            ? 'bg-red-500/10 border-red-500/40'
                                            : 'bg-slate-900 border-slate-700/50'
                                        }`}
                                    onClick={() => navigate(`/live/${ann.roomCode}`)}>
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${isLive ? 'bg-red-500/20' : 'bg-indigo-500/20'}`}>
                                            <span className="text-2xl">🎮</span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-white font-bold">{ann.title}</p>
                                                {isLive && (
                                                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" /> LIVE
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-slate-400 text-sm">{ann.topic} • {ann.questionCount || 10} ta savol</p>
                                            {!isLive && scheduled && scheduled > new Date() && (
                                                <LiveCountdown targetTime={scheduled.getTime()} />
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right hidden sm:block">
                                            <p className="text-indigo-400 font-mono font-bold text-lg">{ann.roomCode}</p>
                                            <p className="text-slate-500 text-xs">Xona kodi</p>
                                        </div>
                                        <button className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${isLive ? 'bg-red-500 hover:bg-red-400 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                                            }`}>
                                            {isLive ? "🚀 Qo'shil!" : "Ko'rish"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Aktiv rooms (e'lonsiz) */}
                        {activeRooms.filter(r => !liveAnnouncements.some(a => a.roomCode === r.id)).map(room => (
                            <div key={room.id}
                                className={`flex items-center justify-between p-5 rounded-2xl border transition-all hover:scale-[1.005] cursor-pointer ${room.status === 'playing'
                                        ? 'bg-red-500/10 border-red-500/40'
                                        : 'bg-slate-900 border-slate-700/50'
                                    }`}
                                onClick={() => navigate(`/live/${room.id}`)}>
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl ${room.status === 'playing' ? 'bg-red-500/20' : 'bg-indigo-500/20'}`}>
                                        <span className="text-2xl">🎮</span>
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">{room.title || room.topic}</p>
                                        <p className="text-slate-400 text-sm">{room.topic} • {room.questionCount || 10} ta savol</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-slate-800 rounded-xl px-3 py-1.5 text-center">
                                        <p className="text-indigo-400 font-mono font-bold">{room.id}</p>
                                    </div>
                                    <button className={`px-5 py-2.5 rounded-xl font-medium text-sm ${room.status === 'playing' ? 'bg-red-500 text-white' : 'bg-indigo-600 text-white'
                                        }`}>
                                        {room.status === 'playing' ? '🔴 LIVE' : "Qo'shilish"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ═══════ BO'LIM 3: SO'NGGI NATIJALAR ═══════ */}
            {recentResults.length > 0 && (
                <div>
                    <h2 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                        📊 So'nggi Natijalar
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {recentResults.map(r => (
                            <div key={r.id} className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <p className="text-white font-semibold text-sm">{r.title || r.topic}</p>
                                        <p className="text-slate-500 text-xs">{r.topic}</p>
                                    </div>
                                    <span className="bg-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded-full">Tugagan</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <Users size={12} /> {r.questionCount || '?'} savol
                                    <span className="text-slate-600">•</span>
                                    <Trophy size={12} /> {r.id}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ═══════ QANDAY ISHLAYDI ═══════ */}
            <div className="bg-slate-900/50 border border-slate-700/30 rounded-2xl p-6">
                <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                    <Gamepad2 size={18} className="text-indigo-400" />
                    Qanday ishlaydi?
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { step: '1', icon: '📱', title: 'Kod kiriting', desc: 'Admin bergan NF-XXXX kodni kiriting' },
                        { step: '2', icon: '👥', title: 'Kutish xonasi', desc: 'Boshqa o\'yinchilarni kuting' },
                        { step: '3', icon: '🧠', title: 'AI savollar', desc: 'Tezkor javob bering — ball oling' },
                        { step: '4', icon: '🏆', title: 'Natija', desc: 'Reyting va XP mukofot' },
                    ].map(s => (
                        <div key={s.step} className="text-center">
                            <div className="text-3xl mb-2">{s.icon}</div>
                            <p className="text-white font-semibold text-sm">{s.title}</p>
                            <p className="text-slate-500 text-xs mt-0.5">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
