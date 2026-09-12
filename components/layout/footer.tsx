import Link from "next/link"
import { FacebookLogo, InstagramLogo, MapPin, Phone } from "@phosphor-icons/react/dist/ssr"

import { BUSINESS, HOURS, NAV_LINKS, YEARS_OF_CRAFT } from "@/lib/site-content"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-10">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="block h-7 w-[3px] bg-primary" />
              <span className="font-display text-2xl font-bold leading-none text-foreground">
                D&apos;RAFA
              </span>
            </Link>
            <p className="mt-5 max-w-[34ch] text-[0.95rem] leading-relaxed text-muted-foreground">
              {BUSINESS.tagline}. Barbería en {BUSINESS.neighborhood}, {BUSINESS.city}, desde
              hace más de {YEARS_OF_CRAFT} años.
            </p>

            <div className="mt-7 flex items-center gap-4">
              <a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de D' Rafa Peluquería"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <InstagramLogo size={22} weight="light" />
              </a>
              <a
                href={BUSINESS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de D' Rafa Peluquería"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <FacebookLogo size={22} weight="light" />
              </a>
            </div>
          </div>

          <nav aria-label="Navegación del pie">
            <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-foreground">
              Navegación
            </h2>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.95rem] text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/faq"
                  className="text-[0.95rem] text-muted-foreground transition-colors hover:text-primary"
                >
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-foreground">
              Horarios
            </h2>
            <dl className="mt-5 space-y-3">
              {HOURS.map((slot) => (
                <div key={slot.days}>
                  <dt className="text-[0.95rem] text-muted-foreground">{slot.days}</dt>
                  <dd className="text-[0.95rem] text-foreground">{slot.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-foreground">
              Contacto
            </h2>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={BUSINESS.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-[0.95rem] text-muted-foreground transition-colors hover:text-primary"
                >
                  <MapPin size={17} weight="bold" className="mt-0.5 shrink-0 text-primary" />
                  <span>
                    {BUSINESS.street}, {BUSINESS.neighborhood}
                    <br />
                    {BUSINESS.city}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BUSINESS.phoneRaw}`}
                  className="flex items-center gap-2.5 text-[0.95rem] text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone size={17} weight="bold" className="shrink-0 text-primary" />
                  {BUSINESS.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.85rem] text-faint">
            {year} {BUSINESS.name}. Todos los derechos reservados.
          </p>
          <p className="text-[0.85rem] text-faint">
            {BUSINESS.neighborhood}, {BUSINESS.city}, {BUSINESS.region}
          </p>
        </div>
      </div>
    </footer>
  )
}
