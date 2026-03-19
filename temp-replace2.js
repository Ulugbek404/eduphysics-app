const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src/pages/SettingsPage.jsx');
let content = fs.readFileSync(file, 'utf8');

// 1. imports
content = content.replace(
`    deleteUser
} from 'firebase/auth';`,
`    deleteUser,
    updateProfile
} from 'firebase/auth';`
);

// 2. getTabs
content = content.replace(
/const getTabs = \(t\) => \[[\s\S]*?\];/,
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

// 3. activeTab state
content = content.replace(
    /const \[activeTab, setActiveTab\] = useState\('xavfsizlik'\);/g,
    `const [activeTab, setActiveTab] = useState('profile');`
);

// 4. renderContent
content = content.replace(
    /const renderContent = \(\) => \{[\s\S]*?default: return null;\r?\n        \}\r?\n    \};/,
    `const renderContent = () => {
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

fs.writeFileSync(file, content);
console.log('SettingsPage updated successfully.');
