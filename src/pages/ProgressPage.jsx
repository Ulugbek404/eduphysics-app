import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProgressDashboard from '../components/dashboard/ProgressDashboard';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Progress Page
 * Dedicated page for viewing progress and statistics
 */
const ProgressPage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div className="h-screen overflow-y-auto custom-scrollbar font-sans theme-bg theme-text">
            <div className="max-w-7xl mx-auto p-6 pb-24">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 theme-muted hover:text-teal-600 dark:hover:text-white transition-colors mb-6"
                >
                    <ArrowLeft size={20} />
                    <span className="font-medium">{t('nav_back') || 'Ortga'}</span>
                </button>

                {/* Progress Dashboard */}
                <ProgressDashboard />
            </div>
        </div>
    );
};

export default ProgressPage;
