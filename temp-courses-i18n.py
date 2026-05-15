import json
import os

locales_dir = r"c:\Users\pc\Desktop\BMI_FIZIKA\Ulugbek-Fizika\src\locales"
files = {
    'uz.json': {
        "courses_select_grade": "Sinfingizni tanlang",
        "courses_grade_desc": "Hozirda 9-sinf to'liq ishga tushirilgan. Qolgan sinflar tez orada qo'shiladi. 🚀",
        "courses_continue": "Davom ettirish",
        "courses_back_to_last": "Oxirgi darsga qaytish",
        "courses_no_last_lesson": "Hali birorta dars ochmadingiz. Boshlang! 👆",
        "courses_daily_quest": "Kunlik Topshiriq",
        "courses_quest_done": "✅ Topshiriq bajarildi!",
        "courses_quest_left": "Yana {n} ta qoldi",
        "courses_your_level": "Sizning Darajangiz",
        "courses_level_title": "Level {level}: {title}",
        "courses_xp_collected": "{xp} XP to'plandi",
        "courses_next_level": "Keyingi levelgacha",
        "courses_view_progress": "Progressni ko'rish",
        "courses_coming_soon": "TEZ KUNDA",
        "courses_active": "Faol",
        "courses_hours": "{n} soat"
    },
    'ru.json': {
        "courses_select_grade": "Выберите ваш класс",
        "courses_grade_desc": "В настоящее время полностью запущен 9-й класс. Остальные классы будут добавлены в ближайшее время. 🚀",
        "courses_continue": "Продолжить",
        "courses_back_to_last": "Вернуться к последнему уроку",
        "courses_no_last_lesson": "Вы еще не открыли ни одного урока. Начните сейчас! 👆",
        "courses_daily_quest": "Ежедневное задание",
        "courses_quest_done": "✅ Задание выполнено!",
        "courses_quest_left": "Осталось {n}",
        "courses_your_level": "Ваш уровень",
        "courses_level_title": "Уровень {level}: {title}",
        "courses_xp_collected": "Собрано {xp} XP",
        "courses_next_level": "До следующего уровня",
        "courses_view_progress": "Посмотреть прогресс",
        "courses_coming_soon": "СКОРО",
        "courses_active": "Активен",
        "courses_hours": "{n} часов"
    },
    'en.json': {
        "courses_select_grade": "Select your grade",
        "courses_grade_desc": "Currently, 9th grade is fully launched. Other grades will be added soon. 🚀",
        "courses_continue": "Continue",
        "courses_back_to_last": "Back to the last lesson",
        "courses_no_last_lesson": "You haven't opened any lesson yet. Start now! 👆",
        "courses_daily_quest": "Daily Quest",
        "courses_quest_done": "✅ Quest completed!",
        "courses_quest_left": "{n} left",
        "courses_your_level": "Your Level",
        "courses_level_title": "Level {level}: {title}",
        "courses_xp_collected": "{xp} XP collected",
        "courses_next_level": "To next level",
        "courses_view_progress": "View progress",
        "courses_coming_soon": "COMING SOON",
        "courses_active": "Active",
        "courses_hours": "{n} hours"
    }
}

for filename, content in files.items():
    filepath = os.path.join(locales_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Add new translations
    for k, v in content.items():
        data[k] = v
        
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("Translation files updated successfully.")
