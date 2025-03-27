// app/page.tsx
'use client';

import { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GIFT_TAGS, type Product } from '../lib/supabase';
import { Button } from '../components/Button';
import CategoryCarousel from '../components/CategoryCarousel';
import SearchBar from '../components/SearchBar';
import NewsletterForm from '../components/NewsletterForm';
import ProductCard from '../components/ProductCard';
import { logger } from '@/lib/logger';

const INITIAL_VISIBLE_COUNT = 6;

interface FeaturedCategory {
  name: string;
  slug: string;
  description: string;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [visibleResultsCount, setVisibleResultsCount] = useState(INITIAL_VISIBLE_COUNT);

  const featuredCategories: FeaturedCategory[] = [
    {
      name: "Äitienpäivälahjat",
      slug: "aitienpäivalahjat",
      description: "Löydä täydellinen lahja äidille"
    },
    {
      name: "Häälahjat",
      slug: "häalahjat",
      description: "Ainutlaatuiset lahjaideat hääparille"
    }
  ];

  const fetchSearchResults = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      logger.warn('[Homepage Search] fetchSearchResults called with invalid query:', query);
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setVisibleResultsCount(INITIAL_VISIBLE_COUNT);

    try {
      const response = await fetch('/api/hybrid-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`Haku epäonnistui: ${response.statusText}`);
      }

      const data: Product[] = await response.json();
      setSearchResults(data);
      logger.log(`[Homepage Search] Found ${data.length} results for "${query}"`);

    } catch (err: any) {
      logger.error('[Homepage Search] Error fetching results:', err);
      setError(err.message || 'Hakuvirhe');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // Clear results if input is emptied
    if (newSearchTerm.trim() === '') {
      setSearchResults([]);
      setHasSearched(false);
      setVisibleResultsCount(INITIAL_VISIBLE_COUNT);
      setError(null);
    }
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchTerm.trim();

    if (query && query.length >= 2) {
      logger.log(`[Homepage Search] Submitting search for: "${query}"`);
      fetchSearchResults(query);
    } else if (query.length > 0) {
      setSearchResults([]);
      setHasSearched(true);
      setVisibleResultsCount(INITIAL_VISIBLE_COUNT);
      setError("Anna vähintään 2 merkkiä hakusanaksi.");
      logger.warn(`[Homepage Search] Submitted short query: "${query}"`);
    } else {
      setSearchResults([]);
      setHasSearched(false);
      setVisibleResultsCount(INITIAL_VISIBLE_COUNT);
      setError(null);
      logger.log('[Homepage Search] Submitted empty query.');
    }
  };

  const handleLoadMore = () => {
    setVisibleResultsCount(searchResults.length);
  };

  return (
    <main>
      <section
        className="bg-gradient-to-b from-primary-50 to-white py-16 mb-8"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Lahjatarpeeseen Logo"
                width={300}
                height={94}
                className="w-auto h-auto"
                priority
              />
            </div>
            <div className="flex-1">
              <h1
                id="hero-heading"
                className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6"
              >
                Löydä täydellinen lahja
              </h1>
              <p className="text-xl text-secondary-600 mb-10">
                Lahjatarpeeseen on suosittelusivusto, jonne olemme keränneet kaikki parhaat lahjaideat
                helpottaaksemme juuri sopivan lahjan löytämistä.
              </p>
              <div className="max-w-md">
                <SearchBar
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onSubmit={handleSearchSubmit}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {(hasSearched || isLoading) && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 border-t border-gray-200 pt-8">
          {isLoading && (
            <div className="text-center py-6">
              <p className="text-gray-600">Haetaan tuloksia...</p>
            </div>
          )}
          {error && (
            <div className="text-center py-6 text-red-600 bg-red-50 p-4 rounded">
              <p>Virhe: {error}</p>
            </div>
          )}
          {!isLoading && !error && hasSearched && (
            <>
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
                Hakutulokset {searchTerm ? `sanalle "${searchTerm}"` : ''}
              </h2>
              {searchResults.length > 0 ? (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {searchResults.slice(0, visibleResultsCount).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  {searchResults.length > visibleResultsCount && (
                    <div className="mt-8 text-center">
                      <Button
                        onClick={handleLoadMore}
                        variant="outline"
                        size="md"
                        disabled={isLoading}
                      >
                        Näytä lisää ({searchResults.length - visibleResultsCount} kpl)
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 bg-gray-50 p-4 rounded">
                  <p className="text-gray-600">Ei tuloksia haullesi.</p>
                </div>
              )}
            </>
          )}
        </section>
      )}

      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        aria-labelledby="categories-heading"
      >
        <h2
          id="categories-heading"
          className="text-2xl font-semibold text-secondary-900 mb-8"
        >
          Selaa kategorioittain
        </h2>
        <CategoryCarousel categories={GIFT_TAGS} />
      </section>

      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        aria-labelledby="featured-heading"
      >
        <h2
          id="featured-heading"
          className="text-2xl font-semibold text-secondary-900 mb-8"
        >
          Suositut lahjaideat
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredCategories.map((category) => (
            <div
              key={category.name}
              className="bg-primary-50 rounded-lg p-8 hover:bg-primary-100 transition"
            >
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-secondary-600 mb-6">{category.description}</p>
              <Button
                href={`/lahjaideat/${category.slug}`}
                variant="primary"
                size="md"
              >
                <span>Näytä kaikki {category.name}</span>
                <span className="sr-only">kategoriassa</span>
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        aria-labelledby="newsletter-heading"
      >
        <div className="bg-primary-50 rounded-lg p-8 text-center">
          <h2
            id="newsletter-heading"
            className="text-2xl font-semibold text-secondary-900 mb-4"
          >
            Pysy ajan tasalla
          </h2>
          <p className="text-secondary-600 mb-6 max-w-2xl mx-auto">
            Tilaa uutiskirjeemme ja saa parhaat lahjaideat ja tarjoukset suoraan sähköpostiisi.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}