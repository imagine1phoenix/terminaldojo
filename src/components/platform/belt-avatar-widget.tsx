'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Points, PointMaterial, Text } from '@react-three/drei'
import * as THREE from 'three'
import { Award, Sparkles, Zap } from 'lucide-react'
import { beltRanks, getRankProgress, type BeltRank } from '@/lib/constants/belt-ranks'
import { cn } from '@/lib/utils'

interface ControlsHandle {
  reset: () => void
}

interface BeltAvatarWidgetProps {
  ki?: number
  className?: string
}

interface BeltSceneProps {
  current: BeltRank
  transitionTo: BeltRank | null
  ceremonyProgress: number
  wearLevel: number
  idleRotate: boolean
  isInteracting: boolean
  manualYaw: number
  manualPitch: number
  resetSignal: number
  controlsRef: { current: ControlsHandle | null }
  onInteractionStart: () => void
  onInteractionEnd: () => void
  onBeltClick: () => void
}

function hasReset(value: unknown): value is ControlsHandle {
  if (typeof value !== 'object' || value === null) return false
  if (!('reset' in value)) return false
  const maybe = value as { reset?: unknown }
  return typeof maybe.reset === 'function'
}

function seededUnit(index: number, salt: number): number {
  const raw = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return raw - Math.floor(raw)
}

function createTatamiTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    const fallback = new THREE.CanvasTexture(canvas)
    fallback.needsUpdate = true
    return fallback
  }

  const baseGradient = ctx.createLinearGradient(0, 0, 0, 1024)
  baseGradient.addColorStop(0, '#1b130b')
  baseGradient.addColorStop(0.45, '#120d09')
  baseGradient.addColorStop(1, '#090703')
  ctx.fillStyle = baseGradient
  ctx.fillRect(0, 0, 1024, 1024)

  for (let i = 0; i < 42; i += 1) {
    const x = (i * 31) % 1024
    const alpha = 0.02 + seededUnit(i, 4) * 0.05
    ctx.fillStyle = `rgba(255, 190, 120, ${alpha.toFixed(3)})`
    ctx.fillRect(x, 0, 6, 1024)
  }

  for (let i = 0; i < 44; i += 1) {
    const y = i * 24
    ctx.fillStyle = `rgba(30, 20, 12, ${(0.08 + seededUnit(i, 7) * 0.05).toFixed(3)})`
    ctx.fillRect(0, y, 1024, 10)
  }

  for (let i = 0; i < 450; i += 1) {
    const x = seededUnit(i, 9) * 1024
    const y = seededUnit(i, 11) * 1024
    const shade = Math.floor(25 + seededUnit(i, 13) * 32)
    ctx.fillStyle = `rgba(${shade}, ${shade - 6}, ${shade - 9}, 0.24)`
    ctx.fillRect(x, y, 2, 2)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1.6, 1.6)
  texture.needsUpdate = true
  return texture
}

function createBeltTexture(colorHex: string, wearLevel: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    const fallback = new THREE.CanvasTexture(canvas)
    fallback.needsUpdate = true
    return fallback
  }

  const color = new THREE.Color(colorHex)
  const topTone = color.clone().lerp(new THREE.Color('#ffffff'), 0.2)
  const bottomTone = color.clone().lerp(new THREE.Color('#000000'), 0.22)

  const gradient = ctx.createLinearGradient(0, 0, 0, 512)
  gradient.addColorStop(0, `#${topTone.getHexString()}`)
  gradient.addColorStop(0.55, colorHex)
  gradient.addColorStop(1, `#${bottomTone.getHexString()}`)

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 1024, 512)

  for (let x = 0; x < 1024; x += 9) {
    const alpha = 0.06 + seededUnit(x, 2) * 0.07
    ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x + 12, 512)
    ctx.stroke()
  }

  for (let y = 0; y < 512; y += 8) {
    const alpha = 0.04 + seededUnit(y, 5) * 0.06
    ctx.strokeStyle = `rgba(20,20,20,${alpha.toFixed(3)})`
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(1024, y)
    ctx.stroke()
  }

  const scarCount = Math.floor(8 + wearLevel * 36)
  for (let i = 0; i < scarCount; i += 1) {
    const x = seededUnit(i, 17) * 1024
    const y = seededUnit(i, 19) * 512
    const w = 10 + seededUnit(i, 23) * 55
    const h = 1 + seededUnit(i, 29) * 3
    ctx.fillStyle = `rgba(0,0,0,${(0.16 + wearLevel * 0.3).toFixed(3)})`
    ctx.fillRect(x, y, w, h)
  }

  const frayCount = Math.floor(wearLevel * 140)
  for (let i = 0; i < frayCount; i += 1) {
    const x = seededUnit(i, 31) * 1024
    const y = seededUnit(i, 37) * 512
    ctx.fillStyle = 'rgba(245,245,245,0.2)'
    ctx.fillRect(x, y, 1, 1)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2.5, 1.4)
  texture.needsUpdate = true
  return texture
}

