'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import { CheckCircle2, LoaderCircle, ShieldAlert, Star } from 'lucide-react'

interface StrikeOptions {
  ki?: number
  particleColor?: string
}

interface ToastItem {
  id: number
  type: 'success' | 'error'
  text: string
}

interface KiFloatItem {
  id: number
  amount: number
  color: string
}

interface AchievementItem {
  id: number
  sealName: string
  description: string
}

interface LoadingState {
  active: boolean
  text: string
}

interface DojoEffectsApi {
  triggerStrike: (options?: StrikeOptions) => void
  triggerError: (message: string) => void
  triggerSuccess: (message: string) => void
  triggerKiGain: (amount: number, color?: string) => void
  triggerAchievement: (sealName: string, description?: string) => void
  triggerChallengeComplete: (kiReward?: number) => void
  setLoadingState: (active: boolean, text?: string) => void
  sessionKiGained: number
}

const DojoEffectsContext = createContext<DojoEffectsApi | null>(null)

function seededUnit(index: number, salt: number): number {
  const raw = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return raw - Math.floor(raw)
}

function safeVibrate(pattern: number[]) {
  if (typeof window === 'undefined') return
  if (!('vibrate' in navigator)) return
  navigator.vibrate(pattern)
}

function shouldPlaySound(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem('dojo-sound-enabled') === 'true'
  } catch {
    return false
  }
}

function playToneSequence(frequencies: number[], durationMs: number) {
  if (typeof window === 'undefined') return
  if (!shouldPlaySound()) return

  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AudioCtx) return

  const ctx = new AudioCtx()
  const now = ctx.currentTime

  frequencies.forEach((frequency, index) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.value = frequency

    const start = now + index * (durationMs / 1000) / frequencies.length
    const end = start + (durationMs / 1000) / frequencies.length

    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(0.04, start + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, end)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(start)
    osc.stop(end)
  })
}

