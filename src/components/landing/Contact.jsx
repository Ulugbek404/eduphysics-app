import React, { useState } from 'react';
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

const Contact = () => {
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
            question: "NurFizika platformasi butunlay bepulmi?",
            answer: "Ha, NurFizika platformasi to'liq bepul. Hech qanday yashirin to'lovlar yoki obuna haqi yo'q."
        },
        {
            question: "Platformadan foydalanish uchun nima kerak?",
            answer: "Faqat internet ulanishi va brauzer kerak. Kompyuter, planshet yoki telefonda ishlatishingiz mumkin."
        },
        {
            question: "AI ustoz qanday ishlaydi?",
            answer: "AI ustoz Google Gemini texnologiyasiga asoslangan. U savollaringizga javob beradi va shaxsiy o'rganish rejasini taklif qiladi."
        },
        {
            question: "Virtual laboratoriya xavfsizmi?",
            answer: "Ha, virtual laboratoriya butunlay xavfsiz. Haqiqiy tajribalarni simulyatsiya qiladi, lekin hech qanday xavf yo'q."
        }
    ];

    return (
        <section className="min-h-screen flex items-center justify-center py-20 pt-20" style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #3730A3 100%)' }}>
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Biz bilan bog'laning
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Savollaringiz yoki takliflaringiz bo'lsa, biz bilan aloqaga chiqing
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
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <MessageSquare className="w-7 h-7 text-blue-400" />
                                Xabar Yuboring
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-slate-300 mb-2 font-medium text-sm">
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
                                    <label className="block text-slate-300 mb-2 font-medium text-sm">
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
                                    <label className="block text-slate-300 mb-2 font-medium text-sm">
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
                                    <label className="block text-slate-300 mb-2 font-medium text-sm">
                                        Xabar
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                        placeholder="Xabaringizni yozing..."
                                    />
                                </div>

                                {submitStatus === 'success' && (
                                    <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-green-300 text-sm">
                                        ✓ Xabaringiz muvaffaqiyatli yuborildi!
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? 'Yuborilmoqda...' : (
                                        <>
                                            Yuborish
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
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8">
                            <h3 className="text-xl font-bold text-white mb-6">
                                Aloqa Ma'lumotlari
                            </h3>

                            <div className="space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <div className="text-slate-400 text-sm mb-1">Email</div>
                                        <a href="mailto:support@ulugbekedu.uz" className="text-white hover:text-blue-400 transition-colors">
                                            support@ulugbekedu.uz
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <div className="text-slate-400 text-sm mb-1">Telefon</div>
                                        <a href="tel:+998931863404" className="text-white hover:text-purple-400 transition-colors">
                                            +998 (93) 186-34-04
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-pink-400" />
                                    </div>
                                    <div>
                                        <div className="text-slate-400 text-sm mb-1">Manzil</div>
                                        <div className="text-white">Toshkent, O'zbekiston</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8">
                            <h3 className="text-xl font-bold text-white mb-6">
                                Ijtimoiy Tarmoqlar
                            </h3>

                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { icon: <Facebook className="w-5 h-5" />, name: "Facebook", color: "blue", url: "https://facebook.com" },
                                    { icon: <Instagram className="w-5 h-5" />, name: "Instagram", color: "pink", url: "https://instagram.com" },
                                    { icon: <Youtube className="w-5 h-5" />, name: "YouTube", color: "red", url: "https://youtube.com" },
                                    { icon: <TelegramIcon className="w-5 h-5" />, name: "Telegram", color: "blue", url: "https://t.me/eduphysics" }
                                ].map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-2 p-3 bg-${social.color}-500/10 border border-${social.color}-500/20 rounded-xl hover:bg-${social.color}-500/20 transition-all group`}
                                    >
                                        <div className="group-hover:scale-110 transition-transform">
                                            {social.icon}
                                        </div>
                                        <span className="text-white font-medium text-sm">{social.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                            <HelpCircle className="w-8 h-8 text-blue-400" />
                            Tez-tez So'raladigan Savollar
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
                                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-700/30 transition-colors"
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
                                        className="px-6 pb-4"
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
            </div>
        </section>
    );
};

export default Contact;
