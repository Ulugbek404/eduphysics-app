import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable Statistics Card Component
 * Enhanced with theme-aware classes and smooth animations
 */
export default function StatsCard({
    icon: Icon,
    label,
    value,
    subtitle,
    trend,
    onClick
}) {
    return (
        <motion.div
            onClick={onClick}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`
                theme-card-premium rounded-2xl p-5 relative overflow-hidden
                ${onClick ? 'cursor-pointer' : ''}
            `}
        >
            {/* Subtle background accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-full -mr-10 -mt-10 blur-2xl" />

            <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="text-[13px] font-bold theme-text-secondary uppercase tracking-wider">
                    {label}
                </div>
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/10 shadow-inner">
                    <Icon size={22} strokeWidth={2.5} />
                </div>
            </div>

            <div className="text-[28px] font-bold theme-text mb-1">
                {value}
            </div>

            <div className="flex items-center justify-between mt-2">
                {subtitle && (
                    <div className="text-[12px] theme-muted font-medium">
                        {subtitle}
                    </div>
                )}
                {trend && (
                    <div className="inline-flex items-center gap-1 text-[12px] font-semibold text-emerald-500 dark:text-emerald-400">
                        {trend.startsWith('+') ? '↑' : '↓'} {trend}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
