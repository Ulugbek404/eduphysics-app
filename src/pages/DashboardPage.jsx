import React, { useState, useEffect, useMemo, useRef, lazy, Suspense } from 'react';
import {
  Book, Atom, Brain, Trophy, User, ChevronRight, Play,
  RotateCcw, Menu, X, CheckCircle, AlertCircle, BarChart2,
  Zap, Flame, Award, ArrowRight, Settings, MessageSquare,
  Info, Smartphone, Moon, Sun, Monitor, Volume2, VolumeX, Palette, Camera, Sparkles,
  Send, Loader, Bot, Key, Search, LogOut, BookOpen
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { getUserProgress, addUserXP, updateUserLevel, markLessonComplete, saveQuizResult } from '../services/userService';
import { lessonsData, calculateChapterProgress } from '../data/lessonsData';
import { testsData } from '../data/testsData';
import SettingsModal from '../components/SettingsModal';
import AIRecommendations from '../components/AIRecommendations';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { askAITutor } from '../services/aiService';
import BottomNav from '../components/ui/BottomNav';
import EmptyState from '../components/ui/EmptyState';
import PageHeader from '../components/ui/PageHeader';
import MobileMenu from '../components/MobileMenu';
import { ComponentLoader } from '../components/ui/Skeleton';

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
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
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
      bg: 'bg-gradient-to-br from-slate-900 to-black',
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
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-10 text-white">
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

  // API key butunlay backend'da (Netlify Functions)
  // Frontend'da hech qanday API key saqlanmaydi
  const [showSettings, setShowSettings] = useState(false);

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

  // Get theme classes
  const themeClasses = getThemeClasses(theme);

  // Extended User with local avatar
  const displayUser = user ? { ...user, photoURL: userAvatar || user.photoURL } : null;

  // Render content function
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard setActiveTab={setActiveTab} userXP={userXP} userLevel={userLevel} theme={theme} userStats={userStats} completedLessons={completedLessons} totalLessons={lessonsData.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0)} />;

      case 'menu': return (
        <MobileMenu
          setActiveTab={setActiveTab}
          onMenuClick={(action) => {
            if (action === 'settings') setShowSettings(true);
            else if (action === 'logout') logout();
            else if (action === 'ai') setActiveTab('ai-tutor');
          }}
          setShowSettings={setShowSettings}
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
          <HomeworkHelper setShowSettings={setShowSettings} addNotification={addNotification} addXP={addXP} theme={theme} />
        </div>
      );

      case 'lab': return (
        <div className="space-y-6">
          <PageHeader title="Virtual Laboratoriya" onBack={() => setActiveTab('menu')} />
          <VirtualLab addNotification={addNotification} setShowSettings={setShowSettings} theme={theme} updateStats={updateUserStats} />
        </div>
      );

      case 'quiz': return (
        <div className="space-y-6">
          <PageHeader title="AI Test Sinovlari" onBack={() => setActiveTab('menu')} />
          <QuizModule setUserXP={setUserXP} addNotification={addNotification} setShowSettings={setShowSettings} theme={theme} updateStats={updateUserStats} />
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

      {/* Settings Modal (NEW) */}
      <SettingsModal
        show={showSettings}
        onClose={() => setShowSettings(false)}
        user={displayUser}
        theme={theme}
        setTheme={setTheme}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        updateProfile={handleUpdateProfile}
      />

      {/* Hamburger menyu o'chirildi - icon-only sidebar doimo ko'rinadi */}

      {/* Overlay o'chirildi - icon-only sidebar doimo ko'rinadi */}

      {/* Yon panel (Sidebar) - Icon-Only - Hidden on Mobile */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 z-40 w-20 bg-slate-900 backdrop-blur-xl border-r border-slate-700 flex-col transition-all duration-300">
        {/* Logo */}
        <div className="p-4 flex items-center justify-center border-b border-slate-700/50">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg shadow-lg shadow-blue-500/20">
            <Atom size={24} className="text-white animate-spin-slow" />
          </div>
        </div>

        {/* Navigation - Icon Only */}
        <nav className="mt-3 px-2 space-y-2 flex-1 overflow-y-auto custom-scrollbar">
          <SidebarItem icon={<BarChart2 />} label="Asosiy" id="dashboard" active={activeTab} set={setActiveTab} />
          <SidebarItem icon={<Book />} label="Darslar" id="lessons" active={activeTab} set={setActiveTab} />
          <SidebarItem icon={<Trophy />} label="Testlar" id="tests" active={activeTab} set={setActiveTab} />
          <SidebarItem icon={<BookOpen />} label="Uy Vazifasi" id="homework" active={activeTab} set={setActiveTab} />
          <SidebarItem icon={<Zap />} label="Laboratoriya" id="lab" active={activeTab} set={setActiveTab} />
          <SidebarItem icon={<Brain />} label="AI Test Sinovlari" id="quiz" active={activeTab} set={setActiveTab} />
          <SidebarItem icon={<User />} label="Profil" id="profile" active={activeTab} set={setActiveTab} />
        </nav>

        {/* User Section - Icon Only */}
        <div className="p-2 border-t border-slate-700/50 bg-slate-900/30 space-y-2">
          {/* User Avatar */}
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-blue-500/30 overflow-hidden bg-slate-800 flex items-center justify-center">
              {displayUser?.photoURL ? (
                <img src={displayUser.photoURL} alt="User" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-bold text-sm">{displayUser?.displayName ? displayUser.displayName[0].toUpperCase() : 'U'}</span>
              )}
            </div>
          </div>

          {/* Action Buttons - Icon Only */}
          <div className="space-y-2">
            <button
              onClick={() => setShowSettings(true)}
              className="w-full flex items-center justify-center p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white"
              title="Sozlamalar"
            >
              <Settings size={18} />
            </button>
            <button
              onClick={logout}
              className="w-full flex items-center justify-center p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300"
              title="Chiqish"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>



      {/* Asosiy oyna */}
      <main className={`
        flex-1 overflow-y-auto ${themeClasses.bg} 
        relative scroll-smooth transition-all duration-300 
        md:ml-20 md:pb-0 pb-20
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
function VirtualLab({ addNotification, setShowSettings, updateStats }) {
  const API_KEYS = [
    "AIzaSyCC8uEzh1px6KKsXP8FEkh_JS_3F1ErtDQ",
    "AIzaSyBUzgU8ARMbZX1OYGv0f_cIqQJqaWdlGVM"
  ];
  const [voltage, setVoltage] = useState(12);
  const [resistance, setResistance] = useState(4);
  const [isRunning, setIsRunning] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const current = isRunning ? (voltage / resistance).toFixed(2) : 0;

  const graphData = useMemo(() => {
    const data = [];
    for (let v = 0; v <= 24; v += 4) {
      data.push({ u: v, i: (v / resistance).toFixed(1) });
    }
    return data;
  }, [resistance]);

  const handleToggle = () => {
    setIsRunning(!isRunning);
    if (!isRunning) addNotification("Zanjir ulandi! Tok oqmoqda.", "success");
    else addNotification("Zanjir uzildi.", "info");
  }

  // ✨ AI TAHLIL FUNKSIYASI ✨
  const handleAnalyze = async () => {
    if (!isRunning) {
      addNotification("Tahlil qilish uchun zanjirni ulang!", "error");
      return;
    }

    setIsAnalyzing(true);
    setAiAnalysis(null);

    const prompt = `Men 9 - sinf fizika laboratoriyasida tajriba o'tkazyapman. 
NATIJALAR:
- Kuchlanish(U): ${voltage} Volt
  - Qarshilik(R): ${resistance} Om
    - Tok kuchi(I): ${current} Amper.

      VAZIFA:
    Ushbu natijani Om qonuniga(I = U / R) asosan qisqa, ilmiy va tushunarli tahlil qilib ber.Nega tok kuchi aynan shunday chiqdi ? Agar qarshilikni oshirsak nima bo'ladi? Javobni o'zbek tilida ber.`;

    try {
      const apiKey = API_KEYS[Math.floor(Math.random() * API_KEYS.length)];
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const analysisText = response.text();

      if (!analysisText) {
        throw new Error("AI javob bo'sh qaytardi.");
      }

      setAiAnalysis(analysisText);
      if (updateStats) updateStats({ labCompleted: true });
    } catch (error) {
      console.error(error);
      addNotification("AI tahlilida xatolik bo'ldi.", "error");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Zap className="text-yellow-400" />
          Virtual Laboratoriya
        </h2>
        <div className="flex items-center space-x-3 bg-blue-900/20 px-4 py-2 rounded-xl border border-blue-500/20 backdrop-blur-sm">
          <span className="text-slate-400 font-mono text-sm">Formula:</span>
          <span className="text-white font-bold font-mono text-lg">I = U / R</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Simulyatsiya Oynasi */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-800 rounded-3xl border border-slate-700 p-1 shadow-2xl">
            <div className="bg-slate-900 rounded-[20px] p-6 h-full relative overflow-hidden flex flex-col">

              {/* Sxema */}
              <div className="flex-1 flex items-center justify-center min-h-[300px] relative">
                {isRunning && (
                  <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="w-full h-full border-4 border-dashed border-blue-400 rounded-xl animate-pulse-slow"></div>
                  </div>
                )}

                <div className="relative w-80 h-48 border-4 border-slate-600 rounded-lg flex items-center justify-center">
                  {/* Battery */}
                  <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 p-2">
                    <div className={`w - 10 h - 16 border - 2 ${isRunning ? 'border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.4)]' : 'border-slate-500'} rounded bg - slate - 800 flex flex - col items - center justify - center transition - all`}>
                      <span className="text-yellow-500 font-bold text-xs">{voltage}V</span>
                    </div>
                  </div>
                  {/* Resistor */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-slate-900 p-2">
                    <div className="w-24 h-8 bg-stripes-gray border-2 border-red-500 rounded flex items-center justify-center shadow-md relative overflow-hidden">
                      <div className="absolute inset-0 bg-stripes opacity-20"></div>
                      <span className="relative z-10 bg-slate-900/80 px-2 rounded text-xs font-bold text-white">{resistance}Ω</span>
                    </div>
                  </div>
                  {/* Load */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 p-2">
                    <div
                      className="transition-all duration-500"
                      style={{
                        filter: isRunning ? `drop - shadow(0 0 ${current * 5}px #FEF08A)` : 'none',
                        opacity: isRunning ? 1 : 0.5
                      }}
                    >
                      <Atom size={40} className={isRunning ? "text-yellow-400 animate-spin-slow" : "text-slate-600"} />
                    </div>
                  </div>
                </div>

                {/* Ampermetr */}
                <div className="absolute top-4 right-4 bg-slate-800/80 backdrop-blur border border-blue-500/30 p-3 rounded-xl shadow-xl">
                  <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">Tok kuchi</div>
                  <div className="text-2xl font-mono font-bold text-blue-400">{current} A</div>
                </div>
              </div>

              {/* Graph */}
              <div className="mt-6 h-32 w-full bg-slate-800/50 rounded-xl border border-slate-700/50 p-4 flex items-end justify-between relative">
                {graphData.map((point, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1 group relative" style={{ width: '15%' }}>
                    <div
                      className="w-full bg-blue-600/50 rounded-t transition-all duration-500 hover:bg-blue-500"
                      style={{ height: `${(point.i / 6) * 100} px`, maxHeight: '80px' }}
                    ></div>
                    <span className="text-[10px] text-slate-400">{point.u}V</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Analysis Result */}
          {aiAnalysis && (
            <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-6 rounded-2xl border border-indigo-500/30 animate-slideInLeft">
              <div className="flex items-start gap-3">
                <Sparkles className="text-yellow-400 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-bold text-indigo-200 mb-2">AI Tahlil Natijasi:</h3>
                  <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line">{aiAnalysis}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="lg:col-span-4 space-y-4">
          <ControlPanel label="Kuchlanish (U)" value={voltage} unit="V" color="text-yellow-400" accent="accent-yellow-500" min={0} max={24} onChange={setVoltage} />
          <ControlPanel label="Qarshilik (R)" value={resistance} unit="Ω" color="text-red-400" accent="accent-red-500" min={1} max={50} onChange={setResistance} />

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-6">
            <div className="flex justify-between items-end mb-2">
              <span className="text-slate-400 text-sm">Natija (I):</span>
              <span className={`text - 4xl font - bold font - mono ${isRunning ? 'text-white' : 'text-slate-600'} `}>{current} A</span>
            </div>
            <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${Math.min(current * 10, 100)}% ` }}></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleToggle}
              className={`col - span - 2 py - 4 rounded - xl font - bold text - lg shadow - lg transform transition - all active: scale - 95 flex items - center justify - center gap - 2 ${isRunning
                ? 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20'
                : 'bg-green-600 text-white hover:bg-green-500 shadow-green-600/30'
                } `}
            >
              {isRunning ? <><X /> Zanjirni Uzish</> : <><Play /> Zanjirni Ulash</>}
            </button>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !isRunning}
              className="col-span-2 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              {isAnalyzing ? <Loader className="animate-spin" size={20} /> : <Sparkles size={20} />}
              <span>AI Tahlil Qilish</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ControlPanel({ label, value, unit, color, accent, min, max, onChange }) {
  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
      <div className="flex justify-between mb-4">
        <span className={`font - bold ${color} `}>{label}</span>
        <span className="font-mono font-bold text-white bg-slate-900 px-3 py-1 rounded-lg border border-slate-700">{value} {unit}</span>
      </div>
      <input
        type="range" min={min} max={max} step="1"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className={`w - full h - 2 bg - slate - 700 rounded - lg appearance - none cursor - pointer ${accent} `}
      />
      <div className="flex justify-between mt-2 text-xs text-slate-500 font-mono">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
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

// --- SIDEBAR ITEM COMPONENT ---
function SidebarItem({ icon, label, id, active, set }) {
  return (
    <button
      onClick={() => set(id)}
      className={`relative group w-full p-3 rounded-xl transition-all duration-200 active:scale-90 flex flex-col items-center justify-center gap-1 ${active === id ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
    >
      <div className={`transition-transform duration-300 ${active === id ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
      </div>
      <span className="text-[10px] font-medium opacity-0 group-hover:opacity-100 absolute -bottom-2 transition-all duration-200 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-700 pointer-events-none whitespace-nowrap z-50">
        {label}
      </span>
    </button>
  );
}

// --- DASHBOARD COMPONENT ---
function Dashboard({ setActiveTab, userXP, userLevel, userStats, completedLessons = [], totalLessons = 24 }) {

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium border border-white/10">v2.5 Beta</span>
            <span className="flex items-center gap-1 text-yellow-300 text-sm font-bold"><Zap size={14} /> Premium</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">Fizika olamiga <br />xush kelibsiz!</h1>
          <p className="text-blue-100 text-lg mb-8 max-w-lg">9-sinf fizika kursini interaktiv usulda o'rganing. Darslar, testlar va virtual laboratoriya sizni kutmoqda.</p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setActiveTab('lessons')} className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg flex items-center gap-2"><Book size={20} /> Darslarni Boshlash</button>
            <button onClick={() => setActiveTab('quiz')} className="px-6 py-3 bg-blue-700/50 backdrop-blur-md text-white rounded-xl font-bold hover:bg-blue-700/70 transition-colors border border-white/20 flex items-center gap-2"><Brain size={20} /> AI Test</button>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div>
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
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

// --- DASHBOARD PAGE EXPORT ---
export default function DashboardPage() {
  return (
    <ErrorBoundary>
      <EduPhysicsAppContent />
    </ErrorBoundary>
  );
}