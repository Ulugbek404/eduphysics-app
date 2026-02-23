import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, Trash2, RefreshCw } from 'lucide-react';
import { askAITutor } from '../services/aiService';

// ─── Typing indicator ──────────────────────────────────────────────────────
function TypingDots() {
    return (
        <div className="flex items-center gap-1.5 px-4 py-3">
            <Bot size={16} className="text-indigo-400 flex-shrink-0" />
            <span className="text-slate-400 text-sm">AI o'ylayapti</span>
            <div className="flex gap-1 ml-1">
                {[0, 1, 2].map(i => (
                    <div key={i}
                        className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"
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
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                    <Bot size={16} className="text-white" />
                </div>
            )}
            <div className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${isUser
                ? 'bg-indigo-600 text-white rounded-br-none'
                : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700/60'
                }`}>
                {msg.text.split('\n').map((line, i) => (
                    <p key={i} className={line ? 'mb-1 last:mb-0' : 'h-2'}>{line}</p>
                ))}
            </div>
            {isUser && (
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 ml-2 mt-1">
                    <User size={16} className="text-slate-300" />
                </div>
            )}
        </div>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function AITutorModule({ topic = '' }) {
    const greeting = topic
        ? `Salom! Men NurFizika AI ustoziman. ⚛️\n"${topic}" mavzusidan savollaringiz bo'lsa bemalol so'rang!`
        : "Salom! Men NurFizika AI ustoziman. ⚛️\nFizikadan har qanday savol bering — qadamba-qadam tushuntiraman!";

    const [messages, setMessages] = useState([
        {
            role: 'ai',
            text: greeting
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        const userText = input.trim();
        setInput('');
        setError(null);

        setMessages(prev => [...prev, { role: 'user', text: userText }]);
        setIsLoading(true);

        try {
            const result = await askAITutor(userText, messages, topic);
            if (result.success) {
                setMessages(prev => [...prev, { role: 'ai', text: result.answer }]);
            } else {
                throw new Error(result.error);
            }
        } catch (err) {
            const msg = err.message?.includes('429')
                ? 'So\'rovlar juda ko\'p! 10 soniya kuting va qayta urining. 🔄'
                : 'Xatolik yuz berdi. Internet aloqasini tekshiring.';
            setError(msg);
        } finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const clearChat = () => {
        setMessages([{
            role: 'ai',
            text: "Suhbat tozalandi! Yangi savol bering. ⚛️"
        }]);
        setError(null);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-160px)] min-h-[500px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <Bot size={20} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-white font-bold text-base">AI Fizik Ustoz</h2>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <span className="text-slate-400 text-xs">Onlayn · Gemini 2.5 Flash</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-xs hidden sm:block">{messages.length - 1} xabar</span>
                    <button onClick={clearChat} title="Suhbatni tozalash"
                        className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-all">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-xl">
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {messages.map((msg, idx) => <MessageBubble key={idx} msg={msg} />)}

                    {isLoading && (
                        <div className="flex justify-start mb-3">
                            <div className="bg-slate-800 border border-slate-700/60 rounded-2xl rounded-bl-none">
                                <TypingDots />
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="flex items-center gap-2 mx-2 mb-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            <span className="flex-1">{error}</span>
                            <button onClick={handleSend} className="flex items-center gap-1 text-xs text-red-300 hover:text-white transition-colors">
                                <RefreshCw size={12} /> Qayta
                            </button>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-slate-800 bg-slate-900/80">
                    <div className="flex items-end gap-2">
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Fizikadan savol bering... (Enter — yuborish)"
                            rows={1}
                            className="flex-1 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all placeholder:text-slate-500 resize-none max-h-32"
                            style={{ height: 'auto', overflowY: 'auto' }}
                            onInput={e => {
                                e.target.style.height = 'auto';
                                e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
                            }}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="p-3 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl text-white hover:from-indigo-500 hover:to-violet-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                    <p className="text-center text-slate-600 text-[10px] mt-2">
                        AI xato qilishi mumkin. Muhim ma'lumotlarni tekshiring.
                    </p>
                </div>
            </div>
        </div>
    );
}
