/**
 * Script to generate PNG icons from SVG files
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 48, 128];

async function generateIcons() {
  for (const size of sizes) {
    const svgPath = path.join(__dirname, 'icons', `icon${size}.svg`);
    const pngPath = path.join(__dirname, 'icons', `icon${size}.png`);
    
    try {
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(pngPath);
      
      console.log(`Generated: icon${size}.png`);
    } catch (err) {
      console.error(`Error generating icon${size}.png:`, err.message);
    }
  }
}

generateIcons().then(() => {
  console.log('Icon generation complete!');
}).catch(err => {
  console.error('Failed:', err);
});
