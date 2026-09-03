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
          className="h-5 w-5 text-amber-500"
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
    <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold mr-3 shrink-0">
      {review.author.charAt(0)}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="border-gray-800 bg-gray-900 h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <StarRating rating={review.rating} />
        <p className="text-gray-300 mb-4 flex-grow italic">&quot;{review.text}&quot;</p>
        <div className="flex items-center">
          <ReviewAvatar review={review} />
          <div className="min-w-0">
            {/* Los ToS de Google exigen enlazar al perfil del autor cuando está disponible. */}
            {review.authorUrl ? (
              <a
                href={review.authorUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="font-medium hover:text-amber-500 transition-colors"
              >
                {review.author}
              </a>
            ) : (
              <span className="font-medium">{review.author}</span>
            )}
            {review.publishedAt && (
              <p className="text-xs text-gray-500">{review.publishedAt}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function TestimonialsSection() {
  // Arranca con el respaldo para que la sección nunca renderice vacía.
  const [payload, setPayload] = useState<ReviewsPayload>(FALLBACK_PAYLOAD)
  // El carousel de Embla mide el DOM, así que se monta solo en el cliente.
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

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
  }, [])

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
            Lo Que Dicen <span className="text-amber-500">Nuestros Clientes</span>
          </motion.h2>
          <motion.div variants={fadeInUp} className="w-20 h-1 bg-amber-500 mx-auto mb-6" />

          {/* El resumen solo aparece con datos reales de Google. */}
          {!payload.isFallback && payload.rating !== null && (
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-2 text-gray-400"
            >
              <span className="text-2xl font-bold text-amber-500">
                {payload.rating.toFixed(1)}
              </span>
              <StarRating rating={Math.round(payload.rating)} />
              {payload.totalRatings !== null && (
                <span>
                  {payload.totalRatings} reseñas en Google
                </span>
              )}
            </motion.div>
          )}
        </motion.div>

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
            <CarouselPrevious className="hidden md:flex text-amber-500 border-amber-500 hover:bg-amber-500 hover:text-black" />
            <CarouselNext className="hidden md:flex text-amber-500 border-amber-500 hover:bg-amber-500 hover:text-black" />
          </Carousel>
        )}

        {payload.googleMapsUri && (
          <div className="text-center mt-8">
            <a
              href={payload.googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 hover:text-amber-400 transition-colors underline underline-offset-4"
            >
              Ver todas las reseñas en Google
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
