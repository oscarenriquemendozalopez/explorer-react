import type { JSX } from "react";
import type { Country } from "../../types/country";
import { CountryCard } from "../molecules/CountryCard";

interface CountryGridProps {
  countries: Country[];
  onSelect: (code: string) => void;
}

export function CountryGrid({
  countries,
  onSelect,
}: CountryGridProps): JSX.Element {
  return (
    <section
      aria-label="Listado de países"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4"
    >
      {countries.map((country: Country): JSX.Element => (
        <CountryCard
          key={country.codes.alpha_2}
          country={country}
          onSelect={onSelect}
        />
      ))}
    </section>
  );
}