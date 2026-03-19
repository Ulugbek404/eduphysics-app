import React from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '../../contexts/ProgressContext';
import { Zap, Trophy, Flame, Clock } from 'lucide-react';
import { formatTimeSpent } from '../../utils/progressHelpers';
import { xpInCurrentLevel, xpForNextLevel, calcLevel } from '../../contexts/XPContext';
import { StatCard, XPBar, LevelBadge } from '../progress';

/**
 * Progress Overview Component
 * Shows summary cards with XP, Level, Streak, and Time
 */
const ProgressOverview = () => {
    const { progress } = useProgress();

    // XP bar calculation using exact formulas from XPContext
    const currentXP = progress.xp || 0;
    const currentLevel = calcLevel(currentXP);
    const xpInLevel = xpInCurrentLevel(currentXP);
    const nextLevelXP = xpForNextLevel(currentXP);
    const xpPercentage = Math.min(Math.round((xpInLevel / 500) * 100), 100);

    const stats = [
        {
            label: 'Total XP',
            value: (progress.xp || 0).toLocaleString(),
            icon: Zap,
            color: 'yellow',
            trend: 'up',
            trendValue: 'Active',
            subtitle: 'This week'
        },
        {
            label: 'Current Level',
            value: progress.level || 1,
            icon: Trophy,
            color: 'purple',
            subtitle: `${xpPercentage}% to next level`
        },
        {
            label: 'Day Streak',
            value: progress.streak || 0,
            icon: Flame,
            color: 'pink',
            trend: (progress.streak || 0) > 0 ? 'up' : 'neutral',
            trendValue: (progress.streak || 0) > 0 ? `${progress.streak} days` : '0',
            subtitle: 'Keep it up!'
        },
        {
            label: 'Time Spent',
            value: formatTimeSpent(progress.stats?.totalTimeSpent || 0),
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
                    currentXP={xpInLevel}
                    neededXP={500}
                    level={currentLevel}
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
