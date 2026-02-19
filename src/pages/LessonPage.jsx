
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGrades } from '../hooks/useGrades';
import { useChapters } from '../hooks/useChapters';
import { useLessons } from '../hooks/useLessons';
import { useProgress } from '../hooks/useProgress';
import BreadcrumbNav from '../components/darsliklar/BreadcrumbNav';
import LessonQuiz from '../components/darsliklar/LessonQuiz';
import AITutorModule from '../components/AITutorModule';
import { ArrowLeft, PlayCircle, FileText, CheckSquare, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LessonPage() {
    const { gradeId, chapterId, lessonId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dars');

    const { getGrade } = useGrades();
    const { getChapter } = useChapters(gradeId);
    const { completedLessons, completeLesson } = useProgress();
    const { getLesson } = useLessons(chapterId);

    const grade = getGrade(gradeId);
    const chapter = getChapter(chapterId);
    const lesson = getLesson(lessonId);

    if (!grade || !chapter || !lesson) return <div className="p-8 text-center">Dars topilmadi</div>;

    const handleLessonComplete = (score) => {
        completeLesson(lessonId, score);
        // Optional: Show celebration or navigate
    };

    const tabs = [
        { id: 'dars', label: 'Dars', icon: PlayCircle },
        { id: 'misollar', label: 'Misollar', icon: FileText },
        { id: 'testlar', label: 'Testlar', icon: CheckSquare },
        { id: 'ai-ustoz', label: 'AI Ustoz', icon: MessageSquare },
    ];

    return (
        <div className="fixed inset-0 bg-[#0f1117] font-sans text-slate-100 overflow-y-auto custom-scrollbar">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto space-y-6 p-6 pb-24 min-h-full"
            >

                {/* Header Section */}
                <div className="space-y-6">
                    {/* Back + Breadcrumb */}
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(`/darsliklar/${gradeId}/${chapterId}`)} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700">
                            <ArrowLeft size={20} className="text-slate-300" />
                        </button>
                        <BreadcrumbNav items={[
                            { label: grade.name, href: `/darsliklar/${gradeId}` },
                            { label: chapter.name, href: `/darsliklar/${gradeId}/${chapterId}` },
                            { label: lesson.title },
                        ]} />
                    </div>

                    <h1 className="text-3xl font-bold text-white">{lesson.title}</h1>

                    {/* Tabs */}
                    <div className="flex space-x-2 border-b border-slate-700 pb-1 overflow-x-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-medium transition-all relative ${activeTab === tab.id
                                    ? 'text-blue-400 bg-slate-800 border-b-2 border-blue-500'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                    }`}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 md:p-8 min-h-[400px]">
                    {activeTab === 'dars' && (
                        <div className="prose prose-invert max-w-none">
                            <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 mb-6 rounded-r-xl">
                                <h3 className="text-blue-400 font-bold m-0">Dars maqsadi:</h3>
                                <p className="m-0 text-slate-300">{lesson.description}</p>
                            </div>
                            {lesson.content?.theory ? (
                                <div className="whitespace-pre-line text-slate-300 leading-relaxed text-lg">
                                    {lesson.content.theory}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                                    <PlayCircle size={48} className="mb-4 opacity-50" />
                                    <p>Video va matnli dars kontenti</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'misollar' && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold">Na'munaaviy masalalar yechimi</h3>
                            <div className="p-6 bg-slate-900 rounded-xl border border-slate-700">
                                <p className="text-slate-400 mb-2">Masala #1</p>
                                <p className="font-medium text-white mb-4">Avtomobil 72 km/soat tezlik bilan harakatlanmoqda. Uning tezligini m/s da ifodalang.</p>
                                <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm text-green-400">
                                    <p>Berilgan:</p>
                                    <p>v = 72 km/soat</p>
                                    <p>---</p>
                                    <p>v (m/s) = ?</p>
                                    <br />
                                    <p>Yechish:</p>
                                    <p>1 km = 1000 m, 1 soat = 3600 s</p>
                                    <p>v = 72 * 1000 / 3600 = 20 m/s</p>
                                    <br />
                                    <p>Javob: 20 m/s</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'testlar' && (
                        <LessonQuiz lessonId={lesson.id} onComplete={handleLessonComplete} />
                    )}

                    {activeTab === 'ai-ustoz' && (
                        <div className="h-[600px] border border-slate-700 rounded-xl overflow-hidden">
                            <AITutorModule setActiveTab={() => { }} />
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
