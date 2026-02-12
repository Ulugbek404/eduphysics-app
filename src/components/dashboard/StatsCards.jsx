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
            color: 'from-blue-500 to-cyan-500',
            iconColor: 'text-blue-400'
        },
        {
            icon: FileText,
            label: 'Testlar',
            value: progress.stats.totalTestsCompleted,
            color: 'from-purple-500 to-pink-500',
            iconColor: 'text-purple-400'
        },
        {
            icon: Beaker,
            label: 'Laboratoriyalar',
            value: progress.stats.totalLabsCompleted,
            color: 'from-green-500 to-emerald-500',
            iconColor: 'text-green-400'
        },
        {
            icon: Target,
            label: "O'rtacha ball",
            value: `${progress.stats.averageTestScore}%`,
            color: 'from-yellow-500 to-orange-500',
            iconColor: 'text-yellow-400'
        },
        {
            icon: Award,
            label: 'Achievementlar',
            value: progress.achievements.length,
            color: 'from-pink-500 to-rose-500',
            iconColor: 'text-pink-400'
        },
        {
            icon: TrendingUp,
            label: 'Umumiy progress',
            value: `${progress.overallProgress}%`,
            color: 'from-indigo-500 to-purple-500',
            iconColor: 'text-indigo-400'
        }
    ];

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">
                Tezkor Statistika
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
                                bg-gradient-to-br ${stat.color}
                                p-4 rounded-xl
                                border border-white/10
                                hover:border-white/20
                                transition-all duration-300
                                hover:shadow-lg
                            `}>
                                {/* Icon */}
                                <div className={`${stat.iconColor} mb-2`}>
                                    <Icon size={24} />
                                </div>

                                {/* Value */}
                                <div className="text-2xl font-bold text-white mb-1">
                                    {stat.value}
                                </div>

                                {/* Label */}
                                <div className="text-xs text-white/80 font-medium">
                                    {stat.label}
                                </div>

                                {/* Hover glow */}
                                <div className={`
                                    absolute inset-0 
                                    bg-gradient-to-br ${stat.color}
                                    opacity-0 group-hover:opacity-20
                                    rounded-xl
                                    transition-opacity duration-300
                                    blur-xl
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
