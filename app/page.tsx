import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Services } from "@/components/sections/services"
import { HoursBand } from "@/components/sections/hours-band"
import { Gallery } from "@/components/sections/gallery"
import { Contact } from "@/components/sections/contact"
import { TestimonialsSection } from "@/components/testimonials/testimonials-section"
import { fetchGoogleReviews } from "@/lib/google-reviews"

export default async function Home() {
  // Deduplicado con el fetch del layout: Next reusa la misma petición.
  const reviews = await fetchGoogleReviews()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <HoursBand />
        <Gallery />
        <TestimonialsSection initialPayload={reviews} />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
