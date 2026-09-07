import { Link } from "react-router-dom";

export function Logo({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Rum Valley home"
    >
      <span className="relative inline-flex h-9 w-9 items-center justify-center bg-primary">
        <svg viewBox="0 0 64 64" className="h-7 w-7" aria-hidden="true">
          <path
            d="M14 44 V20 h22 l8 8 v16 z"
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <circle
            cx="24"
            cy="46"
            r="4.5"
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="2.5"
          />
          <circle
            cx="38"
            cy="46"
            r="4.5"
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="2.5"
          />
          <path d="M36 20 l8 8 h-8 z" fill="hsl(var(--accent))" />
        </svg>
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-accent" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg font-700 tracking-tight ${light ? "text-white" : "text-foreground"}`}
        >
          RUM VALLEY
        </span>
        <span className="text-[10px] font-600 uppercase tracking-[0.22em] text-muted-foreground">
          Truck Parts
        </span>
      </span>
    </Link>
  );
}
