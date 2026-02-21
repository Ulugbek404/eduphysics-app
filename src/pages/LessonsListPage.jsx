import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGrades } from '../hooks/useGrades';
import { useChapters } from '../hooks/useChapters';
import { useLessons } from '../hooks/useLessons';
import { useProgress } from '../hooks/useProgress';
import LessonItem from '../components/darsliklar/LessonItem';
import BreadcrumbNav from '../components/darsliklar/BreadcrumbNav';
import { ArrowLeft, BookOpen, ClipboardList, FlaskConical } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LessonsListPage() {
    const { gradeId, chapterId } = useParams();
    const navigate = useNavigate();

    console.log('[LessonsListPage] Params:', { gradeId, chapterId }); // DEBUG

    const { getGrade } = useGrades();
    const { completedLessons } = useProgress();
    const { getChapter } = useChapters(gradeId, completedLessons);
    const { lessons } = useLessons(chapterId, completedLessons);

    const grade = getGrade(gradeId);
    const chapter = getChapter(chapterId);

    console.log('[LessonsListPage] Data:', { grade: !!grade, chapter: !!chapter, lessonsCount: lessons?.length }); // DEBUG

    if (!grade || !chapter) {
        console.warn('[LessonsListPage] Missing data!', { grade, chapter }); // DEBUG
        return <div className="p-8 text-center text-slate-400">Ma'lumot topilmadi</div>;
    }

    const completedCount = lessons.filter(l => l.status === 'completed').length;
    const progress = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

    // Color mapping for chapter gradient backgrounds
    const colorGradients = {
        blue: 'from-blue-600 via-indigo-600 to-blue-700',
        orange: 'from-orange-500 via-red-500 to-orange-600',
        yellow: 'from-amber-500 via-yellow-500 to-orange-500',
        cyan: 'from-cyan-500 via-teal-500 to-cyan-600',
        green: 'from-emerald-500 via-green-500 to-emerald-600',
    };
    const gradient = colorGradients[chapter.color] || colorGradients.blue;

    return (
        <div className="h-screen overflow-y-auto custom-scrollbar font-sans text-slate-100">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto p-6 pb-28 min-h-full"
            >
                {/* Top Navigation Row */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(`/darsliklar/${gradeId}`)}
                            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 transition-all border border-slate-700/50 hover:border-slate-600 active:scale-95"
                        >
                            <ArrowLeft size={20} className="text-slate-300" />
                        </button>
                        <BreadcrumbNav items={[
                            { label: grade.name, href: `/darsliklar/${gradeId}` },
                            { label: chapter.name },
                        ]} />
                    </div>
                </div>

                {/* Hero Header with Chapter Color */}
                <div className="relative overflow-hidden rounded-3xl mb-8">
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10" />

                    <div className="relative z-10 p-8">
                        <div className="flex items-start justify-between gap-4">
                            {/* Left Content */}
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 border border-white/20">
                                    <span className="text-xl">{chapter.icon}</span>
                                    <span className="text-sm font-semibold text-white/90">Bob {chapter.order_number || ''}</span>
                                </div>

                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{chapter.name}</h1>
                                <p className="text-white/70 text-base max-w-lg leading-relaxed mb-5">{chapter.description}</p>

                                {/* Stats badges */}
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                                        <BookOpen size={14} className="text-white/80" />
                                        <span className="text-sm font-medium text-white">{lessons.length} ta dars</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                                        <ClipboardList size={14} className="text-white/80" />
                                        <span className="text-sm font-medium text-white">{chapter.total_tests || 0} ta test</span>
                                    </div>
                                    {chapter.total_labs > 0 && (
                                        <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                                            <FlaskConical size={14} className="text-white/80" />
                                            <span className="text-sm font-medium text-white">{chapter.total_labs} ta tajriba</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right — Mini Progress */}
                            <div className="hidden sm:flex flex-col items-center gap-2">
                                <div className="relative w-20 h-20">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
                                        <circle
                                            cx="50" cy="50" r="42"
                                            fill="none" stroke="white" strokeWidth="8" strokeLinecap="round"
                                            strokeDasharray={`${progress * 2.64} ${264 - progress * 2.64}`}
                                            className="transition-all duration-1000"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xl font-bold text-white">{progress}%</span>
                                    </div>
                                </div>
                                <span className="text-white/50 text-xs font-medium">{completedCount}/{lessons.length} tugatildi</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section Title */}
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-white">Darslar ro'yxati</h2>
                    <span className="text-sm text-slate-500">{completedCount}/{lessons.length} tugatildi</span>
                </div>

                {/* Lessons List */}
                <div className="space-y-3">
                    {lessons.map((lesson, index) => (
                        <motion.div
                            key={lesson.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                        >
                            <LessonItem
                                lesson={lesson}
                                index={index}
                                isLocked={lesson.status === 'locked'}
                                isCompleted={lesson.status === 'completed'}
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
