'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { RotateCcw, ChevronDown, Bot, History, Maximize2 } from 'lucide-react'

const TerminalEmulator = dynamic(
  () => import('@/components/terminal/terminal-emulator').then((m) => m.TerminalEmulator),
  { ssr: false, loading: () => <div className="flex h-[400px] items-center justify-center bg-[#0a0e14] rounded-2xl text-zinc-500 font-mono text-sm">Loading terminal...</div> }
)

const environments = ['Ubuntu 22.04', 'Alpine Linux', 'macOS Sonoma', 'Debian 12']

export default function PlaygroundPage() {
  const [env, setEnv] = useState(environments[0])
  const [showEnvDropdown, setShowEnvDropdown] = useState(false)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [aiQuery, setAiQuery] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [aiLoading, setAiLoading] = useState(false)

  const handleCommand = useCallback((cmd: string) => {
    setCommandHistory((prev) => [cmd, ...prev].slice(0, 20))
  }, [])

  const askAI = async (): Promise<void> => {
    if (!aiQuery.trim() || aiLoading) return
    setAiLoading(true)
    setAiResponse('')

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: aiQuery }],
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        setAiResponse(data.error || 'AI unavailable')
        setAiLoading(false)
        return
      }

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let text = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          text += decoder.decode(value, { stream: true })
          setAiResponse(text)
        }
      }
    } catch {
      setAiResponse('Failed to connect to AI')
    }
    setAiLoading(false)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      {/* Header */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-background-secondary/80 to-background-tertiary/30 p-6 md:p-8">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
        <h1 className="relative text-3xl font-black tracking-tight md:text-4xl">
          Terminal <span className="text-gradient-primary">Playground</span>
        </h1>
        <p className="relative mt-2 text-foreground-muted">
          Practice commands freely in a sandboxed environment. Real execution, safe environment.
        </p>
      </section>

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        {/* Main terminal */}
        <div className="overflow-hidden rounded-2xl border border-border bg-[#0a0e14]">
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
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
            <div className="flex gap-2">
              <button className="flex items-center gap-1 rounded border border-zinc-700 px-2 py-1 text-xs text-zinc-400 hover:text-zinc-300 transition-colors">
                <Maximize2 className="h-3 w-3" />
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-1 rounded border border-zinc-700 px-2 py-1 text-xs text-zinc-400 hover:text-zinc-300 transition-colors"
              >
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
            </div>
          </div>
          <div style={{ height: 440 }}>
            <TerminalEmulator onCommand={handleCommand} sessionId="playground" />
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
              {commandHistory.length === 0 ? (
                <p className="text-xs text-foreground-subtle">No commands yet. Start typing!</p>
              ) : (
                commandHistory.map((cmd, i) => (
                  <div key={i} className="rounded-lg px-2.5 py-1.5 font-mono text-xs text-foreground-muted">
                    $ {cmd}
                  </div>
                ))
              )}
            </div>
          </section>

          {/* AI Assistant */}
          <section className="glass-card p-4">
            <h3 className="flex items-center gap-2 text-sm font-bold">
              <Bot className="h-4 w-4 text-purple-400" /> AI Assistant
            </h3>
            <p className="mt-2 text-xs text-foreground-muted">
              Ask a question about any command.
            </p>
            <textarea
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder="How do I find files changed in the last 24 hours?"
              className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs outline-none transition-all focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
              rows={3}
            />
            <button
              onClick={askAI}
              disabled={aiLoading}
              className="mt-2 w-full rounded-lg bg-purple-500/20 py-2 text-xs font-semibold text-purple-400 transition-colors hover:bg-purple-500/30 disabled:opacity-50"
            >
              {aiLoading ? 'Thinking...' : 'Ask AI'}
            </button>
            {aiResponse && (
              <div className="mt-3 rounded-lg border border-border bg-background-secondary p-3 text-xs text-foreground-muted whitespace-pre-wrap max-h-48 overflow-y-auto">
                {aiResponse}
              </div>
            )}
          </section>
        </div>
      </div>
    </motion.div>
  )
}
