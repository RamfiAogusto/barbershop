/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // El optimizador debe quedar activo: con `unoptimized: true` cada <Image>
    // entrega el archivo original sin redimensionar, sin WebP/AVIF y sin
    // srcset, lo que arruina el LCP en movil.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // SEO and Performance optimizations
  poweredByHeader: false,
  // ETags let the browser revalidate with a cheap 304 instead of
  // blindly trusting a stale cached copy.
  generateEtags: true,
  compress: true,
  
  // Optimizaciones experimentales más estables
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  
  // Headers for SEO and security
  //
  // Cache-Control is deliberately NOT set on a catch-all source. A blanket
  // `max-age` on `/(.*)` also lands on the HTML document and on
  // `/_next/static/*`, which breaks the app: the browser keeps serving a stale
  // document that references build chunks from a previous deploy, hydration
  // fails, and every framer-motion element stays stuck at its SSR `opacity: 0`
  // initial state until a hard reload. Next.js already emits the correct
  // per-asset caching (immutable for hashed build output, no-store in dev), so
  // only add Cache-Control to routes we own explicitly.
  async headers() {
    return [
      // Security headers are safe to apply everywhere.
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      // Indexing directives belong on documents, not on static assets.
      {
        source: '/((?!_next/|assets/).*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
        ],
      },
      // Static media in /public is content-stable and safe to cache long,
      // with revalidation so a replaced file still propagates.
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      // Specific headers for sitemap
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },

  // Redirects for better SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/inicio',
        destination: '/',
        permanent: true,
      },
      {
        source: '/reservar',
        destination: 'https://wa.me/18097672490?text=Hola,%20me%20gustar%C3%ADa%20reservar%20una%20cita',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
