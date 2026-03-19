import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calculator, BookOpen, Lightbulb, MessageSquare,
    Loader, Send, Trash2, CheckCircle, XCircle,
    Sparkles, Camera, History, X
} from 'lucide-react';
import {
    solveProblem,
    checkSolution,
    generatePracticeProblem,
    explainConcept,
} from '../../services/homeworkService';
import StepCard from './StepCard';
import HomeworkCamera from '../HomeworkCamera';
import { checkHomeworkWithAI } from '../../services/homeworkAI';
import { db, storage } from '../../firebase';
import { doc, setDoc, collection, getDocs, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../../contexts/AuthContext';
import { useXP } from '../../contexts/XPContext';
import { useLanguage } from '../../contexts/LanguageContext';

// ─── Shared UI ─────────────────────────────────────────────────────────────
const PHYSICS_TOPICS = [
    'Kinematika', 'Dinamika', 'Energiya va quvvat', 'Molekulyar fizika',
    'Elektr toki', 'Optika', 'Termodinamika', 'Magnit maydoni', 'Boshqa'
];

function TopicSelect({ value, onChange }) {
    const { t } = useLanguage();
    return (
        <select value={value} onChange={e => onChange(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors text-sm">
            <option value="">{t('homework_topic_select') || 'Mavzuni tanlang (ixtiyoriy)'}</option>
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
    const { t } = useLanguage();
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
                placeholder={t('homework_problem_placeholder') || "Masala matnini kiriting... Masalan: Massasi 5 kg bo'lgan jismga 10 N kuch ta'sir etsa, tezlanishi qancha?"} />
            <div className="flex gap-3">
                <ActionBtn onClick={handleSolve} disabled={!problem.trim()} loading={loading}
                    label={t('homework_solve_btn') || "Yechish"} loadingLabel={t('homework_solving') || "Yechilmoqda..."} />
                <button onClick={() => { setProblem(''); setSolution(null); }}
                    className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-400 hover:text-white transition-all">
                    <Trash2 size={18} />
                </button>
            </div>
            {solution && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    {solution.steps?.map((step, i) => <StepCard key={i} step={step} index={i} />)}
                    {solution.finalAnswer && <FinalAnswer text={solution.finalAnswer} label={t('homework_solution') || "Yechim"} />}
                </motion.div>
            )}
        </div>
    );
}

// ─── TAB 2: Yechimni Tekshirish ────────────────────────────────────────────
function CheckerTab() {
    const { t } = useLanguage();
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
                <label className="text-slate-400 text-xs font-medium mb-2 block">{t('homework_problem_label') || "Masala matni"}</label>
                <Textarea value={problem} onChange={setProblem} placeholder={t('homework_problem_placeholder2') || "Masalani kiriting..."} rows={3} />
            </div>
            <div>
                <label className="text-slate-400 text-xs font-medium mb-2 block">{t('homework_your_solution_label') || "Sizning yechimingiz"}</label>
                <Textarea value={myAnswer} onChange={setMyAnswer} placeholder={t('homework_your_solution_placeholder') || "Yechimingizni yozing..."} rows={5} />
            </div>
            <ActionBtn onClick={handleCheck} disabled={!problem.trim() || !myAnswer.trim()} loading={loading}
                label={t('homework_check') || "Tekshirish"} loadingLabel={t('homework_checking') || "Tekshirilmoqda..."} />

            {result && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                        {result.score >= 80 ? <CheckCircle size={28} className="text-emerald-400" /> : <XCircle size={28} className="text-red-400" />}
                        <div>
                            <p className="text-slate-400 text-xs">{t('homework_result') || "Natija"}</p>
                            <p className={`text-2xl font-black ${scoreColor}`}>{result.score}/100</p>
                        </div>
                        <span className={`ml-auto px-3 py-1 rounded-full text-xs font-bold border ${result.status === 'correct' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' :
                            result.status === 'partial' ? 'text-amber-400 border-amber-500/30 bg-amber-500/10' :
                                'text-red-400 border-red-500/30 bg-red-500/10'}`}>
                            {result.status === 'correct' ? `✓ ${t('tests_correct')}` : result.status === 'partial' ? `~ ${t('homework_partial') || 'Qisman'}` : `✗ ${t('tests_wrong')}`}
                        </span>
                    </div>
                    {result.feedback && (
                        <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4 text-slate-300 text-sm">{result.feedback}</div>
                    )}
                    {result.errors?.length > 0 && (
                        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2">
                            <p className="text-amber-400 text-xs font-bold">{t('homework_mistakes') || "Xatolar"}:</p>
                            {result.errors.map((e, i) => (
                                <div key={i} className="text-slate-400 text-sm">
                                    <span className="text-amber-400">→ </span>{e.description}
                                    {e.suggestion && <p className="text-slate-500 text-xs mt-0.5 ml-4">💡 {e.suggestion}</p>}
                                </div>
                            ))}
                        </div>
                    )}
                    {result.correctSolution?.finalAnswer && <FinalAnswer text={result.correctSolution.finalAnswer} label={t('admin_correct_answer') || "To'g'ri javob"} />}
                </motion.div>
            )}
        </div>
    );
}

