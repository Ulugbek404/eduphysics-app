import React from 'react';
import { ChevronLeft } from 'lucide-react';

export const PageHeader = ({ title, onBack, rightElement }) => {
    const handleBack = () => {
        if (navigator.vibrate) navigator.vibrate(10);
        onBack();
    };

    return (
        <div className="
            flex items-center justify-between
            mb-4 md:mb-6
            sticky top-0
            bg-surface/90 backdrop-blur-md
            z-30
            py-3 md:py-4
            -mx-4 px-4
            md:static md:bg-transparent md:p-0 md:m-0
            border-b md:border-none border-line
        ">
            <div className="flex items-center gap-2 md:gap-3">
                {onBack && (
                    <button
                        onClick={handleBack}
                        className="
                            min-h-[44px] min-w-[44px]
                            flex items-center justify-center
                            p-2
                            bg-card hover:bg-card-hover
                            rounded-xl
                            transition-all duration-200
                            active:scale-95
                            border border-line
                            text-soft hover:text-main
                            touch-manipulation
                        "
                        aria-label="Orqaga"
                    >
                        <ChevronLeft size={20} />
                    </button>
                )}
                <h1 className="
                    text-lg sm:text-xl md:text-2xl lg:text-3xl
                    font-bold text-main tracking-tight
                ">
                    {title}
                </h1>
            </div>

            {rightElement && (
                <div className="flex-shrink-0">
                    {rightElement}
                </div>
            )}
        </div>
    );
};

export default PageHeader;
