import React from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '../../contexts/ProgressContext';
import { Zap, Trophy, Flame, Clock } from 'lucide-react';
import { StatCard, XPBar, LevelBadge } from '../progress';
import { formatTimeSpent } from '../../utils/progressHelpers';

/**
 * Progress Overview Component
 * Shows summary cards with XP, Level, Streak, and Time
 */
const ProgressOverview = () => {
    const { progress } = useProgress();

    const stats = [
        {
            label: 'Total XP',
            value: progress.totalXP.toLocaleString(),
            icon: Zap,
            color: 'yellow',
            trend: 'up',
            trendValue: '+12',
            subtitle: 'This week'
        },
        {
            label: 'Current Level',
            value: progress.level,
            icon: Trophy,
            color: 'purple',
            subtitle: `${progress.xpProgress.percentage}% to next level`
        },
        {
            label: 'Day Streak',
            value: progress.currentStreak,
            icon: Flame,
            color: 'pink',
            trend: progress.currentStreak > 0 ? 'up' : 'neutral',
            trendValue: progress.currentStreak > 0 ? `${progress.currentStreak} days` : '0',
            subtitle: 'Keep it up!'
        },
        {
            label: 'Time Spent',
            value: formatTimeSpent(progress.stats.totalTimeSpent),
            icon: Clock,
            color: 'blue',
            subtitle: 'Total learning time'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header with Level Badge */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                        O'rganish Progressi
                    </h2>
                    <p className="text-slate-400">
                        Sizning yutuqlaringiz va statistikangiz
                    </p>
                </div>
                <LevelBadge level={progress.level} size="lg" />
            </div>

            {/* XP Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <XPBar
                    currentXP={progress.xpProgress.current}
                    neededXP={progress.xpProgress.needed}
                    level={progress.level}
                />
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                    >
                        <StatCard {...stat} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProgressOverview;
