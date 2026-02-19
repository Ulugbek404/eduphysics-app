
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Play, Trophy, Users, ChevronRight } from 'lucide-react';

export default function ChapterCard({ chapter, progress = 0 }) {
    const { id, grade_id, name, description, icon, total_lessons, total_tests, color } = chapter;

    // Color mapping
    const colorMap = {
        blue: 'from-blue-500 to-indigo-600',
        orange: 'from-orange-500 to-red-600',
        yellow: 'from-yellow-400 to-orange-500',
        cyan: 'from-cyan-500 to-blue-500',
        green: 'from-emerald-500 to-green-600',
    };

    const gradient = colorMap[color] || colorMap.blue;

    return (
        <Link to={`/darsliklar/${grade_id}/${id}`} className="block h-full">
            <div className="h-full flex flex-col bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-slate-500 transition-all hover:shadow-lg group">

                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
                        <span className="text-2xl text-white">{icon}</span>
                    </div>
                    <div className="bg-slate-900/50 px-3 py-1 rounded-full border border-slate-700">
                        <span className="text-xs font-bold text-slate-300">{progress}%</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {name}
                    </h3>
                    <p className="text-sm text-slate-400 mb-6 line-clamp-2">
                        {description}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 text-slate-400 text-xs bg-slate-900/30 p-2 rounded-lg">
                        <Book size={14} className="text-blue-400" />
                        <span>{total_lessons} dars</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs bg-slate-900/30 p-2 rounded-lg">
                        <Trophy size={14} className="text-yellow-400" />
                        <span>{total_tests} test</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-700/50 h-2 rounded-full overflow-hidden mb-4">
                    <div
                        className={`h-full bg-gradient-to-r ${gradient} transition-all duration-1000`}
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Action Button */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        {progress === 0 ? 'Boshlash' : progress === 100 ? 'Qayta ko\'rish' : 'Davom etish'}
                    </span>
                    <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    );
}
