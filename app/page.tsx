"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Scissors, Calendar, Clock, MapPin, Phone, Instagram, Facebook, Menu, X, ChevronRight, Palette, Sparkles } from "lucide-react"
import Head from "next/head"
import Script from "next/script"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { useToast } from "@/components/ui/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { LocalBusinessSchema } from "@/components/seo/local-business-schema"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMobile()
  const { toast } = useToast()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleWhatsAppReservation = () => {
    const whatsappMessage = "Hola, me gustaría reservar una cita"
    const whatsappLink = `https://wa.me/18097672490?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappLink, '_blank')
  }

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
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "name": "D' Rafa Peluquería",
    "description": "Barbería premium en Santo Domingo con más de 20 años de experiencia. Especialistas en cortes masculinos y femeninos, tintura temporal y servicios de alta calidad.",
    "url": "https://tu-dominio.com",
    "telephone": "+1-809-767-2490",
    "priceRange": "$$",
    "image": [
      "https://drafapeluqueria.com/assets/vintage-.webp",
      "https://drafapeluqueria.com/assets/quienesomos.jpg"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Respaldo Calle 4, Ensanche Carmelita",
      "addressLocality": "Santo Domingo",
      "addressRegion": "Distrito Nacional",
      "addressCountry": "DO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "18.4861",
      "longitude": "-69.9312"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "08:00",
        "closes": "19:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/rafa_eldon/",
      "https://www.facebook.com/RafaelDondelcorte",
      "https://wa.me/18097672490"
    ],
    "founder": {
      "@type": "Person",
      "name": "Rafael",
      "jobTitle": "Master Barber",
      "worksFor": {
        "@type": "HairSalon",
        "name": "D' Rafa Peluquería"
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Peluquería",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Corte a Tijeras",
            "description": "Cortes de pelo con técnicas tradicionales y modernas"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tintura Temporal",
            "description": "Colores temporales para ocasiones especiales"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Corte Femenino",
            "description": "Cortes y diseños especializados para mujeres"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "50"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Alejandro Gómez"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "El mejor lugar para un corte de pelo. Rafa es un profesional que sabe lo que hace y te aconseja según tu tipo de rostro. Ambiente increíble."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "David Fernández"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Experiencia de primera clase. El servicio es espectacular, te hacen sentir como en casa. Volveré sin duda."
      }
    ]
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <link
          rel="preload"
          href="/placeholder.jpg"
          as="image"
          type="image/jpeg"
        />
      </Head>
      <SpeedInsights />
      <LocalBusinessSchema />
      
      <Header />

      {/* Hero Section */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/vintage-.webp"
            alt="D' Rafa Peluquería"
            fill
            sizes="100vw"
            quality={100}
            priority
            className="object-cover opacity-90"
            loading="eager"
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black"></div>
        </div>

        <div className="container mx-auto px-4 z-10 pt-20">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              Estilo y Precisión en <span className="text-amber-500">Cada Corte</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-300 mb-8">
              Donde la tradición se encuentra con el estilo moderno para crear tu mejor imagen
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleWhatsAppReservation}
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg py-6 px-8"
                size="lg"
              >
                Reservar Cita
              </Button>
              <Link href="/servicios">
                <Button
                  variant="outline"
                  className="border-amber-500 text-amber-500 hover:bg-amber-500/10 font-medium text-lg py-6 px-8"
                  size="lg"
                >
                  Nuestros Servicios
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <a href="#nosotros" className="flex flex-col items-center gap-2">
            <span className="text-amber-500">Descubre más</span>
            <ChevronRight className="h-6 w-6 text-amber-500 rotate-90" />
          </a>
        </motion.div>
      </section>

      {/* About Us Section */}
      <section id="nosotros" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              Acerca de <span className="text-amber-500">Nosotros</span>
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-20 h-1 bg-amber-500 mx-auto mb-6"></motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/assets/quienesomos.jpg"
                width={400}
                height={480}
                alt="Rafa - Maestro Barbero trabajando con precisión en D' Rafa Peluquería, Santo Domingo"
                className="rounded-lg object-cover w-full max-w-md mx-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-4">+20 AÑOS DE EXPERIENCIA</h3>
              <p className="text-gray-300 text-lg mb-6">
                Sumérgete en el mundo de la barbería con un maestro en el arte. Con más de 20 años de dedicación, Rafa
                te ofrece cortes que trascienden el tiempo. Descubre la pericia de un experto, donde cada detalle
                cuenta. Tu estilo es nuestra prioridad; únete a Rafa para una experiencia única de barbería.
              </p>
              <Button onClick={handleWhatsAppReservation} className="bg-amber-500 hover:bg-amber-600 text-black font-bold">
                Reservar Ahora
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              Servicios <span className="text-amber-500">Destacados</span>
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-20 h-1 bg-amber-500 mx-auto mb-6"></motion.div>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto">
              Experimenta nuestros servicios de barbería premium con el estilo y la precisión que caracterizan a D' Rafa Peluquería.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Corte a tijeras */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Card className="bg-gray-900 border-gray-800 hover:border-amber-500/50 transition-all duration-300 h-full overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="bg-amber-500/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Scissors className="h-8 w-8 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-amber-500">Corte a Tijeras</h3>
                  <p className="text-gray-400">
                    Experimenta la excelencia en el arte del corte de pelo con técnicas tradicionales. Desde estilos clásicos hasta tendencias modernas, cada corte es una obra de arte que resalta tu personalidad y estilo único.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tintura temporal */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all duration-300 h-full overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-500/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Palette className="h-8 w-8 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-purple-500">Tintura Temporal</h3>
                  <p className="text-gray-400">
                    Agrega un toque de color y diversión a tu look con nuestra tintura temporal. Disfruta de la libertad de expresarte con colores únicos que se eliminan fácilmente con solo lavar el cabello, perfecta para ocasiones especiales.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Corte femenino */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Card className="bg-gray-900 border-gray-800 hover:border-pink-500/50 transition-all duration-300 h-full overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="bg-pink-500/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-pink-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-pink-500">Corte Femenino</h3>
                  <p className="text-gray-400">
                    Déjate sorprender por la creatividad y precisión en cada corte femenino. Desde cortes modernos hasta estilos audaces con maquinilla. Ya sea rayas, degradados o diseños personalizados, te ayudaremos a lucir tu mejor versión.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galería" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              Nuestra <span className="text-amber-500">Galería</span>
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-20 h-1 bg-amber-500 mx-auto mb-6"></motion.div>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto">
              Explora nuestros mejores trabajos y descubre el nivel de detalle y calidad que ofrecemos en cada servicio.
            </motion.p>
          </motion.div>

          <Carousel className="w-full">
            <CarouselContent>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <CarouselItem key={item} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="border-0 overflow-hidden bg-transparent">
                      <CardContent className="p-0 relative group">
                        <Image
                          src={`/placeholder.svg?height=400&width=600`}
                          width={600}
                          height={400}
                          alt={`Trabajo de barbería ${item}`}
                          className="rounded-lg object-cover w-full aspect-[3/2] transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button
                            variant="outline"
                            className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
                          >
                            Ver Detalle
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-amber-500 border-amber-500 hover:bg-amber-500 hover:text-black" />
            <CarouselNext className="text-amber-500 border-amber-500 hover:bg-amber-500 hover:text-black" />
          </Carousel>
        </div>
      </section>

      {/* Testimonials Section */}
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
            <motion.div variants={fadeInUp} className="w-20 h-1 bg-amber-500 mx-auto mb-6"></motion.div>
          </motion.div>

          <Carousel className="w-full">
            <CarouselContent>
              {[
                {
                  name: "Alejandro Gómez",
                  text: "El mejor lugar para un corte de pelo. Rafa es un profesional que sabe lo que hace y te aconseja según tu tipo de rostro. Ambiente increíble.",
                  rating: 5,
                },
                {
                  name: "David Fernández",
                  text: "Experiencia de primera clase. El servicio es espectacular, te hacen sentir como en casa. Volveré sin duda.",
                  rating: 5,
                },
                {
                  name: "Marcos López",
                  text: "Llevo años buscando una peluquería donde me entiendan y por fin la encontré. Excelente atención y resultados impecables.",
                  rating: 5,
                },
                {
                  name: "Roberto Sánchez",
                  text: "Ambiente exclusivo, atención personalizada y resultados profesionales. Vale cada peso que pagas.",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="border-gray-800 bg-gray-900 h-full">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex gap-1 mb-4">
                          {Array(testimonial.rating)
                            .fill(0)
                            .map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-amber-500"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                        </div>
                        <p className="text-gray-300 mb-4 flex-grow italic">"{testimonial.text}"</p>
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold mr-3">
                            {testimonial.name.charAt(0)}
                          </div>
                          <span className="font-medium">{testimonial.name}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-amber-500 border-amber-500 hover:bg-amber-500 hover:text-black" />
            <CarouselNext className="text-amber-500 border-amber-500 hover:bg-amber-500 hover:text-black" />
          </Carousel>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-amber-500">Contáctanos</span>
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-20 h-1 bg-amber-500 mx-auto mb-6"></motion.div>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto">
              Estamos aquí para responder tus preguntas y ayudarte a reservar tu próxima cita.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
                <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-amber-500/10 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Dirección</h4>
                      <a 
                        href="https://maps.app.goo.gl/NqoWKyHeQdFNAD8D9" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-amber-500 hover:underline"
                      >
                        D.N, Respaldo Calle 4, Ensanche Carmelita, Santo Domingo
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-amber-500/10 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Teléfono</h4>
                      <a 
                        href="tel:+18097672490" 
                        className="text-gray-400 hover:text-amber-500 hover:underline"
                      >
                        1+(809)-767-2490
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-amber-500/10 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Horario</h4>
                      <p className="text-gray-400">Martes - Sábado: 8:00 - 20:00</p>
                      <p className="text-gray-400">Domingo: 8:00 - 19:00</p>
                      <p className="text-gray-400">Lunes: Cerrado</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-bold mb-3">Síguenos</h4>
                  <div className="flex gap-4">
                    <a
                      href="https://www.instagram.com/rafa_eldon/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-amber-500 text-white hover:text-black p-3 rounded-full transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href="https://www.facebook.com/RafaelDondelcorte"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-amber-500 text-white hover:text-black p-3 rounded-full transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a
                      href="https://wa.me/18097672490"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-amber-500 text-white hover:text-black p-3 rounded-full transition-colors"
                    >
                      <Image
                        src="/assets/whatsapp.svg"
                        alt="WhatsApp"
                        width={20}
                        height={20}
                        className="h-5 w-5 filter invert brightness-0 contrast-100 transition-all duration-200 hover:brightness-200 hover:sepia hover:saturate-200 hover:hue-rotate-15"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
                <h3 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h3>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Tu email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Asunto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Asunto del mensaje"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Tu mensaje"
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3"
                    onClick={(e) => {
                      e.preventDefault()
                      toast({
                        title: "Mensaje enviado",
                        description: "Nos pondremos en contacto contigo pronto",
                      })
                    }}
                  >
                    Enviar Mensaje
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-16 bg-amber-500">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold text-black mb-2">¿Listo para un Nuevo Look?</h2>
              <p className="text-black/80 text-lg">
                Reserva tu cita ahora y experimenta el mejor servicio de peluquería
              </p>
            </div>
            <Button
              onClick={handleWhatsAppReservation}
              className="bg-black hover:bg-gray-900 text-white font-bold text-lg py-6 px-8"
              size="lg"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Reservar Ahora
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
