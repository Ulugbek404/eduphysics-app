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
                    className="block text-sm font-medium ml-1 text-soft"
                >
                    {label}
                </label>
            )}

            <div className="relative group">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors text-faint group-focus-within:text-brand-500">
                        {icon}
                    </div>
                )}

                <input
                    id={inputId}
                    className={`
            w-full rounded-xl border-2
            bg-field text-main placeholder:text-faint
            ${error
                            ? 'border-danger-500/50 focus:border-danger-500 focus:ring-danger-500/20'
                            : 'border-line focus:border-brand-500 focus:ring-brand-500/20 hover:border-line-light'
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
                <div className="flex items-center gap-1.5 text-danger-400 text-xs ml-1 animate-slideInLeft">
                    <AlertCircle size={12} />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export default Input;
