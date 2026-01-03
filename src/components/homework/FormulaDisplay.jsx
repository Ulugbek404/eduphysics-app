import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Copy, Check } from 'lucide-react';

/**
 * Formula ko'rsatish komponenti
 * LaTeX formulalarni render qiladi
 */
export default function FormulaDisplay({ formula, inline = false, showCopy = true, className = '' }) {
    const [copied, setCopied] = React.useState(false);

    if (!formula) return null;

    // $ belgilarini olib tashlash
    const cleanFormula = formula.replace(/^\$+|\$+$/g, '').trim();

    const handleCopy = () => {
        navigator.clipboard.writeText(cleanFormula);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (inline) {
        return (
            <span className={`inline-flex items-center gap-1 ${className}`}>
                <InlineMath math={cleanFormula} />
                {showCopy && (
                    <button
                        onClick={handleCopy}
                        className="p-1 hover:bg-slate-700 rounded transition-colors"
                        title="Nusxalash"
                    >
                        {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} className="text-slate-400" />}
                    </button>
                )}
            </span>
        );
    }

    return (
        <div className={`relative group ${className}`}>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 overflow-x-auto">
                <BlockMath math={cleanFormula} />
            </div>
            {showCopy && (
                <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    title="Nusxalash"
                >
                    {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-slate-300" />}
                </button>
            )}
        </div>
    );
}
