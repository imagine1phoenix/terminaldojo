'use client'

import { motion } from 'framer-motion'
import type { OnboardingPhilosophyId } from '@/lib/constants/onboarding'

interface PhilosophyCardProps {
  id: OnboardingPhilosophyId
  jp: string
  reading: string
  title: string
  description: string
  detail: string
  icon: string
  estimate: string
  recommendedFor: string
  colorClass: string
  selected: boolean
  onSelect: (id: OnboardingPhilosophyId) => void
}

export function PhilosophyCard({
  id,
  jp,
  reading,
  title,
  description,
  detail,
  icon,
  estimate,
  recommendedFor,
  colorClass,
  selected,
  onSelect,
}: PhilosophyCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(id)}
      whileHover={{ y: -4 }}
      className={`w-full rounded-xl border p-4 text-left transition-colors ${colorClass} ${
        selected ? 'ring-2 ring-cyan-300/45' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">「{jp}」 {reading}</p>
        <span className="rounded-full border border-white/20 px-2 py-1 text-xs">{icon}</span>
      </div>
      <p className="mt-1 text-base font-bold">{title}</p>
      <p className="mt-2 text-sm">{description}</p>
      <p className="mt-2 text-xs opacity-90">{detail}</p>
      <p className="mt-2 text-xs">{estimate}</p>
      <p className="mt-1 text-xs opacity-85">Recommended for: {recommendedFor}</p>
    </motion.button>
  )
}
