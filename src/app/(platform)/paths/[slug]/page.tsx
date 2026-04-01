'use client'

import { use } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Lock, Timer } from 'lucide-react'

const TerminalEmulator = dynamic(
  () => import('@/components/terminal/terminal-emulator').then((module) => module.TerminalEmulator),
  { ssr: false },
)

const lessonSteps = [
  { title: 'Lesson 1: Filesystem orientation', state: 'completed' },
  { title: 'Lesson 2: Listing and filtering files', state: 'completed' },
  { title: 'Lesson 3: Search with find and grep', state: 'current' },
  { title: 'Lesson 4: Redirection and pipes', state: 'locked' },
  { title: 'Lesson 5: Permissions and ownership', state: 'locked' },
]

interface PathPageProps {
  params: Promise<{ slug: string }>
}

export default function PathDetailPage({ params }: PathPageProps) {
  const { slug } = use(params)
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} className="space-y-5">
      <section className="rounded-2xl border border-white/10 bg-[#06080f] p-5">
        <p className="text-xs uppercase tracking-[0.14em] text-slate-400">ShellSensei &gt; Learning Paths &gt; {title}</p>
        <h1 className="mt-2 text-3xl font-black text-white">The Way of Linux</h1>
        <p className="mt-1 text-sm text-slate-300">Path stats: 15 lessons · 10 challenges · est. 3 weeks</p>
      </section>

      <section className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-white/10 bg-[#050811] p-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">Path Checklist</h2>
          <div className="mt-3 space-y-2">
            {lessonSteps.map((step) => (
              <div
                key={step.title}
                className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-sm ${
                  step.state === 'current'
                    ? 'border-cyan-400/35 bg-cyan-400/10 text-cyan-100'
                    : step.state === 'completed'
                    ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-100'
                    : 'border-white/10 bg-black/25 text-slate-400'
                }`}
              >
                <span className="mt-0.5">
                  {step.state === 'completed' ? <Check className="h-4 w-4" /> : step.state === 'locked' ? <Lock className="h-4 w-4" /> : <Timer className="h-4 w-4" />}
                </span>
                <span>{step.title}</span>
              </div>
            ))}
          </div>
        </aside>

        <main className="space-y-4">
          <article className="rounded-2xl border border-white/10 bg-[#050811] p-4">
            <h2 className="text-xl font-bold text-white">Current Lesson: Search with find and grep</h2>
            <p className="mt-1 text-sm text-slate-300">
              Learn to combine file discovery and pattern matching to inspect logs in production systems.
            </p>
            <div className="mt-3 rounded-lg border border-cyan-400/20 bg-black/35 p-3 font-mono text-sm text-cyan-200">
              <p>$ find /var/log -name &quot;*.log&quot; -size +5M | xargs grep -n &quot;ERROR&quot;</p>
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-[#050811] p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">Practice Terminal</h3>
            <div className="mt-3 overflow-hidden rounded-xl border border-red-500/20">
              <TerminalEmulator className="h-[360px] cyber-terminal-surface" sessionId={`path-${slug}`} />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-black">Mark Complete</button>
              <Link href="/app/paths/the-way-of-linux" className="inline-flex items-center gap-1 rounded-lg border border-cyan-400/35 px-3 py-2 text-xs font-semibold text-cyan-200">
                Next Lesson <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        </main>
      </section>
    </motion.div>
  )
}
