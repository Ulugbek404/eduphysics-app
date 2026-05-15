const fs = require('fs');
const path = require('path');

const targetWords = [
    "Darajangizni", "Statistika", "Harakatlar", "Faoliyat", "Tavsiyalar",
    "Progressim", "Boshlash", "Ko'rish", "Kategoriyalar", "Vazifalar",
    "Maqsadlar", "Natijalar", "Ma'lumotlari", "O'zgartirish", "Kitoblar",
    "Resurslar", "Manbalar", "Formulalar", "Yutuqlarim", "Taxtasi",
    "Ro'yxati", "Sahifasi", "Darslari", "Testlari", "Laboratoriyasi",
    "Qonuni", "Asosiy", "Boshqa"
];

function processJsxFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    targetWords.forEach(word => {
        // Look for any word starting with capital letter, followed by space(s), followed by the target word
        // or just the target word if it's not at the start of a sentence.
        // Actually, just find the target word and replace it with its lowercase version if it's inside a string/JSX.
        
        // Better regex: match a capital letter word, space(s), and the target word
        const regex = new RegExp(`([A-ZO'GŠČ][a-z'‘’]+(?:\\s+))(${word})`, 'g');
        content = content.replace(regex, (match, prefix, target) => {
            modified = true;
            return prefix + target.charAt(0).toLowerCase() + target.slice(1);
        });
        
        // Also catch cases where there's an emoji or symbol before it
        const regexSymbol = new RegExp(`([^A-Za-z0-9.!?]\\s+)(${word})`, 'g');
        content = content.replace(regexSymbol, (match, prefix, target) => {
            // Only lower if it's part of a phrase, let's be careful. Actually, if it's "📊 So'nggi Natijalar", "So'nggi" is capitalized, so Natijalar should be lowered. 
            // The first regex catches that if "So'nggi" is the prefix.
            return match;
        });
    });

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

// 2. Process JS/JSX files
walkDir('./src', function(filePath) {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
        processJsxFile(filePath);
    }
});

console.log("Done");
