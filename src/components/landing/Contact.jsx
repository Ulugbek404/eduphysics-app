import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mail, Phone, MapPin, Send, MessageSquare,
    HelpCircle, ChevronDown, Facebook, Instagram, Youtube,
    Send as TelegramIcon
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import SolarSystemAnimation from './SolarSystemAnimation';

const Contact = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [openFaq, setOpenFaq] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setSubmitStatus('success');
            setIsSubmitting(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSubmitStatus(null), 5000);
        }, 1500);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const faqs = [
        { question: t('faq_1_q'), answer: t('faq_1_a') },
        { question: t('faq_2_q'), answer: t('faq_2_a') },
        { question: t('faq_3_q'), answer: t('faq_3_a') },
        { question: t('faq_4_q'), answer: t('faq_4_a') }
    ];

    // Karta va input stillari
    const cardClass = isLight
        ? 'bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm'
        : 'bg-slate-800/50 backdrop-blur-sm border border-slate-700';

    const inputClass = isLight
        ? 'w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors'
        : 'w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors';

    const labelClass = isLight
        ? 'block text-slate-700 mb-2 font-medium text-sm'
        : 'block text-slate-300 mb-2 font-medium text-sm';

    return (
        <section className="min-h-screen flex items-center justify-center py-20 pt-20 relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isLight ? 'text-slate-800' : 'text-white'}`}>
                        {t('contact_title')}
                    </h2>
                    <p className={`text-xl max-w-2xl mx-auto ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        {t('contact_subtitle')}
                    </p>
                </motion.div>

                {/* Contact Form & Info */}
                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className={`${cardClass} rounded-3xl p-8`}>
                            <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${isLight ? 'text-slate-800' : 'text-white'}`}>
                                <MessageSquare className="w-7 h-7 text-blue-500" />
                                {t('contact_form_title')}
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className={labelClass}>{t('contact_name')}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className={inputClass}
                                        placeholder={t('contact_name')}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>{t('contact_email_label')}</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className={inputClass}
                                        placeholder="email@example.com"
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>{t('contact_subject')}</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className={inputClass}
                                        placeholder={t('contact_subject')}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>{t('contact_message')}</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className={`${inputClass} resize-none`}
                                        placeholder={t('contact_message')}
                                    />
                                </div>

                                {submitStatus === 'success' && (
                                    <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-green-600 dark:text-green-300 text-sm">
                                        ✓ {t('contact_success')}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? t('contact_sending') : (
                                        <>
                                            {t('contact_send')}
                                            <Send className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Contact Info & Social */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        {/* Contact Details */}
                        <div className={`${cardClass} rounded-3xl p-8`}>
                            <h3 className={`text-xl font-bold mb-6 ${isLight ? 'text-slate-800' : 'text-white'}`}>
                                {t('contact_info_title')}
                            </h3>

                            <div className="space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <div className={`text-sm mb-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                                            {t('contact_email_label')}
                                        </div>
                                        <a href="mailto:nurfizikasupport@gmail.com"
                                            className={`transition-colors ${isLight ? 'text-slate-800 hover:text-blue-600' : 'text-white hover:text-blue-400'}`}>
                                            nurfizikasupport@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-purple-500" />
                                    </div>
                                    <div>
                                        <div className={`text-sm mb-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                                            {t('contact_telegram')}
                                        </div>
                                        <a href="tel:+998931863404"
                                            className={`transition-colors ${isLight ? 'text-slate-800 hover:text-purple-600' : 'text-white hover:text-purple-400'}`}>
                                            +998 (93) 186-34-04
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-pink-500" />
                                    </div>
                                    <div>
                                        <div className={`text-sm mb-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                                            {t('contact_location')}
                                        </div>
                                        <div className={isLight ? 'text-slate-800' : 'text-white'}>
                                            {t('contact_location_value')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className={`${cardClass} rounded-3xl p-8`}>
                            <h3 className={`text-xl font-bold mb-6 ${isLight ? 'text-slate-800' : 'text-white'}`}>
                                {t('contact_social')}
                            </h3>

                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { icon: <Facebook className="w-5 h-5" />, name: "Facebook", url: "https://www.facebook.com/share/18bRKT6BbK/", color: "blue" },
                                    { icon: <Instagram className="w-5 h-5" />, name: "Instagram", url: "https://www.instagram.com/nurfizika", color: "pink" },
                                    { icon: <Youtube className="w-5 h-5" />, name: "YouTube", url: "https://www.youtube.com/@NurFizika", color: "red" },
                                    { icon: <TelegramIcon className="w-5 h-5" />, name: "Telegram", url: "https://t.me/+sRohecqH4KVlYjli", color: "blue" }
                                ].map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-2 p-3 rounded-xl transition-all group border ${isLight
                                            ? 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                                            : `bg-${social.color}-500/10 border-${social.color}-500/20 hover:bg-${social.color}-500/20`
                                            }`}
                                    >
                                        <div className="group-hover:scale-110 transition-transform text-slate-600 dark:text-white">
                                            {social.icon}
                                        </div>
                                        <span className={`font-medium text-sm ${isLight ? 'text-slate-700' : 'text-white'}`}>
                                            {social.name}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* App Download/QR Code & Location Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
                >
                    {/* QR Code Card */}
                    <div className={`${cardClass} rounded-3xl p-6 sm:p-8 max-w-sm w-full mx-auto relative overflow-hidden group flex flex-col h-full`}>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors duration-500 pointer-events-none" />

                        <h4 className={`text-xl font-bold mb-2 flex flex-col items-center justify-center gap-2 text-center ${isLight ? 'text-slate-800' : 'text-white'}`}>
                            <span className="text-2xl">📱</span>
                            {t('qr_title')}
                        </h4>
                        <p className={`font-medium mb-6 text-center text-sm sm:text-base flex-grow ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                            {t('qr_desc')}
                        </p>

                        <div className="flex justify-center flex-shrink-0">
                            <div className="relative inline-block mt-2">
                                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl blur-md opacity-40 group-hover:opacity-100 transition duration-500" />
                                <img
                                    src="/qr-code.jpg"
                                    alt="NurFizika QR"
                                    className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 object-cover rounded-2xl border-2 sm:border-4 border-white/10 bg-white p-2 transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-300 shadow-2xl"
                                />
                            </div>
                        </div>

                        <p className="text-blue-500 font-bold tracking-widest text-xs sm:text-sm mt-6 text-center flex-shrink-0">
                            eduphysics-app.web.app
                        </p>
                    </div>

                    {/* Location Card */}
                    <div className={`${cardClass} rounded-3xl p-6 sm:p-8 max-w-sm w-full mx-auto relative overflow-hidden group flex flex-col h-full`}>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-colors duration-500 pointer-events-none" />

                        <div className="flex items-center gap-3 mb-2 justify-center sm:justify-start">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-5 h-5 text-purple-500" />
                            </div>
                            <h4 className={`text-lg font-bold flex items-center gap-2 ${isLight ? 'text-slate-800' : 'text-white'}`}>
                                {t('location_title')}
                            </h4>
                        </div>

                        <p className={`font-medium mb-4 text-sm mt-2 flex-grow text-center sm:text-left ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                            {t('location_desc')}
                        </p>

                        <div className={`relative w-full h-40 sm:h-48 md:h-56 rounded-2xl overflow-hidden border-2 transition-colors flex-shrink-0 ${isLight ? 'border-slate-200' : 'border-slate-700 group-hover:border-purple-500/50'}`}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.6985040051833!2d69.2842065116773!3d41.339665799115144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8cae3baaaab3%3A0x70529ccdeede6c4!2sTashkent%20University%20of%20Information%20Technologies!5e0!3m2!1sen!2s!4v1703649600000!5m2!1sen!2s"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale-[20%] contrast-125 opacity-90 group-hover:opacity-100 transition-opacity"
                            />
                        </div>

                        <a
                            href="https://maps.app.goo.gl/MDaTG75z79bbot5L7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mt-5 flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 px-4 rounded-xl font-semibold transition-colors flex-shrink-0 ${isLight
                                ? 'bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700'
                                : 'bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white'
                                }`}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 3h6v6" /><path d="M10 14L21 3" /><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                            </svg>
                            {t('location_btn')}
                        </a>
                    </div>
                </motion.div>

                {/* Solar System Animation Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-20 max-w-5xl mx-auto"
                >
                    <div className="text-center mb-8">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 ${isLight
                            ? 'bg-indigo-100 border border-indigo-200 text-indigo-600'
                            : 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-300'
                            }`}>
                            ⚛️ {t('solar_badge')}
                        </div>
                        <h3 className={`text-3xl md:text-4xl font-bold mb-3 ${isLight ? 'text-slate-800' : 'text-white'}`}>
                            {t('solar_title')}
                        </h3>
                        <p className={`max-w-xl mx-auto text-base ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                            {t('solar_desc')}
                        </p>
                    </div>

                    <div className={`relative rounded-3xl overflow-hidden border shadow-2xl ${isLight ? 'border-indigo-200 shadow-indigo-100' : 'border-indigo-500/20 shadow-indigo-900/40'
                        }`}>
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-indigo-600/30 rounded-3xl blur-sm pointer-events-none" />
                        <div className="relative">
                            <SolarSystemAnimation />
                        </div>
                    </div>

                    <p className={`text-center text-xs mt-4 tracking-widest ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                        {t('solar_footer')}
                    </p>
                </motion.div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto mt-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h3 className={`text-3xl font-bold mb-4 flex items-center justify-center gap-3 ${isLight ? 'text-slate-800' : 'text-white'}`}>
                            <HelpCircle className="w-8 h-8 text-blue-500" />
                            {t('footer_faq')}
                        </h3>
                    </motion.div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`border rounded-2xl overflow-hidden ${isLight
                                    ? 'bg-white border-slate-200 shadow-sm'
                                    : 'bg-slate-800/50 backdrop-blur-sm border-slate-700'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors ${isLight ? 'hover:bg-slate-50' : 'hover:bg-slate-700/30'
                                        }`}
                                >
                                    <span className={`text-lg font-semibold pr-4 ${isLight ? 'text-slate-800' : 'text-white'}`}>
                                        {faq.question}
                                    </span>
                                    <ChevronDown className={`w-6 h-6 text-blue-500 flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                                </button>

                                {openFaq === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-6 pb-4"
                                    >
                                        <p className={`leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
