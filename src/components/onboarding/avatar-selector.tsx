'use client'

import { motion } from 'framer-motion'
import type { CharacterAvatar } from '@/lib/constants/onboarding'

interface AvatarSelectorProps {
  avatars: CharacterAvatar[]
  selectedAvatarId: string
  onSelect: (avatarId: string) => void
  onSurprise: () => void
  practitionerName: string
}

export function AvatarSelector({ avatars, selectedAvatarId, onSelect, onSurprise, practitionerName }: AvatarSelectorProps) {
  const selected = avatars.find((avatar) => avatar.id === selectedAvatarId) ?? avatars[0]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {avatars.map((avatar) => {
          const selectedCard = avatar.id === selectedAvatarId
          return (
            <button
              key={avatar.id}
              type="button"
              onClick={() => onSelect(avatar.id)}
              className={`min-h-[110px] rounded-xl border p-2 text-left transition-colors ${
                selectedCard
                  ? 'border-cyan-300/45 bg-cyan-400/12'
                  : 'border-white/10 bg-black/25 hover:border-cyan-300/25'
              }`}
            >
              <div className="mb-2 grid grid-cols-4 gap-1">
                {Array.from({ length: 12 }).map((_, index) => (
                  <span
                    key={`${avatar.id}-${index}`}
                    className="h-4 w-4 rounded-full"
                    style={{
                      background: index % 2 === 0 ? avatar.primary : avatar.secondary,
                      boxShadow: `0 0 8px ${index % 2 === 0 ? avatar.primary : avatar.secondary}66`,
                    }}
                  />
                ))}
              </div>
              <p className="text-sm font-semibold text-slate-100">{avatar.name}</p>
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={onSurprise}
        className="rounded-lg border border-amber-400/35 bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-100"
      >
        Surprise Me!
      </button>

      <p className="text-xs text-slate-400">
        Avatar note: all practitioners are gender-neutral. Colors represent visual style only.
      </p>

      <motion.div
        layout
        className="rounded-xl border border-white/15 bg-black/35 p-3"
      >
        <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Preview</p>
        <div className="mt-2 flex items-center gap-3">
          <div className="grid grid-cols-4 gap-1">
            {Array.from({ length: 12 }).map((_, index) => (
              <span
                key={`selected-${index}`}
                className="h-3.5 w-3.5 rounded-full"
                style={{ background: index % 2 === 0 ? selected.primary : selected.secondary }}
              />
            ))}
          </div>
          <div className="text-sm text-slate-200">
            <p>{practitionerName || 'Unnamed Practitioner'}</p>
            <p className="text-xs text-slate-400">White Belt · Ki: 0</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
