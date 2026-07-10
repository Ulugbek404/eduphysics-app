import React, { useState, useEffect, useMemo, useRef, lazy, Suspense, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Book, Atom, Brain, Trophy, User, ChevronRight, Play,
  RotateCcw, Menu, X, CheckCircle, AlertCircle, BarChart2,
  Zap, Flame, Award, ArrowRight, Settings, MessageSquare,
  Info, Smartphone, Moon, Sun, Monitor, Volume2, VolumeX, Palette, Camera, Sparkles,
  Send, Loader, Bot, Key, Search, LogOut, BookOpen, Clock, TrendingUp, Activity, Library, Target,
  Crown, FlaskConical
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, collection, onSnapshot, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import {
  getUserProgress, addUserXP, updateUserLevel, markLessonComplete, saveQuizResult,
  updateUserStats, initUserStats, trackTodayActivity
} from '../services/userService';


import { lessonsData, calculateChapterProgress } from '../data/lessonsData';

import AIRecommendations from '../components/AIRecommendations';
import { askAITutor } from '../services/aiService';
import { useGeminiAI } from '../hooks/useGeminiAI';
import EmptyState from '../components/ui/EmptyState';
import PageHeader from '../components/ui/PageHeader';

import StatsCard from '../components/dashboard/StatsCard';
import QuickActionCard from '../components/dashboard/QuickActionCard';
import ActivityItem from '../components/dashboard/ActivityItem';

import { useXP } from '../contexts/XPContext';
// Modulli laboratoriyalar (Lazy Load)
const OhmLawLab = lazy(() => import('../components/lab/modules/OhmLawLab'));
const NewtonsLawLab = lazy(() => import('../components/lab/modules/NewtonsLawLab'));

// Loading component for lazy modules
const ComponentLoader = () => (
  <div className="flex items-center justify-center h-64 w-full theme-card rounded-2xl border theme-border">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <span className="theme-muted text-sm">Laboratoriya yuklanmoqda...</span>
    </div>
  </div>
);

// Lazy load katta komponentlar - Performance optimization
const AITutorModule = lazy(() => import('../components/AITutorModule'));
const HomeworkHelper = lazy(() => import('../components/homework/HomeworkHelper'));
const PDFViewer = lazy(() => import('../components/PDFViewer'));


// --- LOADING SCREEN ---
function LoadingScreen() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen theme-bg flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-2xl">
            <Atom size={64} className="text-white animate-spin" />
          </div>
        </div>
        <p className="theme-muted text-lg">{t('common_loading') || 'Yuklanmoqda...'}</p>
      </div>
    </div>
  );
}

