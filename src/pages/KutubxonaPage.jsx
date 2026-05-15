import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Search, BookOpen, ExternalLink, Download, Eye,
    ArrowLeft, BookMarked, Video, Globe, FileText,
    Sparkles, ChevronRight, X, ZoomIn
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// ─── Ma'lumotlar bazasi ───────────────────────────────────────────────────────
const libraryData = [
    // RASMIY PDF — LOCAL
    {
        id: 0, category: 'darsliklar', type: 'pdf',
        title: "Umumiy fizika — NurFizika darsligi",
        author: "NurFizika jamoasi",
        description: "NurFizika platformasiga maxsus tayyorlangan umumiy fizika darsligi. Barcha mavzular, formulalar va misollar bir kitobda.",
        chapter: "Barchasi",
        emoji: "📘",
        localPdf: "/fizika-kitob.pdf",
        link: "/fizika-kitob.pdf",
        downloadLink: "/fizika-kitob.pdf",
        isNew: true,
    },
    // DARSLIKLAR
    {
        id: 1, category: 'darsliklar', type: 'pdf',
        title: "9-sinf fizika darsligi",
        author: "O'zbek MXM",
        description: "O'zbekiston Maktab ta'limi vazirligi tasdiqlagan rasmiy 9-sinf fizika darsligi.",
        chapter: "Barchasi",
        emoji: "📗",
        localPdf: "/9-SINF_FIZIKA_DARSLIK.pdf",
        link: "/9-SINF_FIZIKA_DARSLIK.pdf",
        downloadLink: "/9-SINF_FIZIKA_DARSLIK.pdf",
        isNew: true,
        comingSoon: false,
    },
    {
        id: 2, category: 'darsliklar', type: 'pdf',
        title: "Mexanika: nazariya va masalalar",
        author: "A. Xolmatov",
        description: "Jismlarning mexanik harakati, Nyuton qonunlari va impuls-energiya mavzulari bo'yicha to'liq qo'llanma.",
        chapter: "Mexanika",
        emoji: "⚙️",
        link: null,
        downloadLink: null,
        isNew: false,
        comingSoon: true,
    },
    {
        id: 3, category: 'darsliklar', type: 'pdf',
        title: "Elektr va magnetizm",
        author: "B. Yusupov",
        description: "Elektr zaryadlari, elektr maydoni, tok va elektromagnit induksiya mavzulari chuqur tahlil.",
        chapter: "Elektromagnetizm",
        emoji: "⚡",
        link: null,
        downloadLink: null,
        isNew: false,
        comingSoon: true,
    },

    // QO'LLANMALAR
    {
        id: 4, category: 'qollanmalar', type: 'pdf',
        title: "Fizikadan formulalar to'plami",
        author: "NurFizika jamoasi",
        description: "9-sinf fizika bo'yicha barcha formulalar, birliklar va doimiylar bir sahifada. Imtihonga tayyorgarlik uchun ideal.",
        chapter: "Barchasi",
        emoji: "📐",
        link: null,
        downloadLink: null,
        isNew: false,
        comingSoon: true,
    },
    {
        id: 5, category: 'qollanmalar', type: 'pdf',
        title: "Mexanika masalalari yechish usullari",
        author: "O'. Raximov",
        description: "Mexanika bo'limidan 50+ ta yechilgan masala. Har bir yechim bosqichma-bosqich tushuntirilgan.",
        chapter: "Mexanika",
        emoji: "🧮",
        link: null,
        downloadLink: null,
        isNew: false,
        comingSoon: true,
    },
    {
        id: 6, category: 'qollanmalar', type: 'pdf',
        title: "Optika va to'lqin harakati",
        author: "Z. Mirzayev",
        description: "Yorug'likning tarqalishi, sinishi va qaytishi. Linzalar va ko'zgular bo'yicha amaliy masalalar.",
        chapter: "Optika",
        emoji: "🔭",
        link: null,
        downloadLink: null,
        isNew: false,
        comingSoon: true,
    },

    // VIDEO
    {
        id: 7, category: 'video', type: 'video',
        title: "Mexanika — to'liq kurs",
        author: "NurFizika YouTube",
        description: "Mexanika bo'limi bo'yicha 12 ta qisqa video dars tayyorlanmoqda.",
        chapter: "Mexanika",
        emoji: "🎬",
        link: null,
        downloadLink: null,
        isNew: false,
        comingSoon: true,
    },
    {
        id: 8, category: 'video', type: 'video',
        title: "Elektr toki — animatsiyali darslar",
        author: "NurFizika YouTube",
        description: "Elektr toki, rezistorlar va Om qonuni animatsiyali video darslar tayyorlanmoqda.",
        chapter: "Elektr toki",
        emoji: "💡",
        link: null,
        downloadLink: null,
        isNew: false,
        comingSoon: true,
    },
    {
        id: 9, category: 'video', type: 'video',
        title: "Tebranishlar va to'lqinlar",
        author: "Khan Academy UZ",
        description: "Mexanik tebranishlar, rezonans va to'lqin harakati bo'yicha animatsiyali qisqa videolar.",
        chapter: "Tebranishlar",
        emoji: "🌊",
        link: "https://uz.khanacademy.org",
        downloadLink: null,
        isNew: false,
    },

    // TASHQI MANBALAR
    {
        id: 10, category: 'tashqi', type: 'link',
        title: "Khan Academy fizika (UZ)",
        author: "Khan Academy",
        description: "O'zbek tilidagi Khan Academy fizika kurslari. Interaktiv mashqlar va video darslar bepul.",
        chapter: "Barchasi",
        emoji: "🌐",
        link: "https://uz.khanacademy.org",
        downloadLink: null,
        isNew: false,
    },
    {
        id: 11, category: 'tashqi', type: 'link',
        title: "PhET simulatsiyalar",
        author: "University of Colorado",
        description: "Fizika mavzulari bo'yicha interaktiv simulatsiyalar. Laboratoriya tajribalarini onlayn bajaring.",
        chapter: "Barchasi",
        emoji: "🔬",
        link: "https://phet.colorado.edu",
        downloadLink: null,
        isNew: true,
    },
    {
        id: 12, category: 'tashqi', type: 'link',
        title: "UzEdu — rasmiy ta'lim portali",
        author: "O'zbekiston MXM",
        description: "O'zbekiston Maktab ta'limi vazirligi rasmiy sayti. Darsliklar va o'quv dasturlari.",
        chapter: "Barchasi",
        emoji: "🏛️",
        link: "https://uzedu.uz",
        downloadLink: null,
        isNew: false,
    },
];

