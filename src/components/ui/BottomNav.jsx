import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, BookOpen, Bot, MoreHorizontal,
    Library, Target, Trophy, FlaskConical, BookMarked,
    User, Settings, LogOut, X
} from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

// ─── Main 4 tabs ──────────────────────────────────────────────────────────────
const mainTabs = [
    { icon: LayoutDashboard, label: 'Asosiy', path: '/dashboard' },
    { icon: BookOpen, label: 'Darslar', path: '/darsliklar' },
    { icon: Bot, label: 'AI Ustoz', path: '/dashboard', tabHint: 'ai-tutor' },
    { icon: MoreHorizontal, label: "Ko'proq", action: 'openMore' },
];

// ─── Panel menu items (2×3 grid) ──────────────────────────────────────────────
const menuItems = [
    { label: 'Kutubxona', path: '/kutubxona', icon: Library, iconBg: 'bg-indigo-500/20', iconColor: 'text-indigo-400' },
    { label: 'Missiyalar', path: '/missiyalar', icon: Target, iconBg: 'bg-violet-500/20', iconColor: 'text-violet-400' },
    { label: 'Testlar', path: '/dashboard', icon: Trophy, iconBg: 'bg-yellow-500/20', iconColor: 'text-yellow-400', tabHint: 'tests' },
    { label: 'Laboratoriya', path: '/laboratoriya', icon: FlaskConical, iconBg: 'bg-emerald-500/20', iconColor: 'text-emerald-400' },
    { label: 'Uy Vazifasi', path: '/dashboard', icon: BookMarked, iconBg: 'bg-orange-500/20', iconColor: 'text-orange-400', tabHint: 'homework' },
    { label: 'Profil', path: '/dashboard', icon: User, iconBg: 'bg-pink-500/20', iconColor: 'text-pink-400', tabHint: 'profile' },
];

