import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, BookOpen, Brain, TrendingUp } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            icon: UserPlus,
            title: 'Ro\'yxatdan o\'ting',
            description: 'Bepul akkaunt yarating va darhol o\'qishni boshlang. Hech qanday to\'lov talab qilinmaydi.',
            color: 'blue',
        },
        {
            icon: BookOpen,
            title: 'Darslarni o\'rganing',
            description: '50+ interaktiv dars orqali 9-sinf fizikasining barcha mavzularini o\'zlashtirib boring.',
            color: 'purple',
        },
        {
            icon: Brain,
            title: 'AI bilan mashq qiling',
            description: 'Sun\'iy intellekt ustoz bilan suhbatlashing, testlar yeching va virtual tajribalar o\'tkazing.',
            color: 'pink',
        },
        {
            icon: TrendingUp,
            title: 'Natijalaringizni kuzating',
            description: 'XP to\'plang, level oshiring va o\'z progressingizni real vaqtda kuzatib boring.',
            color: 'green',
        },
    ];

    const colorMap = {
        blue: {
            gradient: 'from-blue-500 to-cyan-500',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/30',
            text: 'text-blue-400',
            shadow: 'shadow-blue-500/20',
        },
        purple: {
            gradient: 'from-purple-500 to-pink-500',
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/30',
            text: 'text-purple-400',
            shadow: 'shadow-purple-500/20',
        },
        pink: {
            gradient: 'from-pink-500 to-rose-500',
            bg: 'bg-pink-500/10',
            border: 'border-pink-500/30',
            text: 'text-pink-400',
            shadow: 'shadow-pink-500/20',
        },
        green: {
            gradient: 'from-green-500 to-emerald-500',
            bg: 'bg-green-500/10',
            border: 'border-green-500/30',
            text: 'text-green-400',
            shadow: 'shadow-green-500/20',
        },
    };

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
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
                        Qanday{' '}
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            ishlaydi?
                        </span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Faqat 4 ta oddiy qadam - va siz fizikani professional darajada o'rganishni boshlaysiz
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="relative">
                    {/* Connection Line - Desktop */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 -translate-y-1/2" />

                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const colors = colorMap[step.color];

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative"
                                >
                                    {/* Card */}
                                    <div className={`relative bg-slate-800/50 backdrop-blur-sm border ${colors.border} rounded-2xl p-6 hover:shadow-xl ${colors.shadow} transition-all duration-300 group hover:scale-105`}>
                                        {/* Step Number */}
                                        <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white font-bold text-xl shadow-lg ${colors.shadow}`}>
                                            {index + 1}
                                        </div>

                                        {/* Icon */}
                                        <div className={`${colors.bg} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className={colors.text} size={32} />
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-slate-400 leading-relaxed">
                                            {step.description}
                                        </p>

                                        {/* Decorative Gradient */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                                    </div>

                                    {/* Arrow - Desktop */}
                                    {index < steps.length - 1 && (
                                        <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                                className={`w-8 h-8 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg ${colors.shadow}`}
                                            >
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </motion.div>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
