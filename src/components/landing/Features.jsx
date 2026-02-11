import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Atom, Trophy, BookOpen, Zap, Award } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: Brain,
            title: 'AI Ustoz',
            description: 'Shaxsiy sun\'iy intellekt o\'qituvchi har qanday savolingizga javob beradi va tushuntirib beradi.',
            gradient: 'from-blue-500 to-cyan-500',
            iconBg: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
        },
        {
            icon: Atom,
            title: 'Virtual Laboratoriya',
            description: 'Xavfsiz virtual muhitda fizika tajribalarini o\'tkazing va natijalarni real vaqtda kuzating.',
            gradient: 'from-purple-500 to-pink-500',
            iconBg: 'bg-purple-500/10',
            borderColor: 'border-purple-500/20',
        },
        {
            icon: Trophy,
            title: 'Testlar',
            description: '100+ amaliy test savollari bilan bilimingizni sinab ko\'ring va o\'z darajangizni aniqlang.',
            gradient: 'from-yellow-500 to-orange-500',
            iconBg: 'bg-yellow-500/10',
            borderColor: 'border-yellow-500/20',
        },
        {
            icon: BookOpen,
            title: 'Uy Vazifasi Yordamchisi',
            description: 'AI yordamida uy vazifalaringizni yeching. Har bir qadamda batafsil tushuntirish olasiz.',
            gradient: 'from-green-500 to-emerald-500',
            iconBg: 'bg-green-500/10',
            borderColor: 'border-green-500/20',
        },
        {
            icon: Zap,
            title: 'Adaptiv Testlar',
            description: 'Sizning darajangizga moslashadigan testlar. Qanchalik ko\'p to\'g\'ri javob bersangiz, shunchalik qiyin savollar.',
            gradient: 'from-red-500 to-rose-500',
            iconBg: 'bg-red-500/10',
            borderColor: 'border-red-500/20',
        },
        {
            icon: Award,
            title: 'Yutuqlar Tizimi',
            description: 'XP to\'plang, level oshiring va maxsus yutuqlarga ega bo\'ling. O\'z progressingizni kuzatib boring.',
            gradient: 'from-indigo-500 to-blue-500',
            iconBg: 'bg-indigo-500/10',
            borderColor: 'border-indigo-500/20',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Nima uchun{' '}
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            EduPhysics?
                        </span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Zamonaviy texnologiyalar va sun'iy intellekt yordamida fizikani yanada qiziqarli va tushunarli qilamiz
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className={`group relative bg-slate-800/50 backdrop-blur-sm border ${feature.borderColor} rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-${feature.gradient.split('-')[1]}-500/20`}
                            >
                                {/* Gradient Background on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />

                                {/* Icon */}
                                <div className={`relative ${feature.iconBg} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className={`text-${feature.gradient.split('-')[1]}-400`} size={28} />
                                </div>

                                {/* Content */}
                                <h3 className="relative text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                                    {feature.title}
                                </h3>
                                <p className="relative text-slate-400 leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Decorative Corner */}
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
