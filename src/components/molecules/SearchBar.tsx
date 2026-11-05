import type { ChangeEvent } from 'react';

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export function SearchBar({ query, onQueryChange }: SearchBarProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {

    onQueryChange(event.currentTarget.value);
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor="country-search" className="font-medium">
        Buscar país
      </label>
      <input
        id="country-search"
        type="search"
        value={query}
        onChange={handleChange}
        placeholder="Escribe el nombre de un país"
        className="w-full rounded-lg border border-slate-400 px-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#348A95]"
      />
    </div>
  );
}