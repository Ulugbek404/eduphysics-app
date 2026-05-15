import json
import os

files = {
    'uz.json': {
        'settings_mode_lang': 'Rejim va Til',
        'settings_mode_lang_sub': 'Interfeys va til sozlamalari'
    },
    'ru.json': {
        'settings_mode_lang': 'Режимы и Язык',
        'settings_mode_lang_sub': 'Настройки интерфейса и языка'
    },
    'en.json': {
        'settings_mode_lang': 'Mode & Language',
        'settings_mode_lang_sub': 'Interface and language settings'
    }
}

base_path = r"c:\Users\pc\Desktop\BMI_FIZIKA\Ulugbek-Fizika\src\locales"

for filename, new_keys in files.items():
    filepath = os.path.join(base_path, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Merge new keys
    for k, v in new_keys.items():
        data[k] = v
        
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("Locales updated!")
