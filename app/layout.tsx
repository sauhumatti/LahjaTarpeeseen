import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Lahjatarpeeseen - Löydä täydellinen lahja',
  description: 'Löydä täydellinen lahja jokaiseen tilanteeseen. Lahjatarpeeseen on suosittelusivusto, jonne olemme keränneet kaikki parhaat lahjaideat.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Lahjatarpeeseen - Löydä täydellinen lahja',
    description: 'Löydä täydellinen lahja jokaiseen tilanteeseen. Lahjatarpeeseen on suosittelusivusto, jonne olemme keränneet kaikki parhaat lahjaideat.',
    url: 'https://lahjatarpeeseen.fi',
    siteName: 'Lahjatarpeeseen',
    locale: 'fi_FI',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fi">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <footer className="bg-[#F9E5C7] mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Lahjatarpeeseen</h3>
                <p className="text-gray-600">
                  Autamme sinua löytämään täydellisen lahjan jokaiseen tilanteeseen.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Pikavalikko</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/lahjaideat" className="text-gray-600 hover:text-primary-600 transition">
                      Lahjaideat
                    </Link>
                  </li>
                  <li>
                    <Link href="/blogi" className="text-gray-600 hover:text-primary-600 transition">
                      Blogi
                    </Link>
                  </li>
                  <li>
                    <Link href="/tietoa" className="text-gray-600 hover:text-primary-600 transition">
                      Tietoa
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Yhteystiedot</h3>
                <p className="text-gray-600">
                  Sähköposti:{' '}
                  <a href="mailto:lahjatarpeeseen@gmail.com" className="text-primary-600 hover:text-primary-700 transition">
                    lahjatarpeeseen@gmail.com
                  </a>
                </p>
              </div>
            </div>
            <div className="border-t border-primary-100 mt-8 pt-8 text-center text-gray-500">
              <p>&copy; {new Date().getFullYear()} Lahjatarpeeseen. Kaikki oikeudet pidätetään.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}