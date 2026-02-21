import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Trophy, FlaskConical, Clock, ChevronRight, Sparkles } from 'lucide-react';

export default function ChapterCard({ chapter, progress = 0 }) {
    const { id, grade_id, name, description, icon, total_lessons, total_tests, total_labs, estimated_hours, color } = chapter;
    const lessonsCount = chapter.lessons?.length || total_lessons || 0;

    // Color mapping for gradients and accents
    const colorMap = {
        blue: { gradient: 'from-blue-500 to-indigo-600', bg: 'bg-blue-500', text: 'text-blue-400', ring: 'ring-blue-500/20', light: 'bg-blue-500/10' },
        orange: { gradient: 'from-orange-500 to-red-600', bg: 'bg-orange-500', text: 'text-orange-400', ring: 'ring-orange-500/20', light: 'bg-orange-500/10' },
        yellow: { gradient: 'from-amber-400 to-orange-500', bg: 'bg-amber-500', text: 'text-amber-400', ring: 'ring-amber-500/20', light: 'bg-amber-500/10' },
        cyan: { gradient: 'from-cyan-500 to-teal-500', bg: 'bg-cyan-500', text: 'text-cyan-400', ring: 'ring-cyan-500/20', light: 'bg-cyan-500/10' },
        green: { gradient: 'from-emerald-500 to-green-600', bg: 'bg-emerald-500', text: 'text-emerald-400', ring: 'ring-emerald-500/20', light: 'bg-emerald-500/10' },
    };

    const colors = colorMap[color] || colorMap.blue;

    return (
        <Link to={`/darsliklar/${grade_id}/${id}`} className="block h-full">
            <div className="h-full flex flex-col bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-2xl overflow-hidden hover:border-slate-500/80 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 group">

                {/* Color Strip Top */}
                <div className={`h-1.5 bg-gradient-to-r ${colors.gradient}`} />

                <div className="p-6 flex flex-col flex-1">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${colors.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <span className="text-2xl">{icon}</span>
                        </div>
                        {progress > 0 && (
                            <div className={`${colors.light} px-3 py-1.5 rounded-full border border-slate-700/50`}>
                                <span className={`text-xs font-bold ${colors.text}`}>{progress}%</span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 mb-5">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                            {name}
                        </h3>
                        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-2 mb-5">
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs bg-slate-900/40 p-2.5 rounded-xl">
                            <Book size={13} className="text-blue-400 flex-shrink-0" />
                            <span>{lessonsCount} dars</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs bg-slate-900/40 p-2.5 rounded-xl">
                            <Trophy size={13} className="text-yellow-400 flex-shrink-0" />
                            <span>{total_tests || 0} test</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs bg-slate-900/40 p-2.5 rounded-xl">
                            <FlaskConical size={13} className="text-purple-400 flex-shrink-0" />
                            <span>{total_labs || 0} lab</span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-5">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-slate-500">Progress</span>
                            <span className={`text-xs font-bold ${colors.text}`}>{progress}%</span>
                        </div>
                        <div className="w-full bg-slate-700/40 h-2 rounded-full overflow-hidden">
                            <div
                                className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full transition-all duration-1000`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className={`flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r ${colors.gradient} text-white font-semibold text-sm group-hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]`}>
                        {progress === 0 ? (
                            <>
                                <Sparkles size={16} />
                                <span>Boshlash</span>
                            </>
                        ) : progress === 100 ? (
                            <>
                                <span>Qayta ko'rish</span>
                                <ChevronRight size={16} />
                            </>
                        ) : (
                            <>
                                <span>Davom etish</span>
                                <ChevronRight size={16} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
