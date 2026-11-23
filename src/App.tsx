import type { ChangeEvent, JSX } from "react";
import { useCountries } from "./hooks/useCountries";
import { useSearch } from "./hooks/userSearch";

import { Header } from "./components/organisms/Header";
import { SiteHeader } from "./components/organisms/SiteHeader";
import { CountryGrid } from "./components/organisms/CountryGrid";

import { LoadingState, EmptyState, ErrorState, } from "./components/organisms/CountryStates";
import type { Country } from "./types/country";

export default function App(): JSX.Element {
  const { state, retry } = useCountries();

  const countries: Country[] =
    state.status === "success" ? state.data : [];

  const {
    query,
    debouncedQuery,
    region,
    visibleCountries,
    setQuery,
    setRegion,
  } = useSearch(countries);

  const regions = Array.from(
    new Set(countries.map((country) => country.region).filter(Boolean)),
  ).sort();

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>): void {
    setQuery(event.currentTarget.value);
  }

  function handleRegionChange(event: ChangeEvent<HTMLSelectElement>): void {
    setRegion(event.currentTarget.value);
  }

  function handleClearFilters(): void {
    setQuery("");
    setRegion("");
  }

  function handleSelect(code: string): void {
    console.log("País seleccionado:", code);
  }

  let content: JSX.Element;

  if (state.status === "loading") {
    content = <LoadingState />;
  } else if (state.status === "error") {
    content = (
      <ErrorState message={state.message} onRetry={retry} />
    );
  } else {
    content =
      visibleCountries.length > 0 ? (
        <CountryGrid
          countries={visibleCountries}
          onSelect={handleSelect}
        />
      ) : (
        <EmptyState query={debouncedQuery} />
      );
  }

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900 dark:bg-slate-950 dark:text-white">
      <SiteHeader />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <Header
          title="Explora países del mundo"
          query={query}
          region={region}
          regions={regions}
          onQueryChange={setQuery}
          onRegionChange={setRegion}
        >
          <p>
            Busca un país o filtra por región para consultar su información.
          </p>
        </Header>

        <button type="button" onClick={handleClearFilters}>
          Limpiar filtros
        </button>

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
