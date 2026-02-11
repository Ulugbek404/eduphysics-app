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
                <title>EduPhysics - 9-sinf Fizikani AI bilan o'rgan</title>
                <meta
                    name="description"
                    content="Sun'iy intellekt yordamida 9-sinf fizikasini o'rganing. Virtual laboratoriya, AI ustoz, 100+ test va interaktiv darslar. Butunlay bepul!"
                />
                <meta
                    name="keywords"
                    content="fizika, 9-sinf, AI, sun'iy intellekt, virtual laboratoriya, testlar, o'zbek tili, ta'lim"
                />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="EduPhysics - 9-sinf Fizikani AI bilan o'rgan" />
                <meta
                    property="og:description"
                    content="Sun'iy intellekt yordamida 9-sinf fizikasini o'rganing. Virtual laboratoriya, AI ustoz, 100+ test va interaktiv darslar."
                />
                <meta property="og:url" content="https://eduphysics.uz" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="EduPhysics - 9-sinf Fizikani AI bilan o'rgan" />
                <meta
                    name="twitter:description"
                    content="Sun'iy intellekt yordamida 9-sinf fizikasini o'rganing. Virtual laboratoriya, AI ustoz, 100+ test va interaktiv darslar."
                />
            </Helmet>

            {/* Navigation */}
            <Navbar />

            {/* Main Content - 4 sections only */}
            <main className="overflow-x-hidden scroll-smooth">
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
