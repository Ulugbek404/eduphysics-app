
import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, CheckCircle, Lock, Clock, Trophy, ChevronRight } from 'lucide-react';

export default function LessonItem({ lesson, index, isLocked, isCompleted }) {
    const { id, chapter_id, title, description, duration_minutes, test_count, difficulty } = lesson;

    // Extract gradeId from chapterId (assuming format grade-9-ch-01)
    // Actually hook provides chapter object, but we need route params
    // Route is /darsliklar/:gradeId/:chapterId/:lessonId
    // We can construct it from props or use string splits. 
    // chapter_id is like '9-ch-01', so grade_id is 'grade-9'
    const gradeId = `grade-${chapter_id.split('-')[0]}`;

    if (isLocked) {
        return (
            <div className="opacity-60 grayscale cursor-not-allowed">
                <div className="flex items-center gap-4 p-4 bg-slate-800/30 border border-slate-700/50 rounded-2xl">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-slate-800 rounded-xl border border-slate-700">
                        <Lock size={20} className="text-slate-500" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-lg font-bold text-slate-400 mb-1">{index + 1}. {title}</h4>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                                <Clock size={14} /> {duration_minutes} daqiqa
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Link to={`/darsliklar/${gradeId}/${chapter_id}/${id}`} className="block group">
            <div className={`flex items-center gap-4 p-4 bg-slate-800/50 border border-slate-700 rounded-2xl transition-all hover:border-blue-500/50 hover:bg-slate-800 hover:shadow-lg hover:shadow-blue-500/5 ${isCompleted ? 'border-green-500/30 bg-green-500/5' : ''}`}>

                {/* Icon */}
                <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl border transition-colors ${isCompleted ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-blue-500/10 border-blue-500/30 text-blue-500 group-hover:scale-110'}`}>
                    {isCompleted ? <CheckCircle size={24} /> : <PlayCircle size={24} />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className={`text-lg font-bold truncate ${isCompleted ? 'text-green-400' : 'text-white group-hover:text-blue-400'}`}>
                            {index + 1}. {title}
                        </h4>
                        {isCompleted && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/20">
                                TUGATILDI
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                            <Clock size={14} /> {duration_minutes} daqiqa
                        </span>
                        <span className="flex items-center gap-1">
                            <Trophy size={14} className="text-yellow-500/70" /> {test_count} ta savol
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${difficulty === 'easy' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                    'bg-red-500/10 text-red-400 border-red-500/20'
                            }`}>
                            {difficulty.toUpperCase()}
                        </span>
                    </div>
                </div>

                {/* Arrow */}
                <div className="p-2 rounded-full bg-slate-700/50 text-slate-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <ChevronRight size={20} />
                </div>
            </div>
        </Link>
    );
}
