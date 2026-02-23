import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useAuth } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { XPProvider } from './contexts/XPContext';
import { MissionsProvider } from './contexts/MissionsContext';

// Pages
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './components/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import DashboardPage from './pages/DashboardPage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/SettingsPage';
import MissionsPage from './pages/MissionsPage';
import TeacherDashboard from './pages/TeacherDashboard';

// Darsliklar Pages
import CoursesPage from './pages/CoursesPage';
import ChaptersPage from './pages/ChaptersPage';
import LessonsListPage from './pages/LessonsListPage';
import LessonPage from './pages/LessonPage';
import KutubxonaPage from './pages/KutubxonaPage';
import LaboratoriyaPage from './pages/LaboratoriyaPage';
import OhmQonuni from './pages/OhmQonuni';

// Route Guards
import ProtectedRoute from './components/auth/ProtectedRoute';
import TeacherRoute from './components/auth/TeacherRoute';
import { Loader } from 'lucide-react';

// Loading Screen
function LoadingScreen() {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="text-center space-y-4">
                <Loader className="w-12 h-12 text-blue-500 animate-spin mx-auto" />
                <p className="text-slate-400 text-lg">Yuklanmoqda...</p>
            </div>
        </div>
    );
}

// Main App
function App() {
    return (
        <HelmetProvider>
            <LanguageProvider>
                <Router>
                    <ProgressProvider>
                        <XPProvider>
                            <MissionsProvider>
                                <AppRoutes />
                            </MissionsProvider>
                        </XPProvider>
                    </ProgressProvider>
                </Router>
            </LanguageProvider>
        </HelmetProvider>
    );
}

// Routes Component
function AppRoutes() {
    const { user, loading, isTeacher } = useAuth();

    if (loading) return <LoadingScreen />;

    // Rol asosida bosh sahifa redirect
    const homeRedirect = isTeacher ? '/teacher' : '/dashboard';

    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={user ? <Navigate to={homeRedirect} replace /> : <LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={user ? <Navigate to={homeRedirect} replace /> : <LoginPage />} />
            <Route path="/register" element={user ? <Navigate to={homeRedirect} replace /> : <LoginPage />} />

            {/* ── O'QITUVCHI PANEL ── */}
            <Route
                path="/teacher/*"
                element={
                    <ProtectedRoute>
                        <TeacherRoute>
                            <TeacherDashboard />
                        </TeacherRoute>
                    </ProtectedRoute>
                }
            />

            {/* Protected — Student Routes */}
            <Route path="/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
            <Route path="/darsliklar" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
            <Route path="/darsliklar/:gradeId" element={<ProtectedRoute><ChaptersPage /></ProtectedRoute>} />
            <Route path="/darsliklar/:gradeId/:chapterId" element={<ProtectedRoute><LessonsListPage /></ProtectedRoute>} />
            <Route path="/darsliklar/:gradeId/:chapterId/:lessonId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
            <Route path="/kutubxona" element={<ProtectedRoute><KutubxonaPage /></ProtectedRoute>} />
            <Route path="/laboratoriya" element={<ProtectedRoute><LaboratoriyaPage /></ProtectedRoute>} />
            <Route path="/laboratoriya/ohm" element={<ProtectedRoute><OhmQonuni /></ProtectedRoute>} />
            <Route path="/missiyalar" element={<ProtectedRoute><MissionsPage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="/dashboard/*" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;
