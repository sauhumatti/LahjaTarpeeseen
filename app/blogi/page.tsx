import Link from 'next/link';

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
                        bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition"
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
                <div className="w-full h-full bg-primary-50 flex items-center justify-center">
                  <span className="text-primary-600">Kuva</span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full">
                    {blogPosts[0].category}
                  </span>
                  <span className="mx-2">·</span>
                  <time>{new Date(blogPosts[0].date).toLocaleDateString('fi-FI')}</time>
                  <span className="mx-2">·</span>
                  <span>{blogPosts[0].readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition">
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
                <span className="inline-flex items-center text-primary-600 font-medium group-hover:translate-x-1 transition-transform">
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
    </div>
  );
}