import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  Baby,
  Eyedropper,
  Feather,
  Knife,
  Scissors,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr"
// El subpath ssr solo exporta componentes; el tipo vive en la raiz.
import type { Icon } from "@phosphor-icons/react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { SectionHeading } from "@/components/sections/section-heading"
import { BUSINESS, SERVICES, YEARS_OF_CRAFT } from "@/lib/site-content"

const ICONS: Record<string, Icon> = {
  scissors: Scissors,
  knife: Knife,
  feather: Feather,
  eyedropper: Eyedropper,
  baby: Baby,
  sparkle: Sparkle,
}

/** Razones que ya declaraba el sitio; ninguna es inventada aquí. */
const REASONS = [
  `Más de ${YEARS_OF_CRAFT} años de oficio en la misma silla`,
  `Local propio en ${BUSINESS.neighborhood}, a minutos del Distrito Nacional`,
  "Asesoramiento según la forma del rostro, no según la moda del mes",
  "Se atiende sin cita, aunque el fin de semana conviene avisar",
  "Bebidas y algo de picar mientras esperas",
  "Efectivo y tarjeta de crédito",
]

/**
 * Lecturas del blog atadas a un servicio concreto de los de arriba.
 *
 * No es relleno de SEO: son los tres posts que Google rastrea y decide no
 * indexar, y hasta ahora ninguna pagina fuerte del sitio les pasaba senal.
 * El widget "Otros articulos" de cada post solo alcanza a los cuatro mas
 * recientes, asi que `tendencias-cortes-masculinos-2026` no recibia un solo
 * enlace interno fuera del indice del blog.
 */
const READINGS = [
  {
    context: "Corte de niños",
    title: "El primer corte de pelo de tu hijo",
    href: "/blog/corte-pelo-ninos-tips-padres",
  },
  {
    context: "Máquina y tijera",
    title: "Tendencias en cortes masculinos 2026",
    href: "/blog/tendencias-cortes-masculinos-2026",
  },
  {
    context: "Después del corte",
    title: "Mantener tu corte entre visitas",
    href: "/blog/rutina-mantenimiento-corte-en-casa",
  },
]

export default function ServiciosPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Encabezado de página: media altura, para no repetir el hero de la portada. */}
        <section className="relative isolate flex min-h-[62vh] items-end overflow-hidden pb-14 pt-32">
          <Image
            src="/assets/bw/interior.webp"
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover object-center"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-background/80" />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/60 to-background/30"
          />

          <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10">
            <Breadcrumbs
              items={[
                { name: "Inicio", href: "/" },
                { name: "Servicios", href: "/servicios" },
              ]}
            />
            <span className="rule-accent" />
            <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,4.8rem)] font-bold text-foreground">
              Servicios
            </h1>
            <p className="mt-5 max-w-[52ch] leading-relaxed text-muted-foreground">
              Todo lo que se hace en el local, con la misma mano y sin apuro. Escribe por
              WhatsApp para confirmar precio y disponibilidad.
            </p>
          </div>
        </section>

        {/* Cada servicio ocupa una fila completa, alternando el lado del número.
            En la portada son tarjetas: aquí el formato tiene que ser otro. */}
        <section className="border-t border-border py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
            <SectionHeading title="Lo que hacemos" ghost="Detalle" />

            <div className="mt-14 border-t border-border">
              {SERVICES.map((service, i) => {
                const IconGlyph = ICONS[service.icon] ?? Scissors
                const unavailable = "unavailable" in service && service.unavailable
                return (
                  <article
                    key={service.id}
                    className="group grid grid-cols-[auto_1fr] items-start gap-6 border-b border-border py-8 transition-colors duration-300 hover:bg-surface sm:grid-cols-[3.5rem_auto_1fr] sm:gap-8 sm:py-10 lg:grid-cols-[3.5rem_auto_minmax(0,20rem)_1fr]"
                  >
                    <span className="tick hidden pt-2 sm:block">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <IconGlyph
                      size={32}
                      weight="light"
                      className={`mt-1 shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                        unavailable ? "text-faint" : "text-primary"
                      }`}
                    />
                    <div>
                      <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                        {service.name}
                      </h2>
                      {unavailable && (
                        <span className="mt-2 inline-block border border-border px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.12em] text-faint">
                          No disponible por ahora
                        </span>
                      )}
                    </div>
                    <p className="col-span-2 max-w-[62ch] leading-relaxed text-muted-foreground sm:col-span-3 lg:col-span-1 lg:pt-1">
                      {service.description}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* Lecturas: misma lista con tick y hairline que los servicios de arriba,
            para que se lea como continuacion y no como un bloque pegado. */}
        <section className="border-t border-border py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
            <SectionHeading title="Lee antes de venir" ghost="Blog" />

            <div className="mt-14 border-t border-border">
              {READINGS.map((reading, i) => (
                <Link
                  key={reading.href}
                  href={reading.href}
                  className="group grid grid-cols-[auto_1fr] items-start gap-6 border-b border-border py-8 transition-colors duration-300 hover:bg-surface sm:grid-cols-[3.5rem_minmax(0,14rem)_1fr_auto] sm:gap-8"
                >
                  <span className="tick hidden pt-2 sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-faint sm:pt-2.5">
                    {reading.context}
                  </span>
                  <h2 className="col-span-2 font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary sm:col-span-1 sm:text-2xl">
                    {reading.title}
                  </h2>
                  <ArrowUpRight
                    size={20}
                    weight="bold"
                    className="hidden shrink-0 self-center text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary sm:block"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Motivos: lista en dos columnas, no tarjetas. Otro ritmo. */}
        <section className="border-t border-border bg-surface py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
            <SectionHeading title="Por qué aquí" ghost="Motivos" />

            <ul className="mt-12 grid grid-cols-1 gap-x-16 gap-y-0 md:grid-cols-2">
              {REASONS.map((reason, i) => (
                <li
                  key={reason}
                  className="flex items-baseline gap-5 border-b border-border py-5"
                >
                  <span className="tick shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="leading-relaxed text-muted-foreground">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Cierre */}
        <section className="border-t border-border py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="rule-accent" />
                <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.2rem)] font-bold text-foreground">
                  ¿Arrancamos?
                </h2>
                <p className="mt-4 max-w-[46ch] leading-relaxed text-muted-foreground">
                  Escríbenos y coordinamos el horario. También puedes pasar directamente
                  por el local.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={BUSINESS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-primary-hot active:translate-y-[1px]"
                >
                  Reservar
                </a>
                <a
                  href={BUSINESS.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 border border-border px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  Cómo llegar
                  <ArrowUpRight
                    size={17}
                    weight="bold"
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
