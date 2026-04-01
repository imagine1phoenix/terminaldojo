'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { signOut, useSession } from 'next-auth/react'
import {
  Bell,
  BookMarked,
  Bot,
  Compass,
  Flame,
  Footprints,
  Gem,
  Grip,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  Sword,
  UserRound,
  Waypoints,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { commandItems, challengeItems } from '@/lib/mock-data'
import { ryuhaSchools } from '@/lib/constants/ryuha-schools'
import { ThemeToggle } from '@/components/theme-toggle'
import { DisciplineLanternStreak } from '@/components/platform/discipline-lantern-streak'
import { cn } from '@/lib/utils'
import { useShellUiStore } from '@/lib/stores/shell-ui'

interface AppShellProps {
  children: React.ReactNode
}

interface NavItem {
  href: string
  shortLabel: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

interface PaletteItem {
  id: string
  label: string
  subtitle: string
  href: string
  type: 'nav' | 'command' | 'challenge' | 'school'
}

const navItems: NavItem[] = [
  { href: '/app/dashboard', shortLabel: 'Train', label: 'Training', icon: LayoutDashboard },
  { href: '/app/explore', shortLabel: 'Browse', label: 'Browse', icon: Compass },
  { href: '/app/challenges', shortLabel: 'Trials', label: 'Challenges', icon: Sword },
  { href: '/app/paths', shortLabel: 'Paths', label: 'Paths', icon: Waypoints },
  { href: '/app/scrolls', shortLabel: 'Guides', label: 'Scrolls', icon: BookMarked },
  { href: '/app/ai-explain', shortLabel: 'Sensei', label: 'Ask Sensei', icon: Bot },
  { href: '/app/profile', shortLabel: 'Profile', label: 'Profile', icon: UserRound },
  { href: '/app/settings', shortLabel: 'Config', label: 'Settings', icon: Settings },
]

const segmentLabels: Record<string, string> = {
  dashboard: 'Training',
  explore: 'Browse',
  challenges: 'Challenges',
  challenge: 'Challenges',
  paths: 'Paths',
  scrolls: 'Scrolls',
  'ai-explain': 'Ask Sensei',
  profile: 'Profile',
  settings: 'Settings',
  command: 'Command Detail',
  leaderboard: 'Leaderboard',
  playground: 'Dojo Terminal',
}

function titleize(value: string): string {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function scoreResult(label: string, query: string): number {
  const normalizedLabel = label.toLowerCase()
  const normalizedQuery = query.toLowerCase()
  const idx = normalizedLabel.indexOf(normalizedQuery)
  if (idx === -1) return -1
  return Math.max(1, 100 - idx * 2 - Math.abs(normalizedLabel.length - normalizedQuery.length))
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const paletteInputRef = useRef<HTMLInputElement | null>(null)

  const {
    sidebarCollapsed,
    mobileNavOpen,
    paletteOpen,
    unreadNotifications,
    toggleSidebarCollapsed,
    setMobileNavOpen,
    setPaletteOpen,
    markNotificationsRead,
  } = useShellUiStore()

  const [query, setQuery] = useState('')

  const userName = session?.user?.name || 'Shell Adept'
  const userInitial = userName.charAt(0).toUpperCase()

  const paletteItems = useMemo<PaletteItem[]>(() => {
    const navSearch = navItems.map((item) => ({
      id: `nav-${item.href}`,
      label: `${item.shortLabel} ${item.label}`,
      subtitle: 'Navigation',
      href: item.href,
      type: 'nav' as const,
    }))

    const commandSearch = commandItems.map((item) => ({
      id: `command-${item.slug}`,
      label: item.name,
      subtitle: `${item.category} command`,
      href: `/app/command/${item.slug}`,
      type: 'command' as const,
    }))

    const challengeSearch = challengeItems.slice(0, 10).map((item) => ({
      id: `challenge-${item.id}`,
      label: item.title,
      subtitle: `${item.difficulty} challenge`,
      href: `/app/challenge/${item.id}`,
      type: 'challenge' as const,
    }))

    const schoolSearch = ryuhaSchools.map((item) => ({
      id: `school-${item.id}`,
      label: item.englishName,
      subtitle: `${item.kanji} school`,
      href: item.route.startsWith('/app/') ? item.route : '/app/explore',
      type: 'school' as const,
    }))

    return [...navSearch, ...commandSearch, ...challengeSearch, ...schoolSearch]
  }, [])

  const filteredResults = useMemo(() => {
    const trimmed = query.trim()
    if (!trimmed) return paletteItems.slice(0, 10)

    return paletteItems
      .map((item) => ({ item, score: scoreResult(`${item.label} ${item.subtitle}`, trimmed) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((entry) => entry.item)
  }, [paletteItems, query])

  const crumbs = useMemo(() => {
    if (pathname === '/app/dashboard') return []

    const segments = pathname.replace('/app/', '').split('/').filter(Boolean)
    const mapped = segments.map((segment, index) => {
      const href = `/app/${segments.slice(0, index + 1).join('/')}`
      const label = segmentLabels[segment] || titleize(segment)
      return { href, label }
    })

    return [{ href: '/app/dashboard', label: 'Dashboard' }, ...mapped]
  }, [pathname])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen(true)
      }
      if (event.key === 'Escape') {
        setPaletteOpen(false)
        setMobileNavOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [setMobileNavOpen, setPaletteOpen])

  useEffect(() => {
    if (!paletteOpen) return
    const id = window.setTimeout(() => paletteInputRef.current?.focus(), 20)
    return () => window.clearTimeout(id)
  }, [paletteOpen])

  useEffect(() => {
    setMobileNavOpen(false)
  }, [pathname, setMobileNavOpen])

  const handlePaletteNavigate = (href: string) => {
    setPaletteOpen(false)
    setQuery('')
    router.push(href)
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  if (pathname === '/app/onboarding') {
    return <div className="min-h-screen bg-[#02030a] p-3 sm:p-6">{children}</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-black">
        Skip to main content
      </a>
      <a href="#primary-navigation" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-16 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-black">
        Skip to navigation
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-red-500/20 bg-[#06070c]/95 backdrop-blur-xl">
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-3 px-3 sm:px-5">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-slate-200 transition-colors hover:border-cyan-300/40 hover:text-cyan-200 md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={toggleSidebarCollapsed}
              className="hidden h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-slate-200 transition-colors hover:border-cyan-300/40 hover:text-cyan-200 md:inline-flex"
              aria-label="Collapse navigation"
            >
              <Grip className="h-4 w-4" />
            </button>

            <Link href="/app/dashboard" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 via-fuchsia-500 to-cyan-400 text-black shadow-[0_0_24px_rgba(255,0,120,0.35)]">
                <Footprints className="h-4 w-4" />
              </span>
              <div className="hidden sm:block">
                <p className="text-sm font-black leading-tight text-white">ShellSensei</p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Command Line Dojo</p>
              </div>
            </Link>
          </div>

          <p className="hidden text-center text-xs font-semibold uppercase tracking-[0.28em] text-red-300 lg:block">
            Dojo Control
          </p>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="hidden items-center gap-2 rounded-lg border border-white/15 bg-black/35 px-2.5 py-1.5 text-xs text-slate-300 transition-colors hover:border-cyan-300/40 hover:text-cyan-200 sm:flex"
              aria-label="Open command palette"
            >
              <Search className="h-3.5 w-3.5" />
              <span>⌘K</span>
            </button>

            <DisciplineLanternStreak streakDays={9} className="hidden lg:flex" />

            <span className="hidden items-center gap-1 rounded-lg border border-amber-400/35 bg-amber-500/15 px-2 py-1 text-xs font-semibold text-amber-300 sm:inline-flex">
              <Gem className="h-3.5 w-3.5" />
              1,234 Ki
            </span>

            <button
              type="button"
              onClick={markNotificationsRead}
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-slate-200 transition-colors hover:border-cyan-300/40 hover:text-cyan-200"
              aria-label="Open notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadNotifications > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />}
            </button>

            <ThemeToggle />

            <Link
              href="/app/settings"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-slate-200 transition-colors hover:border-cyan-300/40 hover:text-cyan-200"
              aria-label="Open settings"
            >
              <Settings className="h-4 w-4" />
            </Link>

            <span className="hidden h-9 w-9 items-center justify-center rounded-lg border border-violet-400/40 bg-violet-500/10 text-xs font-bold text-violet-200 sm:inline-flex">
              {userInitial}
            </span>

            <button
              type="button"
              onClick={() => signOut({ callbackUrl: '/app/login' })}
              className="inline-flex items-center gap-1 rounded-lg border border-red-400/30 bg-red-500/10 px-2 py-1.5 text-xs font-semibold text-red-300 transition-colors hover:bg-red-500/20"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="pt-16 md:grid md:grid-cols-[auto_1fr]">
        <aside
          id="primary-navigation"
          className={cn(
            'hidden border-r border-white/10 bg-[#07090f] md:block',
            sidebarCollapsed ? 'w-[84px]' : 'w-[280px]',
          )}
        >
          <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col p-3">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'group flex items-center rounded-xl border px-2.5 py-2 transition-colors',
                      active
                        ? 'border-red-500/30 bg-red-500/10 text-red-200'
                        : 'border-transparent text-slate-300 hover:border-cyan-400/25 hover:bg-cyan-400/8 hover:text-cyan-100',
                      sidebarCollapsed ? 'justify-center' : 'gap-3',
                    )}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="flex flex-col leading-tight">
                        <span className="text-sm font-semibold">{item.shortLabel}</span>
                        <span className="text-[11px] text-slate-400">{item.label}</span>
                      </span>
                    )}
                  </Link>
                )
              })}
            </nav>

            <div className={cn('mt-auto rounded-xl border border-white/10 bg-black/25 p-3', sidebarCollapsed && 'p-2')}>
              {sidebarCollapsed ? (
                <div className="flex justify-center">
                  <ThemeToggle />
                </div>
              ) : (
                <>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Theme</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-slate-300">Dark/Light</span>
                    <ThemeToggle />
                  </div>
                </>
              )}
            </div>
          </div>
        </aside>

        <main id="main-content" className="min-w-0 bg-[radial-gradient(circle_at_8%_15%,rgba(255,23,68,0.1),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(0,204,255,0.09),transparent_33%)]">
          <div className="mx-auto max-w-[1600px] px-3 pb-14 pt-4 sm:px-5 md:pt-5 lg:px-7">
            {crumbs.length > 0 && (
              <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-sm text-slate-400">
                {crumbs.map((crumb, index) => {
                  const last = index === crumbs.length - 1
                  return (
                    <span key={crumb.href} className="inline-flex items-center gap-1">
                      {last ? (
                        <span className="font-medium text-slate-200">{crumb.label}</span>
                      ) : (
                        <Link href={crumb.href} className="transition-colors hover:text-cyan-200">
                          {crumb.label}
                        </Link>
                      )}
                      {!last && <span className="text-slate-500">/</span>}
                    </span>
                  )
                })}
              </nav>
            )}
            {children}
          </div>
        </main>
      </div>

      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm md:hidden"
          >
            <motion.div
              initial={{ x: -28, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -28, opacity: 0 }}
              className="h-full w-[84%] max-w-[360px] border-r border-white/15 bg-[#06080f] p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-bold text-white">ShellSensei</p>
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 text-slate-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.href)

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-xl border px-3 py-2.5',
                        active
                          ? 'border-red-500/30 bg-red-500/10 text-red-200'
                          : 'border-transparent text-slate-300',
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="flex flex-col leading-tight">
                        <span className="text-sm font-semibold">{item.shortLabel}</span>
                        <span className="text-[11px] text-slate-400">{item.label}</span>
                      </span>
                    </Link>
                  )
                })}
              </nav>

              <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-3">
                <p className="text-xs text-slate-400">Signed in as</p>
                <p className="text-sm font-semibold text-slate-100">{userName}</p>
                <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-amber-400/35 bg-amber-500/12 px-2 py-1 text-xs font-semibold text-amber-300">
                  <Flame className="h-3 w-3" /> 9 day streak
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {paletteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/70 p-3 backdrop-blur-sm sm:p-8"
            onClick={() => setPaletteOpen(false)}
          >
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={(event) => event.stopPropagation()}
              className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-cyan-400/25 bg-[#06080f] shadow-[0_0_28px_rgba(0,204,255,0.12)]"
            >
              <div className="border-b border-white/10 p-3">
                <input
                  ref={paletteInputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && filteredResults[0]) {
                      handlePaletteNavigate(filteredResults[0].href)
                    }
                  }}
                  placeholder="Search commands, schools, paths..."
                  aria-label="Command palette search"
                  className="w-full rounded-lg border border-white/15 bg-black/35 px-3 py-2 text-sm text-slate-100 outline-none ring-cyan-300/30 placeholder:text-slate-500 focus:ring-2"
                />
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2">
                {filteredResults.length === 0 ? (
                  <p className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-400">No results found.</p>
                ) : (
                  filteredResults.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handlePaletteNavigate(item.href)}
                      className="flex w-full items-center justify-between rounded-lg border border-transparent px-3 py-2 text-left transition-colors hover:border-cyan-400/25 hover:bg-cyan-400/10"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-slate-100">{item.label}</span>
                        <span className="block text-xs text-slate-400">{item.subtitle}</span>
                      </span>
                      <span className="rounded border border-white/15 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.1em] text-cyan-300">{item.type}</span>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
