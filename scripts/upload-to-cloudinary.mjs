#!/usr/bin/env node

/**
 * Upload all media from public/ folder to Cloudinary
 * Automatically compresses large images before upload.
 */

import { v2 as cloudinary } from 'cloudinary';
import { readdir, readFile, stat } from 'fs/promises';
import { join, extname } from 'path';
import sharp from 'sharp';

// Load .env.local
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

// Configure Cloudinary
cloudinary.config({
  cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const PUBLIC_DIR = './public';
const CLOUDINARY_FOLDER = 'portfolio';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB Cloudinary limit for images
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB for videos

// File extensions to upload
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
const VIDEO_EXTENSIONS = ['.mov', '.mp4', '.webm', '.avi'];
const ALL_EXTENSIONS = [...IMAGE_EXTENSIONS, ...VIDEO_EXTENSIONS, '.svg'];

async function getAllFiles(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      await getAllFiles(fullPath, files);
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (ALL_EXTENSIONS.includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

async function compressImage(filePath) {
  const ext = extname(filePath).toLowerCase();

  // Don't compress SVGs
  if (ext === '.svg') {
    return filePath;
  }

  const fileStats = await stat(filePath);

  // If under limit, no compression needed
  if (fileStats.size < MAX_FILE_SIZE) {
    return filePath;
  }

  console.log(`  Compressing ${filePath} (${(fileStats.size / 1024 / 1024).toFixed(1)}MB)...`);

  // Compress to buffer
  let sharpInstance = sharp(filePath);

  // Resize if very large (max 2000px on longest side)
  const metadata = await sharpInstance.metadata();
  if (metadata.width > 2000 || metadata.height > 2000) {
    sharpInstance = sharpInstance.resize(2000, 2000, { fit: 'inside' });
  }

  // Output as JPEG with quality reduction
  const buffer = await sharpInstance.jpeg({ quality: 85 }).toBuffer();

  console.log(`  Compressed to ${(buffer.length / 1024 / 1024).toFixed(1)}MB`);

  return { buffer, format: 'jpg' };
}

async function uploadFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  const isVideo = VIDEO_EXTENSIONS.includes(ext);
  const isImage = IMAGE_EXTENSIONS.includes(ext) || ext === '.svg';

  // Get relative path from public folder
  const relativePath = filePath.replace(`${PUBLIC_DIR}/`, '');

  // Check video size
  if (isVideo) {
    const fileStats = await stat(filePath);
    if (fileStats.size > MAX_VIDEO_SIZE) {
      console.log(`⚠ Skipping ${relativePath} - video too large (${(fileStats.size / 1024 / 1024).toFixed(1)}MB > 100MB limit)`);
      return { success: false, path: relativePath, error: 'Video too large for free tier' };
    }
  }

  // Remove extension for public_id
  const publicId = `${CLOUDINARY_FOLDER}/${relativePath.replace(extname(relativePath), '')}`;

  try {
    let uploadSource = filePath;
    let format = undefined;

    // Compress large images
    if (isImage && ext !== '.svg') {
      const compressed = await compressImage(filePath);
      if (compressed.buffer) {
        // Upload from buffer
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              public_id: publicId,
              resource_type: 'image',
              overwrite: true,
              invalidate: true,
              format: 'jpg',
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(compressed.buffer);
        });

        console.log(`✓ Uploaded: ${relativePath}`);
        return { success: true, path: relativePath, url: result.secure_url };
      }
    }

    // Regular upload (uncompressed or video)
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      resource_type: isVideo ? 'video' : 'image',
      overwrite: true,
      invalidate: true,
    });

    console.log(`✓ Uploaded: ${relativePath}`);
    return { success: true, path: relativePath, url: result.secure_url };
  } catch (error) {
    console.error(`✗ Failed: ${relativePath} - ${error.message}`);
    return { success: false, path: relativePath, error: error.message };
  }
}

async function main() {
  // Validate configuration
  if (
    !env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    !env.CLOUDINARY_API_KEY ||
    !env.CLOUDINARY_API_SECRET
  ) {
    console.error('Error: Missing Cloudinary credentials in .env.local');
    process.exit(1);
  }

  console.log('Finding media files in public/ folder...\n');

  const files = await getAllFiles(PUBLIC_DIR);
  console.log(`Found ${files.length} media files to upload.\n`);

  if (files.length === 0) {
    console.log('No files to upload.');
    return;
  }

  console.log('Starting upload (large images will be compressed)...\n');

  const results = [];
  for (const file of files) {
    const result = await uploadFile(file);
    results.push(result);
  }

  // Summary
  const successful = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;

  console.log('\n--- Upload Summary ---');
  console.log(`Total: ${results.length}`);
  console.log(`Successful: ${successful}`);
  console.log(`Failed: ${failed}`);

  if (failed > 0) {
    console.log('\nFailed uploads:');
    results
      .filter((r) => !r.success)
      .forEach((r) => console.log(`  - ${r.path}: ${r.error}`));
  }
}

main().catch(console.error);
