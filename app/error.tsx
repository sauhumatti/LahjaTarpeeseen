'use client';

import { Button } from '../components/Button';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#F99973] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-secondary-900 mb-4">
          Oops! Jotain meni pieleen
        </h1>
        <p className="text-xl text-secondary-600 mb-8">
          Pahoittelemme häiriötä. Yritä uudelleen tai palaa etusivulle.
        </p>
        <div className="space-y-4">
          <Button
            onClick={reset}
            variant="primary"
            size="lg"
          >
            Yritä uudelleen
          </Button>
          <div className="mt-4">
            <Button href="/" variant="secondary" size="lg">
              Palaa etusivulle
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}