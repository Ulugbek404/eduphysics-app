import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Admin panel Sozlamalar tabida saqlangan konfiguratsiyani real-time o'qiydi.
 * Firestore: config/app
 */
export const useSystemSettings = () => {
    const [settings, setSettings] = useState({
        maintenanceMode: false,
        allowRegistration: true,
        maxStudents: 1000,
    });

    useEffect(() => {
        const unsub = onSnapshot(
            doc(db, 'config', 'app'),
            (snap) => {
                if (snap.exists()) {
                    const data = snap.data();
                    setSettings({
                        maintenanceMode: data.maintenanceMode ?? false,
                        allowRegistration: data.allowRegistration ?? true,
                        maxStudents: data.maxStudents ?? 1000,
                    });
                }
            },
            () => { } // xato bo'lsa default qiymatlar
        );
        return unsub;
    }, []);

    return settings;
};
