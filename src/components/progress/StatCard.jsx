import React from 'react';
import { motion } from 'framer-motion';

/**
 * Stat Card Component
 * Displays a statistic with icon, value, and label
 * @param {string} label - Stat label
 * @param {string|number} value - Stat value
 * @param {React.Component} icon - Icon component
 * @param {string} color - Card color theme
 * @param {string} trend - Trend direction (up, down, neutral)
 * @param {string} trendValue - Trend value to display
 */
const StatCard = ({
    label,
    value,
    icon: Icon,
    color = 'blue',
    trend = null,
    trendValue = null,
    subtitle = null
}) => {
    // Color variants
    const colorClasses = {
        blue: {
            bg: 'from-blue-500/20 to-blue-600/20',
            icon: 'text-blue-400',
            border: 'border-blue-500/30',
            glow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]'
        },
        purple: {
            bg: 'from-purple-500/20 to-purple-600/20',
            icon: 'text-purple-400',
            border: 'border-purple-500/30',
            glow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]'
        },
        green: {
            bg: 'from-green-500/20 to-green-600/20',
            icon: 'text-green-400',
            border: 'border-green-500/30',
            glow: 'hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]'
        },
        yellow: {
            bg: 'from-yellow-500/20 to-yellow-600/20',
            icon: 'text-yellow-400',
            border: 'border-yellow-500/30',
            glow: 'hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]'
        },
        pink: {
            bg: 'from-pink-500/20 to-pink-600/20',
            icon: 'text-pink-400',
            border: 'border-pink-500/30',
            glow: 'hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]'
        }
    };

    const colors = colorClasses[color] || colorClasses.blue;

    // Trend colors
    const trendColors = {
        up: 'text-green-400',
        down: 'text-red-400',
        neutral: 'text-slate-400'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className={`
                relative
                bg-gradient-to-br ${colors.bg}
                backdrop-blur-sm
                border ${colors.border}
                rounded-xl
                p-4
                transition-all duration-300
                ${colors.glow}
            `}
        >
            {/* Icon */}
            <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg bg-slate-800/50 ${colors.icon}`}>
                    {Icon && <Icon size={20} />}
                </div>

                {/* Trend */}
                {trend && trendValue && (
                    <div className={`text-xs font-bold ${trendColors[trend]}`}>
                        {trend === 'up' && '↑ '}
                        {trend === 'down' && '↓ '}
                        {trendValue}
                    </div>
                )}
            </div>

            {/* Value */}
            <div className="mb-1">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="text-2xl font-bold text-white"
                >
                    {value}
                </motion.div>
            </div>

            {/* Label */}
            <div className="text-sm text-slate-400 font-medium">
                {label}
            </div>

            {/* Subtitle */}
            {subtitle && (
                <div className="text-xs text-slate-500 mt-1">
                    {subtitle}
                </div>
            )}

            {/* Decorative gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl -z-10`} />
        </motion.div>
    );
};

export default StatCard;
