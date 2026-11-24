import type { JSX } from "react";
import { Link, useParams } from "react-router-dom";
import { Flag } from "../components/atoms/Flag";
import { useCountryDetail } from "../hooks/useCountryDetail";
import type { CountryDetail } from "../types/country-detail";
import { getCapital, getFlagDescription, formatPopulation } from "../utils/format";
import { getCountryAlpha2 } from "../utils/country-codes";
import { SiteHeader } from "../components/organisms/SiteHeader";
import { SiteFooter } from "../components/organisms/SiteFooter";

interface CountryFieldProps {
  label: string;
  value: string;
}

function CountryField({ label, value }: CountryFieldProps): JSX.Element {
  return (
    <div className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-1 text-sm leading-7">
      <dt className="font-semibold">{label}:</dt>
      <dd className="break-words">{value}</dd>
    </div>
  );
}

function getNativeName(country: CountryDetail): string {
  const nativeName: string | undefined = Object.values(
    country.names.native ?? {},
  )
    .map((name) => name.common ?? name.official)
    .find((name): name is string => Boolean(name));

  return nativeName ?? "Sin nombre nativo registrado";
}

export default function CountryDetailPage(): JSX.Element {
  const { code } = useParams<{ code: string }>();
  const { state, retry } = useCountryDetail(code);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900">
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* El enlace absoluto también funciona al abrir directamente esta ruta. */}
        <Link
          to="/"
          className="flex min-h-11 w-full items-center justify-center rounded-full bg-purple-500 px-5 py-2 text-lg font-medium text-neutral-900 transition-all duration-200 hover:bg-purple-600 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:w-32"
        >
          <span aria-hidden="true">←</span>&nbsp; Atrás
        </Link>

        {state.status === "loading" ? (
          <p
            className="mt-12 text-center text-neutral-600"
            role="status"
            aria-live="polite"
          >
            Cargando información del país...
          </p>
        ) : state.status === "error" ? (
          <section
            className="mt-12 rounded-lg bg-neutral-0 p-6 shadow-sm"
            role="alert"
          >
            <h1 className="text-xl font-bold">No se pudo mostrar el país</h1>
            <p className="mt-2">{state.message}</p>
            {code?.trim() && (
              <button
                type="button"
                onClick={retry}
                className="mt-5 min-h-11 rounded-full bg-purple-500 px-5 py-2 font-semibold hover:bg-purple-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
              >
                Reintentar
              </button>
            )}
          </section>
        ) : (
          <CountryDetails country={state.country} />
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

interface CountryDetailsProps {
  country: CountryDetail;
}

function CountryDetails({ country }: CountryDetailsProps): JSX.Element {
  const currencies: string =
    country.currencies
      ?.map((currency) =>
        currency.symbol
          ? `${currency.name} (${currency.symbol})`
          : currency.name,
      )
      .join(", ") || "Sin moneda registrada";
  const languages: string =
    country.languages?.map((language) => language.name).join(", ") ||
    "Sin idiomas registrados";
  const domains: string =
    country.tlds?.filter(Boolean).join(", ") || "Sin dominio registrado";
  const borders: string[] = country.borders ?? [];

  return (
    <section
      aria-labelledby="detail-title"
      className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16"
    >
      <Flag
        src={country.flag.url_svg}
        alt={getFlagDescription(country)}
        fit="contain"
        className="rounded-md bg-neutral-0 shadow-md"
      />

      <div className="min-w-0">
        <h1
          id="detail-title"
          className="text-(length:--font-page-title) font-bold text-neutral-900 md:text-4xl"
        >
          {country.names.common}
        </h1>

        <div className="mt-8 grid gap-8 text-sm leading-7 text-neutral-900 sm:grid-cols-2">
          <dl className="space-y-1">
            <CountryField label="Nombre nativo" value={getNativeName(country)} />
            <CountryField
              label="Población"
              value={formatPopulation(country.population)}
            />
            <CountryField label="Región" value={country.region || "Sin región registrada"} />
            <CountryField
              label="Subregión"
              value={country.subregion || "Sin subregión registrada"}
            />
            <CountryField label="Capital" value={getCapital(country)} />
          </dl>

          <dl className="mt-0 space-y-1">
            <CountryField label="Dominio" value={domains} />
            <CountryField label="Moneda" value={currencies} />
            <CountryField label="Idiomas" value={languages} />
          </dl>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <h2 className="font-semibold text-neutral-900">Países fronterizos:</h2>
          {borders.length === 0 ? (
            <p className="text-sm text-neutral-600">Sin fronteras terrestres</p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {borders.map((borderCode: string) => {
                const alpha2Code: string | undefined =
                  getCountryAlpha2(borderCode);

                return (
                  <li key={borderCode}>
                    {alpha2Code ? (
                      <Link
                        to={`/country/${encodeURIComponent(alpha2Code)}`}
                        className="inline-flex min-h-10 min-w-14 items-center justify-center rounded-md bg-neutral-0 px-4 py-2 text-sm shadow-sm transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                        aria-label={`Ver ${borderCode}`}
                      >
                        {borderCode}
                      </Link>
                    ) : (
                      <span className="inline-flex min-h-10 min-w-14 items-center justify-center rounded-md bg-neutral-0 px-4 py-2 text-sm shadow-sm">
                        {borderCode}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}