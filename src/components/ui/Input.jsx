import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

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
    const { theme } = useTheme();
    const isLight = theme === 'light';

    return (
        <div className={`space-y-1.5 ${wrapperClassName}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className={`block text-sm font-medium ml-1 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}
                >
                    {label}
                </label>
            )}

            <div className="relative group">
                {icon && (
                    <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-blue-500 ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                        {icon}
                    </div>
                )}

                <input
                    id={inputId}
                    className={`
            w-full rounded-xl border-2 
            ${isLight
                            ? 'bg-slate-50 text-slate-800 placeholder:text-slate-400'
                            : 'bg-slate-900/50 text-white placeholder:text-slate-500'
                        }
            ${error
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                            : isLight
                                ? 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 hover:border-slate-400'
                                : 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/20 hover:border-slate-600'
                        }
            ${icon ? 'pl-10' : 'pl-4'}
            ${rightElement ? 'pr-12' : 'pr-4'}
            py-2.5 outline-none transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
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
