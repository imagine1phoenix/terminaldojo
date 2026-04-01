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
  ChevronLeft,
  ChevronRight,
  Home,
} from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { motion } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/explore', label: 'Explore', icon: Compass },
  { href: '/challenges', label: 'Challenges', icon: Swords },
  { href: '/playground', label: 'Playground', icon: Terminal },
  { href: '/ai-explain', label: 'AI Explainer', icon: Bot },
  { href: '/leaderboard', label: 'Leaderboard', icon: Medal },
]

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const userName = session?.user?.name || 'Learner'
  const userInitial = userName.charAt(0).toUpperCase()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background grid-pattern">
      {/* Header */}
      <header className="glass fixed inset-x-0 top-0 z-40">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          {/* Logo & Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden items-center justify-center rounded-xl p-2 text-foreground-muted transition-all hover:bg-background-tertiary hover:text-foreground lg:flex"
            >
              {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>

            <Link href="/" className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.05 }}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20"
              >
                <Terminal className="h-5 w-5 text-white" />
              </motion.div>
              <span className="text-lg font-bold tracking-tight">
                Terminal<span className="text-primary">Dojo</span>
              </span>
            </Link>
          </div>

          {/* Search */}
          <button
            type="button"
            className="hidden h-10 items-center gap-3 rounded-xl border border-border bg-background-secondary/50 px-4 text-sm text-foreground-muted transition-all hover:border-border-hover lg:flex"
          >
            <Search className="h-4 w-4" />
            <span>Search commands...</span>
            <kbd className="ml-4 rounded-md border border-border bg-background-tertiary px-2 py-0.5 text-xs">⌘K</kbd>
          </button>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden items-center gap-2 rounded-full border border-streak-orange/30 bg-streak-orange/10 px-3 py-1.5 text-sm font-semibold text-streak-orange sm:inline-flex"
            >
              <Flame className="h-4 w-4" />
              <span>7 day streak</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden items-center gap-2 rounded-full border border-xp-gold/30 bg-xp-gold/10 px-3 py-1.5 text-sm font-semibold text-xp-gold sm:inline-flex"
            >
              <Trophy className="h-4 w-4" />
              <span>2,450 XP</span>
            </motion.div>

            <div className="h-8 w-px bg-border hidden lg:block" />

            <ThemeToggle />

            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
              title={`Sign out (${userName})`}
            >
              {userInitial}
            </button>
          </div>
        </div>
      </header>

      {/* Content area */}
      <div className={`flex pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-[88px]' : 'lg:pl-[280px]'}`}>
        {/* Sidebar */}
        <aside className={`hidden fixed left-0 top-16 bottom-0 z-30 lg:block transition-all duration-300 ${sidebarCollapsed ? 'w-[88px]' : 'w-[280px]'}`}>
          <div className={`flex h-full flex-col p-4 ${sidebarCollapsed ? 'items-center' : ''}`}>
            <nav className={`flex-1 space-y-1 rounded-2xl border border-border bg-background-secondary/40 backdrop-blur-sm p-3 ${sidebarCollapsed ? 'w-full' : ''}`}>
              {sidebarCollapsed ? (
                <div className="flex flex-col items-center gap-2">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`group relative flex h-11 w-11 items-center justify-center rounded-xl transition-all ${
                          isActive
                            ? 'bg-primary/10 text-primary shadow-lg shadow-primary/10'
                            : 'text-foreground-muted hover:bg-background-tertiary hover:text-foreground'
                        }`}
                        title={item.label}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeNavCollapsed"
                            className="absolute inset-0 rounded-xl border border-primary/20"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                        <Icon className="relative h-5 w-5" />
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <>
                  <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-subtle">
                    Main Menu
                  </p>
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-foreground-muted hover:bg-background-tertiary hover:text-foreground'
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
                </>
              )}
            </nav>

            {/* Level Progress */}
            {!sidebarCollapsed && (
              <div className="mt-4 rounded-2xl border border-border bg-background-secondary/40 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">Level 8</span>
                  <span className="text-foreground-muted">2,450 / 3,000 XP</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-background-tertiary">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '82%' }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
                <p className="mt-2 text-xs text-foreground-subtle">550 XP to下一个级别</p>
              </div>
            )}

            {/* Settings */}
            <div className="mt-4">
              <Link
                href="/settings"
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  pathname === '/settings'
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground-muted hover:bg-background-tertiary hover:text-foreground'
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
              >
                {pathname === '/settings' && (
                  <div className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
                )}
                <Settings className="relative z-10 h-[18px] w-[18px]" />
                {!sidebarCollapsed && <span className="relative z-10">Settings</span>}
              </Link>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 pb-24 lg:pb-8">
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="glass fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <div className="flex items-center justify-around py-2 px-2">
          {[
            { href: '/dashboard', label: 'Home', icon: Home },
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
                className={`flex flex-col items-center gap-0.5 rounded-xl px-4 py-2 text-[10px] transition-all ${
                  isActive ? 'text-primary' : 'text-foreground-muted'
                }`}
              >
                <div className={`relative ${isActive ? 'scale-110' : ''} transition-transform`}>
                  <Icon className="h-5 w-5" />
                  {isActive && (
                    <motion.div
                      layoutId="mobileActive"
                      className="absolute -inset-2 rounded-xl bg-primary/10"
                    />
                  )}
                </div>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
