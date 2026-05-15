import React, { useState } from 'react';
import { Settings, User, Info, Moon, Sun, Monitor, Volume2, VolumeX, Palette, Atom, Camera, Sparkles, Save, ChevronRight, ChevronLeft, Mail } from 'lucide-react';
import { Button } from './ui/Button';
import { useLanguage } from '../contexts/LanguageContext';

export default function SettingsModal({ show, onClose, user, theme, setTheme, soundEnabled, setSoundEnabled, updateProfile }) {
    const { t } = useLanguage();
    const [currentView, setCurrentView] = useState('list'); // 'list', 'general', 'profile', 'about'
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    if (!show) return null;

    const handleSaveProfile = async () => {
        if (!displayName.trim()) return;
        setLoading(true);
        try {
            if (selectedImage && user?.uid) {
                localStorage.setItem(`user_avatar_${user.uid}`, selectedImage);
                window.dispatchEvent(new Event('avatarUpdated'));
            }
            await updateProfile({ displayName, photoURL: selectedImage });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const themes = [
        { id: 'dark', name: 'Dark', icon: '🌙', bg: 'bg-slate-900', border: 'border-slate-700' },
        { id: 'white', name: 'White', icon: '☀️', bg: 'bg-white', border: 'border-gray-200', textColor: 'text-gray-900' },
        { id: 'black', name: 'Black', icon: '🌑', bg: 'bg-black', border: 'border-gray-800' },
    ];

    // HEADER COMPONENT (Common for all views)
    const Header = ({ title, onBack }) => (
        <div className="flex items-center gap-4 mb-6 sticky top-0 bg-slate-900/95 backdrop-blur-md z-10 py-3 -mx-4 px-4 border-b border-slate-800">
            <button
                onClick={onBack}
                className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-white"
            >
                <ChevronLeft size={24} />
            </button>
            <h2 className="text-xl font-bold flex-1">{title}</h2>
        </div>
    );

    // LIST VIEW (Asosiy ro'yxat)
    const renderListView = () => (
        <div className="animate-slideInRight">
            {/* Main Header for List View */}
            <div className="flex items-center gap-4 mb-6 sticky top-0 bg-slate-900/95 backdrop-blur-md z-10 py-3 -mx-4 px-4 border-b border-slate-800">
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-white"
                >
                    <ChevronLeft size={24} />
                </button>
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Settings className="text-blue-500" size={20} /> Sozlamalar
                </h2>
            </div>

            <div className="text-center mb-8 pt-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-3 shadow-lg">
                    {user?.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover rounded-full" />
                    ) : (
                        <span className="text-2xl font-bold text-white">{user?.displayName?.[0] || 'U'}</span>
                    )}
                </div>
                <h3 className="font-bold text-lg">{user?.displayName || 'User'}</h3>
                <p className="text-sm text-slate-400">{user?.email}</p>
            </div>

            <div className="space-y-3 px-1">
                <button
                    onClick={() => setCurrentView('general')}
                    className="w-full flex items-center justify-between p-4 bg-slate-800/80 hover:bg-slate-800 rounded-2xl transition-all group border border-slate-700/50"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <Monitor size={22} />
                        </div>
                        <span className="font-bold text-lg">Asosiy</span>
                    </div>
                    <ChevronRight size={20} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                    onClick={() => setCurrentView('profile')}
                    className="w-full flex items-center justify-between p-4 bg-slate-800/80 hover:bg-slate-800 rounded-2xl transition-all group border border-slate-700/50"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                            <User size={22} />
                        </div>
                        <span className="font-bold text-lg">Profil</span>
                    </div>
                    <ChevronRight size={20} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                    onClick={() => setCurrentView('about')}
                    className="w-full flex items-center justify-between p-4 bg-slate-800/80 hover:bg-slate-800 rounded-2xl transition-all group border border-slate-700/50"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            <Info size={22} />
                        </div>
                        <span className="font-bold text-lg">{t('settings_about')}</span>
                    </div>
                    <ChevronRight size={20} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="mt-8 text-center text-xs text-slate-500 font-medium opacity-50">
                v2.5.0 (Build 2026)
            </div>
        </div>
    );

    // GENERAL VIEW
    const renderGeneralView = () => (
        <div className="animate-slideInRight">
            <Header title="Asosiy Sozlamalar" onBack={() => setCurrentView('list')} />

            <div className="space-y-8 px-1">
                <section>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-1">
                        Tashqi Ko'rinish
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                        {themes.map(t => (
                            <button
                                key={t.id}
                                onClick={() => setTheme && setTheme(t.id)}
                                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${theme === t.id
                                    ? 'bg-blue-600/10 border-blue-500'
                                    : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{t.icon}</span>
                                    <span className={`font-medium ${theme === t.id ? 'text-blue-400' : 'text-white'}`}>
                                        {t.name}
                                    </span>
                                </div>
                                {theme === t.id && (
                                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                        <User size={12} className="text-white" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-1">
                        Tovush va Effektlar
                    </h3>
                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between group cursor-pointer hover:border-slate-600 transition-colors" onClick={() => setSoundEnabled && setSoundEnabled(!soundEnabled)}>
                        <div className="flex items-center gap-3">
                            <div className={`p-2.5 rounded-xl transition-colors ${soundEnabled ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-700 text-slate-400'}`}>
                                {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                            </div>
                            <div>
                                <div className={`font-medium transition-colors ${soundEnabled ? 'text-white' : 'text-slate-300'}`}>Ovoz Effektlari</div>
                                <div className="text-xs text-slate-400">Tugma va yutuq ovozlari</div>
                            </div>
                        </div>

                        <div className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ease-in-out ${soundEnabled ? 'bg-blue-500 shadow-inner' : 'bg-slate-600'}`}>
                            <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${soundEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="p-4 bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl border border-green-500/30">
                        <div className="flex items-center gap-3 mb-2">
                            <Sparkles size={18} className="text-green-400" />
                            <h4 className="font-bold text-green-300">AI Xavfsizligi</h4>
                        </div>
                        <p className="text-xs text-green-200/70 leading-relaxed">
                            Barcha AI funksiyalari xavfsiz serverda ishlaydi. API kalitlar himoyalangan.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );

    // PROFILE VIEW
    const renderProfileView = () => (
        <div className="animate-slideInRight">
            <Header title="Profil Sozlamalari" onBack={() => setCurrentView('list')} />

            <div className="space-y-6 px-1">
                <div className="text-center py-6">
                    <div className="relative inline-block">
                        <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-xl border-4 border-slate-800 overflow-hidden">
                            {selectedImage || user?.photoURL ? (
                                <img src={selectedImage || user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                displayName ? displayName.charAt(0).toUpperCase() : 'U'
                            )}
                        </div>
                        <label className="absolute bottom-0 right-0 p-2.5 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700 transition-colors shadow-lg border-2 border-slate-900 active:scale-95">
                            <Camera size={18} />
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                        </label>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Ism - Familiya</label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:border-blue-500 focus:outline-none transition-colors"
                            placeholder="Ismingizni kiriting"
                        />
                    </div>

                    <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900 border-t border-slate-800 md:static md:bg-transparent md:border-none md:p-0 z-20">
                        <Button
                            onClick={handleSaveProfile}
                            isLoading={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-600/20"
                            size="lg"
                            leftIcon={<Save size={20} />}
                        >
                            Saqlash
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

    // ABOUT VIEW
    const renderAboutView = () => (
        <div className="animate-slideInRight">
            <Header title={t('settings_about')} onBack={() => setCurrentView('list')} />

            <div className="space-y-5 px-1">
                {/* Combined App + Developer Card */}
                <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl overflow-hidden">
                    <div className="flex items-stretch">
                        {/* Left — NurFizika */}
                        <div className="flex-1 flex flex-col items-center justify-center p-4 border-r border-blue-500/20">
                            <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-xl border-2 border-blue-400/30 mb-2">
                                <img
                                    src="/assets/nurfizika.jpg"
                                    alt="NurFizika Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="text-base font-bold mb-0.5">NurFizika</h2>
                            <p className="text-xs text-slate-400 italic mb-1.5 text-center">{t('settings_slogan')}</p>
                            <span className="text-xs text-blue-400 font-semibold bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">NurFizika 1.0</span>
                        </div>

                        {/* Right — Developer */}
                        <div className="flex-1 flex flex-col items-center justify-center p-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500/60 shadow-lg mb-2">
                                <img
                                    src="/assets/1776146852544.png"
                                    alt="Ulugbek Roziboyev"
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>
                            <p className="text-white font-bold text-sm mb-0.5 text-center">Ulug'bek Ro'ziboyev</p>
                            <p className="text-indigo-400 text-xs text-center">{t('settings_dev_role')}</p>
                            <p className="text-slate-400 text-xs text-center">{t('settings_dev_desc')}</p>
                        </div>
                    </div>
                </div>

                {/* Legal Documents */}
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1 mb-3">{t('settings_legal_title')}</p>
                    <div className="space-y-2">
                        {[
                            { label: t('settings_offer'), view: 'oferta', icon: '📄' },
                            { label: t('settings_privacy'), view: 'maxfiylik', icon: '🔒' },
                            { label: t('settings_consent'), view: 'rozilik', icon: '📋' },
                        ].map((item) => (
                            <button
                                key={item.view}
                                onClick={() => setCurrentView(item.view)}
                                className="w-full flex items-center justify-between p-4 bg-slate-800/80 hover:bg-slate-800 rounded-2xl transition-all group border border-slate-700/50"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="font-medium text-sm text-left text-white">{item.label}</span>
                                </div>
                                <ChevronRight size={18} className="text-slate-500 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Social Media */}
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1 mb-3">{t('settings_social')}</p>
                    <div className="grid grid-cols-4 gap-3">
                        {[
                            {
                                name: 'Telegram', url: 'https://t.me/+sRohecqH4KVlYjli', color: 'from-sky-500 to-blue-600',
                                icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                            },
                            {
                                name: 'Instagram', url: 'https://www.instagram.com/nurfizika', color: 'from-pink-500 to-purple-600',
                                icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                            },
                            {
                                name: 'YouTube', url: 'https://www.youtube.com/@NurFizika', color: 'from-red-500 to-red-600',
                                icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
                            },
                            {
                                name: 'Facebook', url: 'https://www.facebook.com/share/18bRKT6BbK/', color: 'from-blue-600 to-blue-700',
                                icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            },
                        ].map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex flex-col items-center gap-2 p-3 rounded-2xl bg-gradient-to-br ${social.color} text-white hover:opacity-90 active:scale-95 transition-all shadow-lg`}
                            >
                                {social.icon}
                                <span className="text-xs font-medium">{social.name}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Contact Email */}
                <a
                    href="mailto:nurfizikasupport@gmail.com"
                    className="flex items-center gap-3 p-4 bg-slate-800/80 hover:bg-slate-800 rounded-2xl border border-slate-700/50 transition-all group"
                >
                    <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        <Mail size={20} />
                    </div>
                    <div>
                        <div className="text-xs text-slate-400 mb-0.5">{t('settings_contact')}</div>
                        <div className="text-sm font-medium text-blue-400">nurfizikasupport@gmail.com</div>
                    </div>
                </a>

                <div className="text-center text-xs text-slate-600 pb-2">
                    {t('settings_copyright')}
                </div>
            </div>
        </div>
    );

    // LEGAL DOCUMENT VIEW (reusable)
    const renderLegalView = (title, paragraphs) => (
        <div className="animate-slideInRight">
            <Header title={title} onBack={() => setCurrentView('about')} />
            <div className="space-y-4 px-1 pb-6">
                {paragraphs.map((p, i) => (
                    <div key={i} className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/50">
                        {p.heading && <h4 className="font-bold text-white mb-2 text-sm flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full inline-block"></span>{p.heading}</h4>}
                        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{p.text}</p>
                    </div>
                ))}
                <div className="text-center text-xs text-slate-600 pt-2">{t('settings_copyright')}</div>
            </div>
        </div>
    );

    // OMMAVIY OFERTA VIEW
    const renderOfertaView = () => renderLegalView(t('legal_offer_title'), [
        { heading: t('offer_item1_head'), text: t('offer_item1_text') },
        { heading: t('offer_item2_head'), text: t('offer_item2_text') },
        { heading: t('offer_item3_head'), text: t('offer_item3_text') },
        { heading: t('offer_item4_head'), text: t('offer_item4_text') },
        { heading: t('offer_item5_head'), text: t('offer_item5_text') },
    ]);

    // MAXFIYLIK SIYOSATI VIEW
    const renderMaxfiylikView = () => renderLegalView(t('legal_privacy_title'), [
        { heading: t('priv_item1_head'), text: t('priv_item1_text') },
        { heading: t('priv_item2_head'), text: t('priv_item2_text') },
        { heading: t('priv_item3_head'), text: t('priv_item3_text') },
        { heading: t('priv_item4_head'), text: t('priv_item4_text') },
        { heading: t('priv_item5_head'), text: t('priv_item5_text') },
    ]);

    // ROZILIK VIEW
    const renderRozilikView = () => renderLegalView(t('legal_consent_title'), [
        { heading: t('cons_item1_head'), text: t('cons_item1_text') },
        { text: t('cons_item2_text') },
        { heading: t('cons_item3_head'), text: t('cons_item3_text') },
        { heading: t('cons_item4_head'), text: t('cons_item4_text') },
        { heading: t('cons_item5_head'), text: t('cons_item5_text') },
    ]);

    return (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-md flex items-center justify-center md:p-4 animate-fadeIn">
            <div className={`w-full h-full md:h-[650px] md:max-w-md bg-slate-900 md:rounded-3xl overflow-hidden shadow-2xl border-0 md:border border-slate-700 flex flex-col relative`}>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar scroll-smooth pb-24 md:pb-6">
                    {currentView === 'list' && renderListView()}
                    {currentView === 'general' && renderGeneralView()}
                    {currentView === 'profile' && renderProfileView()}
                    {currentView === 'about' && renderAboutView()}
                    {currentView === 'oferta' && renderOfertaView()}
                    {currentView === 'maxfiylik' && renderMaxfiylikView()}
                    {currentView === 'rozilik' && renderRozilikView()}
                </div>
            </div>
        </div>
    );
}
