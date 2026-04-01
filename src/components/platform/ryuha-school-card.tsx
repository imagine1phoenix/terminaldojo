'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { RyuhaSchool } from '@/lib/constants/ryuha-schools'
import { RyuhaScene } from '@/components/platform/ryuha-scene'

interface RyuhaSchoolCardProps {
  school: RyuhaSchool
}

export function RyuhaSchoolCard({ school }: RyuhaSchoolCardProps) {
  const [hovered, setHovered] = useState(false)
  const [sceneActivated, setSceneActivated] = useState(false)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const inView = useInView(cardRef, { margin: '-60px', amount: 0.2 })

  const showScene = inView && sceneActivated

  const difficultyStyle =
    school.difficulty === 'Advanced'
      ? 'border-red-400/40 bg-red-500/15 text-red-200'
      : school.difficulty === 'Intermediate'
      ? 'border-amber-400/35 bg-amber-500/15 text-amber-200'
      : 'border-emerald-400/35 bg-emerald-500/15 text-emerald-200'

  return (
    <motion.div
      ref={cardRef}
      layout
      onHoverStart={() => {
        setHovered(true)
        setSceneActivated(true)
      }}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link
        href={school.route}
        onFocus={() => setSceneActivated(true)}
        className="ryuha-card group relative flex h-full min-h-[520px] flex-col overflow-hidden rounded-3xl border p-4 sm:p-5"
        style={{
          borderColor: hovered ? `${school.palette.secondary}88` : 'rgba(255,255,255,0.14)',
          boxShadow: hovered
            ? `0 30px 70px rgba(0,0,0,0.5), 0 0 34px ${school.palette.glow}`
            : '0 12px 30px rgba(0,0,0,0.36)',
        }}
      >
        <div
          className="pointer-events-none absolute -top-16 right-[-20%] h-48 w-48 rounded-full blur-3xl transition-opacity duration-300"
          style={{ background: school.palette.glow, opacity: hovered ? 0.85 : 0.4 }}
        />

        <div className="relative z-10 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-foreground-subtle">Ryuha School</p>
            <h3 className="mt-2 text-[2rem] leading-none font-black dojo-kanji" style={{ color: school.palette.secondary }}>
              {school.kanji}
            </h3>
            <p className="mt-1 text-sm font-semibold text-foreground">{school.englishName}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5 text-[11px]">
            <span
              className="inline-flex rounded-full border px-2.5 py-1 font-semibold uppercase tracking-[0.12em]"
              style={{ borderColor: `${school.palette.secondary}66`, color: school.palette.secondary }}
            >
              {school.tools[0]}
            </span>
            <span className={`rounded-full border px-2.5 py-1 font-semibold uppercase tracking-[0.12em] ${difficultyStyle}`}>
              {school.difficulty}
            </span>
          </div>
        </div>

        <div className="relative z-10 mt-4">
          {showScene ? (
            <RyuhaScene
              type={school.scene}
              active={hovered}
              primary={school.palette.primary}
              secondary={school.palette.secondary}
            />
          ) : (
            <div
              className="h-48 w-full rounded-2xl border border-white/10"
              style={{
                background: `radial-gradient(circle at 25% 30%, ${school.palette.glow}, rgba(0, 0, 0, 0.2) 50%), #06070a`,
              }}
            />
          )}
        </div>

        <div className="relative z-10 mt-5 flex flex-1 flex-col">
          <p className="font-semibold text-lg leading-snug" style={{ color: school.palette.secondary }}>
            {school.schoolName}
          </p>
          <p className="mt-2 text-sm text-foreground-muted">&quot;{school.philosophy}&quot;</p>
          <p className="mt-2 line-clamp-4 text-sm text-foreground-muted">{school.lore}</p>

          <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
            <span className="rounded-md border border-white/10 bg-black/25 px-2 py-1 text-center text-slate-200">
              {school.commandCount} cmds
            </span>
            <span className="rounded-md border border-white/10 bg-black/25 px-2 py-1 text-center text-slate-200">
              {school.difficulty}
            </span>
            <span className="rounded-md border border-white/10 bg-black/25 px-2 py-1 text-center text-slate-200">
              {school.estimatedLearningTime}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {school.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border px-2.5 py-1 text-[11px] font-medium"
                style={{ borderColor: `${school.palette.primary}55`, color: school.palette.primary }}
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-6">
            <div className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: school.palette.secondary }}>
              Enter School Path
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
