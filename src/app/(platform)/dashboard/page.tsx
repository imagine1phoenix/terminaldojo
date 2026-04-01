'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock3,
  Sparkles,
  Swords,
  Telescope,
  Trophy,
} from 'lucide-react'
import { ryuhaSchools } from '@/lib/constants/ryuha-schools'
import { challengeItems, commandItems } from '@/lib/mock-data'
import { getRankProgress } from '@/lib/constants/belt-ranks'

const BeltAvatarWidget = dynamic(
  () => import('@/components/platform/belt-avatar-widget').then((mod) => mod.BeltAvatarWidget),
  { ssr: false },
)

const SkillRadarChart = dynamic(
  () => import('@/components/platform/skill-radar-chart').then((mod) => mod.SkillRadarChart),
  { ssr: false },
)

const schoolDifficulty = ['Beginner', 'Intermediate', 'Advanced', 'Intermediate', 'Advanced', 'Intermediate']

const timeline = [
  {
    id: '1',
    type: 'command',
    title: 'Learned command: grep -rn',
    time: '09:42',
    detail: 'Completed Linux Core lesson 04',
  },
  {
    id: '2',
    type: 'challenge',
    title: 'Finished daily challenge',
    time: '08:10',
    detail: 'Find all .log files over 10MB',
  },
  {
    id: '3',
    type: 'seal',
    title: 'Earned seal: Pipe Artisan',
    time: 'Yesterday',
    detail: 'Used 3 chained commands without hints',
  },
  {
    id: '4',
    type: 'rank',
    title: 'Rank-up ceremony unlocked',
    time: 'Yesterday',
    detail: 'Orange Belt unlocked at 1,400 Ki',
  },
]

function itemIcon(type: string) {
  if (type === 'command') return <Sparkles className="h-4 w-4 text-cyan-300" />
  if (type === 'challenge') return <Swords className="h-4 w-4 text-red-300" />
  if (type === 'seal') return <Award className="h-4 w-4 text-violet-300" />
  return <Trophy className="h-4 w-4 text-amber-300" />
}

