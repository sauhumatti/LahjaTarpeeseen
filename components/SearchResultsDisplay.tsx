'use client';

import ProductCard from './ProductCard';
import { type Product } from '../lib/supabase';
import { Button } from './Button';

interface SearchResultsDisplayProps {
  isLoading: boolean;
  results: Product[];
  error: string | null;
  query: string;
  onClose: () => void;
}

export default function SearchResultsDisplay({
  isLoading,
  results,
  error,
  query,
  onClose,
}: SearchResultsDisplayProps) {
  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-2rem] mb-12 p-6 bg-white shadow-lg rounded-lg relative border border-gray-200"
      aria-live="polite"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-secondary-800">
          Hakutulokset: "{query}"
        </h2>
        <Button
          onClick={onClose}
          variant="outline"
          size="sm"
          aria-label="Sulje hakutulokset"
        >
          Sulje
        </Button>
      </div>

      {isLoading && (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
          <p className="mt-2 text-gray-600">Haetaan...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-10 bg-red-50 p-4 rounded border border-red-200">
          <p className="text-red-700 font-medium">Virhe haussa:</p>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {!isLoading && !error && results.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-600">Ei tuloksia haulla "{query}". Kokeile toista hakusanaa.</p>
        </div>
      )}

      {!isLoading && !error && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}