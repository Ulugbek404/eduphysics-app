import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Crown, Zap } from 'lucide-react';

/**
 * Level Badge Component
 * Displays user level with icon and styling
 * @param {number} level - User level
 * @param {string} size - Badge size (sm, md, lg)
 * @param {boolean} showLabel - Show "Level" label
 */
const LevelBadge = ({ level = 1, size = 'md', showLabel = true }) => {
    // Size variants
    const sizes = {
        sm: {
            container: 'w-12 h-12',
            text: 'text-sm',
            icon: 16
        },
        md: {
            container: 'w-16 h-16',
            text: 'text-lg',
            icon: 20
        },
        lg: {
            container: 'w-20 h-20',
            text: 'text-2xl',
            icon: 24
        }
    };

    const sizeClass = sizes[size] || sizes.md;

    // Level tier colors and icons
    const getLevelTier = (lvl) => {
        if (lvl >= 50) return {
            color: 'from-purple-500 to-pink-500',
            icon: Crown,
            glow: 'shadow-[0_0_20px_rgba(168,85,247,0.6)]',
            label: 'Master'
        };
        if (lvl >= 30) return {
            color: 'from-yellow-500 to-orange-500',
            icon: Star,
            glow: 'shadow-[0_0_15px_rgba(234,179,8,0.6)]',
            label: 'Expert'
        };
        if (lvl >= 15) return {
            color: 'from-blue-500 to-cyan-500',
            icon: Zap,
            glow: 'shadow-[0_0_12px_rgba(59,130,246,0.6)]',
            label: 'Advanced'
        };
        return {
            color: 'from-slate-500 to-slate-600',
            icon: Award,
            glow: 'shadow-[0_0_10px_rgba(100,116,139,0.6)]',
            label: 'Beginner'
        };
    };

    const tier = getLevelTier(level);
    const Icon = tier.icon;

    return (
        <div className="flex flex-col items-center gap-2">
            {/* Badge */}
            <motion.div
                className={`
                    ${sizeClass.container}
                    bg-gradient-to-br ${tier.color}
                    rounded-full
                    flex items-center justify-center
                    ${tier.glow}
                    border-2 border-white/20
                    relative
                `}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', duration: 0.6 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
            >
                {/* Level Number */}
                <div className={`font-bold text-white ${sizeClass.text} z-10`}>
                    {level}
                </div>

                {/* Icon in corner */}
                <div className="absolute -top-1 -right-1 bg-slate-900 rounded-full p-1">
                    <Icon size={sizeClass.icon / 1.5} className="text-white" />
                </div>

                {/* Pulse animation */}
                <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${tier.color} rounded-full opacity-50`}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />
            </motion.div>

            {/* Label */}
            {showLabel && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                >
                    <div className="text-xs text-slate-500 font-medium">Level</div>
                    <div className="text-sm text-slate-300 font-bold">{tier.label}</div>
                </motion.div>
            )}
        </div>
    );
};

export default LevelBadge;
