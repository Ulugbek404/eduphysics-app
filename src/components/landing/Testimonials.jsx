import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Aziza Karimova',
            grade: '9-sinf',
            school: '25-maktab, Toshkent',
            rating: 5,
            text: 'EduPhysics bilan fizikani o\'rganish juda oson va qiziqarli bo\'ldi. AI ustoz har doim yordam beradi va virtual laboratoriya ajoyib!',
            avatar: '👧',
        },
        {
            name: 'Sardor Rahimov',
            grade: '9-sinf',
            school: '12-maktab, Samarqand',
            rating: 5,
            text: 'Testlar va adaptiv sinovlar orqali o\'z bilimimni sinab ko\'rdim. Natijalarim sezilarli darajada yaxshilandi. Rahmat!',
            avatar: '👦',
        },
        {
            name: 'Malika Usmonova',
            grade: '9-sinf',
            school: '7-maktab, Buxoro',
            rating: 5,
            text: 'Uy vazifasi yordamchisi juda foydali. Har bir masalani qadam-baqadam tushuntirib beradi. Tavsiya qilaman!',
            avatar: '👧',
        },
    ];

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
                        O'quvchilar{' '}
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            fikrlari
                        </span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Minglab o'quvchilar EduPhysics bilan o'z bilimlarini oshirmoqda
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.03, y: -5 }}
                            className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 group hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-4 right-4 text-blue-500/20 group-hover:text-blue-500/30 transition-colors">
                                <Quote size={40} />
                            </div>

                            {/* Rating */}
                            <div className="flex items-center space-x-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-slate-300 leading-relaxed mb-6 relative z-10">
                                "{testimonial.text}"
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center space-x-3 relative z-10">
                                {/* Avatar */}
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl">
                                    {testimonial.avatar}
                                </div>

                                {/* Details */}
                                <div>
                                    <div className="font-bold text-white">{testimonial.name}</div>
                                    <div className="text-sm text-slate-400">
                                        {testimonial.grade} • {testimonial.school}
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
