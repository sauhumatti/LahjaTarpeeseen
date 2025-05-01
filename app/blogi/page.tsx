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
    title: 'Neljä Polkua Onnistuneeseen Äitienpäivälahjaan',
    excerpt: 'Onnistuneeseen äitienpäivälahjaan on mielestäni neljä erilaista polkua, joiden avulla voit varmasti onnistua!',
    date: '2025-04-15',
    slug: 'nelja-polkua-onnistuneeseen-aitienpaivalahjaan',
    category: 'Lahjaoppaat',
    readTime: '4 min',
    imageUrl: '/blog/aitienpaivablog.png'
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
  // Sort posts by date, newest first
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const featuredPost = sortedPosts[0]; // Always show the newest as featured
  const otherPosts = sortedPosts.slice(1);

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
                        bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured post */}
      {featuredPost && (
        <div className="mb-16">
          <Link href={`/blogi/${featuredPost.slug}`} className="group block">
            <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 relative">
                <Image
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full font-medium">
                    {featuredPost.category}
                  </span>
                  <span className="mx-2">·</span>
                  <time dateTime={featuredPost.date}>{new Date(featuredPost.date).toLocaleDateString('fi-FI')}</time>
                  <span className="mx-2">·</span>
                  <span>{featuredPost.readTime} lukuaika</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                <span className="inline-flex items-center text-primary-600 font-medium group-hover:translate-x-1 transition-transform mt-auto">
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

      {/* Other posts grid */}
      {otherPosts.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post) => (
            <Link key={post.id} href={`/blogi/${post.slug}`} className="group block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 relative">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-medium">
                      {post.category}
                    </span>
                    <span className="mx-1.5">·</span>
                    <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('fi-FI')}</time>
                    <span className="mx-1.5">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition flex-grow">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center text-sm text-primary-600 font-medium group-hover:translate-x-1 transition-transform mt-auto">
                    Lue lisää
                    <svg className="ml-1.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}