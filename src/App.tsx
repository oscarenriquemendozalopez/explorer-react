import type { JSX } from "react";
import { CountryCard } from "./components/molecules/CountryCard";
import { paisUno, paisDos, paisTres } from "./data/countries-demo";
import { Header } from "./components/organisms/Header";

function handleSelect(code: string): void {
  console.log("País seleccionado:", code);
}

export default function App(): JSX.Element {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 dark:bg-slate-100">
      <div className="mx-auto max-w-6xl">
        <Header title="Explora países del mundo" >
          <p className="text-black">Consulta la información de los países.</p>
        </Header>

        <section
          className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <CountryCard country={paisUno} onSelect={handleSelect} />
          <CountryCard country={paisDos} onSelect={handleSelect} />
          <CountryCard country={paisTres} onSelect={handleSelect} />
        </section>
      </div>
    </main>
  );
}