// ─── Haptic helper ────────────────────────────────────────────────────────────
function haptic(ms = 10) {
    if (navigator.vibrate) navigator.vibrate(ms);
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const [panelOpen, setPanelOpen] = useState(false);

    // Close panel on route change
    useEffect(() => { setPanelOpen(false); }, [location.pathname]);

    // Lock body scroll while panel is open
    useEffect(() => {
        document.body.style.overflow = panelOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [panelOpen]);

    // Active-tab detection
    const isTabActive = (tab) => {
        if (tab.action) return panelOpen; // Ko'proq active when panel is open
        if (tab.tabHint) return false;    // Don't highlight AI Ustoz by path alone
        return location.pathname === tab.path ||
            (tab.path !== '/dashboard' && location.pathname.startsWith(tab.path));
    };

    const handleTabClick = (tab) => {
        haptic();
        if (tab.action === 'openMore') {
            setPanelOpen(prev => !prev);
            return;
        }
        setPanelOpen(false);
        if (tab.tabHint) {
            sessionStorage.setItem('dashboardTab', tab.tabHint);
        }
        navigate(tab.path);
    };

    const handleMenuItemClick = (item) => {
        haptic();
        setPanelOpen(false);
        if (item.tabHint) {
            sessionStorage.setItem('dashboardTab', item.tabHint);
        }
        navigate(item.path);
    };

    const handleLogout = async () => {
        haptic(20);
        setPanelOpen(false);
        try {
            await signOut(auth);
            navigate('/login', { replace: true });
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    return (
        <>
            {/* ── Bottom Tab Bar ─────────────────────────────────────────── */}
            <nav
                className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800"
                style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
            >
                <div className="flex items-stretch h-16">
                    {mainTabs.map((tab) => {
                        const Icon = tab.icon;
                        const active = isTabActive(tab);

                        return (
                            <button
                                key={tab.label}
                                onClick={() => handleTabClick(tab)}
                                className={`
                                    relative flex flex-col items-center justify-center flex-1
                                    transition-all duration-200 touch-manipulation select-none
                                    ${active
                                        ? 'text-indigo-400'
                                        : 'text-slate-500 active:bg-slate-800/50'
                                    }
                                `}
                                aria-label={tab.label}
                            >
                                {/* Active dot indicator */}
                                <span className={`
                                    absolute top-1.5 w-1 h-1 rounded-full bg-indigo-400
                                    transition-all duration-200
                                    ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                                `} />

                                <Icon
                                    size={22}
                                    strokeWidth={active ? 2.5 : 1.8}
                                    className="transition-all duration-200"
                                />
                                <span className={`
                                    text-[10px] mt-1 font-medium tracking-wide
                                    ${active ? 'opacity-100' : 'opacity-60'}
                                `}>
                                    {tab.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* ── Ko'proq Sliding Panel ──────────────────────────────────── */}
            <div
                className={`
                    lg:hidden fixed inset-0 z-50
                    transition-all duration-300
                    ${panelOpen ? 'visible' : 'invisible pointer-events-none'}
                `}
            >
                {/* Backdrop */}
                <div
                    onClick={() => setPanelOpen(false)}
                    className={`
                        absolute inset-0 bg-black/60 backdrop-blur-sm
                        transition-opacity duration-300
                        ${panelOpen ? 'opacity-100' : 'opacity-0'}
                    `}
                />

                {/* Panel */}
                <div
                    className={`
                        absolute bottom-0 left-0 right-0
                        bg-slate-900 rounded-t-3xl
                        border-t border-slate-700/60
                        shadow-2xl shadow-black/50
                        transition-transform duration-300 ease-out
                        ${panelOpen ? 'translate-y-0' : 'translate-y-full'}
                    `}
                    style={{ paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}
                >
                    {/* Handle bar */}
                    <div className="flex justify-center pt-3 pb-1">
                        <div className="w-10 h-1 bg-slate-700 rounded-full" />
                    </div>

                    {/* Panel header */}
                    <div className="flex items-center justify-between px-5 pt-2 pb-4">
                        <p className="text-slate-400 text-xs font-semibold tracking-widest uppercase">
                            Barcha Bo'limlar
                        </p>
                        <button
                            onClick={() => setPanelOpen(false)}
                            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* 2-column grid */}
                    <div className="grid grid-cols-2 gap-2.5 px-4 pb-4">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.label}
                                    onClick={() => handleMenuItemClick(item)}
                                    className="
                                        flex items-center gap-3
                                        bg-slate-800/80 hover:bg-slate-700/80
                                        active:scale-95
                                        rounded-2xl p-4
                                        transition-all duration-150
                                        touch-manipulation
                                    "
                                >
                                    <div className={`p-2 rounded-xl flex-shrink-0 ${item.iconBg}`}>
                                        <Icon size={18} className={item.iconColor} />
                                    </div>
                                    <span className="text-white text-sm font-medium leading-tight">
                                        {item.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-slate-800 mx-4" />

                    {/* Bottom actions: Settings + Logout */}
                    <div className="flex gap-3 px-4 py-4">
                        <button
                            onClick={() => { setPanelOpen(false); navigate('/settings'); }}
                            className="
                                flex-1 flex items-center justify-center gap-2
                                bg-slate-800 hover:bg-slate-700
                                active:scale-95
                                rounded-2xl py-3.5
                                transition-all duration-150
                                touch-manipulation
                            "
                        >
                            <Settings size={16} className="text-slate-400" />
                            <span className="text-slate-300 text-sm font-medium">Sozlamalar</span>
                        </button>

                        <button
                            onClick={handleLogout}
                            className="
                                flex-1 flex items-center justify-center gap-2
                                bg-red-950/70 hover:bg-red-900/70
                                active:scale-95
                                rounded-2xl py-3.5
                                transition-all duration-150
                                touch-manipulation
                                border border-red-900/40
                            "
                        >
                            <LogOut size={16} className="text-red-400" />
                            <span className="text-red-400 text-sm font-medium">Chiqish</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

// Backward compat named export
export { BottomNav };
