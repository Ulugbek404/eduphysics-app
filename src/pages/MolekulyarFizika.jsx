import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, BookOpen, FlaskConical, HelpCircle,
    Zap, CheckCircle, XCircle, RotateCcw, Trophy, Plus, 
    Thermometer, Gauge, Wind, Info, TrendingUp, ChevronRight
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// ══════════════════════════════════════════════════════════
//  COMPONENTS & UTILS
// ══════════════════════════════════════════════════════════

function SectionTitle({ title, icon: Icon }) {
    return (
        <h3 className="flex items-center gap-2 text-lg font-bold theme-text mb-4">
            <Icon size={20} className="text-indigo-500" />
            {title}
        </h3>
    );
}

// ══════════════════════════════════════════════════════════
//  TAB 1 — NAZARIYA
// ══════════════════════════════════════════════════════════
function NazariyaTab() {
    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            
            {/* Main Formula Card */}
            <div className="theme-card-premium p-8 text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-2xl transition-all group-hover:bg-indigo-500/20" />
                <p className="theme-text-secondary text-xs font-bold uppercase tracking-widest mb-4 opacity-70">Ideal gaz holat tenglamasi</p>
                <div className="inline-flex items-center gap-4 bg-white/5 dark:bg-black/20 border theme-border rounded-3xl px-12 py-8 shadow-inner backdrop-blur-md">
                    <span className="text-6xl font-black font-mono text-indigo-500 drop-shadow-sm tracking-tighter">PV</span>
                    <span className="text-4xl font-bold theme-text opacity-40">=</span>
                    <span className="text-6xl font-black font-mono text-amber-500 drop-shadow-sm tracking-tighter">nRT</span>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    {[
                        { l: 'P', c: 'indigo', n: 'Bosim' },
                        { l: 'V', c: 'indigo', n: 'Hajm' },
                        { l: 'n', c: 'amber', n: 'Modda miqdori' },
                        { l: 'R', c: 'amber', n: 'Gaz doimiysi' },
                        { l: 'T', c: 'amber', n: 'Temperatura' }
                    ].map((item, i) => (
                        <div key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-${item.c}-500/5 border border-${item.c}-500/10`}>
                            <span className={`text-${item.c}-500 font-black font-mono text-lg`}>{item.l}</span>
                            <span className="theme-text-secondary text-[11px] font-medium">— {item.n}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Explanation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="theme-card-premium p-6 space-y-4">
                    <SectionTitle title="MKN Asoslari" icon={BookOpen} />
                    <div className="space-y-3 theme-text-secondary text-sm leading-relaxed">
                        <p>Molekulyar-kinetik nazariya (MKN) modda tuzilishini uchta asosiy qoida bilan tushuntiradi:</p>
                        <ul className="space-y-2">
                            <li className="flex gap-2 items-start bg-indigo-500/5 p-2 rounded-lg border-l-2 border-indigo-500">
                                <span className="text-indigo-500 font-black">1.</span>
                                <span>Barcha moddalar zarralardan (molekula, atom) tuzilgan.</span>
                            </li>
                            <li className="flex gap-2 items-start bg-indigo-500/5 p-2 rounded-lg border-l-2 border-indigo-500">
                                <span className="text-indigo-500 font-black">2.</span>
                                <span>Zarralar doimiy tartibsiz harakatda bo'ladi.</span>
                            </li>
                            <li className="flex gap-2 items-start bg-indigo-500/5 p-2 rounded-lg border-l-2 border-indigo-500">
                                <span className="text-indigo-500 font-black">3.</span>
                                <span>Zarralar bir-biri bilan o'zaro ta'sirlashadi.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="theme-card-premium p-6 space-y-4">
                    <SectionTitle title="Termodinamik parametrlar" icon={Thermometer} />
                    <div className="space-y-4">
                        <div className="p-4 rounded-2xl bg-white/5 dark:bg-black/10 border theme-border group hover:border-indigo-500/30 transition-all">
                            <p className="theme-text font-bold text-sm mb-1">Izotermik jarayon (T = const)</p>
                            <p className="theme-text-secondary text-xs">Boyl-Mariott qonuni: P₁V₁ = P₂V₂</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 dark:bg-black/10 border theme-border group hover:border-amber-500/30 transition-all">
                            <p className="theme-text font-bold text-sm mb-1">Izobarik jarayon (P = const)</p>
                            <p className="theme-text-secondary text-xs">Gey-Lyussak qonuni: V₁/T₁ = V₂/T₂</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 dark:bg-black/10 border theme-border group hover:border-rose-500/30 transition-all">
                            <p className="theme-text font-bold text-sm mb-1">Izoxorik jarayon (V = const)</p>
                            <p className="theme-text-secondary text-xs">Sharl qonuni: P₁/T₁ = P₂/T₂</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ══════════════════════════════════════════════════════════
//  Molecule Animation Component
// ══════════════════════════════════════════════════════════
function MoleculeCanvas({ temp, volume, count = 25 }) {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const frameId = useRef(null);

    // Speed scales with sqrt(temp)
    const speed = Math.sqrt(temp) * 0.4;
    // Scale container based on volume
    const containerScale = 0.5 + (volume / 100) * 0.5;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;

        // Init particles
        particles.current = Array.from({ length: count }).map(() => ({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            r: 3 + Math.random() * 2
        }));

        const render = () => {
            ctx.clearRect(0, 0, W, H);
            
            // Draw background grid
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.05)';
            ctx.lineWidth = 1;
            for(let i=0; i<W; i+=20) { ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,H); ctx.stroke(); }
            for(let j=0; j<H; j+=20) { ctx.beginPath(); ctx.moveTo(0,j); ctx.lineTo(W,j); ctx.stroke(); }

            particles.current.forEach(p => {
                p.x += p.vx * speed;
                p.y += p.vy * speed;

                if (p.x < 0 || p.x > W) p.vx *= -1;
                if (p.y < 0 || p.y > H) p.vy *= -1;

                // Draw molecule
                const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
                grad.addColorStop(0, '#6366f1');
                grad.addColorStop(1, '#4f46e5');
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.shadowBlur = 8;
                ctx.shadowColor = 'rgba(99, 102, 241, 0.5)';
                ctx.fill();
            });

            frameId.current = requestAnimationFrame(render);
        };
        render();
        return () => cancelAnimationFrame(frameId.current);
    }, [speed, count]);

    return (
        <div className="relative w-full aspect-square max-w-[300px] mx-auto overflow-hidden rounded-3xl border-4 theme-border bg-white/5 dark:bg-black/30 shadow-2xl transition-all duration-500"
            style={{ transform: `scale(${containerScale})` }}
        >
            <canvas ref={canvasRef} width="300" height="300" className="w-full h-full" />
            
            {/* Gloss overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-50" />
            
            {/* Volume markers */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-indigo-500/20" />
            <div className="absolute left-0 top-1/4 w-4 h-0.5 bg-indigo-500/40" />
            <div className="absolute left-0 top-2/4 w-6 h-0.5 bg-indigo-500/60" />
            <div className="absolute left-0 top-3/4 w-4 h-0.5 bg-indigo-500/40" />
        </div>
    );
}

// ══════════════════════════════════════════════════════════
//  TAB 2 — TAJRIBA
// ══════════════════════════════════════════════════════════
function TajribaTab() {
    const [temp, setTemp] = useState(300); // Kelvin
    const [volume, setVolume] = useState(50); // Litre
    const [n] = useState(2); // moles
    const R = 0.0821; // atm*L/mol*K

    // P = nRT/V
    const pressure = (n * R * temp) / volume;

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left side: Visualization */}
                <div className="theme-card-premium p-8 flex flex-col items-center justify-center gap-8 min-h-[400px]">
                    <SectionTitle title="Gaz holati vizualizatsiyasi" icon={FlaskConical} />
                    <MoleculeCanvas temp={temp} volume={volume} />
                    
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="theme-card p-4 text-center border-indigo-500/20 bg-indigo-500/5">
                            <p className="theme-text-secondary text-[10px] font-black uppercase tracking-widest mb-1">Harakat tezligi</p>
                            <p className="theme-text font-black font-mono">{Math.sqrt(temp).toFixed(1)} m/s</p>
                        </div>
                        <div className="theme-card p-4 text-center border-amber-500/20 bg-amber-500/5">
                            <p className="theme-text-secondary text-[10px] font-black uppercase tracking-widest mb-1">To'qnashuvlar</p>
                            <p className="theme-text font-black font-mono">{(pressure * 10).toFixed(0)} / sek</p>
                        </div>
                    </div>
                </div>

                {/* Right side: Controls & Results */}
                <div className="space-y-6">
                    {/* Controls */}
                    <div className="space-y-4">
                        {/* Temp Control */}
                        <div className="theme-card-premium p-6 shadow-inner">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-rose-500 font-black text-sm uppercase tracking-wider flex items-center gap-2">
                                    <Thermometer size={18} /> Temperatura (T)
                                </span>
                                <span className="theme-text font-black font-mono bg-rose-500/10 border border-rose-500/20 px-4 py-1.5 rounded-xl text-base shadow-sm">
                                    {temp} K
                                </span>
                            </div>
                            <input type="range" min={100} max={1000} step={10} value={temp}
                                onChange={e => setTemp(Number(e.target.value))}
                                className="w-full h-3 rounded-2xl appearance-none cursor-pointer accent-rose-500 bg-black/10 dark:bg-white/10 theme-border border"
                            />
                            <div className="flex justify-between theme-muted text-[10px] font-bold mt-2 uppercase tracking-tighter"><span>100K</span><span>1000K</span></div>
                        </div>

                        {/* Volume Control */}
                        <div className="theme-card-premium p-6 shadow-inner">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-indigo-500 font-black text-sm uppercase tracking-wider flex items-center gap-2">
                                    <Wind size={18} /> Hajm (V)
                                </span>
                                <span className="theme-text font-black font-mono bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-xl text-base shadow-sm">
                                    {volume} L
                                </span>
                            </div>
                            <input type="range" min={10} max={100} step={5} value={volume}
                                onChange={e => setVolume(Number(e.target.value))}
                                className="w-full h-3 rounded-2xl appearance-none cursor-pointer accent-indigo-500 bg-black/10 dark:bg-white/10 theme-border border"
                            />
                            <div className="flex justify-between theme-muted text-[10px] font-bold mt-2 uppercase tracking-tighter"><span>10L</span><span>100L</span></div>
                        </div>
                    </div>

                    {/* Result Card */}
                    <div className="theme-card-premium p-8 text-center border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-transparent relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl" />
                        
                        <p className="theme-text-secondary text-xs font-bold uppercase tracking-widest mb-3 opacity-70">O'lchangan Bosim (P)</p>
                        <div className="flex items-center justify-center gap-4 mb-3">
                            <Gauge size={48} className="text-amber-500" />
                            <p className="text-6xl font-black font-mono text-amber-500 drop-shadow-sm">
                                {pressure.toFixed(2)}
                            </p>
                            <span className="text-2xl font-black theme-text opacity-30 mt-4">atm</span>
                        </div>
                        
                        <div className="inline-flex items-center gap-2 bg-black/5 dark:bg-white/5 px-4 py-2 rounded-2xl border theme-border">
                            <span className="theme-muted text-[11px] font-mono">Formula:</span>
                            <span className="theme-text font-mono font-bold text-xs">P = ({n} × 0.0821 × {temp}) / {volume}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info bar */}
            <div className="theme-card-premium p-4 flex items-center gap-4 border-l-4 border-indigo-500">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 flex-shrink-0">
                    <Info size={20} />
                </div>
                <p className="theme-text-secondary text-sm">
                    <strong>Eslatma:</strong> Temperatura oshishi bilan molekulalar tezligi va ularning idish devoriga urilish kuchi (bosim) ortadi. Hajm kamayishi esa zarralar to'qnashuvi chastotasini oshiradi.
                </p>
            </div>
        </motion.div>
    );
}

// ══════════════════════════════════════════════════════════
//  TAB 3 — SAVOL-JAVOB (Quiz)
// ══════════════════════════════════════════════════════════
const quizQuestions = [
    {
        q: "Ideal gaz holat tenglamasida R harfi nimani anglatadi?",
        options: ["Radius", "Reaksiya tezligi", "Universal gaz doimiysi", "Qarshilik"],
        correct: 2,
    },
    {
        q: "Hajm o'zgarmas bo'lgan jarayon (V = const) qanday nomlanadi?",
        options: ["Izotermik", "Izobarik", "Izoxorik", "Adiabatik"],
        correct: 2,
    },
    {
        q: "Temperatura 2 baravar oshsa va hajm o'zgarmasa, bosim qanday o'zgaradi?",
        options: ["2 baravar oshadi", "2 baravar kamayadi", "O'zgarmaydi", "4 baravar oshadi"],
        correct: 0,
    },
];

function SavolJavobTab({ onXPEarned }) {
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleAnswer = (qi, optIndex) => {
        if (submitted) return;
        setAnswers(prev => ({ ...prev, [qi]: optIndex }));
    };

    const handleSubmit = () => {
        let s = 0;
        quizQuestions.forEach((q, i) => { if (answers[i] === q.correct) s++; });
        setScore(s);
        setSubmitted(true);
        if (s >= 2) {
            setShowConfetti(true);
            onXPEarned(100);
        }
    };

    const handleRetry = () => {
        setAnswers({});
        setSubmitted(false);
        setScore(0);
        setShowConfetti(false);
    };

    const allAnswered = Object.keys(answers).length === quizQuestions.length;

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <motion.div key={i}
                            initial={{ x: `${Math.random() * 100}vw`, y: -20, rotate: 0, opacity: 1 }}
                            animate={{ y: '110vh', rotate: 720, opacity: 0 }}
                            transition={{ duration: 2.5 + Math.random() * 2, delay: Math.random() * 0.5 }}
                            className="absolute w-3 h-3 rounded-full"
                            style={{ background: ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'][i % 5] }}
                        />
                    ))}
                </div>
            )}

            {submitted && (
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className={`rounded-3xl border-2 p-8 text-center relative overflow-hidden ${score >= 2
                            ? 'border-emerald-500/40 bg-emerald-500/5'
                            : 'border-rose-500/40 bg-rose-500/5'
                        }`}
                >
                    <div className="relative z-10">
                        {score >= 2 ? (
                            <>
                                <Trophy size={64} className="text-amber-500 mx-auto mb-4 drop-shadow-lg" />
                                <h3 className="text-3xl font-black theme-text mb-2 tracking-tight">Mukammal! 🌟</h3>
                                <p className="theme-text-secondary font-medium mb-6">Siz ideal gaz qonunlarini yaxshi o'zlashtirdingiz!</p>
                                <motion.div 
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="inline-flex items-center gap-3 bg-indigo-600 text-white rounded-2xl px-8 py-3.5 shadow-xl shadow-indigo-600/30"
                                >
                                    <Zap size={20} fill="white" />
                                    <span className="font-black text-xl">+100 XP QO'SHILDI!</span>
                                </motion.div>
                            </>
                        ) : (
                            <>
                                <XCircle size={64} className="text-rose-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-black theme-text mb-2">Qayta o'qib ko'ring</h3>
                                <p className="theme-text-secondary mb-6">{score}/{quizQuestions.length} to'g'ri — kamida 2 ta kerak</p>
                                <button onClick={handleRetry}
                                    className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black transition-all mx-auto shadow-lg shadow-indigo-600/20 active:scale-95"
                                >
                                    <RotateCcw size={18} /> QAYTA BOSHLASH
                                </button>
                            </>
                        )}
                    </div>
                </motion.div>
            )}

            <div className="space-y-4">
                {quizQuestions.map((q, qi) => (
                    <div key={qi} className="theme-card-premium p-6">
                        <div className="flex gap-4 mb-6">
                            <span className="flex-shrink-0 w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-black text-indigo-500">
                                {qi + 1}
                            </span>
                            <p className="theme-text font-bold text-[17px] leading-snug pt-1">
                                {q.q}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {q.options.map((opt, oi) => {
                                const selected = answers[qi] === oi;
                                const isCorrect = oi === q.correct;
                                let style = 'theme-surface border-theme-border theme-text hover:border-indigo-500/50 hover:bg-indigo-500/5';
                                if (submitted) {
                                    if (isCorrect) style = 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
                                    else if (selected && !isCorrect) style = 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 opacity-80';
                                    else style = 'theme-surface theme-border opacity-40';
                                } else if (selected) {
                                    style = 'border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shadow-md';
                                }
                                return (
                                    <button key={oi} onClick={() => handleAnswer(qi, oi)}
                                        className={`w-full text-left px-5 py-4 rounded-2xl border-2 text-sm font-bold transition-all duration-200 flex items-center gap-3 ${style}`}
                                    >
                                        <span className={`w-6 h-6 rounded-lg border-2 flex-shrink-0 flex items-center justify-center text-[11px] font-black transition-colors ${selected ? 'border-current bg-current text-white' : 'border-current opacity-30'}`}>
                                            {String.fromCharCode(65 + oi)}
                                        </span>
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {!submitted && (
                <button
                    onClick={handleSubmit}
                    disabled={!allAnswered}
                    className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 active:scale-[0.99]"
                >
                    {allAnswered ? (
                        <>JAVOBLARNI TEKSHIRISH <ChevronRight size={20} /></>
                    ) : (
                        `${quizQuestions.length - Object.keys(answers).length} TA SAVOL QOLDI`
                    )}
                </button>
            )}
        </motion.div>
    );
}

// ══════════════════════════════════════════════════════════
//  MAIN PAGE
// ══════════════════════════════════════════════════════════
const TABS = [
    { id: 'nazariya', label: 'Nazariya', icon: <BookOpen size={18} /> },
    { id: 'tajriba', label: 'Tajriba', icon: <FlaskConical size={18} /> },
    { id: 'quiz', label: 'Savol-Javob', icon: <HelpCircle size={18} /> },
];

export default function MolekulyarFizika() {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('nazariya');
    const [xpEarned, setXpEarned] = useState(false);

    useEffect(() => {
        const completed = JSON.parse(localStorage.getItem('completedLabs') || '[]');
        if (completed.includes('gaz')) setXpEarned(true);
    }, []);

    const handleXPEarned = (amount) => {
        if (xpEarned) return;
        setXpEarned(true);
        const completed = JSON.parse(localStorage.getItem('completedLabs') || '[]');
        if (!completed.includes('gaz')) {
            localStorage.setItem('completedLabs', JSON.stringify([...completed, 'gaz']));
        }
    };

    return (
        <div className="h-screen overflow-y-auto custom-scrollbar theme-bg theme-text font-sans scroll-smooth">
            <div className="max-w-5xl mx-auto px-6 pb-24 pt-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                    <button
                        onClick={() => navigate('/laboratoriya')}
                        className="w-12 h-12 rounded-2xl theme-surface border theme-border flex items-center justify-center theme-text-secondary hover:theme-text hover:border-indigo-500 transition-all group shrink-0 shadow-sm"
                    >
                        <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    
                    <div className="flex-1">
                        <div className="flex items-center gap-2 theme-muted text-[11px] font-black uppercase tracking-widest mb-1.5 opacity-60">
                            <span>Laboratoriya</span>
                            <span className="opacity-40">/</span>
                            <span className="text-indigo-500">Molekulyar fizika</span>
                        </div>
                        <h1 className="text-3xl font-black theme-text tracking-tight flex items-center gap-3">
                            <span className="w-10 h-10 rounded-2xl bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20">🧪</span>
                            Ideal gaz qonuni laboratoriyasi
                        </h1>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-center">
                        <span className="px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-black uppercase tracking-wider shadow-sm">
                            Qiyin
                        </span>
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-indigo-600/20">
                            <Zap size={14} fill="white" /> +100 XP
                        </div>
                        {xpEarned && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                                className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white shadow-lg"
                                title="Tugallandi"
                            >
                                <CheckCircle size={18} strokeWidth={3} />
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 theme-surface border theme-border rounded-2xl p-1.5 mb-8 shadow-sm backdrop-blur-md sticky top-0 z-30">
                    {TABS.map(tab => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-[13px] font-black uppercase tracking-widest transition-all duration-300 relative overflow-hidden ${isActive
                                        ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20'
                                        : 'theme-text-secondary hover:theme-text hover:bg-black/5 dark:hover:bg-white/5'
                                    }`}
                            >
                                <span className={isActive ? 'text-white' : 'text-indigo-500'}>{tab.icon}</span>
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === 'nazariya' && <NazariyaTab />}
                            {activeTab === 'tajriba' && <TajribaTab />}
                            {activeTab === 'quiz' && <SavolJavobTab onXPEarned={handleXPEarned} />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
