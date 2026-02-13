import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Zap, Atom, Sparkles } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import OhmLawGraph from '../OhmLawGraph';

/**
 * Ohm's Law Laboratory Module
 * Interactive simulation for I = U / R
 */
export default function OhmLawLab({ addNotification, updateStats, theme }) {
    const API_KEYS = [
        "AIzaSyCC8uEzh1px6KKsXP8FEkh_JS_3F1ErtDQ",
        "AIzaSyBUzgU8ARMbZX1OYGv0f_cIqQJqaWdlGVM"
    ];
    const MODEL_NAME = "gemini-1.5-flash";

    const [voltage, setVoltage] = useState(12);
    const [resistance, setResistance] = useState(4);
    const [isRunning, setIsRunning] = useState(true);
    const [aiAnalysis, setAiAnalysis] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const current = isRunning ? (voltage / resistance).toFixed(2) : 0;

    const handleToggle = () => {
        setIsRunning(!isRunning);
        if (!isRunning) addNotification("Zanjir ulandi! Tok oqmoqda.", "success");
        else addNotification("Zanjir uzildi.", "info");
    }

    // ✨ AI TAHLIL FUNKSIYASI ✨
    const handleAnalyze = async () => {
        if (!isRunning) {
            addNotification("Tahlil qilish uchun zanjirni ulang!", "error");
            return;
        }

        setIsAnalyzing(true);
        setAiAnalysis(null);

        const prompt = `Men 9 - sinf fizika laboratoriyasida tajriba o'tkazyapman. 
    NATIJALAR:
    - Kuchlanish(U): ${voltage} Volt
    - Qarshilik(R): ${resistance} Om
    - Tok kuchi(I): ${current} Amper.

      VAZIFA:
    Ushbu natijani Om qonuniga(I = U / R) asosan qisqa, ilmiy va tushunarli tahlil qilib ber.Nega tok kuchi aynan shunday chiqdi ? Agar qarshilikni oshirsak nima bo'ladi? Javobni o'zbek tilida ber.`;

        try {
            const apiKey = API_KEYS[Math.floor(Math.random() * API_KEYS.length)];
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: MODEL_NAME });

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const analysisText = response.text();

            if (!analysisText) {
                throw new Error("AI javob bo'sh qaytardi.");
            }

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
    const ControlPanel = ({ label, value, unit, color, accent, min, max, onChange }) => (
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
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-700 ${accent} transition-all`}
            />
        </div>
    );

    return (
        <div className="space-y-6 animate-fadeIn pb-12">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Zap className="text-yellow-400" />
                    Ohm Qonuni: I = U / R
                </h2>
                <div className="flex items-center space-x-3 bg-blue-900/20 px-4 py-2 rounded-xl border border-blue-500/20 backdrop-blur-sm">
                    <span className="text-slate-400 font-mono text-sm">Formula:</span>
                    <span className="text-white font-bold font-mono text-lg">I = U / R</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Simulyatsiya Oynasi */}
                <div className="lg:col-span-8 space-y-4">
                    <div className="bg-slate-800 rounded-3xl border border-slate-700 p-1 shadow-2xl">
                        <div className="bg-slate-900 rounded-[20px] p-6 h-full relative overflow-hidden flex flex-col">

                            {/* Sxema */}
                            <div className="flex-1 flex items-center justify-center min-h-[300px] relative">
                                {isRunning && (
                                    <div className="absolute inset-0 pointer-events-none opacity-20">
                                        <div className="w-full h-full border-4 border-dashed border-blue-400 rounded-xl animate-pulse-slow"></div>
                                    </div>
                                )}

                                <div className="relative w-80 h-48 border-4 border-slate-600 rounded-lg flex items-center justify-center">
                                    {/* Battery */}
                                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 p-2">
                                        <div className={`w - 10 h - 16 border - 2 ${isRunning ? 'border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.4)]' : 'border-slate-500'} rounded bg - slate - 800 flex flex - col items - center justify - center transition - all`}>
                                            <span className="text-yellow-500 font-bold text-xs">{voltage}V</span>
                                        </div>
                                    </div>
                                    {/* Resistor */}
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-slate-900 p-2">
                                        <div className="w-24 h-8 bg-stripes-gray border-2 border-red-500 rounded flex items-center justify-center shadow-md relative overflow-hidden">
                                            <div className="absolute inset-0 bg-stripes opacity-20"></div>
                                            <span className="relative z-10 bg-slate-900/80 px-2 rounded text-xs font-bold text-white">{resistance}Ω</span>
                                        </div>
                                    </div>
                                    {/* Load */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 p-2">
                                        <div
                                            className="transition-all duration-500"
                                            style={{
                                                filter: isRunning ? `drop - shadow(0 0 ${current * 5}px #FEF08A)` : 'none',
                                                opacity: isRunning ? 1 : 0.5
                                            }}
                                        >
                                            <Atom size={40} className={isRunning ? "text-yellow-400 animate-spin-slow" : "text-slate-600"} />
                                        </div>
                                    </div>
                                </div>

                                {/* Ampermetr */}
                                <div className="absolute top-4 right-4 bg-slate-800/80 backdrop-blur border border-blue-500/30 p-3 rounded-xl shadow-xl">
                                    <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">Tok kuchi</div>
                                    <div className="text-2xl font-mono font-bold text-blue-400">{current} A</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Advanced Real-Time Graph */}
                    <OhmLawGraph
                        voltage={voltage}
                        resistance={resistance}
                        current={parseFloat(current)}
                    />

                    {/* AI Analysis Result */}
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
                    <ControlPanel label="Kuchlanish (U)" value={voltage} unit="V" color="text-yellow-400" accent="accent-yellow-500" min={0} max={24} onChange={setVoltage} />
                    <ControlPanel label="Qarshilik (R)" value={resistance} unit="Ω" color="text-red-400" accent="accent-red-500" min={1} max={50} onChange={setResistance} />

                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-6">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-slate-400 text-sm">Natija (I):</span>
                            <span className={`text - 4xl font - bold font - mono ${isRunning ? 'text-white' : 'text-slate-600'} `}>{current} A</span>
                        </div>
                        <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${Math.min(current * 10, 100)}% ` }}></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={handleToggle}
                            className={`col - span - 2 py - 4 rounded - xl font - bold text - lg shadow - lg transform transition - all active: scale - 95 flex items - center justify - center gap - 2 ${isRunning
                                ? 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20'
                                : 'bg-green-600 text-white hover:bg-green-500 shadow-green-600/30'
                                } `}
                        >
                            {isRunning ? 'To\'xtatish' : 'Boshlash'}
                        </button>
                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || !isRunning}
                            className="col-span-2 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all mt-2"
                        >
                            {isAnalyzing ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Tahlil qilinmoqda...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={20} />
                                    AI Tahlil Qilish
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
