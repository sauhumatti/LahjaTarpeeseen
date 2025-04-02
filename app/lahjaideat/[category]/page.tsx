import { notFound } from 'next/navigation';
import { getManagedGiftTags, generateSlug, findTagFromSlug, getProductsByTag } from '../../../lib/supabase';
import ProductCard from '../../../components/ProductCard';
import { Metadata } from 'next';

// Define the expected shape of the resolved params
interface CategoryPageParams {
  category: string;
}

// Define the props type using the Promise structure
interface CategoryPageProps {
  params: Promise<CategoryPageParams>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tagName = await findTagFromSlug(resolvedParams.category);
  if (!tagName) return notFound();

  return {
    title: `${tagName} - Lahjatarpeeseen`,
    description: `Löydä parhaat ${tagName.toLowerCase()} jokaiseen tilanteeseen. Monipuolinen valikoima laadukkaita lahjoja edulliseen hintaan.`,
  };
}

export async function generateStaticParams() {
  const managedTags = await getManagedGiftTags();
  return managedTags.map((tag) => ({
    category: generateSlug(tag.tag_name),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.category;
  const tagName = await findTagFromSlug(categorySlug);

  if (!tagName) {
    notFound();
  }

  const products = await getProductsByTag(tagName);

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
            Tähän kategoriaan ({tagName}) ei ole vielä lisätty tuotteita.
            Tarkista pian uudelleen!
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
      <section className="mt-16 bg-primary-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Vinkkejä {tagName.toLowerCase()} valintaan
        </h2>
        <div className="prose prose-primary max-w-none">
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