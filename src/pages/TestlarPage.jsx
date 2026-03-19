import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Radio, ArrowRight, ChevronRight, Clock, Users, Trophy, Zap, Gamepad2 } from 'lucide-react';
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

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

export default function TestlarPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { t } = useLanguage();
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
        if (code.length >= 4) navigate(`/testlar/live/${code}`);
    };

    return (
        <div className="h-screen bg-slate-950 text-white font-sans overflow-y-auto custom-scrollbar">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 pb-24"
            >
                {/* Top Navigation */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-700 transition-all text-slate-400 hover:text-white"
                    >
                        <ArrowLeft size={18} />
                        <span className="font-medium">Dashboard</span>
                    </button>

                    <div className="px-5 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full shadow-lg">
                        <span className="text-sm font-bold flex items-center gap-2">
                            <span className="text-indigo-400">NurFizika</span>
                            <span className="text-slate-600">|</span>
                            <span>{t('tests_live_hub').replace("iga o'tish", '') || 'Live Test Hub'}</span>
                        </span>
                    </div>
                    <div className="w-[100px] hidden sm:block"></div>
                </div>

                {/* ═══════ BO'LIM 1: HERO — NurFizika Live ═══════ */}
                <div className="relative overflow-hidden rounded-3xl p-8"
                    style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%)' }}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />

                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                                <div className="relative">
                                    <div className="w-3.5 h-3.5 bg-red-500 rounded-full" />
                                    <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75" />
                                </div>
                                <span className="text-white/80 font-medium text-xs uppercase tracking-[0.2em]">
                                    {t('live_subtitle')}
                                </span>
                            </div>
                            <h1 className="text-white text-4xl md:text-5xl font-bold mb-3">{t('live_title')}</h1>
                            <p className="text-white/70 text-lg max-w-xl mx-auto md:mx-0">
                                Xona kodi orqali do'stlaringiz bilan real vaqtda raqobatlashgan holda fizika bilimingizni sinab ko'ring!
                            </p>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6 text-white/60 text-sm">
                                <span className="flex items-center gap-1.5"><Zap size={14} className="text-yellow-400" /> AI-savollar</span>
                                <span className="flex items-center gap-1.5"><Users size={14} className="text-indigo-300" /> Realtime interaktiv</span>
                                <span className="flex items-center gap-1.5"><Trophy size={14} className="text-emerald-400" /> XP mukofot</span>
                            </div>
                        </div>

                        {/* Xona kodi input */}
                        <div className="w-full md:w-80 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl">
                            <p className="text-white/90 font-bold mb-3 text-sm">{t('live_join')}</p>
                            <input
                                value={roomCode}
                                onChange={e => setRoomCode(e.target.value.toUpperCase())}
                                onKeyDown={e => e.key === 'Enter' && handleJoin()}
                                placeholder="NF-1234"
                                maxLength={7}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white text-2xl font-mono placeholder-white/30 focus:outline-none focus:border-white/50 text-center tracking-widest mb-4 transition-all"
                            />
                            <button
                                onClick={handleJoin}
                                disabled={roomCode.trim().length < 4}
                                className="w-full bg-white text-indigo-600 font-bold py-4 rounded-xl hover:bg-indigo-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-lg shadow-lg flex items-center justify-center gap-2">
                                {t('live_join_btn')} <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ═══════ BO'LIM 2: FAOL LIVE TESTLAR (E'lonlar) ═══════ */}
                {(liveAnnouncements.length > 0 || activeRooms.length > 0) && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-white font-bold text-xl flex items-center gap-3">
                                <Radio className="text-red-500 animate-pulse" />
                                {t('tests_active_rooms')}
                            </h2>
                        </div>
                        <div className="grid gap-4">
                            {/* E'lonlardan */}
                            {liveAnnouncements.map(ann => {
                                const scheduled = ann.scheduledAt?.toDate ? ann.scheduledAt.toDate() : ann.scheduledAt ? new Date(ann.scheduledAt) : null;
                                const isLive = ann.status === 'active' || (scheduled && scheduled <= new Date());
                                return (
                                    <motion.div key={ann.id}
                                        whileHover={{ scale: 1.01 }}
                                        onClick={() => navigate(`/testlar/live/${ann.roomCode}`)}
                                        className={`group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-2xl border transition-all cursor-pointer ${isLive
                                            ? 'bg-red-500/10 border-red-500/30 hover:border-red-500/50'
                                            : 'bg-slate-900 border-slate-800 hover:border-indigo-500/50'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${isLive ? 'bg-red-500/20' : 'bg-indigo-500/20'}`}>
                                                🎮
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                    <p className="text-white font-bold text-base sm:text-lg">{ann.title}</p>
                                                    {isLive && (
                                                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" /> {t('tests_start') || 'LIVE'}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-slate-400 text-sm">{ann.topic} • {ann.questionCount || 10} ta {t('tests_questions')}</p>
                                                {!isLive && scheduled && scheduled > new Date() && (
                                                    <div className="mt-1 flex items-center gap-2">
                                                        <Clock size={12} className="text-slate-500" />
                                                        <LiveCountdown targetTime={scheduled.getTime()} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 self-end sm:self-auto">
                                            <div className="text-right hidden sm:block">
                                                <p className="text-indigo-400 font-mono font-bold text-xl">{ann.roomCode}</p>
                                                <p className="text-slate-500 text-[10px] uppercase tracking-wider">{t('live_room_code')}</p>
                                            </div>
                                            <button className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold transition-all flex items-center gap-2 text-sm sm:text-base ${isLive ? 'bg-red-500 hover:bg-red-400 text-white shadow-lg shadow-red-500/25' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                                                }`}>
                                                {isLive ? t('live_join') : t('btn_view')} <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ═══════ BO'LIM 3: SO'NGGI NATIJALAR ═══════ */}
                {recentResults.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-white font-bold text-lg flex items-center gap-2">
                            <Trophy size={18} className="text-yellow-400" />
                            {t('tests_my_results')}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {recentResults.map(r => (
                                <div key={r.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-2 bg-slate-800 rounded-lg">
                                            <Gamepad2 size={20} className="text-slate-400" />
                                        </div>
                                        <span className="bg-slate-800 text-slate-500 text-[10px] px-2 py-0.5 rounded-full font-bold">{t('btn_finish').toUpperCase()}</span>
                                    </div>
                                    <h3 className="text-white font-bold text-sm mb-1 truncate">{r.title || r.topic}</h3>
                                    <p className="text-slate-500 text-xs mb-4">{r.topic}</p>
                                    <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-800/50 rounded-lg p-2">
                                        <span className="flex items-center gap-1"><Users size={12} /> {r.playersCount || '?'} {t('tests_players').toLowerCase()}</span>
                                        <span className="font-mono text-indigo-400">{r.id}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Info Panel */}
                <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 space-y-4 text-center md:text-left">
                        <h3 className="text-white font-bold text-2xl">O'yin qonuniyatlari</h3>
                        <p className="text-slate-400 leading-relaxed">
                            NurFizika Live — bu real vaqt rejimida boshqalar bilan bilimingizni sinaydigan multiplayer tizimdir.
                            Savollarga qanchalik tez va to'g'ri javob bersangiz, shunchalik ko'p ball (va XP) olasiz! 🚀
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center">
                            <p className="text-2xl mb-1">⚡</p>
                            <p className="text-white font-bold text-xs">Tezlik muhim</p>
                        </div>
                        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center">
                            <p className="text-2xl mb-1">🤖</p>
                            <p className="text-white font-bold text-xs">AI savollar</p>
                        </div>
                        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center">
                            <p className="text-2xl mb-1">🏆</p>
                            <p className="text-white font-bold text-xs">XP yutish</p>
                        </div>
                        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center">
                            <p className="text-2xl mb-1">👥</p>
                            <p className="text-white font-bold text-xs">Raqobat</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
