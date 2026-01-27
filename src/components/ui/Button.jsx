import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
    children,
    variant = 'primary', // primary, secondary, outline, ghost, danger
    size = 'md', // sm, md, lg
    className = '',
    isLoading = false,
    leftIcon,
    rightIcon,
    disabled,
    ...props
}) => {
    // Base styles
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

    // Size variations
    const sizes = {
        sm: "px-3 py-1.5 text-sm rounded-lg gap-1.5",
        md: "px-4 py-2 text-base rounded-xl gap-2",
        lg: "px-6 py-3 text-lg rounded-2xl gap-2.5",
    };

    // Variant styles
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 border border-transparent focus:ring-blue-500",
        secondary: "bg-slate-700 hover:bg-slate-600 text-white shadow-md border border-slate-600 focus:ring-slate-500",
        outline: "bg-transparent border-2 border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-800/50 focus:ring-slate-500",
        ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-slate-800 focus:ring-slate-500",
        danger: "bg-red-600/10 hover:bg-red-600/20 text-red-500 hover:text-red-400 border border-red-600/20 focus:ring-red-500",
        success: "bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-600/20 hover:shadow-green-600/40 border border-transparent focus:ring-green-500",
    };

    return (
        <button
            className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 18} />
            )}

            {!isLoading && leftIcon && (
                <span className="flex-shrink-0">{leftIcon}</span>
            )}

            <span>{children}</span>

            {!isLoading && rightIcon && (
                <span className="flex-shrink-0">{rightIcon}</span>
            )}
        </button>
    );
};

export default Button;
