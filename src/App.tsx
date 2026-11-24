import type { JSX } from "react";
import { Link, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CountryDetailPage from "./pages/CountryDetailPage";

export default function App(): JSX.Element {
  return (
    <Routes>

      <Route path="/" element={<HomePage />} />

      <Route
        path="/country/:code"
        element={<CountryDetailPage />}
      />

      <Route
        path="*"
        element={
          <main className="min-h-screen bg-neutral-50 px-4 py-12 text-neutral-900">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-3xl font-bold">
                Página no encontrada
              </h1>

              <p className="mt-4">
                La dirección que intentaste abrir no existe.
              </p>

              <Link
                to="/"
                className="mt-6 inline-flex min-h-11 items-center rounded-full bg-blue-500 px-5 py-2 font-semibold text-neutral-900 hover:bg-purple-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
              >
                Volver al inicio
              </Link>
            </div>
          </main>
        }
      />
    </Routes>
  );
}
