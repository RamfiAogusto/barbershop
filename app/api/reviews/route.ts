import { NextResponse } from 'next/server'

import {
  REVIEWS_REVALIDATE_SECONDS,
  fetchGoogleReviews,
} from '@/lib/google-reviews'

/**
 * Endpoint de reseñas de Google.
 *
 * Existe como route handler porque `app/page.tsx` es un Client Component
 * completo y no puede hacer el fetch en servidor por sí mismo. Manteniendo la
 * llamada acá, la API key nunca llega al bundle del navegador.
 */

// Cachea la respuesta del handler para que las visitas no gasten cuota de API.
//
// Tiene que ser un literal: Next.js analiza los route segment config de forma
// estática en build time y no resuelve identificadores importados. Usar
// REVIEWS_REVALIDATE_SECONDS acá rompe `next build`, aunque `next dev` y
// `tsc --noEmit` no lo detecten. Mantener sincronizado con esa constante (24h).
export const revalidate = 86400

export async function GET() {
  const payload = await fetchGoogleReviews()

  return NextResponse.json(payload, {
    headers: {
      // Alineado con el revalidate del handler: el navegador puede reusar la
      // respuesta un día y refrescarla en segundo plano.
      'Cache-Control': `public, max-age=${REVIEWS_REVALIDATE_SECONDS}, stale-while-revalidate=${REVIEWS_REVALIDATE_SECONDS}`,
    },
  })
}
