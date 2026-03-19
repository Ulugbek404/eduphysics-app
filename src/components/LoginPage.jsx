import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Atom, Sparkles, Mail, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { Input } from './ui/Input';
import { useSystemSettings } from '../hooks/useSystemSettings';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useLanguage } from '../contexts/LanguageContext';

export default function LoginPage() {
    const navigate = useNavigate();
    const { loginWithGoogle, loginWithEmail, signUpWithEmailAndRole, resetPassword, error } = useAuth();
    const settings = useSystemSettings();
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'signup'
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminCode, setAdminCode] = useState('');

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
            navigate(role === 'admin' ? '/admin' : '/dashboard', { replace: true });
        } catch (err) {
            if (err.message === 'EMAIL_NOT_VERIFIED') {
                // Verify sahifaga yo'naltirish — u yerda qayta yuborish ham bor
                navigate('/verify-email', { state: { email } });
            } else if (err.message?.includes('bloklangan')) {
                setMessage('🚫 Akkauntingiz bloklangan. Admin bilan bog\'laning.');
            } else if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                setMessage('❌ Email yoki parol noto\'g\'ri');
            } else if (err.code === 'auth/user-not-found') {
                setMessage('❌ Bu email ro\'yxatdan o\'tmagan!');
            } else if (err.code === 'auth/too-many-requests') {
                setMessage('⏳ Ko\'p urinish! 5 daqiqadan keyin qayta urining.');
            } else {
                setMessage('❌ Email yoki parol noto\'g\'ri');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const ADMIN_CODE = 'NURFIZIKA_ADMIN_2026';

    const handleEmailSignUp = async (e) => {
        e.preventDefault();
        // Ro'yxatdan o'tish yopiq bo'lsa
        if (!settings.allowRegistration) {
            setMessage("Ro'yxatdan o'tish vaqtincha yopiq. Admin tomonidan to'xtatilgan.");
            return;
        }
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
        if (isAdmin && adminCode !== ADMIN_CODE) {
            setMessage('Admin kodi noto\'g\'ri! Iltimos to\'g\'ri kodni kiriting.');
            return;
        }
        setIsLoading(true);
        setMessage('');
        // Maksimal o'quvchilar tekshiruvi
        try {
            const snap = await getDocs(collection(db, 'users'));
            const studentCount = snap.docs.filter(d => d.data().role !== 'admin').length;
            if (studentCount >= (settings.maxStudents || 1000)) {
                setMessage(`Platforma ${settings.maxStudents} ta o'quvchiga to'lgan!`);
                setIsLoading(false);
                return;
            }
        } catch { }
        const role = isAdmin ? 'admin' : 'student';
        try {
            const result = await signUpWithEmailAndRole(email, password, displayName, role);

            // Email tasdiqlash kerak (oddiy user)
            if (result?.needsVerification) {
                navigate('/verify-email', { state: { email: result.email } });
                return;
            }

            // Admin — darhol kirish
            const finalRole = result?.role || role;
            navigate(finalRole === 'admin' ? '/admin' : '/dashboard', { replace: true });
        } catch (err) {
            setMessage(err.message?.includes('email-already-in-use')
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
        <div className="h-screen overflow-y-auto bg-slate-900">
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
                            {t('app_name')}
                        </h1>
                        <p className="text-sm text-yellow-300 italic font-medium mb-2">
                            {t('hero_slogan')}
                        </p>
                        <p className="text-slate-400 flex items-center justify-center gap-2 font-medium">
                            {t('hero_badge')}
                            <Sparkles size={16} className="text-yellow-400" />
                        </p>
                    </div>
                </div>

                {/* Maintenance Banner */}
                {settings.maintenanceMode && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-center gap-3 animate-fadeIn">
                        <span className="text-xl">🔧</span>
                        <p className="text-yellow-400 text-sm leading-relaxed">
                            Tizim texnik ishlar olib borilmoqda. Tez orada qayta ishga tushadi.
                        </p>
                    </div>
                )}

                {/* Main Card */}
                <Card variant="glass" className="w-full backdrop-blur-3xl shadow-2xl shadow-blue-900/10 animate-slideInUp">
                    {/* Tabs */}
                    <div className="flex bg-slate-900 p-1 rounded-xl mb-6 border border-slate-700">
                        <button
                            onClick={() => { setActiveTab('signin'); setMessage(''); }}
                            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${activeTab === 'signin'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                                }`}
                        >
                            {t('auth_login')}
                        </button>
                        <button
                            onClick={() => { setActiveTab('signup'); setMessage(''); }}
                            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${activeTab === 'signup'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                                }`}
                        >
                            {t('auth_register')}
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
                                                className="text-slate-400 hover:text-white transition-colors"
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
                                            {t('auth_forgot')}
                                        </button>
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    size="lg"
                                    isLoading={isLoading}
                                    disabled={isLoading || settings.maintenanceMode}
                                >
                                {settings.maintenanceMode ? `🔒 ${t('common_loading')}` : t('auth_login')}
                                </Button>
                            </form>
                        ) : (
                            <form onSubmit={handleEmailSignUp} className="space-y-4">
                                <Input
                                    label={t('register_name')}
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
                                            className="text-slate-400 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    }
                                />
                                <Input
                                    label={t('register_confirm_password')}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    icon={<Lock size={18} />}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />

                                {/* Admin Toggle */}
                                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-slate-800 border border-slate-700 hover:border-violet-500/40 transition-all duration-200">
                                    <input
                                        type="checkbox"
                                        checked={isAdmin}
                                        onChange={e => setIsAdmin(e.target.checked)}
                                        className="w-4 h-4 accent-violet-500 rounded"
                                    />
                                    <span className="text-slate-300 text-sm">👑 Men adminman</span>
                                </label>

                                {/* Admin Code Input — animated */}
                                <div className={`overflow-hidden transition-all duration-300 ${isAdmin ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="space-y-1">
                                        <label className="text-slate-400 text-sm block">Admin kodi *</label>
                                        <input
                                            type="password"
                                            placeholder="Maxsus admin kodini kiriting"
                                            value={adminCode}
                                            onChange={e => setAdminCode(e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 focus:border-violet-500 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors duration-200"
                                        />
                                        <p className="text-slate-400 text-xs">* Faqat tizim administratori uchun</p>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    size="lg"
                                    isLoading={isLoading}
                                >
                                    {isAdmin ? `👑 ${t('register_admin_submit')}` : t('auth_register')}
                                </Button>
                            </form>
                        )}

                        {/* Divider */}
                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-700"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-slate-900 px-2 text-slate-400 backdrop-blur-sm">{t('common_or')}</span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <Button
                            variant="secondary"
                            className="w-full bg-slate-800 text-white hover:bg-slate-800 border-slate-700 hover:border-slate-700"
                            onClick={handleGoogleLogin}
                            isLoading={isLoading}
                            leftIcon={<GoogleIcon />}
                        >
                            {t('login_google')}
                        </Button>
                    </div>

                        <p className="text-[10px] text-slate-400 text-center mt-6">
                            {t('auth_terms_agree')} <span className="text-blue-400 cursor-pointer hover:underline">{t('auth_terms')}</span> {t('common_and')} <span className="text-blue-400 cursor-pointer hover:underline">{t('auth_privacy')}</span>
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
                            <CardTitle>{t('reset_title')}</CardTitle>
                            <CardDescription>
                                {t('reset_desc')}
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
                                    {t('common_cancel')}
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1"
                                    isLoading={isLoading}
                                >
                                    {t('contact_send')}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
}

