import { useEffect, useState } from "react";
import type { ChangeEvent, JSX } from "react";
import { SiteHeader } from "./components/organisms/SiteHeader";
import { Header } from "./components/organisms/Header";
import { CountryCard } from "./components/molecules/CountryCard";
import { LoadingState, EmptyState, ErrorState, } from "./components/organisms/CountryStates";
import { fetchCountries } from "./api/countries";
import { filterCountries } from "./utils/filter";
import { paisUno, paisDos, paisTres } from "./data/countries-demo";
import type { Country } from "./types/country";
import type { AppState } from "./utils/app-state";

export default function App(): JSX.Element {
  const [state, setState] = useState<AppState>({ status: "loading" });
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function load(): Promise<void> {
      setState({ status: "loading" });

      try {
        const countries: Country[] = await fetchCountries(
          controller.signal,
        );

        if (active) {
          setState({
            status: "success",
            data: countries,
          });
        }
      } catch (error: unknown) {
        if (!active || controller.signal.aborted) return;

        console.error("Error al cargar los países:", error);

        setState({
          status: "error",
          message: "Verifica tu conexión e inténtalo nuevamente.",
        });
      }
    }

    void load();

    return () => {
      active = false;
      controller.abort();
    };
  }, [retryCount]);

  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  function handleQueryChange(
    event: ChangeEvent<HTMLInputElement>,
  ): void {
    setQuery(event.currentTarget.value);
  }

  function handleRegionChange(
    event: ChangeEvent<HTMLSelectElement>,
  ): void {
    setRegion(event.currentTarget.value);
  }

  function handleRetry(): void {
    setRetryCount((previous) => previous + 1);
  }

  function handleSelect(code: string): void {
    console.log("País seleccionado:", code);
  }

  let content: JSX.Element;

  if (state.status === "loading") {
    content = <LoadingState />;
  } else if (state.status === "error") {
    content = (
      <ErrorState
        message={state.message}
        onRetry={handleRetry}
      />
    );
  } else {
    const hasFilters: boolean =
      debouncedQuery.trim() !== "" || region !== "";

    const filteredCountries: Country[] = filterCountries(
      state.data,
      debouncedQuery,
      region,
    );

    const visibleCountries: Country[] = hasFilters
      ? filteredCountries
      : [paisUno, paisDos, paisTres];

    content =
      visibleCountries.length > 0 ? (
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCountries.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
              onSelect={handleSelect}
            />
          ))}
        </div>
      ) : (
        <EmptyState query={debouncedQuery} />
      );
  }

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900 dark:bg-slate-950 dark:text-white">
      <SiteHeader />

      <main
        id="inicio"
        className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
      >
        <Header title="Explora países del mundo">
          <p>
            Busca un país o filtra por región para consultar su información.
          </p>
        </Header>

        <section
          aria-label="Filtros de países"
          className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_16rem_auto] lg:items-end"
        >
          <div className="relative">
            <label htmlFor="country-search" className="sr-only">
              Buscar un país
            </label>

            <span
              className="pointer-events-none absolute inset-y-0 left-5 flex items-center text-neutral-600"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="size-5"
              >
                <circle cx="11" cy="11" r="7" strokeWidth="2" />
                <path
                  d="m16 16 4 4"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <input
              id="country-search"
              name="country-search"
              type="search"
              placeholder="Buscar un país..."
              autoComplete="off"
              value={query}
              onChange={handleQueryChange}
              className="h-12 w-full rounded-full border border-purple-950 bg-white py-3 pl-12 pr-5 text-base text-neutral-900 placeholder:text-neutral-600 transition-colors duration-200 hover:border-purple-500 focus-visible:border-purple-400 focus-visible:outline-none focus-visible:ring-2"
            />
          </div>

          <div>
            <label
              htmlFor="region-filter"
              className="mb-2 block font-semibold"
            >
              Filtrar por región
            </label>

            <select
              id="region-filter"
              name="region-filter"
              value={region}
              onChange={handleRegionChange}
              className="min-h-11 w-full rounded-sm border border-neutral-300 bg-white px-4 py-2 text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
            >
              <option value="">Todas las regiones</option>
              <option value="Africa">África</option>
              <option value="Americas">América</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europa</option>
              <option value="Oceania">Oceanía</option>
            </select>
          </div>
        </section>

        <section id="paises" aria-labelledby="countries-title">
          <h2
            id="countries-title"
            className="mb-6 font-semibold md:mb-8 md:text-3xl"
          >
            Países destacados
          </h2>

          {content}
        </section>
      </main>

      <footer
        id="acerca-de"
        className="mt-24 border-t border-neutral-300 bg-blue-400 text-white"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-xs font-bold">Explorer App</p>

          <p className="mt-2 text-sm font-light text-neutral-50">
            © 2026 Explorer App. Datos proporcionados por REST Countries.
          </p>
        </div>
      </footer>
    </div>
  );
}