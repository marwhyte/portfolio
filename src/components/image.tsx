import NextImage from 'next/image';

export const Image = ({
  src,
  alt: originalAlt,
}: {
  src?: string;
  alt?: string;
}) => {
  return (
    <NextImage
      width={1000}
      height={1000}
      src={src ?? ''}
      alt={originalAlt ?? ''}
      loading='lazy'
      quality={85}
      placeholder='blur'
      blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    />
  );
};
