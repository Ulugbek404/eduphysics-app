const fs = require('fs');
const path = require('path');

const keepWords = ['NurFizika', 'AI', 'XP', 'PDF', 'PWA', 'URL', 'UI', 'UX', 'API', 'IT', 'ID'];

function toSentenceCase(text) {
    if (!text || typeof text !== 'string') return text;
    
    // Split text by boundaries while preserving them
    let result = text.replace(/([A-ZO'GShCh]+)([a-z'‘’]+)/g, (match, firstChar, rest, offset) => {
        // First word in the entire string should remain capitalized
        // (Wait, regex offset 0 doesn't mean it's the first word if there's leading space, but usually it is)
        if (offset === 0) return match;
        
        // If it's a known brand/acronym, keep it
        if (keepWords.includes(match)) return match;
        
        // If it immediately follows a period/exclamation/question mark and a space, it's a new sentence
        // Let's just do a simple lookup of the previous characters.
        const prevChars = text.substring(Math.max(0, offset - 2), offset);
        if (prevChars.match(/[.!?]\s/)) return match;
        
        // Lowercase the word
        return firstChar.toLowerCase() + rest;
    });
    
    return result;
}

function processJsonFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let obj = JSON.parse(content);
    
    function traverse(node) {
        for (let key in node) {
            if (typeof node[key] === 'string') {
                node[key] = toSentenceCase(node[key]);
            } else if (typeof node[key] === 'object' && node[key] !== null) {
                traverse(node[key]);
            }
        }
    }
    
    traverse(obj);
    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), 'utf8');
    console.log(`Processed: ${filePath}`);
}

function processJsxFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // We only want to replace specific known strings from the prompt or do a general regex replace on JSX text.
    // Doing a general replace on JSX text is risky because it might catch variables or imports.
    // Instead, let's target specific known bad strings.
    const badStrings = [
        "Bilim Darajangizni Aniqlang",
        "Bugungi Statistika",
        "Tezkor Harakatlar",
        "So'nggi Faoliyat",
        "AI Shaxsiy Tavsiyalar",
        "Mening Progressim",
        "Testni Boshlash",
        "Dars Ko'rish",
        "Barcha Kategoriyalar",
        "O'quv Rejasi",
        "Kunlik Vazifalar",
        "Haftalik Maqsadlar",
        "Bilim Bazasi",
        "Jonli Test",
        "Natijalarni Ko'rish",
        "Boshlang'ich Daraja",
        "O'rta Daraja",
        "Yuqori Daraja",
        "Hisob Ma'lumotlari",
        "Parolni O'zgartirish",
        "PDF Kitoblar",
        "Video Resurslar",
        "Tashqi Manbalar",
        "Barcha Formulalar",
        "Mening Yutuqlarim",
        "Liderlar Taxtasi",
        "Darsni Boshlash",
        "Darslar Ro'yxati",
        "Qidiruv So'zi",
        "Barcha Kitoblar",
        "Om Qonuni Laboratoriyasi",
        "Ideal Gaz Laboratoriyasi",
        "Fizikadan Formulalar To'plami",
        "Yuborilgan Vazifalar",
        "Tushuntirish",
        "Harakatlar Rejasi",
        "O'quvchi Ma'lumotlari",
        "Bepul Boshlash",
        "Aloqa Ma'lumotlari"
    ];

    let modified = false;
    for (const bad of badStrings) {
        const good = toSentenceCase(bad);
        if (bad !== good) {
            const regex = new RegExp(bad, 'g');
            if (content.match(regex)) {
                content = content.replace(regex, good);
                modified = true;
            }
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Processed: ${filePath}`);
    }
}

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? 
            walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

// 1. Process JSON
processJsonFile('./src/locales/uz.json');

// 2. Process JS/JSX files
walkDir('./src', function(filePath) {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
        processJsxFile(filePath);
    }
});

console.log("Done");
