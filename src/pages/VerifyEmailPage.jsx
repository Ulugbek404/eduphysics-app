import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';
import { auth } from '../firebase';
import { sendEmailVerification, signOut } from 'firebase/auth';
import { useLanguage } from '../contexts/LanguageContext';

export default function VerifyEmailPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || '';
    const [resendLoading, setResendLoading] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [error, setError] = useState('');
    const { t } = useLanguage();

    // Countdown timer
    useEffect(() => {
        if (countdown <= 0) return;
        const timer = setInterval(() => {
            setCountdown(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [countdown]);

    // Email mavjud emas bo'lsa login ga
    useEffect(() => {
        if (!email) navigate('/login', { replace: true });
    }, [email, navigate]);

    // Qayta yuborish
    const handleResend = async () => {
        setResendLoading(true);
        setError('');
        setResendSuccess(false);
        try {
            // Agar auth.currentUser mavjud bo'lsa
            if (auth.currentUser) {
                await sendEmailVerification(auth.currentUser, {
                    url: window.location.origin + '/login',
                    handleCodeInApp: false,
                });
                setResendSuccess(true);
                setCountdown(60);
            } else {
                setError(t('verify_error_session'));
            }
        } catch (err) {
            if (err.code === 'auth/too-many-requests') {
                setError(t('verify_error_many'));
            } else {
                setError(t('verify_error_send'));
            }
        } finally {
            setResendLoading(false);
        }
    };

    // Tekshirib ko'rish — user reload
    const handleCheckVerification = async () => {
        try {
            if (auth.currentUser) {
                await auth.currentUser.reload();
                if (auth.currentUser.emailVerified) {
                    navigate('/login', { replace: true });
                    return;
                }
            }
            setError(t('verify_not_yet'));
        } catch {
            setError(t('verify_check_error'));
        }
    };

    if (!email) return null;

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 max-w-md w-full text-center backdrop-blur-sm">

                {/* Email icon */}
                <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <Mail size={36} className="text-indigo-400" />
                </div>

                <h1 className="text-2xl font-bold text-white mb-2">
                    {t('verify_title')}
                </h1>

                <p className="text-slate-400 mb-1 text-sm">
                    {t('verify_subtitle')}
                </p>
                <p className="text-indigo-400 font-semibold mb-6">{email}</p>

                {/* Qadamlar */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 mb-5 text-left space-y-3">
                    {[
                        t('verify_step_1'),
                        t('verify_step_2'),
                        t('verify_step_3'),
                        t('verify_step_4'),
                    ].map((step, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-xs font-bold">{i + 1}</span>
                            </div>
                            <p className="text-slate-300 text-sm">{step}</p>
                        </div>
                    ))}
                </div>

                {/* Spam eslatma */}
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 mb-5 flex items-center gap-2">
                    <AlertTriangle size={16} className="text-yellow-400 flex-shrink-0" />
                    <p className="text-yellow-400 text-xs text-left">
                        {t('verify_spam')}
                    </p>
                </div>

                {/* Muvaffaqiyat xabari */}
                {resendSuccess && (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 mb-4 flex items-center gap-2 justify-center">
                        <CheckCircle size={16} className="text-emerald-400" />
                        <p className="text-emerald-400 text-sm">{t('verify_resent_success')}</p>
                    </div>
                )}

                {/* Xatolik */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-4">
                        <p className="text-red-400 text-xs">{error}</p>
                    </div>
                )}

                {/* Tasdiqlandi mi? tekshirish */}
                <button
                    onClick={handleCheckVerification}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all mb-3 flex items-center justify-center gap-2"
                >
                    <CheckCircle size={16} /> {t('verify_check_btn')}
                </button>

                {/* Qayta yuborish */}
                <button
                    onClick={handleResend}
                    disabled={countdown > 0 || resendLoading}
                    className={`w-full py-3 rounded-xl font-medium transition-all mb-4 flex items-center justify-center gap-2
                        ${countdown > 0
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        }`}
                >
                    <RefreshCw size={15} className={resendLoading ? 'animate-spin' : ''} />
                    {resendLoading
                        ? t('contact_sending')
                        : countdown > 0
                            ? `${t('verify_resend_wait')} (${countdown}s)`
                            : `📧 ${t('verify_resend_btn')}`}
                </button>

                <Link
                    to="/login"
                    className="text-slate-400 hover:text-white text-sm transition-all flex items-center justify-center gap-1"
                >
                    <ArrowLeft size={14} /> {t('verify_back')}
                </Link>
            </div>
        </div>
    );
}
