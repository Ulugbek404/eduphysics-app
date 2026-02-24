import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, BookOpen, FlaskConical, HelpCircle,
    Zap, CheckCircle, XCircle, RotateCcw, Trophy, Thermometer
} from 'lucide-react';

// ══════════════════════════════════════════════════════════
//  TAB 1 — NAZARIYA
// ══════════════════════════════════════════════════════════
function NazariyaTab() {
    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

            {/* Formulalar kartasi */}
            <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-950/60 to-slate-900/80 p-6">
                <p className="text-slate-400 text-sm mb-4 text-center">Ideal Gaz Asosiy Formulalari</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* PV = nRT */}
                    <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4 text-center">
                        <p className="text-slate-500 text-xs mb-2">Ideal gaz qonuni</p>
                        <div className="flex items-center justify-center gap-1.5 text-2xl font-bold font-mono">
                            <span className="text-violet-400">P</span>
                            <span className="text-slate-400">·</span>
                            <span className="text-blue-400">V</span>
                            <span className="text-slate-400">=</span>
                            <span className="text-amber-400">n</span>
                            <span className="text-green-400">R</span>
                            <span className="text-red-400">T</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-2 space-y-0.5">
                            <p><span className="text-violet-400">P</span> — Bosim (Pa)</p>
                            <p><span className="text-blue-400">V</span> — Hajm (m³)</p>
                            <p><span className="text-red-400">T</span> — Harorat (K)</p>
                        </div>
                    </div>
                    {/* Boyl-Mariott */}
                    <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4 text-center">
                        <p className="text-slate-500 text-xs mb-2">Boyl-Mariott qonuni (T=const)</p>
                        <div className="text-2xl font-bold font-mono text-center">
                            <span className="text-violet-400">P₁</span>
                            <span className="text-blue-400">V₁</span>
                            <span className="text-slate-400"> = </span>
                            <span className="text-violet-400">P₂</span>
                            <span className="text-blue-400">V₂</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">Harorat o'zgarmasa, bosim bilan hajm teskari proporsional</p>
                    </div>
                    {/* Gay-Lyussak */}
                    <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4 text-center">
                        <p className="text-slate-500 text-xs mb-2">Gay-Lyussak qonuni (V=const)</p>
                        <div className="text-2xl font-bold font-mono flex items-center justify-center gap-1">
                            <div className="flex flex-col items-center">
                                <span className="text-violet-400 border-b border-violet-400 px-1">P</span>
                                <span className="text-red-400">T</span>
                            </div>
                            <span className="text-slate-400"> = </span>
                            <span className="text-slate-500">const</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">Hajm o'zgarmasa, bosim haroratga to'g'ri proporsional</p>
                    </div>
                </div>
            </div>

            {/* MKN tushuntirish */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 text-slate-300 text-sm leading-relaxed">
                <h3 className="text-white font-bold text-lg">🔬 Molekulyar-Kinetik Nazariya</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 rounded-xl p-4">
                        <p className="text-violet-300 font-semibold mb-2">📦 Asosiy qoidalar</p>
                        <ul className="space-y-1.5 text-xs text-slate-400">
                            <li>• Barcha moddalar molekulalardan iborat</li>
                            <li>• Molekulalar doimo harakatda bo'ladi</li>
                            <li>• Harorat qanchalik baland bo'lsa, harakat tezroq</li>
                            <li>• Ideal gazda molekulalar o'zaro ta'sir etmaydi</li>
                        </ul>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-4">
                        <p className="text-red-300 font-semibold mb-2">🌡️ Harorat va bosim</p>
                        <ul className="space-y-1.5 text-xs text-slate-400">
                            <li>• 0°C = 273 K (Kelvin temperaturasi)</li>
                            <li>• T(K) = t(°C) + 273</li>
                            <li>• Absolyut nol: 0 K = −273°C</li>
                            <li>• R = 8.314 J/(mol·K) — universal gaz doimiysi</li>
                        </ul>
                    </div>
                </div>
                <div className="bg-amber-950/30 border border-amber-500/20 rounded-xl p-4">
                    <p className="text-amber-300 font-semibold mb-1.5">💡 9-sinf uchun muhim misol</p>
                    <p className="text-slate-400 text-xs">
                        Boshlang'ich holatda: <strong className="text-white">P₁ = 100 kPa, V₁ = 2 L</strong><br />
                        Agar hajm ikki barobar kichirsa (T=const): <br />
                        <strong className="text-violet-300">P₂ = P₁·V₁/V₂ = 100 × 2 / 1 = 200 kPa</strong>
                    </p>
                </div>
            </div>

            {/* Gaz holat diagrammasi */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <h3 className="text-white font-bold text-base mb-4">📊 Gaz holat grafigi (Boyl-Mariott)</h3>
                <div className="flex items-center justify-center">
                    <svg width="320" height="200" viewBox="0 0 320 200">
                        {/* Axes */}
                        <line x1="40" y1="160" x2="300" y2="160" stroke="#475569" strokeWidth="2" />
                        <line x1="40" y1="20" x2="40" y2="160" stroke="#475569" strokeWidth="2" />
                        {/* Axis labels */}
                        <text x="290" y="175" fill="#64748b" fontSize="11">V</text>
                        <text x="25" y="25" fill="#64748b" fontSize="11">P</text>
                        {/* Hyperbola curve PV=const */}
                        <path
                            d="M 55 155 Q 80 80 120 55 Q 160 42 200 38 Q 240 36 280 35"
                            stroke="#8b5cf6" strokeWidth="2.5" fill="none" strokeLinecap="round"
                        />
                        {/* Point labels */}
                        <circle cx="80" cy="90" r="5" fill="#8b5cf6" />
                        <text x="85" y="88" fill="#a78bfa" fontSize="10">P₁,V₁</text>
                        <circle cx="180" cy="42" r="5" fill="#06b6d4" />
                        <text x="185" y="40" fill="#67e8f9" fontSize="10">P₂,V₂</text>
                        {/* Dashed lines */}
                        <line x1="80" y1="90" x2="80" y2="160" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4" opacity="0.5" />
                        <line x1="180" y1="42" x2="180" y2="160" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4" opacity="0.5" />
                        {/* Grid */}
                        <text x="74" y="172" fill="#64748b" fontSize="9">V₁</text>
                        <text x="174" y="172" fill="#64748b" fontSize="9">V₂</text>
                        <text x="8" y="94" fill="#64748b" fontSize="9">P₁</text>
                        <text x="8" y="46" fill="#64748b" fontSize="9">P₂</text>
                        <line x1="36" y1="90" x2="80" y2="90" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4" opacity="0.5" />
                        <line x1="36" y1="42" x2="180" y2="42" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4" opacity="0.5" />
                        {/* Label */}
                        <text x="200" y="70" fill="#8b5cf6" fontSize="10" opacity="0.8">PV = const</text>
                    </svg>
                </div>
            </div>
        </motion.div>
    );
}

