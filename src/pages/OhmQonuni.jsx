import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, BookOpen, FlaskConical, HelpCircle,
    Zap, CheckCircle, XCircle, RotateCcw, Trophy, Plus, 
    Trash2, Info, TrendingUp, ChevronRight, Gauge, Activity
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
//  Ammeter Gauge Component
// ══════════════════════════════════════════════════════════
function AmmeterGauge({ current, maxI = 24 }) {
    const angle = (current / maxI) * 180 - 180; // -180 to 0 range
    return (
        <div className="relative w-48 h-28 overflow-hidden flex items-end justify-center">
            <svg viewBox="0 0 100 60" className="w-full h-full overflow-visible">
                {/* Background arc */}
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="currentColor" className="theme-text opacity-5" strokeWidth="8" strokeLinecap="round" />
                {/* Active arc */}
                <path d={describeArc(50, 50, 40, -90, (current / maxI) * 180 - 90)} fill="none" stroke="#6366f1" strokeWidth="8" strokeLinecap="round" />
                
                {/* Scale ticks */}
                {[0, 6, 12, 18, 24].map(v => {
                    const tickAngle = (v / maxI) * 180 - 180;
                    const r1 = 35, r2 = 42;
                    const x1 = 50 + r1 * Math.cos(tickAngle * Math.PI / 180);
                    const y1 = 50 + r1 * Math.sin(tickAngle * Math.PI / 180);
                    const x2 = 50 + r2 * Math.cos(tickAngle * Math.PI / 180);
                    const y2 = 50 + r2 * Math.sin(tickAngle * Math.PI / 180);
                    return <line key={v} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" className="theme-text opacity-20" strokeWidth="1" />;
                })}

                {/* Needle */}
                <motion.line
                    x1="50" y1="50" x2={50 + 38 * Math.cos(angle * Math.PI / 180)} y2={50 + 38 * Math.sin(angle * Math.PI / 180)}
                    stroke="#4f46e5" strokeWidth="3" strokeLinecap="round"
                    animate={{ x2: 50 + 38 * Math.cos(angle * Math.PI / 180), y2: 50 + 38 * Math.sin(angle * Math.PI / 180) }}
                />
                <circle cx="50" cy="50" r="4" fill="#4f46e5" />
                <text x="50" y="58" textAnchor="middle" className="theme-text font-black" fontSize="10">AMPERMETR</text>
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-[8px] font-black theme-muted opacity-50">
                <span>0A</span><span>24A</span>
            </div>
        </div>
    );
}

function describeArc(x, y, r, startAngle, endAngle) {
    const s = polarToCart(x, y, r, startAngle);
    const e = polarToCart(x, y, r, endAngle);
    const large = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}
