import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Users, Clock, Trophy, ArrowLeft, Loader, Zap, ChevronRight,
    CheckCircle, XCircle, Radio
} from 'lucide-react';
import {
    doc, collection, onSnapshot, setDoc, updateDoc, deleteDoc,
    increment, serverTimestamp, query, where
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useXP } from '../contexts/XPContext';
import { useLanguage } from '../contexts/LanguageContext';
import { generateLiveQuestions } from '../services/liveTestAI';

// ── Constants ──
const TIME_LIMITS = { easy: 25, medium: 20, hard: 15 };
const AVATAR_COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#8b5cf6', '#f97316'];
const OPT_COLORS = [
    { base: 'bg-red-500', hover: 'hover:bg-red-400', dim: 'bg-red-500/20' },
    { base: 'bg-blue-500', hover: 'hover:bg-blue-400', dim: 'bg-blue-500/20' },
    { base: 'bg-yellow-500', hover: 'hover:bg-yellow-400', dim: 'bg-yellow-500/20' },
    { base: 'bg-emerald-500', hover: 'hover:bg-emerald-400', dim: 'bg-emerald-500/20' },
];
const MEDALS = ['🥇', '🥈', '🥉'];

export default function LiveRoom() {
    const { roomCode } = useParams();
    const navigate = useNavigate();
    const { user, userData } = useAuth();
    const { addXP } = useXP();
    const { t } = useLanguage();

    // ── State ──
    const [room, setRoom] = useState(null);
    const [players, setPlayers] = useState([]);
    const [phase, setPhase] = useState('loading'); // loading | join | lobby | playing | results | error
    const [error, setError] = useState('');
    const [initialized, setInitialized] = useState(false); // bir marta init uchun

    const [avatarColor] = useState(() => AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)]);
    const [playerName, setPlayerName] = useState('');
    const [joining, setJoining] = useState(false);

    const [timeLeft, setTimeLeft] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [myScore, setMyScore] = useState(0);
    const [showCorrect, setShowCorrect] = useState(false);
    const [generatingQ, setGeneratingQ] = useState(false);
    const [xpAwarded, setXpAwarded] = useState(false);

    // ── Stable refs ──
    const joinedRef = useRef(false);
    const prevQRef = useRef(-1);
    const timerRef = useRef(null);
    const answeredRef = useRef(false);
    const roomRef = useRef(null);
    const playersRef = useRef([]);
    const userRef = useRef(user);

    // Sync refs
    useEffect(() => { answeredRef.current = answered; }, [answered]);
    useEffect(() => { roomRef.current = room; }, [room]);
    useEffect(() => { playersRef.current = players; }, [players]);
    useEffect(() => { userRef.current = user; }, [user]);

    // ── Derived ──
    const isHost = room?.hostId === user?.uid;
    const timeLimit = TIME_LIMITS[room?.difficulty] || 20;
    const questions = room?.questions || [];
    const currentQ = room?.currentQuestion ?? -1;
    const currentQuestion = questions[currentQ];

    // ── Default name (once) ──
    useEffect(() => {
        if (!playerName) {
            const n = userData?.displayName || user?.displayName || '';
            if (n) setPlayerName(n);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ── ROOM LISTENER — FAQAT ma'lumot yuklaydi, setPhase CHAQIRMAYDI ──
    // Cheksiz loop sababi: eski kod har snapshot da setPhase chaqirardi →
    // bu re-render qilardi → onSnapshot yangi ob'ekt → setPhase qayta → ♾️
    useEffect(() => {
        if (!roomCode) return;
        const unsub = onSnapshot(doc(db, 'rooms', roomCode), snap => {
            if (!snap.exists()) {
                setError('Xona topilmadi yoki mavjud emas');
                setPhase('error');
                return;
            }
            setRoom({ id: snap.id, ...snap.data() });
        }, () => { setError('Xona yuklanmadi'); setPhase('error'); });
        return () => unsub();
    }, [roomCode]); // faqat 1 marta subscribe

    // ── PLAYERS LISTENER ──
    useEffect(() => {
        if (!roomCode) return;
        const unsub = onSnapshot(collection(db, 'rooms', roomCode, 'players'), snap => {
            const roomCreatedAt = roomRef.current?.createdAt?.toMillis() || 0;
            const list = snap.docs
                .map(d => ({ id: d.id, ...d.data() }))
                // Eski session o'yinchilarini filter (10s toleranslik)
                .filter(p => (p.joinedAt?.toMillis() || 0) >= roomCreatedAt - 10000);
            setPlayers(list);
            const uid = userRef.current?.uid;
            if (uid && list.some(p => p.uid === uid) && !joinedRef.current)
                joinedRef.current = true;
        });
        return () => unsub();
    }, [roomCode]);

    // ── INIT (FAQAT 1 MARTA) — room VA user tayyor bo'lganda ──
    // initialized flag bilan cheksiz loopni oldini oladi
    useEffect(() => {
        if (!room || !user?.uid || initialized) return;
        setInitialized(true);

        const isAdminHost = room.hostId === user.uid;

        if (room.status === 'finished') {
            setPhase('results');
        } else if (room.status === 'playing' || room.status === 'showing_result') {
            if (room.status === 'showing_result') setShowCorrect(true);
            setPhase('playing');
        } else {
            // status === 'waiting'
            if (isAdminHost) {
                // Host JOIN formani ko'rmaydi, player list ga ham qo'shilmaydi
                joinedRef.current = true;
                setPhase('lobby');
            } else if (joinedRef.current) {
                setPhase('lobby');
            } else {
                setPhase('join');
            }
        }
    }, [room?.hostId, room?.id, user?.uid, initialized]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── STATUS O'ZGARISHI — init dan KEYIN, faqat status o'zganda ishlaydi ──
    useEffect(() => {
        if (!initialized || !room?.status) return;
        if (room.status === 'playing') { setShowCorrect(false); setPhase('playing'); }
        if (room.status === 'showing_result') { setShowCorrect(true); setPhase('playing'); }
        if (room.status === 'finished') setPhase('results');
    }, [room?.status, initialized]);

    // ── O'yinchi chiqganda player docini o'chirish ──
    useEffect(() => {
        return () => {
            const r = roomRef.current;
            const uid = userRef.current?.uid;
            if (!uid || !roomCode || r?.hostId === uid) return;
            if (joinedRef.current)
                deleteDoc(doc(db, 'rooms', roomCode, 'players', uid)).catch(() => { });
        };
    }, [roomCode]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── New question detected ──
    useEffect(() => {
        if (currentQ >= 0 && currentQ !== prevQRef.current) {
            prevQRef.current = currentQ;
            setSelected(null);
            setAnswered(false);
            answeredRef.current = false;
            setShowCorrect(false);
            setTimeLeft(timeLimit);
        }
    }, [currentQ, timeLimit]);

    // ── Join room ──
    const joinRoom = useCallback(async (nameOverride) => {
        if (!user?.uid || joinedRef.current) return;
        // Host hech qachon o'yinchi sifatida qo'shilmaydi
        if (roomRef.current?.hostId === user.uid) return;
        setJoining(true);
        try {
            const name = (nameOverride || playerName).trim() || "O'quvchi";
            await setDoc(doc(db, 'rooms', roomCode, 'players', user.uid), {
                uid: user.uid, name, avatarColor,
                score: 0, correctCount: 0, joinedAt: serverTimestamp(),
            });
            joinedRef.current = true;
            setPhase('lobby');
        } catch (e) {
            setError("Qo'shilishda xato: " + e.message);
        } finally {
            setJoining(false);
        }
    }, [roomCode, user?.uid, avatarColor, playerName]);

    // ── Submit answer ──
    const submitAnswer = useCallback(async (answerIdx) => {
        if (answeredRef.current) return;
        const r = roomRef.current;
        if (!r?.questions) return;
        answeredRef.current = true;
        setAnswered(true);
        setSelected(answerIdx);
        clearInterval(timerRef.current);

        const cQ = r.currentQuestion ?? -1;
        const question = r.questions?.[cQ];
        if (!question) return;

        const tl = timeLeft;
        const tLimit = TIME_LIMITS[r.difficulty] || 20;
        const isCorrect = answerIdx === question.correct;
        const points = isCorrect ? Math.round(500 + (tl / tLimit) * 500) : 0;

        try {
            await setDoc(doc(db, 'rooms', roomCode, 'answers', `q${cQ}_${user.uid}`), {
                uid: user.uid, questionIndex: cQ, answer: answerIdx,
                isCorrect, points, timeLeft: tl, submittedAt: serverTimestamp(),
            });
            if (points > 0) {
                await updateDoc(doc(db, 'rooms', roomCode, 'players', user.uid), {
                    score: increment(points), correctCount: increment(1),
                });
                setMyScore(prev => prev + points);
            }
            await updateDoc(doc(db, 'rooms', roomCode), { answeredCount: increment(1) });
        } catch (e) {
            console.error('Javob yuborishda xato:', e);
        }
    }, [roomCode, user?.uid, timeLeft]);

    // ── Timer ──
    useEffect(() => {
        if (phase !== 'playing' || !currentQuestion || answeredRef.current || showCorrect) {
            clearInterval(timerRef.current);
            return;
        }
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    if (!answeredRef.current) submitAnswer(null);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, [currentQ, phase, showCorrect]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── HOST: nextQuestion ──
    const nextQuestion = useCallback(async () => {
        const r = roomRef.current;
        if (!r || r.hostId !== user?.uid) return;
        const cQ = r.currentQuestion ?? -1;
        const qs = r.questions || [];
        const nextIdx = cQ + 1;
        if (nextIdx >= qs.length) {
            await updateDoc(doc(db, 'rooms', roomCode), { status: 'finished', finishedAt: serverTimestamp() });
            if (r.announcementId) {
                await updateDoc(doc(db, 'announcements', r.announcementId), { status: 'finished' }).catch(() => { });
            }
        } else {
            await updateDoc(doc(db, 'rooms', roomCode), {
                currentQuestion: nextIdx, status: 'playing', answeredCount: 0,
            });
        }
    }, [roomCode, user?.uid]);

    // ── HOST: auto show_result when all answered ──
    useEffect(() => {
        if (!isHost || room?.status !== 'playing') return;
        const total = playersRef.current.length;
        if (total > 0 && (room?.answeredCount || 0) >= total) {
            updateDoc(doc(db, 'rooms', roomCode), { status: 'showing_result' }).catch(() => { });
        }
    }, [room?.answeredCount, isHost, room?.status, roomCode]);

    // ── HOST: auto next after 4s on showing_result ──
    useEffect(() => {
        if (!isHost || room?.status !== 'showing_result') return;
        const t = setTimeout(() => nextQuestion(), 4000);
        return () => clearTimeout(t);
    }, [room?.status, currentQ, isHost]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── HOST: Start game ──
    const startGame = useCallback(async () => {
        if (!isHost || generatingQ) return;
        setGeneratingQ(true);
        try {
            const qs = await generateLiveQuestions(room?.topic, room?.difficulty, room?.questionCount || 10);
            await updateDoc(doc(db, 'rooms', roomCode), {
                questions: qs, status: 'playing', currentQuestion: 0,
                answeredCount: 0, startedAt: serverTimestamp(),
            });
            if (room?.announcementId) {
                await updateDoc(doc(db, 'announcements', room.announcementId), { status: 'active' }).catch(() => { });
            }
        } catch (e) {
            setError('Savollar generatsiyada xato: ' + e.message);
        } finally {
            setGeneratingQ(false);
        }
    }, [isHost, generatingQ, room?.topic, room?.difficulty, room?.questionCount, room?.announcementId, roomCode]);

    // ── HOST: Show answer manually ──
    const showAnswer = useCallback(async () => {
        if (!isHost) return;
        await updateDoc(doc(db, 'rooms', roomCode), { status: 'showing_result' });
    }, [isHost, roomCode]);

    // ── XP award once ──
    useEffect(() => {
        if (phase !== 'results' || xpAwarded || !user?.uid) return;
        const sorted = [...playersRef.current].sort((a, b) => (b.score || 0) - (a.score || 0));
        const rank = sorted.findIndex(p => p.uid === user.uid) + 1;
        const xp = rank === 1 ? 150 : rank === 2 ? 100 : rank === 3 ? 75 : 50;
        addXP(xp, `live_rank_${rank}`);
        setXpAwarded(true);
    }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

    // ═══════════════════════════════════════════════════════════════════════════
    // RENDER
    // ═══════════════════════════════════════════════════════════════════════════

    if (phase === 'error') return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="text-center max-w-sm">
                <div className="text-6xl mb-4">😵</div>
                <p className="text-red-400 text-lg font-semibold mb-2">{error}</p>
                <p className="text-slate-500 text-sm mb-6">Xona kodi noto'g'ri yoki xona o'chirilgan bo'lishi mumkin</p>
                <button onClick={() => navigate('/testlar')}
                    className="px-6 py-2.5 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-all flex items-center gap-2 mx-auto">
                    <ArrowLeft size={16} /> Testlarga qaytish
                </button>
            </div>
        </div>
    );

    if (phase === 'loading') return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto">
                    <Loader size={28} className="text-indigo-400 animate-spin" />
                </div>
                <p className="text-white font-semibold">{t('common').loading || 'Xona yuklanmoqda...'}</p>
                <p className="text-slate-500 text-sm font-mono">{roomCode}</p>
            </div>
        </div>
    );

    // ═══════ PHASE: JOIN ═══════
    if (phase === 'join' && !joinedRef.current) return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="text-6xl mb-3">🎮</div>
                    <h1 className="text-white text-2xl font-bold">{t('live_title') || 'NurFizika Live'}</h1>
                    <p className="text-indigo-400 font-mono text-xl mt-1 tracking-widest">{roomCode}</p>
                    {room?.topic && <p className="text-slate-500 text-sm mt-1">{room.topic}</p>}
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
                    <div>
                        <p className="text-slate-400 text-xs mb-2 uppercase tracking-wider">Sizning rangingiz</p>
                        <div className="flex gap-2 flex-wrap">
                            {AVATAR_COLORS.map(color => (
                                <div key={color} className="w-8 h-8 rounded-full flex-shrink-0"
                                    style={{ background: color, border: color === avatarColor ? '2px solid white' : '2px solid transparent' }} />
                            ))}
                        </div>
                        <p className="text-slate-600 text-xs mt-1.5">Rang avtomatik belgilangan</p>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-800/80 rounded-xl p-3">
                        <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                            style={{ background: avatarColor }}>
                            {playerName?.[0]?.toUpperCase() || '?'}
                        </div>
                        <input
                            value={playerName}
                            onChange={e => setPlayerName(e.target.value)}
                            placeholder="Ismingizni kiriting"
                            maxLength={20}
                            onKeyDown={e => e.key === 'Enter' && joinRoom(playerName)}
                            className="bg-transparent text-white flex-1 focus:outline-none placeholder-slate-600 text-sm"
                        />
                    </div>

                    <button onClick={() => joinRoom(playerName)}
                        disabled={!playerName.trim() || joining}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95">
                        {joining ? `⏳ ${t('live_connecting')}` : `🎮 ${t('live_join_btn')}`}
                    </button>
                </div>
            </div>
        </div>
    );

    // ═══════ PHASE: LOBBY ═══════
    if (phase === 'lobby') return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-center">
                <p className="text-indigo-200 text-xs uppercase tracking-[0.2em] mb-1">{t('live_room_code')}</p>
                <p className="text-white text-5xl font-bold font-mono tracking-widest">{roomCode}</p>
                <p className="text-indigo-200 mt-2">
                    {room?.topic} • {room?.questionCount || 10} ta {t('tests_questions')}
                    {' • '}{room?.difficulty === 'easy' ? `🟢 ${t('tests_easy')}` : room?.difficulty === 'hard' ? `🔴 ${t('tests_hard')}` : `🟡 ${t('tests_medium')}`}
                </p>
            </div>

            <div className="flex flex-col items-center justify-center py-4 gap-3">
                {/* Host badge */}
                {isHost && (
                    <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full px-5 py-2">
                        <span className="text-indigo-400 font-medium text-sm">👑 Siz — Xona Admini</span>
                    </div>
                )}
                {/* Player count */}
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-5 py-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                    <span className="text-emerald-400 font-medium text-sm">{players.length} {t('live_players').toLowerCase()}</span>
                </div>
            </div>

            <div className="flex-1 p-5 overflow-y-auto">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                    {players.map(p => (
                        <div key={p.id} className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 flex flex-col items-center gap-2">
                            <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                                style={{ background: p.avatarColor || '#6366f1' }}>
                                {p?.name?.[0]?.toUpperCase() || '?'}
                            </div>
                            <p className="text-white text-xs font-medium text-center truncate w-full">
                                {p?.name || "O'quvchi"}
                                {p.uid === user?.uid && <span className="text-indigo-400 text-[10px] block">(Siz)</span>}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {isHost ? (
                <div className="p-5 border-t border-slate-800">
                    <button onClick={startGame}
                        disabled={players.length < 1 || generatingQ}
                        className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xl rounded-2xl shadow-lg shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center gap-3">
                        {generatingQ
                            ? <><Loader size={22} className="animate-spin" /> 🤖 AI...</>
                            : <>▶ {t('live_start')} ({players.length})</>}
                    </button>
                </div>
            ) : (
                <div className="p-5 text-center text-slate-400 text-sm border-t border-slate-800">
                    ⏳ {t('live_waiting_desc')}
                </div>
            )}
        </div>
    );

    // ═══════ PHASE: PLAYING ═══════
    if (phase === 'playing' && currentQuestion) return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
            <div className="bg-slate-900 border-b border-slate-800 p-4">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-400 text-sm font-medium">{currentQ + 1} / {questions.length}</span>
                    <div className={`text-5xl font-black font-mono transition-colors ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                        {timeLeft}
                    </div>
                    <span className="text-slate-400 text-xs">{myScore.toLocaleString()} {t('live_score').toLowerCase()}</span>
                </div>
                <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ease-linear ${timeLeft <= 5 ? 'bg-red-500' : 'bg-indigo-500'}`}
                        style={{ width: `${(timeLeft / timeLimit) * 100}%` }} />
                </div>
            </div>

            <div className="flex-1 p-4 sm:p-5 overflow-y-auto">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-5 text-center">
                    <p className="text-white text-lg sm:text-xl font-semibold leading-relaxed">{currentQuestion.question}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentQuestion.options.map((opt, i) => {
                        const isCorrectOpt = i === currentQuestion.correct;
                        const isSelected = i === selected;
                        let cls = '';
                        if (showCorrect) {
                            if (isCorrectOpt) cls = 'bg-emerald-500 ring-4 ring-emerald-300/50 scale-[1.02]';
                            else if (isSelected) cls = 'bg-red-500/80 ring-2 ring-red-400/50';
                            else cls = `${OPT_COLORS[i].dim} opacity-40`;
                        } else if (answered) {
                            cls = isSelected ? `${OPT_COLORS[i].base} ring-4 ring-white/30` : `${OPT_COLORS[i].dim} opacity-50`;
                        } else {
                            cls = `${OPT_COLORS[i].base} ${OPT_COLORS[i].hover} hover:scale-[1.02] active:scale-95`;
                        }
                        return (
                            <button key={i}
                                onClick={() => !answered && submitAnswer(i)}
                                disabled={answered}
                                className={`${cls} text-white font-semibold p-5 rounded-2xl text-left transition-all duration-300 min-h-[80px] flex items-start gap-3`}>
                                <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">
                                    {['A', 'B', 'C', 'D'][i]}
                                </span>
                                <span className="text-sm sm:text-base leading-snug flex-1">{opt}</span>
                                {showCorrect && isCorrectOpt && <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />}
                                {showCorrect && isSelected && !isCorrectOpt && <XCircle size={20} className="flex-shrink-0 mt-0.5" />}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-4 space-y-3">
                    {answered && !showCorrect && (
                        <div className="text-center">
                            {selected === currentQuestion.correct
                                ? <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-5 py-2">
                                    <CheckCircle size={16} className="text-emerald-400" />
                                    <span className="text-emerald-400 font-semibold text-sm">To'g'ri! +{Math.round(500 + (timeLeft / timeLimit) * 500)} ball</span>
                                </div>
                                : <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-5 py-2">
                                    <XCircle size={16} className="text-red-400" />
                                    <span className="text-red-400 font-semibold text-sm">{selected === null ? 'Vaqt tugadi!' : "Noto'g'ri"}</span>
                                </div>
                            }
                        </div>
                    )}

                    {answered && !showCorrect && (
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-full px-5 py-2.5">
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-ping" />
                                <span className="text-slate-300 text-sm">
                                    {room?.answeredCount || 0}/{players.length} javob berdi...
                                </span>
                            </div>
                        </div>
                    )}

                    {showCorrect && currentQuestion.explanation && (
                        <div className="bg-slate-900 border border-indigo-500/30 rounded-xl p-4">
                            <p className="text-indigo-400 font-medium text-sm mb-1">💡 Tushuntirish</p>
                            <p className="text-slate-300 text-sm">{currentQuestion.explanation}</p>
                        </div>
                    )}

                    {isHost && (
                        <div className="flex gap-3 justify-center pt-1">
                            {!showCorrect && answered && (
                                <button onClick={showAnswer}
                                    className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl transition-all text-sm">
                                    👀 Javobni Ko'rsat
                                </button>
                            )}
                            {(showCorrect || answered) && (
                                <button onClick={nextQuestion}
                                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all flex items-center gap-2 text-sm">
                                    {currentQ + 1 >= questions.length ? `🏆 ${t('btn_finish')}` : <>{t('btn_next')} <ChevronRight size={16} /></>}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    // ═══════ PHASE: RESULTS ═══════
    if (phase === 'results') {
        const sorted = [...players].sort((a, b) => (b.score || 0) - (a.score || 0));
        const myRank = sorted.findIndex(p => p.uid === user?.uid) + 1;
        const myXP = myRank === 1 ? 150 : myRank === 2 ? 100 : myRank === 3 ? 75 : 50;

        return (
            <div className="min-h-screen bg-slate-950 p-4 sm:p-6 overflow-y-auto">
                <div className="text-center mb-6">
                    <div className="text-6xl mb-2">{MEDALS[myRank - 1] || '🎮'}</div>
                    <h1 className="text-white text-3xl font-bold">{myRank === 1 ? "G'olib!" : `${myRank}-o'rin`}</h1>
                    <p className="text-emerald-400 font-bold text-xl mt-1">+{myXP} XP</p>
                    <p className="text-slate-400 text-sm mt-1">{room?.topic} • {players.length} ta ishtirokchi</p>
                </div>

                {sorted.length >= 2 && (
                    <div className="flex items-end justify-center gap-3 sm:gap-5 mb-8 max-w-md mx-auto">
                        {[1, 0, 2].map(idx => sorted[idx] && (
                            <div key={idx} className={`text-center ${idx === 0 ? 'flex-[1.3]' : 'flex-1'}`}>
                                <div className={`rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold shadow-lg ${idx === 0 ? 'w-16 h-16 text-2xl' : 'w-12 h-12 text-xl'}`}
                                    style={{ background: sorted[idx].avatarColor || '#6366f1' }}>
                                    {sorted[idx]?.name?.[0]?.toUpperCase() || '?'}
                                </div>
                                <p className={`font-medium text-sm truncate ${sorted[idx]?.uid === user?.uid ? 'text-indigo-400' : 'text-white'}`}>
                                    {sorted[idx]?.name || "O'quvchi"}
                                </p>
                                <p className="text-slate-400 text-xs">{(sorted[idx].score || 0).toLocaleString()}</p>
                                <div className={`rounded-t-xl mt-2 flex items-center justify-center text-2xl ${idx === 0 ? 'h-20 bg-yellow-500/20 border border-yellow-500/30' : idx === 1 ? 'h-14 bg-slate-500/20 border border-slate-500/30' : 'h-10 bg-amber-700/20 border border-amber-700/30'}`}>
                                    {MEDALS[idx === 0 ? 0 : idx === 1 ? 1 : 2]}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="bg-indigo-500/10 border-2 border-indigo-500/30 rounded-2xl p-4 mb-4 max-w-md mx-auto flex items-center gap-4">
                    <div className="text-center">
                        <p className="text-slate-400 text-xs">O'rningiz</p>
                        <p className="text-indigo-400 text-2xl font-black">#{myRank}</p>
                    </div>
                    <div className="flex-1">
                        <p className="text-white font-semibold">{myScore.toLocaleString()} ball</p>
                        <p className="text-emerald-400 text-sm font-semibold">+{myXP} XP olindi! 🎉</p>
                    </div>
                    <Zap size={28} className="text-yellow-400" />
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden max-w-md mx-auto mb-6">
                    {sorted.map((p, i) => (
                        <div key={p.id}
                            className={`flex items-center gap-3 p-4 border-b border-slate-800/50 last:border-0 ${p.uid === user?.uid ? 'bg-indigo-500/10' : ''}`}>
                            <span className="text-slate-400 w-6 text-center font-bold text-sm">{MEDALS[i] || i + 1}</span>
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                                style={{ background: p.avatarColor || '#6366f1' }}>
                                {p?.name?.[0]?.toUpperCase() || '?'}
                            </div>
                            <p className={`flex-1 font-medium text-sm truncate ${p.uid === user?.uid ? 'text-indigo-400' : 'text-white'}`}>
                                {p?.name || "O'quvchi"} {p.uid === user?.uid && '(Siz)'}
                            </p>
                            <div className="text-right">
                                <p className="text-white font-bold text-sm">{(p.score || 0).toLocaleString()}</p>
                                <p className="text-emerald-400 text-[10px] font-semibold">+{i === 0 ? 150 : i === 1 ? 100 : i === 2 ? 75 : 50} XP</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <button onClick={() => navigate('/testlar')}
                        className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all">
                        🏠 {t('btn_back')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <Loader size={32} className="text-indigo-400 animate-spin" />
        </div>
    );
}
