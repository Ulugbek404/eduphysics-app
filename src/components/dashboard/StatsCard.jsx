import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable Statistics Card Component
 * Modern design: ghost icon backdrop + gradient border glow on hover
 * Database logic: UNCHANGED — all data comes from parent props
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
    const colorMap = {
        blue:   { gradient: 'from-blue-500 to-cyan-400',    glow: 'hover:shadow-blue-500/20',   iconColor: 'text-blue-400',   ghostColor: 'text-blue-500/10',   border: 'hover:border-blue-500/40',   badge: 'bg-blue-500/10 text-blue-300',   ring: 'ring-blue-500/20' },
        purple: { gradient: 'from-purple-500 to-pink-400',  glow: 'hover:shadow-purple-500/20', iconColor: 'text-purple-400', ghostColor: 'text-purple-500/10', border: 'hover:border-purple-500/40', badge: 'bg-purple-500/10 text-purple-300', ring: 'ring-purple-500/20' },
        green:  { gradient: 'from-emerald-500 to-teal-400', glow: 'hover:shadow-emerald-500/20',iconColor: 'text-emerald-400',ghostColor: 'text-emerald-500/10',border: 'hover:border-emerald-500/40',badge: 'bg-emerald-500/10 text-emerald-300',ring: 'ring-emerald-500/20' },
        orange: { gradient: 'from-orange-500 to-amber-400', glow: 'hover:shadow-orange-500/20', iconColor: 'text-orange-400', ghostColor: 'text-orange-500/10', border: 'hover:border-orange-500/40', badge: 'bg-orange-500/10 text-orange-300',  ring: 'ring-orange-500/20' },
        indigo: { gradient: 'from-indigo-500 to-violet-400',glow: 'hover:shadow-indigo-500/20', iconColor: 'text-indigo-400', ghostColor: 'text-indigo-500/10', border: 'hover:border-indigo-500/40', badge: 'bg-indigo-500/10 text-indigo-300',  ring: 'ring-indigo-500/20' },
        yellow: { gradient: 'from-yellow-500 to-amber-400', glow: 'hover:shadow-yellow-500/20', iconColor: 'text-yellow-400', ghostColor: 'text-yellow-500/10', border: 'hover:border-yellow-500/40', badge: 'bg-yellow-500/10 text-yellow-300',  ring: 'ring-yellow-500/20' },
    };

    const c = colorMap[color] || colorMap.blue;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`
                relative overflow-hidden rounded-3xl p-5
                bg-slate-800/60 backdrop-blur-md
                border border-slate-700/50 ${c.border}
                shadow-lg ${c.glow} hover:shadow-xl
                transition-all duration-300
                ${onClick ? 'cursor-pointer' : ''}
                group
            `}
        >
            {/* Subtle top gradient line */}
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${c.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

            {/* Ghost background icon */}
            <div className={`absolute -bottom-3 -right-3 ${c.ghostColor} transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 opacity-80`}>
                <Icon size={90} strokeWidth={1} />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Icon badge */}
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-2xl mb-4 bg-gradient-to-br ${c.gradient} shadow-lg`}>
                    <Icon size={20} className="text-white" strokeWidth={2} />
                </div>

                {/* Label */}
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
                    {label}
                </div>

                {/* Value */}
                <div className="text-3xl font-black text-white tracking-tight mb-1">
                    {value}
                </div>

                {/* Subtitle */}
                {subtitle && (
                    <div className="text-xs text-slate-400 font-medium">
                        {subtitle}
                    </div>
                )}

                {/* Trend badge */}
                {trend && (
                    <div className={`inline-flex items-center gap-1 mt-3 px-2.5 py-1 rounded-full text-xs font-bold ${c.badge}`}>
                        {trend.startsWith('+') ? '↑' : '↓'} {trend}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
