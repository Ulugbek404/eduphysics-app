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
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

const About = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const isLight = theme === 'light';

    return (
        <section className="min-h-screen flex items-center justify-center py-20 pt-20">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isLight ? 'text-slate-800' : 'text-white'}`}>
                        {t('about_title')}
                    </h2>
                    <p className={`text-xl max-w-3xl mx-auto ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                        {t('about_subtitle')}
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
                        className={`backdrop-blur-sm border rounded-3xl p-8 hover:-translate-y-1 transition-all ${
                            isLight
                                ? 'bg-white/90 border-teal-200 shadow-md hover:shadow-xl hover:shadow-teal-500/10'
                                : 'bg-white/5 shadow-xl shadow-teal-900/20 border-teal-500/20 hover:shadow-2xl hover:shadow-teal-500/20'
                        }`}
                    >
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-500/30">
                            <Target className="w-8 h-8 text-white" />
                        </div>
                        <h3 className={`text-2xl font-bold mb-4 ${isLight ? 'text-slate-800' : 'text-white'}`}>
                            {t('about_mission_title')}
                        </h3>
                        <p className={`leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                            {t('about_mission_desc')}
                        </p>
                    </motion.div>

                    {/* Vision */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={`backdrop-blur-sm border rounded-3xl p-8 hover:-translate-y-1 transition-all ${
                            isLight
                                ? 'bg-white/90 border-indigo-200 shadow-md hover:shadow-xl hover:shadow-indigo-500/10'
                                : 'bg-white/5 shadow-xl shadow-indigo-900/20 border-indigo-500/20 hover:shadow-2xl hover:shadow-indigo-500/20'
                        }`}
                    >
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
                            <Eye className="w-8 h-8 text-white" />
                        </div>
                        <h3 className={`text-2xl font-bold mb-4 ${isLight ? 'text-slate-800' : 'text-white'}`}>
                            {t('about_vision_title')}
                        </h3>
                        <p className={`leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                            {t('about_vision_desc')}
                        </p>
                    </motion.div>
                </div>

                {/* Why Choose Us */}
                <div className="max-w-6xl mx-auto">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`text-3xl font-bold text-center mb-12 ${isLight ? 'text-slate-800' : 'text-white'}`}
                    >
                        {t('about_why_title')}
                    </motion.h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: <Brain className="w-7 h-7" />, title: t('about_feat1_title'), description: t('about_feat1_desc'), color: "blue" },
                            { icon: <Zap className="w-7 h-7" />, title: t('about_feat2_title'), description: t('about_feat2_desc'), color: "purple" },
                            { icon: <BookOpen className="w-7 h-7" />, title: t('about_feat3_title'), description: t('about_feat3_desc'), color: "pink" },
                            { icon: <Trophy className="w-7 h-7" />, title: t('about_feat4_title'), description: t('about_feat4_desc'), color: "yellow" },
                            { icon: <Sparkles className="w-7 h-7" />, title: t('about_feat5_title'), description: t('about_feat5_desc'), color: "green" },
                            { icon: <Users className="w-7 h-7" />, title: t('about_feat6_title'), description: t('about_feat6_desc'), color: "red" }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`border rounded-2xl p-6 hover:-translate-y-1 transition-all group ${
                                    isLight
                                        ? 'bg-white/90 backdrop-blur-sm border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300'
                                        : 'bg-white/5 backdrop-blur-sm border-white/10 hover:border-indigo-400/50 hover:bg-white/10 hover:shadow-lg'
                                }`}
                            >
                                <div className={`w-12 h-12 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white`}>
                                    {feature.icon}
                                </div>
                                <h4 className={`text-lg font-bold mb-2 ${isLight ? 'text-slate-800' : 'text-white'}`}>
                                    {feature.title}
                                </h4>
                                <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
