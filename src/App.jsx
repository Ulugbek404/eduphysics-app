import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useAuth } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { XPProvider } from './contexts/XPContext';
import { MissionsProvider } from './contexts/MissionsContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/theme.css'; // ← Global tema CSS variables
import PWAInstallBanner from './components/PWAInstallBanner';
import SplashScreen from './components/SplashScreen';


// Pages
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './components/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import DashboardPage from './pages/DashboardPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/SettingsPage';
import MissionsPage from './pages/MissionsPage';
import AdminDashboard from './pages/AdminDashboard';

// Darsliklar Pages
import CoursesPage from './pages/CoursesPage';
import ChaptersPage from './pages/ChaptersPage';
import LessonsListPage from './pages/LessonsListPage';
import LessonPage from './pages/LessonPage';
import KutubxonaPage from './pages/KutubxonaPage';
import LaboratoriyaPage from './pages/LaboratoriyaPage';
import OhmQonuni from './pages/OhmQonuni';
import MolekulyarFizika from './pages/MolekulyarFizika';
import LiveRoom from './pages/LiveRoom';
import TestlarPage from './pages/TestlarPage';

// Route Guards
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import { useSystemSettings } from './hooks/useSystemSettings';
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

// Standalone (o'rnatilgan PWA) rejimini aniqlash
const isStandaloneMode = () =>
    window.navigator.standalone === true ||
    window.matchMedia('(display-mode: standalone)').matches;

// Main App
function App() {
    // Splash screen faqat o'rnatilgan PWA da ko'rsatiladi
    const [splashDone, setSplashDone] = useState(!isStandaloneMode());

    return (
        <HelmetProvider>
            <ThemeProvider>
                <LanguageProvider>
                    {/* ── Splash Screen (faqat standalone PWA) ── */}
                    {!splashDone && (
                        <SplashScreen onFinish={() => setSplashDone(true)} />
                    )}

                    <Router>
                        <ProgressProvider>
                            <XPProvider>
                                <MissionsProvider>
                                    <AppRoutes />
                                </MissionsProvider>
                            </XPProvider>
                        </ProgressProvider>
                    </Router>

                    {/* ── PWA Install Banner (barcha sahifada) ── */}
                    <PWAInstallBanner />
                </LanguageProvider>
            </ThemeProvider>
        </HelmetProvider>
    );
}

// Routes Component
function AppRoutes() {
    const { user, loading, isAdmin } = useAuth();
    const settings = useSystemSettings();

    if (loading) return <LoadingScreen />;

    // Rol asosida bosh sahifa redirect
    const homeRedirect = isAdmin ? '/admin' : '/dashboard';

    return (
        <>
            {/* Global Maintenance Banner — admin ko'rmaydi */}
            {settings.maintenanceMode && !isAdmin && (
                <div className="fixed top-0 left-0 right-0 z-[9999] bg-yellow-500 text-black text-center py-2 text-sm font-semibold flex items-center justify-center gap-2">
                    🔧 Tizim texnik ishlar olib borilmoqda — tez orada qayta ishga tushadi
                </div>
            )}
            <Routes>
                {/* Public */}
                <Route path="/" element={user ? <Navigate to={homeRedirect} replace /> : <LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={user ? <Navigate to={homeRedirect} replace /> : <LoginPage />} />
                <Route path="/register" element={user ? <Navigate to={homeRedirect} replace /> : <LoginPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />

                {/* ── ADMIN PANEL ── */}
                <Route
                    path="/admin/*"
                    element={
                        <ProtectedRoute>
                            <AdminRoute>
                                <AdminDashboard />
                            </AdminRoute>
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
                <Route path="/laboratoriya/gaz" element={<ProtectedRoute><MolekulyarFizika /></ProtectedRoute>} />
                <Route path="/missiyalar" element={<ProtectedRoute><MissionsPage /></ProtectedRoute>} />
                <Route path="/testlar" element={<ProtectedRoute><TestlarPage /></ProtectedRoute>} />
                <Route path="/testlar/live/:roomCode" element={<ProtectedRoute><LiveRoom /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                <Route path="/dashboard/*" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

                {/* 404 */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}

export default App;
