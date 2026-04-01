'use client'

import { use, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bookmark, Copy, ShieldAlert, Star } from 'lucide-react'
import { commandItems } from '@/lib/mock-data'
import { ryuhaSchools } from '@/lib/constants/ryuha-schools'

const TerminalEmulator = dynamic(
  () => import('@/components/terminal/terminal-emulator').then((module) => module.TerminalEmulator),
  { ssr: false },
)

interface CommandDetailPageProps {
  params: Promise<{ slug: string }>
}

export default function CommandDetailPage({ params }: CommandDetailPageProps) {
  const { slug } = use(params)
  const command = commandItems.find((item) => item.slug === slug) ?? commandItems[0]
  const [notes, setNotes] = useState('')

  const school = useMemo(() => {
    return ryuhaSchools.find((entry) => entry.tools.some((tool) => command.name.toLowerCase().includes(tool.toLowerCase().split(' ')[0])))
  }, [command.name])

  const dangerScore = command.dangerLevel === 'dangerous' ? 5 : command.dangerLevel === 'caution' ? 3 : 1

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} className="space-y-5">
      <section className="rounded-2xl border border-white/10 bg-[#06080f] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{school?.kanji ?? 'General'} · {school?.englishName ?? 'General School'}</p>
            <h1 className="mt-1 font-mono text-4xl font-black text-white">$ {command.name}</h1>
            <p className="text-xs text-slate-400">School label: {school?.schoolName ?? 'General Technique'}</p>
          </div>
          <button className="inline-flex items-center gap-1 rounded-lg border border-amber-300/35 bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-200">
            <Bookmark className="h-3.5 w-3.5" /> Bookmark
          </button>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <article className="rounded-xl border border-white/10 bg-[#050811] p-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">1. Quick Description</h2>
            <p className="mt-2 text-sm text-slate-200">{command.description}</p>
          </article>

          <article className="rounded-xl border border-white/10 bg-[#050811] p-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">2. Syntax Template</h2>
            <div className="group relative mt-2 rounded-lg border border-cyan-400/20 bg-black/35 p-3 font-mono text-sm text-cyan-200">
              {command.name} [OPTIONS] [ARGS]
              <button className="absolute right-2 top-2 rounded border border-white/15 p-1 text-slate-300"><Copy className="h-3.5 w-3.5" /></button>
            </div>
          </article>

          <article className="rounded-xl border border-white/10 bg-[#050811] p-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">3. Sensei Says</h2>
            <p className="mt-2 text-sm text-slate-300">Think of <span className="font-mono text-cyan-200">{command.name}</span> like a focused search pattern in a dojo archive: you scan fast, filter precisely, and avoid noisy output.</p>
          </article>

          <article className="rounded-xl border border-white/10 bg-[#050811] p-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">4. Flags & Options</h2>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full min-w-[500px] text-sm">
                <thead>
                  <tr className="text-left text-slate-400">
                    <th className="pb-2 pr-3">Flag</th>
                    <th className="pb-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {command.flags.map((flag) => (
                    <tr key={flag.flag} className="border-t border-white/10 text-slate-200">
                      <td className="py-2 pr-3 font-mono text-cyan-200">{flag.flag}</td>
                      <td className="py-2">{flag.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-xl border border-white/10 bg-[#050811] p-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">5. Practical Examples</h2>
            <div className="mt-2 space-y-2">
              {command.examples.slice(0, 5).map((example) => (
                <div key={example.command} className="rounded-lg border border-white/10 bg-black/25 p-3">
                  <p className="font-mono text-sm text-cyan-200">$ {example.command}</p>
                  <p className="mt-1 text-xs text-slate-300">{example.description}</p>
                  {example.output && <pre className="mt-1 whitespace-pre-wrap text-xs text-slate-400">{example.output}</pre>}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-xl border border-white/10 bg-[#050811] p-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">6. Common Mistakes</h2>
            <ul className="mt-2 space-y-1 text-sm text-slate-300">
              <li>• Running destructive flags without preview mode.</li>
              <li>• Forgetting quotation marks around wildcard patterns.</li>
              <li>• Combining recursive scans with root paths unintentionally.</li>
            </ul>
          </article>

          <article className="rounded-xl border border-white/10 bg-[#050811] p-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">7. Related Commands</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {['find', 'awk', 'sed', 'xargs'].map((related) => (
                <Link key={related} href={`/app/command/${related}`} className="rounded-lg border border-white/15 bg-black/25 px-2.5 py-1 text-xs text-slate-200">
                  {related}
                </Link>
              ))}
            </div>
          </article>

          <article className="rounded-xl border border-white/10 bg-[#050811] p-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">8. Difficulty & Danger Rating</h2>
            <div className="mt-2 flex items-center gap-3 text-sm">
              <span className="rounded-full border border-violet-400/35 bg-violet-500/10 px-2 py-1 text-violet-200">{command.difficulty}</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-red-400/30 bg-red-500/10 px-2 py-1 text-red-200">
                <ShieldAlert className="h-3.5 w-3.5" /> Danger {dangerScore}/5
              </span>
            </div>
          </article>

          <article className="rounded-xl border border-white/10 bg-[#050811] p-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">9. Inline Terminal</h2>
            <div className="mt-2 overflow-hidden rounded-xl border border-red-500/20">
              <TerminalEmulator className="h-[330px] cyber-terminal-surface" sessionId={`command-${slug}`} />
            </div>
          </article>

          <article className="rounded-xl border border-white/10 bg-[#050811] p-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">10. Your Notes</h2>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={5}
              placeholder="Save personal notes for this command..."
              className="mt-2 w-full rounded-lg border border-white/15 bg-black/30 p-3 text-sm text-slate-200 outline-none ring-cyan-300/25 placeholder:text-slate-500 focus:ring-2"
            />
          </article>
        </div>

        <aside className="space-y-3">
          <article className="rounded-xl border border-amber-400/25 bg-amber-500/10 p-4">
            <h3 className="text-sm font-semibold text-amber-100">11. Bookmark + Mastery</h3>
            <p className="mt-1 text-xs text-amber-100/85">Pin this command and revisit until your execution is fast and safe.</p>
            <div className="mt-2 inline-flex items-center gap-1 text-xs text-amber-100"><Star className="h-3.5 w-3.5" /> Mastery progress 54%</div>
          </article>
          <article className="rounded-xl border border-white/10 bg-[#050811] p-4 text-xs text-slate-300">
            SEO meta and route-based metadata should be defined in parent layout metadata exports for this dynamic route.
          </article>
        </aside>
      </section>
    </motion.div>
  )
}
