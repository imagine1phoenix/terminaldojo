'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sparkles } from 'lucide-react'
import { ryuhaSchools } from '@/lib/constants/ryuha-schools'
import { RyuhaSchoolCard } from '@/components/platform/ryuha-school-card'

const filters = ['All', 'Infrastructure', 'Scripting', 'Cloud', 'Networking'] as const

export default function ExplorePage() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>('All')

  const filtered = ryuhaSchools.filter((school) => {
    const term = search.trim().toLowerCase()
    const matchSearch =
      term.length === 0 ||
      school.englishName.toLowerCase().includes(term) ||
      school.schoolName.toLowerCase().includes(term) ||
      school.kanji.includes(term) ||
      school.philosophy.toLowerCase().includes(term) ||
      school.tools.join(' ').toLowerCase().includes(term)

    const infra = ['docker', 'kubernetes', 'homebrew', 'node']
    const scripting = ['bash', 'python', 'git']
    const cloud = ['aws', 'cloud']
    const networking = ['curl']

    const bucketMap: Record<(typeof filters)[number], string[]> = {
      All: [],
      Infrastructure: infra,
      Scripting: scripting,
      Cloud: cloud,
      Networking: networking,
    }

    const allowedScenes = bucketMap[activeFilter]
    const matchFilter = activeFilter === 'All' || allowedScenes.includes(school.scene)

    return matchSearch && matchFilter
  })

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-background-secondary/90 to-background-tertiary/30 p-6 md:p-8">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />
        <h1 className="relative text-3xl font-black tracking-tight md:text-4xl">
          CLI <span className="text-gradient-primary">RyUha Schools</span>
        </h1>
        <p className="relative mt-2 text-foreground-muted">
          Enter schools, absorb their philosophy, and train command-line mastery through distinct martial lineages.
        </p>
        <div className="relative mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/35 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
          <Sparkles className="h-3.5 w-3.5" />
          3D School Illustrations Live
        </div>
      </section>

      {/* Search */}
      <section className="glass-card-static rounded-2xl p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
            placeholder="Search schools by tool, philosophy, or style"
          />
        </div>
      </section>

      {/* Filter pills */}
      <section className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeFilter === filter
                ? 'bg-primary/15 text-primary border border-primary/30'
                : 'border border-border text-foreground-muted hover:border-border-hover hover:text-foreground'
            }`}
          >
            {filter}
          </button>
        ))}
      </section>

      {/* School grid */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((school, i) => (
            <motion.div
              key={school.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <RyuhaSchoolCard school={school} />
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {filtered.length === 0 && (
        <div className="glass-card flex flex-col items-center py-16 text-center rounded-2xl">
          <Search className="h-10 w-10 text-foreground-subtle" />
          <p className="mt-4 text-lg font-semibold">No schools found</p>
          <p className="mt-1 text-sm text-foreground-muted">Try a different filter or search phrase.</p>
        </div>
      )}
    </motion.div>
  )
}
