import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reservar Cita Online - D' Rafa Peluquería Santo Domingo",
  description: "Reserva tu cita online en D' Rafa Peluquería. Sistema de reservas fácil y rápido. Elige tu servicio, fecha y horario preferido. Confirmación inmediata.",
  keywords: [
    "reservar cita barbería",
    "cita online peluquería",
    "reservas D' Rafa Peluquería",
    "agendar cita barbero",
    "reserva online Santo Domingo",
    "cita barbería Ensanche Carmelita"
  ],
  openGraph: {
    title: "Reservar Cita Online - D' Rafa Peluquería",
    description: "Sistema de reservas online fácil y rápido. Elige tu servicio, fecha y horario preferido.",
  },
  alternates: {
    canonical: '/reservar',
  },
}

export default function ReservarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 