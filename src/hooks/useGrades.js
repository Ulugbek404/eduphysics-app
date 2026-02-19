
import { useState, useEffect } from 'react';
import { grades } from '../data/gradesData';

export function useGrades() {
    return {
        grades,
        getGrade: (id) => grades.find(g => g.id === id)
    };
}
