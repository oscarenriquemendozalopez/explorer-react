import type { JSX, SyntheticEvent } from "react";

interface FlagProps {
  src: string;
  alt: string;
}

function handleFlagError(event: SyntheticEvent<HTMLImageElement>): void {
  const image: HTMLImageElement = event.currentTarget;
  const fallbackUrl: string = `${import.meta.env.BASE_URL}placeholder.png`;

  if (image.src === new URL(fallbackUrl, window.location.href).href) return;
  image.src = fallbackUrl;
}

export function Flag({ src, alt }: FlagProps): JSX.Element {
  const flagUrl: string =
    src || `${import.meta.env.BASE_URL}placeholder.png`;

  return (
    <img
      className="w-2/5 shrink-0 self-stretch object-cover @min-[20rem]:h-[218] @min-[20rem]:w-full"
      src={flagUrl}
      alt={alt}
      loading="lazy"
      onError={handleFlagError}
    />
  );
}