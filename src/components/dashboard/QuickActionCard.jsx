import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

/**
 * Quick Action Card Component
 * Provides one-click access to key features
 */
export default function QuickActionCard({
    icon: Icon,
    title,
    description,
    color = 'blue',
    badge,
    onClick
}) {
    const colorClasses = {
        blue: 'from-blue-500 to-cyan-500',
        purple: 'from-purple-500 to-pink-500',
        green: 'from-green-500 to-emerald-500',
        orange: 'from-orange-500 to-red-500',
        indigo: 'from-indigo-500 to-purple-500',
        yellow: 'from-yellow-500 to-orange-500',
        red: 'from-red-500 to-pink-500'
    };

    const iconBgColors = {
        blue: 'bg-blue-500/10',
        purple: 'bg-purple-500/10',
        green: 'bg-green-500/10',
        orange: 'bg-orange-500/10',
        indigo: 'bg-indigo-500/10',
        yellow: 'bg-yellow-500/10',
        red: 'bg-red-500/10'
    };

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="
        relative overflow-hidden rounded-2xl p-5
        bg-slate-800/50 backdrop-blur-sm border border-slate-700/50
        hover:border-slate-600 transition-all duration-300
        text-left group w-full
      "
        >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

            {/* Content */}
            <div className="relative z-10 flex items-start justify-between">
                <div className="flex-1">
                    {/* Icon */}
                    <div className={`inline-flex p-3 rounded-xl ${iconBgColors[color]} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={24} className={`text-${color}-400`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-400 line-clamp-2">
                        {description}
                    </p>

                    {/* Badge */}
                    {badge && (
                        <span className="inline-block mt-3 px-2 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full">
                            {badge}
                        </span>
                    )}
                </div>

                {/* Arrow Icon */}
                <ChevronRight
                    size={20}
                    className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
                />
            </div>

            {/* Bottom Glow */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colorClasses[color]} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
        </motion.button>
    );
}
