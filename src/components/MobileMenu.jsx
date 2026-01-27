import React, { useState, useEffect } from 'react';
import { Book, Trophy, BookOpen, Zap, FlaskConical, TestTube, Settings, LogOut, Menu, ChevronLeft } from 'lucide-react';

export default function MobileMenu({ setActiveTab, onMenuClick, setShowSettings, logout, setAiModalOpen }) {
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    const handleBack = () => {
        if (navigator.vibrate) navigator.vibrate(10);
        setActiveTab('dashboard');
    };

    const handleItemClick = (itemId) => {
        // Haptic feedback
        if (navigator.vibrate) navigator.vibrate(10);

        if (itemId === 'settings') {
            setShowSettings(true);
        } else if (itemId === 'logout') {
            logout();
        } else if (itemId === 'ai') {
            setAiModalOpen(true);
        } else {
            setActiveTab(itemId);
        }
    };

    // Touch handlers for swipe gesture
    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        // Swipe left to go back to dashboard
        if (isLeftSwipe) {
            handleBack();
        }
    };

    const menuSections = [
        {
            title: 'O\'quv Materiallari',
            items: [
                { id: 'lessons', icon: Book, label: 'Darsliklar', color: 'text-blue-400' },
                { id: 'tests', icon: Trophy, label: 'Testlar', color: 'text-yellow-400' },
                { id: 'homework', icon: BookOpen, label: 'Uy Vazifasi', color: 'text-green-400' },
            ]
        },
        {
            title: 'AI va Amaliyot',
            items: [
                { id: 'ai', icon: Zap, label: 'AI Tutor', color: 'text-purple-400' },
                { id: 'quiz', icon: TestTube, label: 'Test Sinovlari', color: 'text-pink-400' },
                { id: 'lab', icon: FlaskConical, label: 'Laboratoriya', color: 'text-cyan-400' },
            ]
        },
        {
            title: 'Tizim',
            items: [
                { id: 'settings', icon: Settings, label: 'Sozlamalar', color: 'text-slate-400' },
                { id: 'logout', icon: LogOut, label: 'Chiqish', color: 'text-red-400', danger: true },
            ]
        }
    ];

    return (
        <div
            className="animate-fadeIn min-h-screen pb-24"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 sticky top-0 bg-slate-900/95 backdrop-blur-md z-10 py-3 -mx-4 px-4 border-b border-slate-800">
                <button
                    onClick={handleBack}
                    className="
                        min-h-[44px] min-w-[44px]
                        flex items-center justify-center
                        p-2 hover:bg-slate-800 rounded-xl 
                        transition-all duration-200
                        text-slate-400 hover:text-white
                        active:scale-95
                        touch-manipulation
                    "
                    aria-label="Orqaga"
                >
                    <ChevronLeft size={24} />
                </button>
                <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                    <Menu className="text-blue-400" size={24} />
                    Menyu
                </h2>
            </div>

            {/* Swipe Hint */}
            <div className="mb-4 text-center">
                <p className="text-xs text-slate-500">
                    ← Chapga surish orqali yopish
                </p>
            </div>

            {/* Menu Sections */}
            <div className="space-y-6">
                {menuSections.map((section, idx) => (
                    <div key={idx} className="space-y-3">
                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2">
                            {section.title}
                        </h3>
                        <div className="space-y-2">
                            {section.items.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleItemClick(item.id)}
                                        className={`
                                            w-full flex items-center gap-4 
                                            min-h-[56px]
                                            p-4 rounded-2xl 
                                            transition-all duration-200
                                            active:scale-[0.98]
                                            touch-manipulation
                                            ${item.danger
                                                ? 'bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30 border border-red-500/20'
                                                : 'bg-slate-800/50 hover:bg-slate-800 active:bg-slate-700 border border-slate-700/50'
                                            }
                                        `}
                                        aria-label={item.label}
                                    >
                                        <div className={`
                                            p-2 rounded-xl 
                                            ${item.danger ? 'bg-red-500/20' : 'bg-slate-700/50'}
                                        `}>
                                            <Icon size={22} className={item.color} aria-hidden="true" />
                                        </div>
                                        <span className={`
                                            font-medium text-base 
                                            ${item.danger ? 'text-red-400' : 'text-white'}
                                        `}>
                                            {item.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer info */}
            <div className="mt-8 text-center text-xs text-slate-600">
                EduPhysics v2.5 (2026)
            </div>
        </div>
    );
}
