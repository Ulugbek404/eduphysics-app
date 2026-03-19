import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Settings, User, Info, Monitor, Bell, Shield, BookOpen, Globe,
    ChevronLeft, ChevronRight, Save, Camera, Volume2, VolumeX,
    Mail, Lock, Trash2, Download, LogOut, Clock, Calendar,
    Target, Sparkles, Search, X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { Button } from '../components/ui/Button';

export default function SettingsPage() {
    const navigate = useNavigate();
    const { user, updateProfile, logout } = useAuth();
    const { t } = useLanguage();

    const [activeSection, setActiveSection] = useState('general');
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Profile states
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    // Settings states
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    const [soundEnabled, setSoundEnabled] = useState(localStorage.getItem('soundEnabled') !== 'false');
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [achievementAlerts, setAchievementAlerts] = useState(true);
    const [studyReminders, setStudyReminders] = useState(true);
    const [dailyGoal, setDailyGoal] = useState(100);
    const [difficultyLevel, setDifficultyLevel] = useState('intermediate');

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

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const handleSoundToggle = () => {
        const newValue = !soundEnabled;
        setSoundEnabled(newValue);
        localStorage.setItem('soundEnabled', newValue);
    };

    const themes = [
        { id: 'dark', name: 'Dark', icon: '🌙' },
        { id: 'white', name: 'White', icon: '☀️' },
        { id: 'black', name: 'Black', icon: '🌑' },
    ];

    const sections = [
        { id: 'general', name: 'Asosiy', icon: Monitor, color: 'blue' },
        { id: 'profile', name: 'Profil', icon: User, color: 'purple' },
        { id: 'account', name: 'Hisob', icon: Settings, color: 'green' },
        { id: 'notifications', name: 'Bildirishnomalar', icon: Bell, color: 'yellow' },
        { id: 'privacy', name: 'Maxfiylik', icon: Shield, color: 'red' },
        { id: 'learning', name: 'O\'qish', icon: BookOpen, color: 'indigo' },
        { id: 'language', name: 'Til va Mintaqa', icon: Globe, color: 'pink' },
        { id: 'about', name: 'Haqida', icon: Info, color: 'emerald' },
    ];

    const filteredSections = sections.filter(section =>
        section.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Section Components
    const GeneralSection = () => (
        <div className="space-y-8">
            <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                    Tashqi Ko'rinish
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {themes.map(t => (
                        <button
                            key={t.id}
                            onClick={() => handleThemeChange(t.id)}
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
                                <div className="w-5 h-5 bg-blue-500 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                    Tovush va Effektlar
                </h3>
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between cursor-pointer hover:border-slate-600 transition-colors" onClick={handleSoundToggle}>
                    <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl transition-colors ${soundEnabled ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                        </div>
                        <div>
                            <div className={`font-medium ${soundEnabled ? 'text-white' : 'text-slate-300'}`}>Ovoz Effektlari</div>
                            <div className="text-xs text-slate-400">Tugma va yutuq ovozlari</div>
                        </div>
                    </div>
                    <div className={`w-14 h-8 rounded-full p-1 transition-all ${soundEnabled ? 'bg-blue-500' : 'bg-slate-600'}`}>
                        <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${soundEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                </div>
            </div>
        </div>
    );

    const ProfileSection = () => (
        <div className="space-y-6">
            <div className="text-center py-6">
                <div className="relative inline-block">
                    <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-xl border-4 border-slate-800 overflow-hidden">
                        {selectedImage || user?.photoURL ? (
                            <img src={selectedImage || user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            displayName ? displayName.charAt(0).toUpperCase() : 'U'
                        )}
                    </div>
                    <label className="absolute bottom-0 right-0 p-2.5 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700 transition-colors shadow-lg border-2 border-slate-900">
                        <Camera size={18} />
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                </div>
            </div>

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

            <Button
                onClick={handleSaveProfile}
                isLoading={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                size="lg"
                leftIcon={<Save size={20} />}
            >
                Saqlash
            </Button>
        </div>
    );

    const AccountSection = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Email</h3>
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-3 mb-2">
                        <Mail size={20} className="text-blue-400" />
                        <span className="font-medium">{user?.email}</span>
                    </div>
                    <p className="text-xs text-slate-400">Emailni o'zgartirish uchun qo'llab-quvvatlash xizmatiga murojaat qiling</p>
                </div>
            </div>

            <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Xavfsizlik</h3>
                <button className="w-full bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Lock size={20} className="text-yellow-400" />
                        <span className="font-medium">Parolni o'zgartirish</span>
                    </div>
                    <ChevronRight size={20} className="text-slate-500" />
                </button>
            </div>

            <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Xavfli Amallar</h3>
                <button className="w-full bg-red-900/20 p-4 rounded-xl border border-red-500/30 hover:border-red-500/50 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Trash2 size={20} className="text-red-400" />
                        <span className="font-medium text-red-400">Hisobni o'chirish</span>
                    </div>
                    <ChevronRight size={20} className="text-red-500" />
                </button>
            </div>
        </div>
    );

    const NotificationsSection = () => (
        <div className="space-y-6">
            {[
                { label: 'Push Bildirishnomalar', desc: 'Brauzer xabarlari', state: pushNotifications, setState: setPushNotifications },
                { label: 'Email Xabarlari', desc: 'Email orqali yangiliklar', state: emailNotifications, setState: setEmailNotifications },
                { label: 'Yutuqlar', desc: 'Yutuqlar haqida xabarlar', state: achievementAlerts, setState: setAchievementAlerts },
                { label: 'O\'qish Eslatmalari', desc: 'Kunlik eslatmalar', state: studyReminders, setState: setStudyReminders },
            ].map((item, index) => (
                <div key={index} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between cursor-pointer hover:border-slate-600 transition-colors" onClick={() => item.setState(!item.state)}>
                    <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-slate-400">{item.desc}</div>
                    </div>
                    <div className={`w-14 h-8 rounded-full p-1 transition-all ${item.state ? 'bg-blue-500' : 'bg-slate-600'}`}>
                        <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${item.state ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                </div>
            ))}
        </div>
    );

    const PrivacySection = () => (
        <div className="space-y-6">
            <button className="w-full bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Download size={20} className="text-blue-400" />
                    <div className="text-left">
                        <div className="font-medium">Ma'lumotlarni yuklab olish</div>
                        <div className="text-xs text-slate-400">Barcha ma'lumotlaringizni eksport qiling</div>
                    </div>
                </div>
                <ChevronRight size={20} className="text-slate-500" />
            </button>

            <button className="w-full bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Trash2 size={20} className="text-yellow-400" />
                    <div className="text-left">
                        <div className="font-medium">Keshni tozalash</div>
                        <div className="text-xs text-slate-400">Local storage ma'lumotlarini o'chirish</div>
                    </div>
                </div>
                <ChevronRight size={20} className="text-slate-500" />
            </button>

            <button onClick={logout} className="w-full bg-red-900/20 p-4 rounded-xl border border-red-500/30 hover:border-red-500/50 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <LogOut size={20} className="text-red-400" />
                    <div className="text-left">
                        <div className="font-medium text-red-400">Chiqish</div>
                        <div className="text-xs text-red-300/70">Hisobdan chiqish</div>
                    </div>
                </div>
                <ChevronRight size={20} className="text-red-500" />
            </button>
        </div>
    );

    const LearningSection = () => (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Kunlik Maqsad (XP)</label>
                <input
                    type="number"
                    value={dailyGoal}
                    onChange={(e) => setDailyGoal(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:border-blue-500 focus:outline-none"
                    min="50"
                    max="500"
                    step="10"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Qiyinchilik Darajasi</label>
                <div className="grid grid-cols-3 gap-3">
                    {['beginner', 'intermediate', 'advanced'].map((level) => (
                        <button
                            key={level}
                            onClick={() => setDifficultyLevel(level)}
                            className={`p-3 rounded-xl border transition-all ${difficultyLevel === level
                                ? 'bg-blue-600/10 border-blue-500 text-blue-400'
                                : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                                }`}
                        >
                            {level === 'beginner' ? 'Boshlang\'ich' : level === 'intermediate' ? 'O\'rta' : 'Yuqori'}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    const LanguageSection = () => (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Til</label>
                <LanguageSwitcher variant="settings" />
            </div>

            <div className="p-4 bg-blue-900/20 rounded-xl border border-blue-500/30">
                <div className="flex items-center gap-3 mb-2">
                    <Sparkles size={18} className="text-blue-400" />
                    <h4 className="font-bold text-blue-300">Ko'p tillilik</h4>
                </div>
                <p className="text-xs text-blue-200/70 leading-relaxed">
                    Dastur O'zbek, Rus va Ingliz tillarida mavjud. Tilni istalgan vaqtda o'zgartirishingiz mumkin.
                </p>
            </div>
        </div>
    );

    const AboutSection = () => (
        <div className="space-y-6 text-center">
            <div className="p-8 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-3xl border border-blue-500/20">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-xl mb-6">
                    <img src="/assets/nurfizika.jpg" alt="NurFizika" className="w-full h-full object-cover rounded-2xl" />
                </div>
                <h2 className="text-2xl font-bold mb-2">NurFizika</h2>
                <p className="text-sm text-slate-400 italic mb-4">Kuch — bilimda, bilim — bizda!</p>
                <p className="text-blue-400 font-medium mb-6">9-Sinf Fizika O'quv Platformasi</p>
                <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
                    Ushbu ilova o'quvchilarga fizikani qiziqarli va interaktiv usulda o'rganishga yordam beradi.
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

            <p className="text-xs text-slate-600 pt-4">
                © 2026 NurFizika. Barcha huquqlar himoyalangan.
            </p>
        </div>
    );

    const renderSection = () => {
        switch (activeSection) {
            case 'general': return <GeneralSection />;
            case 'profile': return <ProfileSection />;
            case 'account': return <AccountSection />;
            case 'notifications': return <NotificationsSection />;
            case 'privacy': return <PrivacySection />;
            case 'learning': return <LearningSection />;
            case 'language': return <LanguageSection />;
            case 'about': return <AboutSection />;
            default: return <GeneralSection />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 hover:bg-slate-800 rounded-xl transition-colors"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <div className="flex items-center gap-3">
                                <Settings className="text-blue-500" size={24} />
                                <h1 className="text-xl font-bold">Sozlamalar</h1>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="hidden md:flex items-center gap-2 bg-slate-800 rounded-xl px-4 py-2 border border-slate-700 w-64">
                            <Search size={18} className="text-slate-400" />
                            <input
                                type="text"
                                placeholder="Qidirish..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none outline-none text-sm w-full"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white">
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar Navigation */}
                    <aside className="lg:col-span-1">
                        <nav className="space-y-2 sticky top-24">
                            {filteredSections.map((section) => {
                                const Icon = section.icon;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeSection === section.id
                                            ? `bg-${section.color}-600/10 border-${section.color}-500 border text-${section.color}-400`
                                            : 'bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                                            }`}
                                    >
                                        <Icon size={20} />
                                        <span className="font-medium">{section.name}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </aside>

                    {/* Content Area */}
                    <main className="lg:col-span-3">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="bg-slate-800/30 rounded-2xl border border-slate-700/50 p-6"
                        >
                            <h2 className="text-2xl font-bold mb-6">
                                {sections.find(s => s.id === activeSection)?.name}
                            </h2>
                            {renderSection()}
                        </motion.div>
                    </main>
                </div>
            </div>
        </div>
    );
}
