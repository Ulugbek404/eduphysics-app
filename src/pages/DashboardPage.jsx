import React, { useState, useEffect, useMemo, useRef, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Book, Atom, Brain, Trophy, User, ChevronRight, Play,
  RotateCcw, Menu, X, CheckCircle, AlertCircle, BarChart2,
  Zap, Flame, Award, ArrowRight, Settings, MessageSquare,
  Info, Smartphone, Moon, Sun, Monitor, Volume2, VolumeX, Palette, Camera, Sparkles,
  Send, Loader, Bot, Key, Search, LogOut, BookOpen, Clock, TrendingUp, Activity, Library, Target
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, collection, onSnapshot, query, where, orderBy, limit } from 'firebase/firestore';
import { getUserProgress, addUserXP, updateUserLevel, markLessonComplete, saveQuizResult } from '../services/userService';
import { lessonsData, calculateChapterProgress } from '../data/lessonsData';
import { testsData } from '../data/testsData';
import AIRecommendations from '../components/AIRecommendations';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { askAITutor } from '../services/aiService';
import BottomNav from '../components/ui/BottomNav';
import EmptyState from '../components/ui/EmptyState';
import PageHeader from '../components/ui/PageHeader';
import MobileMenu from '../components/MobileMenu';

import StatsCard from '../components/dashboard/StatsCard';
import QuickActionCard from '../components/dashboard/QuickActionCard';
import ActivityItem from '../components/dashboard/ActivityItem';
import AssessmentTest from '../components/AssessmentTest';
import { useXP } from '../contexts/XPContext';
// Modulli laboratoriyalar (Lazy Load)
const OhmLawLab = lazy(() => import('../components/lab/modules/OhmLawLab'));
const NewtonsLawLab = lazy(() => import('../components/lab/modules/NewtonsLawLab'));

// Loading component for lazy modules
const ComponentLoader = () => (
  <div className="flex items-center justify-center h-64 w-full bg-slate-800/50 rounded-2xl border border-slate-700/50">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <span className="text-slate-400 text-sm">Laboratoriya yuklanmoqda...</span>
    </div>
  </div>
);

// Lazy load katta komponentlar - Performance optimization
const TestsModule = lazy(() => import('../components/TestsModule'));
const AITutorModule = lazy(() => import('../components/AITutorModule'));
const HomeworkHelper = lazy(() => import('../components/homework/HomeworkHelper'));
const PDFViewer = lazy(() => import('../components/PDFViewer'));

// --- AI Model Config ---
const MODEL_NAME = "gemini-2.5-flash";

// --- LOADING SCREEN ---
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-2xl">
            <Atom size={64} className="text-white animate-spin" />
          </div>
        </div>
        <p className="text-slate-400 text-lg">Yuklanmoqda...</p>
      </div>
    </div>
  );
}

