import React, { useState } from 'react';
import { BookOpen, Calculator, Lightbulb, MessageSquare } from 'lucide-react';
import ProblemSolver from './ProblemSolver';

/**
 * Asosiy Homework Helper komponenti
 * 4 ta rejimni boshqaradi
 */
export default function HomeworkHelper({ apiKey, setShowSettings, addNotification, addXP, theme = 'dark' }) {
    const [activeMode, setActiveMode] = useState('solver');

    const modes = [
        { id: 'solver', name: 'Masala Yechish', icon: Calculator, description: 'AI yordamida masala yeching' },
        { id: 'checker', name: 'Tekshirish', icon: BookOpen, description: 'Yechimingizni tekshiring', disabled: true },
        { id: 'practice', name: 'Amaliyot', icon: Lightbulb, description: 'Amaliyot masalalari', disabled: true },
        { id: 'explainer', name: 'Tushuntirish', icon: MessageSquare, description: 'Tushunchalarni o\'rganing', disabled: true }
    ];

    const getThemeClasses = () => {
        if (theme === 'white') {
            return {
                bg: 'bg-gray-50',
                card: 'bg-white border-gray-200',
                text: 'text-gray-900',
                textMuted: 'text-gray-600'
            };
        }
        return {
            bg: 'bg-slate-900',
            card: 'bg-slate-800 border-slate-700',
            text: 'text-white',
            textMuted: 'text-slate-400'
        };
    };

    const themeClasses = getThemeClasses();

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div>
                <h1 className={`text-3xl font-bold ${themeClasses.text} mb-2`}>
                    Uy Vazifasi Yordamchisi
                </h1>
                <p className={themeClasses.textMuted}>
                    AI yordamida fizika masalalarini yeching va o'rganing
                </p>
            </div>

            {/* Mode Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {modes.map(mode => {
                    const Icon = mode.icon;
                    const isActive = activeMode === mode.id;

                    return (
                        <button
                            key={mode.id}
                            onClick={() => !mode.disabled && setActiveMode(mode.id)}
                            disabled={mode.disabled}
                            className={`relative overflow-hidden p-4 rounded-xl border-2 transition-all ${isActive
                                    ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20'
                                    : mode.disabled
                                        ? 'border-slate-700 bg-slate-800/50 opacity-50 cursor-not-allowed'
                                        : 'border-slate-700 bg-slate-800/50 hover:border-blue-500/50 hover:bg-slate-700/50'
                                }`}
                        >
                            {mode.disabled && (
                                <div className="absolute top-2 right-2 px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/30 rounded text-xs text-yellow-300">
                                    Tez kunda
                                </div>
                            )}

                            <div className="flex flex-col items-center gap-2 text-center">
                                <Icon size={24} className={isActive ? 'text-blue-400' : 'text-slate-400'} />
                                <div>
                                    <div className={`font-semibold text-sm ${isActive ? 'text-blue-300' : themeClasses.text}`}>
                                        {mode.name}
                                    </div>
                                    <div className={`text-xs ${themeClasses.textMuted} mt-1`}>
                                        {mode.description}
                                    </div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            <div>
                {activeMode === 'solver' && (
                    <ProblemSolver
                        apiKey={apiKey}
                        setShowSettings={setShowSettings}
                        addNotification={addNotification}
                        addXP={addXP}
                        theme={theme}
                    />
                )}

                {activeMode === 'checker' && (
                    <div className={`${themeClasses.card} border rounded-2xl p-12 text-center`}>
                        <p className={themeClasses.textMuted}>Yechim tekshirish funksiyasi tez kunda qo'shiladi...</p>
                    </div>
                )}

                {activeMode === 'practice' && (
                    <div className={`${themeClasses.card} border rounded-2xl p-12 text-center`}>
                        <p className={themeClasses.textMuted}>Amaliyot masalalari tez kunda qo'shiladi...</p>
                    </div>
                )}

                {activeMode === 'explainer' && (
                    <div className={`${themeClasses.card} border rounded-2xl p-12 text-center`}>
                        <p className={themeClasses.textMuted}>Tushuntirish funksiyasi tez kunda qo'shiladi...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
