import React from 'react';
import { Atom, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        platform: [
            { label: 'Bosh sahifa', path: '/' },
            { label: 'Darslar', path: '/dashboard/lessons' },
            { label: 'Testlar', path: '/dashboard/tests' },
            { label: 'Virtual Lab', path: '/dashboard/lab' },
        ],
        company: [
            { label: 'Biz haqimizda', path: '/about' },
            { label: 'Bog\'lanish', path: '/contact' },
            { label: 'Maxfiylik siyosati', path: '/privacy' },
            { label: 'Foydalanish shartlari', path: '/terms' },
        ],
        resources: [
            { label: 'Yordam markazi', path: '/help' },
            { label: 'FAQ', path: '/faq' },
            { label: 'Blog', path: '/blog' },
            { label: 'Yangiliklar', path: '/news' },
        ],
    };

    const socialLinks = [
        { icon: Facebook, url: '#', label: 'Facebook' },
        { icon: Instagram, url: '#', label: 'Instagram' },
        { icon: Youtube, url: '#', label: 'YouTube' },
        { icon: Send, url: '#', label: 'Telegram' },
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
                            <span className="text-xl font-bold text-white">NurFizika</span>
                            <span className="text-sm text-yellow-300 italic">Kuch — bilimda, bilim — bizda!</span>
                        </div>
                        <p className="text-slate-400 mb-4 leading-relaxed">
                            Sun'iy intellekt yordamida 9-sinf fizikasini o'rganish platformasi.
                            Virtual laboratoriya, AI ustoz va interaktiv darslar bilan bilimingizni oshiring.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-2 text-sm text-slate-400">
                            <div className="flex items-center space-x-2">
                                <Mail size={16} className="text-blue-400" />
                                <span>info@eduphysics.uz</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone size={16} className="text-blue-400" />
                                <span>+998 90 123 45 67</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin size={16} className="text-blue-400" />
                                <span>Toshkent, O'zbekiston</span>
                            </div>
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Platforma</h3>
                        <ul className="space-y-2">
                            {footerLinks.platform.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-slate-400 hover:text-blue-400 transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Kompaniya</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-slate-400 hover:text-blue-400 transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Resurslar</h3>
                        <ul className="space-y-2">
                            {footerLinks.resources.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-slate-400 hover:text-blue-400 transition-colors text-sm"
                                    >
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
                            © {currentYear} NurFizika. Barcha huquqlar himoyalangan.
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center space-x-4">
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
        </footer>
    );
};

export default Footer;
