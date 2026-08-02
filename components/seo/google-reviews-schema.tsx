import type { ReviewsPayload } from '@/lib/google-reviews'

/**
 * Emite `aggregateRating` y `review` como JSON-LD, exclusivamente a partir de
 * datos reales de Google Places.
 *
 * Se mantiene separado de <LocalBusinessSchema /> a propósito: ese schema es
 * estático y renderiza en servidor, mientras que las reseñas llegan por fetch en
 * cliente. Si el payload es de respaldo no se emite nada, porque marcar reseñas
 * inventadas como structured data es exactamente lo que Google penaliza.
 */
export function GoogleReviewsSchema({ payload }: { payload: ReviewsPayload }) {
  if (payload.isFallback || payload.rating === null) {
    return null
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    name: "D' Rafa Peluquería",
    '@id': 'https://www.drafapeluqueria.com/#business',
    url: 'https://www.drafapeluqueria.com',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: payload.rating.toFixed(1),
      bestRating: '5',
      worstRating: '1',
      // `ratingCount` refleja el total de calificaciones del negocio, no las
      // 5 reseñas que la API deja mostrar.
      ratingCount: String(payload.totalRatings ?? payload.reviews.length),
    },
    review: payload.reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(review.rating),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: review.text,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
