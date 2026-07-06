const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

/**
 * Generate a Cloudinary URL for an image with automatic optimization
 */
export interface CloudinaryImageOptions {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  /** Crop to this aspect ratio (e.g. '3:4') with subject-aware framing */
  aspectRatio?: string;
}

export function cloudinaryImage(
  path: string,
  options: CloudinaryImageOptions = {}
): string {
  const { width, height, quality = 'auto', format = 'auto', aspectRatio } = options;

  // Remove leading slash and file extension (Cloudinary uses public_id without extension)
  let cleanPath = path.startsWith('/') ? path.slice(1) : path;
  cleanPath = cleanPath.replace(/\.(png|jpg|jpeg|gif|webp)$/i, '');

  // Build transformation string
  const transforms: string[] = ['f_' + format, 'q_' + quality];

  if (width) transforms.push('w_' + width);
  if (height) transforms.push('h_' + height);
  if (aspectRatio) {
    transforms.push('ar_' + aspectRatio.replace('/', ':'), 'c_fill', 'g_auto');
  } else if (width || height) {
    transforms.push('c_limit'); // Preserve aspect ratio
  }

  const transformString = transforms.join(',');

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformString}/portfolio/public/${cleanPath}`;
}

/**
 * Generate a Cloudinary URL for a video with automatic optimization
 */
export function cloudinaryVideo(
  path: string,
  options: {
    width?: number;
    quality?: number | 'auto';
    format?: 'auto' | 'mp4' | 'webm';
  } = {}
): string {
  const { width, quality = 'auto', format = 'auto' } = options;

  // Remove leading slash and .mov extension, replace with format
  let cleanPath = path.startsWith('/') ? path.slice(1) : path;
  cleanPath = cleanPath.replace(/\.mov$/i, '');

  // Build transformation string
  const transforms: string[] = ['f_' + format, 'q_' + quality];

  if (width) transforms.push('w_' + width);

  const transformString = transforms.join(',');

  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transformString}/portfolio/public/${cleanPath}`;
}

/**
 * Generate a srcset string with Cloudinary width variants for responsive/retina serving
 */
export function cloudinarySrcSet(
  path: string,
  widths: number[],
  options: Omit<CloudinaryImageOptions, 'width'> = {}
): string {
  return widths
    .map((w) => `${cloudinaryImage(path, { ...options, width: w })} ${w}w`)
    .join(', ');
}

/**
 * Generate a blur placeholder URL (tiny low-quality version)
 */
export function cloudinaryBlur(path: string): string {
  let cleanPath = path.startsWith('/') ? path.slice(1) : path;
  cleanPath = cleanPath.replace(/\.(png|jpg|jpeg|gif|webp)$/i, '');
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_20,q_10,f_auto,e_blur:1000/portfolio/public/${cleanPath}`;
}
