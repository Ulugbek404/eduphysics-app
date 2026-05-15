import React from 'react';
import { Atom, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

const Footer = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        platform: [
            { label: t('nav_home'), path: '/' },
            { label: t('footer_lessons'), path: '/dashboard/lessons' },
            { label: t('footer_tests'), path: '/dashboard/tests' },
            { label: t('footer_lab'), path: '/dashboard/lab' },
        ],
        company: [
            { label: t('footer_about'), path: '/about' },
            { label: t('footer_contact'), path: '/contact' },
            { label: t('footer_privacy'), path: '/privacy' },
            { label: t('footer_terms'), path: '/terms' },
        ],
        resources: [
            { label: t('footer_help'), path: '/help' },
            { label: t('footer_faq'), path: '/faq' },
            { label: 'Blog', path: '/blog' },
            { label: t('footer_community'), path: '/news' },
        ],
    };

    const socialLinks = [
        { icon: Facebook, url: 'https://www.facebook.com/share/1D3cRY2PHc/', label: 'Facebook' },
        { icon: Instagram, url: 'https://www.instagram.com/ulugbek_455', label: 'Instagram' },
        { icon: Youtube, url: 'https://youtube.com/@NurrFizika001-?=UcmdwQtAhZO3Z-Vv', label: 'YouTube' },
        { icon: Send, url: 'https://t.me/Ulugbek1434', label: 'Telegram' },
    ];

    return (
        <footer className="border-t transition-colors duration-300 theme-bg-secondary theme-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                                <Atom size={24} className="text-white" />
                            </div>
                            <span className={`text-xl font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>
                                {t('app_name')}
                            </span>
                            <span className="text-sm text-yellow-500 italic">{t('hero_slogan')}</span>
                        </div>
                        <p className="mb-4 leading-relaxed theme-muted">
                            {t('footer_desc')}
                        </p>

                        {/* Contact Info */}
                        <div className={`space-y-2 text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                            <div className="flex items-center space-x-2">
                                <Mail size={16} className="text-blue-500" />
                                <span>support@ulugbekedu.uz</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone size={16} className="text-blue-500" />
                                <span>+998 (93) 186-34-04</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin size={16} className="text-blue-500" />
                                <span>{t('contact_location_value')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h3 className={`font-bold mb-4 ${isLight ? 'text-slate-800' : 'text-white'}`}>
                            {t('footer_platform')}
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.platform.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-sm transition-colors theme-muted hover:text-teal-600 dark:hover:text-teal-400"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-bold mb-4 theme-text">
                            {t('footer_support')}
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-sm transition-colors theme-muted hover:text-teal-600 dark:hover:text-teal-400"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h3 className="font-bold mb-4 theme-text">
                            {t('footer_legal')}
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.resources.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-sm transition-colors theme-muted hover:text-teal-600 dark:hover:text-teal-400"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t pt-8 theme-border">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/* Copyright */}
                        <div className="text-sm theme-muted">
                            © {currentYear} {t('app_name')}. {t('footer_rights')}.
                        </div>

                        {/* QR Code & Social Links */}
                        <div className="flex items-center gap-6 mt-4 md:mt-0">
                            {/* QR Code Mini */}
                            <a
                                href="https://eduphysics-app.web.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-2 rounded-xl border transition-colors group theme-surface theme-border hover:border-teal-500/50"
                            >
                                <img
                                    src="/qr-code.jpg"
                                    alt="QR Code"
                                    className="w-10 h-10 bg-white p-1 rounded-lg group-hover:scale-105 transition-transform"
                                />
                                <div className="hidden sm:block text-left">
                                    <p className="text-xs font-medium theme-text">
                                        Telefoningizda
                                    </p>
                                    <p className="text-[10px] theme-muted">
                                        ochish uchun skanerlang
                                    </p>
                                </div>
                            </a>

                            {/* Social Links */}
                            <div className="flex items-center space-x-3">
                                {socialLinks.map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 theme-surface theme-text hover:bg-teal-600 hover:text-white"
                                            aria-label={social.label}
                                        >
                                            <Icon size={18} />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
