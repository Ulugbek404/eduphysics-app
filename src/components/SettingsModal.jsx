import React, { useState } from 'react';
import { Settings, User, Info, Smartphone, Moon, Sun, Monitor, Volume2, VolumeX, X, Palette, Atom, Camera, Sparkles, Save } from 'lucide-react';

export default function SettingsModal({ show, onClose, user, theme, setTheme, soundEnabled, setSoundEnabled, updateProfile }) {
    const [activeTab, setActiveTab] = useState('general');
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

    return (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className={`w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col md:flex-row max-h-[90vh] md:h-[600px] animate-scaleIn`}>

                {/* Sidebar */}
                <div className="w-full md:w-64 bg-slate-800/50 p-6 border-r border-slate-700 flex flex-col">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                        <Settings className="text-blue-500" /> Sozlamalar
                    </h2>

                    <div className="space-y-2 flex-1">
                        <button
                            onClick={() => setActiveTab('general')}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'general' ? 'bg-blue-600 shadow-lg shadow-blue-500/20 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                        >
                            <Monitor size={20} /> Asosiy
                        </button>
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-blue-600 shadow-lg shadow-blue-500/20 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                        >
                            <User size={20} /> Profil
                        </button>
                        <button
                            onClick={() => setActiveTab('about')}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'about' ? 'bg-blue-600 shadow-lg shadow-blue-500/20 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                        >
                            <Info size={20} /> Haqida
                        </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-700 text-xs text-slate-500 text-center">
                        Versiya 2.5 (2026)
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-8 bg-slate-900/80 relative overflow-y-auto">
                    <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors z-10">
                        <X size={20} />
                    </button>

                    <div className="max-w-xl mx-auto pt-6">
                        {/* GENERAL TAB */}
                        {activeTab === 'general' && (
                            <div className="space-y-8 animate-fadeIn">
                                <section>
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-400">
                                        <Palette size={20} /> Mavzu
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {themes.map(t => (
                                            <button
                                                key={t.id}
                                                onClick={() => setTheme && setTheme(t.id)}
                                                className={`relative h-24 rounded-xl border-2 transition-all overflow-hidden group ${theme === t.id ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-slate-700 hover:border-slate-600'}`}
                                            >
                                                <div className={`absolute inset-0 ${t.bg}`}></div>
                                                <div className={`absolute inset-0 flex flex-col items-center justify-center z-10 font-medium gap-1 ${t.textColor || 'text-white'}`}>
                                                    <span className="text-3xl leading-none">{t.icon}</span>
                                                    <span className="text-sm">{t.name}</span>
                                                </div>
                                                {theme === t.id && (
                                                    <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1 z-20">
                                                        <User size={12} className="text-white" />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-400">
                                        {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />} Ovoz Effektlari
                                    </h3>
                                    <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
                                        <div>
                                            <div className="font-bold">Ovozlar</div>
                                            <div className="text-sm text-slate-400">Tugma bosish va yutuq ovozlari</div>
                                        </div>
                                        <button
                                            onClick={() => setSoundEnabled && setSoundEnabled(!soundEnabled)}
                                            className={`w-14 h-8 rounded-full transition-colors relative ${soundEnabled ? 'bg-blue-600' : 'bg-slate-600'}`}
                                        >
                                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${soundEnabled ? 'left-7' : 'left-1'}`}></div>
                                        </button>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                        <Sparkles size={24} className="text-blue-400" /> AI Xavfsizligi
                                    </h3>

                                    {/* Security Info Card */}
                                    <div className="relative overflow-hidden bg-gradient-to-br from-green-900/30 via-green-800/20 to-emerald-900/30 p-6 rounded-2xl border border-green-500/30 shadow-lg">
                                        <div className="absolute top-0 left-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl"></div>
                                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>

                                        <div className="relative z-10">
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="p-3 bg-green-500/20 rounded-xl flex-shrink-0">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400">
                                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                                        <path d="M9 12l2 2 4-4"></path>
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-lg font-bold text-green-300 mb-2">✅ AI Xavfsizligi Ta'minlangan</h4>
                                                    <p className="text-sm text-green-200/80 leading-relaxed mb-3">
                                                        Barcha AI funksiyalari endi xavfsiz backend serverda ishlaydi.
                                                        API kalitlar faqat serverda saqlanadi va hech qachon brauzerga yuborilmaydi.
                                                    </p>
                                                    <div className="space-y-2 text-xs text-green-300/70">
                                                        <div className="flex items-center gap-2">
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <polyline points="20 6 9 17 4 12"></polyline>
                                                            </svg>
                                                            <span>API kalitlar backend'da (Netlify Functions)</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <polyline points="20 6 9 17 4 12"></polyline>
                                                            </svg>
                                                            <span>Frontend'da hech qanday API key yo'q</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <polyline points="20 6 9 17 4 12"></polyline>
                                                            </svg>
                                                            <span>Barcha AI so'rovlar xavfsiz serverdan</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 p-3 bg-slate-900/50 rounded-xl border border-green-500/20">
                                                <p className="text-xs text-green-300/60 leading-relaxed">
                                                    💡 <strong>Eslatma:</strong> Endi API kalit kiritish kerak emas.
                                                    Barcha AI xususiyatlar (AI Tutor, Homework Helper, Adaptive Quiz) avtomatik ishlaydi.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}

                        {/* PROFILE TAB */}
                        {activeTab === 'profile' && (
                            <div className="space-y-8 animate-fadeIn">
                                <div className="text-center mb-8">
                                    <div className="relative inline-block mb-4">
                                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-white shadow-xl border-4 border-slate-800 overflow-hidden">
                                            {selectedImage || user?.photoURL ? (
                                                <img src={selectedImage || user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                displayName ? displayName.charAt(0).toUpperCase() : 'U'
                                            )}
                                        </div>
                                        <label className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700 transition-colors shadow-lg border-2 border-slate-900 group">
                                            <Camera size={16} className="group-hover:scale-110 transition-transform" />
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                        </label>
                                    </div>
                                    <h3 className="text-2xl font-bold">{displayName || 'Foydalanuvchi'}</h3>
                                    <p className="text-blue-400">9-sinf O'quvchisi</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Ism - Familiya</label>
                                        <input
                                            type="text"
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:border-blue-500 focus:outline-none transition-colors"
                                            placeholder="Ismingizni kiriting"
                                        />
                                    </div>

                                    <button
                                        onClick={handleSaveProfile}
                                        disabled={loading}
                                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
                                    >
                                        {loading ? 'Saqlanmoqda...' : 'O\'zgarishlarni Saqlash'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ABOUT TAB */}
                        {activeTab === 'about' && (
                            <div className="space-y-8 animate-fadeIn text-center">
                                <div className="p-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl border border-blue-500/30">
                                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-xl mb-6">
                                        <Atom size={40} className="text-white animate-spin-slow" />
                                    </div>
                                    <h2 className="text-3xl font-bold mb-2">EduPhysics</h2>
                                    <p className="text-blue-300 mb-6">9-Sinf Fizika O'quv Platformasi</p>
                                    <p className="text-slate-400 leading-relaxed">
                                        Ushbu ilova o'quvchilarga fizikani qiziqarli va interaktiv usulda o'rganishga yordam beradi.
                                        AI yordamchisi, virtual laboratoriya va testlar bilimingizni mustahkamlash uchun xizmat qiladi.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                                        <div className="text-sm text-slate-400 mb-1">Versiya</div>
                                        <div className="font-bold">2.5.0</div>
                                    </div>
                                    <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                                        <div className="text-sm text-slate-400 mb-1">Tuzuvchi</div>
                                        <div className="font-bold">Ulugbek R.</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

