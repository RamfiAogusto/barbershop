import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Servicios de Barbería Premium - Cortes Profesionales en Santo Domingo",
  description: "Descubre nuestros servicios de barbería premium en Santo Domingo. Cortes clásicos, a tijera, para niños y adolescentes. +20 años de experiencia. Reserva tu cita ahora.",
  keywords: [
    "servicios barbería Santo Domingo",
    "corte clásico hombre",
    "corte tijera profesional",
    "barbería niños Santo Domingo",
    "peluquería adolescentes",
    "servicios premium barbería",
    "Ensanche Carmelita barbería",
    "corte masculino profesional"
  ],
  openGraph: {
    title: "Servicios de Barbería Premium en Santo Domingo - D' Rafa Peluquería",
    description: "Cortes profesionales, servicios premium y más de 20 años de experiencia. Desde cortes clásicos hasta estilos modernos para todas las edades.",
    images: ['/assets/banner2.webp'],
  },
  alternates: {
    canonical: '/servicios',
  },
}

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 