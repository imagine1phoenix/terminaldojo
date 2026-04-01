'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getScoreBand } from '@/lib/constants/onboarding'
import { ScoreBandCard } from '@/components/onboarding/score-band-card'
import type { OnboardingResultState } from '@/lib/stores/onboarding'

const SkillRadarChart = dynamic(
  () => import('@/components/platform/skill-radar-chart').then((mod) => mod.SkillRadarChart),
  { ssr: false },
)

interface ReadinessResultsProps {
  result: OnboardingResultState
}

export function ReadinessResults({ result }: ReadinessResultsProps) {
  const band = getScoreBand(result.score)

  const axes = [
    { id: 'linux', label: 'Linux', value: result.skillProfile.linux ?? 0 },
    { id: 'bash', label: 'Bash', value: result.skillProfile.bash ?? 0 },
    { id: 'git', label: 'Git', value: result.skillProfile.git ?? 0 },
    { id: 'docker', label: 'Docker', value: result.skillProfile.docker ?? 0 },
    { id: 'network', label: 'Network', value: result.skillProfile.network ?? 0 },
    { id: 'cloud', label: 'Cloud', value: result.skillProfile.cloud ?? 0 },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">Your Readiness Rating</p>
        <h1 className="mt-1 text-3xl font-black text-white">Here&apos;s where you stand in your martial arts journey</h1>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <ScoreBandCard score={result.score} band={band} />

        <div className="rounded-xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">Skill Profile Radar</p>
          <SkillRadarChart axes={axes} className="mx-auto mt-2 h-[260px] w-[260px]" />
          <div className="mt-2 grid grid-cols-2 gap-1 text-xs text-slate-300 sm:grid-cols-3">
            {axes.map((axis) => (
              <p key={axis.id}>{axis.label}: {axis.value}%</p>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4">
          <p className="text-sm font-semibold text-emerald-200">Strengths</p>
          <ul className="mt-2 space-y-1 text-sm text-emerald-100/90">
            {result.strengths.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 p-4">
          <p className="text-sm font-semibold text-amber-200">Growth Areas</p>
          <ul className="mt-2 space-y-1 text-sm text-amber-100/90">
            {result.growthAreas.map((item) => (
              <li key={item}>⚠ {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {result.recommendations.map((recommendation, index) => (
          <article key={recommendation} className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-4">
            <p className="text-sm font-semibold text-cyan-200">{index === 0 ? 'Primary' : 'Secondary'} Recommendation</p>
            <p className="mt-1 text-base font-bold text-white">{recommendation}</p>
            <button className="mt-2 rounded-lg border border-cyan-300/35 px-3 py-2 text-xs font-semibold text-cyan-100">Start Path</button>
          </article>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-black/25 p-4">
        <p className="text-sm text-slate-300">{band.eta}</p>
        <p className="mt-1 text-xs text-slate-400">Recommended path: {band.recommendedPath}</p>
      </div>

      <Link href="/app/playground?tutorial=1" className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-black shadow-[0_0_30px_rgba(34,211,238,0.35)]">
        Enter the Dojo <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  )
}
