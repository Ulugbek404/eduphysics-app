import React from 'react';
import { Lock, ChevronRight, BookOpen, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

export default function GradeCard({ grade }) {
    const { t } = useLanguage();
    const { id, name, description, total_hours, is_active, icon } = grade;

    if (!is_active) {
        return (
            <div
                className="relative group overflow-hidden rounded-2xl border-[0.5px] p-6 grayscale opacity-60 cursor-not-allowed theme-card"
                style={{ borderColor: 'var(--border-color)' }}
            >
                <div className="flex items-start justify-between mb-4">
                    <div className="p-4 rounded-xl mr-4" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-muted)' }}>
                        <span className="text-3xl">{icon}</span>
                    </div>
                    <Lock className="theme-muted" size={24} />
                </div>
                <h3 className="text-[20px] font-bold theme-text mb-2">{name}</h3>
                <p className="theme-muted text-[14px] mb-4">{description}</p>

                <div className="flex items-center gap-2 theme-muted text-[13px] border-t-[0.5px] pt-4" style={{ borderColor: 'var(--border-color)' }}>
                    <Clock size={16} />
                    <span>{(t('courses_hours') || '{n} soat').replace('{n}', total_hours)}</span>
                </div>

                <div
                    className="absolute top-4 right-4 px-2 py-1 text-[11px] font-bold theme-muted border-[0.5px] rounded-md"
                    style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
                >
                    {t('courses_coming_soon') || 'Tez kunda'}
                </div>
            </div>
        );
    }

    return (
        <Link to={`/darsliklar/${id}`} className="block h-full">
            <div
                className="relative group overflow-hidden rounded-2xl border-[0.5px] p-6 transition-all duration-200 hover:-translate-y-1 h-full flex flex-col theme-card"
                style={{ borderColor: 'var(--border-color)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand-400)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
            >
                {/* Active Badge */}
                <div className="absolute top-4 right-4">
                    <div
                        className="px-3 py-1 rounded-md flex items-center gap-1.5 border-[0.5px]"
                        style={{ backgroundColor: 'rgba(13,148,136,0.1)', borderColor: 'var(--border-brand-soft)' }}
                    >
                        <span className="text-[11px] font-bold text-[#0d9488] uppercase tracking-wider">{t('courses_active') || 'Faol'}</span>
                    </div>
                </div>

                <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                        <div
                            className="flex items-center justify-center w-[80px] h-[80px] rounded-2xl text-4xl group-hover:scale-105 transition-transform duration-300"
                            style={{ backgroundColor: 'rgba(13,148,136,0.1)', color: '#0d9488' }}
                        >
                            {icon}
                        </div>
                    </div>

                    <h3 className="text-[22px] font-bold theme-text mb-2 group-hover:text-[#0d9488] transition-colors">
                        {name}
                    </h3>
                    <p className="text-[14px] theme-muted mb-6 line-clamp-2">
                        {description}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t-[0.5px]" style={{ borderColor: 'var(--border-color)' }}>
                        <span className="flex items-center gap-2 text-[13px] font-medium theme-muted">
                            <BookOpen size={16} className="text-[#0d9488]" />
                            {(t('courses_hours') || '{n} soat').replace('{n}', total_hours)}
                        </span>

                        <div className="flex items-center gap-1 text-[#0d9488] font-medium text-[13px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            {t('common_start') || 'Boshlash'} <ChevronRight size={16} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
