"use client"

import Image from "next/image"
import { m, useReducedMotion } from "framer-motion"
import { Clock } from "@phosphor-icons/react"

import { BUSINESS, HOURS } from "@/lib/site-content"

export function HoursBand() {
  const reduce = useReducedMotion()

  return (
    <section className="relative isolate overflow-hidden py-24 lg:py-32">
      {/* Banda a sangre completa: el local es el fondo, no una tarjeta más. */}
      <Image
        src="/assets/bw/interior.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-background/82" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/70 to-background/40"
      />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <m.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24"
        >
          <div>
            <span className="rule-accent" />
            <h2 className="mt-5 font-display text-[clamp(2.1rem,5vw,3.4rem)] font-bold text-foreground">
              La silla está lista
              <br />
              cuando tú quieras
            </h2>
            <p className="mt-6 max-w-[46ch] leading-relaxed text-muted-foreground">
              Aceptamos clientes sin cita, pero los fines de semana se llena. Un mensaje
              por WhatsApp te asegura el horario.
            </p>
            <a
              href={BUSINESS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-block bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-primary-hot active:translate-y-[1px]"
            >
              Reservar
            </a>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <Clock size={20} weight="bold" className="text-primary" />
              <span className="font-display text-xl font-semibold text-foreground">Horarios</span>
            </div>

            <dl className="mt-7">
              {HOURS.map((slot) => (
                <div
                  key={slot.days}
                  className="flex items-baseline justify-between gap-6 border-b border-border py-4"
                >
                  <dt className="text-[0.95rem] text-muted-foreground">{slot.days}</dt>
                  <dd
                    className={
                      "closed" in slot && slot.closed
                        ? "font-display text-lg font-semibold tracking-wide text-muted-foreground"
                        : "font-display text-lg font-semibold tracking-wide text-foreground"
                    }
                  >
                    {slot.time}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </m.div>
      </div>
    </section>
  )
}
