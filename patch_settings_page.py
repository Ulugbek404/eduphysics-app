import re

file_path = r"c:\Users\pc\Desktop\BMI_FIZIKA\Ulugbek-Fizika\src\pages\SettingsPage.jsx"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update getTabs
tabs_orig = """// ─── Tabs config ──────────────────────────────────────────────────────────────
const getTabs = (t) => [
    {
        id: 'profile',
        label: t('settings_profile'),
        desc: t('settings_profile_sub'),
        icon: User,
        iconBg: 'bg-indigo-500/20',
        iconColor: 'text-indigo-400',
    },
    {
        id: 'appearance',
        label: t('settings_appearance'),
        desc: t('settings_appearance_sub'),
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
        id: 'language',
        label: t('settings_language'),
        desc: t('settings_language_sub'),
        icon: Globe,
        iconBg: 'bg-emerald-500/20',
        iconColor: 'text-emerald-400',
    },
    {
        id: 'security',
        label: t('settings_security'),
        desc: t('settings_security_sub'),
        icon: Shield,
        iconBg: 'bg-red-500/20',
        iconColor: 'text-red-400',
    },
];"""

tabs_new = """// ─── Tabs config ──────────────────────────────────────────────────────────────
const getTabs = (t) => [
    {
        id: 'profile',
        label: t('settings_profile'),
        desc: t('settings_profile_sub'),
        icon: User,
        iconBg: 'bg-indigo-500/20',
        iconColor: 'text-indigo-400',
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
];"""

content = content.replace(tabs_orig, tabs_new)


# 2. Update KorinishTab to RejimVaTilTab
korinish_start = content.find("// ─── TAB 2 — KO'RINISH")
bildirishnoma_start = content.find("// ─── TAB 3 — BILDIRISHNOMALAR")

if korinish_start != -1 and bildirishnoma_start != -1:
    korinish_tab_orig = content[korinish_start:bildirishnoma_start]
    
    rejim_va_til_new = """// ─── TAB 2 — REJIM VA TIL ────────────────────────────────────────────────────────
function RejimVaTilTab({ showToast }) {
    const { t, language: lang, setLanguage: setLang } = useLanguage();
    const { theme } = useTheme();

    const themes = [
        {
            id: 'dark', label: 'Dark', emoji: '🌙',
            desc: t('settings_theme_dark_desc'),
            available: true,
            preview: { bg: '#020617', surface: '#0f172a', accent: '#6366f1' }
        },
        {
            id: 'light', label: 'White', emoji: '☀️',
            desc: t('settings_theme_light_desc'),
            available: false,
            preview: { bg: '#f8fafc', surface: '#ffffff', accent: '#4f46e5' }
        },
        {
            id: 'black', label: 'Black', emoji: '🌑',
            desc: t('settings_theme_black_desc'),
            available: false,
            preview: { bg: '#000000', surface: '#141414', accent: '#818cf8' }
        },
    ];

    const langs = [
        { id: 'uz', flag: '🇺🇿', label: t('lang_uz'), desc: t('lang_uz_sub'), code: 'UZ' },
        { id: 'ru', flag: '🇷🇺', label: t('lang_ru'), desc: t('lang_ru_sub'), code: 'RU' },
        { id: 'en', flag: '🇬🇧', label: t('lang_en'), desc: t('lang_en_sub'), code: 'EN' },
    ];

    const handleSelectLang = (id) => {
        if (setLang) setLang(id);
        if (showToast) showToast(t('settings_lang_changed'), 'success');
    };

    return (
        <div className="space-y-8 animate-fadeIn mb-20">
            {/* Tema - Rejimlar */}
            <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">{t('settings_theme_title')}</p>
                <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-3">
                    {themes.map(thm => (
                        <div key={thm.id} className={`
                            relative p-4 rounded-2xl border-2 cursor-pointer
                            transition-all duration-300 hover:scale-[1.03] text-left
                            ${theme === thm.id && thm.available
                                ? 'border-indigo-500 shadow-lg shadow-indigo-500/20'
                                : thm.available
                                    ? 'border-slate-700 hover:border-slate-700'
                                    : 'border-slate-700 opacity-50 cursor-not-allowed'
                            } bg-slate-800
                        `}>
                            {/* Mini preview */}
                            <div className="w-full h-20 rounded-xl mb-3 overflow-hidden"
                                style={{ background: thm.preview.bg }}>
                                <div className="flex h-full">
                                    <div className="w-8 h-full" style={{ background: thm.preview.surface }} />
                                    <div className="flex-1 p-2 flex flex-col gap-1.5">
                                        <div className="h-2 rounded-full w-3/4"
                                            style={{ background: thm.preview.accent, opacity: 0.8 }} />
                                        <div className="h-1.5 rounded-full w-1/2"
                                            style={{ background: thm.preview.surface }} />
                                        <div className="h-1.5 rounded-full w-2/3"
                                            style={{ background: thm.preview.surface }} />
                                    </div>
                                </div>
                            </div>
                            {/* Label */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white font-semibold text-sm">{thm.emoji} {thm.label}</p>
                                    <p className="text-slate-400 text-xs mt-0.5">{thm.desc}</p>
                                </div>
                                {theme === thm.id && thm.available && (
                                    <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Check size={11} className="text-white" />
                                    </div>
                                )}
                            </div>
                            {/* Coming soon */}
                            {!thm.available && (
                                <span className="absolute top-2 right-2 text-[9px] font-semibold bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">
                                    {t('settings_coming_soon')}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Til */}
            <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">{t('settings_language')}</p>
                <div className="space-y-3">
                    {langs.map(l => (
                        <button
                            key={l.id}
                            onClick={() => handleSelectLang(l.id)}
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
            </div>
        </div>
    );
}

"""
    content = content.replace(korinish_tab_orig, rejim_va_til_new)

# 3. Remove TilTab
til_start = content.find("// ─── TAB 4 — TIL")
main_page_start = content.find("// ─── MAIN PAGE")

if til_start != -1 and main_page_start != -1:
    til_tab_orig = content[til_start:main_page_start]
    content = content.replace(til_tab_orig, "")

# 4. Update renderContent
render_content_orig = """    const renderContent = () => {
        switch (activeTab) {
            case 'profile': return <ProfileTab showToast={showToast} />;
            case 'appearance': return <KorinishTab />;
            case 'notifications': return <BildirishnomaTab showToast={showToast} />;
            case 'language': return <TilTab showToast={showToast} />;
            case 'security': return <XavfsizlikTab showToast={showToast} />;
            default: return <ProfileTab showToast={showToast} />;
        }
    };"""

render_content_new = """    const renderContent = () => {
        switch (activeTab) {
            case 'profile': return <ProfileTab showToast={showToast} />;
            case 'appearance': return <RejimVaTilTab showToast={showToast} />;
            case 'notifications': return <BildirishnomaTab showToast={showToast} />;
            case 'security': return <XavfsizlikTab showToast={showToast} />;
            default: return <ProfileTab showToast={showToast} />;
        }
    };"""

content = content.replace(render_content_orig, render_content_new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("SettingsPage.jsx updated!")
