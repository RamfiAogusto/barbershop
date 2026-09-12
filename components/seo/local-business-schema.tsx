import { YEARS_OF_CRAFT } from "@/lib/site-content"

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
    "@id": "https://www.drafapeluqueria.com/#business",
    "name": "D' Rafa Peluquería",
    "description": `Barbería y peluquería premium en Santo Domingo, República Dominicana con más de ${YEARS_OF_CRAFT} años de experiencia. La mejor barbería cerca de ti en Ensanche Carmelita. Especialistas en cortes masculinos y femeninos, servicios profesionales de alta calidad.`,
    "url": "https://www.drafapeluqueria.com",
    "telephone": "+1-809-767-2490",
    "priceRange": "$$",
    "currenciesAccepted": "DOP",
    "paymentAccepted": "Cash, Credit Card",
    "image": [
      "https://www.drafapeluqueria.com/assets/vintage-.webp",
      "https://www.drafapeluqueria.com/assets/quienesomos.webp",
      "https://www.drafapeluqueria.com/assets/banner2.webp"
    ],
    "logo": "https://www.drafapeluqueria.com/iconbarber.svg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Respaldo Calle 4, Ensanche Carmelita",
      "addressLocality": "Santo Domingo",
      "addressRegion": "Distrito Nacional",
      "postalCode": "10131",
      "addressCountry": "DO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "18.4801674",
      "longitude": "-69.9498448"
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
      },
      {
        // Declarar el día cerrado explícitamente evita que Google infiera
        // horarios a partir de otras fuentes.
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Monday",
        "opens": "00:00",
        "closes": "00:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/rafa_eldon/",
      "https://www.facebook.com/RafaelDondelcorte",
      "https://wa.me/18097672490",
      "https://www.google.com/maps/place/?q=place_id:ChIJqX-RDUiJr44RC2yG2fkCkTM"
    ],
    "hasMap": "https://www.google.com/maps/place/?q=place_id:ChIJqX-RDUiJr44RC2yG2fkCkTM",
    "founder": {
      "@type": "Person",
      "name": "Rafa",
      "jobTitle": "Master Barber",
      "worksFor": {
        "@type": "HairSalon",
        "name": "D' Rafa Peluquería"
      }
    },
    "employee": [
      {
        "@type": "Person",
        "name": "Rafa",
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
          // El servicio existe en el menu pero no se esta prestando. Declararlo
          // agotado es mas honesto que borrarlo: Google no lo anuncia como
          // disponible y el dia que vuelva basta con quitar esta linea.
          "availability": "https://schema.org/OutOfStock",
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
    // `aggregateRating` y `review` se emiten aparte, en <GoogleReviewsSchema />,
    // y solo cuando provienen de la Google Places API. Publicar calificaciones o
    // reseñas inventadas incumple las guidelines de datos estructurados de
    // Google y expone el sitio a una acción manual por spam.
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(baseSchema),
      }}
    />
  )
} 