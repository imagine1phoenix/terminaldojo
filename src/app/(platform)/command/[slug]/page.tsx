'use client'

import { notFound } from 'next/navigation'
import { use } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Copy, Shield, AlertTriangle, BookOpen, Terminal } from 'lucide-react'

const allCommands: Record<string, {
  name: string; category: string; categoryIcon: string; difficulty: string; dangerLevel: string
  description: string; syntax: string
  flags: { flag: string; description: string }[]
  examples: { command: string; description: string; output?: string }[]
  related: string[]
}> = {
  grep: {
    name: 'grep', category: 'Linux Core', categoryIcon: '🐧', difficulty: 'beginner', dangerLevel: 'safe',
    description: 'Search for patterns in files using regular expressions. One of the most frequently used commands in the Unix toolbox.',
    syntax: 'grep [OPTIONS] PATTERN [FILE...]',
    flags: [
      { flag: '-r, --recursive', description: 'Search recursively through directories' },
      { flag: '-i, --ignore-case', description: 'Case-insensitive pattern matching' },
      { flag: '-n, --line-number', description: 'Prefix each line with its line number' },
      { flag: '-l, --files-with-matches', description: 'Show only filenames containing matches' },
      { flag: '-c, --count', description: 'Print only a count of matching lines per file' },
      { flag: '-v, --invert-match', description: 'Select lines that do NOT match the pattern' },
    ],
    examples: [
      { command: "grep -rn 'TODO' --include='*.ts' src/", description: 'Find all TODO comments in TypeScript files', output: 'src/app/page.tsx:34:// TODO: add validation\nsrc/lib/utils.ts:12:// TODO: optimize' },
      { command: "grep -i 'error' /var/log/syslog | head -20", description: 'Search for errors in system log (case-insensitive, first 20 lines)' },
      { command: "grep -rl 'deprecated' --include='*.md' docs/", description: 'Find all markdown docs mentioning deprecated features' },
      { command: "grep -c 'import' src/**/*.ts | sort -t: -k2 -rn | head -5", description: 'Top 5 files by import count' },
    ],
    related: ['sed', 'awk', 'find', 'ripgrep'],
  },
  find: {
    name: 'find', category: 'Linux Core', categoryIcon: '🐧', difficulty: 'beginner', dangerLevel: 'safe',
    description: 'Search for files and directories in the filesystem based on name, size, time, permissions, and more.',
    syntax: 'find [PATH] [EXPRESSION]',
    flags: [
      { flag: '-name PATTERN', description: 'Search by filename (case-sensitive glob)' },
      { flag: '-type [f|d|l]', description: 'Filter by type: f=file, d=directory, l=symlink' },
      { flag: '-size [+|-]N[c|k|M|G]', description: 'Filter by file size' },
      { flag: '-mtime [+|-]N', description: 'Filter by modification time (days)' },
      { flag: '-exec CMD {} \\;', description: 'Execute a command on each match' },
      { flag: '-maxdepth N', description: 'Limit directory traversal depth' },
    ],
    examples: [
      { command: "find . -name '*.log' -size +10M", description: 'Find log files larger than 10MB', output: './logs/nginx/error.log\n./logs/app/worker.log' },
      { command: 'find /tmp -type f -mtime +7 -delete', description: 'Delete temp files older than 7 days (caution!)' },
      { command: "find src -name '*.test.ts' -exec wc -l {} +", description: 'Count lines in all test files' },
    ],
    related: ['locate', 'fd', 'grep', 'xargs'],
  },
}

// Fallback for commands not in the detailed list
const fallback = (slug: string) => ({
  name: slug.replace(/-/g, ' '), category: 'CLI', categoryIcon: '💻', difficulty: 'intermediate', dangerLevel: 'safe',
  description: `Learn how to use the ${slug.replace(/-/g, ' ')} command effectively.`,
  syntax: `${slug.replace(/-/g, ' ')} [OPTIONS] ARGUMENTS`,
  flags: [
    { flag: '--help', description: 'Show usage information' },
    { flag: '--version', description: 'Show version number' },
  ],
  examples: [
    { command: `${slug.replace(/-/g, ' ')} --help`, description: 'Display available options and usage' },
  ],
  related: [],
})

interface CommandDetailPageProps {
  params: Promise<{ slug: string }>
}

