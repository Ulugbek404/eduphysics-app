import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Bot, Send, User, Sparkles } from 'lucide-react';
import PageHeader from './ui/PageHeader';

const MODEL_NAME = "gemini-2.5-flash";
const API_KEYS = [
    "AIzaSyCC8uEzh1px6KKsXP8FEkh_JS_3F1ErtDQ",
    "AIzaSyBUzgU8ARMbZX1OYGv0f_cIqQJqaWdlGVM"
];

export default function AITutorModule({ setActiveTab }) {
    const [messages, setMessages] = useState([
        { role: 'ai', text: "Salom! Men AI Fizik Ustozman. Menga dars bo'yicha har qanday savol berishingiz mumkin. ⚛️" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setInput("");
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsLoading(true);

        try {
            // Randomly select an API key
            const apiKey = API_KEYS[Math.floor(Math.random() * API_KEYS.length)];
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
            if (error.message.includes("429")) {
                errorMessage += "Juda ko'p so'rovlar (Limit). Iltimos, 10 soniya kuting.";
            } else {
                errorMessage += "Internetni tekshiring va qaytadan urining.";
            }

            setMessages(prev => [...prev, { role: 'ai', text: errorMessage }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col">
            {/* Header */}
            <PageHeader
                title="AI Fizik Ustoz"
                rightElement={
                    <div className="bg-purple-600/20 p-2 rounded-full">
                        <Sparkles size={20} className="text-purple-400 animate-pulse" />
                    </div>
                }
            />

            {/* Chat Container */}
            <div className="flex-1 bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden flex flex-col shadow-2xl relative">

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50 hover:scroll-auto custom-scrollbar">
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
                            <Bot size={64} className="mb-4" />
                            <p>Savolingizni yozing...</p>
                        </div>
                    )}

                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slideUp`}>
                            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg flex items-start gap-3 ${msg.role === 'user'
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-slate-700 text-slate-200 rounded-bl-none border border-slate-600'
                                }`}>
                                {msg.role === 'ai' && <Bot size={18} className="mt-1 flex-shrink-0" />}

                                <div className="markdown-body">
                                    {/* Oddiy text render (keyinchalik markdown qilsa bo'ladi) */}
                                    {msg.text.split('\n').map((line, i) => (
                                        <p key={i} className="mb-1 last:mb-0">{line}</p>
                                    ))}
                                </div>

                                {msg.role === 'user' && <User size={18} className="mt-1 flex-shrink-0 opacity-70" />}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start animate-pulse">
                            <div className="bg-slate-700 p-4 rounded-2xl rounded-bl-none flex items-center space-x-2">
                                <Bot size={18} />
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-slate-800 border-t border-slate-700">
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Fizikadan savol bering..."
                            className="w-full bg-slate-900 text-white rounded-xl pl-4 pr-12 py-3.5 border border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all placeholder:text-slate-500"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="absolute right-2 p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg active:scale-95"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                    <div className="text-center mt-2">
                        <p className="text-[10px] text-slate-500">
                            AI xato qilishi mumkin. Javoblarni tekshiring.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
