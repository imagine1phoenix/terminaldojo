'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Flame, Medal, Crown } from 'lucide-react'

const users = [
  { rank: 1, name: 'Ari Nakamura', avatar: '👑', level: 9, title: 'Terminal Sage', xp: 7520, streak: 45, badges: 38 },
  { rank: 2, name: 'Priya Sharma', avatar: '🥈', level: 8, title: 'Shell Wizard', xp: 6380, streak: 32, badges: 31 },
  { rank: 3, name: 'Marcus Johnson', avatar: '🥉', level: 8, title: 'Shell Wizard', xp: 5915, streak: 28, badges: 27 },
  { rank: 4, name: 'Yuki Tanaka', avatar: '⚡', level: 7, title: 'CLI Ninja', xp: 4200, streak: 21, badges: 22 },
  { rank: 5, name: 'Alex Chen', avatar: '🥷', level: 5, title: 'Bash Enthusiast', xp: 1240, streak: 7, badges: 12 },
  { rank: 6, name: 'Sam Rivera', avatar: '🔥', level: 5, title: 'Bash Enthusiast', xp: 1180, streak: 14, badges: 11 },
  { rank: 7, name: 'Jordan Park', avatar: '💎', level: 4, title: 'Shell User', xp: 890, streak: 5, badges: 8 },
  { rank: 8, name: 'Casey Williams', avatar: '🚀', level: 4, title: 'Shell User', xp: 780, streak: 9, badges: 7 },
  { rank: 9, name: 'Taylor Kim', avatar: '🌟', level: 3, title: 'Command Liner', xp: 420, streak: 3, badges: 4 },
  { rank: 10, name: 'Morgan Lee', avatar: '🎯', level: 2, title: 'Terminal Newbie', xp: 180, streak: 2, badges: 2 },
]

const tabs = ['Weekly', 'Monthly', 'All Time']

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('Weekly')
  const top3 = users.slice(0, 3)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      {/* Header */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-background-secondary/80 to-background-tertiary/30 p-6 md:p-8">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-500/5 blur-3xl" />
        <h1 className="relative text-3xl font-black tracking-tight md:text-4xl">
          <span className="text-gradient-gold">Leaderboard</span>
        </h1>
        <p className="relative mt-2 text-foreground-muted">
          Top learners ranked by XP, streaks, and consistent practice.
        </p>
      </section>

      {/* Tabs */}
      <section className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeTab === t
                ? 'bg-primary/15 text-primary border border-primary/30'
                : 'border border-border text-foreground-muted hover:border-border-hover hover:text-foreground'
            }`}
          >
            {t}
          </button>
        ))}
      </section>

      {/* Top 3 Podium */}
      <section className="grid grid-cols-3 gap-3">
        {[top3[1], top3[0], top3[2]].map((user, i) => {
          const isFirst = i === 1
          return (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className={`glass-card flex flex-col items-center p-5 text-center ${isFirst ? 'border-amber-500/30 ring-1 ring-amber-500/10' : ''}`}
            >
              <span className="text-4xl">{user.avatar}</span>
              {isFirst && <Crown className="mt-1 h-5 w-5 text-amber-400" />}
              <p className="mt-2 text-sm font-bold">{user.name}</p>
              <p className="text-xs text-foreground-muted">Lvl {user.level} · {user.title}</p>
              <p className="mt-2 text-gradient-gold text-xl font-black">{user.xp.toLocaleString()}</p>
              <p className="text-[10px] text-foreground-subtle">XP</p>
              <div className="mt-2 flex gap-3 text-xs text-foreground-muted">
                <span className="flex items-center gap-1"><Flame className="h-3 w-3 text-orange-400" /> {user.streak}</span>
                <span className="flex items-center gap-1"><Medal className="h-3 w-3 text-purple-400" /> {user.badges}</span>
              </div>
            </motion.div>
          )
        })}
      </section>

      {/* Full Table */}
      <section className="glass-card overflow-hidden">
        <div className="grid grid-cols-[60px_1fr_100px_80px_80px] gap-2 border-b border-border px-5 py-3 text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
          <span>Rank</span>
          <span>Learner</span>
          <span className="text-right">XP</span>
          <span className="text-right">Streak</span>
          <span className="text-right">Badges</span>
        </div>
        {users.map((user, i) => (
          <motion.div
            key={user.rank}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.04 }}
            className={`grid grid-cols-[60px_1fr_100px_80px_80px] gap-2 items-center border-b border-border px-5 py-3.5 text-sm transition-colors hover:bg-background-tertiary/30 ${
              user.name === 'Alex Chen' ? 'bg-primary/5' : ''
            }`}
          >
            <span className={`font-bold ${user.rank <= 3 ? 'text-amber-400' : 'text-foreground-subtle'}`}>
              #{user.rank}
            </span>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background-tertiary text-sm">
                {user.avatar}
              </span>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-foreground-muted">Lvl {user.level} · {user.title}</p>
              </div>
            </div>
            <span className="text-right font-mono font-semibold">
              <Trophy className="mr-1 inline h-3 w-3 text-amber-400" />
              {user.xp.toLocaleString()}
            </span>
            <span className="text-right text-foreground-muted">
              <Flame className="mr-1 inline h-3 w-3 text-orange-400" />
              {user.streak}d
            </span>
            <span className="text-right text-foreground-muted">
              <Medal className="mr-1 inline h-3 w-3 text-purple-400" />
              {user.badges}
            </span>
          </motion.div>
        ))}
      </section>
    </motion.div>
  )
}
