import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AchievementToast({ achievement, onClose }) {
    useEffect(() => {
        if (!achievement) return;
        const t = setTimeout(onClose, 3500);
        return () => clearTimeout(t);
    }, [achievement, onClose]);

    return (
        <AnimatePresence>
            {achievement && (
                <motion.div
                    initial={{ x: 120, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 120, opacity: 0 }}
                    className="fixed top-20 right-4 z-50 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-5 py-4 rounded-2xl shadow-2xl shadow-yellow-500/40 flex items-center gap-3 max-w-xs"
                >
                    <span className="text-3xl">{achievement.icon || '🏆'}</span>
                    <div>
                        <p className="font-extrabold text-sm">Yutuq qo'lga kiritildi!</p>
                        <p className="text-yellow-100 text-sm">{achievement.label}</p>
                        {achievement.xp && (
                            <p className="text-yellow-200 text-xs mt-0.5">+{achievement.xp} XP</p>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
