import React, { createContext, useContext, useState, useEffect } from 'react';

// Translation imports
import uz from '../locales/uz.json';
import ru from '../locales/ru.json';
import en from '../locales/en.json';

const LanguageContext = createContext();

// Supported languages
export const LANGUAGES = [
    { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
];

// Translation data
const translations = {
    uz,
    ru,
    en
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    // Get saved language or default to 'uz'
    const [language, setLanguageState] = useState(() => {
        return localStorage.getItem('nurfizika-language') || 'uz';
    });

    // Save language to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('nurfizika-language', language);
        // Update HTML lang attribute
        document.documentElement.lang = language;
    }, [language]);

    // Change language function
    const setLanguage = (newLanguage) => {
        if (translations[newLanguage]) {
            setLanguageState(newLanguage);
        }
    };

    // Translation function with nested key support
    const t = (key, params = {}) => {
        const keys = key.split('.');
        let value = translations[language];

        // Navigate through nested keys
        for (const k of keys) {
            value = value?.[k];
            if (value === undefined) break;
        }

        // Fallback to Uzbek if translation not found
        if (value === undefined) {
            value = translations.uz;
            for (const k of keys) {
                value = value?.[k];
                if (value === undefined) break;
            }
        }

        // If still not found, return the key itself
        if (value === undefined) {
            return key;
        }

        // Replace parameters in translation
        if (typeof value === 'string' && Object.keys(params).length > 0) {
            return value.replace(/\{(\w+)\}/g, (match, param) => {
                return params[param] !== undefined ? params[param] : match;
            });
        }

        return value;
    };

    const value = {
        language,
        setLanguage,
        t,
        languages: LANGUAGES
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
