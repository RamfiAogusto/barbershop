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
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
      style={{ backgroundColor: "#25D366" }}
    >
      <span
        className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping"
        style={{ backgroundColor: "#25D366" }}
      />
      <Image
        src="/assets/whatsapp.svg"
        alt="WhatsApp"
        width={30}
        height={30}
        className="relative z-10 brightness-0 invert"
      />
    </a>
  )
}
