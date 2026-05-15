import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Radio, ArrowRight, ChevronRight, Clock, Users, Trophy, Zap, Gamepad2 } from 'lucide-react';
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

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

    if (diff <= 0) return <span className="text-red-500 text-[12px] font-bold animate-pulse">Boshlandi!</span>;

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    return (
        <span className="text-[#d97706] text-[12px] font-mono font-bold">
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
        <div className="h-screen theme-bg font-sans overflow-y-auto custom-scrollbar">
            <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 pb-24">
                
                {/* Top Navigation */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 px-4 py-2 theme-card border-[0.5px] theme-border rounded-xl transition-all theme-muted hover:theme-text"
                    >
                        <ArrowLeft size={18} />
                        <span className="font-semibold text-[14px]">{t('nav_back') || 'Ortga'}</span>
                    </button>

                    <div className="px-5 py-2 border-[0.5px] rounded-full" style={{ backgroundColor: 'rgba(13,148,136,0.1)', borderColor: 'var(--border-brand-soft)' }}>
                        <span className="text-[13px] font-bold flex items-center gap-2 theme-text">
                            <span className="text-[#0d9488]">NurFizika</span>
                            <span className="theme-muted">|</span>
                            <span>{t('tests_live_hub').replace("iga o'tish", '') || 'Live Test Hub'}</span>
                        </span>
                    </div>
                    <div className="w-[100px] hidden sm:block"></div>
                </div>

                {/* ═══════ BO'LIM 1: HERO — NurFizika Live ═══════ */}
                <div className="relative overflow-hidden rounded-2xl bg-[#0d9488] p-8 border-[0.5px] border-[#0f766e]">
                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                                <div className="relative">
                                    <div className="w-3.5 h-3.5 bg-red-500 rounded-full" />
                                    <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75" />
                                </div>
                                <span className="text-white/90 font-bold text-[12px] tracking-widest uppercase">
                                    {t('live_subtitle')}
                                </span>
                            </div>
                            <h1 className="text-white text-[32px] md:text-[40px] font-black mb-3 leading-tight">{t('live_title')}</h1>
                            <p className="text-[#ccfbf1] text-[15px] max-w-xl mx-auto md:mx-0 leading-relaxed font-medium">
                                Xona kodi orqali do'stlaringiz bilan real vaqtda raqobatlashgan holda fizika bilimingizni sinab ko'ring!
                            </p>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6 text-[#f0fdfa] text-[13px] font-semibold">
                                <span className="flex items-center gap-1.5"><Zap size={15} className="text-[#fde047]" /> AI-savollar</span>
                                <span className="flex items-center gap-1.5"><Users size={15} className="text-[#99f6e4]" /> Realtime interaktiv</span>
                                <span className="flex items-center gap-1.5"><Trophy size={15} className="text-[#fef08a]" /> XP mukofot</span>
                            </div>
                        </div>

                {/* ─── JOIN CARD ─── */}
                        <div
                            className="w-full md:w-80 theme-card border-[0.5px] theme-border rounded-2xl p-6"
                        >
                            <p className="theme-text font-bold mb-3 text-[14px]">{t('live_join')}</p>
                            <input
                                value={roomCode}
                                onChange={e => setRoomCode(e.target.value.toUpperCase())}
                                onKeyDown={e => e.key === 'Enter' && handleJoin()}
                                placeholder="NF-1234"
                                maxLength={7}
                                className="w-full theme-input border-[0.5px] theme-border rounded-xl px-4 py-3.5 text-[20px] font-mono placeholder:theme-muted focus:outline-none focus:border-[#14b8a6] text-center tracking-widest mb-4 transition-all"
                            />
                            <button
                                onClick={handleJoin}
                                disabled={roomCode.trim().length < 4}
                                className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed text-[15px] flex items-center justify-center gap-2">
                                {t('live_join_btn')} <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ═══════ BO'LIM 2: FAOL LIVE TESTLAR ═══════ */}
                {(liveAnnouncements.length > 0 || activeRooms.length > 0) && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="theme-text font-bold text-[18px] flex items-center gap-2">
                                <Radio size={20} className="text-red-500 animate-pulse" />
                                {t('tests_active_rooms')}
                            </h2>
                        </div>
                        <div className="grid gap-4">
                            {/* E'lonlardan */}
                            {liveAnnouncements.map(ann => {
                                const scheduled = ann.scheduledAt?.toDate ? ann.scheduledAt.toDate() : ann.scheduledAt ? new Date(ann.scheduledAt) : null;
                                const isLive = ann.status === 'active' || (scheduled && scheduled <= new Date());
                                return (
                                    <div key={ann.id}
                                        onClick={() => navigate(`/testlar/live/${ann.roomCode}`)}
                                        className={`group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border-[0.5px] transition-all cursor-pointer ${isLive
                                            ? 'bg-red-500/10 border-red-500/20 hover:border-red-400'
                                            : 'theme-card theme-border hover:border-[#14b8a6]'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${isLive ? 'bg-red-500/20' : 'bg-teal-500/10'}`}>
                                                🎮
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                    <p className="theme-text font-bold text-[15px] sm:text-[16px]">{ann.title}</p>
                                                    {isLive && (
                                                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm flex items-center gap-1">
                                                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" /> {t('tests_start') || 'LIVE'}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="theme-muted text-[13px] font-medium">{ann.topic} • {ann.questionCount || 10} ta {t('tests_questions')}</p>
                                                {!isLive && scheduled && scheduled > new Date() && (
                                                    <div className="mt-1 flex items-center gap-2">
                                                        <Clock size={12} className="theme-muted" />
                                                        <LiveCountdown targetTime={scheduled.getTime()} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 self-end sm:self-auto">
                                            <div className="text-right hidden sm:block">
                                                <p className="text-[#0d9488] font-mono font-bold text-[18px]">{ann.roomCode}</p>
                                                <p className="theme-muted text-[11px] font-bold tracking-wider">{t('live_room_code')}</p>
                                            </div>
                                            <button className={`px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 text-[14px] ${isLive
                                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                                : 'bg-[#0d9488] hover:bg-[#0f766e] text-white'
                                                }`}>
                                                {isLive ? t('live_join') : t('btn_view')} <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ═══════ BO'LIM 3: SO'NGGI NATIJALAR ═══════ */}
                {recentResults.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="theme-text font-bold text-[18px] flex items-center gap-2">
                            <Trophy size={20} className="text-[#d97706]" />
                            {t('tests_my_results')}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {recentResults.map(r => (
                                <div
                                    key={r.id}
                                    className="theme-card border-[0.5px] theme-border rounded-2xl p-5 transition-colors"
                                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand-400)'}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-2 rounded-lg border-[0.5px]" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                                            <Gamepad2 size={18} className="theme-muted" />
                                        </div>
                                        <span className="theme-muted text-[11px] px-2 py-0.5 rounded-sm font-bold border-[0.5px] theme-border" style={{ backgroundColor: 'var(--bg-primary)' }}>{t('btn_finish')}</span>
                                    </div>
                                    <h3 className="theme-text font-bold text-[14px] mb-1 truncate">{r.title || r.topic}</h3>
                                    <p className="theme-muted text-[13px] mb-4 font-medium">{r.topic}</p>
                                    <div className="flex items-center justify-between text-[12px] font-medium theme-muted rounded-lg p-2.5 border-[0.5px] theme-border" style={{ backgroundColor: 'var(--bg-primary)' }}>
                                        <span className="flex items-center gap-1.5"><Users size={14} className="theme-muted" /> {r.playersCount || '?'} {t('tests_players').toLowerCase()}</span>
                                        <span className="font-mono text-[#0d9488] font-bold">{r.id}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Info Panel */}
                <div
                    className="theme-card border-[0.5px] theme-border rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8"
                >
                    <div className="flex-1 space-y-3 text-center md:text-left">
                        <h3 className="theme-text font-bold text-[20px]">O'yin qonuniyatlari</h3>
                        <p className="theme-muted text-[14px] font-medium leading-relaxed max-w-lg">
                            NurFizika Live — bu real vaqt rejimida boshqalar bilan bilimingizni sinaydigan multiplayer tizimdir.
                            Savollarga qanchalik tez va to'g'ri javob bersangiz, shunchalik ko'p ball (va XP) olasiz! 🚀
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                        {[['⚡','Tezlik muhim'],['🤖','AI savollar'],['🏆','XP yutish'],['👥','Raqobat']].map(([emoji, label]) => (
                            <div
                                key={label}
                                className="p-4 rounded-xl border-[0.5px] text-center"
                                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
                            >
                                <p className="text-[24px] mb-2">{emoji}</p>
                                <p className="theme-text font-bold text-[13px]">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