function polarToCart(cx, cy, r, angleDeg) {
    const a = (angleDeg - 90) * (Math.PI / 180);
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

// ══════════════════════════════════════════════════════════
//  Mini SVG Line Chart
// ══════════════════════════════════════════════════════════
function MiniLineChart({ data }) {
    if (data.length < 2) return (
        <div className="h-32 flex flex-col items-center justify-center theme-muted text-xs gap-3">
            <Activity size={32} className="opacity-10" />
            Kamida 2 ta o'lchov kerak
        </div>
    );
    const maxV = Math.max(...data, 1);
    const W = 260, H = 80, pad = 10;
    const pts = data.map((v, i) => {
        const x = pad + (i / (data.length - 1)) * (W - pad * 2);
        const y = H - pad - (v / maxV) * (H - pad * 2);
        return `${x},${y}`;
    });
    return (
        <div className="p-4 rounded-2xl bg-white/5 dark:bg-black/20 border theme-border">
            <svg width={W} height={H + 10} className="w-full overflow-visible">
                <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path d={`M ${pts[0]} ${pts.map(p => `L ${p}`).slice(1).join(' ')} L ${pts[pts.length-1].split(',')[0]},${H} L ${pts[0].split(',')[0]},${H} Z`} fill="url(#chartGrad)" />
                <polyline points={pts.join(' ')} fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                {data.map((v, i) => {
                    const x = pad + (i / (data.length - 1)) * (W - pad * 2);
                    const y = H - pad - (v / maxV) * (H - pad * 2);
                    return (
                        <circle key={i} cx={x} cy={y} r="5" fill="#6366f1" stroke="currentColor" className="theme-text" strokeWidth="2" />
                    );
                })}
            </svg>
        </div>
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
                <p className="theme-text-secondary text-xs font-bold uppercase tracking-widest mb-4 opacity-70">Om qonuni formulasi</p>
                <div className="inline-flex items-center gap-4 bg-white/5 dark:bg-black/20 border theme-border rounded-3xl px-12 py-8 shadow-inner backdrop-blur-md">
                    <span className="text-6xl font-black font-mono text-indigo-500 drop-shadow-sm tracking-tighter">I</span>
                    <span className="text-4xl font-bold theme-text opacity-40">=</span>
                    <div className="flex flex-col items-center">
                        <span className="text-5xl font-black font-mono text-amber-500 border-b-4 border-amber-500/30 px-4 pb-2 mb-2">U</span>
                        <span className="text-5xl font-black font-mono text-rose-500 px-4 pt-1">R</span>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    {[
                        { l: 'I', c: 'indigo', n: 'Tok kuchi (A)' },
                        { l: 'U', c: 'amber', n: 'Kuchlanish (V)' },
                        { l: 'R', c: 'rose', n: 'Qarshilik (Ω)' }
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
                    <SectionTitle title="Ta'rif" icon={BookOpen} />
                    <div className="space-y-4 theme-text-secondary text-sm leading-relaxed">
                        <p>Georg Simon Ohm (1789–1854) tomonidan kashf etilgan bu qonun elektr zanjirining asosini tashkil etadi.</p>
                        <div className="p-4 rounded-2xl bg-indigo-500/5 border-l-4 border-indigo-500 italic">
                            <p className="mb-0 italic font-medium">
                                Om qonuniga ko'ra, <span className="text-amber-500 font-bold">o'tkazgichdagi tok kuchi</span> uning uchlaridagi <span className="text-indigo-500 font-bold">kuchlanishga to'g'ri proporsional</span>, <span className="text-rose-500 font-bold">qarshilikka teskari proporsional</span> bo'ladi.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="theme-card-premium p-6">
                    <SectionTitle title="Elektr zanjiri" icon={Zap} />
                    <div className="flex items-center justify-center p-4 rounded-3xl bg-white/5 dark:bg-black/20 border theme-border min-h-[160px]">
                        <svg width="240" height="120" viewBox="0 0 240 120">
                            {/* Wires */}
                            <rect x="20" y="20" width="200" height="80" rx="12" fill="none" stroke="currentColor" className="theme-text opacity-10" strokeWidth="4" />
                            {/* Battery */}
                            <rect x="8" y="40" width="24" height="40" rx="6" fill="currentColor" className="theme-surface" stroke="#facc15" strokeWidth="2" />
                            <text x="20" y="95" textAnchor="middle" fill="#facc15" fontSize="8" fontWeight="bold">BAT</text>
                            {/* Resistor */}
                            <rect x="95" y="90" width="50" height="20" rx="4" fill="currentColor" className="theme-surface" stroke="#ef4444" strokeWidth="2" />
                            <text x="120" y="118" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold">R (Ω)</text>
                            {/* Ammeter */}
                            <circle cx="220" cy="60" r="15" fill="currentColor" className="theme-surface" stroke="#60a5fa" strokeWidth="2" />
                            <text x="220" y="65" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="900">A</text>
                        </svg>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ══════════════════════════════════════════════════════════
//  TAB 2 — TAJRIBA
// ══════════════════════════════════════════════════════════
function TajribaTab() {
    const [voltage, setVoltage] = useState(12);
    const [resistance, setResistance] = useState(4);
    const [measurements, setMeasurements] = useState([]);
    const current = voltage / resistance;

    const animDuration = Math.max(0.4, 5 / Math.max(current, 0.1));

    const addMeasurement = () => {
        setMeasurements(prev => {
            const updated = [...prev, { u: voltage, r: resistance, i: parseFloat(current.toFixed(2)) }];
            return updated.slice(-6);
        });
    };

    const clearMeasurements = () => setMeasurements([]);
    const chartData = measurements.map(m => m.i);

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left side: Visualization */}
                <div className="theme-card-premium p-8 flex flex-col items-center justify-center gap-8 min-h-[420px]">
                    <SectionTitle title="Zanjir vizualizatsiyasi" icon={FlaskConical} />
                    
                    <div className="relative p-8 rounded-3xl bg-white/5 dark:bg-black/30 border-4 theme-border overflow-hidden shadow-2xl transition-all duration-500 w-full max-w-[300px]">
                        <svg width="100%" height="100%" viewBox="0 0 200 160" className="w-full">
                            {/* Rectangle frame wires */}
                            <rect x="20" y="20" width="160" height="120" rx="12" fill="none" stroke="currentColor" className="theme-text opacity-10" strokeWidth="6" />

                            {/* Animated current dots */}
                            <path id="circuitPath" d="M 20 20 L 180 20 L 180 140 L 20 140 Z" fill="none" />
                            {[0, 0.25, 0.5, 0.75].map((offset, i) => (
                                <circle key={i} r="6" fill="#6366f1" className="drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]">
                                    <animateMotion
                                        dur={`${animDuration}s`}
                                        repeatCount="indefinite"
                                        begin={`${offset * animDuration}s`}
                                    >
                                        <mpath href="#circuitPath" />
                                    </animateMotion>
                                </circle>
                            ))}

                            {/* Battery symbol */}
                            <rect x="8" y="60" width="24" height="40" rx="6" fill="currentColor" className="theme-surface" stroke="#facc15" strokeWidth="2" />
                            <line x1="14" y1="72" x2="26" y2="72" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
                            <line x1="12" y1="80" x2="28" y2="80" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
                            
                            {/* Resistor */}
                            <rect x="75" y="130" width="50" height="20" rx="4" fill="currentColor" className="theme-surface" stroke="#ef4444" strokeWidth="2" />
                            {[0, 1, 2].map(i => <rect key={i} x={82 + i * 14} y={134} width="8" height="12" rx="2" fill="#ef4444" opacity="0.4" />)}

                            {/* Ammeter circle on circuit */}
                            <circle cx="180" cy="80" r="18" fill="currentColor" className="theme-surface" stroke="#60a5fa" strokeWidth="2" />
                            <text x="180" y="78" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="900">A</text>
                            <text x="180" y="91" textAnchor="middle" className="theme-text" fontSize="8" fontWeight="bold">{current.toFixed(1)}A</text>
                        </svg>
                    </div>

                    <AmmeterGauge current={current} maxI={24} />
                </div>

                {/* Right side: Controls & Results */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="theme-card-premium p-6 shadow-inner">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-amber-500 font-black text-sm uppercase tracking-wider flex items-center gap-2">
                                    <Zap size={18} /> Kuchlanish (U)
                                </span>
                                <span className="theme-text font-black font-mono bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-xl text-base">
                                    {voltage} V
                                </span>
                            </div>
                            <input type="range" min={1} max={24} step={1} value={voltage}
                                onChange={e => setVoltage(Number(e.target.value))}
                                className="w-full h-3 rounded-2xl appearance-none cursor-pointer accent-amber-500 bg-black/10 dark:bg-white/10 theme-border border"
                            />
                        </div>

                        <div className="theme-card-premium p-6 shadow-inner">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-rose-500 font-black text-sm uppercase tracking-wider flex items-center gap-2">
                                    <RotateCcw size={18} /> Qarshilik (R)
                                </span>
                                <span className="theme-text font-black font-mono bg-rose-500/10 border border-rose-500/20 px-4 py-1.5 rounded-xl text-base">
                                    {resistance} Ω
                                </span>
                            </div>
                            <input type="range" min={1} max={100} step={1} value={resistance}
                                onChange={e => setResistance(Number(e.target.value))}
                                className="w-full h-3 rounded-2xl appearance-none cursor-pointer accent-rose-500 bg-black/10 dark:bg-white/10 theme-border border"
                            />
                        </div>
                    </div>

                    <div className="theme-card-premium p-8 text-center border-indigo-500/40 bg-gradient-to-br from-indigo-500/10 to-transparent relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500" />
                        <p className="theme-text-secondary text-xs font-bold uppercase tracking-widest mb-3 opacity-70">O'lchangan Tok Kuchi (I)</p>
                        <div className="flex items-center justify-center gap-4 mb-3">
                            <Activity size={48} className="text-indigo-500" />
                            <p className="text-6xl font-black font-mono text-indigo-500 drop-shadow-sm">
                                {current.toFixed(2)}
                            </p>
                            <span className="text-2xl font-black theme-text opacity-30 mt-4">A</span>
                        </div>
                        <div className="inline-flex items-center gap-2 bg-black/5 dark:bg-white/5 px-4 py-2 rounded-2xl border theme-border">
                            <span className="theme-text font-mono font-bold text-xs">I = {voltage}V / {resistance}Ω</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={addMeasurement}
                            className="flex-1 flex items-center justify-center gap-3 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black transition-all shadow-xl shadow-indigo-600/30 active:scale-[0.99]"
                        >
                            <Plus size={22} /> QAYD ETISH
                        </button>
                        <button onClick={clearMeasurements}
                            className="px-5 py-4 theme-surface border theme-border theme-muted hover:theme-text hover:border-rose-500/50 rounded-2xl transition-all"
                        >
                            <Trash2 size={22} />
                        </button>
                    </div>
                </div>
            </div>

            {measurements.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="theme-card-premium p-6">
                        <SectionTitle title="O'lchashlar jadvali" icon={Plus} />
                        <div className="overflow-hidden rounded-2xl border theme-border">
                            <table className="w-full text-sm">
                                <thead className="bg-black/5 dark:bg-white/5">
                                    <tr>
                                        <th className="text-left theme-muted p-3 font-black text-[10px] uppercase">#</th>
                                        <th className="text-right text-amber-500 p-3 font-black text-[10px] uppercase">U (V)</th>
                                        <th className="text-right text-indigo-500 p-3 font-black text-[10px] uppercase">I (A)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y theme-divide">
                                    {measurements.map((m, i) => (
                                        <tr key={i} className="hover:bg-indigo-500/5 transition-colors">
                                            <td className="p-3 theme-muted font-bold">{i + 1}</td>
                                            <td className="p-3 text-right theme-text font-mono font-bold">{m.u}</td>
                                            <td className="p-3 text-right text-indigo-500 font-mono font-black">{m.i}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="theme-card-premium p-6">
                        <SectionTitle title="Tok kuchi grafigi" icon={TrendingUp} />
                        <MiniLineChart data={chartData} />
                    </div>
                </div>
            )}
        </motion.div>
    );
}

// ══════════════════════════════════════════════════════════
//  TAB 3 — SAVOL-JAVOB
// ══════════════════════════════════════════════════════════
const quizQuestions = [
    {
        q: "Kuchlanish o'zgarmas bo'lganda, qarshilik 2 baravar oshirilsa, tok kuchi qanday o'zgaradi?",
        options: ["2 baravar oshadi", "2 baravar kamayadi", "O'zgarmaydi", "4 baravar kamayadi"],
        correct: 1,
    },
    {
        q: "Elektr qarshilik qanday birlikda o'lchanadi?",
        options: ["Amper", "Volt", "Om", "Vatt"],
        correct: 2,
    },
    {
        q: "O'tkazgichdagi tok kuchi 5 A va qarshilik 10 Ω bo'lsa, kuchlanish necha volt?",
        options: ["2 V", "0.5 V", "50 V", "15 V"],
        correct: 2,
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
            onXPEarned(50);
        }
    };

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
                <div className={`theme-card-premium p-8 text-center border-2 ${score >= 2 ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-rose-500/40 bg-rose-500/5'}`}>
                    {score >= 2 ? (
                        <>
                            <Trophy size={64} className="text-amber-500 mx-auto mb-4" />
                            <h3 className="text-3xl font-black theme-text mb-2 tracking-tight">Ajoyib! ⚡</h3>
                            <p className="theme-text-secondary font-medium mb-6">Siz Om qonunini to'liq tushundingiz!</p>
                            <div className="inline-flex items-center gap-3 bg-indigo-600 text-white rounded-2xl px-8 py-3.5 shadow-xl shadow-indigo-600/30">
                                <Zap size={20} fill="white" /> <span className="font-black text-xl">+50 XP QO'SHILDI!</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <XCircle size={64} className="text-rose-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-black theme-text mb-2">Qayta o'qib ko'ring</h3>
                            <p className="theme-text-secondary mb-6">{score}/{quizQuestions.length} to'g'ri — kamida 2 ta kerak</p>
                            <button onClick={() => { setAnswers({}); setSubmitted(false); setShowConfetti(false); }}
                                className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-black"
                            >
                                QAYTA BOSHLASH
                            </button>
                        </>
                    )}
                </div>
            )}

            <div className="space-y-4">
                {quizQuestions.map((q, qi) => (
                    <div key={qi} className="theme-card-premium p-6">
                        <div className="flex gap-4 mb-6">
                            <span className="flex-shrink-0 w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-black text-indigo-500">
                                {qi + 1}
                            </span>
                            <p className="theme-text font-bold text-[17px] leading-snug pt-1">{q.q}</p>
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
                                        className={`w-full text-left px-5 py-4 rounded-2xl border-2 text-sm font-bold transition-all flex items-center gap-3 ${style}`}
                                    >
                                        <span className={`w-6 h-6 rounded-lg border-2 flex-shrink-0 flex items-center justify-center text-[11px] font-black ${selected ? 'border-current bg-current text-white' : 'border-current opacity-30'}`}>
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
                <button onClick={handleSubmit} disabled={Object.keys(answers).length < quizQuestions.length}
                    className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 active:scale-[0.99]"
                >
                    JAVOBLARNI TEKSHIRISH <ChevronRight size={20} />
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

export default function OhmQonuni() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('nazariya');
    const [xpEarned, setXpEarned] = useState(false);

    useEffect(() => {
        const completed = JSON.parse(localStorage.getItem('completedLabs') || '[]');
        if (completed.includes('ohm')) setXpEarned(true);
    }, []);

    const handleXPEarned = (amount) => {
        if (xpEarned) return;
        setXpEarned(true);
        const completed = JSON.parse(localStorage.getItem('completedLabs') || '[]');
        if (!completed.includes('ohm')) {
            localStorage.setItem('completedLabs', JSON.stringify([...completed, 'ohm']));
        }
    };

    return (
        <div className="h-screen overflow-y-auto custom-scrollbar theme-bg theme-text font-sans scroll-smooth">
            <div className="max-w-5xl mx-auto px-6 pb-24 pt-8">

                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                    <button onClick={() => navigate('/laboratoriya')}
                        className="w-12 h-12 rounded-2xl theme-surface border theme-border flex items-center justify-center theme-text-secondary hover:theme-text hover:border-indigo-500 transition-all shadow-sm"
                    >
                        <ArrowLeft size={22} />
                    </button>
                    
                    <div className="flex-1">
                        <div className="flex items-center gap-2 theme-muted text-[11px] font-black uppercase tracking-widest mb-1.5 opacity-60">
                            <span>Laboratoriya</span>
                            <span className="opacity-40">/</span>
                            <span className="text-blue-500">Elektr</span>
                        </div>
                        <h1 className="text-3xl font-black theme-text tracking-tight flex items-center gap-3">
                            <span className="w-10 h-10 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">⚡</span>
                            Om qonuni laboratoriyasi
                        </h1>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-center">
                        <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider">Oson</span>
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-indigo-600/20">
                            <Zap size={14} fill="white" /> +50 XP
                        </div>
                        {xpEarned && <CheckCircle size={24} className="text-amber-500" />}
                    </div>
                </div>

                <div className="flex gap-2 theme-surface border theme-border rounded-2xl p-1.5 mb-8 shadow-sm backdrop-blur-md sticky top-0 z-30">
                    {TABS.map(tab => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-[13px] font-black uppercase tracking-widest transition-all ${isActive ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'theme-text-secondary hover:theme-text hover:bg-black/5 dark:hover:bg-white/5'}`}
                            >
                                <span className={isActive ? 'text-white' : 'text-indigo-500'}>{tab.icon}</span>
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }}>
                        {activeTab === 'nazariya' && <NazariyaTab />}
                        {activeTab === 'tajriba' && <TajribaTab />}
                        {activeTab === 'quiz' && <SavolJavobTab onXPEarned={handleXPEarned} />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
