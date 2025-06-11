"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, MapPin, Phone, Clock, Scissors } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Script from "next/script"

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
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter(i => i !== index))
    } else {
      setOpenItems([...openItems, index])
    }
  }

  const categories = Array.from(new Set(faqData.map(item => item.category)))

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/18097672490?text=Hola,%20tengo%20una%20pregunta%20sobre%20sus%20servicios', '_blank')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-black to-gray-900 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Preguntas Frecuentes
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Encuentra respuestas sobre nuestra barbería en Santo Domingo, servicios, horarios y más
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                <p className="font-medium">Ensanche Carmelita</p>
                <p className="text-sm text-gray-300">Santo Domingo</p>
              </div>
              <div className="text-center">
                <Phone className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                <p className="font-medium">+1 (809) 767-2490</p>
                <p className="text-sm text-gray-300">WhatsApp</p>
              </div>
              <div className="text-center">
                <Clock className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                <p className="font-medium">Mar-Sáb 8AM-8PM</p>
                <p className="text-sm text-gray-300">Dom 8AM-7PM</p>
              </div>
              <div className="text-center">
                <Scissors className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                <p className="font-medium">+20 Años</p>
                <p className="text-sm text-gray-300">Experiencia</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {categories.map((category) => (
              <div key={category} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-amber-700">
                  {category}
                </h2>
                
                <div className="space-y-4">
                  {faqData
                    .filter(item => item.category === category)
                    .map((item, index) => {
                      const globalIndex = faqData.indexOf(item)
                      const isOpen = openItems.includes(globalIndex)
                      
                      return (
                        <Card key={globalIndex} className="overflow-hidden">
                          <CardContent className="p-0">
                            <button
                              onClick={() => toggleItem(globalIndex)}
                              className="w-full p-6 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                            >
                              <h3 className="text-lg font-medium pr-4">
                                {item.question}
                              </h3>
                              {isOpen ? (
                                <ChevronUp className="h-5 w-5 text-amber-600 flex-shrink-0" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-amber-600 flex-shrink-0" />
                              )}
                            </button>
                            
                            {isOpen && (
                              <div className="px-6 pb-6">
                                <p className="text-gray-600 leading-relaxed">
                                  {item.answer}
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )
                    })}
                </div>
              </div>
            ))}

            {/* Contact Section */}
            <div className="mt-16 text-center bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">
                ¿No encuentras la respuesta que buscas?
              </h2>
              <p className="text-gray-600 mb-6">
                Contáctanos por WhatsApp y te responderemos todas tus preguntas sobre nuestra barbería en Santo Domingo
              </p>
              <Button 
                onClick={handleWhatsAppContact}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3"
              >
                Contactar por WhatsApp
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 