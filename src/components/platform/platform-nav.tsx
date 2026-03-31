'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Bot,
  LayoutDashboard,
  Medal,
  Search,
  Settings,
  Swords,
  Terminal,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/explore', label: 'Explore', icon: Search },
  { href: '/challenges', label: 'Challenges', icon: Swords },
  { href: '/playground', label: 'Playground', icon: Terminal },
  { href: '/ai-explain', label: 'AI Explainer', icon: Bot },
  { href: '/leaderboard', label: 'Leaderboard', icon: Medal },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function PlatformNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-colors ${
              isActive
                ? 'border-primary/40 bg-primary/10 text-primary'
                : 'border-transparent text-foreground-muted hover:border-border hover:bg-background-tertiary/50 hover:text-foreground'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