export function DojoEffectsProvider({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion()
  const shakeControls = useAnimationControls()

  const [slashId, setSlashId] = useState<number | null>(null)
  const [slashColor, setSlashColor] = useState('#ff0000')
  const [burstId, setBurstId] = useState<number | null>(null)
  const [burstColor, setBurstColor] = useState('#ff3030')
  const [flashType, setFlashType] = useState<'error' | 'success' | null>(null)
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [kiFloats, setKiFloats] = useState<KiFloatItem[]>([])
  const [achievements, setAchievements] = useState<AchievementItem[]>([])
  const [challengeCompleteId, setChallengeCompleteId] = useState<number | null>(null)
  const [loading, setLoading] = useState<LoadingState>({ active: false, text: 'Loading training session...' })
  const [sessionKiGained, setSessionKiGained] = useState(0)

  const idRef = useRef(1)
  const lastStrikeRef = useRef(0)

  const nextId = useCallback(() => {
    idRef.current += 1
    return idRef.current
  }, [])

  const pushToast = useCallback((type: 'success' | 'error', text: string) => {
    const id = nextId()
    setToasts((prev) => [...prev, { id, type, text }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id))
    }, type === 'error' ? 5000 : 3000)
  }, [nextId])

  const triggerKiGain = useCallback((amount: number, color = '#ffd166') => {
    const id = nextId()
    setSessionKiGained((prev) => prev + amount)
    setKiFloats((prev) => [...prev, { id, amount, color }])
    window.setTimeout(() => {
      setKiFloats((prev) => prev.filter((item) => item.id !== id))
    }, 1300)
  }, [nextId])

  const triggerStrike = useCallback((options?: StrikeOptions) => {
    const now = performance.now()
    if (now - lastStrikeRef.current < 120) return
    lastStrikeRef.current = now

    const ki = options?.ki ?? 15
    const color = options?.particleColor ?? '#ff3030'

    if (!reduceMotion) {
      shakeControls.start({
        x: [0, -6, 6, -4, 4, 0],
        transition: { duration: 0.2, ease: 'easeOut' },
      })
      setSlashColor('#ff0000')
      setBurstColor(color)
      setSlashId(nextId())
      setBurstId(nextId())
    }

    safeVibrate([30, 20, 30])
    playToneSequence([190, 120], 220)
    triggerKiGain(ki, '#fbbf24')
  }, [nextId, reduceMotion, shakeControls, triggerKiGain])

  const triggerError = useCallback((message: string) => {
    setFlashType('error')
    pushToast('error', message)
    playToneSequence([130], 280)
    window.setTimeout(() => setFlashType(null), 220)
  }, [pushToast])

  const triggerSuccess = useCallback((message: string) => {
    setFlashType('success')
    pushToast('success', message)
    window.setTimeout(() => setFlashType(null), 220)
  }, [pushToast])

  const triggerAchievement = useCallback((sealName: string, description = 'New seal unlocked') => {
    const id = nextId()
    setAchievements((prev) => [...prev, { id, sealName, description }])
    playToneSequence([400, 523, 659], 480)
    window.setTimeout(() => {
      setAchievements((prev) => prev.filter((item) => item.id !== id))
    }, 3000)
  }, [nextId])

  const triggerChallengeComplete = useCallback((kiReward = 50) => {
    const id = nextId()
    setChallengeCompleteId(id)
    triggerSuccess('Challenge Complete!')
    triggerKiGain(kiReward, '#22d3ee')
    playToneSequence([330, 440, 550], 620)
    window.setTimeout(() => {
      setChallengeCompleteId((current) => (current === id ? null : current))
    }, 2800)
  }, [nextId, triggerKiGain, triggerSuccess])

  const setLoadingState = useCallback((active: boolean, text = 'Loading training session...') => {
    setLoading({ active, text })
  }, [])

  const contextValue = useMemo<DojoEffectsApi>(() => ({
    triggerStrike,
    triggerError,
    triggerSuccess,
    triggerKiGain,
    triggerAchievement,
    triggerChallengeComplete,
    setLoadingState,
    sessionKiGained,
  }), [triggerStrike, triggerError, triggerSuccess, triggerKiGain, triggerAchievement, triggerChallengeComplete, setLoadingState, sessionKiGained])

  useEffect(() => {
    if (slashId === null) return
    const timer = window.setTimeout(() => setSlashId(null), 420)
    return () => window.clearTimeout(timer)
  }, [slashId])

  useEffect(() => {
    if (burstId === null) return
    const timer = window.setTimeout(() => setBurstId(null), 640)
    return () => window.clearTimeout(timer)
  }, [burstId])

  const burstParticles = useMemo(() => {
    if (burstId === null) return []
    return Array.from({ length: 20 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 20
      const radius = 80 + seededUnit(i, burstId) * 90
      return {
        id: `${burstId}-${i}`,
        dx: Math.cos(angle) * radius,
        dy: Math.sin(angle) * radius,
        delay: seededUnit(i, burstId + 5) * 0.08,
      }
    })
  }, [burstId])

  const confettiParticles = useMemo(() => {
    if (challengeCompleteId === null) return []
    return Array.from({ length: 55 }, (_, i) => ({
      id: `${challengeCompleteId}-${i}`,
      left: `${(seededUnit(i, challengeCompleteId + 11) * 100).toFixed(2)}%`,
      delay: seededUnit(i, challengeCompleteId + 17) * 0.7,
      duration: 1.4 + seededUnit(i, challengeCompleteId + 19) * 1.8,
      color: ['#22d3ee', '#fbbf24', '#fb7185', '#a78bfa'][i % 4],
    }))
  }, [challengeCompleteId])

  return (
    <DojoEffectsContext.Provider value={contextValue}>
      <motion.div animate={shakeControls}>
        {children}
      </motion.div>

      <div className="pointer-events-none fixed inset-0 z-[130]">
        <AnimatePresence>
          {flashType && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: flashType === 'error' ? 0.28 : 0.2 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              style={{ background: flashType === 'error' ? '#ff0033' : '#00ff88' }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {slashId && (
            <motion.div
              key={slashId}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.08, 0.95] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[80px] font-black"
              style={{ color: slashColor, textShadow: `0 0 20px ${slashColor}` }}
            >
              /
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {burstId && burstParticles.map((particle) => (
            <motion.span
              key={particle.id}
              initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              animate={{ opacity: 0, x: particle.dx, y: particle.dy, scale: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: particle.delay }}
              className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
              style={{ background: burstColor, boxShadow: `0 0 14px ${burstColor}` }}
            />
          ))}
        </AnimatePresence>

        <div className="absolute inset-x-0 top-4 flex justify-center">
          <div className="rounded-full border border-xp-gold/30 bg-black/55 px-3 py-1 text-xs font-semibold text-xp-gold backdrop-blur-sm">
            Session Ki +{sessionKiGained}
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence>
            {kiFloats.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: [0, 1, 1, 0], y: -100 - idx * 12, scale: [0.95, 1.05, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute text-lg font-black"
                style={{ color: item.color, textShadow: `0 0 14px ${item.color}` }}
              >
                +{item.amount} Ki
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="absolute inset-x-0 bottom-4 flex flex-col items-center gap-2">
          <AnimatePresence>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
                className="pointer-events-auto w-[min(92vw,560px)] rounded-xl border px-4 py-3 backdrop-blur-md"
                style={{
                  borderColor: toast.type === 'error' ? 'rgba(255, 85, 110, 0.45)' : 'rgba(52, 211, 153, 0.45)',
                  background: toast.type === 'error' ? 'rgba(56, 8, 12, 0.82)' : 'rgba(7, 45, 33, 0.82)',
                }}
              >
                <div className="flex items-center gap-2 text-sm font-semibold">
                  {toast.type === 'error' ? (
                    <ShieldAlert className="h-4 w-4 text-[#ff4f68]" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-[#34d399]" />
                  )}
                  <span className={toast.type === 'error' ? 'text-[#ffe8ed]' : 'text-[#d5fff0]'}>{toast.text}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="absolute right-4 top-16 flex w-80 flex-col gap-2">
          <AnimatePresence>
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: 42 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.25, delay: index * 0.08 }}
                className="pointer-events-auto rounded-xl border border-red-500/50 bg-black/80 p-3 backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ rotate: -20, scale: 0.88 }}
                    animate={{ rotate: [0, 8, -5, 0], scale: [0.9, 1.05, 1] }}
                    transition={{ duration: 0.7 }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-red-500/55 bg-red-500/20 text-red-400"
                  >
                    <Star className="h-4 w-4" />
                  </motion.div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-red-300">Hanko Seal</p>
                    <p className="text-sm font-bold text-white">{achievement.sealName}</p>
                    <p className="text-xs text-zinc-300">{achievement.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {challengeCompleteId && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-1/2 top-20 -translate-x-1/2 rounded-full border border-cyan-400/45 bg-cyan-500/16 px-4 py-2 text-sm font-black uppercase tracking-[0.12em] text-cyan-300"
              >
                Challenge Complete!
              </motion.div>
              {confettiParticles.map((item) => (
                <motion.span
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: [0, 1, 1, 0], y: '110vh' }}
                  transition={{ duration: item.duration, ease: 'linear', delay: item.delay }}
                  className="absolute top-0 h-3 w-1.5 rounded-sm"
                  style={{ left: item.left, background: item.color }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {loading.active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/20 bg-black/70 px-6 py-5">
                <LoaderCircle className="h-9 w-9 animate-spin text-cyan-300" />
                <div className="h-12 w-12 rounded-full border-2 border-cyan-400/50 border-t-transparent animate-spin" />
                <p className="text-sm font-semibold text-cyan-200">{loading.text}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DojoEffectsContext.Provider>
  )
}

export function useDojoEffects(): DojoEffectsApi {
  const context = useContext(DojoEffectsContext)
  if (!context) {
    throw new Error('useDojoEffects must be used within DojoEffectsProvider')
  }
  return context
}
