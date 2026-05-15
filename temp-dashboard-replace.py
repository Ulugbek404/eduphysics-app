import json
import re
import os

app_dir = r"c:\Users\pc\Desktop\BMI_FIZIKA\Ulugbek-Fizika\src"

keys = {
    # Home
    'dash_greeting_morning': {'en': 'Good morning', 'ru': 'Доброе утро', 'uz': 'Xayrli tong'},
    'dash_greeting_day': {'en': 'Good afternoon', 'ru': 'Добрый день', 'uz': 'Xayrli kun'},
    'dash_greeting_evening': {'en': 'Good evening', 'ru': 'Добрый вечер', 'uz': 'Xayrli kech'},
    'dash_lessons_done_1': {'en': 'Today you have finished', 'ru': 'Сегодня вы завершили', 'uz': 'Bugun'},
    'dash_lessons_done_2': {'en': 'lessons - great job!', 'ru': 'уроков - отличная работа!', 'uz': 'ta dars tugatdingiz - ajoyib ish!'},
    
    'dash_assess_title': {'en': '🎯 Determine Your Knowledge Level!', 'ru': '🎯 Определите Уровень Знаний!', 'uz': '🎯 Bilim Darajangizni Aniqlang!'},
    'dash_assess_desc': {'en': "We evaluate your physics knowledge through 15 questions and prepare a suitable study plan.", 'ru': "Мы оцениваем ваши знания физики с помощью 15 вопросов и составляем подходящий учебный план.", 'uz': "15 ta savol orqali fizika bo'yicha bilimingizni baholaymiz va sizga mos o'quv rejasini tayyorlaymiz."},
    'dash_assess_f1': {'en': '15 questions - all topics', 'ru': '15 вопросов - все темы', 'uz': '15 ta savol - barcha mavzulardan'},
    'dash_assess_f2': {'en': '~10 minutes - no time limit', 'ru': '~10 минут - без ограничения времени', 'uz': '~10 daqiqa - vaqt cheklanmagan'},
    'dash_assess_f3': {'en': 'Personal study plan', 'ru': 'Индивидуальный план обучения', 'uz': "Shaxsiy o'quv rejasi"},
    'dash_assess_f4': {'en': 'AI recommendations', 'ru': 'Рекомендации ИИ', 'uz': 'AI tavsiyalar'},
    'dash_assess_start': {'en': 'Start Test', 'ru': 'Начать Тест', 'uz': 'Testni Boshlash'},
    'dash_assess_later': {'en': 'Later', 'ru': 'Позже', 'uz': 'Keyinroq'},
    
    'dash_today_stats': {'en': "Today's Statistics", 'ru': "Статистика за Сегодня", 'uz': "Bugungi Statistika"},
    'dash_added_today': {'en': "Added today", 'ru': 'Добавлено сегодня', 'uz': "Bugun qo'shildi"},
    'dash_completed': {'en': 'Completed', 'ru': 'Завершено', 'uz': 'Tugatilgan'},
    'dash_lessons_label': {'en': 'lessons', 'ru': 'уроков', 'uz': 'dars'},
    'dash_study_time': {'en': 'Study time', 'ru': 'Время обучения', 'uz': "O'qish vaqti"},
    'dash_today_label': {'en': 'today', 'ru': 'сегодня', 'uz': 'bugun'},
    'dash_streak': {'en': 'Streak', 'ru': 'Серия', 'uz': 'Seriya'},
    'dash_consec_days': {'en': 'consecutive', 'ru': 'подряд', 'uz': 'ketma-ket'},
    
    'dash_quick_actions': {'en': 'Quick Actions', 'ru': 'Быстрые Действия', 'uz': 'Tezkor Harakatlar'},
    'dash_qa_lessons_desc': {'en': 'Learn physics topics', 'ru': 'Изучайте темы по физике', 'uz': "Fizika mavzularini o'rgan"},
    'dash_qa_lib_desc': {'en': 'Additional materials', 'ru': 'Дополнительные материалы', 'uz': "Qo'shimcha materiallar"},
    'dash_qa_lab_desc': {'en': 'Conduct virtual experiments', 'ru': 'Проводите виртуальные эксперименты', 'uz': "Virtual tajribalar o'tkazing"},
    'dash_qa_test_desc': {'en': 'Realtime competition', 'ru': 'Соревнование в реальном времени', 'uz': "Realtime musobaqa"},
    'dash_qa_missions_desc': {'en': 'Complete daily tasks', 'ru': 'Выполняйте ежедневные задания', 'uz': "Kunlik vazifalarni bajaring"},
    'dash_qa_ai_desc': {'en': 'Get answers to your questions', 'ru': 'Получайте ответы на вопросы', 'uz': "Savollaringizga javob oling"},
    
    'dash_recent_activity': {'en': 'Recent Activity', 'ru': 'Последняя Активность', 'uz': "So'nggi Faoliyat"},
    'dash_next_step': {'en': 'Next Step', 'ru': 'Следующий Шаг', 'uz': 'Keyingi Qadam'},
    'dash_ai_recs': {'en': 'AI Recommendations', 'ru': 'Рекомендации ИИ', 'uz': 'AI Shaxsiy Tavsiyalar'},
    'dash_start_btn': {'en': 'Start', 'ru': 'Начать', 'uz': 'Boshlash'},
    
    # Virtual Lab
    'dash_lab_title': {'en': 'Virtual Laboratory', 'ru': 'Виртуальная Лаборатория', 'uz': 'Virtual Laboratoriya'},
    'dash_lab_ohm_title': {'en': "Electric Current (Ohm's Law)", 'ru': 'Электрический Ток (Закон Ома)', 'uz': "Elektr Toki (Om Qonuni)"},
    'dash_lab_ohm_desc': {'en': 'Learn the relationship between current, voltage, and resistance.', 'ru': 'Изучите связь между силой тока, напряжением и сопротивлением.', 'uz': "Tok kuchi, kuchlanish va qarshilik orasidagi bog'liqlikni o'rganing."},
    'dash_lab_start': {'en': 'Start Experiment', 'ru': 'Начать Эксперимент', 'uz': 'Tajribani boshlash'},
    'dash_lab_newton_title': {'en': "Mechanics (Newton's Laws)", 'ru': 'Механика (Законы Ньютона)', 'uz': "Mexanika (Nyuton Qonuni)"},
    'dash_lab_newton_desc': {'en': 'Force, mass, and acceleration. Learn the laws of motion interactively.', 'ru': 'Сила, масса и ускорение. Интерактивное изучение законов движения.', 'uz': "Kuch, massa va tezlanish. Harakat qonunlarini interaktiv o'rganing."},
    'dash_lab_optics_title': {'en': 'Optics', 'ru': 'Оптика', 'uz': 'Optika'},
    'dash_lab_optics_desc': {'en': 'Light, lenses, and mirrors. Coming soon...', 'ru': 'Свет, линзы и зеркала. Скоро...', 'uz': "Yorug'lik, linzalar va ko'zgular. Tez kunda..."},
    'dash_lab_all': {'en': 'All Experiments', 'ru': 'Все Эксперименты', 'uz': 'Barcha tajribalar'},
    
    # Dashboard profile variables
    'dash_profile_subtitle': {'en': '9th Grade Student | Future Engineer', 'ru': 'Ученик 9 класса | Будущий Инженер', 'uz': "9-sinf O'quvchisi | Bo'lajak Muhandis"},
    'dash_profile_tot_xp': {'en': 'Total XP points', 'ru': 'Всего баллов XP', 'uz': 'Umumiy XP ballar'},
    'dash_profile_progress': {'en': 'Course progress', 'ru': 'Прогресс курса', 'uz': 'Kurs progressi'},
    'dash_profile_labs_done': {'en': 'Completed labs', 'ru': 'Выполненные лаб. работы', 'uz': 'Bajarilgan lablar'},
    'dash_profile_achievs_done': {'en': 'Unlocked achievements', 'ru': 'Открытые достижения', 'uz': 'Ochilgan yutuqlar'},
    'dash_profile_my_achievs': {'en': 'My Achievements', 'ru': 'Мои Достижения', 'uz': 'Yutuqlarim'},
    'dash_profile_stats': {'en': 'Statistics', 'ru': 'Статистика', 'uz': 'Statistika'},
    'dash_profile_time_spent': {'en': 'Time spent reading', 'ru': 'Время чтения', 'uz': "O'qilgan vaqt"},
    'dash_profile_tests_solved': {'en': 'Tests solved', 'ru': 'Решено тестов', 'uz': 'Yechilgan testlar'},
    'dash_profile_avg_score': {'en': 'Average score', 'ru': 'Средний балл', 'uz': "O'rtacha baho"},
    'dash_profile_default_user': {'en': 'User', 'ru': 'Пользователь', 'uz': 'Foydalanuvchi'},

    # Lessons
    'dash_lessons_back': {'en': 'Back to Topics', 'ru': 'Назад к Темам', 'uz': 'Mavzularga qaytish'},
    'dash_lessons_done': {'en': 'Done', 'ru': 'Выполнено', 'uz': 'Bajarildi'},
    'dash_lessons_finish': {'en': 'Finish Topic', 'ru': 'Завершить Тему', 'uz': 'Mavzuni Yakunlash'},
    'dash_lessons_mastered': {'en': 'Have you mastered the topic?', 'ru': 'Вы освоили тему?', 'uz': "Mavzuni o'zlashtirdingizmi?"},
    
    # Quiz
    'dash_quiz_ai_builder': {'en': 'AI Test Builder', 'ru': 'ИИ Конструктор Тестов', 'uz': 'AI Test Tuzuvchi'},
    'dash_quiz_ai_desc': {'en': 'Test your knowledge on any topic using Artificial Intelligence.', 'ru': 'Проверьте свои знания по любой теме с помощью Искусственного Интеллекта.', 'uz': "Sun'iy intellekt yordamida o'zingiz istagan mavzuda bilimingizni sinang."},
    'dash_quiz_input_label': {'en': 'Enter (or select) a topic', 'ru': 'Введите (или выберите) тему', 'uz': 'Mavzuni kiriting (yoki tanlang)'},
    'dash_quiz_input_placeholder': {'en': 'Example: Optics, Atomic Physics, Magnets...', 'ru': 'Например: Оптика, Атомная физика, Магниты...', 'uz': 'Masalan: Optika, Atom fizikasi, Magnit...'},
    'dash_quiz_ai_generating': {'en': 'AI is generating questions...', 'ru': 'ИИ генерирует вопросы...', 'uz': 'AI savollar tuzmoqda...'},
    'dash_quiz_result_label': {'en': 'Result:', 'ru': 'Результат:', 'uz': 'Natija:'},
    'dash_quiz_result_desc': {'en': "You answered {score} out of {total} questions correctly.", 'ru': "Вы правильно ответили на {score} из {total} вопросов.", 'uz': "Siz {total} ta savoldan {score} tasiga to'g'ri javob berdingiz."},
    'dash_quiz_xp_points': {'en': 'XP Points', 'ru': 'Очки XP', 'uz': 'XP Points'},
    'dash_quiz_correct_ans': {'en': 'Correct Answers', 'ru': 'Правильных ответов', 'uz': "To'g'ri Javob"},
    'dash_quiz_retry': {'en': 'Take Another Test', 'ru': 'Пройти Другой Тест', 'uz': 'Boshqa Test Yechish'},
    'dash_quiz_stop': {'en': 'Stop Test', 'ru': 'Остановить Тест', 'uz': "Testni to'xtatish"},
    'dash_quiz_topic': {'en': 'Topic:', 'ru': 'Тема:', 'uz': 'Mavzu:'},
    'dash_quiz_general': {'en': 'General Physics', 'ru': 'Общая Физика', 'uz': 'Umumiy Fizika'},
    
    # AI Error & Actions
    'dash_ai_tutor': {'en': 'AI Physics Tutor', 'ru': 'ИИ Учитель Физики', 'uz': 'AI Fizik Ustoz'},
    'dash_ai_placeholder': {'en': 'Ask a question...', 'ru': 'Задайте вопрос...', 'uz': 'Savol bering...'},
    'dash_video_loading': {'en': 'Video lesson loading soon', 'ru': 'Урок-видео скоро загрузится', 'uz': 'Video dars tez orada yuklanadi'},
    'dash_video_desc': {'en': 'A special video lesson is being prepared for this topic.', 'ru': 'Для этой темы готовится специальный видеоурок.', 'uz': "Ushbu mavzu bo'yicha maxsus video dars tayyorlanmoqda. Tez orada bu yerda tomosha qilishingiz mumkin bo'ladi."},
}

