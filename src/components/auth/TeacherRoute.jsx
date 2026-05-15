import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * TeacherRoute — faqat role==='teacher' foydalanuvchilarga ruxsat beradi.
 * Boshqalar /dashboard ga redirect bo'ladi.
 */
export default function TeacherRoute({ children }) {
    const { userData, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen theme-bg">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500" />
                    <p className="theme-muted text-sm">Yuklanmoqda...</p>
                </div>
            </div>
        );
    }

    if (userData?.role !== 'teacher') {
        return <Navigate to="/dashboard" replace state={{ error: "Bu sahifa faqat o'qituvchilar uchun!" }} />;
    }

    return children;
}
