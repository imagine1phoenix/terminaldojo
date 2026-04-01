'use client'

import { motion } from 'framer-motion'
import type { AssessmentQuestion } from '@/lib/constants/onboarding'

interface QuestionCardProps {
  question: AssessmentQuestion
  questionIndex: number
  totalQuestions: number
  selectedOptionId?: string
  onSelect: (optionId: string) => void
  onPrevious?: () => void
  canGoPrevious: boolean
}

export function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  selectedOptionId,
  onSelect,
  onPrevious,
  canGoPrevious,
}: QuestionCardProps) {
  const completion = Math.round(((questionIndex + 1) / totalQuestions) * 100)

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.22 }}
      className="space-y-4"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">Readiness Assessment</p>
        <div className="mt-1 flex items-center justify-between text-sm text-slate-300">
          <span>Question {questionIndex + 1} of {totalQuestions}</span>
          <span>{completion}% done</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-300" style={{ width: `${completion}%` }} />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white">{question.prompt}</h2>

      <div className="space-y-2">
        {question.options.map((option) => {
          const selected = option.id === selectedOptionId
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                selected
                  ? 'border-cyan-300/45 bg-cyan-500/12 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.22)]'
                  : 'border-white/10 bg-black/25 text-slate-200 hover:border-cyan-300/25'
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="rounded-lg border border-white/15 px-3 py-2 font-semibold text-slate-200 disabled:cursor-not-allowed disabled:opacity-45"
        >
          Previous
        </button>
        <p className="text-slate-400">Auto-advances on selection</p>
      </div>
    </motion.div>
  )
}
