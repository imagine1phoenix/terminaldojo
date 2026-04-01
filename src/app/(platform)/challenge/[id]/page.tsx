'use client'

import { use, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Lightbulb, Send, Sparkles, Swords, Timer } from 'lucide-react'
import dynamic from 'next/dynamic'

const TerminalEmulator = dynamic(
  () => import('@/components/terminal/terminal-emulator').then((module) => module.TerminalEmulator),
  { ssr: false },
)

const challengeData: Record<string, {
  title: string
  difficulty: string
  estimatedTime: string
  scenario: string
  objectives: string[]
  hints: string[]
}> = {
  '101': {
    title: 'Find all .log files over 10MB',
    difficulty: 'Intermediate',
    estimatedTime: '8 min',
    scenario: 'An on-call alert says log partitions are filling up. You need to locate oversized log files quickly before the host runs out of space.',
    objectives: [
      'Inspect the filesystem for candidate .log files.',
      'Filter files larger than 10MB.',
      'Submit a one-liner that can run in production safely.',
    ],
    hints: ['Use find with -name and -size.', 'Remember +10M means greater than 10MB.', 'Start from /var/log for realism.'],
  },
}

interface ChallengeDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ChallengeDetailPage({ params }: ChallengeDetailPageProps) {
  const { id } = use(params)
  const challenge = challengeData[id] ?? challengeData['101']

  const [hintIndex, setHintIndex] = useState(0)
  const [attempt, setAttempt] = useState(2)
  const [complete, setComplete] = useState(false)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} className="space-y-4">
      <Link href="/app/challenges" className="inline-flex items-center gap-1 text-sm text-slate-300 hover:text-slate-100">
        <ArrowLeft className="h-4 w-4" /> Back to Challenges
      </Link>

      <section className="grid gap-5 xl:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-[#050811] p-4">
          <h1 className="text-2xl font-black text-white">{challenge.title}</h1>
          <p className="mt-2 text-sm text-slate-300">{challenge.scenario}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-red-400/25 bg-red-500/10 px-2 py-1 text-red-200">{challenge.difficulty}</span>
            <span className="rounded-full border border-amber-400/25 bg-amber-500/10 px-2 py-1 text-amber-200">~{challenge.estimatedTime}</span>
          </div>

          <h2 className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">Objectives</h2>
          <ol className="mt-2 space-y-2 text-sm text-slate-300">
            {challenge.objectives.map((step, index) => (
              <li key={step} className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
                {index + 1}. {step}
              </li>
            ))}
          </ol>

          <div className="mt-4 rounded-xl border border-amber-400/25 bg-amber-500/10 p-3">
            <button
              type="button"
              onClick={() => setHintIndex((current) => Math.min(challenge.hints.length, current + 1))}
              className="inline-flex items-center gap-1 rounded-lg border border-amber-300/35 px-2.5 py-1.5 text-xs font-semibold text-amber-100"
            >
              <Lightbulb className="h-3.5 w-3.5" /> Hints (costs Ki)
            </button>
            {hintIndex > 0 && (
              <ul className="mt-2 space-y-1 text-xs text-amber-100/90">
                {challenge.hints.slice(0, hintIndex).map((hint) => (
                  <li key={hint}>• {hint}</li>
                ))}
              </ul>
            )}
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-[#050811] p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">
              <Swords className="h-4 w-4 text-red-300" /> Challenge Terminal
            </h2>
            <span className="rounded-full border border-white/15 bg-black/30 px-2 py-1 text-xs text-slate-300">Attempt {attempt}/5</span>
          </div>

          <div className="overflow-hidden rounded-xl border border-red-500/25">
            <TerminalEmulator className="h-[390px] cyber-terminal-surface" sessionId={`challenge-${id}`} />
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setAttempt((current) => Math.min(5, current + 1))
                setComplete(true)
              }}
              className="inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-black"
            >
              <Send className="h-3.5 w-3.5" /> Submit Solution
            </button>
            <span className="inline-flex items-center gap-1 rounded-lg border border-white/15 px-3 py-2 text-xs text-slate-300">
              <Timer className="h-3.5 w-3.5" /> Pre-configured environment
            </span>
          </div>
        </article>
      </section>

      <AnimatePresence>
        {complete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] grid place-items-center bg-black/70 p-4"
          >
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              className="w-full max-w-xl rounded-2xl border border-emerald-400/30 bg-[#06110d] p-5"
            >
              <h3 className="text-2xl font-black text-emerald-200">Challenge Complete!</h3>
              <p className="mt-2 text-sm text-emerald-100/85">
                Solution validated. You used filesystem filtering correctly and minimized risk to production logs.
              </p>
              <div className="mt-3 rounded-lg border border-emerald-400/25 bg-emerald-500/10 p-3 text-sm text-emerald-100">
                Awarded: +40 Ki · Seal unlocked: Precision Finder
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/app/challenges" className="inline-flex items-center gap-1 rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-slate-200">
                  Reveal Next Challenges
                </Link>
                <button
                  type="button"
                  onClick={() => setComplete(false)}
                  className="inline-flex items-center gap-1 rounded-lg border border-cyan-400/35 px-3 py-2 text-xs font-semibold text-cyan-200"
                >
                  <Sparkles className="h-3.5 w-3.5" /> Continue Training
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
