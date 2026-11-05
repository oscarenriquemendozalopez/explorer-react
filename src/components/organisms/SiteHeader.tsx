import { useEffect, useRef, useState } from "react";
import type { JSX } from "react";

export function SiteHeader(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  function handleToggleMenu(): void {
    setIsMenuOpen((previous: boolean): boolean => !previous);
  }

  function handleCloseMenu(): void {
    setIsMenuOpen(false);
  }

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const desktopBreakpoint: MediaQueryList =
      window.matchMedia("(min-width: 768px)");

    function handleBreakpointChange(): void {
      setIsMenuOpen(false);
    }

    desktopBreakpoint.addEventListener("change", handleBreakpointChange);
    return () => {
      desktopBreakpoint.removeEventListener("change", handleBreakpointChange);
    };
  }, []);

  return (
    <header className="bg-blue-300 text-neutral-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex min-h-16 items-center justify-between md:min-h-20">
          <a
            href="#inicio"
            onClick={handleCloseMenu}
            className="whitespace-nowrap text-lg font-bold text-neutral-0 sm:text-xl lg:text-2xl"
          >
            Where in the world?
          </a>

          <button
            ref={menuButtonRef}
            id="menu-toggle"
            type="button"
            onClick={handleToggleMenu}
            className="flex size-11 items-center justify-center rounded-md transition-colors hover:bg-purple-600 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 md:hidden"
            aria-controls="main-menu"
            aria-expanded={isMenuOpen}
            aria-label={
              isMenuOpen
                ? "Cerrar menú de navegación"
                : "Abrir menú de navegación"
            }
          >
            <svg
              id="menu-open-icon"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className={isMenuOpen ? "hidden size-6" : "size-6"}
            >
              <path
                strokeLinecap="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              id="menu-close-icon"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className={isMenuOpen ? "size-6" : "hidden size-6"}
            >
              <path
                strokeLinecap="round"
                strokeWidth="2"
                d="M6 6l12 12M18 6 6 18"
              />
            </svg>
          </button>
        </div>

        <nav
          id="main-menu"
          aria-label="Navegación principal"
          className={`${isMenuOpen ? "block" : "hidden"} border-t border-neutral-0/20 pb-4 md:block md:border-0 md:pb-0`}
        >
          <ul className="flex flex-col gap-1 text-sm md:flex-row md:items-center md:gap-5 lg:gap-6">
            <li>
              <a
                href="#inicio"
                onClick={handleCloseMenu}
                className="block border-l-4 border-purple-500 px-3 py-3 font-medium md:border-l-0 md:border-b-2 md:px-0 md:py-2"
                aria-current="page"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#paises"
                onClick={handleCloseMenu}
                className="block rounded-md px-3 py-3 transition-colors hover:bg-purple-200 focus-visible:outline-2 focus-visible:outline-purple-500 md:px-0 md:py-2 md:hover:bg-transparent md:hover:text-purple-500"
              >
                Explorar países
              </a>
            </li>
            <li>
              <a
                href="#acerca-de"
                onClick={handleCloseMenu}
                className="block rounded-md px-3 py-3 transition-colors hover:bg-purple-200 focus-visible:outline-2 focus-visible:outline-purple-500 md:px-0 md:py-2 md:hover:bg-transparent md:hover:text-purple-500"
              >
                Acerca de
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}