import { Check } from "lucide-react";
import { BookButton } from "@/components/BookButton";
import { CrescentGlyph } from "@/components/Ornaments";
import type { Package } from "@/lib/content";
import { cn } from "@/lib/utils";

export function PricingCard({ pkg, featured = false }: { pkg: Package; featured?: boolean }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-sm border p-8 transition-all duration-500 sm:p-10",
        featured
          ? "border-gold/45 bg-ink text-ivory shadow-soft hover:-translate-y-1 hover:shadow-lift"
          : "border-border bg-card hover:-translate-y-1 hover:border-gold/50 hover:shadow-soft",
      )}
    >
      {featured ? (
        <>
          <span className="absolute -top-3 left-8 bg-gold px-3 py-1 text-[0.6rem] uppercase tracking-[0.28em] text-ink">
            Most complete
          </span>
          <CrescentGlyph className="absolute right-7 top-7 size-10 opacity-60" />
        </>
      ) : null}

      <h3
        className={cn(
          "pr-14 font-display text-2xl uppercase tracking-[0.12em] sm:text-[1.7rem]",
          featured ? "text-ivory" : "text-ink",
        )}
      >
        {pkg.name}
      </h3>

      {pkg.tagline ? (
        <p
          className={cn(
            "mt-3 text-[0.7rem] uppercase tracking-[0.2em]",
            featured ? "text-gold" : "text-muted-foreground",
          )}
        >
          {pkg.tagline}
        </p>
      ) : null}

      <p
        className={cn(
          "mt-7 font-display text-5xl",
          featured ? "text-gold" : "text-ink",
        )}
      >
        {pkg.price}
      </p>

      <span
        className={cn(
          "mt-7 block h-px w-full",
          featured ? "bg-ivory/15" : "bg-border",
        )}
      />

      <ul className="mt-7 flex flex-1 flex-col gap-4">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm leading-relaxed">
            <Check
              className={cn("mt-0.5 size-4 shrink-0", featured ? "text-gold" : "text-gold")}
              aria-hidden="true"
            />
            <span className={featured ? "text-ivory/80" : "text-muted-foreground"}>{feature}</span>
          </li>
        ))}
      </ul>

      <BookButton
        label="Book via Instagram"
        variant={featured ? "gold" : "goldline"}
        size="wide"
        className="mt-9 w-full"
        withIcon={false}
      />
    </article>
  );
}
