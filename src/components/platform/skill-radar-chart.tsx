'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'

export interface RadarAxis {
  id: string
  label: string
  value: number
  href?: string
}

interface SkillRadarChartProps {
  axes: RadarAxis[]
  className?: string
  onAxisClick?: (axis: RadarAxis) => void
}

function pointFor(index: number, total: number, radius: number, center: number) {
  const angle = (-Math.PI / 2) + (index * (2 * Math.PI)) / total
  return {
    x: center + Math.cos(angle) * radius,
    y: center + Math.sin(angle) * radius,
  }
}

export function SkillRadarChart({ axes, className, onAxisClick }: SkillRadarChartProps) {
  const size = 360
  const center = size / 2
  const maxRadius = 125

  const { gridPolygons, axisLines, valuePolygon, valuePoints } = useMemo(() => {
    const levels = [0.2, 0.4, 0.6, 0.8, 1]

    const grid = levels.map((level) => {
      const points = axes.map((_, index) => pointFor(index, axes.length, maxRadius * level, center))
      return points.map((point) => `${point.x},${point.y}`).join(' ')
    })

    const lines = axes.map((_, index) => {
      const end = pointFor(index, axes.length, maxRadius, center)
      return { x1: center, y1: center, x2: end.x, y2: end.y }
    })

    const values = axes.map((axis, index) => pointFor(index, axes.length, maxRadius * Math.max(0, Math.min(1, axis.value / 100)), center))

    return {
      gridPolygons: grid,
      axisLines: lines,
      valuePolygon: values.map((point) => `${point.x},${point.y}`).join(' '),
      valuePoints: values,
    }
  }, [axes, center])

  return (
    <div className={cn('relative', className)}>
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full" role="img" aria-label="CLI skill radar chart">
        <defs>
          <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.52" />
            <stop offset="55%" stopColor="#f59e0b" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {gridPolygons.map((points, index) => (
          <polygon key={index} points={points} fill="none" stroke="rgba(148,163,184,0.24)" strokeWidth="1" />
        ))}

        {axisLines.map((line, index) => (
          <line key={index} {...line} stroke="rgba(148,163,184,0.3)" strokeWidth="1" />
        ))}

        <polygon points={valuePolygon} fill="url(#radarFill)" stroke="rgba(34,197,94,0.85)" strokeWidth="2" />

        {valuePoints.map((point, index) => (
          <g key={axes[index].id}>
            <circle cx={point.x} cy={point.y} r="5" fill="#22c55e" stroke="#0b1220" strokeWidth="2" />
            <title>{`${axes[index].label}: ${axes[index].value}%`}</title>
          </g>
        ))}

        {axes.map((axis, index) => {
          const labelPoint = pointFor(index, axes.length, maxRadius + 20, center)
          return (
            <text
              key={axis.id}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor="middle"
              className="fill-slate-200 text-[11px] font-semibold"
              style={{ cursor: axis.href || onAxisClick ? 'pointer' : 'default' }}
              onClick={() => onAxisClick?.(axis)}
            >
              {axis.label}
            </text>
          )
        })}
      </svg>
    </div>
  )
}
