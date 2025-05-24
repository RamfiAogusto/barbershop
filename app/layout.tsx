import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "D' Rafa Peluquería - El don del corte",
  description:
    "Peluquería en Santo Domingo con más de 20 años de experiencia. Cortes, peinados y servicios de barbería de alta calidad.",
  generator: 'v0.dev',
  icons: {
    icon: '/favicon.ico',
  }
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
