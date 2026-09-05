import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  name: string;
  rating: number;
  text: string;
  avatarUrl?: string | null;
  sample?: boolean;
}

export function StarRating({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)} aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          aria-hidden="true"
          className={cn(
            "size-3.5",
            n <= rating ? "fill-gold text-gold" : "text-border",
          )}
        />
      ))}
    </div>
  );
}

export function TestimonialCard({ name, rating, text, avatarUrl, sample }: TestimonialCardProps) {
  return (
    <article className="flex h-full flex-col rounded-sm border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-soft">
      <StarRating rating={rating} />
      <blockquote className="mt-5 flex-1 font-display text-lg leading-relaxed text-ink/85">
        “{text}”
      </blockquote>
      <div className="mt-7 flex min-w-0 items-center gap-3 border-t border-border pt-5">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt=""
            loading="lazy"
            className="size-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary font-display text-sm text-cocoa">
            {name.slice(0, 1).toUpperCase()}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm text-ink">{name}</p>
          {sample ? (
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
              Sample content
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
