import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';

// Use Database type to define Product
export type Product = Database['public']['Tables']['products']['Row'];

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

export type GiftTag = (typeof GIFT_TAGS)[number];

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Helper functions for fetching products
export async function getProducts(limit: number = 20): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data || [];
}

export async function getProductsByTag(tag: GiftTag, limit: number = 20): Promise<Product[]> {
  try {
    console.log(`Fetching products for tag: ${tag}`);
    
    // Use Supabase's contains filter to perform filtering in the database
    const { data, error } = await supabase
      .from('products')
      .select('*')
      // Ensure the tag is checked as an element within the JSON array
      .contains('tags', JSON.stringify([tag])) // <--- CORRECTED LINE
      .order('id', { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Database error:", error);
      return [];
    }

    console.log(`Found ${data?.length || 0} products for tag: ${tag}`);
    return data || [];
  } catch (error) {
    console.error("Error fetching products by tag:", error);
    return [];
  }
}

export async function getProductById(id: string | number): Promise<Product | null> {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', numericId)
    .single();
  
  if (error) throw error;
  return data;
}

// Helper function to get popular products
export async function getPopularProducts(limit: number = 8): Promise<Product[]> {
  // You might want to implement actual popularity metrics later
  // For now, just return recent products
  return getProducts(limit);
}

// Helper function to generate slug from tag name
export function generateSlug(tag: string): string {
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
export function findTagFromSlug(slug: string): GiftTag | undefined {
  return GIFT_TAGS.find(tag => generateSlug(tag) === slug);
}

// Simple search function
export async function searchProducts(query: string, limit: number = 20): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order('id', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data || [];
}