
import { useState, useEffect } from 'react';

export function useProgress() {
    const [completedLessons, setCompletedLessons] = useState(() => {
        const saved = localStorage.getItem('completedLessons');
        return saved ? JSON.parse(saved) : [];
    });

    const [scores, setScores] = useState(() => {
        const saved = localStorage.getItem('lessonScores');
        return saved ? JSON.parse(saved) : {};
    });

    const completeLesson = (lessonId, score = 100) => {
        if (!completedLessons.includes(lessonId)) {
            const newCompleted = [...completedLessons, lessonId];
            setCompletedLessons(newCompleted);
            localStorage.setItem('completedLessons', JSON.stringify(newCompleted));
        }

        // Save score if higer
        if (!scores[lessonId] || score > scores[lessonId]) {
            const newScores = { ...scores, [lessonId]: score };
            setScores(newScores);
            localStorage.setItem('lessonScores', JSON.stringify(newScores));
        }
    };

    return {
        completedLessons,
        scores,
        completeLesson
    };
}
