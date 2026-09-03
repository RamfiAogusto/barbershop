"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { SectionHeading } from "@/components/sections/section-heading"
import {
  FALLBACK_PAYLOAD,
  type Review,
  type ReviewsPayload,
} from "@/lib/google-reviews"

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: rating }, (_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-primary"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewAvatar({ review }: { review: Review }) {
  // Las fotos de perfil de Google caducan; ante un 404 caemos a la inicial.
  const [photoFailed, setPhotoFailed] = useState(false)
  const showPhoto = Boolean(review.authorPhotoUrl) && !photoFailed

  if (showPhoto) {
    return (
      <Image
        src={review.authorPhotoUrl as string}
        alt=""
        width={40}
        height={40}
        className="w-10 h-10 rounded-full object-cover mr-3"
        onError={() => setPhotoFailed(true)}
      />
    )
  }

  return (
    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold mr-3 shrink-0">
      {review.author.charAt(0)}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="border-border bg-surface h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <StarRating rating={review.rating} />
        <p className="text-muted-foreground mb-4 flex-grow italic">&quot;{review.text}&quot;</p>
        <div className="flex items-center">
          <ReviewAvatar review={review} />
          <div className="min-w-0">
            {/* Los ToS de Google exigen enlazar al perfil del autor cuando está disponible. */}
            {review.authorUrl ? (
              <a
                href={review.authorUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="font-medium hover:text-primary transition-colors"
              >
                {review.author}
              </a>
            ) : (
              <span className="font-medium">{review.author}</span>
            )}
            {review.publishedAt && (
              <p className="text-xs text-muted-foreground">{review.publishedAt}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function TestimonialsSection({ initialPayload }: { initialPayload?: ReviewsPayload }) {
  // El servidor ya trae las reseñas reales, así que el primer render muestra
  // las verdaderas y no los nombres de respaldo. El fetch de cliente queda
  // solo por si el servidor no pudo resolverlas.
  const [payload, setPayload] = useState<ReviewsPayload>(initialPayload ?? FALLBACK_PAYLOAD)
  // El carousel de Embla mide el DOM, así que se monta solo en el cliente.
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

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
        // Silencioso a propósito: el respaldo ya está en pantalla.
      })

    return () => controller.abort()
  }, [initialPayload])

  // Sin reseñas verificadas de Google la sección no se dibuja. Publicar
  // testimonios de relleno con nombres inventados como si fueran de clientes
  // reales es engañoso, y ademas es lo que Google penaliza. Mejor una sección
  // menos que una sección falsa.
  if (payload.isFallback) {
    return null
  }

  return (
    <section className="border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <SectionHeading title="Lo que dicen" ghost="Reseñas" />

        {/* El resumen solo aparece con datos reales de Google. */}
        {!payload.isFallback && payload.rating !== null && (
          <div className="mt-7 flex flex-wrap items-center gap-3 text-muted-foreground">
            <span className="font-display text-3xl font-bold text-primary">
              {payload.rating.toFixed(1)}
            </span>
            <StarRating rating={Math.round(payload.rating)} />
            {payload.totalRatings !== null && (
              <span className="text-sm">{payload.totalRatings} reseñas en Google</span>
            )}
          </div>
        )}
        <div className="mb-16" />

        {isMounted && (
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {payload.reviews.map((review) => (
                <CarouselItem
                  key={review.id}
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1 h-full">
                    <ReviewCard review={review} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex text-primary border-primary hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="hidden md:flex text-primary border-primary hover:bg-primary hover:text-primary-foreground" />
          </Carousel>
        )}

        {payload.googleMapsUri && (
          <div className="text-center mt-8">
            <a
              href={payload.googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary transition-colors underline underline-offset-4"
            >
              Ver todas las reseñas en Google
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
