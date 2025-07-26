import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// PWA icon sizes required
const sizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];

// Source images
const homescreenIcon = join(__dirname, 'boozelens_homescreen_icon.png');
const webIcon = join(__dirname, 'web_icon.png');

// Output directory
const outputDir = join(__dirname, 'pwa-icons');

// Create output directory if it doesn't exist
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
  console.log('Generating PWA icons...');
  
  for (const size of sizes) {
    try {
      // For web favicon sizes (16, 32), use web_icon.png
      // For all other sizes, use boozelens_homescreen_icon.png
      const sourceImage = (size === 16 || size === 32) ? webIcon : homescreenIcon;
      
      await sharp(sourceImage)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(join(outputDir, `icon-${size}x${size}.png`));
      
      console.log(`✓ Created icon-${size}x${size}.png`);
    } catch (error) {
      console.error(`✗ Failed to create icon-${size}x${size}.png:`, error.message);
    }
  }
  
  console.log('\nAll icons generated successfully!');
}

// Run the script
generateIcons().catch(console.error);