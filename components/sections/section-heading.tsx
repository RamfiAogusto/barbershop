"use client"

import { m, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

type Props = {
  /** Titulo visible de la seccion. */
  title: string
  /** Palabra enorme y casi apagada que se apoya detras del titulo. */
  ghost?: string
  /** Bajada opcional, apilada bajo el titulo. */
  lead?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({ title, ghost, lead, align = "left", className }: Props) {
  const reduce = useReducedMotion()

  return (
    <div className={cn("relative", align === "center" && "text-center", className)}>
      {ghost && (
        <span
          aria-hidden
          className={cn(
            "ghost-word absolute -top-12 z-0 select-none text-[clamp(4rem,13vw,9.5rem)] sm:-top-16",
            align === "center" ? "left-1/2 -translate-x-1/2" : "-left-1",
          )}
        >
          {ghost}
        </span>
      )}

      <m.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <span className={cn("rule-accent", align === "center" && "mx-auto")} />
        <h2 className="mt-5 font-display text-[clamp(2.1rem,5.2vw,3.4rem)] font-bold text-foreground">
          {title}
        </h2>
        {lead && (
          <p
            className={cn(
              "mt-4 max-w-[58ch] leading-relaxed text-muted-foreground",
              align === "center" && "mx-auto",
            )}
          >
            {lead}
          </p>
        )}
      </m.div>
    </div>
  )
}
