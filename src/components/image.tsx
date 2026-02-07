'use client';

import { cloudinaryImage } from '@/lib/cloudinary';

export const Image = ({
  src,
  alt: originalAlt,
}: {
  src?: string;
  alt?: string;
}) => {
  if (!src) return null;

  const cloudinarySrc = cloudinaryImage(src, {
    width: 1000,
    quality: 'auto',
    format: 'auto',
  });

  const blurSrc = cloudinaryImage(src, {
    width: 20,
    quality: 10,
  });

  return (
    <img
      src={cloudinarySrc}
      alt={originalAlt ?? ''}
      loading='lazy'
      style={{
        maxWidth: '100%',
        height: 'auto',
        backgroundImage: `url(${blurSrc})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
};
