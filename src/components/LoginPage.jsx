import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Atom, Sparkles, AlertCircle, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const { loginWithGoogle, loginWithEmail, signUpWithEmail, resetPassword, error } = useAuth();
    const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'signup'
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    // Form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setMessage('');
        try {
            await loginWithGoogle();
        } catch (err) {
            console.error('Login failed:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailSignIn = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setMessage('Email va parolni kiriting');
            return;
        }
        setIsLoading(true);
        setMessage('');
        try {
            await loginWithEmail(email, password);
        } catch (err) {
            setMessage('Email yoki parol noto\'g\'ri');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailSignUp = async (e) => {
        e.preventDefault();
        if (!displayName || !email || !password || !confirmPassword) {
            setMessage('Barcha maydonlarni to\'ldiring');
            return;
        }
        if (password !== confirmPassword) {
            setMessage('Parollar mos emas');
            return;
        }
        if (password.length < 6) {
            setMessage('Parol kamida 6 ta belgidan iborat bo\'lishi kerak');
            return;
        }
        setIsLoading(true);
        setMessage('');
        try {
            await signUpWithEmail(email, password, displayName);
        } catch (err) {
            setMessage(err.message.includes('email-already-in-use')
                ? 'Bu email allaqachon ro\'yxatdan o\'tgan'
                : 'Xatolik yuz berdi');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (!resetEmail) {
            setMessage('Emailni kiriting');
            return;
        }
        setIsLoading(true);
        setMessage('');
        try {
            await resetPassword(resetEmail);
            setMessage('Parolni tiklash havolasi emailingizga yuborildi!');
            setTimeout(() => {
                setShowForgotPassword(false);
                setResetEmail('');
                setMessage('');
            }, 3000);
        } catch (err) {
            setMessage('Email topilmadi');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-y-auto">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 max-w-md w-full space-y-4 my-8">
                {/* Logo va Title */}
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                            <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl shadow-2xl">
                                <Atom size={48} className="text-white animate-spin-slow" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-2">
                            EduPhysics
                        </h1>
                        <p className="text-slate-400 flex items-center justify-center gap-2">
                            AI-powered Fizika Platformasi <Sparkles size={16} className="text-blue-400" />
                        </p>
                    </div>
                </div>

                {/* Forgot Password Modal */}
                {showForgotPassword && (
                    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 w-full max-w-md">
                            <h3 className="text-xl font-bold text-white mb-4">Parolni Tiklash</h3>
                            <form onSubmit={handlePasswordReset} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={resetEmail}
                                        onChange={(e) => setResetEmail(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                        placeholder="emailingiz@example.com"
                                    />
                                </div>
                                {message && (
                                    <p className={`text-sm ${message.includes('yuborildi') ? 'text-green-400' : 'text-red-400'}`}>
                                        {message}
                                    </p>
                                )}
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowForgotPassword(false);
                                            setResetEmail('');
                                            setMessage('');
                                        }}
                                        className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold transition-all"
                                    >
                                        Bekor qilish
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all disabled:opacity-50"
                                    >
                                        {isLoading ? 'Yuborilmoqda...' : 'Yuborish'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Login Card */}
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700 p-6 shadow-2xl space-y-4 max-h-[600px] overflow-y-auto">
                    {/* Tabs */}
                    <div className="flex gap-2 bg-slate-900/50 p-1 rounded-xl">
                        <button
                            onClick={() => {
                                setActiveTab('signin');
                                setMessage('');
                            }}
                            className={`flex-1 py-3 rounded-lg font-bold transition-all ${activeTab === 'signin'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            Kirish
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('signup');
                                setMessage('');
                            }}
                            className={`flex-1 py-3 rounded-lg font-bold transition-all ${activeTab === 'signup'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            Ro'yxatdan o'tish
                        </button>
                    </div>

                    {/* Error/Message */}
                    {(error || message) && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                            <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                            <p className="text-red-400 text-sm">{error || message}</p>
                        </div>
                    )}

                    {/* Sign In Form */}
                    {activeTab === 'signin' && (
                        <form onSubmit={handleEmailSignIn} className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                        placeholder="emailingiz@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Parol</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-xl pl-10 pr-12 py-3 text-white focus:outline-none focus:border-blue-500"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowForgotPassword(true)}
                                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Parolni unutdingizmi?
                            </button>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all shadow-lg disabled:opacity-50"
                            >
                                {isLoading ? 'Kirish...' : 'Kirish'}
                            </button>
                        </form>
                    )}

                    {/* Sign Up Form */}
                    {activeTab === 'signup' && (
                        <form onSubmit={handleEmailSignUp} className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Ism</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                    <input
                                        type="text"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                        placeholder="Ismingiz"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                        placeholder="emailingiz@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Parol</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-xl pl-10 pr-12 py-3 text-white focus:outline-none focus:border-blue-500"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Parolni tasdiqlang</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all shadow-lg disabled:opacity-50"
                            >
                                {isLoading ? 'Ro\'yxatdan o\'tish...' : 'Ro\'yxatdan o\'tish'}
                            </button>
                        </form>
                    )}

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-slate-800/50 text-slate-400">yoki</span>
                        </div>
                    </div>

                    {/* Google Sign In Button */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 px-6 py-4 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span>Google bilan kirish</span>
                    </button>

                    <p className="text-xs text-slate-500 text-center">
                        Kirish orqali siz <span className="text-blue-400">Foydalanish shartlari</span> va <span className="text-blue-400">Maxfiylik siyosati</span>ga rozilik bildirasiz
                    </p>
                </div>

                <p className="text-center text-xs text-slate-600">
                    © 2025 EduPhysics. Barcha huquqlar himoyalangan.
                </p>
            </div>
        </div>
    );
}
