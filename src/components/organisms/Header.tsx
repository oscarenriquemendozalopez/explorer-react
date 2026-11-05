import type { JSX, ReactNode } from "react";
import { SearchBar } from "../molecules/SearchBar";
import { RegionFilter } from "../molecules/RegionFilter";

interface HeaderProps {
  title: string;
  children: ReactNode;
  query: string;
  region: string;
  regions: string[];
  onQueryChange: (value: string) => void;
  onRegionChange: (value: string) => void;
}

export function Header({
  title,
  children,
  query,
  region,
  regions,
  onQueryChange,
  onRegionChange,
}: HeaderProps): JSX.Element {
  return (
    <header className="mb-8">
      <h1 className="text-(length:--font-page-title) font-semibold">
        {title}
      </h1>

      <div className="mt-3 text-neutral-600 dark:text-slate-300">
        {children}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <SearchBar
          query={query}
          onQueryChange={onQueryChange}
        />

        <RegionFilter
          region={region}
          regions={regions}
          onRegionChange={onRegionChange}
        />
      </div>
    </header>
  );
}