import React from 'react';

export const EmptyState = ({
    icon,
    title,
    description,
    action,
    className = ''
}) => {
    return (
        <div className={`flex flex-col items-center justify-center text-center p-8 md:p-12 ${className}`}>
            {/* Icon */}
            <div className="mb-6 p-6 bg-card rounded-3xl border border-line">
                <div className="text-soft">
                    {icon}
                </div>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-main mb-3">
                {title}
            </h3>

            {/* Description */}
            <p className="text-soft text-sm md:text-base max-w-md mb-6 leading-relaxed">
                {description}
            </p>

            {/* Action */}
            {action && (
                <div className="mt-2">
                    {action}
                </div>
            )}
        </div>
    );
};

export default EmptyState;
