import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Target,
    Eye,
    Award,
    Users,
    Zap,
    BookOpen,
    Brain,
    Trophy,
    Sparkles,
    ArrowRight
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/landing/Footer';

const AboutPage = () => {
    return (
        <>
            {/* SEO Meta Tags */}
            <Helmet>
                <title>Biz haqimizda - EduPhysics</title>
                <meta
                    name="description"
                    content="EduPhysics - O'zbekistonda birinchi AI-ga asoslangan fizika o'rganish platformasi. Bizning missiyamiz va maqsadlarimiz haqida."
                />
            </Helmet>

            <Navbar />

            <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                                Biz haqimizda
                            </h1>
                            <p className="text-xl text-slate-300 leading-relaxed">
                                EduPhysics - O'zbekistonda birinchi sun'iy intellektga asoslangan
                                fizika o'rganish platformasi. Biz ta'limni qiziqarli, samarali va
                                har bir o'quvchi uchun ochiq qilishga intilamiz.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
                                <h2 className="text-3xl font-bold text-white mb-4">Missiyamiz</h2>
                                <p className="text-slate-300 leading-relaxed text-lg">
                                    Har bir 9-sinf o'quvchisiga zamonaviy texnologiyalar yordamida
                                    fizikani chuqur va qiziqarli tarzda o'rganish imkoniyatini berish.
                                    Biz ta'limni shaxsiylashtirish va har bir o'quvchining potentsialini
                                    ochishga intilamiz.
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
                                <h2 className="text-3xl font-bold text-white mb-4">Vizyonimiz</h2>
                                <p className="text-slate-300 leading-relaxed text-lg">
                                    O'zbekistonda eng yaxshi AI-ga asoslangan ta'lim platformasiga
                                    aylanish va minglab o'quvchilarga yuqori sifatli ta'lim olishda
                                    yordam berish. Kelajakda barcha fanlar bo'yicha xizmat ko'rsatish.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-20 bg-slate-900/50">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Nima uchun EduPhysics?
                            </h2>
                            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                                Bizni boshqa platformalardan ajratib turadigan xususiyatlar
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {[
                                {
                                    icon: <Brain className="w-8 h-8" />,
                                    title: "AI Shaxsiy Ustoz",
                                    description: "Har bir o'quvchi uchun individual yondashuv va shaxsiy o'rganish rejasi",
                                    color: "blue"
                                },
                                {
                                    icon: <Zap className="w-8 h-8" />,
                                    title: "Virtual Laboratoriya",
                                    description: "Xavfsiz va interaktiv tajribalar o'tkazish imkoniyati",
                                    color: "purple"
                                },
                                {
                                    icon: <BookOpen className="w-8 h-8" />,
                                    title: "50+ Interaktiv Darslar",
                                    description: "To'liq 9-sinf fizika dasturi bo'yicha batafsil darslar",
                                    color: "pink"
                                },
                                {
                                    icon: <Trophy className="w-8 h-8" />,
                                    title: "100+ Test Savollari",
                                    description: "Turli darajadagi test savollari va amaliy mashqlar",
                                    color: "yellow"
                                },
                                {
                                    icon: <Sparkles className="w-8 h-8" />,
                                    title: "Gamifikatsiya",
                                    description: "XP, yutuqlar va reytinglar orqali motivatsiya",
                                    color: "green"
                                },
                                {
                                    icon: <Users className="w-8 h-8" />,
                                    title: "Butunlay Bepul",
                                    description: "Hech qanday to'lov yoki yashirin xarajatlarsiz",
                                    color: "red"
                                }
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all group"
                                >
                                    <div className={`w-14 h-14 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                    <p className="text-slate-400">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                            {[
                                { number: "1000+", label: "Faol Foydalanuvchilar" },
                                { number: "50+", label: "Interaktiv Darslar" },
                                { number: "100+", label: "Test Savollari" },
                                { number: "20+", label: "Virtual Tajribalar" }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-slate-400 text-lg">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Bizga qo'shiling!
                            </h2>
                            <p className="text-xl text-slate-300 mb-8">
                                Minglab o'quvchilar bilan birga fizikani AI yordamida o'rganing
                            </p>
                            <Link
                                to="/register"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/50"
                            >
                                Bepul Boshlash
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default AboutPage;
