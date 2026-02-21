
import { Book, CheckCircle, Lock, Play, Pause, RotateCcw } from 'lucide-react';
import { molekulyarLessons } from './molekulyarFizikaData';

// GRADES DATA
export const grades = [
  {
    id: 'grade-7',
    number: 7,
    name: '7-sinf Fizika',
    description: 'Fizikaga kirish',
    total_hours: 68,
    is_active: false,
    icon: '📘',
    color: 'from-slate-700 to-slate-600'
  },
  {
    id: 'grade-8',
    number: 8,
    name: '8-sinf Fizika',
    description: 'Issiqlik va elektr',
    total_hours: 68,
    is_active: false,
    icon: '📙',
    color: 'from-slate-700 to-slate-600'
  },
  {
    id: 'grade-9',
    number: 9,
    name: '9-sinf Fizika',
    description: 'Mexanika, termodinamika, elektr',
    total_hours: 70,
    is_active: true, // ONLY THIS ONE IS ACTIVE
    icon: '📗',
    color: 'from-indigo-600 to-purple-600'
  },
  {
    id: 'grade-10',
    number: 10,
    name: '10-sinf Fizika',
    description: 'Tez kunda',
    total_hours: 102,
    is_active: false,
    icon: '📕',
    color: 'from-slate-700 to-slate-600'
  },
  {
    id: 'grade-11',
    number: 11,
    name: '11-sinf Fizika',
    description: 'Tez kunda',
    total_hours: 136,
    is_active: false,
    icon: '📔',
    color: 'from-slate-700 to-slate-600'
  }
];

// 9-SINF CHAPTERS
export const chapters = [
  {
    id: '9-ch-01',
    grade_id: 'grade-9',
    name: 'Mexanika',
    description: 'Jismlarning harakati, kuchlar, impuls va energiya',
    order_number: 1,
    icon: '📖',
    lessons: [], // Will be filled below
    total_tests: 35,
    total_labs: 5,
    estimated_hours: 28,
    color: 'blue'
  },
  {
    id: '9-ch-02',
    grade_id: 'grade-9',
    name: 'Molekulyar fizika',
    description: 'Moddalarning molekulyar tuzilishi va issiqlik hodisalari',
    order_number: 2,
    icon: '🌡️',
    lessons: [],
    total_tests: 25,
    total_labs: 4,
    estimated_hours: 18,
    color: 'orange'
  },
  {
    id: '9-ch-03',
    grade_id: 'grade-9',
    name: 'Elektr va magnetizm',
    description: 'Elektr zaryadi, elektr toki, magnit maydoni',
    order_number: 3,
    icon: '⚡',
    lessons: [],
    total_tests: 30,
    total_labs: 6,
    estimated_hours: 20,
    color: 'yellow'
  },
  {
    id: '9-ch-04',
    grade_id: 'grade-9',
    name: 'Tebranishlar',
    description: 'Mexanik tebranishlar, to\'lqinlar va tovush',
    order_number: 4,
    icon: '🌊',
    lessons: [],
    total_tests: 20,
    total_labs: 3,
    estimated_hours: 14,
    color: 'cyan'
  }
];

