import type { JSX } from "react";
import { Link, useParams } from "react-router-dom";
import { useCountryDetail } from "../hooks/useCountryDetail";
import type { CountryDetail } from "../types/country-detail";
import { formatPopulation, getCapital, getFlagDescription } from "../utils/format";
import { getCountryRouteCode } from "../utils/country-codes";
interface CountryRouteParams {
code: string;
}
interface CountryDetailContentProps {
country: CountryDetail;
}
function CountryDetailContent({ country }: CountryDetailContentProps): JSX.Element {
const nativeName: string = Object.values(country.names.native ?? {})
.map((name): string => name.official || name.common || "")
.find((name: string): boolean => name.length > 0) ?? country.names.common;
const domains: string = country.tlds?.join(", ") || "No disponible";
const currencies: string = country.currencies
?.map((currency): string => currency.name).join(", ") || "No disponible";
const languages: string = country.languages
?.map((language): string => language.name).join(", ") || "No disponible";
const borders: string[] = country.borders ?? [];
return (
<article className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">

<img
src={country.flag.url_svg}
alt={getFlagDescription(country)}
className="aspect-[3/2] w-full rounded-lg object-contain shadow-sm"
/>
<div className="min-w-0">
<h1 className="text-3xl font-bold sm:text-4xl">{country.names.common}</h1>
<div className="mt-8 grid gap-8 text-sm leading-6 sm:grid-cols-2">
<dl className="space-y-2">
<div><dt className="inline font-bold">Nombre nativo: </dt><dd className="inline break-
words">{nativeName}</dd></div>
<div><dt className="inline font-bold">Población: </dt><dd
className="inline">{formatPopulation(country.population)}</dd></div>
<div><dt className="inline font-bold">Región: </dt><dd
className="inline">{country.region}</dd></div>
<div><dt className="inline font-bold">Subregión: </dt><dd className="inline">{country.subregion ||
"No disponible"}</dd></div>
<div><dt className="inline font-bold">Capital: </dt><dd
className="inline">{getCapital(country)}</dd></div>
</dl>
<dl className="space-y-2">
<div><dt className="inline font-bold">Dominio: </dt><dd className="inline break-
words">{domains}</dd></div>
<div><dt className="inline font-bold">Moneda: </dt><dd className="inline">{currencies}</dd></div>
<div><dt className="inline font-bold">Idiomas: </dt><dd className="inline">{languages}</dd></div>
</dl>
</div>
<div className="mt-10 flex flex-wrap items-center gap-3">
<h2 className="text-sm font-semibold">Países fronterizos:</h2>
{borders.length === 0 ? (
<p className="text-sm">Sin fronteras terrestres.</p>
) : borders.map((border: string): JSX.Element => {
// Se mantiene la etiqueta de tres letras y se adapta el destino.
const routeCode: string | undefined = getCountryRouteCode(border);
return routeCode ? (
<Link
key={border}
to={`/country/${encodeURIComponent(routeCode)}`}
className="inline-flex min-h-11 min-w-16 items-center justify-center rounded-lg bg-white px-4 py-2
text-sm text-neutral-900 shadow-sm hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2
focus-visible:outline-orange-500 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
aria-label={`Ver país fronterizo ${border}`}
>
{border}
</Link>
) : (
<span key={border} className="rounded-lg border px-4 py-2 text-sm">
{border} (no disponible)
</span>
);
})}
</div>
</div>
</article>
);
}
export default function CountryDetailPage(): JSX.Element {
const { code } = useParams<keyof CountryRouteParams>();
// Los hooks se invocan antes de cualquier renderizado condicional.
const { state, retry } = useCountryDetail(code);
return (
<div className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900 dark:bg-slate-950 dark:text-white">
<main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
{/* Destino explícito: también funciona al abrir directamente el detalle. */}
<Link
to="/"
className="inline-flex min-h-11 items-center justify-center rounded-full bg-orange-500 px-8 py-2 font-
medium text-neutral-900 hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-
visible:outline-blue-600"
>
← Atrás
</Link>
{state.status === "loading" && (
<p role="status" className="mt-12">Cargando información del país...</p>
)}
{state.status === "error" && (
<section className="mt-12 rounded-lg border border-neutral-300 p-6">
<h1 className="text-2xl font-bold">No se pudo mostrar el país</h1>
<p role="alert" className="mt-3">{state.message}</p>
<button
type="button"
onClick={retry}
className="mt-5 min-h-11 rounded-full bg-orange-500 px-5 py-2 font-semibold text-neutral-900 focus-
visible:outline-2 focus-visible:outline-offset-4"
>
Reintentar
</button>
</section>
)}
{state.status === "success" && (
<CountryDetailContent country={state.data} />
)}
</main>
<footer className="mt-20 bg-blue-500 text-neutral-0">
<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
<p className="text-xs font-bold">Explorer App</p>
<p className="mt-2 text-sm">© 2026 Explorer App. Datos proporcionados por REST Countries.</p>
</div>
</footer>
</div>
);
}
