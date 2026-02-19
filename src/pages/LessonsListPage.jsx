import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGrades } from '../hooks/useGrades';
import { useChapters } from '../hooks/useChapters';
import { useLessons } from '../hooks/useLessons';
import { useProgress } from '../hooks/useProgress';
import LessonItem from '../components/darsliklar/LessonItem';
import BreadcrumbNav from '../components/darsliklar/BreadcrumbNav';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';

export default function LessonsListPage() {
    const { gradeId, chapterId } = useParams();
    const navigate = useNavigate();

    const { getGrade } = useGrades();
    const { getChapter } = useChapters(gradeId);
    const { completedLessons } = useProgress();
    const { lessons } = useLessons(chapterId, completedLessons);

    const grade = getGrade(gradeId);
    const chapter = getChapter(chapterId);

    if (!grade || !chapter) return <div className="p-8 text-center">Ma'lumot topilmadi</div>;

    return (
        <div className="fixed inset-0 bg-[#0f1117] font-sans text-slate-100 overflow-y-auto custom-scrollbar">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto space-y-8 p-6 pb-24 min-h-full"
            >
                {/* Back + Breadcrumb */}
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => navigate(`/darsliklar/${gradeId}`)} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700">
                        <ArrowLeft size={20} className="text-slate-300" />
                    </button>
                    <BreadcrumbNav items={[
                        { label: grade.name, href: `/darsliklar/${gradeId}` },
                        { label: chapter.name },
                    ]} />
                </div>

                <div className="flex items-start justify-between gap-6 mb-8 p-6 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 relative overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold mb-2 text-white">{chapter.name}</h1>
                        <p className="text-slate-400 max-w-xl">{chapter.description}</p>

                        <div className="flex items-center gap-4 mt-4">
                            <div className="px-3 py-1 rounded-full bg-slate-700/50 border border-slate-600 text-xs font-medium text-slate-300">
                                {chapter.total_lessons || 0} ta dars
                            </div>
                            <div className="px-3 py-1 rounded-full bg-slate-700/50 border border-slate-600 text-xs font-medium text-slate-300">
                                {chapter.total_tests || 0} ta test
                            </div>
                        </div>
                    </div>
                    <div className="relative z-10 text-5xl bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 shadow-xl backdrop-blur-sm">
                        {chapter.icon}
                    </div>
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                </div>

                {/* Lessons List */}
                <div className="space-y-4">
                    {lessons.map((lesson, index) => (
                        <LessonItem
                            key={lesson.id}
                            lesson={lesson}
                            index={index}
                            isLocked={lesson.status === 'locked'}
                            isCompleted={lesson.status === 'completed'}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
