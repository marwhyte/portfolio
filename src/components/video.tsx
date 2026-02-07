'use client';

import { cloudinaryVideo } from '@/lib/cloudinary';

export const Video = ({ src }: { src: string }) => {
  const videoSrc = cloudinaryVideo(src, {
    quality: 'auto',
    format: 'auto',
  });

  return (
    <video controls style={{ maxWidth: '100%' }}>
      <source src={videoSrc} type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  );
};
