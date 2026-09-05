import { cn } from "@/lib/utils";

/** Thin celestial rule used between editorial blocks. */
export function StarRule({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden="true">
      <span className="gold-rule max-w-24" />
      <svg viewBox="0 0 24 24" className="size-3 text-gold" fill="currentColor">
        <path d="M12 0l1.6 8.6L22 12l-8.4 3.4L12 24l-1.6-8.6L2 12l8.4-3.4z" />
      </svg>
      <span className="gold-rule max-w-24" />
    </div>
  );
}

/** Restrained star field for dark sections. */
export function StarField({ className }: { className?: string }) {
  const stars = [
    [8, 22, 3.2],
    [18, 68, 2.1],
    [30, 14, 1.8],
    [44, 82, 2.6],
    [57, 34, 1.6],
    [69, 74, 2.4],
    [78, 20, 1.9],
    [88, 58, 3],
    [95, 32, 1.7],
  ] as const;
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {stars.map(([left, top, size], i) => (
        <span
          key={i}
          className="twinkle absolute rounded-full bg-gold"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${i * 0.7}s`,
          }}
        />
      ))}
    </div>
  );
}

export function CrescentGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("text-gold", className)} fill="none" aria-hidden="true">
      <path
        d="M30 4a20 20 0 100 40 16 16 0 010-40z"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.9"
      />
      <path d="M39 8l.9 3.1L43 12l-3.1.9L39 16l-.9-3.1L35 12l3.1-.9z" fill="currentColor" />
    </svg>
  );
}
