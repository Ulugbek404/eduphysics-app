import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGrades } from '../hooks/useGrades';
import { useChapters } from '../hooks/useChapters';
import { useProgress } from '../hooks/useProgress';
import ChapterCard from '../components/darsliklar/ChapterCard';
import BreadcrumbNav from '../components/darsliklar/BreadcrumbNav';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';

export default function ChaptersPage() {
    const { gradeId } = useParams();
    const navigate = useNavigate();
    const { getGrade } = useGrades();
    const { completedLessons } = useProgress();
    const { chapters } = useChapters(gradeId, completedLessons);

    const grade = getGrade(gradeId);

    if (!grade) return <div className="p-8 text-center">Sinf topilmadi</div>;

    return (
        <div className="fixed inset-0 bg-[#0f1117] font-sans text-slate-100 overflow-y-auto custom-scrollbar">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto space-y-8 p-6 pb-24 min-h-full"
            >
                {/* Back + Breadcrumb */}
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => navigate('/darsliklar')} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700">
                        <ArrowLeft size={20} className="text-slate-300" />
                    </button>
                    <BreadcrumbNav items={[{ label: grade.name }]} />
                </div>

                {/* Header Section */}
                <div className="space-y-6">
                    {/* Title & Icon */}
                    <div className="flex items-start gap-4">
                        <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white shadow-lg shadow-purple-500/20">
                            <span className="text-4xl">{grade.icon}</span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-1">{grade.name}</h1>
                            <p className="text-slate-400">{grade.description}</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-400">Umumiy progress</span>
                            <span className="text-blue-400 font-bold">0%</span>
                        </div>
                        <div className="w-full bg-slate-700/50 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full w-[0%]"></div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Boblarni qidirish..."
                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl py-3 px-4 pl-12 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <svg className="absolute left-4 top-3.5 text-slate-500" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Chapters Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {chapters.map(chapter => (
                        <ChapterCard
                            key={chapter.id}
                            chapter={chapter}
                            progress={chapter.progress}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
