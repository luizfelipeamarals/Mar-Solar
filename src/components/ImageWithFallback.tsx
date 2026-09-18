import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

// Guaranteed reliable beach jewelry fallback photo
const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80';

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className,
  fallbackSrc = DEFAULT_FALLBACK,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [hasError, setHasError] = useState(false);

  // Sync if prop changes
  React.useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imgSrc || fallbackSrc}
      alt={alt || 'Acessório praiano sustentável Maré Solar'}
      className={className}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={handleError}
      {...props}
    />
  );
};
