import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, BookOpen, FlaskConical, HelpCircle,
    Zap, CheckCircle, XCircle, RotateCcw, Trophy, Plus, Trash2
} from 'lucide-react';

// ══════════════════════════════════════════════════════════
//  TAB 1 — NAZARIYA
// ══════════════════════════════════════════════════════════
function NazariyaTab() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Formula card */}
            <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/60 to-slate-900/80 p-6 text-center">
                <p className="text-slate-400 text-sm mb-3">Om Qonuni formulasi</p>
                <div className="inline-flex items-center gap-4 bg-slate-900/80 border border-slate-700 rounded-2xl px-8 py-4">
                    <span className="text-4xl font-bold font-mono text-blue-400">I</span>
                    <span className="text-3xl font-bold text-slate-500">=</span>
                    <div className="flex flex-col items-center">
                        <span className="text-4xl font-bold font-mono text-yellow-400 border-b-2 border-yellow-400 px-2">U</span>
                        <span className="text-4xl font-bold font-mono text-red-400 px-2">R</span>
                    </div>
                </div>
                <div className="flex justify-center gap-8 mt-4 text-sm">
                    <span><span className="text-blue-400 font-bold">I</span> — Tok kuchi (Amper, A)</span>
                    <span><span className="text-yellow-400 font-bold">U</span> — Kuchlanish (Volt, V)</span>
                    <span><span className="text-red-400 font-bold">R</span> — Qarshilik (Om, Ω)</span>
                </div>
            </div>

            {/* Explanation */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3 text-slate-300 text-sm leading-relaxed">
                <h3 className="text-white font-bold text-lg">📖 Om Qonuni haqida</h3>
                <p>Georg Simon Ohm (1789–1854) tomonidan kashf etilgan bu qonun elektr zanjirining asosini tashkil etadi.</p>
                <p>Om Qonuniga ko'ra, <span className="text-yellow-300 font-semibold">o'tkazgichdagi tok kuchi</span> uning uchlaridagi <span className="text-blue-300 font-semibold">kuchlanishga to'g'ri proporsional</span>, <span className="text-red-300 font-semibold">qarshilikka teskari proporsional</span> bo'ladi.</p>
                <p className="text-slate-400">Misol: Agar kuchlanish <strong className="text-white">12 V</strong> va qarshilik <strong className="text-white">4 Ω</strong> bo'lsa, tok kuchi: <strong className="text-blue-400">I = 12 / 4 = 3 A</strong></p>
            </div>

            {/* SVG Circuit */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <h3 className="text-white font-bold text-base mb-4">⚡ Elektr zanjiri sxemasi</h3>
                <div className="flex items-center justify-center">
                    <svg width="380" height="180" viewBox="0 0 380 180">
                        {/* Wires */}
                        <path d="M 60 90 L 60 30 L 320 30 L 320 90" stroke="#475569" strokeWidth="2.5" fill="none" />
                        <path d="M 60 90 L 60 150 L 320 150 L 320 90" stroke="#475569" strokeWidth="2.5" fill="none" />

                        {/* Battery (left side) */}
                        <rect x="42" y="68" width="36" height="44" rx="4" fill="#1e293b" stroke="#facc15" strokeWidth="1.5" />
                        <line x1="55" y1="80" x2="65" y2="80" stroke="#facc15" strokeWidth="3" />
                        <line x1="53" y1="86" x2="67" y2="86" stroke="#facc15" strokeWidth="1.5" />
                        <line x1="55" y1="92" x2="65" y2="92" stroke="#facc15" strokeWidth="3" />
                        <line x1="53" y1="98" x2="67" y2="98" stroke="#facc15" strokeWidth="1.5" />
                        <text x="60" y="126" textAnchor="middle" fill="#facc15" fontSize="10" fontFamily="monospace">BAT</text>

                        {/* Resistor (bottom) */}
                        <rect x="150" y="136" width="80" height="28" rx="4" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
                        {[0, 1, 2, 3, 4].map(i => (
                            <rect key={i} x={158 + i * 14} y={142} width="8" height="16" rx="1" fill="#ef4444" opacity="0.4" />
                        ))}
                        <text x="190" y="178" textAnchor="middle" fill="#ef4444" fontSize="10" fontFamily="monospace">R (Ω)</text>

                        {/* Ammeter (right side) */}
                        <circle cx="320" cy="90" r="22" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.5" />
                        <text x="320" y="87" textAnchor="middle" fill="#60a5fa" fontSize="14" fontWeight="bold">A</text>
                        <text x="320" y="100" textAnchor="middle" fill="#94a3b8" fontSize="8">Amper</text>

                        {/* Current arrows */}
                        {[0, 1, 2].map(i => (
                            <polygon key={i} points="-5,0 5,0 0,8"
                                fill="#6366f1" opacity="0.7"
                                transform={`translate(${100 + i * 60}, 30) rotate(90)`}
                            />
                        ))}
                        <text x="190" y="22" textAnchor="middle" fill="#6366f1" fontSize="10">tok yo'nalishi →</text>
                    </svg>
                </div>
            </div>
        </motion.div>
    );
}

