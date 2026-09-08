import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.resolve('./src/assets');

async function optimizeImages() {
  try {
    const files = await fs.readdir(assetsDir);
    const imageFiles = files.filter(f => /\.(jpe?g|png)$/i.test(f));

    console.log(`Found ${imageFiles.length} images to optimize.`);

    for (const file of imageFiles) {
      const filePath = path.join(assetsDir, file);
      const ext = path.extname(file);
      const base = path.basename(file, ext);
      const newFilePath = path.join(assetsDir, `${base}.webp`);

      console.log(`Processing ${file}...`);
      await sharp(filePath)
        .resize(1920, null, { withoutEnlargement: true, fit: 'inside' })
        .webp({ quality: 80 })
        .toFile(newFilePath);
      console.log(`Saved ${base}.webp`);
    }
    
    console.log('Finished optimizing images.');
  } catch (err) {
    console.error('Error optimizing images:', err);
  }
}

optimizeImages();
