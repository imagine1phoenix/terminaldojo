'use client'

import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DisciplineLanternStreakProps {
  streakDays: number
  maxVisible?: number
  broken?: boolean
  className?: string
}

export function DisciplineLanternStreak({
  streakDays,
  maxVisible = 7,
  broken = false,
  className,
}: DisciplineLanternStreakProps) {
  const visible = Math.min(maxVisible, Math.max(0, streakDays))

  return (
    <div className={cn('flex items-end gap-2', className)} aria-label={`Day ${visible} of streak`}>
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-5"
      >
        <Flame className={cn('h-4 w-4', broken ? 'text-zinc-500' : 'text-[#ff7a30]')} />
      </motion.div>

      {Array.from({ length: maxVisible }).map((_, index) => {
        const lit = !broken && index < visible
        const glowStrength = lit ? 0.25 + (index / Math.max(1, maxVisible)) * 0.45 : 0

        return (
          <motion.div
            key={index}
            title={`Day ${index + 1} of streak`}
            initial={{ rotate: 0 }}
            animate={{ rotate: lit ? [-1.8, 1.8, -1.2, 1.2, 0] : 0 }}
            transition={{ duration: 3.6, delay: index * 0.15, repeat: Infinity, ease: 'easeInOut' }}
            className="relative flex w-8 flex-col items-center"
          >
            <div className="h-4 w-px bg-zinc-600/70" />
            <div className="h-2 w-7 rounded-sm bg-gradient-to-b from-[#6e4a2b] to-[#2f2216]" />
            <div
              className={cn(
                'relative h-9 w-7 border border-red-900/40',
                lit
                  ? 'bg-gradient-to-b from-red-500/55 via-red-600/35 to-red-900/35'
                  : 'bg-gradient-to-b from-zinc-700/35 to-zinc-800/25',
              )}
              style={{
                borderRadius: '3px',
                boxShadow: lit ? `0 0 ${Math.round(20 + glowStrength * 40)}px rgba(255, 80, 80, ${glowStrength.toFixed(2)})` : 'none',
              }}
            >
              <motion.div
                className={cn('absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full', lit ? 'bg-[#ff9f43]' : 'bg-zinc-500')}
                animate={lit ? { opacity: [0.6, 1, 0.7, 0.95], scale: [0.92, 1.08, 0.98] } : { opacity: 0.25, scale: 1 }}
                transition={{ duration: 0.15, repeat: Infinity, ease: 'easeInOut', delay: index * 0.02 }}
                style={{ boxShadow: lit ? '0 0 14px rgba(255, 106, 60, 0.65)' : 'none' }}
              />
            </div>
            <div className="h-2 w-7 rounded-sm bg-gradient-to-b from-[#6a472b] to-[#2d2015]" />
          </motion.div>
        )
      })}
    </div>
  )
}