// ══════════════════════════════════════════════════════════
//  Ammeter Gauge SVG
// ══════════════════════════════════════════════════════════
function AmmeterGauge({ current, maxI = 24 }) {
    const pct = Math.min(current / maxI, 1);
    const angle = -130 + pct * 260; // -130° to +130°
    const rad = (angle * Math.PI) / 180;
    const cx = 70, cy = 70, r = 52;
    const nx = cx + r * Math.sin(rad);
    const ny = cy - r * Math.cos(rad);

    return (
        <svg width="140" height="110" viewBox="0 0 140 110">
            {/* Track arc */}
            <path d={describeArc(70, 70, 52, -130, 130)} stroke="#1e293b" strokeWidth="8" fill="none" strokeLinecap="round" />
            {/* Colored arc */}
            <path d={describeArc(70, 70, 52, -130, -130 + pct * 260)} stroke="#6366f1" strokeWidth="8" fill="none" strokeLinecap="round"
                style={{ transition: 'all 0.3s ease' }} />
            {/* Needle */}
            <line x1={cx} y1={cy} x2={nx} y2={ny}
                stroke="#f1f5f9" strokeWidth="2.5" strokeLinecap="round"
                style={{ transition: 'all 0.3s ease' }}
            />
            <circle cx={cx} cy={cy} r="5" fill="#6366f1" />
            {/* Value */}
            <text x="70" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">Ampermetr</text>
            <text x="70" y="65" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="monospace">
                {current.toFixed(2)}A
            </text>
        </svg>
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
        <div className="h-24 flex items-center justify-center text-slate-600 text-xs">
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
        <svg width={W} height={H + 10} className="w-full">
            <polyline points={pts.join(' ')} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {data.map((v, i) => {
                const x = pad + (i / (data.length - 1)) * (W - pad * 2);
                const y = H - pad - (v / maxV) * (H - pad * 2);
                return <circle key={i} cx={x} cy={y} r="4" fill="#818cf8" />;
            })}
        </svg>
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
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">

            {/* Top row: Sliders + Ammeter */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Sliders */}
                <div className="space-y-4">
                    {/* Voltage slider */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-yellow-400 font-bold text-sm">⚡ Kuchlanish (U)</span>
                            <span className="text-white font-mono bg-slate-800 px-3 py-1 rounded-lg text-sm font-bold">{voltage} V</span>
                        </div>
                        <input type="range" min={1} max={24} step={1} value={voltage}
                            onChange={e => setVoltage(Number(e.target.value))}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-yellow-500 bg-slate-700"
                        />
                        <div className="flex justify-between text-slate-600 text-[10px] mt-1"><span>1V</span><span>24V</span></div>
                    </div>

                    {/* Resistance slider */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-red-400 font-bold text-sm">🔴 Qarshilik (R)</span>
                            <span className="text-white font-mono bg-slate-800 px-3 py-1 rounded-lg text-sm font-bold">{resistance} Ω</span>
                        </div>
                        <input type="range" min={1} max={100} step={1} value={resistance}
                            onChange={e => setResistance(Number(e.target.value))}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-red-500 bg-slate-700"
                        />
                        <div className="flex justify-between text-slate-600 text-[10px] mt-1"><span>1Ω</span><span>100Ω</span></div>
                    </div>

                    {/* Result */}
                    <div className="rounded-2xl border border-indigo-500/40 bg-indigo-950/30 p-4 text-center">
                        <p className="text-slate-400 text-xs mb-1">Hisoblangan tok kuchi (I = U/R)</p>
                        <p className="text-4xl font-bold font-mono text-indigo-400">{current.toFixed(2)} <span className="text-2xl text-slate-400">A</span></p>
                        <p className="text-slate-600 text-xs mt-1">{voltage}V ÷ {resistance}Ω = {current.toFixed(2)}A</p>
                    </div>
                </div>

                {/* SVG Circuit + Ammeter */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col items-center gap-4">
                    <h4 className="text-white font-semibold text-sm self-start">Zanjir vizualizatsiyasi</h4>

                    {/* Animated circuit */}
                    <svg width="200" height="160" viewBox="0 0 200 160">
                        {/* Rectangle frame wires */}
                        <rect x="20" y="20" width="160" height="120" rx="4" fill="none" stroke="#334155" strokeWidth="3" />

                        {/* Animated current dots */}
                        <path id="circuitPath" d="M 20 20 L 180 20 L 180 140 L 20 140 Z" fill="none" />
                        {[0, 0.25, 0.5, 0.75].map((offset, i) => (
                            <circle key={i} r="4" fill="#6366f1" opacity="0.8">
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
                        <rect x="10" y="60" width="20" height="40" rx="3" fill="#0f172a" stroke="#facc15" strokeWidth="1.5" />
                        <line x1="14" y1="70" x2="22" y2="70" stroke="#facc15" strokeWidth="2.5" />
                        <line x1="13" y1="76" x2="23" y2="76" strokeWidth="1.5" stroke="#facc15" />
                        <line x1="14" y1="82" x2="22" y2="82" stroke="#facc15" strokeWidth="2.5" />
                        <line x1="13" y1="88" x2="23" y2="88" strokeWidth="1.5" stroke="#facc15" />
                        <text x="20" y="113" textAnchor="middle" fill="#facc15" fontSize="9">{voltage}V</text>

                        {/* Resistor */}
                        <rect x="75" y="130" width="50" height="20" rx="3" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" />
                        {[0, 1, 2].map(i => <rect key={i} x={81 + i * 14} y={133} width="10" height="14" rx="1" fill="#ef4444" opacity="0.5" />)}
                        <text x="100" y="160" textAnchor="middle" fill="#ef4444" fontSize="9">{resistance}Ω</text>

                        {/* Ammeter */}
                        <circle cx="180" cy="80" r="16" fill="#0f172a" stroke="#60a5fa" strokeWidth="1.5" />
                        <text x="180" y="78" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">A</text>
                        <text x="180" y="90" textAnchor="middle" fill="#94a3b8" fontSize="7">{current.toFixed(1)}A</text>
                    </svg>

                    {/* Ammeter gauge */}
                    <AmmeterGauge current={current} maxI={24} />
                </div>
            </div>

            {/* Record button */}
            <div className="flex gap-3">
                <button
                    onClick={addMeasurement}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20"
                >
                    <Plus size={18} /> O'lchashni Qayd Et
                </button>
                <button
                    onClick={clearMeasurements}
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white rounded-xl transition-all"
                >
                    <Trash2 size={16} />
                </button>
            </div>

            {/* Table + Chart */}
            {measurements.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Data table */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                        <h4 className="text-white font-semibold text-sm mb-3">📋 So'nggi o'lchashlar</h4>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-800">
                                    <th className="text-left text-slate-500 pb-2 font-medium">#</th>
                                    <th className="text-right text-yellow-400 pb-2 font-medium">U (V)</th>
                                    <th className="text-right text-red-400 pb-2 font-medium">R (Ω)</th>
                                    <th className="text-right text-indigo-400 pb-2 font-medium">I (A)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {measurements.map((m, i) => (
                                    <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                                        <td className="py-1.5 text-slate-600">{i + 1}</td>
                                        <td className="text-right text-slate-300 font-mono">{m.u}</td>
                                        <td className="text-right text-slate-300 font-mono">{m.r}</td>
                                        <td className="text-right text-indigo-400 font-mono font-bold">{m.i}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Chart */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                        <h4 className="text-white font-semibold text-sm mb-3">📈 Tok kuchi grafigi (A)</h4>
                        <MiniLineChart data={chartData} />
                        <p className="text-slate-600 text-xs mt-2 text-center">Har bir nuqta — bir o'lchash</p>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

// ══════════════════════════════════════════════════════════
//  TAB 3 — SAVOL-JAVOB (Quiz)
// ══════════════════════════════════════════════════════════
const quizQuestions = [
    {
        q: "Om Qonuniga ko'ra, kuchlanish 2 baravar oshsa, tok kuchi qanday o'zgaradi?",
        options: ["2 baravar kamayadi", "O'zgarmaydi", "2 baravar oshadi", "4 baravar oshadi"],
        correct: 2,
    },
    {
        q: "Qarshilik 12 Ω, kuchlanish 24 V bo'lsa, tok kuchi necha Amper?",
        options: ["0.5 A", "1 A", "2 A", "4 A"],
        correct: 2,
    },
    {
        q: "Om Qonunini kashf etgan olim kim?",
        options: ["Albert Eynshteyn", "Nikola Tesla", "Georg Simon Ohm", "Michael Faraday"],
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

    const handleRetry = () => {
        setAnswers({});
        setSubmitted(false);
        setScore(0);
        setShowConfetti(false);
    };

    const allAnswered = Object.keys(answers).length === quizQuestions.length;

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">

            {/* Confetti particles */}
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div key={i}
                            initial={{ x: `${Math.random() * 100}vw`, y: -20, rotate: 0, opacity: 1 }}
                            animate={{ y: '110vh', rotate: 720, opacity: 0 }}
                            transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 0.5 }}
                            className="absolute w-3 h-3 rounded-sm"
                            style={{ background: ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'][i % 5] }}
                        />
                    ))}
                </div>
            )}

            {/* Result banner */}
            {submitted && (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className={`rounded-2xl border p-6 text-center ${score >= 2
                            ? 'border-emerald-500/40 bg-emerald-950/30'
                            : 'border-red-500/40 bg-red-950/30'
                        }`}
                >
                    {score >= 2 ? (
                        <>
                            <Trophy size={48} className="text-yellow-400 mx-auto mb-3" />
                            <h3 className="text-2xl font-bold text-white mb-1">Ajoyib! 🎉</h3>
                            <p className="text-slate-300 mb-3">{score}/3 to'g'ri javob</p>
                            <div className="inline-flex items-center gap-2 bg-indigo-600/30 border border-indigo-500/40 rounded-full px-5 py-2.5">
                                <Zap size={18} className="text-indigo-400" />
                                <span className="text-indigo-300 font-bold text-lg">+50 XP Qo'shildi!</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <XCircle size={48} className="text-red-400 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-white mb-1">Qayta urinib ko'ring</h3>
                            <p className="text-slate-400 mb-4">{score}/3 to'g'ri — kamida 2 ta kerak</p>
                            <button onClick={handleRetry}
                                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all mx-auto"
                            >
                                <RotateCcw size={16} /> Qayta boshlash
                            </button>
                        </>
                    )}
                </motion.div>
            )}

            {/* Questions */}
            {quizQuestions.map((q, qi) => (
                <div key={qi} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                    <p className="text-white font-semibold mb-4 leading-snug">
                        <span className="text-indigo-400 font-bold mr-2">{qi + 1}.</span>{q.q}
                    </p>
                    <div className="space-y-2">
                        {q.options.map((opt, oi) => {
                            const selected = answers[qi] === oi;
                            const isCorrect = oi === q.correct;
                            let style = 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600';
                            if (submitted) {
                                if (isCorrect) style = 'border-emerald-500/60 bg-emerald-950/40 text-emerald-300';
                                else if (selected && !isCorrect) style = 'border-red-500/60 bg-red-950/40 text-red-300';
                                else style = 'border-slate-800 bg-slate-900/30 text-slate-600';
                            } else if (selected) {
                                style = 'border-indigo-500/60 bg-indigo-950/40 text-indigo-300';
                            }
                            return (
                                <button key={oi} onClick={() => handleAnswer(qi, oi)}
                                    className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150 flex items-center gap-3 ${style}`}
                                >
                                    <span className="w-5 h-5 rounded-full border border-current flex-shrink-0 flex items-center justify-center text-xs">
                                        {submitted && isCorrect ? '✓' : submitted && selected ? '✗' : opt.charAt(0)}
                                    </span>
                                    {opt}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}

            {!submitted && (
                <button
                    onClick={handleSubmit}
                    disabled={!allAnswered}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20"
                >
                    {allAnswered ? "Javoblarni Tekshirish →" : `${quizQuestions.length - Object.keys(answers).length} ta savol qoldi`}
                </button>
            )}
        </motion.div>
    );
}

// ══════════════════════════════════════════════════════════
//  MAIN PAGE
// ══════════════════════════════════════════════════════════
const TABS = [
    { id: 'nazariya', label: 'Nazariya', icon: <BookOpen size={16} /> },
    { id: 'tajriba', label: 'Tajriba', icon: <FlaskConical size={16} /> },
    { id: 'quiz', label: 'Savol-Javob', icon: <HelpCircle size={16} /> },
];

export default function OhmQonuni() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('nazariya');
    const [xpEarned, setXpEarned] = useState(false);
    const [completedTabs, setCompletedTabs] = useState(new Set());

    const handleXPEarned = (amount) => {
        if (xpEarned) return;
        setXpEarned(true);
        // Save to localStorage
        const completed = JSON.parse(localStorage.getItem('completedLabs') || '[]');
        if (!completed.includes('ohm')) {
            localStorage.setItem('completedLabs', JSON.stringify([...completed, 'ohm']));
        }
    };

    return (
        <div className="h-screen overflow-y-auto custom-scrollbar font-sans text-slate-100">
            <div className="max-w-4xl mx-auto px-6 pb-24 pt-6">

                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate('/laboratoriya')}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 text-slate-500 text-xs mb-0.5">
                            <span>Laboratoriya</span>
                            <span>/</span>
                            <span className="text-indigo-400">Om Qonuni</span>
                        </div>
                        <h1 className="text-xl font-bold text-white flex items-center gap-2">
                            ⚡ Om Qonuni Laboratoriyasi
                        </h1>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <span className="text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full">Oson</span>
                        <span className="text-xs bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-3 py-1 rounded-full flex items-center gap-1">
                            <Zap size={11} /> +50 XP
                        </span>
                        {xpEarned && (
                            <span className="text-xs bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-3 py-1 rounded-full flex items-center gap-1">
                                <CheckCircle size={11} /> Tugallandi
                            </span>
                        )}
                    </div>
                </div>

                {/* Tab bar */}
                <div className="flex gap-1 bg-slate-900/80 border border-slate-800 rounded-2xl p-1 mb-6">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === tab.id
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                    : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab content */}
                <AnimatePresence mode="wait">
                    <div key={activeTab}>
                        {activeTab === 'nazariya' && <NazariyaTab />}
                        {activeTab === 'tajriba' && <TajribaTab />}
                        {activeTab === 'quiz' && <SavolJavobTab onXPEarned={handleXPEarned} />}
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
}
