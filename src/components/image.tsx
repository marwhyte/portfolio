'use client';

import { cloudinaryImage, cloudinarySrcSet } from '@/lib/cloudinary';

// Blog content column is max-w-2xl (672px); variants cover 1x/2x/3x displays
const DISPLAY_WIDTH = 672;
const SRCSET_WIDTHS = [672, 1344, 2016];

export const Image = ({
  src,
  alt: originalAlt,
}: {
  src?: string;
  alt?: string;
}) => {
  if (!src) return null;

  const cloudinarySrc = cloudinaryImage(src, {
    width: DISPLAY_WIDTH * 2,
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
      srcSet={cloudinarySrcSet(src, SRCSET_WIDTHS)}
      sizes={`(max-width: ${DISPLAY_WIDTH}px) 100vw, ${DISPLAY_WIDTH}px`}
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
