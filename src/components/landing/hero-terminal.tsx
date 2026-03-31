'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

interface DemoScript {
  command: string
  output: string[]
}

const SCRIPTS: DemoScript[] = [
  {
    command: "grep -rn 'TODO' --include='*.ts' src/",
    output: [
      'src/app/page.tsx:34:// TODO: add onboarding tooltip',
      'src/lib/terminal/validator.ts:18:// TODO: harden regex checks',
      'src/hooks/use-progress.ts:7:// TODO: persist to localStorage',
    ],
  },
  {
    command: "find ./logs -name '*.log' -size +10M",
    output: ['./logs/nginx/error.log    (24MB)', './logs/app/worker.log    (18MB)', './logs/db/slow-query.log (11MB)'],
  },
  {
    command: "docker ps --format '{{.Names}}  {{.Status}}'",
    output: ['api-gateway     Up 12 minutes', 'redis-cache     Up 2 hours', 'postgres-db     Up 2 hours'],
  },
  {
    command: "kubectl get pods -n production -o wide",
    output: ['web-app-7d4b9   1/1   Running   0   3h   10.0.1.42', 'worker-5c8f2    1/1   Running   0   3h   10.0.1.43'],
  },
]

interface Playhead {
  scriptIndex: number
  charIndex: number
  phase: 'typing' | 'output'
  holdTicks: number
}

export function HeroTerminal() {
  const [playhead, setPlayhead] = useState<Playhead>({
    scriptIndex: 0,
    charIndex: 0,
    phase: 'typing',
    holdTicks: 0,
  })

  const activeScript = useMemo(
    () => SCRIPTS[playhead.scriptIndex],
    [playhead.scriptIndex]
  )
  const typed = activeScript.command.slice(0, playhead.charIndex)
  const showOutput = playhead.phase === 'output'

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPlayhead((prev) => {
        const script = SCRIPTS[prev.scriptIndex]
        if (prev.phase === 'typing') {
          if (prev.charIndex < script.command.length) {
            return { ...prev, charIndex: prev.charIndex + 1 }
          }
          return { ...prev, phase: 'output', holdTicks: 20 }
        }

        if (prev.holdTicks > 0) {
          return { ...prev, holdTicks: prev.holdTicks - 1 }
        }

        return {
          scriptIndex: (prev.scriptIndex + 1) % SCRIPTS.length,
          charIndex: 0,
          phase: 'typing',
          holdTicks: 0,
        }
      })
    }, 50)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="terminal-shell relative"
    >
      {/* Glow behind terminal */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-accent/20 blur-xl opacity-50" />

      <div className="relative">
        {/* Titlebar */}
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80 shadow-inner" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 shadow-inner" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 shadow-inner" />
          </div>
          <p className="text-xs text-zinc-500 font-mono">terminaldojo — sandbox</p>
          <div className="w-12" />
        </div>

        {/* Terminal body */}
        <div className="min-h-[220px] space-y-2 px-5 py-5 font-mono text-sm text-terminal-text">
          <p>
            <span className="text-terminal-prompt">learner@dojo</span>
            <span className="text-zinc-500">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-zinc-500">$ </span>
            <span>{typed}</span>
            <span className="terminal-cursor">▋</span>
          </p>
          {showOutput ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="space-y-1 pl-0"
            >
              {activeScript.output.map((line, idx) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.08 }}
                  className="text-zinc-400"
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
          ) : null}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between border-t border-white/5 px-4 py-1.5 text-[10px] text-zinc-600">
          <span>bash 5.2</span>
          <span>sandbox-session-1</span>
          <span>{playhead.scriptIndex + 1}/{SCRIPTS.length}</span>
        </div>
      </div>
    </motion.div>
  )
}
