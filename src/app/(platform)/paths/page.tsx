'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpenCheck, Clock3, Swords, Waypoints } from 'lucide-react'

const learningPaths = [
  { slug: 'the-way-of-linux', name: 'The Way of Linux', track: 'Linux Track', lessons: 15, challenges: 10, duration: '3 weeks' },
  { slug: 'the-way-of-git', name: 'The Way of Git', track: 'Git Track', lessons: 12, challenges: 9, duration: '2 weeks' },
  { slug: 'the-way-of-docker', name: 'The Way of Docker', track: 'Docker Track', lessons: 14, challenges: 11, duration: '3 weeks' },
  { slug: 'the-way-of-kubernetes', name: 'The Way of Kubernetes', track: 'Kubernetes Track', lessons: 18, challenges: 14, duration: '4 weeks' },
  { slug: 'the-way-of-bash', name: 'The Way of Bash', track: 'Bash Track', lessons: 13, challenges: 9, duration: '2 weeks' },
  { slug: 'the-way-of-cloud', name: 'The Way of Cloud', track: 'Cloud Track', lessons: 16, challenges: 12, duration: '4 weeks' },
]

export default function PathsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-5">
      <section className="rounded-2xl border border-white/10 bg-[#06080f] p-5">
        <h1 className="text-3xl font-black text-white">Learning Paths</h1>
        <p className="mt-1 text-sm text-slate-300">Choose a structured path to master each CLI discipline.</p>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {learningPaths.map((path) => (
          <Link
            key={path.slug}
            href={`/app/paths/${path.slug}`}
            className="group rounded-xl border border-white/10 bg-[#050811] p-4 transition-colors hover:border-cyan-300/30"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-500/10 text-cyan-300">
                <Waypoints className="h-4 w-4" />
              </span>
              <span className="text-xs text-slate-400">{path.track}</span>
            </div>
            <p className="mt-3 text-lg font-bold text-white">{path.name}</p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div className="rounded-lg border border-white/10 bg-black/20 p-2 text-slate-300">
                <BookOpenCheck className="mb-1 h-3.5 w-3.5 text-cyan-300" />
                {path.lessons} lessons
              </div>
              <div className="rounded-lg border border-white/10 bg-black/20 p-2 text-slate-300">
                <Swords className="mb-1 h-3.5 w-3.5 text-red-300" />
                {path.challenges} trials
              </div>
              <div className="rounded-lg border border-white/10 bg-black/20 p-2 text-slate-300">
                <Clock3 className="mb-1 h-3.5 w-3.5 text-amber-300" />
                {path.duration}
              </div>
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-cyan-300">
              Enter Path <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </section>
    </motion.div>
  )
}
