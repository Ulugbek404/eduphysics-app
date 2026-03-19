import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Shield, Palette, Bell, Globe, Database,
    Eye, EyeOff, Moon, Sun, Monitor, Check,
    Clock, Zap, Target, MessageSquare, BarChart2, Flame,
    CheckCircle, AlertCircle, FileText, Trash2, AlertTriangle,
    ChevronLeft, ChevronRight, Settings, Lock, Download, Printer,
    Search, BookOpen, User, TrendingUp, Camera
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

// ─── Tabs config ──────────────────────────────────────────────────────────────
const getTabs = (t) => [
    {
        id: 'profile',
        label: "Ma'lumotlar",
        desc: "Shaxsiy ma'lumotlar",
        icon: User,
        iconBg: 'bg-indigo-500/20',
        iconColor: 'text-indigo-400',
    },
    {
        id: 'appearance',
        label: "Ko'rinish",
        desc: 'Tema va ranglar',
        icon: Palette,
        iconBg: 'bg-violet-500/20',
        iconColor: 'text-violet-400',
    },
    {
        id: 'notifications',
        label: 'Bildirishnomalar',
        desc: 'Eslatmalar sozlash',
        icon: Bell,
        iconBg: 'bg-yellow-500/20',
        iconColor: 'text-yellow-400',
    },
    {
        id: 'language',
        label: 'Til',
        desc: "O'zbek / Rus / Eng",
        icon: Globe,
        iconBg: 'bg-emerald-500/20',
        iconColor: 'text-emerald-400',
    },
    {
        id: 'security',
        label: 'Xavfsizlik',
        desc: 'Parol va himoya',
        icon: Shield,
        iconBg: 'bg-red-500/20',
        iconColor: 'text-red-400',
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
            flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border
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
        <div className="flex items-center gap-4 mb-7 pb-6 border-b border-slate-700">
            <div className={`p-3 rounded-2xl ${tab.iconBg} flex-shrink-0`}>
                <Icon size={24} className={tab.iconColor} />
            </div>
            <div>
                <h2 className="text-xl font-bold text-white">{tab.label}</h2>
                <p className="text-slate-400 text-sm mt-0.5">{tab.desc}</p>
            </div>
        </div>
    );
}

