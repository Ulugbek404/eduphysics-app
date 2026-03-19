import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, X, Smartphone, Star, Share } from 'lucide-react';

/**
 * PWAInstallBanner — Chiroyli PWA o'rnatish banneri
 * Android/Chrome: native prompt
 * iOS/Safari: "Share → Add to Home Screen" yo'riqnomasi
 */
const PWAInstallBanner = () => {
    const { isInstallable, isInstalled, isIOS, installApp } = usePWAInstall();
    const [dismissed, setDismissed] = useState(false);
    const [showIOSGuide, setShowIOSGuide] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Avval dismiss qilinganmi?
        const wasDismissed = localStorage.getItem('pwa-banner-dismissed');
        if (wasDismissed) return;

        if (isInstallable && !isInstalled) {
            // 2 soniya kechiktirish — sahifa avval yuklansin
            const timer = setTimeout(() => setVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, [isInstallable, isInstalled]);

    const handleDismiss = () => {
        setVisible(false);
        setDismissed(true);
        localStorage.setItem('pwa-banner-dismissed', 'true');
    };

    const handleInstall = async () => {
        if (isIOS) {
            setShowIOSGuide(true);
            return;
        }
        const success = await installApp();
        if (success) setVisible(false);
    };

    if (!visible || dismissed || isInstalled) return null;

    return (
        <>
            {/* ─── iOS Yo'riqnoma Modal ──────────────────────────────────────────── */}
            <AnimatePresence>
                {showIOSGuide && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-end justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={() => setShowIOSGuide(false)}
                    >
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-xl">
                                        ⚡
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-base">iPhone ga O'rnatish</h3>
                                        <p className="text-slate-400 text-xs">3 ta oddiy qadam</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowIOSGuide(false)}
                                    className="text-slate-500 hover:text-slate-300 transition-colors p-1"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Qadamlar */}
                            <div className="space-y-4">
                                {[
                                    {
                                        step: '1',
                                        icon: <Share size={16} className="text-indigo-400" />,
                                        desc: <>Safari pastidagi <strong className="text-white">«Share»</strong> tugmasini bosing</>
                                    },
                                    {
                                        step: '2',
                                        icon: <span className="text-indigo-400 text-sm font-bold">+</span>,
                                        desc: <><strong className="text-white">«Add to Home Screen»</strong> ni tanlang</>
                                    },
                                    {
                                        step: '3',
                                        icon: <span className="text-emerald-400 text-sm">✓</span>,
                                        desc: <><strong className="text-white">«Add»</strong> ni bosing — tayyor!</>
                                    }
                                ].map(({ step, icon, desc }) => (
                                    <div key={step} className="flex items-start gap-4 p-3 bg-slate-800/60 rounded-2xl">
                                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                            {step}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            {icon}
                                            <p className="text-slate-300 text-sm">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => setShowIOSGuide(false)}
                                className="w-full mt-5 py-3 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold rounded-2xl transition-all text-sm"
                            >
                                Tushunarli ✅
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─── Asosiy Banner ────────────────────────────────────────────────── */}
            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{ y: 120, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 120, opacity: 0, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-4 left-4 right-4 z-[100] sm:left-auto sm:right-4 sm:w-96"
                    >
                        <div className="relative bg-slate-900/95 backdrop-blur-xl border border-indigo-500/30 rounded-3xl p-4 shadow-2xl shadow-indigo-500/10 overflow-hidden">

                            {/* Orqa gradient bezak */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-purple-900/10 pointer-events-none" />

                            {/* Yopish tugmasi */}
                            <button
                                onClick={handleDismiss}
                                className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-full transition-all"
                            >
                                <X size={14} />
                            </button>

                            <div className="relative flex items-start gap-3">
                                {/* App ikonasi */}
                                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/30">
                                    <span className="text-2xl">⚡</span>
                                    {/* Badge */}
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                                        <span className="text-[7px] font-bold text-white">✓</span>
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0 pr-6">
                                    {/* Sarlavha + yulduzlar */}
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <p className="text-white font-bold text-sm">NurFizika</p>
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={9} className="text-yellow-400 fill-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-slate-400 text-xs mb-1">
                                        Ilovani o'rnating — tezroq, qulay!
                                    </p>
                                    <div className="flex items-center gap-1.5">
                                        <Smartphone size={10} className="text-emerald-400" />
                                        <span className="text-emerald-400 text-[10px] font-medium">
                                            Bepul • Offline rejim • Play Market emas
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* O'rnatish tugmasi */}
                            <button
                                onClick={handleInstall}
                                className="relative w-full mt-3.5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98] text-white font-semibold text-sm rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
                            >
                                <Download size={16} />
                                {isIOS ? 'Qanday o\'rnatiladi?' : 'Ilovani O\'rnatish'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default PWAInstallBanner;
