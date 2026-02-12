import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

/**
 * XP Bar Component
 * Shows XP progress to next level with current/needed display
 * @param {number} currentXP - Current XP in this level
 * @param {number} neededXP - XP needed for next level
 * @param {number} level - Current level
 */
const XPBar = ({ currentXP = 0, neededXP = 100, level = 1 }) => {
    const percentage = Math.min((currentXP / neededXP) * 100, 100);

    return (
        <div className="w-full">
            {/* Level and XP Info */}
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    <span className="text-sm font-bold text-white">
                        Level {level}
                    </span>
                </div>
                <span className="text-xs font-medium text-slate-400">
                    {currentXP.toLocaleString()} / {neededXP.toLocaleString()} XP
                </span>
            </div>

            {/* XP Progress Bar */}
            <div className="relative w-full h-3 bg-slate-700 rounded-full overflow-hidden border border-slate-600">
                {/* Gradient Fill */}
                <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{
                        boxShadow: '0 0 10px rgba(234, 179, 8, 0.5)'
                    }}
                />

                {/* Shine Effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: 'linear'
                    }}
                    style={{ width: '50%' }}
                />
            </div>

            {/* Next Level Info */}
            <div className="mt-1 text-xs text-slate-500 text-right">
                {neededXP - currentXP > 0 ? (
                    <span>{(neededXP - currentXP).toLocaleString()} XP to Level {level + 1}</span>
                ) : (
                    <span className="text-green-400 font-bold">Level Up! 🎉</span>
                )}
            </div>
        </div>
    );
};

export default XPBar;
