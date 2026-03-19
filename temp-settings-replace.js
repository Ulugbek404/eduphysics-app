const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'SettingsPage.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Auth imports
content = content.replace(
`    deleteUser
} from 'firebase/auth';`,
`    deleteUser,
    updateProfile
} from 'firebase/auth';`
);

// 2. getTabs
content = content.replace(
`const getTabs = (t) => [
    {
        id: 'xavfsizlik',
        label: 'Xavfsizlik',
        desc: 'Parol va himoya',
        icon: Shield,
        iconBg: 'bg-red-500/20',
        iconColor: 'text-red-400',
    },
    {
        id: 'korinish',
        label: "Ko'rinish",
        desc: 'Tema va ranglar',
        icon: Palette,
        iconBg: 'bg-indigo-500/20',
        iconColor: 'text-indigo-400',
    },
    {
        id: 'bildirishnoma',
        label: 'Bildirishnomalar',
        desc: 'Eslatmalar sozlash',
        icon: Bell,
        iconBg: 'bg-yellow-500/20',
        iconColor: 'text-yellow-400',
    },
    {
        id: 'til',
        label: 'Til',
        desc: "O'zbek / Rus / Eng",
        icon: Globe,
        iconBg: 'bg-emerald-500/20',
        iconColor: 'text-emerald-400',
    },
    {
        id: 'malumotlar',
        label: "Ma'lumotlar",
        desc: 'Eksport va o\\'chirish',
        icon: Database,
        iconBg: 'bg-violet-500/20',
        iconColor: 'text-violet-400',
    },
];`,
`const getTabs = (t) => [
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
];`
);

// 3. renderContent
content = content.replace(
`    const renderContent = () => {
        switch (activeTab) {
            case 'xavfsizlik': return <XavfsizlikTab showToast={showToast} />;
            case 'korinish': return <KorinishTab />;
            case 'bildirishnoma': return <BildirishnomaTab showToast={showToast} />;
            case 'til': return <TilTab showToast={showToast} />;
            case 'malumotlar': return <MalumotlarTab showToast={showToast} />;
            default: return null;
        }
    };`,
`    const renderContent = () => {
        switch (activeTab) {
            case 'profile': return <ProfileTab />;
            case 'appearance': return <KorinishTab />;
            case 'notifications': return <BildirishnomaTab showToast={showToast} />;
            case 'language': return <TilTab showToast={showToast} />;
            case 'security': return <XavfsizlikTab showToast={showToast} />;
            default: return null;
        }
    };`
);

// 4. activeTab state
content = content.replace(
`const [activeTab, setActiveTab] = useState('xavfsizlik');`,
`const [activeTab, setActiveTab] = useState('profile');`
);

// 5. Replace ProfileTab entirely
const newProfileTab = \`const ProfileTab = () => {
    const { user, userData } = useAuth();
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
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
            await updateDoc(doc(db, "users", user.uid), {
                displayName: form.displayName,
                phone: form.phone,
                school: form.school,
                region: form.region,
                grade: form.grade,
                bio: form.bio,
                updatedAt: serverTimestamp(),
            });

            try {
                 await updateDoc(doc(db, "leaderboard", "global", "users", user.uid), {
                     displayName: form.displayName,
                     region: form.region,
                     school: form.school,
                 });
            } catch(e) {}

            if (form.region) {
                try {
                     await updateDoc(doc(db, "leaderboard", form.region, "users", user.uid), {
                         displayName: form.displayName,
                         region: form.region,
                         school: form.school,
                     });
                } catch(e) {}
            }

            if(auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: form.displayName
                });
            }

            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6 max-w-lg mb-20 animate-fadeIn">
            <div>
                <h2 className="text-white font-bold text-xl mb-1">
                    Shaxsiy Ma'lumotlar
                </h2>
                <p className="text-slate-400 text-sm">
                    Ma'lumotlaringiz leaderboard va missiyalarda ishlatiladi.
                </p>
            </div>

            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-indigo-600 border border-indigo-400/30 shadow-lg shadow-indigo-500/20
                        flex items-center justify-center text-2xl
                        font-bold text-white">
                    {form.displayName?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                    <p className="text-white font-medium text-lg">{form.displayName || "Ism yo'q"}</p>
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
                            value={form.displayName}
                            onChange={e => setForm({ ...form, displayName: e.target.value })}
                            placeholder="Ismingiz va familiyangiz"
                            className="w-full bg-slate-800/80 border border-slate-700
                       rounded-xl px-4 py-3 text-white text-sm
                       focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30
                       transition-all"
                        />
                    </div>
                    <div>
                        <label className="text-slate-300 text-sm font-medium mb-1.5 block">
                            Telefon raqam
                        </label>
                        <input
                            value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                            placeholder="+998 90 123 45 67"
                            className="w-full bg-slate-800/80 border border-slate-700
                       rounded-xl px-4 py-3 text-white text-sm
                       focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30
                       transition-all"
                        />
                    </div>
                    <div>
                        <label className="text-slate-300 text-sm font-medium mb-1.5 block">
                            Maktab
                        </label>
                        <input
                            value={form.school}
                            onChange={e => setForm({ ...form, school: e.target.value })}
                            placeholder="Masalan: 45-maktab"
                            className="w-full bg-slate-800/80 border border-slate-700
                       rounded-xl px-4 py-3 text-white text-sm
                       focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30
                       transition-all"
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
                            value={form.region}
                            onChange={e => setForm({ ...form, region: e.target.value })}
                            className="w-full bg-slate-800/80 border border-slate-700
                       rounded-xl px-4 py-3 text-white text-sm
                       focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30
                       transition-all cursor-pointer">
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
                            value={form.grade}
                            onChange={e => setForm({ ...form, grade: e.target.value })}
                            className="w-full bg-slate-800/80 border border-slate-700
                       rounded-xl px-4 py-3 text-white text-sm
                       focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30
                       transition-all cursor-pointer">
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
                        value={form.bio}
                        onChange={e => setForm({ ...form, bio: e.target.value })}
                        placeholder="Qisqacha o'zingiz haqingizda (qiziqishlaringiz, maqsadlaringiz)..."
                        rows={3}
                        className="w-full bg-slate-800/80 border border-slate-700
                       rounded-xl px-4 py-3 text-white text-sm
                       focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30
                       transition-all resize-none"
                    />
                </div>
            </div>
            <button
                onClick={handleSave}
                disabled={saving || !form.displayName || !form.region}
                className={\`w-full py-3.5 mt-4 rounded-xl font-semibold text-sm
                    shadow-lg transition-all flex items-center justify-center gap-2
                    \${saved
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/25'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25'
                    } disabled:opacity-50 disabled:cursor-not-allowed\`}
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
    );
};`;

const profileStartStr = \`// ─── TAB 1 — PROFIL (MA'LUMOTLAR) ────────────────────────────────────────────────
const ProfileTab = () => {\`;
const profileEndStr = \`// ─── TAB 2 — XAVFSIZLIK VA EKSPORT\`;

const startIdx = content.indexOf(profileStartStr);
const endIdx = content.indexOf(profileEndStr);

if (startIdx !== -1 && endIdx !== -1) {
    const originalProfileTab = content.substring(startIdx + profileStartStr.length + 1, endIdx);
    // Find the end of the ProfileTab component logic properly but actually we can just replace everything between the comments:
    content = content.substring(0, startIdx) +
              "// ─── TAB 1 — PROFIL (MA'LUMOTLAR) ────────────────────────────────────────────────\\n" +
              newProfileTab + "\\n\\n" +
              content.substring(endIdx);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('SettingsPage replaced successfully');
