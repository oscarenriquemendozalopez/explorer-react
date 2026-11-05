import type { ChangeEvent } from "react";

interface RegionFilterProps {
  region: string;
  regions: string[];
  onRegionChange: (value: string) => void;
}

export function RegionFilter({
  region,
  regions,
  onRegionChange,
}: RegionFilterProps) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    onRegionChange(event.currentTarget.value);
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor="country-region" className="font-medium">
        Filtrar por región
      </label>

      <select
        id="country-region"
        value={region}
        onChange={handleChange}
        className="w-full rounded-lg border border-purple-400 bg-white px-4 py-3 text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9CA1C9]"
      >
        <option value="" className="bg-white text-black">
          Todas las regiones
        </option>

        {regions.map((item) => (
          <option key={item} value={item} className="bg-white text-black">
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}