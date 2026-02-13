import React from 'react';
import { motion } from 'framer-motion';

/**
 * Activity Item Component
 * Displays a single activity in the recent activity feed
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
    const iconBgColors = {
        blue: 'bg-blue-500/10 text-blue-400',
        purple: 'bg-purple-500/10 text-purple-400',
        green: 'bg-green-500/10 text-green-400',
        orange: 'bg-orange-500/10 text-orange-400',
        yellow: 'bg-yellow-500/10 text-yellow-400'
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors border border-slate-700/30"
        >
            {/* Icon */}
            <div className={`flex-shrink-0 p-2.5 rounded-lg ${iconBgColors[color]}`}>
                <Icon size={20} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white mb-0.5">
                    {title}
                </h4>
                <p className="text-xs text-slate-400 mb-1">
                    {description}
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{time}</span>
                    {xp && (
                        <>
                            <span>•</span>
                            <span className="text-green-400 font-medium">+{xp} XP</span>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
