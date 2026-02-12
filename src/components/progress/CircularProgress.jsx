import React from 'react';
import { motion } from 'framer-motion';

/**
 * Circular Progress Component
 * Animated circular progress bar with percentage display
 * @param {number} percentage - Progress percentage (0-100)
 * @param {number} size - Circle size in pixels (default: 120)
 * @param {string} color - Progress color (default: blue)
 * @param {string} label - Optional label text
 */
const CircularProgress = ({
    percentage = 0,
    size = 120,
    color = 'blue',
    label = null,
    showPercentage = true,
    strokeWidth = 8
}) => {
    // Ensure percentage is between 0 and 100
    const validPercentage = Math.min(Math.max(percentage, 0), 100);

    // Calculate circle properties
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (validPercentage / 100) * circumference;

    // Color variants
    const colorClasses = {
        blue: {
            stroke: 'stroke-blue-500',
            text: 'text-blue-500',
            glow: 'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]'
        },
        purple: {
            stroke: 'stroke-purple-500',
            text: 'text-purple-500',
            glow: 'drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]'
        },
        green: {
            stroke: 'stroke-green-500',
            text: 'text-green-500',
            glow: 'drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]'
        },
        yellow: {
            stroke: 'stroke-yellow-500',
            text: 'text-yellow-500',
            glow: 'drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]'
        },
        pink: {
            stroke: 'stroke-pink-500',
            text: 'text-pink-500',
            glow: 'drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]'
        }
    };

    const colors = colorClasses[color] || colorClasses.blue;

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative" style={{ width: size, height: size }}>
                {/* Background Circle */}
                <svg
                    width={size}
                    height={size}
                    className="transform -rotate-90"
                >
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        fill="none"
                        className="text-slate-700"
                    />

                    {/* Progress Circle */}
                    <motion.circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeLinecap="round"
                        className={`${colors.stroke} ${colors.glow}`}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        style={{
                            strokeDasharray: circumference,
                        }}
                    />
                </svg>

                {/* Center Content */}
                {showPercentage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: 'spring' }}
                            className="text-center"
                        >
                            <div className={`text-2xl font-bold ${colors.text}`}>
                                {Math.round(validPercentage)}%
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>

            {/* Label */}
            {label && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-2 text-sm text-slate-400 font-medium"
                >
                    {label}
                </motion.p>
            )}
        </div>
    );
};

export default CircularProgress;
