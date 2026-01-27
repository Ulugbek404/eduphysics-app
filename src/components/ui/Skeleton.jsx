import React from 'react';

export const Skeleton = ({ className = '', variant = 'default' }) => {
    const variants = {
        default: 'h-4 w-full',
        circle: 'h-12 w-12 rounded-full',
        card: 'h-32 w-full rounded-2xl',
        text: 'h-4 w-3/4',
        title: 'h-8 w-1/2',
    };

    return (
        <div
            className={`
        bg-slate-800/50 animate-pulse rounded
        ${variants[variant]} ${className}
      `}
            aria-label="Loading..."
        />
    );
};

export const SkeletonCard = () => (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 md:p-5 space-y-3">
        <Skeleton variant="title" />
        <Skeleton variant="text" />
        <Skeleton variant="text" className="w-1/2" />
        <Skeleton variant="card" className="h-24" />
    </div>
);

export const ComponentLoader = ({ text = "Yuklanmoqda..." }) => (
    <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
            <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
            <p className="text-slate-400 font-medium">{text}</p>
        </div>
    </div>
);

export default Skeleton;
