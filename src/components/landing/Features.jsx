import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Atom, FileText, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

const Features = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const features = [
        {
            icon: Atom,
            titleKey: 'feature_lab_title',
            descKey: 'feature_lab_desc',
            gradient: 'from-purple-500 to-pink-500',
            iconBg: isLight ? 'bg-purple-100' : 'bg-purple-500/10',
            borderColor: isLight ? 'border-purple-200' : 'border-purple-500/20',
            iconColor: 'text-purple-600',
        },
        {
            icon: Brain,
            titleKey: 'feature_ai_title',
            descKey: 'feature_ai_desc',
            gradient: 'from-blue-500 to-purple-500',
            iconBg: isLight ? 'bg-blue-100' : 'bg-blue-500/10',
            borderColor: isLight ? 'border-blue-200' : 'border-blue-500/20',
            iconColor: 'text-blue-600',
        },
        {
            icon: FileText,
            titleKey: 'feature_test_title',
            descKey: 'feature_test_desc',
            gradient: 'from-pink-500 to-purple-500',
            iconBg: isLight ? 'bg-pink-100' : 'bg-pink-500/10',
            borderColor: isLight ? 'border-pink-200' : 'border-pink-500/20',
            iconColor: 'text-pink-600',
        },
        {
            icon: TrendingUp,
            titleKey: 'feature_progress_title',
            descKey: 'feature_progress_desc',
            gradient: 'from-purple-500 to-blue-500',
            iconBg: isLight ? 'bg-indigo-100' : 'bg-purple-500/10',
            borderColor: isLight ? 'border-indigo-200' : 'border-purple-500/20',
            iconColor: 'text-indigo-600',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 pt-20">
            <div className="max-w-6xl mx-auto w-full">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isLight ? 'text-slate-800' : 'text-white'}`}>
                        {t('features_title').replace('NurFizika', '')}{' '}
                        <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                            NurFizika?
                        </span>
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                        {t('features_subtitle')}
                    </p>
                </motion.div>

                {/* Features Grid */}
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
                                className={`group relative border rounded-3xl p-8 transition-all duration-300 ${feature.borderColor} ${
                                    isLight
                                        ? 'bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-xl hover:shadow-purple-500/10'
                                        : 'bg-white/5 backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-500/30 hover:bg-white/10'
                                }`}
                            >
                                {/* Gradient Background on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`} />

                                {/* Icon */}
                                <div className={`relative ${feature.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className={feature.iconColor} size={32} />
                                </div>

                                {/* Content */}
                                <h3 className={`relative text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-500 group-hover:to-purple-500 transition-all duration-300 ${
                                    isLight ? 'text-slate-800' : 'text-white'
                                }`}>
                                    {t(feature.titleKey)}
                                </h3>
                                <p className={`relative leading-relaxed text-base ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                                    {t(feature.descKey)}
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
