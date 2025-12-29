import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Book, Atom, Brain, Trophy, User, ChevronRight, Play,
  RotateCcw, Menu, X, CheckCircle, AlertCircle, BarChart2,
  Zap, Flame, Award, ArrowRight, Settings, MessageSquare,
  Send, Sparkles, Loader, Bot, Key, Search
} from 'lucide-react';

// --- AI MODULI (API Sozlamalari bilan) ---
const AI_CONFIG = {
  model: "gemini-pro", // Barcha API kalitlar bilan ishlaydigan model
  baseUrl: "https://generativelanguage.googleapis.com/v1beta/models"
};

// --- ASOSIY APP KOMPONENTI ---
export default function EduPhysicsApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userXP, setUserXP] = useState(1250);
  const [userLevel, setUserLevel] = useState(5);
  const [notifications, setNotifications] = useState([]);

  // API Kalitni boshqarish
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || 'AIzaSyCnJ76FBichqvewV5_4ZZJwqQKFnFp1x-8');
  const [showSettings, setShowSettings] = useState(false);

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

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard setActiveTab={setActiveTab} userXP={userXP} userLevel={userLevel} />;
      case 'lessons': return <LessonsModule />;
      case 'lab': return <VirtualLab addNotification={addNotification} apiKey={apiKey} setShowSettings={setShowSettings} />;
      case 'quiz': return <QuizModule setUserXP={setUserXP} addNotification={addNotification} apiKey={apiKey} setShowSettings={setShowSettings} />;
      case 'profile': return <UserProfile userXP={userXP} userLevel={userLevel} />;
      default: return <Dashboard setActiveTab={setActiveTab} />;
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

      {/* Mobil menyu tugmasi */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 bg-blue-600 rounded-lg shadow-lg active:scale-95 transition-transform">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Yon panel (Sidebar) */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-800/95 backdrop-blur-xl border-r border-slate-700 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 flex flex-col`}>
        <div className="p-6 flex items-center space-x-3 border-b border-slate-700/50">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg shadow-lg shadow-blue-500/20">
            <Atom size={28} className="text-white animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              EduPhysics
            </h1>
            <span className="text-[10px] uppercase tracking-wider text-blue-400 font-bold flex items-center gap-1">
              AI Powered <Sparkles size={10} />
            </span>
          </div>
        </div>

        <nav className="mt-6 px-4 space-y-1 flex-1 overflow-y-auto custom-scrollbar">
          <SidebarItem icon={<BarChart2 />} label="Statistika" id="dashboard" active={activeTab} set={setActiveTab} />
          <SidebarItem icon={<Book />} label="Darslar" id="lessons" active={activeTab} set={setActiveTab} />
          <SidebarItem icon={<Zap />} label="Laboratoriya" id="lab" active={activeTab} set={setActiveTab} />
          <SidebarItem icon={<Brain />} label="AI Test Sinovlari" id="quiz" active={activeTab} set={setActiveTab} />
          <SidebarItem icon={<User />} label="Profil" id="profile" active={activeTab} set={setActiveTab} />
        </nav>

        <div className="p-4 border-t border-slate-700/50 bg-slate-900/30">
          <button
            onClick={() => setShowSettings(true)}
            className="w-full flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-700/50 transition-colors cursor-pointer group text-left"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-sm shadow-lg group-hover:scale-105 transition-transform">
              AZ
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Ulugbek R.</p>
              <p className="text-xs text-slate-400 truncate">Sozlamalar</p>
            </div>
            <Settings size={16} className="text-slate-500 group-hover:text-white transition-colors animate-spin-slow-hover" />
          </button>
        </div>
      </aside>

      {/* Asosiy oyna */}
      <main className="flex-1 overflow-y-auto bg-slate-900 relative scroll-smooth">
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
      const response = await fetch(
        `${AI_CONFIG.baseUrl}/${AI_CONFIG.model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userMsg }] }],
            systemInstruction: { parts: [{ text: "Sen 9-sinf o'quvchilari uchun 'EduPhysics' ilovasida ishlaydigan do'stona va bilimdon fizik ustozsan. Javoblarni o'zbek tilida, sodda, qiziqarli misollar bilan va ilmiy asoslangan holda ber. O'quvchini ilhomlantir. Formulalar ishlatsang, ularni tushuntirib ber." }] }
          })
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Uzr, tushunarsiz javob oldim.";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Xatolik yuz berdi. API kalitni tekshiring yoki internetni ko'zdan kechiring." }]);
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
      const response = await fetch(
        `${AI_CONFIG.baseUrl}/${AI_CONFIG.model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);

      setAiAnalysis(data.candidates?.[0]?.content?.parts?.[0]?.text);
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
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 translate-x-1'
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
        }`}
    >
      <span className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>{icon}</span>
      <span className="font-medium">{label}</span>
      {isActive && <ChevronRight size={16} className="ml-auto animate-pulse" />}
    </button>
  );
}

// 1. DASHBOARD
function Dashboard({ setActiveTab, userXP, userLevel }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Xush kelibsiz, Fizik! 👋</h2>
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

// 2. DARSLAR
function LessonsModule() {
  const lessons = [
    { id: 1, title: "Kinematika asoslari", desc: "Harakat traektoriyasi, yo'l va ko'chish.", status: "completed", progress: 100 },
    { id: 2, title: "Nyuton qonunlari", desc: "Kuch, massa va tezlanish bog'liqligi.", status: "completed", progress: 100 },
    { id: 3, title: "Elektr toki. Om qonuni", desc: "Zanjir qismi uchun Om qonuni.", status: "current", progress: 65 },
    { id: 4, title: "Optika va Yorug'lik", desc: "Yorug'likning sinishi va qaytishi.", status: "locked", progress: 0 },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Fizika 9-sinf Mavzulari</h2>
        <div className="text-sm text-slate-400">Jami: 4 ta bob</div>
      </div>
      <div className="grid gap-4">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} {...lesson} />
        ))}
      </div>
    </div>
  );
}

function LessonCard({ id, title, desc, status, progress }) {
  const styles = {
    completed: { border: 'border-green-500/30', bg: 'bg-slate-800', icon: <CheckCircle className="text-green-400" />, bar: 'bg-green-500' },
    current: { border: 'border-blue-500', bg: 'bg-slate-800 shadow-[0_0_20px_rgba(59,130,246,0.15)]', icon: <Play className="text-blue-400 fill-blue-400" />, bar: 'bg-blue-500' },
    locked: { border: 'border-slate-700', bg: 'bg-slate-800/50 opacity-60', icon: <Book className="text-slate-500" />, bar: 'bg-slate-600' }
  };
  const style = styles[status];

  return (
    <div className={`relative overflow-hidden flex items-center p-5 rounded-2xl border ${style.border} ${style.bg} hover:bg-slate-750 transition-all cursor-pointer group`}>
      {status === 'current' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>}
      <span className={`text-2xl font-bold mr-6 w-8 ${status === 'locked' ? 'text-slate-600' : 'text-white'}`}>
        {id < 10 ? `0${id}` : id}
      </span>
      <div className="flex-1 z-10">
        <h3 className={`text-lg font-bold ${status === 'locked' ? 'text-slate-400' : 'text-white'} mb-1`}>{title}</h3>
        <p className="text-sm text-slate-400">{desc}</p>
        {status !== 'locked' && (
          <div className="mt-3 w-32 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${style.bar}`} style={{ width: `${progress}%` }}></div>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-full bg-slate-900 border border-slate-700 ${status === 'current' ? 'animate-pulse' : ''}`}>
        {style.icon}
      </div>
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
      const response = await fetch(
        `${AI_CONFIG.baseUrl}/${AI_CONFIG.model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

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