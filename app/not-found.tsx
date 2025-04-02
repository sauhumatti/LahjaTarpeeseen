import Link from 'next/link';
import { Button } from '../components/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F99973] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-secondary-900 mb-4">
          404 - Sivua ei löytynyt
        </h1>
        <p className="text-xl text-secondary-600 mb-8">
          Valitettavasti etsimääsi sivua ei löytynyt. Oletko varma, että osoite on oikein?
        </p>
        <div className="space-y-4">
          <Button href="/" variant="primary" size="lg">
            Palaa etusivulle
          </Button>
          <div className="mt-4">
            <Link href="/lahjaideat" className="text-secondary-600 hover:text-secondary-700">
              Selaa lahjaideoita
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}