import { type Product } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import { logger } from '@/lib/logger';
import { Suspense } from 'react';
import Loading from './loading';

interface SearchParams {
  q?: string;
}

async function searchProducts(query: string): Promise<Product[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/hybrid-search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: {
        revalidate: 60 // Revalidate every minute
      }
    });

    if (!response.ok) {
      throw new Error(`Search API returned ${response.status}`);
    }

    return response.json();
  } catch (error) {
    logger.error('[Search Page] Error fetching search results:', error);
    throw error;
  }
}

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  // Await and access searchParams here
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q?.trim();

  // If no query, render empty state directly
  if (!query) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4">Haku</h1>
          <p className="text-gray-600">Anna hakusana aloittaaksesi haun.</p>
        </div>
      </div>
    );
  }

  // Pass the resolved query string to the Suspense boundary
  return (
    <Suspense fallback={<Loading />}>
      <SearchResults query={query} />
    </Suspense>
  );
}

async function SearchResults({ query }: { query: string }) {
  try {
    const products = await searchProducts(query);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">
            Hakutulokset: &quot;{query}&quot;
          </h1>
          <p className="text-gray-600">
            {products.length === 0
              ? 'Ei tuloksia'
              : `Löytyi ${products.length} ${products.length === 1 ? 'tuote' : 'tuotetta'}`}
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 inline-block">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Ei hakutuloksia
              </h3>
              <p className="text-gray-600">
                Kokeile eri hakusanoja tai yleisempää hakutermiä.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    logger.error('[Search Page] Error:', error);
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4">Virhe haussa</h1>
          <div className="bg-red-50 rounded-lg p-8 inline-block">
            <svg
              className="mx-auto h-12 w-12 text-red-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-lg font-medium text-red-800 mb-2">
              Tapahtui virhe
            </h3>
            <p className="text-red-600">
              Hakua ei voitu suorittaa. Yritä myöhemmin uudelleen.
            </p>
          </div>
        </div>
      </div>
    );
  }
}