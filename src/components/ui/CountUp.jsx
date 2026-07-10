import React, { useEffect, useRef, useState } from 'react';
import { animate, useReducedMotion } from 'framer-motion';

/**
 * CountUp — raqamni oldingi qiymatdan yangisigacha "yugurtirib" ko'rsatadi.
 * Faqat sonlar uchun; reduced-motion rejimida animatsiyasiz yakuniy qiymat chiqadi.
 */
export default function CountUp({ value, duration = 0.8, format, className = '' }) {
    const reducedMotion = useReducedMotion();
    const [display, setDisplay] = useState(0);
    const prevValue = useRef(0);
    const target = Number(value) || 0;

    useEffect(() => {
        if (reducedMotion) return undefined;
        const controls = animate(prevValue.current, target, {
            duration,
            ease: 'easeOut',
            onUpdate: (v) => setDisplay(Math.round(v)),
        });
        prevValue.current = target;
        return () => controls.stop();
    }, [target, duration, reducedMotion]);

    const shown = reducedMotion ? target : display;
    const text = format ? format(shown) : shown.toLocaleString();
    return <span className={`tabular-nums ${className}`}>{text}</span>;
}
