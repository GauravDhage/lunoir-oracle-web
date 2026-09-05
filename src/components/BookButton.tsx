import { Instagram } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { INSTAGRAM_URL } from "@/lib/site";

interface BookButtonProps extends Omit<ButtonProps, "asChild"> {
  label?: string;
  withIcon?: boolean;
}

/** Every booking CTA on the site opens the Instagram profile in a new tab. */
export function BookButton({
  label = "Book via Instagram",
  variant = "ink",
  size = "pill",
  withIcon = true,
  ...props
}: BookButtonProps) {
  return (
    <Button asChild variant={variant} size={size} {...props}>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} — opens Instagram in a new tab`}
      >
        {withIcon ? <Instagram aria-hidden="true" /> : null}
        {label}
      </a>
    </Button>
  );
}
