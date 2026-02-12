import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Language Switcher Component
 * Dropdown menu for changing app language
 */
const LanguageSwitcher = ({ variant = 'default' }) => {
    const { language, setLanguage, languages } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (code) => {
        setLanguage(code);
        setIsOpen(false);
    };

    const currentLanguage = languages.find(lang => lang.code === language);

    // Variant styles
    const variants = {
        default: {
            button: 'px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700',
            dropdown: 'bg-slate-800 border-slate-700'
        },
        navbar: {
            button: 'px-3 py-2 bg-slate-800/50 hover:bg-slate-700/70 text-white rounded-lg border border-slate-700/50',
            dropdown: 'bg-slate-800 border-slate-700'
        },
        settings: {
            button: 'w-full px-4 py-3 bg-slate-800/50 hover:bg-slate-700/70 text-white rounded-lg border border-slate-700/30',
            dropdown: 'bg-slate-800 border-slate-700'
        }
    };

    const style = variants[variant] || variants.default;

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
          ${style.button}
          flex items-center gap-2
          transition-all duration-200
          hover:shadow-lg
        `}
            >
                <Globe size={18} className="flex-shrink-0" />
                <span className="text-sm font-medium">{currentLanguage?.flag} {currentLanguage?.name}</span>
                <motion.svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="flex-shrink-0"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <path
                        d="M2 4L6 8L10 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </motion.svg>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className={`
              absolute top-full mt-2 right-0
              ${style.dropdown}
              border
              rounded-lg
              shadow-2xl
              overflow-hidden
              z-50
              min-w-[200px]
            `}
                    >
                        {languages.map((lang, index) => {
                            const isActive = lang.code === language;
                            return (
                                <motion.button
                                    key={lang.code}
                                    onClick={() => handleLanguageChange(lang.code)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`
                    w-full px-4 py-3
                    flex items-center justify-between gap-3
                    transition-all duration-200
                    ${isActive
                                            ? 'bg-blue-500/20 text-blue-400'
                                            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                                        }
                    ${index !== languages.length - 1 ? 'border-b border-slate-700/50' : ''}
                  `}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{lang.flag}</span>
                                        <span className="text-sm font-medium">{lang.name}</span>
                                    </div>
                                    {isActive && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        >
                                            <Check size={16} className="text-blue-400" />
                                        </motion.div>
                                    )}
                                </motion.button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSwitcher;
