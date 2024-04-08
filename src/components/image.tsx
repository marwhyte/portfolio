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
    />
  );
};
