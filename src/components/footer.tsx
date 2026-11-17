import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { legalNav, nav, site } from "@/lib/site";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface/60">
      <div className="wrapper grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5 font-display text-xl font-extrabold">
            <Image src="/logo.svg" alt="" width={32} height={32} />
            LoraLabs
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{site.tagline}</p>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LoraLabs GitHub"
            className="mt-6 inline-grid size-10 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-primary/60 hover:text-fg"
          >
            <GithubIcon className="size-5" />
          </a>
        </div>

        <nav aria-label="Sayfalar">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em]">Sayfalar</h2>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Kurumsal">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em]">Kurumsal</h2>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em]">İletişim</h2>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            <li className="flex gap-3">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-link" />
              {site.address}
            </li>
            <li className="flex gap-3">
              <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-link" />
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-fg">
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-link" />
              <a href={site.phoneHref} className="transition-colors hover:text-fg">
                {site.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="wrapper py-6 text-center text-xs text-muted">
          © {site.year} {site.legalName}. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
