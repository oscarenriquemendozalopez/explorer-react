import type { JSX } from "react";

interface BadgeProps {
  region: string;
}

export function Badge({ region }: BadgeProps): JSX.Element {
  return (
    <span className="text-inherit">
      {region}
    </span>
  );
}