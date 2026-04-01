'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Award, Flame, Medal, Share2, Trophy } from 'lucide-react'

const BeltAvatarWidget = dynamic(
  () => import('@/components/platform/belt-avatar-widget').then((mod) => mod.BeltAvatarWidget),
  { ssr: false },
)

const SkillRadarChart = dynamic(
  () => import('@/components/platform/skill-radar-chart').then((mod) => mod.SkillRadarChart),
  { ssr: false },
)

const radarAxes = [
  { id: 'linux', label: 'Linux', value: 78 },
  { id: 'git', label: 'Git', value: 64 },
  { id: 'docker', label: 'Docker', value: 47 },
  { id: 'k8s', label: 'K8s', value: 33 },
  { id: 'bash', label: 'Bash', value: 72 },
  { id: 'curl', label: 'curl', value: 58 },
  { id: 'cloud', label: 'Cloud', value: 38 },
]

export default function ProfilePage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} className="space-y-5">
      <section className="rounded-2xl border border-white/10 bg-[#06080f] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/10 text-2xl">🥷</div>
            <div>
              <h1 className="text-3xl font-black text-white">Alex Chen</h1>
              <p className="text-sm text-slate-300">Current rank: Orange Belt · Disciplined Student</p>
            </div>
          </div>
          <button className="inline-flex items-center gap-1 rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-slate-200">
            <Share2 className="h-3.5 w-3.5" /> Share
          </button>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-[#050811] p-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">Overall Stats</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-amber-400/25 bg-amber-500/10 p-3 text-sm text-amber-200">Total Ki: 12,750</div>
            <div className="rounded-lg border border-cyan-400/25 bg-cyan-500/10 p-3 text-sm text-cyan-200">Commands: 42</div>
            <div className="rounded-lg border border-red-400/25 bg-red-500/10 p-3 text-sm text-red-200">Challenges: 18</div>
            <div className="rounded-lg border border-violet-400/25 bg-violet-500/10 p-3 text-sm text-violet-200">Streak: 7 / 14</div>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-[#050811] p-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">Belt Rank & Progress</h2>
          <div className="mt-3 h-[230px] overflow-hidden rounded-xl border border-white/10 bg-black/30">
            <BeltAvatarWidget ki={12750} className="h-full" />
          </div>
          <p className="mt-2 text-xs text-slate-400">Estimated 10 weeks to Black Belt trajectory.</p>
        </article>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <article className="rounded-2xl border border-white/10 bg-[#050811] p-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">Skills Radar</h2>
          <SkillRadarChart axes={radarAxes} className="mx-auto mt-2 h-[300px] w-[300px]" />
        </article>

        <article className="rounded-2xl border border-white/10 bg-[#050811] p-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">Recent Achievements</h2>
          <div className="mt-3 space-y-2">
            <div className="rounded-lg border border-violet-400/30 bg-violet-500/10 p-3 text-sm text-violet-200"><Award className="mr-1 inline h-4 w-4" /> Hanko Seal: Pipe Artisan</div>
            <div className="rounded-lg border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-200"><Trophy className="mr-1 inline h-4 w-4" /> Rank-up Ceremony Completed</div>
            <div className="rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200"><Flame className="mr-1 inline h-4 w-4" /> 7 Day Discipline Streak</div>
          </div>
          <div className="mt-3 rounded-lg border border-cyan-400/30 bg-cyan-500/10 p-3 text-sm text-cyan-200">
            <Medal className="mr-1 inline h-4 w-4" /> Global leaderboard rank: #5
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#050811] p-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">Activity Heatmap</h2>
        <div className="mt-3 grid grid-cols-10 gap-1 sm:grid-cols-15 xl:grid-cols-30">
          {Array.from({ length: 180 }).map((_, index) => {
            const intensity = index % 5
            const tone = intensity === 0 ? 'bg-slate-800' : intensity === 1 ? 'bg-emerald-900' : intensity === 2 ? 'bg-emerald-700' : intensity === 3 ? 'bg-emerald-500' : 'bg-emerald-300'
            return <span key={index} className={`h-3 rounded ${tone}`} />
          })}
        </div>
      </section>
    </motion.div>
  )
}