// ─── TAB 3: Amaliyot ───────────────────────────────────────────────────────
function PracticeTab() {
    const { t } = useLanguage();
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
                    <option value="easy">🟢 {t('tests_easy')}</option>
                    <option value="medium">🟡 {t('tests_medium')}</option>
                    <option value="hard">🔴 {t('tests_hard')}</option>
                </select>
            </div>
            <ActionBtn onClick={handleGenerate} disabled={!topic} loading={loading}
                label={t('homework_generate_btn') || "Masala Yaratish"} loadingLabel={t('homework_generating') || "Yaratilmoqda..."} />

            {problem && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
                        <p className="text-white font-semibold text-sm">{problem.problem}</p>
                        {problem.given?.length > 0 && (
                            <div>
                                <p className="text-slate-500 text-xs mb-1">{t('homework_given') || "Berilganlar:"}</p>
                                <ul className="space-y-1">{problem.given.map((g, i) => <li key={i} className="text-slate-300 text-sm">• {g}</li>)}</ul>
                            </div>
                        )}
                        {problem.hints?.length > 0 && (
                            <details className="group">
                                <summary className="text-indigo-400 text-xs cursor-pointer">💡 {t('homework_show_hint') || "Maslahat ko'rish"}</summary>
                                <ul className="mt-2 space-y-1">{problem.hints.map((h, i) => <li key={i} className="text-slate-400 text-xs">→ {h}</li>)}</ul>
                            </details>
                        )}
                    </div>
                    <Textarea value={myAnswer} onChange={setMyAnswer} placeholder={t('homework_your_solution_placeholder') || "Yechimingizni yozing..."} rows={4} />
                    <ActionBtn onClick={handleCheck} disabled={!myAnswer.trim()} loading={checking}
                        label={t('homework_check') || "Tekshirish"} loadingLabel={t('homework_checking') || "Tekshirilmoqda..."} />
                    {checkResult && (
                        <div className={`rounded-xl border p-4 text-sm ${checkResult.score >= 70
                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                            : 'border-red-500/30 bg-red-500/10 text-red-300'}`}>
                            <p className="font-bold mb-1">{checkResult.score}/100 {t('live_score').toLowerCase()}</p>
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
    const { t } = useLanguage();
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
                placeholder={t('homework_explain_placeholder') || "Tushunmagan tushunchani yozing... Masalan: Impuls nima va u nima uchun saqlanadi?"} rows={3} />
            <Textarea value={context} onChange={setContext} placeholder={t('homework_context_placeholder') || "Qo'shimcha kontekst (ixtiyoriy)..."} rows={2} />
            <ActionBtn onClick={handleExplain} disabled={!question.trim()} loading={loading}
                label={t('homework_explain_btn') || "Tushuntir"} loadingLabel={t('homework_explaining') || "Tushuntirilmoqda..."} />

            {result && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    {result.explanation && (
                        <div className="rounded-2xl border border-indigo-800/30 bg-indigo-950/30 p-5">
                            <p className="text-slate-400 text-xs mb-2 font-medium">📖 {t('homework_explanation') || "Tushuntirish"}</p>
                            <p className="text-slate-100 text-sm leading-relaxed">{result.explanation}</p>
                        </div>
                    )}
                    {result.analogy && (
                        <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                            <p className="text-slate-500 text-xs mb-1">🔗 {t('homework_analogy') || "Analogiya"}</p>
                            <p className="text-slate-300 text-sm">{result.analogy}</p>
                        </div>
                    )}
                    {result.formula && (
                        <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 p-4">
                            <p className="text-purple-400 text-xs mb-1">📐 {t('homework_formula') || "Formula"}</p>
                            <p className="text-white font-mono">{result.formula}</p>
                        </div>
                    )}
                    {result.examples?.length > 0 && (
                        <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                            <p className="text-slate-500 text-xs mb-2">💡 {t('homework_examples') || "Misollar"}</p>
                            <ul className="space-y-1">{result.examples.map((ex, i) => <li key={i} className="text-slate-300 text-sm">• {ex}</li>)}</ul>
                        </div>
                    )}
                    {result.tips?.length > 0 && (
                        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                            <p className="text-amber-400 text-xs mb-2">⚡ {t('homework_tips') || "Maslahatlar"}</p>
                            <ul className="space-y-1">{result.tips.map((t, i) => <li key={i} className="text-slate-300 text-sm">→ {t}</li>)}</ul>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
}

// ─── GRADE STYLES ──────────────────────────────────────────────────────────
const GRADE_STYLES = {
    A: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/40', text: 'text-emerald-400' },
    B: { bg: 'bg-blue-500/20', border: 'border-blue-500/40', text: 'text-blue-400' },
    C: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', text: 'text-yellow-400' },
    D: { bg: 'bg-red-500/20', border: 'border-red-500/40', text: 'text-red-400' },
};

// ─── AI NATIJASI KOMPONENTI ────────────────────────────────────────────────
function HomeworkResult({ result, onSave, saving }) {
    const { t } = useLanguage();
    const gc = GRADE_STYLES[result.grade] || GRADE_STYLES.D;
    return (
        <div className="space-y-4">
            {/* Asosiy baho */}
            <div className={`p-5 rounded-2xl border-2 ${gc.bg} ${gc.border} flex items-center justify-between gap-3`}>
                <div className="text-center">
                    <p className="text-slate-400 text-xs mb-1">{t('homework_grade') || "Baho"}</p>
                    <p className={`text-5xl font-black ${gc.text}`}>{result.grade}</p>
                </div>
                <div className="flex-1 text-center">
                    <p className={`text-3xl font-bold ${gc.text}`}>{result.score}%</p>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">{result.summary}</p>
                </div>
                <div className="text-center">
                    <p className="text-yellow-400 text-2xl font-bold">+{result.xpEarned}</p>
                    <p className="text-slate-400 text-xs">XP</p>
                </div>
            </div>
            {result.correct?.length > 0 && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                    <p className="text-emerald-400 font-semibold text-sm mb-2">✅ {t('homework_correct_steps') || "To'g'ri bajarilgan"}</p>
                    {result.correct.map((c, i) => <p key={i} className="text-slate-300 text-sm">• {c}</p>)}
                </div>
            )}
            {result.mistakes?.length > 0 && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                    <p className="text-red-400 font-semibold text-sm mb-2">❌ {t('homework_mistakes') || "Xatolar"}</p>
                    {result.mistakes.map((m, i) => <p key={i} className="text-slate-300 text-sm">• {m}</p>)}
                </div>
            )}
            {result.tips?.length > 0 && (
                <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4">
                    <p className="text-indigo-400 font-semibold text-sm mb-2">💡 {t('homework_tips') || "Maslahatlar"}</p>
                    {result.tips.map((t, i) => <p key={i} className="text-slate-300 text-sm">• {t}</p>)}
                </div>
            )}
            <button onClick={onSave} disabled={saving}
                className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all">
                {saving ? <><Loader size={16} className="animate-spin" /> {t('common_saving') || "Saqlanmoqda..."}</> : `💾 ${t('homework_save_xp') || 'Natijani Saqlash va XP Olish'}`}
            </button>
        </div>
    );
}

// ─── TAB 5: FOTO ORQALI TOPSHIRISH ────────────────────────────────────────
function PhotoSubmitTab() {
    const { user } = useAuth();
    const { addXP } = useXP();
    const { t } = useLanguage();
    const [step, setStep] = useState('camera'); // camera | checking | result | saved
    const [capturedImage, setCapturedImage] = useState(null);
    const [aiResult, setAiResult] = useState(null);
    const [saving, setSaving] = useState(false);
    const [history, setHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [activeView, setActiveView] = useState('submit');
    const [detailModal, setDetailModal] = useState(null);

    const handleCapture = useCallback(async (imageBase64) => {
        setCapturedImage(imageBase64);
        setStep('checking');
        try {
            const result = await checkHomeworkWithAI(imageBase64, 'Fizika uy vazifasi');
            setAiResult(result);
            setStep('result');
        } catch (err) {
            console.error('AI xatosi:', err);
            // Fallback — xato bo'lsa minimal natija
            setAiResult({
                grade: 'C', score: 60, isCorrect: false,
                summary: "AI tekshirishda muammo yuz berdi. Rasm aniqroq bo'lishi kerak.",
                correct: [], mistakes: [], tips: ["Rasmni yorqinroq joyda oling"],
                xpEarned: 50,
            });
            setStep('result');
        }
    }, []);

    const handleSave = async () => {
        if (!aiResult || !user?.uid) return;
        setSaving(true);
        try {
            await setDoc(doc(db, 'homeworkSubmissions', `${user.uid}_${Date.now()}`), {
                uid: user.uid, 
                // imageUrl, // Storage ga yuklamasdan o'tkazib yuboramiz
                grade: aiResult.grade, score: aiResult.score, xpEarned: aiResult.xpEarned,
                feedback: { correct: aiResult.correct || [], mistakes: aiResult.mistakes || [], tips: aiResult.tips || [], summary: aiResult.summary || '' },
                submittedAt: serverTimestamp(), checked: true,
            });

            await addXP(aiResult.xpEarned, `homework_${aiResult.grade}`);
            setStep('saved');
        } catch (err) { console.error('Saqlash xatosi:', err); }
        finally { setSaving(false); }
    };

    const loadHistory = async () => {
        if (!user?.uid) return;
        setLoadingHistory(true);
        try {
            const q = query(collection(db, 'homeworkSubmissions'), where('uid', '==', user.uid));
            const snap = await getDocs(q);
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            data.sort((a, b) => (b.submittedAt?.toMillis?.() || 0) - (a.submittedAt?.toMillis?.() || 0));
            setHistory(data);
        } catch (err) { 
            console.error('Tarix yuklash xatosi:', err);
            setHistory([]); 
        }
        finally { setLoadingHistory(false); }
    };

    const fmtDate = (ts) => {
        if (!ts) return '';
        const d = ts.toDate ? ts.toDate() : new Date(ts);
        return d.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' });
    };

    return (
        <div className="space-y-4">
            {/* Sub-nav */}
            <div className="flex bg-slate-950/60 rounded-xl p-1 gap-1">
                {[['submit', Camera, t('homework_submit') || 'Topshirish'], ['history', History, t('homework_history') || "Tarixim"]].map(([v, Icon, label]) => (
                    <button key={v} onClick={() => { setActiveView(v); if (v === 'history') loadHistory(); }}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all
                            ${activeView === v ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>
                        <Icon size={14} /> {label}
                    </button>
                ))}
            </div>

            {/* TOPSHIRISH */}
            {activeView === 'submit' && (
                <div className="space-y-4">
                    {step === 'camera' && (
                        <>
                            <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-3 text-xs text-violet-300 leading-relaxed">
                                📸 {t('homework_camera_info') || "Yechimingizni qog'ozga yozing → rasmga oling → AI tekshiradi → XP oling!"}
                            </div>
                            <HomeworkCamera onCapture={handleCapture} />
                        </>
                    )}

                    {step === 'checking' && (
                        <div className="flex flex-col items-center justify-center gap-4 py-12">
                            <div className="w-16 h-16 rounded-full bg-violet-600/20 border border-violet-500/40 flex items-center justify-center">
                                <Loader size={28} className="text-violet-400 animate-spin" />
                            </div>
                            <div className="text-center">
                                <p className="text-white font-semibold">{t('homework_checking') || "AI Tekshirayapti..."}</p>
                                <p className="text-slate-400 text-xs mt-1">{t('homework_gemini_reading') || "Gemini Vision yechimingizni o'qimoqda"}</p>
                            </div>
                        </div>
                    )}

                    {step === 'result' && aiResult && (
                        <div className="space-y-3">
                            {capturedImage && <img src={capturedImage} alt="Yechim" className="w-full rounded-xl max-h-40 object-contain bg-slate-950" />}
                            <HomeworkResult result={aiResult} onSave={handleSave} saving={saving} />
                        </div>
                    )}

                    {step === 'saved' && (
                        <div className="flex flex-col items-center gap-4 py-8 text-center">
                            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center">
                                <CheckCircle size={32} className="text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-lg">{t('homework_saved') || "Saqlandi! 🎉"}</p>
                                <p className="text-emerald-400 font-semibold">+{aiResult?.xpEarned} XP qo'shildi</p>
                                <p className="text-slate-400 text-xs mt-1">{t('homework_grade') || "Baho"}: {aiResult?.grade} ({aiResult?.score}%)</p>
                            </div>
                            <button onClick={() => { setCapturedImage(null); setAiResult(null); setStep('camera'); }}
                                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-all">
                                {t('homework_new') || "Yangi Vazifa Topshirish"}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* TARIX */}
            {activeView === 'history' && (
                <div className="space-y-3">
                    {loadingHistory ? (
                        <div className="flex justify-center py-8"><Loader size={24} className="text-indigo-400 animate-spin" /></div>
                    ) : history.length === 0 ? (
                        <div className="text-center py-8 text-slate-500">
                            <History size={32} className="mx-auto mb-2 opacity-40" />
                            <p className="text-sm">{t('homework_no_history') || "Hali topshiriq yo'q"}</p>
                        </div>
                    ) : history.map(item => {
                        const gc = GRADE_STYLES[item.grade] || GRADE_STYLES.D;
                        return (
                            <div key={item.id} onClick={() => setDetailModal(item)}
                                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-violet-500/40 transition-all">
                                {item.imageUrl
                                    ? <img src={item.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-slate-900" />
                                    : <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0"><Camera size={18} className="text-slate-500" /></div>
                                }
                                <div className="flex-1 min-w-0">
                                    <p className="text-slate-400 text-xs">{fmtDate(item.submittedAt)}</p>
                                    <p className="text-slate-300 text-sm truncate mt-0.5">{item.feedback?.summary || t('homework_title') || 'Uy vazifasi'}</p>
                                </div>
                                <div className="text-right flex-shrink-0 space-y-1">
                                    <div className={`inline-flex items-center px-2.5 py-1 rounded-lg text-sm font-bold ${gc.bg} ${gc.text} border ${gc.border}`}>
                                        {item.grade}
                                    </div>
                                    <p className="text-yellow-400 text-xs font-semibold">+{item.xpEarned} XP</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Detail Modal */}
            {detailModal && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setDetailModal(null)}>
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full max-h-[85vh] overflow-y-auto p-5 space-y-4"
                        onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between">
                            <p className="text-white font-bold">{t('homework_detail_title') || "Topshiriq Tafsiloti"}</p>
                            <button onClick={() => setDetailModal(null)} className="text-slate-500 hover:text-white"><X size={18} /></button>
                        </div>
                        {detailModal.imageUrl && <img src={detailModal.imageUrl} alt="Yechim" className="w-full rounded-xl max-h-48 object-contain bg-slate-950" />}
                        <div className={`p-4 rounded-xl border-2 ${GRADE_STYLES[detailModal.grade]?.bg} ${GRADE_STYLES[detailModal.grade]?.border} flex justify-between items-center`}>
                            <span className={`text-4xl font-black ${GRADE_STYLES[detailModal.grade]?.text}`}>{detailModal.grade}</span>
                            <span className={`text-2xl font-bold ${GRADE_STYLES[detailModal.grade]?.text}`}>{detailModal.score}%</span>
                            <span className="text-yellow-400 font-bold">+{detailModal.xpEarned} XP</span>
                        </div>
                        {detailModal.feedback?.summary && <p className="text-slate-400 text-sm leading-relaxed">{detailModal.feedback.summary}</p>}
                        {detailModal.feedback?.correct?.length > 0 && (
                            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3">
                                <p className="text-emerald-400 text-xs font-semibold mb-1">✅ {t('tests_correct')}</p>
                                {detailModal.feedback.correct.map((c, i) => <p key={i} className="text-slate-300 text-xs">• {c}</p>)}
                            </div>
                        )}
                        {detailModal.feedback?.mistakes?.length > 0 && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                                <p className="text-red-400 text-xs font-semibold mb-1">❌ {t('homework_mistakes') || "Xatolar"}</p>
                                {detailModal.feedback.mistakes.map((m, i) => <p key={i} className="text-slate-300 text-xs">• {m}</p>)}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function HomeworkHelper({ addNotification, addXP }) {
    const { t } = useLanguage();

    const TABS = [
        { id: 'solver', label: t('homework_tab_solver') || 'Masala Yech', icon: Calculator, component: SolverTab },
        { id: 'checker', label: t('homework_tab_checker') || 'Tekshirish', icon: BookOpen, component: CheckerTab },
        { id: 'practice', label: t('homework_tab_practice') || 'Amaliyot', icon: Lightbulb, component: PracticeTab },
        { id: 'explainer', label: t('homework_tab_explainer') || 'Tushuntirish', icon: MessageSquare, component: ExplainerTab },
        { id: 'photo', label: t('homework_tab_photo') || 'Foto Topshir', icon: Camera, component: PhotoSubmitTab },
    ];

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
                    <h2 className="text-white font-bold">{t('homework_ai_tutor') || "AI Uy Vazifasi Yordamchisi"}</h2>
                    <p className="text-slate-400 text-xs">Gemini 2.5 Flash · O'zbek tilida</p>
                </div>
            </div>

            {/* Tab bar */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {TABS.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    const isPhoto = tab.id === 'photo';
                    return (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-semibold transition-all
                                ${isActive
                                    ? isPhoto
                                        ? 'border-violet-500 bg-violet-600/20 text-violet-300 shadow-lg shadow-violet-500/10'
                                        : 'border-indigo-500 bg-indigo-600/20 text-indigo-300 shadow-lg shadow-indigo-500/10'
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
