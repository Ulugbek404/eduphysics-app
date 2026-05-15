import React from 'react';
import { motion } from 'framer-motion';

/**
 * Activity Item Component
 * Corporate design: flat white background, 0.5px border, no shadow
 */
export default function ActivityItem({
    icon: Icon,
    title,
    description,
    time,
    xp,
    color = 'blue',
    index = 0
}) {
    const iconColors = {
        blue: 'bg-blue-500/10 text-blue-500',
        purple: 'bg-purple-500/10 text-purple-500',
        green: 'bg-green-500/10 text-green-500',
        orange: 'bg-orange-500/10 text-orange-500',
        yellow: 'bg-yellow-500/10 text-yellow-500',
        teal: 'bg-teal-500/10 text-teal-500',
        indigo: 'bg-indigo-500/10 text-indigo-500',
    };

    return (
        <motion.div 
            whileHover={{ y: -2, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-4 p-4 rounded-2xl theme-card transition-all duration-200 border-[0.5px] theme-border shadow-sm hover:shadow-md hover:border-teal-500/30"
        >
            {/* Icon */}
            <div className={`flex-shrink-0 p-3 rounded-xl transition-colors duration-300 ${iconColors[color] || iconColors.blue}`}>
                <Icon size={20} strokeWidth={2} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h4 className="text-[15px] font-bold theme-text mb-1 truncate transition-colors duration-300 group-hover:text-teal-600 dark:group-hover:text-teal-400">
                    {title}
                </h4>
                <div className="flex items-center gap-2 text-[13px] theme-muted font-medium">
                    <span>{time}</span>
                    {description && !description.includes('XP') && (
                        <>
                            <span className="w-1 h-1 rounded-full bg-slate-400/50"></span>
                            <span className="truncate">{description}</span>
                        </>
                    )}
                </div>
            </div>

            {/* XP Value Badge */}
            {xp && (
                <div className="flex-shrink-0 flex items-center justify-center min-w-[70px] px-3 py-1.5 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-xl border border-teal-500/20 shadow-sm">
                    <span className="text-teal-600 dark:text-teal-400 font-bold text-sm tracking-wide">+{xp} XP</span>
                </div>
            )}
        </motion.div>
    );
}
