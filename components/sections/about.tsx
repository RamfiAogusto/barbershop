"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"

import { BUSINESS } from "@/lib/site-content"
import { SectionHeading } from "./section-heading"

const FACTS = [
  { value: "2005", label: "Cortando en Ensanche Carmelita" },
  { value: "4.9", label: "Calificación en Google" },
  { value: "6", label: "Días abiertos por semana" },
]

export function About() {
  const reduce = useReducedMotion()

  return (
    <section id="nosotros" className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
          {/* La foto va primero en pantallas grandes: es la que sostiene el
              argumento de oficio antes que el texto. */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/assets/bw/nosotros.webp"
                alt="Rafa, maestro barbero de D' Rafa Peluquería, trabajando en su silla"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
            {/* Sello de años, montado sobre el borde de la foto. */}
            <div className="absolute -bottom-5 -right-4 bg-primary px-6 py-4 sm:-right-6 sm:px-8 sm:py-5">
              <span className="block font-display text-4xl font-bold leading-none text-primary-foreground sm:text-5xl">
                +{BUSINESS.yearsOfCraft}
              </span>
              <span className="mt-1 block text-[0.68rem] font-medium uppercase tracking-[0.16em] text-primary-foreground/80">
                Años de oficio
              </span>
            </div>
          </motion.div>

          <div className="flex flex-col justify-center">
            <SectionHeading
              title="Una barbería, un barbero, veinte años"
              ghost="Oficio"
            />

            <div className="mt-8 space-y-5 text-[1.02rem] leading-relaxed text-muted-foreground">
              <p>
                D&apos; Rafa no es una cadena ni una franquicia. Es un local en{" "}
                {BUSINESS.neighborhood} donde Rafa lleva dos décadas cortando el pelo de
                la misma gente, y ahora de sus hijos.
              </p>
              <p>
                Acá nadie te apura para pasar al siguiente. Se corta a máquina, a tijera
                y a navaja según lo que pida la cabeza que está en la silla, no según lo
                que sea más rápido de despachar.
              </p>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {FACTS.map((fact, i) => (
                <motion.div
                  key={fact.value}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <dt className="font-display text-[2.1rem] font-bold leading-none text-primary sm:text-[2.6rem]">
                    {fact.value}
                  </dt>
                  <dd className="mt-2 text-[0.8rem] leading-snug text-faint">{fact.label}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
