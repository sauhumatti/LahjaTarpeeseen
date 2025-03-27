import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Blogi - Lahjatarpeeseen',
  description: 'Lue uusimmat artikkelit, lahjavinkit ja trendit lahjojen maailmasta.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

// Mock blog posts - in production, these would come from your CMS or database
const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Äitienpäivälahjaa 2025',
    excerpt: 'Äitienpäivä lähestyy! Kokosimme yhteen parhaat lahjaideat jokaiseen makuun ja budjettiin.',
    date: '2025-03-01',
    slug: 'top-10-aitienpäivalahjaa-2025',
    category: 'Lahjaoppaat',
    readTime: '5 min'
  },
  {
    id: 2,
    title: 'Kuinka valita täydellinen häälahja',
    excerpt: 'Häälahjan valinta voi olla haastavaa. Tässä artikkelissa annamme vinkkejä onnistuneeseen valintaan.',
    date: '2025-02-15',
    slug: 'kuinka-valita-taydellinen-haalahja',
    category: 'Vinkit',
    readTime: '7 min'
  },
  {
    id: 3,
    title: 'Vastuulliset lahjavalinnat',
    excerpt: 'Miten valita lahjoja ympäristöä ajatellen? Opas vastuulliseen lahjojen antamiseen.',
    date: '2025-02-01',
    slug: 'vastuulliset-lahjavalinnat',
    category: 'Vastuullisuus',
    readTime: '6 min'
  }
];

const categories = [
  'Kaikki',
  'Lahjaoppaat',
  'Vinkit',
  'Trendit',
  'Vastuullisuus',
  'Haastattelut'
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Lahjablogi</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Lue uusimmat artikkelit, lahjavinkit ja trendit lahjojen maailmasta.
        </p>
      </div>

      {/* Categories */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full text-sm font-medium 
                       bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured post */}
      {blogPosts[0] && (
        <div className="mb-16">
          <Link href={`/blogi/${blogPosts[0].slug}`} className="group">
            <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                <div className="w-full h-full bg-teal-50 flex items-center justify-center">
                  <span className="text-teal-600">Kuva</span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full">
                    {blogPosts[0].category}
                  </span>
                  <span className="mx-2">·</span>
                  <time>{new Date(blogPosts[0].date).toLocaleDateString('fi-FI')}</time>
                  <span className="mx-2">·</span>
                  <span>{blogPosts[0].readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition">
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
                <span className="inline-flex items-center text-teal-600 font-medium group-hover:translate-x-1 transition-transform">
                  Lue lisää
                  <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Blog post grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.slice(1).map((post) => (
          <Link 
            href={`/blogi/${post.slug}`}
            key={post.id}
            className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-100">
              <div className="w-full h-48 bg-teal-50 flex items-center justify-center">
                <span className="text-teal-600">Kuva</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="mx-2">·</span>
                <time>{new Date(post.date).toLocaleDateString('fi-FI')}</time>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>{post.readTime} lukuaika</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Newsletter signup */}
      <div className="mt-16 bg-teal-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Tilaa uutiskirjeemme
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Saa uusimmat artikkelit ja parhaat lahjavinkit suoraan sähköpostiisi.
        </p>
        <form className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder="Sähköpostiosoitteesi"
            className="flex-1 py-2 px-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
          <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition"
          >
            Tilaa
          </button>
        </form>
      </div>
    </div>
  );
}