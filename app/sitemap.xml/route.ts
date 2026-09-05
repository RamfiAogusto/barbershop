import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog-posts'

/**
 * Fecha del ultimo cambio real de contenido de cada pagina estatica.
 *
 * Antes esto era `new Date()`, asi que el sitemap declaraba que las cuatro
 * paginas habian cambiado el mismo dia en que Google lo leia. Un `lastmod` que
 * siempre dice "hoy" no es informacion: Google aprende a ignorarlo, y se lleva
 * por delante tambien el de los posts, que si traen fecha real.
 *
 * Hay que tocar la fecha al cambiar el contenido de la pagina. `/blog` no esta
 * aqui a proposito: se deriva del post mas reciente, que no se puede olvidar.
 */
const PAGE_LAST_MODIFIED = {
  home: '2026-09-05',
  servicios: '2026-09-05',
  faq: '2026-09-05',
} as const

export async function GET(): Promise<Response> {
  const baseUrl = 'https://www.drafapeluqueria.com'
  const allPosts = getAllPosts()

  // getAllPosts ya ordena de mas reciente a mas antiguo.
  const newestPost = allPosts[0]

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(PAGE_LAST_MODIFIED.home),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(PAGE_LAST_MODIFIED.servicios),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(PAGE_LAST_MODIFIED.faq),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(newestPost?.publishedAt ?? PAGE_LAST_MODIFIED.home),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...allPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap
  .map(
    (item) => `
  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastModified instanceof Date ? item.lastModified.toISOString() : item.lastModified}</lastmod>
    <changefreq>${item.changeFrequency}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
