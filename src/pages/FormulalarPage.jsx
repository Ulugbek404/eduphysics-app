import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, ArrowLeft, X, ChevronRight, FlaskConical,
  Calculator, Tag, Zap, Filter, Info, BookOpen,
  CheckCircle, Sparkles, Brain, Loader2, LayoutGrid,
  SlidersHorizontal, TrendingUp, Award, ChevronDown, ChevronUp,
  Target,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useXP } from '../contexts/XPContext';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import { explainFormula } from '../services/aiService';
import {
  FORMULA_CATEGORIES,
  FORMULAS,
  getFormulasByCategory,
  searchFormulas,
  getCategoryLabel,
  getFormulaName,
  getFormulaDescription,
  getFormulaExample,
} from '../data/formulas';
import { enrichAllFormulas } from '../data/formulasTranslations';

// --- Boyitilgan formulalar ---
const ENRICHED_FORMULAS = enrichAllFormulas(FORMULAS);

// ─── DIFFICULTY CONFIG ────────────────────────────────────────────────────────
const DIFFICULTY = {
  uz: { 1: 'Oson',   2: "O'rta",   3: 'Qiyin' },
  ru: { 1: 'Лёгкий', 2: 'Средний', 3: 'Сложный' },
  en: { 1: 'Easy',   2: 'Medium',  3: 'Hard' },
};
const DIFFICULTY_COLORS = {
  1: { bg: 'bg-emerald-500/10 dark:bg-emerald-500/20', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/20' },
  2: { bg: 'bg-amber-500/10   dark:bg-amber-500/20',   text: 'text-amber-600   dark:text-amber-400',   border: 'border-amber-500/20' },
  3: { bg: 'bg-rose-500/10    dark:bg-rose-500/20',    text: 'text-rose-600    dark:text-rose-400',    border: 'border-rose-500/20' },
};

function DifficultyBadge({ level, lang }) {
  const safeLevel = Math.max(1, Math.min(3, Number(level) || 1));
  const s = DIFFICULTY_COLORS[safeLevel] || DIFFICULTY_COLORS[1];
  const label = DIFFICULTY[lang]?.[safeLevel] || DIFFICULTY.uz[safeLevel];
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider border ${s.bg} ${s.text} ${s.border} shadow-sm backdrop-blur-sm`}>
      {label}
    </span>
  );
}

// ─── COLOR MAP ───────────────────────────────────────────────────────────────
const CAT_COLORS = {
  purple: { card: 'bg-purple-500/5', border: 'border-purple-500/20', badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
  blue:   { card: 'bg-blue-500/5',   border: 'border-blue-500/20',   badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  amber:  { card: 'bg-amber-500/5',  border: 'border-amber-500/20',  badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  teal:   { card: 'bg-teal-500/5',   border: 'border-teal-500/20',   badge: 'bg-teal-500/10 text-teal-600 dark:text-teal-400' },
  coral:  { card: 'bg-rose-500/5',   border: 'border-rose-500/20',   badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400' },
  green:  { card: 'bg-emerald-500/5', border: 'border-emerald-500/20', badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  red:    { card: 'bg-red-500/5',    border: 'border-red-500/20',    badge: 'bg-red-500/10 text-red-600 dark:text-red-400' },
  pink:   { card: 'bg-pink-500/5',   border: 'border-pink-500/20',   badge: 'bg-pink-500/10 text-pink-600 dark:text-pink-400' },
};
const getColor = (color) => CAT_COLORS[color] || CAT_COLORS.blue;

// ─── FORMULA CARD ─────────────────────────────────────────────────────────────
function FormulaCard({ formula, catColor, lang, t, onClick, isLearned }) {
  const colors = getColor(catColor);
  const name = getFormulaName(formula, lang);
  return (
    <button
      onClick={() => onClick(formula)}
      className={`w-full text-left p-5 theme-card-premium rounded-2xl relative overflow-hidden group`}
    >
      {/* Decorative accent */}
      <div className={`absolute top-0 right-0 w-24 h-24 ${colors.card} rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-opacity-20 transition-all`} />

      {/* Learned indicator */}
      {isLearned && (
        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center z-10 shadow-sm">
          <CheckCircle size={14} className="text-emerald-500" />
        </div>
      )}

      {/* Header */}
      <div className="relative z-10 flex flex-col gap-3 mb-4">
        <div className="flex items-start justify-between gap-3 pr-8">
           <h3 className={`font-black text-base sm:text-[17px] leading-tight tracking-tight transition-colors
            ${isLearned ? 'text-emerald-600 dark:text-emerald-400' : 'theme-text group-hover:text-teal-600 dark:group-hover:text-teal-400'}`}>
            {name}
          </h3>
          <DifficultyBadge level={formula.difficulty} lang={lang} />
        </div>
        
        {lang !== 'uz' && (
          <p className="theme-text-secondary text-[11px] font-bold uppercase tracking-widest opacity-60 -mt-2">
            {formula.name}
          </p>
        )}
      </div>

      {/* Formula Display Box */}
      <div className="relative z-10 bg-slate-500/5 dark:bg-slate-900/50 rounded-xl px-4 py-3 mb-4 border border-teal-500/10 group-hover:border-teal-500/30 transition-all flex items-center justify-center min-h-[60px]">
        <code className="text-teal-600 dark:text-teal-300 font-mono text-lg sm:text-xl font-black tracking-wider text-center">
          {formula.formula}
        </code>
      </div>

      {/* Variables preview */}
      <div className="relative z-10 flex flex-wrap gap-1.5 mb-5">
        {formula.variables.slice(0, 3).map(v => (
          <span key={v.symbol} className={`px-2 py-0.5 rounded-lg text-[11px] font-bold border ${colors.badge} ${colors.border} shadow-sm`}>
            {v.symbol} · {v.unit}
          </span>
        ))}
        {formula.variables.length > 3 && (
          <span className="px-2 py-0.5 rounded-lg text-[10px] font-black theme-muted uppercase tracking-tighter self-center">
            +{formula.variables.length - 3} more
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t theme-border">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-yellow-500/10 flex items-center justify-center">
            <Zap size={12} className="text-yellow-500" />
          </div>
          <span className="text-yellow-600 dark:text-yellow-500 text-xs font-black">+{formula.xp_reward} XP</span>
        </div>
        
        <div className="flex items-center gap-1">
            {isLearned ? (
                <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-black uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle size={12} /> {lang === 'ru' ? 'Изучено' : lang === 'en' ? 'Learned' : "O'rganildi"}
                </span>
            ) : (
                <span className="text-teal-600 dark:text-teal-400 text-[11px] font-black uppercase tracking-wider group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    {t('formulas_detail_btn') || 'Batafsil'} <ChevronRight size={14} strokeWidth={3} />
                </span>
            )}
        </div>
      </div>
    </button>
  );
}

// ─── AI EXPLANATION MODAL ─────────────────────────────────────────────────────
function AIExplainModal({ formula, lang, onClose }) {
  const [status, setStatus]         = useState('idle'); // idle | loading | done | error
  const [explanation, setExplanation] = useState('');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    explainFormula(formula, lang).then(res => {
      if (cancelled) return;
      if (res.success) { setExplanation(res.explanation); setStatus('done'); }
      else { setStatus('error'); }
    });
    return () => { cancelled = true; };
  }, [formula, lang]);

  // Format markdown-like bold
  const renderText = (text) =>
    text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
      i % 2 === 1
        ? <strong key={i} className="theme-text font-black">{part}</strong>
        : <span key={i} className="opacity-90">{part}</span>
    );

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
      
      <div className="w-full sm:max-w-lg theme-card-premium sm:rounded-3xl rounded-t-3xl border theme-border shadow-2xl relative z-10 max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b theme-border flex items-center justify-between bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent" />
              <Brain size={24} className="text-teal-600 dark:text-teal-400 relative z-10" />
            </div>
            <div>
              <p className="theme-text font-black text-sm uppercase tracking-[0.1em]">
                {lang === 'ru' ? 'Объяснение ИИ' : lang === 'en' ? 'AI Explanation' : 'AI Tushuntirish'}
              </p>
              <p className="text-teal-600 dark:text-teal-400 font-mono text-[11px] font-black opacity-60">
                {formula.formula}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 rounded-xl theme-text-secondary hover:theme-text hover:bg-slate-500/10 transition-all border border-transparent hover:border-theme-border">
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          {status === 'loading' && (
            <div className="flex flex-col items-center py-16 gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl bg-teal-500/5 border-2 border-teal-500/10 flex items-center justify-center">
                  <Loader2 size={32} className="text-teal-500 animate-spin" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center animate-bounce">
                  <Sparkles size={16} className="text-amber-500" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="theme-text font-black text-lg">
                  {lang === 'ru' ? 'Gemini AI думает...' : lang === 'en' ? 'Gemini AI is thinking...' : 'Gemini AI o\'ylamoqda...'}
                </p>
                <p className="theme-text-secondary text-xs font-bold opacity-60 max-w-[240px] mx-auto uppercase tracking-widest leading-loose">
                  {lang === 'ru' ? 'Анализ формулы и поиск примеров' : lang === 'en' ? 'Analyzing formula and searching for examples' : 'Formulani tahlil qilish va misollar qidirish'}
                </p>
              </div>
            </div>
          )}
          
          {status === 'done' && (
            <div className="space-y-6">
              <div className="theme-card-premium p-6 border theme-border rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                <p className="theme-text text-[15px] leading-relaxed whitespace-pre-wrap relative z-10 font-medium">
                  {renderText(explanation)}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t theme-border">
                <p className="theme-text-secondary text-[10px] font-black uppercase tracking-widest opacity-40 flex items-center gap-2">
                    <Sparkles size={12} className="text-amber-500" />
                    Powered by Gemini AI
                </p>
                <div className="flex gap-1">
                    {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-teal-500/30" />)}
                </div>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-rose-500 border border-rose-500/20">
                <X size={32} />
              </div>
              <p className="theme-text font-black text-lg mb-3">
                {lang === 'ru' ? 'Произошла ошибка' : lang === 'en' ? 'Something went wrong' : 'Xatolik yuz berdi'}
              </p>
              <p className="theme-text-secondary text-sm mb-8 max-w-[200px] mx-auto">
                {lang === 'ru' ? 'ИИ не смог ответить. Проверьте подключение.' : lang === 'en' ? 'AI could not respond. Check your connection.' : 'AI javob bera olmadi. Internet aloqasini tekshiring.'}
              </p>
              <button 
                onClick={() => { 
                    setStatus('loading'); 
                    explainFormula(formula, lang).then(res => { 
                        if (res.success) { setExplanation(res.explanation); setStatus('done'); } 
                        else setStatus('error'); 
                    }); 
                }}
                className="px-8 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-teal-500/20 active:scale-95"
              >
                {lang === 'ru' ? 'Повторить' : lang === 'en' ? 'Try Again' : 'Qayta urinish'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── FORMULA DETAIL MODAL ─────────────────────────────────────────────────────
function FormulaModal({ formula, lang, t, onClose, isLearned, onMarkLearned, learnLoading }) {
  const [calcValues, setCalcValues] = useState(formula.calculator.defaultValues || {});
  const [calcResult, setCalcResult] = useState(null);
  const [calcError,  setCalcError]  = useState('');
  const [showAI,     setShowAI]     = useState(false);

  const catInfo  = FORMULA_CATEGORIES.find(c => c.id === formula.category);
  const colors   = getColor(catInfo?.color || 'blue');
  const name     = getFormulaName(formula, lang);
  const desc     = getFormulaDescription(formula, lang);
  const example  = getFormulaExample(formula, lang);
  const catLabel = getCategoryLabel(catInfo || {}, lang);

  const runCalculator = useCallback(() => {
    try {
      setCalcError('');
      const args = formula.calculator.inputs.map(key => {
        const val = parseFloat(calcValues[key]);
        if (isNaN(val)) throw new Error(
          lang === 'ru' ? `Введите значение ${key}` :
          lang === 'en' ? `Enter value for ${key}` :
          `${key} qiymatini kiriting`
        );
        return val;
      });
      // eslint-disable-next-line no-new-func
      const fn  = new Function('...args', `return (${formula.calculator.formulaFn})(...args)`);
      const res = fn(...args);
      if (!isFinite(res)) throw new Error(
        lang === 'ru' ? 'Неверные значения' : lang === 'en' ? 'Invalid values' : "Noto'g'ri qiymatlar"
      );
      setCalcResult(Math.round(res * 10000) / 10000);
    } catch (e) {
      setCalcError(e.message || (t('formulas_calc_error') || 'Xatolik'));
      setCalcResult(null);
    }
  }, [formula, calcValues, lang, t]);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />

        <div className="w-full sm:max-w-2xl theme-card-premium sm:rounded-3xl rounded-t-3xl border theme-border shadow-2xl relative z-10 max-h-[92vh] flex flex-col overflow-hidden">

          {/* Header */}
          <div className="px-6 py-5 border-b theme-border flex items-start justify-between bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${colors.badge} border ${colors.border} shadow-sm backdrop-blur-sm`}>
                  {catInfo?.icon} {catLabel}
                </span>
                <DifficultyBadge level={formula.difficulty} lang={lang} />
                {isLearned && (
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-sm flex items-center gap-1.5 backdrop-blur-sm">
                    <CheckCircle size={12} strokeWidth={3} /> {lang === 'ru' ? 'Изучено' : lang === 'en' ? 'Learned' : "O'rganildi"}
                  </span>
                )}
              </div>
              <h2 className="theme-text text-xl sm:text-2xl font-black leading-tight tracking-tight">{name}</h2>
              {lang !== 'uz' && <p className="theme-text-secondary text-[11px] font-bold uppercase tracking-widest opacity-40 mt-1">{formula.name}</p>}
            </div>
            <button onClick={onClose} className="p-2.5 rounded-xl theme-text-secondary hover:theme-text hover:bg-slate-500/10 transition-all border border-transparent hover:border-theme-border flex-shrink-0">
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto custom-scrollbar space-y-8 flex-1">

            {/* Formula display */}
            <div className="theme-card-premium rounded-3xl p-8 sm:p-10 border theme-border text-center shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-teal-500/10 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full -ml-16 -mb-16 blur-2xl group-hover:bg-indigo-500/10 transition-all duration-500" />
                
                <p className="theme-text-secondary text-[10px] mb-6 tracking-[0.3em] font-black uppercase opacity-40">
                    {t('formulas_formula_label') || 'Asosiy Formula'}
                </p>
                <div className="relative z-10">
                    <code className="text-teal-600 dark:text-teal-300 font-mono text-4xl sm:text-5xl font-black tracking-widest drop-shadow-[0_4px_12px_rgba(20,184,166,0.2)]">
                        {formula.formula}
                    </code>
                </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setShowAI(true)}
                className="flex items-center justify-center gap-3 py-4 rounded-2xl
                  bg-indigo-500/10 border border-indigo-500/20
                  hover:bg-indigo-500/20 hover:border-indigo-500/40
                  text-indigo-600 dark:text-indigo-400 font-black text-[11px] uppercase tracking-widest transition-all shadow-sm active:scale-95 group"
              >
                <Brain size={18} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                {lang === 'ru' ? 'Объяснение ИИ' : lang === 'en' ? 'AI Explanation' : 'AI Tushuntirish'}
              </button>

              <button
                onClick={() => onMarkLearned(formula)}
                disabled={isLearned || learnLoading}
                className={`flex items-center justify-center gap-3 py-4 rounded-2xl
                  font-black text-[11px] uppercase tracking-widest transition-all border shadow-lg active:scale-95
                  ${isLearned
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 cursor-default shadow-none opacity-60'
                    : 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 border-teal-500/30 text-white shadow-teal-500/20 group'
                  }`}
              >
                {learnLoading
                  ? <Loader2 size={18} className="animate-spin" />
                  : isLearned
                    ? <><CheckCircle size={18} strokeWidth={3} /> {lang === 'ru' ? 'Изучено' : lang === 'en' ? 'Learned' : "O'rganildi"}</>
                    : <><BookOpen size={18} strokeWidth={2.5} className="group-hover:-rotate-12 transition-transform" /> {lang === 'ru' ? 'Я выучил' : lang === 'en' ? 'Learned' : "O'rgandim"} (+{formula.xp_reward} XP)</>
                }
              </button>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 gap-6">
                <div className="theme-card-premium p-6 rounded-2xl border theme-border">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <Info size={16} strokeWidth={2.5} />
                        </div>
                        <p className="theme-text font-black text-xs uppercase tracking-widest opacity-60">
                            {t('formulas_description_label') || 'Tavsif va Ma\'lumot'}
                        </p>
                    </div>
                    <p className="theme-text text-[15px] leading-relaxed font-medium opacity-90">{desc}</p>
                    {example && (
                        <div className="mt-4 pt-4 border-t theme-border">
                            <p className="theme-text-secondary text-[11px] font-black uppercase tracking-widest opacity-40 mb-2">📌 {t('formulas_example_label') || 'Misol'}:</p>
                            <p className="theme-text-secondary text-sm italic font-medium leading-relaxed">"{example}"</p>
                        </div>
                    )}
                </div>

                {/* Variables */}
                <div>
                  <p className="theme-text-secondary text-[11px] font-black tracking-[0.2em] uppercase opacity-40 mb-5 px-1">
                    {t('formulas_variables_label') || "O'zgaruvchilar Izohi"}
                  </p>
                  <div className="space-y-4">
                    {formula.variables.map(v => (
                      <div key={v.symbol} className="group flex items-start gap-4 p-5 theme-card-premium rounded-2xl border theme-border hover:bg-slate-500/5 transition-all shadow-sm">
                        <span className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl ${colors.badge} border ${colors.border} shadow-inner group-hover:scale-110 transition-transform`}>
                          {v.symbol}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1.5">
                            <span className="theme-text font-black text-base">{v.name}</span>
                            <span className="text-[10px] font-black px-2 py-0.5 bg-slate-500/10 rounded-lg border theme-border theme-text-secondary uppercase tracking-tight">{v.unit}</span>
                            {v.constant && (
                              <span className="text-[9px] font-black px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-lg uppercase tracking-widest">
                                {t('formulas_constant_label') || 'Doimiy'}
                              </span>
                            )}
                          </div>
                          <p className="theme-text-secondary text-xs leading-relaxed font-medium opacity-70">{v.description}</p>
                          {v.constant && v.value !== undefined && (
                            <div className="mt-3 inline-flex items-center px-3 py-1 bg-amber-500/5 border border-amber-500/10 rounded-lg">
                                <p className="text-amber-600 dark:text-amber-500 text-sm font-mono font-black">{v.symbol} = {v.value}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calculator */}
                <div className="theme-card-premium rounded-3xl p-6 sm:p-8 border-2 border-teal-500/10 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                  
                  <div className="flex items-center gap-3 mb-8 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 shadow-inner">
                        <Calculator size={20} strokeWidth={2.5} />
                    </div>
                    <div>
                        <p className="theme-text font-black text-sm uppercase tracking-widest">
                        {t('formulas_calc_title') || 'Interaktiv Kalkulyator'}
                        </p>
                        <p className="theme-text-secondary text-[10px] font-bold uppercase opacity-40 tracking-[0.1em]">Instant calculation</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 relative z-10">
                    {formula.calculator.inputs.map(key => {
                      const varInfo = formula.variables.find(v =>
                        v.symbol === key || v.symbol === key.replace('0', '₀')
                      );
                      return (
                        <div key={key} className="space-y-2.5">
                          <label className="block theme-text-secondary text-[11px] font-black uppercase tracking-widest opacity-50 px-1">
                            {varInfo ? varInfo.name : key} {varInfo?.unit && `(${varInfo.unit})`}
                          </label>
                          <div className="relative group">
                            <input
                                type="number"
                                value={calcValues[key] ?? ''}
                                onChange={e => { setCalcValues(p => ({ ...p, [key]: e.target.value })); setCalcResult(null); }}
                                className="w-full theme-input-bg border-2 theme-border rounded-2xl px-5 py-4 theme-text text-base font-black font-mono
                                focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all placeholder:opacity-20 shadow-inner"
                                placeholder="0.00"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded-lg bg-slate-500/10 text-[11px] font-black theme-text-secondary font-mono tracking-tighter opacity-40 group-focus-within:opacity-100 transition-opacity">
                                {varInfo?.symbol || key}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button onClick={runCalculator}
                    className="w-full py-5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-black text-[13px] uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-xl shadow-teal-500/30 flex items-center justify-center gap-3 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <Calculator size={18} strokeWidth={2.5} />
                    {t('formulas_calc_btn') || 'Hisoblash'}
                  </button>
                  
                  {calcError && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 flex items-center gap-3 text-rose-500 bg-rose-500/5 border border-rose-500/10 rounded-2xl py-4 px-5"
                    >
                        <X size={18} strokeWidth={3} className="flex-shrink-0" />
                        <p className="text-[13px] font-black uppercase tracking-tight">{calcError}</p>
                    </motion.div>
                  )}
                  
                  {calcResult !== null && !calcError && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-8 theme-card-premium border-2 border-teal-500/20 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent" />
                      <p className="text-teal-600 dark:text-teal-400 text-[10px] mb-3 tracking-[0.3em] font-black uppercase opacity-60 relative z-10">{formula.calculator.resultLabel}</p>
                      <div className="flex items-baseline justify-center gap-3 relative z-10">
                        <span className="theme-text font-black text-4xl sm:text-5xl tracking-tight drop-shadow-sm">{calcResult}</span>
                        <span className="theme-text-secondary font-black text-lg opacity-40">{formula.calculator.resultUnit}</span>
                      </div>
                    </motion.div>
                  )}
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Modal */}
      {showAI && <AIExplainModal formula={formula} lang={lang} onClose={() => setShowAI(false)} />}
    </>
  );
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
function ProgressStats({ learnedIds, total, lang }) {
  const count = learnedIds.size;
  const pct   = total > 0 ? Math.round((count / total) * 100) : 0;
  
  const lvlNames = {
    uz: ['Boshlang\'ich', 'Rivojlanmoqda', 'Yaxshi', 'Ustoz darajasi!'],
    ru: ['Начинающий', 'Развивающийся', 'Хорошо', 'Уровень мастера!'],
    en: ['Beginner', 'Developing', 'Good', 'Master Level!']
  };
  const lArr = lvlNames[lang] || lvlNames.uz;
  const lvl  = pct < 20 ? lArr[0] : pct < 50 ? lArr[1] : pct < 80 ? lArr[2] : lArr[3];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {/* Stats 1 */}
      <div className="theme-card-premium p-5 rounded-2xl border theme-border flex items-center gap-4 group overflow-hidden relative">
        <div className="absolute top-0 right-0 w-16 h-16 bg-teal-500/5 rounded-full -mr-8 -mt-8 blur-xl" />
        <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400 border border-teal-500/20 group-hover:scale-110 transition-transform relative z-10">
          <BookOpen size={24} strokeWidth={2.5} />
        </div>
        <div className="relative z-10">
          <p className="theme-text-secondary text-[10px] font-black uppercase tracking-widest opacity-60 mb-0.5">
            {lang === 'ru' ? 'Изучено' : lang === 'en' ? 'Learned' : "O'rganildi"}
          </p>
          <div className="flex items-baseline gap-1">
            <p className="theme-text font-black text-2xl leading-none">{count}</p>
            <p className="theme-text-secondary text-xs opacity-40 font-bold">/ {total}</p>
          </div>
        </div>
      </div>

      {/* Stats 2 */}
      <div className="theme-card-premium p-5 rounded-2xl border theme-border flex items-center gap-4 group overflow-hidden relative">
        <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/5 rounded-full -mr-8 -mt-8 blur-xl" />
        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform relative z-10">
          <Award size={24} strokeWidth={2.5} />
        </div>
        <div className="relative z-10">
          <p className="theme-text-secondary text-[10px] font-black uppercase tracking-widest opacity-60 mb-0.5">
            {lang === 'ru' ? 'Статус' : lang === 'en' ? 'Rank' : 'Daraja'}
          </p>
          <p className="theme-text font-black text-lg leading-none truncate max-w-[120px]">{lvl}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="theme-card-premium p-5 rounded-2xl border theme-border flex flex-col justify-center group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-full -mr-12 -mt-12 blur-2xl" />
        <div className="flex items-center justify-between mb-2 relative z-10">
            <p className="theme-text-secondary text-[10px] font-black uppercase tracking-widest opacity-60">
                {lang === 'ru' ? 'Прогресс' : lang === 'en' ? 'Overall Progress' : 'Umumiy Progress'}
            </p>
            <span className="text-teal-600 dark:text-teal-400 font-black text-sm">{pct}%</span>
        </div>
        <div className="h-2.5 bg-slate-500/10 rounded-full overflow-hidden p-0.5 border theme-border relative z-10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 shadow-[0_0_12px_rgba(20,184,166,0.3)]"
          />
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR CATEGORY LIST ────────────────────────────────────────────────────
function SidebarCategories({ selected, onSelect, lang, learnedIds }) {
  const total = ENRICHED_FORMULAS.length;
  const learnedTotal = ENRICHED_FORMULAS.filter(f => learnedIds.has(f.id)).length;

  return (
    <div className="space-y-2">
      <button
        onClick={() => onSelect('all')}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all
          ${selected === 'all'
            ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
            : 'theme-text-secondary hover:theme-text hover:bg-slate-500/5'}`}
      >
        <span className="flex items-center gap-3">
          <LayoutGrid size={16} strokeWidth={2.5} />
          {lang === 'ru' ? 'Все' : lang === 'en' ? 'All' : 'Barchasi'}
        </span>
        <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${selected === 'all' ? 'bg-white/20 text-white' : 'bg-slate-500/10 theme-text-secondary'}`}>
          {total}
        </span>
      </button>

      <div className="pt-2 pb-1">
          <p className="theme-text-secondary text-[10px] font-black uppercase tracking-[0.2em] px-4 opacity-40">
            {lang === 'ru' ? 'КАТЕГОРИИ' : lang === 'en' ? 'CATEGORIES' : 'KATEGORIYALAR'}
          </p>
      </div>

      {FORMULA_CATEGORIES.map(cat => {
        const catFormulas = getFormulasByCategory(cat.id);
        if (catFormulas.length === 0) return null;
        const col = getColor(cat.color);
        const isActive = selected === cat.id;
        const catLearned = catFormulas.filter(f => learnedIds.has(f.id)).length;
        const catPct = Math.round((catLearned / catFormulas.length) * 100);

        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[13px] font-bold transition-all group
              ${isActive
                ? `${col.badge} border ${col.border} shadow-sm ring-2 ring-current ring-opacity-5`
                : 'theme-text-secondary hover:theme-text hover:bg-slate-500/5'}`}
          >
            <span className="flex items-center gap-3 min-w-0">
              <span className="text-lg flex-shrink-0 group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="truncate">{getCategoryLabel(cat, lang)}</span>
            </span>
            <div className="flex items-center gap-2 flex-shrink-0 ml-1">
              {catPct > 0 && (
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              )}
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${isActive ? 'bg-current bg-opacity-10' : 'bg-slate-500/10 theme-text-secondary'}`}>
                {catFormulas.length}
              </span>
            </div>
          </button>
        );
      })}

      {/* Progress summary */}
      <div className="mt-6 pt-6 border-t theme-border px-4">
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest mb-3">
          <span className="theme-text-secondary opacity-60">
            {lang === 'ru' ? 'Прогресс' : lang === 'en' ? 'Progress' : 'Progress'}
          </span>
          <span className="text-teal-600 dark:text-teal-400">{learnedTotal}/{total}</span>
        </div>
        <div className="bg-slate-500/10 rounded-full h-2 overflow-hidden p-0.5 border theme-border">
          <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 shadow-[0_0_10px_rgba(20,184,166,0.3)] transition-all duration-700"
            style={{ width: `${Math.round((learnedTotal / total) * 100)}%` }} />
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function FormulalarPage() {
  const navigate         = useNavigate();
  const { t, language }  = useLanguage();
  const { user }         = useAuth();
  const { addXP }        = useXP();
  const lang             = language || 'uz';

  const [searchQuery,       setSearchQuery]       = useState('');
  const [selectedCategory,  setSelectedCategory]  = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState(0);
  const [selectedFormula,   setSelectedFormula]   = useState(null);
  const [learnedIds,        setLearnedIds]         = useState(new Set());
  const [learnLoading,      setLearnLoading]       = useState(false);
  const [sidebarOpen,       setSidebarOpen]        = useState(false);
  const [filtersOpen,       setFiltersOpen]        = useState(false);

  // Load learned formulas from Firestore
  useEffect(() => {
    if (!user?.uid) return;
    getDoc(doc(db, 'users', user.uid)).then(snap => {
      if (snap.exists()) {
        const data = snap.data();
        const ids  = data.learnedFormulas || [];
        setLearnedIds(new Set(ids));
      }
    }).catch(() => {});
  }, [user?.uid]);

  // Mark formula as learned
  const handleMarkLearned = useCallback(async (formula) => {
    if (!user?.uid || learnedIds.has(formula.id) || learnLoading) return;
    setLearnLoading(true);
    try {
      // 1. Optimistic UI update
      setLearnedIds(prev => new Set([...prev, formula.id]));

      // 2. Firestore — learnedFormulas array ga qo'shish
      await updateDoc(doc(db, 'users', user.uid), {
        learnedFormulas: arrayUnion(formula.id),
      });

      // 3. XP qo'shish + Mission trigger
      await addXP(formula.xp_reward || 25, 'FORMULA_LEARNED');

    } catch (err) {
      console.error('markLearned error:', err);
      // Rollback on error
      setLearnedIds(prev => {
        const next = new Set(prev);
        next.delete(formula.id);
        return next;
      });
    } finally {
      setLearnLoading(false);
    }
  }, [user?.uid, learnedIds, learnLoading, addXP]);

  // Filtered formulas
  const filtered = useMemo(() => {
    let list = searchQuery.trim()
      ? (() => {
          const ids = new Set(searchFormulas(searchQuery).map(f => f.id));
          return ENRICHED_FORMULAS.filter(f => ids.has(f.id));
        })()
      : ENRICHED_FORMULAS;

    if (selectedCategory !== 'all') list = list.filter(f => f.category === selectedCategory);
    if (selectedDifficulty > 0)     list = list.filter(f => f.difficulty === selectedDifficulty);
    return list;
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const handleClearFilters = () => {
    setSearchQuery(''); setSelectedCategory('all'); setSelectedDifficulty(0);
  };
  const hasFilters = searchQuery || selectedCategory !== 'all' || selectedDifficulty > 0;

  const diffLabels = [
    { val: 0, label: lang === 'ru' ? 'Все' : lang === 'en' ? 'All' : 'Barchasi' },
    { val: 1, label: lang === 'ru' ? '⭐ Лёгкий' : lang === 'en' ? '⭐ Easy' : '⭐ Oson' },
    { val: 2, label: lang === 'ru' ? '⭐⭐ Средний' : lang === 'en' ? '⭐⭐ Medium' : "⭐⭐ O'rta" },
    { val: 3, label: lang === 'ru' ? '⭐⭐⭐ Сложный' : lang === 'en' ? '⭐⭐⭐ Hard' : '⭐⭐⭐ Qiyin' },
  ];

  return (
    <div className="h-screen overflow-hidden theme-bg-premium theme-text font-sans flex flex-col">

      {/* ── STICKY HEADER ── */}
      <div className="flex-shrink-0 z-30 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b theme-border sticky top-0">
        <div className="max-w-[1600px] mx-auto px-4 py-5 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            
            {/* Left side: Back + Title */}
            <div className="flex items-center gap-5 min-w-0">
              <button 
                onClick={() => navigate(-1)} 
                className="w-12 h-12 rounded-2xl theme-text-secondary hover:theme-text hover:bg-slate-500/10 transition-all flex items-center justify-center flex-shrink-0 border theme-border shadow-sm group bg-white/50 dark:bg-slate-800/50"
              >
                <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-teal-500 to-emerald-500 shadow-[0_0_12px_rgba(20,184,166,0.4)]" />
                  <h1 className="theme-text font-black text-2xl lg:text-3xl tracking-tight leading-none truncate">
                    {t('formulas_page_title') || (lang === 'ru' ? 'Формулы' : lang === 'en' ? 'Formulas' : 'Formulalar')}
                  </h1>
                </div>
                <div className="flex items-center gap-2 theme-text-secondary text-[11px] font-black uppercase tracking-[0.15em] opacity-50 ml-4">
                  <span>{ENRICHED_FORMULAS.length} {lang === 'ru' ? 'формул' : lang === 'en' ? 'formulas' : 'formula'}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500/40" />
                  <span className="text-emerald-600 dark:text-emerald-400">{learnedIds.size} {lang === 'ru' ? 'изучено' : lang === 'en' ? 'learned' : "o'rganildi"}</span>
                </div>
              </div>
            </div>

            {/* Center/Right: Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-xl relative group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 theme-text-secondary group-focus-within:text-teal-500 transition-colors pointer-events-none" />
              <input
                type="text" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('formulas_search_placeholder') || (lang === 'ru' ? 'Поиск формул...' : lang === 'en' ? 'Search formulas...' : 'Formula qidirish...')}
                className="w-full pl-12 pr-10 py-3.5 theme-card border theme-border rounded-2xl theme-text text-sm font-bold
                  focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all placeholder:opacity-30 shadow-inner"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 theme-text-secondary hover:theme-text transition-colors">
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 md:hidden">
               <button
                onClick={() => setSidebarOpen(true)}
                className="w-10 h-10 rounded-xl border theme-border theme-text-secondary hover:theme-text flex items-center justify-center relative bg-slate-500/5 transition-all"
              >
                <SlidersHorizontal size={20} />
                {selectedCategory !== 'all' && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-teal-500 border-2 theme-bg rounded-full shadow-sm shadow-teal-500/50"></span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search - only on small screens */}
          <div className="mt-4 relative md:hidden group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 theme-text-secondary group-focus-within:text-teal-500 transition-colors pointer-events-none" />
            <input
              type="text" 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('formulas_search_placeholder') || 'Formula qidirish...'}
              className="w-full pl-12 pr-10 py-3.5 theme-card border theme-border rounded-2xl theme-text text-sm font-bold
                focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all placeholder:opacity-30"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 theme-text-secondary hover:theme-text transition-colors">
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── BODY: Sidebar + Content ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── SIDEBAR (Desktop) ── */}
        <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 border-r theme-border theme-sidebar overflow-y-auto custom-scrollbar p-4 gap-4">
          <SidebarCategories
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            lang={lang}
            learnedIds={learnedIds}
          />
        </aside>

        {/* ── MOBILE SIDEBAR OVERLAY ── */}
        {sidebarOpen && (
          <>
            <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <aside className="fixed inset-y-0 left-0 z-50 w-72 theme-sidebar border-r theme-border overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4 lg:hidden">
              <div className="flex items-center justify-between mb-2">
                <p className="theme-text font-bold text-lg">
                  {lang === 'ru' ? 'Категории' : lang === 'en' ? 'Categories' : 'Kategoriyalar'}
                </p>
                <button onClick={() => setSidebarOpen(false)} className="p-2 -mr-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <SidebarCategories
                selected={selectedCategory}
                onSelect={cat => { setSelectedCategory(cat); setSidebarOpen(false); }}
                lang={lang}
                learnedIds={learnedIds}
              />
            </aside>
          </>
        )}

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 overflow-y-auto custom-scrollbar pb-24 lg:pb-8">
          <div className="max-w-5xl mx-auto px-4 py-5 lg:px-6">

            {/* Progress stats */}
            {user && (
              <ProgressStats
                learnedIds={learnedIds}
                total={ENRICHED_FORMULAS.length}
                lang={lang}
              />
            )}

            {/* Difficulty filter + clear */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <p className="theme-text-secondary text-[11px] font-black uppercase tracking-widest opacity-40">
                  {t('formulas_difficulty_label') || 'Saralash'}:
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {diffLabels.map(d => (
                    <button key={d.val} onClick={() => setSelectedDifficulty(d.val)}
                      className={`px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider border transition-all shadow-sm ${
                        selectedDifficulty === d.val
                          ? 'bg-teal-500 text-white border-teal-400 shadow-teal-500/20'
                          : 'theme-card theme-text-secondary border-theme-border hover:theme-text hover:border-slate-500/50'
                      }`}>
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {hasFilters && (
                <button
                    onClick={handleClearFilters}
                    className="flex items-center gap-2 text-rose-500 hover:text-rose-400 text-[11px] font-black uppercase tracking-widest transition-colors px-3 py-1.5 rounded-xl hover:bg-rose-500/5"
                >
                    <X size={14} strokeWidth={3} />
                    {lang === 'ru' ? 'Сбросить' : lang === 'en' ? 'Reset' : 'Tozalash'}
                </button>
              )}
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b theme-border">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 rounded-full bg-teal-500" />
                <p className="theme-text-secondary text-sm font-bold">
                    <span className="theme-text font-black">{filtered.length}</span> {lang === 'ru' ? 'результатов' : lang === 'en' ? 'results' : 'ta natija'}
                </p>
              </div>
            </div>
            {/* Formula grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(formula => {
                  const catInfo = FORMULA_CATEGORIES.find(c => c.id === formula.category);
                  return (
                    <FormulaCard
                      key={formula.id}
                      formula={formula}
                      catColor={catInfo?.color || 'blue'}
                      lang={lang}
                      t={t}
                      onClick={setSelectedFormula}
                      isLearned={learnedIds.has(formula.id)}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-24 theme-card-premium rounded-3xl border theme-border">
                <div className="w-20 h-20 bg-slate-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FlaskConical size={40} className="theme-text-secondary opacity-30" />
                </div>
                <h3 className="theme-text font-black text-xl mb-2">
                  {t('formulas_not_found_title') || 'Formula topilmadi'}
                </h3>
                <p className="theme-text-secondary text-sm mb-8 opacity-60">
                  {t('formulas_not_found_desc') || "Boshqa kalit so'z yoki kategoriya tanlang"}
                </p>
                <button onClick={handleClearFilters}
                  className="px-8 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-teal-500/20 active:scale-95">
                  {t('formulas_clear_filter') || 'Filterni tozalash'}
                </button>
              </div>
            )}

            {/* Coming soon */}
            {ENRICHED_FORMULAS.length < 200 && (
              <div className="mt-8 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center">
                <p className="text-indigo-300 text-sm font-semibold">
                  🚀 {200 - ENRICHED_FORMULAS.length}+ {t('formulas_coming_soon') || "ta formula tez orada qo'shiladi!"}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── FORMULA DETAIL MODAL ── */}
      {selectedFormula && (
        <FormulaModal
          formula={selectedFormula}
          lang={lang}
          t={t}
          onClose={() => setSelectedFormula(null)}
          isLearned={learnedIds.has(selectedFormula.id)}
          onMarkLearned={handleMarkLearned}
          learnLoading={learnLoading}
        />
      )}
    </div>
  );
}
