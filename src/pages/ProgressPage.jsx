import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProgressDashboard from '../components/dashboard/ProgressDashboard';

/**
 * Progress Page
 * Dedicated page for viewing progress and statistics
 */
const ProgressPage = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen overflow-y-auto custom-scrollbar font-sans text-slate-100">
            <div className="max-w-7xl mx-auto p-6 pb-24">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
                >
                    <ArrowLeft size={20} />
                    <span className="font-medium">Ortga qaytish</span>
                </button>

                {/* Progress Dashboard */}
                <ProgressDashboard />
            </div>
        </div>
    );
};

export default ProgressPage;
