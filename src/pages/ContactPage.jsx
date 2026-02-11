import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
    Mail,
    Phone,
    MapPin,
    Send,
    MessageSquare,
    HelpCircle,
    ChevronDown,
    Facebook,
    Instagram,
    Youtube,
    Send as TelegramIcon
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/landing/Footer';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [openFaq, setOpenFaq] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setSubmitStatus('success');
            setIsSubmitting(false);
            setFormData({ name: '', email: '', subject: '', message: '' });

            setTimeout(() => setSubmitStatus(null), 5000);
        }, 1500);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const faqs = [
        {
            question: "EduPhysics platformasi butunlay bepulmi?",
            answer: "Ha, EduPhysics platformasi to'liq bepul. Hech qanday yashirin to'lovlar yoki obuna haqi yo'q. Barcha darslar, testlar va AI xususiyatlari bepul."
        },
        {
            question: "Platformadan foydalanish uchun nima kerak?",
            answer: "Faqat internet ulanishi va brauzer kerak. Hech qanday dastur o'rnatish shart emas. Kompyuter, planshet yoki telefonda ishlatishingiz mumkin."
        },
        {
            question: "AI ustoz qanday ishlaydi?",
            answer: "AI ustoz Google Gemini texnologiyasiga asoslangan. U sizning savollaringizga javob beradi, tushuntirishlar beradi va shaxsiy o'rganish rejasini taklif qiladi."
        },
        {
            question: "Virtual laboratoriya xavfsizmi?",
            answer: "Ha, virtual laboratoriya butunlay xavfsiz. Haqiqiy tajribalarni simulyatsiya qiladi, lekin hech qanday xavf yo'q. Barcha tajribalarni istalgancha takrorlashingiz mumkin."
        },
        {
            question: "Natijalarim saqlanadimi?",
            answer: "Ha, barcha natijalaringiz, XP, yutuqlar va progress avtomatik saqlanadi. Istalgan vaqt qaytib kelib davom etishingiz mumkin."
        },
        {
            question: "Muammo yuzaga kelsa qanday qilaman?",
            answer: "Ushbu sahifadagi kontakt forma orqali yoki ijtimoiy tarmoqlarda bizga murojaat qilishingiz mumkin. Biz 24-48 soat ichida javob beramiz."
        }
    ];

    return (
        <>
            {/* SEO Meta Tags */}
            <Helmet>
                <title>Bog'lanish - EduPhysics</title>
                <meta
                    name="description"
                    content="EduPhysics bilan bog'laning. Savollaringiz, takliflaringiz yoki muammolaringiz bo'lsa, biz bilan aloqaga chiqing."
                />
            </Helmet>

            <Navbar />

            <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                                Biz bilan bog'laning
                            </h1>
                            <p className="text-xl text-slate-300 leading-relaxed">
                                Savollaringiz, takliflaringiz yoki muammolaringiz bo'lsa,
                                biz bilan aloqaga chiqing. Sizga yordam berishdan xursandmiz!
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Contact Form & Info */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8">
                                    <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                        <MessageSquare className="w-8 h-8 text-blue-400" />
                                        Xabar Yuboring
                                    </h2>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-slate-300 mb-2 font-medium">
                                                Ismingiz
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                                                placeholder="Ismingizni kiriting"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-slate-300 mb-2 font-medium">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                                                placeholder="email@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-slate-300 mb-2 font-medium">
                                                Mavzu
                                            </label>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                                                placeholder="Xabar mavzusi"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-slate-300 mb-2 font-medium">
                                                Xabar
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={6}
                                                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                                placeholder="Xabaringizni yozing..."
                                            />
                                        </div>

                                        {submitStatus === 'success' && (
                                            <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-green-300">
                                                ✓ Xabaringiz muvaffaqiyatli yuborildi! Tez orada javob beramiz.
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>Yuborilmoqda...</>
                                            ) : (
                                                <>
                                                    Yuborish
                                                    <Send className="w-5 h-5" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </motion.div>

                            {/* Contact Info */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="space-y-8"
                            >
                                {/* Contact Details */}
                                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8">
                                    <h3 className="text-2xl font-bold text-white mb-6">
                                        Aloqa Ma'lumotlari
                                    </h3>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-6 h-6 text-blue-400" />
                                            </div>
                                            <div>
                                                <div className="text-slate-400 text-sm mb-1">Email</div>
                                                <a href="mailto:support@eduphysics.uz" className="text-white hover:text-blue-400 transition-colors">
                                                    support@eduphysics.uz
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Phone className="w-6 h-6 text-purple-400" />
                                            </div>
                                            <div>
                                                <div className="text-slate-400 text-sm mb-1">Telefon</div>
                                                <a href="tel:+998901234567" className="text-white hover:text-purple-400 transition-colors">
                                                    +998 (90) 123-45-67
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-6 h-6 text-pink-400" />
                                            </div>
                                            <div>
                                                <div className="text-slate-400 text-sm mb-1">Manzil</div>
                                                <div className="text-white">
                                                    Toshkent, O'zbekiston
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Media */}
                                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8">
                                    <h3 className="text-2xl font-bold text-white mb-6">
                                        Ijtimoiy Tarmoqlar
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <a
                                            href="https://facebook.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl hover:bg-blue-500/20 transition-all group"
                                        >
                                            <Facebook className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
                                            <span className="text-white font-medium">Facebook</span>
                                        </a>

                                        <a
                                            href="https://instagram.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl hover:bg-pink-500/20 transition-all group"
                                        >
                                            <Instagram className="w-6 h-6 text-pink-400 group-hover:scale-110 transition-transform" />
                                            <span className="text-white font-medium">Instagram</span>
                                        </a>

                                        <a
                                            href="https://youtube.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-all group"
                                        >
                                            <Youtube className="w-6 h-6 text-red-400 group-hover:scale-110 transition-transform" />
                                            <span className="text-white font-medium">YouTube</span>
                                        </a>

                                        <a
                                            href="https://t.me/eduphysics"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl hover:bg-blue-500/20 transition-all group"
                                        >
                                            <TelegramIcon className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
                                            <span className="text-white font-medium">Telegram</span>
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-slate-900/50">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                                <HelpCircle className="w-10 h-10 text-blue-400" />
                                Tez-tez So'raladigan Savollar
                            </h2>
                            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                                Eng ko'p beriladigan savollarga javoblar
                            </p>
                        </motion.div>

                        <div className="max-w-4xl mx-auto space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-700/30 transition-colors"
                                    >
                                        <span className="text-lg font-semibold text-white pr-4">
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            className={`w-6 h-6 text-blue-400 flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>

                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="px-6 pb-5"
                                        >
                                            <p className="text-slate-300 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default ContactPage;