const getCategories = (t) => [
    { id: 'all', label: t('kutubxona_all') || 'Barchasi', icon: <BookOpen size={15} /> },
    { id: 'darsliklar', label: t('kutubxona_books') || 'Darsliklar', icon: <BookMarked size={15} /> },
    { id: 'qollanmalar', label: t('kutubxona_guides') || "Qo'llanmalar", icon: <FileText size={15} /> },
    { id: 'video', label: t('kutubxona_video') || 'Video resurslar', icon: <Video size={15} /> },
    { id: 'tashqi', label: t('kutubxona_external') || 'Tashqi manbalar', icon: <Globe size={15} /> },
];

const CHAPTERS = [
    'Barchasi', 'Mexanika', 'Tebranishlar', 'Molekulyar fizika',
    'Elektr', 'Elektr toki', 'Elektromagnetizm', 'Optika', 'Atom fizikasi',
];

// ─── PDF Modal ────────────────────────────────────────────────────────────────
function PDFModal({ url, title, onClose }) {
    return (
        <AnimatePresence>
            <div
                className="fixed inset-0 z-[100] flex flex-col bg-black/50 backdrop-blur-sm"
                onClick={(e) => e.target === e.currentTarget && onClose()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 bg-[#ffffff] border-b-[0.5px] border-[#e2e8f0] shrink-0">
                    <div className="flex items-center gap-3">
                        <span className="text-xl">📘</span>
                        <h2 className="text-[#0f172a] font-semibold text-sm md:text-base truncate max-w-xs md:max-w-xl">{title}</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <a
                            href={url}
                            download
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f0fdfa] border-[0.5px] border-[#ccfbf1] text-[#0d9488] rounded-md text-xs font-semibold transition-all hover:bg-[#ccfbf1]"
                        >
                            <Download size={13} /> Yuklash
                        </a>
                        <button
                            onClick={onClose}
                            className="p-2 text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f8fafc] rounded-md transition-all"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>
                {/* PDF Iframe */}
                <div className="flex-1 overflow-hidden bg-[#f8fafc]">
                    <iframe
                        src={url}
                        title={title}
                        className="w-full h-full border-0"
                        allow="fullscreen"
                    />
                </div>
            </div>
        </AnimatePresence>
    );
}

// ─── Resource Card ────────────────────────────────────────────────────────────
function ResourceCard({ item, index, onView }) {
    const { t } = useLanguage();
    return (
        <div
            className="group relative flex flex-col rounded-2xl border-[0.5px] border-[#e2e8f0] bg-[#ffffff] overflow-hidden hover:border-[#14b8a6] transition-all duration-300 hover:-translate-y-1 h-full"
        >
            {/* Book Cover */}
            <div className={`relative h-[140px] bg-[#f8fafc] border-b-[0.5px] border-[#e2e8f0] flex items-center justify-center overflow-hidden`}>
                <span className="text-5xl relative z-10 transition-transform duration-300 group-hover:scale-110">{item.emoji}</span>

                {/* Badges */}
                <div className="absolute top-3 right-3 flex gap-2">
                    {item.isNew && (
                        <span className="text-[10px] font-bold bg-[#0d9488] text-white px-2 py-0.5 rounded-sm flex items-center gap-1 uppercase tracking-wider">
                            <Sparkles size={9} /> {t('common_new') || 'Yangi'}
                        </span>
                    )}
                    <span className="text-[10px] font-bold bg-[#ffffff] text-[#475569] border-[0.5px] border-[#e2e8f0] px-2 py-0.5 rounded-sm uppercase tracking-wider">
                        {item.type === 'pdf' ? 'PDF' : item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5 gap-3">
                <div>
                    <span className="inline-block text-[11px] font-bold text-[#0d9488] bg-[#f0fdfa] border-[0.5px] border-[#ccfbf1] px-2 py-0.5 rounded-sm mb-3">
                        {item.chapter}
                    </span>
                    <h3 className="text-[#0f172a] font-bold text-[16px] leading-snug line-clamp-2 group-hover:text-[#0d9488] transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-[#475569] text-[13px] mt-1">{item.author}</p>
                </div>

                <p className="text-[#475569] text-[13px] leading-relaxed line-clamp-2 flex-1">
                    {item.description}
                </p>

                {/* Action Buttons */}
                <div className="pt-3 border-t-[0.5px] border-[#e2e8f0] mt-auto">
                    {item.comingSoon ? (
                        <div className="flex items-center justify-center gap-1.5 py-2.5 bg-[#f8fafc] border-[0.5px] border-[#e2e8f0] text-[#94a3b8] rounded-lg text-[13px] font-bold cursor-not-allowed select-none">
                            🕐 {t('coming_soon') || 'Tez kunda'}
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={() => item.localPdf ? onView(item) : window.open(item.link, '_blank')}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#f0fdfa] hover:bg-[#0d9488] border-[0.5px] border-[#0d9488] text-[#0d9488] hover:text-white rounded-lg text-[13px] font-bold transition-all duration-200"
                            >
                                {item.localPdf ? <ZoomIn size={14} /> : <Eye size={14} />} {t('common_view') || "Ko'rish"}
                            </button>
                            {item.downloadLink && (
                                <a
                                    href={item.downloadLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download={!!item.localPdf}
                                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#ffffff] hover:bg-[#f8fafc] border-[0.5px] border-[#e2e8f0] text-[#475569] rounded-lg text-[13px] font-bold transition-all duration-200"
                                >
                                    <Download size={14} /> {t('common_download') || 'Yuklash'}
                                </a>
                            )}
                            {!item.downloadLink && (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#ffffff] hover:bg-[#f8fafc] border-[0.5px] border-[#e2e8f0] text-[#475569] rounded-lg text-[13px] font-bold transition-all duration-200"
                                >
                                    <ExternalLink size={14} /> {t('common_open') || 'Ochish'}
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function KutubxonaPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeChapter, setActiveChapter] = useState('Barchasi');
    const [searchQuery, setSearchQuery] = useState('');
    const [pdfModal, setPdfModal] = useState(null); // { url, title }

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
        }).sort((a, b) => (a.comingSoon ? 1 : 0) - (b.comingSoon ? 1 : 0));
    }, [activeCategory, activeChapter, searchQuery]);

    return (
        <div className="h-screen overflow-y-auto custom-scrollbar bg-[#f8fafc] font-sans">
            {/* PDF Modal */}
            {pdfModal && (
                <PDFModal
                    url={pdfModal.url}
                    title={pdfModal.title}
                    onClose={() => setPdfModal(null)}
                />
            )}
            <div className="max-w-7xl mx-auto px-6 pb-24 pt-8">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-[#475569] hover:text-[#0f172a] transition-colors mb-6 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-semibold text-[14px]">{t('nav_back') || 'Ortga qaytish'}</span>
                </button>

                {/* ── Hero Section ── */}
                <div className="relative rounded-2xl border-[0.5px] border-[#e2e8f0] bg-[#ffffff] p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-[28px] md:text-[32px] font-bold text-[#0f172a] mb-2 flex items-center gap-3">
                            📚 {t('nav_library') || 'Kutubxona'}
                        </h1>
                        <p className="text-[#475569] text-[15px]">
                            {t('kutubxona_desc_1') || "Barcha o'quv materiallari bir joyda —"}{' '}
                            <span className="text-[#0d9488] font-bold">{libraryData.length} {t('kutubxona_resource_count') || 'ta resurs'}</span>
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-80">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                        <input
                            type="text"
                            placeholder={t('kutubxona_search_placeholder') || "Resurs nomi yoki mavzu..."}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full bg-[#f8fafc] border-[0.5px] border-[#e2e8f0] rounded-xl pl-11 pr-10 py-3 text-[14px] text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#0d9488] focus:bg-[#ffffff] transition-all"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#0f172a]">
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {/* ── Category Tabs ── */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-2 custom-scrollbar">
                    {getCategories(t).map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-2 px-4 py-2 flex-shrink-0 rounded-lg text-[14px] font-bold whitespace-nowrap border-[0.5px] transition-all duration-200 ${activeCategory === cat.id
                                ? 'bg-[#0d9488] border-[#0d9488] text-white'
                                : 'bg-[#ffffff] border-[#e2e8f0] text-[#475569] hover:text-[#0f172a] hover:border-[#cbd5e1]'
                                }`}
                        >
                            {cat.icon}
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* ── Chapter Filter Chips ── */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {CHAPTERS.map(ch => (
                        <button
                            key={ch}
                            onClick={() => setActiveChapter(ch)}
                            className={`px-3 py-1.5 rounded-md text-[13px] font-bold border-[0.5px] transition-all duration-200 ${activeChapter === ch
                                ? 'bg-[#f0fdfa] border-[#ccfbf1] text-[#0d9488]'
                                : 'bg-[#ffffff] border-[#e2e8f0] text-[#475569] hover:text-[#0f172a] hover:border-[#cbd5e1]'
                                }`}
                        >
                            {ch === 'Barchasi' ? (t('common_all') || 'Barchasi') : ch}
                        </button>
                    ))}
                </div>

                {/* ── Results count ── */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-[14px] text-[#475569] font-medium">
                        {filtered.length} {t('kutubxona_found_count') || 'ta resurs topildi'}
                        {searchQuery && <span className="text-[#0d9488]"> · "{searchQuery}" {t('kutubxona_by') || "bo'yicha"}</span>}
                    </p>
                    {(activeCategory !== 'all' || activeChapter !== 'Barchasi' || searchQuery) && (
                        <button
                            onClick={() => { setActiveCategory('all'); setActiveChapter('Barchasi'); setSearchQuery(''); }}
                            className="text-[13px] font-bold text-[#475569] hover:text-[#0f172a] flex items-center gap-1 transition-colors"
                        >
                            <X size={14} /> {t('kutubxona_clear_filter') || 'Filterni tozalash'}
                        </button>
                    )}
                </div>

                {/* ── Cards Grid ── */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filtered.map((item, i) => (
                            <ResourceCard
                                key={item.id}
                                item={item}
                                index={i}
                                onView={(it) => setPdfModal({ url: it.localPdf, title: it.title })}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="p-6 bg-[#ffffff] rounded-2xl border-[0.5px] border-[#e2e8f0] mb-6">
                            <BookOpen size={48} className="text-[#94a3b8] mx-auto" />
                        </div>
                        <h3 className="text-[20px] font-bold text-[#0f172a] mb-2">{t('error_not_found') || 'Hech narsa topilmadi'}</h3>
                        <p className="text-[#475569] text-[15px] mb-8">{t('kutubxona_empty_desc') || "Boshqa kalit so'z yoki kategoriya tanlang"}</p>
                        <button
                            onClick={() => { setActiveCategory('all'); setActiveChapter('Barchasi'); setSearchQuery(''); }}
                            className="flex items-center gap-2 px-6 py-3 bg-[#f0fdfa] border-[0.5px] border-[#ccfbf1] rounded-xl text-[#0d9488] hover:bg-[#0d9488] hover:text-white font-bold transition-all"
                        >
                            <ChevronRight size={18} /> {t('kutubxona_see_all') || "Barchasini ko'rish"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
