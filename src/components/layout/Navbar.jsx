import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn, UserPlus, Sun, Moon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import LanguageSwitcher from '../LanguageSwitcher';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { theme, toggleTheme } = useTheme();

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
        { label: t('nav_home'), section: 'hero' },
        { label: t('nav_features'), section: 'features' },
        { label: t('nav_about'), section: 'about' },
        { label: t('nav_contact'), section: 'contact' },
    ];

    const scrollToSection = (sectionId) => {
        if (window.location.pathname !== '/') {
            navigate('/');
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
            const mainContainer = document.querySelector('main');
            if (mainContainer) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
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
            console.warn(`Section "${sectionId}" not found.`);
        }
    };

    const handleNavClick = (link) => {
        if (link.section) {
            scrollToSection(link.section);
        } else if (link.path) {
            navigate(link.path);
        }
    };

    const isLight = theme === 'light';

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b transition-all duration-300 ${
                    isLight
                        ? 'bg-white/95 border-slate-200 shadow-sm'
                        : 'bg-slate-900/95 border-slate-800 shadow-2xl'
                }`}
                style={{
                    boxShadow: isLight
                        ? '0 1px 12px rgba(0,0,0,0.08)'
                        : '0 2px 20px rgba(0, 0, 0, 0.3)'
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <button onClick={() => scrollToSection('hero')} className="flex items-center space-x-3 group">
                            <img
                                src="/assets/nurfizika.jpg"
                                alt="NurFizika"
                                className="h-14 md:h-16 rounded-2xl transition-transform group-hover:scale-110 shadow-lg"
                                style={{ filter: 'drop-shadow(0 6px 15px rgba(255, 215, 0, 0.4))' }}
                            />
                            <div className="flex flex-col items-start">
                                <span className={`text-xl md:text-2xl font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>
                                    {t('app_name')}
                                </span>
                                <span className="text-sm text-yellow-500 font-medium italic drop-shadow-sm">{t('hero_slogan')}</span>
                            </div>
                        </button>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleNavClick(link)}
                                    className={`transition-colors font-medium ${
                                        isLight
                                            ? 'text-slate-600 hover:text-slate-900'
                                            : 'text-slate-300 hover:text-white'
                                    }`}
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>

                        {/* Desktop Auth Buttons, Language Switcher & Theme Toggle */}
                        <div className="hidden md:flex items-center space-x-3">
                            {/* Theme Toggle Button */}
                            <motion.button
                                onClick={toggleTheme}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`relative p-2 rounded-lg border transition-all duration-300 ${
                                    isLight
                                        ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                                        : 'bg-slate-800/50 border-slate-700/50 text-yellow-400 hover:bg-slate-700/70'
                                }`}
                                title={isLight ? "Tun rejimi" : "Kun rejimi"}
                                aria-label="Tema o'zgartirish"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {isLight ? (
                                        <motion.span
                                            key="moon"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Moon size={18} />
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="sun"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Sun size={18} />
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>

                            <LanguageSwitcher variant="navbar" />
                            <button
                                onClick={() => navigate('/login')}
                                className={`flex items-center space-x-2 px-4 py-2 transition-colors font-medium ${
                                    isLight
                                        ? 'text-slate-700 hover:text-blue-600'
                                        : 'text-white hover:text-blue-400'
                                }`}
                            >
                                <LogIn size={18} />
                                <span>{t('nav_login')}</span>
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                            >
                                <UserPlus size={18} />
                                <span>{t('nav_register')}</span>
                            </button>
                        </div>

                        {/* Mobile: theme toggle + menu button */}
                        <div className="md:hidden flex items-center gap-2">
                            <motion.button
                                onClick={toggleTheme}
                                whileTap={{ scale: 0.9 }}
                                className={`p-2 rounded-lg border transition-all duration-300 ${
                                    isLight
                                        ? 'bg-slate-100 border-slate-200 text-slate-700'
                                        : 'bg-slate-800 border-slate-700 text-yellow-400'
                                }`}
                                aria-label="Tema o'zgartirish"
                            >
                                {isLight ? <Moon size={20} /> : <Sun size={20} />}
                            </motion.button>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`p-2 rounded-lg transition-colors ${
                                    isLight
                                        ? 'text-slate-700 hover:bg-slate-100'
                                        : 'text-white hover:bg-slate-800'
                                }`}
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
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
                            className={`fixed top-0 right-0 bottom-0 w-80 border-l z-50 md:hidden overflow-y-auto ${
                                isLight
                                    ? 'bg-white border-slate-200'
                                    : 'bg-slate-900 border-slate-800'
                            }`}
                        >
                            {/* Header */}
                            <div className={`flex items-center justify-between p-4 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                                <div className="flex items-center space-x-2">
                                    <img
                                        src="/icons/icon-192x192.png"
                                        alt="NurFizika"
                                        className="w-10 h-10 rounded-xl object-cover shadow-md"
                                    />
                                    <div className="flex flex-col">
                                        <span className={`text-lg font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>
                                            {t('app_name')}
                                        </span>
                                        <span className="text-xs text-yellow-500 italic">{t('hero_slogan')}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`p-2 rounded-lg transition-colors ${
                                        isLight
                                            ? 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                    }`}
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
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${
                                            isLight
                                                ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                                                : 'text-slate-300 hover:text-white hover:bg-slate-800'
                                        }`}
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </div>

                            {/* Auth Buttons */}
                            <div className={`p-4 space-y-3 border-t ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                                <button
                                    onClick={() => {
                                        navigate('/login');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors font-medium ${
                                        isLight
                                            ? 'text-slate-700 bg-slate-100 hover:bg-slate-200'
                                            : 'text-white bg-slate-800 hover:bg-slate-700'
                                    }`}
                                >
                                    <LogIn size={18} />
                                    <span>{t('nav_login')}</span>
                                </button>
                                <button
                                    onClick={() => {
                                        navigate('/register');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                                >
                                    <UserPlus size={18} />
                                    <span>{t('nav_register')}</span>
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
