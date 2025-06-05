"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Scissors,
  Star,
  Clock,
  Phone,
  MapPin,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  ChevronRight,
  Check,
  Coffee,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function ServiciosPage() {
  const handleWhatsAppReservation = (serviceName?: string) => {
    const message = serviceName 
      ? `Hola, me gustaría reservar una cita para el servicio de ${serviceName}`
      : "Hola, me gustaría reservar una cita"
    const whatsappLink = `https://wa.me/18097672490?text=${encodeURIComponent(message)}`
    window.open(whatsappLink, '_blank')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Banner Principal */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/70 z-10"></div>
          <div className="relative h-[400px] md:h-[500px]">
            <Image
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              src="/assets/banner2.webp"
              alt="Interior de D' Rafa Peluquería en Santo Domingo mostrando estaciones de barbería profesional"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="container text-center text-white space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold">Servicios de Barbería Profesional en Santo Domingo</h1>
              <p className="text-lg md:text-xl max-w-3xl mx-auto">
                Más de 20 años perfeccionando el arte del corte masculino
              </p>
            </div>
          </div>
        </section>

        {/* Introducción */}
        <section className="container py-12">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground">
              En D&apos; Rafa Peluquería ofrecemos servicios de barbería premium en Santo Domingo. Nuestro maestro
              barbero Rafa, con más de dos décadas de experiencia, garantiza cortes precisos y estilos impecables para
              cada cliente. Descubre por qué somos la barbería más reconocida del Ensanche Carmelita.
            </p>
            <div className="flex items-center justify-center my-8">
              <div className="h-px w-16 bg-amber-700"></div>
              <Scissors className="h-6 w-6 mx-4 text-amber-700" />
              <div className="h-px w-16 bg-amber-700"></div>
            </div>
          </div>
        </section>

        {/* Servicios Principales */}
        <section className="container py-12 bg-muted/30">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Servicio 1 */}
            <Card className="w-full max-w-[400px] flex flex-col h-full">
              <CardHeader className="space-y-4 flex-1">
                <CardTitle className="mb-2">Corte Clásico</CardTitle>
                <CardDescription className="h-full flex items-center">
                  El servicio de corte tradicional incluye lavado, corte personalizado según tu tipo de rostro y peinado
                  final. Ideal para mantener un look profesional y cuidado.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  className="w-full bg-amber-700 hover:bg-amber-800"
                  onClick={() => handleWhatsAppReservation("Corte Clásico")}
                >
                  Reservar este servicio
                </Button>
              </CardFooter>
            </Card>

            {/* Servicio 2 */}
            <Card className="w-full max-w-[400px] flex flex-col h-full">
              <CardHeader className="space-y-4 flex-1">
                <CardTitle className="mb-2">Corte a Tijera</CardTitle>
                <CardDescription className="h-full flex items-center">
                  Técnica de precisión para lograr mayor definición y textura. Perfecto para cabellos con volumen o
                  estilos que requieren mayor detalle y acabado natural.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  className="w-full bg-amber-700 hover:bg-amber-800"
                  onClick={() => handleWhatsAppReservation("Corte a Tijera")}
                >
                  Reservar este servicio
                </Button>
              </CardFooter>
            </Card>

            {/* Servicio 3 */}
            <Card className="w-full max-w-[400px] flex flex-col h-full">
              <CardHeader className="space-y-4 flex-1">
                <CardTitle className="mb-2">Corte para Adolescentes</CardTitle>
                <CardDescription className="h-full flex items-center">
                  Estilos contemporáneos y tendencias actuales para jóvenes. Incluye asesoramiento personalizado para
                  encontrar el look que mejor se adapte a su personalidad y estilo de vida.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  className="w-full bg-amber-700 hover:bg-amber-800"
                  onClick={() => handleWhatsAppReservation("Corte para Adolescentes")}
                >
                  Reservar este servicio
                </Button>
              </CardFooter>
            </Card>

            {/* Servicio 4 */}
            <Card className="w-full max-w-[400px] flex flex-col h-full">
              <CardHeader className="space-y-4 flex-1">
                <CardTitle className="mb-2">Corte para Niños</CardTitle>
                <CardDescription className="h-full flex items-center">
                  Experiencia amigable y divertida para los más pequeños. Nuestros barberos están especializados en
                  crear un ambiente cómodo para que los niños disfruten de su corte.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  className="w-full bg-amber-700 hover:bg-amber-800"
                  onClick={() => handleWhatsAppReservation("Corte para Niños")}
                >
                  Reservar este servicio
                </Button>
              </CardFooter>
            </Card>

            {/* Servicio 5 */}
            <Card className="w-full max-w-[400px] flex flex-col h-full">
              <CardHeader className="space-y-4 flex-1">
                <CardTitle className="mb-2">Cerquillos</CardTitle>
                <CardDescription className="h-full flex items-center">
                  Mantenimiento profesional de cerquillos y diseño de barba. Incluye delineado preciso y arreglo con
                  tijera para un acabado impecable.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  className="w-full bg-amber-700 hover:bg-amber-800"
                  onClick={() => handleWhatsAppReservation("Cerquillos")}
                >
                  Reservar este servicio
                </Button>
              </CardFooter>
            </Card>

            {/* Servicio 6 */}
            <Card className="w-full max-w-[400px] flex flex-col h-full">
              <CardHeader className="space-y-4 flex-1">
                <CardTitle className="mb-2">Cejas</CardTitle>
                <CardDescription className="h-full flex items-center">
                  Diseño profesional de cejas para un look simétrico y natural. Técnica precisa que realza tu mirada
                  manteniendo un aspecto masculino y bien cuidado.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  className="w-full bg-amber-700 hover:bg-amber-800"
                  onClick={() => handleWhatsAppReservation("Cejas")}
                >
                  Reservar este servicio
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Por Qué Elegirnos */}
        <section className="container py-12 bg-muted/30">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Por qué elegir D&apos; Rafa Peluquería en Santo Domingo?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="bg-amber-700 p-2 rounded-full text-white">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Más de 20 años de experiencia en barbería profesional</h3>
                <p className="text-sm text-muted-foreground">
                  Maestro barbero con décadas perfeccionando el arte del corte masculino.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-amber-700 p-2 rounded-full text-white">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Ubicación conveniente en Ensanche Carmelita, Santo Domingo</h3>
                <p className="text-sm text-muted-foreground">
                  Fácil acceso desde cualquier punto de la ciudad con estacionamiento disponible.{" "}
                  <a 
                    href="https://maps.app.goo.gl/NqoWKyHeQdFNAD8D9" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:underline"
                  >
                    Ver en mapa
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-amber-700 p-2 rounded-full text-white">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Atención personalizada y asesoramiento profesional</h3>
                <p className="text-sm text-muted-foreground">
                  Cada cliente recibe recomendaciones específicas y atención de calidad.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-600 p-2 rounded-full text-white">
                <Coffee className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Bebidas y comestibles ligeros disponibles</h3>
                <p className="text-sm text-muted-foreground">
                  Disfruta de bebidas refrescantes y snacks ligeros mientras esperas tu turno o durante el servicio.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-amber-700 p-2 rounded-full text-white">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Ambiente acogedor y exclusivo para caballeros</h3>
                <p className="text-sm text-muted-foreground">
                  Un espacio diseñado para que disfrutes de una experiencia de barbería auténtica.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-amber-700 p-2 rounded-full text-white">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Sistema de citas para minimizar tiempos de espera</h3>
                <p className="text-sm text-muted-foreground">
                  Valoramos tu tiempo y nos aseguramos de que tu visita sea eficiente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section className="container py-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            Lo que dicen nuestros clientes sobre nuestros servicios
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonio 1 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-muted mb-4"></div>
                  <div className="flex mb-2">
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                  </div>
                </div>
                <blockquote className="text-center italic mb-4">
                  "Llevo más de 5 años visitando D&apos; Rafa Peluquería y nunca me ha decepcionado. El corte a tijera
                  es excepcional y Rafa siempre sabe exactamente qué estilo me favorece más."
                </blockquote>
                <div className="text-center">
                  <h4 className="font-medium">Carlos Méndez</h4>
                  <p className="text-sm text-muted-foreground">Naco, Santo Domingo</p>
                </div>
              </CardContent>
            </Card>

            {/* Testimonio 2 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-muted mb-4"></div>
                  <div className="flex mb-2">
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                  </div>
                </div>
                <blockquote className="text-center italic mb-4">
                  "El tratamiento de barba es simplemente el mejor de Santo Domingo. Productos de calidad y técnica
                  impecable. Mi barba nunca había lucido tan bien."
                </blockquote>
                <div className="text-center">
                  <h4 className="font-medium">Miguel Rodríguez</h4>
                  <p className="text-sm text-muted-foreground">Piantini, Santo Domingo</p>
                </div>
              </CardContent>
            </Card>

            {/* Testimonio 3 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-muted mb-4"></div>
                  <div className="flex mb-2">
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                  </div>
                </div>
                <blockquote className="text-center italic mb-4">
                  "Llevo a mi hijo de 8 años y siempre ha sido una experiencia positiva. El personal es paciente y
                  amable, y el resultado siempre es perfecto. La mejor barbería para niños en Santo Domingo."
                </blockquote>
                <div className="text-center">
                  <h4 className="font-medium">Roberto Guzmán</h4>
                  <p className="text-sm text-muted-foreground">Bella Vista, Santo Domingo</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="container py-12 bg-muted/30">
          <h2 className="text-3xl font-bold text-center mb-12">
            Preguntas frecuentes sobre nuestros servicios de barbería
          </h2>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>¿Es necesario reservar cita para los servicios de barbería?</AccordionTrigger>
                <AccordionContent>
                  Aunque atendemos clientes sin cita previa, recomendamos reservar con anticipación para garantizar
                  disponibilidad y minimizar tiempos de espera, especialmente durante fines de semana y días festivos.
                  Puedes reservar llamando al +1 (809)-767-2490 o a través de nuestra página web.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>¿Qué productos utilizan para el cuidado del cabello y la barba?</AccordionTrigger>
                <AccordionContent>
                  En D&apos; Rafa Peluquería utilizamos exclusivamente productos profesionales de alta calidad.
                  Trabajamos con marcas reconocidas que ofrecen resultados superiores y son adecuados para diferentes
                  tipos de cabello y piel. También ofrecemos estos productos a la venta para que puedas continuar con el
                  cuidado profesional en casa.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>¿Cómo puedo mantener mi corte entre visitas a la barbería?</AccordionTrigger>
                <AccordionContent>
                  Para mantener tu corte en óptimas condiciones, recomendamos utilizar los productos adecuados para tu
                  tipo de cabello, seguir una rutina de lavado apropiada y evitar el uso excesivo de calor. Nuestros
                  barberos te darán consejos específicos sobre cómo mantener tu estilo según el corte elegido. Para
                  retoques menores, ofrecemos servicios de cerquillo entre cortes completos.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>¿Cuál es la mejor barbería en Santo Domingo para cortes modernos?</AccordionTrigger>
                <AccordionContent>
                  D&apos; Rafa Peluquería es reconocida como una de las mejores barberías en Santo Domingo para cortes
                  modernos y clásicos. Nuestro equipo se mantiene actualizado con las últimas tendencias y técnicas,
                  combinando la tradición barbera con estilos contemporáneos. Nuestra experiencia de más de 20 años y la
                  satisfacción de nuestros clientes nos posicionan como referentes en el sector.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Llamada a la Acción */}
        <section className="relative ">
          <div 
            className="relative h-[300px] bg-cover bg-center"
            style={{ 
              backgroundImage: "url('/assets/banner3.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              backgroundBlendMode: "multiply",
              backgroundColor: "rgba(0, 0, 0, 0.7)"
            }}
          >
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="container text-center text-white space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">¿Listo para lucir tu mejor versión?</h2>
                <p className="text-xl">Reserva ahora tu cita en la barbería preferida de Santo Domingo</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    className="bg-amber-700 hover:bg-amber-800 text-lg px-8 py-6"
                    onClick={() => handleWhatsAppReservation()}
                  >
                    Reservar Mi Cita
                  </Button>
                  <div className="flex items-center">
                    <p>O llámanos al</p>
                    <a 
                      href="tel:+18097672490" 
                      className="ml-2 font-bold hover:text-amber-300 underline"
                    >
                      +1 (809)-767-2490
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 