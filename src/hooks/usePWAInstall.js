import { useState, useEffect } from 'react';

/**
 * usePWAInstall — PWA o'rnatish holatini boshqarish
 * - Chrome/Edge: beforeinstallprompt event
 * - iOS Safari: manual yo'riqnoma
 * - O'rnatilgan: standalone mode aniqlash
 */
export const usePWAInstall = () => {
    const [installPrompt, setInstallPrompt] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // iOS (iPhone/iPad/iPod) tekshiruvi
        const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
        const standalone = window.navigator.standalone;
        setIsIOS(ios);

        // Allaqachon standalone (o'rnatilgan) rejimda ishlayaptimi?
        if (
            standalone ||
            window.matchMedia('(display-mode: standalone)').matches
        ) {
            setIsInstalled(true);
            return;
        }

        // iOS da Safari o'z prompt beradi — bizga yo'riqnoma kerak
        if (ios && !standalone) {
            setIsInstallable(true);
            return;
        }

        // Chrome / Edge — beforeinstallprompt event ushlab olish
        const handleBeforeInstall = (e) => {
            e.preventDefault();
            setInstallPrompt(e);
            setIsInstallable(true);
        };

        const handleAppInstalled = () => {
            setIsInstalled(true);
            setIsInstallable(false);
            setInstallPrompt(null);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstall);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    /**
     * installApp — o'rnatish dialogini chiqarish
     * @returns {Promise<boolean>} — qabul qilindi/rad etildi
     */
    const installApp = async () => {
        if (!installPrompt) return false;
        installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;
        if (outcome === 'accepted') {
            setIsInstalled(true);
            setIsInstallable(false);
            setInstallPrompt(null);
        }
        return outcome === 'accepted';
    };

    return { isInstallable, isInstalled, isIOS, installApp };
};
