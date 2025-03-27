"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '../lib/image-utils';
import type { Product } from '../lib/supabase';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    console.error(`[ProductCard] Image load error for product ${product.id}: ${getImageUrl(product)}`);
    setImgError(true);
  };

  if (!product) return null;

  // Parse tags to ensure we can access them safely
  const tagsArray = Array.isArray(product.tags)
    ? product.tags
    : typeof product.tags === 'string'
      ? JSON.parse(product.tags)
      : Object.values(product.tags || {});

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <Link href={`/lahjaideat/tuote/${product.id}`} className="block">
        <div className="relative w-full pt-[100%]">
          <div className="absolute inset-0">
            <Image
              src={imgError ? '/placeholder-image.jpg' : getImageUrl(product)}
              alt={product.name}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              priority={false}
              onError={handleImageError}
              onLoad={() => setImgError(false)}
            />
            {imgError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 transition-opacity duration-300">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">Kuva ei saatavilla</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between mb-2">
            <p className="text-lg font-semibold text-teal-600">
              {product.price?.toFixed(2)} €
            </p>
            {product.domain && (
              <span className="text-sm text-gray-500">
                {product.domain}
              </span>
            )}
          </div>
          
          {product.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {product.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700">
              Katso tuote
              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            
            {tagsArray.length > 0 && (
              <div className="text-xs text-gray-500">
                {tagsArray[0]}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}