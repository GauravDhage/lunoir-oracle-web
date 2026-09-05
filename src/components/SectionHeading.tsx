import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { StarRule } from "@/components/Ornaments";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  tone = "light",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <Tag
        className={cn(
          "max-w-3xl text-balance text-3xl leading-[1.12] sm:text-4xl md:text-5xl",
          tone === "dark" ? "text-ivory" : "text-ink",
        )}
      >
        {title}
      </Tag>
      {align === "center" ? <StarRule className="w-full max-w-xs" /> : null}
      {intro ? (
        <p
          className={cn(
            "max-w-2xl text-pretty text-[0.95rem] leading-relaxed",
            tone === "dark" ? "text-ivory/70" : "text-muted-foreground",
          )}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
