import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
    calculateLevel,
    getXPProgress,
    calculateOverallProgress,
    calculateStreak,
    getXPReward,
    getLast7DaysActivity,
    calculateAverageScore
} from '../utils/progressHelpers';

const ProgressContext = createContext();

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgress must be used within ProgressProvider');
    }
    return context;
};

export const ProgressProvider = ({ children }) => {
    const { user } = useAuth();

    // Initial state
    const [progress, setProgress] = useState({
        userId: null,
        totalXP: 0,
        level: 1,
        topics: {},
        dailyActivity: {},
        achievements: [],
        stats: {
            totalLessonsCompleted: 0,
            totalTestsCompleted: 0,
            totalLabsCompleted: 0,
            totalTimeSpent: 0,
            averageTestScore: 0,
            currentStreak: 0,
            longestStreak: 0
        }
    });

    const [loading, setLoading] = useState(true);

    // Load progress from localStorage on mount
    useEffect(() => {
        if (user) {
            loadProgress(user.uid);
        } else {
            setLoading(false);
        }
    }, [user]);

    // Load progress from localStorage
    const loadProgress = (userId) => {
        try {
            const savedProgress = localStorage.getItem(`progress_${userId}`);
            if (savedProgress) {
                setProgress(JSON.parse(savedProgress));
            } else {
                // Initialize new progress
                setProgress(prev => ({ ...prev, userId }));
            }
        } catch (error) {
            console.error('Error loading progress:', error);
        } finally {
            setLoading(false);
        }
    };

    // Save progress to localStorage
    const saveProgress = (newProgress) => {
        try {
            if (newProgress.userId) {
                localStorage.setItem(`progress_${newProgress.userId}`, JSON.stringify(newProgress));
            }
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    };

    // Add XP
    const addXP = (amount, source = 'unknown') => {
        setProgress(prev => {
            const newTotalXP = prev.totalXP + amount;
            const newLevel = calculateLevel(newTotalXP);

            // Update daily activity
            const today = new Date().toISOString().split('T')[0];
            const todayActivity = prev.dailyActivity[today] || {
                xpEarned: 0,
                timeSpent: 0,
                lessonsCompleted: 0,
                testsCompleted: 0
            };

            const newProgress = {
                ...prev,
                totalXP: newTotalXP,
                level: newLevel,
                dailyActivity: {
                    ...prev.dailyActivity,
                    [today]: {
                        ...todayActivity,
                        xpEarned: todayActivity.xpEarned + amount
                    }
                }
            };

            saveProgress(newProgress);
            return newProgress;
        });
    };

    // Complete lesson
    const completeLesson = (topicId, lessonId) => {
        const xpReward = getXPReward('lesson_complete');

        setProgress(prev => {
            const topic = prev.topics[topicId] || {
                lessonsCompleted: 0,
                totalLessons: 8, // Default, should be dynamic
                testsCompleted: 0,
                totalTests: 5,
                labsCompleted: 0,
                totalLabs: 3,
                xpEarned: 0,
                timeSpent: 0,
                lastAccessed: new Date().toISOString(),
                averageScore: 0
            };

            const today = new Date().toISOString().split('T')[0];
            const todayActivity = prev.dailyActivity[today] || {
                xpEarned: 0,
                timeSpent: 0,
                lessonsCompleted: 0,
                testsCompleted: 0
            };

            const newProgress = {
                ...prev,
                totalXP: prev.totalXP + xpReward,
                level: calculateLevel(prev.totalXP + xpReward),
                topics: {
                    ...prev.topics,
                    [topicId]: {
                        ...topic,
                        lessonsCompleted: topic.lessonsCompleted + 1,
                        xpEarned: topic.xpEarned + xpReward,
                        lastAccessed: new Date().toISOString()
                    }
                },
                dailyActivity: {
                    ...prev.dailyActivity,
                    [today]: {
                        ...todayActivity,
                        xpEarned: todayActivity.xpEarned + xpReward,
                        lessonsCompleted: todayActivity.lessonsCompleted + 1
                    }
                },
                stats: {
                    ...prev.stats,
                    totalLessonsCompleted: prev.stats.totalLessonsCompleted + 1
                }
            };

            saveProgress(newProgress);
            return newProgress;
        });
    };

    // Complete test
    const completeTest = (topicId, testId, score) => {
        const xpReward = getXPReward('test_complete', score);

        setProgress(prev => {
            const topic = prev.topics[topicId] || {
                lessonsCompleted: 0,
                totalLessons: 8,
                testsCompleted: 0,
                totalTests: 5,
                labsCompleted: 0,
                totalLabs: 3,
                xpEarned: 0,
                timeSpent: 0,
                lastAccessed: new Date().toISOString(),
                averageScore: 0
            };

            // Calculate new average score
            const newAverageScore = topic.testsCompleted === 0
                ? score
                : Math.round((topic.averageScore * topic.testsCompleted + score) / (topic.testsCompleted + 1));

            const today = new Date().toISOString().split('T')[0];
            const todayActivity = prev.dailyActivity[today] || {
                xpEarned: 0,
                timeSpent: 0,
                lessonsCompleted: 0,
                testsCompleted: 0
            };

            const newProgress = {
                ...prev,
                totalXP: prev.totalXP + xpReward,
                level: calculateLevel(prev.totalXP + xpReward),
                topics: {
                    ...prev.topics,
                    [topicId]: {
                        ...topic,
                        testsCompleted: topic.testsCompleted + 1,
                        xpEarned: topic.xpEarned + xpReward,
                        lastAccessed: new Date().toISOString(),
                        averageScore: newAverageScore
                    }
                },
                dailyActivity: {
                    ...prev.dailyActivity,
                    [today]: {
                        ...todayActivity,
                        xpEarned: todayActivity.xpEarned + xpReward,
                        testsCompleted: todayActivity.testsCompleted + 1
                    }
                },
                stats: {
                    ...prev.stats,
                    totalTestsCompleted: prev.stats.totalTestsCompleted + 1,
                    averageTestScore: calculateAverageScore({
                        ...prev.topics,
                        [topicId]: {
                            ...topic,
                            averageScore: newAverageScore
                        }
                    })
                }
            };

            saveProgress(newProgress);
            return newProgress;
        });
    };

    // Complete lab
    const completeLab = (topicId, labId) => {
        const xpReward = getXPReward('lab_complete');

        setProgress(prev => {
            const topic = prev.topics[topicId] || {
                lessonsCompleted: 0,
                totalLessons: 8,
                testsCompleted: 0,
                totalTests: 5,
                labsCompleted: 0,
                totalLabs: 3,
                xpEarned: 0,
                timeSpent: 0,
                lastAccessed: new Date().toISOString(),
                averageScore: 0
            };

            const newProgress = {
                ...prev,
                totalXP: prev.totalXP + xpReward,
                level: calculateLevel(prev.totalXP + xpReward),
                topics: {
                    ...prev.topics,
                    [topicId]: {
                        ...topic,
                        labsCompleted: topic.labsCompleted + 1,
                        xpEarned: topic.xpEarned + xpReward,
                        lastAccessed: new Date().toISOString()
                    }
                },
                stats: {
                    ...prev.stats,
                    totalLabsCompleted: prev.stats.totalLabsCompleted + 1
                }
            };

            saveProgress(newProgress);
            return newProgress;
        });
    };

    // Track time spent
    const trackTimeSpent = (topicId, seconds) => {
        setProgress(prev => {
            const topic = prev.topics[topicId] || {
                lessonsCompleted: 0,
                totalLessons: 8,
                testsCompleted: 0,
                totalTests: 5,
                labsCompleted: 0,
                totalLabs: 3,
                xpEarned: 0,
                timeSpent: 0,
                lastAccessed: new Date().toISOString(),
                averageScore: 0
            };

            const today = new Date().toISOString().split('T')[0];
            const todayActivity = prev.dailyActivity[today] || {
                xpEarned: 0,
                timeSpent: 0,
                lessonsCompleted: 0,
                testsCompleted: 0
            };

            const newProgress = {
                ...prev,
                topics: {
                    ...prev.topics,
                    [topicId]: {
                        ...topic,
                        timeSpent: topic.timeSpent + seconds,
                        lastAccessed: new Date().toISOString()
                    }
                },
                dailyActivity: {
                    ...prev.dailyActivity,
                    [today]: {
                        ...todayActivity,
                        timeSpent: todayActivity.timeSpent + seconds
                    }
                },
                stats: {
                    ...prev.stats,
                    totalTimeSpent: prev.stats.totalTimeSpent + seconds
                }
            };

            saveProgress(newProgress);
            return newProgress;
        });
    };

    // Unlock achievement
    const unlockAchievement = (achievementId, xpReward = 50) => {
        setProgress(prev => {
            // Check if already unlocked
            if (prev.achievements.some(a => a.id === achievementId)) {
                return prev;
            }

            const newProgress = {
                ...prev,
                totalXP: prev.totalXP + xpReward,
                level: calculateLevel(prev.totalXP + xpReward),
                achievements: [
                    ...prev.achievements,
                    {
                        id: achievementId,
                        unlockedAt: new Date().toISOString(),
                        xpReward
                    }
                ]
            };

            saveProgress(newProgress);
            return newProgress;
        });
    };

    // Get computed values
    const getComputedProgress = () => {
        return {
            ...progress,
            xpProgress: getXPProgress(progress.totalXP),
            overallProgress: calculateOverallProgress(progress.topics),
            currentStreak: calculateStreak(progress.dailyActivity),
            last7Days: getLast7DaysActivity(progress.dailyActivity)
        };
    };

    const value = {
        progress: getComputedProgress(),
        loading,
        addXP,
        completeLesson,
        completeTest,
        completeLab,
        trackTimeSpent,
        unlockAchievement
    };

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
};
