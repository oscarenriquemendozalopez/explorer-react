import type { Country } from "../types/country";
import type { CountryDetail } from "../types/country-detail";

let countriesPromise: Promise<CountryDetail[]> | undefined;

async function requestCountries(
  signal?: AbortSignal,
): Promise<CountryDetail[]> {
  const response: Response = await fetch(
    `${import.meta.env.BASE_URL}data/countries.json`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(
      `Error al cargar los datos de la demo: ${response.status}`,
    );
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error(
      "El archivo de países está vacío o tiene un formato incorrecto.",
    );
  }

  return data as CountryDetail[];
}

function loadCountries(): Promise<CountryDetail[]> {
    if (!countriesPromise) {
    countriesPromise = requestCountries().catch(
      (error: unknown) => {
        countriesPromise = undefined;
        throw error;
      },
    );
  }

  return countriesPromise;
}

export async function fetchCountries(
  signal?: AbortSignal,
): Promise<Country[]> {
  const countries: CountryDetail[] = signal
    ? await requestCountries(signal)
    : await loadCountries();

  return [...countries];
}

export async function fetchCountryByCode(code: string): Promise<CountryDetail> {
  const countries: CountryDetail[] = await loadCountries();
  const normalizedCode: string = code.trim().toUpperCase();
  const country: CountryDetail | undefined = countries.find(
    (item: CountryDetail): boolean =>
      item.codes.alpha_2.toUpperCase() === normalizedCode,
  );

  if (!country) {
    throw new Error("No se encontró el país solicitado en los datos de la demo.");
  }

  return country;
}