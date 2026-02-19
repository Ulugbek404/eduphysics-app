import React from 'react';
import { Lock, ChevronRight, BookOpen, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function GradeCard({ grade }) {
    const { id, name, description, total_hours, is_active, icon, color } = grade;

    if (!is_active) {
        return (
            <motion.div
                whileHover={{ scale: 1.01 }}
                className="relative group overflow-hidden rounded-2xl bg-slate-800/50 border border-slate-700/50 p-6 transition-all grayscale opacity-75 cursor-not-allowed"
            >
                <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-slate-700/50 rounded-xl mr-4">
                        <span className="text-3xl">{icon}</span>
                    </div>
                    <Lock className="text-slate-500" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-300 mb-2">{name}</h3>
                <p className="text-slate-400 text-sm mb-4">{description}</p>

                <div className="flex items-center gap-2 text-slate-500 text-sm border-t border-slate-700/50 pt-4">
                    <Clock size={16} />
                    <span>{total_hours} soat</span>
                </div>

                <div className="absolute top-3 right-3 px-2 py-1 bg-slate-700/50 rounded text-[10px] font-bold text-slate-400 border border-slate-600">
                    TEZ KUNDA
                </div>
            </motion.div>
        );
    }

    return (
        <Link to={`/darsliklar/${id}`} className="block h-full">
            <motion.div
                whileHover={{ y: -5 }}
                className="relative group overflow-hidden rounded-2xl bg-slate-800 border border-slate-700 p-6 transition-all hover:shadow-2xl hover:shadow-blue-500/20 h-full"
            >
                {/* Background Gradient Animation */}
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Active Badge */}
                <div className="absolute top-0 right-0 p-4">
                    <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full flex items-center gap-1.5 shadow-lg shadow-green-900/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-bold text-green-400">Faol</span>
                    </div>
                </div>

                <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                        <div className={`p-4 bg-gradient-to-br ${color} rounded-2xl shadow-lg shadow-blue-500/30 text-4xl text-white transform group-hover:scale-110 transition-transform duration-300`}>
                            {icon}
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 transition-all">
                        {name}
                    </h3>
                    <p className="text-slate-400 text-sm mb-6 line-clamp-2 group-hover:text-slate-300 transition-colors">
                        {description}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/50 group-hover:border-slate-600/50 transition-colors">
                        <span className="flex items-center gap-2 text-sm font-medium text-slate-400">
                            <BookOpen size={16} className="text-blue-500" />
                            {total_hours} soat
                        </span>

                        <div className="flex items-center gap-1 text-blue-400 font-medium text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            Boshlash <ChevronRight size={16} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
