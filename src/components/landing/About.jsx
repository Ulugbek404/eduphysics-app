import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Target,
    Eye,
    Brain,
    Zap,
    BookOpen,
    Trophy,
    Sparkles,
    Users,
    ArrowRight
} from 'lucide-react';

const About = () => {
    return (
        <section className="min-h-screen flex items-center justify-center py-20 pt-20" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)' }}>
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Biz haqimizda
                    </h2>
                    <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                        NurFizika - O'zbekistonda birinchi sun'iy intellektga asoslangan
                        fizika o'rganish platformasi. Kuch — bilimda, bilim — bizda!
                    </p>
                </motion.div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
                    {/* Mission */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-8 hover:border-blue-500/40 transition-all"
                    >
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                            <Target className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Missiyamiz</h3>
                        <p className="text-slate-300 leading-relaxed">
                            Har bir 9-sinf o'quvchisiga zamonaviy texnologiyalar yordamida
                            fizikani chuqur va qiziqarli tarzda o'rganish imkoniyatini berish.
                        </p>
                    </motion.div>

                    {/* Vision */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-8 hover:border-purple-500/40 transition-all"
                    >
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                            <Eye className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Vizyonimiz</h3>
                        <p className="text-slate-300 leading-relaxed">
                            O'zbekistonda eng yaxshi AI-ga asoslangan ta'lim platformasiga
                            aylanish va minglab o'quvchilarga yuqori sifatli ta'lim berish.
                        </p>
                    </motion.div>
                </div>

                {/* Why Choose Us */}
                <div className="max-w-6xl mx-auto">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-slate-900 text-center mb-12"
                    >
                        Nima uchun NurFizika?
                    </motion.h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Brain className="w-7 h-7" />,
                                title: "AI Shaxsiy Ustoz",
                                description: "Har bir o'quvchi uchun individual yondashuv",
                                color: "blue"
                            },
                            {
                                icon: <Zap className="w-7 h-7" />,
                                title: "Virtual Laboratoriya",
                                description: "Xavfsiz va interaktiv tajribalar",
                                color: "purple"
                            },
                            {
                                icon: <BookOpen className="w-7 h-7" />,
                                title: "50+ Darslar",
                                description: "To'liq 9-sinf fizika dasturi",
                                color: "pink"
                            },
                            {
                                icon: <Trophy className="w-7 h-7" />,
                                title: "100+ Testlar",
                                description: "Turli darajadagi savol va mashqlar",
                                color: "yellow"
                            },
                            {
                                icon: <Sparkles className="w-7 h-7" />,
                                title: "Gamifikatsiya",
                                description: "XP, yutuqlar va reytinglar",
                                color: "green"
                            },
                            {
                                icon: <Users className="w-7 h-7" />,
                                title: "Butunlay Bepul",
                                description: "Hech qanday to'lov yoki xarajatsiz",
                                color: "red"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl p-6 hover:border-indigo-400 hover:shadow-lg transition-all group"
                            >
                                <div className={`w-12 h-12 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white`}>
                                    {feature.icon}
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h4>
                                <p className="text-slate-600 text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
