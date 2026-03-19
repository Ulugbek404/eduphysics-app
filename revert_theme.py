import os

files = [
    r"c:\Users\pc\Desktop\BMI_FIZIKA\Ulugbek-Fizika\src\pages\DashboardPage.jsx",
    r"c:\Users\pc\Desktop\BMI_FIZIKA\Ulugbek-Fizika\src\pages\SettingsPage.jsx",
    r"c:\Users\pc\Desktop\BMI_FIZIKA\Ulugbek-Fizika\src\pages\LandingPage.jsx",
    r"c:\Users\pc\Desktop\BMI_FIZIKA\Ulugbek-Fizika\src\components\LoginPage.jsx"
]

for filepath in files:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        content = content.replace('bg-theme-bg', 'bg-slate-900')
        content = content.replace('bg-theme-surface', 'bg-slate-800')
        content = content.replace('border-theme-border', 'border-slate-700')
        content = content.replace('text-theme-muted', 'text-slate-400')
        content = content.replace('text-theme-text', 'text-white')
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Reverted: {filepath}")
    else:
        print(f"File not found: {filepath}")
