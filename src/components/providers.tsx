'use client'

import { SessionProvider } from 'next-auth/react'
import { DojoEffectsProvider } from '@/components/dojo-effects-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <DojoEffectsProvider>{children}</DojoEffectsProvider>
    </SessionProvider>
  )
}
