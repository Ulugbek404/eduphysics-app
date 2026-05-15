
import React, { useMemo } from 'react';

/**
 * TheoryRenderer — matn satırlarini parse qilib, 
 * chiroyli HTML elementlarga aylantiradi.
 * 
 * Qoidalar:
 * - "━━━" → hr divider
 * - "🔹 BIRINCHI QOIDA: ..." → styled section header
 * - "📍 ..." / "🌊 ..." / "💨 ..." / "🧊 ..." / "💧 ..." → color block header
 * - "☕ ..." / "🌸 ..." / "🌊 ..." / "🩸 ..." → icon + text bullet
 * - "• ..." → normal bullet
 * - "1. ..." / "2. ..." → numbered list  
 * - blank line → paragraph break
 * - OTHER → normal paragraph text
 */
export default function TheoryRenderer({ text }) {
    if (!text) return null;

    const elements = useMemo(() => {
        const lines = text.split('\n');
        const result = [];
        let i = 0;
        let paraBuffer = [];

        const flushPara = () => {
            if (paraBuffer.length > 0) {
                const content = paraBuffer.join(' ').trim();
                if (content) {
                    result.push({ type: 'paragraph', content, key: `p-${i}` });
                }
                paraBuffer = [];
            }
        };

        while (i < lines.length) {
            const raw = lines[i];
            const line = raw.trim();

            // ── DIVIDER ──────────────────────────────────────────
            if (line.startsWith('━━━')) {
                flushPara();
                result.push({ type: 'divider', key: `div-${i}` });
                i++;
                continue;
            }

            // ── BLANK LINE → paragraph break ─────────────────────
            if (!line) {
                flushPara();
                i++;
                continue;
            }

            // ── SECTION TITLE (big headers) ───────────────────────
            // Lines that are short, don't start with •, and come right after dividers
            // Actually detect by: all-caps words OR specific patterns like "Browncha harakati", "Diffuziya"
            // Better: detect lines that end without punctuation and are < 60 chars and capitalized

            // ── EMOJI SECTION HEADERS (🔹, 📍, 🌊, etc.) ─────────────────
            const sectionEmojis = ['🔹', '📍', '🌊', '💨', '🧊', '💧', '☀️', '⚡', '🔬', '🔭', '📌', '✅', '📖'];
            const isSectionHeader = sectionEmojis.some(e => line.startsWith(e));

            if (isSectionHeader) {
                flushPara();
                result.push({ type: 'section-header', content: line, key: `sh-${i}` });
                i++;
                continue;
            }

            // ── ICON BULLETS (☕, 🌸, 🩸, 🌊, ☁️ etc.) ─────────────────
            const iconBullets = ['☕', '🌸', '🌊', '🩸', '🫁', '🫀', '🌱', '⚗️', '🧪', '🎯', '💡', '🔑', '📋', '🏭'];
            const isIconBullet = iconBullets.some(e => line.startsWith(e));

            if (isIconBullet) {
                flushPara();
                result.push({ type: 'icon-bullet', content: line, key: `ib-${i}` });
                i++;
                continue;
            }

            // ── BULLET LIST (• ...) ───────────────────────────────
            if (line.startsWith('•')) {
                flushPara();
                // Collect consecutive bullet lines
                const items = [];
                while (i < lines.length && lines[i].trim().startsWith('•')) {
                    items.push(lines[i].trim().slice(1).trim());
                    i++;
                }
                result.push({ type: 'bullet-list', items, key: `bl-${i}` });
                continue;
            }

            // ── NUMBERED LIST (1. ..., 2. ...) ────────────────────
            if (/^\d+[\.\)]/.test(line)) {
                flushPara();
                const items = [];
                while (i < lines.length && /^\d+[\.\)]/.test(lines[i].trim())) {
                    items.push(lines[i].trim().replace(/^\d+[\.\)]\s*/, ''));
                    i++;
                }
                result.push({ type: 'numbered-list', items, key: `nl-${i}` });
                continue;
            }

            // ── QUOTE/HIGHLIGHT (lines in "quotes") ───────────────
            if (line.startsWith('"') && line.endsWith('"')) {
                flushPara();
                result.push({ type: 'quote', content: line.slice(1, -1), key: `q-${i}` });
                i++;
                continue;
            }

            // ── PLAIN TEXT → paragraph ────────────────────────────
            paraBuffer.push(line);
            i++;
        }

        flushPara();
        return result;
    }, [text]);

    return (
        <div className="space-y-4">
            {elements.map(el => {
                switch (el.type) {

                    case 'divider':
                        return (
                            <div key={el.key} className="flex items-center gap-3 my-6">
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                                <div className="w-2 h-2 rounded-full bg-blue-500/40" />
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                            </div>
                        );

                    case 'section-header':
                        return (
                            <div key={el.key} className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-500/10 to-transparent border-l-4 border-blue-500 rounded-r-xl">
                                <p className="theme-text font-bold text-lg leading-snug">{el.content}</p>
                            </div>
                        );

                    case 'icon-bullet':
                        return (
                            <div key={el.key} className="flex items-start gap-3 p-3 theme-card border theme-border rounded-xl">
                                <p className="theme-text text-base leading-relaxed">{el.content}</p>
                            </div>
                        );

                    case 'bullet-list':
                        return (
                            <ul key={el.key} className="space-y-2 pl-2">
                                {el.items.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5 theme-text text-base">
                                        <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        );

                    case 'numbered-list':
                        return (
                            <ol key={el.key} className="space-y-2 pl-2">
                                {el.items.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 theme-text text-base">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                                            {idx + 1}
                                        </span>
                                        <span className="leading-relaxed mt-0.5">{item}</span>
                                    </li>
                                ))}
                            </ol>
                        );

                    case 'quote':
                        return (
                            <blockquote key={el.key} className="relative p-5 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                                <span className="absolute -top-2 -left-1 text-4xl text-amber-400 leading-none font-serif opacity-60">"</span>
                                <p className="theme-text text-base italic leading-relaxed pl-4">{el.content}</p>
                            </blockquote>
                        );

                    case 'paragraph':
                    default:
                        // Check if it's a "standalone title" line (short, no punctuation at end)
                        const isTitle = el.content.length < 70 && !el.content.endsWith('.') && !el.content.endsWith('!') && !el.content.endsWith('?') && !el.content.startsWith('•') && !el.content.includes('→');
                        
                        if (isTitle && el.content === el.content.toUpperCase().replace(/[^A-Z\s]/g, el.content)) {
                            // All caps title — unlikely in Uzbek, skip
                        }

                        return (
                            <p key={el.key} className="theme-text text-base leading-relaxed">
                                {el.content}
                            </p>
                        );
                }
            })}
        </div>
    );
}
