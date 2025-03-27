import { generateSlug, type GiftTag } from '../lib/supabase';
import { CategoryCarouselClient } from './CategoryCarouselClient';

interface CategoryCarouselProps {
  categories: readonly GiftTag[] | GiftTag[];
}

/**
 * Server Component that wraps the CategoryCarouselClient.
 * Handles data preparation for the client component.
 */
export default function CategoryCarousel({ categories }: CategoryCarouselProps) {
  // Prepare categories data for client component
  const preparedCategories = categories.map((category, index) => ({
    name: category,
    slug: generateSlug(category),
    imageIndex: index
  }));
  
  return <CategoryCarouselClient categories={preparedCategories} />;
}