import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Clock, User, Calendar, ArrowLeft } from "lucide-react"
import Script from "next/script"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { getAllPosts, getPostBySlug, getRecentPosts } from "@/lib/blog-posts"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: "Artículo no encontrado | Blog D' Rafa Peluquería",
    }
  }

  const baseUrl = "https://www.drafapeluqueria.com"

  return {
    title: `${post.title} | Blog D' Rafa Peluquería`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Blog D' Rafa Peluquería`,
      description: post.excerpt,
      url: `${baseUrl}/blog/${post.slug}`,
      siteName: "D' Rafa Peluquería",
      images: [
        {
          url: `${baseUrl}${post.coverImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "es_DO",
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`${baseUrl}${post.coverImage}`],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const baseUrl = "https://www.drafapeluqueria.com"

  const recentPosts = getRecentPosts(4).filter((p) => p.slug !== post.slug).slice(0, 3)

  const breadcrumbs = [
    { name: "Inicio", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${post.slug}` },
  ]

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${baseUrl}${post.coverImage}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "D' Rafa Peluquería",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/assets/vintage-.webp`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Script
        id="blog-posting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Breadcrumbs items={breadcrumbs} className="text-gray-400 mb-8" />

          {/* Cover image */}
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-8">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* H1 */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Meta line */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4 pb-4 border-b border-gray-800">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-amber-500" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-amber-500" />
              {format(new Date(post.publishedAt), "dd 'de' MMMM 'de' yyyy", { locale: es })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-amber-500" />
              {post.readingMinutes} min de lectura
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-medium px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Article body */}
          <article>
            <div
              className="prose prose-invert prose-amber max-w-none
                prose-headings:text-white
                prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-white
                prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-amber-400
                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                prose-ul:text-gray-300 prose-ul:my-4
                prose-ol:text-gray-300 prose-ol:my-4
                prose-li:mb-2
                prose-strong:text-white
                prose-em:text-gray-200
                prose-blockquote:border-amber-500 prose-blockquote:bg-gray-900/50 prose-blockquote:rounded-r-lg prose-blockquote:px-4 prose-blockquote:py-2
                prose-a:text-amber-400 prose-a:no-underline hover:prose-a:text-amber-300 hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </article>

          {/* CTA */}
          <div className="mt-12 bg-amber-500 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-black mb-2">¿Listo para tu próximo corte?</h2>
            <p className="text-black/80 mb-4">Reserva por WhatsApp con Rafa en Ensanche Carmelita, Santo Domingo.</p>
            <a
              href="https://wa.me/18097672490"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-black hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-md transition-colors"
            >
              Reservar ahora
            </a>
          </div>

          {/* Back to blog */}
          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al Blog
            </Link>
          </div>
        </div>

        {/* Other articles */}
        {recentPosts.length > 0 && (
          <section className="mt-16 bg-gray-950 py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-2 text-center">
                Otros <span className="text-amber-500">artículos</span>
              </h2>
              <div className="w-12 h-1 bg-amber-500 mx-auto mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {recentPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group flex flex-col bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-amber-500/50 transition-all duration-300"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={related.coverImage}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm text-white mb-2 leading-snug group-hover:text-amber-400 transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3 text-amber-500" />
                        {related.readingMinutes} min
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