export default function DashboardPage() {
  const [progressView, setProgressView] = useState<'belt' | 'radar'>('belt')
  const kiTotal = 1234
  const rank = getRankProgress(kiTotal)
  const todayTrial = challengeItems[0]

  const schoolStats = useMemo(() => {
    return ryuhaSchools.slice(0, 8).map((school, index) => {
      const count = commandItems.filter((command) =>
        school.tools.some((tool) => command.name.toLowerCase().includes(tool.toLowerCase().split(' ')[0])),
      ).length

      return {
        school,
        commandCount: Math.max(6, count * 4 + 7),
        difficulty: schoolDifficulty[index % schoolDifficulty.length],
      }
    })
  }, [])

  const radarAxes = [
    { id: 'linux', label: 'Linux', value: 78, href: '/app/paths/the-way-of-linux' },
    { id: 'git', label: 'Git', value: 64, href: '/app/paths/the-way-of-git' },
    { id: 'docker', label: 'Docker', value: 47, href: '/app/paths/the-way-of-docker' },
    { id: 'k8s', label: 'K8s', value: 33, href: '/app/paths/the-way-of-kubernetes' },
    { id: 'bash', label: 'Bash', value: 72, href: '/app/paths/the-way-of-bash' },
    { id: 'curl', label: 'curl', value: 58, href: '/app/paths/the-way-of-networking' },
    { id: 'cloud', label: 'Cloud', value: 38, href: '/app/paths/the-way-of-cloud' },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }} className="space-y-5">
      <section className="rounded-3xl border border-red-500/25 bg-[#05070e]/95 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Main Dashboard <span className="text-red-300">Dojo Control</span>
            </h1>
            <p className="mt-1 text-sm text-slate-300">
              Train, track rank progression, choose schools, and continue your path.
            </p>
          </div>
          <div className="inline-flex rounded-xl border border-white/10 bg-black/30 p-1">
            <button
              type="button"
              onClick={() => setProgressView('belt')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                progressView === 'belt' ? 'bg-red-500/20 text-red-200' : 'text-slate-300'
              }`}
            >
              Belt View
            </button>
            <button
              type="button"
              onClick={() => setProgressView('radar')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                progressView === 'radar' ? 'bg-cyan-500/20 text-cyan-200' : 'text-slate-300'
              }`}
            >
              Skill Radar
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,30%)_minmax(0,70%)]">
        <article className="rounded-2xl border border-white/10 bg-[#050811] p-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-300">Your Progress</h2>

          {progressView === 'belt' ? (
            <div className="mt-3 space-y-3">
              <div className="h-[230px] overflow-hidden rounded-xl border border-white/10 bg-black/30">
                <BeltAvatarWidget ki={kiTotal} className="h-full" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">{rank.current.colorName}</p>
                <p className="text-sm text-slate-400">{rank.current.rankName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Ki progress</p>
                <p className="text-sm font-semibold text-amber-300">1,234 / 1,500 Ki</p>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-amber-400 to-red-400" />
                </div>
              </div>
              <p className="text-xs text-slate-400">Estimated 4 days to next rank at current pace.</p>
            </div>
          ) : (
            <div className="mt-3 rounded-xl border border-cyan-400/20 bg-black/30 p-2">
              <SkillRadarChart
                axes={radarAxes}
                className="mx-auto h-[250px] w-[250px]"
                onAxisClick={(axis) => {
                  if (axis.href) window.location.href = axis.href
                }}
              />
            </div>
          )}
        </article>

        <article className="rounded-2xl border border-white/10 bg-[#050811] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-300">Choose Your School</h2>
            <Link href="/app/explore" className="text-xs font-semibold text-cyan-300 transition-colors hover:text-cyan-200">
              View All Schools
            </Link>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1">
            {schoolStats.map(({ school, commandCount, difficulty }) => (
              <Link
                key={school.id}
                href={school.route}
                className="group min-w-[250px] rounded-xl border border-white/10 bg-black/30 p-3 transition-colors hover:border-cyan-300/35"
              >
                <div
                  className="h-24 rounded-lg"
                  style={{
                    background: `radial-gradient(circle at 20% 30%, ${school.palette.glow}, transparent 55%), #04050a`,
                    border: `1px solid ${school.palette.primary}40`,
                  }}
                />
                <p className="mt-2 text-sm font-semibold text-white">
                  {school.schoolName}
                </p>
                <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
                  <span>{commandCount} commands</span>
                  <span>{difficulty}</span>
                </div>
                <p className="mt-2 line-clamp-2 text-xs text-slate-400 transition-colors group-hover:text-slate-200">
                  {school.philosophy}
                </p>
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,30%)_minmax(0,70%)]">
        <article className="rounded-2xl border border-white/10 bg-[#050811] p-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-300">Today&apos;s Trial</h2>
          <div className="mt-3 rounded-xl border border-red-400/25 bg-red-500/8 p-3">
            <p className="text-base font-semibold text-white">{todayTrial.title}</p>
            <div className="mt-1 text-xs text-amber-300">{todayTrial.difficulty} · {'★'.repeat(todayTrial.difficulty === 'advanced' ? 3 : todayTrial.difficulty === 'intermediate' ? 2 : 1)}</div>
            <p className="mt-2 text-sm text-slate-300">{todayTrial.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href={`/app/challenge/${todayTrial.id}`} className="inline-flex items-center gap-1 rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white">
                <Swords className="h-3.5 w-3.5" /> Start Challenge
              </Link>
              <Link href="/app/challenges" className="inline-flex items-center gap-1 rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-slate-200">
                <Telescope className="h-3.5 w-3.5" /> View All Challenges
              </Link>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-[#050811] p-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-300">Recent Activity</h2>
          <div className="mt-3 max-h-[300px] space-y-2 overflow-y-auto pr-1">
            {timeline.map((entry) => (
              <div key={entry.id} className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/30 px-3 py-2.5">
                <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-slate-900">
                  {itemIcon(entry.type)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-100">{entry.title}</p>
                  <p className="text-xs text-slate-400">{entry.detail}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                  <Clock3 className="h-3.5 w-3.5" /> {entry.time}
                </span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-cyan-400/20 bg-cyan-400/8 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-cyan-200">Secondary Dashboard View: Skill Radar</p>
            <p className="text-xs text-cyan-100/80">Click any axis to open that school&apos;s learning path.</p>
          </div>
          <Link href="/app/paths/the-way-of-linux" className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-200 hover:text-cyan-100">
            Open Learning Path <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#050811] p-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-300">Responsive Layout Notes</h2>
        <div className="mt-2 grid gap-2 text-xs text-slate-300 sm:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-black/25 p-2">Desktop: full sidebar, 30/70 split, full 3D widgets.</div>
          <div className="rounded-lg border border-white/10 bg-black/25 p-2">Tablet: icon sidebar, two-column cards, horizontal school row.</div>
          <div className="rounded-lg border border-white/10 bg-black/25 p-2">Mobile: stacked cards, swipe school cards, simplified progress visuals.</div>
        </div>
      </section>

      <section className="sr-only" aria-label="Accessibility notes">
        <ul>
          <li>
            <CheckCircle2 className="h-4 w-4" />
          </li>
        </ul>
      </section>
    </motion.div>
  )
}
