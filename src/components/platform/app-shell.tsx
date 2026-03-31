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
  Flame,
  Trophy,
  Compass,
  LogOut,
} from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { motion } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/explore', label: 'Explore', icon: Compass },
  { href: '/challenges', label: 'Challenges', icon: Swords },
  { href: '/playground', label: 'Playground', icon: Terminal },
  { href: '/ai-explain', label: 'AI Explainer', icon: Bot },
  { href: '/leaderboard', label: 'Leaderboard', icon: Medal },
  { href: '/settings', label: 'Settings', icon: Settings },
]

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const userName = session?.user?.name || 'Learner'
  const userInitial = userName.charAt(0).toUpperCase()

  return (
    <div className="min-h-screen bg-background grid-pattern">
      {/* Header */}
      <header className="glass sticky top-0 z-40">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2.5 font-bold tracking-tight">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 shadow-lg shadow-primary/10"
            >
              <Terminal className="h-5 w-5 text-primary" />
            </motion.span>
            <span className="text-lg">Terminal<span className="text-primary">Dojo</span></span>
          </Link>

          {/* Search */}
          <button
            type="button"
            className="glass hidden h-10 items-center gap-2.5 rounded-xl px-4 text-sm text-foreground-muted transition-all duration-200 hover:border-border-hover hover:text-foreground md:inline-flex"
          >
            <Search className="h-4 w-4" />
            <span>Search commands...</span>
            <kbd className="ml-4 rounded-md border border-border bg-background-secondary px-1.5 py-0.5 text-[10px] text-foreground-subtle">⌘K</kbd>
          </button>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-sm font-semibold text-orange-400"
            >
              <Flame className="h-4 w-4" />
              <span>{session ? '🔥' : '0'}</span>
            </motion.span>

            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-sm font-semibold text-amber-400"
            >
              <Trophy className="h-4 w-4" />
              <span>XP</span>
            </motion.span>

            <ThemeToggle />

            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="hidden h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-black md:flex"
              title={`Sign out (${userName})`}
            >
              {userInitial}
            </button>
          </div>
        </div>
      </header>

      {/* Content area */}
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-8 pt-6 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-[88px] space-y-1 rounded-2xl border border-border bg-background-secondary/30 p-3 backdrop-blur-sm">
            <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-subtle">
              Navigation
            </p>
            <nav className="space-y-0.5">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground-muted hover:bg-background-tertiary/50 hover:text-foreground'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-xl border border-primary/20 bg-primary/5"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon className="relative z-10 h-[18px] w-[18px]" />
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <div className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Level progress */}
            <div className="mt-4 rounded-xl border border-border bg-background-secondary/50 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">Level 5</span>
                <span className="text-foreground-muted">1,240 / 1,500 XP</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background-tertiary">
                <div className="progress-bar-animated h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: '82%' }} />
              </div>
              <p className="mt-1.5 text-[10px] text-foreground-subtle">260 XP to Power User</p>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 space-y-6 pb-20 lg:pb-0">{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="glass fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 p-1.5 lg:hidden">
        {[
          { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
          { href: '/explore', label: 'Explore', icon: Compass },
          { href: '/challenges', label: 'Tasks', icon: Swords },
          { href: '/playground', label: 'Terminal', icon: Terminal },
          { href: '/settings', label: 'Profile', icon: Settings },
        ].map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 rounded-xl py-2 text-[10px] transition-colors ${
                isActive ? 'text-primary' : 'text-foreground-muted'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
