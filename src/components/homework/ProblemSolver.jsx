import React, { useState } from 'react';
import { Send, Loader, Sparkles, BookOpen, Copy, Save, Trash2 } from 'lucide-react';
import { solveProblem } from '../../services/homeworkService';
import StepCard from './StepCard';
import FormulaDisplay from './FormulaDisplay';

/**
 * Masala yechuvchi komponent
 * AI yordamida fizika masalalarini yechadi
 */
export default function ProblemSolver({ setShowSettings, addNotification, theme = 'dark' }) {
    const [problemText, setProblemText] = useState('');
    const [topic, setTopic] = useState('');
    const [solution, setSolution] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const topics = [
        'Kinematika',
        'Dinamika',
        'Energiya va quvvat',
        'Molekulyar fizika',
        'Elektr toki',
        'Optika',
        'Boshqa'
    ];

    const handleSolve = async () => {
        if (!problemText.trim()) {
            addNotification?.('Masala matnini kiriting', 'error');
            return;
        }

        setIsLoading(true);
        setSolution(null);

        try {
            const result = await solveProblem(problemText, topic);

            if (result.success) {
                setSolution(result.data);
                addNotification?.('✅ Masala muvaffaqiyatli yechildi!', 'success');
            } else {
                throw new Error('Yechim olishda xatolik');
            }
        } catch (error) {
            console.error('Problem solving error:', error);
            addNotification?.('❌ Masalani yechishda xatolik yuz berdi', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setProblemText('');
        setTopic('');
        setSolution(null);
    };

    const handleCopySolution = () => {
        if (!solution) return;

        let text = `MASALA: ${problemText}\n\nYECHIM:\n\n`;

        solution.steps?.forEach((step, idx) => {
            text += `Qadam ${idx + 1}: ${step.title || ''}\n`;
            text += `${step.explanation || ''}\n`;
            if (step.formula) text += `Formula: ${step.formula}\n`;
            if (step.calculation) text += `Hisoblash: ${step.calculation}\n`;
            if (step.result) text += `Natija: ${step.result}\n`;
            text += '\n';
        });

        text += `JAVOB: ${solution.finalAnswer || ''}`;

        navigator.clipboard.writeText(text);
        addNotification?.('📋 Yechim nusxalandi!', 'success');
    };

    const getThemeClasses = () => {
        if (theme === 'white') {
            return {
                bg: 'bg-gray-50',
                card: 'bg-white border-gray-200',
                input: 'bg-white border-gray-300 text-gray-900',
                text: 'text-gray-900',
                textMuted: 'text-gray-600'
            };
        }
        return {
            bg: 'bg-slate-900',
            card: 'bg-slate-800 border-slate-700',
            input: 'bg-slate-900 border-slate-700 text-white',
            text: 'text-white',
            textMuted: 'text-slate-400'
        };
    };

    const themeClasses = getThemeClasses();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className={`text-2xl font-bold ${themeClasses.text} flex items-center gap-2`}>
                        <Sparkles className="text-blue-400" />
                        Masala Yechuvchi
                    </h2>
                    <p className={themeClasses.textMuted}>AI yordamida fizika masalalarini qadam-baqadam yeching</p>
                </div>
            </div>

            {/* Input Section */}
            <div className={`${themeClasses.card} border rounded-2xl p-6 space-y-4`}>
                {/* Topic Selector */}
                <div>
                    <label className={`block text-sm font-medium ${themeClasses.textMuted} mb-2`}>
                        Mavzu (ixtiyoriy)
                    </label>
                    <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className={`w-full ${themeClasses.input} border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors`}
                    >
                        <option value="">Mavzuni tanlang...</option>
                        {topics.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>

                {/* Problem Input */}
                <div>
                    <label className={`block text-sm font-medium ${themeClasses.textMuted} mb-2 flex items-center gap-2`}>
                        <BookOpen size={16} />
                        Masala matni
                    </label>
                    <textarea
                        value={problemText}
                        onChange={(e) => setProblemText(e.target.value)}
                        placeholder="Masala matnini kiriting... Masalan: Massasi 5 kg bo'lgan jismga 10 N kuch ta'sir etsa, uning tezlanishi qancha bo'ladi?"
                        rows={6}
                        className={`w-full ${themeClasses.input} border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors resize-none`}
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={handleSolve}
                        disabled={isLoading || !problemText.trim()}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
                    >
                        {isLoading ? (
                            <>
                                <Loader size={20} className="animate-spin" />
                                Yechilmoqda...
                            </>
                        ) : (
                            <>
                                <Send size={20} />
                                Yechish
                            </>
                        )}
                    </button>

                    <button
                        onClick={handleClear}
                        disabled={isLoading}
                        className={`px-6 py-3 ${themeClasses.card} border hover:bg-slate-700 rounded-xl font-semibold transition-all disabled:opacity-50`}
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>

            {/* Solution Display */}
            {solution && (
                <div className="space-y-4 animate-fadeIn">
                    {/* Solution Header */}
                    <div className={`${themeClasses.card} border rounded-2xl p-6`}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className={`text-xl font-bold ${themeClasses.text}`}>Yechim</h3>
                            <button
                                onClick={handleCopySolution}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-colors"
                            >
                                <Copy size={16} />
                                Nusxalash
                            </button>
                        </div>

                        {solution.topic && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 text-sm">
                                <BookOpen size={14} />
                                {solution.topic}
                            </div>
                        )}
                    </div>

                    {/* Steps */}
                    {solution.steps && solution.steps.length > 0 && (
                        <div className="space-y-4">
                            {solution.steps.map((step, idx) => (
                                <StepCard key={idx} step={step} index={idx} theme={theme} />
                            ))}
                        </div>
                    )}

                    {/* Final Answer */}
                    {solution.finalAnswer && (
                        <div className="relative overflow-hidden bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-2xl p-6">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
                            <div className="relative z-10">
                                <h4 className="text-lg font-bold text-green-300 mb-2">Final Javob:</h4>
                                <p className="text-2xl font-bold text-white">{solution.finalAnswer}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Empty State */}
            {!solution && !isLoading && (
                <div className={`${themeClasses.card} border border-dashed rounded-2xl p-12 text-center`}>
                    <Sparkles size={48} className="mx-auto mb-4 text-slate-600" />
                    <p className={themeClasses.textMuted}>
                        Masala matnini kiriting va "Yechish" tugmasini bosing
                    </p>
                </div>
            )}
        </div>
    );
}
