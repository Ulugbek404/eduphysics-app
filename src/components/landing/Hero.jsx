import React from 'react';
import { motion } from 'framer-motion';
import { Atom, Zap, Brain, Trophy, ArrowRight, Sparkles, Rocket, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

const Hero = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { theme } = useTheme();
    const isLight = theme === 'light';

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

            {/* Animated Grid Pattern */}
            <div className={`absolute inset-0 ${isLight ? 'opacity-30' : 'opacity-10'}`}>
                <div className="absolute inset-0" style={{
                    backgroundImage: isLight
                        ? `linear-gradient(rgba(99, 102, 241, 0.07) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(99, 102, 241, 0.07) 1px, transparent 1px)`
                        : `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                    animation: 'grid-move 20s linear infinite'
                }}></div>
            </div>

            {/* Floating Orbs */}
            <motion.div
                className={`absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl ${isLight ? 'opacity-10' : 'opacity-20'}`}
                animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className={`absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl ${isLight ? 'opacity-10' : 'opacity-20'}`}
                animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1.1, 1, 1.1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className={`absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full blur-3xl ${isLight ? 'opacity-[0.07]' : 'opacity-15'}`}
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* Floating Icons */}
            {[
                { Icon: Atom, x: '15%', y: '20%', delay: 0 },
                { Icon: Zap, x: '85%', y: '25%', delay: 0.2 },
                { Icon: Brain, x: '10%', y: '70%', delay: 0.4 },
                { Icon: Trophy, x: '90%', y: '65%', delay: 0.6 },
                { Icon: Sparkles, x: '50%', y: '15%', delay: 0.8 },
            ].map(({ Icon, x, y, delay }, index) => (
                <motion.div
                    key={index}
                    className="absolute hidden md:block"
                    style={{ left: x, top: y }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0.1, isLight ? 0.25 : 0.3, 0.1], scale: [1, 1.2, 1], y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: delay, ease: "easeInOut" }}
                >
                    <Icon className={`w-8 h-8 ${isLight ? 'text-indigo-400' : 'text-blue-300'}`} />
                </motion.div>
            ))}

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={`inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md border rounded-full text-sm ${
                            isLight
                                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                                : 'bg-white/10 border-white/20 text-white'
                        }`}
                    >
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        <span>{t('hero_badge')}</span>
                        <Star className="w-4 h-4 text-yellow-400" />
                    </motion.div>

                    {/* Main Heading */}
                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold"
                        >
                            <span className={`block mb-2 ${isLight ? 'text-slate-800' : 'text-white'}`}>
                                {t('hero_title_1')}
                            </span>
                            <span className="block bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                                {t('hero_title_2')}
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-500"
                        >
                            {t('hero_slogan')}
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
                                isLight ? 'text-slate-600' : 'text-blue-100'
                            }`}
                        >
                            {t('hero_subtitle')}
                        </motion.p>
                    </div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                    >
                        {/* Primary Button */}
                        <motion.button
                            onClick={() => navigate('/login')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Rocket className="w-5 h-5" />
                                {t('hero_btn_start')}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            {/* Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        </motion.button>

                        {/* Secondary Button */}
                        <motion.button
                            onClick={() => {
                                const element = document.getElementById('features');
                                element?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-8 py-4 backdrop-blur-md border-2 font-bold text-lg rounded-2xl transition-all duration-300 ${
                                isLight
                                    ? 'bg-white/80 border-slate-300 text-slate-700 hover:bg-white hover:border-indigo-400'
                                    : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
                            }`}
                        >
                            <span className="flex items-center gap-2">
                                <Brain className="w-5 h-5" />
                                {t('hero_btn_more')}
                            </span>
                        </motion.button>
                    </motion.div>

                    {/* Stats Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto"
                    >
                        {[
                            { value: '100+', labelKey: 'hero_stat_tests', icon: Trophy },
                            { value: '20+',  labelKey: 'hero_stat_labs',  icon: Atom },
                            { value: '24/7', labelKey: 'hero_stat_ai',    icon: Brain },
                            { value: '100%', labelKey: 'hero_stat_free',  icon: Sparkles },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className={`backdrop-blur-md border rounded-2xl p-4 transition-all duration-300 ${
                                    isLight
                                        ? 'bg-white/80 border-slate-200 shadow-sm hover:shadow-md hover:bg-white'
                                        : 'bg-white/10 border-white/20 hover:bg-white/15'
                                }`}
                            >
                                <stat.icon className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
                                <div className={`text-3xl font-bold mb-1 ${isLight ? 'text-slate-800' : 'text-white'}`}>
                                    {stat.value}
                                </div>
                                <div className={`text-sm ${isLight ? 'text-slate-500' : 'text-blue-200'}`}>
                                    {t(stat.labelKey)}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`flex flex-col items-center gap-2 ${isLight ? 'text-slate-400' : 'text-white/60'}`}
                >
                    <span className="text-sm">{t('hero_scroll')}</span>
                    <ArrowRight className="w-5 h-5 rotate-90" />
                </motion.div>
            </motion.div>

            {/* CSS Animation for Grid */}
            <style>{`
                @keyframes grid-move {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(50px); }
                }
            `}</style>
        </section>
    );
};

export default Hero;
