import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";
import logo from "@/assets/lunoir-logo.png";
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, NAV_LINKS } from "@/lib/site";

const footerLinks = NAV_LINKS.filter((l) => l.label !== "How It Works");

export function Footer() {
  return (
    <footer className="surface-night">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr] md:py-20">
        <div>
          <img
            src={logo}
            alt="Lunoir Oracle"
            width={1024}
            height={640}
            loading="lazy"
            className="h-14 w-auto object-contain"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/60">
            Tarot readings for clarity, guidance and self-discovery. Sessions are arranged
            personally on Instagram.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow">Explore</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-ivory/70 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow">Contact</h2>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-ivory/70 transition-colors hover:text-gold"
              >
                <Instagram className="size-4" aria-hidden="true" />
                {INSTAGRAM_HANDLE}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 break-all text-ivory/70 transition-colors hover:text-gold"
              >
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                {EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:px-8">
          <p className="max-w-4xl text-xs leading-relaxed text-ivory/45">
            Tarot readings are intended for personal reflection and guidance and should not be
            considered a substitute for professional medical, legal, financial, or mental-health
            advice.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-ivory/45">
              © {new Date().getFullYear()} Lunoir Oracle. All rights reserved.
            </p>
            <Link to="/admin" className="text-xs text-ivory/30 transition-colors hover:text-gold">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
