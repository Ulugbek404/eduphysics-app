import React, { useState } from 'react';
import { Settings, User, Info, Smartphone, Moon, Sun, Monitor, Volume2, VolumeX, X, Palette, Atom, Camera, Sparkles, Save } from 'lucide-react';

export default function SettingsModal({ show, onClose, user, theme, setTheme, soundEnabled, setSoundEnabled, updateProfile, apiKey, setApiKey }) {
    const [activeTab, setActiveTab] = useState('general');
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [savingApiKey, setSavingApiKey] = useState(false);

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
                                        <Sparkles size={24} className="text-blue-400" /> AI Sozlamalari
                                    </h3>

                                    {/* Main API Key Input Card */}
                                    <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700/50 shadow-xl">
                                        {/* Decorative gradient overlay */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>

                                        <div className="relative z-10">
                                            <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                                </svg>
                                                Google Gemini API Kaliti
                                            </label>

                                            <div className="flex gap-3">
                                                <div className="flex-1 relative group">
                                                    <input
                                                        type="password"
                                                        value={apiKey || ''}
                                                        onChange={(e) => setApiKey && setApiKey(e.target.value)}
                                                        className="w-full bg-slate-900/80 border-2 border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 font-mono text-sm"
                                                        placeholder="AIzaSy..."
                                                    />
                                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-focus-within:from-blue-500/5 group-focus-within:via-purple-500/5 group-focus-within:to-blue-500/5 pointer-events-none transition-all duration-500"></div>
                                                </div>

                                                <button
                                                    onClick={async () => {
                                                        if (!apiKey || !apiKey.trim()) return;

                                                        // Format tekshirish
                                                        if (!apiKey.startsWith('AIzaSy')) {
                                                            const notification = document.createElement('div');
                                                            notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-[100] animate-slideInLeft flex items-center gap-2';
                                                            notification.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg><span class="font-medium">API kalit noto\'g\'ri formatda!</span>';
                                                            document.body.appendChild(notification);
                                                            setTimeout(() => notification.remove(), 3000);
                                                            return;
                                                        }

                                                        setSavingApiKey(true);

                                                        try {
                                                            // API key'ni test qilish
                                                            const { GoogleGenerativeAI } = await import('@google/generative-ai');
                                                            const genAI = new GoogleGenerativeAI(apiKey.trim());
                                                            const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

                                                            // Test so'rov
                                                            await model.generateContent('Test');

                                                            // Agar muvaffaqiyatli bo'lsa, saqlash
                                                            localStorage.setItem('gemini_api_key', apiKey.trim());

                                                            // Success notification
                                                            const notification = document.createElement('div');
                                                            notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[100] animate-slideInLeft flex items-center gap-2';
                                                            notification.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg><span class="font-medium">✅ API kalit tekshirildi va saqlandi!</span>';
                                                            document.body.appendChild(notification);
                                                            setTimeout(() => notification.remove(), 3000);

                                                        } catch (error) {
                                                            console.error('API Key validation error:', error);

                                                            // Error notification
                                                            let errorMsg = 'API kalit noto\'g\'ri!';
                                                            if (error.message.includes('404')) errorMsg = 'Model topilmadi. Internet ulanishini tekshiring.';
                                                            else if (error.message.includes('403') || error.message.includes('401')) errorMsg = 'API kalit noto\'g\'ri yoki muddati tugagan!';
                                                            else if (error.message.includes('429')) errorMsg = 'Juda ko\'p so\'rovlar. Bir oz kuting.';

                                                            const notification = document.createElement('div');
                                                            notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-[100] animate-slideInLeft flex items-center gap-2';
                                                            notification.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg><span class="font-medium">❌ ${errorMsg}</span>`;
                                                            document.body.appendChild(notification);
                                                            setTimeout(() => notification.remove(), 4000);
                                                        } finally {
                                                            setSavingApiKey(false);
                                                        }
                                                    }}
                                                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
                                                    disabled={!apiKey || !apiKey.trim() || savingApiKey}
                                                >
                                                    {savingApiKey ? (
                                                        <>
                                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            Tekshirilmoqda...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Save size={16} />
                                                            Saqlash
                                                        </>
                                                    )}
                                                </button>
                                            </div>

                                            <div className="mt-3 flex items-start gap-2 text-xs text-slate-400">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 flex-shrink-0">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <line x1="12" y1="16" x2="12" y2="12"></line>
                                                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                                </svg>
                                                <p>AI test tuzish va laboratoriya tahlili uchun kerak. Kalit xavfsiz saqlanadi.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Demo API Key Card */}
                                    <div className="mt-6 relative overflow-hidden bg-gradient-to-br from-blue-900/30 via-blue-800/20 to-purple-900/30 p-5 rounded-2xl border border-blue-500/30 shadow-lg">
                                        {/* Decorative elements */}
                                        <div className="absolute top-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
                                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>

                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="p-1.5 bg-blue-500/20 rounded-lg">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                                                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                                            <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm font-semibold text-blue-300">Demo API Kaliti</span>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        const demoKey = 'AIzaSyCTiUUTfKKtxbXygQtkuFUnbybRKjcu_lk';
                                                        navigator.clipboard.writeText(demoKey);

                                                        // Copy notification
                                                        const notification = document.createElement('div');
                                                        notification.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-[100] animate-slideInLeft flex items-center gap-2';
                                                        notification.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><span class="font-medium">Nusxalandi!</span>';
                                                        document.body.appendChild(notification);
                                                        setTimeout(() => notification.remove(), 2000);
                                                    }}
                                                    className="group flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 rounded-lg transition-all duration-300 text-xs font-medium border border-blue-500/20 hover:border-blue-500/40"
                                                    title="Nusxalash"
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:scale-110 transition-transform">
                                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                                    </svg>
                                                    Nusxalash
                                                </button>
                                            </div>

                                            <div className="relative group">
                                                <code className="text-xs text-blue-200 font-mono break-all block bg-slate-900/50 backdrop-blur-sm p-3 rounded-xl border border-blue-500/20 group-hover:border-blue-500/40 transition-colors">
                                                    AIzaSyCTiUUTfKKtxbXygQtkuFUnbybRKjcu_lk
                                                </code>
                                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-blue-500/5 pointer-events-none transition-all duration-500"></div>
                                            </div>

                                            <div className="mt-3 flex items-start gap-2">
                                                <span className="text-lg">💡</span>
                                                <p className="text-xs text-blue-300/80 leading-relaxed">
                                                    Yuqoridagi kalitni nusxalab, yuqoridagi maydonga joylashtiring va "Saqlash" tugmasini bosing
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info Card */}
                                    <div className="mt-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 flex items-start gap-3">
                                        <div className="p-2 bg-purple-500/10 rounded-lg flex-shrink-0">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400">
                                                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                                <path d="M2 17l10 5 10-5"></path>
                                                <path d="M2 12l10 5 10-5"></path>
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-semibold text-slate-300 mb-1">API Kalit haqida</h4>
                                            <p className="text-xs text-slate-400 leading-relaxed">
                                                Google Gemini API kaliti AI funksiyalarini ishga tushirish uchun zarur.
                                                Kalit faqat sizning brauzeringizda saqlanadi va hech qayerga yuborilmaydi.
                                            </p>
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