// --- ERROR BOUNDARY ---
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen theme-bg flex flex-col items-center justify-center p-10 theme-text">
          <div className="theme-card p-8 rounded-2xl border border-red-500/50 max-w-2xl w-full shadow-2xl">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <AlertCircle size={32} className="text-red-500" />
              {this.props.t ? this.props.t('error_title') : 'Xatolik yuz berdi'}
            </h1>
            <p className="theme-muted mb-6">{this.props.t ? this.props.t('error_desc') : "Dasturni yuklashda muammo bo'ldi. Iltimos, quyidagi xatoni administratorga yuboring:"}</p>
            <pre className="theme-surface p-4 rounded-lg overflow-auto font-mono text-sm text-red-500/80 border border-red-500/20">
              {this.state.error?.toString()}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-all w-full shadow-lg shadow-red-500/20"
            >
              {this.props.t ? this.props.t('common_refresh') : 'Sahifani yangilash'}
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- ASOSIY APP KOMPONENTI ---
function EduPhysicsAppContent() {
  const { user, loading, logout, userData } = useAuth();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [progressLoading, setProgressLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  // --- SIDEBAR MOBILE STATE ---
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // --- NAV STATE ---
  const [activeTab, setActiveTab] = useState('dashboard');
  const [targetChapter, setTargetChapter] = useState(null);

  // Tashqi sahifadan (AppShell/BottomNav) tab hint bilan kelinganda uni qo'llash
  const routerLocation = useLocation();
  useEffect(() => {
    const hint = sessionStorage.getItem('dashboardTab');
    if (hint) {
      sessionStorage.removeItem('dashboardTab');
      setActiveTab(hint);
    }
  }, [routerLocation.key]);

  // --- PROGRESS STATE ---
  const [userXP, setUserXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [completedLessons, setCompletedLessons] = useState([]);



  // --- AI MESSAGES STATE ---
  const [aiMessages, setAiMessages] = useState([
    { role: 'ai', text: "Salom! Men NurFizika AI ustoziman. ⚛️\nFizikadan har qanday savol bering — qadamba-qadam tushuntiraman!" }
  ]);


  // ── Notifications (Firestore) ──
  useEffect(() => {
    if (!user?.uid) return;
    const fetchNotifications = async () => {
      try {
        const q = query(
          collection(db, 'notifications', user.uid, 'messages'),
          orderBy('createdAt', 'desc'),
          limit(10)
        );
        const snap = await getDocs(q);
        setNotifications(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        setNotifications([]);
      }
    };
    fetchNotifications();
  }, [user?.uid]);

  // ── Announcements (Firestore — real-time) ──
  const [announcements, setAnnouncements] = useState([]);
  useEffect(() => {
    // localStorage dan dismiss qilinganlarni olamiz
    const getDismissed = () => {
      try { return JSON.parse(localStorage.getItem('nf_dismissed_announcements') || '[]'); }
      catch { return []; }
    };
    const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'), limit(10));
    const unsub = onSnapshot(q, snap => {
      const dismissed = getDismissed();
      const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      // Dismiss qilinmaganlarni ko'rsatish
      setAnnouncements(all.filter(a => !dismissed.includes(a.id)));
    }, () => setAnnouncements([]));
    return unsub;
  }, []);

  const dismissAnnouncement = useCallback((id) => {
    try {
      const dismissed = JSON.parse(localStorage.getItem('nf_dismissed_announcements') || '[]');
      dismissed.push(id);
      localStorage.setItem('nf_dismissed_announcements', JSON.stringify(dismissed));
    } catch { }
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  }, []);

  // --- TEMPORARY AUTO ADMIN UPGRADE ---
  useEffect(() => {
    if (userData?.email === 'ulugbekroziboyev05@gmail.com' && userData?.role !== 'admin') {
      import('firebase/firestore').then(({ updateDoc, doc }) => {
        updateDoc(doc(db, 'users', userData.uid), { role: 'admin' })
          .then(() => {
            console.log('Successfully upgraded account to admin!');
            window.location.reload();
          })
          .catch(e => console.error('Auto-upgrade failed:', e));
      });
    }
  }, [userData]);

  // Avatar state from localStorage (FIX for large base64 images)
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    if (user?.uid) {
      const key = `user_avatar_${user.uid}`;
      setUserAvatar(localStorage.getItem(key));

      const handleAvatarUpdate = () => setUserAvatar(localStorage.getItem(key));
      window.addEventListener('avatarUpdated', handleAvatarUpdate);
      return () => window.removeEventListener('avatarUpdated', handleAvatarUpdate);
    }
  }, [user]);

  // --- STATISTICS STATE (Firestore onSnapshot) ---
  const [userStats, setUserStats] = useState({
    timeSpent: 0, testsSolved: 0, totalScore: 0, completedLabs: 0, averageScore: 0,
  });

  // Firestore dan real-time stats yuklash
  useEffect(() => {
    if (!user?.uid) return;
    const unsub = onSnapshot(doc(db, 'users', user.uid), (snap) => {
      if (!snap.exists()) return;
      const data = snap.data();
      if (!data.stats) {
        // stats maydoni yo'q — yaratamiz
        initUserStats(user.uid);
        return;
      }
      setUserStats({
        timeSpent: data.stats.timeSpent || 0,
        testsSolved: data.stats.testsSolved || 0,
        totalScore: data.stats.totalScore || 0,
        completedLabs: data.stats.completedLabs || 0,
        averageScore: data.stats.averageScore || 0,
      });
      // averageScore qayta hisoblash
      if (data.stats.testsSolved > 0) {
        const avg = Math.round((data.stats.totalScore || 0) / data.stats.testsSolved);
        if (avg !== data.stats.averageScore) {
          import('firebase/firestore').then(({ updateDoc, doc: fiDoc }) => {
            updateDoc(fiDoc(db, 'users', user.uid), { 'stats.averageScore': avg }).catch(() => { });
          });
        }
      }
    }, () => { });
    return () => unsub();
  }, [user?.uid]);

  const updateUserStats_ = (data) => {
    if (!user?.uid) return;
    if (typeof data === 'number') {
      // Quiz result
      updateUserStats(user.uid, { testsSolved: 1, totalScore: data });
    } else if (data?.labCompleted) {
      updateUserStats(user.uid, { completedLabs: 1 });
    }
  };

  // Time tracker — har 60 soniyada Firestore ga yozish
  useEffect(() => {
    if (!user?.uid || loading) return;
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        updateUserStats(user.uid, { timeSpent: 60 });
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [user?.uid, loading]);


  const handleUpdateProfile = async (data) => {
    if (user) {
      const updates = {};
      if (data.displayName) updates.displayName = data.displayName;
      if (data.photoURL) updates.photoURL = data.photoURL;

      if (Object.keys(updates).length > 0) {
        await updateProfile(user, updates);
        window.location.reload();
      }
    }
  };

  // Xabar chiqarish funksiyasi (Toast)
  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  // Bugungi faollikni belgilash — streak uchun
  useEffect(() => {
    if (user?.uid) trackTodayActivity(user.uid);
  }, [user?.uid]);

  // User progress yuklash — onSnapshot bilan real-time
  useEffect(() => {
    if (!user?.uid) return;
    const unsub = onSnapshot(doc(db, 'users', user.uid), (snap) => {

      if (!snap.exists()) return;
      const data = snap.data();

      setUserXP(data.xp || 0);
      setUserLevel(data.level || 1);
      setCompletedLessons(data.completedLessons || []);

      setProgressLoading(false);
    }, (err) => {
      console.warn('DashboardPage progress listener:', err?.code);
      setProgressLoading(false);
    });
    return () => unsub();
  }, [user?.uid]);


  // XP qo'shish va level tekshirish
  const addXP = async (amount) => {
    const newXP = userXP + amount;
    setUserXP(newXP);

    try {
      // Firestore'ga saqlash
      await addUserXP(user.uid, amount);

      // Level tekshirish (har 1000 XP = 1 level)
      const newLevel = Math.floor(newXP / 1000) + 1;
      if (newLevel > userLevel) {
        setUserLevel(newLevel);
        await updateUserLevel(user.uid, newLevel);
        addNotification(`🎉 Level ${newLevel}ga yetdingiz!`, 'success');
      }
    } catch (error) {
      console.error('Error adding XP:', error);
    }
  };

  // Darsni tugatish
  const completeLesson = async (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);

      try {
        await markLessonComplete(user.uid, lessonId);
        await addXP(50); // Dars uchun 50 XP
        await trackTodayActivity(user.uid);
        addNotification('✅ Dars tugallandi! +50 XP', 'success');
      } catch (error) {
        console.error('Error completing lesson:', error);
      }
    }
  };



  // Extended User with local avatar
  const displayUser = user ? { ...user, photoURL: userAvatar || user.photoURL } : null;

  // Render content function
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard setActiveTab={setActiveTab} setTargetChapter={setTargetChapter} userXP={userXP} userLevel={userLevel} theme={theme} userStats={userStats} completedLessons={completedLessons} totalLessons={lessonsData.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0)} announcements={announcements} dismissAnnouncement={dismissAnnouncement} />;

      case 'menu': setActiveTab('dashboard'); return <Dashboard setActiveTab={setActiveTab} setTargetChapter={setTargetChapter} userXP={userXP} userLevel={userLevel} theme={theme} userStats={userStats} completedLessons={completedLessons} totalLessons={lessonsData.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0)} announcements={announcements} dismissAnnouncement={dismissAnnouncement} />;

      case 'ai-tutor': return (
        <AITutorModule setActiveTab={setActiveTab} messages={aiMessages} setMessages={setAiMessages} />
      );

      case 'homework': return (
        <div className="space-y-6">
          <PageHeader title={t('dashboard.homework') || 'Uy Vazifasi'} />
          <HomeworkHelper setShowSettings={() => navigate('/settings')} addNotification={addNotification} addXP={addXP} theme={theme} />
        </div>
      );

      case 'lab': return (
        <div className="space-y-6">
          <PageHeader title={t('dashboard.lab') || 'Tajribalar'} onBack={() => setActiveTab('dashboard')} />
          <VirtualLab addNotification={addNotification} setShowSettings={() => navigate('/settings')} theme={theme} updateStats={updateUserStats} />
        </div>
      );

      case 'quiz': return (
        <div className="space-y-6">
          <PageHeader title={t('dashboard_tests') || 'AI Test Sinovlari'} />
          <QuizModule setUserXP={setUserXP} addNotification={addNotification} setShowSettings={() => navigate('/settings')} theme={theme} updateStats={updateUserStats} />
        </div>
      );

      case 'profile': return (
        <div className="space-y-6">
          <PageHeader title={t('dashboard_profile') || 'Profil'} />
          <UserProfile
            user={displayUser}
            userXP={userXP}
            userLevel={userLevel}
            theme={theme}
            userStats={userStats}
            completedLessons={completedLessons}
            totalLessons={lessonsData.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0)}
          />
        </div>
      );

      default: return <Dashboard setActiveTab={setActiveTab} userXP={userXP} userLevel={userLevel} theme={theme} userStats={userStats} completedLessons={completedLessons} totalLessons={lessonsData.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0)} />;
    }
  };

  // Sidebar yopish — tab o'zgarganida mobile da avtomatik
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  // Sidebar navigatsiya yopish
  const handleNavNavigate = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen theme-bg theme-text font-sans overflow-hidden selection:bg-blue-500 selection:text-white">

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-[60] space-y-2 pointer-events-none max-w-[calc(100vw-2rem)]">
        {(notifications ?? []).map(n => (
          <div key={n.id} className={`flex items-center space-x-2 px-4 py-3 rounded-lg shadow-2xl animate-slideInLeft ${n.type === 'success' ? 'bg-green-500/90' : 'bg-blue-500/90'
            } backdrop-blur-sm text-white pointer-events-auto`}>
            {n.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <span className="font-medium text-sm">{n.message}</span>
          </div>
        ))}
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Yon panel (Sidebar) */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-[220px]
        theme-sidebar border-r-[0.5px] theme-border
        flex flex-col
        transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Logo & Brand */}
        <div className="p-4 lg:p-6 flex items-center justify-between border-b-[0.5px] theme-border pb-4">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/nurfizika.jpg" 
              alt="NurFizika Logo" 
              className="w-11 h-11 rounded-xl object-cover"
              style={{ filter: 'drop-shadow(0 4px 6px rgba(13, 148, 136, 0.3))' }}
            />
            <div className="flex flex-col">
              <span className="text-[#0d9488] font-bold text-[18px] tracking-tight">{t('app_name') || 'NurFizika'}</span>
              <span className="text-[11px] sm:text-[12px] font-semibold italic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600 drop-shadow-[0_1px_2px_rgba(251,191,36,0.3)] mt-0.5">{t('app_slogan') || 'Fizika — yangicha nigohda'}</span>
            </div>
          </div>
          {/* Close button - only on mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 theme-muted hover:text-teal-500 theme-card-hover rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation - With Labels */}
        <nav className="mt-4 px-3 space-y-1.5 flex-1 overflow-y-auto custom-scrollbar">
          <SidebarItem icon={<BarChart2 />} label={t('nav_dashboard') || 'Asosiy'} id="dashboard" active={activeTab} set={handleTabChange} />
          <div onClick={() => handleNavNavigate('/darsliklar')}>
            <SidebarItem icon={<BookOpen />} label={t('nav_lessons') || 'Darsliklar'} id="darsliklar" active={activeTab} set={() => { }} />
          </div>
          <div onClick={() => handleNavNavigate('/kutubxona')}>
            <SidebarItem icon={<Library />} label={t('nav_library') || 'Kutubxona'} id="kutubxona" active={activeTab} set={() => { }} />
          </div>
          <div onClick={() => handleNavNavigate('/formulalar')}>
            <SidebarItem icon={<FlaskConical />} label={t('nav_formulas') || 'Formulalar'} id="formulalar" active={activeTab} set={() => { }} />
          </div>
          <div onClick={() => handleNavNavigate('/missiyalar')}>
            <SidebarItem icon={<Target />} label={t('nav_missions') || 'Missiyalar'} id="missiyalar" active={activeTab} set={() => { }} />
          </div>
          <div onClick={() => handleNavNavigate('/laboratoriya')}>
            <SidebarItem icon={<Zap />} label={t('nav_lab') || 'Laboratoriya'} id="lab" active={activeTab} set={() => { }} />
          </div>
          <div onClick={() => handleNavNavigate('/testlar')}>
            <SidebarItem icon={<Trophy />} label={t('nav_livetest') || 'Live Test'} id="tests" active={activeTab} set={() => { }} />
          </div>
          <SidebarItem icon={<BookOpen />} label={t('nav_homework') || 'Uy Vazifasi'} id="homework" active={activeTab} set={handleTabChange} />
          <SidebarItem icon={<Brain />} label={t('nav_tests') || 'AI Test Sinovlari'} id="quiz" active={activeTab} set={handleTabChange} />
          <SidebarItem icon={<MessageSquare />} label={t('dash_ai_tutor') || 'AI Fizik Ustoz'} id="ai-tutor" active={activeTab} set={handleTabChange} />
          <SidebarItem icon={<User />} label={t('nav_profile') || 'Profil'} id="profile" active={activeTab} set={handleTabChange} />
        </nav>

        {/* User Section */}
        <div className="p-4 border-t-[0.5px] theme-border theme-sidebar space-y-3">
          <motion.div 
            whileHover={{ y: -2 }}
            className="flex items-center gap-3 p-3 theme-card rounded-xl border-[0.5px] theme-border hover:border-teal-500/30 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-full border-2 border-teal-500/40 overflow-hidden theme-card flex items-center justify-center flex-shrink-0">
              {displayUser?.photoURL ? (
                <img src={displayUser.photoURL} alt="User" className="w-full h-full object-cover" />
              ) : (
                <span className="theme-text font-bold text-sm">{displayUser?.displayName ? displayUser.displayName[0].toUpperCase() : 'U'}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="theme-text font-medium text-sm truncate">
                {displayUser?.displayName || (t('dash_profile_default_user') || 'Foydalanuvchi')}
              </p>
              <p className="theme-muted text-xs truncate">
                {displayUser?.email || 'email@example.com'}
              </p>
            </div>
          </motion.div>
          <div className="space-y-2">
            {userData?.role === 'admin' && (
              <motion.button
                whileHover={{ x: 4 }}
                onClick={() => { navigate('/admin'); setSidebarOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 bg-violet-500/10 hover:bg-violet-500/20 rounded-lg transition-all duration-300 text-violet-400 hover:text-violet-300 group border border-violet-500/20"
              >
                <Crown size={18} className="flex-shrink-0 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-sm font-medium flex-1 text-left">{t('nav_admin') || 'Admin Panel'}</span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </motion.button>
            )}
            <motion.button
              whileHover={{ x: 4 }}
              onClick={() => { navigate('/settings'); setSidebarOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 theme-card rounded-lg transition-all duration-300 theme-text-secondary group border-[0.5px] theme-border hover:border-teal-500/30 hover:theme-text"
            >
              <Settings size={18} className="flex-shrink-0 self-center group-hover:rotate-90 transition-transform duration-500" />
              <span className="text-sm font-medium self-center leading-none">{t('nav_settings') || 'Sozlamalar'}</span>
            </motion.button>
            <motion.button
              whileHover={{ x: 4 }}
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-2.5 bg-red-500/5 hover:bg-red-500/10 rounded-lg transition-all duration-300 text-red-400/80 hover:text-red-400 group border border-red-500/10 hover:border-red-500/30"
            >
              <LogOut size={18} className="flex-shrink-0 self-center group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm font-medium self-center leading-none">{t('nav_logout') || 'Chiqish'}</span>
            </motion.button>
          </div>
        </div>
      </aside>

      {/* Asosiy oyna */}
      <main className="flex-1 overflow-y-auto theme-bg relative scroll-smooth transition-all duration-300 lg:ml-[220px]">

        {/* Mobile Top Bar */}
        <div className="lg:hidden sticky top-0 z-20 flex items-center justify-between px-4 py-3 theme-topbar border-b-[0.5px] theme-border">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 theme-text theme-card-hover rounded-lg transition-colors"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <img
              src="/assets/nurfizika.jpg"
              alt="NurFizika Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg object-cover shadow-lg"
              style={{ filter: 'drop-shadow(0 2px 8px rgba(255, 215, 0, 0.4))' }}
            />
            <span className="theme-text font-medium text-base">NurFizika</span>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-teal-500/40 overflow-hidden theme-card flex items-center justify-center">
            {displayUser?.photoURL ? (
              <img src={displayUser.photoURL} alt="User" className="w-full h-full object-cover" />
            ) : (
              <span className="theme-text font-bold text-sm">{displayUser?.displayName ? displayUser.displayName[0].toUpperCase() : 'U'}</span>
            )}
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl mix-blend-screen"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl mix-blend-screen"></div>
        </div>

        {/* Content Container */}
        <div className="
          relative z-10
          min-h-full
          px-4 py-4
          sm:px-6 sm:py-6
          md:px-8 md:py-8
          lg:px-10 lg:py-10
          max-w-[1600px] mx-auto
          pb-24 lg:pb-8
        ">
          {/* ─── E'lonlar Banner ─── */}
          <AnnouncementBanners announcements={announcements} onDismiss={dismissAnnouncement} />
          {renderContent()}
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 theme-bottom-nav border-t theme-border safe-area-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          <button
            onClick={() => handleTabChange('dashboard')}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${activeTab === 'dashboard' ? 'text-teal-600 dark:text-teal-400' : 'theme-muted'
              }`}
          >
            <BarChart2 size={20} />
            <span className="text-[10px] font-medium">{t('nav_dashboard') || 'Asosiy'}</span>
          </button>
          <button
            onClick={() => handleNavNavigate('/darsliklar')}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 theme-muted"
          >
            <BookOpen size={20} />
            <span className="text-[10px] font-medium">{t('nav_lessons') || 'Darslar'}</span>
          </button>
          <button
            onClick={() => handleTabChange('quiz')}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${activeTab === 'quiz' ? 'text-teal-600 dark:text-teal-400' : 'theme-muted'
              }`}
          >
            <Brain size={20} />
            <span className="text-[10px] font-medium">{t('nav_tests') || 'Testlar'}</span>
          </button>
          <button
            onClick={() => handleTabChange('ai-tutor')}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${activeTab === 'ai-tutor' ? 'text-teal-600 dark:text-teal-400' : 'theme-muted'
              }`}
          >
            <Zap size={20} />
            <span className="text-[10px] font-medium">{t('nav_ai_tutor') || 'AI Ustoz'}</span>
          </button>
          <button
            onClick={() => handleTabChange('profile')}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${activeTab === 'profile' ? 'text-blue-500' : 'theme-muted'
              }`}
          >
            <User size={20} />
            <span className="text-[10px] font-medium">{t('nav_profile') || 'Profil'}</span>
          </button>
        </div>
      </nav>

    </div>
  );
}

// --- ANNOUNCEMENT BANNERS ---
const ANN_STYLES = {
  info: { bg: 'bg-blue-600 dark:bg-blue-500/10', border: 'border-blue-700 dark:border-blue-500/30', icon: 'ℹ️', text: 'text-white-fixed dark:text-blue-300', body: 'text-white-fixed/80 dark:theme-muted', close: 'text-white-fixed/60 dark:theme-muted' },
  success: { bg: 'bg-emerald-600 dark:bg-emerald-500/10', border: 'border-emerald-700 dark:border-emerald-500/30', icon: '✅', text: 'text-white-fixed dark:text-emerald-300', body: 'text-white-fixed/80 dark:theme-muted', close: 'text-white-fixed/60 dark:theme-muted' },
  warning: { bg: 'bg-amber-500 dark:bg-yellow-500/10', border: 'border-amber-600 dark:border-yellow-500/30', icon: '⚠️', text: 'text-white-fixed dark:text-yellow-300', body: 'text-white-fixed/90 dark:theme-muted', close: 'text-white-fixed/70 dark:theme-muted' },
  error: { bg: 'bg-red-600 dark:bg-red-500/10', border: 'border-red-700 dark:border-red-500/30', icon: '🔴', text: 'text-white-fixed dark:text-red-300', body: 'text-white-fixed/80 dark:theme-muted', close: 'text-white-fixed/60 dark:theme-muted' },
};
function AnnouncementBanners({ announcements = [], onDismiss }) {
  const navigate = useNavigate();
  if (!announcements.length) return null;
  return (
    <div className="space-y-2 mb-5">
      {announcements.map(ann => {
        // Live Test — maxsus banner endi faqat Testlar (Live Hub) sahifasida ko'rinadi
        if (ann.type === 'live_test') {
          return null;
        }

        // Oddiy e'lonlar
        const s = ANN_STYLES[ann.type] || ANN_STYLES.info;
        return (
          <div key={ann.id}
            className={`flex items-start justify-between gap-3 p-3.5 rounded-xl border ${s.bg} ${s.border} animate-slideInDown`}>
            <div className="flex items-start gap-3">
              <span className="text-lg flex-shrink-0 mt-0.5">{s.icon}</span>
              <div>
                <p className={`font-semibold text-sm ${s.text}`}>{ann.title}</p>
                {ann.body && <p className={`${s.body} text-xs mt-0.5 leading-relaxed`}>{ann.body}</p>}
              </div>
            </div>
            <button onClick={() => onDismiss(ann.id)}
              className={`${s.close} hover:text-white-fixed dark:hover:theme-text transition-colors flex-shrink-0 mt-0.5 text-lg leading-none`}>
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}

// --- AI CHAT ASSISTANT COMPONENT ---
function AIAssistant({ apiKey, setShowSettings, isOpen: externalIsOpen, setIsOpen: externalSetIsOpen }) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalSetIsOpen || setInternalIsOpen;
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Salom! Men NurFizika AI ustoziman. Menga dars bo'yicha har qanday savol berishingiz mumkin. ⚛️" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
        const timer = setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return () => clearTimeout(timer);
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const { generateChat } = await import('../services/geminiClient');
      const text = await generateChat(userMsg, messages);
      setMessages(prev => [...prev, { role: 'ai', text }]);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMessage = error.message?.includes('429')
        ? "Juda ko'p so'rovlar. Bir oz kuting. 🔄"
        : "Xatolik yuz berdi. Qaytadan urining.";
      setMessages(prev => [...prev, { role: 'ai', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] md:w-[450px] theme-card rounded-2xl shadow-2xl border-2 border-teal-500/20 overflow-hidden flex flex-col h-[600px] animate-scaleIn origin-bottom-right pointer-events-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-2">
              <Bot className="text-white" size={20} />
              <h3 className="font-bold text-white">{t("dash_ai_tutor") || "NurFizika AI"}</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors"><X size={20} /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 theme-bg custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} `}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                  ? 'bg-teal-600 text-white rounded-br-none shadow-lg shadow-teal-500/20'
                  : 'theme-surface theme-text rounded-bl-none shadow-md border theme-border'
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="theme-surface border theme-border p-3.5 rounded-2xl rounded-bl-none flex space-x-1.5 items-center shadow-sm">
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 theme-card border-t-2 theme-border flex space-x-3 shadow-[0_-4px_15px_rgba(0,0,0,0.05)]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Savol bering..."
              className="flex-1 theme-input border-2 border-teal-500/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all placeholder:theme-muted theme-text"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-3 bg-teal-600 rounded-xl hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white shadow-lg shadow-teal-500/20 active:scale-95"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto group relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-teal-600 to-emerald-600 text-white shadow-xl shadow-teal-500/40 hover:scale-110 transition-all duration-300 active:scale-95 border-2 border-white/20"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}

        {!isOpen && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 theme-card animate-pulse shadow-md"></span>
        )}
      </button>
    </div>
  );
}

// 3. MUKAMMAL VIRTUAL LABORATORIYA (AI Tahlil bilan)
// 3. MUKAMMAL VIRTUAL LABORATORIYA (Modulli)
function VirtualLab({ addNotification, setShowSettings, updateStats }) {
  const { t } = useLanguage();
  const [activeModule, setActiveModule] = useState('home'); // home, ohm, newton

  // Module Selection Screen
  if (activeModule === 'home') {
    return (
      <div className="space-y-6 animate-fadeIn pb-12">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center gap-2 theme-text">
            <Zap className="text-yellow-400" />
            {t("dash_lab_title") || "Virtual Laboratoriya"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Module 1: Ohm's Law */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveModule('ohm')}
            className="theme-card rounded-2xl p-6 border theme-border cursor-pointer hover:border-teal-500 transition-colors group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap size={100} />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-4 text-teal-500 dark:text-teal-400">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold theme-text mb-2">{t("dash_lab_ohm_title") || "Elektr toki (Om qonuni)"}</h3>
              <p className="theme-muted text-sm mb-4">
                Tok kuchi, kuchlanish va qarshilik orasidagi bog'liqlikni o'rganing.
              </p>
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-medium text-sm">
                Tajribani boshlash <ArrowRight size={16} />
              </div>
            </div>
          </motion.div>

          {/* Module 2: Newton's Law */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveModule('newton')}
            className="theme-card rounded-2xl p-6 border theme-border cursor-pointer hover:border-green-500 transition-colors group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Activity size={100} />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 text-green-400">
                <Activity size={24} />
              </div>
              <h3 className="text-xl font-bold theme-text mb-2">{t('dash_lab_newton_title') || "Mexanika (Nyuton qonuni)"}</h3>
              <p className="theme-muted text-sm mb-4">
                Kuch, massa va tezlanish. Harakat qonunlarini interaktiv o'rganing.
              </p>
              <div className="flex items-center gap-2 text-green-400 font-medium text-sm">
                Tajribani boshlash <ArrowRight size={16} />
              </div>
            </div>
          </motion.div>

          {/* Module 3: Coming Soon - Optics */}
          <div className="theme-card rounded-2xl p-6 border theme-border opacity-60">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 text-purple-400">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-bold theme-text mb-2">{t('dash_lab_optics_title') || "Optika"}</h3>
            <p className="theme-muted text-sm mb-4">
              Yorug'lik, linzalar va ko'zgular. Tez kunda...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => setActiveModule('home')}
        className="flex items-center gap-2 theme-muted hover:theme-text transition-colors mb-2"
      >
        <ArrowRight className="rotate-180" size={20} />
        {t("dash_lab_all") || "Barcha tajribalar"}
      </button>

      {activeModule === 'ohm' && (
        <Suspense fallback={<ComponentLoader />}>
          <OhmLawLab addNotification={addNotification} updateStats={updateStats} />
        </Suspense>
      )}

      {activeModule === 'newton' && (
        <Suspense fallback={<ComponentLoader />}>
          <NewtonsLawLab addNotification={addNotification} updateStats={updateStats} />
        </Suspense>
      )}
    </div>
  );
}




// --- VIDEO CONTENT COMPONENT ---
function VideoContent({ url }) {
  const { t } = useLanguage();
  if (!url) {
    return (
      <div className="w-full aspect-video bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5" />
        <div className="text-center p-6 relative z-10 flex flex-col items-center">
            <div className="animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 p-5 rounded-full mb-4 relative shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                    <div className="absolute inset-0 rounded-full animate-ping bg-red-500/20 opacity-75" style={{ animationDuration: '2s' }} />
                    <Video size={36} className="text-red-500 relative z-10" />
                </div>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 flex items-center gap-2">
                {t("dash_video_loading") || "Tez kunda!"}
                <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                </span>
            </h3>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">
                {t("lesson_video_desc_soon") || "Ushbu mavzu uchun maxsus video dars tayyorlanmoqda. Tez orada tomosha qilishingiz mumkin bo'ladi."}
            </p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-slate-700">
      <iframe
        src={url}
        title="Video dars"
        className="w-full h-full"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
}

// --- MUKAMMAL AI TEST TUZUVCHI (Quiz) ---
function QuizModule({ setUserXP, addNotification, setShowSettings, updateStats }) {
  const { t } = useLanguage();
  // Boshlang'ich (default) savollar
  const defaultQuestions = [
    { id: 1, q: "Elektr zanjirida kuchlanishni o'lchovchi asbob nima?", options: ["Ampermetr", "Voltmetr", "Ommetr", "Reostat"], ans: 1 },
    { id: 2, q: "Om qonunining to'g'ri formulasi qaysi?", options: ["I = U * R", "R = I / U", "I = U / R", "U = I / R"], ans: 2 },
    { id: 3, q: "Qarshilik birligi nima?", options: ["Amper", "Volt", "Om", "Joul"], ans: 2 },
  ];

  const [questions, setQuestions] = useState(defaultQuestions);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // AI Generator States
  const [topic, setTopic] = useState("");
  const [mode, setMode] = useState('menu'); // 'menu' | 'quiz'
  // useGeminiAI hook — barcha AI mantiq shu yerda, re-renderdan ta'sirlanmaydi
  const { isLoading: isGenerating, generateQuiz: aiGenerateQuiz } = useGeminiAI();

  // AI quiz — faqat UI logikasi bu yerda, AI mantiq hook ichida
  const generateQuiz = useCallback(async () => {
    if (!topic.trim()) {
      addNotification(t('dash_quiz_notif_empty') || "Iltimos, test mavzusini yozing!", "warning");
      return;
    }
    const newQuestions = await aiGenerateQuiz(topic);
    if (newQuestions) {
      setQuestions(newQuestions);
      setMode('quiz');
      setCurrentQ(0);
      setScore(0);
      setShowResult(false);
      addNotification(t('dash_quiz_notif_success') || "Test muvaffaqiyatli tuzildi!", "success");
    } else {
      addNotification(t('dash_quiz_notif_error') || "Test tuzishda xatolik. Qaytadan urinib ko'ring.", "error");
    }
  }, [topic, aiGenerateQuiz, addNotification]);

  const handleAnswer = (index) => {
    setSelectedOption(index);
    setTimeout(() => {
      const isCorrect = index === questions[currentQ].ans;
      if (isCorrect) setScore(score + 1);

      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
        const finalScore = isCorrect ? score + 1 : score;
        const bonusXP = finalScore * 50;
        setUserXP(prev => prev + bonusXP);
        addNotification(t('dash_quiz_notif_xp')?.replace('{xp}', bonusXP) || `Tabriklaymiz! +${bonusXP} XP qo'shildi!`, 'success');

        if (updateStats) {
          const percentage = Math.round((finalScore / questions.length) * 100);
          updateStats(percentage);
        }
      }
    }, 800);
  };

  const resetQuiz = () => {
    setMode('menu');
    setQuestions(defaultQuestions);
    setTopic("");
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  // 1. MENU REJIMI (Mavzu tanlash)
  if (mode === 'menu') {
    return (
      <div className="max-w-2xl mx-auto mt-10 space-y-8 animate-fadeIn">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-tr from-teal-600 to-emerald-600 rounded-2xl mx-auto flex items-center justify-center shadow-xl">
            <Brain size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold theme-text">{t("dash_quiz_ai_builder") || "AI Test Tuzuvchi"}</h2>
          <p className="theme-muted">{t('dash_quiz_ai_desc') || "Sun'iy intellekt yordamida o'zingiz istagan mavzuda bilimingizni sinang."}</p>
        </div>

        <div className="theme-card p-8 rounded-3xl border theme-border shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <Sparkles size={120} />
          </div>

          <label className="block text-sm font-medium theme-muted mb-3 ml-1">{t("dash_quiz_input_label") || "Mavzuni kiriting (yoki tanlang)"}</label>
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={t("dash_quiz_input_placeholder") || "Masalan: optika, atom fizikasi, magnit..."}
              className="w-full theme-input border theme-border rounded-xl py-4 pl-12 pr-4 theme-text placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { id: "Kinematika", label: t("topic_kinematics") || "Kinematika" },
              { id: "Dinamika", label: t("topic_dynamics") || "Dinamika" },
              { id: "Molekulyar fizika", label: t("topic_molecular_physics") || "Molekulyar fizika" },
              { id: "Tok qonunlari", label: t("topic_laws_of_current") || "Tok qonunlari" },
              { id: "Yorug'lik", label: t("topic_optics") || "Yorug'lik" },
              { id: "Kvant fizikasi", label: t("topic_quantum_physics") || "Kvant fizikasi" }
            ].map(tag => (
              <button
                key={tag.id}
                onClick={() => setTopic(tag.id)}
                className="px-3 py-1 theme-card border theme-border hover:border-teal-500 rounded-lg text-sm theme-muted transition-colors"
              >
                {tag.label}
              </button>
            ))}
          </div>

          <button
            onClick={generateQuiz}
            disabled={isGenerating}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold text-lg shadow-lg shadow-blue-600/20 transform transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader className="animate-spin" />
                <span className="animate-pulse">{t("dash_quiz_ai_generating") || "AI savollar tuzmoqda..."}</span>
              </>
            ) : (
              <>
                <Sparkles />
                {t('dash_quiz_start_btn') || "Testni boshlash"}
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // 2. NATIJA OYNASI
  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-8 animate-fadeIn">
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-500 blur-3xl opacity-20 animate-pulse"></div>
          <Trophy size={100} className="text-yellow-400 relative z-10 drop-shadow-2xl" />
        </div>

        <div>
          <h2 className="text-4xl font-bold theme-text mb-2">{t("dash_quiz_result_label") || "Natija:"} {percentage}%</h2>
          <p className="theme-muted">{t("dash_quiz_result_desc")?.replace("{total}", questions.length).replace("{score}", score) || `Siz ${questions.length} ta savoldan ${score} tasiga to'g'ri javob berdingiz.`}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          <div className="theme-card p-4 rounded-xl border theme-border">
            <div className="text-green-500 font-bold text-xl">+{score * 50}</div>
            <div className="text-xs theme-muted">{t("dash_quiz_xp_points") || "XP ballar"}</div>
          </div>
          <div className="theme-card p-4 rounded-xl border theme-border">
            <div className="text-blue-500 font-bold text-xl">{score}</div>
            <div className="text-xs theme-muted">{t('dash_quiz_correct_ans') || "To'g'ri javob"}</div>
          </div>
        </div>

        <button onClick={resetQuiz} className="flex items-center space-x-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-600/30 hover:-translate-y-1">
          <RotateCcw size={18} /> <span>{t("dash_quiz_retry") || "Boshqa test yechish"}</span>
        </button>
      </div>
    );
  }

  // 3. TEST JARAYONI
  return (
    <div className="max-w-3xl mx-auto mt-6 animate-fadeIn">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm theme-muted font-medium">{t("dash_quiz_topic") || "Mavzu: "}<span className="theme-text">{topic || t("dash_quiz_general") || "Umumiy fizika"}</span></span>
          <span className="font-mono font-bold text-blue-500">{currentQ + 1}/{questions.length}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
          <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${((currentQ) / questions.length) * 100}%` }}></div>
        </div>
      </div>

      <div className="theme-card p-8 rounded-3xl border theme-border shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <Brain size={100} className="theme-text" />
        </div>

        <h3 className="text-2xl theme-text mb-8 font-medium relative z-10 leading-relaxed">{questions[currentQ].q}</h3>

        <div className="space-y-3 relative z-10">
          {questions[currentQ].options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === questions[currentQ].ans;
            let btnClass = "theme-surface hover:theme-bg theme-text border theme-border";
            if (selectedOption !== null) {
              if (isSelected && isCorrect) btnClass = "bg-green-600 text-white border-green-400 ring-2 ring-green-500/50";
              else if (isSelected && !isCorrect) btnClass = "bg-red-600 text-white border-red-400";
              else btnClass = "theme-surface opacity-50 cursor-not-allowed border theme-border theme-text";
            } else {
              btnClass = "theme-surface hover:bg-blue-600 hover:text-white border theme-border theme-text hover:shadow-lg hover:-translate-y-0.5";
            }

            return (
              <button
                key={idx}
                disabled={selectedOption !== null}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left p-5 rounded-xl transition-all duration-200 flex justify-between items-center border border-transparent ${btnClass}`}
              >
                <span className="font-medium text-lg">{opt}</span>
                {isSelected && isCorrect && <CheckCircle size={20} className="animate-scaleIn" />}
                {isSelected && !isCorrect && <AlertCircle size={20} className="animate-scaleIn" />}
                {!isSelected && <ChevronRight size={20} className="opacity-0 group-hover:opacity-100" />}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-4 text-center">
        <button onClick={resetQuiz} className="text-slate-400 hover:text-white text-sm underline">{t("dash_quiz_stop") || "Testni to'xtatish"}</button>
      </div>
    </div>
  );
}

// 5. PROFIL
function UserProfile({ user, userXP, userLevel, userStats = { timeSpent: 0, testsSolved: 0, totalScore: 0 }, completedLessons = [], totalLessons = 24 }) {
  const { t } = useLanguage();
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(user?.displayName);

  // Calculate dynamic stats
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;
  const labCount = userStats?.completedLabs || 0;

  // Unlock achievements based on stats
  const achievements = [
    { id: 'first_step', title: "Birinchi Qadam", icon: <Zap />, unlocked: true },
    { id: 'om_law', title: "Om qonuni", icon: <Atom />, unlocked: labCount >= 1 },
    { id: 'quiz_master', title: "Test Ustasi", icon: <Brain />, unlocked: (userStats?.testsSolved || 0) >= 5 },
    { id: 'week_streak', title: "7 Kunlik", icon: <Flame />, unlocked: false },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl border-4 border-white/20 overflow-hidden">
              {user?.photoURL ? (
                <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
              ) : (
                initials
              )}
            </div>
            <div className="absolute bottom-2 right-2 bg-yellow-400 text-black font-bold px-3 py-1 rounded-full text-xs shadow-lg border border-white">PRO</div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold text-white mb-2">{user?.displayName || "Foydalanuvchi"}</h2>
            <p className="text-blue-100 mb-4 flex items-center justify-center md:justify-start gap-2">
              <Award size={18} /> 9-sinf o'quvchisi | bo'lajak muhandis
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <Badge label={`Level ${userLevel}`} color="bg-white/20 text-white" />
              <Badge label={`${userXP} XP`} color="bg-yellow-500 text-black font-bold" />
              <Badge label="Top 5%" color="bg-green-500/20 text-green-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="theme-card p-6 rounded-2xl border theme-border hover:border-blue-500/50 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 dark:text-blue-400"><Trophy size={24} /></div>
            <span className="text-xs font-bold theme-muted bg-gray-200 dark:bg-slate-900 px-2 py-1 rounded-lg">LEVEL {userLevel}</span>
          </div>
          <div className="text-3xl font-bold theme-text mb-1">{userXP}</div>
          <div className="text-sm theme-muted">{t("dash_profile_tot_xp") || "Umumiy XP ballar"}</div>
        </div>
        <div className="theme-card p-6 rounded-2xl border theme-border hover:border-green-500/50 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-500/10 rounded-xl text-green-500 dark:text-green-400"><Book size={24} /></div>
            <span className="text-xs font-bold theme-muted bg-gray-200 dark:bg-slate-900 px-2 py-1 rounded-lg">6 BOB</span>
          </div>
          <div className="text-3xl font-bold theme-text mb-1">{progressPercent}%</div>
          <div className="text-sm theme-muted">{t("dash_profile_progress") || "Kurs progressi"}</div>
        </div>
        <div className="theme-card p-6 rounded-2xl border theme-border hover:border-purple-500/50 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500 dark:text-purple-400"><Zap size={24} /></div>
            <span className="text-xs font-bold theme-muted bg-gray-200 dark:bg-slate-900 px-2 py-1 rounded-lg">LAB</span>
          </div>
          <div className="text-3xl font-bold theme-text mb-1">{labCount}</div>
          <div className="text-sm theme-muted">{t("dash_profile_labs_done") || "Bajarilgan lablar"}</div>
        </div>
        <div className="theme-card p-6 rounded-2xl border theme-border hover:border-yellow-500/50 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-500 dark:text-yellow-400"><Award size={24} /></div>
            <span className="text-xs font-bold theme-muted bg-gray-200 dark:bg-slate-900 px-2 py-1 rounded-lg">Yutuqlar</span>
          </div>
          <div className="text-3xl font-bold theme-text mb-1">{unlockedCount}/10</div>
          <div className="text-sm theme-muted">{t("dash_profile_achievs_done") || "Ochilgan yutuqlar"}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 theme-card rounded-2xl p-6 border theme-border">
          <h3 className="text-xl theme-text font-bold mb-6 flex items-center gap-2"><Trophy className="text-yellow-500" />{t("dash_profile_my_achievs") || " Yutuqlarim"}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {achievements.map(ach => (
              <AchievementCard key={ach.id} title={ach.title} icon={ach.icon} unlocked={ach.unlocked} />
            ))}
          </div>
        </div>
        <div className="theme-card rounded-2xl p-6 border theme-border">
          <h3 className="text-xl theme-text font-bold mb-6">{t("dash_profile_stats") || "Statistika"}</h3>
          <ul className="space-y-4">
            <StatRow label={t("dash_profile_time_spent") || "O'qilgan vaqt"} value={(function (s) {
              if (!s) return "0m";
              const h = Math.floor(s / 3600);
              const m = Math.floor((s % 3600) / 60);
              if (h > 0) return `${h}s ${m}m`;
              return `${m}m`;
            })(userStats.timeSpent)} />
            <StatRow label={t("dash_profile_tests_solved") || "Yechilgan testlar"} value={`${userStats.testsSolved || 0} ta`} />
            <StatRow
              label={t("dash_profile_avg_score") || "O'rtacha baho"}
              value={`${userStats.testsSolved ? Math.round(userStats.totalScore / userStats.testsSolved) : 0}%`}
              color={
                (userStats.testsSolved ? Math.round(userStats.totalScore / userStats.testsSolved) : 0) >= 80 ? "text-green-600 dark:text-green-400" :
                  (userStats.testsSolved ? Math.round(userStats.totalScore / userStats.testsSolved) : 0) >= 50 ? "text-yellow-600 dark:text-yellow-400" : "text-red-600 dark:text-red-400"
              }
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

function Badge({ label, color }) { return <span className={`px-4 py-1.5 rounded-lg text-sm backdrop-blur-sm ${color}`}>{label}</span> }
function AchievementCard({ title, icon, unlocked }) {
  return (
    <motion.div 
      whileHover={unlocked ? { y: -5, scale: 1.05 } : {}}
      className={`aspect-square rounded-xl flex flex-col items-center justify-center p-4 text-center border transition-all duration-300 ${unlocked ? 'bg-gradient-to-br from-teal-50/50 to-emerald-50/50 dark:from-slate-700 dark:to-slate-800 theme-border theme-text hover:border-teal-500 cursor-pointer shadow-md' : 'theme-surface theme-border theme-muted grayscale opacity-60'}`}
    >
      <div className={`mb-3 p-3 rounded-full transition-transform duration-300 ${unlocked ? 'bg-teal-500/20 text-teal-600 dark:text-teal-400 group-hover:scale-110' : 'bg-gray-200 dark:bg-slate-800'}`}>{icon}</div>
      <span className="text-xs font-bold">{title}</span>
    </motion.div>
  )
}
function StatRow({ label, value, color = "theme-text" }) {
  return (
    <li className="flex justify-between items-center pb-3 border-b theme-border last:border-0">
      <span className="theme-muted text-sm">{label}</span>
      <span className={`font-mono font-bold ${color}`}>{value}</span>
    </li>
  )
}


// --- DASHBOARD COMPONENT ---
function Dashboard({ setActiveTab, setTargetChapter, userXP, userLevel, userStats, completedLessons = [], totalLessons = 24, announcements, dismissAnnouncement }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { totalXP } = useXP();
  const navigate = useNavigate();

  // Real data from Firebase/props
  const [todayXP, setTodayXP] = useState(0);
  const [currentStreak, setStreak] = useState(0);
  const [todayLessons, setTodayLessons] = useState(0);

  // Fetch today's XP from xpLogs and streak from users collection
  useEffect(() => {
    if (!user?.uid) return;
    // Streak from user doc
    const userRef = doc(db, 'users', user.uid);
    const unsub = onSnapshot(userRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setStreak(data.streak || 0);
        // Count completedLessons added today
        const today = new Date().toDateString();
        const todayCount = (data.completedLessons || []).filter(l => {
          // If stored as {id, date} object
          if (l && typeof l === 'object' && l.date) {
            return new Date(l.date).toDateString() === today;
          }
          return false;
        }).length;
        setTodayLessons(todayCount || completedLessons.length);
      }
    });

    // Today's XP from xpLogs
    const logsRef = collection(db, 'xpLogs', user.uid, 'logs');
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
    const q = query(logsRef, where('timestamp', '>=', todayStart));
    const unsubLogs = onSnapshot(q, (snap) => {
      const sum = snap.docs.reduce((acc, d) => acc + (d.data().amount || 0), 0);
      setTodayXP(sum);
    });

    return () => { unsub(); unsubLogs(); };
  }, [user?.uid, completedLessons.length]);

  const todayTime = userStats?.timeSpent || 0; // seconds

  // Format time
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}s ${minutes}d`;
    return `${minutes}d ${seconds % 60}s`;
  };


  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("dash_greeting_morning") || "Xayrli tong";
    if (hour < 18) return t("dash_greeting_day") || "Xayrli kun";
    return t("dash_greeting_evening") || "Xayrli kech";
  };

  // Recent activities — real-time from xpLogs Firestore
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;
    const logsRef = collection(db, 'xpLogs', user.uid, 'logs');
    const q = query(logsRef, orderBy('timestamp', 'desc'), limit(6));
    const unsub = onSnapshot(q, (snap) => {
      const REASON_META = {
        LESSON_COMPLETE: { title: "Darsni tugatdingiz", icon: CheckCircle, color: 'green' },
        TEST_COMPLETE: { title: "Testni tugatdingiz", icon: Trophy, color: 'yellow' },
        LAB_COMPLETE: { title: "Laboratoriya", icon: Zap, color: 'purple' },
        DAILY_LOGIN: { title: "Kunlik kirish", icon: Activity, color: 'teal' },
        PERFECT_SCORE: { title: "Mukammal natija!", icon: Award, color: 'orange' },
        MISSION_DAILY: { title: "Kunlik missiya", icon: Target, color: 'indigo' },
        MISSION_WEEKLY: { title: "Haftalik missiya", icon: TrendingUp, color: 'indigo' },
        ACHIEVEMENT: { title: "Yutuq ochildi!", icon: Award, color: 'orange' },
        AI_MESSAGE: { title: "AI Ustoz suhbati", icon: Brain, color: 'teal' },
        mission_complete: { title: "Missiya bajarildi", icon: CheckCircle, color: 'green' },
        FORMULA_LEARNED: { title: "Formulalar", icon: Zap, color: 'teal' },
      };
      const items = snap.docs.map((d) => {
        const data = d.data();
        let meta = REASON_META[data.reason];
        
        if (!meta && data.reason) {
          if (data.reason.startsWith('live_rank_')) {
            const rank = parseInt(data.reason.replace('live_rank_', ''), 10);
            const rankText = !isNaN(rank) && rank > 0 ? `${rank}-o'rin` : 'Ishtirokchi';
            meta = { title: `Live Test: ${rankText}`, icon: Trophy, color: 'yellow' };
          } else if (data.reason.startsWith('homework_')) {
            const type = data.reason.replace('homework_', '');
            meta = { title: `Uy vazifasi (${type})`, icon: BookOpen, color: 'green' };
          }
        }
        
        meta = meta || { title: data.reason || 'Faoliyat', icon: Zap, color: 'blue' };
        const ts = data.timestamp?.toDate?.() || new Date();
        const diffMs = Date.now() - ts;
        const diffMin = Math.floor(diffMs / 60000);
        const diffHour = Math.floor(diffMs / 3600000);
        const diffDay = Math.floor(diffMs / 86400000);
        const timeStr = diffMin < 1 ? 'Hozir'
          : diffMin < 60 ? `${diffMin} daqiqa oldin`
            : diffHour < 24 ? `${diffHour} soat oldin`
              : `${diffDay} kun oldin`;
        return { icon: meta.icon, title: meta.title, description: `+${data.amount} XP`, time: timeStr, xp: data.amount, color: meta.color };
      });
      setRecentActivities(items);
    });
    return unsub;
  }, [user?.uid]);

  return (
    <div className="space-y-8 pb-8">
      {/* Welcome Header — corporate banner */}
      <motion.div 
        whileHover={{ y: -2 }}
        className="theme-card-premium rounded-3xl p-8 relative overflow-hidden group shadow-lg"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-teal-500/10 transition-colors duration-500" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/5 rounded-full -ml-24 -mb-24 blur-3xl" />
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400 border border-teal-500/20">
                    <Sparkles size={20} />
                </div>
                <h2 className="text-[28px] md:text-[34px] font-black theme-text tracking-tight leading-tight">
                  {getGreeting()}! 👋
                </h2>
            </div>
            <p className="theme-text-secondary text-[16px] md:text-[17px] font-medium opacity-90 max-w-lg">
              {t("dash_lessons_done_1") || "Bugun"}{" "}
              <span className="text-teal-600 dark:text-teal-400 font-bold underline decoration-teal-500/30 underline-offset-4">{todayLessons}</span>{" "}
              {t("dash_lessons_done_2") || "ta dars tugatdingiz - ajoyib ish!"}
            </p>
          </div>

          {/* Level + XP progress */}
          <div className="sm:text-right shrink-0 bg-teal-500/5 dark:bg-teal-500/10 p-5 rounded-2xl border border-teal-500/10 backdrop-blur-sm min-w-[200px]">
            <div className="flex items-center sm:justify-end gap-3 mb-3">
              <div className="px-3 py-1.5 rounded-lg bg-teal-500 text-white text-[12px] font-black uppercase tracking-widest shadow-lg shadow-teal-500/20">
                Level {userLevel}
              </div>
              <span className="theme-text font-bold text-lg">{totalXP.toLocaleString()} <span className="text-xs theme-muted uppercase tracking-tighter">XP</span></span>
            </div>
            {/* XP progress bar towards next level */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold theme-muted uppercase tracking-wider">
                <span>Progress</span>
                <span>{Math.round(((totalXP % 1000) / 1000) * 100)}%</span>
              </div>
              <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-teal-500/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(((totalXP % 1000) / 1000) * 100, 100)}%` }}
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.3)]"
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
              <p className="text-[10px] theme-muted font-medium text-center italic">
                Keyingi darajaga {1000 - (totalXP % 1000)} XP qoldi
              </p>
            </div>
          </div>
        </div>
      </motion.div>



      {/* Today's Statistics */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-blue-500 to-cyan-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]" />
          <h3 className="text-2xl font-black theme-text tracking-tight uppercase tracking-widest text-[14px]">
            {t("dash_today_stats") || "Bugungi statistika"}
          </h3>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-blue-500/20 to-transparent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            icon={Zap}
            label={t("dash_added_today") || "Bugun qo'shildi"}
            value={`${todayXP}`}
            subtitle="XP"
            trend={`+${todayXP}`}
            color="blue"
          />
          <StatsCard
            icon={CheckCircle}
            label={t("dash_completed") || "Tugatilgan"}
            value={todayLessons}
            subtitle={t("dash_lessons_label") || "dars"}
            color="green"
          />
          <StatsCard
            icon={BarChart2}
            label={t("dash_study_time") || "O'qish vaqti"}
            value={formatTime(todayTime)}
            subtitle={t("dash_today_label") || "bugun"}
            trend="+2s"
            color="orange"
          />
          <StatsCard
            icon={Flame}
            label={t("dash_streak") || "Seriya"}
            value={`${currentStreak} kun`}
            subtitle={t("dash_consec_days") || "ketma-ket"}
            color="yellow"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-purple-500 to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]" />
          <h3 className="text-2xl font-black theme-text tracking-tight uppercase tracking-widest text-[14px]">
            {t("dash_quick_actions") || "Tezkor harakatlar"}
          </h3>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-purple-500/20 to-transparent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <QuickActionCard
            icon={BookOpen}
            title={t("nav_lessons") || "Darsliklar"}
            description={t('dash_qa_lessons_desc') || "Fizika mavzularini o'rgan"}
            color="blue"
            onClick={() => navigate('/darsliklar')}
          />
          <QuickActionCard
            icon={Library}
            title={t("nav_library") || "Kutubxona"}
            description={t("dash_qa_lib_desc") || "Qo'shimcha materiallar"}
            color="indigo"
            onClick={() => navigate('/kutubxona')}
          />
          <QuickActionCard
            icon={Zap}
            title={t("nav_lab") || "Laboratoriya"}
            description={t('dash_qa_lab_desc') || "Virtual tajribalar o'tkazing"}
            color="yellow"
            onClick={() => navigate('/laboratoriya')}
          />
          <QuickActionCard
            icon={Trophy}
            title={t("nav_livetest") || "Live Test"}
            description={t("dash_qa_test_desc") || "Realtime musobaqa"}
            color="orange"
            onClick={() => navigate('/testlar')}
          />
          <QuickActionCard
            icon={Target}
            title={t("nav_missions") || "Missiyalar"}
            description={t("dash_qa_missions_desc") || "Kunlik vazifalarni bajaring"}
            color="green"
            onClick={() => navigate('/missiyalar')}
          />
          <QuickActionCard
            icon={MessageSquare}
            title={t("dash_ai_tutor") || "AI Ustoz"}
            description={t("dash_qa_ai_desc") || "Savollaringizga javob oling"}
            color="purple"
            onClick={() => setActiveTab('ai-tutor')}
          />
          <QuickActionCard
            icon={Brain}
            title={t("nav_tests") || "AI Testlar"}
            description={t("dash_qa_quiz_desc") || "Bilimingizni sinab ko'ring"}
            color="pink"
            onClick={() => setActiveTab('quiz')}
          />
          <QuickActionCard
            icon={FlaskConical}
            title={t("nav_formulas") || "Formulalar"}
            description={t("dash_qa_formulas_desc") || "Barcha fizika formulalari"}
            color="emerald"
            onClick={() => navigate('/formulalar')}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
          <h3 className="text-2xl font-black theme-text tracking-tight uppercase tracking-widest text-[14px]">
            {t('dash_recent_activity') || "So'nggi faoliyat"}
          </h3>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-emerald-500/20 to-transparent" />
        </div>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <ActivityItem
              key={index}
              icon={activity.icon}
              title={activity.title}
              description={activity.description}
              time={activity.time}
              xp={activity.xp}
              color={activity.color}
              index={index}
            />
          ))}
        </div>
      </div>


      {/* AI Recommendations */}
      <div>
        <h3 className="text-xl font-bold theme-text mb-4 flex items-center gap-2">
          <Sparkles className="text-purple-500" />
          {t("dash_ai_recs") || "AI shaxsiy tavsiyalar"}
        </h3>
        <AIRecommendations
          userStats={userStats}
          completedLessons={completedLessons}
          userLevel={userLevel}
          theme="dark"
        />
      </div>
    </div>
  );
}

// --- SIDEBAR ITEM COMPONENT ---
function SidebarItem({ icon, label, id, active, set }) {
  const isActive = active === id;

  return (
    <button
      onClick={() => set(id)}
      className={`
        w-full flex items-center gap-3 px-4 py-3 mb-1.5 rounded-xl
        transition-all duration-200 group relative overflow-hidden outline-none
        ${isActive
          ? 'bg-gradient-to-r from-teal-500/15 to-transparent border border-teal-500/20 text-teal-600 dark:text-teal-400 font-bold shadow-sm'
          : 'bg-transparent hover:bg-teal-500/5 html.light:hover:bg-teal-500/8 text-slate-600 dark:text-slate-400 hover:text-teal-700 dark:hover:text-teal-300 border border-transparent hover:border-teal-500/15 hover:shadow-sm hover:-translate-y-px'
        }
      `}
    >
      {/* Active left indicator bar */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-teal-500 rounded-r-full shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
      )}

      {/* Hover shimmer sweep */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out bg-gradient-to-r from-transparent via-teal-500/5 to-transparent pointer-events-none" />

      {/* Icon */}
      <div className={`
        flex-shrink-0 transition-all duration-200 relative z-10
        ${isActive
          ? 'scale-110 text-teal-500 drop-shadow-[0_0_5px_rgba(20,184,166,0.4)]'
          : 'group-hover:scale-110 group-hover:text-teal-500 group-hover:drop-shadow-[0_0_4px_rgba(20,184,166,0.3)]'
        }
      `}>
        {React.cloneElement(icon, { size: 20 })}
      </div>

      {/* Label */}
      <span className={`text-[14px] tracking-wide relative z-10 transition-all duration-200 ${isActive ? 'font-bold' : 'font-medium group-hover:translate-x-0.5'}`}>
        {label}
      </span>
      
      {/* Active glow */}
      {isActive && (
        <div className="absolute inset-y-0 left-0 w-24 bg-teal-500/10 blur-2xl rounded-full pointer-events-none" />
      )}
    </button>
  );
}

// --- DASHBOARD PAGE EXPORT ---
export default function DashboardPage() {
  const { t } = useLanguage();
  return (
    <ErrorBoundary t={t}>
      <EduPhysicsAppContent />
    </ErrorBoundary>
  );
}