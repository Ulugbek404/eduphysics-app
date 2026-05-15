import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Shield, Palette, Bell, Globe, Database,
    Eye, EyeOff, Moon, Sun, Monitor, Check,
    Clock, Zap, Target, MessageSquare, BarChart2, Flame,
    CheckCircle, AlertCircle, FileText, Trash2, AlertTriangle,
    ChevronLeft, ChevronRight, Settings, Lock, Download, Printer,
    Search, BookOpen, User, TrendingUp, Camera, ArrowLeft, Mail, Info, Atom
} from 'lucide-react';
import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
    deleteUser,
    updateProfile
} from 'firebase/auth';
import { doc, updateDoc, deleteDoc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { getUserProgress } from '../services/userService';
import { sanitizeProfileForm } from '../utils/sanitize';
import { checkRateLimit, rateLimiters } from '../utils/rateLimiter';

// ─── Tabs config ──────────────────────────────────────────────────────────────
const getTabs = (t) => [
    {
        id: 'profile',
        label: t('settings_profile'),
        desc: t('settings_profile_sub'),
        icon: User,
        iconBg: 'bg-teal-500/20',
        iconColor: 'text-teal-400',
    },
    {
        id: 'appearance',
        label: t('settings_mode_lang'),
        desc: t('settings_mode_lang_sub'),
        icon: Palette,
        iconBg: 'bg-violet-500/20',
        iconColor: 'text-violet-400',
    },
    {
        id: 'notifications',
        label: t('settings_notifications'),
        desc: t('settings_notifications_sub'),
        icon: Bell,
        iconBg: 'bg-yellow-500/20',
        iconColor: 'text-yellow-400',
    },
    {
        id: 'security',
        label: t('settings_security'),
        desc: t('settings_security_sub'),
        icon: Shield,
        iconBg: 'bg-red-500/20',
        iconColor: 'text-red-400',
    },
    {
        id: 'about',
        label: t('settings_about'),
        desc: t('settings_about_sub'),
        icon: Info,
        iconBg: 'bg-emerald-500/20',
        iconColor: 'text-emerald-400',
    },
];

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
    useEffect(() => {
        const t = setTimeout(onClose, 3200);
        return () => clearTimeout(t);
    }, [onClose]);

    return (
        <div className={`
            fixed bottom-6 left-1/2 -translate-x-1/2 z-[999]
            flex items-center gap-3 px-5 py-3.5 rounded-2xl  border-[0.5px]
            animate-slideUp backdrop-blur-sm
            ${type === 'success'
                ? 'bg-emerald-900/95 border-emerald-500/50 text-emerald-200'
                : 'bg-red-900/95 border-red-500/50 text-red-200'
            }
        `}>
            {type === 'success'
                ? <CheckCircle size={18} className="text-emerald-400 flex-shrink-0" />
                : <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
            }
            <span className="font-medium text-sm">{message}</span>
        </div>
    );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ tab }) {
    const Icon = tab.icon;
    return (
        <div className="flex items-center gap-4 mb-7 pb-6 border-b-[0.5px] theme-border">
            <div className={`p-3 rounded-2xl ${tab.iconBg} flex-shrink-0`}>
                <Icon size={24} className={tab.iconColor} />
            </div>
            <div>
                <h2 className="text-xl font-bold theme-text">{tab.label}</h2>
                <p className="theme-muted text-sm mt-0.5">{tab.desc}</p>
            </div>
        </div>
    );
}

