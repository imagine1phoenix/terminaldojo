'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, AlertTriangle, Shield, ChevronDown, ChevronUp, Sparkles, Copy } from 'lucide-react'

const presets = [
  "find /var -name '*.log' -mtime +7 -delete",
  "grep -rn 'password' --include='*.env' .",
  "docker system prune -af --volumes",
  "chmod -R 777 /",
  "curl -s https://api.github.com/users/octocat | jq .name",
]

interface Breakdown {
  part: string
  explanation: string
  type: 'command' | 'flag' | 'argument' | 'pipe' | 'dangerous'
}

const sampleBreakdown: Breakdown[] = [
  { part: 'find', explanation: 'Search for files in the filesystem hierarchy', type: 'command' },
  { part: '/var', explanation: 'Start searching from the /var directory', type: 'argument' },
  { part: "-name '*.log'", explanation: "Match files ending in .log (glob pattern)", type: 'flag' },
  { part: '-mtime +7', explanation: 'Files modified more than 7 days ago', type: 'flag' },
  { part: '-delete', explanation: '⚠️ Permanently deletes matched files! No undo.', type: 'dangerous' },
]

export default function AiExplainPage() {
  const [command, setCommand] = useState(presets[0])
  const [analyzed, setAnalyzed] = useState(true)
  const [showAll, setShowAll] = useState(true)
  const dangerLevel = command.includes('-delete') || command.includes('777') || command.includes('prune -af') ? 4 : command.includes('password') ? 3 : 1

  const handleAnalyze = () => setAnalyzed(true)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      {/* Header */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-background-secondary/80 to-background-tertiary/30 p-6 md:p-8">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
            <Brain className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight md:text-4xl">
              AI <span className="text-gradient-purple">Explainer</span>
            </h1>
            <p className="mt-1 text-foreground-muted">
              Paste any command and get a plain-English breakdown with safety analysis.
            </p>
          </div>
        </div>
      </section>

      {/* Input */}
      <section className="glass-card p-5">
        <label htmlFor="command-input" className="mb-2 block text-sm font-semibold">
          Command Input
        </label>
        <div className="relative">
          <textarea
            id="command-input"
            rows={3}
            value={command}
            onChange={(e) => { setCommand(e.target.value); setAnalyzed(false) }}
            className="w-full rounded-xl border border-border bg-terminal-bg p-4 font-mono text-sm text-terminal-text outline-none transition-all focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
          />
          <button className="absolute right-3 top-3 rounded-lg border border-border bg-background-secondary p-1.5 text-foreground-subtle hover:text-foreground transition-colors">
            <Copy className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Preset examples */}
        <div className="mt-3 flex flex-wrap gap-2">
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => { setCommand(p); setAnalyzed(false) }}
              className="rounded-lg border border-border px-2.5 py-1 font-mono text-[10px] text-foreground-muted transition-all hover:border-border-hover hover:text-foreground truncate max-w-[200px]"
            >
              $ {p}
            </button>
          ))}
        </div>

        <button
          onClick={handleAnalyze}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-purple-500 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-purple-400 hover:shadow-lg hover:shadow-purple-500/20"
        >
          <Sparkles className="h-4 w-4" /> Explain This Command
        </button>
      </section>

      <AnimatePresence>
        {analyzed && (
          <>
            {/* Danger Level */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`glass-card overflow-hidden p-5 ${dangerLevel >= 4 ? 'border-red-500/30' : dangerLevel >= 3 ? 'border-amber-500/30' : 'border-emerald-500/30'}`}
            >
              <div className="flex items-center gap-3">
                {dangerLevel >= 3 ? (
                  <AlertTriangle className={`h-6 w-6 ${dangerLevel >= 4 ? 'text-red-400' : 'text-amber-400'}`} />
                ) : (
                  <Shield className="h-6 w-6 text-emerald-400" />
                )}
                <div>
                  <h2 className="text-lg font-bold">
                    Danger Level: {dangerLevel} / 5
                  </h2>
                  <p className="text-sm text-foreground-muted">
                    {dangerLevel >= 4
                      ? 'This command can permanently delete data. Preview before running.'
                      : dangerLevel >= 3
                      ? 'This command could expose sensitive information. Use with caution.'
                      : 'This command is safe to run in most environments.'}
                  </p>
                </div>
              </div>
              {/* Danger gauge */}
              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-background-tertiary">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${dangerLevel * 20}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`h-full rounded-full ${dangerLevel >= 4 ? 'bg-gradient-to-r from-red-500 to-red-400' : dangerLevel >= 3 ? 'bg-gradient-to-r from-amber-500 to-amber-400' : 'bg-gradient-to-r from-emerald-500 to-emerald-400'}`}
                />
              </div>
            </motion.section>

            {/* Breakdown */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-5"
            >
              <button onClick={() => setShowAll(!showAll)} className="flex w-full items-center justify-between">
                <h2 className="text-lg font-bold">Command Breakdown</h2>
                {showAll ? <ChevronUp className="h-5 w-5 text-foreground-subtle" /> : <ChevronDown className="h-5 w-5 text-foreground-subtle" />}
              </button>
              {showAll && (
                <div className="mt-4 space-y-3">
                  {sampleBreakdown.map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className={`flex items-start gap-4 rounded-xl border p-4 ${
                        b.type === 'dangerous' ? 'border-red-500/30 bg-red-500/5' : 'border-border bg-background-secondary/30'
                      }`}
                    >
                      <code className={`shrink-0 rounded-lg px-3 py-1.5 font-mono text-sm font-semibold ${
                        b.type === 'command' ? 'bg-primary/10 text-primary'
                        : b.type === 'flag' ? 'bg-cyan-500/10 text-cyan-400'
                        : b.type === 'dangerous' ? 'bg-red-500/10 text-red-400'
                        : 'bg-purple-500/10 text-purple-400'
                      }`}>
                        {b.part}
                      </code>
                      <p className="text-sm text-foreground-muted pt-1">{b.explanation}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.section>

            {/* Safer Alternative */}
            {dangerLevel >= 3 && (
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card border-emerald-500/20 p-5"
              >
                <h2 className="flex items-center gap-2 text-lg font-bold">
                  <Shield className="h-5 w-5 text-emerald-400" /> Safer Alternative
                </h2>
                <div className="mt-3 rounded-xl border border-border bg-terminal-bg p-4 font-mono text-sm">
                  <p className="text-terminal-prompt">$ find /var -name &apos;*.log&apos; -mtime +7 -print</p>
                  <p className="mt-1 text-zinc-500"># Preview matching files first — then add -delete when confirmed</p>
                </div>
              </motion.section>
            )}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
