import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * Quick Action Card Component
 * Enhanced with theme-aware classes and smooth animations
 */
export default function QuickActionCard({
    icon: Icon,
    title,
    description,
    badge,
    onClick
}) {
    return (
        <motion.button
            onClick={onClick}
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`
                w-full text-left theme-card-premium rounded-2xl p-6
                group relative overflow-hidden
            `}
        >
            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-teal-500/0 to-teal-500/0 group-hover:from-teal-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

            <div className="flex items-start justify-between mb-5 relative z-10">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 group-hover:scale-110 group-hover:bg-teal-500/20 transition-all duration-300 border border-teal-500/10">
                    <Icon size={24} strokeWidth={2} />
                </div>
                <div className="w-8 h-8 rounded-full bg-teal-500/5 flex items-center justify-center group-hover:bg-teal-500/10 transition-colors">
                    <ArrowRight
                        size={18}
                        className="theme-muted group-hover:text-teal-500 group-hover:translate-x-1 transition-all duration-300"
                    />
                </div>
            </div>

            <h3 className="text-[16px] font-bold theme-text mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors relative z-10">
                {title}
            </h3>

            <p className="text-[13px] theme-text-secondary leading-relaxed line-clamp-2 relative z-10 opacity-80 group-hover:opacity-100 transition-opacity">
                {description}
            </p>

            {badge && (
                <span className="inline-block mt-3 px-2.5 py-1 bg-teal-500/10 text-teal-600 dark:text-teal-400 border-[0.5px] border-teal-500/20 text-[11px] font-semibold rounded-md relative z-10">
                    {badge}
                </span>
            )}
        </motion.button>
    );
}
