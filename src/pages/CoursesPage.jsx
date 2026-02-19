import React from 'react';
import { useGrades } from '../hooks/useGrades';
import GradeCard from '../components/darsliklar/GradeCard';
import { BookOpen, ArrowLeft, Trophy, CheckCircle, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CoursesPage() {
    const { grades } = useGrades();
    const navigate = useNavigate();

    const stats = [
        { icon: <BookOpen className="text-blue-400" />, value: "44+", label: "Darslar", color: "bg-blue-500/10 border-blue-500/20" },
        { icon: <CheckCircle className="text-green-400" />, value: "110+", label: "Testlar", color: "bg-green-500/10 border-green-500/20" },
        { icon: <GraduationCap className="text-purple-400" />, value: "8", label: "Boblar", color: "bg-purple-500/10 border-purple-500/20" },
    ];

    return (
        <div className="fixed inset-0 bg-[#0f1117] font-sans text-slate-100 overflow-y-auto custom-scrollbar">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto p-6 pb-24 min-h-full"
            >
                {/* Top Navigation */}
                <div className="flex items-center justify-between mb-12">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all text-slate-400 hover:text-white"
                    >
                        <ArrowLeft size={18} />
                        <span className="font-medium">Dashboardga qaytish</span>
                    </button>

                    <div className="px-4 py-1.5 bg-slate-800/80 rounded-full border border-slate-700 shadow-xl">
                        <span className="text-sm font-semibold flex items-center gap-2">
                            <span className="text-blue-400">NurFizika</span>
                            <span className="text-slate-600">|</span>
                            <span>Darsliklar</span>
                        </span>
                    </div>

                    <div className="w-[140px]"></div> {/* Spacer for center alignment */}
                </div>

                {/* Hero Section */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Sinfingizni tanlang
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Hozirda <span className="text-blue-400 font-bold">9-sinf</span> to'liq ishga tushirilgan.
                        Qolgan sinflar tez orada qo'shiladi. 🚀
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
                    {stats.map((stat, index) => (
                        <div key={index} className={`p-6 rounded-2xl border ${stat.color} bg-slate-800/30 flex flex-col items-center justify-center gap-3 backdrop-blur-sm`}>
                            <div className="p-3 bg-slate-800 rounded-xl shadow-lg border border-slate-700/50">
                                {React.cloneElement(stat.icon, { size: 28 })}
                            </div>
                            <div className="text-3xl font-bold text-white">{stat.value}</div>
                            <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Grades Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {grades.map(grade => (
                        <div key={grade.id} className="h-full">
                            <GradeCard grade={grade} />
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
