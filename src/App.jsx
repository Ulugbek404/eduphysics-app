import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Book, Atom, Brain, Trophy, User, ChevronRight, Play,
  RotateCcw, Menu, X, CheckCircle, AlertCircle, BarChart2,
  Zap, Flame, Award, ArrowRight, Settings, MessageSquare,
  Send, Sparkles, Loader, Bot, Key, Search, LogOut
} from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { getUserProgress, addUserXP, updateUserLevel, markLessonComplete, saveQuizResult } from './services/userService';
import { lessonsData, calculateChapterProgress } from './data/lessonsData';
import { testsData } from './data/testsData';
import LoginPage from './components/LoginPage';
import TestsModule from './components/TestsModule';
import { GoogleGenerativeAI } from "@google/generative-ai";

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

// --- ASOSIY APP KOMPONENTI ---
export default function EduPhysicsApp() {
  const { user, loading, logout } = useAuth();

  // BARCHA STATE HOOKS - conditional return'dan OLDIN
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Sidebar yashirish/ko'rsatish

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
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '');
  const [showSettings, setShowSettings] = useState(false);
  const [progressLoading, setProgressLoading] = useState(true);

  // Xabar chiqarish funksiyasi (Toast)
  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  // API Kalitni saqlash
  const saveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
    addNotification("API kalit saqlandi!", "success");
    setShowSettings(false);
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
      setUserLevel(progress.level || 1);
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

  // CONDITIONAL RETURNS - barcha hooks'dan KEYIN
  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <LoginPage />;
  }

  // Render content function
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard setActiveTab={setActiveTab} userXP={userXP} userLevel={userLevel} />;
      case 'lessons': return <LessonsModule completedLessons={completedLessons} completeLesson={completeLesson} />;
      case 'tests': return <TestsModule addXP={addXP} addNotification={addNotification} />;
      case 'lab': return <VirtualLab addNotification={addNotification} apiKey={apiKey} setShowSettings={setShowSettings} />;
      case 'quiz': return <QuizModule setUserXP={setUserXP} addNotification={addNotification} apiKey={apiKey} setShowSettings={setShowSettings} />;
      case 'profile': return <UserProfile userXP={userXP} userLevel={userLevel} />;
      default: return <Dashboard setActiveTab={setActiveTab} userXP={userXP} userLevel={userLevel} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-white font-sans overflow-hidden selection:bg-blue-500 selection:text-white">

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

      {/* Settings Modal (API Key) */}
      {showSettings && (
        <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Settings className="text-blue-400" /> Sozlamalar
              </h3>
              <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Google Gemini API Key</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="password"
                    defaultValue={apiKey}
                    id="apiKeyInput"
                    placeholder="AIzaSy..."
                    className="w-full bg-slate-900 border border-slate-600 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-colors text-white"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Kalit brauzeringiz xotirasida (LocalStorage) saqlanadi.
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline ml-1">Kalitni bu yerdan oling.</a>
                </p>
              </div>

              <button
                onClick={() => saveApiKey(document.getElementById('apiKeyInput').value)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all active:scale-95"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hamburger menyu o'chirildi - icon-only sidebar doimo ko'rinadi */}

      {/* Overlay o'chirildi - icon-only sidebar doimo ko'rinadi */}

      {/* Yon panel (Sidebar) - Icon-Only */}
      <aside className={`fixed inset-y-0 left-0 z-40 bg-slate-800/95 backdrop-blur-xl border-r border-slate-700 flex flex-col transition-all duration-300 ${sidebarCollapsed ? '-translate-x-full w-20' : 'translate-x-0 w-20'
        }`}>
        {/* Logo */}
        <div className="p-4 flex items-center justify-center border-b border-slate-700/50">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg shadow-lg shadow-blue-500/20">
            <Atom size={24} className="text-white animate-spin-slow" />
          </div>
        </div>

        {/* Navigation - Icon Only */}
        <nav className="mt-3 px-2 space-y-2 flex-1 overflow-y-auto custom-scrollbar">
          <SidebarItem icon={<BarChart2 />} label="Statistika" id="dashboard" active={activeTab} set={setActiveTab} />
          <SidebarItem icon={<Book />} label="Darslar" id="lessons" active={activeTab} set={setActiveTab} />
          <SidebarItem icon={<Trophy />} label="Testlar" id="tests" active={activeTab} set={setActiveTab} />
          <SidebarItem icon={<Zap />} label="Laboratoriya" id="lab" active={activeTab} set={setActiveTab} />
          <SidebarItem icon={<Brain />} label="AI Test Sinovlari" id="quiz" active={activeTab} set={setActiveTab} />
          <SidebarItem icon={<User />} label="Profil" id="profile" active={activeTab} set={setActiveTab} />
        </nav>

        {/* User Section - Icon Only */}
        <div className="p-2 border-t border-slate-700/50 bg-slate-900/30 space-y-2">
          {/* User Avatar */}
          <div className="flex justify-center">
            <img
              src={user.photoURL || 'https://via.placeholder.com/40'}
              alt={user.displayName}
              className="w-10 h-10 rounded-full border-2 border-blue-500/30"
            />
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

      {/* Toggle Button - Fixed, doimo ko'rinadi */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className={`fixed top-[120px] z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-r-lg shadow-lg hover:shadow-xl transition-all duration-300 ${sidebarCollapsed ? 'left-0' : 'left-[60px]'
          }`}
        title={sidebarCollapsed ? "Sidebar'ni ko'rsatish" : "Sidebar'ni yashirish"}
      >
        <ChevronRight size={20} className={`transition-transform duration-300 ${sidebarCollapsed ? 'rotate-0' : 'rotate-180'
          }`} />
      </button>

      {/* Asosiy oyna */}
      <main className={`flex-1 overflow-y-auto bg-slate-900 relative scroll-smooth transition-all duration-300 ${sidebarCollapsed ? 'ml-0' : 'ml-20'
        }`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl mix-blend-screen"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl mix-blend-screen"></div>
        </div>

        <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto min-h-full pb-24">
          {renderContent()}
        </div>
      </main>

      {/* ✨ GLOBAL AI ASSISTANT ✨ */}
      <AIAssistant apiKey={apiKey} setShowSettings={setShowSettings} />
    </div>
  );
}

// --- AI CHAT ASSISTANT COMPONENT ---
function AIAssistant({ apiKey, setShowSettings }) {
  const [isOpen, setIsOpen] = useState(false);
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
    if (!apiKey) {
      setMessages(prev => [...prev, { role: 'ai', text: "Iltimos, avval Sozlamalar bo'limida API Kalitni kiriting." }]);
      setShowSettings(true);
      return;
    }

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
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
      let errorMessage = "Xatolik yuz berdi.";
      if (error.message.includes("404")) errorMessage = "Model topilmadi.";
      if (error.message.includes("403")) errorMessage = "API kalit noto'g'ri.";

      setMessages(prev => [...prev, { role: 'ai', text: errorMessage + " Iltimos, sozlamalarni tekshiring." }]);
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
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none shadow-lg'
                  : 'bg-slate-700 text-slate-200 rounded-bl-none shadow-md'
                  }`}>
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
              placeholder={apiKey ? "Savol bering..." : "API Kalit kiritilmagan"}
              disabled={!apiKey}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim() || !apiKey}
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
function VirtualLab({ addNotification, apiKey, setShowSettings }) {
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
    if (!apiKey) {
      addNotification("AI ishlashi uchun Sozlamalardan API kalit kiriting", "warning");
      setShowSettings(true);
      return;
    }

    setIsAnalyzing(true);
    setAiAnalysis(null);

    const prompt = `Men 9-sinf fizika laboratoriyasida tajriba o'tkazyapman. 
    NATIJALAR: 
    - Kuchlanish (U): ${voltage} Volt
    - Qarshilik (R): ${resistance} Om
    - Tok kuchi (I): ${current} Amper.
    
    VAZIFA:
    Ushbu natijani Om qonuniga (I=U/R) asosan qisqa, ilmiy va tushunarli tahlil qilib ber. Nega tok kuchi aynan shunday chiqdi? Agar qarshilikni oshirsak nima bo'ladi? Javobni o'zbek tilida ber.`;

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const analysisText = response.text();

      if (!analysisText) {
        throw new Error("AI javob bo'sh qaytardi.");
      }

      setAiAnalysis(analysisText);
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
                    <div className={`w-10 h-16 border-2 ${isRunning ? 'border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.4)]' : 'border-slate-500'} rounded bg-slate-800 flex flex-col items-center justify-center transition-all`}>
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
                        filter: isRunning ? `drop-shadow(0 0 ${current * 5}px #FEF08A)` : 'none',
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
                      style={{ height: `${(point.i / 6) * 100}px`, maxHeight: '80px' }}
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
              <span className={`text-4xl font-bold font-mono ${isRunning ? 'text-white' : 'text-slate-600'}`}>{current} A</span>
            </div>
            <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${Math.min(current * 10, 100)}%` }}></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleToggle}
              className={`col-span-2 py-4 rounded-xl font-bold text-lg shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-2 ${isRunning
                ? 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20'
                : 'bg-green-600 text-white hover:bg-green-500 shadow-green-600/30'
                }`}
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
        <span className={`font-bold ${color}`}>{label}</span>
        <span className="font-mono font-bold text-white bg-slate-900 px-3 py-1 rounded-lg border border-slate-700">{value} {unit}</span>
      </div>
      <input
        type="range" min={min} max={max} step="1"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className={`w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer ${accent}`}
      />
      <div className="flex justify-between mt-2 text-xs text-slate-500 font-mono">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

function SidebarItem({ icon, label, id, active, set }) {
  const isActive = active === id;
  return (
    <button
      onClick={() => set(id)}
      className={`relative w-full flex items-center justify-center p-3 rounded-xl transition-all duration-200 group ${isActive
        ? 'bg-blue-600/20 text-blue-400'
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
        }`}
      title={label}
    >
      {/* Active Indicator - Chap tomonda vertikal bar */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full"></div>
      )}

      {/* Icon */}
      <span className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
      </span>
    </button>
  );
}

// 1. DASHBOARD
function Dashboard({ setActiveTab, userXP, userLevel }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Fizika Dunyosiga Xush Kelibsiz! 🚀</h2>
          <p className="text-slate-400">Bugungi maqsad: <span className="text-blue-400 font-semibold">Elektr toki</span> mavzusini tugatish.</p>
        </div>
        <div className="hidden md:flex items-center space-x-2 bg-orange-500/10 px-4 py-2 rounded-full border border-orange-500/20">
          <Flame className="text-orange-500 fill-orange-500 animate-pulse" size={20} />
          <span className="text-orange-400 font-bold">3 Kunlik Streak</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Trophy className="text-yellow-400" />}
          title="Jami Ballar"
          value={userXP}
          suffix="XP"
          desc="Top 5% o'quvchilar qatoridasiz"
          color="from-yellow-500/20 to-orange-500/5 border-yellow-500/20"
        />
        <StatCard
          icon={<Book className="text-blue-400" />}
          title="Mavzular"
          value="78"
          suffix="%"
          desc="3 ta mavzu to'liq tugatildi"
          color="from-blue-500/20 to-cyan-500/5 border-blue-500/20"
        />
        <StatCard
          icon={<Award className="text-purple-400" />}
          title="Daraja"
          value={userLevel}
          suffix="-lvl"
          desc="Keyingi darajaga 250 XP"
          color="from-purple-500/20 to-pink-500/5 border-purple-500/20"
        />
      </div>

      <div className="group relative bg-slate-800 rounded-3xl p-1 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-50 blur-xl group-hover:opacity-70 transition-opacity duration-500"></div>
        <div className="relative bg-slate-900 rounded-[22px] p-6 border border-slate-700/50 h-full">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border border-slate-600 flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <Zap size={48} className="text-blue-400" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-3">
              <div>
                <h3 className="text-2xl font-bold text-white">Elektr Toki Qonunlari</h3>
                <p className="text-slate-400">Om qonuni va uning tatbiqi • 9-sinf</p>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full w-[65%] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
              </div>
            </div>

            <button onClick={() => setActiveTab('lessons')} className="flex items-center space-x-2 px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-white/20 active:scale-95">
              <span>Davom etish</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, suffix, desc, color }) {
  return (
    <div className={`p-6 rounded-2xl border bg-gradient-to-br ${color} backdrop-blur-sm hover:-translate-y-1 transition-transform duration-300`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-900/40 rounded-xl backdrop-blur-md shadow-inner">{icon}</div>
      </div>
      <h3 className="text-4xl font-bold text-white mb-1 tracking-tight">
        {value}<span className="text-lg text-slate-400 ml-1 font-medium">{suffix}</span>
      </h3>
      <p className="text-slate-400 text-sm mb-2 font-medium">{title}</p>
      <p className="text-xs text-slate-500 bg-slate-900/30 inline-block px-2 py-1 rounded-md">{desc}</p>
    </div>
  );
}

// 2. DARSLAR MODULI
function LessonsModule({ completedLessons = [], completeLesson }) {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Chapter selection view
  if (!selectedChapter) {
    return <ChapterGrid onSelect={setSelectedChapter} completedLessons={completedLessons} />;
  }

  // Lesson list view
  if (!selectedLesson) {
    return (
      <LessonList
        chapter={selectedChapter}
        onBack={() => setSelectedChapter(null)}
        onSelect={setSelectedLesson}
        completedLessons={completedLessons}
      />
    );
  }

  // Lesson detail view
  return (
    <LessonDetail
      lesson={selectedLesson}
      chapter={selectedChapter}
      onBack={() => setSelectedLesson(null)}
      onComplete={completeLesson}
      isCompleted={completedLessons.includes(selectedLesson.id)}
    />
  );
}

// Chapter Grid Component
function ChapterGrid({ onSelect, completedLessons }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">9-Sinf Fizika Dasturi</h2>
        <p className="text-slate-400">Barcha mavzularni o'rganing va ustoz bo'ling!</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessonsData.chapters.map((chapter) => (
          <ChapterCard
            key={chapter.id}
            chapter={chapter}
            onClick={() => onSelect(chapter)}
            completedLessons={completedLessons}
          />
        ))}
      </div>
    </div>
  );
}

// Chapter Card Component
function ChapterCard({ chapter, onClick, completedLessons }) {
  const progress = calculateChapterProgress(chapter, completedLessons);
  const colorClasses = {
    blue: 'from-blue-600 to-blue-400',
    yellow: 'from-yellow-600 to-yellow-400',
    purple: 'from-purple-600 to-purple-400',
    cyan: 'from-cyan-600 to-cyan-400',
    amber: 'from-amber-600 to-amber-400',
    green: 'from-green-600 to-green-400'
  };

  return (
    <div
      onClick={onClick}
      className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-blue-500 cursor-pointer transition-all group hover:scale-105"
    >
      {/* Icon */}
      <div className="text-6xl mb-4">{chapter.icon}</div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-2">{chapter.title}</h3>
      <p className="text-slate-400 text-sm mb-4">{chapter.description}</p>

      {/* Stats */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-400">
          <span>{chapter.lessons.length} ta dars</span>
          <span>{progress}%</span>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${colorClasses[chapter.color] || 'from-blue-600 to-blue-400'} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// Lesson List Component
function LessonList({ chapter, onBack, onSelect, completedLessons }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        {/* Desktop: Qaytish tugmasi chap tomonda */}
        <button
          onClick={onBack}
          className="hidden md:flex p-2 hover:bg-slate-800 rounded-lg transition-colors"
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
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all shadow-lg"
            >
              <ChevronRight className="rotate-180" size={18} />
              <span className="text-sm font-medium">Orqaga</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div className="space-y-4">
        {chapter.lessons.map((lesson, index) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            index={index}
            onClick={() => onSelect(lesson)}
            isCompleted={completedLessons.includes(lesson.id)}
          />
        ))}
      </div>
    </div>
  );
}

// Lesson Card Component
function LessonCard({ lesson, index, onClick, isCompleted }) {
  return (
    <div
      onClick={onClick}
      className={`bg-slate-800 rounded-xl p-6 border ${isCompleted ? 'border-green-500' : 'border-slate-700'
        } hover:border-blue-500 cursor-pointer transition-all group`}
    >
      <div className="flex items-center gap-4">
        {/* Status Icon */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isCompleted ? 'bg-green-500/20' : 'bg-blue-500/20'
          }`}>
          {isCompleted ? (
            <CheckCircle className="text-green-500" size={24} />
          ) : (
            <span className="text-blue-500 font-bold">{index + 1}</span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h4 className="text-lg font-bold mb-1">{lesson.title}</h4>
          <p className="text-slate-400 text-sm">{lesson.description}</p>
        </div>

        {/* Meta */}
        <div className="text-right space-y-1">
          <div className="text-sm text-slate-400">{lesson.duration}</div>
          <div className="text-yellow-500 font-bold">+{lesson.xp} XP</div>
        </div>

        {/* Arrow */}
        <ChevronRight className="text-slate-600 group-hover:text-blue-500 transition-colors" />
      </div>
    </div>
  );
}

// Lesson Detail Component
function LessonDetail({ lesson, chapter, onBack, onComplete, isCompleted }) {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Desktop: Qaytish tugmasi chap tomonda */}
        <button
          onClick={onBack}
          className="hidden md:flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ChevronRight className="rotate-180" size={20} />
          <span>Orqaga</span>
        </button>

        {/* Mobile: Qaytish tugmasi o'ng tomonda */}
        <button
          onClick={onBack}
          className="md:hidden self-end flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all shadow-lg"
        >
          <ChevronRight className="rotate-180" size={18} />
          <span className="text-sm font-medium">Orqaga</span>
        </button>

        {!isCompleted && (
          <button
            onClick={() => onComplete(lesson.id)}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 rounded-xl font-bold transition-all shadow-lg shadow-green-600/20"
          >
            <CheckCircle size={20} />
            <span className="hidden md:inline">Darsni Tugatish</span>
            <span className="md:hidden">Tugatish</span>
            <span>+{lesson.xp} XP</span>
          </button>
        )}

        {isCompleted && (
          <div className="flex items-center gap-2 px-6 py-3 bg-green-500/20 border border-green-500 rounded-xl font-bold text-green-500">
            <CheckCircle size={20} />
            Tugallangan
          </div>
        )}
      </div>

      {/* Title */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{chapter.icon}</span>
          <div>
            <div className="text-sm text-slate-400">{chapter.title}</div>
            <h1 className="text-4xl font-bold">{lesson.title}</h1>
          </div>
        </div>
        <p className="text-slate-400 text-lg">{lesson.description}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-700">
        <TabButton
          active={activeTab === 'theory'}
          onClick={() => setActiveTab('theory')}
          icon={<Book size={18} />}
          label="Nazariya"
        />
        <TabButton
          active={activeTab === 'examples'}
          onClick={() => setActiveTab('examples')}
          icon={<Zap size={18} />}
          label="Misollar"
        />
        <TabButton
          active={activeTab === 'video'}
          onClick={() => setActiveTab('video')}
          icon={<Play size={18} />}
          label="Video"
        />
      </div>

      {/* Content */}
      <div className="bg-slate-800 rounded-2xl p-8 min-h-[400px]">
        {activeTab === 'theory' && <TheoryContent content={lesson.content.theory} formulas={lesson.content.formulas} />}
        {activeTab === 'examples' && <ExamplesContent examples={lesson.content.examples} />}
        {activeTab === 'video' && <VideoContent url={lesson.content.video} />}
      </div>
    </div>
  );
}

// Tab Button Component
function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 font-bold transition-all ${active
        ? 'text-blue-500 border-b-2 border-blue-500'
        : 'text-slate-400 hover:text-white'
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

// Theory Content Component
function TheoryContent({ content, formulas }) {
  return (
    <div className="prose prose-invert max-w-none">
      <div className="whitespace-pre-wrap text-slate-300 leading-relaxed">
        {content}
      </div>

      {formulas && formulas.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-bold text-white">Formulalar:</h3>
          {formulas.map((formula, index) => (
            <div key={index} className="bg-slate-900 rounded-xl p-4 border border-slate-700">
              <div className="font-bold text-blue-400 mb-1">{formula.name}</div>
              <div className="text-2xl font-mono text-white mb-2">{formula.formula}</div>
              <div className="text-sm text-slate-400">{formula.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Examples Content Component
function ExamplesContent({ examples }) {
  return (
    <div className="space-y-6">
      {examples.map((example, index) => (
        <div key={index} className="bg-slate-900 rounded-xl p-6 border border-slate-700">
          <h4 className="text-xl font-bold text-blue-400 mb-4">{example.title}</h4>

          <div className="space-y-4">
            <div>
              <div className="text-sm text-slate-400 mb-2">Masala:</div>
              <div className="text-white">{example.problem}</div>
            </div>

            <div>
              <div className="text-sm text-slate-400 mb-2">Yechim:</div>
              <div className="whitespace-pre-wrap text-slate-300 bg-slate-800 rounded-lg p-4">
                {example.solution}
              </div>
            </div>

            <div className="flex items-center gap-2 text-green-400 font-bold">
              <CheckCircle size={20} />
              Javob: {example.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Video Content Component
function VideoContent({ url }) {
  return (
    <div className="space-y-4">
      <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden">
        <iframe
          src={url}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <p className="text-slate-400 text-center">
        Video darsni diqqat bilan tomosha qiling va asosiy tushunchalarni eslab qoling.
      </p>
    </div>
  );
}


// 4. MUKAMMAL AI TEST TUZUVCHI (Quiz)
function QuizModule({ setUserXP, addNotification, apiKey, setShowSettings }) {
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
    if (!apiKey) {
      addNotification("AI ishlashi uchun API kalit kiriting", "warning");
      setShowSettings(true);
      return;
    }

    setIsGenerating(true);

    // JSON formatda javob olish uchun aniq prompt
    const prompt = `Fizika bo'yicha "${topic}" mavzusida 5 ta qiziqarli test savoli tuz.
    Javobni faqat va faqat quyidagi JSON formatda qaytar (boshqa hech qanday matnsiz):
    [
      { 
        "q": "Savol matni", 
        "options": ["A javob", "B javob", "C javob", "D javob"], 
        "ans": to'g'ri_javob_indeksi_raqamda_0_dan_3_gacha 
      }
    ]
    Savollar 9-sinf darajasida, o'zbek tilida bo'lsin.`;

    try {
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
          <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-xl rotate-3">
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
function UserProfile({ userXP, userLevel }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl border-4 border-white/20">AZ</div>
            <div className="absolute bottom-2 right-2 bg-yellow-400 text-black font-bold px-3 py-1 rounded-full text-xs shadow-lg border border-white">PRO</div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold text-white mb-2">Ulugbek R.</h2>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Trophy className="text-yellow-500" /> Yutuqlarim</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <AchievementCard title="Birinchi Qadam" icon={<Zap />} unlocked={true} />
            <AchievementCard title="Om Qonuni" icon={<Atom />} unlocked={true} />
            <AchievementCard title="Test Ustasi" icon={<Brain />} unlocked={false} />
            <AchievementCard title="7 Kunlik" icon={<Flame />} unlocked={false} />
          </div>
        </div>
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold mb-6">Statistika</h3>
          <ul className="space-y-4">
            <StatRow label="O'qilgan vaqt" value="12s 30m" />
            <StatRow label="Yechilgan testlar" value="45 ta" />
            <StatRow label="O'rtacha baho" value="92%" color="text-green-400" />
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