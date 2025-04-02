import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';
import { cache } from 'react';

// Use Database type to define types
export type Product = Database['public']['Tables']['products']['Row'];
export type ManagedGiftTag = Database['public']['Tables']['managed_gift_tags']['Row'];
export type GiftTag = string;

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Helper function to get managed gift tags from database
export const getManagedGiftTags = cache(async (): Promise<ManagedGiftTag[]> => {
  console.log('[Supabase] Fetching managed gift tags...');
  const { data, error } = await supabase
    .from('managed_gift_tags')
    .select('id, tag_name')
    .order('tag_name', { ascending: true });

  if (error) {
    console.error('[Supabase] Error fetching managed gift tags:', error);
    return [];
  }
  console.log(`[Supabase] Fetched ${data?.length || 0} managed gift tags.`);
  return data || [];
});

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
      .contains('tags', JSON.stringify([tag]))
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
export async function findTagFromSlug(slug: string): Promise<GiftTag | undefined> {
  console.log(`[Supabase] Finding tag from slug: ${slug}`);
  const tags = await getManagedGiftTags();
  const foundTag = tags.find(tag => generateSlug(tag.tag_name) === slug);
  console.log(`[Supabase] Tag found for slug "${slug}": ${foundTag?.tag_name}`);
  return foundTag?.tag_name;
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