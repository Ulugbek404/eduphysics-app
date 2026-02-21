import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Search, BookOpen, ExternalLink, Download, Eye,
    ArrowLeft, BookMarked, Video, Globe, FileText,
    Sparkles, ChevronRight, X
} from 'lucide-react';

// ─── Ma'lumotlar bazasi ───────────────────────────────────────────────────────
const libraryData = [
    // DARSLIKLAR
    {
        id: 1, category: 'darsliklar', type: 'pdf',
        title: "Fizika 9-sinf Darsligi",
        author: "O'zbek MXM",
        description: "O'zbekiston Maktab ta'limi vazirligi tasdiqlagan rasmiy 9-sinf fizika darsligi.",
        chapter: "Barchasi",
        color: "from-blue-600 to-indigo-700",
        emoji: "📗",
        link: "https://uzedu.uz/",
        downloadLink: "https://uzedu.uz/",
        isNew: false,
    },
    {
        id: 2, category: 'darsliklar', type: 'pdf',
        title: "Mexanika: Nazariya va Masalalar",
        author: "A. Xolmatov",
        description: "Jismlarning mexanik harakati, Nyuton qonunlari va impuls-energiya mavzulari bo'yicha to'liq qo'llanma.",
        chapter: "Mexanika",
        color: "from-violet-600 to-purple-700",
        emoji: "⚙️",
        link: "https://uzedu.uz/",
        downloadLink: "https://uzedu.uz/",
        isNew: true,
    },
    {
        id: 3, category: 'darsliklar', type: 'pdf',
        title: "Elektr va Magnetizm",
        author: "B. Yusupov",
        description: "Elektr zaryadlari, elektr maydoni, tok va elektromagnit induksiya mavzulari chuqur tahlil.",
        chapter: "Elektromagnetizm",
        color: "from-amber-600 to-orange-700",
        emoji: "⚡",
        link: "https://uzedu.uz/",
        downloadLink: null,
        isNew: false,
    },

    // QO'LLANMALAR
    {
        id: 4, category: 'qollanmalar', type: 'pdf',
        title: "Fizikadan Formulalar To'plami",
        author: "NurFizika jamoasi",
        description: "9-sinf fizika bo'yicha barcha formulalar, birliklar va doimiylar bir sahifada. Imtihonga tayyorgarlik uchun ideal.",
        chapter: "Barchasi",
        color: "from-emerald-600 to-teal-700",
        emoji: "📐",
        link: "#",
        downloadLink: "#",
        isNew: true,
    },
    {
        id: 5, category: 'qollanmalar', type: 'pdf',
        title: "Mexanika Masalalari Yechish Usullari",
        author: "O'. Raximov",
        description: "Mexanika bo'limidan 50+ ta yechilgan masala. Har bir yechim bosqichma-bosqich tushuntirilgan.",
        chapter: "Mexanika",
        color: "from-sky-600 to-blue-700",
        emoji: "🧮",
        link: "#",
        downloadLink: "#",
        isNew: false,
    },
    {
        id: 6, category: 'qollanmalar', type: 'pdf',
        title: "Optika va To'lqin Harakati",
        author: "Z. Mirzayev",
        description: "Yorug'likning tarqalishi, sinishi va qaytishi. Linzalar va ko'zgular bo'yicha amaliy masalalar.",
        chapter: "Optika",
        color: "from-rose-600 to-pink-700",
        emoji: "🔭",
        link: "#",
        downloadLink: "#",
        isNew: true,
    },

    // VIDEO
    {
        id: 7, category: 'video', type: 'video',
        title: "Mexanika — To'liq Kurs",
        author: "NurFizika YouTube",
        description: "Mexanika bo'limi bo'yicha 12 ta qisqa va tushunarsiz video dars. Har bir video 8–15 daqiqa.",
        chapter: "Mexanika",
        color: "from-red-600 to-rose-700",
        emoji: "🎬",
        link: "https://youtube.com",
        downloadLink: null,
        isNew: false,
    },
    {
        id: 8, category: 'video', type: 'video',
        title: "Elektr Toki — Animatsiyali Darslar",
        author: "PhysicsUz Channel",
        description: "Elektr toki, rezistorlar va Om qonuni animatsiyali va interaktiv video darslar orqali.",
        chapter: "Elektr Toki",
        color: "from-yellow-500 to-amber-600",
        emoji: "💡",
        link: "https://youtube.com",
        downloadLink: null,
        isNew: true,
    },
    {
        id: 9, category: 'video', type: 'video',
        title: "Tebranishlar va To'lqinlar",
        author: "Khan Academy UZ",
        description: "Mexanik tebranishlar, rezonans va to'lqin harakati bo'yicha animatsiyali qisqa videolar.",
        chapter: "Tebranishlar",
        color: "from-cyan-600 to-sky-700",
        emoji: "🌊",
        link: "https://uz.khanacademy.org",
        downloadLink: null,
        isNew: false,
    },

    // TASHQI MANBALAR
    {
        id: 10, category: 'tashqi', type: 'link',
        title: "Khan Academy Fizika (UZ)",
        author: "Khan Academy",
        description: "O'zbek tilidagi Khan Academy fizika kurslari. Interaktiv mashqlar va video darslar bepul.",
        chapter: "Barchasi",
        color: "from-green-600 to-emerald-700",
        emoji: "🌐",
        link: "https://uz.khanacademy.org",
        downloadLink: null,
        isNew: false,
    },
    {
        id: 11, category: 'tashqi', type: 'link',
        title: "PhET Simulatsiyalar",
        author: "University of Colorado",
        description: "Fizika mavzulari bo'yicha interaktiv simulatsiyalar. Laboratoriya tajribalarini onlayn bajaring.",
        chapter: "Barchasi",
        color: "from-indigo-600 to-violet-700",
        emoji: "🔬",
        link: "https://phet.colorado.edu",
        downloadLink: null,
        isNew: true,
    },
    {
        id: 12, category: 'tashqi', type: 'link',
        title: "UzEdu — Rasmiy Ta'lim Portali",
        author: "O'zbekiston MXM",
        description: "O'zbekiston Maktab ta'limi vazirligi rasmiy sayti. Darsliklar va o'quv dasturlari.",
        chapter: "Barchasi",
        color: "from-blue-700 to-indigo-800",
        emoji: "🏛️",
        link: "https://uzedu.uz",
        downloadLink: null,
        isNew: false,
    },
];

