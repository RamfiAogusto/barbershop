import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Preguntas Frecuentes - Barbería D' Rafa Santo Domingo",
  description: "Encuentra respuestas a las preguntas más frecuentes sobre nuestra barbería en Santo Domingo. Horarios, servicios, precios y ubicación en Ensanche Carmelita.",
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