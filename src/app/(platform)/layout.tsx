'use client'

import { AppShell } from '@/components/platform/app-shell'

interface PlatformLayoutProps {
  children: React.ReactNode
}

export default function PlatformLayout({ children }: PlatformLayoutProps) {
  return <AppShell>{children}</AppShell>
}
