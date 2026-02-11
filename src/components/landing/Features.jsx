import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Atom, FileText, TrendingUp } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: Atom,
            title: 'Virtual Laboratoriya',
            description: '20+ xavfsiz fizika tajribalari. Virtual muhitda real tajribalarni o\'tkazing va natijalarni kuzating.',
            gradient: 'from-purple-500 to-pink-500',
            iconBg: 'bg-purple-500/10',
            borderColor: 'border-purple-500/20',
        },
        {
            icon: Brain,
            title: 'AI Ustoz',
            description: 'Shaxsiy sun\'iy intellekt o\'qituvchi. Har qanday savolingizga javob beradi va tushuntirib beradi.',
            gradient: 'from-blue-500 to-purple-500',
            iconBg: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
        },
        {
            icon: FileText,
            title: '100+ Test',
            description: 'Turli darajadagi test savollari. Bilimingizni sinab ko\'ring va o\'z darajangizni aniqlang.',
            gradient: 'from-pink-500 to-purple-500',
            iconBg: 'bg-pink-500/10',
            borderColor: 'border-pink-500/20',
        },
        {
            icon: TrendingUp,
            title: 'Progress Tracker',
            description: 'XP to\'plang, level oshiring va yutuqlarga ega bo\'ling. O\'z progressingizni kuzatib boring.',
            gradient: 'from-purple-500 to-blue-500',
            iconBg: 'bg-purple-500/10',
            borderColor: 'border-purple-500/20',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    return (
        <section className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 pt-20" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #EFF6FF 100%)' }}>
            <div className="max-w-6xl mx-auto w-full">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Nima uchun{' '}
                        <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                            NurFizika?
                        </span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Zamonaviy texnologiyalar va sun'iy intellekt yordamida fizikani yanada qiziqarli va tushunarli qilamiz
                    </p>
                </motion.div>

                {/* Features Grid - 2x2 */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -10 }}
                                className={`group relative bg-white border-2 ${feature.borderColor} rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20`}
                            >
                                {/* Gradient Background on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`} />

                                {/* Icon */}
                                <div className={`relative ${feature.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="text-purple-600" size={32} />
                                </div>

                                {/* Content */}
                                <h3 className="relative text-2xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-[#667eea] group-hover:to-[#764ba2] transition-all duration-300">
                                    {feature.title}
                                </h3>
                                <p className="relative text-slate-600 leading-relaxed text-base">
                                    {feature.description}
                                </p>

                                {/* Decorative Corner */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
