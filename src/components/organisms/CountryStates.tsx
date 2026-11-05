import type { JSX } from "react";

interface EmptyStateProps {
  query: string;
}

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function LoadingState(): JSX.Element {
  return (
    <>
      {Array.from({ length: 8 }, (_, index: number) => (
        <article
          key={index}
          className="animate-pulse overflow-hidden rounded-xl bg-neutral-0 shadow-md"
          aria-hidden="true"
        >
          <div className="h-40 bg-neutral-300" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-3/4 rounded bg-neutral-300" />
            <div className="h-4 w-full rounded bg-neutral-300" />
            <div className="h-4 w-2/3 rounded bg-neutral-300" />
          </div>
        </article>
      ))}
      <span className="sr-only" role="status">
        Cargando países…
      </span>
    </>
  );
}

export function EmptyState({
  query,
}: EmptyStateProps): JSX.Element {
  const description: string = query.trim()
    ? `No encontramos resultados para “${query}”.`
    : "No encontramos países para el filtro seleccionado.";

  return (
    <section
      className="col-span-full rounded-xl border border-neutral-300 bg-neutral-0 px-6 py-12 text-center"
      role="status"
    >
      <h2 className="text-xl font-bold text-neutral-900">
        No hay resultados
      </h2>
      <p className="mt-2 text-neutral-600">
        {description}
      </p>
      <p className="mt-1 text-sm text-neutral-600">
        Revisa el nombre o prueba con otra región.
      </p>
    </section>
  );
}

export function ErrorState({
  message,
  onRetry,
}: ErrorStateProps): JSX.Element {
  return (
    <section
      className="col-span-full rounded-xl border border-red-300 bg-red-50 px-6 py-12 text-center"
      role="alert"
    >
      <h2 className="text-xl font-bold text-red-700">
        No pudimos cargar los países
      </h2>
      <p className="mt-2 text-red-600">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 rounded-lg bg-purple-200 px-5 py-3 font-semibold text-black transition hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        Reintentar
      </button>
    </section>
  );
}