'use client'

import { motion } from 'framer-motion'
import { BookOpenText, ClipboardList, FileStack } from 'lucide-react'

const scrollSets = [
  {
    title: 'Linux Essentials Scroll',
    description: 'Navigation, files, permissions, process tools in one compact reference.',
    tags: ['ls', 'find', 'chmod', 'ps'],
  },
  {
    title: 'Git Combat Scroll',
    description: 'Branching, rebasing, conflict resolution, and emergency recovery patterns.',
    tags: ['rebase', 'cherry-pick', 'reflog', 'stash'],
  },
  {
    title: 'Docker Field Scroll',
    description: 'Container lifecycle commands, networking snippets, and cleanup patterns.',
    tags: ['run', 'exec', 'logs', 'prune'],
  },
]

export default function ScrollsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} className="space-y-5">
      <section className="rounded-2xl border border-white/10 bg-[#06080f] p-5">
        <h1 className="text-3xl font-black text-white">Scrolls</h1>
        <p className="mt-1 text-sm text-slate-300">Cheat sheets and quick references for high-speed recall in the dojo.</p>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {scrollSets.map((scroll) => (
          <article key={scroll.title} className="rounded-xl border border-white/10 bg-[#050811] p-4">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-500/10 text-amber-300">
              <BookOpenText className="h-4 w-4" />
            </div>
            <h2 className="mt-3 text-lg font-bold text-white">{scroll.title}</h2>
            <p className="mt-1 text-sm text-slate-300">{scroll.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {scroll.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-black/30 px-2 py-1 text-[11px] font-semibold text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-3 flex gap-2 text-xs">
              <button className="inline-flex items-center gap-1 rounded-lg border border-cyan-400/35 px-2.5 py-1.5 text-cyan-200">
                <ClipboardList className="h-3.5 w-3.5" /> View
              </button>
              <button className="inline-flex items-center gap-1 rounded-lg border border-white/15 px-2.5 py-1.5 text-slate-300">
                <FileStack className="h-3.5 w-3.5" /> Save
              </button>
            </div>
          </article>
        ))}
      </section>
    </motion.div>
  )
}
