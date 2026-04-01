'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Bot, ChevronDown, Minus, Square, X } from 'lucide-react'
import { TerminalErrorBoundary } from '@/components/terminal/terminal-error-boundary'
import { useDojoEffects } from '@/components/dojo-effects-provider'
import type { TerminalCommandResult } from '@/components/terminal/terminal-emulator'

const TerminalEmulator = dynamic(
  () => import('@/components/terminal/terminal-emulator').then((module) => module.TerminalEmulator),
  {
    ssr: false,
    loading: () => (
      <div className="cyber-loading-shell flex h-[460px] items-center justify-center rounded-b-2xl bg-[#030407]">
        <div className="flex flex-col items-center gap-3">
          <div className="enso-spinner" />
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">Loading training session...</p>
        </div>
      </div>
    ),
  },
)

const environments = ['Ubuntu 22.04', 'Alpine Linux', 'macOS Sonoma', 'Debian 12']

interface ParsedSenseiExplain {
  summary?: string
  dangerLevel?: number
  saferAlternative?: string | null
  warnings?: string[]
}

function extractExplainJson(raw: string): ParsedSenseiExplain | null {
  const start = raw.indexOf('{')
  const end = raw.lastIndexOf('}')
  if (start === -1 || end === -1 || end <= start) return null

  try {
    return JSON.parse(raw.slice(start, end + 1)) as ParsedSenseiExplain
  } catch {
    return null
  }
}

function dangerColor(level: number): string {
  if (level <= 1) return '#22c55e'
  if (level === 2) return '#84cc16'
  if (level === 3) return '#f59e0b'
  if (level === 4) return '#f97316'
  return '#ef4444'
}

