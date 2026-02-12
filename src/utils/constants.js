// ============================================
// 🎯 NURFIZIKA - CONSTANTS
// Application-wide constants and configuration
// ============================================

// App Information
export const APP_NAME = 'NurFizika';
export const APP_SLOGAN = 'Kuch — bilimda, bilim — bizda!';
export const APP_DESCRIPTION = 'AI-powered Fizika Platformasi';
export const APP_VERSION = '1.0.0';

// Routes
export const ROUTES = {
    HOME: '/',
    DASHBOARD: '/dashboard',
    LOGIN: '/login',
    REGISTER: '/register',
    ABOUT: '/about',
    CONTACT: '/contact',
    LESSONS: '/lessons',
    TESTS: '/tests',
    LABORATORY: '/laboratory',
    PROFILE: '/profile',
    SETTINGS: '/settings',
};

// API Endpoints (if needed)
export const API_ENDPOINTS = {
    // Add your API endpoints here
};

// Firebase Collections
export const COLLECTIONS = {
    USERS: 'users',
    PROGRESS: 'progress',
    ACHIEVEMENTS: 'achievements',
    TESTS: 'tests',
};

// XP System
export const XP_REWARDS = {
    LESSON_COMPLETE: 50,
    TEST_COMPLETE: 100,
    LAB_COMPLETE: 75,
    DAILY_LOGIN: 10,
    PERFECT_SCORE: 150,
};

// Achievement Thresholds
export const ACHIEVEMENT_THRESHOLDS = {
    BEGINNER: 100,
    INTERMEDIATE: 500,
    ADVANCED: 1000,
    EXPERT: 2500,
    MASTER: 5000,
};

// Test Difficulty
export const TEST_DIFFICULTY = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
};

// Lesson Status
export const LESSON_STATUS = {
    NOT_STARTED: 'not_started',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
};

// Colors (for consistency)
export const COLORS = {
    PRIMARY: '#4F46E5', // Indigo
    SECONDARY: '#7C3AED', // Purple
    ACCENT: '#FFD700', // Gold
    SUCCESS: '#10B981',
    WARNING: '#F59E0B',
    ERROR: '#EF4444',
    INFO: '#06B6D4',
};

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
};

// Animation Durations (ms)
export const ANIMATION_DURATION = {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
};

// Local Storage Keys
export const STORAGE_KEYS = {
    USER: 'nurfizika_user',
    THEME: 'nurfizika_theme',
    LANGUAGE: 'nurfizika_language',
    PROGRESS: 'nurfizika_progress',
};
