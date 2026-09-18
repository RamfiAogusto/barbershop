"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Quotes, Star } from "@phosphor-icons/react"

import { SectionHeading } from "@/components/sections/section-heading"
import { BUSINESS } from "@/lib/site-content"
import {
  FALLBACK_PAYLOAD,
  type Review,
  type ReviewsPayload,
} from "@/lib/google-reviews"

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={15}
          weight={i < rating ? "fill" : "regular"}
          className={i < rating ? "text-primary" : "text-faint"}
          aria-hidden
        />
      ))}
    </div>
  )
}

function ReviewAvatar({ review }: { review: Review }) {
  // Las fotos de perfil de Google caducan; ante un 404 caemos a la inicial.
  const [photoFailed, setPhotoFailed] = useState(false)

  if (review.authorPhotoUrl && !photoFailed) {
    return (
      <Image
        src={review.authorPhotoUrl}
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 object-cover"
        onError={() => setPhotoFailed(true)}
      />
    )
  }

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary font-display text-lg font-bold text-primary-foreground">
      {review.author.charAt(0)}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="group relative flex flex-col bg-surface p-8 transition-colors duration-300 hover:bg-surface-raised lg:p-10">
      <div className="flex items-start justify-between">
        <StarRating rating={review.rating} />
        <Quotes
          size={26}
          weight="fill"
          className="text-border transition-colors duration-300 group-hover:text-primary"
        />
      </div>

      <p className="mt-6 flex-grow leading-relaxed text-muted-foreground">{review.text}</p>

      <footer className="mt-8 flex items-center gap-4 border-t border-border pt-6">
        <ReviewAvatar review={review} />
        <div className="min-w-0">
          {/* Los ToS de Google exigen enlazar al perfil del autor cuando esta disponible. */}
          {review.authorUrl ? (
            <a
              href={review.authorUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="font-display text-lg font-semibold text-foreground transition-colors hover:text-primary"
            >
              {review.author}
            </a>
          ) : (
            <span className="font-display text-lg font-semibold text-foreground">
              {review.author}
            </span>
          )}
          {review.publishedAt && (
            <p className="text-[0.8rem] text-faint">{review.publishedAt}</p>
          )}
        </div>
      </footer>

      <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
    </article>
  )
}

export function TestimonialsSection({ initialPayload }: { initialPayload?: ReviewsPayload }) {
  // El servidor ya trae las resenas reales, asi que el primer render muestra
  // las verdaderas. El fetch de cliente queda solo por si el servidor no pudo
  // resolverlas.
  const [payload, setPayload] = useState<ReviewsPayload>(initialPayload ?? FALLBACK_PAYLOAD)

  useEffect(() => {
    if (initialPayload && !initialPayload.isFallback) return

    const controller = new AbortController()

    fetch("/api/reviews", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: ReviewsPayload | null) => {
        if (data?.reviews?.length) {
          setPayload(data)
        }
      })
      .catch(() => {
        // Silencioso a proposito: sin datos la seccion no se dibuja.
      })

    return () => controller.abort()
  }, [initialPayload])

  // Sin resenas verificadas de Google la seccion no existe. Publicar
  // testimonios de relleno como si fueran de clientes reales es enganoso, y es
  // ademas lo que Google penaliza.
  if (payload.isFallback || payload.reviews.length === 0) {
    return null
  }

  return (
    <section className="border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <SectionHeading title="Lo que dicen" ghost="Reseñas" />

        {payload.rating !== null && (
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="font-display text-[3.2rem] font-bold leading-none text-primary">
              {payload.rating.toFixed(1)}
            </span>
            <div>
              <StarRating rating={Math.round(payload.rating)} />
              {payload.totalRatings !== null && (
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {payload.totalRatings} reseñas en Google
                </p>
              )}
            </div>
            <a
              href={payload.googleMapsUri ?? BUSINESS.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto border border-border px-6 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Ver en Google
            </a>
          </div>
        )}

        {/* Las resenas van en reja de hairlines, igual que los servicios: es el
            mismo tipo de contenido repetido y merece el mismo tratamiento. */}
        <div className="mt-14 grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {payload.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}
