import React from 'react';
import { motion } from 'framer-motion';
import { Atom, Zap, Brain, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    // Floating icons animation
    const floatingIcons = [
        { Icon: Atom, delay: 0, x: '10%', y: '20%' },
        { Icon: Zap, delay: 0.2, x: '80%', y: '15%' },
        { Icon: Brain, delay: 0.4, x: '15%', y: '70%' },
        { Icon: Trophy, delay: 0.6, x: '85%', y: '75%' },
        { Icon: Sparkles, delay: 0.8, x: '50%', y: '10%' },
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Orbs */}
                <motion.div
                    className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.3, 0.5],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Floating Physics Icons */}
                {floatingIcons.map(({ Icon, delay, x, y }, index) => (
                    <motion.div
                        key={index}
                        className="absolute text-blue-400/20"
                        style={{ left: x, top: y }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0.2, 0.4, 0.2],
                            scale: [1, 1.2, 1],
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 4,
                            delay: delay,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Icon size={48} />
                    </motion.div>
                ))}

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center space-x-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full px-4 py-2 mb-8"
                >
                    <Sparkles size={16} className="text-blue-400" />
                    <span className="text-blue-300 text-sm font-medium">Sun'iy Intellekt bilan o'qitish platformasi</span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                >
                    9-sinf Fizikani{' '}
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        AI bilan o'rgan!
                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                    Virtual laboratoriya, AI ustoz, 100+ test va interaktiv darslar bilan fizikani oson va qiziqarli o'rganing.
                    <span className="text-blue-400 font-semibold"> Butunlay bepul!</span>
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                >
                    {/* Primary CTA */}
                    <button
                        onClick={() => navigate('/register')}
                        className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/70 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center space-x-2"
                    >
                        <span>Bepul Boshlash</span>
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </button>

                    {/* Secondary CTA */}
                    <button
                        onClick={() => {
                            document.getElementById('features')?.scrollIntoView({
                                behavior: 'smooth'
                            });
                        }}
                        className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        Batafsil Ma'lumot
                    </button>
                </motion.div>

                {/* Stats Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                >
                    {[
                        { value: '1000+', label: 'Foydalanuvchilar' },
                        { value: '50+', label: 'Darslar' },
                        { value: '100+', label: 'Test Savollari' },
                        { value: '20+', label: 'Virtual Tajribalar' },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                        >
                            <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-slate-400">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
                    >
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-1.5 h-1.5 bg-white rounded-full"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
