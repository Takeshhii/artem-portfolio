// Converts the source screenshots to WebP at a sensible retina width.
// Sources are 2880px-wide captures; nothing on the site displays them wider
// than ~800 CSS px, so 1600px covers 2x without shipping dead pixels.
// Run: node scripts/images.mjs
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const DIR = 'public/images';
const MAX_WIDTH = 1600;

const files = fs.readdirSync(DIR).filter((f) => /\.(png|jpe?g)$/i.test(f));

for (const file of files) {
  const src = path.join(DIR, file);
  const out = path.join(DIR, file.replace(/\.(png|jpe?g)$/i, '.webp'));

  const image = sharp(src);
  const meta = await image.metadata();
  const width = Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH);

  await image.resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out);

  const before = fs.statSync(src).size;
  const after = fs.statSync(out).size;
  console.log(
    `${file.padEnd(20)} ${String(Math.round(before / 1024)).padStart(5)}KB → ` +
      `${String(Math.round(after / 1024)).padStart(5)}KB  (${width}px)`
  );

  // A locked file (editor/preview server holding a handle) shouldn't abort the run.
  try {
    fs.unlinkSync(src);
  } catch (err) {
    console.log(`  ! could not remove ${file}: ${err.code} — delete it manually`);
  }
}

console.log('\nSource PNG/JPEG removed; .webp kept.');
