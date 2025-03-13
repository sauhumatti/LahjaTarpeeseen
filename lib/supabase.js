import { createClient } from '@supabase/supabase-js';

// Gift categories/tags used throughout the site
export const GIFT_TAGS = [
  "Äitienpäivälahjat",
  "Isänpäivälahjat",
  "Joululahjat",
  "Valmistujaislahjat",
  "Häälahjat",
  "Ristiäislahjat",
  "Ystävänpäivälahjat",
  "Syntymäpäivälahjat",
  "Rippijuhlalahjat",
  "Kiitoslahjat"
];

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

// Helper functions for fetching products
export async function getProducts(limit = 20) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data || [];
}

export async function getProductsByTag(tag, limit = 20) {
  try {
    console.log(`Fetching products for tag: ${tag}`);
    
    // Get all products and filter client-side
    // This approach is simpler and more reliable when server-side filtering has issues
    const { data: allProducts, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false })
      .limit(100); // Fetch more than needed to ensure we have enough after filtering
    
    if (error) {
      console.error("Database error:", error);
      return [];
    }
    
    // Client-side filtering
    const filteredProducts = allProducts.filter(product => {
      // Handle different possible formats of tags
      if (!product.tags) return false;
      
      // If tags is a string, try to parse it
      let tagsArray = product.tags;
      if (typeof product.tags === 'string') {
        try {
          tagsArray = JSON.parse(product.tags);
        } catch (e) {
          // If it's not valid JSON, split by comma or other delimiter
          tagsArray = product.tags.split(',').map(t => t.trim());
        }
      }
      
      // Check if tag exists in the array
      if (Array.isArray(tagsArray)) {
        return tagsArray.some(t =>
          typeof t === 'string' &&
          t.toLowerCase() === tag.toLowerCase()
        );
      } else if (typeof tagsArray === 'object') {
        // If tags is an object with keys
        return Object.values(tagsArray).some(t =>
          typeof t === 'string' &&
          t.toLowerCase() === tag.toLowerCase()
        );
      }
      
      return false;
    });
    
    console.log(`Found ${filteredProducts.length} products for tag: ${tag}`);
    return filteredProducts.slice(0, limit); // Apply the limit after filtering
    
  } catch (error) {
    console.error("Error fetching products by tag:", error);
    return [];
  }
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

// Helper function to get popular products
export async function getPopularProducts(limit = 8) {
  // You might want to implement actual popularity metrics later
  // For now, just return recent products
  return getProducts(limit);
}

// Helper function to get product image URL
export function getImageUrl(product) {
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

// Helper function to generate slug from tag name
export function generateSlug(tag) {
  return tag
    .toLowerCase()
    .replace(/\s+/g, '-')     // Replace whitespace with hyphens
    .replace(/[äå]/g, 'a')    // Convert ä and å to a
    .replace(/[ö]/g, 'o')     // Convert ö to o
    .replace(/[^\w-]/g, '')   // Remove all other special characters
    .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Helper function to find tag from slug
export function findTagFromSlug(slug) {
  return GIFT_TAGS.find(tag => generateSlug(tag) === slug);
}

// Simple search function
export async function searchProducts(query, limit = 20) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order('id', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data || [];
}