
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function BreadcrumbNav({ items }) {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link to="/darsliklar" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors">
                        <Home className="w-4 h-4 mr-2" />
                        Darsliklar
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index}>
                        <div className="flex items-center">
                            <ChevronRight className="w-5 h-5 text-slate-500" />
                            {item.href ? (
                                <Link to={item.href} className="ml-1 text-sm font-medium text-slate-400 hover:text-white md:ml-2 line-clamp-1 max-w-[150px] sm:max-w-none">
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="ml-1 text-sm font-medium text-blue-400 md:ml-2 line-clamp-1 max-w-[150px] sm:max-w-none">
                                    {item.label}
                                </span>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
