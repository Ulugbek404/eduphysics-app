import json
import os

locales_dir = r"c:\Users\pc\Desktop\BMI_FIZIKA\Ulugbek-Fizika\src\locales"
files = {
    'uz.json': {
        "locked": "Ochilmagan",
        "common_lesson": "Dars",
        "common_minutes": "daqiqa",
        "common_tests": "test",
        "common_score": "Ball",
        "quiz_finished": "Test Yakunlandi!",
        "quiz_result": "Sizning natijangiz:",
        "quiz_retry": "Qayta ishlash",
        "quiz_question": "Savol",
        "quiz_explanation": "Izoh:",
        "quiz_next": "Keyingi savol",
        "quiz_see_results": "Natijani ko'rish",
        "quiz_check": "Tekshirish",
        "common_lab": "lab",
        "common_progress": "Progress",
        "chapter_start": "Boshlash",
        "chapter_review": "Qayta ko'rish",
        "chapter_continue": "Davom etish"
    },
    'ru.json': {
        "locked": "Заблокировано",
        "common_lesson": "Урок",
        "common_minutes": "минут",
        "common_tests": "тест",
        "common_score": "Балл",
        "quiz_finished": "Тест завершен!",
        "quiz_result": "Ваш результат:",
        "quiz_retry": "Повторить",
        "quiz_question": "Вопрос",
        "quiz_explanation": "Объяснение:",
        "quiz_next": "Следующий вопрос",
        "quiz_see_results": "Посмотреть результаты",
        "quiz_check": "Проверить",
        "common_lab": "лаб",
        "common_progress": "Прогресс",
        "chapter_start": "Начать",
        "chapter_review": "Повторить",
        "chapter_continue": "Продолжить"
    },
    'en.json': {
        "locked": "Locked",
        "common_lesson": "Lesson",
        "common_minutes": "minutes",
        "common_tests": "tests",
        "common_score": "Score",
        "quiz_finished": "Quiz Finished!",
        "quiz_result": "Your result:",
        "quiz_retry": "Retry",
        "quiz_question": "Question",
        "quiz_explanation": "Explanation:",
        "quiz_next": "Next question",
        "quiz_see_results": "See results",
        "quiz_check": "Check",
        "common_lab": "lab",
        "common_progress": "Progress",
        "chapter_start": "Start",
        "chapter_review": "Review",
        "chapter_continue": "Continue"
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

print("Supporting components translation files updated successfully.")
