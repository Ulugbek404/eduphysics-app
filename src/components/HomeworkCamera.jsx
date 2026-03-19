import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, RotateCcw, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * HomeworkCamera — Kamera yoki fayl orqali rasm olish komponenti
 * Props: onCapture(imageBase64: string)
 */
export default function HomeworkCamera({ onCapture }) {
    const { t } = useLanguage();
    const [mode, setMode] = useState('choose'); // choose | camera | preview
    const [capturedImage, setCapturedImage] = useState(null);
    const [cameraError, setCameraError] = useState('');
    const [cameraReady, setCameraReady] = useState(false);
    
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const streamRef = useRef(null);

    // Cleanup — sahifadan chiqqanda
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(t => t.stop());
            }
        };
    }, []);

    // Kamera yoqish
    const startCamera = async () => {
        setCameraError('');
        setCameraReady(false);
        try {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(t => t.stop());
            }

            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
                audio: false
            });
            
            streamRef.current = mediaStream;
            setMode('camera'); // Avval mode ni o'zgartiramiz, shunda video elementi render bo'ladi

            // DOM yangilanishini kutib, keyin ulaymiz
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                    videoRef.current.onloadedmetadata = () => {
                        videoRef.current.play()
                            .then(() => setCameraReady(true))
                            .catch(err => setCameraError('Video ijro xatosi: ' + err.message));
                    };
                }
            }, 100);
        } catch (err) {
            if (err.name === 'NotAllowedError') {
                setCameraError(t('error_cam_not_allowed') || 'Kamera ruxsati berilmadi. Fayl yuklashdan foydalaning yoki brauzer sozlamalarini tekshiring.');
            } else {
                setCameraError((t('error_cam') || 'Kamera xatosi: ') + err.message);
            }
        }
    };

    // Kamerani o'chirish
    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(t => t.stop());
            streamRef.current = null;
        }
        setCameraReady(false);
        setMode('choose');
    };

    // Rasm tushirish
    const capturePhoto = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!canvas || !video || !cameraReady) return;
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.85);
        setCapturedImage(imageData);
        stopCamera();
        setMode('preview');
    };

    // Fayldan yuklash
    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            setCameraError(t('error_image_only') || 'Faqat rasm fayllari qabul qilinadi!');
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            setCapturedImage(ev.target.result);
            setMode('preview');
        };
        reader.readAsDataURL(file);
        // input ni tozalash (qayta tanlash imkoniyati uchun)
        e.target.value = '';
    };

    const reset = () => {
        setCapturedImage(null);
        setMode('choose');
        setCameraError('');
    };

    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5">
            {/* ─── Tanlash ekrani ─── */}
            {mode === 'choose' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={startCamera}
                            className="flex flex-col items-center gap-3 p-6
                                       bg-indigo-600/20 border border-indigo-500/40
                                       rounded-2xl hover:bg-indigo-600/30 transition-all
                                       active:scale-95"
                        >
                            <Camera size={32} className="text-indigo-400" />
                            <span className="text-white font-medium text-sm">{t('homework_camera_btn') || 'Kamera'}</span>
                            <span className="text-slate-400 text-xs text-center leading-relaxed">
                                {t('homework_take_photo') || 'Hozir rasmga olish'}
                            </span>
                        </button>

                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex flex-col items-center gap-3 p-6
                                       bg-emerald-600/20 border border-emerald-500/40
                                       rounded-2xl hover:bg-emerald-600/30 transition-all
                                       active:scale-95"
                        >
                            <Upload size={32} className="text-emerald-400" />
                            <span className="text-white font-medium text-sm">{t('homework_upload') || 'Fayl Yuklash'}</span>
                            <span className="text-slate-400 text-xs text-center leading-relaxed">
                                {t('homework_gallery_btn') || 'Galereyadan tanlash'}
                            </span>
                        </button>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                    />

                    {cameraError && (
                        <p className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                            {cameraError}
                        </p>
                    )}
                </div>
            )}

            {/* ─── Kamera ko'rinishi ─── */}
            {mode === 'camera' && (
                <div className="space-y-4">
                    <div className="relative rounded-xl overflow-hidden min-h-[300px] bg-slate-900 flex items-center justify-center">
                        {!cameraReady && !cameraError && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                                <p className="text-white text-sm mt-4 font-medium">{t('homework_camera_starting') || 'Kamera ishga tushmoqda...'}</p>
                            </div>
                        )}
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className={`w-full h-full object-cover rounded-xl transition-opacity duration-300 ${cameraReady ? 'opacity-100' : 'opacity-0'}`}
                            style={{ transform: 'scaleX(-1)' }}
                        />
                        <canvas ref={canvasRef} className="hidden" />

                        {/* Yordamchi ramka */}
                        <div className="absolute inset-4 border-2 border-white/30 border-dashed rounded-xl pointer-events-none">
                            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white rounded-tl" />
                            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white rounded-tr" />
                            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-white rounded-bl" />
                            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white rounded-br" />
                        </div>

                        <p className="absolute top-4 left-1/2 -translate-x-1/2
                                      bg-black/60 text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap">
                            {t('homework_frame_hint') || 'Yechimingizni ramkaga joylashtiring'}
                        </p>
                    </div>

                    <div className="flex justify-center items-center gap-6">
                        <button
                            onClick={stopCamera}
                            className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-sm transition-all"
                        >
                            {t('btn_cancel') || 'Bekor'}
                        </button>
                        {/* Kamera tugmasi */}
                        <button
                            onClick={capturePhoto}
                            disabled={!cameraReady}
                            className={`w-16 h-16 bg-white rounded-full border-4 border-indigo-500
                                       transition-all flex items-center justify-center shadow-lg shadow-indigo-500/30
                                       ${!cameraReady ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
                        >
                            <div className="w-10 h-10 bg-indigo-500 rounded-full" />
                        </button>
                        <div className="w-24" /> {/* balans uchun */}
                    </div>
                </div>
            )}

            {/* ─── Preview ekrani ─── */}
            {mode === 'preview' && capturedImage && (
                <div className="space-y-4">
                    <div className="relative">
                        <img
                            src={capturedImage}
                            alt={t('homework_solution_img') || "Yechim rasmi"}
                            className="w-full rounded-xl max-h-80 object-contain bg-slate-900"
                        />
                        <div className="absolute top-2 right-2 bg-emerald-500/90 rounded-full p-1">
                            <CheckCircle size={16} className="text-white" />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={reset}
                            className="flex-1 flex items-center justify-center gap-2 py-3
                                       bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-sm transition-all"
                        >
                            <RotateCcw size={15} /> {t('homework_retake') || 'Qayta Olish'}
                        </button>
                        <button
                            onClick={() => onCapture(capturedImage)}
                            className="flex-1 flex items-center justify-center gap-2 py-3
                                       bg-indigo-600 hover:bg-indigo-500 text-white
                                       rounded-xl font-semibold text-sm transition-all
                                       shadow-lg shadow-indigo-500/20"
                        >
                            🤖 {t('homework_send_ai') || 'AI ga Yuborish'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
