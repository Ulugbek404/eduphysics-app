import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    BarChart2, BookOpen, Library, FlaskConical, Target, Zap,
    Trophy, MessageSquare, Settings, LogOut, Crown, ArrowRight, TrendingUp
} from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import BottomNav from '../ui/BottomNav';

/**
 * AppShell — barcha o'quvchi sahifalari uchun umumiy qobiq.
 * Desktop (lg+): doimiy chap sidebar; Mobile: pastki tab bar (BottomNav).
 * DashboardPage bunga O'RALMAYDI — unda o'z ichki sidebar/tab tizimi bor.
 */

function NavItem({ icon, label, path, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`
                w-full flex items-center gap-3 px-4 py-3 mb-1.5 rounded-xl
                transition-all duration-200 group relative outline-none
                ${active
                    ? 'bg-gradient-to-r from-teal-500/15 to-transparent border border-teal-500/20 text-teal-600 dark:text-teal-400 font-bold'
                    : 'bg-transparent hover:bg-teal-500/5 text-soft hover:text-teal-700 dark:hover:text-teal-300 border border-transparent hover:border-teal-500/15'
                }
            `}
        >
            {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-500 rounded-r-full" />
            )}
            <div className={`flex-shrink-0 transition-transform duration-200 ${active ? 'scale-110 text-brand-500' : 'group-hover:scale-110 group-hover:text-brand-500'}`}>
                {React.cloneElement(icon, { size: 20 })}
            </div>
            <span className={`text-[14px] tracking-wide ${active ? 'font-bold' : 'font-medium'}`}>
                {label}
            </span>
        </button>
    );
}

export default function AppShell({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { userData, user } = useAuth();
    const { t } = useLanguage();
    const isAdmin = userData?.role === 'admin';
    const displayUser = userData || user;

    const navItems = [
        { icon: <BarChart2 />, label: t('nav_dashboard') || 'Asosiy', path: '/dashboard' },
        { icon: <BookOpen />, label: t('nav_lessons') || 'Darsliklar', path: '/darsliklar' },
        { icon: <Library />, label: t('nav_library') || 'Kutubxona', path: '/kutubxona' },
        { icon: <FlaskConical />, label: t('nav_formulas') || 'Formulalar', path: '/formulalar' },
        { icon: <Target />, label: t('nav_missions') || 'Missiyalar', path: '/missiyalar' },
        { icon: <Zap />, label: t('nav_lab') || 'Laboratoriya', path: '/laboratoriya' },
        { icon: <Trophy />, label: t('nav_livetest') || 'Live Test', path: '/testlar' },
        { icon: <TrendingUp />, label: t('nav_progress') || 'Progress', path: '/progress' },
        { icon: <MessageSquare />, label: t('dash_ai_tutor') || 'AI Fizik Ustoz', path: '/dashboard', tabHint: 'ai-tutor' },
    ];

    const isActive = (item) => {
        if (item.tabHint) return false;
        if (item.path === '/dashboard') return location.pathname === '/dashboard';
        return location.pathname.startsWith(item.path);
    };

    const handleNav = (item) => {
        if (item.tabHint) sessionStorage.setItem('dashboardTab', item.tabHint);
        navigate(item.path);
    };

    const logout = async () => {
        try {
            await signOut(auth);
            navigate('/login', { replace: true });
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    return (
        <div className="min-h-screen theme-bg">
            {/* ── Desktop Sidebar (faqat lg+) ── */}
            <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-[220px] theme-sidebar border-r-[0.5px] theme-border flex-col">
                {/* Logo */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="p-4 lg:p-6 flex items-center gap-3 border-b-[0.5px] theme-border pb-4 text-left"
                >
                    <img
                        src="/assets/nurfizika.jpg"
                        alt="NurFizika Logo"
                        className="w-11 h-11 rounded-xl object-cover"
                    />
                    <div className="flex flex-col">
                        <span className="text-brand-600 font-bold text-[18px] tracking-tight">{t('app_name') || 'NurFizika'}</span>
                        <span className="text-[11px] font-semibold italic tracking-wide text-xp-500 mt-0.5">{t('app_slogan') || 'Fizika — yangicha nigohda'}</span>
                    </div>
                </button>

                {/* Navigatsiya */}
                <nav className="mt-4 px-3 space-y-1.5 flex-1 overflow-y-auto custom-scrollbar">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.label}
                            icon={item.icon}
                            label={item.label}
                            path={item.path}
                            active={isActive(item)}
                            onClick={() => handleNav(item)}
                        />
                    ))}
                </nav>

                {/* Pastki blok: user + amallar */}
                <div className="p-4 border-t-[0.5px] theme-border space-y-2">
                    <div className="flex items-center gap-3 p-3 theme-card rounded-xl border-[0.5px] theme-border">
                        <div className="w-9 h-9 rounded-full border-2 border-brand-500/40 overflow-hidden theme-card flex items-center justify-center flex-shrink-0">
                            {displayUser?.photoURL ? (
                                <img src={displayUser.photoURL} alt="User" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-main font-bold text-sm">{displayUser?.displayName ? displayUser.displayName[0].toUpperCase() : 'U'}</span>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-main font-medium text-sm truncate">{displayUser?.displayName || 'Foydalanuvchi'}</p>
                            <p className="text-faint text-xs truncate">{displayUser?.email || ''}</p>
                        </div>
                    </div>

                    {isAdmin && (
                        <button
                            onClick={() => navigate('/admin')}
                            className="w-full flex items-center gap-3 px-4 py-2.5 bg-ai-500/10 hover:bg-ai-500/20 rounded-lg transition-all text-ai-400 hover:text-ai-300 group border border-ai-500/20"
                        >
                            <Crown size={18} className="flex-shrink-0" />
                            <span className="text-sm font-medium flex-1 text-left">{t('nav_admin') || 'Admin Panel'}</span>
                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </button>
                    )}
                    <button
                        onClick={() => navigate('/settings')}
                        className="w-full flex items-center gap-3 px-4 py-2.5 theme-card rounded-lg transition-all text-soft hover:text-main border-[0.5px] theme-border hover:border-brand-500/30"
                    >
                        <Settings size={18} className="flex-shrink-0" />
                        <span className="text-sm font-medium">{t('nav_settings') || 'Sozlamalar'}</span>
                    </button>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 bg-danger-500/5 hover:bg-danger-500/10 rounded-lg transition-all text-danger-400/80 hover:text-danger-400 border border-danger-500/10 hover:border-danger-500/30"
                    >
                        <LogOut size={18} className="flex-shrink-0" />
                        <span className="text-sm font-medium">{t('nav_logout') || 'Chiqish'}</span>
                    </button>
                </div>
            </aside>

            {/* ── Asosiy kontent ── */}
            <main className="lg:ml-[220px] pb-20 lg:pb-0 min-h-screen">
                {children}
            </main>

            {/* ── Mobile pastki navigatsiya ── */}
            <BottomNav />
        </div>
    );
}