// ══════════════════════════════════════════════════════════
//  Molecule Animation Component
// ══════════════════════════════════════════════════════════
function MoleculeContainer({ temperature, pressure, volume }) {
    const canvasRef = useRef(null);
    const animRef = useRef(null);
    const moleculesRef = useRef([]);

    const speed = temperature / 100; // harorat → tezlik
    const count = 12;
    const containerWidth = 220;
    const containerHeight = Math.max(80, 160 - (volume - 1) * 8);

    useEffect(() => {
        moleculesRef.current = Array.from({ length: count }, () => ({
            x: 20 + Math.random() * (containerWidth - 40),
            y: 20 + Math.random() * (containerHeight - 40),
            vx: (Math.random() - 0.5) * speed * 3,
            vy: (Math.random() - 0.5) * speed * 3,
        }));
    }, [count]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Container box
            const xOff = (canvas.width - containerWidth) / 2;
            const yOff = canvas.height - containerHeight - 10;
            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 2;
            ctx.strokeRect(xOff, yOff, containerWidth, containerHeight);

            // Pressure label
            const pColor = pressure > 200 ? '#ef4444' : pressure > 100 ? '#f59e0b' : '#10b981';
            ctx.fillStyle = pColor;
            ctx.font = 'bold 11px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`P = ${pressure} kPa`, canvas.width / 2, yOff - 8);

            // Molecules
            moleculesRef.current.forEach(m => {
                m.x += m.vx * (speed / 3);
                m.y += m.vy * (speed / 3);
                if (m.x < xOff + 8 || m.x > xOff + containerWidth - 8) m.vx *= -1;
                if (m.y < yOff + 8 || m.y > yOff + containerHeight - 8) m.vy *= -1;
                m.x = Math.max(xOff + 8, Math.min(xOff + containerWidth - 8, m.x));
                m.y = Math.max(yOff + 8, Math.min(yOff + containerHeight - 8, m.y));

                const tempRatio = temperature / 600;
                const r = Math.floor(100 + tempRatio * 155);
                const b = Math.floor(255 - tempRatio * 155);
                ctx.beginPath();
                ctx.arc(m.x, m.y, 5, 0, Math.PI * 2);
                ctx.fillStyle = `rgb(${r}, 100, ${b})`;
                ctx.fill();
            });

            animRef.current = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(animRef.current);
    }, [speed, temperature, containerHeight, containerWidth]);

    return <canvas ref={canvasRef} width={260} height={200} className="rounded-xl bg-slate-950/60 border border-slate-800" />;
}

