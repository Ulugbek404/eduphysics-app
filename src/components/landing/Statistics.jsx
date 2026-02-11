import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, BookOpen, FileText, Atom } from 'lucide-react';

const Statistics = () => {
    const stats = [
        {
            icon: Users,
            value: 1000,
            suffix: '+',
            label: 'Foydalanuvchilar',
            color: 'blue',
        },
        {
            icon: BookOpen,
            value: 50,
            suffix: '+',
            label: 'Darslar',
            color: 'purple',
        },
        {
            icon: FileText,
            value: 100,
            suffix: '+',
            label: 'Test Savollari',
            color: 'pink',
        },
        {
            icon: Atom,
            value: 20,
            suffix: '+',
            label: 'Virtual Tajribalar',
            color: 'green',
        },
    ];

    const colorMap = {
        blue: {
            gradient: 'from-blue-500 to-cyan-500',
            bg: 'bg-blue-500/10',
            text: 'text-blue-400',
            border: 'border-blue-500/30',
        },
        purple: {
            gradient: 'from-purple-500 to-pink-500',
            bg: 'bg-purple-500/10',
            text: 'text-purple-400',
            border: 'border-purple-500/30',
        },
        pink: {
            gradient: 'from-pink-500 to-rose-500',
            bg: 'bg-pink-500/10',
            text: 'text-pink-400',
            border: 'border-pink-500/30',
        },
        green: {
            gradient: 'from-green-500 to-emerald-500',
            bg: 'bg-green-500/10',
            text: 'text-green-400',
            border: 'border-green-500/30',
        },
    };

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
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
                        Bizning{' '}
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Natijalar
                        </span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Minglab o'quvchilar EduPhysics bilan fizikani muvaffaqiyatli o'rganmoqda
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        const colors = colorMap[stat.color];

                        return (
                            <StatCard
                                key={index}
                                stat={stat}
                                Icon={Icon}
                                colors={colors}
                                index={index}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

// Separate component for animated counter
const StatCard = ({ stat, Icon, colors, index }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = stat.value;
            const duration = 2000; // 2 seconds
            const increment = end / (duration / 16); // 60fps

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [isInView, stat.value]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`relative bg-slate-800/50 backdrop-blur-sm border ${colors.border} rounded-2xl p-6 group hover:shadow-xl transition-all duration-300`}
        >
            {/* Gradient Background on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />

            {/* Icon */}
            <div className={`relative ${colors.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={colors.text} size={24} />
            </div>

            {/* Counter */}
            <div className="relative">
                <div className={`text-3xl md:text-4xl font-bold ${colors.text} mb-2`}>
                    {count.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-slate-400 text-sm md:text-base font-medium">
                    {stat.label}
                </div>
            </div>

            {/* Decorative Corner */}
            <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-20 rounded-bl-full transition-opacity duration-300`} />
        </motion.div>
    );
};

export default Statistics;
