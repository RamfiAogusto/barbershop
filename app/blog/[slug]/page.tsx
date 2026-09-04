import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Clock, User, Calendar, ArrowLeft } from "@phosphor-icons/react/dist/ssr"

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
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <Header />

      <main className="pb-20 pt-32">
        <div className="mx-auto max-w-[46rem] px-5 sm:px-8">
          <Breadcrumbs items={breadcrumbs} className="text-muted-foreground mb-8" />

          {/* Cover image */}
          <div className="relative mb-10 aspect-[16/9] overflow-hidden bg-surface">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>

          {/* H1 */}
          <h1 className="mb-5 font-display text-[clamp(2.1rem,5vw,3.2rem)] font-bold text-foreground">
            {post.title}
          </h1>

          {/* Meta line */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-primary" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-primary" />
              {format(new Date(post.publishedAt), "dd 'de' MMMM 'de' yyyy", { locale: es })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" />
              {post.readingMinutes} min de lectura
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block border border-primary/40 bg-primary/10 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Article body */}
          <article>
            <div
              className="prose prose-invert max-w-none
                prose-headings:text-foreground
                prose-h2:font-display prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-foreground
                prose-h3:font-display prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-primary
                prose-p:text-muted-foreground prose-p:leading-[1.75] prose-p:mb-5
                prose-ul:text-muted-foreground prose-ul:my-4
                prose-ol:text-muted-foreground prose-ol:my-4
                prose-li:mb-2
                prose-strong:text-foreground
                prose-em:text-foreground
                prose-blockquote:border-primary prose-blockquote:bg-surface/50 prose-blockquote:rounded-r-lg prose-blockquote:px-4 prose-blockquote:py-2
                prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </article>

          {/* CTA */}
          <div className="mt-12 bg-primary rounded-none p-8 text-center">
            <h2 className="text-2xl font-bold text-primary-foreground mb-2">¿Listo para tu próximo corte?</h2>
            <p className="text-primary-foreground/80 mb-4">Reserva por WhatsApp con Rafa en Ensanche Carmelita, Santo Domingo.</p>
            <a
              href="https://wa.me/18097672490"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-background hover:bg-surface text-foreground font-bold py-3 px-8 rounded-none transition-colors"
            >
              Reservar ahora
            </a>
          </div>

          {/* Back to blog */}
          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary hover:text-primary transition-colors text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al Blog
            </Link>
          </div>
        </div>

        {/* Other articles */}
        {recentPosts.length > 0 && (
          <section className="mt-16 bg-surface py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-2 text-center">
                Otros <span className="text-primary">artículos</span>
              </h2>
              <div className="w-12 h-1 bg-primary mx-auto mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {recentPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group flex flex-col bg-surface border border-border rounded-none overflow-hidden hover:border-primary/50 transition-all duration-300"
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
                      <h3 className="font-bold text-sm text-foreground mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 text-primary" />
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
