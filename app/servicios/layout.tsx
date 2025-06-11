import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Servicios de Barbería Premium - Cortes Profesionales en Santo Domingo",
  description: "Descubre nuestros servicios de barbería premium en Santo Domingo. Cortes clásicos, a tijera, para niños y adolescentes. +20 años de experiencia. Reserva tu cita ahora.",
  keywords: [
    "servicios barbería Santo Domingo",
    "servicios peluquería Santo Domingo",
    "barbería cerca de mi",
    "peluquería cerca de mi",
    "corte de pelo Santo Domingo",
    "barbería Ensanche Carmelita",
    "peluquería Ensanche Carmelita",
    "barbería República Dominicana",
    "servicios barbería cerca de mi",
    "corte masculino Santo Domingo",
    "corte femenino Santo Domingo",
    "barbería profesional Santo Domingo",
    "mejor barbería Santo Domingo",
    "peluquería Distrito Nacional"
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