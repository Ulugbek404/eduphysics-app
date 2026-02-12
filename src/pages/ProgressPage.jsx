import React from 'react';
import ProgressDashboard from '../components/dashboard/ProgressDashboard';

/**
 * Progress Page
 * Dedicated page for viewing progress and statistics
 */
const ProgressPage = () => {
    return (
        <div className="min-h-screen bg-slate-900 p-6">
            <div className="max-w-7xl mx-auto">
                <ProgressDashboard />
            </div>
        </div>
    );
};

export default ProgressPage;
