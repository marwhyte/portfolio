#!/usr/bin/env node

/**
 * Re-upload original media (extracted from git history) to Cloudinary at full
 * resolution, overwriting the downsized versions uploaded by the old script.
 *
 * Images stay at original dimensions; anything over Cloudinary's 10MB free-tier
 * cap is re-encoded as JPEG, stepping quality down (95 → 90 → 85) and only
 * resizing as a last resort.
 *
 * Usage: node scripts/reupload-full-quality.mjs <source-dir>
 */

import { v2 as cloudinary } from 'cloudinary';
import { readdir, readFile, stat } from 'fs/promises';
import { join, extname, relative } from 'path';
import sharp from 'sharp';

const SOURCE_DIR = process.argv[2];
if (!SOURCE_DIR) {
  console.error('Usage: node scripts/reupload-full-quality.mjs <source-dir>');
  process.exit(1);
}

const envFile = await readFile('.env.local', 'utf-8');
const env = Object.fromEntries(
  envFile
    .split('\n')
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const idx = line.indexOf('=');
      return [line.slice(0, idx), line.slice(idx + 1)];
    })
);

cloudinary.config({
  cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const CLOUDINARY_FOLDER = 'portfolio/public';
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;
const CONCURRENCY = 4;

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];
const VIDEO_EXTENSIONS = ['.mov', '.mp4', '.webm'];

async function getAllFiles(dir, files = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) await getAllFiles(fullPath, files);
    else files.push(fullPath);
  }
  return files;
}

/** Re-encode as full-resolution JPEG, stepping down quality until under the cap. */
async function encodeUnderCap(filePath) {
  for (const quality of [95, 90, 85]) {
    const buffer = await sharp(filePath).rotate().jpeg({ quality, mozjpeg: true }).toBuffer();
    if (buffer.length < MAX_IMAGE_SIZE) return { buffer, quality, resized: false };
  }
  const buffer = await sharp(filePath)
    .rotate()
    .resize(4000, 4000, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 90, mozjpeg: true })
    .toBuffer();
  return { buffer, quality: 90, resized: true };
}

function uploadBuffer(buffer, options) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(options, (error, result) => (error ? reject(error) : resolve(result)))
      .end(buffer);
  });
}

async function processFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  const relativePath = relative(SOURCE_DIR, filePath);
  const publicId = `${CLOUDINARY_FOLDER}/${relativePath.replace(ext, '')}`;
  const fileStats = await stat(filePath);
  const mb = (fileStats.size / 1024 / 1024).toFixed(1);

  try {
    if (VIDEO_EXTENSIONS.includes(ext)) {
      if (fileStats.size > MAX_VIDEO_SIZE) {
        return { path: relativePath, status: 'skipped', note: `video ${mb}MB > 100MB cap` };
      }
      await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        resource_type: 'video',
        overwrite: true,
        invalidate: true,
      });
      return { path: relativePath, status: 'uploaded', note: `video ${mb}MB as-is` };
    }

    if (!IMAGE_EXTENSIONS.includes(ext)) {
      return { path: relativePath, status: 'skipped', note: `unhandled type ${ext}` };
    }

    if (fileStats.size <= MAX_IMAGE_SIZE) {
      await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        resource_type: 'image',
        overwrite: true,
        invalidate: true,
      });
      return { path: relativePath, status: 'uploaded', note: `${mb}MB as-is` };
    }

    const { buffer, quality, resized } = await encodeUnderCap(filePath);
    await uploadBuffer(buffer, {
      public_id: publicId,
      resource_type: 'image',
      overwrite: true,
      invalidate: true,
      format: 'jpg',
    });
    const outMb = (buffer.length / 1024 / 1024).toFixed(1);
    return {
      path: relativePath,
      status: 'uploaded',
      note: `${mb}MB -> ${outMb}MB jpeg q${quality}${resized ? ' RESIZED to 4000px' : ' full-res'}`,
    };
  } catch (error) {
    return { path: relativePath, status: 'failed', note: error.message };
  }
}

const files = await getAllFiles(SOURCE_DIR);
console.log(`Found ${files.length} files in ${SOURCE_DIR}\n`);

const results = [];
let cursor = 0;
async function worker() {
  while (cursor < files.length) {
    const file = files[cursor++];
    const result = await processFile(file);
    results.push(result);
    const mark = result.status === 'uploaded' ? '✓' : result.status === 'skipped' ? '⚠' : '✗';
    console.log(`${mark} [${results.length}/${files.length}] ${result.path}: ${result.note}`);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

const counts = results.reduce((acc, r) => ((acc[r.status] = (acc[r.status] || 0) + 1), acc), {});
console.log('\n--- Summary ---');
console.log(counts);
const bad = results.filter((r) => r.status !== 'uploaded');
if (bad.length) {
  console.log('\nNot uploaded:');
  bad.forEach((r) => console.log(`  ${r.status}: ${r.path} (${r.note})`));
}
