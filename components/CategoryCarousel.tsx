import { generateSlug, type ManagedGiftTag } from '../lib/supabase';
import { CategoryCarouselClient } from './CategoryCarouselClient';

interface CategoryCarouselProps {
  categories: readonly ManagedGiftTag[] | ManagedGiftTag[];
}

/**
 * Server Component that wraps the CategoryCarouselClient.
 * Handles data preparation for the client component.
 */
export default function CategoryCarousel({ categories }: CategoryCarouselProps) {
  // Prepare categories data for client component
  const preparedCategories = categories.map((category, index) => ({
    name: category.tag_name,
    slug: generateSlug(category.tag_name),
    imageIndex: index
  }));
  
  return <CategoryCarouselClient categories={preparedCategories} />;
}