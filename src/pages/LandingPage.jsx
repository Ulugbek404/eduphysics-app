import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import About from '../components/landing/About';
import Contact from '../components/landing/Contact';
import Footer from '../components/landing/Footer';
import { useTheme } from '../contexts/ThemeContext';

const LandingPage = () => {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    return (
        <>
            {/* SEO Meta Tags */}
            <Helmet>
                <title>NurFizika - 9-sinf fizikani AI bilan o'rgan</title>
                <meta
                    name="description"
                    content="NurFizika - 9-sinf fizika kursi. AI ustoz, virtual laboratoriya, 100+ test. Kuch — bilimda, bilim — bizda!"
                />
                <meta
                    name="keywords"
                    content="NurFizika bilan fizikani oson va qiziqarli o'rganing. AI ustoz, virtual laboratoriya va 100+ test."
                />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="NurFizika - 9-sinf fizikani AI bilan o'rgan" />
                <meta
                    property="og:description"
                    content="NurFizika bilan fizikani oson va qiziqarli o'rganing. AI ustoz, virtual laboratoriya va 100+ test. Kuch — bilimda, bilim — bizda!"
                />
                <meta property="og:url" content="https://eduphysics.uz" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="NurFizika - 9-sinf fizikani AI bilan o'rgan" />
                <meta
                    name="twitter:description"
                    content="Sun'iy intellekt yordamida 9-sinf fizikasini o'rganing. Virtual laboratoriya, AI ustoz, 100+ test va interaktiv darslar."
                />
            </Helmet>

            {/* Navigation */}
            <Navbar />

            {/* ── Background: Dark = Kosmik, Light = Yorqin gradient ── */}
            <div
                className="fixed inset-0 -z-10 overflow-hidden transition-colors duration-500"
                style={{ background: isLight ? '#f8fafc' : '#030712' }}
            >
                {/* === DARK MODE: Kosmik fon === */}
                {!isLight && (
                    <>
                        {/* Static star field */}
                        <div className="absolute inset-0" style={{
                            backgroundImage: `
                                radial-gradient(1px 1px at  8% 12%, rgba(255,255,255,0.75) 0%, transparent 100%),
                                radial-gradient(1.5px 1.5px at 21% 34%, rgba(255,255,255,0.55) 0%, transparent 100%),
                                radial-gradient(1px 1px at 35%  5%, rgba(255,255,255,0.65) 0%, transparent 100%),
                                radial-gradient(1px 1px at 48% 78%, rgba(255,255,255,0.50) 0%, transparent 100%),
                                radial-gradient(1.5px 1.5px at 62% 22%, rgba(255,255,255,0.70) 0%, transparent 100%),
                                radial-gradient(1px 1px at 74% 61%, rgba(255,255,255,0.45) 0%, transparent 100%),
                                radial-gradient(1px 1px at 88%  9%, rgba(255,255,255,0.60) 0%, transparent 100%),
                                radial-gradient(1px 1px at 93% 47%, rgba(255,255,255,0.55) 0%, transparent 100%),
                                radial-gradient(1.5px 1.5px at 15% 58%, rgba(255,255,255,0.50) 0%, transparent 100%),
                                radial-gradient(1px 1px at 42% 91%, rgba(255,255,255,0.65) 0%, transparent 100%),
                                radial-gradient(1px 1px at 56% 44%, rgba(255,255,255,0.45) 0%, transparent 100%),
                                radial-gradient(1px 1px at 80% 83%, rgba(255,255,255,0.70) 0%, transparent 100%),
                                radial-gradient(1.5px 1.5px at  3% 76%, rgba(255,255,255,0.50) 0%, transparent 100%),
                                radial-gradient(1px 1px at 67% 96%, rgba(255,255,255,0.60) 0%, transparent 100%),
                                radial-gradient(1px 1px at 29% 67%, rgba(255,255,255,0.45) 0%, transparent 100%),
                                radial-gradient(1px 1px at 96% 31%, rgba(255,255,255,0.55) 0%, transparent 100%),
                                radial-gradient(1px 1px at 51% 17%, rgba(255,255,255,0.65) 0%, transparent 100%),
                                radial-gradient(1.5px 1.5px at 12% 89%, rgba(255,255,255,0.50) 0%, transparent 100%)`
                        }} />

                        {/* Nebulas */}
                        <div className="absolute -top-40 -left-40 w-[800px] h-[800px] rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(88,28,220,0.20) 0%, rgba(67,20,170,0.08) 40%, transparent 70%)' }} />
                        <div className="absolute top-10 -right-32 w-[600px] h-[600px] rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.16) 0%, rgba(29,78,216,0.06) 50%, transparent 70%)' }} />
                        <div className="absolute top-[60vh] left-1/4 w-[700px] h-[700px] rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(99,36,220,0.12) 0%, rgba(79,70,229,0.04) 50%, transparent 70%)' }} />
                        <div className="absolute top-[120vh] -right-20 w-[500px] h-[500px] rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.09) 0%, transparent 70%)' }} />
                        <div className="absolute top-[200vh] -left-20 w-[600px] h-[600px] rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(120,40,220,0.15) 0%, rgba(80,20,180,0.05) 50%, transparent 70%)' }} />
                        <div className="absolute top-[280vh] right-10 w-[500px] h-[500px] rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(59,33,210,0.13) 0%, transparent 70%)' }} />

                        {/* Subtle grid */}
                        <div className="absolute inset-0 opacity-[0.025]" style={{
                            backgroundImage: `linear-gradient(rgba(148,163,184,1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)`,
                            backgroundSize: '60px 60px'
                        }} />

                        {/* Twinkling stars */}
                        <style>{`
                            @keyframes tw { 0%,100%{opacity:.15;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
                            .g-star { position:absolute; width:2px; height:2px; border-radius:50%; background:white; animation:tw linear infinite; }
                        `}</style>
                        {[
                            {t:'5%',l:'18%',d:'2.4s'},{t:'12%',l:'72%',d:'3.1s'},{t:'8%',l:'44%',d:'1.7s'},
                            {t:'25%',l:'6%',d:'4.2s'},{t:'31%',l:'88%',d:'2.8s'},{t:'18%',l:'59%',d:'3.6s'},
                            {t:'45%',l:'33%',d:'1.9s'},{t:'52%',l:'78%',d:'4.0s'},{t:'39%',l:'15%',d:'2.2s'},
                            {t:'63%',l:'51%',d:'3.4s'},{t:'70%',l:'91%',d:'1.5s'},{t:'58%',l:'27%',d:'4.7s'},
                            {t:'80%',l:'64%',d:'2.1s'},{t:'86%',l:'9%',d:'3.8s'},{t:'74%',l:'42%',d:'2.6s'},
                            {t:'92%',l:'74%',d:'1.8s'},{t:'97%',l:'37%',d:'4.3s'},{t:'88%',l:'83%',d:'2.9s'},
                            {t:'42%',l:'96%',d:'3.2s'},{t:'15%',l:'30%',d:'1.6s'},{t:'66%',l:'21%',d:'4.5s'},
                            {t:'3%',l:'85%',d:'2.0s'},{t:'55%',l:'67%',d:'3.9s'},{t:'78%',l:'48%',d:'1.3s'},
                        ].map((s, i) => (
                            <div key={i} className="g-star" style={{ top: s.t, left: s.l, animationDuration: s.d, animationDelay: `${i * 0.15}s` }} />
                        ))}
                    </>
                )}

                {/* === LIGHT MODE: Yorqin, chiroyli gradient fon === */}
                {isLight && (
                    <>
                        {/* Asosiy gradient */}
                        <div className="absolute inset-0" style={{
                            background: 'linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 40%, #F0F9FF 70%, #EEF2FF 100%)'
                        }} />

                        {/* Yumshoq dekorativ doiralar */}
                        <div className="absolute -top-40 -left-20 w-[600px] h-[600px] rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)' }} />
                        <div className="absolute top-20 -right-20 w-[500px] h-[500px] rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 70%)' }} />
                        <div className="absolute top-[60vh] left-1/3 w-[600px] h-[600px] rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)' }} />
                        <div className="absolute top-[130vh] -right-10 w-[400px] h-[400px] rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)' }} />
                        <div className="absolute top-[200vh] -left-10 w-[500px] h-[500px] rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)' }} />
                        <div className="absolute top-[280vh] right-10 w-[400px] h-[400px] rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)' }} />

                        {/* Yengil nuqta pattern */}
                        <div className="absolute inset-0 opacity-[0.4]" style={{
                            backgroundImage: `radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)`,
                            backgroundSize: '48px 48px'
                        }} />
                    </>
                )}
            </div>

            {/* Main Content */}
            <main
                className="h-screen overflow-y-auto overflow-x-hidden scroll-smooth w-full relative z-0"
                style={{ backgroundColor: isLight ? '#f8fafc' : 'transparent' }}
            >
                <section id="hero">
                    <Hero />
                </section>

                <section id="features">
                    <Features />
                </section>

                <section id="about">
                    <About />
                </section>

                <section id="contact">
                    <Contact />
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
};

export default LandingPage;
