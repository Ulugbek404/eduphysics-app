import React from 'react';
import { BarChart2, User, Menu } from 'lucide-react';

export const BottomNav = ({ activeTab, setActiveTab, onMenuClick }) => {

    const mainNavItems = [
        { id: 'dashboard', icon: BarChart2, label: 'Asosiy' },
        { id: 'profile', icon: User, label: 'Profil' },
    ];

    // Haptic feedback function
    const triggerHaptic = () => {
        if (navigator.vibrate) {
            navigator.vibrate(10); // 10ms light vibration
        }
    };

    const handleTabClick = (tabId) => {
        triggerHaptic();
        setActiveTab(tabId);
    };

    return (
        <nav
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-t border-slate-700 safe-bottom"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }}
        >
            <div className="flex items-center justify-around px-2 py-2">
                {/* Bosh sahifa va Profil */}
                {mainNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => handleTabClick(item.id)}
                            className={`
                                flex flex-col items-center justify-center 
                                flex-1 min-h-[56px] min-w-[56px]
                                px-3 py-2 rounded-xl 
                                transition-all duration-200
                                ${isActive
                                    ? 'text-blue-400 scale-105 bg-blue-500/10'
                                    : 'text-slate-400 active:scale-95 active:bg-slate-800/50'
                                }
                                hover:bg-slate-800/30
                                touch-manipulation
                            `}
                            aria-label={item.label}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            <div className="relative">
                                <Icon
                                    size={24}
                                    className={`transition-all duration-200 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`}
                                    aria-hidden="true"
                                />
                                {isActive && (
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                                )}
                            </div>
                            <span className={`
                                text-xs mt-1.5 font-medium 
                                transition-all duration-200 
                                ${isActive ? 'opacity-100' : 'opacity-70'}
                            `}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}

                {/* Menyu tugmasi */}
                <button
                    onClick={() => handleTabClick('menu')}
                    className={`
                        flex flex-col items-center justify-center 
                        flex-1 min-h-[56px] min-w-[56px]
                        px-3 py-2 rounded-xl 
                        transition-all duration-200
                        ${activeTab === 'menu'
                            ? 'text-blue-400 scale-105 bg-blue-500/10'
                            : 'text-slate-400 active:scale-95 active:bg-slate-800/50'
                        }
                        hover:bg-slate-800/30
                        touch-manipulation
                    `}
                    aria-label="Menyu"
                    aria-current={activeTab === 'menu' ? 'page' : undefined}
                >
                    <div className="relative">
                        <Menu
                            size={24}
                            className={`transition-all duration-200 ${activeTab === 'menu' ? 'stroke-[2.5]' : 'stroke-2'}`}
                            aria-hidden="true"
                        />
                        {activeTab === 'menu' && (
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                        )}
                    </div>
                    <span className={`
                        text-xs mt-1.5 font-medium 
                        transition-all duration-200 
                        ${activeTab === 'menu' ? 'opacity-100' : 'opacity-70'}
                    `}>
                        Menyu
                    </span>
                </button>
            </div>
        </nav>
    );
};

export default BottomNav;
