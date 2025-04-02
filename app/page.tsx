'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getManagedGiftTags, type Product, type ManagedGiftTag } from '../lib/supabase';
import { Button } from '../components/Button';
import CategoryCarousel from '../components/CategoryCarousel';
import SearchBar from '../components/SearchBar';
import SearchResultsDisplay from '../components/SearchResultsDisplay';

interface FeaturedCategory {
  name: string;
  slug: string;
  description: string;
}

export default function Home() {
  // State for gift tags
  const [giftTags, setGiftTags] = useState<ManagedGiftTag[]>([]);
  const [tagsFetchError, setTagsFetchError] = useState<string | null>(null);

  // State for search
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Fetch initial gift tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getManagedGiftTags();
        console.log(`[Homepage] Fetched ${tags.length} gift tags.`);
        setGiftTags(tags);
        setTagsFetchError(null);
      } catch (err: any) {
        console.error('[Homepage] Error fetching gift tags:', err);
        setTagsFetchError("Kategorioiden lataus epäonnistui.");
        setGiftTags([]);
      }
    };
    fetchTags();
  }, []);

  // Search handling
  const handleSearch = async (query: string) => {
    if (!query || query.length < 2) return;

    console.log(`[Homepage] Starting search for: "${query}"`);
    setIsLoading(true);
    setShowResults(true);
    setSearchResults([]);
    setSearchError(null);
    setSearchQuery(query);

    try {
      const response = await fetch('/api/hybrid-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Search API returned ${response.status}`);
      }

      const products: Product[] = await response.json();
      console.log(`[Homepage] Search successful, received ${products.length} products.`);
      setSearchResults(products);
    } catch (error: any) {
      console.error('[Homepage] Error fetching search results:', error);
      setSearchError(error.message || 'Haku epäonnistui. Yritä uudelleen.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Close search results
  const handleCloseResults = () => {
    setShowResults(false);
    setSearchQuery('');
    setSearchResults([]);
    setSearchError(null);
  };

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
                  onSearchSubmit={handleSearch} 
                  isSearching={isLoading} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results Section */}
      {showResults && (
        <SearchResultsDisplay
          isLoading={isLoading}
          results={searchResults}
          error={searchError}
          query={searchQuery}
          onClose={handleCloseResults}
        />
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
        {tagsFetchError ? (
          <div className="text-center py-6 text-red-600 bg-red-50 p-4 rounded">
            <p>{tagsFetchError}</p>
          </div>
        ) : giftTags.length > 0 ? (
          <CategoryCarousel categories={giftTags} />
        ) : (
          <div className="text-center py-6 bg-gray-50 p-4 rounded">
            <p className="text-gray-600">Kategorioita ei löytynyt.</p>
          </div>
        )}
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
    </main>
  );
}