const fs = require('fs');

try {
    // 1. Fix ChaptersPage.jsx
    let chContent = fs.readFileSync('src/pages/ChaptersPage.jsx', 'utf8');
    chContent = chContent.replace(/\\\{\\\\\\"O'zbekiston Davlat Ta'lim Standarti asosida\\\\\\"\\\}/g, "{\"O'zbekiston Davlat Ta'lim Standarti asosida\"}");
    chContent = chContent.replace(/\\\{\\\\\\"Bo'limlar\\\\\\"\\\}/g, "{\"Bo'limlar\"}");
    chContent = chContent.replace(/t\\('chapters_uz_standard'\\) \\|\\| \\\\\\"/g, "t('chapters_uz_standard') || \"");
    fs.writeFileSync('src/pages/ChaptersPage.jsx', chContent);

    // 2. Fix LessonPage.jsx
    let lpContent = fs.readFileSync('src/pages/LessonPage.jsx', 'utf8');
    lpContent = lpContent.replace(
        /if \(!grade \|\| !chapter \|\| !lesson\) return <div className="p-8 text-center">Dars topilmadi<\/div>;/,
        "if (!grade || !chapter || !lesson) return <div className=\"p-8 text-center\">{t('error_lesson_not_found') || 'Dars topilmadi'}</div>;"
    );
    lpContent = lpContent.replace(
        /const tabs = \[\s*\{\s*id: 'dars', label: 'Dars', icon: PlayCircle\s*\},\s*\{\s*id: 'video', label: 'Video', icon: Youtube\s*\},\s*\{\s*id: 'formulalar', label: 'Formulalar', icon: Calculator\s*\},\s*\{\s*id: 'misollar', label: 'Misollar', icon: FileText\s*\},\s*\{\s*id: 'testlar', label: 'Testlar', icon: CheckSquare\s*\},\s*\{\s*id: 'ai-ustoz', label: 'AI Ustoz', icon: MessageSquare\s*\},\s*\];/g,
        `const tabs = [
        { id: 'dars', label: t('tabs_lesson') || 'Dars', icon: PlayCircle },
        { id: 'video', label: t('tabs_video') || 'Video', icon: Youtube },
        { id: 'formulalar', label: t('tabs_formulas') || 'Formulalar', icon: Calculator },
        { id: 'misollar', label: t('tabs_examples') || 'Misollar', icon: FileText },
        { id: 'testlar', label: t('tabs_tests') || 'Testlar', icon: CheckSquare },
        { id: 'ai-ustoz', label: t('tabs_ai_tutor') || 'AI Ustoz', icon: MessageSquare },
    ];`
    );
    lpContent = lpContent.replace(
        /<h3 className="text-blue-400 font-bold m-0">Dars maqsadi:<\/h3>/,
        '<h3 className="text-blue-400 font-bold m-0">{t(\'lesson_goal\') || \'Dars maqsadi:\'}</h3>'
    );
    lpContent = lpContent.replace(
        /<h3 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">🎯 Asosiy tushunchalar:<\/h3>/,
        '<h3 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">{t(\'lesson_key_concepts\') || \'🎯 Asosiy tushunchalar:\'}</h3>'
    );
    lpContent = lpContent.replace(
        /<p>Video va matnli dars kontenti<\/p>/,
        '<p>{t(\'lesson_video_text_content\') || \'Video va matnli dars kontenti\'}</p>'
    );
    lpContent = lpContent.replace(
        /<h3 className="text-purple-400 font-bold mb-3 flex items-center gap-2"><Calculator size=\{18\} \/> Asosiy formulalar:<\/h3>/,
        '<h3 className="text-purple-400 font-bold mb-3 flex items-center gap-2"><Calculator size={18} /> {t(\'lesson_main_formulas\') || \'Asosiy formulalar:\'}</h3>'
    );
    lpContent = lpContent.replace(
        /<span className="text-emerald-400 font-bold text-lg">Mavzu tugatilgan!<\/span>/,
        '<span className="text-emerald-400 font-bold text-lg">{t(\'lesson_completed_title\') || \'Mavzu tugatilgan!\'}</span>'
    );
    lpContent = lpContent.replace(
        /<span>Mavzuni tugatish<\/span>/,
        '<span>{t(\'lesson_finish_btn\') || \'Mavzuni tugatish\'}</span>'
    );
    lpContent = lpContent.replace(
        /📺 YouTube orqali ko'ring — to'liq ekran uchun ▶ tugmasini bosing/,
        `{t('lesson_watch_youtube') || "📺 YouTube orqali ko'ring — to'liq ekran uchun ▶ tugmasini bosing"}`
    );
    lpContent = lpContent.replace(
        /<h4 className="text-xl font-bold text-slate-300 mb-2">Video darslik tez orada yuklanadi<\/h4>/,
        '<h4 className="text-xl font-bold text-slate-300 mb-2">{t(\'lesson_video_soon\') || \'Video darslik tez orada yuklanadi\'}</h4>'
    );
    lpContent = lpContent.replace(
        /<p className="text-slate-500 max-w-md">Bu mavzu uchun video darslik tayyorlanmoqda\. Iltimos, boshqa bo'limlardan foydalaning\.<\/p>/,
        '<p className="text-slate-500 max-w-md">{t(\'lesson_video_desc_soon\') || "Bu mavzu uchun video darslik tayyorlanmoqda. Iltimos, boshqa bo\'limlardan foydalaning."}</p>'
    );
    lpContent = lpContent.replace(
        /<h3 className="text-xl font-bold flex items-center gap-2">\s*<Calculator size=\{22\} className="text-purple-400" \/> Formulalar\s*<\/h3>/g,
        '<h3 className="text-xl font-bold flex items-center gap-2">\n                                <Calculator size={22} className="text-purple-400" /> {t(\'tabs_formulas\') || \'Formulalar\'}\n                            </h3>'
    );
    lpContent = lpContent.replace(
        /<p>Bu darsda formulalar yo'q<\/p>/,
        '<p>{t(\'lesson_no_formulas\') || "Bu darsda formulalar yo\'q"}</p>'
    );
    lpContent = lpContent.replace(
        /<p className="text-slate-400 text-sm">Masala #\{i \+ 1\}<\/p>/g,
        '<p className="text-slate-400 text-sm">{t(\'lesson_problem_num\') || \'Masala #\'}{i + 1}</p>'
    );
    lpContent = lpContent.replace(
        /\{ex.difficulty === 'easy' \? '⭐ Oson' : ex.difficulty === 'medium' \? '⭐⭐ O\\'rta' : '⭐⭐⭐ Qiyin'\}/g,
        "{ex.difficulty === 'easy' ? (t('difficulty_easy') || '⭐ Oson') : ex.difficulty === 'medium' ? (t('difficulty_medium') || '⭐⭐ O\\'rta') : (t('difficulty_hard') || '⭐⭐⭐ Qiyin')}"
    );
    lpContent = lpContent.replace(
        /<p className="text-blue-400 text-sm font-bold mb-2">📋 Berilgan:<\/p>/g,
        '<p className="text-blue-400 text-sm font-bold mb-2">{t(\'lesson_given\') || \'📋 Berilgan:\'}</p>'
    );
    lpContent = lpContent.replace(
        /<p className="text-yellow-400 font-bold mb-3">📝 Yechish:<\/p>/g,
        '<p className="text-yellow-400 font-bold mb-3">{t(\'lesson_solution\') || \'📝 Yechish:\'}</p>'
    );
    lpContent = lpContent.replace(
        /<span className="text-emerald-400 font-bold">✅ Javob: <\/span>/g,
        '<span className="text-emerald-400 font-bold">{t(\'lesson_answer\') || \'✅ Javob: \'}</span>'
    );
    lpContent = lpContent.replace(
        /<p>Bu darsda misollar hali qo'shilmagan<\/p>/g,
        "<p>{t('lesson_no_examples') || \"Bu darsda misollar hali qo'shilmagan\"}</p>"
    );
    lpContent = lpContent.replace(
        /<h3 className="text-xl font-bold flex items-center gap-2">\s*<BookOpen size=\{22\} className="text-green-400" \/> Misollar va masalalar\s*<\/h3>/g,
        '<h3 className="text-xl font-bold flex items-center gap-2">\n                                <BookOpen size={22} className="text-green-400" /> {t(\'lesson_examples_problems\') || \'Misollar va masalalar\'}\n                            </h3>'
    );

    fs.writeFileSync('src/pages/LessonPage.jsx', lpContent);

    // 3. Fix KutubxonaPage.jsx
    let kpContent = fs.readFileSync('src/pages/KutubxonaPage.jsx', 'utf8');
    kpContent = kpContent.replace(
        /const CATEGORIES = \[\s*\{ id: 'all', label: 'Barchasi', icon: <BookOpen size=\{15\} \/> \},\s*\{ id: 'darsliklar', label: 'Darsliklar', icon: <BookMarked size=\{15\} \/> \},\s*\{ id: 'qollanmalar', label: "Qo'llanmalar", icon: <FileText size=\{15\} \/> \},\s*\{ id: 'video', label: 'Video Resurslar', icon: <Video size=\{15\} \/> \},\s*\{ id: 'tashqi', label: 'Tashqi Manbalar', icon: <Globe size=\{15\} \/> \},\s*\];/g,
        `const getCategories = (t) => [
    { id: 'all', label: t('kutubxona_all') || 'Barchasi', icon: <BookOpen size={15} /> },
    { id: 'darsliklar', label: t('kutubxona_books') || 'Darsliklar', icon: <BookMarked size={15} /> },
    { id: 'qollanmalar', label: t('kutubxona_guides') || "Qo'llanmalar", icon: <FileText size={15} /> },
    { id: 'video', label: t('kutubxona_video') || 'Video Resurslar', icon: <Video size={15} /> },
    { id: 'tashqi', label: t('kutubxona_external') || 'Tashqi Manbalar', icon: <Globe size={15} /> },
];`
    );
    kpContent = kpContent.replace(/CATEGORIES\.map\(/g, 'getCategories(useLanguage().t).map(');
    kpContent = kpContent.replace(/<span className="font-medium text-sm">Ortga qaytish<\/span>/g, '<span className="font-medium text-sm">{useLanguage().t(\'nav_back\') || \'Ortga qaytish\'}</span>');
    kpContent = kpContent.replace(
        /<p className="text-slate-400 text-base">\s*Barcha o'quv materiallari bir joyda —\{' '\}\s*<span className="text-indigo-400 font-semibold">\{libraryData\.length\} ta resurs<\/span>\s*<\/p>/g,
        `<p className="text-slate-400 text-base">
                                {useLanguage().t('kutubxona_desc_1') || "Barcha o'quv materiallari bir joyda —"}{' '}
                                <span className="text-indigo-400 font-semibold">{libraryData.length} {useLanguage().t('kutubxona_resource_count') || 'ta resurs'}</span>
                            </p>`
    );
    kpContent = kpContent.replace(
        /placeholder="Resurs nomi yoki mavzu..."/g,
        'placeholder={useLanguage().t(\'kutubxona_search_placeholder\') || "Resurs nomi yoki mavzu..."}'
    );
    kpContent = kpContent.replace(
        /\{filtered\.length\} ta resurs topildi/g,
        "{filtered.length} {useLanguage().t('kutubxona_found_count') || 'ta resurs topildi'}"
    );
    kpContent = kpContent.replace(
        /bo'yicha"\}/g,
        "bo'yicha\"}"
    );
    kpContent = kpContent.replace(
        /<X size=\{12\} \/> Filterni tozalash/g,
        "<X size={12} /> {useLanguage().t('kutubxona_clear_filter') || 'Filterni tozalash'}"
    );
    kpContent = kpContent.replace(
        /<h3 className="text-xl font-bold text-slate-400 mb-2">Hech narsa topilmadi<\/h3>/g,
        '<h3 className="text-xl font-bold text-slate-400 mb-2">{useLanguage().t(\'error_not_found\') || \'Hech narsa topilmadi\'}</h3>'
    );
    kpContent = kpContent.replace(
        /<p className="text-slate-600 text-sm mb-6">Boshqa kalit so'z yoki kategoriya tanlang<\/p>/g,
        '<p className="text-slate-600 text-sm mb-6">{useLanguage().t(\'kutubxona_empty_desc\') || "Boshqa kalit so\'z yoki kategoriya tanlang"}</p>'
    );
    kpContent = kpContent.replace(
        /<ChevronRight size=\{16\} \/> Barchasini ko'rish/g,
        "<ChevronRight size={16} /> {useLanguage().t('kutubxona_see_all') || \"Barchasini ko'rish\"}"
    );
    fs.writeFileSync('src/pages/KutubxonaPage.jsx', kpContent);

    // 4. Fix LaboratoriyaPage.jsx
    let labContent = fs.readFileSync('src/pages/LaboratoriyaPage.jsx', 'utf8');
    labContent = labContent.replace(
        /<span className="font-medium text-sm">Ortga qaytish<\/span>/g,
        "<span className=\"font-medium text-sm\">{useLanguage().t('nav_back') || 'Ortga qaytish'}</span>"
    );
    labContent = labContent.replace(
        /Virtual Laboratoriya/g,
        "{useLanguage().t('nav_lab') || 'Virtual Laboratoriya'}"
    );
    labContent = labContent.replace(
        /<p className="text-slate-400">\s*Fizika qonunlarini interaktiv simulyatsiyalar orqali o'rganing\s*<\/p>/g,
        "<p className=\"text-slate-400\">{useLanguage().t('lab_desc') || \"Fizika qonunlarini interaktiv simulyatsiyalar orqali o'rganing\"}</p>"
    );
    labContent = labContent.replace(
        /<span className="text-slate-500 text-\[9px\]">tajriba<\/span>/g,
        "<span className=\"text-slate-500 text-[9px]\">{useLanguage().t('lab_experiments') || 'tajriba'}</span>"
    );
    labContent = labContent.replace(
        /<p className="text-slate-500 text-\[10px\] uppercase tracking-wide\">Jami<\/p>/g,
        "<p className=\"text-slate-500 text-[10px] uppercase tracking-wide\">{useLanguage().t('common_total') || 'Jami'}</p>"
    );
    labContent = labContent.replace(
        /<p className="text-slate-500 text-\[10px\] uppercase tracking-wide\">Yig'ilgan<\/p>/g,
        "<p className=\"text-slate-500 text-[10px] uppercase tracking-wide\">{useLanguage().t('common_collected') || \"Yig'ilgan\"}</p>"
    );
    fs.writeFileSync('src/pages/LaboratoriyaPage.jsx', labContent);

    // 5. Fix MissionsPage.jsx
    let mContent = fs.readFileSync('src/pages/MissionsPage.jsx', 'utf8');
    mContent = mContent.replace(
        /<span className="font-medium text-sm">Ortga qaytish<\/span>/g,
        "<span className=\"font-medium text-sm\">{useLanguage().t('nav_back') || 'Ortga qaytish'}</span>"
    );
    mContent = mContent.replace(
        /<p className="text-slate-400 text-xs">Umumiy XP<\/p>/g,
        "<p className=\"text-slate-400 text-xs\">{useLanguage().t('missions_total_xp') || 'Umumiy XP'}</p>"
    );
    mContent = mContent.replace(
        /kunlik<\/span>/g,
        "{useLanguage().t('missions_daily') || 'kunlik'}</span>"
    );
    mContent = mContent.replace(
        /haftalik<\/span>/g,
        "{useLanguage().t('missions_weekly') || 'haftalik'}</span>"
    );
    mContent = mContent.replace(
        /yutuq<\/span>/g,
        "{useLanguage().t('missions_achivements') || 'yutuq'}</span>"
    );
    mContent = mContent.replace(
        /Daraja \{level\}/g,
        "{useLanguage().t('missions_level') || 'Daraja'} {level}"
    );
    mContent = mContent.replace(
        /Keyingi darajaga:/g,
        "{useLanguage().t('missions_next_level') || 'Keyingi darajaga:'}"
    );
    mContent = mContent.replace(
        /✓ Bajarildi!/g,
        "{useLanguage().t('missions_done') || '✓ Bajarildi!'}"
    );
    fs.writeFileSync('src/pages/MissionsPage.jsx', mContent);

    console.log('Script 2 Done');
} catch (error) {
    console.error(error);
}
