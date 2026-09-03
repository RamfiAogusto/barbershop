import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
  description: "Horarios, ubicación, formas de pago, parqueo, cortes para niños y cómo reservar en nuestra barbería de Ensanche Carmelita, Santo Domingo.",
  keywords: [
    "FAQ barbería Santo Domingo",
    "preguntas barbería cerca de mi",
    "horarios peluquería Santo Domingo",
    "precios barbería Ensanche Carmelita",
    "información barbería República Dominicana",
    "contacto peluquería Santo Domingo",
    "servicios barbería cerca de mi"
  ],
  openGraph: {
    title: "FAQ - Barbería D' Rafa Santo Domingo",
    description: "Respuestas a preguntas frecuentes sobre la mejor barbería en Santo Domingo, República Dominicana.",
  },
  alternates: {
    canonical: '/faq',
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 