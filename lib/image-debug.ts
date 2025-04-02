import { type Product } from './supabase';

/**
 * Debug helper function to log image loading attempts
 * @param {string} url - The image URL being loaded
 * @param {string} context - Additional context about the image load attempt
 */
function debugImageLoad(url: string, context: string) {
  console.debug(`[Image Debug] Loading image for ${context}:`, url);
}

/**
 * Gets the appropriate image URL for a product, with additional debugging
 * @param {Object} product - The product object
 * @returns {string} - The image URL to use
 */
export function getImageUrlWithDebug(product: Product) {
  if (!product) {
    console.error('[getImageUrl] Product is undefined or null');
    return '/placeholder-image.jpg'; // Return a placeholder
  }

  try {
    // Check if image_path exists and is a valid string
    if (product.image_path && typeof product.image_path === 'string') {
      // Check if image_path is already a full URL
      if (product.image_path.startsWith('http')) {
        // If it's a full URL, use it directly
        debugImageLoad(product.image_path, `product ${product.id}`);
        return product.image_path;
      }

      // Otherwise, construct the URL properly (assuming image_path is just the filename/path part)
      const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${product.image_path}`;
      debugImageLoad(imageUrl, `product ${product.id}`);
      return imageUrl;
    }
    

    // Last resort: return placeholder
    console.warn(`[getImageUrl] No image found for product ${product.id}`, product);
    return '/placeholder-image.jpg';
  } catch (error) {
    console.error(`[getImageUrl] Error getting image URL for product ${product.id}:`, error);
    return '/placeholder-image.jpg';
  }
}