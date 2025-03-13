'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <span className="flex items-center">
                <Image 
                  src="/logo.svg" 
                  alt="Lahjatarpeeseen Logo"
                  width={40} 
                  height={40}
                  className="h-10 w-auto"
                />
                <span className="ml-3 text-xl font-bold text-teal-600">Lahjatarpeeseen</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/lahjaideat" className="text-gray-700 hover:text-teal-500 transition">
              Lahjaideat
            </Link>
            <Link href="/blogi" className="text-gray-700 hover:text-teal-500 transition">
              Blogi
            </Link>
            <Link href="/tietoa" className="text-gray-700 hover:text-teal-500 transition">
              Tietoa
            </Link>
            <Link href="/ota-yhteytta" className="text-gray-700 hover:text-teal-500 transition">
              Ota Yhteyttä
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-teal-500 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-3 space-y-1 shadow-lg">
          <Link href="/lahjaideat" 
            className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Lahjaideat
          </Link>
          <Link href="/blogi" 
            className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Blogi
          </Link>
          <Link href="/tietoa" 
            className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Tietoa
          </Link>
          <Link href="/ota-yhteytta" 
            className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Ota Yhteyttä
          </Link>
        </div>
      )}
    </nav>
  );
}