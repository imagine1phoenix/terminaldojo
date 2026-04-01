'use client'

import { AlertCircle, CheckCircle2, LoaderCircle } from 'lucide-react'

interface CharacterInputProps {
  value: string
  onChange: (next: string) => void
  validationMessage: string
  isValid: boolean
  isCheckingAvailability: boolean
  availability: 'unknown' | 'available' | 'taken'
  suggestions: string[]
  onSuggestionClick: (name: string) => void
  onGenerateSuggestions: () => void
}

export function CharacterInput({
  value,
  onChange,
  validationMessage,
  isValid,
  isCheckingAvailability,
  availability,
  suggestions,
  onSuggestionClick,
  onGenerateSuggestions,
}: CharacterInputProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="character-name" className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
          Practitioner Name
        </label>
        <input
          id="character-name"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          maxLength={20}
          placeholder="Your name..."
          className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-3 text-base text-white outline-none ring-cyan-300/30 placeholder:text-slate-500 focus:ring-2"
          aria-describedby="character-name-help"
        />
      </div>

      <div id="character-name-help" className="space-y-1 text-sm">
        <p className={`${isValid ? 'text-emerald-300' : 'text-slate-400'}`}>{validationMessage}</p>
        {isCheckingAvailability && (
          <p className="inline-flex items-center gap-1 text-cyan-300"><LoaderCircle className="h-3.5 w-3.5 animate-spin" /> Checking availability...</p>
        )}
        {!isCheckingAvailability && availability === 'available' && (
          <p className="inline-flex items-center gap-1 text-emerald-300"><CheckCircle2 className="h-3.5 w-3.5" /> Available</p>
        )}
        {!isCheckingAvailability && availability === 'taken' && (
          <p className="inline-flex items-center gap-1 text-red-300"><AlertCircle className="h-3.5 w-3.5" /> Taken</p>
        )}
      </div>

      <div className="rounded-xl border border-white/10 bg-black/25 p-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">Suggest a Name</p>
          <button
            type="button"
            onClick={onGenerateSuggestions}
            className="rounded-lg border border-cyan-400/35 px-2.5 py-1.5 text-xs font-semibold text-cyan-200"
          >
            Generate
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onSuggestionClick(suggestion)}
              className="rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-xs font-semibold text-slate-200 hover:border-cyan-300/35"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
