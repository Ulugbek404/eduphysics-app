import React from 'react';
import { AlertCircle } from 'lucide-react';

export const Input = ({
    label,
    error,
    icon,
    rightElement,
    className = '',
    wrapperClassName = '',
    id,
    ...props
}) => {
    const inputId = id || props.name || Math.random().toString(36).substr(2, 9);

    return (
        <div className={`space-y-1.5 ${wrapperClassName}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-slate-300 ml-1"
                >
                    {label}
                </label>
            )}

            <div className="relative group">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
                        {icon}
                    </div>
                )}

                <input
                    id={inputId}
                    className={`
            w-full bg-slate-900/50 text-white rounded-xl border-2 
            ${error
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/20 hover:border-slate-600'
                        }
            ${icon ? 'pl-10' : 'pl-4'}
            ${rightElement ? 'pr-12' : 'pr-4'}
            py-2.5 outline-none transition-all duration-200
            placeholder:text-slate-500
            disabled:opacity-50 disabled:bg-slate-800 disabled:cursor-not-allowed
            ${className}
          `}
                    {...props}
                />

                {rightElement && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {rightElement}
                    </div>
                )}
            </div>

            {error && (
                <div className="flex items-center gap-1.5 text-red-400 text-xs ml-1 animate-slideInLeft">
                    <AlertCircle size={12} />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export default Input;
