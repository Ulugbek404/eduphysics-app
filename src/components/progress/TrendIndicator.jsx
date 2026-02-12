import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * Trend Indicator Component
 * Shows trend direction with icon and percentage
 * @param {string} direction - Trend direction (up, down, neutral)
 * @param {number} value - Trend value/percentage
 * @param {string} label - Optional label text
 * @param {string} size - Size variant (sm, md, lg)
 */
const TrendIndicator = ({
    direction = 'neutral',
    value = 0,
    label = null,
    size = 'md',
    showIcon = true
}) => {
    // Size variants
    const sizes = {
        sm: {
            text: 'text-xs',
            icon: 14,
            padding: 'px-2 py-1'
        },
        md: {
            text: 'text-sm',
            icon: 16,
            padding: 'px-3 py-1.5'
        },
        lg: {
            text: 'text-base',
            icon: 18,
            padding: 'px-4 py-2'
        }
    };

    const sizeClass = sizes[size] || sizes.md;

    // Direction configs
    const directionConfig = {
        up: {
            icon: TrendingUp,
            color: 'text-green-400',
            bg: 'bg-green-500/20',
            border: 'border-green-500/30',
            symbol: '↑'
        },
        down: {
            icon: TrendingDown,
            color: 'text-red-400',
            bg: 'bg-red-500/20',
            border: 'border-red-500/30',
            symbol: '↓'
        },
        neutral: {
            icon: Minus,
            color: 'text-slate-400',
            bg: 'bg-slate-500/20',
            border: 'border-slate-500/30',
            symbol: '−'
        }
    };

    const config = directionConfig[direction] || directionConfig.neutral;
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1"
        >
            <div className={`
                inline-flex items-center gap-1.5
                ${sizeClass.padding}
                ${config.bg}
                ${config.color}
                border ${config.border}
                rounded-full
                font-bold
                ${sizeClass.text}
            `}>
                {/* Icon */}
                {showIcon && (
                    <Icon size={sizeClass.icon} className={config.color} />
                )}

                {/* Value */}
                <span>
                    {config.symbol} {Math.abs(value)}%
                </span>
            </div>

            {/* Label */}
            {label && (
                <span className="text-xs text-slate-500 ml-1">
                    {label}
                </span>
            )}
        </motion.div>
    );
};

export default TrendIndicator;