// ─── TAB 1 — PROFIL (MA'LUMOTLAR) ────────────────────────────────────────────────
const ProfileTab = ({ showToast }) => {
    const { user, userData, logout } = useAuth();
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
            if (showToast) showToast("Rasm hajmi 2MB dan katta bo'lmasligi kerak", 'error');
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

            if (showToast) showToast("Profil rasmi yangilandi! ✅", 'success');
        } catch (error) {
            console.error("Rasm yuklash xatosi:", error);
            if (showToast) showToast("Rasm yuklashda xatolik yuz berdi", 'error');
        } finally {
            setUploadingPhoto(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleSave = async () => {
        if (!user?.uid) return;
        setSaving(true);
        try {
            const dataToSave = {
                displayName: form.displayName || '',
                phone: form.phone || '',
                school: form.school || '',
                region: form.region || '',
                grade: form.grade || '9',
                bio: form.bio || '',
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
            if (showToast) showToast("Ma'lumotlar saqlandi ✅", 'success');
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
            if (showToast) showToast("Ma'lumotlar yuklab olindi ✅", 'success');
        } catch {
            if (showToast) showToast("Yuklab olishda xatolik!", 'error');
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
    .stat-card { background:#fff; border-radius:12px; padding:20px; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,.1); border:1px solid #e2e8f0; }
    .stat-number { font-size:32px; font-weight:bold; color:#6366f1; }
    .stat-label { font-size:12px; color:#64748b; margin-top:4px; }
    .section { background:#fff; border-radius:12px; padding:24px; margin-bottom:16px; box-shadow:0 1px 3px rgba(0,0,0,.1); border:1px solid #e2e8f0; }
    .section h2 { font-size:16px; font-weight:bold; color:#1e293b; margin-bottom:16px; padding-bottom:8px; border-bottom:2px solid #e2e8f0; }
    .progress-bar-bg { background:#e2e8f0; border-radius:999px; height:12px; margin:8px 0; }
    .progress-bar-fill { background:linear-gradient(90deg,#6366f1,#8b5cf6); border-radius:999px; height:12px; width:${percentage}%; }
    .topic-chip { display:inline-block; background:#f0f0ff; color:#6366f1; border:1px solid #c7d2fe; border-radius:6px; padding:3px 10px; font-size:11px; margin:3px; }
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
                if (showToast) showToast("Pop-up bloklangan! Ruxsat bering.", 'error');
                return;
            }
            printWindow.document.write(reportHTML);
            printWindow.document.close();
            setTimeout(() => { printWindow.focus(); printWindow.print(); }, 500);
            if (showToast) showToast('Hisobot tayyorlandi ✅', 'success');
        } catch {
            if (showToast) showToast("Hisobotni chiqarishda xato!", 'error');
        }
    };

    const handleDelete = async () => {
        if (!delPassword) return showToast ? showToast("Parolni kiriting!", 'error') : null;
        setDelLoading(true);
        try {
            const cred = EmailAuthProvider.credential(user.email, delPassword);
            await reauthenticateWithCredential(user, cred);
            await deleteDoc(doc(db, 'users', user.uid));
            await deleteUser(user);
            if (showToast) showToast("Akkaunt o'chirildi", 'success');
            logout();
        } catch (e) {
            if (showToast) showToast(e.code === 'auth/wrong-password' ? "Noto'g'ri parol!" : "Xatolik yuz berdi", 'error');
        } finally {
            setDelLoading(false);
        }
    };

    return (
        <div className="space-y-8 max-w-2xl mb-20 animate-fadeIn">
            {/* Sarlavha va Edit tugmasi */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-800 border border-slate-700 p-5 rounded-2xl gap-4">
                <div>
                    <h2 className="text-white font-bold text-xl mb-1">
                        Shaxsiy Ma'lumotlar
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Ma'lumotlaringiz leaderboard va missiyalarda ko'rsatiladi.
                    </p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 
                            px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border border-indigo-500/30
                            flex items-center justify-center gap-2 flex-shrink-0"
                    >
                        <Settings size={16} /> Tahrirlash
                    </button>
                )}
            </div>

            {/* Profil formasi */}
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl space-y-6">
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <div className="w-20 h-20 rounded-full bg-indigo-600 border-2 border-indigo-400 overflow-hidden shadow-lg shadow-indigo-500/20
                                flex items-center justify-center text-3xl
                                font-bold text-white uppercase relative">
                            {form.photoURL ? (
                                <img src={form.photoURL} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                form.displayName?.[0] || 'U'
                            )}

                            {uploadingPhoto && (
                                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingPhoto}
                            title="Rasmni o'zgartirish"
                            className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-500 hover:bg-indigo-400 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-slate-700 transition-colors cursor-pointer z-10 disabled:opacity-50"
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
                        <p className="text-white font-medium text-lg">{form.displayName || "Ism kiritilmagan"}</p>
                        <p className="text-slate-400 text-sm">{user?.email}</p>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="sm:col-span-2">
                            <label className="text-slate-300 text-sm font-medium mb-1.5 block">
                                To'liq ism *
                            </label>
                            <input
                                disabled={!isEditing}
                                value={form.displayName}
                                onChange={e => setForm({ ...form, displayName: e.target.value })}
                                placeholder="Ismingiz va familiyangiz"
                                className="w-full bg-slate-900 border border-slate-700
                           rounded-xl px-4 py-3 text-white text-sm
                           focus:outline-none focus:border-indigo-500 
                           transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="text-slate-300 text-sm font-medium mb-1.5 block">
                                Telefon raqam
                            </label>
                            <input
                                disabled={!isEditing}
                                value={form.phone}
                                onChange={handlePhoneChange}
                                placeholder="+998 90 123 45 67"
                                className="w-full bg-slate-900 border border-slate-700
                           rounded-xl px-4 py-3 text-white text-sm
                           focus:outline-none focus:border-indigo-500 
                           transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="text-slate-300 text-sm font-medium mb-1.5 block">
                                Maktab
                            </label>
                            <input
                                disabled={!isEditing}
                                value={form.school}
                                onChange={e => setForm({ ...form, school: e.target.value })}
                                placeholder="Masalan: 45-maktab"
                                className="w-full bg-slate-900 border border-slate-700
                           rounded-xl px-4 py-3 text-white text-sm
                           focus:outline-none focus:border-indigo-500 
                           transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="text-slate-300 text-sm font-medium mb-1.5 block">
                                Hudud (viloyat) *
                                <span className="text-indigo-400 text-xs ml-2">
                                    — leaderboard filtri uchun 🏆
                                </span>
                            </label>
                            <select
                                disabled={!isEditing}
                                value={form.region}
                                onChange={e => setForm({ ...form, region: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700
                           rounded-xl px-4 py-3 text-white text-sm
                           focus:outline-none focus:border-indigo-500 
                           transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                                <option value="" disabled>Viloyatni tanlang</option>
                                {regions.map(r => (
                                    <option key={r} value={r}>{r}</option>
                                ))}
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="text-slate-300 text-sm font-medium mb-1.5 block">
                                Sinf
                            </label>
                            <select
                                disabled={!isEditing}
                                value={form.grade}
                                onChange={e => setForm({ ...form, grade: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700
                           rounded-xl px-4 py-3 text-white text-sm
                           focus:outline-none focus:border-indigo-500 
                           transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                                {['7', '8', '9', '10', '11'].map(g => (
                                    <option key={g} value={g}>{g}-sinf</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-slate-300 text-sm font-medium mb-1.5 block">
                            O'zingiz haqingizda
                        </label>
                        <textarea
                            disabled={!isEditing}
                            value={form.bio}
                            onChange={e => setForm({ ...form, bio: e.target.value })}
                            placeholder="Qisqacha o'zingiz haqingizda (qiziqishlaringiz, maqsadlaringiz)..."
                            rows={3}
                            className="w-full bg-slate-900 border border-slate-700
                           rounded-xl px-4 py-3 text-white text-sm
                           focus:outline-none focus:border-indigo-500 
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
                                bg-slate-800 hover:bg-slate-600 text-white"
                        >
                            Bekor qilish
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving || !form.displayName || !form.region}
                            className={`flex-[2] py-3.5 rounded-xl font-semibold text-sm
                                shadow-lg transition-all flex items-center justify-center gap-2
                                ${saved
                                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/25'
                                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {saving ? (
                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            ) : saved ? (
                                <><CheckCircle size={18} /> Saqlandi!</>
                            ) : (
                                <><Database size={18} /> O'zgarishlarni Saqlash</>
                            )}
                        </button>
                    </div>
                )}
            </div>

            {/* Eksport & Delete */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mb-3">
                        <Printer size={20} className="text-blue-400" />
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-1">Progress Hisoboti</h3>
                    <p className="text-slate-400 text-xs mb-4 leading-relaxed">O'quv natijalaringizni chop eting</p>
                    <button
                        onClick={handlePrint}
                        className="w-full bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30
                            text-blue-400 rounded-xl py-2.5 text-xs font-semibold
                            transition-all flex items-center justify-center gap-2"
                    >
                        <Printer size={13} /> Chop Etish
                    </button>
                </div>

                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-3">
                        <Download size={20} className="text-emerald-400" />
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-1">JSON Eksport</h3>
                    <p className="text-slate-400 text-xs mb-4 leading-relaxed">Barcha ma'lumotlaringizni saqlang</p>
                    <button
                        onClick={handleExport}
                        className="w-full bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30
                            text-emerald-400 rounded-xl py-2.5 text-xs font-semibold
                            transition-all flex items-center justify-center gap-2"
                    >
                        <Download size={13} /> Yuklab Olish
                    </button>
                </div>
            </div>

            <div className="bg-red-950/30 border border-red-900/50 rounded-2xl p-5 mt-4">
                <div className="flex items-start gap-3 mb-5">
                    <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <AlertTriangle size={20} className="text-red-400" />
                    </div>
                    <div>
                        <h3 className="text-red-400 font-semibold">Akkauntni O'chirish</h3>
                        <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                            Akkauntni o'chirsangiz barcha progress, XP va ma'lumotlar abadiy yo'qoladi.
                            Bu amalni ortga qaytarib bo'lmaydi!
                        </p>
                    </div>
                </div>

                {!confirmDelete ? (
                    <button
                        onClick={() => setConfirmDelete(true)}
                        className="w-full bg-red-600/20 hover:bg-red-600/30 border border-red-500/30
                            text-red-400 font-medium py-3 rounded-xl
                            transition-all flex items-center justify-center gap-2"
                    >
                        <Trash2 size={15} />
                        O'chirish
                    </button>
                ) : (
                    <div className="space-y-3">
                        <p className="text-red-400 text-sm font-medium">Tasdiqlash uchun parolingizni kiriting:</p>
                        <div className="relative">
                            <input
                                type={showDelPass ? 'text' : 'password'}
                                value={delPassword}
                                onChange={e => setDelPassword(e.target.value)}
                                placeholder="Parolingiz"
                                className="w-full bg-slate-900 border border-red-800/60 rounded-xl
                                    px-4 py-3 text-white placeholder-slate-600 text-sm
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
                                className="flex-1 bg-slate-800 hover:bg-slate-600 text-slate-300 py-2.5 rounded-xl text-sm font-medium transition-all"
                            >
                                Bekor qilish
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

    const strengthLabel = ['Parol kiriting', '🔴 Juda zaif', '🟡 O\'rtacha', '🔵 Yaxshi', '🟢 Kuchli'][strength];
    const barColors = ['', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-emerald-500'];

    const handlePhotoUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            if (showToast) showToast("Rasm hajmi 2MB dan katta bo'lmasligi kerak", 'error');
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
            if (showToast) showToast("Profil rasmi yangilandi! ✅", 'success');
        } catch (error) {
            console.error("Rasm yuklash xatosi:", error);
            if (showToast) showToast("Rasm yuklashda xatolik yuz berdi", 'error');
        } finally {
            setUploadingPhoto(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleSave = async () => {
        if (fields.newPass !== fields.confirm) return showToast("Parollar mos kelmadi!", 'error');
        if (fields.newPass.length < 6) return showToast("Parol kamida 6 ta belgi bo'lishi kerak!", 'error');
        setLoading(true);
        try {
            const cred = EmailAuthProvider.credential(user.email, fields.current);
            await reauthenticateWithCredential(user, cred);
            await updatePassword(user, fields.newPass);
            showToast("Parol muvaffaqiyatli yangilandi! ✅", 'success');
            setFields({ current: '', newPass: '', confirm: '' });
        } catch (e) {
            showToast(e.code === 'auth/wrong-password' ? "Joriy parol noto'g'ri!" : "Xatolik yuz berdi.", 'error');
        } finally {
            setLoading(false);
        }
    };

    const inputs = [
        { key: 'current', label: 'Joriy parol', placeholder: '••••••••' },
        { key: 'newPass', label: 'Yangi parol', placeholder: 'Kamida 6 belgi' },
        { key: 'confirm', label: 'Tasdiqlash', placeholder: 'Yangi parolni qayta kiriting' },
    ];

    return (
        <div className="space-y-5 animate-fadeIn">
            {/* Strength card */}
            {fields.newPass && (
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <Lock size={14} className="text-slate-400" />
                        <span className="text-xs text-slate-400 font-medium">Parol kuchi</span>
                    </div>
                    <div className="flex gap-1.5 mb-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${strength >= i ? barColors[i] : 'bg-slate-800'}`} />
                        ))}
                    </div>
                    <p className="text-xs text-slate-400">{strengthLabel}</p>
                </div>
            )}

            {/* Inputs */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-4">
                {inputs.map(({ key, label, placeholder }) => (
                    <div key={key}>
                        <label className="text-xs text-slate-400 mb-1.5 block font-medium">{label}</label>
                        <div className="relative">
                            <input
                                type={show[key] ? 'text' : 'password'}
                                value={fields[key]}
                                onChange={e => update(key, e.target.value)}
                                placeholder={placeholder}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl
                                    px-4 py-3 text-white placeholder-slate-600 text-sm
                                    focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30
                                    outline-none transition-all duration-200"
                            />
                            <button onClick={() => toggle(key)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors">
                                {show[key] ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                ))}

                <button
                    onClick={handleSave}
                    disabled={loading || !fields.current || !fields.newPass || !fields.confirm}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed
                        text-white font-semibold py-3 rounded-xl transition-all duration-200
                        flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/25 mt-2"
                >
                    {loading ? (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                    ) : <Shield size={16} />}
                    Parolni Yangilash
                </button>
            </div>
        </div>
    );
}

// ─── TAB 2 — KO'RINISH ────────────────────────────────────────────────────────
function KorinishTab() {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const [accent, setAccentLocal] = useState(() => localStorage.getItem('nf_accent') || 'indigo');

    const themes = [
        {
            id: 'dark', label: 'Dark', emoji: '🌙',
            desc: "Ko'zni kam charchatadi",
            available: true,
            preview: { bg: '#020617', surface: '#0f172a', accent: '#6366f1' }
        },
        {
            id: 'light', label: 'White', emoji: '☀️',
            desc: 'Klassik yorug\' interfeys',
            available: false,
            preview: { bg: '#f8fafc', surface: '#ffffff', accent: '#4f46e5' }
        },
        {
            id: 'black', label: 'Black', emoji: '🌑',
            desc: 'OLED ekranlar uchun ideal',
            available: false,
            preview: { bg: '#000000', surface: '#141414', accent: '#818cf8' }
        },
    ];

    const accents = [
        { id: 'indigo', color: '#6366f1', bg: 'bg-indigo-500' },
        { id: 'violet', color: '#8b5cf6', bg: 'bg-violet-500' },
        { id: 'blue', color: '#3b82f6', bg: 'bg-blue-500' },
        { id: 'emerald', color: '#10b981', bg: 'bg-emerald-500' },
        { id: 'rose', color: '#f43f5e', bg: 'bg-rose-500' },
    ];

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Tema */}
            <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Interfeys Temasi</p>
                <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-3">
                    {themes.map(t => (
                        <div key={t.id} className={`
                            relative p-4 rounded-2xl border-2 cursor-pointer
                            transition-all duration-300 hover:scale-[1.03] text-left
                            ${theme === t.id && t.available
                                ? 'border-indigo-500 shadow-lg shadow-indigo-500/20'
                                : t.available
                                    ? 'border-slate-700 hover:border-slate-700'
                                    : 'border-slate-700 opacity-50 cursor-not-allowed'
                            } bg-slate-800
                        `}>
                            {/* Mini preview */}
                            <div className="w-full h-20 rounded-xl mb-3 overflow-hidden"
                                style={{ background: t.preview.bg }}>
                                <div className="flex h-full">
                                    <div className="w-8 h-full" style={{ background: t.preview.surface }} />
                                    <div className="flex-1 p-2 flex flex-col gap-1.5">
                                        <div className="h-2 rounded-full w-3/4"
                                            style={{ background: t.preview.accent, opacity: 0.8 }} />
                                        <div className="h-1.5 rounded-full w-1/2"
                                            style={{ background: t.preview.surface }} />
                                        <div className="h-1.5 rounded-full w-2/3"
                                            style={{ background: t.preview.surface }} />
                                    </div>
                                </div>
                            </div>
                            {/* Label */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white font-semibold text-sm">{t.emoji} {t.label}</p>
                                    <p className="text-slate-400 text-xs mt-0.5">{t.desc}</p>
                                </div>
                                {theme === t.id && t.available && (
                                    <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Check size={11} className="text-white" />
                                    </div>
                                )}
                            </div>
                            {/* Coming soon */}
                            {!t.available && (
                                <span className="absolute top-2 right-2 text-[9px] font-semibold bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">
                                    Tez kunda
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Accent rang */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Asosiy Rang</p>
                <div className="flex items-center gap-3">
                    {accents.map(a => (
                        <button
                            key={a.id}
                            onClick={() => { setAccentLocal(a.id); localStorage.setItem('nf_accent', a.id); }}
                            title={a.id}
                            className={`w-9 h-9 rounded-full ${a.bg} transition-all duration-200
                                ${accent === a.id
                                    ? 'ring-2 ring-offset-2 ring-offset-slate-800 ring-white scale-110'
                                    : 'opacity-60 hover:opacity-100 hover:scale-105'
                                }`}
                        />
                    ))}
                </div>
                <p className="text-xs text-slate-600 mt-3">
                    Tanlangan: <span className="text-slate-400 capitalize font-medium">{accent}</span>
                </p>
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
            title: "O'quv Jarayoni",
            items: [
                { id: 'dailyReminder', icon: Clock, iconBg: 'bg-blue-500/20', iconColor: 'text-blue-400', title: 'Kunlik eslatma', desc: 'Har kuni o\'qishga undovchi eslatma' },
                { id: 'streakReminder', icon: Flame, iconBg: 'bg-orange-500/20', iconColor: 'text-orange-400', title: 'Streak eslatmasi', desc: 'Ketma-ketlikni yo\'qotmaslik uchun' },
                { id: 'missionComplete', icon: Target, iconBg: 'bg-purple-500/20', iconColor: 'text-purple-400', title: 'Missiya tugallandi', desc: 'Missiya bajarilganda xabar' },
            ]
        },
        {
            title: 'Tizim',
            items: [
                { id: 'xpUpdates', icon: Zap, iconBg: 'bg-yellow-500/20', iconColor: 'text-yellow-400', title: 'XP yangilanishlari', desc: 'XP qo\'shilganda bildirishnoma' },
                { id: 'teacherMessages', icon: MessageSquare, iconBg: 'bg-emerald-500/20', iconColor: 'text-emerald-400', title: 'O\'qituvchi xabarlari', desc: 'O\'qituvchidan yangi xabar kelganda' },
                { id: 'weeklyReport', icon: BarChart2, iconBg: 'bg-indigo-500/20', iconColor: 'text-indigo-400', title: 'Haftalik hisobot', desc: 'Har dushanba o\'quv natijalari' },
            ]
        },
    ];

    const handlePhotoUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            if (showToast) showToast("Rasm hajmi 2MB dan katta bo'lmasligi kerak", 'error');
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
            if (showToast) showToast("Profil rasmi yangilandi! ✅", 'success');
        } catch (error) {
            console.error("Rasm yuklash xatosi:", error);
            if (showToast) showToast("Rasm yuklashda xatolik yuz berdi", 'error');
        } finally {
            setUploadingPhoto(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            if (user?.uid) {
                await updateDoc(doc(db, 'users', user.uid), { notificationSettings: settings });
            }
            showToast('Bildirishnoma sozlamalari saqlandi ✅', 'success');
        } catch {
            showToast('Saqlashda xatolik yuz berdi', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4 animate-fadeIn">
            {groups.map(group => (
                <div key={group.title} className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-slate-700">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{group.title}</p>
                    </div>
                    <div className="divide-y divide-slate-700/30">
                        {group.items.map(item => {
                            const Icon = item.icon;
                            return (
                                <div key={item.id} className="flex items-center justify-between px-5 py-4 hover:bg-slate-800 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                                            <Icon size={16} className={item.iconColor} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">{item.title}</p>
                                            <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleItem(item.id)}
                                        className={`relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0
                                            ${settings[item.id] ? 'bg-indigo-600' : 'bg-slate-800'}`}
                                    >
                                        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300
                                            ${settings[item.id] ? 'left-5' : 'left-0.5'}`} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
            <button
                onClick={handleSave}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40
                    text-white font-semibold py-3 rounded-xl transition-all duration-200
                    flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/25"
            >
                {loading ? <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> : <Bell size={16} />}
                Saqlash
            </button>
        </div>
    );
}

// ─── TAB 4 — TIL ──────────────────────────────────────────────────────────────
function TilTab({ showToast }) {
    const { language: lang, setLanguage: setLang, t } = useLanguage();

    const langs = [
        { id: 'uz', flag: '🇺🇿', label: "O'zbekcha", desc: "Barcha matnlar o'zbek tilida", code: 'UZ' },
        { id: 'ru', flag: '🇷🇺', label: 'Русский', desc: 'Все тексты на русском', code: 'RU' },
        { id: 'en', flag: '🇬🇧', label: 'English', desc: 'All texts in English', code: 'EN' },
    ];

    const handleSelect = (id) => {
        if (setLang) setLang(id);
        showToast('Til muvaffaqiyatli o\'zgartirildi ✅', 'success');
    };

    return (
        <div className="space-y-3 animate-fadeIn">
            {langs.map(l => (
                <button
                    key={l.id}
                    onClick={() => handleSelect(l.id)}
                    className={`
                        flex items-center gap-4 w-full p-4 rounded-2xl border-2
                        transition-all duration-200 hover:scale-[1.02] text-left
                        ${lang === l.id
                            ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10'
                            : 'border-slate-700 hover:border-slate-700 bg-slate-800'
                        }
                    `}
                >
                    <span className="text-4xl">{l.flag}</span>
                    <div className="flex-1">
                        <p className="text-white font-semibold">{l.label}</p>
                        <p className="text-slate-400 text-sm mt-0.5">{l.desc}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                        ${lang === l.id ? 'border-indigo-500 bg-indigo-500' : 'border-slate-700'}`}>
                        {lang === l.id && <Check size={12} className="text-white" />}
                    </div>
                </button>
            ))}
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
            case 'appearance': return <KorinishTab />;
            case 'notifications': return <BildirishnomaTab showToast={showToast} />;
            case 'language': return <TilTab showToast={showToast} />;
            case 'security': return <XavfsizlikTab showToast={showToast} />;
            default: return null;
        }
    };

    const filteredTabs = search
        ? TABS.filter(t => t.label.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase()))
        : TABS;

    return (
        <div className="h-screen bg-slate-900 text-white flex flex-col overflow-hidden">
            {/* Toast */}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* Top bar */}
            <div className="flex-shrink-0 flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-slate-700 bg-slate-900 backdrop-blur-sm">
                <div className="flex items-center gap-2 sm:gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 sm:p-2 bg-slate-800 rounded-xl">
                            <Settings size={16} className="text-slate-300" />
                        </div>
                        <h1 className="text-base sm:text-lg font-bold">Sozlamalar</h1>
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
                        placeholder="Qidirish..."
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl
                            pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500
                            focus:border-indigo-500/50 focus:outline-none transition-all"
                    />
                </div>
            </div>

            {/* Mobile tab bar */}
            <div className="sm:hidden flex-shrink-0 flex gap-1 overflow-x-auto px-3 py-2 border-b border-slate-700 bg-slate-900 custom-scrollbar">
                {getTabs(t).map(tab => {
                    const Icon = tab.icon;
                    const active = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap text-xs font-semibold flex-shrink-0 transition-all duration-200
                                ${active
                                    ? 'bg-indigo-600/30 border border-indigo-500/50 text-indigo-300'
                                    : 'text-slate-400 border border-transparent hover:bg-slate-800'
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
                <aside className="hidden sm:flex w-64 xl:w-72 flex-shrink-0 border-r border-slate-700 bg-slate-900 flex-col overflow-y-auto custom-scrollbar px-3 py-4 gap-1">
                    {filteredTabs.map(tab => {
                        const Icon = tab.icon;
                        const active = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setSearch(''); }}
                                className={`
                                    w-full flex items-center gap-3 p-3 rounded-xl
                                    transition-all duration-200 text-left group
                                    ${active
                                        ? 'bg-indigo-600/20 border border-indigo-500/40'
                                        : 'hover:bg-slate-800 border border-transparent'
                                    }
                                `}
                            >
                                <div className={`p-2.5 rounded-xl ${tab.iconBg} flex-shrink-0 transition-transform group-hover:scale-110`}>
                                    <Icon size={18} className={tab.iconColor} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-semibold truncate ${active ? 'text-white' : 'text-slate-300'}`}>
                                        {tab.label}
                                    </p>
                                    <p className="text-xs text-slate-400 truncate mt-0.5">{tab.desc}</p>
                                </div>
                                {active && <ChevronRight size={14} className="text-indigo-400 flex-shrink-0" />}
                            </button>
                        );
                    })}

                    {filteredTabs.length === 0 && (
                        <div className="text-center py-10">
                            <p className="text-slate-600 text-sm">Hech narsa topilmadi</p>
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
