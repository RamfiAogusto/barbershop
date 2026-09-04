"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowUpRight,
  Baby,
  Eyedropper,
  Feather,
  Knife,
  Scissors,
  Sparkle,
  type Icon,
} from "@phosphor-icons/react"

import { SERVICES } from "@/lib/site-content"
import { SectionHeading } from "./section-heading"

const ICONS: Record<string, Icon> = {
  scissors: Scissors,
  knife: Knife,
  feather: Feather,
  eyedropper: Eyedropper,
  baby: Baby,
  sparkle: Sparkle,
}

export function Services() {
  const reduce = useReducedMotion()

  return (
    <section id="servicios" className="relative border-t border-border bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          title="Lo que hacemos"
          ghost="Servicios"
          lead="Seis servicios, todos con la misma mano. Escribe por WhatsApp para confirmar precio y disponibilidad del que necesites."
        />

        {/* Las tarjetas se separan con lineas, no con cajas: la reja de
            hairlines mantiene la densidad baja sin encerrar cada servicio. */}
        <div className="mt-16 grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const IconGlyph = ICONS[service.icon] ?? Scissors
            return (
              <motion.article
                key={service.id}
                initial={reduce ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-surface p-8 transition-colors duration-300 hover:bg-surface-raised lg:p-10"
              >
                <div className="flex items-start justify-between">
                  <IconGlyph size={30} weight="light" className="text-primary" />
                  <span className="tick">{String(i + 1).padStart(2, "0")}</span>
                </div>

                <h3 className="mt-7 font-display text-2xl font-semibold text-foreground">
                  {service.name}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                {/* La linea crece bajo el titulo al pasar el cursor: confirma
                    cual tarjeta esta activa sin mover el layout. */}
                <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </motion.article>
            )
          })}
        </div>

        <div className="mt-14">
          <Link
            href="/servicios"
            className="group inline-flex items-center gap-3 border border-border px-7 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Ver todos los servicios
            <ArrowUpRight
              size={17}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
