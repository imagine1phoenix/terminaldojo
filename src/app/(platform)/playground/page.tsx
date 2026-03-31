'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, ChevronDown, Bot, History, Maximize2 } from 'lucide-react'

const environments = ['Ubuntu 22.04', 'Alpine Linux', 'macOS Sonoma', 'Debian 12']

const sampleHistory = [
  'ls -la',
  'cd /var/log',
  "grep -rn 'error' .",
  'du -sh *',
  'find . -name "*.log" -size +1M',
]

export default function PlaygroundPage() {
  const [env, setEnv] = useState(environments[0])
  const [showEnvDropdown, setShowEnvDropdown] = useState(false)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      {/* Header */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-background-secondary/80 to-background-tertiary/30 p-6 md:p-8">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
        <h1 className="relative text-3xl font-black tracking-tight md:text-4xl">
          Terminal <span className="text-gradient-primary">Playground</span>
        </h1>
        <p className="relative mt-2 text-foreground-muted">
          Practice commands freely in a sandboxed environment. No consequences, full power.
        </p>
      </section>

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        {/* Main terminal */}
        <div className="terminal-shell flex flex-col" style={{ minHeight: 560 }}>
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
            <div className="flex items-center gap-3">
              {/* Environment selector */}
              <div className="relative">
                <button
                  onClick={() => setShowEnvDropdown(!showEnvDropdown)}
                  className="flex items-center gap-1.5 rounded border border-zinc-700 px-2.5 py-1 font-mono text-xs text-zinc-400 hover:text-zinc-300 transition-colors"
                >
                  {env} <ChevronDown className="h-3 w-3" />
                </button>
                {showEnvDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-0 top-full z-10 mt-1 w-44 rounded-lg border border-zinc-700 bg-zinc-900 py-1 shadow-xl"
                  >
                    {environments.map((e) => (
                      <button
                        key={e}
                        onClick={() => { setEnv(e); setShowEnvDropdown(false) }}
                        className={`w-full px-3 py-1.5 text-left font-mono text-xs transition-colors hover:bg-zinc-800 ${e === env ? 'text-primary' : 'text-zinc-400'}`}
                      >
                        {e}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 rounded border border-zinc-700 px-2 py-1 text-xs text-zinc-400 hover:text-zinc-300 transition-colors">
                <Maximize2 className="h-3 w-3" />
              </button>
              <button className="flex items-center gap-1 rounded border border-zinc-700 px-2 py-1 text-xs text-zinc-400 hover:text-zinc-300 transition-colors">
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
            </div>
          </div>

          <div className="flex-1 px-5 py-4 font-mono text-sm text-terminal-text">
            <p className="text-zinc-500">Welcome to TerminalDojo Playground</p>
            <p className="text-zinc-500">Environment: {env}</p>
            <p className="text-zinc-500">Type any command to practice. Use &apos;help&apos; for tips.</p>
            <p className="mt-2 text-zinc-600">─────────────────────────────────────</p>
            <p className="mt-2">
              <span className="text-terminal-prompt">learner@dojo</span>
              <span className="text-zinc-500">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-zinc-500">$ </span>
              <span>ls -la</span>
            </p>
            <p className="text-zinc-400">total 32</p>
            <p className="text-zinc-400">drwxr-xr-x  5 learner learner 4096 Mar 31 docs/</p>
            <p className="text-zinc-400">-rw-r--r--  1 learner learner 1420 Mar 31 notes.txt</p>
            <p className="text-zinc-400">-rwxr-xr-x  1 learner learner  856 Mar 30 deploy.sh</p>
            <p className="text-zinc-400">drwxr-xr-x  3 learner learner 4096 Mar 29 projects/</p>
            <p className="mt-2">
              <span className="text-terminal-prompt">learner@dojo</span>
              <span className="text-zinc-500">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-zinc-500">$ </span>
              <span className="terminal-cursor">▋</span>
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 px-4 py-1.5 text-[10px] text-zinc-600">
            <span>bash 5.2</span>
            <span>playground-session</span>
            <span>{env.toLowerCase().replace(/\s+/g, '-')}</span>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* History */}
          <section className="glass-card p-4">
            <h3 className="flex items-center gap-2 text-sm font-bold">
              <History className="h-4 w-4 text-foreground-subtle" /> Command History
            </h3>
            <div className="mt-3 space-y-1">
              {sampleHistory.map((cmd, i) => (
                <button key={i} className="w-full rounded-lg px-2.5 py-1.5 text-left font-mono text-xs text-foreground-muted transition-colors hover:bg-background-tertiary/50 hover:text-foreground">
                  $ {cmd}
                </button>
              ))}
            </div>
          </section>

          {/* AI Assistant */}
          <section className="glass-card p-4">
            <h3 className="flex items-center gap-2 text-sm font-bold">
              <Bot className="h-4 w-4 text-purple-400" /> AI Assistant
            </h3>
            <p className="mt-2 text-xs text-foreground-muted">
              Ask a question about any command or get suggestions.
            </p>
            <textarea
              placeholder="How do I find files changed in the last 24 hours?"
              className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs outline-none transition-all focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
              rows={3}
            />
            <button className="mt-2 w-full rounded-lg bg-purple-500/20 py-2 text-xs font-semibold text-purple-400 transition-colors hover:bg-purple-500/30">
              Ask AI
            </button>
          </section>
        </div>
      </div>
    </motion.div>
  )
}
