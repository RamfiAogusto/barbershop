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
export const revalidate = REVIEWS_REVALIDATE_SECONDS

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
