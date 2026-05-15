import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { PlayCircle, CheckCircle, Lock, Clock, Trophy, ChevronRight, Star } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function LessonItem({ lesson, index, isLocked, isCompleted }) {
    const { t } = useLanguage();
    const { id, chapter_id, title, description, duration_minutes, test_count, difficulty } = lesson;
    const params = useParams();

    // Safe gradeId extraction — use route params as primary, derive from chapter_id as fallback
    const gradeId = params.gradeId || (chapter_id ? `grade-${chapter_id.split('-')[0]}` : 'grade-9');

    // Difficulty badge colors
    const difficultyConfig = {
        easy: { label: t('difficulty_easy') || 'Oson', bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
        medium: { label: t('difficulty_medium') || "O'rta", bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
        hard: { label: t('difficulty_hard') || 'Qiyin', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
    };
    const diffConfig = difficultyConfig[difficulty] || difficultyConfig.easy;

    if (isLocked) {
        return (
            <div className="opacity-50 cursor-not-allowed">
                <div className="flex items-center gap-4 p-4 theme-card border theme-border rounded-2xl">
                    <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center theme-card rounded-xl border theme-border">
                        <Lock size={18} className="theme-muted" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-base font-semibold theme-muted truncate">
                            {index + 1}. {title}
                        </h4>
                        <div className="flex items-center gap-3 mt-1 text-sm theme-muted">
                            <span className="flex items-center gap-1">
                                <Clock size={12} /> {duration_minutes} daq
                            </span>
                        </div>
                    </div>
                    <span className="text-xs font-medium theme-muted theme-card border theme-border px-3 py-1.5 rounded-lg">
                        🔒 {t('locked') || 'Ochilmagan'}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <Link to={`/darsliklar/${gradeId}/${chapter_id}/${id}`} className="block group">
            <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 hover:shadow-lg ${isCompleted
                ? 'bg-emerald-50 dark:bg-green-500/5 border-emerald-300 dark:border-green-500/20 hover:border-emerald-400 dark:hover:border-green-500/40 hover:shadow-emerald-500/10'
                : 'theme-card theme-border hover:border-blue-400/50 dark:hover:border-blue-500/40 hover:shadow-blue-500/5'
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
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${isCompleted ? 'bg-emerald-100 dark:bg-green-500/15 text-emerald-700 dark:text-green-400' : 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                            }`}>
                            {t('common_lesson') || 'Dars'} {index + 1}
                        </span>
                        {isCompleted && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-green-400 bg-emerald-100 dark:bg-green-500/10 px-2 py-0.5 rounded border border-emerald-300 dark:border-green-500/20">
                                <Star size={10} /> {t('completed_word') || 'Tugatildi'}
                            </span>
                        )}
                    </div>
                    <h4 className={`text-base font-semibold truncate ${isCompleted
                        ? 'text-emerald-700 dark:text-green-300'
                        : 'theme-text group-hover:text-blue-600 dark:group-hover:text-blue-300'
                        } transition-colors`}>
                        {title}
                    </h4>

                    <div className="flex items-center gap-3 mt-1.5 text-xs theme-muted">
                        <span className="flex items-center gap-1">
                            <Clock size={12} className="opacity-60" /> {duration_minutes} {t('common_minutes') || 'daqiqa'}
                        </span>
                        {test_count > 0 && (
                            <span className="flex items-center gap-1">
                                <Trophy size={12} className="text-yellow-500/70" /> {test_count} {t('common_tests') || 'test'}
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
                    <div className="hidden sm:flex flex-col items-center gap-1 bg-emerald-50 dark:bg-green-500/10 px-3 py-2 rounded-xl border border-emerald-200 dark:border-green-500/20">
                        <span className="text-xs theme-muted">{t('common_score') || 'Ball'}</span>
                        <span className="text-lg font-bold text-emerald-600 dark:text-green-400">{lesson.score || 90}%</span>
                    </div>
                ) : (
                    <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-700/40 theme-muted group-hover:bg-blue-500 group-hover:text-white transition-all duration-200">
                        <ChevronRight size={18} />
                    </div>
                )}
            </div>
        </Link>
    );
}
