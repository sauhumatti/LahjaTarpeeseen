import Link from 'next/link';
import { GIFT_TAGS } from '../lib/supabase';
import { Button } from '../components/Button';

export default function Home() {
  // Featured categories for the homepage
  const featuredCategories = [
    {
      name: "Äitienpäivälahjat",
      slug: "aitienpäivalahjat",
      description: "Löydä täydellinen lahja äidille"
    },
    {
      name: "Häälahjat",
      slug: "häalahjat",
      description: "Ainutlaatuiset lahjaideat hääparille"
    }
  ];

  return (
    <div>
      {/* Hero section with intro and search */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            Löydä täydellinen lahja
          </h1>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto mb-10">
            Lahjatarpeeseen on suosittelusivusto, jonne olemme keränneet kaikki parhaat lahjaideat
            helpottaaksemme juuri sopivan lahjan löytämistä.
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Etsi lahjaideoita..."
                className="w-full py-3 px-5 pr-14 border-2 border-primary-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
              />
              <button className="absolute right-2 top-2 bg-primary-500 text-white p-2 rounded-full hover:bg-primary-600 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories section with improved styling */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-2xl font-semibold text-secondary-900 mb-8">
          Selaa kategorioittain
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {GIFT_TAGS.map((category) => (
            <Link
              href={`/lahjaideat/${category.toLowerCase().replace(/\s+/g, '-')}`}
              key={category}
              className="bg-white shadow-sm border border-secondary-200 rounded-lg p-4 hover:shadow transition text-center hover:border-primary-200 hover:bg-primary-50"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-2xl font-semibold text-secondary-900 mb-8">
          Suositut lahjaideat
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredCategories.map((category) => (
            <div
              key={category.name}
              className="bg-primary-50 rounded-lg p-8 hover:bg-primary-100 transition"
            >
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-secondary-600 mb-6">{category.description}</p>
              <Button
                href={`/lahjaideat/${category.slug}`}
                variant="primary"
                size="md"
              >
                Näytä kaikki
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-primary-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
            Pysy ajan tasalla
          </h2>
          <p className="text-secondary-600 mb-6 max-w-2xl mx-auto">
            Tilaa uutiskirjeemme ja saa parhaat lahjaideat ja tarjoukset suoraan sähköpostiisi.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Sähköpostiosoitteesi"
              className="flex-1 py-2 px-4 border-2 border-primary-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <Button type="submit" variant="primary" size="md">
              Tilaa
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}