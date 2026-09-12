import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BUSINESS, NAV_LINKS } from "@/lib/site-content"

// Drops the root layout's canonical '/' and index robots; Next already injects noindex on 404.
export const metadata: Metadata = {
  robots: null,
  alternates: { canonical: null },
}

/**
 * Una URL rota es una visita que ya llegó. La página por defecto de Next la
 * deja en un callejón sin salida; esta la devuelve al camino.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 items-center py-32">
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] lg:gap-24">
            <div>
              <span className="rule-accent" />
              <p className="mt-6 font-display text-[clamp(5rem,16vw,11rem)] font-bold leading-[0.8] text-primary">
                404
              </p>
              <h1 className="mt-6 font-display text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-foreground">
                Esta página no existe
              </h1>
              <p className="mt-5 max-w-[46ch] leading-relaxed text-muted-foreground">
                El enlace que seguiste no lleva a ningún lado. Puede que la dirección
                esté mal escrita o que la página haya cambiado de sitio.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/"
                  className="bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-primary-hot active:translate-y-[1px]"
                >
                  Volver al inicio
                </Link>
                <a
                  href={BUSINESS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 border border-border px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  Escribir por WhatsApp
                  <ArrowUpRight
                    size={17}
                    weight="bold"
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>

            <nav aria-label="Secciones del sitio" className="lg:pt-4">
              <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-foreground">
                Quizá buscabas
              </h2>
              <ul className="mt-6 border-t border-border">
                {NAV_LINKS.map((link, i) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-baseline gap-5 border-b border-border py-4 transition-colors hover:text-primary"
                    >
                      <span className="tick">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
