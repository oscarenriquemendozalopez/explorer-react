import { useEffect, useState } from "react";
import type { JSX } from "react";
import { SiteHeader } from "./components/organisms/SiteHeader";
import { Header } from "./components/organisms/Header";
import { CountryCard } from "./components/molecules/CountryCard";
import { LoadingState, EmptyState, ErrorState, } from "./components/organisms/CountryStates";
import { fetchCountries } from "./api/countries";
import { filterCountries } from "./utils/filter";
import { paisUno, paisDos, paisTres, } from "./data/countries-demo";
import type { Country } from "./types/country";
import type { AppState } from "./utils/app-state";


export default function App(): JSX.Element {
  const [state, setState] = useState<AppState>({ status: "loading" });
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [retryCount, setRetryCount] = useState<number>(0);

   const regions: string[] =
    state.status === "success"
      ? Array.from(
          new Set(state.data.map((country) => country.region)),
        )
          .filter((item) => item.trim().length > 0)
          .sort()
      : [];

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

  function handleRetry(): void {
    setRetryCount((previous) => previous + 1);
  }

  function clearFilters(): void {
    setQuery("");
    setDebouncedQuery("");
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
      <ErrorState
        message={state.message}
        onRetry={handleRetry}
      />
    );
  } else {
    const hasFilters =
      debouncedQuery.trim() !== "" || region !== "";

    const filteredCountries = filterCountries(
      state.data,
      debouncedQuery,
      region,
    );

    const visibleCountries = hasFilters
      ? filteredCountries
      : [paisUno, paisDos, paisTres];

    content =
      visibleCountries.length > 0 ? (
        <div className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

        <button type="button" onClick={clearFilters}>
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