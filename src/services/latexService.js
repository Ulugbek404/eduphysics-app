/**
 * LaTeX formula parsing va formatting servisi
 */

/**
 * Matndan LaTeX formulalarni ajratib olish
 * @param {string} text - Matn
 * @returns {Array} Formula obyektlari massivi
 */
export function parseLatex(text) {
    if (!text) return [];

    const formulas = [];

    // Inline formulas: $...$
    const inlineRegex = /\$([^$]+)\$/g;
    let match;

    while ((match = inlineRegex.exec(text)) !== null) {
        formulas.push({
            type: 'inline',
            formula: match[1],
            position: match.index,
            fullMatch: match[0]
        });
    }

    // Block formulas: $$...$$
    const blockRegex = /\$\$([^$]+)\$\$/g;

    while ((match = blockRegex.exec(text)) !== null) {
        formulas.push({
            type: 'block',
            formula: match[1],
            position: match.index,
            fullMatch: match[0]
        });
    }

    return formulas;
}

/**
 * LaTeX formulani validatsiya qilish
 * @param {string} formula - LaTeX formula
 * @returns {boolean} Valid yoki yo'q
 */
export function validateFormula(formula) {
    if (!formula || typeof formula !== 'string') return false;

    // Asosiy LaTeX syntax tekshirish
    const openBraces = (formula.match(/\{/g) || []).length;
    const closeBraces = (formula.match(/\}/g) || []).length;

    if (openBraces !== closeBraces) return false;

    // Backslash tekshirish
    const hasValidCommands = /\\[a-zA-Z]+/.test(formula) || /[a-zA-Z0-9+\-*/=()^_{}]/.test(formula);

    return hasValidCommands;
}

/**
 * Formulani display uchun formatlash
 * @param {string} formula - LaTeX formula
 * @returns {string} Formatlangan formula
 */
export function formatForDisplay(formula) {
    if (!formula) return '';

    // $ belgilarini olib tashlash
    let cleaned = formula.replace(/^\$+|\$+$/g, '');

    // Bo'sh joylarni tozalash
    cleaned = cleaned.trim();

    return cleaned;
}

/**
 * Matnni LaTeX formula bilan almashtirish
 * @param {string} text - Asl matn
 * @param {Function} renderFunction - Render funksiyasi
 * @returns {Array} React elementlar massivi
 */
export function replaceLatexInText(text, renderFunction) {
    if (!text) return [];

    const formulas = parseLatex(text);

    if (formulas.length === 0) {
        return [text];
    }

    const parts = [];
    let lastIndex = 0;

    formulas.forEach((formula, idx) => {
        // Formula oldidagi matn
        if (formula.position > lastIndex) {
            parts.push({
                type: 'text',
                content: text.substring(lastIndex, formula.position),
                key: `text-${idx}`
            });
        }

        // Formula
        parts.push({
            type: 'formula',
            content: formatForDisplay(formula.formula),
            inline: formula.type === 'inline',
            key: `formula-${idx}`
        });

        lastIndex = formula.position + formula.fullMatch.length;
    });

    // Oxirgi matn
    if (lastIndex < text.length) {
        parts.push({
            type: 'text',
            content: text.substring(lastIndex),
            key: `text-end`
        });
    }

    return parts;
}

/**
 * Umumiy fizika formulalari
 */
export const commonFormulas = {
    // Kinematika
    velocity: 'v = \\frac{s}{t}',
    acceleration: 'a = \\frac{v - v_0}{t}',
    distance: 's = v_0 t + \\frac{1}{2}at^2',

    // Dinamika
    newton2: 'F = ma',
    weight: 'P = mg',
    friction: 'F_{tr} = \\mu N',

    // Energiya
    kineticEnergy: 'E_k = \\frac{mv^2}{2}',
    potentialEnergy: 'E_p = mgh',
    work: 'A = Fs\\cos\\alpha',
    power: 'N = \\frac{A}{t}',

    // Elektr
    ohmsLaw: 'I = \\frac{U}{R}',
    power_electric: 'P = UI',
    resistance: 'R = \\rho\\frac{l}{S}',

    // Optika
    lensFormula: '\\frac{1}{F} = \\frac{1}{d} + \\frac{1}{f}',
    magnification: '\\Gamma = \\frac{H}{h} = \\frac{f}{d}',

    // Molekulyar fizika
    idealGas: 'PV = \\nu RT',
    density: '\\rho = \\frac{m}{V}',
    pressure: 'p = \\frac{F}{S}'
};

/**
 * Formula nomi bo'yicha LaTeX olish
 * @param {string} name - Formula nomi
 * @returns {string} LaTeX formula
 */
export function getFormulaByName(name) {
    return commonFormulas[name] || '';
}

/**
 * Barcha formulalar ro'yxati
 * @returns {Array} Formula obyektlari
 */
export function getAllFormulas() {
    return Object.entries(commonFormulas).map(([key, value]) => ({
        name: key,
        formula: value,
        display: formatForDisplay(value)
    }));
}
