import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Atom, Menu, X, LogIn, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../LanguageSwitcher';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { t } = useLanguage();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const navLinks = [
        { label: t('nav.home'), section: 'hero' },
        { label: 'Imkoniyatlar', section: 'features' },
        { label: t('nav.about'), section: 'about' },
        { label: t('nav.contact'), section: 'contact' },
    ];

    const scrollToSection = (sectionId) => {
        // First, navigate to home if not already there
        if (window.location.pathname !== '/') {
            navigate('/');
            // Wait for navigation to complete, then scroll
            setTimeout(() => {
                performScroll(sectionId);
            }, 100);
        } else {
            performScroll(sectionId);
        }
    };

    const performScroll = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            // Get the main scroll container
            const mainContainer = document.querySelector('main');
            if (mainContainer) {
                // Scroll the main container, not the window
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                // Fallback to window scroll
                const navbarHeight = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            setIsMobileMenuOpen(false);
        } else {
            console.warn(`Section "${sectionId}" not found. Make sure you're on the landing page.`);
        }
    };

    const handleNavClick = (link) => {
        if (link.section) {
            scrollToSection(link.section);
        } else if (link.path) {
            navigate(link.path);
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 shadow-2xl transition-all duration-300"
                style={{
                    boxShadow: '0 2px 20px rgba(0, 0, 0, 0.3)'
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <button onClick={() => scrollToSection('hero')} className="flex items-center space-x-3 group">
                            <img
                                src="/assets/nurfizika.jpg"
                                alt="NurFizika"
                                className="h-12 md:h-14 rounded-2xl transition-transform group-hover:scale-110"
                                style={{ filter: 'drop-shadow(0 4px 10px rgba(255, 215, 0, 0.3))' }}
                            />
                            <div className="flex flex-col items-start">
                                <span className="text-xl md:text-2xl font-bold text-white">NurFizika</span>
                                <span className="text-xs text-yellow-300 italic">Kuch — bilimda, bilim — bizda!</span>
                            </div>
                        </button>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleNavClick(link)}
                                    className="text-slate-300 hover:text-white transition-colors font-medium"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>

                        {/* Desktop Auth Buttons & Language Switcher */}
                        <div className="hidden md:flex items-center space-x-4">
                            <LanguageSwitcher variant="navbar" />
                            <button
                                onClick={() => navigate('/login')}
                                className="flex items-center space-x-2 px-4 py-2 text-white hover:text-blue-400 transition-colors font-medium"
                            >
                                <LogIn size={18} />
                                <span>{t('nav.login')}</span>
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                            >
                                <UserPlus size={18} />
                                <span>{t('nav.register')}</span>
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-white hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed top-0 right-0 bottom-0 w-80 bg-slate-900 border-l border-slate-800 z-50 md:hidden overflow-y-auto"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-slate-800">
                                <div className="flex items-center space-x-2">
                                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                                        <Atom size={20} className="text-white" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold text-white">NurFizika</span>
                                        <span className="text-xs text-yellow-300 italic">Kuch — bilimda, bilim — bizda!</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <div className="p-4 space-y-2">
                                {navLinks.map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleNavClick(link)}
                                        className="w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors font-medium"
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </div>

                            {/* Auth Buttons */}
                            <div className="p-4 space-y-3 border-t border-slate-800">
                                <button
                                    onClick={() => {
                                        navigate('/login');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors font-medium"
                                >
                                    <LogIn size={18} />
                                    <span>Kirish</span>
                                </button>
                                <button
                                    onClick={() => {
                                        navigate('/register');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                                >
                                    <UserPlus size={18} />
                                    <span>Ro'yxatdan o'tish</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
