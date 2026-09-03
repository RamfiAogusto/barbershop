import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp"
import { GoogleAnalytics } from "@next/third-parties/google"
import { LocalBusinessSchema } from "@/components/seo/local-business-schema"
import { GoogleReviewsSchema } from "@/components/seo/google-reviews-schema"
import { fetchGoogleReviews } from "@/lib/google-reviews"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Barbería en Santo Domingo · +20 Años — D' Rafa Peluquería",
    template: "%s | D' Rafa Peluquería"
  },
  description: "Barbería y peluquería en Ensanche Carmelita, Santo Domingo. Más de 20 años de experiencia en corte masculino, femenino y de niños. Reserva por WhatsApp.",
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
  metadataBase: new URL('https://www.drafapeluqueria.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_DO',
    url: 'https://www.drafapeluqueria.com',
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
  category: 'business',
  icons: {
    icon: '/iconbarber.svg',
    shortcut: '/iconbarber.svg',
    apple: '/iconbarber.svg',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION

  // El schema vive en el layout, que es Server Component, para que salga en el
  // HTML inicial. Las páginas son "use client" y no pueden hacer este fetch.
  // `fetchGoogleReviews` trae su propio `revalidate`, así que las rutas siguen
  // prerenderizadas. Ambos schemas comparten `@id`, de modo que Google los
  // fusiona en una sola entidad de negocio con su calificación.
  const reviews = await fetchGoogleReviews()

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f59e0b" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="apple-touch-icon" href="/iconbarber.svg" />
        {gscVerification && <meta name="google-site-verification" content={gscVerification} />}
      </head>
      <body className={inter.className}>
        <LocalBusinessSchema />
        <GoogleReviewsSchema payload={reviews} />
        <Providers attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <FloatingWhatsApp />
          <Toaster />
        </Providers>
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  )
}
