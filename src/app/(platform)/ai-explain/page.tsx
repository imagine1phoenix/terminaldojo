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

interface BreakdownPart {
  part: string
  explanation: string
  type: string
}

interface ExplainResult {
  summary: string
  dangerLevel: number
  breakdown: BreakdownPart[]
  saferAlternative: string | null
  warnings: string[]
}

export default function AiExplainPage() {
  const [command, setCommand] = useState(presets[0])
  const [result, setResult] = useState<ExplainResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showBreakdown, setShowBreakdown] = useState(true)

  const handleAnalyze = async (): Promise<void> => {
    if (!command.trim() || loading) return
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'AI unavailable')
        // Fall back to local analysis
        setResult(localAnalysis(command))
        setLoading(false)
        return
      }

      // Read streaming response
      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let text = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          text += decoder.decode(value, { stream: true })
        }
      }

      // Try to parse JSON from streamed text
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          setResult(JSON.parse(jsonMatch[0]))
        } else {
          setResult(localAnalysis(command))
        }
      } catch {
        setResult(localAnalysis(command))
      }
    } catch {
      setResult(localAnalysis(command))
    }
    setLoading(false)
  }

  // Local fallback analysis when AI is unavailable
  const localAnalysis = (cmd: string): ExplainResult => {
    const parts = cmd.split(/\s+/)
    const hasDangerous = /-delete|777|prune\s*-af|rm\s+-rf/.test(cmd)
    const hasSensitive = /password|secret|api_key/.test(cmd)

    return {
      summary: `Executes: ${parts[0]} with ${parts.length - 1} arguments`,
      dangerLevel: hasDangerous ? 4 : hasSensitive ? 3 : 1,
      breakdown: parts.map((p) => ({
        part: p,
        explanation: getLocalExplanation(p),
        type: p.startsWith('-') ? (hasDangerous && p === '-delete' ? 'dangerous' : 'flag') : parts.indexOf(p) === 0 ? 'command' : 'argument',
      })),
      saferAlternative: hasDangerous ? cmd.replace('-delete', '-print') : null,
      warnings: hasDangerous ? ['This command can permanently delete data'] : [],
    }
  }

  const getLocalExplanation = (part: string): string => {
    const map: Record<string, string> = {
      'find': 'Search for files in the filesystem',
      'grep': 'Search for patterns in files',
      'docker': 'Container management tool',
      'chmod': 'Change file permissions',
      'curl': 'Transfer data with URLs',
      '-name': 'Match by filename pattern',
      '-mtime': 'Match by modification time',
      '-delete': '⚠️ Permanently deletes matched files',
      '-r': 'Recursive search',
      '-rn': 'Recursive search with line numbers',
      '-R': 'Recursive operation',
      '-af': 'Force removal of all items',
      '777': '⚠️ Gives full permissions to everyone',
      '-s': 'Silent mode',
      'system': 'Docker system management',
      'prune': 'Remove unused resources',
    }
    return map[part] || `Argument: ${part}`
  }

  const dangerLevel = result?.dangerLevel ?? 0

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
        <label htmlFor="command-input" className="mb-2 block text-sm font-semibold">Command Input</label>
        <div className="relative">
          <textarea
            id="command-input"
            rows={3}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="w-full rounded-xl border border-border bg-terminal-bg p-4 font-mono text-sm text-terminal-text outline-none transition-all focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
          />
          <button className="absolute right-3 top-3 rounded-lg border border-border bg-background-secondary p-1.5 text-foreground-subtle hover:text-foreground transition-colors">
            <Copy className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {presets.map((p, i) => (
            <button key={i} onClick={() => setCommand(p)} className="rounded-lg border border-border px-2.5 py-1 font-mono text-[10px] text-foreground-muted transition-all hover:border-border-hover hover:text-foreground truncate max-w-[200px]">
              $ {p}
            </button>
          ))}
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-purple-500 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-purple-400 hover:shadow-lg hover:shadow-purple-500/20 disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" /> {loading ? 'Analyzing...' : 'Explain This Command'}
        </button>

        {error && (
          <p className="mt-2 text-xs text-amber-400">⚠ {error} — showing local analysis</p>
        )}
      </section>

      <AnimatePresence>
        {result && (
          <>
            {/* Summary */}
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5">
              <p className="text-sm text-foreground-muted">{result.summary}</p>
            </motion.section>

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
                  <h2 className="text-lg font-bold">Danger Level: {dangerLevel} / 5</h2>
                  <p className="text-sm text-foreground-muted">
                    {dangerLevel >= 4 ? 'This command can permanently delete data.' : dangerLevel >= 3 ? 'Use with caution.' : 'Safe to run.'}
                  </p>
                </div>
              </div>
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
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
              <button onClick={() => setShowBreakdown(!showBreakdown)} className="flex w-full items-center justify-between">
                <h2 className="text-lg font-bold">Command Breakdown</h2>
                {showBreakdown ? <ChevronUp className="h-5 w-5 text-foreground-subtle" /> : <ChevronDown className="h-5 w-5 text-foreground-subtle" />}
              </button>
              {showBreakdown && (
                <div className="mt-4 space-y-3">
                  {result.breakdown.map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className={`flex items-start gap-4 rounded-xl border p-4 ${b.type === 'dangerous' ? 'border-red-500/30 bg-red-500/5' : 'border-border bg-background-secondary/30'}`}
                    >
                      <code className={`shrink-0 rounded-lg px-3 py-1.5 font-mono text-sm font-semibold ${
                        b.type === 'command' ? 'bg-primary/10 text-primary'
                        : b.type === 'flag' ? 'bg-cyan-500/10 text-cyan-400'
                        : b.type === 'dangerous' ? 'bg-red-500/10 text-red-400'
                        : 'bg-purple-500/10 text-purple-400'
                      }`}>{b.part}</code>
                      <p className="text-sm text-foreground-muted pt-1">{b.explanation}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.section>

            {/* Safer Alternative */}
            {result.saferAlternative && (
              <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card border-emerald-500/20 p-5">
                <h2 className="flex items-center gap-2 text-lg font-bold">
                  <Shield className="h-5 w-5 text-emerald-400" /> Safer Alternative
                </h2>
                <div className="mt-3 rounded-xl border border-border bg-terminal-bg p-4 font-mono text-sm">
                  <p className="text-terminal-prompt">$ {result.saferAlternative}</p>
                </div>
              </motion.section>
            )}

            {/* Warnings */}
            {result.warnings.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card border-amber-500/20 p-5">
                <h2 className="flex items-center gap-2 text-lg font-bold">
                  <AlertTriangle className="h-5 w-5 text-amber-400" /> Warnings
                </h2>
                <ul className="mt-3 space-y-2">
                  {result.warnings.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground-muted">
                      <span className="text-amber-400">•</span> {w}
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
