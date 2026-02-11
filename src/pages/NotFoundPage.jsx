import React from 'react';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>404 - Sahifa topilmadi | EduPhysics</title>
                <meta name="description" content="Kechirasiz, siz qidirayotgan sahifa topilmadi." />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4">
                <div className="max-w-2xl w-full text-center">
                    {/* Animated 404 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            404
                        </h1>
                    </motion.div>

                    {/* Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-4 mb-8"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Sahifa topilmadi
                        </h2>
                        <p className="text-lg text-slate-400 max-w-md mx-auto">
                            Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan bo'lishi mumkin.
                        </p>
                    </motion.div>

                    {/* Floating Physics Icons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex justify-center items-center space-x-4 mb-12"
                    >
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    y: [0, -20, 0],
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    duration: 3,
                                    delay: i * 0.2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                        >
                            <Home size={20} />
                            <span>Bosh sahifaga qaytish</span>
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                        >
                            <ArrowLeft size={20} />
                            <span>Orqaga</span>
                        </button>
                    </motion.div>

                    {/* Search Suggestion */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="mt-12 text-slate-500 text-sm"
                    >
                        <p>Yoki qidiruv orqali kerakli sahifani toping</p>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;
