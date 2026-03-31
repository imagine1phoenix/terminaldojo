'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const THEMES = ['system', 'dark', 'light'] as const

export function ThemeToggle() {
  const { setTheme, resolvedTheme, theme } = useTheme()

  const activeTheme = theme ?? 'system'
  const cycleTheme = () => {
    const nextIndex = (THEMES.indexOf(activeTheme as (typeof THEMES)[number]) + 1) % THEMES.length
    setTheme(THEMES[nextIndex])
  }

  const Icon =
    activeTheme === 'system' ? Monitor : resolvedTheme === 'dark' ? Moon : Sun

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background-secondary text-foreground-muted transition-colors duration-200 hover:border-border-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label="Toggle theme"
      title={`Theme: ${activeTheme}`}
    >
      <Icon className="h-4 w-4" />
    </button>
  )
}
