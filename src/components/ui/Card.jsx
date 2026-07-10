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

    // Variants — theme.css tokenlari, ikkala temada ishlaydi
    const variants = {
        default: "bg-card border border-line",
        elevated: "bg-elevated shadow-card border border-line",
        outlined: "bg-transparent border border-line hover:border-line-light",
        glass: "bg-surface/60 backdrop-blur-xl border border-line shadow-card",
        gradient: "bg-card border border-line",
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
        ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-card hover:border-brand-500/50 active:scale-[0.99] touch-manipulation"
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
    <h3 className={`text-lg font-bold text-main flex items-center gap-2 ${className}`}>
        {children}
    </h3>
);

export const CardDescription = ({ children, className = '' }) => (
    <p className={`text-sm text-soft leading-relaxed ${className}`}>
        {children}
    </p>
);

export default Card;
