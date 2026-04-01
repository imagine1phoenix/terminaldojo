'use client'

import type { ScoreBand } from '@/lib/constants/onboarding'

interface ScoreBandCardProps {
  score: number
  band: ScoreBand
}

export function ScoreBandCard({ score, band }: ScoreBandCardProps) {
  const circumference = 2 * Math.PI * 52
  const dashOffset = circumference - (Math.max(0, Math.min(100, score)) / 100) * circumference

  return (
    <div className="rounded-xl border border-emerald-400/25 bg-emerald-500/10 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200">Readiness Rating</p>
      <div className="mt-2 flex items-center gap-4">
        <div className="relative h-32 w-32">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r="52" stroke="rgba(255,255,255,0.14)" strokeWidth="8" fill="none" />
            <circle
              cx="60"
              cy="60"
              r="52"
              stroke="rgba(16, 185, 129, 0.9)"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <p className="text-2xl font-black text-white">{score}%</p>
          </div>
        </div>
      </div>
      <p className="mt-1 text-sm font-semibold text-emerald-200">{band.label}</p>
      <p className="mt-2 text-sm text-emerald-100/90">{band.message}</p>
      <p className="mt-2 text-xs text-emerald-100/80">Approach: {band.approach}</p>
    </div>
  )
}