function BeltScene({
  current,
  transitionTo,
  ceremonyProgress,
  wearLevel,
  idleRotate,
  isInteracting,
  manualYaw,
  manualPitch,
  resetSignal,
  controlsRef,
  onInteractionStart,
  onInteractionEnd,
  onBeltClick,
}: BeltSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const beltMaterialRef = useRef<THREE.MeshStandardMaterial>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const autoYawRef = useRef(0)

  const tatamiTexture = useMemo(() => createTatamiTexture(), [])
  const currentTexture = useMemo(() => createBeltTexture(current.baseColor, wearLevel), [current.baseColor, wearLevel])
  const nextTexture = useMemo(() => {
    if (!transitionTo) return currentTexture
    return createBeltTexture(transitionTo.baseColor, Math.min(1, wearLevel + 0.05))
  }, [transitionTo, currentTexture, wearLevel])

  const particlePositions = useMemo(() => {
    const data = new Float32Array(1350)
    for (let i = 0; i < 450; i += 1) {
      const t = seededUnit(i, 41) * Math.PI * 2
      const p = seededUnit(i, 43) * Math.PI
      const radius = 1.2 + seededUnit(i, 47) * 0.95
      data[i * 3] = Math.cos(t) * Math.sin(p) * radius
      data[i * 3 + 1] = Math.cos(p) * radius * 0.6
      data[i * 3 + 2] = Math.sin(t) * Math.sin(p) * radius
    }
    return data
  }, [])

  const fromColor = useMemo(() => new THREE.Color(current.baseColor), [current.baseColor])
  const toColor = useMemo(() => new THREE.Color(transitionTo?.baseColor ?? current.baseColor), [transitionTo?.baseColor, current.baseColor])

  const glowFrom = useMemo(() => new THREE.Color(current.glowColor), [current.glowColor])
  const glowTo = useMemo(() => new THREE.Color(transitionTo?.glowColor ?? current.glowColor), [transitionTo?.glowColor, current.glowColor])

  const mixedColor = useMemo(() => {
    const col = fromColor.clone()
    col.lerp(toColor, ceremonyProgress)
    return col
  }, [fromColor, toColor, ceremonyProgress])

  const mixedGlow = useMemo(() => {
    const col = glowFrom.clone()
    col.lerp(glowTo, ceremonyProgress)
    return col
  }, [glowFrom, glowTo, ceremonyProgress])

  useEffect(() => {
    autoYawRef.current = 0
    if (controlsRef.current?.reset) {
      controlsRef.current.reset()
    }
  }, [resetSignal, controlsRef])

  useFrame((state, delta) => {
    if (groupRef.current && idleRotate && !isInteracting) {
      autoYawRef.current += delta * 0.14
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = autoYawRef.current + manualYaw
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.04 + manualPitch
    }

    if (beltMaterialRef.current) {
      beltMaterialRef.current.color.copy(mixedColor)
      beltMaterialRef.current.emissive.copy(mixedGlow)
      beltMaterialRef.current.emissiveIntensity = 0.16 + Math.sin(state.clock.elapsedTime * 1.8) * 0.02 + ceremonyProgress * 0.7
      beltMaterialRef.current.roughness = 0.36 + wearLevel * 0.5
      beltMaterialRef.current.map = ceremonyProgress > 0.5 ? nextTexture : currentTexture
      beltMaterialRef.current.needsUpdate = true
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * (0.05 + ceremonyProgress * 0.5)
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15
      const material = pointsRef.current.material as THREE.PointsMaterial
      material.opacity = 0.25 + ceremonyProgress * 0.6
      material.size = 0.02 + ceremonyProgress * 0.04
    }
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.7, 4.6]} fov={38} />
      <ambientLight intensity={0.35} />
      <pointLight position={[2.4, 2.4, 3.2]} intensity={1.7} color={mixedGlow} />
      <pointLight position={[-2.1, -0.8, 2.2]} intensity={0.9} color="#f59e0b" />
      <spotLight position={[0, 4, 0]} intensity={0.45} angle={0.65} penumbra={0.7} color="#fff7d6" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.18, 0]} receiveShadow>
        <planeGeometry args={[9, 9]} />
        <meshStandardMaterial map={tatamiTexture} roughness={0.95} metalness={0.04} />
      </mesh>

      <group ref={groupRef}>
        <mesh onClick={onBeltClick} castShadow>
          <torusGeometry args={[1.08, 0.26, 64, 190]} />
          <meshStandardMaterial
            ref={beltMaterialRef}
            map={currentTexture}
            roughnessMap={currentTexture}
            normalMap={currentTexture}
            normalScale={new THREE.Vector2(0.33, 0.33)}
            metalness={0.05}
            roughness={0.55}
          />
        </mesh>
        <Text
          position={[0, 0.05, 1.06]}
          rotation={[0, 0, 0]}
          fontSize={0.22}
          color="#f8fafc"
          anchorX="center"
          anchorY="middle"
        >
          {transitionTo && ceremonyProgress > 0.5 ? transitionTo.kanji : current.kanji}
        </Text>
      </group>

      <Points ref={pointsRef} positions={particlePositions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color={transitionTo && ceremonyProgress > 0.5 ? transitionTo.particleColor : current.particleColor}
          size={0.02}
          sizeAttenuation
          depthWrite={false}
          opacity={0.3}
        />
      </Points>

      <OrbitControls
        ref={(instance: unknown) => {
          controlsRef.current = hasReset(instance) ? instance : null
        }}
        enablePan={false}
        enableZoom
        minDistance={3.5}
        maxDistance={6}
        minPolarAngle={Math.PI * 0.25}
        maxPolarAngle={Math.PI * 0.72}
        rotateSpeed={0.85}
        zoomSpeed={0.65}
        enableDamping
        dampingFactor={0.08}
        touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_ROTATE }}
        onStart={onInteractionStart}
        onEnd={onInteractionEnd}
      />
    </>
  )
}

