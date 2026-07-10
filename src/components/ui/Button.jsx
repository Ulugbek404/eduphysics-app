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
    // Base styles — fokus halqasi ikkala temada ham ko'rinadi
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

    // Size variations
    const sizes = {
        sm: "px-3 py-1.5 text-sm rounded-lg gap-1.5",
        md: "px-4 py-2 text-base rounded-xl gap-2",
        lg: "px-6 py-3 text-lg rounded-2xl gap-2.5",
    };

    // Variant styles — brand (teal) asosiy, yuzalar theme.css tokenlaridan
    const variants = {
        primary: "bg-brand-600 hover:bg-brand-500 text-white-fixed border border-transparent",
        secondary: "bg-card hover:bg-card-hover text-main border border-line",
        outline: "bg-transparent border-2 border-line text-soft hover:text-main hover:border-line-brand",
        ghost: "bg-transparent text-soft hover:text-main hover:bg-card-hover",
        danger: "bg-danger-600/10 hover:bg-danger-600/20 text-danger-500 hover:text-danger-400 border border-danger-600/20 focus-visible:ring-danger-500/60",
        success: "bg-ok-600 hover:bg-ok-500 text-white-fixed border border-transparent focus-visible:ring-ok-500/60",
        ai: "bg-ai-600 hover:bg-ai-500 text-white-fixed border border-transparent focus-visible:ring-ai-500/60",
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
