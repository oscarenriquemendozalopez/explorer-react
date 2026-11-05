import type { JSX, ReactNode } from "react";

interface HeaderProps {
  title: string;
  children: ReactNode;
}

export function Header({ title, children }: HeaderProps): JSX.Element {
  return (
    <header className="mb-8">
      <h1 className="text-(length:--font-page-title) font-semibold">
        {title}
      </h1>
      <div className="mt-3 text-neutral-600 dark:text-slate-300">
        {children}
      </div>
    </header>
  );
}