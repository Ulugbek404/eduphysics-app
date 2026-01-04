import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

function PDFViewer({ pdfUrl, page, pageEnd, title }) {
    const handleOpenPDF = () => {
        // PDF'ni yangi tabda to'g'ri sahifada ochish
        const pdfPath = encodeURI(pdfUrl);
        const fullUrl = `${pdfPath}#page=${page}`;
        window.open(fullUrl, '_blank');
    };

    return (
        <div className="pdf-viewer-container">
            <button
                onClick={handleOpenPDF}
                className="pdf-button group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-3 w-full justify-center"
            >
                <BookOpen size={20} />
                <span className="font-medium">
                    Kitobni O'qish ({page}-{pageEnd} bet)
                </span>
                <ExternalLink size={16} className="opacity-70" />
            </button>

            <p className="text-sm text-slate-400 mt-2 text-center">
                📄 Darslik PDF formatida ochiladi
            </p>
        </div>
    );
}

export default PDFViewer;
