import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Clock, User, Tag } from "lucide-react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { LocalBusinessSchema } from "@/components/seo/local-business-schema"
import { getAllPosts } from "@/lib/blog-posts"

export const metadata: Metadata = {
  title: "Blog D' Rafa Peluquería - Consejos de barbería, estilo y cuidado masculino",
  description:
    "Guías reales y consejos prácticos sobre cortes, cuidado del cabello, barba y tendencias. Por nuestro maestro barbero en Santo Domingo.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog D' Rafa Peluquería - Consejos de barbería y estilo masculino",
    description:
      "Guías reales y consejos prácticos sobre cortes, cuidado del cabello, barba y tendencias. Por nuestro maestro barbero en Santo Domingo.",
    url: "https://drafapeluqueria.com/blog",
    siteName: "D' Rafa Peluquería",
    images: [
      {
        url: "https://drafapeluqueria.com/assets/banner2.webp",
        width: 1200,
        height: 630,
        alt: "Blog D' Rafa Peluquería",
      },
    ],
    locale: "es_DO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog D' Rafa Peluquería - Consejos de barbería y estilo masculino",
    description:
      "Guías reales y consejos prácticos sobre cortes, cuidado del cabello, barba y tendencias.",
    images: ["https://drafapeluqueria.com/assets/banner2.webp"],
  },
}

const breadcrumbs = [
  { name: "Inicio", href: "/" },
  { name: "Blog", href: "/blog" },
]

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-black text-white">
      <LocalBusinessSchema />
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-16 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/assets/banner2.webp"
            alt="Blog D' Rafa Peluquería"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={breadcrumbs} className="text-gray-400 mb-8" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-amber-500">Blog</span> D' Rafa Peluquería
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Guías prácticas, tendencias y consejos de cuidado masculino escritos por nuestro
            maestro barbero en Santo Domingo.
          </p>
          <div className="w-20 h-1 bg-amber-500 mt-6" />
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-amber-500/50 transition-all duration-300"
              >
                {/* Cover image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  {/* Tags overlay */}
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 bg-amber-500/90 text-black text-xs font-semibold px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h2 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-amber-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm flex-1 mb-4 line-clamp-3">{post.excerpt}</p>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 border-t border-gray-800 pt-4 mt-auto">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3 text-amber-500" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag className="h-3 w-3 text-amber-500" />
                      {format(new Date(post.publishedAt), "dd MMM yyyy", { locale: es })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-amber-500" />
                      {post.readingMinutes} min lectura
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">¿Listo para tu próximo corte?</h2>
          <p className="text-black/80 text-lg mb-6">
            Aplica lo que aprendiste y agenda tu cita con Rafa en Ensanche Carmelita.
          </p>
          <a
            href="https://wa.me/18097672490"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black hover:bg-gray-900 text-white font-bold text-lg py-4 px-8 rounded-md transition-colors"
          >
            Reservar por WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
