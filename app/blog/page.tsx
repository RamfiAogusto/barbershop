import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { getAllPosts } from "@/lib/blog-posts"

export const metadata: Metadata = {
  title: "Blog de Barbería y Estilo Masculino",
  description:
    "Guías reales y consejos prácticos sobre cortes, cuidado del cabello, barba y tendencias. Por nuestro maestro barbero en Santo Domingo.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog D' Rafa Peluquería - Consejos de barbería y estilo masculino",
    description:
      "Guías reales y consejos prácticos sobre cortes, cuidado del cabello, barba y tendencias. Por nuestro maestro barbero en Santo Domingo.",
    url: "https://www.drafapeluqueria.com/blog",
    siteName: "D' Rafa Peluquería",
    images: [
      {
        url: "https://www.drafapeluqueria.com/assets/og-image.jpg",
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
    images: ["https://www.drafapeluqueria.com/assets/og-image.jpg"],
  },
}

const breadcrumbs = [
  { name: "Inicio", href: "/" },
  { name: "Blog", href: "/blog" },
]

export default function BlogPage() {
  const posts = getAllPosts()
  const [featured, ...rest] = posts

  const stamp = (iso: string) => format(new Date(iso), "d 'de' MMMM, yyyy", { locale: es })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border pb-14 pt-32">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
            <Breadcrumbs items={breadcrumbs} />
            <span className="rule-accent" />
            <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,4.8rem)] font-bold text-foreground">
              Blog
            </h1>
            <p className="mt-5 max-w-[54ch] leading-relaxed text-muted-foreground">
              Guías prácticas y consejos de cuidado escritos desde la silla, no copiados
              de internet.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
            {/* El más reciente ocupa una fila entera. Los demás van en lista,
                no en una reja de tarjetas iguales. */}
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid grid-cols-1 gap-8 border-b border-border pb-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <span className="h-[2px] w-6 bg-primary" />
                    <span className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-faint">
                      Lo último
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-bold text-foreground transition-colors group-hover:text-primary">
                    {featured.title}
                  </h2>
                  <p className="mt-4 max-w-[52ch] leading-relaxed text-muted-foreground">
                    {featured.excerpt}
                  </p>
                  <span className="mt-6 text-sm text-faint">{stamp(featured.publishedAt)}</span>
                </div>
              </Link>
            )}

            <div>
              {rest.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group grid grid-cols-[auto_1fr] items-start gap-5 border-b border-border py-8 transition-colors duration-300 hover:bg-surface sm:grid-cols-[3.5rem_minmax(0,9rem)_1fr_auto] sm:gap-8 sm:py-9"
                >
                  <span className="tick hidden pt-2 sm:block">
                    {String(i + 2).padStart(2, "0")}
                  </span>

                  <div className="relative hidden aspect-[4/3] w-full overflow-hidden bg-surface sm:block">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="9rem"
                      className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
                    />
                  </div>

                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                      {post.title}
                    </h2>
                    <p className="mt-2 max-w-[62ch] text-[0.95rem] leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <span className="mt-3 block text-sm text-faint">
                      {stamp(post.publishedAt)}
                    </span>
                  </div>

                  <ArrowUpRight
                    size={20}
                    weight="bold"
                    className="hidden shrink-0 self-center text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary sm:block"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
