'use client'

import { use, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Trophy, Clock, Lightbulb, ChevronDown, ChevronUp, RotateCcw, Send } from 'lucide-react'

const challengeData: Record<string, {
  title: string; difficulty: string; xp: number; category: string; time: string
  description: string; steps: string[]; hints: string[]
}> = {
  '101': {
    title: 'Find all .log files over 10MB',
    difficulty: 'intermediate', xp: 40, category: 'Linux Core', time: '8 min',
    description: 'You have a production server with log files scattered across multiple directories. Your task is to find all .log files that are larger than 10MB so they can be reviewed and rotated.',
    steps: ['Navigate to the /var/log directory.', 'Use find with -name and -size flags to locate .log files over 10MB.', 'Submit your one-liner command for validation.'],
    hints: ['Start with: find /var/log', 'Add -name "*.log" to filter by extension', 'Use -size +10M to filter by size'],
  },
  '102': {
    title: 'Extract top failing endpoints',
    difficulty: 'advanced', xp: 55, category: 'Text Processing', time: '15 min',
    description: 'Analyze nginx error logs to find the most frequent HTTP 500 errors and identify which endpoints are failing the most.',
    steps: ['Filter lines containing HTTP 500 status.', 'Extract the URL path from each line.', 'Sort and count unique paths.'],
    hints: ['Use grep to filter 500 status lines', 'Pipe to awk to extract the URL field', 'Use sort | uniq -c | sort -rn for counting'],
  },
}

const fallbackChallenge = (id: string) => ({
  title: `Challenge #${id}`,
  difficulty: 'intermediate', xp: 35, category: 'CLI', time: '10 min',
  description: 'Complete this CLI challenge to earn XP and improve your command-line skills.',
  steps: ['Read the scenario carefully.', 'Write a command to solve the problem.', 'Submit for validation.'],
  hints: ['Read the man page for clues', 'Try simpler flags first', 'Combine commands with pipes'],
})

interface ChallengeDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ChallengeDetailPage({ params }: ChallengeDetailPageProps) {
  const { id } = use(params)
  const challenge = challengeData[id] ?? fallbackChallenge(id)
  const [showHints, setShowHints] = useState(false)
  const [revealedHints, setRevealedHints] = useState(0)

  const revealNext = () => {
    if (revealedHints < challenge.hints.length) setRevealedHints((p) => p + 1)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <Link href="/challenges" className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Challenges
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        {/* Left — Instructions */}
        <div className="space-y-4">
          <section className="glass-card p-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-foreground-subtle">
              {challenge.category}
            </div>
            <h1 className="mt-2 text-2xl font-black tracking-tight">{challenge.title}</h1>
            <p className="mt-2 text-sm text-foreground-muted">{challenge.description}</p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className={`badge-${challenge.difficulty} rounded-full px-2.5 py-0.5 text-xs font-medium`}>{challenge.difficulty}</span>
              <span className="inline-flex items-center gap-1 text-amber-400 text-sm"><Trophy className="h-3.5 w-3.5" /> +{challenge.xp} XP</span>
              <span className="inline-flex items-center gap-1 text-foreground-subtle text-sm"><Clock className="h-3.5 w-3.5" /> {challenge.time}</span>
            </div>
          </section>

          {/* Steps */}
          <section className="glass-card p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground-subtle">Steps</h2>
            <ol className="mt-3 space-y-3">
              {challenge.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground-muted">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          {/* Hints */}
          <section className="glass-card p-5">
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex w-full items-center justify-between text-sm font-bold"
            >
              <span className="flex items-center gap-2"><Lightbulb className="h-4 w-4 text-amber-400" /> Hints</span>
              {showHints ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {showHints && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 space-y-2">
                {challenge.hints.slice(0, revealedHints).map((hint, i) => (
                  <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-sm text-amber-300">
                    💡 {hint}
                  </motion.p>
                ))}
                {revealedHints < challenge.hints.length && (
                  <button onClick={revealNext} className="text-xs text-amber-400 hover:text-amber-300 transition-colors">
                    Reveal next hint ({revealedHints}/{challenge.hints.length})
                  </button>
                )}
              </motion.div>
            )}
          </section>
        </div>

        {/* Right — Terminal */}
        <section className="terminal-shell flex flex-col" style={{ minHeight: 480 }}>
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
            <span className="font-mono text-xs text-zinc-500">sandbox — challenge-{id}</span>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 rounded border border-zinc-700 px-2 py-1 text-xs text-zinc-400 hover:text-zinc-300 transition-colors">
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
              <button className="flex items-center gap-1 rounded bg-emerald-500 px-3 py-1 text-xs font-semibold text-black hover:bg-emerald-400 transition-colors">
                <Send className="h-3 w-3" /> Submit
              </button>
            </div>
          </div>
          <div className="flex-1 px-5 py-4 font-mono text-sm text-terminal-text">
            <p>
              <span className="text-terminal-prompt">learner@dojo</span>
              <span className="text-zinc-500">:</span>
              <span className="text-blue-400">~/challenge</span>
              <span className="text-zinc-500">$ </span>
              <span className="terminal-cursor">▋</span>
            </p>
          </div>
          <div className="flex items-center justify-between border-t border-white/5 px-4 py-1.5 text-[10px] text-zinc-600">
            <span>bash 5.2</span>
            <span>challenge-{id}</span>
          </div>
        </section>
      </div>
    </motion.div>
  )
}
