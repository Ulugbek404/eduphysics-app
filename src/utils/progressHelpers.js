// ============================================
// 🎯 PROGRESS HELPERS
// Utility functions for progress calculations
// ============================================

import { XP_REWARDS } from './constants';

/**
 * Calculate user level from total XP
 * Formula: level = floor(sqrt(xp / 100)) + 1
 * @param {number} xp - Total XP
 * @returns {number} Current level
 */
export const calculateLevel = (xp) => {
    return Math.floor(Math.sqrt(xp / 100)) + 1;
};

/**
 * Calculate XP needed for next level
 * @param {number} currentLevel - Current level
 * @returns {number} XP needed for next level
 */
export const getXPForNextLevel = (currentLevel) => {
    return Math.pow(currentLevel, 2) * 100;
};

/**
 * Calculate XP progress to next level
 * @param {number} currentXP - Current total XP
 * @returns {object} { current, needed, percentage }
 */
export const getXPProgress = (currentXP) => {
    const currentLevel = calculateLevel(currentXP);
    const currentLevelXP = Math.pow(currentLevel - 1, 2) * 100;
    const nextLevelXP = Math.pow(currentLevel, 2) * 100;
    const xpInCurrentLevel = currentXP - currentLevelXP;
    const xpNeededForLevel = nextLevelXP - currentLevelXP;
    const percentage = Math.round((xpInCurrentLevel / xpNeededForLevel) * 100);

    return {
        current: xpInCurrentLevel,
        needed: xpNeededForLevel,
        percentage: Math.min(percentage, 100)
    };
};

/**
 * Calculate topic completion percentage
 * @param {object} topic - Topic data
 * @returns {number} Completion percentage (0-100)
 */
export const calculateTopicCompletion = (topic) => {
    if (!topic) return 0;

    const lessonsProgress = topic.totalLessons > 0
        ? (topic.lessonsCompleted / topic.totalLessons) * 100
        : 0;

    const testsProgress = topic.totalTests > 0
        ? (topic.testsCompleted / topic.totalTests) * 100
        : 0;

    const labsProgress = topic.totalLabs > 0
        ? (topic.labsCompleted / topic.totalLabs) * 100
        : 0;

    // Weighted average: lessons 40%, tests 40%, labs 20%
    const totalProgress = (lessonsProgress * 0.4) + (testsProgress * 0.4) + (labsProgress * 0.2);

    return Math.round(totalProgress);
};

/**
 * Calculate overall progress across all topics
 * @param {object} topics - All topics data
 * @returns {number} Overall completion percentage
 */
export const calculateOverallProgress = (topics) => {
    if (!topics || Object.keys(topics).length === 0) return 0;

    const topicCompletions = Object.values(topics).map(topic =>
        calculateTopicCompletion(topic)
    );

    const average = topicCompletions.reduce((sum, val) => sum + val, 0) / topicCompletions.length;
    return Math.round(average);
};

/**
 * Calculate current streak
 * @param {object} dailyActivity - Daily activity data
 * @returns {number} Current streak in days
 */
export const calculateStreak = (dailyActivity) => {
    if (!dailyActivity || Object.keys(dailyActivity).length === 0) return 0;

    const dates = Object.keys(dailyActivity).sort().reverse();
    const today = new Date().toISOString().split('T')[0];

    let streak = 0;
    let currentDate = new Date(today);

    for (let i = 0; i < dates.length; i++) {
        const dateStr = currentDate.toISOString().split('T')[0];

        if (dailyActivity[dateStr]) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break;
        }
    }

    return streak;
};

/**
 * Get XP reward for an action
 * @param {string} action - Action type (lesson, test, lab, etc.)
 * @param {number} score - Score percentage (for tests)
 * @returns {number} XP reward
 */
export const getXPReward = (action, score = null) => {
    switch (action) {
        case 'lesson_complete':
            return XP_REWARDS.LESSON_COMPLETE;
        case 'test_complete':
            if (score >= 90) return XP_REWARDS.PERFECT_SCORE;
            return XP_REWARDS.TEST_COMPLETE;
        case 'lab_complete':
            return XP_REWARDS.LAB_COMPLETE;
        case 'daily_login':
            return XP_REWARDS.DAILY_LOGIN;
        default:
            return 0;
    }
};

/**
 * Format time in seconds to readable string
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time (e.g., "2h 30m")
 */
export const formatTimeSpent = (seconds) => {
    if (seconds < 60) return `${seconds}s`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) return `${hours}h`;
    return `${hours}h ${remainingMinutes}m`;
};

/**
 * Get last 7 days of activity
 * @param {object} dailyActivity - Daily activity data
 * @returns {array} Array of {date, xp} for last 7 days
 */
export const getLast7DaysActivity = (dailyActivity) => {
    const result = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];

        result.push({
            date: dateStr,
            xp: dailyActivity[dateStr]?.xpEarned || 0,
            timeSpent: dailyActivity[dateStr]?.timeSpent || 0
        });
    }

    return result;
};

/**
 * Get last 30 days of activity
 * @param {object} dailyActivity - Daily activity data
 * @returns {array} Array of {date, xp} for last 30 days
 */
export const getLast30DaysActivity = (dailyActivity) => {
    const result = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];

        result.push({
            date: dateStr,
            xp: dailyActivity[dateStr]?.xpEarned || 0,
            timeSpent: dailyActivity[dateStr]?.timeSpent || 0
        });
    }

    return result;
};

/**
 * Calculate average test score
 * @param {object} topics - All topics data
 * @returns {number} Average score percentage
 */
export const calculateAverageScore = (topics) => {
    if (!topics || Object.keys(topics).length === 0) return 0;

    const scores = Object.values(topics)
        .filter(topic => topic.averageScore > 0)
        .map(topic => topic.averageScore);

    if (scores.length === 0) return 0;

    const average = scores.reduce((sum, val) => sum + val, 0) / scores.length;
    return Math.round(average);
};

/**
 * Get achievement progress
 * @param {object} stats - User statistics
 * @param {string} achievementId - Achievement ID
 * @returns {object} { current, needed, percentage }
 */
export const getAchievementProgress = (stats, achievementId) => {
    // Achievement requirements
    const achievements = {
        first_lesson: { type: 'lessons', needed: 1 },
        lesson_master: { type: 'lessons', needed: 10 },
        lesson_expert: { type: 'lessons', needed: 25 },
        test_taker: { type: 'tests', needed: 5 },
        test_master: { type: 'tests', needed: 15 },
        lab_beginner: { type: 'labs', needed: 3 },
        lab_expert: { type: 'labs', needed: 10 },
        week_streak: { type: 'streak', needed: 7 },
        month_streak: { type: 'streak', needed: 30 },
    };

    const achievement = achievements[achievementId];
    if (!achievement) return { current: 0, needed: 0, percentage: 0 };

    let current = 0;
    switch (achievement.type) {
        case 'lessons':
            current = stats.totalLessonsCompleted || 0;
            break;
        case 'tests':
            current = stats.totalTestsCompleted || 0;
            break;
        case 'labs':
            current = stats.totalLabsCompleted || 0;
            break;
        case 'streak':
            current = stats.currentStreak || 0;
            break;
    }

    const percentage = Math.min(Math.round((current / achievement.needed) * 100), 100);

    return {
        current,
        needed: achievement.needed,
        percentage
    };
};
