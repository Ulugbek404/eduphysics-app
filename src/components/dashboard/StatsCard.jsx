import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable Statistics Card Component
 * Used for displaying key metrics on Dashboard
 */
export default function StatsCard({
    icon: Icon,
    label,
    value,
    subtitle,
    trend,
    color = 'blue',
    onClick
}) {
    const colorClasses = {
        blue: 'from-blue-500 to-cyan-500',
        purple: 'from-purple-500 to-pink-500',
        green: 'from-green-500 to-emerald-500',
        orange: 'from-orange-500 to-red-500',
        indigo: 'from-indigo-500 to-purple-500',
        yellow: 'from-yellow-500 to-orange-500'
    };

    const iconBgColors = {
        blue: 'bg-blue-500/10',
        purple: 'bg-purple-500/10',
        green: 'bg-green-500/10',
        orange: 'bg-orange-500/10',
        indigo: 'bg-indigo-500/10',
        yellow: 'bg-yellow-500/10'
    };

    const iconColors = {
        blue: 'text-blue-400',
        purple: 'text-purple-400',
        green: 'text-green-400',
        orange: 'text-orange-400',
        indigo: 'text-indigo-400',
        yellow: 'text-yellow-400'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -4 }}
            onClick={onClick}
            className={`
        relative overflow-hidden rounded-2xl p-6 
        bg-slate-800/50 backdrop-blur-sm border border-slate-700/50
        hover:border-slate-600 transition-all duration-300
        ${onClick ? 'cursor-pointer' : ''}
        group
      `}
        >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-5 group-hover:opacity-10 transition-opacity`} />

            {/* Content */}
            <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl ${iconBgColors[color]} mb-4`}>
                    <Icon size={24} className={iconColors[color]} />
                </div>

                {/* Label */}
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                    {label}
                </div>

                {/* Value */}
                <div className="text-3xl font-bold text-white mb-1">
                    {value}
                </div>

                {/* Subtitle */}
                {subtitle && (
                    <div className="text-sm text-slate-400">
                        {subtitle}
                    </div>
                )}

                {/* Trend */}
                {trend && (
                    <div className={`
            inline-flex items-center gap-1 mt-3 px-2 py-1 rounded-full text-xs font-medium
            ${trend.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}
          `}>
                        {trend.startsWith('+') ? '↑' : '↓'} {trend}
                    </div>
                )}
            </div>

            {/* Hover Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </motion.div>
    );
}
