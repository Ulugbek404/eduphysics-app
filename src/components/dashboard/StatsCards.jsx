import React from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '../../contexts/ProgressContext';
import { BookOpen, FileText, Beaker, Target, Award, TrendingUp } from 'lucide-react';

/**
 * Stats Cards Component
 * Quick stats grid showing lessons, tests, labs, etc.
 */
const StatsCards = () => {
    const { progress } = useProgress();

    const quickStats = [
        {
            icon: BookOpen,
            label: 'Darslar',
            value: progress.stats.totalLessonsCompleted,
            color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-500/30',
            iconColor: 'text-blue-500 dark:text-blue-400'
        },
        {
            icon: FileText,
            label: 'Testlar',
            value: progress.stats.totalTestsCompleted,
            color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-500/30',
            iconColor: 'text-purple-500 dark:text-purple-400'
        },
        {
            icon: Beaker,
            label: 'Laboratoriyalar',
            value: progress.stats.totalLabsCompleted,
            color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-500/30',
            iconColor: 'text-green-500 dark:text-green-400'
        },
        {
            icon: Target,
            label: "O'rtacha ball",
            value: `${progress.stats.averageTestScore}%`,
            color: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-500/30',
            iconColor: 'text-yellow-600 dark:text-yellow-400'
        },
        {
            icon: Award,
            label: 'Achievementlar',
            value: progress.achievements.length,
            color: 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-500/30',
            iconColor: 'text-pink-500 dark:text-pink-400'
        },
        {
            icon: TrendingUp,
            label: 'Umumiy progress',
            value: `${progress.overallProgress}%`,
            color: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-500/30',
            iconColor: 'text-indigo-500 dark:text-indigo-400'
        }
    ];

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold theme-text">
                Tezkor statistika
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {quickStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="relative group"
                        >
                            <div className={`
                                ${stat.color}
                                p-4 rounded-xl
                                border
                                transition-all duration-300
                                hover:shadow-lg
                            `}>
                                {/* Icon */}
                                <div className={`p-2 rounded-lg bg-white/50 dark:bg-slate-800/50 w-max mb-3`}>
                                    <Icon size={24} className={stat.iconColor} />
                                </div>

                                {/* Value */}
                                <div className="text-2xl font-bold theme-text mb-1">
                                    {stat.value}
                                </div>

                                {/* Label */}
                                <div className="text-xs theme-text-secondary font-medium">
                                    {stat.label}
                                </div>

                                {/* Hover glow */}
                                <div className={`
                                    absolute inset-0 
                                    ${stat.color}
                                    opacity-0 group-hover:opacity-30
                                    rounded-xl
                                    transition-opacity duration-300
                                    -z-10
                                `} />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default StatsCards;
