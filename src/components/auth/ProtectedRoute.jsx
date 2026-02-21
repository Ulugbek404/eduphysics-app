import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Loader } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const [timedOut, setTimedOut] = useState(false);

    console.log('[ProtectedRoute] State:', { user: !!user, loading, path: location.pathname }); // DEBUG

    // Timeout fallback — prevent infinite loading
    useEffect(() => {
        if (loading) {
            const timer = setTimeout(() => {
                console.error('[ProtectedRoute] Loading timed out after 5s');
                setTimedOut(true);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [loading]);

    // Show loading screen while checking authentication (with timeout)
    if (loading && !timedOut) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader className="w-12 h-12 text-blue-500 animate-spin mx-auto" />
                    <p className="text-slate-400">Yuklanmoqda...</p>
                </div>
            </div>
        );
    }

    // If timed out, show error with retry
    if (timedOut && !user) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center space-y-4 max-w-md mx-auto p-6">
                    <p className="text-red-400 text-lg font-medium">Autentifikatsiya yuklanmadi</p>
                    <p className="text-slate-500 text-sm">Firebase bilan aloqa o'rnatilmadi yoki uzoq vaqt kutildi.</p>
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                        >
                            Qayta urinish
                        </button>
                        <button
                            onClick={() => window.location.href = '/login'}
                            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                        >
                            Login sahifa
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated, preserving the intended destination
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Render protected content if authenticated
    return children;
};

export default ProtectedRoute;
