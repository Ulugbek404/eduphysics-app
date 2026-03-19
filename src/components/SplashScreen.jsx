import { useEffect, useState } from 'react';

/**
 * SplashScreen — Animatsiyali splash screen
 * FAQAT standalone (o'rnatilgan PWA) rejimida ko'rsatiladi
 * Brauzerda ochilganda — ko'rsatilmaydi
 */
const SplashScreen = ({ onFinish }) => {
    // phase: 'enter' → 'icon' → 'text' → 'exit'
    const [phase, setPhase] = useState('enter');

    useEffect(() => {
        const t1 = setTimeout(() => setPhase('icon'), 100);   // icon chiqadi
        const t2 = setTimeout(() => setPhase('text'), 700);   // matn chiqadi
        const t3 = setTimeout(() => setPhase('exit'), 2200);  // fade out
        const t4 = setTimeout(() => onFinish(), 2800);        // app ochiladi

        return () => [t1, t2, t3, t4].forEach(clearTimeout);
    }, [onFinish]);

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center
                  transition-opacity duration-500 ease-in-out
                  ${phase === 'exit' ? 'opacity-0' : 'opacity-100'}`}
        >
            {/* Gradient orqa fon */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-950" />

            {/* Orqa yulduz effekti */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-indigo-400/30 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.2}s`,
                            animationDuration: `${1.5 + Math.random()}s`,
                        }}
                    />
                ))}
            </div>

            {/* ─── Markaziy Icon ─────────────────────────────────────────────── */}
            <div
                className={`relative transition-all duration-700 ease-out
                    ${phase === 'enter'
                        ? 'scale-0 opacity-0'
                        : 'scale-100 opacity-100'}`}
            >
                {/* Tashqi ping halqasi */}
                <div className="absolute -inset-4 rounded-full border-2 border-indigo-500/20 animate-ping" />
                {/* O'rta halqa */}
                <div className="absolute -inset-2 rounded-3xl border border-indigo-500/30 animate-pulse" />

                {/* Asosiy ikonka */}
                <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center shadow-2xl shadow-indigo-500/50 relative z-10">
                    <span className="text-6xl">⚡</span>
                </div>
            </div>

            {/* ─── Matn ──────────────────────────────────────────────────────── */}
            <div
                className={`mt-8 text-center transition-all duration-500 ease-out
                    ${phase === 'text' || phase === 'exit'
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-6'}`}
            >
                <h1 className="text-white text-4xl font-bold tracking-tight">
                    Nur<span className="text-indigo-400">Fizika</span>
                </h1>
                <p className="text-indigo-400/70 text-sm mt-2 tracking-widest uppercase font-medium">
                    Kuch — bilimda!
                </p>
            </div>

            {/* ─── Loading indikator ─────────────────────────────────────────── */}
            <div
                className={`absolute bottom-16 flex gap-2 transition-all duration-500
                    ${phase === 'text' || phase === 'exit'
                        ? 'opacity-100'
                        : 'opacity-0'}`}
            >
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                    />
                ))}
            </div>
        </div>
    );
};

export default SplashScreen;
