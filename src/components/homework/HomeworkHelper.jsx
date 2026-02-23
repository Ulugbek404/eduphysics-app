import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, BookOpen, Lightbulb, MessageSquare, Loader, Send, Copy, Trash2, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import {
    solveProblem,
    checkSolution,
    generatePracticeProblem,
    explainConcept,
} from '../../services/homeworkService';
import StepCard from './StepCard';

// ─── Shared UI ─────────────────────────────────────────────────────────────
const PHYSICS_TOPICS = [
    'Kinematika', 'Dinamika', 'Energiya va quvvat', 'Molekulyar fizika',
    'Elektr toki', 'Optika', 'Termodinamika', 'Magnit maydoni', 'Boshqa'
];

function TopicSelect({ value, onChange }) {
    return (
        <select value={value} onChange={e => onChange(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors text-sm">
            <option value="">Mavzuni tanlang (ixtiyoriy)</option>
            {PHYSICS_TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
    );
}

function Textarea({ value, onChange, placeholder, rows = 5 }) {
    return (
        <textarea value={value} onChange={e => onChange(e.target.value)}
            placeholder={placeholder} rows={rows}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors text-sm resize-none placeholder:text-slate-500"
        />
    );
}

function ActionBtn({ onClick, disabled, loading, label, loadingLabel }) {
    return (
        <button onClick={onClick} disabled={disabled || loading}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
            {loading ? <><Loader size={18} className="animate-spin" />{loadingLabel}</> : <><Send size={16} />{label}</>}
        </button>
    );
}

function FinalAnswer({ text, label = "Javob" }) {
    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950/50 to-green-950/50 border border-emerald-500/30 rounded-2xl p-5">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl" />
            <h4 className="text-emerald-400 font-bold text-sm mb-2">{label}:</h4>
            <p className="text-white font-semibold">{text}</p>
        </div>
    );
}

// ─── TAB 1: Masala Yechish ─────────────────────────────────────────────────
function SolverTab() {
    const [topic, setTopic] = useState('');
    const [problem, setProblem] = useState('');
    const [solution, setSolution] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSolve = async () => {
        if (!problem.trim()) return;
        setLoading(true); setSolution(null);
        try {
            const res = await solveProblem(problem, topic);
            if (res.success) setSolution(res.data);
        } finally { setLoading(false); }
    };

    return (
        <div className="space-y-4">
            <TopicSelect value={topic} onChange={setTopic} />
            <Textarea value={problem} onChange={setProblem}
                placeholder="Masala matnini kiriting... Masalan: Massasi 5 kg bo'lgan jismga 10 N kuch ta'sir etsa, tezlanishi qancha?" />
            <div className="flex gap-3">
                <ActionBtn onClick={handleSolve} disabled={!problem.trim()} loading={loading}
                    label="Yechish" loadingLabel="Yechilmoqda..." />
                <button onClick={() => { setProblem(''); setSolution(null); }}
                    className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-400 hover:text-white transition-all">
                    <Trash2 size={18} />
                </button>
            </div>

            {solution && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    {solution.steps?.map((step, i) => <StepCard key={i} step={step} index={i} />)}
                    {solution.finalAnswer && <FinalAnswer text={solution.finalAnswer} label="Yechim" />}
                </motion.div>
            )}
        </div>
    );
}

// ─── TAB 2: Yechimni Tekshirish ────────────────────────────────────────────
function CheckerTab() {
    const [problem, setProblem] = useState('');
    const [myAnswer, setMyAnswer] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCheck = async () => {
        if (!problem.trim() || !myAnswer.trim()) return;
        setLoading(true); setResult(null);
        try {
            const res = await checkSolution(null, problem, myAnswer);
            if (res.success) setResult(res.data);
        } finally { setLoading(false); }
    };

    const scoreColor = result
        ? result.score >= 80 ? 'text-emerald-400' : result.score >= 50 ? 'text-amber-400' : 'text-red-400'
        : '';

    return (
        <div className="space-y-4">
            <div>
                <label className="text-slate-400 text-xs font-medium mb-2 block">Masala matni</label>
                <Textarea value={problem} onChange={setProblem} placeholder="Masalani kiriting..." rows={3} />
            </div>
            <div>
                <label className="text-slate-400 text-xs font-medium mb-2 block">Sizning yechimingiz</label>
                <Textarea value={myAnswer} onChange={setMyAnswer} placeholder="Yechimingizni yozing..." rows={5} />
            </div>
            <ActionBtn onClick={handleCheck} disabled={!problem.trim() || !myAnswer.trim()} loading={loading}
                label="Tekshirish" loadingLabel="Tekshirilmoqda..." />

            {result && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    {/* Score */}
                    <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                        {result.score >= 80 ? <CheckCircle size={28} className="text-emerald-400" /> : <XCircle size={28} className="text-red-400" />}
                        <div>
                            <p className="text-slate-400 text-xs">Natija</p>
                            <p className={`text-2xl font-black ${scoreColor}`}>{result.score}/100</p>
                        </div>
                        <span className={`ml-auto px-3 py-1 rounded-full text-xs font-bold border ${result.status === 'correct' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' :
                                result.status === 'partial' ? 'text-amber-400 border-amber-500/30 bg-amber-500/10' :
                                    'text-red-400 border-red-500/30 bg-red-500/10'
                            }`}>
                            {result.status === 'correct' ? '✓ To\'g\'ri' : result.status === 'partial' ? '~ Qisman' : '✗ Noto\'g\'ri'}
                        </span>
                    </div>

                    {/* Feedback */}
                    {result.feedback && (
                        <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4 text-slate-300 text-sm">
                            {result.feedback}
                        </div>
                    )}

                    {/* Errors */}
                    {result.errors?.length > 0 && (
                        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2">
                            <p className="text-amber-400 text-xs font-bold">Xatolar:</p>
                            {result.errors.map((e, i) => (
                                <div key={i} className="text-slate-400 text-sm">
                                    <span className="text-amber-400">→ </span>{e.description}
                                    {e.suggestion && <p className="text-slate-500 text-xs mt-0.5 ml-4">💡 {e.suggestion}</p>}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Correct solution */}
                    {result.correctSolution?.finalAnswer && (
                        <FinalAnswer text={result.correctSolution.finalAnswer} label="To'g'ri javob" />
                    )}
                </motion.div>
            )}
        </div>
    );
}

// ─── TAB 3: Amaliyot ───────────────────────────────────────────────────────
function PracticeTab() {
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('medium');
    const [problem, setProblem] = useState(null);
    const [myAnswer, setMyAnswer] = useState('');
    const [checkResult, setCheckResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(false);

    const handleGenerate = async () => {
        if (!topic) return;
        setLoading(true); setProblem(null); setMyAnswer(''); setCheckResult(null);
        try {
            const res = await generatePracticeProblem(null, topic, difficulty);
            if (res.success) setProblem(res.data);
        } finally { setLoading(false); }
    };

    const handleCheck = async () => {
        if (!problem || !myAnswer.trim()) return;
        setChecking(true); setCheckResult(null);
        try {
            const res = await checkSolution(null, problem.problem, myAnswer);
            if (res.success) setCheckResult(res.data);
        } finally { setChecking(false); }
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
                <TopicSelect value={topic} onChange={setTopic} />
                <select value={difficulty} onChange={e => setDifficulty(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 text-sm">
                    <option value="easy">🟢 Oson</option>
                    <option value="medium">🟡 O'rta</option>
                    <option value="hard">🔴 Qiyin</option>
                </select>
            </div>
            <ActionBtn onClick={handleGenerate} disabled={!topic} loading={loading}
                label="Masala Yaratish" loadingLabel="Yaratilmoqda..." />

            {problem && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
                        <p className="text-white font-semibold text-sm">{problem.problem}</p>
                        {problem.given?.length > 0 && (
                            <div>
                                <p className="text-slate-500 text-xs mb-1">Berilganlar:</p>
                                <ul className="space-y-1">
                                    {problem.given.map((g, i) => <li key={i} className="text-slate-300 text-sm">• {g}</li>)}
                                </ul>
                            </div>
                        )}
                        {problem.hints?.length > 0 && (
                            <details className="group">
                                <summary className="text-indigo-400 text-xs cursor-pointer">💡 Maslahat ko'rish</summary>
                                <ul className="mt-2 space-y-1">
                                    {problem.hints.map((h, i) => <li key={i} className="text-slate-400 text-xs">→ {h}</li>)}
                                </ul>
                            </details>
                        )}
                    </div>
                    <Textarea value={myAnswer} onChange={setMyAnswer} placeholder="Yechimingizni yozing..." rows={4} />
                    <ActionBtn onClick={handleCheck} disabled={!myAnswer.trim()} loading={checking}
                        label="Tekshirish" loadingLabel="Tekshirilmoqda..." />
                    {checkResult && (
                        <div className={`rounded-xl border p-4 text-sm ${checkResult.score >= 70
                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                            : 'border-red-500/30 bg-red-500/10 text-red-300'}`}>
                            <p className="font-bold mb-1">{checkResult.score}/100 ball</p>
                            <p className="text-slate-400">{checkResult.feedback}</p>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
}

// ─── TAB 4: Tushuntirish ───────────────────────────────────────────────────
function ExplainerTab() {
    const [question, setQuestion] = useState('');
    const [context, setContext] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleExplain = async () => {
        if (!question.trim()) return;
        setLoading(true); setResult(null);
        try {
            const res = await explainConcept(null, question, context);
            if (res.success) setResult(res.data);
        } finally { setLoading(false); }
    };

    return (
        <div className="space-y-4">
            <Textarea value={question} onChange={setQuestion}
                placeholder="Tushunmagan tushunchani yozing... Masalan: Impuls nima va u nima uchun saqlanadi?" rows={3} />
            <Textarea value={context} onChange={setContext}
                placeholder="Qo'shimcha kontekst (ixtiyoriy)..." rows={2} />
            <ActionBtn onClick={handleExplain} disabled={!question.trim()} loading={loading}
                label="Tushuntir" loadingLabel="Tushuntirilmoqda..." />

            {result && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    {result.explanation && (
                        <div className="rounded-2xl border border-indigo-800/30 bg-indigo-950/30 p-5">
                            <p className="text-slate-400 text-xs mb-2 font-medium">📖 Tushuntirish</p>
                            <p className="text-slate-100 text-sm leading-relaxed">{result.explanation}</p>
                        </div>
                    )}
                    {result.analogy && (
                        <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                            <p className="text-slate-500 text-xs mb-1">🔗 Analogiya</p>
                            <p className="text-slate-300 text-sm">{result.analogy}</p>
                        </div>
                    )}
                    {result.formula && (
                        <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 p-4">
                            <p className="text-purple-400 text-xs mb-1">📐 Formula</p>
                            <p className="text-white font-mono">{result.formula}</p>
                        </div>
                    )}
                    {result.examples?.length > 0 && (
                        <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                            <p className="text-slate-500 text-xs mb-2">💡 Misollar</p>
                            <ul className="space-y-1">
                                {result.examples.map((ex, i) => <li key={i} className="text-slate-300 text-sm">• {ex}</li>)}
                            </ul>
                        </div>
                    )}
                    {result.tips?.length > 0 && (
                        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                            <p className="text-amber-400 text-xs mb-2">⚡ Maslahatlar</p>
                            <ul className="space-y-1">
                                {result.tips.map((t, i) => <li key={i} className="text-slate-300 text-sm">→ {t}</li>)}
                            </ul>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────
const TABS = [
    { id: 'solver', label: 'Masala Yech', icon: Calculator, component: SolverTab },
    { id: 'checker', label: 'Tekshirish', icon: BookOpen, component: CheckerTab },
    { id: 'practice', label: 'Amaliyot', icon: Lightbulb, component: PracticeTab },
    { id: 'explainer', label: 'Tushuntirish', icon: MessageSquare, component: ExplainerTab },
];

export default function HomeworkHelper({ addNotification, addXP }) {
    const [activeTab, setActiveTab] = useState('solver');
    const ActiveComponent = TABS.find(t => t.id === activeTab)?.component;

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <Sparkles size={20} className="text-white" />
                </div>
                <div>
                    <h2 className="text-white font-bold">AI Uy Vazifasi Yordamchisi</h2>
                    <p className="text-slate-400 text-xs">Gemini 2.5 Flash · O'zbek tilida</p>
                </div>
            </div>

            {/* Tab bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TABS.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-semibold transition-all ${isActive
                                    ? 'border-indigo-500 bg-indigo-600/20 text-indigo-300 shadow-lg shadow-indigo-500/10'
                                    : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                                }`}>
                            <Icon size={18} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
                <motion.div key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-5"
                >
                    {ActiveComponent && <ActiveComponent />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
