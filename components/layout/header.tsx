"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { List, X, Phone } from "@phosphor-icons/react"

import { BUSINESS, NAV_LINKS } from "@/lib/site-content"
import { cn } from "@/lib/utils"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  // useMotionValueEvent lee el scroll fuera del ciclo de render de React. Un
  // listener de scroll con setState re-renderiza el arbol en cada frame.
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24)
  })

  // Con el menu abierto el fondo no debe moverse: si no, al arrastrar sobre el
  // panel se scrollea la pagina de atras y al cerrar apareces en otro lugar.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled
            ? "border-b border-border bg-background/92 backdrop-blur-md"
            // Sin scroll la barra flota sobre la fotografía del hero. Un velo
            // degradado mantiene legibles el teléfono y la navegación sin
            // cerrar la imagen con una banda sólida.
            : "border-b border-transparent bg-gradient-to-b from-background/85 via-background/45 to-transparent",
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-6 px-5 lg:px-10">
          <Link href="/" className="group flex items-center gap-3" aria-label={BUSINESS.name}>
            {/* Marca tipografica con una barra de acento. Un icono de tijera
                seria el cliche exacto del rubro. */}
            <span className="block h-7 w-[3px] bg-primary transition-all duration-300 group-hover:h-9" />
            <span className="font-display text-2xl font-bold leading-none tracking-tight">
              D&apos;RAFA
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative py-1 text-[0.78rem] font-medium uppercase tracking-[0.11em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="hidden items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground xl:flex"
            >
              <Phone size={16} weight="bold" className="text-primary" />
              {BUSINESS.phone}
            </a>

            <a
              href={BUSINESS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary px-5 py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.11em] text-primary-foreground transition-colors hover:bg-primary-hot"
            >
              Reservar
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              className="p-1 text-foreground lg:hidden"
            >
              <List size={26} weight="bold" />
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[70] bg-background lg:hidden"
        >
          <div className="flex h-[72px] items-center justify-between px-5">
            <span className="font-display text-2xl font-bold">D&apos;RAFA</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar menú" className="p-1">
              <X size={26} weight="bold" />
            </button>
          </div>

          <nav className="flex flex-col px-5 pt-6">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-border py-4 font-display text-3xl font-bold text-foreground"
                >
                  <span className="tick">{String(i + 1).padStart(2, "0")}</span>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="px-5 pt-10">
            <a
              href={BUSINESS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-primary px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.11em] text-primary-foreground"
            >
              Reservar por WhatsApp
            </a>
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="mt-5 flex items-center justify-center gap-2 text-muted-foreground"
            >
              <Phone size={16} weight="bold" className="text-primary" />
              {BUSINESS.phone}
            </a>
          </div>
        </motion.div>
      )}
    </>
  )
}
