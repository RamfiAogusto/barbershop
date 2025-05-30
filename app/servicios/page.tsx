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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function ServiciosPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Banner Principal */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="relative h-[400px] md:h-[500px]">
            <Image
              src="/placeholder.svg?height=500&width=1920"
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
            <Card className="overflow-hidden">
              <div className="relative h-60">
                <Image
                  src="/placeholder.svg?height=240&width=400"
                  alt="Corte clásico de cabello para hombre en D' Rafa Peluquería Santo Domingo"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Corte Clásico</CardTitle>
                <CardDescription>
                  El servicio de corte tradicional incluye lavado, corte personalizado según tu tipo de rostro y peinado
                  final. Ideal para mantener un look profesional y cuidado.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-bold text-amber-700">RD$350</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>30-40 minutos</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-amber-700 hover:bg-amber-800">Reservar este servicio</Button>
              </CardFooter>
            </Card>

            {/* Servicio 2 */}
            <Card className="overflow-hidden">
              <div className="relative h-60">
                <Image
                  src="/placeholder.svg?height=240&width=400"
                  alt="Corte a tijera profesional en D' Rafa Peluquería Santo Domingo"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Corte a Tijera</CardTitle>
                <CardDescription>
                  Técnica de precisión para lograr mayor definición y textura. Perfecto para cabellos con volumen o
                  estilos que requieren mayor detalle y acabado natural.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-bold text-amber-700">RD$500</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>45-60 minutos</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-amber-700 hover:bg-amber-800">Reservar este servicio</Button>
              </CardFooter>
            </Card>

            {/* Servicio 3 */}
            <Card className="overflow-hidden">
              <div className="relative h-60">
                <Image
                  src="/placeholder.svg?height=240&width=400"
                  alt="Corte juvenil moderno para adolescentes en D' Rafa Peluquería Santo Domingo"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Corte para Adolescentes</CardTitle>
                <CardDescription>
                  Estilos contemporáneos y tendencias actuales para jóvenes. Incluye asesoramiento personalizado para
                  encontrar el look que mejor se adapte a su personalidad y estilo de vida.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-bold text-amber-700">RD$250</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>25-35 minutos</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-amber-700 hover:bg-amber-800">Reservar este servicio</Button>
              </CardFooter>
            </Card>

            {/* Servicio 4 */}
            <Card className="overflow-hidden">
              <div className="relative h-60">
                <Image
                  src="/placeholder.svg?height=240&width=400"
                  alt="Corte para niños en D' Rafa Peluquería Santo Domingo"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Corte para Niños</CardTitle>
                <CardDescription>
                  Experiencia amigable y divertida para los más pequeños. Nuestros barberos están especializados en
                  crear un ambiente cómodo para que los niños disfruten de su corte.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-bold text-amber-700">RD$200</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>20-30 minutos</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-amber-700 hover:bg-amber-800">Reservar este servicio</Button>
              </CardFooter>
            </Card>

            {/* Servicio 5 */}
            <Card className="overflow-hidden">
              <div className="relative h-60">
                <Image
                  src="/placeholder.svg?height=240&width=400"
                  alt="Cerquillos y flequillos estilizados en D' Rafa Peluquería Santo Domingo"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Cerquillos / Flequillos</CardTitle>
                <CardDescription>
                  Ajuste y diseño de cerquillos para complementar tu estilo personal. Servicio rápido y preciso para
                  mantener tu look entre cortes completos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-bold text-amber-700">RD$200</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>15-20 minutos</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-amber-700 hover:bg-amber-800">Reservar este servicio</Button>
              </CardFooter>
            </Card>

            {/* Servicio 6 */}
            <Card className="overflow-hidden">
              <div className="relative h-60">
                <Image
                  src="/placeholder.svg?height=240&width=400"
                  alt="Perfilado de cejas masculino en D' Rafa Peluquería Santo Domingo"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Perfilado de Cejas</CardTitle>
                <CardDescription>
                  Diseño y definición de cejas para realzar tus rasgos faciales. Un detalle que marca la diferencia en
                  la apariencia general y enmarca perfectamente el rostro.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-bold text-amber-700">RD$100</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>10-15 minutos</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-amber-700 hover:bg-amber-800">Reservar este servicio</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Servicios Premium */}
        <section className="container py-12 bg-black text-white">
          <h2 className="text-3xl font-bold text-center mb-4">Servicios Premium de Barbería</h2>
          <p className="text-center text-lg mb-12 text-amber-300">
            Eleva tu experiencia con nuestros servicios especializados
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Servicio Premium 1 */}
            <div className="bg-zinc-900 rounded-lg overflow-hidden">
              <div className="relative h-72">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Afeitado clásico con navaja en D' Rafa Peluquería Santo Domingo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-amber-300">Afeitado Clásico con Navaja</h3>
                <p className="mb-4 text-zinc-300">
                  Experimenta el ritual tradicional de barbería con toallas calientes, aceites pre-afeitado y after
                  shave premium. Una experiencia relajante y resultado impecable.
                </p>
                <div className="flex justify-between items-center mb-6">
                  <div className="text-2xl font-bold text-amber-300">RD$400</div>
                  <div className="flex items-center text-zinc-400">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>40-50 minutos</span>
                  </div>
                </div>
                <Button className="w-full bg-amber-700 hover:bg-amber-800">Reservar este servicio premium</Button>
              </div>
            </div>

            {/* Servicio Premium 2 */}
            <div className="bg-zinc-900 rounded-lg overflow-hidden">
              <div className="relative h-72">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Tratamiento completo de barba en D' Rafa Peluquería Santo Domingo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-amber-300">Tratamiento Completo de Barba</h3>
                <p className="mb-4 text-zinc-300">
                  Incluye diseño, recorte, afeitado de líneas, lavado con productos especializados y aplicación de
                  aceites nutritivos para una barba saludable y con estilo.
                </p>
                <div className="flex justify-between items-center mb-6">
                  <div className="text-2xl font-bold text-amber-300">RD$450</div>
                  <div className="flex items-center text-zinc-400">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>45-55 minutos</span>
                  </div>
                </div>
                <Button className="w-full bg-amber-700 hover:bg-amber-800">Reservar este servicio premium</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Paquetes Promocionales */}
        <section className="container py-12">
          <h2 className="text-3xl font-bold text-center mb-12">Paquetes Especiales de Barbería en Santo Domingo</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Paquete 1 */}
            <Card className="border-2 border-amber-700">
              <CardHeader className="bg-amber-700 text-white">
                <CardTitle className="text-center">Paquete Padre e Hijo</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-6">
                  Corte para adulto + corte para niño con 15% de descuento. Una experiencia para compartir.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-amber-700">RD$450</div>
                  <div className="text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded">ahorra RD$100</div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-amber-700 hover:bg-amber-800">Reservar este paquete</Button>
              </CardFooter>
            </Card>

            {/* Paquete 2 */}
            <Card className="border-2 border-amber-700">
              <CardHeader className="bg-amber-700 text-white">
                <CardTitle className="text-center">Experiencia Completa D&apos; Rafa</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-6">
                  Corte a tijera + tratamiento de barba + perfilado de cejas. El servicio completo para un look
                  impecable.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-amber-700">RD$900</div>
                  <div className="text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded">ahorra RD$150</div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-amber-700 hover:bg-amber-800">Reservar este paquete</Button>
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
                  Maestros barberos con décadas perfeccionando el arte del corte masculino.
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
                  Fácil acceso desde cualquier punto de la ciudad con estacionamiento disponible.
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
                  Cada cliente recibe recomendaciones específicas según su tipo de rostro y estilo.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-amber-700 p-2 rounded-full text-white">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Productos de alta calidad para el cuidado del cabello</h3>
                <p className="text-sm text-muted-foreground">
                  Utilizamos solo las mejores marcas para garantizar resultados profesionales.
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

              <AccordionItem value="item-2">
                <AccordionTrigger>¿Cuánto tiempo debo esperar entre cortes de pelo?</AccordionTrigger>
                <AccordionContent>
                  Recomendamos un intervalo de 3-4 semanas para mantener la forma y el estilo de tu corte. Para estilos
                  más cortos, cada 2-3 semanas es ideal. Si prefieres mantener el cabello más largo, cada 6-8 semanas
                  puede ser suficiente. Nuestros barberos pueden darte recomendaciones personalizadas según tu tipo de
                  cabello y estilo.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>
                  ¿Ofrecen asesoramiento sobre qué estilo se adapta mejor a mi rostro?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutamente. Nuestros maestros barberos están capacitados para analizar la forma de tu rostro, tipo
                  de cabello y estilo personal para recomendarte el corte que mejor te favorezca. Parte de nuestra
                  consulta inicial incluye una conversación sobre tus preferencias y necesidades para lograr el mejor
                  resultado.
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
                  retoques menores, ofrecemos servicios de cerquillo/flequillo entre cortes completos.
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
        <section className="relative py-16">
          <div className="absolute inset-0 bg-black/70 z-10"></div>
          <div className="relative h-[300px]">
            <Image
              src="/placeholder.svg?height=300&width=1920"
              alt="Interior de D' Rafa Peluquería en Santo Domingo"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="container text-center text-white space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">¿Listo para lucir tu mejor versión?</h2>
              <p className="text-xl">Reserva ahora tu cita en la barbería preferida de Santo Domingo</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button className="bg-amber-700 hover:bg-amber-800 text-lg px-8 py-6">Reservar Mi Cita</Button>
                <div className="flex items-center">
                  <p>O llámanos al</p>
                  <a href="tel:+18097672490" className="ml-2 font-bold hover:text-amber-300">
                    +1 (809)-767-2490
                  </a>
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