// --- THEME HELPER FUNCTION ---
function getThemeClasses(theme) {
  const themes = {
    dark: {
      bg: 'bg-transparent',
      card: 'bg-slate-800',
      cardHover: 'hover:bg-slate-700',
      border: 'border-slate-700',
      borderHover: 'hover:border-blue-500',
      text: 'text-white',
      textMuted: 'text-slate-400',
      input: 'bg-slate-800 border-slate-700 text-white placeholder-slate-500',
      sidebar: 'bg-slate-900',
    },
    white: {
      bg: 'bg-gradient-to-br from-gray-50 to-white',
      card: 'bg-white',
      cardHover: 'hover:bg-gray-50',
      border: 'border-gray-200',
      borderHover: 'hover:border-blue-400',
      text: 'text-gray-900',
      textMuted: 'text-gray-600',
      input: 'bg-white border-gray-300 text-gray-900 placeholder-gray-400',
      sidebar: 'bg-white',
    },
    black: {
      bg: 'bg-gradient-to-br from-black to-gray-950',
      card: 'bg-gray-950',
      cardHover: 'hover:bg-gray-900',
      border: 'border-gray-800',
      borderHover: 'hover:border-blue-500',
      text: 'text-white',
      textMuted: 'text-gray-400',
      input: 'bg-gray-950 border-gray-800 text-white placeholder-gray-500',
      sidebar: 'bg-black',
    },
  };
  return themes[theme] || themes.dark;
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
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-10 text-white">
          <div className="bg-red-900/50 p-8 rounded-2xl border border-red-500 max-w-2xl w-full">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <AlertCircle size={32} className="text-red-400" />
              Xatolik yuz berdi
            </h1>
            <p className="text-slate-300 mb-6">Dasturni yuklashda muammo bo'ldi. Iltimos, quyidagi xatoni administratorga yuboring:</p>
            <pre className="bg-black/50 p-4 rounded-lg overflow-auto font-mono text-sm text-red-200 border border-red-500/30">
              {this.state.error?.toString()}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold transition-colors w-full"
            >
              Sahifani yangilash
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
  const { user, loading, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // BARCHA STATE HOOKS - conditional return'dan OLDIN
  const [activeTab, setActiveTab] = useState('dashboard');

  // DEBUGGING: Check active tab
  useEffect(() => {
    console.log("Current activeTab:", activeTab);
  }, [activeTab]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sidebar ochilganda body scroll'ni to'xtatish
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);
  const [userXP, setUserXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Assessment Test State
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState(null);

  // API key butunlay backend'da (Netlify Functions)
  // Frontend'da hech qanday API key saqlanmaydi

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('eduphysics-theme') || 'dark';
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [progressLoading, setProgressLoading] = useState(true);

  // Theme localStorage persistence
  useEffect(() => {
    localStorage.setItem('eduphysics-theme', theme);
  }, [theme]);

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

  // --- STATISTICS STATE ---
  const [userStats, setUserStats] = useState(() => {
    try {
      const saved = localStorage.getItem('userStats');
      return saved ? JSON.parse(saved) : { timeSpent: 0, testsSolved: 0, totalScore: 0, completedLabs: 0 };
    } catch (e) {
      return { timeSpent: 0, testsSolved: 0, totalScore: 0, completedLabs: 0 };
    }
  });

  useEffect(() => {
    localStorage.setItem('userStats', JSON.stringify(userStats));
  }, [userStats]);

  useEffect(() => {
    let timer;
    if (user && !loading) {
      timer = setInterval(() => {
        if (document.visibilityState === 'visible') {
          setUserStats(prev => ({ ...prev, timeSpent: (prev.timeSpent || 0) + 1 }));
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [user, loading]);

  const updateUserStats = (data) => {
    setUserStats(prev => {
      const newStats = { ...prev };

      if (typeof data === 'number') {
        // Quiz result (percentage)
        newStats.testsSolved = (prev.testsSolved || 0) + 1;
        newStats.totalScore = (prev.totalScore || 0) + data;
      } else if (data && data.labCompleted) {
        // Lab completion
        newStats.completedLabs = (prev.completedLabs || 0) + 1;
      }

      localStorage.setItem('userStats', JSON.stringify(newStats));
      return newStats;
    });
  };

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

  // User progress yuklash
  useEffect(() => {
    if (user) {
      loadUserProgress();
    }
  }, [user]);

  const loadUserProgress = async () => {
    try {
      setProgressLoading(true);
      const progress = await getUserProgress(user.uid, {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      });

      setUserXP(progress.xp || 0);
      setUserLevel(progress.level || 0);
      setCompletedLessons(progress.completedLessons || []);

      // Check if user has completed assessment
      const hasCompletedAssessment = localStorage.getItem(`assessment_completed_${user.uid}`);
      if (hasCompletedAssessment) {
        setAssessmentCompleted(true);
        const savedResults = localStorage.getItem(`assessment_results_${user.uid}`);
        if (savedResults) {
          setAssessmentResults(JSON.parse(savedResults));
        }
      } else {
        // Show assessment for new users
        setShowAssessment(true);
      }

      console.log('User progress loaded:', progress);
    } catch (error) {
      console.error('Error loading progress:', error);
      addNotification('Progress yuklanmadi', 'error');
    } finally {
      setProgressLoading(false);
    }
  };

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
        addNotification('✅ Dars tugallandi! +50 XP', 'success');
      } catch (error) {
        console.error('Error completing lesson:', error);
      }
    }
  };

  // Handle assessment completion
  const handleAssessmentComplete = (results) => {
    // Save results to localStorage
    localStorage.setItem(`assessment_completed_${user.uid}`, 'true');
    localStorage.setItem(`assessment_results_${user.uid}`, JSON.stringify(results));

    setAssessmentResults(results);
    setAssessmentCompleted(true);
    setShowAssessment(false);
    setActiveTab('dashboard'); // Return to dashboard

    addNotification('✅ Test muvaffaqiyatli yakunlandi!', 'success');
  };

  // Handle assessment skip
  const handleAssessmentSkip = () => {
    setShowAssessment(false);
    addNotification('Testni keyinroq topshirishingiz mumkin', 'info');
  };

  // Get theme classes
  const themeClasses = getThemeClasses(theme);

  // Extended User with local avatar
  const displayUser = user ? { ...user, photoURL: userAvatar || user.photoURL } : null;

  // Render content function
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard setActiveTab={setActiveTab} userXP={userXP} userLevel={userLevel} theme={theme} userStats={userStats} completedLessons={completedLessons} totalLessons={lessonsData.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0)} assessmentResults={assessmentResults} showAssessment={showAssessment} onAssessmentComplete={handleAssessmentComplete} onAssessmentSkip={handleAssessmentSkip} />;

      case 'assessment': return (
        <AssessmentTest
          onComplete={handleAssessmentComplete}
          onSkip={handleAssessmentSkip}
        />
      );

      case 'menu': return (
        <MobileMenu
          setActiveTab={setActiveTab}
          onMenuClick={(action) => {
            if (action === 'settings') navigate('/settings');
            else if (action === 'logout') logout();
            else if (action === 'ai') setActiveTab('ai-tutor');
          }}
          setShowSettings={() => navigate('/settings')}
          logout={logout}
          setAiModalOpen={() => setActiveTab('ai-tutor')}
        />
      );

      case 'ai-tutor': return (
        <AITutorModule setActiveTab={setActiveTab} />
      );

      case 'lessons': return (
        <div className="space-y-6">
          <PageHeader title="Darslar" onBack={() => setActiveTab('menu')} />
          <LessonsModule completedLessons={completedLessons} completeLesson={completeLesson} theme={theme} />
        </div>
      );

      case 'tests': return (
        <div className="space-y-6">
          <PageHeader title="Testlar" onBack={() => setActiveTab('menu')} />
          <TestsModule addXP={addXP} addNotification={addNotification} theme={theme} />
        </div>
      );

      case 'homework': return (
        <div className="space-y-6">
          <PageHeader title="Uy Vazifasi" onBack={() => setActiveTab('menu')} />
          <HomeworkHelper setShowSettings={() => navigate('/settings')} addNotification={addNotification} addXP={addXP} theme={theme} />
        </div>
      );

      case 'lab': return (
        <div className="space-y-6">
          <PageHeader title="Virtual Laboratoriya" onBack={() => setActiveTab('menu')} />
          <VirtualLab addNotification={addNotification} setShowSettings={() => navigate('/settings')} theme={theme} updateStats={updateUserStats} />
        </div>
      );

      case 'quiz': return (
        <div className="space-y-6">
          <PageHeader title="AI Test Sinovlari" onBack={() => setActiveTab('menu')} />
          <QuizModule setUserXP={setUserXP} addNotification={addNotification} setShowSettings={() => navigate('/settings')} theme={theme} updateStats={updateUserStats} />
        </div>
      );

      case 'profile': return (
        <div className="space-y-6">
          <PageHeader title="Profil" onBack={() => setActiveTab('dashboard')} />
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

  return (
    <div className={`flex h-screen ${themeClasses.bg} ${themeClasses.text} font-sans overflow-hidden selection:bg-blue-500 selection:text-white transition-colors duration-500`}>

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-[60] space-y-2 pointer-events-none">
        {notifications.map(n => (
          <div key={n.id} className={`flex items-center space-x-2 px-4 py-3 rounded-lg shadow-2xl animate-slideInLeft ${n.type === 'success' ? 'bg-green-500/90' : 'bg-blue-500/90'
            } backdrop-blur-sm text-white pointer-events-auto`}>
            {n.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <span className="font-medium text-sm">{n.message}</span>
          </div>
        ))}
      </div>

      {/* Settings Modal removed - now using full page at /settings */}

      {/* Hamburger menyu o'chirildi - icon-only sidebar doimo ko'rinadi */}

      {/* Overlay o'chirildi - icon-only sidebar doimo ko'rinadi */}


      {/* Yon panel (Sidebar) - Expanded with Labels - Hidden on Mobile */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 backdrop-blur-xl border-r border-slate-700/50 flex-col transition-all duration-300 shadow-2xl">
        {/* Logo & Brand */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-700/50">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/30">
            <Atom size={28} className="text-white animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg">NurFizika</span>
            <span className="text-xs text-yellow-300 italic">Kuch — bilimda!</span>
          </div>
        </div>

        {/* Navigation - With Labels */}
        <nav className="mt-4 px-3 space-y-1.5 flex-1 overflow-y-auto custom-scrollbar">
          <SidebarItem icon={<BarChart2 />} label={t('dashboard.main')} id="dashboard" active={activeTab} set={setActiveTab} />
          {/* Darsliklar Link - Navigates to sinf tanlash page */}
          <div onClick={() => navigate('/darsliklar')}>
            <SidebarItem icon={<BookOpen />} label="Darsliklar" id="darsliklar" active={activeTab} set={() => { }} />
          </div>
          {/* Kutubxona Link */}
          <div onClick={() => navigate('/kutubxona')}>
            <SidebarItem icon={<Library />} label="Kutubxona" id="kutubxona" active={activeTab} set={() => { }} />
          </div>
          {/* Missiyalar Link */}
          <div onClick={() => navigate('/missiyalar')}>
            <SidebarItem icon={<Target />} label="Missiyalar" id="missiyalar" active={activeTab} set={() => { }} />
          </div>
          {/* Laboratoriya Link */}
          <div onClick={() => navigate('/laboratoriya')}>
            <SidebarItem icon={<Zap />} label={t('dashboard.lab')} id="lab" active={activeTab} set={() => { }} />
          </div>
          <SidebarItem icon={<Trophy />} label={t('dashboard.tests')} id="tests" active={activeTab} set={setActiveTab} />
          <SidebarItem icon={<BookOpen />} label={t('dashboard.homework')} id="homework" active={activeTab} set={setActiveTab} />
          <SidebarItem icon={<Brain />} label={t('dashboard.aiTutor')} id="quiz" active={activeTab} set={setActiveTab} />
          <SidebarItem icon={<User />} label={t('dashboard.profile')} id="profile" active={activeTab} set={setActiveTab} />
        </nav>

        {/* User Section - Expanded */}
        <div className="p-4 border-t border-slate-700/50 bg-slate-900/50 space-y-3">
          {/* User Info Card */}
          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/30 hover:bg-slate-800/70 transition-all duration-200">
            <div className="w-10 h-10 rounded-full border-2 border-blue-500/40 overflow-hidden bg-slate-800 flex items-center justify-center flex-shrink-0">
              {displayUser?.photoURL ? (
                <img src={displayUser.photoURL} alt="User" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-bold text-sm">{displayUser?.displayName ? displayUser.displayName[0].toUpperCase() : 'U'}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">
                {displayUser?.displayName || 'Foydalanuvchi'}
              </p>
              <p className="text-slate-400 text-xs truncate">
                {displayUser?.email || 'email@example.com'}
              </p>
            </div>
          </div>

          {/* Action Buttons - With Labels */}
          <div className="space-y-2">
            <button
              onClick={() => navigate('/settings')}
              className="w-full flex items-center gap-3 px-4 py-2.5 bg-slate-800/50 hover:bg-slate-700/70 rounded-lg transition-all duration-200 text-slate-300 hover:text-white group border border-slate-700/30 hover:border-slate-600/50"
            >
              <Settings size={18} className="flex-shrink-0 group-hover:rotate-90 transition-transform duration-300" />
              <span className="text-sm font-medium">{t('dashboard.settings')}</span>
            </button>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-all duration-200 text-red-400 hover:text-red-300 group border border-red-500/20 hover:border-red-500/30"
            >
              <LogOut size={18} className="flex-shrink-0" />
              <span className="text-sm font-medium">{t('dashboard.logout')}</span>
            </button>
          </div>
        </div>
      </aside>



      {/* Asosiy oyna */}
      <main className={`
        flex-1 overflow-y-auto ${themeClasses.bg} 
        relative scroll-smooth transition-all duration-300 
        md:ml-64 md:pb-0 pb-20
        landscape:md:pb-0
      `}>
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl mix-blend-screen"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl mix-blend-screen"></div>
        </div>

        {/* Content Container - Responsive */}
        <div className="
          relative z-10 
          min-h-full
          px-4 py-4
          sm:px-6 sm:py-6
          md:px-8 md:py-8
          lg:px-10 lg:py-10
          max-w-[1600px] mx-auto
          pb-24 md:pb-8
        ">
          {renderContent()}
        </div>
      </main>


      {/* 📱 BOTTOM NAVIGATION (Mobile Only) */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}

// --- AI CHAT ASSISTANT COMPONENT ---
function AIAssistant({ apiKey, setShowSettings, isOpen: externalIsOpen, setIsOpen: externalSetIsOpen }) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalSetIsOpen || setInternalIsOpen;
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Salom! Men AI Fizik Ustozman. Menga dars bo'yicha har qanday savol berishingiz mumkin. ⚛️" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // Development mode: to'g'ridan-to'g'ri Gemini API ishlatamiz
      // Production mode: Netlify Functions ishlatiladi

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: MODEL_NAME,
        systemInstruction: "Sen 9-sinf o'quvchilari uchun 'EduPhysics' ilovasida ishlaydigan do'stona va bilimdon fizik ustozsan. Javoblarni o'zbek tilida, sodda, qiziqarli misollar bilan va ilmiy asoslangan holda ber. O'quvchini ilhomlantir. Formulalar ishlatsang, ularni tushuntirib ber."
      });

      const result = await model.generateContent(userMsg);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'ai', text: text }]);
    } catch (error) {
      console.error("AI Error:", error);

      let errorMessage = "Xatolik yuz berdi. ";
      if (error.message.includes("404")) {
        errorMessage += "Model topilmadi. Iltimos, internet ulanishini tekshiring.";
      } else if (error.message.includes("403") || error.message.includes("401")) {
        errorMessage += "API kalit noto'g'ri yoki muddati tugagan. Sozlamalarni tekshiring.";
      } else if (error.message.includes("429")) {
        errorMessage += "Juda ko'p so'rovlar. Iltimos, bir oz kuting.";
      } else {
        errorMessage += "Qaytadan urinib ko'ring.";
      }

      setMessages(prev => [...prev, { role: 'ai', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col h-[500px] animate-scaleIn origin-bottom-right pointer-events-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="text-white" size={20} />
              <h3 className="font-bold text-white">AI Fizik Ustoz</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white"><X size={18} /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50 scrollbar-thin scrollbar-thumb-slate-700">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} `}>
                <div className={`max - w - [85 %] p - 3 rounded - 2xl text - sm leading - relaxed ${msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none shadow-lg'
                  : 'bg-slate-700 text-slate-200 rounded-bl-none shadow-md'
                  } `}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-700 p-3 rounded-2xl rounded-bl-none flex space-x-1 items-center">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-slate-800 border-t border-slate-700 flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Savol bering..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-2 bg-blue-600 rounded-xl hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/40 hover:scale-110 transition-transform duration-200 active:scale-95"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}

        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
        )}
      </button>
    </div>
  );
}

// 3. MUKAMMAL VIRTUAL LABORATORIYA (AI Tahlil bilan)
// 3. MUKAMMAL VIRTUAL LABORATORIYA (Modulli)
function VirtualLab({ addNotification, setShowSettings, updateStats }) {
  const [activeModule, setActiveModule] = useState('home'); // home, ohm, newton

  // Module Selection Screen
  if (activeModule === 'home') {
    return (
      <div className="space-y-6 animate-fadeIn pb-12">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
            <Zap className="text-yellow-400" />
            Virtual Laboratoriya
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Module 1: Ohm's Law */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveModule('ohm')}
            className="bg-slate-800 rounded-2xl p-6 border border-slate-700 cursor-pointer hover:border-blue-500 transition-colors group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap size={100} />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 text-blue-400">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Elektr Toki (Ohm Qonuni)</h3>
              <p className="text-slate-400 text-sm mb-4">
                Tok kuchi, kuchlanish va qarshilik orasidagi bog'liqlikni o'rganing.
              </p>
              <div className="flex items-center gap-2 text-blue-400 font-medium text-sm">
                Tajribani boshlash <ArrowRight size={16} />
              </div>
            </div>
          </motion.div>

          {/* Module 2: Newton's Law */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveModule('newton')}
            className="bg-slate-800 rounded-2xl p-6 border border-slate-700 cursor-pointer hover:border-green-500 transition-colors group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Activity size={100} />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 text-green-400">
                <Activity size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mexanika (Nyuton Qonuni)</h3>
              <p className="text-slate-400 text-sm mb-4">
                Kuch, massa va tezlanish. Harakat qonunlarini interaktiv o'rganing.
              </p>
              <div className="flex items-center gap-2 text-green-400 font-medium text-sm">
                Tajribani boshlash <ArrowRight size={16} />
              </div>
            </div>
          </motion.div>

          {/* Module 3: Coming Soon - Optics */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 opacity-60">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 text-purple-400">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Optika</h3>
            <p className="text-slate-400 text-sm mb-4">
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
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2"
      >
        <ArrowRight className="rotate-180" size={20} />
        Barcha tajribalar
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
  if (!url) {
    return (
      <div className="w-full aspect-video bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 animate-fadeIn">
        <div className="text-center p-6">
          <div className="bg-slate-700/50 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <Video size={32} className="text-slate-400" />
          </div>
          <h3 className="text-white font-bold mb-2">Video dars tez orada yuklanadi</h3>
          <p className="text-slate-400 text-sm max-w-xs mx-auto">
            Ushbu mavzu bo'yicha maxsus video dars tayyorlanmoqda. Tez orada bu yerda tomosha qilishingiz mumkin bo'ladi.
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

// --- CHAPTER GRID COMPONENT ---
function ChapterGrid({ onSelect, completedLessons }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn pb-24">
      {lessonsData.chapters.map((chapter) => {
        const progress = calculateChapterProgress(chapter, completedLessons);
        return (
          <button
            key={chapter.id}
            onClick={() => onSelect(chapter)}
            className="group relative bg-slate-800 rounded-2xl p-6 text-left border border-slate-700 hover:border-blue-500 transition-all hover:shadow-2xl hover:shadow-blue-500/20 active:scale-95 overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <span className="text-4xl shadow-sm">{chapter.icon}</span>
                <div className="bg-slate-900/50 px-2 py-1 rounded-lg text-xs font-mono text-slate-400 border border-slate-700">
                  {chapter.lessons.length} Dars
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">
                {chapter.title}
              </h3>
              <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                {chapter.description}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-500">Progress</span>
                  <span className="text-blue-400">{progress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progress}% ` }}
                  ></div>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// Lesson List Component
function LessonList({ chapter, onBack, onSelect, completedLessons }) {
  console.log('LessonList received chapter:', chapter);
  console.log('Chapter lessons:', chapter?.lessons);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        {/* Desktop: Qaytish tugmasi chap tomonda */}
        <button
          onClick={onBack}
          className="hidden md:flex p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl transition-all shadow-lg text-white"
        >
          <ChevronRight className="rotate-180" size={24} />
        </button>

        {/* Content */}
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{chapter.icon}</span>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">{chapter.title}</h2>
                <p className="text-slate-400 text-sm">{chapter.description}</p>
              </div>
            </div>

            {/* Mobile: Qaytish tugmasi o'ng tomonda */}
            <button
              onClick={onBack}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl transition-all shadow-lg text-white"
            >
              <ChevronRight className="rotate-180 text-white" size={18} />
              <span className="text-sm font-medium">Orqaga</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div className="space-y-4">
        {chapter.lessons && Array.isArray(chapter.lessons) ? (
          chapter.lessons.map((lesson, index) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              index={index}
              onClick={() => onSelect(lesson)}
              isCompleted={completedLessons.includes(lesson.id)}
            />
          ))
        ) : (
          <div className="text-red-500">Error: No lessons found</div>
        )}
      </div>
    </div>
  );
}

function LessonCard({ lesson, index, onClick, isCompleted }) {
  if (!lesson) return null;

  return (
    <button
      onClick={onClick}
      className="w-full p-4 rounded-xl text-left bg-slate-800 border border-slate-700 hover:border-blue-500"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-sm text-white">
          {index + 1}
        </div>
        <div>
          <h4 className="font-bold text-white">
            {lesson.title || 'Untitled'}
          </h4>
          <p className="text-xs text-slate-400">
            {lesson.description || ''}
          </p>
        </div>
      </div>
    </button>
  )
}

function LessonDetail({ lesson, onBack, onComplete, isCompleted }) {
  if (!lesson) return <div>Loading...</div>;

  return (
    <div className="space-y-8 pb-24">
      {/* Header */}
      <button onClick={onBack} className="text-slate-400 hover:text-white">
        ← Mavzularga qaytish
      </button>

      <div>
        <h1 className="text-3xl font-bold text-white mb-4">{lesson.title || 'Untitled'}</h1>
        <p className="text-slate-400">{lesson.description || ''}</p>
      </div>

      {/* PDF Kitob */}
      {lesson.hasPdf && (
        <PDFViewer
          pdfUrl="/fizika-kitob.pdf"
          page={lesson.pdfPage}
          pageEnd={lesson.pdfPageEnd}
          title={lesson.title}
        />
      )}

      {/* Content */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-slate-300">
        <div className="whitespace-pre-wrap">
          {lesson.content?.theory || 'Kontent yuklanmoqda...'}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <div className="text-slate-400 text-sm">
          Mavzuni o'zlashtirdingizmi?
        </div>
        <button
          onClick={() => onComplete(lesson.id)}
          disabled={isCompleted}
          className={`px - 8 py - 3 rounded - xl font - bold ${isCompleted ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-500'} text - white`}
        >
          {isCompleted ? 'Bajarildi' : 'Mavzuni Yakunlash'}
        </button>
      </div>
    </div>
  );
}

// LESSONS MODULE
function LessonsModule({ completedLessons, completeLesson }) {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Agar dars tanlangan bo'lsa
  if (selectedLesson) {
    return (
      <LessonDetail
        lesson={selectedLesson}
        onBack={() => setSelectedLesson(null)}
        onComplete={(id) => completeLesson(id)}
        isCompleted={completedLessons.includes(selectedLesson.id)}
      />
    );
  }

  // Agar bob tanlangan bo'lsa
  if (selectedChapter) {
    return (
      <LessonList
        chapter={selectedChapter}
        onBack={() => setSelectedChapter(null)}
        onSelect={setSelectedLesson}
        completedLessons={completedLessons}
      />
    );
  }

  // Boblar ro'yxati
  return <ChapterGrid onSelect={setSelectedChapter} completedLessons={completedLessons} />;
}




// 4. MUKAMMAL AI TEST TUZUVCHI (Quiz)
function QuizModule({ setUserXP, addNotification, setShowSettings, updateStats }) {
  const API_KEYS = [
    "AIzaSyCC8uEzh1px6KKsXP8FEkh_JS_3F1ErtDQ",
    "AIzaSyBUzgU8ARMbZX1OYGv0f_cIqQJqaWdlGVM"
  ];
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [mode, setMode] = useState('menu'); // 'menu' | 'quiz'

  // AI orqali test tuzish funksiyasi
  const generateQuiz = async () => {
    if (!topic.trim()) {
      addNotification("Iltimos, test mavzusini yozing!", "warning");
      return;
    }

    setIsGenerating(true);

    // JSON formatda javob olish uchun aniq prompt
    const prompt = `Fizika bo'yicha "${topic}" mavzusida 5 ta qiziqarli test savoli tuz.
      Javobni faqat va faqat quyidagi JSON formatda qaytar(boshqa hech qanday matnsiz):
[
  {
    "q": "Savol matni",
    "options": ["A javob", "B javob", "C javob", "D javob"],
    "ans": to'g'ri_javob_indeksi_raqamda_0_dan_3_gacha
  }
]
      Savollar 9 - sinf darajasida, o'zbek tilida bo'lsin.`;

    try {
      const apiKey = API_KEYS[Math.floor(Math.random() * API_KEYS.length)];
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (!text) {
        throw new Error("AI javob bo'sh qaytardi.");
      }

      // JSONni tozalash (ba'zan AI ```json ... ``` deb qaytaradi)
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const newQuestions = JSON.parse(cleanJson);

      if (Array.isArray(newQuestions) && newQuestions.length > 0) {
        setQuestions(newQuestions);
        setMode('quiz');
        setCurrentQ(0);
        setScore(0);
        setShowResult(false);
        addNotification("Test muvaffaqiyatli tuzildi!", "success");
      } else {
        throw new Error("Noto'g'ri format");
      }
    } catch (error) {
      console.error("Quiz Gen Error:", error);
      addNotification("Test tuzishda xatolik. Qaytadan urinib ko'ring.", "error");
    } finally {
      setIsGenerating(false);
    }
  };

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
        addNotification(`Tabriklaymiz! +${bonusXP} XP qo'shildi!`, 'success');

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
          <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-xl">
            <Brain size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">AI Test Tuzuvchi</h2>
          <p className="text-slate-400">Sun'iy intellekt yordamida o'zingiz istagan mavzuda bilimingizni sinang.</p>
        </div>

        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <Sparkles size={120} />
          </div>

          <label className="block text-sm font-medium text-slate-300 mb-3 ml-1">Mavzuni kiriting (yoki tanlang)</label>
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Masalan: Optika, Atom fizikasi, Magnit..."
              className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {["Kinematika", "Dinamika", "Tok qonunlari", "Yorug'lik", "Kvant fizikasi"].map(tag => (
              <button
                key={tag}
                onClick={() => setTopic(tag)}
                className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-slate-300 transition-colors"
              >
                {tag}
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
                <span className="animate-pulse">AI savollar tuzmoqda...</span>
              </>
            ) : (
              <>
                <Sparkles />
                Testni Boshlash
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
          <h2 className="text-4xl font-bold text-white mb-2">Natija: {percentage}%</h2>
          <p className="text-slate-400">Siz {questions.length} ta savoldan {score} tasiga to'g'ri javob berdingiz.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <div className="text-green-400 font-bold text-xl">+{score * 50}</div>
            <div className="text-xs text-slate-500 uppercase">XP Points</div>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <div className="text-blue-400 font-bold text-xl">{score}</div>
            <div className="text-xs text-slate-500 uppercase">To'g'ri Javob</div>
          </div>
        </div>

        <button onClick={resetQuiz} className="flex items-center space-x-2 px-8 py-3 bg-blue-600 hover:bg-blue-50 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-600/30 hover:-translate-y-1">
          <RotateCcw size={18} /> <span>Boshqa Test Yechish</span>
        </button>
      </div>
    );
  }

  // 3. TEST JARAYONI
  return (
    <div className="max-w-3xl mx-auto mt-6 animate-fadeIn">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-400 font-medium">Mavzu: <span className="text-white">{topic || "Umumiy Fizika"}</span></span>
          <span className="font-mono font-bold text-blue-400">{currentQ + 1}/{questions.length}</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${((currentQ) / questions.length) * 100}%` }}></div>
        </div>
      </div>

      <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <Brain size={100} className="text-white" />
        </div>

        <h3 className="text-2xl text-white mb-8 font-medium relative z-10 leading-relaxed">{questions[currentQ].q}</h3>

        <div className="space-y-3 relative z-10">
          {questions[currentQ].options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === questions[currentQ].ans;
            let btnClass = "bg-slate-700 hover:bg-slate-600 text-slate-200";
            if (selectedOption !== null) {
              if (isSelected && isCorrect) btnClass = "bg-green-600 text-white border-green-400 ring-2 ring-green-500/50";
              else if (isSelected && !isCorrect) btnClass = "bg-red-600 text-white border-red-400";
              else btnClass = "bg-slate-700 opacity-50 cursor-not-allowed";
            } else {
              btnClass = "bg-slate-700 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:-translate-y-0.5";
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
        <button onClick={resetQuiz} className="text-slate-500 hover:text-white text-sm underline">Testni to'xtatish</button>
      </div>
    </div>
  );
}

// 5. PROFIL
function UserProfile({ user, userXP, userLevel, userStats = { timeSpent: 0, testsSolved: 0, totalScore: 0 }, completedLessons = [], totalLessons = 24 }) {
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
    { id: 'om_law', title: "Om Qonuni", icon: <Atom />, unlocked: labCount >= 1 },
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
              <Award size={18} /> 9-sinf O'quvchisi | Bo'lajak Muhandis
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
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400"><Trophy size={24} /></div>
            <span className="text-xs font-bold text-slate-500 bg-slate-900 px-2 py-1 rounded-lg">LEVEL {userLevel}</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{userXP}</div>
          <div className="text-sm text-slate-400">Umumiy XP ballar</div>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-green-500/50 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-500/10 rounded-xl text-green-400"><Book size={24} /></div>
            <span className="text-xs font-bold text-slate-500 bg-slate-900 px-2 py-1 rounded-lg">6 BOB</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{progressPercent}%</div>
          <div className="text-sm text-slate-400">Kurs progressi</div>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-purple-500/50 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400"><Zap size={24} /></div>
            <span className="text-xs font-bold text-slate-500 bg-slate-900 px-2 py-1 rounded-lg">LAB</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{labCount}</div>
          <div className="text-sm text-slate-400">Bajarilgan lablar</div>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-yellow-500/50 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-400"><Award size={24} /></div>
            <span className="text-xs font-bold text-slate-500 bg-slate-900 px-2 py-1 rounded-lg">YUTUQLAR</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{unlockedCount}/10</div>
          <div className="text-sm text-slate-400">Ochilgan yutuqlar</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Trophy className="text-yellow-500" /> Yutuqlarim</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {achievements.map(ach => (
              <AchievementCard key={ach.id} title={ach.title} icon={ach.icon} unlocked={ach.unlocked} />
            ))}
          </div>
        </div>
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold mb-6">Statistika</h3>
          <ul className="space-y-4">
            <StatRow label="O'qilgan vaqt" value={(function (s) {
              if (!s) return "0m";
              const h = Math.floor(s / 3600);
              const m = Math.floor((s % 3600) / 60);
              if (h > 0) return `${h}s ${m}m`;
              return `${m}m`;
            })(userStats.timeSpent)} />
            <StatRow label="Yechilgan testlar" value={`${userStats.testsSolved || 0} ta`} />
            <StatRow
              label="O'rtacha baho"
              value={`${userStats.testsSolved ? Math.round(userStats.totalScore / userStats.testsSolved) : 0}%`}
              color={
                (userStats.testsSolved ? Math.round(userStats.totalScore / userStats.testsSolved) : 0) >= 80 ? "text-green-400" :
                  (userStats.testsSolved ? Math.round(userStats.totalScore / userStats.testsSolved) : 0) >= 50 ? "text-yellow-400" : "text-red-400"
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
    <div className={`aspect-square rounded-xl flex flex-col items-center justify-center p-4 text-center border transition-all ${unlocked ? 'bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600 text-white hover:border-blue-500 cursor-pointer' : 'bg-slate-800/50 border-slate-800 text-slate-600 grayscale'}`}>
      <div className={`mb-3 p-3 rounded-full ${unlocked ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700/50'}`}>{icon}</div>
      <span className="text-xs font-bold">{title}</span>
    </div>
  )
}
function StatRow({ label, value, color = "text-white" }) {
  return (
    <li className="flex justify-between items-center pb-3 border-b border-slate-700/50 last:border-0">
      <span className="text-slate-400 text-sm">{label}</span>
      <span className={`font-mono font-bold ${color}`}>{value}</span>
    </li>
  )
}


// --- DASHBOARD COMPONENT ---
function Dashboard({ setActiveTab, userXP, userLevel, userStats, completedLessons = [], totalLessons = 24, assessmentResults, showAssessment, onAssessmentComplete, onAssessmentSkip }) {
  const { user } = useAuth();
  const { totalXP } = useXP();

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
    if (hour < 12) return "Xayrli tong";
    if (hour < 18) return "Xayrli kun";
    return "Xayrli kech";
  };

  // Recent activities — real-time from xpLogs Firestore
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;
    const logsRef = collection(db, 'xpLogs', user.uid, 'logs');
    const q = query(logsRef, orderBy('timestamp', 'desc'), limit(8));
    const unsub = onSnapshot(q, (snap) => {
      const REASON_META = {
        LESSON_COMPLETE: { title: "Darsni tugatdingiz", icon: CheckCircle, color: 'green' },
        TEST_COMPLETE: { title: "Testni tugatdingiz", icon: Trophy, color: 'yellow' },
        LAB_COMPLETE: { title: "Laboratoriya", icon: Zap, color: 'purple' },
        DAILY_LOGIN: { title: "Kunlik kirish", icon: Activity, color: 'blue' },
        PERFECT_SCORE: { title: "Mukammal natija!", icon: Award, color: 'orange' },
        MISSION_DAILY: { title: "Kunlik missiya", icon: Target, color: 'indigo' },
        MISSION_WEEKLY: { title: "Haftalik missiya", icon: TrendingUp, color: 'indigo' },
        ACHIEVEMENT: { title: "Yutuq ochildi!", icon: Award, color: 'orange' },
        AI_MESSAGE: { title: "AI Ustoz suhbati", icon: Brain, color: 'blue' },
        mission_complete: { title: "Missiya bajarildi", icon: CheckCircle, color: 'green' },
      };
      const items = snap.docs.map((d) => {
        const data = d.data();
        const meta = REASON_META[data.reason] || { title: data.reason || 'Faoliyat', icon: Zap, color: 'blue' };
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
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
        <h2 className="text-3xl font-bold text-white mb-2">
          {getGreeting()}! 👋
        </h2>
        <p className="text-slate-400">
          Bugun {todayLessons} ta dars tugatdingiz - ajoyib ish!
        </p>
      </div>

      {/* Assessment Test Card (if not completed) */}
      {showAssessment && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-2 border-purple-500/40 rounded-2xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="p-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex-shrink-0">
              <Brain size={32} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">
                🎯 Bilim Darajangizni Aniqlang!
              </h3>
              <p className="text-slate-300 mb-4">
                15 ta savol orqali fizika bo'yicha bilimingizni baholaymiz va sizga mos o'quv rejasini tayyorlaymiz.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle className="text-green-400" size={18} />
                  <span>15 ta savol - barcha mavzulardan</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Clock className="text-blue-400" size={18} />
                  <span>~10 daqiqa - vaqt cheklanmagan</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <TrendingUp className="text-purple-400" size={18} />
                  <span>Shaxsiy o'quv rejasi</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Sparkles className="text-yellow-400" size={18} />
                  <span>AI tavsiyalar</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab('assessment')}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl font-bold transition-all shadow-lg shadow-purple-600/20 flex items-center gap-2"
                >
                  <Brain size={20} />
                  Testni Boshlash
                </button>
                <button
                  onClick={onAssessmentSkip}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-medium transition-colors"
                >
                  Keyinroq
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Assessment Results (if completed) */}
      {assessmentResults && (
        <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <Award className="text-purple-400" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">
                Sizning bilim darajangiz: {assessmentResults.level === 'advanced' ? '⭐⭐⭐ Yuqori' : assessmentResults.level === 'intermediate' ? '⭐⭐ O\'rta' : '⭐ Boshlang\'ich'}
              </h3>
              <p className="text-slate-300 text-sm mb-3">
                Test natijasi: {assessmentResults.overallScore}% ({assessmentResults.totalCorrect}/{assessmentResults.totalQuestions} to'g'ri)
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(assessmentResults.topicScores).map(([topic, score]) => (
                  <span
                    key={topic}
                    className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${score.percentage >= 80 ? 'bg-green-500/10 text-green-400 border border-green-500/30' : ''}
                      ${score.percentage >= 50 && score.percentage < 80 ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30' : ''}
                      ${score.percentage < 50 ? 'bg-red-500/10 text-red-400 border border-red-500/30' : ''}
                    `}
                  >
                    {topic}: {score.percentage}%
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Today's Statistics */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Bugungi Statistika</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            icon={Zap}
            label="Bugun qo'shildi"
            value={`${todayXP}`}
            subtitle="XP"
            trend={`+${todayXP}`}
            color="blue"
          />
          <StatsCard
            icon={CheckCircle}
            label="Tugatilgan"
            value={todayLessons}
            subtitle="dars"
            color="green"
          />
          <StatsCard
            icon={BarChart2}
            label="O'qish vaqti"
            value={formatTime(todayTime)}
            subtitle="bugun"
            trend="+2s"
            color="orange"
          />
          <StatsCard
            icon={Flame}
            label="Seriya"
            value={`${currentStreak} kun`}
            subtitle="ketma-ket"
            color="yellow"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Tezkor Harakatlar</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <QuickActionCard
            icon={Book}
            title="Darsni Davom Ettirish"
            description="Oxirgi to'xtatilgan joydan davom eting"
            color="blue"
            badge="Energiya"
            onClick={() => setActiveTab('lessons')}
          />
          <QuickActionCard
            icon={Brain}
            title="AI Test"
            description="Sun'iy intellekt bilan test yeching"
            color="purple"
            onClick={() => setActiveTab('quiz')}
          />
          <QuickActionCard
            icon={Zap}
            title="Virtual Laboratoriya"
            description="Tajribalar o'tkazing"
            color="yellow"
            onClick={() => setActiveTab('lab')}
          />
          <QuickActionCard
            icon={MessageSquare}
            title="AI Ustoz"
            description="Savollaringizga javob oling"
            color="indigo"
            onClick={() => setActiveTab('ai-tutor')}
          />
          <QuickActionCard
            icon={BookOpen}
            title="Uy Vazifasi"
            description="Masalalarni yeching"
            color="green"
            onClick={() => setActiveTab('homework')}
          />
          <QuickActionCard
            icon={Trophy}
            title="Testlar"
            description="Bilimingizni sinab ko'ring"
            color="orange"
            onClick={() => setActiveTab('tests')}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <BarChart2 className="text-blue-400" />
          So'nggi Faoliyat
        </h3>
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

      {/* Next Steps */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <ArrowRight className="text-purple-400" />
          Keyingi Qadam
        </h3>
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Sparkles className="text-blue-400" size={24} />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-white mb-2">
                AI Tavsiya: "Energiya saqlanish qonuni"ni boshlang
              </h4>
              <p className="text-slate-400 text-sm mb-4">
                Sizning darajangizga mos keladi va oldingi mavzular bilan bog'liq
              </p>
              <button
                onClick={() => setActiveTab('lessons')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium text-white transition-colors flex items-center gap-2"
              >
                Boshlash <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="text-purple-500" />
          AI Shaxsiy Tavsiyalar
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
        w-full flex items-center gap-3 px-4 py-3 rounded-xl
        transition-all duration-200 group relative
        ${isActive
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30'
          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
        }
      `}
    >
      {/* Icon */}
      <div className={`
        flex-shrink-0 transition-transform duration-200
        ${isActive ? 'scale-110' : 'group-hover:scale-110'}
      `}>
        {React.cloneElement(icon, { size: 20 })}
      </div>

      {/* Label */}
      <span className={`
        text-sm font-medium transition-all duration-200
        ${isActive ? 'font-bold' : 'font-normal'}
      `}>
        {label}
      </span>

      {/* Active Indicator */}
      {isActive && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full" />
      )}
    </button>
  );
}

// --- DASHBOARD PAGE EXPORT ---
export default function DashboardPage() {
  return (
    <ErrorBoundary>
      <EduPhysicsAppContent />
    </ErrorBoundary>
  );
}