// ══════════════════════════════════════════════════════════
//  TAB 2 — TAJRIBA
// ══════════════════════════════════════════════════════════
function TajribaTab() {
    const [temperature, setTemperature] = useState(300); // Kelvin
    const [volume, setVolume] = useState(5);              // litr
    const n = 1; // 1 mol
    const R = 8.314;
    // P = nRT/V → Pa → kPa
    const pressure = Math.round((n * R * temperature) / (volume * 0.001) / 1000);

    const pColor = pressure > 300 ? 'text-red-400' : pressure > 150 ? 'text-amber-400' : 'text-emerald-400';

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Sliders */}
                <div className="space-y-4">
                    {/* Temperature */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-red-400 font-bold text-sm flex items-center gap-1.5">
                                <Thermometer size={15} /> Harorat (T)
                            </span>
                            <div className="text-right">
                                <span className="text-white font-mono bg-slate-800 px-3 py-1 rounded-lg text-sm font-bold">{temperature} K</span>
                                <span className="text-slate-500 text-xs ml-1">({temperature - 273}°C)</span>
                            </div>
                        </div>
                        <input type="range" min={200} max={600} step={10} value={temperature}
                            onChange={e => setTemperature(Number(e.target.value))}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-red-500 bg-slate-700"
                        />
                        <div className="flex justify-between text-slate-600 text-[10px] mt-1"><span>200K (−73°C)</span><span>600K (327°C)</span></div>
                    </div>

                    {/* Volume */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-blue-400 font-bold text-sm">📦 Hajm (V)</span>
                            <span className="text-white font-mono bg-slate-800 px-3 py-1 rounded-lg text-sm font-bold">{volume} L</span>
                        </div>
                        <input type="range" min={1} max={10} step={0.5} value={volume}
                            onChange={e => setVolume(Number(e.target.value))}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-500 bg-slate-700"
                        />
                        <div className="flex justify-between text-slate-600 text-[10px] mt-1"><span>1 L</span><span>10 L</span></div>
                    </div>

                    {/* Pressure result */}
                    <div className="rounded-2xl border border-violet-500/40 bg-violet-950/30 p-4 text-center">
                        <p className="text-slate-400 text-xs mb-1">Bosim (P = nRT/V)</p>
                        <p className={`text-4xl font-bold font-mono ${pColor}`}>{pressure} <span className="text-2xl text-slate-400">kPa</span></p>
                        <p className="text-slate-600 text-xs mt-1">1 mol × 8.314 × {temperature}K ÷ {volume}L</p>
                    </div>

                    {/* Holat indikatori */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 text-center">
                            <p className="text-slate-500 text-[10px]">Harorat ▲ →</p>
                            <p className="text-red-300 text-xs font-semibold">Bosim ▲</p>
                        </div>
                        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 text-center">
                            <p className="text-slate-500 text-[10px]">Hajm ▲ →</p>
                            <p className="text-blue-300 text-xs font-semibold">Bosim ▼</p>
                        </div>
                    </div>
                </div>

                {/* Molecule animation */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col items-center gap-3">
                    <h4 className="text-white font-semibold text-sm self-start">🎬 Molekulalar harakati</h4>
                    <MoleculeContainer temperature={temperature} pressure={pressure} volume={volume} />
                    <p className="text-slate-500 text-xs text-center">
                        Harorat ↑ → molekulalar tezroq harakat qiladi → bosim ↑
                    </p>
                </div>
            </div>

            {/* Boyl-Mariott tekshiruvi */}
            <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/20 p-5">
                <h4 className="text-white font-semibold text-sm mb-3">🔁 Boyl-Mariott qonunini tekshirish</h4>
                <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                        <p className="text-slate-500 text-xs mb-1">Boshlang'ich</p>
                        <p className="text-violet-300 font-mono font-bold">P₁ = {Math.round((n * R * temperature) / (5 * 0.001) / 1000)}</p>
                        <p className="text-blue-300 font-mono">V₁ = 5 L</p>
                    </div>
                    <div className="flex items-center justify-center text-slate-400 text-2xl">→</div>
                    <div>
                        <p className="text-slate-500 text-xs mb-1">Hajm 2 barobar oshsa</p>
                        <p className="text-violet-300 font-mono font-bold">P₂ = {Math.round((n * R * temperature) / (10 * 0.001) / 1000)}</p>
                        <p className="text-blue-300 font-mono">V₂ = 10 L</p>
                    </div>
                </div>
                <p className="text-slate-500 text-xs text-center mt-3">
                    P₁·V₁ = {Math.round((n * R * temperature) / (5 * 0.001) / 1000)} × 5 = P₂·V₂ = {Math.round((n * R * temperature) / (10 * 0.001) / 1000)} × 10 ✓
                </p>
            </div>
        </motion.div>
    );
}

// ══════════════════════════════════════════════════════════
//  TAB 3 — SAVOL-JAVOB
// ══════════════════════════════════════════════════════════
const quizQuestions = [
    {
        q: "Boyl-Mariott qonuniga ko'ra, harorat o'zgarmasa va hajm 2 baravar kichirsa, bosim qanday o'zgaradi?",
        options: ["2 baravar kamayadi", "O'zgarmaydi", "2 baravar oshadi", "4 baravar oshadi"],
        correct: 2,
    },
    {
        q: "0°C harorat Kelvin shkalasida necha Kelvin?",
        options: ["0 K", "100 K", "273 K", "373 K"],
        correct: 2,
    },
    {
        q: "Ideal gaz qonunida R nimani bildiradi?",
        options: ["Bosim", "Universal gaz doimiysi (8.314 J/(mol·K))", "Hajm", "Moddaning massasi"],
        correct: 1,
    },
    {
        q: "Gay-Lyussak qonuniga ko'ra, hajm o'zgarmasa harorat 2 baravar oshsa, bosim qanday o'zgaradi?",
        options: ["O'zgarmaydi", "2 baravar kamayadi", "4 baravar oshadi", "2 baravar oshadi"],
        correct: 3,
    },
];

function SavolJavobTab({ onXPEarned }) {
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleSubmit = () => {
        let s = 0;
        quizQuestions.forEach((q, i) => { if (answers[i] === q.correct) s++; });
        setScore(s);
        setSubmitted(true);
        if (s >= 3) {
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
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">

            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <motion.div key={i}
                            initial={{ x: `${Math.random() * 100}vw`, y: -20, rotate: 0, opacity: 1 }}
                            animate={{ y: '110vh', rotate: 720, opacity: 0 }}
                            transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 0.5 }}
                            className="absolute w-3 h-3 rounded-sm"
                            style={{ background: ['#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#06b6d4'][i % 5] }}
                        />
                    ))}
                </div>
            )}

            {submitted && (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className={`rounded-2xl border p-6 text-center ${score >= 3
                        ? 'border-emerald-500/40 bg-emerald-950/30'
                        : 'border-red-500/40 bg-red-950/30'}`}
                >
                    {score >= 3 ? (
                        <>
                            <Trophy size={48} className="text-yellow-400 mx-auto mb-3" />
                            <h3 className="text-2xl font-bold text-white mb-1">Zo'r! 🎉</h3>
                            <p className="text-slate-300 mb-3">{score}/{quizQuestions.length} to'g'ri javob</p>
                            <div className="inline-flex items-center gap-2 bg-violet-600/30 border border-violet-500/40 rounded-full px-5 py-2.5">
                                <Zap size={18} className="text-violet-400" />
                                <span className="text-violet-300 font-bold text-lg">+100 XP Qo'shildi!</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <XCircle size={48} className="text-red-400 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-white mb-1">Qayta urinib ko'ring</h3>
                            <p className="text-slate-400 mb-4">{score}/{quizQuestions.length} to'g'ri — kamida 3 ta kerak</p>
                            <button onClick={handleRetry}
                                className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold transition-all mx-auto"
                            >
                                <RotateCcw size={16} /> Qayta boshlash
                            </button>
                        </>
                    )}
                </motion.div>
            )}

            {quizQuestions.map((q, qi) => (
                <div key={qi} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                    <p className="text-white font-semibold mb-4 leading-snug">
                        <span className="text-violet-400 font-bold mr-2">{qi + 1}.</span>{q.q}
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
                                style = 'border-violet-500/60 bg-violet-950/40 text-violet-300';
                            }
                            return (
                                <button key={oi} onClick={() => !submitted && setAnswers(prev => ({ ...prev, [qi]: oi }))}
                                    className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150 flex items-center gap-3 ${style}`}
                                >
                                    <span className="w-5 h-5 rounded-full border border-current flex-shrink-0 flex items-center justify-center text-xs">
                                        {submitted && isCorrect ? '✓' : submitted && selected ? '✗' : oi + 1}
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
                    className="w-full py-3.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all shadow-lg shadow-violet-500/20"
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

export default function MolekulyarFizika() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('nazariya');
    const [xpEarned, setXpEarned] = useState(false);

    const handleXPEarned = useCallback(() => {
        if (xpEarned) return;
        setXpEarned(true);
        const completed = JSON.parse(localStorage.getItem('completedLabs') || '[]');
        if (!completed.includes('gaz')) {
            localStorage.setItem('completedLabs', JSON.stringify([...completed, 'gaz']));
        }
    }, [xpEarned]);

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
                            <span className="text-violet-400">Molekulyar Fizika</span>
                        </div>
                        <h1 className="text-xl font-bold text-white flex items-center gap-2">
                            🧪 Ideal Gaz Laboratoriyasi
                        </h1>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <span className="text-xs bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-1 rounded-full">Qiyin</span>
                        <span className="text-xs bg-violet-500/10 border border-violet-500/30 text-violet-400 px-3 py-1 rounded-full flex items-center gap-1">
                            <Zap size={11} /> +100 XP
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
                                ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
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
