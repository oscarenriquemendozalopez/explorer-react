import type { Country } from "../types/country";

export type AppState =
  | { status: "loading" }
  | { status: "success"; data: Country[] }
  | { status: "error"; message: string };