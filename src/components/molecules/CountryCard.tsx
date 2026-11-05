import type { JSX } from "react";
import type { Country } from "../../types/country";
import { formatPopulation, getCapital, getFlagDescription, } from "../../utils/format";
import { Badge } from "../atoms/Badge";
import { Flag } from "../atoms/Flag";

interface CountryCardProps {
  country: Country;
  onSelect: (code: string) => void;
}

export function CountryCard({
  country,
  onSelect,
}: CountryCardProps): JSX.Element {
  const capital: string = getCapital(country);
  const flagDescription: string = getFlagDescription(country);
  const formattedPopulation: string = formatPopulation(country.population);
  const code: string = country.codes.alpha_2;

  return (
    <article className="@container group flex w-full max-w-sm flex-col overflow-hidden rounded-lg border-2 border-transparent bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-600 hover:bg-gray-200 hover:shadow-xl focus-within:ring-2 focus-within:ring-purple-500 focus-within:ring-offset-4">
      <div className="flex h-32 w-full items-center justify-center overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-contain">
        <Flag src={country.flag.url_svg} alt={flagDescription} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-5">
        <h2 className="text-(length:--font-country-name) font-bold text-neutral-900">
          {country.names.common}
        </h2>

        <dl className="mt-4 space-y-3 text-base text-neutral-900">
          <div className="grid grid-cols-[84px_minmax(0,1fr)] gap-3">
            <dt className="font-semibold">Población:</dt>
            <dd>{formattedPopulation}</dd>
          </div>

          <div className="grid grid-cols-[84px_minmax(0,1fr)] gap-3">
            <dt className="font-semibold">Región:</dt>
            <dd>
              <Badge region={country.region} />
            </dd>
          </div>

          <div className="grid grid-cols-[84px_minmax(0,1fr)] gap-3">
            <dt className="font-semibold">Capital:</dt>
            <dd>{capital}</dd>
          </div>
        </dl>

        {code ? (
          <button
            type="button"
            className="mt-6 flex min-h-11 w-full items-center justify-center rounded-full bg-blue-200 px-5 py-2 text-lg font-medium text-neutral-900 transition-colors hover:bg-purple-500 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 sm:w-32"
            aria-label={`Ver más información de ${country.names.common}`}
            onClick={() => onSelect(code)}
          >
            Ver más
          </button>
        ) : (
          <p className="mt-6 text-sm text-neutral-600">
            Detalle no disponible para este país.
          </p>
        )}
      </div>
    </article>
  );
}