
import { useState, useEffect } from 'react';
import { getChapter, getLesson } from '../data/gradesData';

const EMPTY_ARRAY = [];

export function useLessons(chapterId, completedLessons = EMPTY_ARRAY) {
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        if (chapterId) {
            const chapter = getChapter(chapterId);
            if (chapter && chapter.lessons) {
                // Add status logic (locked, completed, current)
                const lessonsWithStatus = chapter.lessons.map((lesson, index) => {
                    const isCompleted = completedLessons.includes(lesson.id);
                    // Determine if locked: if previous lesson not completed, it is locked
                    // First lesson is always unlocked
                    const prevLesson = index > 0 ? chapter.lessons[index - 1] : null;
                    const isLocked = index > 0 && !completedLessons.includes(prevLesson.id);

                    return {
                        ...lesson,
                        status: isCompleted ? 'completed' : isLocked ? 'locked' : 'available',
                        isLocked
                    };
                });
                setLessons(lessonsWithStatus);
            }
        }
    }, [chapterId, completedLessons]);

    return {
        lessons,
        getLesson: (id) => getLesson(id)
    };
}
