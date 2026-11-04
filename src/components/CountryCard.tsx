import type { JSX } from 'react';
import type { Country } from '../types/country';

interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps): JSX.Element {
  return (
    <article className= "group flex w-full flex-col overflow-hidden rounded-lg border-2 border-transparent bg-white shadow-md
    transition-all duration-300 hover:-translate-y-1 hover:border-purple-600 hover:bg-gray-200 hover:shadow-xl
    focus-within:ring-2 focus-within:ring-purple-500 focus-within:ring-offset-4">
      
      <img
        src={country.flag.url_svg || '/placeholder.png'}
        alt={`Bandera de ${country.names.common}`}
        className="h-44 w-full object-contain p-4"
        loading="lazy"
      />

      <div className="p-5">
        <h2 className="text-xl font-bold text-slate-900 dark:text-dark">
          {country.names.common}
        </h2>

        <p className="mt-3 text-slate-700 dark:text-slate-dark">
          Población: {new Intl.NumberFormat('es-SV').format(country.population)}
        </p>

        <p className="text-slate-700 dark:text-slate-dark">
          Región: {country.region}
        </p>
      </div>
    </article>
  );
}