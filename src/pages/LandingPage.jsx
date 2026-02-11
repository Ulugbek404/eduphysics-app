import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import About from '../components/landing/About';
import Contact from '../components/landing/Contact';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
    return (
        <>
            {/* SEO Meta Tags */}
            <Helmet>
                <title>NurFizika - 9-sinf Fizikani AI bilan o'rgan</title>
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
                <meta property="og:title" content="NurFizika - 9-sinf Fizikani AI bilan o'rgan" />
                <meta
                    property="og:description"
                    content="NurFizika bilan fizikani oson va qiziqarli o'rganing. AI ustoz, virtual laboratoriya va 100+ test. Kuch — bilimda, bilim — bizda!"
                />
                <meta property="og:url" content="https://eduphysics.uz" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="NurFizika - 9-sinf Fizikani AI bilan o'rgan" />
                <meta
                    name="twitter:description"
                    content="Sun'iy intellekt yordamida 9-sinf fizikasini o'rganing. Virtual laboratoriya, AI ustoz, 100+ test va interaktiv darslar."
                />
            </Helmet>

            {/* Navigation */}
            <Navbar />

            {/* Main Content - 4 sections with snap scroll */}
            <main className="overflow-y-scroll snap-y snap-mandatory h-screen overflow-x-hidden">
                <section id="hero" className="snap-start snap-always">
                    <Hero />
                </section>

                <section id="features" className="snap-start snap-always">
                    <Features />
                </section>

                <section id="about" className="snap-start snap-always">
                    <About />
                </section>

                <section id="contact" className="snap-start snap-always">
                    <Contact />
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
};

export default LandingPage;
