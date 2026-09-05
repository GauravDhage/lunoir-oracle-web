import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { BookButton } from "@/components/BookButton";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-border/70 bg-background/92 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 sm:px-8 lg:grid-cols-[auto_1fr_auto]">
        <Logo imgClassName="h-9 sm:h-10" />

        <nav aria-label="Main" className="hidden justify-center lg:flex">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  activeOptions={{ exact: link.to === "/" }}
                  activeProps={{ className: "text-ink after:w-full" }}
                  inactiveProps={{ className: "text-muted-foreground" }}
                  className="relative py-1 text-[0.7rem] uppercase tracking-[0.24em] transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-500 hover:text-ink hover:after:w-full"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2">
          <BookButton
            label="Book your reading"
            size="pill"
            className="hidden lg:inline-flex"
            withIcon={false}
          />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 shrink-0 place-items-center rounded-sm border border-border text-ink transition-colors hover:border-gold lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-border/70 bg-background lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-5 pb-8 pt-6 sm:px-8">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  activeOptions={{ exact: link.to === "/" }}
                  activeProps={{ className: "text-gold" }}
                  className="block border-b border-border/60 py-4 font-display text-2xl text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <BookButton label="Book your reading" size="wide" className="mt-7 w-full" />
          <p className="mt-3 text-center text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
            Bookings happen on Instagram
          </p>
        </nav>
      </div>
    </header>
  );
}
