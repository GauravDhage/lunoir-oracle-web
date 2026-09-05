import { Link } from "@tanstack/react-router";
import logo from "@/assets/lunoir-logo.png";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  imgClassName,
  onClick,
}: {
  className?: string;
  imgClassName?: string;
  onClick?: () => void;
}) {
  return (
    <Link to="/" onClick={onClick} className={cn("inline-flex shrink-0 items-center", className)}>
      <img
        src={logo}
        alt="Lunoir Oracle"
        width={1024}
        height={640}
        className={cn("h-11 w-auto object-contain", imgClassName)}
      />
    </Link>
  );
}
