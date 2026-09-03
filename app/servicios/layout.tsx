import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Servicios y Cortes en Santo Domingo",
  description: "Corte a tijera, corte clásico, tintura temporal, corte femenino y de niños en Ensanche Carmelita. Más de 20 años de experiencia. Reserva por WhatsApp.",
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