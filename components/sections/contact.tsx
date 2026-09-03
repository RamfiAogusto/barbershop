"use client"

import { motion, useReducedMotion } from "framer-motion"
import { FacebookLogo, InstagramLogo, MapPin, Phone, WhatsappLogo } from "@phosphor-icons/react"

import { BUSINESS } from "@/lib/site-content"
import { SectionHeading } from "./section-heading"

const CHANNELS = [
  {
    icon: MapPin,
    label: "Dónde estamos",
    value: `${BUSINESS.street}, ${BUSINESS.neighborhood}`,
    detail: `${BUSINESS.city}, ${BUSINESS.region}`,
    href: BUSINESS.maps,
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: BUSINESS.phone,
    detail: "Llamadas de martes a domingo",
    href: `tel:${BUSINESS.phoneRaw}`,
  },
  {
    icon: WhatsappLogo,
    label: "WhatsApp",
    value: "Reservar una cita",
    detail: "La forma más rápida de agendar",
    href: BUSINESS.whatsapp,
  },
]

export function Contact() {
  const reduce = useReducedMotion()

  return (
    <section id="contacto" className="border-t border-border bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          title="Pasá por el local"
          ghost="Contacto"
          lead="Estamos en Ensanche Carmelita, a pocos minutos de cualquier punto del Distrito Nacional."
        />

        <div className="mt-16 grid grid-cols-1 gap-px bg-border md:grid-cols-3">
          {CHANNELS.map((channel, i) => (
            <motion.a
              key={channel.label}
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-surface p-8 transition-colors duration-300 hover:bg-surface-raised lg:p-10"
            >
              <channel.icon size={26} weight="light" className="text-primary" />
              <span className="mt-6 block text-[0.7rem] font-medium uppercase tracking-[0.16em] text-faint">
                {channel.label}
              </span>
              <span className="mt-2 block font-display text-2xl font-semibold text-foreground">
                {channel.value}
              </span>
              <span className="mt-2 block text-[0.9rem] leading-snug text-muted-foreground">
                {channel.detail}
              </span>
              <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-5">
          <a
            href={BUSINESS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de D' Rafa Peluquería"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <InstagramLogo size={24} weight="light" />
          </a>
          <a
            href={BUSINESS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook de D' Rafa Peluquería"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <FacebookLogo size={24} weight="light" />
          </a>
        </div>
      </div>
    </section>
  )
}
