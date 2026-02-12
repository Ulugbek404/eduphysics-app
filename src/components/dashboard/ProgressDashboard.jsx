import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '../../contexts/ProgressContext';
import ProgressOverview from './ProgressOverview';
import StatsCards from './StatsCards';
import { BarChart3, Calendar, Trophy } from 'lucide-react';

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
                    <p className="text-slate-400">Yuklanmoqda...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-700 pb-2">
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
                                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
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
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4">
                                XP Grafigi (7 kun)
                            </h3>
                            <div className="h-64 flex items-center justify-center text-slate-500">
                                Chart component - keyingi bosqichda qo'shiladi
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'activity' && (
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">
                            Faollik Kalendari
                        </h3>
                        <div className="h-64 flex items-center justify-center text-slate-500">
                            Activity heatmap - keyingi bosqichda qo'shiladi
                        </div>
                    </div>
                )}

                {activeTab === 'achievements' && (
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">
                            Yutuqlar Timeline
                        </h3>
                        <div className="h-64 flex items-center justify-center text-slate-500">
                            {progress.achievements.length === 0 ? (
                                <p>Hali yutuqlar yo'q. Darslarni boshlang!</p>
                            ) : (
                                <p>{progress.achievements.length} ta yutuq olindi!</p>
                            )}
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default ProgressDashboard;
