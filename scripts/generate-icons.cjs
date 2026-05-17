/**
 * NurFizika PWA Icon Generator
 * Logo rasmdan barcha o'lchamdagi icon fayllarni yaratadi
 * Ishlatish: node scripts/generate-icons.cjs
 */

const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../public/icons/nurfizika.jpg');
const outputDir = path.join(__dirname, '../public/icons');
const assetsDir = path.join(__dirname, '../public/assets');

// assets papkasini yaratish (agar yo'q bo'lsa)
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Input faylni tekshirish
if (!fs.existsSync(inputFile)) {
  console.error('❌ Logo fayl topilmadi:', inputFile);
  process.exit(1);
}

async function generateIcons() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.error('❌ sharp moduli topilmadi. Avval o\'rnatish kerak:');
    console.error('   npm install sharp --save-dev');
    process.exit(1);
  }

  const sizes = [
    { size: 72,  name: 'icon-72x72.png' },
    { size: 96,  name: 'icon-96x96.png' },
    { size: 128, name: 'icon-128x128.png' },
    { size: 192, name: 'icon-192x192.png' },
    { size: 512, name: 'icon-512x512.png' },
  ];

  console.log('🚀 Icon fayllar yaratilmoqda...\n');

  for (const { size, name } of sizes) {
    const outPath = path.join(outputDir, name);
    try {
      await sharp(inputFile)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 10, g: 15, b: 40, alpha: 1 } // #0a0f28 dark navy
        })
        .png()
        .toFile(outPath);
      console.log(`✅ ${name} (${size}x${size})`);
    } catch (err) {
      console.error(`❌ ${name} yaratishda xato:`, err.message);
    }
  }

  // apple-touch-icon (180x180, oq fon bilan)
  try {
    await sharp(inputFile)
      .resize(180, 180, {
        fit: 'contain',
        background: { r: 10, g: 15, b: 40, alpha: 1 }
      })
      .png()
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    console.log('✅ apple-touch-icon.png (180x180)');
  } catch (err) {
    console.error('❌ apple-touch-icon yaratishda xato:', err.message);
  }

  // favicon.ico uchun 32x32
  try {
    await sharp(inputFile)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 10, g: 15, b: 40, alpha: 1 }
      })
      .png()
      .toFile(path.join(outputDir, 'favicon-32x32.png'));
    console.log('✅ favicon-32x32.png (32x32)');
  } catch (err) {
    console.error('❌ favicon-32x32 yaratishda xato:', err.message);
  }

  // public/assets/nurfizika.jpg ga ham nusxa ko'chirish (Navbar uchun)
  fs.copyFileSync(inputFile, path.join(assetsDir, 'nurfizika.jpg'));
  console.log('✅ public/assets/nurfizika.jpg (nusxa)');

  console.log('\n🎉 Hammasi tayyor! Icon fayllar public/icons/ papkasida.\n');
}

generateIcons().catch(console.error);
