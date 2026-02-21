import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGrades } from '../hooks/useGrades';
import { useChapters } from '../hooks/useChapters';
import { useProgress } from '../hooks/useProgress';
import ChapterCard from '../components/darsliklar/ChapterCard';
import BreadcrumbNav from '../components/darsliklar/BreadcrumbNav';
import { ArrowLeft, BookOpen, FlaskConical, ClipboardList, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChaptersPage() {
    const { gradeId } = useParams();
    const navigate = useNavigate();
    const { getGrade } = useGrades();
    const { completedLessons } = useProgress();
    const { chapters } = useChapters(gradeId, completedLessons);

    const grade = getGrade(gradeId);

    if (!grade) return <div className="p-8 text-center text-slate-400">Sinf topilmadi</div>;

    // Calculate overall stats
    const totalLessons = chapters.reduce((sum, ch) => sum + (ch.lessons?.length || 0), 0);
    const totalTests = chapters.reduce((sum, ch) => sum + (ch.total_tests || 0), 0);
    const totalLabs = chapters.reduce((sum, ch) => sum + (ch.total_labs || 0), 0);
    const totalHours = chapters.reduce((sum, ch) => sum + (ch.estimated_hours || 0), 0);
    const overallProgress = chapters.length > 0
        ? Math.round(chapters.reduce((sum, ch) => sum + (ch.progress || 0), 0) / chapters.length)
        : 0;

    const stats = [
        { icon: <BookOpen size={18} />, value: totalLessons, label: 'Darslar', iconColor: 'text-blue-400' },
        { icon: <ClipboardList size={18} />, value: totalTests, label: 'Testlar', iconColor: 'text-green-400' },
        { icon: <FlaskConical size={18} />, value: totalLabs, label: 'Tajribalar', iconColor: 'text-purple-400' },
        { icon: <Clock size={18} />, value: `${totalHours}h`, label: 'Soat', iconColor: 'text-amber-400' },
    ];

    return (
        <div className="h-screen overflow-y-auto custom-scrollbar font-sans text-slate-100">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto p-6 pb-28 min-h-full"
            >
                {/* Top Navigation Row */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/darsliklar')}
                            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 transition-all border border-slate-700/50 hover:border-slate-600 active:scale-95"
                        >
                            <ArrowLeft size={20} className="text-slate-300" />
                        </button>
                        <BreadcrumbNav items={[{ label: grade.name }]} />
                    </div>
                </div>

                {/* Hero Header with Gradient */}
                <div className="relative overflow-hidden rounded-3xl mb-8">
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700" />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2MmgxMnptLTYtNmgydjEyaC0yVjI0em00IDBoMnYxMmgtMlYyNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />

                    {/* Glowing Orbs */}
                    <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl -ml-10 -mb-10" />

                    <div className="relative z-10 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        {/* Left Side */}
                        <div className="flex items-start gap-5">
                            <div className="p-4 bg-white/15 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl">
                                <span className="text-5xl">{grade.icon}</span>
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{grade.name}</h1>
                                <p className="text-white/70 text-lg">{grade.description}</p>
                                <p className="text-white/50 text-sm mt-2">O'zbekiston Davlat Ta'lim Standarti asosida</p>
                            </div>
                        </div>

                        {/* Right Side — Progress Circle */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="relative w-24 h-24">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8" />
                                    <circle
                                        cx="50" cy="50" r="42"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        strokeDasharray={`${overallProgress * 2.64} ${264 - overallProgress * 2.64}`}
                                        className="transition-all duration-1000"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-white">{overallProgress}%</span>
                                </div>
                            </div>
                            <span className="text-white/60 text-sm font-medium">Umumiy progress</span>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="relative z-10 px-8 pb-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                                    <div className={`${stat.iconColor}`}>{stat.icon}</div>
                                    <div>
                                        <div className="text-lg font-bold text-white">{stat.value}</div>
                                        <div className="text-xs text-white/50">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Section Title */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Bo'limlar</h2>
                    <span className="text-sm text-slate-500">{chapters.length} ta bob</span>
                </div>

                {/* Chapters Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {chapters.map((chapter, index) => (
                        <motion.div
                            key={chapter.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                        >
                            <ChapterCard
                                chapter={chapter}
                                progress={chapter.progress}
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
