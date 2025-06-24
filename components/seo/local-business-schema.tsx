import Script from 'next/script'

interface LocalBusinessSchemaProps {
  organizationType?: string
  additionalServices?: Array<{
    name: string
    description: string
    price?: string
  }>
}

export const LocalBusinessSchema = ({ 
  organizationType = "HairSalon",
  additionalServices = []
}: LocalBusinessSchemaProps) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": organizationType,
    "name": "D' Rafa Peluquería",
    "description": "Barbería y peluquería premium en Santo Domingo, República Dominicana con más de 20 años de experiencia. La mejor barbería cerca de ti en Ensanche Carmelita. Especialistas en cortes masculinos y femeninos, servicios profesionales de alta calidad.",
    "url": "https://drafapeluqueria.com",
    "telephone": "+1-809-767-2490",
    "priceRange": "$$",
    "currenciesAccepted": "DOP",
    "paymentAccepted": "Cash, Credit Card",
    "image": [
      "https://drafapeluqueria.com/assets/vintage-.webp",
      "https://drafapeluqueria.com/assets/quienesomos.jpg",
      "https://drafapeluqueria.com/assets/banner2.webp"
    ],
    "logo": "https://drafapeluqueria.com/iconbarber.svg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Respaldo Calle 4, Ensanche Carmelita",
      "addressLocality": "Santo Domingo",
      "addressRegion": "Distrito Nacional",
      "postalCode": "10000",
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
    "employee": [
      {
        "@type": "Person",
        "name": "Rafael",
        "jobTitle": "Master Barber",
        "worksFor": {
          "@type": "HairSalon",
          "name": "D' Rafa Peluquería"
        }
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Santo Domingo"
      },
      {
        "@type": "State", 
        "name": "Distrito Nacional"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Peluquería",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Corte a Tijeras",
            "description": "Cortes de pelo con técnicas tradicionales y modernas",
            "provider": {
              "@type": "HairSalon",
              "name": "D' Rafa Peluquería"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Tintura Temporal",
            "description": "Colores temporales para ocasiones especiales",
            "provider": {
              "@type": "HairSalon",
              "name": "D' Rafa Peluquería"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Corte Femenino", 
            "description": "Cortes y diseños especializados para mujeres",
            "provider": {
              "@type": "HairSalon",
              "name": "D' Rafa Peluquería"
            }
          }
        },
        ...additionalServices.map(service => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service.name,
            "description": service.description,
            "provider": {
              "@type": "HairSalon",
              "name": "D' Rafa Peluquería"
            }
          }
        }))
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
        "reviewBody": "El mejor lugar para un corte de pelo. Rafa es un profesional que sabe lo que hace y te aconseja según tu tipo de rostro. Ambiente increíble.",
        "datePublished": "2024-01-15"
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
        "reviewBody": "Experiencia de primera clase. El servicio es espectacular, te hacen sentir como en casa. Volveré sin duda.",
        "datePublished": "2024-01-10"
      }
    ]
  }

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(baseSchema),
      }}
    />
  )
} 