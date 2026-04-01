'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Syne, Space_Grotesk } from 'next/font/google'
import {
  ArrowRight,
  Bolt,
  Command,
  Flame,
  Gauge,
  Play,
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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

const protocols = [
  {
    title: 'Structured Paths',
    copy: 'Guided command journeys designed for deep retention, not passive scrolling.',
    tag: 'Protocol 01',
  },
  {
    title: 'Real-Time Execution',
    copy: 'Low-latency simulated shell environment with immediate behavioral feedback.',
    tag: 'Protocol 02',
    highlight: true,
  },
  {
    title: 'Neo Ranking',
    copy: 'Track mastery over time with streaks, progression ladders, and challenge scores.',
    tag: 'Protocol 03',
  },
]

const tickerItems = [
  'LIVE SANDBOX',
  'MOTION DRILLS',
  'RANKED CHALLENGES',
  'AI COMMAND COACH',
  'ZERO SETUP',
  'HIGH FOCUS UX',
]

const floatingSignals = [
  { icon: Flame, label: '7 Day Streak', top: '8%', left: '66%', delay: 0.1 },
  { icon: Trophy, label: '+240 XP Today', top: '26%', left: '76%', delay: 0.35 },
  { icon: Gauge, label: '0.12ms', top: '45%', left: '69%', delay: 0.55 },
]

function RibbonField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
        }}
      />

      {[0, 1, 2, 3, 4].map((n) => (
        <motion.div
          key={n}
          className="absolute right-[-16%] top-[-18%] h-[130%] w-[42%]"
          initial={{ opacity: 0.2 + n * 0.06, x: 0, y: 0, rotate: -33 }}
          animate={{
            x: [0, -22, 0],
            y: [0, 34, 0],
            rotate: [-33, -30, -33],
            opacity: [0.22 + n * 0.05, 0.38 + n * 0.05, 0.22 + n * 0.05],
          }}
          transition={{
            duration: 7 + n * 1.2,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: n * 0.3,
          }}
          style={{
            clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
            background:
              n % 2 === 0
                ? 'linear-gradient(180deg, rgba(255,70,50,0.35), rgba(255,70,50,0))'
                : 'linear-gradient(180deg, rgba(255,140,120,0.28), rgba(255,140,120,0))',
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(28,34,50,0.4),transparent_35%),radial-gradient(circle_at_70%_30%,rgba(255,65,45,0.12),transparent_42%),radial-gradient(circle_at_50%_80%,rgba(255,140,120,0.07),transparent_45%)]" />
    </div>
  )
}

function KineticTicker() {
  const row = [...tickerItems, ...tickerItems, ...tickerItems]

  return (
    <div className="relative border-y border-[#ffb4a6]/20 bg-[#0d1017] py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0d1017] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0d1017] to-transparent" />

      <motion.div
        className="flex gap-4"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      >
        {row.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="inline-flex shrink-0 items-center gap-3 rounded-sm border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f4b2a4]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff715a]" />
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function LandingPage() {
  return (
    <div className={`${spaceGrotesk.variable} ${syne.variable} relative min-h-screen bg-[#07080c] text-[#d4d6db] [font-family:var(--font-space-grotesk)]`}>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#090b10]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[#ff6f58]" />
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f5b1a2]">TerminalDojo</p>
          </div>

          <nav className="hidden items-center gap-9 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9ca0aa] md:flex">
            <a href="#protocols" className="transition-colors hover:text-[#f4b2a4]">Protocols</a>
            <a href="#zen" className="transition-colors hover:text-[#f4b2a4]">Zen Flow</a>
            <a href="#join" className="transition-colors hover:text-[#f4b2a4]">Join</a>
          </nav>

          <Link
            href="/app/dashboard"
            className="inline-flex items-center gap-2 rounded-md border border-[#f4b2a4]/40 bg-[#f4b2a4] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#111318] transition-colors hover:bg-[#ffd0c6]"
          >
            Enter
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      <main className="relative overflow-hidden pt-16">
        <section className="relative">
          <RibbonField />

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative mx-auto grid min-h-[88vh] max-w-6xl gap-10 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
          >
            <motion.div variants={item} className="relative">
              <p className="inline-flex items-center gap-2 border border-[#f4b2a4]/30 bg-[#f4b2a4]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f4b2a4]">
                <Sparkles className="h-3.5 w-3.5" />
                Synthetic Interface V2.8
              </p>

              <motion.h1
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                className="mt-8 text-5xl font-extrabold leading-[0.95] text-white [font-family:var(--font-syne)] md:text-7xl"
              >
                Your shortcut to
                <br />
                <span className="text-[#ffb4a6]">everything.</span>
              </motion.h1>

              <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#a4a8b1]">
                Command-line mastery in a cinematic dojo. Practice with intent, execute with precision,
                and build speed through rhythm.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/app/dashboard"
                  className="inline-flex items-center gap-2 rounded-md bg-[#ff5b3d] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#121317] transition-all hover:-translate-y-1 hover:scale-[1.02] hover:bg-[#ff755b]"
                >
                  Enter Dojo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/app/playground"
                  className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#d4d8de] transition-all hover:-translate-y-1 hover:scale-[1.02] hover:bg-white/10"
                >
                  <Play className="h-4 w-4" />
                  Start Sandbox
                </Link>
              </div>

              {floatingSignals.map((signal) => {
                const Icon = signal.icon
                return (
                  <motion.div
                    key={signal.label}
                    initial={{ opacity: 0, y: 10, scale: 0.92 }}
                    animate={{ opacity: [0.7, 1, 0.7], y: [0, -10, 0], scale: [1, 1.02, 1] }}
                    transition={{ duration: 3.2, repeat: Infinity, delay: signal.delay, ease: 'easeInOut' }}
                    className="pointer-events-none absolute hidden rounded border border-[#f4b2a4]/25 bg-[#0f1219]/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#f4b2a4] lg:inline-flex lg:items-center lg:gap-2"
                    style={{ top: signal.top, left: signal.left }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {signal.label}
                  </motion.div>
                )
              })}
            </motion.div>

            <motion.div
              variants={item}
              whileHover={{ y: -4, scale: 1.01 }}
              className="relative overflow-hidden rounded-xl border border-[#f4b2a4]/35 bg-[#101218]/90 p-4 shadow-[0_16px_80px_rgba(255,84,52,0.16)]"
            >
              <motion.div
                className="pointer-events-none absolute -inset-x-10 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#ffb4a6] to-transparent"
                animate={{ x: ['-45%', '45%'] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
              />

              <div className="flex items-center justify-between border-b border-white/10 px-2 pb-3 pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#3c414c]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#3c414c]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#3c414c]" />
                </div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#7b7f89]">System // Protocol-Zen</p>
              </div>

              <div className="space-y-4 p-4 text-sm leading-relaxed text-[#c8cad0]">
                <p><span className="text-[#ffb4a6]">[INIT]</span> Calibrating command cortex...</p>
                <p><span className="text-[#ffb4a6]">[SYNC]</span> Linking shell rhythm and memory.</p>
                <div className="space-y-1.5 pl-3 text-[#abb0ba]">
                  <p>&gt; &gt; Latency: <span className="text-[#ff6d54]">0.12ms</span></p>
                  <p>&gt; &gt; Focus: <span className="text-[#ffb4a6]">Stabilized</span></p>
                  <p>&gt; &gt; Channel: <span className="text-[#ffb4a6]">Terminal Dojo</span></p>
                </div>
                <p className="font-mono text-[#d9dbe0]">$ execute --flow=&quot;precision&quot;</p>
                <motion.p
                  initial={{ opacity: 0.45 }}
                  animate={{ opacity: [0.45, 1, 0.45], x: [0, 2, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-block font-mono text-[#ffb4a6]"
                >
                  $ <span className="inline-block h-4 w-2 bg-[#ffb4a6] align-middle" />
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <KineticTicker />

        <section id="protocols" className="relative border-y border-white/10 bg-[#0b0d12] py-20">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal>
              <h2 className="text-4xl font-extrabold uppercase tracking-tight text-white [font-family:var(--font-syne)]">System Protocols</h2>
            </Reveal>
            <div className="mt-10 grid gap-0 border border-white/10 md:grid-cols-3">
              {protocols.map((protocol, idx) => (
                <Reveal key={protocol.title}>
                  <motion.article
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className={`h-full border-b border-white/10 p-7 md:border-b-0 md:border-r md:last:border-r-0 ${
                      protocol.highlight ? 'bg-white/[0.05]' : 'bg-transparent'
                    }`}
                  >
                    <div className="mb-5 inline-flex rounded-sm border border-[#f4b2a4]/30 bg-[#f4b2a4]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f4b2a4]">
                      {protocol.tag}
                    </div>
                    <h3 className="text-3xl font-bold uppercase leading-tight text-[#f3f4f6] [font-family:var(--font-syne)]">
                      {protocol.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-[#9aa0aa]">{protocol.copy}</p>
                    <div className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ff8f79]">
                      <Bolt className="h-3.5 w-3.5" />
                      Sequence {idx + 1}
                    </div>
                  </motion.article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="zen" className="relative py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <h2 className="text-5xl font-extrabold uppercase leading-tight text-white [font-family:var(--font-syne)]">
                The Zen
                <br />
                of Code
              </h2>
              <p className="mt-6 max-w-xl text-xl leading-relaxed text-[#9ca2ad]">
                We treat terminal fluency like martial practice. Short drills, clean feedback loops, and
                compounding confidence through repetition.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6">
                {[
                  ['0.12ms', 'Execution Latency'],
                  ['124k', 'Active Disciples'],
                  ['∞', 'Infinite Scenarios'],
                  ['1x1', 'Focused Guidance'],
                ].map(([value, label]) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -6, scale: 1.03 }}
                    transition={{ duration: 0.25 }}
                    className="rounded border border-white/10 bg-white/[0.03] p-4"
                  >
                    <p className="text-3xl font-extrabold text-[#ffb4a6] [font-family:var(--font-syne)]">{value}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#7e838e]">{label}</p>
                  </motion.div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="rounded-xl border border-white/10 bg-[#12151c] p-6 shadow-[0_0_60px_rgba(255,180,166,0.08)]"
              >
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#7b7f89]">Command Feed</p>
                  <Command className="h-4 w-4 text-[#f4b2a4]" />
                </div>

                <div className="space-y-2.5 text-sm text-[#c6c9d0]">
                  <p>$ grep -rn &quot;TODO&quot; ./src</p>
                  <p>&gt; src/app/page.tsx:42:// TODO refine motion timings</p>
                  <p>$ find . -name &quot;*.md&quot; | wc -l</p>
                  <p>&gt; 17</p>
                  <p>$ tar -czf release.tgz ./dist</p>
                  <p>&gt; archive complete</p>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </section>

        <section id="join" className="relative border-t border-white/10 bg-[#0a0c11] py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <Reveal>
              <div className="mx-auto max-w-2xl rounded-2xl border border-[#f4b2a4]/25 bg-[linear-gradient(135deg,rgba(255,85,55,0.18),rgba(25,27,35,0.75))] p-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f4b2a4]">Ready to Begin</p>
                <h3 className="mt-4 text-4xl font-extrabold uppercase text-white [font-family:var(--font-syne)]">
                  Build Speed.
                  <br />
                  Keep Precision.
                </h3>
                <p className="mx-auto mt-4 max-w-xl text-[#b5b9c2]">
                  UI/UX inspired by your reference with motion-focused interaction design. No backend behavior changed.
                </p>

                <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/app/dashboard"
                    className="inline-flex items-center gap-2 rounded-md bg-[#f4b2a4] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#111318] transition-all hover:-translate-y-0.5 hover:bg-[#ffd0c6]"
                  >
                    Enter Dojo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/app/explore"
                    className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#d4d8de] transition-all hover:-translate-y-0.5 hover:bg-white/10"
                  >
                    <Terminal className="h-4 w-4" />
                    Explore Commands
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#090b10]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-7 text-[10px] uppercase tracking-[0.2em] text-[#7f848f]">
          <p>Made in Neo-Tokyo // 20XX</p>
          <div className="flex items-center gap-6">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Protocol</a>
          </div>
          <div className="inline-flex items-center gap-1 text-[#f4b2a4]">
            <Shield className="h-3.5 w-3.5" />
            Verified
          </div>
        </div>
      </footer>
    </div>
  )
}
