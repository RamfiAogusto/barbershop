'use client'

import Image from "next/image"
import { trackWhatsAppClick } from "@/lib/analytics"

export function FloatingWhatsApp() {
  const href = "https://wa.me/18097672490?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20una%20cita"

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Reservar por WhatsApp"
      onClick={() => trackWhatsAppClick('floating-button')}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center bg-primary transition-colors duration-200 hover:bg-primary-hot sm:h-16 sm:w-16"
    >
      <Image
        src="/assets/whatsapp.svg"
        alt=""
        aria-hidden
        width={28}
        height={28}
        className="brightness-0 invert"
      />
    </a>
  )
}
