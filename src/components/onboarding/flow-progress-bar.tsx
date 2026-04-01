'use client'

import { motion } from 'framer-motion'

interface FlowProgressBarProps {
  current: number
  total: number
  label?: string
}

export function FlowProgressBar({ current, total, label }: FlowProgressBarProps) {
  const percent = Math.max(0, Math.min(100, (current / total) * 100))

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
        <span>{label || 'Progress'}</span>
        <span>Step {current}/{total}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-300"
        />
      </div>
    </div>
  )
}
