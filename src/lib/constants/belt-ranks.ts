export interface BeltRank {
  id: string
  colorName: string
  rankName: string
  kanji: string
  minKi: number
  baseColor: string
  glowColor: string
  particleColor: string
}

export const beltRanks: BeltRank[] = [
  {
    id: 'white-belt',
    colorName: 'White Belt',
    rankName: 'Beginner',
    kanji: 'WB',
    minKi: 0,
    baseColor: '#f3f4f6',
    glowColor: '#f8fafc',
    particleColor: '#e5e7eb',
  },
  {
    id: 'yellow-belt',
    colorName: 'Yellow Belt',
    rankName: 'Awakened Novice',
    kanji: 'YB',
    minKi: 600,
    baseColor: '#eab308',
    glowColor: '#fde047',
    particleColor: '#facc15',
  },
  {
    id: 'orange-belt',
    colorName: 'Orange Belt',
    rankName: 'Disciplined Student',
    kanji: 'OB',
    minKi: 1400,
    baseColor: '#f97316',
    glowColor: '#fb923c',
    particleColor: '#fdba74',
  },
  {
    id: 'green-belt',
    colorName: 'Green Belt',
    rankName: 'Rising Practitioner',
    kanji: 'GB',
    minKi: 2600,
    baseColor: '#22c55e',
    glowColor: '#4ade80',
    particleColor: '#86efac',
  },
  {
    id: 'blue-belt',
    colorName: 'Blue Belt',
    rankName: 'Flow Adept',
    kanji: 'BB',
    minKi: 4200,
    baseColor: '#2563eb',
    glowColor: '#38bdf8',
    particleColor: '#7dd3fc',
  },
  {
    id: 'purple-belt',
    colorName: 'Purple Belt',
    rankName: 'Tactical Artist',
    kanji: 'PB',
    minKi: 6200,
    baseColor: '#7c3aed',
    glowColor: '#a855f7',
    particleColor: '#c084fc',
  },
  {
    id: 'brown-belt',
    colorName: 'Brown Belt',
    rankName: 'Veteran Technician',
    kanji: 'BrB',
    minKi: 8600,
    baseColor: '#92400e',
    glowColor: '#b45309',
    particleColor: '#d97706',
  },
  {
    id: 'red-belt',
    colorName: 'Red Belt',
    rankName: 'Crimson Vanguard',
    kanji: 'RB',
    minKi: 11600,
    baseColor: '#dc2626',
    glowColor: '#f43f5e',
    particleColor: '#fb7185',
  },
  {
    id: 'black-belt',
    colorName: 'Black Belt',
    rankName: 'Master Candidate',
    kanji: 'BkB',
    minKi: 15200,
    baseColor: '#101114',
    glowColor: '#94a3b8',
    particleColor: '#cbd5e1',
  },
  {
    id: 'shodan',
    colorName: 'Black Belt - 1st Dan',
    rankName: 'Shodan',
    kanji: '1D',
    minKi: 20000,
    baseColor: '#0f172a',
    glowColor: '#67e8f9',
    particleColor: '#a5f3fc',
  },
  {
    id: 'nidan',
    colorName: 'Black Belt - 2nd Dan',
    rankName: 'Nidan',
    kanji: '2D',
    minKi: 28000,
    baseColor: '#111827',
    glowColor: '#a78bfa',
    particleColor: '#c4b5fd',
  },
  {
    id: 'sandan',
    colorName: 'Black Belt - 3rd Dan',
    rankName: 'Sandan',
    kanji: '3D',
    minKi: 36000,
    baseColor: '#0b1120',
    glowColor: '#f472b6',
    particleColor: '#f9a8d4',
  },
  {
    id: 'yondan',
    colorName: 'Black Belt - 4th Dan',
    rankName: 'Yondan',
    kanji: '4D',
    minKi: 43000,
    baseColor: '#0b1020',
    glowColor: '#fb7185',
    particleColor: '#fda4af',
  },
  {
    id: 'shihan',
    colorName: 'Grand Master Belt',
    rankName: 'Shihan',
    kanji: 'GM',
    minKi: 50000,
    baseColor: '#020617',
    glowColor: '#fbbf24',
    particleColor: '#fde68a',
  },
]

export interface RankProgress {
  currentIndex: number
  current: BeltRank
  next: BeltRank | null
  progress: number
}

export function getRankProgress(ki: number): RankProgress {
  const clampedKi = Math.max(0, ki)
  let currentIndex = 0

  for (let i = 0; i < beltRanks.length; i += 1) {
    if (clampedKi >= beltRanks[i].minKi) {
      currentIndex = i
    }
  }

  const current = beltRanks[currentIndex]
  const next = currentIndex < beltRanks.length - 1 ? beltRanks[currentIndex + 1] : null

  if (!next) {
    return { currentIndex, current, next: null, progress: 1 }
  }

  const span = Math.max(1, next.minKi - current.minKi)
  const progress = Math.min(1, Math.max(0, (clampedKi - current.minKi) / span))

  return { currentIndex, current, next, progress }
}
