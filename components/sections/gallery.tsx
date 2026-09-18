"use client"

import Image from "next/image"
import { m, useReducedMotion } from "framer-motion"

import { GALLERY } from "@/lib/site-content"
import { SectionHeading } from "./section-heading"
import { cn } from "@/lib/utils"

/**
 * Rejilla deliberadamente despareja: la primera pieza ocupa el doble de alto.
 * Cuatro celdas iguales darian el mismo ritmo plano que tenia el sitio viejo.
 */
const SPAN = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-2",
  "",
  "",
]

export function Gallery() {
  const reduce = useReducedMotion()

  return (
    <section id="galeria" className="border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <SectionHeading title="El trabajo" ghost="Galería" />

        <div className="mt-16 grid auto-rows-[190px] grid-cols-2 gap-3 sm:auto-rows-[230px] sm:grid-cols-4 sm:gap-4 lg:auto-rows-[280px]">
          {GALLERY.map((shot, i) => (
            <m.figure
              key={shot.src}
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "group relative overflow-hidden bg-surface",
                SPAN[i],
              )}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
              />
              {/* El acento solo aparece al enfocar la pieza, para que el rojo
                  no compita con la fotografia en reposo. */}
              <span className="pointer-events-none absolute inset-0 border-2 border-transparent transition-colors duration-300 group-hover:border-primary" />
            </m.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
