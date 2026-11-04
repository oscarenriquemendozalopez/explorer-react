import type { JSX } from 'react';
import { CountryCard } from './components/CountryCard';
import { paisUno, paisDos, paisTres } from './data/countries-demo';

export default function App(): JSX.Element {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
          Explorer App
        </h1>

        <section
          aria-label="Países de ejemplo"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <CountryCard country={paisUno} />
          <CountryCard country={paisDos} />
          <CountryCard country={paisTres} />
        </section>
      </div>
    </main>
  );
}