# 1. Update JSON files
for lang in ['en', 'ru', 'uz']:
    filepath = os.path.join(app_dir, 'locales', f'{lang}.json')
    if os.path.exists(filepath):
        # Allow keeping existing keys
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        for k, v in keys.items():
            if k not in data:
                data[k] = v[lang]
                
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

print("JSON files updated.")

# 2. Update DashboardPage.jsx
db_path = os.path.join(app_dir, 'pages', 'DashboardPage.jsx')
with open(db_path, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    ('>Xayrli tong<', '>{t("dash_greeting_morning") || "Xayrli tong"}<'),
    ('>Xayrli kun<', '>{t("dash_greeting_day") || "Xayrli kun"}<'),
    ('>Xayrli kech<', '>{t("dash_greeting_evening") || "Xayrli kech"}<'),
    ('Bugun {todayLessons} ta dars tugatdingiz - ajoyib ish!', '{t("dash_lessons_done_1") || "Bugun"} {todayLessons} {t("dash_lessons_done_2") || "ta dars tugatdingiz - ajoyib ish!"}'),
    
    # Assess Test Banner
    ('🎯 Bilim Darajangizni Aniqlang!', '{t("dash_assess_title") || "🎯 Bilim Darajangizni Aniqlang!"}'),
    ("15 ta savol orqali fizika bo'yicha bilimingizni baholaymiz va sizga mos o'quv rejasini tayyorlaymiz.", "{t('dash_assess_desc') || \"15 ta savol orqali fizika bo'yicha bilimingizni baholaymiz va sizga mos o'quv rejasini tayyorlaymiz.\"}"),
    ('15 ta savol - barcha mavzulardan', '{t("dash_assess_f1") || "15 ta savol - barcha mavzulardan"}'),
    ('~10 daqiqa - vaqt cheklanmagan', '{t("dash_assess_f2") || "~10 daqiqa - vaqt cheklanmagan"}'),
    ("Shaxsiy o'quv rejasi", "{t('dash_assess_f3') || \"Shaxsiy o'quv rejasi\"}"),
    ('AI tavsiyalar', '{t("dash_assess_f4") || "AI tavsiyalar"}'),
    ('>Testni Boshlash<', '>{t("dash_assess_start") || "Testni Boshlash"}<'),
    ('>Keyinroq<', '>{t("dash_assess_later") || "Keyinroq"}<'),
    
    # Stats
    ('>Bugungi Statistika<', '>{t("dash_today_stats") || "Bugungi Statistika"}<'),
    ('label="Bugun qo\'shildi"', 'label={t("dash_added_today") || "Bugun qo\'shildi"}'),
    ('label="Tugatilgan"', 'label={t("dash_completed") || "Tugatilgan"}'),
    ('subtitle="dars"', 'subtitle={t("dash_lessons_label") || "dars"}'),
    ('label="O\'qish vaqti"', 'label={t("dash_study_time") || "O\'qish vaqti"}'),
    ('subtitle="bugun"', 'subtitle={t("dash_today_label") || "bugun"}'),
    ('label="Seriya"', 'label={t("dash_streak") || "Seriya"}'),
    ('subtitle="ketma-ket"', 'subtitle={t("dash_consec_days") || "ketma-ket"}'),
    
    # Quick Actions
    ('>Tezkor Harakatlar<', '>{t("dash_quick_actions") || "Tezkor Harakatlar"}<'),
    ('title="Darsliklar"', 'title={t("nav_lessons") || "Darsliklar"}'),
    ("description=\"Fizika mavzularini o'rgan\"", "description={t('dash_qa_lessons_desc') || \"Fizika mavzularini o'rgan\"}"),
    ('title="Kutubxona"', 'title={t("nav_library") || "Kutubxona"}'),
    ('description="Qo\'shimcha materiallar"', 'description={t("dash_qa_lib_desc") || "Qo\'shimcha materiallar"}'),
    ('title="Laboratoriya"', 'title={t("nav_lab") || "Laboratoriya"}'),
    ("description=\"Virtual tajribalar o'tkazing\"", "description={t('dash_qa_lab_desc') || \"Virtual tajribalar o'tkazing\"}"),
    ('title="Live Test"', 'title={t("nav_livetest") || "Live Test"}'),
    ('description="Realtime musobaqa"', 'description={t("dash_qa_test_desc") || "Realtime musobaqa"}'),
    ('title="Missiyalar"', 'title={t("nav_missions") || "Missiyalar"}'),
    ('description="Kunlik vazifalarni bajaring"', 'description={t("dash_qa_missions_desc") || "Kunlik vazifalarni bajaring"}'),
    ('title="AI Ustoz"', 'title={t("dash_ai_tutor") || "AI Ustoz"}'),
    ('description="Savollaringizga javob oling"', 'description={t("dash_qa_ai_desc") || "Savollaringizga javob oling"}'),
    
    # Recent
    (">So'nggi Faoliyat<", ">{t('dash_recent_activity') || \"So'nggi Faoliyat\"}<"),
    ('>Keyingi Qadam<', '>{t("dash_next_step") || "Keyingi Qadam"}<'),
    ('>AI Shaxsiy Tavsiyalar<', '>{t("dash_ai_recs") || "AI Shaxsiy Tavsiyalar"}<'),
    ('>Boshlash <', '>{t("dash_start_btn") || "Boshlash"} <'),
    
    # Virtual Lab
    ('>Virtual Laboratoriya<', '>{t("dash_lab_title") || "Virtual Laboratoriya"}<'),
    ('>Elektr Toki (Om Qonuni)<', '>{t("dash_lab_ohm_title") || "Elektr Toki (Om Qonuni)"}<'),
    (">Tok kuchi, kuchlanish va qarshilik orasidagi bog'liqlikni o'rganing.<", ">{t('dash_lab_ohm_desc') || \"Tok kuchi, kuchlanish va qarshilik orasidagi bog'liqlikni o'rganing.\"}<"),
    ('>Tajribani boshlash <', '>{t("dash_lab_start") || "Tajribani boshlash"} <'),
    (">Mexanika (Nyuton Qonuni)<", ">{t('dash_lab_newton_title') || \"Mexanika (Nyuton Qonuni)\"}<"),
    (">Kuch, massa va tezlanish. Harakat qonunlarini interaktiv o'rganing.<", ">{t('dash_lab_newton_desc') || \"Kuch, massa va tezlanish. Harakat qonunlarini interaktiv o'rganing.\"}<"),
    (">Optika<", ">{t('dash_lab_optics_title') || \"Optika\"}<"),
    (">Yorug'lik, linzalar va ko'zgular. Tez kunda...<", ">{t('dash_lab_optics_desc') || \"Yorug'lik, linzalar va ko'zgular. Tez kunda...\"}<"),
    ('>Barcha tajribalar<', '>{t("dash_lab_all") || "Barcha tajribalar"}<'),
    
    # Profile
    (">9-sinf O'quvchisi | Bo'lajak Muhandis<", ">{t('dash_profile_subtitle') || \"9-sinf O'quvchisi | Bo'lajak Muhandis\"}<"),
    ('>Umumiy XP ballar<', '>{t("dash_profile_tot_xp") || "Umumiy XP ballar"}<'),
    ('>Kurs progressi<', '>{t("dash_profile_progress") || "Kurs progressi"}<'),
    ('>Bajarilgan lablar<', '>{t("dash_profile_labs_done") || "Bajarilgan lablar"}<'),
    ('>Ochilgan yutuqlar<', '>{t("dash_profile_achievs_done") || "Ochilgan yutuqlar"}<'),
    ('> Yutuqlarim<', '>{t("dash_profile_my_achievs") || " Yutuqlarim"}<'),
    ('>Statistika<', '>{t("dash_profile_stats") || "Statistika"}<'),
    ('label="O\'qilgan vaqt"', 'label={t("dash_profile_time_spent") || "O\'qilgan vaqt"}'),
    ('label="Yechilgan testlar"', 'label={t("dash_profile_tests_solved") || "Yechilgan testlar"}'),
    ('label="O\'rtacha baho"', 'label={t("dash_profile_avg_score") || "O\'rtacha baho"}'),
    
    # Lessons
    ('>← Mavzularga qaytish<', '>{t("dash_lessons_back") || "← Mavzularga qaytish"}<'),
    (">Mavzuni o'zlashtirdingizmi?<", ">{t('dash_lessons_mastered') || \"Mavzuni o'zlashtirdingizmi?\"}<"),
    ('>Bajarildi<', '>{t("dash_lessons_done") || "Bajarildi"}<'),
    ('>Mavzuni Yakunlash<', '>{t("dash_lessons_finish") || "Mavzuni Yakunlash"}<'),
    
    # Quiz
    ('>AI Test Tuzuvchi<', '>{t("dash_quiz_ai_builder") || "AI Test Tuzuvchi"}<'),
    (">Sun'iy intellekt yordamida o'zingiz istagan mavzuda bilimingizni sinang.<", ">{t('dash_quiz_ai_desc') || \"Sun'iy intellekt yordamida o'zingiz istagan mavzuda bilimingizni sinang.\"}<"),
    ('>Mavzuni kiriting (yoki tanlang)<', '>{t("dash_quiz_input_label") || "Mavzuni kiriting (yoki tanlang)"}<'),
    ('placeholder="Masalan: Optika, Atom fizikasi, Magnit..."', 'placeholder={t("dash_quiz_input_placeholder") || "Masalan: Optika, Atom fizikasi, Magnit..."}'),
    ('>AI savollar tuzmoqda...<', '>{t("dash_quiz_ai_generating") || "AI savollar tuzmoqda..."}<'),
    ('Siz {questions.length} ta savoldan {score} tasiga to\'g\'ri javob berdingiz.', '{t("dash_quiz_result_desc")?.replace("{total}", questions.length).replace("{score}", score) || `Siz ${questions.length} ta savoldan ${score} tasiga to\'g\'ri javob berdingiz.`}'),
    ('>XP Points<', '>{t("dash_quiz_xp_points") || "XP Points"}<'),
    (">To'g'ri Javob<", ">{t('dash_quiz_correct_ans') || \"To'g'ri Javob\"}<"),
    ('>Boshqa Test Yechish<', '>{t("dash_quiz_retry") || "Boshqa Test Yechish"}<'),
    ('>Testni to\'xtatish<', '>{t("dash_quiz_stop") || "Testni to\'xtatish"}<'),
    ('>Mavzu: <', '>{t("dash_quiz_topic") || "Mavzu: "}<'),
    ('"Umumiy Fizika"', 't("dash_quiz_general") || "Umumiy Fizika"'),
    
    # Video / AI
    ('>AI Fizik Ustoz<', '>{t("dash_ai_tutor") || "AI Fizik Ustoz"}<'),
    ('placeholder="Savol bering..."', 'placeholder={t("dash_ai_placeholder") || "Savol bering..."}'),
    ('>Video dars tez orada yuklanadi<', '>{t("dash_video_loading") || "Video dars tez orada yuklanadi"}<'),
    (">Ushbu mavzu bo'yicha maxsus video dars tayyorlanmoqda. Tez orada bu yerda tomosha qilishingiz mumkin bo'ladi.<", ">{t('dash_video_desc') || \"Ushbu mavzu bo'yicha maxsus video dars tayyorlanmoqda. Tez orada bu yerda tomosha qilishingiz mumkin bo'ladi.\"}<"),
]

for old, new_val in replacements:
    if old not in content:
        print(f"NOT FOUND: {old}")
    content = content.replace(old, new_val)

# Handle dynamic bits:
content = content.replace(
    'Natija: {percentage}%', 
    '{t("dash_quiz_result_label") || "Natija:"} {percentage}%'
)

content = content.replace(
    "displayUser?.displayName || 'Foydalanuvchi'",
    "displayUser?.displayName || (t('dash_profile_default_user') || 'Foydalanuvchi')"
)

with open(db_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("DashboardPage.jsx updated successfully!")
