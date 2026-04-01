'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Syne, Space_Grotesk } from 'next/font/google'
import {
  AlertCircle,
  ArrowRight,
  Command,
  Flame,
  Gauge,
  LogIn,
  Shield,
  Sparkles,
  Terminal,
  Trophy,
} from 'lucide-react'

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
})

const badgeItems = [
  { icon: Flame, label: '7 Day Streak', delay: 0.1, top: '12%', left: '58%' },
  { icon: Trophy, label: '+240 XP', delay: 0.3, top: '22%', left: '73%' },
  { icon: Gauge, label: '0.12ms', delay: 0.5, top: '35%', left: '64%' },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError('Invalid email or password')
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className={`${spaceGrotesk.variable} ${syne.variable} w-full max-w-6xl [font-family:var(--font-space-grotesk)]`}>
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#090b11] shadow-[0_20px_90px_rgba(255,86,60,0.15)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '42px 42px',
          }}
        />

        {[0, 1, 2, 3].map((n) => (
          <motion.div
            key={n}
            className="pointer-events-none absolute right-[-20%] top-[-18%] h-[130%] w-[46%]"
            initial={{ rotate: -32, opacity: 0.16 + n * 0.06 }}
            animate={{
              x: [0, -20, 0],
              y: [0, 24, 0],
              opacity: [0.18 + n * 0.06, 0.38 + n * 0.05, 0.18 + n * 0.06],
            }}
            transition={{ duration: 7 + n, repeat: Infinity, ease: 'easeInOut', delay: n * 0.25 }}
            style={{
              clipPath: 'polygon(14% 0%, 100% 0%, 84% 100%, 0% 100%)',
              background:
                n % 2 === 0
                  ? 'linear-gradient(180deg, rgba(255,70,50,0.36), rgba(255,70,50,0))'
                  : 'linear-gradient(180deg, rgba(255,136,116,0.28), rgba(255,136,116,0))',
            }}
          />
        ))}

        <div className="relative grid min-h-[680px] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hidden border-r border-white/10 p-10 lg:block">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-sm border border-[#f4b2a4]/35 bg-[#f4b2a4]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f4b2a4]">
                <Sparkles className="h-3.5 w-3.5" />
                Auth Node V2.8
              </div>

              <h1 className="mt-8 text-6xl font-extrabold leading-[0.9] text-white [font-family:var(--font-syne)]">
                Return to
                <br />
                <span className="text-[#ffb4a6]">the Dojo.</span>
              </h1>

              <p className="mt-6 max-w-md text-lg leading-relaxed text-[#a4a8b1]">
                Resume your command drills, keep your streak alive, and climb the rankings with focused reps.
              </p>

              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                className="mt-10 rounded-xl border border-[#f4b2a4]/35 bg-[#10131b]/85 p-4"
              >
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#3c414c]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#3c414c]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#3c414c]" />
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#7c808a]">System // Login Sequence</p>
                </div>

                <div className="space-y-2.5 text-sm text-[#c8cad0]">
                  <p><span className="text-[#ffb4a6]">[SYNC]</span> Re-linking profile state...</p>
                  <p><span className="text-[#ffb4a6]">[SAFE]</span> Credential channel encrypted.</p>
                  <p className="font-mono text-[#d9dce2]">$ auth --continue &quot;training&quot;</p>
                  <motion.p
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="font-mono text-[#ffb4a6]"
                  >
                    $ <span className="inline-block h-4 w-2 bg-[#ffb4a6] align-middle" />
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>

            {badgeItems.map((badge) => {
              const Icon = badge.icon
              return (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: [0.7, 1, 0.7], y: [0, -8, 0], scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: badge.delay }}
                  className="pointer-events-none absolute hidden rounded border border-[#f4b2a4]/25 bg-[#0f1219]/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#f4b2a4] lg:inline-flex lg:items-center lg:gap-2"
                  style={{ top: badge.top, left: badge.left }}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {badge.label}
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="relative flex items-center p-6 sm:p-10"
          >
            <motion.div
              animate={{ boxShadow: ['0 0 0 rgba(255,90,60,0)', '0 0 40px rgba(255,90,60,0.2)', '0 0 0 rgba(255,90,60,0)'] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full rounded-2xl border border-white/15 bg-[#11141c]/95 p-7"
            >
              <motion.div
                className="pointer-events-none absolute -inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#ffb4a6] to-transparent"
                animate={{ x: ['-40%', '40%'] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
              />

              <div className="mb-7 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f4b2a4]">Access Portal</p>
                  <h2 className="mt-2 text-3xl font-extrabold text-white [font-family:var(--font-syne)]">Sign In</h2>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#f4b2a4]/30 bg-[#f4b2a4]/10">
                  <Terminal className="h-5 w-5 text-[#f4b2a4]" />
                </div>
              </div>

              {error && (
                <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/35 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8f94a0]">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0d1016] px-3 py-3 text-sm text-[#d8dbe1] outline-none transition-all focus:border-[#ffb4a6]/45 focus:ring-2 focus:ring-[#ffb4a6]/20"
                    placeholder="alex@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8f94a0]">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0d1016] px-3 py-3 text-sm text-[#d8dbe1] outline-none transition-all focus:border-[#ffb4a6]/45 focus:ring-2 focus:ring-[#ffb4a6]/20"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff5a3c] py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#121317] transition-all hover:-translate-y-0.5 hover:bg-[#ff775f] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <LogIn className="h-4 w-4" />
                  {loading ? 'Signing In...' : 'Authenticate'}
                </button>
              </form>

              <div className="mt-6 flex items-center justify-between text-xs text-[#959aa5]">
                <Link href="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#f4b2a4]">
                  <Command className="h-3.5 w-3.5" />
                  Back to Landing
                </Link>
                <Link href="/register" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#f4b2a4]">
                  Create Account
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="border-t border-white/10 bg-[#0a0d13] px-6 py-4 text-center text-[10px] uppercase tracking-[0.2em] text-[#7e848f]">
          Secure Terminal Session // Credentials Encrypted
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] uppercase tracking-[0.15em] text-[#747a85]">
        Made for focused command training
      </p>

      <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-[#8e939e]">
        <Shield className="h-4 w-4 text-[#f4b2a4]" />
        Trusted auth pipeline
      </div>
    </div>
  )
}
