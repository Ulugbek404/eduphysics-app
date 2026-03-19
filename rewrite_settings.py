import re
import os

filepath = r"c:\Users\pc\Desktop\BMI_FIZIKA\Ulugbek-Fizika\src\pages\SettingsPage.jsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add setDoc import
if 'setDoc' not in content:
    content = re.sub(
        r"import \{([^}]+)\} from 'firebase/firestore';",
        lambda m: f"import {{{m.group(1).rstrip()}, setDoc}} from 'firebase/firestore';" if 'setDoc' not in m.group(1) else m.group(0),
        content
    )

# 2. Replace ProfileTab component
profile_tab_pattern = re.compile(
    r"// ─── TAB 1 — PROFIL \(MA'LUMOTLAR\) ────────────────────────────────────────────────\nconst ProfileTab = \(\) => \{.+?(?=(?:// ─── TAB 2 — XAVFSIZLIK VA EKSPORT ─────────────────────────────────────────────))",
    re.DOTALL
)

profile_tab_new = r"""// ─── TAB 1 — PROFIL (MA'LUMOTLAR) ────────────────────────────────────────────────
const ProfileTab = ({ showToast }) => {
    const { user, userData, logout } = useAuth();
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

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
    });

    const regions = [
        "Toshkent shahri", "Toshkent viloyati",
        "Samarqand", "Buxoro", "Andijon",
        "Farg'ona", "Namangan", "Qashqadaryo",
        "Surxondaryo", "Navoiy", "Xorazm",
        "Sirdaryo", "Jizzax", "Qoraqalpog'iston"
    ];

    const handleSave = async () => {
        if (!user?.uid) return;
        setSaving(true);
        try {
            await setDoc(doc(db, "users", user.uid), {
                displayName: form.displayName,
                phone: form.phone,
                school: form.school,
                region: form.region,
                grade: form.grade,
                bio: form.bio,
                updatedAt: serverTimestamp(),
            }, { merge: true });

            try {
                 await setDoc(doc(db, "leaderboard", "global", "users", user.uid), {
                     displayName: form.displayName,
                     region: form.region,
                     school: form.school,
                 }, { merge: true });
            } catch(e) {}

            if (form.region) {
                try {
                     await setDoc(doc(db, "leaderboard", form.region, "users", user.uid), {
                         displayName: form.displayName,
                         region: form.region,
                         school: form.school,
                     }, { merge: true });
                } catch(e) {}
            }

            if(auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: form.displayName
                });
            }

            setSaved(true);
            setIsEditing(false);
            if (showToast) showToast("Ma'lumotlar saqlandi ✅", 'success');
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            console.error(err);
            if (showToast) showToast("Xatolik yuz berdi", 'error');
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-800/50 border border-slate-700/50 p-5 rounded-2xl gap-4">
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
            <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-2xl space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-indigo-600 border border-indigo-400/30 shadow-lg shadow-indigo-500/20
                            flex items-center justify-center text-2xl
                            font-bold text-white uppercase">
                        {form.displayName?.[0] || 'U'}
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
                                className="w-full bg-slate-900/60 border border-slate-700
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
                                onChange={e => setForm({ ...form, phone: e.target.value })}
                                placeholder="+998 90 123 45 67"
                                className="w-full bg-slate-900/60 border border-slate-700
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
                                className="w-full bg-slate-900/60 border border-slate-700
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
                                className="w-full bg-slate-900/60 border border-slate-700
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
                                className="w-full bg-slate-900/60 border border-slate-700
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
                            className="w-full bg-slate-900/60 border border-slate-700
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
                                bg-slate-700 hover:bg-slate-600 text-white"
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
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mb-3">
                        <Printer size={20} className="text-blue-400" />
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-1">Progress Hisoboti</h3>
                    <p className="text-slate-500 text-xs mb-4 leading-relaxed">O'quv natijalaringizni chop eting</p>
                    <button
                        onClick={handlePrint}
                        className="w-full bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30
                            text-blue-400 rounded-xl py-2.5 text-xs font-semibold
                            transition-all flex items-center justify-center gap-2"
                    >
                        <Printer size={13} /> Chop Etish
                    </button>
                </div>

                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-3">
                        <Download size={20} className="text-emerald-400" />
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-1">JSON Eksport</h3>
                    <p className="text-slate-500 text-xs mb-4 leading-relaxed">Barcha ma'lumotlaringizni saqlang</p>
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
                        <h3 className="text-red-400 font-semibold">Xavfli Zona</h3>
                        <p className="text-slate-500 text-sm mt-1 leading-relaxed">
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
                        Akkauntni O'chirish
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
                                className="w-full bg-slate-900/60 border border-red-800/60 rounded-xl
                                    px-4 py-3 text-white placeholder-slate-600 text-sm
                                    focus:border-red-500 outline-none transition-all"
                            />
                            <button onClick={() => setShowDelPass(p => !p)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                                {showDelPass ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => { setConfirmDelete(false); setDelPassword(''); }}
                                className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 py-2.5 rounded-xl text-sm font-medium transition-all"
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
\n"""

content = profile_tab_pattern.sub(profile_tab_new, content)

# 3. Delete MalumotlarTab
content = re.sub(
    r"// ─── TAB 5 — MA'LUMOTLAR ──────────────────────────────────────────────────────\nfunction MalumotlarTab.*?// ─── MAIN PAGE",
    "// ─── MAIN PAGE",
    content,
    flags=re.DOTALL
)

# 4. Update renderContent to pass showToast to ProfileTab
content = content.replace("case 'profile': return <ProfileTab />;", "case 'profile': return <ProfileTab showToast={showToast} />;")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done successfully.")
