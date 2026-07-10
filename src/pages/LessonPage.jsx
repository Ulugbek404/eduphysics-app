
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGrades } from '../hooks/useGrades';
import { useChapters } from '../hooks/useChapters';
import { useLessons } from '../hooks/useLessons';
import { useProgress } from '../hooks/useProgress';
import BreadcrumbNav from '../components/darsliklar/BreadcrumbNav';
import LessonQuiz from '../components/darsliklar/LessonQuiz';
import TheoryRenderer from '../components/darsliklar/TheoryRenderer';
import AITutorModule from '../components/AITutorModule';
import { ArrowLeft, PlayCircle, FileText, CheckSquare, MessageSquare, BookOpen, Calculator, Trophy, Award, CheckCircle, Star, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export default function LessonPage() {
    const { t } = useLanguage();
    const { gradeId, chapterId, lessonId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dars');
    const [showXPPopup, setShowXPPopup] = useState(false);
    const [aiMessages, setAiMessages] = useState([]);

    const { getGrade } = useGrades();
    const { completedLessons, completeLesson } = useProgress();
    const { getChapter } = useChapters(gradeId, completedLessons);
    const { getLesson } = useLessons(chapterId, completedLessons);

    const grade = getGrade(gradeId);
    const chapter = getChapter(chapterId);
    const lesson = getLesson(lessonId);

    // ── Oxirgi ko'rilgan darsni localStorage'ga saqlash ──
    useEffect(() => {
        if (lesson?.title) {
            const lastLesson = {
                title: lesson.title,
                path: `/darsliklar/${gradeId}/${chapterId}/${lessonId}`,
            };
            localStorage.setItem('lastViewedLesson', JSON.stringify(lastLesson));
        }
    }, [lessonId, lesson?.title, gradeId, chapterId]);

    // ── AI Ustoz holatini saqlash ──
    useEffect(() => {
        if (aiMessages.length === 0 && chapter?.name && lesson?.title) {
            setAiMessages([{ role: 'ai', text: (t('lesson_ai_greeting') || `Salom! Men NurFizika AI ustoziman. ⚛️\n{chapter} — {lesson} mavzusidan savollaringiz bo'lsa bemalol so'rang!`).replace('{chapter}', chapter.name).replace('{lesson}', lesson.title) }]);
        }
    }, [chapter?.name, lesson?.title, aiMessages.length]);

    if (!grade || !chapter || !lesson) return <div className="p-8 text-center">{t('error_lesson_not_found') || 'Dars topilmadi'}</div>;

    const isLessonCompleted = completedLessons.includes(lessonId);

    const handleLessonComplete = (score) => {
        completeLesson(lessonId, score);
    };

    const handleMarkComplete = () => {
        if (!isLessonCompleted) {
            completeLesson(lessonId, 100);
            // Add XP to localStorage
            const currentXP = parseInt(localStorage.getItem('totalXP') || '0');
            localStorage.setItem('totalXP', String(currentXP + 50));
            setShowXPPopup(true);
            setTimeout(() => setShowXPPopup(false), 3000);
        }
    };

    const tabs = [
        { id: 'dars', label: t('tabs_lesson') || 'Dars', icon: PlayCircle },
        { id: 'video', label: t('tabs_video') || 'Video', icon: Youtube },
        { id: 'formulalar', label: t('tabs_formulas') || 'Formulalar', icon: Calculator },
        { id: 'misollar', label: t('tabs_examples') || 'Misollar', icon: FileText },
        { id: 'testlar', label: t('tabs_tests') || 'Testlar', icon: CheckSquare },
        { id: 'ai-ustoz', label: t('tabs_ai_tutor') || 'AI Ustoz', icon: MessageSquare },
    ];

    const formulas = lesson.content?.formulas || [];
    const examples = lesson.content?.examples || [];

    return (
        <div className="h-screen overflow-y-auto custom-scrollbar font-sans theme-bg theme-text">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto space-y-6 p-6 pb-24 min-h-full"
            >
                {/* Header */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(`/darsliklar/${gradeId}/${chapterId}`)} className="p-2 rounded-xl theme-card hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors border theme-border">
                            <ArrowLeft size={20} className="theme-muted" />
                        </button>
                        <BreadcrumbNav items={[
                            { label: grade.name, href: `/darsliklar/${gradeId}` },
                            { label: chapter.name, href: `/darsliklar/${gradeId}/${chapterId}` },
                            { label: lesson.title },
                        ]} />
                    </div>

                    <h1 className="text-3xl font-bold theme-text">{lesson.title}</h1>

                    {/* Tabs */}
                    <div className="flex gap-2 border-b theme-border pb-1 overflow-x-auto custom-scrollbar">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-5 py-3 flex-shrink-0 rounded-t-xl font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-slate-800 border-b-2 border-brand-500'
                                    : 'theme-muted hover:theme-text hover:bg-gray-100 dark:hover:bg-slate-800/50'
                                    }`}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                {activeTab === 'ai-ustoz' ? (
                    <AITutorModule
                        topic={`${chapter.name} — ${lesson.title}`}
                        messages={aiMessages}
                        setMessages={setAiMessages}
                    />
                ) : (
                    <div className="theme-card border theme-border rounded-2xl p-6 md:p-8 min-h-[400px]">

                        {/* DARS TAB */}
                        {activeTab === 'dars' && (
                            <div className="prose prose-slate dark:prose-invert max-w-[75ch] mx-auto">
                                <div className="bg-brand-50 dark:bg-brand-500/10 border-l-4 border-brand-500 p-4 mb-6 rounded-r-xl">
                                    <h3 className="text-brand-600 dark:text-brand-400 font-bold m-0">{t('lesson_goal') || 'Dars maqsadi:'}</h3>
                                    <p className="m-0 theme-text-secondary">{lesson.description}</p>
                                </div>

                                {/* Key Concepts */}
                                {lesson.content?.key_concepts?.length > 0 && (
                                    <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                                        <h3 className="text-emerald-600 dark:text-emerald-400 font-bold mb-3 flex items-center gap-2">{t('lesson_key_concepts') || '🎯 Asosiy tushunchalar:'}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {lesson.content.key_concepts.map((c, i) => (
                                                <span key={i} className="px-3 py-1.5 bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 rounded-full text-sm border border-emerald-300 dark:border-emerald-500/30">{c}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {lesson.content?.theory ? (
                                    <div className="space-y-1">
                                        <TheoryRenderer text={lesson.content.theory} />
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-64 theme-muted">
                                        <PlayCircle size={48} className="mb-4 opacity-50" />
                                        <p>{t('lesson_video_text_content') || 'Video va matnli dars kontenti'}</p>
                                    </div>
                                )}
                                {formulas.length > 0 && (
                                    <div className="mt-8 p-5 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-500/10 dark:to-blue-500/10 border border-purple-300 dark:border-purple-500/20 rounded-xl">
                                        <h3 className="text-purple-600 dark:text-purple-400 font-bold mb-3 flex items-center gap-2"><Calculator size={18} /> {t('lesson_main_formulas') || 'Asosiy formulalar:'}</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {formulas.map((f, i) => (
                                                <div key={i} className="bg-gray-100 dark:bg-slate-900/60 rounded-lg px-4 py-3 border theme-border">
                                                    <div className="text-xs theme-muted mb-1">{f.name}</div>
                                                    <div className="text-blue-600 dark:text-blue-300 font-mono font-semibold">{f.text || f.formula}</div>
                                                    {f.description && <div className="text-xs theme-muted mt-1">{f.description}</div>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Mavzuni tugatish tugmasi — faqat Dars tabida */}
                                <div className="mt-10">
                                    {isLessonCompleted ? (
                                        <div className="flex items-center justify-center gap-3 py-4 px-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                                            <CheckCircle size={24} className="text-emerald-400" />
                                            <span className="text-emerald-400 font-bold text-lg">{t('lesson_completed_title') || 'Mavzu tugatilgan!'}</span>
                                            <span className="px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-300 text-sm font-semibold">+50 XP ✓</span>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={handleMarkComplete}
                                            className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-2xl text-white font-bold text-lg transition-all duration-300 active:scale-[0.98] shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40"
                                        >
                                            <Trophy size={24} />
                                            <span>{t('lesson_finish_btn') || 'Mavzuni tugatish'}</span>
                                            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">+50 XP</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* VIDEO TAB */}
                        {activeTab === 'video' && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Youtube size={22} className="text-red-500" /> {t('lesson_video_tutorial') || 'Video darslik'}
                                </h3>
                                {lesson.video_url ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-lg shadow-black/30 overflow-hidden">
                                            <div className="aspect-video w-full">
                                                <iframe
                                                    src={lesson.video_url}
                                                    title={lesson.title}
                                                    className="w-full h-full"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen
                                                />
                                            </div>
                                            <div className="p-4 border-t border-slate-700/50">
                                                <p className="text-white font-semibold">{lesson.title}</p>
                                                <p className="text-slate-400 text-sm mt-1">{t('lesson_watch_youtube') || "📺 YouTube orqali ko'ring — to'liq ekran uchun ▶ tugmasini bosing"}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="flex flex-col items-center justify-center py-20 text-center"
                                    >
                                        <motion.div 
                                            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                            className="bg-gradient-to-br from-red-500/10 to-orange-500/10 p-6 rounded-full mb-6 relative"
                                        >
                                            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse" />
                                            <Youtube size={64} className="text-red-500 relative z-10" />
                                        </motion.div>
                                        
                                        <h4 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-3 relative inline-block">
                                            {t('lesson_video_soon') || 'Tez kunda!'}
                                            <span className="absolute -top-1 -right-4 flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                            </span>
                                        </h4>
                                        
                                        <p className="text-slate-400 text-lg max-w-md">
                                            {t('lesson_video_desc_soon') || "Ushbu mavzu uchun maxsus video darslik tayyorlanmoqda. Biz bilan qoling!"}
                                        </p>
                                        
                                        <div className="mt-8 flex gap-2 justify-center">
                                            <div className="w-2 h-2 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        )}

                        {/* FORMULALAR TAB */}
                        {activeTab === 'formulalar' && (
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Calculator size={22} className="text-purple-400" /> {t('tabs_formulas') || 'Formulalar'}
                                </h3>
                                {formulas.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {formulas.map((f, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="theme-card border theme-border rounded-xl p-5 hover:border-purple-500/40 transition-colors"
                                            >
                                                <div className="text-sm text-purple-500 dark:text-purple-400 font-semibold mb-2">{f.name}</div>
                                                <div className="text-2xl font-mono theme-text font-bold tracking-wide">{f.text || f.formula}</div>
                                                {f.description && <p className="text-sm theme-muted mt-2">{f.description}</p>}
                                                {f.variables?.length > 0 && (
                                                    <div className="mt-3 pt-3 border-t theme-border space-y-1">
                                                        {f.variables.map((v, vi) => (
                                                            <div key={vi} className="flex items-center gap-2 text-xs">
                                                                <span className="text-blue-500 dark:text-blue-300 font-mono font-bold min-w-[30px]">{v.symbol}</span>
                                                                <span className="theme-muted">—</span>
                                                                <span className="theme-muted">{v.name}</span>
                                                                {v.unit && <span className="text-slate-400 dark:text-slate-600">({v.unit})</span>}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center theme-muted py-12">
                                        <Calculator size={48} className="mx-auto mb-4 opacity-30" />
                                        <p>{t('lesson_no_formulas') || "Bu darsda formulalar yo'q"}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* MISOLLAR TAB */}
                        {activeTab === 'misollar' && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <BookOpen size={22} className="text-green-400" /> {t('lesson_examples_problems') || 'Misollar va masalalar'}
                                </h3>
                                {examples.length > 0 ? (
                                    examples.map((ex, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                         >
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="theme-muted text-sm">{t('lesson_problem_num') || 'Masala #'}{i + 1}</p>
                                                {ex.difficulty && (
                                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ex.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                                                        ex.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                                            'bg-red-500/20 text-red-400'
                                                        }`}>
                                                        {ex.difficulty === 'easy' ? (t('difficulty_easy') || '⭐ Oson') : ex.difficulty === 'medium' ? (t('difficulty_medium') || "⭐⭐ O'rta") : (t('difficulty_hard') || '⭐⭐⭐ Qiyin')}
                                                    </span>
                                                )}
                                            </div>
                                            <h4 className="font-bold theme-text text-lg mb-3">{ex.title}</h4>
                                            <p className="theme-muted mb-4">{ex.problem}</p>

                                            {/* Given Data Table */}
                                            {ex.given_data && Object.keys(ex.given_data).length > 0 && (
                                                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                                    <p className="text-blue-600 dark:text-blue-400 text-sm font-bold mb-2">📋 {t('lesson_given') || 'Berilgan:'}</p>
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                        {Object.entries(ex.given_data).map(([key, val], gi) => (
                                                            <div key={gi} className="bg-gray-100 dark:bg-slate-900/50 px-3 py-1.5 rounded text-sm">
                                                                <span className="theme-muted">{key}: </span>
                                                                <span className="text-blue-600 dark:text-blue-300 font-mono">{val}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Solution Steps */}
                                            {ex.solution_steps?.length > 0 ? (
                                                <div className="theme-card border theme-border p-4 rounded-lg mb-3">
                                                    <p className="text-yellow-500 dark:text-yellow-400 font-bold mb-3">📝 {t('lesson_solution') || 'Yechish:'}</p>
                                                    <div className="space-y-2">
                                                        {ex.solution_steps.map((step, si) => (
                                                            <div key={si} className="flex gap-3 items-start">
                                                                <span className="flex-shrink-0 w-6 h-6 bg-blue-500/20 text-blue-500 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold">{si + 1}</span>
                                                                <span className="text-green-600 dark:text-green-400 font-mono text-sm">{step}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : ex.solution ? (
                                                <div className="theme-card border theme-border p-4 rounded-lg font-mono text-sm text-green-600 dark:text-green-400 whitespace-pre-line mb-3">
                                                    <p className="text-yellow-500 dark:text-yellow-400 font-bold mb-2">{t('lesson_solution') || 'Yechish:'}</p>
                                                    {ex.solution}
                                                </div>
                                            ) : null}

                                            <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-3">
                                                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✅ {t('lesson_answer') || 'Javob:'} </span>
                                                <span className="theme-text font-mono">{ex.answer}</span>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="text-center theme-muted py-12">
                                        <FileText size={48} className="mx-auto mb-4 opacity-30" />
                                        <p>{t('lesson_no_examples') || "Bu darsda misollar hali qo'shilmagan"}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* TESTLAR TAB */}
                        <div className={activeTab === 'testlar' ? 'block' : 'hidden'}>
                            <LessonQuiz
                                lessonId={lesson.id}
                                onComplete={handleLessonComplete}
                                questions={lesson.questions}
                            />
                        </div>
                    </div>
                )}



                {/* XP Popup */}
                {showXPPopup && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl shadow-2xl shadow-yellow-500/30 flex items-center gap-3"
                    >
                        <Star size={28} className="text-white fill-white" />
                        <div>
                            <p className="text-white font-bold text-lg">{t('lesson_xp_added') || "+50 XP qo'shildi!"}</p>
                            <p className="text-white/80 text-sm">{t('lesson_congrats') || "Tabriklaymiz! 🎉"}</p>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
