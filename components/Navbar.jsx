'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Lahjaideat', href: '/lahjaideat' },
    { name: 'Blogi', href: '/blogi' },
    { name: 'Tietoa', href: '/tietoa' },
    { name: 'Ota Yhteyttä', href: '/ota-yhteytta' }
  ];

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
      scrolled ? 'shadow-md' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="group">
              <span className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Lahjatarpeeseen Logo"
                  width={160}
                  height={50}
                  className={`h-8 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105 ${
                    scrolled ? 'scale-95' : ''
                  }`}
                  priority
                />
              </span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition"
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-primary-500 focus:outline-none p-2"
              aria-expanded={isMenuOpen}
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
          {navigationItems.map((item) => (
            <Link 
              key={item.name}
              href={item.href}
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}