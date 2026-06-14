const fs = require('fs');
const path = require('path');

const sourceDir = 'C:\\Users\\abhin\\.gemini\\antigravity-ide\\brain\\b891b761-ec7e-44a0-8e71-d0dc81bd9edc';
const destDir = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// 2nd image (Hero)
fs.copyFileSync(path.join(sourceDir, 'media__1781416261061.jpg'), path.join(destDir, 'hero.jpg'));

// 4th image (Logo)
fs.copyFileSync(path.join(sourceDir, 'media__1781416261089.png'), path.join(destDir, 'logo.png'));

console.log('Images copied successfully.');