// ─── TAB 1 — PROFIL (MA'LUMOTLAR) ────────────────────────────────────────────────
const ProfileTab = ({ showToast }) => {
    const { user, userData, logout } = useAuth();
    const { t } = useLanguage();
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const fileInputRef = useRef(null);

    // Eksport & Delete states
    const [delPassword, setDelPassword] = useState('');
    const [showDelPass, setShowDelPass] = useState(false);
    const [delLoading, setDelLoading] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const [form, setForm] = useState({
        displayName: userData?.displayName || '',
        phone: userData?.phone || '',
        school: userData?.school || '',
        region: userData?.region || '',
        grade: userData?.grade || '9',
        bio: userData?.bio || '',
        photoURL: userData?.photoURL || user?.photoURL || '',
    });

    const regions = [
        "Toshkent shahri", "Toshkent viloyati",
        "Samarqand", "Buxoro", "Andijon",
        "Farg'ona", "Namangan", "Qashqadaryo",
        "Surxondaryo", "Navoiy", "Xorazm",
        "Sirdaryo", "Jizzax", "Qoraqalpog'iston"
    ];

    const handlePhoneChange = (e) => {
        let val = e.target.value;
        if (!val || val.length < 4) {
            setForm({ ...form, phone: '+998 ' });
            return;
        }
        let cleaned = val.replace(/\D/g, '');
        if (!cleaned.startsWith('998')) {
            cleaned = '998' + cleaned;
        }
        cleaned = cleaned.substring(0, 12);
        const match = cleaned.match(/^(\d{3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/);
        if (match) {
            let formatted = '+' + match[1];
            if (match[2]) formatted += ' ' + match[2];
            if (match[3]) formatted += ' ' + match[3];
            if (match[4]) formatted += ' ' + match[4];
            if (match[5]) formatted += ' ' + match[5];
            setForm({ ...form, phone: formatted });
        }
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            if (showToast) showToast(t('settings_photo_size_error'), 'error');
            return;
        }

        setUploadingPhoto(true);
        try {
            const photoRef = ref(storage, `users/${user.uid}/profile_${Date.now()}`);
            await uploadBytes(photoRef, file);
            const downloadURL = await getDownloadURL(photoRef);

            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { photoURL: downloadURL });
            }

            await setDoc(doc(db, "users", user.uid), {
                photoURL: downloadURL,
                updatedAt: serverTimestamp()
            }, { merge: true });

            try {
                await setDoc(doc(db, "leaderboard", "global", "users", user.uid), {
                    uid: user.uid,
                    photoURL: downloadURL
                }, { merge: true });
                if (form.region) {
                    await setDoc(doc(db, "leaderboard", form.region, "users", user.uid), {
                        uid: user.uid,
                        photoURL: downloadURL
                    }, { merge: true });
                }
            } catch (e) { console.error("Leaderboardga rasm saqlashda xato", e); }

            setForm(prev => ({ ...prev, photoURL: downloadURL }));

            // Profil rasmi darhol Dashboard da o'zgarishi uchun:
            try {
                localStorage.setItem(`user_avatar_${user.uid}`, downloadURL);
                window.dispatchEvent(new Event('avatarUpdated'));
            } catch (e) { }

            if (showToast) showToast(t('settings_photo_updated'), 'success');
        } catch (error) {
            console.error("Rasm yuklash xatosi:", error);
            if (showToast) showToast(t('settings_photo_error'), 'error');
        } finally {
            setUploadingPhoto(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleSave = async () => {
        if (!user?.uid) return;
        // Rate limiting: 5 daqiqada max 3 ta marta saqlash
        if (!checkRateLimit(rateLimiters.generalForm, user.uid)) {
            if (showToast) showToast(t('settings_rate_limit'), 'error');
            return;
        }
        setSaving(true);
        try {
            // Sanitize: XSS va injection oldini olish
            const cleaned = sanitizeProfileForm(form);
            const dataToSave = {
                displayName: cleaned.displayName,
                phone: cleaned.phone,
                school: cleaned.school,
                region: cleaned.region,
                grade: cleaned.grade,
                bio: cleaned.bio,
                updatedAt: serverTimestamp(),
            };

            await setDoc(doc(db, "users", user.uid), dataToSave, { merge: true });

            try {
                await setDoc(doc(db, "leaderboard", "global", "users", user.uid), {
                    uid: user.uid,
                    displayName: form.displayName || '',
                    region: form.region || '',
                    school: form.school || '',
                }, { merge: true });
            } catch (e) { console.error("Global leaderboard xatosi:", e); }

            if (form.region) {
                try {
                    await setDoc(doc(db, "leaderboard", form.region, "users", user.uid), {
                        uid: user.uid,
                        displayName: form.displayName || '',
                        region: form.region || '',
                        school: form.school || '',
                    }, { merge: true });
                } catch (e) { console.error("Region leaderboard xatosi:", e); }
            }

            if (auth.currentUser) {
                try {
                    await updateProfile(auth.currentUser, {
                        displayName: form.displayName
                    });
                } catch (e) { console.error("Update profile xatosi:", e); }
            }

            setSaved(true);
            setIsEditing(false);
            if (showToast) showToast(t('settings_data_saved'), 'success');
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            console.error("Save error details:", err);
            if (showToast) showToast(`Xato: ${err.message || 'Noma\'lum xatolik'}`, 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleExport = async () => {
        try {
            const progress = await getUserProgress(user.uid);
            const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `nurfizika_${user.uid.slice(0, 8)}.json`;
            a.click();
            URL.revokeObjectURL(url);
            if (showToast) showToast(t('settings_data_downloaded'), 'success');
        } catch {
            if (showToast) showToast(t('settings_data_download_error'), 'error');
        }
    };

    const handlePrint = async () => {
        try {
            const userSnap = await getDoc(doc(db, 'users', user.uid));
            const progressSnap = await getDoc(doc(db, 'progress', user.uid));
            const uData = userSnap.data() || {};
            const progressData = progressSnap.data() || {};

            const completedCount = progressData?.completedTopics?.length || 0;
            const percentage = Math.round((completedCount / 53) * 100);

            const reportHTML = `<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <title>NurFizika — Progress Hisoboti</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'Segoe UI',Arial,sans-serif; background:#f8fafc; color:#1e293b; padding:40px; }
    .header { background:linear-gradient(135deg,#6366f1,#8b5cf6); color:#fff; padding:30px; border-radius:16px; margin-bottom:24px; display:flex; justify-content:space-between; align-items:center; }
    .header h1 { font-size:28px; font-weight:bold; }
    .header p { opacity:.85; font-size:14px; margin-top:4px; }
    .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:24px; }
    .stat-card { background:#fff; border-radius:12px; padding:20px; text-align:center; box-:0 1px 3px rgba(0,0,0,.1); border-[0.5px]:1px solid #e2e8f0; }
    .stat-number { font-size:32px; font-weight:bold; color:#6366f1; }
    .stat-label { font-size:12px; color:#64748b; margin-top:4px; }
    .section { background:#fff; border-radius:12px; padding:24px; margin-bottom:16px; box-:0 1px 3px rgba(0,0,0,.1); border-[0.5px]:1px solid #e2e8f0; }
    .section h2 { font-size:16px; font-weight:bold; color:#1e293b; margin-bottom:16px; padding-bottom:8px; border-bottom:2px solid #e2e8f0; }
    .progress-bar-bg { background:#e2e8f0; border-radius:999px; height:12px; margin:8px 0; }
    .progress-bar-fill { background:linear-gradient(90deg,#6366f1,#8b5cf6); border-radius:999px; height:12px; width:${percentage}%; }
    .topic-chip { display:inline-block; background:#f0f0ff; color:#6366f1; border-[0.5px]:1px solid #c7d2fe; border-radius:6px; padding:3px 10px; font-size:11px; margin:3px; }
    .footer { text-align:center; color:#94a3b8; font-size:12px; margin-top:24px; }
    @media print { body { padding:20px; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1>⚡ NurFizika</h1>
      <p>Progress Hisoboti — ${uData.displayName || "O'quvchi"}</p>
      <p style="font-size:13px;opacity:.8">${new Date().toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    </div>
    <div style="text-align:right">
      <div style="font-size:48px;font-weight:bold">${percentage}%</div>
      <div style="font-size:13px;opacity:.85">Umumiy progress</div>
    </div>
  </div>
  <div class="stats-grid">
    <div class="stat-card"><div class="stat-number">${uData.totalXP || uData.xp || 0}</div><div class="stat-label">Jami XP</div></div>
    <div class="stat-card"><div class="stat-number">${uData.currentLevel || 1}</div><div class="stat-label">Daraja</div></div>
    <div class="stat-card"><div class="stat-number">${uData.streakDays || 0}</div><div class="stat-label">Seriya (kun)</div></div>
    <div class="stat-card"><div class="stat-number">${completedCount}/53</div><div class="stat-label">Mavzular</div></div>
  </div>
  <div class="section">
    <h2>📊 O'quv Progressi</h2>
    <div style="display:flex;justify-content:space-between;font-size:13px;color:#64748b;margin-bottom:4px">
      <span>Tugallangan mavzular: ${completedCount} ta</span><span>${percentage}%</span>
    </div>
    <div class="progress-bar-bg"><div class="progress-bar-fill"></div></div>
  </div>
  <div class="section">
    <h2>✅ Tugallangan Mavzular (${completedCount} ta)</h2>
    <div>${progressData?.completedTopics?.length > 0
                    ? progressData.completedTopics.map(t => `<span class="topic-chip">${t}</span>`).join('')
                    : '<p style="color:#94a3b8;font-size:13px">Hali mavzu tugallanmagan</p>'
                }</div>
  </div>
  <div class="footer">NurFizika — Kuch bilimda, bilim bizda! | eduphysics-app.web.app</div>
</body>
</html>`;

            const printWindow = window.open('', '_blank', 'width=900,height=700');
            if (!printWindow) {
                if (showToast) showToast(t('settings_popup_blocked'), 'error');
                return;
            }
            printWindow.document.write(reportHTML);
            printWindow.document.close();
            setTimeout(() => { printWindow.focus(); printWindow.print(); }, 500);
            if (showToast) showToast(t('settings_data_report_ready'), 'success');
        } catch {
            if (showToast) showToast("Hisobotni chiqarishda xato!", 'error');
        }
    };

    const handleDelete = async () => {
        if (!delPassword) return showToast ? showToast(t('settings_enter_password'), 'error') : null;
        setDelLoading(true);
        try {
            const cred = EmailAuthProvider.credential(user.email, delPassword);
            await reauthenticateWithCredential(user, cred);
            await deleteDoc(doc(db, 'users', user.uid));
            await deleteUser(user);
            if (showToast) showToast(t('settings_data_deleted'), 'success');
            logout();
        } catch (e) {
            if (showToast) showToast(e.code === 'auth/wrong-password' ? t('settings_data_wrong_password') : t('settings_save_error'), 'error');
        } finally {
            setDelLoading(false);
        }
    };

    return (
        <div className="space-y-8 max-w-2xl mb-20 animate-fadeIn">
            {/* Sarlavha va Edit tugmasi */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between theme-card border-[0.5px] theme-border p-5 rounded-2xl gap-4">
                <div>
                    <h2 className="theme-text font-bold text-xl mb-1">
                        {t('settings_profile_title')}
                    </h2>
                    <p className="theme-muted text-sm leading-relaxed">
                        {t('settings_profile_subtitle')}
                    </p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-teal-600/20 hover:bg-teal-600/30 text-teal-400 
                            px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border-[0.5px] border-teal-500/30
                            flex items-center justify-center gap-2 flex-shrink-0"
                    >
                        <Settings size={16} /> {t('common.edit')}
                    </button>
                )}
            </div>

            {/* Profil formasi */}
            <div className="theme-card border-[0.5px] theme-border p-6 rounded-2xl space-y-6">
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <div className="w-20 h-20 rounded-full bg-teal-50 dark:bg-teal-900 border-[0.5px] border-teal-200 dark:border-teal-800 overflow-hidden  
                                flex items-center justify-center text-3xl
                                font-bold text-teal-600 dark:text-teal-400 uppercase relative">
                            {form.photoURL ? (
                                <img src={form.photoURL} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                form.displayName?.[0] || 'U'
                            )}

                            {uploadingPhoto && (
                                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                                    <div className="w-5 h-5 border-[0.5px] border-white/30 border-t-white rounded-full animate-spin"></div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingPhoto}
                            title="Rasmni o'zgartirish"
                            className="absolute bottom-0 right-0 w-8 h-8 bg-teal-500 hover:bg-teal-400 text-white rounded-full flex items-center justify-center  border-[0.5px] border-slate-700 transition-colors cursor-pointer z-10 disabled:opacity-50"
                        >
                            <Camera size={14} />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handlePhotoUpload}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                    <div>
                        <p className="theme-text font-medium text-lg">{form.displayName || t('settings_no_name')}</p>
                        <p className="theme-muted text-sm">{user?.email}</p>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="sm:col-span-2">
                            <label className="theme-text text-sm font-medium mb-1.5 block">
                                {t('settings_fullname')} *
                            </label>
                            <input
                                disabled={!isEditing}
                                value={form.displayName}
                                onChange={e => setForm({ ...form, displayName: e.target.value })}
                                placeholder={t('settings_fullname_placeholder')}
                                className="w-full theme-input border-[0.5px] theme-border
                           rounded-xl px-4 py-3 theme-text text-sm
                           focus:outline-none focus:border-teal-500 
                           transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="theme-text text-sm font-medium mb-1.5 block">
                                {t('settings_phone')}
                            </label>
                            <input
                                disabled={!isEditing}
                                value={form.phone}
                                onChange={handlePhoneChange}
                                placeholder="+998 90 123 45 67"
                                className="w-full theme-input border-[0.5px] theme-border
                           rounded-xl px-4 py-3 theme-text text-sm
                           focus:outline-none focus:border-teal-500 
                           transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="theme-text text-sm font-medium mb-1.5 block">
                                {t('settings_school')}
                            </label>
                            <input
                                disabled={!isEditing}
                                value={form.school}
                                onChange={e => setForm({ ...form, school: e.target.value })}
                                placeholder={t('settings_school_placeholder')}
                                className="w-full theme-input border-[0.5px] theme-border
                           rounded-xl px-4 py-3 text-sm
                           focus:outline-none focus:border-teal-500 
                           transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="theme-text text-sm font-medium mb-1.5 block">
                                {t('settings_region')} *
                                <span className="text-teal-400 text-xs ml-2">
                                    — {t('settings_region_hint')}
                                </span>
                            </label>
                            <select
                                disabled={!isEditing}
                                value={form.region}
                                onChange={e => setForm({ ...form, region: e.target.value })}
                                className="w-full theme-input border-[0.5px] theme-border
                           rounded-xl px-4 py-3 text-sm
                           focus:outline-none focus:border-teal-500 
                           transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                                <option value="" disabled>{t('settings_region_select')}</option>
                                {regions.map(r => (
                                    <option key={r} value={r}>{r}</option>
                                ))}
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="theme-text text-sm font-medium mb-1.5 block">
                                {t('settings_grade')}
                            </label>
                            <select
                                disabled={!isEditing}
                                value={form.grade}
                                onChange={e => setForm({ ...form, grade: e.target.value })}
                                className="w-full theme-input border-[0.5px] theme-border
                           rounded-xl px-4 py-3 text-sm
                           focus:outline-none focus:border-teal-500 
                           transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                                {['7', '8', '9', '10', '11'].map(g => (
                                    <option key={g} value={g}>{g}-sinf</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="theme-text text-sm font-medium mb-1.5 block">
                            {t('settings_bio')}
                        </label>
                        <textarea
                            disabled={!isEditing}
                            value={form.bio}
                            onChange={e => setForm({ ...form, bio: e.target.value })}
                            placeholder={t('settings_bio_placeholder')}
                            rows={3}
                            className="w-full theme-input border-[0.5px] theme-border
                           rounded-xl px-4 py-3 text-sm
                           focus:outline-none focus:border-teal-500 
                           transition-all resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                    </div>
                </div>

                {isEditing && (
                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="flex-1 py-3.5 rounded-xl font-semibold text-sm
                                transition-all flex items-center justify-center gap-2
                                theme-surface border-[0.5px] theme-border hover:theme-bg theme-text"
                        >
                            {t('common.cancel')}
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving || !form.displayName || !form.region}
                            className={`flex-[2] py-3.5 rounded-xl font-semibold text-sm
                                 transition-all flex items-center justify-center gap-2
                                ${saved
                                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white '
                                    : 'bg-teal-600 hover:bg-teal-500 text-white '
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {saving ? (
                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            ) : saved ? (
                                <><CheckCircle size={18} /> {t('settings_saved')}</>
                            ) : (
                                <><Database size={18} /> {t('settings_save_changes')}</>
                            )}
                        </button>
                    </div>
                )}
            </div>

            {/* Eksport & Delete */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="theme-card border-[0.5px] theme-border rounded-2xl p-5">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mb-3">
                        <Printer size={20} className="text-blue-400" />
                    </div>
                    <h3 className="theme-text font-semibold text-sm mb-1">{t('settings_data_report')}</h3>
                    <p className="theme-muted text-xs mb-4 leading-relaxed">{t('settings_data_report_desc')}</p>
                    <button
                        onClick={handlePrint}
                        className="w-full bg-blue-600/20 hover:bg-blue-600/30 border-[0.5px] border-blue-500/30
                            text-blue-400 rounded-xl py-2.5 text-xs font-semibold
                            transition-all flex items-center justify-center gap-2"
                    >
                        <Printer size={13} /> {t('settings_data_print')}
                    </button>
                </div>

                <div className="theme-card border-[0.5px] theme-border rounded-2xl p-5">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-3">
                        <Download size={20} className="text-emerald-400" />
                    </div>
                    <h3 className="theme-text font-semibold text-sm mb-1">{t('settings_data_export')}</h3>
                    <p className="theme-muted text-xs mb-4 leading-relaxed">{t('settings_data_export_desc')}</p>
                    <button
                        onClick={handleExport}
                        className="w-full bg-emerald-600/20 hover:bg-emerald-600/30 border-[0.5px] border-emerald-500/30
                            text-emerald-400 rounded-xl py-2.5 text-xs font-semibold
                            transition-all flex items-center justify-center gap-2"
                    >
                        <Download size={13} /> {t('settings_data_download')}
                    </button>
                </div>
            </div>

            <div className="theme-card border-[0.5px] border-red-200 dark:border-red-900/50 rounded-2xl p-5 mt-4">
                <div className="flex items-start gap-3 mb-5">
                    <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <AlertTriangle size={20} className="text-red-500 dark:text-red-400" />
                    </div>
                    <div>
                        <h3 className="text-red-600 dark:text-red-400 font-semibold">{t('settings_data_delete_btn')}</h3>
                        <p className="theme-muted text-sm mt-1 leading-relaxed">
                            {t('settings_data_danger_desc')}
                        </p>
                    </div>
                </div>

                {!confirmDelete ? (
                    <button
                        onClick={() => setConfirmDelete(true)}
                        className="w-full bg-red-600/20 hover:bg-red-600/30 border-[0.5px] border-red-500/30
                            text-red-400 font-medium py-3 rounded-xl
                            transition-all flex items-center justify-center gap-2"
                    >
                        <Trash2 size={15} />
                        {t('common.delete')}
                    </button>
                ) : (
                    <div className="space-y-3">
                        <p className="text-red-400 text-sm font-medium">{t('settings_data_confirm_msg')}</p>
                        <div className="relative">
                            <input
                                type={showDelPass ? 'text' : 'password'}
                                value={delPassword}
                                onChange={e => setDelPassword(e.target.value)}
                                placeholder={t('settings_data_confirm_placeholder')}
                                className="w-full theme-input border-[0.5px] border-red-300 dark:border-red-800/60 rounded-xl
                                    px-4 py-3 text-sm placeholder-gray-400 dark:placeholder-slate-600
                                    focus:border-red-500 outline-none transition-all"
                            />
                            <button onClick={() => setShowDelPass(p => !p)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300">
                                {showDelPass ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => { setConfirmDelete(false); setDelPassword(''); }}
                                className="flex-1 theme-surface hover:theme-bg border-[0.5px] theme-border theme-text py-2.5 rounded-xl text-sm font-medium transition-all"
                            >
                                {t('common.cancel')}
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={delLoading}
                                className="flex-1 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
                            >
                                {delLoading ? <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> : <Trash2 size={14} />}
                                O'chirish
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── TAB 2 — XAVFSIZLIK VA EKSPORT ─────────────────────────────────────────────
function XavfsizlikTab({ showToast }) {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [fields, setFields] = useState({ current: '', newPass: '', confirm: '' });
    const [show, setShow] = useState({ current: false, newPass: false, confirm: false });
    const [loading, setLoading] = useState(false);

    const toggle = (k) => setShow(p => ({ ...p, [k]: !p[k] }));
    const update = (k, v) => setFields(p => ({ ...p, [k]: v }));

    // Password strength: 0-4
    const getStrength = (pw) => {
        if (!pw) return 0;
        let s = 0;
        if (pw.length >= 6) s++;
        if (pw.length >= 10) s++;
        if (/[A-Z]/.test(pw)) s++;
        if (/[0-9!@#$%^&*]/.test(pw)) s++;
        return s;
    };
    const strength = getStrength(fields.newPass);

    const strengthLabel = [t('settings_password_enter'), '🔴 '+t('settings_password_weak'), '🟡 '+t('settings_password_medium'), '🔵 '+t('settings_password_good'), '🟢 '+t('settings_password_strong')][strength];
    const barColors = ['', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-emerald-500'];


    const handleSave = async () => {
        if (fields.newPass !== fields.confirm) return showToast(t('settings_password_mismatch'), 'error');
        if (fields.newPass.length < 6) return showToast(t('settings_password_short'), 'error');
        // Rate limiting: 15 daqiqada max 3 ta urinish
        if (!checkRateLimit(rateLimiters.passwordChange, user?.uid)) {
            showToast(t('settings_rate_limit_password'), 'error');
            return;
        }
        setLoading(true);
        try {
            const cred = EmailAuthProvider.credential(user.email, fields.current);
            await reauthenticateWithCredential(user, cred);
            await updatePassword(user, fields.newPass);
            showToast(t('settings_password_updated'), 'success');
            setFields({ current: '', newPass: '', confirm: '' });
        } catch (e) {
            showToast(e.code === 'auth/wrong-password' ? t('settings_password_wrong') : t('settings_save_error'), 'error');
        } finally {
            setLoading(false);
        }
    };

    const inputs = [
        { key: 'current', label: t('settings_current_password'), placeholder: '••••••••' },
        { key: 'newPass', label: t('settings_new_password'), placeholder: t('settings_password_min') },
        { key: 'confirm', label: t('settings_confirm_password'), placeholder: t('settings_confirm_password_placeholder') },
    ];

    return (
        <div className="space-y-5 animate-fadeIn">
            {/* Strength card */}
            {fields.newPass && (
                <div className="theme-card border-[0.5px] theme-border rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <Lock size={14} className="theme-muted" />
                        <span className="text-xs theme-muted font-medium">{t('settings_password_strength')}</span>
                    </div>
                    <div className="flex gap-1.5 mb-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${strength >= i ? barColors[i] : 'bg-slate-800'}`} />
                        ))}
                    </div>
                    <p className="text-xs theme-muted">{strengthLabel}</p>
                </div>
            )}

            {/* Inputs */}
            <div className="theme-card border-[0.5px] theme-border rounded-2xl p-5 space-y-4">
                {inputs.map(({ key, label, placeholder }) => (
                    <div key={key}>
                        <label className="text-xs theme-muted mb-1.5 block font-medium">{label}</label>
                        <div className="relative">
                            <input
                                type={show[key] ? 'text' : 'password'}
                                value={fields[key]}
                                onChange={e => update(key, e.target.value)}
                                placeholder={placeholder}
                                className="w-full theme-input border-[0.5px] theme-border rounded-xl
                                    px-4 py-3 text-sm placeholder-gray-400 dark:placeholder-slate-600
                                    focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30
                                    outline-none transition-all duration-200"
                            />
                            <button onClick={() => toggle(key)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 theme-muted hover:theme-text transition-colors">
                                {show[key] ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                ))}

                <button
                    onClick={handleSave}
                    disabled={loading || !fields.current || !fields.newPass || !fields.confirm}
                    className="w-full bg-teal-600 hover:bg-teal-500 disabled:opacity-40 disabled:cursor-not-allowed
                        text-white font-semibold py-3 rounded-xl transition-all duration-200
                        flex items-center justify-center gap-2 hover: hover: mt-2"
                >
                    {loading ? (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                    ) : <Shield size={16} />}
                    {t('settings_password_update')}
                </button>
            </div>
        </div>
    );
}

// ─── TAB 2 — REJIM VA TIL ────────────────────────────────────────────────────────
function RejimVaTilTab({ showToast }) {
    const { t, language: lang, setLanguage: setLang } = useLanguage();
    const { theme, setTheme } = useTheme();

    const themes = [
        {
            id: 'dark', label: 'Dark', emoji: '🌙',
            desc: t('settings_theme_dark_desc') || 'Tungi rejim',
            available: true,
            preview: { bg: '#020617', surface: '#0f172a', accent: '#14b8a6' }
        },
        {
            id: 'light', label: 'White', emoji: '☀️',
            desc: t('settings_theme_light_desc') || 'Kunduzgi yorug\' rejim',
            available: true,
            preview: { bg: '#f8fafc', surface: '#ffffff', accent: '#0d9488' }
        },
    ];

    const langs = [
        { id: 'uz', flag: '🇺🇿', label: t('lang_uz') || "O'zbek", desc: t('lang_uz_sub') || '', code: 'UZ' },
        { id: 'ru', flag: '🇷🇺', label: t('lang_ru') || 'Русский', desc: t('lang_ru_sub') || '', code: 'RU' },
        { id: 'en', flag: '🇬🇧', label: t('lang_en') || 'English', desc: t('lang_en_sub') || '', code: 'EN' },
    ];

    const handleSelectTheme = (id) => {
        if (setTheme) setTheme(id);
        if (showToast) showToast(id === 'dark' ? '🌙 Dark rejim yoqildi' : '☀️ White rejim yoqildi', 'success');
    };

    const handleSelectLang = (id) => {
        if (setLang) setLang(id);
        if (showToast) showToast(t('settings_lang_changed') || "Til o'zgartirildi", 'success');
    };

    return (
        <div className="space-y-8 animate-fadeIn mb-20">
            {/* Tema - Rejimlar */}
            <div>
                <p className="text-xs font-semibold theme-muted uppercase tracking-widest mb-4">{t('settings_theme_title') || 'Interfeys rejimi'}</p>

                {/* Quick Toggle Buttons */}
                <div className="flex items-center gap-3 mb-5">
                    <button
                        onClick={() => handleSelectTheme('light')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border-[0.5px] font-semibold text-sm transition-all duration-300 ${
                            theme === 'light'
                                ? 'border-amber-400  bg-amber-50 dark:bg-amber-900/20 text-amber-700  '
                                : 'theme-card border-[0.5px] theme-border theme-text hover:border-amber-400/50 hover:'
                        }`}
                    >
                        <Sun size={18} className={theme === 'light' ? 'text-amber-500' : 'text-amber-400'} />
                        ☀️ White Mode
                        {theme === 'light' && <Check size={15} className="text-amber-600" />}
                    </button>
                    <button
                        onClick={() => handleSelectTheme('dark')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border-[0.5px] font-semibold text-sm transition-all duration-300 ${
                            theme === 'dark'
                                ? 'border-teal-500  theme-surface text-teal-300  '
                                : 'theme-card border-[0.5px] theme-border theme-text hover:border-teal-400/50 hover:'
                        }`}
                    >
                        <Moon size={18} className={theme === 'dark' ? 'text-teal-400' : 'text-slate-400'} />
                        🌙 Dark Mode
                        {theme === 'dark' && <Check size={15} className="text-teal-400" />}
                    </button>
                </div>

            </div>

            {/* Til */}
            <div>
                <p className="text-xs font-semibold theme-muted uppercase tracking-widest mb-4">{t('settings_language') || 'Til'}</p>
                <div className="space-y-3">
                    {langs.map(l => (
                        <button
                            key={l.id}
                            onClick={() => handleSelectLang(l.id)}
                            className={`
                                flex items-center gap-4 w-full p-4 rounded-2xl border-[0.5px]
                                transition-all duration-200 hover:scale-[1.02] text-left
                                ${lang === l.id
                                    ? 'border-teal-500 bg-teal-500/10  '
                                    : 'theme-card border-[0.5px] theme-border hover:border-teal-400/40'
                                }
                            `}
                        >
                            <span className="text-4xl">{l.flag}</span>
                            <div className="flex-1">
                                <p className="theme-text font-semibold">{l.label}</p>
                                <p className="theme-muted text-sm mt-0.5">{l.desc}</p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-[0.5px] flex items-center justify-center flex-shrink-0
                                ${lang === l.id ? 'border-teal-500 bg-teal-500' : 'border-slate-600'}`}>
                                {lang === l.id && <Check size={12} className="text-white" />}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── TAB 3 — BILDIRISHNOMALAR ─────────────────────────────────────────────────
function BildirishnomaTab({ showToast }) {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState({
        dailyReminder: true,
        xpUpdates: true,
        missionComplete: true,
        streakReminder: true,
        weeklyReport: false,
        teacherMessages: true,
    });

    const toggleItem = (k) => setSettings(p => ({ ...p, [k]: !p[k] }));

    const groups = [
        {
            title: t('settings_notif_study'),
            items: [
                { id: 'dailyReminder', icon: Clock, iconBg: 'bg-blue-500/20', iconColor: 'text-blue-400', title: t('settings_notif_daily'), desc: t('settings_notif_daily_desc') },
                { id: 'streakReminder', icon: Flame, iconBg: 'bg-orange-500/20', iconColor: 'text-orange-400', title: t('settings_notif_streak'), desc: t('settings_notif_streak_desc') },
                { id: 'missionComplete', icon: Target, iconBg: 'bg-purple-500/20', iconColor: 'text-purple-400', title: t('settings_notif_mission'), desc: t('settings_notif_mission_desc') },
            ]
        },
        {
            title: t('settings_notif_system'),
            items: [
                { id: 'xpUpdates', icon: Zap, iconBg: 'bg-yellow-500/20', iconColor: 'text-yellow-400', title: t('settings_notif_xp'), desc: t('settings_notif_xp_desc') },
                { id: 'teacherMessages', icon: MessageSquare, iconBg: 'bg-emerald-500/20', iconColor: 'text-emerald-400', title: t('settings_notif_teacher'), desc: t('settings_notif_teacher_desc') },
                { id: 'weeklyReport', icon: BarChart2, iconBg: 'bg-teal-500/20', iconColor: 'text-teal-400', title: t('settings_notif_weekly'), desc: t('settings_notif_weekly_desc') },
            ]
        },
    ];


    const handleSave = async () => {
        setLoading(true);
        try {
            if (user?.uid) {
                await updateDoc(doc(db, 'users', user.uid), { notificationSettings: settings });
            }
            showToast(t('settings_notif_saved'), 'success');
        } catch {
            showToast(t('settings_save_error'), 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4 animate-fadeIn">
            {groups.map(group => (
                <div key={group.title} className="theme-card border-[0.5px] theme-border rounded-2xl overflow-hidden">
                    <div className="px-5 py-3 border-b-[0.5px] theme-border">
                        <p className="text-xs font-semibold theme-muted uppercase tracking-widest">{group.title}</p>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-slate-700/30">
                        {group.items.map(item => {
                            const Icon = item.icon;
                            return (
                                <div key={item.id} className="flex items-center justify-between px-5 py-4 hover:theme-bg transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                                            <Icon size={16} className={item.iconColor} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium theme-text">{item.title}</p>
                                            <p className="text-xs theme-muted mt-0.5">{item.desc}</p>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => toggleItem(item.id)}
                                        role="switch"
                                        aria-checked={settings[item.id]}
                                        className={`relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0 cursor-pointer
                                            ${settings[item.id] ? 'bg-teal-600' : 'bg-gray-300 dark:bg-slate-800'}`}
                                    >
                                        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full  transition-all duration-300
                                            ${settings[item.id] ? 'left-5' : 'left-0.5'}`} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
            <button
                onClick={handleSave}
                disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-500 disabled:opacity-40
                    text-white font-semibold py-3 rounded-xl transition-all duration-200
                    flex items-center justify-center gap-2 hover: hover:"
            >
                {loading ? <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> : <Bell size={16} />}
                {t('common.save')}
            </button>
        </div>
    );
}

// ─── ABOUT TAB ─────────────────────────────────────────────────────────────────
function AboutTab() {
    const { t } = useLanguage();
    const [legalView, setLegalView] = useState(null); // null | 'oferta' | 'maxfiylik' | 'rozilik'

    const socialLinks = [
        {
            name: 'Telegram', url: 'https://t.me/+sRohecqH4KVlYjli', color: 'bg-sky-500',
            icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
        },
        {
            name: 'Instagram', url: 'https://www.instagram.com/nurfizika', color: 'bg-pink-500',
            icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        },
        {
            name: 'YouTube', url: 'https://www.youtube.com/@NurFizika', color: 'bg-red-500',
            icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
        },
        {
            name: 'Facebook', url: 'https://www.facebook.com/share/18bRKT6BbK/', color: 'bg-blue-600',
            icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        },
    ];

    const legalDocs = {
        oferta: {
            title: t('settings_offer'),
            items: [
                { heading: t('offer_item1_head'), text: t('offer_item1_text') },
                { heading: t('offer_item2_head'), text: t('offer_item2_text') },
                { heading: t('offer_item3_head'), text: t('offer_item3_text') },
                { heading: t('offer_item4_head'), text: t('offer_item4_text') },
                { heading: t('offer_item5_head'), text: t('offer_item5_text') },
            ]
        },
        maxfiylik: {
            title: t('settings_privacy'),
            items: [
                { heading: t('priv_item1_head'), text: t('priv_item1_text') },
                { heading: t('priv_item2_head'), text: t('priv_item2_text') },
                { heading: t('priv_item3_head'), text: t('priv_item3_text') },
                { heading: t('priv_item4_head'), text: t('priv_item4_text') },
                { heading: t('priv_item5_head'), text: t('priv_item5_text') },
            ]
        },
        rozilik: {
            title: t('settings_consent'),
            items: [
                { heading: t('cons_item1_head'), text: t('cons_item1_text') },
                { text: t('cons_item2_text') },
                { heading: t('cons_item3_head'), text: t('cons_item3_text') },
                { heading: t('cons_item4_head'), text: t('cons_item4_text') },
                { heading: t('cons_item5_head'), text: t('cons_item5_text') },
            ]
        },
    };

    if (legalView) {
        const doc = legalDocs[legalView];
        return (
            <div className="space-y-4 max-w-2xl animate-fadeIn">
                <button
                    onClick={() => setLegalView(null)}
                    className="flex items-center gap-2 theme-muted hover:theme-text transition-colors mb-2"
                >
                    <ChevronLeft size={18} /> {t('about_back')}
                </button>
                <h3 className="theme-text text-xl font-bold mb-4">{doc.title}</h3>
                {doc.items.map((item, i) => (
                    <div key={i} className="theme-card border-[0.5px] theme-border rounded-2xl p-5">
                        {item.heading && (
                            <h4 className="font-bold theme-text mb-2 text-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full inline-block"></span>
                                {item.heading}
                            </h4>
                        )}
                        <p className="text-sm theme-text-secondary leading-relaxed whitespace-pre-line">{item.text}</p>
                    </div>
                ))}
                <p className="text-center text-xs theme-muted pt-2">{t('settings_copyright')}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-2xl animate-fadeIn">
            {/* Combined App + Developer Card */}
            <div className=" theme-card border-[0.5px] theme-border rounded-2xl overflow-hidden">
                <div className="flex items-stretch">
                    {/* Left — NurFizika */}
                    <div className="flex-1 flex flex-col items-center justify-center p-6 border-r border-blue-500/20">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden  border-[0.5px] border-blue-400/30 mb-3">
                            <img
                                src="/assets/nurfizika.jpg"
                                alt="NurFizika Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="text-xl font-bold theme-text mb-0.5">NurFizika</h2>
                        <p className="text-xs theme-muted italic mb-1 text-center">{t('settings_slogan')}</p>
                        <span className="text-xs text-blue-400 font-semibold bg-blue-500/10 border-[0.5px] border-blue-500/20 px-2.5 py-1 rounded-full">NurFizika 1.0</span>
                    </div>

                    {/* Right — Developer */}
                    <div className="flex-1 flex flex-col items-center justify-center p-6">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-[0.5px] border-teal-500/60  mb-3">
                            <img
                                src="/assets/1776146852544.png"
                                alt="Ulugbek Roziboyev"
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                        <p className="theme-text font-bold text-sm mb-0.5 text-center">Ulug'bek Ro'ziboyev</p>
                        <p className="text-teal-400 text-xs text-center">{t('settings_dev_role')}</p>
                        <p className="theme-muted text-xs text-center">{t('settings_dev_desc')}</p>
                    </div>
                </div>
            </div>

            {/* Legal Documents */}
            <div>
                <p className="text-xs font-bold theme-muted uppercase tracking-wider mb-3">{t('settings_legal_title')}</p>
                <div className="space-y-2">
                    {[
                        { label: t('settings_offer'), key: 'oferta', icon: '📄' },
                        { label: t('settings_privacy'), key: 'maxfiylik', icon: '🔒' },
                        { label: t('settings_consent'), key: 'rozilik', icon: '📋' },
                    ].map((item) => (
                        <button
                            key={item.key}
                            onClick={() => setLegalView(item.key)}
                            className="w-full flex items-center justify-between p-4 theme-card hover:theme-bg rounded-xl transition-all group border-[0.5px] theme-border hover:border-teal-500/40"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-lg">{item.icon}</span>
                                <span className="font-medium text-sm text-left theme-text">{item.label}</span>
                            </div>
                            <ChevronRight size={16} className="theme-muted group-hover:translate-x-1 group-hover:text-teal-400 transition-all flex-shrink-0" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Social Media */}
            <div>
                <p className="text-xs font-bold theme-muted uppercase tracking-wider mb-3">{t('settings_social')}</p>
                <div className="grid grid-cols-4 gap-3">
                    {socialLinks.map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex flex-col items-center gap-2 p-3 rounded-xl  ${social.color} text-white hover:opacity-90 active:scale-95 transition-all `}
                        >
                            {social.icon}
                            <span className="text-xs font-medium">{social.name}</span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Contact Email */}
            <a
                href="mailto:nurfizikasupport@gmail.com"
                className="flex items-center gap-3 p-4 bg-slate-800 hover:bg-slate-750 rounded-xl border-[0.5px] border-slate-700 hover:border-blue-500/40 transition-all group"
            >
                <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <Mail size={20} />
                </div>
                <div>
                    <div className="text-xs text-slate-400 mb-0.5">Bog'lanish</div>
                    <div className="text-sm font-medium text-blue-400">nurfizikasupport@gmail.com</div>
                </div>
            </a>

            <p className="text-center text-xs theme-muted pb-4">© 2026 NurFizika. Barcha huquqlar himoyalangan.</p>
        </div>
    );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function SettingsPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [toast, setToast] = useState(null);
    const [search, setSearch] = useState('');

    const showToast = useCallback((message, type = 'success') => {
        setToast({ message, type });
    }, []);

    const TABS = getTabs(t);
    const currentTab = TABS.find(t => t.id === activeTab);

    const renderContent = () => {
        switch (activeTab) {
            case 'profile': return <ProfileTab showToast={showToast} />;
            case 'appearance': return <RejimVaTilTab showToast={showToast} />;
            case 'notifications': return <BildirishnomaTab showToast={showToast} />;
            case 'security': return <XavfsizlikTab showToast={showToast} />;
            case 'about': return <AboutTab />;
            default: return null;
        }
    };

    const filteredTabs = search
        ? TABS.filter(t => t.label.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase()))
        : TABS;

    return (
        <div className="h-screen theme-bg theme-text flex flex-col overflow-hidden">
            {/* Toast */}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* Top bar */}
            <div className="flex-shrink-0 flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b-[0.5px] theme-border theme-surface backdrop-blur-sm">
                <div className="flex items-center gap-4 sm:gap-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 theme-muted hover:text-teal-400 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span className="font-medium text-sm sm:text-base hidden sm:inline-block">{t('nav_back') || 'Ortga'}</span>
                    </button>
                    <div className="h-6 w-px bg-gray-200 dark:bg-slate-700 hidden sm:block"></div>
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 sm:p-2 theme-card rounded-xl flex items-center justify-center">
                            <Settings size={16} className="theme-muted block" />
                        </div>
                        <h1 className="text-base sm:text-lg font-bold leading-none">{t('settings_title')}</h1>
                    </div>
                </div>

                {/* Search — hidden on mobile */}
                <div className="relative w-44 sm:w-56 hidden sm:block">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="search"
                        name="settings-search"
                        autoComplete="off"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder={t('settings_search')}
                        className="w-full theme-input border-[0.5px] rounded-xl
                            pl-9 pr-4 py-2 text-sm placeholder-slate-500
                            focus:border-teal-500/50 focus:outline-none transition-all"
                    />
                </div>
            </div>

            {/* Mobile tab bar */}
            <div className="sm:hidden flex-shrink-0 flex gap-1 overflow-x-auto px-3 py-2 border-b-[0.5px] theme-border theme-surface custom-scrollbar">
                {getTabs(t).map(tab => {
                    const Icon = tab.icon;
                    const active = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap text-xs font-semibold flex-shrink-0 transition-all duration-200
                                ${active
                                    ? 'bg-teal-600/30 border-[0.5px] border-teal-500/50 text-teal-300'
                                    : 'theme-muted border-[0.5px] border-transparent hover:bg-blue-50 dark:hover:bg-slate-800'
                                }`}
                        >
                            <Icon size={14} className={tab.iconColor} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">

                {/* ── Sidebar — hidden on mobile ── */}
                <aside className="hidden sm:flex w-64 xl:w-72 flex-shrink-0 border-r-[0.5px] theme-border theme-surface flex-col overflow-y-auto custom-scrollbar px-3 py-4 gap-1">
                    {filteredTabs.map(tab => {
                        const Icon = tab.icon;
                        const active = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setSearch(''); }}
                                className={`
                                    w-full p-3 rounded-xl
                                    transition-all duration-200 text-left group
                                    ${active
                                        ? 'bg-teal-600/20 border-[0.5px] border-teal-500/40'
                                        : 'hover:bg-blue-50 dark:hover:bg-slate-800 border-[0.5px] border-transparent'
                                    }
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-xl border-[0.5px] border-white/5 ${tab.iconBg} flex-shrink-0 transition-transform group-hover:scale-110`}>
                                        <Icon size={18} className={tab.iconColor} />
                                    </div>
                                    <p className={`flex-1 text-[15px] font-semibold truncate ${active ? 'theme-text' : 'theme-text-secondary'}`}>
                                        {tab.label}
                                    </p>
                                    {active && <ChevronRight size={16} className="text-teal-400 flex-shrink-0" />}
                                </div>
                                <p className="text-xs theme-muted truncate pl-[46px] mt-0.5">{tab.desc}</p>
                            </button>
                        );
                    })}

                    {filteredTabs.length === 0 && (
                        <div className="text-center py-10">
                            <p className="theme-muted text-sm">{t('settings_not_found')}</p>
                        </div>
                    )}
                </aside>

                {/* ── Content ── */}
                <main className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-8 py-4 sm:py-6">
                    <div className="max-w-2xl">
                        {currentTab && <SectionHeader tab={currentTab} />}
                        {renderContent()}
                    </div>
                </main>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translate(-50%, 20px); }
                    to { opacity: 1; transform: translate(-50%, 0); }
                }
                .animate-fadeIn { animation: fadeIn 0.25s ease forwards; }
                .animate-slideUp { animation: slideUp 0.3s ease forwards; }
            `}</style>
        </div>
    );
}
