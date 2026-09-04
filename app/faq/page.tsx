import { CaretDown, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { SectionHeading } from "@/components/sections/section-heading"
import { BUSINESS } from "@/lib/site-content"

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  {
    category: "Ubicación y Horarios",
    question: "¿Dónde está ubicada la barbería en Santo Domingo?",
    answer: "Estamos ubicados en Respaldo Calle 4, Ensanche Carmelita, Santo Domingo, Distrito Nacional, República Dominicana. Es una ubicación muy accesible desde cualquier parte de la ciudad."
  },
  {
    category: "Ubicación y Horarios", 
    question: "¿Cuáles son los horarios de atención?",
    answer: "Abrimos de martes a sábado de 8:00 AM a 8:00 PM, y los domingos de 8:00 AM a 7:00 PM. Los lunes permanecemos cerrados."
  },
  {
    category: "Servicios",
    question: "¿Qué servicios de barbería ofrecen?",
    answer: "Ofrecemos corte a tijeras, corte clásico, tintura temporal, corte femenino, corte para niños y adolescentes. Todos nuestros servicios son realizados por nuestro maestro barbero con más de 20 años de experiencia."
  },
  {
    category: "Servicios",
    question: "¿Atienden tanto hombres como mujeres?",
    answer: "Sí, somos una peluquería y barbería que atiende tanto a hombres como mujeres. Tenemos experiencia en cortes masculinos y femeninos con técnicas especializadas para cada género."
  },
  {
    category: "Reservas",
    question: "¿Cómo puedo reservar una cita?",
    answer: "Puedes reservar tu cita contactándonos por WhatsApp al +1 (809) 767-2490. Es la forma más rápida y conveniente de agendar tu cita en nuestra barbería."
  },
  {
    category: "Reservas",
    question: "¿Necesito reservar cita previa?",
    answer: "Aunque aceptamos clientes sin cita, recomendamos reservar por WhatsApp para garantizar tu horario preferido y evitar esperas, especialmente los fines de semana."
  },
  {
    category: "Experiencia",
    question: "¿Por qué elegir D' Rafa Peluquería?",
    answer: "Somos la barbería con más experiencia en Ensanche Carmelita, con más de 20 años sirviendo a la comunidad de Santo Domingo. Nuestro maestro barbero Rafa es reconocido por su técnica y profesionalismo."
  },
  {
    category: "Experiencia",
    question: "¿Qué los diferencia de otras barberías?",
    answer: "Nos diferenciamos por nuestra experiencia de más de 20 años, ubicación estratégica en Santo Domingo, atención personalizada, y técnicas tanto tradicionales como modernas para lograr el corte perfecto."
  },
  {
    category: "Ubicación y Horarios",
    question: "¿Abren los lunes?",
    answer: "Los lunes permanecemos cerrados. Atendemos de martes a sábado de 8:00 AM a 8:00 PM y los domingos de 8:00 AM a 7:00 PM."
  },
  {
    category: "Ubicación y Horarios",
    question: "¿Cómo llego a la barbería?",
    answer: "Estamos en Respaldo Calle 4, Ensanche Carmelita, Santo Domingo. Puedes abrir nuestra ubicación directamente en Google Maps buscando \'D\'RAFA PELUQUERÍA EL DON DEL CORTE\', o escribirnos por WhatsApp al +1 (809) 767-2490 y te enviamos la ubicación exacta."
  },
  {
    category: "Precios y Pagos",
    question: "¿Cuánto cuesta un corte de pelo?",
    answer: "El precio depende del servicio: no es lo mismo un corte a tijera que un corte con tintura temporal. Escríbenos por WhatsApp al +1 (809) 767-2490 y te confirmamos el precio del servicio que necesitas antes de que vengas."
  },
  {
    category: "Precios y Pagos",
    question: "¿Qué formas de pago aceptan?",
    answer: "Aceptamos efectivo y tarjeta de crédito. Si prefieres otra forma de pago, consúltanos por WhatsApp antes de tu visita."
  },
  {
    category: "Servicios",
    question: "¿Le cortan el pelo a niños?",
    answer: "Sí, atendemos niños y adolescentes. Tenemos experiencia manejando primeros cortes y niños que se ponen nerviosos con la máquina, con paciencia y sin apuro."
  },
  {
    category: "Servicios",
    question: "¿Hacen tintura o coloración?",
    answer: "Sí, ofrecemos tintura temporal, ideal para ocasiones especiales o para probar un color sin compromiso permanente. Consúltanos por WhatsApp para ver qué tono te queda mejor."
  }
]

export default function FAQPage() {
  const categories = Array.from(new Set(faqData.map((item) => item.category)))

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Etiqueta <script> plana y no next/script: esta ultima inyecta el
          JSON-LD despues de hidratar y el crawler nunca lo ve. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <main className="flex-1">
        <section className="border-b border-border pb-14 pt-32">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
            <Breadcrumbs
              items={[
                { name: "Inicio", href: "/" },
                { name: "Preguntas frecuentes", href: "/faq" },
              ]}
            />
            <span className="rule-accent" />
            <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,4.8rem)] font-bold text-foreground">
              Preguntas
              <br />
              frecuentes
            </h1>
            <p className="mt-5 max-w-[52ch] leading-relaxed text-muted-foreground">
              Horarios, ubicación, formas de pago y cómo reservar. Si falta algo,
              escríbenos por WhatsApp.
            </p>
          </div>
        </section>

        {/* Acordeon con <details> nativo: accesible por teclado, funciona sin
            JavaScript y permite que la pagina entera sea Server Component. */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,16rem)_1fr] lg:gap-20">
              <nav aria-label="Categorías" className="lg:sticky lg:top-28 lg:self-start">
                <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-foreground">
                  Categorías
                </h2>
                <ul className="mt-5 space-y-3">
                  {categories.map((category, i) => (
                    <li key={category}>
                      <a
                        href={`#cat-${i}`}
                        className="flex items-baseline gap-3 text-[0.95rem] text-muted-foreground transition-colors hover:text-primary"
                      >
                        <span className="tick">{String(i + 1).padStart(2, "0")}</span>
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="space-y-14">
                {categories.map((category, ci) => (
                  <div key={category} id={`cat-${ci}`} className="scroll-mt-28">
                    <h2 className="font-display text-2xl font-semibold text-foreground">
                      {category}
                    </h2>

                    <div className="mt-6 border-t border-border">
                      {faqData
                        .filter((item) => item.category === category)
                        .map((item) => (
                          <details
                            key={item.question}
                            className="group border-b border-border"
                          >
                            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.02rem] font-medium text-foreground transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
                              {item.question}
                              <CaretDown
                                size={18}
                                weight="bold"
                                className="mt-1 shrink-0 text-primary transition-transform duration-300 group-open:rotate-180"
                              />
                            </summary>
                            <p className="max-w-[68ch] pb-6 leading-relaxed text-muted-foreground">
                              {item.answer}
                            </p>
                          </details>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-surface py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
            <SectionHeading
              title="¿Quedó algo afuera?"
              ghost="Escribinos"
              lead="Pregúntanos directamente. Contestamos por WhatsApp durante el horario del local."
            />
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-primary-hot active:translate-y-[1px]"
              >
                <WhatsappLogo size={18} weight="bold" />
                Escribir por WhatsApp
              </a>
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="inline-flex items-center gap-3 border border-border px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Phone size={18} weight="bold" />
                {BUSINESS.phone}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
