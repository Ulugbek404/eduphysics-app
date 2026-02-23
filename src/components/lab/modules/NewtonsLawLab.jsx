import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RefreshCw, Sparkles, Activity } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Newton's Second Law Laboratory Module (Mechanics)
 * Interactive simulation for F = m * a
 */
export default function NewtonsLawLab({ addNotification, updateStats, theme }) {
    const API_KEYS = [
        "AIzaSyCC8uEzh1px6KKsXP8FEkh_JS_3F1ErtDQ",
        "AIzaSyBUzgU8ARMbZX1OYGv0f_cIqQJqaWdlGVM"
    ];
    const MODEL_NAME = "gemini-2.5-flash";

    // State
    const [force, setForce] = useState(50); // Newtons
    const [mass, setMass] = useState(10);   // kg
    const [isRunning, setIsRunning] = useState(false);
    const [position, setPosition] = useState(0); // meters
    const [velocity, setVelocity] = useState(0); // m/s
    const [time, setTime] = useState(0); // seconds
    const [aiAnalysis, setAiAnalysis] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Physics Loop
    const requestRef = useRef();
    const startTimeRef = useRef();

    const acceleration = force / mass; // a = F / m

    const animate = (timestamp) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const deltaTime = (timestamp - startTimeRef.current) / 1000; // seconds

        // Update physics
        // x = x0 + v0*t + 0.5*a*t^2 
        // Simple Euler integration for smoother visual updates
        // Since a is constant

        // Reset timestamp reference to accumulate time properly
        // Actually, let's keep it simple: run loop, add small delta time

        setTime(prevTime => {
            const newTime = prevTime + 0.016; // approx 60fps
            const newVelocity = acceleration * newTime;
            const newPosition = 0.5 * acceleration * newTime * newTime;

            setVelocity(newVelocity);
            setPosition(Math.min(newPosition, 100)); // Cap at 100m for visualization

            if (newPosition >= 100) {
                setIsRunning(false);
                addNotification("Marraga yetib keldi!", "success");
            }

            return newTime;
        });

        if (position < 100) {
            requestRef.current = requestAnimationFrame(animate);
        }
    };

    useEffect(() => {
        if (isRunning) {
            startTimeRef.current = performance.now();
            requestRef.current = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(requestRef.current);
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [isRunning]);

    const handleReset = () => {
        setIsRunning(false);
        setPosition(0);
        setVelocity(0);
        setTime(0);
        setAiAnalysis(null);
    };

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        setAiAnalysis(null);

        const prompt = `Fizika laboratoriyasi: Nyutonning 2-qonuni (F=ma).
    Natijalar:
    - Kuch (F): ${force} N
    - Massa (m): ${mass} kg
    - Tezlanish (a): ${acceleration.toFixed(2)} m/s²
    - Erishilgan tezlik (v): ${velocity.toFixed(2)} m/s

    Vazifa: Ushbu natijani tahlil qiling. Kuch va massa tezlanishga qanday ta'sir qiladi? Agar massani 2 barobar oshirsak, tezlanish qanday o'zgaradi? Javobni o'zbek tilida, o'quvchi uchun tushunarli qilib bering.`;

        try {
            const apiKey = API_KEYS[Math.floor(Math.random() * API_KEYS.length)];
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: MODEL_NAME });

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const analysisText = response.text();

            setAiAnalysis(analysisText);
            if (updateStats) updateStats({ labCompleted: true });
        } catch (error) {
            console.error(error);
            addNotification("AI tahlilida xatolik bo'ldi.", "error");
        } finally {
            setIsAnalyzing(false);
        }
    };

    // Reusable Control Panel Component
    const ControlPanel = ({ label, value, unit, color, accent, min, max, onChange, disabled }) => (
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors group">
            <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-bold ${color}`}>{label}</span>
                <span className="text-white font-mono bg-slate-900 px-2 py-1 rounded text-sm group-hover:bg-slate-700 transition-colors">
                    {value} {unit}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                disabled={disabled}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-700 ${accent} transition-all disabled:opacity-50`}
            />
        </div>
    );

    return (
        <div className="space-y-6 animate-fadeIn pb-12">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Activity className="text-green-400" />
                    Nyutonning 2-qonuni: F = ma
                </h2>
                <div className="flex items-center space-x-3 bg-blue-900/20 px-4 py-2 rounded-xl border border-blue-500/20 backdrop-blur-sm">
                    <span className="text-slate-400 font-mono text-sm">Formula:</span>
                    <span className="text-white font-bold font-mono text-lg">a = F / m</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Simulation Window */}
                <div className="lg:col-span-8 space-y-4">
                    <div className="bg-slate-800 rounded-3xl border border-slate-700 p-1 shadow-2xl">
                        <div className="bg-slate-900 rounded-[20px] p-6 h-[400px] relative overflow-hidden flex flex-col justify-between">

                            {/* Environment */}
                            <div className="absolute inset-0 bg-slate-900">
                                {/* Grid background */}
                                <div className="absolute inset-0 opacity-10"
                                    style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                                </div>

                                {/* Track */}
                                <div className="absolute bottom-10 left-0 right-0 h-1 bg-slate-600"></div>
                                <div className="absolute bottom-10 left-0 w-2 h-2 bg-slate-500 rounded-full"></div> {/* Start */}
                                <div className="absolute bottom-10 right-0 w-2 h-2 bg-red-500 rounded-full"></div>   {/* Finish */}
                                <div className="absolute bottom-4 right-0 text-xs text-red-500 font-bold">100m</div>

                                {/* Object (Block) */}
                                <div
                                    className="absolute bottom-10 transition-transform duration-75 ease-linear"
                                    style={{
                                        left: '0',
                                        transform: `translateX(${position}%) translateY(-100%)`
                                    }}
                                >
                                    <div
                                        className="bg-blue-500 rounded-lg shadow-lg border-2 border-blue-400 flex items-center justify-center text-white font-bold text-xs"
                                        style={{
                                            width: `${Math.max(40, mass * 3)}px`,
                                            height: `${Math.max(40, mass * 3)}px`,
                                            opacity: isRunning ? 1 : 0.8
                                        }}
                                    >
                                        {mass}kg
                                    </div>

                                    {/* Force Vector */}
                                    <div className="absolute top-1/2 left-full h-1 bg-yellow-400 origin-left flex items-center"
                                        style={{ width: `${force}px` }}>
                                        <div className="absolute right-0 -mr-1 w-2 h-2 bg-yellow-400 transform rotate-45"></div>
                                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-yellow-400 text-xs font-bold">F={force}N</span>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Overlay */}
                            <div className="absolute top-4 right-4 bg-slate-800/80 backdrop-blur border border-blue-500/30 p-3 rounded-xl shadow-xl z-10 text-right">
                                <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">Tezlanish (a)</div>
                                <div className="text-xl font-mono font-bold text-green-400">{acceleration.toFixed(2)} m/s²</div>
                                <div className="text-[10px] text-slate-400 uppercase font-bold mt-2 mb-1">Tezlik (v)</div>
                                <div className="text-xl font-mono font-bold text-blue-400">{velocity.toFixed(2)} m/s</div>
                                <div className="text-[10px] text-slate-400 uppercase font-bold mt-2 mb-1">Vaqt (t)</div>
                                <div className="text-xl font-mono font-bold text-white">{time.toFixed(2)} s</div>
                            </div>
                        </div>
                    </div>

                    {/* AI Analysis */}
                    {aiAnalysis && (
                        <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-6 rounded-2xl border border-indigo-500/30 animate-slideInLeft">
                            <div className="flex items-start gap-3">
                                <Sparkles className="text-yellow-400 mt-1 flex-shrink-0" size={20} />
                                <div>
                                    <h3 className="font-bold text-indigo-200 mb-2">AI Tahlil Natijasi:</h3>
                                    <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line">{aiAnalysis}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="lg:col-span-4 space-y-4">
                    <ControlPanel label="Kuch (F)" value={force} unit="N" color="text-yellow-400" accent="accent-yellow-500" min={10} max={200} onChange={setForce} disabled={isRunning} />
                    <ControlPanel label="Massa (m)" value={mass} unit="kg" color="text-blue-400" accent="accent-blue-500" min={1} max={50} onChange={setMass} disabled={isRunning} />

                    <div className="grid grid-cols-2 gap-3 mt-4">
                        {!isRunning ? (
                            <button
                                onClick={() => {
                                    if (position >= 100) handleReset(); // Auto reset if finished
                                    setIsRunning(true);
                                }}
                                className="col-span-1 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transform active:scale-95 transition-all"
                            >
                                <Play size={20} /> Boshlash
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsRunning(false)}
                                className="col-span-1 py-4 bg-yellow-600 hover:bg-yellow-500 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transform active:scale-95 transition-all"
                            >
                                <Pause size={20} /> Pauza
                            </button>
                        )}

                        <button
                            onClick={handleReset}
                            className="col-span-1 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transform active:scale-95 transition-all"
                        >
                            <RefreshCw size={20} /> Reset
                        </button>

                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing}
                            className="col-span-2 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all mt-2"
                        >
                            {isAnalyzing ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                <Sparkles size={20} />
                            )}
                            AI Tahlil
                        </button>
                    </div>

                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 mt-4">
                        <h4 className="text-white font-bold mb-2">Qanday ishlaydi?</h4>
                        <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
                            <li>Kuch (F) blokni itaradi</li>
                            <li>Massa (m) qancha katta bo'lsa, tezlanish shuncha kam (inertsiya)</li>
                            <li>Nyutonning 2-qonuni: <b>a = F / m</b></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

