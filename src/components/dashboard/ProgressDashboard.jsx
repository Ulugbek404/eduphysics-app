import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '../../contexts/ProgressContext';
import ProgressOverview from './ProgressOverview';
import StatsCards from './StatsCards';
import { BarChart3, Calendar, Trophy } from 'lucide-react';
import ActivityHeatmap from '../progress/ActivityHeatmap';

/**
 * Progress Dashboard Component
 * Main dashboard showing all progress and statistics
 */
const ProgressDashboard = () => {
    const { progress, loading } = useProgress();
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Umumiy', icon: BarChart3 },
        { id: 'activity', label: 'Faollik', icon: Calendar },
        { id: 'achievements', label: 'Yutuqlar', icon: Trophy }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="theme-text-secondary">Yuklanmoqda...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="flex gap-2 border-b theme-border pb-2">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-lg
                                font-medium transition-all duration-200
                                ${activeTab === tab.id
                                    ? 'bg-blue-600 text-white-fixed shadow-lg shadow-blue-500/30'
                                    : 'theme-text-secondary hover:theme-text hover:bg-slate-200 dark:hover:bg-slate-800'
                                }
                            `}
                        >
                            <Icon size={18} />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* Progress Overview */}
                        <ProgressOverview />

                        {/* Quick Stats */}
                        <StatsCards />

                        {/* Placeholder for charts */}
                        <div className="theme-card border theme-border rounded-xl p-6">
                            <h3 className="text-lg font-bold theme-text mb-4">
                                XP Grafigi (7 kun)
                            </h3>
                            <div className="h-64 flex items-center justify-center theme-text-secondary">
                                Chart component - keyingi bosqichda qo'shiladi
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'activity' && (
                    <ActivityHeatmap />
                )}

                {activeTab === 'achievements' && (
                    <div className="theme-card border theme-border rounded-xl p-6">
                        <h3 className="text-lg font-bold theme-text mb-4">
                            Yutuqlar Timeline
                        </h3>
                        <div className="h-64 flex items-center justify-center theme-text-secondary border-2 border-dashed theme-border rounded-xl">
                            {progress.achievements.length === 0 ? (
                                <p className="theme-muted">Hali yutuqlar yo'q. Darslarni boshlang!</p>
                            ) : (
                                <p className="theme-text">{progress.achievements.length} ta yutuq olindi!</p>
                            )}
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default ProgressDashboard;
