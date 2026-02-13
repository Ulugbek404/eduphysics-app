import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useAuth } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { LanguageProvider } from './contexts/LanguageContext';

// Pages
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './components/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import DashboardPage from './pages/DashboardPage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/SettingsPage';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Loader } from 'lucide-react';

// Loading Screen
function LoadingScreen() {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <div className="text-center space-y-4">
                <Loader className="w-12 h-12 text-blue-500 animate-spin mx-auto" />
                <p className="text-slate-400 text-lg">Yuklanmoqda...</p>
            </div>
        </div>
    );
}


// Main App Component
function App() {
    console.log('App component rendered'); // DEBUG
    return (
        <HelmetProvider>
            <LanguageProvider>
                <Router>
                    <ProgressProvider>
                        <AppRoutes />
                    </ProgressProvider>
                </Router>
            </LanguageProvider>
        </HelmetProvider>
    );
}

// Routes Component
function AppRoutes() {
    const { user, loading } = useAuth();

    console.log('AppRoutes - User:', user, 'Loading:', loading); // DEBUG

    if (loading) {
        console.log('Showing loading screen'); // DEBUG
        return <LoadingScreen />;
    }

    console.log('Rendering routes, user is:', user ? 'logged in' : 'not logged in'); // DEBUG

    return (
        <Routes>
            {/* Public Routes */}
            <Route
                path="/"
                element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />}
            />

            <Route
                path="/about"
                element={<AboutPage />}
            />

            <Route
                path="/contact"
                element={<ContactPage />}
            />

            <Route
                path="/login"
                element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
            />

            <Route
                path="/register"
                element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
            />

            {/* Protected Routes */}
            <Route
                path="/progress"
                element={
                    <ProtectedRoute>
                        <ProgressPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <SettingsPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/dashboard/*"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />

            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;
