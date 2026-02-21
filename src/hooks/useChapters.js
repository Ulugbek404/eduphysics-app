
import { useState, useEffect } from 'react';
import { chapters, calculateChapterProgress } from '../data/gradesData';

const EMPTY_ARRAY = [];

export function useChapters(gradeId, completedLessons = EMPTY_ARRAY) {
    const [filteredChapters, setFilteredChapters] = useState([]);

    useEffect(() => {
        if (gradeId) {
            const gradeChapters = chapters.filter(c => c.grade_id === gradeId);
            // Calculate progress for each chapter
            const chaptersWithProgress = gradeChapters.map(ch => ({
                ...ch,
                progress: calculateChapterProgress(ch.id, completedLessons)
            }));
            setFilteredChapters(chaptersWithProgress);
        } else {
            setFilteredChapters(chapters);
        }
    }, [gradeId, completedLessons]);

    return {
        chapters: filteredChapters,
        getChapter: (id) => chapters.find(c => c.id === id)
    };
}
