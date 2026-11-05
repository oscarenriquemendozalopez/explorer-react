import type { Country } from "../types/country";

export const paisUno: Country = {
  names: { common: "El Salvador" },
  codes: { alpha_2: "SV" },
  flag: { url_svg: "/flags/El Salvador.png", description: "Bandera de El Salvador",},
  population: 6400000,
  region: "América",
  capitals: [{ name: "San Salvador" }],
};

export const paisDos: Country = {
  names: { common: "Japón" },
  codes: { alpha_2: "JP" },
  flag: { url_svg: "/flags/Japon.png", description: "Bandera de Japón", },
  population: 122400000,
  region: "Asia",
  capitals: [{ name: "Tokio" }],
};

export const paisTres: Country = {
  names: { common: "Canadá" },
  codes: { alpha_2: "CA" },
  flag: { url_svg: "/flags/Canada.svg", description: "Bandera de Canadá",},
  population: 41798407,
  region: "América",
  capitals: [{ name: "Ottawa" }],
};

export const countriesDemo: Country[] = [
  paisUno,
  paisDos,
  paisTres,
];