import React from 'react';
import { motion } from 'framer-motion';

/**
 * Linear Progress Bar Component
 * Horizontal progress bar with smooth animation
 * @param {number} percentage - Progress percentage (0-100)
 * @param {string} color - Progress color (default: blue)
 * @param {string} label - Optional label text
 * @param {boolean} showPercentage - Show percentage text (default: true)
 * @param {string} height - Bar height (default: h-2)
 */
const LinearProgress = ({
    percentage = 0,
    color = 'blue',
    label = null,
    showPercentage = true,
    height = 'h-2',
    showGlow = true
}) => {
    // Ensure percentage is between 0 and 100
    const validPercentage = Math.min(Math.max(percentage, 0), 100);

    // Color variants
    const colorClasses = {
        blue: {
            bg: 'bg-blue-500',
            glow: 'shadow-[0_0_10px_rgba(59,130,246,0.5)]'
        },
        purple: {
            bg: 'bg-purple-500',
            glow: 'shadow-[0_0_10px_rgba(168,85,247,0.5)]'
        },
        green: {
            bg: 'bg-green-500',
            glow: 'shadow-[0_0_10px_rgba(34,197,94,0.5)]'
        },
        yellow: {
            bg: 'bg-yellow-500',
            glow: 'shadow-[0_0_10px_rgba(234,179,8,0.5)]'
        },
        pink: {
            bg: 'bg-pink-500',
            glow: 'shadow-[0_0_10px_rgba(236,72,153,0.5)]'
        },
        gradient: {
            bg: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
            glow: 'shadow-[0_0_10px_rgba(168,85,247,0.5)]'
        }
    };

    const colors = colorClasses[color] || colorClasses.blue;

    return (
        <div className="w-full">
            {/* Label and Percentage */}
            {(label || showPercentage) && (
                <div className="flex justify-between items-center mb-2">
                    {label && (
                        <span className="text-sm font-medium text-slate-300">
                            {label}
                        </span>
                    )}
                    {showPercentage && (
                        <span className="text-sm font-bold text-slate-400">
                            {Math.round(validPercentage)}%
                        </span>
                    )}
                </div>
            )}

            {/* Progress Bar */}
            <div className={`w-full ${height} bg-slate-700 rounded-full overflow-hidden`}>
                <motion.div
                    className={`${height} ${colors.bg} rounded-full ${showGlow ? colors.glow : ''}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${validPercentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                />
            </div>
        </div>
    );
};

export default LinearProgress;