function playCeremonySound() {
  if (typeof window === 'undefined') return

  const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
  const now = audioContext.currentTime

  const notes = [261.63, 329.63, 392.0, 523.25]

  notes.forEach((frequency, index) => {
    const osc = audioContext.createOscillator()
    const gain = audioContext.createGain()
    osc.type = 'sine'
    osc.frequency.value = frequency
    gain.gain.setValueAtTime(0.0001, now + index * 0.12)
    gain.gain.exponentialRampToValueAtTime(0.06, now + index * 0.12 + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.12 + 0.35)
    osc.connect(gain)
    gain.connect(audioContext.destination)
    osc.start(now + index * 0.12)
    osc.stop(now + index * 0.12 + 0.36)
  })
}

export function BeltAvatarWidget({ ki = 12750, className }: BeltAvatarWidgetProps) {
  const reduceMotion = useReducedMotion()
  const [displayKi, setDisplayKi] = useState(ki)
  const [showRankInfo, setShowRankInfo] = useState(false)
  const [idleRotate, setIdleRotate] = useState(true)
  const [isInteracting, setIsInteracting] = useState(false)
  const [ceremonyActive, setCeremonyActive] = useState(false)
  const [ceremonyProgress, setCeremonyProgress] = useState(0)
  const [manualYaw, setManualYaw] = useState(0)
  const [manualPitch, setManualPitch] = useState(0)
  const [resetSignal, setResetSignal] = useState(0)

  const ceremonyFrameRef = useRef<number | null>(null)
  const idleTimerRef = useRef<number | null>(null)
  const controlsRef = useRef<ControlsHandle | null>(null)
  const viewerRef = useRef<HTMLDivElement | null>(null)

  const progress = getRankProgress(displayKi)
  const current = progress.current
  const next = progress.next
  const wearLevel = progress.currentIndex / Math.max(1, beltRanks.length - 1)

  const confettiParticles = useMemo(() => {
    return Array.from({ length: 58 }, (_, i) => ({
      id: i,
      left: `${(seededUnit(i, 61) * 100).toFixed(2)}%`,
      delay: seededUnit(i, 67) * 0.6,
      duration: 1.8 + seededUnit(i, 71) * 1.8,
      rotate: 200 + seededUnit(i, 73) * 340,
      color: [current.glowColor, current.particleColor, '#fef08a', '#f5f3ff'][i % 4],
    }))
  }, [current.glowColor, current.particleColor])

  const beltBadgeNodes = useMemo(
    () => [
      { id: 'combo', label: 'Combo', top: '11%', left: '12%', color: '#22d3ee' },
      { id: 'streak', label: 'Streak', top: '18%', right: '10%', color: '#f59e0b' },
      { id: 'ki', label: 'Ki+', bottom: '18%', left: '10%', color: '#a78bfa' },
      { id: 'dojo', label: 'Dojo', bottom: '10%', right: '11%', color: '#4ade80' },
    ],
    [],
  )

  const handleInteractionStart = useCallback(() => {
    setIsInteracting(true)
    setIdleRotate(false)
    if (idleTimerRef.current) {
      window.clearTimeout(idleTimerRef.current)
      idleTimerRef.current = null
    }
  }, [])

  const handleInteractionEnd = useCallback(() => {
    setIsInteracting(false)
    if (idleTimerRef.current) {
      window.clearTimeout(idleTimerRef.current)
    }
    idleTimerRef.current = window.setTimeout(() => {
      setIdleRotate(true)
    }, 2200)
  }, [])

  const resetViewer = useCallback(() => {
    setManualYaw(0)
    setManualPitch(0)
    setResetSignal((value) => value + 1)
  }, [])

  const handleViewerKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      setManualYaw((value) => value - 0.08)
      return
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      setManualYaw((value) => value + 0.08)
      return
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setManualPitch((value) => Math.max(-0.45, value - 0.05))
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setManualPitch((value) => Math.min(0.45, value + 0.05))
      return
    }
    if (event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault()
      resetViewer()
    }
  }, [resetViewer])

  const startRankUpCeremony = useCallback(() => {
    if (!next || ceremonyActive) return

    if (reduceMotion) {
      setCeremonyActive(true)
      setDisplayKi(next.minKi)
      window.setTimeout(() => {
        setCeremonyActive(false)
      }, 550)
      return
    }

    setCeremonyActive(true)
    setCeremonyProgress(0)
    playCeremonySound()

    const start = performance.now()
    const duration = 2900

    const tick = (now: number) => {
      const elapsed = now - start
      const value = Math.min(1, elapsed / duration)
      setCeremonyProgress(value)

      if (value < 1) {
        ceremonyFrameRef.current = window.requestAnimationFrame(tick)
        return
      }

      setDisplayKi(next.minKi)

      window.setTimeout(() => {
        setCeremonyActive(false)
        setCeremonyProgress(0)
      }, 900)
    }

    ceremonyFrameRef.current = window.requestAnimationFrame(tick)
  }, [next, ceremonyActive, reduceMotion])

  useEffect(() => {
    return () => {
      if (ceremonyFrameRef.current) {
        window.cancelAnimationFrame(ceremonyFrameRef.current)
      }
      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current)
      }
    }
  }, [])

  return (
    <section className={cn('glass-card-static relative overflow-hidden rounded-3xl border border-border p-5 md:p-6', className)}>
      <div className="absolute inset-0 opacity-50" style={{ background: 'radial-gradient(circle at 18% 10%, rgba(255,255,255,0.1), transparent 40%)' }} />
      <div className="relative z-10 grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Belt Avatar
          </div>

          <div>
            <h2 className="text-2xl font-black tracking-tight md:text-3xl">Dojo Belt Projection</h2>
            <p className="mt-1 text-sm text-foreground-muted">
              Rotate your belt, inspect its wear, and ascend through each rank with full ceremony.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background/50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-foreground-subtle">Current Rank</p>
                <p className="mt-1 text-xl font-bold" style={{ color: current.glowColor }}>
                  {current.kanji} • {current.colorName}
                </p>
                <p className="text-sm text-foreground-muted">{current.rankName}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.14em] text-foreground-subtle">Ki</p>
                <p className="text-xl font-bold text-foreground">{displayKi.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between text-xs text-foreground-muted">
                <span>{next ? `Next: ${next.kanji} ${next.colorName}` : 'Maximum Rank Reached'}</span>
                <span>{Math.round(progress.progress * 100)}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-background-tertiary">
                <motion.div
                  animate={{ width: `${Math.max(3, progress.progress * 100)}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${current.baseColor}, ${current.glowColor})`,
                    boxShadow: `0 0 24px ${current.glowColor}55`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Combo Master', icon: Zap },
              { label: '100 Commands', icon: Award },
              { label: '7 Day Streak', icon: Sparkles },
            ].map((badge, index) => {
              const Icon = badge.icon
              return (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs"
                  style={{ color: [current.glowColor, '#fbbf24', '#22d3ee'][index % 3] }}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {badge.label}
                </span>
              )
            })}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setShowRankInfo((prev) => !prev)}
              className="rounded-lg border border-border bg-background-secondary px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-border-hover"
            >
              {showRankInfo ? 'Hide Rank Details' : 'Show Rank Details'}
            </button>
            <button
              type="button"
              onClick={startRankUpCeremony}
              disabled={!next || ceremonyActive}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-black transition-all disabled:cursor-not-allowed disabled:opacity-50"
              style={{ background: `linear-gradient(135deg, ${current.glowColor}, ${current.baseColor})` }}
            >
              {next ? 'Trigger Rank-Up Ceremony' : 'Grand Master Achieved'}
            </button>
          </div>
        </div>

        <div className="relative">
          <motion.div
            ref={viewerRef}
            tabIndex={0}
            onKeyDown={handleViewerKeyDown}
            onDoubleClick={resetViewer}
            onMouseDown={() => viewerRef.current?.focus()}
            aria-label="Interactive belt viewer. Drag to rotate, arrow keys rotate, and press space to reset."
            animate={
              ceremonyActive && !reduceMotion
                ? { x: [0, -5, 6, -4, 4, 0], y: [0, 4, -4, 2, -2, 0] }
                : { x: 0, y: 0 }
            }
            transition={{ duration: 0.72, repeat: ceremonyActive ? 2 : 0 }}
            className="relative h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-[#040507] outline-none ring-cyan-300/35 focus:ring-2 md:h-[460px]"
          >
            <Canvas
              shadows={false}
              dpr={[1, 1.6]}
              gl={{ antialias: false, powerPreference: 'high-performance' }}
              performance={{ min: 0.5 }}
            >
              <BeltScene
                current={current}
                transitionTo={next}
                ceremonyProgress={ceremonyProgress}
                wearLevel={wearLevel}
                idleRotate={!reduceMotion && idleRotate}
                isInteracting={isInteracting}
                manualYaw={manualYaw}
                manualPitch={manualPitch}
                resetSignal={resetSignal}
                controlsRef={controlsRef}
                onInteractionStart={handleInteractionStart}
                onInteractionEnd={handleInteractionEnd}
                onBeltClick={() => setShowRankInfo((prev) => !prev)}
              />
            </Canvas>

            <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.14em] text-white/80">
              Drag / Pinch / Rotate / Arrow Keys / Space Reset
            </div>

            <div className="pointer-events-none absolute inset-0">
              {beltBadgeNodes.map((badge) => (
                <span
                  key={badge.id}
                  className="absolute inline-flex items-center rounded-full border bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] backdrop-blur-sm"
                  style={{
                    color: badge.color,
                    borderColor: `${badge.color}88`,
                    boxShadow: `0 0 14px ${badge.color}33`,
                    top: badge.top,
                    left: badge.left,
                    right: badge.right,
                    bottom: badge.bottom,
                  }}
                >
                  {badge.label}
                </span>
              ))}
            </div>

            <AnimatePresence>
              {showRankInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-black/65 p-4 backdrop-blur-md"
                >
                  <p className="text-xs uppercase tracking-[0.12em] text-white/65">Rank Detail</p>
                  <p className="mt-1 text-sm text-white">{current.kanji} — {current.colorName} ({current.rankName})</p>
                  <p className="mt-1 text-xs text-white/70">
                    Battle wear: {Math.round(wearLevel * 100)}% • Glow affinity synchronized to rank spirit.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {ceremonyActive && next && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-[120]"
          >
            <div className="absolute inset-0 bg-black/75" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(255,255,255,0.12), rgba(0,0,0,0.82) 58%, rgba(0,0,0,0.95) 100%)',
              }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <motion.p
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: [0.75, 1.15, 1], opacity: 1 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="dojo-kanji text-7xl md:text-8xl"
                style={{ color: next.glowColor }}
              >
                {next.kanji}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="mt-4 text-xl font-black uppercase tracking-[0.12em] text-white"
              >
                You have earned the {next.colorName} - {next.rankName}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.92, y: 0 }}
                transition={{ delay: 0.72, duration: 0.6 }}
                className="mt-2 text-sm uppercase tracking-[0.14em] text-white/75"
              >
                Rank Name: {next.rankName}
              </motion.p>
            </div>

            {!reduceMotion && confettiParticles.map((piece) => (
              <motion.span
                key={piece.id}
                initial={{ y: '-10vh', opacity: 0, rotate: 0 }}
                animate={{ y: '108vh', opacity: [0, 1, 1, 0], rotate: piece.rotate }}
                transition={{
                  delay: piece.delay,
                  duration: piece.duration,
                  ease: 'linear',
                }}
                className="absolute top-0 h-3 w-1.5 rounded-sm"
                style={{ left: piece.left, backgroundColor: piece.color }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
