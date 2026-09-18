'use client'

import * as React from 'react'
import { domAnimation, LazyMotion } from 'framer-motion'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <LazyMotion features={domAnimation} strict>{children}</LazyMotion>
    </NextThemesProvider>
  )
}
