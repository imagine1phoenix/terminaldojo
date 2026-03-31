'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Flame,
  Trophy,
  BookOpen,
  Swords,
  Target,
  ArrowRight,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle2,
} from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function DashboardPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* ─── Welcome banner ─── */}
      <motion.section
        variants={item}
        className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-background-secondary/80 to-background-tertiary/30 p-6 md:p-8"
      >
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-accent/5 blur-2xl" />
        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight md:text-4xl">
                Welcome back, <span className="text-gradient-primary">Alex</span> 🥷
              </h1>
              <p className="mt-2 text-foreground-muted">
                Level 5 — Bash Enthusiast · 260 XP to Power User
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-sm font-semibold text-orange-400">
                <Flame className="h-4 w-4" /> 7 day streak
              </span>
            </div>
          </div>
          {/* XP Progress bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Level 5 → Level 6</span>
              <span className="text-foreground-muted">1,240 / 1,500 XP</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-background-tertiary">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '82%' }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── Stat cards ─── */}
      <motion.section variants={item} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Commands Learned', value: '42', icon: BookOpen, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
          { label: 'XP This Week', value: '156', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
          { label: 'Challenges Solved', value: '18', icon: CheckCircle2, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
          { label: 'Current Rank', value: '#5', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.article
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className={`glass-card group p-5 ${stat.border}`}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">{stat.label}</p>
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.bg}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
              <p className="mt-3 text-3xl font-black">{stat.value}</p>
            </motion.article>
          )
        })}
      </motion.section>

      {/* ─── Continue learning + Daily challenge ─── */}
      <motion.section variants={item} className="grid gap-4 lg:grid-cols-2">
        {/* Continue Learning */}
        <article className="glass-card p-6">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold">Continue Learning</h2>
          </div>
          <p className="text-sm text-foreground-muted">
            Pick up where you left off with the <span className="font-semibold text-foreground">find</span> command.
          </p>
          <div className="mt-4 rounded-xl border border-border bg-terminal-bg p-4 font-mono text-sm">
            <p className="text-terminal-prompt">$ find ./logs -name &apos;*.log&apos; -size +10M</p>
            <p className="mt-1 text-zinc-500">Find files and directories in the filesystem</p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="badge-beginner rounded-full px-2.5 py-0.5 text-xs font-medium">beginner</span>
              <span className="text-xs text-foreground-subtle">Linux Core</span>
            </div>
            <Link
              href="/command/find"
              className="group inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-black transition-all hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20"
            >
              Resume <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </article>

        {/* Daily Challenge */}
        <article className="glass-card relative overflow-hidden border-warning/20 p-6">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-500/5 blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <Target className="h-5 w-5 text-amber-400" />
              <h2 className="text-lg font-bold">Daily Challenge</h2>
            </div>
            <p className="text-sm text-foreground-muted">
              Find all .log files over 10MB
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <span className="badge-intermediate rounded-full px-2.5 py-0.5 text-xs font-medium">intermediate</span>
              <span className="inline-flex items-center gap-1 text-amber-400">
                <Trophy className="h-3.5 w-3.5" /> +40 XP
              </span>
              <span className="inline-flex items-center gap-1 text-foreground-subtle">
                <Clock className="h-3.5 w-3.5" /> ~8 min
              </span>
            </div>
            <Link
              href="/challenge/101"
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-400 transition-all hover:bg-amber-500/20"
            >
              <Swords className="h-4 w-4" /> Start Challenge
            </Link>
          </div>
        </article>
      </motion.section>

      {/* ─── Category progress ─── */}
      <motion.section variants={item} className="glass-card p-6">
        <h2 className="text-lg font-bold">Category Progress</h2>
        <div className="mt-5 space-y-4">
          {[
            { name: 'Linux Core', icon: '🐧', learned: 24, total: 85, color: 'from-emerald-500 to-cyan-400' },
            { name: 'Git CLI', icon: '🌿', learned: 10, total: 42, color: 'from-orange-500 to-amber-400' },
            { name: 'Docker CLI', icon: '🐳', learned: 6, total: 35, color: 'from-blue-500 to-indigo-400' },
            { name: 'Kubernetes', icon: '☸️', learned: 5, total: 28, color: 'from-purple-500 to-pink-400' },
            { name: 'Networking', icon: '🌐', learned: 8, total: 30, color: 'from-teal-500 to-emerald-400' },
            { name: 'Power Tools', icon: '⚡', learned: 3, total: 22, color: 'from-yellow-500 to-orange-400' },
          ].map((cat) => {
            const pct = Math.round((cat.learned / cat.total) * 100)
            return (
              <div key={cat.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span>{cat.icon}</span>
                    <span className="font-medium">{cat.name}</span>
                  </span>
                  <span className="text-foreground-muted">
                    {cat.learned}/{cat.total} <span className="text-foreground-subtle">({pct}%)</span>
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-background-tertiary">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                    className={`h-full rounded-full bg-gradient-to-r ${cat.color} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer" />
                  </motion.div>
                </div>
              </div>
            )
          })}
        </div>
      </motion.section>

      {/* ─── Activity heatmap ─── */}
      <motion.section variants={item} className="glass-card p-6">
        <h2 className="text-lg font-bold">Activity — Last 30 Days</h2>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {Array.from({ length: 30 }).map((_, i) => {
            const lvl = [0, 0, 1, 2, 3, 4, 0, 1, 2, 0, 3, 4, 1, 2, 0, 0, 1, 3, 4, 2, 1, 0, 2, 3, 1, 4, 0, 1, 2, 3][i]
            const opacity = lvl === 0 ? 'bg-background-tertiary' : lvl === 1 ? 'bg-primary/20' : lvl === 2 ? 'bg-primary/40' : lvl === 3 ? 'bg-primary/60' : 'bg-primary/90'
            return (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: 0.8 + i * 0.02 }}
                className={`h-6 w-6 rounded-md ${opacity} transition-colors`}
                title={`Day ${i + 1}: ${lvl} activities`}
              />
            )
          })}
        </div>
        <div className="mt-3 flex items-center gap-2 text-[10px] text-foreground-subtle">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="h-3 w-3 rounded-sm bg-background-tertiary" />
            <div className="h-3 w-3 rounded-sm bg-primary/20" />
            <div className="h-3 w-3 rounded-sm bg-primary/40" />
            <div className="h-3 w-3 rounded-sm bg-primary/60" />
            <div className="h-3 w-3 rounded-sm bg-primary/90" />
          </div>
          <span>More</span>
        </div>
      </motion.section>

      {/* ─── Recent Badges ─── */}
      <motion.section variants={item} className="glass-card p-6">
        <h2 className="text-lg font-bold">Recent Achievements</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {[
            { name: 'First Command', icon: '🎯', rarity: 'common', earned: true },
            { name: 'Pipe Master', icon: '🔗', rarity: 'rare', earned: true },
            { name: 'Speed Demon', icon: '⚡', rarity: 'rare', earned: true },
            { name: 'One-Liner King', icon: '👑', rarity: 'epic', earned: false },
          ].map((badge) => (
            <div
              key={badge.name}
              className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all ${
                badge.earned
                  ? 'border-border bg-background-secondary/50'
                  : 'border-border/50 bg-background-secondary/20 opacity-40 grayscale'
              }`}
            >
              <span className="text-3xl">{badge.icon}</span>
              <span className="text-xs font-semibold">{badge.name}</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                badge.rarity === 'common' ? 'bg-zinc-500/10 text-zinc-400'
                : badge.rarity === 'rare' ? 'bg-blue-500/10 text-blue-400'
                : badge.rarity === 'epic' ? 'bg-purple-500/10 text-purple-400'
                : 'bg-amber-500/10 text-amber-400'
              }`}>
                {badge.rarity}
              </span>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  )
}
