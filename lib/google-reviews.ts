/**
 * Integración con Google Places API (New) para traer las reseñas reales del negocio.
 *
 * La API key vive solo en el servidor: nunca se expone con NEXT_PUBLIC_, porque
 * una key de Places sin restricciones es facturable por quien la encuentre.
 *
 * Límite conocido de la API: Places devuelve como máximo 5 reseñas y no permite
 * paginar ni elegir cuáles. No es algo que se pueda sortear desde el código.
 */

const PLACES_ENDPOINT = 'https://places.googleapis.com/v1/places'

/** Campos pedidos vía FieldMask. Pedir de más encarece la llamada. */
const FIELD_MASK = 'rating,userRatingCount,googleMapsUri,reviews'

/**
 * Los ToS de Google no permiten almacenar reseñas por más de 30 días.
 * 24h mantiene el contenido fresco con un costo de API despreciable.
 */
export const REVIEWS_REVALIDATE_SECONDS = 60 * 60 * 24

/** Reseña ya normalizada para consumo de la UI. */
export interface Review {
  id: string
  author: string
  /** URL del perfil del autor en Google Maps. Requerido por los ToS de atribución. */
  authorUrl?: string
  authorPhotoUrl?: string
  rating: number
  text: string
  /** Texto relativo ya localizado por Google, ej. "hace 2 meses". */
  publishedAt: string
}

/** Payload que consume la sección de testimonios. */
export interface ReviewsPayload {
  reviews: Review[]
  /** Promedio real del negocio. `null` si la API no lo devolvió. */
  rating: number | null
  /** Cantidad total de calificaciones, no solo de las reseñas visibles. */
  totalRatings: number | null
  /** Ficha del negocio en Google Maps, para el enlace "ver todas". */
  googleMapsUri: string | null
  /** `true` cuando se está sirviendo el contenido de respaldo. */
  isFallback: boolean
}

/** Forma cruda de la respuesta de Places API (New). Solo lo que consumimos. */
interface PlacesApiReview {
  name?: string
  rating?: number
  text?: { text?: string }
  originalText?: { text?: string }
  relativePublishTimeDescription?: string
  authorAttribution?: {
    displayName?: string
    uri?: string
    photoUri?: string
  }
}

interface PlacesApiResponse {
  rating?: number
  userRatingCount?: number
  googleMapsUri?: string
  reviews?: PlacesApiReview[]
}

/**
 * Testimonios de respaldo. Se usan solo si la API falla o no está configurada,
 * para que la sección nunca quede vacía en producción.
 *
 * No se emiten como structured data: publicar reseñas inventadas en JSON-LD
 * viola las guidelines de Google y expone el sitio a una acción manual.
 */
/**
 * Respaldo VACÍO a propósito.
 *
 * Antes traía cuatro reseñas escritas a mano con nombres de clientes que no
 * existen. Se veían idénticas a las verdaderas, así que un fallo de la API de
 * Google pasaba inadvertido mientras el sitio mostraba testimonios falsos.
 *
 * Sin reseñas la sección directamente no se dibuja: el fallo se nota y nadie
 * lee un testimonio inventado.
 */
export const FALLBACK_PAYLOAD: ReviewsPayload = {
  reviews: [],
  rating: null,
  totalRatings: null,
  googleMapsUri: null,
  isFallback: true,
}

function normalizeReview(raw: PlacesApiReview, index: number): Review | null {
  // `text` viene traducido al languageCode pedido; `originalText` es el idioma
  // en que lo escribió el cliente. Sin texto la tarjeta no aporta nada.
  const text = raw.text?.text ?? raw.originalText?.text
  const author = raw.authorAttribution?.displayName

  if (!text || !author) {
    return null
  }

  return {
    id: raw.name ?? `review-${index}`,
    author,
    authorUrl: raw.authorAttribution?.uri,
    authorPhotoUrl: raw.authorAttribution?.photoUri,
    rating: typeof raw.rating === 'number' ? Math.round(raw.rating) : 5,
    text,
    publishedAt: raw.relativePublishTimeDescription ?? '',
  }
}

/**
 * Trae las reseñas reales desde Google Places.
 *
 * Nunca lanza: ante cualquier fallo devuelve el payload de respaldo, porque una
 * caída de la API de Google no debe romper el renderizado de la landing.
 */
export async function fetchGoogleReviews(): Promise<ReviewsPayload> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId) {
    return FALLBACK_PAYLOAD
  }

  try {
    const url = `${PLACES_ENDPOINT}/${encodeURIComponent(placeId)}?languageCode=es`

    const response = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': FIELD_MASK,
      },
      next: { revalidate: REVIEWS_REVALIDATE_SECONDS },
    })

    if (!response.ok) {
      console.error(
        `[google-reviews] Places API respondió ${response.status}: ${await response.text()}`,
      )
      return FALLBACK_PAYLOAD
    }

    const data = (await response.json()) as PlacesApiResponse

    const reviews = (data.reviews ?? [])
      .map(normalizeReview)
      .filter((review): review is Review => review !== null)

    // Sin reseñas utilizables preferimos el respaldo antes que una sección vacía.
    if (reviews.length === 0) {
      return FALLBACK_PAYLOAD
    }

    return {
      reviews,
      rating: data.rating ?? null,
      totalRatings: data.userRatingCount ?? null,
      googleMapsUri: data.googleMapsUri ?? null,
      isFallback: false,
    }
  } catch (error) {
    console.error('[google-reviews] No se pudieron obtener las reseñas:', error)
    return FALLBACK_PAYLOAD
  }
}
