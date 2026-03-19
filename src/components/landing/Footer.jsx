import React from 'react';
import { Atom, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();
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
        <footer className="bg-slate-950 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                                <Atom size={24} className="text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">{t('app_name')}</span>
                            <span className="text-sm text-yellow-300 italic">{t('hero_slogan')}</span>
                        </div>
                        <p className="text-slate-400 mb-4 leading-relaxed">
                            {t('footer_desc')}
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-2 text-sm text-slate-400">
                            <div className="flex items-center space-x-2">
                                <Mail size={16} className="text-blue-400" />
                                <span>support@ulugbekedu.uz</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone size={16} className="text-blue-400" />
                                <span>+998 (93) 186-34-04</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin size={16} className="text-blue-400" />
                                <span>{t('contact_location_value')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4">{t('footer_platform')}</h3>
                        <ul className="space-y-2">
                            {footerLinks.platform.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.path} className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4">{t('footer_support')}</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.path} className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4">{t('footer_legal')}</h3>
                        <ul className="space-y-2">
                            {footerLinks.resources.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.path} className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/* Copyright */}
                        <div className="text-slate-400 text-sm">
                            © {currentYear} {t('app_name')}. {t('footer_rights')}.
                        </div>

                        {/* QR Code & Social Links */}
                        <div className="flex items-center gap-6 mt-4 md:mt-0">
                            {/* QR Code Mini */}
                            <a href="https://eduphysics-app.web.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-slate-900/80 p-2 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors group">
                                <img
                                    src="/qr-code.jpg"
                                    alt="QR Code"
                                    className="w-10 h-10 bg-white p-1 rounded-lg group-hover:scale-105 transition-transform"
                                />
                                <div className="hidden sm:block text-left">
                                    <p className="text-xs text-slate-300 font-medium">Telefoningizda</p>
                                    <p className="text-[10px] text-slate-400">ochish uchun skanerlang</p>
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
                                        className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
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