export default function PlaygroundPage() {
  const effects = useDojoEffects()

  const [env, setEnv] = useState(environments[0])
  const [showEnvDropdown, setShowEnvDropdown] = useState(false)
  const [commandHistory, setCommandHistory] = useState<Array<{ command: string; success: boolean }>>([])
  const [manualSenseiQuery, setManualSenseiQuery] = useState('')
  const [senseiText, setSenseiText] = useState('')
  const [senseiThinking, setSenseiThinking] = useState(false)
  const [danger, setDanger] = useState(1)
  const [saferAlternative, setSaferAlternative] = useState<string | null>(null)

  const queueRef = useRef<string[]>([])
  const streamDoneRef = useRef(false)
  const typingTimerRef = useRef<number | null>(null)

  const drainQueue = useCallback(() => {
    if (typingTimerRef.current !== null) return

    typingTimerRef.current = window.setInterval(() => {
      const nextChar = queueRef.current.shift()
      if (nextChar) {
        setSenseiText((prev) => prev + nextChar)
        return
      }

      if (streamDoneRef.current) {
        if (typingTimerRef.current !== null) {
          window.clearInterval(typingTimerRef.current)
          typingTimerRef.current = null
        }
        setSenseiThinking(false)
      }
    }, 15)
  }, [])

  const explainToSensei = useCallback(async (input: string, fallbackDanger = 1) => {
    const command = input.trim()
    if (!command) return

    setSenseiThinking(true)
    setSenseiText('')
    setSaferAlternative(null)
    setDanger(fallbackDanger)
    streamDoneRef.current = false
    queueRef.current = []

    let raw = ''

    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command }),
      })

      if (!res.ok) {
        const data = await res.json()
        const text = data.error || 'Sensei could not explain this command.'
        queueRef.current.push(...text)
        streamDoneRef.current = true
        drainQueue()
        return
      }

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      if (!reader) {
        queueRef.current.push(...'Sensei response unavailable.')
        streamDoneRef.current = true
        drainQueue()
        return
      }

      drainQueue()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        raw += chunk
        queueRef.current.push(...chunk)
      }

      const parsed = extractExplainJson(raw)
      if (parsed?.dangerLevel) {
        setDanger(parsed.dangerLevel)
      }
      if (parsed?.saferAlternative) {
        setSaferAlternative(parsed.saferAlternative)
      }
    } catch {
      queueRef.current.push(...'Sensei connection failed. Try again in a moment.')
    } finally {
      streamDoneRef.current = true
      drainQueue()
    }
  }, [drainQueue])

  const handleCommand = useCallback((command: string) => {
    setCommandHistory((prev) => [{ command, success: true }, ...prev].slice(0, 30))
  }, [])

  const handleCommandResult = useCallback((result: TerminalCommandResult) => {
    setCommandHistory((prev) => {
      const updated = [...prev]
      if (updated.length > 0 && updated[0].command === result.command) {
        updated[0] = { command: result.command, success: result.success }
      } else {
        updated.unshift({ command: result.command, success: result.success })
      }
      return updated.slice(0, 30)
    })

    if (result.success) {
      effects.triggerStrike({ ki: 15 })
      effects.triggerSuccess('Clean strike! Command succeeded.')

      if (/challenge|solve|complete/i.test(result.command)) {
        effects.triggerChallengeComplete(50)
      }

      if (/git\s+rebase|docker\s+run|kubectl\s+apply/i.test(result.command)) {
        effects.triggerAchievement('Execution Seal', 'Technique unlocked in live terminal')
      }
    } else {
      effects.triggerError(`ERROR: ${result.error || 'Command failed'}`)
    }

    void explainToSensei(result.command, result.dangerLevel ?? 1)
  }, [effects, explainToSensei])

  const askSenseiDirectly = useCallback(() => {
    if (!manualSenseiQuery.trim()) return
    void explainToSensei(manualSenseiQuery, 2)
  }, [manualSenseiQuery, explainToSensei])

  const dangerBars = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => {
      const level = index + 1
      const active = level <= danger
      return { level, active }
    })
  }, [danger])

  useEffect(() => {
    return () => {
      if (typingTimerRef.current !== null) {
        window.clearInterval(typingTimerRef.current)
      }
    }
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <section className="relative overflow-hidden rounded-3xl border border-[#ff1744]/35 bg-[#05060a] p-6 md:p-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(255,23,68,0.18),transparent_45%),radial-gradient(circle_at_85%_10%,rgba(0,204,255,0.16),transparent_40%)]" />
        <h1 className="relative text-3xl font-black tracking-tight md:text-4xl">
          Cyberpunk <span className="text-gradient-primary">Dojo Terminal</span>
        </h1>
        <p className="relative mt-2 max-w-3xl text-foreground-muted">
          Obsidian shell, neon strike feedback, and an AI Sensei that explains every command in real-time.
        </p>
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="neon-red-frame overflow-hidden rounded-2xl border border-[#1a1f2b] bg-[#020205] shadow-[0_0_0_1px_rgba(255,0,0,0.08),0_22px_46px_rgba(0,0,0,0.65)]">
          <div className="relative border-b border-red-500/20 bg-gradient-to-r from-[#0d0d13] via-[#141420] to-[#0d0d13] px-4 py-2">
            <div className="absolute inset-y-0 left-0 w-[3px] bg-[#ff1744] shadow-[0_0_12px_rgba(255,23,68,0.9)]" />
            <div className="absolute inset-y-0 right-0 w-[3px] bg-[#ff1744] shadow-[0_0_12px_rgba(255,23,68,0.9)]" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">DOJO</span>
                <div className="relative">
                  <button
                    onClick={() => setShowEnvDropdown((prev) => !prev)}
                    className="flex items-center gap-1 rounded border border-red-400/25 bg-black/35 px-2 py-1 font-mono text-[11px] text-cyan-300 transition-colors hover:text-cyan-200"
                  >
                    {env} <ChevronDown className="h-3 w-3" />
                  </button>
                  {showEnvDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 top-full z-20 mt-1 w-44 rounded-lg border border-red-500/30 bg-[#090a10] py-1 shadow-xl"
                    >
                      {environments.map((entry) => (
                        <button
                          key={entry}
                          onClick={() => {
                            setEnv(entry)
                            setShowEnvDropdown(false)
                          }}
                          className={`w-full px-3 py-1.5 text-left font-mono text-xs transition-colors hover:bg-red-500/10 ${
                            entry === env ? 'text-red-300' : 'text-cyan-300/85'
                          }`}
                        >
                          {entry}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button type="button" className="dojo-window-btn" aria-label="Minimize terminal">
                  <Minus className="h-3 w-3" />
                </button>
                <button type="button" className="dojo-window-btn" aria-label="Maximize terminal">
                  <Square className="h-3 w-3" />
                </button>
                <button type="button" className="dojo-window-btn dojo-window-btn-danger" aria-label="Close terminal">
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="cyber-scanlines resize-y overflow-auto" style={{ minHeight: 420, maxHeight: 780 }}>
            <TerminalErrorBoundary>
              <TerminalEmulator
                className="cyber-terminal-surface h-[460px]"
                onCommand={handleCommand}
                onCommandResult={handleCommandResult}
                sessionId="playground"
              />
            </TerminalErrorBoundary>
          </div>
        </div>

        <aside className="rounded-2xl border border-red-500/25 bg-[#06070c] p-4 shadow-[0_0_0_1px_rgba(255,0,0,0.08),0_18px_36px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between border-b border-red-500/20 pb-3">
            <div>
              <p className="text-xl font-black text-red-400 drop-shadow-[0_0_8px_rgba(255,0,0,0.45)]">❖</p>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300">Sensei</p>
            </div>

            <div className="rounded-lg border border-cyan-400/25 bg-cyan-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-300">
              Auto Explain
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-cyan-400/20 bg-black/40 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-300">Danger Level</p>
              <div className="mt-2 flex gap-1.5" aria-label={`Danger level ${danger} of 5`}>
                {dangerBars.map((bar) => (
                  <span
                    key={bar.level}
                    className="h-2.5 w-full rounded-full"
                    style={{
                      background: bar.active ? dangerColor(bar.level) : 'rgba(255,255,255,0.12)',
                      boxShadow: bar.active ? `0 0 10px ${dangerColor(bar.level)}` : 'none',
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-red-500/20 bg-black/35 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-red-300">Command History</p>
              <div className="mt-2 max-h-24 space-y-1 overflow-y-auto pr-1">
                {commandHistory.length === 0 ? (
                  <p className="text-xs text-zinc-400">No commands executed yet.</p>
                ) : (
                  commandHistory.slice(0, 8).map((entry, index) => (
                    <p
                      key={`${entry.command}-${index}`}
                      className={`truncate font-mono text-xs ${entry.success ? 'text-cyan-300' : 'text-red-300'}`}
                    >
                      $ {entry.command}
                    </p>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-xl border border-cyan-400/20 bg-black/35 p-3">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-300">Live Explanation</p>
                {senseiThinking && (
                  <div className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.12em] text-cyan-300">
                    <span className="enso-spinner h-3 w-3" />
                    Thinking
                  </div>
                )}
              </div>
              <div className="mt-2 max-h-56 overflow-y-auto rounded-lg border border-white/10 bg-[#020307] p-3 font-mono text-xs leading-relaxed text-cyan-300/95 shadow-[0_0_14px_rgba(0,204,255,0.18)_inset]">
                {senseiText || 'Sensei is ready. Execute a command or ask manually.'}
                <span className="sensei-cursor">▋</span>
              </div>

              {saferAlternative && (
                <div className="mt-2 rounded-lg border border-amber-400/30 bg-amber-500/10 p-2 text-xs text-amber-200">
                  Safer alternative: <span className="font-mono">{saferAlternative}</span>
                </div>
              )}

              <div className="mt-3">
                <textarea
                  value={manualSenseiQuery}
                  onChange={(event) => setManualSenseiQuery(event.target.value)}
                  rows={3}
                  placeholder="Paste unknown command for Sensei"
                  className="w-full rounded-lg border border-red-500/25 bg-black/50 px-3 py-2 text-xs text-cyan-200 outline-none transition-colors placeholder:text-zinc-500 focus:border-cyan-400/45"
                  aria-label="Ask Sensei manually"
                />
                <button
                  type="button"
                  onClick={askSenseiDirectly}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-red-400/35 bg-red-500/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-red-300 transition-colors hover:bg-red-500/24"
                >
                  <Bot className="h-3.5 w-3.5" /> Ask Sensei
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  )
}
