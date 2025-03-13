import { notFound } from 'next/navigation';
import { GIFT_TAGS, generateSlug, findTagFromSlug, getProductsByTag } from '../../../lib/supabase';
import ProductCard from '../../../components/ProductCard';

export async function generateMetadata({ params }) {
  // Await the params object itself
  const resolvedParams = await params;
  const category = resolvedParams.category;
  const tagName = findTagFromSlug(category);
  
  if (!tagName) {
    return {
      title: 'Kategoria ei löytynyt - Lahjatarpeeseen',
      description: 'Valitettavasti etsimääsi lahjat-kategoriaa ei löytynyt.',
    };
  }
  
  return {
    title: `${tagName} - Lahjatarpeeseen`,
    description: `Löydä parhaat ${tagName.toLowerCase()} - ideoita jokaiseen tilanteeseen.`,
  };
}

// Generate static paths for all gift categories
export function generateStaticParams() {
  return GIFT_TAGS.map((tag) => ({
    category: generateSlug(tag),
  }));
}

export default async function CategoryPage({ params }) {
  // Await the params object itself
  const resolvedParams = await params;
  const category = resolvedParams.category;
  const tagName = findTagFromSlug(category);
  
  console.log(`Category: ${category}, Tag Name: ${tagName}`);
  
  if (!tagName) {
    console.log(`Tag not found for category: ${category}`);
    notFound();
  }
  
  // Fetch products with this tag from the database
  const products = await getProductsByTag(tagName);
  console.log(`Retrieved ${products.length} products for tag: ${tagName}`);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{tagName}</h1>
        <p className="text-lg text-gray-600">
          Löydä täydelliset {tagName.toLowerCase()} jokaiseen tilanteeseen.
          {products.length > 0 && ` Valikoimastamme löytyy ${products.length} tuotetta tässä kategoriassa.`}
        </p>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            Ei tuotteita saatavilla
          </h2>
          <p className="text-gray-600">
            Tähän kategoriaan ei ole vielä lisätty tuotteita. 
            Tarkista pian uudelleen, sillä lisäämme jatkuvasti uusia tuotteita.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      
      {/* Tips section */}
      <section className="mt-16 bg-teal-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Vinkkejä {tagName.toLowerCase()} valintaan
        </h2>
        <div className="prose prose-teal">
          <p>
            Hyvän lahjan valinnassa kannattaa huomioida saajan mieltymykset, 
            harrastukset ja elämäntilanne. Valikoimastamme löydät varmasti 
            sopivan lahjan jokaiselle.
          </p>
          <ul className="mt-4">
            <li>Mieti saajan harrastuksia ja kiinnostuksen kohteita</li>
            <li>Ota huomioon lahjan käytännöllisyys</li>
            <li>Varmista, että lahja sopii saajan elämäntilanteeseen</li>
            <li>Aseta sopiva budjetti ja pysy siinä</li>
          </ul>
        </div>
      </section>
    </div>
  );
}