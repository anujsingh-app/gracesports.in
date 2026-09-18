/**
 * Image optimization script for Grace Sport.
 * Converts all PNG/JPG images to optimized WebP with appropriate sizing.
 * Run: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IMAGES_DIR = path.resolve('public/images');

// Max width per category
const SIZE_LIMITS = {
  'avatars': { maxWidth: 200, quality: 75 },
  'categories': { maxWidth: 800, quality: 78 },
  'gallery': { maxWidth: 1200, quality: 78 },
  'hero': { maxWidth: 1400, quality: 80 },
  'products': { maxWidth: 800, quality: 78 },
};

const DEFAULT_CONFIG = { maxWidth: 1000, quality: 78 };

function getConfig(filePath) {
  const relative = path.relative(IMAGES_DIR, filePath).replace(/\\/g, '/');
  const folder = relative.split('/')[0];
  return SIZE_LIMITS[folder] || DEFAULT_CONFIG;
}

async function processImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return null;

  const outputPath = inputPath.replace(/\.(png|jpe?g)$/i, '.webp');
  const config = getConfig(inputPath);

  try {
    const metadata = await sharp(inputPath).metadata();
    const needsResize = metadata.width > config.maxWidth;

    let pipeline = sharp(inputPath);
    if (needsResize) {
      pipeline = pipeline.resize(config.maxWidth, null, { withoutEnlargement: true });
    }
    pipeline = pipeline.webp({ quality: config.quality, effort: 6 });

    await pipeline.toFile(outputPath);

    const inputSize = fs.statSync(inputPath).size;
    const outputSize = fs.statSync(outputPath).size;
    const savings = Math.round((1 - outputSize / inputSize) * 100);

    return {
      file: path.relative(IMAGES_DIR, inputPath),
      inputKB: Math.round(inputSize / 1024),
      outputKB: Math.round(outputSize / 1024),
      savings: `${savings}%`,
    };
  } catch (err) {
    console.error(`Failed: ${inputPath} — ${err.message}`);
    return null;
  }
}

function walkDir(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

async function main() {
  console.log('🏓 Grace Sport Image Optimizer\n');
  const files = walkDir(IMAGES_DIR).filter(f =>
    /\.(png|jpe?g)$/i.test(f)
  );

  console.log(`Found ${files.length} images to optimize...\n`);

  let totalInputKB = 0;
  let totalOutputKB = 0;

  for (const file of files) {
    const result = await processImage(file);
    if (result) {
      totalInputKB += result.inputKB;
      totalOutputKB += result.outputKB;
      console.log(`  ✓ ${result.file}: ${result.inputKB}KB → ${result.outputKB}KB (${result.savings} saved)`);
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  Total: ${totalInputKB}KB → ${totalOutputKB}KB`);
  console.log(`  Saved: ${totalInputKB - totalOutputKB}KB (${Math.round((1 - totalOutputKB / totalInputKB) * 100)}%)`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  console.log('Done! Now update image references in source code from .png/.jpg to .webp');
}

main().catch(console.error);
