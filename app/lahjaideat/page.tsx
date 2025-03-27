import Link from 'next/link';
import { GIFT_TAGS, generateSlug, getPopularProducts, type GiftTag, type Product } from '../../lib/supabase';
import ProductCard from '../../components/ProductCard';

export const metadata = {
  title: 'Lahjaideat - Lahjatarpeeseen',
  description: 'Löydä täydellinen lahja jokaiseen tilanteeseen. Selaa lahjaideoita eri kategorioissa ja löydä inspiraatiota lahjan valintaan.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function GiftIdeas() {
  // Fetch popular products
  const popularProducts: Product[] = await getPopularProducts(8);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Lahjaideat</h1>
      
      {/* Categories grid */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Selaa kategorioittain
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {GIFT_TAGS.map((category: GiftTag) => (
            <Link
              href={`/lahjaideat/${generateSlug(category)}`}
              key={category}
              className="group"
            >
              <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition">
                <div className="h-48 bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition">
                  <span className="text-xl font-semibold text-teal-800">{category}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{category}</h3>
                  <p className="text-gray-600 mb-4">
                    Löydä parhaat {category.toLowerCase()} jokaiseen tilanteeseen.
                  </p>
                  <span className="inline-flex items-center text-teal-600 font-medium">
                    Näytä kaikki
                    <svg 
                      className="ml-2 h-5 w-5 transition transform group-hover:translate-x-1" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular gifts section */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Suosituimmat lahjat
        </h2>
        {popularProducts.length === 0 ? (
          <div className="bg-teal-50 rounded-lg p-8">
            <p className="text-center text-gray-600">
              Tulossa pian! Täältä löydät pian suosituimmat lahjaideat eri kategorioista.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Gift finding help section */}
      <section className="mt-16 bg-white shadow-sm rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Tarvitsetko apua lahjan valinnassa?
        </h2>
        <p className="text-gray-600 mb-6">
          Jos et ole varma mikä lahja sopisi parhaiten, voit käyttää lahjaopastamme 
          tai ottaa yhteyttä meihin. Autamme mielellämme sopivan lahjan löytämisessä!
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/lahjaideat/opas"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
          >
            Käytä lahjaopasta
          </Link>
          <Link
            href="/ota-yhteytta"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200"
          >
            Ota yhteyttä
          </Link>
        </div>
      </section>
    </div>
  );
}