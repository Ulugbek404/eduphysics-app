import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Bot, Send, User, Sparkles, Trash2, RefreshCw } from 'lucide-react';
import { useGeminiAI } from '../hooks/useGeminiAI';

// ─── Typing indicator ──────────────────────────────────────────────────────
function TypingDots() {
    return (
        <div className="flex items-center gap-1.5 px-4 py-3">
            <Bot size={16} className="text-teal-500 flex-shrink-0" />
            <span className="theme-muted text-sm">AI o'ylayapti</span>
            <div className="flex gap-1 ml-1">
                {[0, 1, 2].map(i => (
                    <div key={i}
                        className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                    />
                ))}
            </div>
        </div>
    );
}

// ─── Message bubble ────────────────────────────────────────────────────────
function MessageBubble({ msg }) {
    const isUser = msg.role === 'user';
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
            {!isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-600 to-emerald-600 flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                    <Bot size={16} className="text-white" />
                </div>
            )}
            <div className={`max-w-[88%] px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-lg ${isUser
                ? 'bg-teal-600 text-white rounded-br-none'
                : 'theme-card theme-text rounded-bl-none border theme-border'
                }`}>
                {msg.text.split('\n').map((line, i) => (
                    <p key={i} className={line ? 'mb-1 last:mb-0' : 'h-2'}>{line}</p>
                ))}
            </div>
            {isUser && (
                <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0 ml-2 mt-1">
                    <User size={16} className="text-teal-600 dark:text-teal-400" />
                </div>
            )}
        </div>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function AITutorModule({ topic = '', messages: propMessages, setMessages: propSetMessages }) {
    const greeting = topic
        ? `Salom! Men NurFizika AI ustoziman. ⚛️\n"${topic}" mavzusidan savollaringiz bo'lsa bemalol so'rang!`
        : "Salom! Men NurFizika AI ustoziman. ⚛️\nFizikadan har qanday savol bering — qadamba-qadam tushuntiraman!";

    const [localMessages, setLocalMessages] = useState([{ role: 'ai', text: greeting }]);
    
    // Prefer props if provided, fallback to local state
    const messages = propMessages || localMessages;
    const setMessages = propSetMessages || setLocalMessages;

    const [input, setInput] = useState('');
    const [localError, setLocalError] = useState(null);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // useGeminiAI — AI mantiq hook ichida, re-renderdan ta'sirlanmaydi
    const { isLoading, sendMessage } = useGeminiAI();

    // Scroll — faqat messages yoki isLoading o'zgarganda
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]); // ← to'g'ri dependency array

    // handleSend — useCallback bilan o'ralgan, faqat zarur o'zgarishda yangilanadi
    const handleSend = useCallback(async () => {
        if (!input.trim() || isLoading) return;
        const userText = input.trim();
        setInput('');
        setLocalError(null);

        setMessages(prev => [...prev, { role: 'user', text: userText }]);

        // sendMessage hook ichida useCallback([], []) — HECH QACHON qayta yaratilmaydi
        const answer = await sendMessage(userText, messages, topic);
        if (answer) {
            setMessages(prev => [...prev, { role: 'ai', text: answer }]);
        } else {
            setLocalError("Xatolik yuz berdi. Qayta urining.");
        }

        inputRef.current?.focus();
    }, [input, isLoading, messages, topic, sendMessage]); // ← minimal deps

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }, [handleSend]);

    const clearChat = useCallback(() => {
        setMessages([{ role: 'ai', text: "Suhbat tozalandi! Yangi savol bering. ⚛️" }]);
        setLocalError(null);
    }, []);

    return (
        <div className="border theme-border rounded-2xl theme-card flex flex-col h-[calc(100vh-220px)] md:h-[650px] min-h-[500px] overflow-hidden shadow-lg relative">
            {/* Background pattern for premium feel */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b theme-border theme-card">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/30">
                        <Bot size={20} className="text-white" />
                    </div>
                    <div>
                        <h2 className="theme-text font-bold text-base">NurFizika AI</h2>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <span className="theme-muted text-xs">Onlayn · NurFizika AI</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="theme-muted text-xs hidden sm:block">{messages.length - 1} xabar</span>
                    <button onClick={clearChat} title="Suhbatni tozalash"
                        className="p-2 rounded-lg theme-muted hover:theme-text hover:theme-card transition-all">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar relative z-10">
                    {messages.map((msg, idx) => <MessageBubble key={idx} msg={msg} />)}

                    {isLoading && (
                        <div className="flex justify-start mb-3">
                            <div className="theme-card border theme-border rounded-2xl rounded-bl-none">
                                <TypingDots />
                            </div>
                        </div>
                    )}

                    {localError && (
                        <div className="flex items-center gap-2 mx-2 mb-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            <span className="flex-1">{localError}</span>
                            <button onClick={handleSend} className="flex items-center gap-1 text-xs text-red-300 hover:text-white transition-colors">
                                <RefreshCw size={12} /> Qayta
                            </button>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-6 border-t theme-border theme-card relative z-10">
                    <div className="flex items-end gap-3">
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Savol bering..."
                            rows={1}
                            className="flex-1 theme-input text-[15px] rounded-2xl px-5 py-4 border-2 border-teal-500/50 dark:border-teal-500/30 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 focus:outline-none transition-all placeholder:text-slate-500 dark:placeholder:text-slate-400 placeholder:opacity-80 resize-none max-h-48 shadow-md theme-surface"
                            style={{ height: 'auto', overflowY: 'auto' }}
                            onInput={e => {
                                e.target.style.height = 'auto';
                                e.target.style.height = Math.min(e.target.scrollHeight, 192) + 'px';
                            }}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="p-4 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-2xl text-white hover:from-teal-500 hover:to-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xl shadow-teal-500/30 active:scale-95 group border border-teal-400/20"
                        >
                            <Send size={22} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                    <p className="text-center theme-muted text-[11px] mt-3 font-medium">
                        AI xato qilishi mumkin. Muhim ma'lumotlarni tekshiring.
                    </p>
                </div>
        </div>
    );
}
