import React from 'react';
import { CheckCircle, Lightbulb } from 'lucide-react';
import FormulaDisplay from './FormulaDisplay';

/**
 * Yechim qadami kartasi
 * Har bir qadamni chiroyli ko'rsatadi
 */
export default function StepCard({ step, index, theme = 'dark' }) {
    const { number, title, explanation, formula, calculation, result } = step;
    return (
        <div
            className={`relative overflow-hidden theme-card border theme-border rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-fadeIn`}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-2xl"></div>

            <div className="relative z-10 flex gap-4">
                {/* Step number */}
                <div className={`flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg`}>
                    {number || index + 1}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                    {/* Title */}
                    {title && (
                        <h4 className={`text-lg font-bold theme-text flex items-center gap-2`}>
                            <Lightbulb size={18} className="text-yellow-400" />
                            {title}
                        </h4>
                    )}

                    {/* Explanation */}
                    {explanation && (
                        <p className={`theme-text-secondary leading-relaxed`}>
                            {explanation}
                        </p>
                    )}

                    {/* Formula */}
                    {formula && (
                        <div className="my-3">
                            <FormulaDisplay formula={formula} inline={false} />
                        </div>
                    )}

                    {/* Calculation */}
                    {calculation && (
                        <div className={`bg-slate-200 dark:bg-slate-900/50 border theme-border rounded-lg p-3 font-mono text-sm theme-text`}>
                            <div className="text-xs theme-text-secondary mb-1">Hisoblash:</div>
                            {calculation}
                        </div>
                    )}

                    {/* Result */}
                    {result && (
                        <div className="flex items-center gap-2 p-3 bg-green-100 dark:bg-green-500/10 border border-green-300 dark:border-green-500/30 rounded-lg">
                            <CheckCircle size={18} className="text-green-600 dark:text-green-400" />
                            <span className="font-semibold text-green-700 dark:text-green-300">{result}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
