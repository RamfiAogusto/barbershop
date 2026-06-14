'use client'

import { sendGAEvent } from '@next/third-parties/google'

type WhatsAppSource =
  | 'floating-button'
  | 'header-cta'
  | 'hero-cta'
  | 'booking-cta'
  | 'contact-section'
  | 'faq-contact'
  | 'service-card'
  | 'blog-cta'

export function trackWhatsAppClick(source: WhatsAppSource, extra?: Record<string, string>) {
  sendGAEvent('event', 'generate_lead', {
    method: 'whatsapp',
    source,
    value: 1,
    ...extra,
  })
}
