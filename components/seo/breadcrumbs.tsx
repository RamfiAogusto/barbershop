import Link from 'next/link'
import { CaretRight } from "@phosphor-icons/react/dist/ssr"
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.drafapeluqueria.com${item.href}`
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      
      <nav aria-label="Breadcrumb" className={cn("flex items-center space-x-2 text-sm text-muted-foreground mb-6", className)}>
        {items.map((item, index) => (
          <div key={item.href} className="flex items-center">
            {index > 0 && <CaretRight size={13} weight="bold" className="mx-2 text-faint" />}
            {index === items.length - 1 ? (
              <span className="text-foreground font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  )
} 