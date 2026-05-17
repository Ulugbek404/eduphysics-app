import React, { useMemo } from 'react';

/**
 * parseInlineStyles — Helper function to parse inline markdown tags:
 * - **bold text** -> strong themed style
 * - *italic text* -> em themed style
 */
function parseInlineStyles(text) {
    if (!text) return '';
    const parts = [];
    // Regex matches **text** or *text*
    const regex = /(\*\*.*?\*\*|\*.*?\*)/g;
    const splitText = text.split(regex);
    
    return splitText.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <strong key={index} className="font-bold text-blue-600 dark:text-blue-400">
                    {part.slice(2, -2)}
                </strong>
            );
        } else if (part.startsWith('*') && part.endsWith('*')) {
            return (
                <em key={index} className="italic font-medium text-amber-600 dark:text-amber-400">
                    {part.slice(1, -1)}
                </em>
            );
        }
        return part;
    });
}

/**
 * TheoryRenderer — matn satrlarini parse qilib, 
 * haqiqiy darslik kabi premium va tekislangan ko'rinishda chiqaradi.
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

            // ── EMOJI SECTION HEADERS (🔹, 📍, 🌊, etc.) ─────────────────
            const sectionEmojis = ['🔹', '📍', '🌊', '💨', '🧊', '💧', '☀️', '⚡', '🔬', '🔭', '📌', '✅', '📖', '❓'];
            const isSectionHeader = sectionEmojis.some(e => line.startsWith(e));

            if (isSectionHeader) {
                flushPara();
                result.push({ type: 'section-header', content: line, key: `sh-${i}` });
                i++;
                continue;
            }

            // ── ICON BULLETS (☕, 🌸, 🌱, 🧪, 🔬 etc.) ─────────────────
            const iconBullets = ['☕', '🌸', '🌊', '🩸', '🫁', '🫀', '🌱', '⚗️', '🧪', '🎯', '💡', '🔑', '📋', '🏭', '🔬'];
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
        <div className="space-y-6">
            {elements.map(el => {
                switch (el.type) {

                    case 'divider':
                        return (
                            <div key={el.key} className="flex items-center gap-3 my-8">
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                                <div className="w-2 h-2 rounded-full bg-blue-500/30" />
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                            </div>
                        );

                    case 'section-header': {
                        const content = el.content;

                        // 1. Definition card format (📌)
                        if (content.startsWith('📌')) {
                            const mainText = content.replace(/^📌\s*/, '');
                            return (
                                <div key={el.key} className="my-6 p-5 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 dark:from-blue-500/10 dark:to-indigo-500/5 border-l-4 border-blue-500 rounded-r-2xl shadow-sm border theme-border">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">📌</span>
                                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Ta'rif / Qoida</span>
                                    </div>
                                    <p className="theme-text font-medium text-base md:text-lg leading-relaxed text-justify m-0">
                                        {parseInlineStyles(mainText.replace(/^(Ta'rif:)?\s*/i, ''))}
                                    </p>
                                </div>
                            );
                        }

                        // 2. Scientist / History Fact card (📖)
                        if (content.startsWith('📖')) {
                            const mainText = content.replace(/^📖\s*/, '');
                            return (
                                <div key={el.key} className="my-6 p-5 bg-slate-50 dark:bg-slate-900/40 border theme-border rounded-2xl shadow-sm flex gap-4 items-start">
                                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 shrink-0">
                                        <span className="text-xl">📖</span>
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">Tarixiy Ma'lumot / Qiziqarli Fakt</span>
                                        <p className="theme-text text-base leading-relaxed text-justify mt-1.5 mb-0">
                                            {parseInlineStyles(mainText)}
                                        </p>
                                    </div>
                                </div>
                            );
                        }

                        // 3. Question review card at the end (❓)
                        if (content.startsWith('❓')) {
                            const mainText = content.replace(/^❓\s*/, '');
                            return (
                                <div key={el.key} className="my-8 p-6 bg-gradient-to-br from-amber-500/5 to-orange-500/5 dark:from-amber-500/10 dark:to-orange-500/5 border-2 border-dashed border-amber-500/20 dark:border-amber-500/10 rounded-2xl shadow-sm">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl text-xl font-bold shrink-0">❓</div>
                                        <div>
                                            <h4 className="text-base font-bold text-amber-600 dark:text-amber-400 m-0">Savol va topshiriqlar</h4>
                                            <p className="text-xs text-slate-400 dark:text-slate-500 m-0">Mavzuni o'zlashtirish darajasini tekshirish</p>
                                        </div>
                                    </div>
                                    <p className="theme-text text-base leading-relaxed text-justify m-0">
                                        {parseInlineStyles(mainText.replace(/^(Savol va topshiriqlar:)?\s*/i, ''))}
                                    </p>
                                </div>
                            );
                        }

                        // 4. Default section headers
                        return (
                            <div key={el.key} className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-500/10 to-transparent border-l-4 border-blue-500 rounded-r-xl my-6">
                                <p className="theme-text font-bold text-lg leading-snug m-0">{parseInlineStyles(content)}</p>
                            </div>
                        );
                    }

                    case 'icon-bullet': {
                        const content = el.content;
                        // Extract first emoji character
                        const emoji = content.substring(0, 2);
                        const mainText = content.substring(2).trim();

                        return (
                            <div key={el.key} className="flex items-start gap-4 p-4 theme-card border theme-border rounded-xl my-4 hover:border-blue-500/20 transition-all duration-300 shadow-sm">
                                <div className="text-2xl shrink-0 p-2.5 bg-blue-500/10 dark:bg-blue-500/5 rounded-xl flex items-center justify-center">
                                    {emoji}
                                </div>
                                <p className="theme-text text-base leading-relaxed text-justify m-0 flex-1">
                                    {parseInlineStyles(mainText)}
                                </p>
                            </div>
                        );
                    }

                    case 'bullet-list':
                        return (
                            <ul key={el.key} className="space-y-3 pl-2 my-4">
                                {el.items.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 theme-text text-base">
                                        <span className="flex-shrink-0 mt-2 w-2 h-2 rounded-full bg-blue-500" />
                                        <span className="leading-relaxed text-justify flex-1">{parseInlineStyles(item)}</span>
                                    </li>
                                ))}
                            </ul>
                        );

                    case 'numbered-list':
                        return (
                            <ol key={el.key} className="space-y-3 pl-2 my-4">
                                {el.items.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3.5 theme-text text-base">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                                            {idx + 1}
                                        </span>
                                        <span className="leading-relaxed text-justify flex-1 mt-0.5">{parseInlineStyles(item)}</span>
                                    </li>
                                ))}
                            </ol>
                        );

                    case 'quote':
                        return (
                            <blockquote key={el.key} className="relative p-6 my-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
                                <span className="absolute -top-3 -left-1 text-5xl text-amber-500/30 leading-none font-serif select-none">"</span>
                                <p className="theme-text text-base italic leading-relaxed text-justify pl-4 m-0">
                                    {parseInlineStyles(el.content)}
                                </p>
                            </blockquote>
                        );

                    case 'paragraph':
                    default:
                        return (
                            <p key={el.key} className="theme-text text-base leading-relaxed text-justify md:text-justify mb-5">
                                {parseInlineStyles(el.content)}
                            </p>
                        );
                }
            })}
        </div>
    );
}
