import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Atom, Sparkles, Mail, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { Input } from './ui/Input';

export default function LoginPage() {
    const navigate = useNavigate();
    const { loginWithGoogle, loginWithEmail, signUpWithEmailAndRole, resetPassword, error } = useAuth();
    const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'signup'
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [isTeacher, setIsTeacher] = useState(false);
    const [teacherCode, setTeacherCode] = useState('');

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
            // Google login — App.jsx redirect hal qiladi
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
            const result = await loginWithEmail(email, password);
            const role = result?.role || 'student';
            navigate(role === 'teacher' ? '/teacher' : '/dashboard', { replace: true });
        } catch (err) {
            setMessage('Email yoki parol noto\'g\'ri');
        } finally {
            setIsLoading(false);
        }
    };

    const TEACHER_CODE = 'NURFIZIKA2026';

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
        if (isTeacher && teacherCode !== TEACHER_CODE) {
            setMessage('Ustoz kodi noto\'g\'ri! Iltimos administratorga murojaat qiling.');
            return;
        }
        setIsLoading(true);
        setMessage('');
        const role = isTeacher ? 'teacher' : 'student';
        try {
            const result = await signUpWithEmailAndRole(email, password, displayName, role);
            const finalRole = result?.role || role;
            navigate(finalRole === 'teacher' ? '/teacher' : '/dashboard', { replace: true });
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

        // Add basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!resetEmail || !emailRegex.test(resetEmail)) {
            setMessage('Iltimos, to\'g\'ri email kiriting');
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
            }, 5000); // Give user more time to read the success message
        } catch (err) {
            console.error(err);
            if (err.message.includes('user-not-found')) {
                setMessage('Bunday emailga ega foydalanuvchi topilmadi');
            } else {
                setMessage('Xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Google Icon Component
    const GoogleIcon = () => (
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
    );

    return (
        <div className="h-screen overflow-y-auto bg-slate-950">
            {/* Dynamic Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 w-full max-w-md space-y-6 mx-auto px-4 py-8 pb-16">
                {/* Logo Section */}
                <div className="text-center space-y-2 animate-fadeIn">
                    <div className="inline-flex relative mb-4">
                        <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-40 animate-pulse" />
                        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-4 rounded-3xl shadow-2xl">
                            <Atom size={48} className="text-blue-500 animate-spin-slow" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-white bg-clip-text text-transparent tracking-tight mb-3">
                            NurFizika
                        </h1>
                        <p className="text-sm text-yellow-300 italic font-medium mb-2">
                            Kuch — bilimda, bilim — bizda!
                        </p>
                        <p className="text-slate-400 flex items-center justify-center gap-2 font-medium">
                            AI-powered Fizika Platformasi
                            <Sparkles size={16} className="text-yellow-400" />
                        </p>
                    </div>
                </div>

                {/* Main Card */}
                <Card variant="glass" className="w-full backdrop-blur-3xl shadow-2xl shadow-blue-900/10 animate-slideInUp">
                    {/* Tabs */}
                    <div className="flex bg-slate-900/50 p-1 rounded-xl mb-6 border border-slate-800">
                        <button
                            onClick={() => { setActiveTab('signin'); setMessage(''); }}
                            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${activeTab === 'signin'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                }`}
                        >
                            Kirish
                        </button>
                        <button
                            onClick={() => { setActiveTab('signup'); setMessage(''); }}
                            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${activeTab === 'signup'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                }`}
                        >
                            Ro'yxatdan o'tish
                        </button>
                    </div>

                    {/* Error Message */}
                    {(error || message) && (
                        <div className={`mb-4 p-4 rounded-xl border text-sm flex items-start gap-3 animate-fadeIn ${message.includes('yuborildi')
                            ? 'bg-green-500/10 border-green-500/20 text-green-400'
                            : 'bg-red-500/10 border-red-500/20 text-red-400'
                            }`}>
                            <div className="mt-0.5">
                                {message.includes('yuborildi') ? <Sparkles size={16} /> : <AlertCircle size={16} />}
                            </div>
                            <p>{error || message}</p>
                        </div>
                    )}

                    {/* Forms */}
                    <div className="space-y-4">
                        {activeTab === 'signin' ? (
                            <form onSubmit={handleEmailSignIn} className="space-y-4">
                                <Input
                                    label="Email"
                                    type="email"
                                    placeholder="emailingiz@example.com"
                                    icon={<Mail size={18} />}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="space-y-1">
                                    <Input
                                        label="Parol"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        icon={<Lock size={18} />}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        rightElement={
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="text-slate-500 hover:text-white transition-colors"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        }
                                    />
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => setShowForgotPassword(true)}
                                            className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium mt-1"
                                        >
                                            Parolni unutdingizmi?
                                        </button>
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    size="lg"
                                    isLoading={isLoading}
                                >
                                    Kirish
                                </Button>
                            </form>
                        ) : (
                            <form onSubmit={handleEmailSignUp} className="space-y-4">
                                <Input
                                    label="Ism"
                                    type="text"
                                    placeholder="Ismingiz"
                                    icon={<User size={18} />}
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                />
                                <Input
                                    label="Email"
                                    type="email"
                                    placeholder="emailingiz@example.com"
                                    icon={<Mail size={18} />}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    label="Parol"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    icon={<Lock size={18} />}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    rightElement={
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="text-slate-500 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    }
                                />
                                <Input
                                    label="Parolni tasdiqlang"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    icon={<Lock size={18} />}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />

                                {/* Teacher Toggle */}
                                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-indigo-500/40 transition-all duration-200">
                                    <input
                                        type="checkbox"
                                        checked={isTeacher}
                                        onChange={e => setIsTeacher(e.target.checked)}
                                        className="w-4 h-4 accent-indigo-500 rounded"
                                    />
                                    <span className="text-slate-300 text-sm">👨‍🏫 Men o'qituvchiman</span>
                                </label>

                                {/* Teacher Code Input — animated */}
                                <div className={`overflow-hidden transition-all duration-300 ${isTeacher ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="space-y-1">
                                        <label className="text-slate-400 text-sm block">Ustoz kodi *</label>
                                        <input
                                            type="password"
                                            placeholder="Maxsus ustoz kodini kiriting"
                                            value={teacherCode}
                                            onChange={e => setTeacherCode(e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors duration-200"
                                        />
                                        <p className="text-slate-500 text-xs">* Kod maktab administratoridan olinadi</p>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    size="lg"
                                    isLoading={isLoading}
                                >
                                    {isTeacher ? '👨‍🏫 Ustoz sifatida ro\'yxatdan o\'tish' : 'Ro\'yxatdan o\'tish'}
                                </Button>
                            </form>
                        )}

                        {/* Divider */}
                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-700/50"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-slate-900/50 px-2 text-slate-500 backdrop-blur-sm">yoki</span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <Button
                            variant="secondary"
                            className="w-full bg-slate-800/50 text-white hover:bg-slate-700 border-slate-700 hover:border-slate-600"
                            onClick={handleGoogleLogin}
                            isLoading={isLoading}
                            leftIcon={<GoogleIcon />}
                        >
                            Google bilan kirish
                        </Button>
                    </div>

                    <p className="text-[10px] text-slate-500 text-center mt-6">
                        Kirish orqali siz <span className="text-blue-400 cursor-pointer hover:underline">Foydalanish shartlari</span> va <span className="text-blue-400 cursor-pointer hover:underline">Maxfiylik siyosati</span>ga rozilik bildirasiz
                    </p>
                </Card>

                <p className="text-center text-xs text-slate-600 font-medium">
                    © 2026 NurFizika. Barcha huquqlar himoyalangan.
                </p>
            </div>

            {/* Forgot Password Modal */}
            {showForgotPassword && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
                    <Card variant="elevated" className="w-full max-w-md animate-scaleIn border-slate-700">
                        <CardHeader>
                            <CardTitle>Parolni Tiklash</CardTitle>
                            <CardDescription>
                                Emaillingizni kiriting va biz tiklash havolasini yuboramiz.
                            </CardDescription>
                        </CardHeader>

                        <form onSubmit={handlePasswordReset} className="space-y-4 px-1">
                            <Input
                                type="email"
                                placeholder="emailingiz@example.com"
                                icon={<Mail size={18} />}
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                            />

                            {message && (
                                <p className={`text-sm ${message.includes('yuborildi') ? 'text-green-400' : 'text-red-400'}`}>
                                    {message}
                                </p>
                            )}

                            <div className="flex gap-3 pt-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="flex-1"
                                    onClick={() => {
                                        setShowForgotPassword(false);
                                        setResetEmail('');
                                        setMessage('');
                                    }}
                                >
                                    Bekor qilish
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1"
                                    isLoading={isLoading}
                                >
                                    Yuborish
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
}

