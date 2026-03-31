'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Clock, Users, Swords, Target, Flame } from 'lucide-react'

const challenges = [
  { id: '101', title: 'Find all .log files over 10MB', description: 'Use the find command to locate large log files in a production server filesystem.', difficulty: 'intermediate' as const, xp: 40, category: 'Linux Core', time: '8 min', completions: 1243 },
  { id: '102', title: 'Extract top failing endpoints', description: 'Combine grep, awk, sort, and uniq to analyze nginx error logs.', difficulty: 'advanced' as const, xp: 55, category: 'Text Processing', time: '15 min', completions: 412 },
  { id: '103', title: 'Cleanup dangling Docker images', description: 'Remove unused Docker images while keeping tagged images intact.', difficulty: 'beginner' as const, xp: 30, category: 'Docker', time: '5 min', completions: 2891 },
  { id: '104', title: 'Set up SSH key authentication', description: 'Generate an SSH key pair and configure password-less login.', difficulty: 'beginner' as const, xp: 25, category: 'Networking', time: '10 min', completions: 3456 },
  { id: '105', title: 'Interactive Git rebase: squash & reorder', description: 'Clean up a messy git history by squashing 5 commits into 2.', difficulty: 'advanced' as const, xp: 60, category: 'Git CLI', time: '12 min', completions: 567 },
  { id: '106', title: 'Parse API response with jq', description: 'Fetch JSON from a REST API and extract specific fields using jq.', difficulty: 'intermediate' as const, xp: 35, category: 'Power Tools', time: '8 min', completions: 1876 },
  { id: '107', title: 'Create a compressed backup with tar', description: 'Archive a project directory, excluding node_modules and .git.', difficulty: 'beginner' as const, xp: 20, category: 'Linux Core', time: '5 min', completions: 4231 },
  { id: '108', title: 'Multi-container Docker Compose', description: 'Write docker-compose.yml to run a web app with Redis and PostgreSQL.', difficulty: 'advanced' as const, xp: 50, category: 'Docker', time: '20 min', completions: 289 },
]

const filters = ['All', 'beginner', 'intermediate', 'advanced']

export default function ChallengesPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const filtered = activeFilter === 'All' ? challenges : challenges.filter((c) => c.difficulty === activeFilter)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      {/* Header */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-background-secondary/80 to-background-tertiary/30 p-6 md:p-8">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-secondary/5 blur-3xl" />
        <h1 className="relative text-3xl font-black tracking-tight md:text-4xl">
          <span className="text-gradient-primary">Challenges</span>
        </h1>
        <p className="relative mt-2 text-foreground-muted">
          Scenario-based exercises with XP rewards and progressive hints. Test your CLI skills.
        </p>
      </section>

      {/* Daily Challenge Spotlight */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-orange-500/5 p-6"
      >
        <div className="absolute right-4 top-4 animate-pulse-glow rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-400">
          <Flame className="mr-1 inline h-3 w-3" /> Daily Challenge
        </div>
        <h2 className="text-xl font-bold">{challenges[0].title}</h2>
        <p className="mt-1 text-sm text-foreground-muted">{challenges[0].description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <span className="badge-intermediate rounded-full px-2.5 py-0.5 text-xs font-medium">{challenges[0].difficulty}</span>
          <span className="inline-flex items-center gap-1 text-amber-400"><Trophy className="h-3.5 w-3.5" /> +{challenges[0].xp} XP</span>
          <span className="inline-flex items-center gap-1 text-foreground-subtle"><Clock className="h-3.5 w-3.5" /> {challenges[0].time}</span>
          <span className="inline-flex items-center gap-1 text-foreground-subtle"><Users className="h-3.5 w-3.5" /> {challenges[0].completions.toLocaleString()} solved</span>
        </div>
        <Link href={`/challenge/${challenges[0].id}`} className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-black transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20">
          <Target className="h-4 w-4" /> Accept Challenge
        </Link>
      </motion.section>

      {/* Filter */}
      <section className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition-all ${
              activeFilter === f
                ? 'bg-primary/15 text-primary border border-primary/30'
                : 'border border-border text-foreground-muted hover:border-border-hover hover:text-foreground'
            }`}
          >
            {f === 'All' ? 'All Levels' : f}
          </button>
        ))}
      </section>

      {/* Challenge grid */}
      <section className="grid gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((challenge, i) => (
            <motion.article
              key={challenge.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="glass-card flex flex-col p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-foreground-subtle">{challenge.category}</span>
                <Swords className="h-4 w-4 text-foreground-subtle" />
              </div>
              <h2 className="mt-2 text-lg font-bold">{challenge.title}</h2>
              <p className="mt-1 flex-1 text-sm text-foreground-muted">{challenge.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <span className={`badge-${challenge.difficulty} rounded-full px-2.5 py-0.5 text-xs font-medium`}>{challenge.difficulty}</span>
                <span className="inline-flex items-center gap-1 text-amber-400 text-xs"><Trophy className="h-3 w-3" /> +{challenge.xp} XP</span>
                <span className="inline-flex items-center gap-1 text-foreground-subtle text-xs"><Clock className="h-3 w-3" /> {challenge.time}</span>
              </div>
              <Link
                href={`/challenge/${challenge.id}`}
                className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-black transition-all hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20"
              >
                Open Challenge
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </section>
    </motion.div>
  )
}
