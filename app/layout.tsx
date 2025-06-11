import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "D' Rafa Peluquería - Barbería Premium en Santo Domingo con +20 Años",
    template: "%s | D' Rafa Peluquería"
  },
  description: "Barbería premium en Santo Domingo con más de 20 años de experiencia. Cortes de pelo masculinos y femeninos, tintura temporal y servicios de alta calidad. Reserva tu cita ahora.",
  keywords: [
    "peluquería Santo Domingo",
    "barbería Santo Domingo",
    "peluquería cerca de mi",
    "barbería cerca de mi",
    "barbería Ensanche Carmelita",
    "peluquería Ensanche Carmelita",
    "corte de pelo Santo Domingo",
    "barbero profesional Santo Domingo",
    "peluquería República Dominicana",
    "barbería premium República Dominicana",
    "corte masculino Santo Domingo",
    "corte femenino Santo Domingo",
    "D Rafa peluquería",
    "mejor barbería Santo Domingo",
    "peluquería Distrito Nacional"
  ],
  authors: [{ name: "D' Rafa Peluquería" }],
  creator: "D' Rafa Peluquería",
  publisher: "D' Rafa Peluquería",
  generator: 'Next.js',
  applicationName: "D' Rafa Peluquería",
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://drafapeluqueria.com'), // Reemplaza con tu dominio real
  alternates: {
    canonical: '/',
    languages: {
      'es-DO': '/',
      'es': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_DO',
    url: 'https://drafapeluqueria.com',
    title: "D' Rafa Peluquería - Barbería Premium en Santo Domingo",
    description: "Barbería premium con más de 20 años de experiencia en Santo Domingo. Cortes profesionales, tintura temporal y servicios de alta calidad.",
    siteName: "D' Rafa Peluquería",
    images: [
      {
        url: '/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "D' Rafa Peluquería - Barbería Premium Santo Domingo",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "D' Rafa Peluquería - Barbería Premium en Santo Domingo",
    description: "Barbería premium con más de 20 años de experiencia. Cortes profesionales y servicios de alta calidad.",
    images: ['/assets/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'tu-google-verification-code', // Reemplazar con tu código real
  },
  category: 'business',
  icons: {
    icon: '/iconbarber.svg',
    shortcut: '/iconbarber.svg',
    apple: '/iconbarber.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/placeholder.jpg"
          as="image"
          type="image/jpeg"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f59e0b" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <Providers attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
