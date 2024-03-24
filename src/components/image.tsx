export const Image = ({
  src,
  alt: originalAlt,
}: {
  src?: string;
  alt?: string;
}) => {
  return <img src={src} alt={originalAlt ?? ''} />;
};