// MEXANIKA LESSONS (9-ch-01)
const mechanicsLessons = [
  {
    id: '9-l-01',
    chapter_id: '9-ch-01',
    title: 'Mexanik harakat tushunchasi',
    description: 'Harakat nima? Sanoq sistemasi. Moddiy nuqta.',
    order_number: 1,
    duration_minutes: 12,
    video_url: null,
    has_lab: false,
    test_count: 5,
    difficulty: 'easy',
    content: {
      theory: `Mexanik harakat deb vaqt o‘tishi bilan jism vaziyatining boshqa jismlarga nisbatan o‘zgarishiga aytiladi.
        
Tabiatda mutlaq tinch turgan jism yo‘q. Hamma jismlar harakatda bo‘ladi. Masalan, Yer Quyosh atrofida, uyimiz Yer bilan birga aylanadi.
        
Sanoq sistemasi:
1. Sanoq jismi
2. Koordinatalar sistemasi
3. Vaqtni o‘lchash asbobi (soat)
        
Moddiy nuqta deb berilgan sharoitda o‘lchamlarini hisobga olmasa bo‘ladigan jismga aytiladi.`,
      formulas: [
        { name: 'Tezlik', text: 'v = s / t' }
      ]
    }
  },
  {
    id: '9-l-02',
    chapter_id: '9-ch-01',
    title: 'Yo\'l va ko\'chish',
    description: 'Yo\'l va ko\'chish o\'rtasidagi farq. Traektoriya.',
    order_number: 2,
    duration_minutes: 10,
    video_url: null,
    has_lab: false,
    test_count: 5,
    difficulty: 'easy',
    content: {
      theory: 'Traektoriya - jism harakat davomida chizgan chizig‘i. Yo‘l - traektoriya uzunligi (skalyar). Ko‘chish - boshlang‘ich va oxirgi nuqtani tutashtiruvchi yo‘nalishli kesma (vektor).',
    }
  },
  {
    id: '9-l-03',
    chapter_id: '9-ch-01',
    title: 'Tezlik',
    description: 'Tezlik tushunchasi. O\'rtacha va oniy tezlik.',
    order_number: 3,
    duration_minutes: 15,
    video_url: null,
    has_lab: false,
    test_count: 8,
    difficulty: 'easy'
  },
  {
    id: '9-l-04',
    chapter_id: '9-ch-01',
    title: 'O\'rtacha tezlik',
    description: 'O\'rtacha tezlik formulasi va misollar',
    order_number: 4,
    duration_minutes: 12,
    video_url: null,
    has_lab: false,
    test_count: 6,
    difficulty: 'easy'
  },
  {
    id: '9-l-05',
    chapter_id: '9-ch-01',
    title: 'Tezlanish tushunchasi',
    description: 'Tezlanish - tezlikning o\'zgarish tezligi',
    order_number: 5,
    duration_minutes: 18,
    video_url: null,
    has_lab: false,
    test_count: 10,
    difficulty: 'medium'
  },
  {
    id: '9-l-06',
    chapter_id: '9-ch-01',
    title: 'Bir xilda tezlanuvchan harakat',
    description: 'Tezlanuvchan harakatning formulalari',
    order_number: 6,
    duration_minutes: 20,
    video_url: null,
    has_lab: false,
    test_count: 12,
    difficulty: 'medium'
  }
];


// Add lessons to chapters
chapters[0].lessons = mechanicsLessons;
// Add full Molekulyar fizika lessons (14 dars)
chapters[1].lessons = molekulyarLessons;
chapters[1].total_tests = 83;
chapters[1].total_labs = 4;
chapters[1].estimated_hours = 30;
// Add dummy lessons for other chapters
chapters[2].lessons = [
  { id: '9-l-40', chapter_id: '9-ch-03', title: 'Elektr zaryadi', description: 'Zaryad tushunchasi', order_number: 1, duration_minutes: 15, test_count: 5, difficulty: 'easy', has_lab: false }
];
chapters[3].lessons = [
  { id: '9-l-50', chapter_id: '9-ch-04', title: 'Tebranishlar', description: 'Mexanik tebranish', order_number: 1, duration_minutes: 12, test_count: 4, difficulty: 'easy', has_lab: false }
];


// HELPER FUNCTIONS
export const getGrade = (id) => grades.find(g => g.id === id);
export const getChapter = (id) => chapters.find(c => c.id === id);
export const getLesson = (id) => {
  for (const ch of chapters) {
    const lesson = ch.lessons?.find(l => l.id === id);
    if (lesson) return lesson;
  }
  return null;
};
export const calculateChapterProgress = (chapterId, completedLessons = []) => {
  const chapter = chapters.find(c => c.id === chapterId);
  if (!chapter || !chapter.lessons.length) return 0;

  // Check how many lessons from this chapter are in completedLessons array
  const completedCount = chapter.lessons.filter(l => completedLessons.includes(l.id)).length;
  return Math.round((completedCount / chapter.lessons.length) * 100);
};
