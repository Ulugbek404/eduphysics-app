import React, { useState } from 'react';
import { Settings, User, Info, Moon, Sun, Monitor, Volume2, VolumeX, Palette, Atom, Camera, Sparkles, Save, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from './ui/Button';

export default function SettingsModal({ show, onClose, user, theme, setTheme, soundEnabled, setSoundEnabled, updateProfile }) {
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
                        <span className="font-bold text-lg">Haqida</span>
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
            <Header title="Dastur Haqida" onBack={() => setCurrentView('list')} />

            <div className="space-y-6 text-center pt-4 px-1">
                <div className="p-8 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-3xl border border-blue-500/20">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-xl mb-6 animate-pulse-slow">
                        <Atom size={48} className="text-white animate-spin-slow" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">NurFizika</h2>
                    <p className="text-sm text-slate-400 italic">Kuch — bilimda, bilim — bizda!</p>
                    <p className="text-blue-400 font-medium mb-6">9-Sinf Fizika O'quv Platformasi</p>
                    <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
                        Ushbu ilova o'quvchilarga fizikani qiziqarli va interaktiv usulda o'rganishga yordam beradi.
                        AI yordamchisi, virtual laboratoriya va testlar bilimingizni mustahkamlash uchun xizmat qiladi.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                        <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">Versiya</div>
                        <div className="font-bold text-lg">2.5.0</div>
                    </div>
                    <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                        <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">Tuzuvchi</div>
                        <div className="font-bold text-lg">Ulugbek R.</div>
                    </div>
                </div>

                <div className="pt-8">
                    <p className="text-xs text-slate-600">
                        &copy; 2026 NurFizika. Barcha huquqlar himoyalangan.
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-md flex items-center justify-center md:p-4 animate-fadeIn">
            <div className={`w-full h-full md:h-[650px] md:max-w-md bg-slate-900 md:rounded-3xl overflow-hidden shadow-2xl border-0 md:border border-slate-700 flex flex-col relative`}>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar scroll-smooth pb-24 md:pb-6">
                    {currentView === 'list' && renderListView()}
                    {currentView === 'general' && renderGeneralView()}
                    {currentView === 'profile' && renderProfileView()}
                    {currentView === 'about' && renderAboutView()}
                </div>
            </div>
        </div>
    );
}
