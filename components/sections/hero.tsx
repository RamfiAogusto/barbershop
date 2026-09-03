import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone } from "@phosphor-icons/react/dist/ssr"

import { BUSINESS } from "@/lib/site-content"

export function Hero() {
  // La entrada escalona el orden de lectura: primero donde estamos, despues
  // quienes somos, despues como reservar. La animacion sigue la jerarquia,
  // no la decora. Se resuelve con CSS para que el contenido sea visible
  // aunque el JavaScript nunca llegue a ejecutarse.
  return (
    <section
      id="inicio"
      className="relative grid min-h-[100dvh] grid-cols-1 lg:grid-cols-[minmax(0,46fr)_minmax(0,54fr)]"
    >
      {/* Columna de texto */}
      <div className="relative z-10 flex flex-col justify-center px-5 pb-16 pt-28 sm:px-8 lg:pl-10 lg:pr-14 xl:pl-16">
        <div className="hero-rise flex items-center gap-3" style={{ animationDelay: "0.05s" }}>
          <span className="h-[2px] w-8 bg-primary" />
          <span className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {BUSINESS.neighborhood} · {BUSINESS.city}
          </span>
        </div>

        <h1
          className="hero-rise mt-6 font-display text-[clamp(3.6rem,11vw,7rem)] font-bold text-foreground"
          style={{ animationDelay: "0.14s" }}
        >
          El don
          <br />
          del corte
          <span className="mt-4 block font-display text-[clamp(1.1rem,2.4vw,1.5rem)] font-semibold tracking-[0.03em] text-primary">
            Barbería en Santo Domingo
          </span>
        </h1>

        <p
          className="hero-rise mt-7 max-w-[46ch] text-[1.02rem] leading-relaxed text-muted-foreground"
          style={{ animationDelay: "0.24s" }}
        >
          Veinte años cortando en el mismo barrio. Máquina, tijera y navaja, sin
          apuro y sin improvisar.
        </p>

        <div className="hero-rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.32s" }}>
          <a
            href={BUSINESS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-all duration-200 hover:bg-primary-hot active:translate-y-[1px]"
          >
            Reservar
          </a>
          <Link
            href="/servicios"
            className="border border-border px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-foreground transition-colors duration-200 hover:border-primary hover:text-primary active:translate-y-[1px]"
          >
            Ver servicios
          </Link>
        </div>

        <div
          className="hero-rise mt-12 flex flex-col gap-3 border-t border-border pt-7 sm:flex-row sm:gap-10"
          style={{ animationDelay: "0.42s" }}
        >
          <a
            href={BUSINESS.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <MapPin size={17} weight="bold" className="mt-0.5 shrink-0 text-primary" />
            <span>
              {BUSINESS.street}, {BUSINESS.neighborhood}
              <br />
              {BUSINESS.city}, {BUSINESS.region}
            </span>
          </a>
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Phone size={17} weight="bold" className="shrink-0 text-primary" />
            {BUSINESS.phone}
          </a>
        </div>
      </div>

      {/* Columna de imagen */}
      <div className="relative min-h-[58vh] lg:min-h-[100dvh]">
        <Image
          src="/assets/bw/hero.webp"
          alt="Rafa afeitando a un cliente con navaja en D' Rafa Peluquería, Santo Domingo"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 54vw"
          className="object-cover object-center"
        />
        {/* La foto se funde con el carbon en el borde que toca al texto, para
            que no haya una costura dura entre las dos columnas. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent lg:bg-gradient-to-r lg:from-background lg:via-background/10 lg:to-transparent"
        />
      </div>

      {/* Regla de acento que cierra el hero contra la seccion siguiente. */}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 z-20 h-[3px] w-1/3 max-w-[220px] bg-primary lg:w-1/5"
      />
    </section>
  )
}
