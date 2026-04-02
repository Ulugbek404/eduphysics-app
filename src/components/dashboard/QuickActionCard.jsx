import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * Quick Action Card Component
 * Modern design: colored left border accent + ghost icon + arrow
 * Database logic: UNCHANGED — all onClick handlers come from parent
 */
export default function QuickActionCard({
    icon: Icon,
    title,
    description,
    color = 'blue',
    badge,
    onClick
}) {
    const colorMap = {
        blue:   { gradient: 'from-blue-500 to-cyan-400',    icon: 'text-blue-400',   iconBg: 'bg-blue-500/15',   border: 'border-blue-500',   glow: 'group-hover:shadow-blue-500/15',   ghost: 'text-blue-500/8',   hover: 'group-hover:text-blue-400' },
        purple: { gradient: 'from-purple-500 to-pink-400',  icon: 'text-purple-400', iconBg: 'bg-purple-500/15', border: 'border-purple-500', glow: 'group-hover:shadow-purple-500/15', ghost: 'text-purple-500/8', hover: 'group-hover:text-purple-400' },
        green:  { gradient: 'from-emerald-500 to-teal-400', icon: 'text-emerald-400',iconBg: 'bg-emerald-500/15',border: 'border-emerald-500',glow: 'group-hover:shadow-emerald-500/15',ghost: 'text-emerald-500/8',hover: 'group-hover:text-emerald-400' },
        orange: { gradient: 'from-orange-500 to-amber-400', icon: 'text-orange-400', iconBg: 'bg-orange-500/15', border: 'border-orange-500', glow: 'group-hover:shadow-orange-500/15', ghost: 'text-orange-500/8', hover: 'group-hover:text-orange-400' },
        indigo: { gradient: 'from-indigo-500 to-violet-400',icon: 'text-indigo-400', iconBg: 'bg-indigo-500/15', border: 'border-indigo-500', glow: 'group-hover:shadow-indigo-500/15', ghost: 'text-indigo-500/8', hover: 'group-hover:text-indigo-400' },
        yellow: { gradient: 'from-yellow-500 to-amber-400', icon: 'text-yellow-400', iconBg: 'bg-yellow-500/15', border: 'border-yellow-500', glow: 'group-hover:shadow-yellow-500/15', ghost: 'text-yellow-500/8', hover: 'group-hover:text-yellow-400' },
        red:    { gradient: 'from-red-500 to-rose-400',     icon: 'text-red-400',    iconBg: 'bg-red-500/15',    border: 'border-red-500',    glow: 'group-hover:shadow-red-500/15',    ghost: 'text-red-500/8',    hover: 'group-hover:text-red-400' },
    };

    const c = colorMap[color] || colorMap.blue;

    return (
        <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClick}
            className={`
                relative overflow-hidden rounded-2xl p-5
                bg-slate-800/60 backdrop-blur-sm
                border border-slate-700/50 hover:border-slate-600/70
                border-l-2 ${c.border}
                shadow-md hover:shadow-xl ${c.glow}
                transition-all duration-300 text-left group w-full
            `}
        >
            {/* Ghost background icon */}
            <div className={`absolute -bottom-2 -right-2 ${c.ghost} transition-all duration-300 group-hover:scale-110`}>
                <Icon size={72} strokeWidth={1} />
            </div>

            {/* Hover background glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />

            {/* Content */}
            <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${c.iconBg} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon size={24} className={c.icon} strokeWidth={2} />
                </div>

                {/* Title + Arrow row */}
                <div className="flex items-center justify-between mb-1.5">
                    <h3 className={`text-base font-bold text-white transition-colors duration-200 ${c.hover}`}>
                        {title}
                    </h3>
                    <ArrowRight
                        size={16}
                        className="text-slate-500 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-200 flex-shrink-0"
                    />
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {description}
                </p>

                {/* Badge */}
                {badge && (
                    <span className={`inline-block mt-3 px-2.5 py-1 ${c.iconBg} ${c.icon} text-xs font-semibold rounded-full`}>
                        {badge}
                    </span>
                )}
            </div>
        </motion.button>
    );
}
