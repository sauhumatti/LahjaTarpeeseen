import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductById, getProductsByTag, generateSlug, getImageUrl } from '../../../../lib/supabase';
import ProductCard from '../../../../components/ProductCard';

export async function generateMetadata({ params }) {
  // Await the params object to resolve the id
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  try {
    const product = await getProductById(id);
    
    if (!product) {
      return { title: 'Tuote ei löytynyt - Lahjatarpeeseen' };
    }
    
    return {
      title: `${product.name} - Lahjatarpeeseen`,
      description: product.description || `Tutustu tuotteeseen ${product.name} ja osta se nyt!`,
      openGraph: {
        images: [{ url: getImageUrl(product) }]
      }
    };
  } catch (error) {
    console.error('Error fetching product metadata:', error);
    return { title: 'Tuote ei löytynyt - Lahjatarpeeseen' };
  }
}
export default async function ProductPage({ params }) {
  // Await the params object to resolve the id
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  
  try {
    const product = await getProductById(id);
    
    if (!product) {
      notFound();
    }
    
    // Fetch similar products based on first tag
    let similarProducts = [];
    if (product.tags && product.tags.length > 0) {
      similarProducts = await getProductsByTag(product.tags[0], 4);
      // Filter out the current product
      similarProducts = similarProducts
        .filter(p => p.id !== product.id)
        .slice(0, 3);
    }
    
    const imageUrl = getImageUrl(product);
    
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-teal-600">
                Etusivu
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link href="/lahjaideat" className="text-gray-500 hover:text-teal-600">
                Lahjaideat
              </Link>
            </li>
            {product.tags && product.tags[0] && (
              <li className="flex items-center space-x-2">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link 
                  href={`/lahjaideat/${generateSlug(product.tags[0])}`}
                  className="text-gray-500 hover:text-teal-600"
                >
                  {product.tags[0]}
                </Link>
              </li>
            )}
            <li className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-500" aria-current="page">
                {product.name}
              </span>
            </li>
          </ol>
        </nav>

        {/* Product details */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="aspect-w-1 aspect-h-1 relative">
              <Image 
                src={imageUrl}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            
            {product.price && (
              <p className="text-2xl font-semibold text-teal-600 mb-6">
                {product.price.toFixed(2)} €
              </p>
            )}
            
            {product.description && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Tuotekuvaus</h2>
                <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
              </div>
            )}
            
            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Ominaisuudet</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {product.tags && product.tags.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Kategoriat</h2>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <Link 
                      key={index}
                      href={`/lahjaideat/${generateSlug(tag)}`}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-teal-50 hover:text-teal-700"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Source info and buy button */}
            <div className="mt-8 space-y-4">
              {product.domain && (
                <p className="text-sm text-gray-500">
                  Tuotelähde: <span className="font-medium">{product.domain}</span>
                </p>
              )}
              
              <a 
                href={product.affiliate_url || product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 transition"
              >
                Siirry verkkokauppaan
                <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Saattaisit pitää myös näistä
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {similarProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
}