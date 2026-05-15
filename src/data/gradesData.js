
import { Book, CheckCircle, Lock, Play, Pause, RotateCcw } from 'lucide-react';
import { molekulyarLessons } from './molekulyarFizikaData';
import { termodinamikaLessons } from './termodinamikaData';
import { issiqlikDvigatellariLessons } from './issiqlikDvigatellariData';
import { suyuqlikVaQattiqJismLessons } from './suyuqlikVaQattiqJismData';
// GRADES DATA
export const grades = [
  {
    id: 'grade-7',
    number: 7,
    name: '7-sinf fizika',
    description: 'Fizikaga kirish',
    total_hours: 68,
    is_active: false,
    icon: '📘',
    color: 'from-slate-700 to-slate-600'
  },
  {
    id: 'grade-8',
    number: 8,
    name: '8-sinf fizika',
    description: 'Issiqlik va elektr',
    total_hours: 68,
    is_active: false,
    icon: '📙',
    color: 'from-slate-700 to-slate-600'
  },
  {
    id: 'grade-9',
    number: 9,
    name: '9-sinf fizika',
    description: 'MODDA TUZILISHINING MOLEKULYAR-KINETIK NAZARIYASI ASOSLARI, TERMODINAMIKA ELEMENTLARI, ISSIQLIK DVIGATELLARI, SUYUQLIK VA QATTIQ JISMLARNING XOSSALARI, OPTIKA',
    total_hours: 70,
    is_active: true, // ONLY THIS ONE IS ACTIVE
    icon: '📗',
    color: 'from-indigo-600 to-purple-600'
  },
  {
    id: 'grade-10',
    number: 10,
    name: '10-sinf fizika',
    description: 'Tez kunda',
    total_hours: 102,
    is_active: false,
    icon: '📕',
    color: 'from-slate-700 to-slate-600'
  },
  {
    id: 'grade-11',
    number: 11,
    name: '11-sinf fizika',
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
    id: '9-ch-02',
    grade_id: 'grade-9',
    name: 'Modda tuzilishining molekulyar-kinetik nazariyasi asoslari',
    description: 'Moddalarning molekulyar tuzilishi va issiqlik hodisalari',
    order_number: 1,
    icon: '🌡️',
    lessons: [],
    total_tests: 25,
    total_labs: 4,
    estimated_hours: 18,
    color: 'orange',
    recommended: true
  },
  {
    id: '9-ch-01',
    grade_id: 'grade-9',
    name: 'Ichki energiya va termodinamika elementlari',
    description: 'Jismlarning harakati, kuchlar, impuls va energiya',
    order_number: 2,
    icon: '📖',
    lessons: [], // Will be filled below
    total_tests: 35,
    total_labs: 5,
    estimated_hours: 28,
    color: 'blue'
  },
  {
    id: '9-ch-03',
    grade_id: 'grade-9',
    name: 'Issiqlik dvigatellari',
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
    name: 'Suyuqlik va qattiq jismlarning xossalari',
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

// Add termodinamika lessons to chapter 2
chapters[1].lessons = termodinamikaLessons;
chapters[1].total_tests = 55;
chapters[1].total_labs = 2;
chapters[1].estimated_hours = 6;
// Add full Molekulyar fizika lessons (14 dars)
chapters[0].lessons = molekulyarLessons;
chapters[0].total_tests = 83;
chapters[0].total_labs = 4;
chapters[0].estimated_hours = 30;
// Add dummy lessons for other chapters
chapters[2].lessons = issiqlikDvigatellariLessons;
chapters[2].total_tests = 35;
chapters[2].total_labs = 0;
chapters[2].estimated_hours = 3;
chapters[3].lessons = suyuqlikVaQattiqJismLessons;
chapters[3].total_tests = 75;
chapters[3].total_labs = 2;
chapters[3].estimated_hours = 8;


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
