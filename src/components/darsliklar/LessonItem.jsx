import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { PlayCircle, CheckCircle, Lock, Clock, Trophy, ChevronRight, Star } from 'lucide-react';

export default function LessonItem({ lesson, index, isLocked, isCompleted }) {
    const { id, chapter_id, title, description, duration_minutes, test_count, difficulty } = lesson;
    const params = useParams();

    // Safe gradeId extraction — use route params as primary, derive from chapter_id as fallback
    const gradeId = params.gradeId || (chapter_id ? `grade-${chapter_id.split('-')[0]}` : 'grade-9');

    // Difficulty badge colors
    const difficultyConfig = {
        easy: { label: 'Oson', bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
        medium: { label: "O'rta", bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
        hard: { label: 'Qiyin', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
    };
    const diffConfig = difficultyConfig[difficulty] || difficultyConfig.easy;

    if (isLocked) {
        return (
            <div className="opacity-50 cursor-not-allowed">
                <div className="flex items-center gap-4 p-4 bg-slate-800/20 border border-slate-800/50 rounded-2xl">
                    <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center bg-slate-800/60 rounded-xl border border-slate-700/50">
                        <Lock size={18} className="text-slate-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-base font-semibold text-slate-500 truncate">
                            {index + 1}. {title}
                        </h4>
                        <div className="flex items-center gap-3 mt-1 text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                                <Clock size={12} /> {duration_minutes} daq
                            </span>
                        </div>
                    </div>
                    <span className="text-xs font-medium text-slate-600 bg-slate-800/40 px-3 py-1.5 rounded-lg">
                        🔒 Ochilmagan
                    </span>
                </div>
            </div>
        );
    }

    return (
        <Link to={`/darsliklar/${gradeId}/${chapter_id}/${id}`} className="block group">
            <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 hover:shadow-lg ${isCompleted
                ? 'bg-green-500/5 border-green-500/20 hover:border-green-500/40 hover:shadow-green-500/5'
                : 'bg-slate-800/50 border-slate-700/60 hover:border-blue-500/40 hover:bg-slate-800/80 hover:shadow-blue-500/5'
                }`}>

                {/* Status Icon */}
                <div className={`flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-xl border transition-all ${isCompleted
                    ? 'bg-green-500/15 border-green-500/30 text-green-400'
                    : 'bg-blue-500/10 border-blue-500/25 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20'
                    }`}>
                    {isCompleted ? <CheckCircle size={22} /> : <PlayCircle size={22} />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${isCompleted ? 'bg-green-500/15 text-green-400' : 'bg-blue-500/10 text-blue-400'
                            }`}>
                            Dars {index + 1}
                        </span>
                        {isCompleted && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                                <Star size={10} /> TUGATILDI
                            </span>
                        )}
                    </div>
                    <h4 className={`text-base font-semibold truncate ${isCompleted ? 'text-green-300' : 'text-white group-hover:text-blue-300'
                        } transition-colors`}>
                        {title}
                    </h4>

                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                            <Clock size={12} className="text-slate-500" /> {duration_minutes} daqiqa
                        </span>
                        {test_count > 0 && (
                            <span className="flex items-center gap-1">
                                <Trophy size={12} className="text-yellow-500/70" /> {test_count} test
                            </span>
                        )}
                        {difficulty && (
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${diffConfig.bg} ${diffConfig.text} ${diffConfig.border}`}>
                                {diffConfig.label}
                            </span>
                        )}
                    </div>
                </div>

                {/* Right Side */}
                {isCompleted ? (
                    <div className="hidden sm:flex flex-col items-center gap-1 bg-green-500/10 px-3 py-2 rounded-xl border border-green-500/20">
                        <span className="text-xs text-slate-500">Ball</span>
                        <span className="text-lg font-bold text-green-400">{lesson.score || 90}%</span>
                    </div>
                ) : (
                    <div className="p-2.5 rounded-xl bg-slate-700/40 text-slate-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-200">
                        <ChevronRight size={18} />
                    </div>
                )}
            </div>
        </Link>
    );
}