const CATEGORIES = [
    { id: 'all', label: 'Barchasi', icon: <BookOpen size={15} /> },
    { id: 'darsliklar', label: 'Darsliklar', icon: <BookMarked size={15} /> },
    { id: 'qollanmalar', label: "Qo'llanmalar", icon: <FileText size={15} /> },
    { id: 'video', label: 'Video Resurslar', icon: <Video size={15} /> },
    { id: 'tashqi', label: 'Tashqi Manbalar', icon: <Globe size={15} /> },
];

const CHAPTERS = [
    'Barchasi', 'Mexanika', 'Tebranishlar', 'Molekulyar Fizika',
    'Elektr', 'Elektr Toki', 'Elektromagnetizm', 'Optika', 'Atom Fizikasi',
];

// ─── Resource Card ────────────────────────────────────────────────────────────
function ResourceCard({ item, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm overflow-hidden hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1"
        >
            {/* Book Cover */}
            <div className={`relative h-32 bg-gradient-to-br ${item.color} flex items-center justify-center overflow-hidden`}>
                {/* Decorative circles */}
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-black/20" />
                <span className="text-5xl relative z-10 drop-shadow-lg">{item.emoji}</span>

                {/* Badges */}
                <div className="absolute top-3 right-3 flex gap-2">
                    {item.isNew && (
                        <span className="text-[10px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Sparkles size={9} /> Yangi
                        </span>
                    )}
                    <span className="text-[10px] font-medium bg-black/30 text-white/80 px-2 py-0.5 rounded-full backdrop-blur-sm uppercase">
                        {item.type}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-4 gap-3">
                <div>
                    <span className="inline-block text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full mb-2">
                        {item.chapter}
                    </span>
                    <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 group-hover:text-indigo-300 transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-slate-500 text-xs mt-0.5">{item.author}</p>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 flex-1">
                    {item.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-1">
                    <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 hover:border-indigo-500/60 text-indigo-300 hover:text-white rounded-xl text-xs font-semibold transition-all duration-200"
                    >
                        <Eye size={13} /> Ko'rish
                    </a>
                    {item.downloadLink && (
                        <a
                            href={item.downloadLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/40 hover:border-slate-500 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-all duration-200"
                        >
                            <Download size={13} /> Yuklash
                        </a>
                    )}
                    {!item.downloadLink && (
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/40 hover:border-slate-500 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-all duration-200"
                        >
                            <ExternalLink size={13} /> Ochish
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function KutubxonaPage() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeChapter, setActiveChapter] = useState('Barchasi');
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = useMemo(() => {
        return libraryData.filter(item => {
            const matchCat = activeCategory === 'all' || item.category === activeCategory;
            const matchCh = activeChapter === 'Barchasi' || item.chapter === activeChapter || item.chapter === 'Barchasi';
            const q = searchQuery.toLowerCase();
            const matchQ = !q || item.title.toLowerCase().includes(q)
                || item.author.toLowerCase().includes(q)
                || item.description.toLowerCase().includes(q)
                || item.chapter.toLowerCase().includes(q);
            return matchCat && matchCh && matchQ;
        });
    }, [activeCategory, activeChapter, searchQuery]);

    return (
        <div className="h-screen overflow-y-auto custom-scrollbar font-sans text-slate-100">
            <div className="max-w-7xl mx-auto px-6 pb-24 pt-6">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium text-sm">Ortga qaytish</span>
                </button>

                {/* ── Hero Section ── */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-3xl border border-slate-800 bg-gradient-to-br from-indigo-950/60 via-slate-900/80 to-violet-950/60 backdrop-blur-sm p-8 mb-8 overflow-hidden"
                >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-10 -right-10 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl" />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                📚 Kutubxona
                            </h1>
                            <p className="text-slate-400 text-base">
                                Barcha o'quv materiallari bir joyda —{' '}
                                <span className="text-indigo-400 font-semibold">{libraryData.length} ta resurs</span>
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-80">
                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Resurs nomi yoki mavzu..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-800/80 border border-slate-700/60 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* ── Category Tabs ── */}
                <div className="flex gap-2 overflow-x-auto pb-2 mb-5 custom-scrollbar">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap border transition-all duration-200 ${activeCategory === cat.id
                                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                                : 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-600'
                                }`}
                        >
                            {cat.icon}
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* ── Chapter Filter Chips ── */}
                <div className="flex flex-wrap gap-2 mb-7">
                    {CHAPTERS.map(ch => (
                        <button
                            key={ch}
                            onClick={() => setActiveChapter(ch)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${activeChapter === ch
                                ? 'bg-violet-600/30 border-violet-500/60 text-violet-300'
                                : 'bg-slate-800/40 border-slate-700/40 text-slate-500 hover:text-slate-300 hover:border-slate-600'
                                }`}
                        >
                            {ch}
                        </button>
                    ))}
                </div>

                {/* ── Results count ── */}
                <div className="flex items-center justify-between mb-5">
                    <p className="text-xs text-slate-500">
                        {filtered.length} ta resurs topildi
                        {searchQuery && <span className="text-indigo-400"> · "{searchQuery}" bo'yicha</span>}
                    </p>
                    {(activeCategory !== 'all' || activeChapter !== 'Barchasi' || searchQuery) && (
                        <button
                            onClick={() => { setActiveCategory('all'); setActiveChapter('Barchasi'); setSearchQuery(''); }}
                            className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors"
                        >
                            <X size={12} /> Filterni tozalash
                        </button>
                    )}
                </div>

                {/* ── Cards Grid ── */}
                <AnimatePresence mode="wait">
                    {filtered.length > 0 ? (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                        >
                            {filtered.map((item, i) => (
                                <ResourceCard key={item.id} item={item} index={i} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-24 text-center"
                        >
                            <div className="p-6 bg-slate-800/40 rounded-3xl border border-slate-700/40 mb-6">
                                <BookOpen size={48} className="text-slate-600 mx-auto" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-400 mb-2">Hech narsa topilmadi</h3>
                            <p className="text-slate-600 text-sm mb-6">Boshqa kalit so'z yoki kategoriya tanlang</p>
                            <button
                                onClick={() => { setActiveCategory('all'); setActiveChapter('Barchasi'); setSearchQuery(''); }}
                                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-all"
                            >
                                <ChevronRight size={16} /> Barchasini ko'rish
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
