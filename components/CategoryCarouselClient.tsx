'use client';

import Link from 'next/link';
import Image from 'next/image';

interface CategoryCarouselClientProps {
  categories: {
    name: string;
    slug: string;
    imageIndex: number;
  }[];
}

export function CategoryCarouselClient({ categories }: CategoryCarouselClientProps) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div 
        className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory touch-pan-x"
        role="region"
        aria-label="Kategoriat"
      >
        <div className="flex gap-4 px-4 md:px-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/lahjaideat/${category.slug}`}
              className="flex-none w-[50%] md:w-[calc(25%-12px)] snap-start relative group hover:scale-105 transform transition-all duration-300"
              aria-label={`Siirry kategoriaan ${category.name}`}
            >
              <div className="text-center">
                <div className="w-full h-full max-w-[12rem] max-h-[12rem] mx-auto relative aspect-square">
                  <Image
                    src={`/pallura${(category.imageIndex % 4) + 1}.png`}
                    alt=""
                    width={192}
                    height={192}
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                    draggable={false}
                    priority={category.imageIndex < 4} // Prioritize loading first 4 images
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="text-white text-xl font-bold whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                      aria-hidden="true" // Hide from screen readers since the link already has the text
                    >
                      {category.name}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}