const fs = require('fs');
const file = 'c:\\\\Users\\\\pc\\\\Desktop\\\\BMI_FIZIKA\\\\Ulugbek-Fizika\\\\src\\\\pages\\\\SettingsPage.jsx';
let code = fs.readFileSync(file, 'utf8');

// Replace getTabs
code = code.replace(/const getTabs = \(t\) => \[[\s\S]*?\];/, `const getTabs = (t) => [
    { id: 'profile', label: "Ma'lumotlar", desc: "Shaxsiy ma'lumotlar", icon: User, iconBg: 'bg-indigo-500/20', iconColor: 'text-indigo-400' },
    { id: 'appearance', label: "Ko'rinish", desc: 'Tema va ranglar', icon: Palette, iconBg: 'bg-violet-500/20', iconColor: 'text-violet-400' },
    { id: 'notifications', label: 'Bildirishnomalar', desc: 'Eslatmalar sozlash', icon: Bell, iconBg: 'bg-yellow-500/20', iconColor: 'text-yellow-400' },
    { id: 'language', label: 'Til', desc: "O'zbek / Rus / Eng", icon: Globe, iconBg: 'bg-emerald-500/20', iconColor: 'text-emerald-400' },
    { id: 'security', label: 'Xavfsizlik', desc: "Parol, ma'lumot va himoya", icon: Shield, iconBg: 'bg-red-500/20', iconColor: 'text-red-400' },
];`);

// Replace switch cases
code = code.replace("case 'xavfsizlik': return <XavfsizlikTab showToast={showToast} />;", "case 'profile': return <ProfileTab showToast={showToast} />;");
code = code.replace("case 'malumotlar': return <MalumotlarTab showToast={showToast} />;", "case 'security': return <XavfsizlikTab showToast={showToast} />;");

// Replace activeTab default
code = code.replace("useState('xavfsizlik');", "useState('profile');");

// Rename MalumotlarTab
code = code.replace(/function MalumotlarTab\(\{ showToast \}\) \{/g, "function ExportAndDangerZone({ showToast }) {");

// Inject ExportAndDangerZone into XavfsizlikTab
const bellBlock = `<Bell size={16} />}
                Saqlash
            </button>
        </div>
    );
}`;
const lockBlock = `<Lock size={16} />}
                Saqlash
            </button>

            <div className="mt-8">
                <ExportAndDangerZone showToast={showToast} />
            </div>
        </div>
    );
}`;
if (code.includes(bellBlock)) {
    code = code.replace(bellBlock, lockBlock);
} else {
    // try removing carriage returns
    const cleanCode = code.replace(/\r\n/g, '\n');
    if (cleanCode.includes(bellBlock)) {
        code = cleanCode.replace(bellBlock, lockBlock);
    } else {
        console.log("Could not find bellBlock");
    }
}

fs.writeFileSync(file, code);
console.log("Done");
