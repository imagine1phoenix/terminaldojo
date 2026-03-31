'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, CheckCircle2, Clock, Circle } from 'lucide-react'

const commands = [
  { name: 'grep', slug: 'grep', description: 'Search for patterns in files', category: 'Linux Core', icon: '🐧', difficulty: 'beginner' as const, status: 'completed' as const },
  { name: 'find', slug: 'find', description: 'Find files and directories', category: 'Linux Core', icon: '🐧', difficulty: 'beginner' as const, status: 'in_progress' as const },
  { name: 'awk', slug: 'awk', description: 'Process structured text by columns', category: 'Text Processing', icon: '📝', difficulty: 'advanced' as const, status: 'not_started' as const },
  { name: 'docker run', slug: 'docker-run', description: 'Start containers with custom options', category: 'Docker', icon: '🐳', difficulty: 'intermediate' as const, status: 'not_started' as const },
  { name: 'kubectl get', slug: 'kubectl-get', description: 'Inspect cluster resources', category: 'Kubernetes', icon: '☸️', difficulty: 'intermediate' as const, status: 'in_progress' as const },
  { name: 'git rebase', slug: 'git-rebase', description: 'Reapply commits on another base', category: 'Git CLI', icon: '🌿', difficulty: 'advanced' as const, status: 'not_started' as const },
  { name: 'curl', slug: 'curl', description: 'Transfer data with various protocols', category: 'Networking', icon: '🌐', difficulty: 'beginner' as const, status: 'completed' as const },
  { name: 'chmod', slug: 'chmod', description: 'Change file access permissions', category: 'Linux Core', icon: '🐧', difficulty: 'beginner' as const, status: 'completed' as const },
  { name: 'ssh', slug: 'ssh', description: 'Secure remote server connections', category: 'Networking', icon: '🌐', difficulty: 'intermediate' as const, status: 'in_progress' as const },
  { name: 'tar', slug: 'tar', description: 'Archive and compress files', category: 'Linux Core', icon: '🐧', difficulty: 'beginner' as const, status: 'not_started' as const },
  { name: 'tmux', slug: 'tmux', description: 'Terminal multiplexer for sessions', category: 'Power Tools', icon: '⚡', difficulty: 'intermediate' as const, status: 'not_started' as const },
  { name: 'jq', slug: 'jq', description: 'Command-line JSON processor', category: 'Power Tools', icon: '⚡', difficulty: 'intermediate' as const, status: 'not_started' as const },
]

const categories = ['All', 'Linux Core', 'Git CLI', 'Docker', 'Kubernetes', 'Networking', 'Text Processing', 'Power Tools']
const difficulties = ['All', 'beginner', 'intermediate', 'advanced']

const statusIcon = (s: string) => {
  if (s === 'completed') return <CheckCircle2 className="h-4 w-4 text-emerald-400" />
  if (s === 'in_progress') return <Clock className="h-4 w-4 text-amber-400" />
  return <Circle className="h-4 w-4 text-foreground-subtle" />
}

export default function ExplorePage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeDifficulty, setActiveDifficulty] = useState('All')

  const filtered = commands.filter((cmd) => {
    const matchSearch = cmd.name.toLowerCase().includes(search.toLowerCase()) || cmd.description.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === 'All' || cmd.category === activeCategory
    const matchDiff = activeDifficulty === 'All' || cmd.difficulty === activeDifficulty
    return matchSearch && matchCat && matchDiff
  })

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      {/* Header */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-background-secondary/80 to-background-tertiary/30 p-6 md:p-8">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />
        <h1 className="relative text-3xl font-black tracking-tight md:text-4xl">
          Explore <span className="text-gradient-primary">Commands</span>
        </h1>
        <p className="relative mt-2 text-foreground-muted">
          Browse by category, search by description, and track your mastery command by command.
        </p>
      </section>

      {/* Search */}
      <section className="glass-card p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
            placeholder="Search commands (e.g. find large files, grep patterns)"
          />
        </div>
      </section>

      {/* Filter pills */}
      <section className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeCategory === cat
                ? 'bg-primary/15 text-primary border border-primary/30'
                : 'border border-border text-foreground-muted hover:border-border-hover hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      <section className="flex flex-wrap gap-2">
        {difficulties.map((diff) => (
          <button
            key={diff}
            onClick={() => setActiveDifficulty(diff)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition-all ${
              activeDifficulty === diff
                ? 'bg-primary/15 text-primary border border-primary/30'
                : 'border border-border text-foreground-muted hover:border-border-hover hover:text-foreground'
            }`}
          >
            {diff === 'All' ? 'All Levels' : diff}
          </button>
        ))}
      </section>

      {/* Command grid */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((cmd, i) => (
            <motion.div
              key={cmd.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <Link href={`/command/${cmd.slug}`} className="glass-card group block p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{cmd.icon}</span>
                    <code className="text-base font-bold font-mono text-foreground">$ {cmd.name}</code>
                  </div>
                  {statusIcon(cmd.status)}
                </div>
                <p className="mt-2 text-sm text-foreground-muted">{cmd.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`badge-${cmd.difficulty} rounded-full px-2 py-0.5 text-[10px] font-medium`}>
                      {cmd.difficulty}
                    </span>
                    <span className="text-xs text-foreground-subtle">{cmd.category}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-foreground-subtle opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {filtered.length === 0 && (
        <div className="glass-card flex flex-col items-center py-16 text-center">
          <Search className="h-10 w-10 text-foreground-subtle" />
          <p className="mt-4 text-lg font-semibold">No commands found</p>
          <p className="mt-1 text-sm text-foreground-muted">Try adjusting your search or filters.</p>
        </div>
      )}
    </motion.div>
  )
}
