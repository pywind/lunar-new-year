import { FC, ImgHTMLAttributes } from 'react';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  errorText?: string;
}

const LazyImage: FC<LazyImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  fallback = '',
  errorText,
  ...props
}) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Failed to load image: ${errorText || alt}`);
    const target = e.currentTarget;
    if (fallback) {
      target.src = fallback;
    } else {
      target.style.display = 'none';
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      width={width}
      height={height}
      onError={handleError}
      {...props}
    />
  );
};

export default LazyImage;
