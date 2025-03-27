import type { Product } from './supabase';

// Helper function to get product image URL
export function getImageUrl(product: Product | null): string {
  if (!product || !product.image_path) {
    return '/placeholder-gift.png';
  }
  
  const rawUrl = product.image_path;
  
  // Base URL for Supabase storage
  const baseUrl = 'https://dkbzczkwhyboywsayupo.supabase.co/storage/v1/object/public/product-images/';
  
  // Check if the URL already includes the storage path to prevent duplication
  if (rawUrl.startsWith(baseUrl)) {
    return rawUrl.endsWith('?') ? rawUrl.slice(0, -1) : rawUrl;
  }
  
  // If the URL starts with https://, it's a full URL, so use it directly
  if (rawUrl.startsWith('http')) {
    return rawUrl.endsWith('?') ? rawUrl.slice(0, -1) : rawUrl;
  }
  
  // Otherwise, assume it's just a filename and prepend the base URL
  const cleanPath = rawUrl.endsWith('?') ? rawUrl.slice(0, -1) : rawUrl;
  return baseUrl + cleanPath;
}