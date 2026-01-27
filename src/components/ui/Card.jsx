import React from 'react';

export const Card = ({
    children,
    className = '',
    variant = 'default', // default, elevated, outlined, glass
    padding = 'md', // none, sm, md, lg
    onClick,
    ...props
}) => {
    // Base styles
    const baseStyles = "rounded-2xl transition-all duration-200";

    // Variants
    const variants = {
        default: "bg-slate-800/50 border border-slate-700/50",
        elevated: "bg-slate-800 shadow-xl border border-slate-700",
        outlined: "bg-transparent border border-slate-700 hover:border-slate-600",
        glass: "bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl",
        gradient: "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50",
    };

    // Responsive Padding
    const paddings = {
        none: "",
        sm: "p-3 md:p-4",
        md: "p-4 md:p-5 lg:p-6",
        lg: "p-5 md:p-6 lg:p-8",
    };

    // Hover effect with haptic feedback
    const handleClick = (e) => {
        if (onClick) {
            if (navigator.vibrate) navigator.vibrate(10);
            onClick(e);
        }
    };

    const interactiveStyles = onClick
        ? "cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:border-blue-500/50 active:scale-[0.99] touch-manipulation"
        : "";

    return (
        <div
            className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${interactiveStyles} ${className}`}
            onClick={handleClick}
            {...props}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = '' }) => (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
        {children}
    </div>
);

export const CardTitle = ({ children, className = '' }) => (
    <h3 className={`text-lg font-bold text-white flex items-center gap-2 ${className}`}>
        {children}
    </h3>
);

export const CardDescription = ({ children, className = '' }) => (
    <p className={`text-sm text-slate-400 leading-relaxed ${className}`}>
        {children}
    </p>
);

export default Card;
