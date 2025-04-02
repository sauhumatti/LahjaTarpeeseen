'use client';

import React, { useState, FormEvent } from 'react';

interface SearchBarProps {
  onSearchSubmit: (query: string) => void;
  isSearching: boolean;
}

export default function SearchBar({ onSearchSubmit, isSearching }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchTerm.trim();

    if (query.length >= 2 && !isSearching) {
      onSearchSubmit(query);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} role="search">
      <div className="relative">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Etsi lahjaideoita..."
          className="w-full py-3 px-5 pr-14 border-2 border-primary-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm disabled:opacity-70"
          aria-label="Etsi lahjaideoita"
          disabled={isSearching}
        />
        <button
          type="submit"
          className={`absolute right-2 top-2 p-2 rounded-full transition ${
            isSearching
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary-500 text-white hover:bg-primary-600'
          }`}
          aria-label="Suorita haku"
          disabled={isSearching}
        >
          {isSearching ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}