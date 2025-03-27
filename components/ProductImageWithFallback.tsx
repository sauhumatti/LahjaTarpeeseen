"use client";

import { useState } from 'react';
import Image from 'next/image';
import { logger } from '../lib/logger';

interface ProductImageWithFallbackProps {
  /** The source URL of the image */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Whether to use fill mode (default: false) */
  fill?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Sizes attribute for responsive images */
  sizes?: string;
  /** Whether this is a priority image (above the fold) */
  priority?: boolean;
  /** Width of the image in pixels (required if fill is false) */
  width?: number;
  /** Height of the image in pixels (required if fill is false) */
  height?: number;
  /** Image quality (1-100) */
  quality?: number;
}

/**
 * A component that displays a product image with fallback handling and optimizations.
 * Uses Next.js Image component with proper optimization settings.
 */
export default function ProductImageWithFallback({ 
  src,
  alt,
  fill = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  width,
  height,
  quality = 85
}: ProductImageWithFallbackProps) {
  const [imgError, setImgError] = useState(false);

  if (!fill && (!width || !height)) {
    throw new Error('Width and height are required when fill is false');
  }

  const handleImageError = () => {
    logger.error(`[ProductImageWithFallback] Image load error for: ${src}`);
    setImgError(true);
  };

  return (
    <div className={`relative ${fill ? 'w-full pt-[100%]' : ''}`}>
      <div className={fill ? 'absolute inset-0' : ''}>
        <Image
          src={imgError ? '/placeholder-image.jpg' : src}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          className={`object-contain transition-opacity duration-300 ${className}`}
          sizes={sizes}
          priority={priority}
          quality={quality}
          onError={handleImageError}
          onLoad={() => setImgError(false)}
          loading={priority ? 'eager' : 'lazy'}
        />
        {imgError && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-gray-50 transition-opacity duration-300"
            role="alert"
            aria-live="polite"
          >
            <div className="text-center">
              <svg 
                className="mx-auto h-12 w-12 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              <p className="mt-2 text-sm text-gray-500">Kuva ei saatavilla</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}