export default function CommandDetailPage({ params }: CommandDetailPageProps) {
  const { slug } = use(params)
  const command = allCommands[slug] ?? fallback(slug)

  if (!command) notFound()

  const dangerColor = command.dangerLevel === 'safe' ? 'text-emerald-400' : command.dangerLevel === 'caution' ? 'text-amber-400' : 'text-red-400'
  const dangerBg = command.dangerLevel === 'safe' ? 'bg-emerald-500/10 border-emerald-500/20' : command.dangerLevel === 'caution' ? 'bg-amber-500/10 border-amber-500/20' : 'bg-red-500/10 border-red-500/20'

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      {/* Breadcrumb */}
      <Link href="/explore" className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Explore
      </Link>

      {/* Header */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-background-secondary/80 to-background-tertiary/30 p-6 md:p-8">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-2xl">{command.categoryIcon}</span>
            <span className="text-xs uppercase tracking-widest text-foreground-subtle">{command.category}</span>
            <span className={`badge-${command.difficulty} rounded-full px-2.5 py-0.5 text-xs font-medium`}>{command.difficulty}</span>
            <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${dangerBg} ${dangerColor}`}>
              {command.dangerLevel === 'safe' ? <Shield className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
              {command.dangerLevel}
            </span>
          </div>
          <h1 className="mt-3 font-mono text-4xl font-black tracking-tight">$ {command.name}</h1>
          <p className="mt-2 max-w-2xl text-foreground-muted">{command.description}</p>
        </div>
      </section>

      {/* Syntax */}
      <section className="glass-card p-5">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Terminal className="h-5 w-5 text-primary" /> Syntax
        </h2>
        <div className="mt-3 relative group">
          <pre className="rounded-xl border border-border bg-terminal-bg px-5 py-4 font-mono text-sm text-terminal-text overflow-x-auto">
            {command.syntax}
          </pre>
          <button className="absolute right-3 top-3 rounded-lg border border-border bg-background-secondary p-1.5 text-foreground-subtle opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground">
            <Copy className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      {/* Flags */}
      <section className="glass-card p-5">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <BookOpen className="h-5 w-5 text-primary" /> Flags & Options
        </h2>
        <div className="mt-4 space-y-0 divide-y divide-border">
          {command.flags.map((f) => (
            <div key={f.flag} className="flex items-start gap-4 py-3">
              <code className="shrink-0 rounded-md bg-background-tertiary px-2.5 py-1 font-mono text-sm text-primary">{f.flag}</code>
              <p className="text-sm text-foreground-muted pt-0.5">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Examples */}
      <section className="glass-card p-5">
        <h2 className="text-lg font-bold">Examples</h2>
        <div className="mt-4 space-y-4">
          {command.examples.map((ex, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="group relative rounded-xl border border-border bg-terminal-bg overflow-hidden"
            >
              <div className="px-4 py-3">
                <p className="font-mono text-sm text-terminal-prompt">$ {ex.command}</p>
                {ex.output && (
                  <pre className="mt-2 text-sm text-zinc-400 whitespace-pre-wrap">{ex.output}</pre>
                )}
              </div>
              <div className="border-t border-border bg-background-secondary/30 px-4 py-2">
                <p className="text-xs text-foreground-muted">{ex.description}</p>
              </div>
              <button className="absolute right-3 top-3 rounded-lg border border-border bg-background-secondary p-1.5 text-foreground-subtle opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground">
                <Copy className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Try It */}
      <section className="glass-card p-5">
        <h2 className="text-lg font-bold">Try It Yourself</h2>
        <div className="mt-3 terminal-shell min-h-[200px]">
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-2">
            <span className="font-mono text-xs text-zinc-500">sandbox — interactive</span>
            <button className="rounded border border-zinc-700 px-2 py-1 text-xs text-zinc-400 hover:text-zinc-300 transition-colors">Reset</button>
          </div>
          <div className="px-5 py-4 font-mono text-sm text-terminal-text">
            <p>
              <span className="text-terminal-prompt">learner@dojo</span>
              <span className="text-zinc-500">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-zinc-500">$ </span>
              <span className="terminal-cursor">▋</span>
            </p>
          </div>
        </div>
      </section>

      {/* Related commands */}
      {command.related.length > 0 && (
        <section className="glass-card p-5">
          <h2 className="text-lg font-bold">Related Commands</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {command.related.map((r) => (
              <Link
                key={r}
                href={`/command/${r}`}
                className="rounded-lg border border-border bg-background-secondary/50 px-3 py-1.5 font-mono text-sm transition-all hover:border-primary/30 hover:text-primary"
              >
                $ {r}
              </Link>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  )
}
