import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  skeletonClassName?: string;
}

export const LazyImage = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  skeletonClassName = 'bg-muted',
  ...props
}: LazyImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const img = new Image();
    
    const handleLoad = () => {
      setIsLoading(false);
      setImageSrc(src);
    };

    img.src = src;
    img.addEventListener('load', handleLoad);

    return () => {
      img.removeEventListener('load', handleLoad);
    };
  }, [src]);

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      {isLoading && (
        <div 
          className={cn(
            'absolute inset-0 animate-pulse',
            skeletonClassName
          )}
          aria-hidden="true"
        />
      )}
      <img
        src={imageSrc || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4='}
        alt={alt}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        loading="lazy"
        decoding="async"
        {...props}
      />
      <span className="sr-only" role="status">
        {isLoading ? 'Loading image...' : 'Image loaded'}
      </span>
    </div>
  );
};

export default LazyImage;
