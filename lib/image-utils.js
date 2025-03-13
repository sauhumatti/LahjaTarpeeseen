/**
 * Gets the appropriate image URL for a product
 * @param {Object} product - The product object
 * @returns {string} - The image URL to use
 */
export function getImageUrl(product) {
  if (!product) {
    console.error('[getImageUrl] Product is undefined or null');
    return '/placeholder-image.jpg';
  }

  try {
    // If image_path exists and is valid, use it directly
    if (product.image_path && typeof product.image_path === 'string') {
      // No need for any URL construction - use the stored path as-is
      return product.image_path;
    }
    
    // Fallback to image_url if image_path doesn't exist
    if (product.image_url && typeof product.image_url === 'string') {
      return product.image_url;
    }

    // Last resort: return placeholder
    console.warn(`[getImageUrl] No image found for product ${product.id}`);
    return '/placeholder-image.jpg';
  } catch (error) {
    console.error(`[getImageUrl] Error getting image URL for product ${product.id}:`, error);
    return '/placeholder-image.jpg';
  }
}