'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Terminal,
  Zap,
  Trophy,
  Brain,
  Shield,
  Layers,
  BookOpen,
  ChevronRight,
  Sparkles,
  Star,
  Flame,
  Target,
  ArrowRight,
  ExternalLink,
  Globe,
  Mail,
} from 'lucide-react'
import { HeroTerminal } from '@/components/landing/hero-terminal'

/* ─── Fade-in wrapper ─── */
function FadeInSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Stats Counter ─── */
function CountStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-gradient-primary text-4xl font-black md:text-5xl">{value}</p>
      <p className="mt-1 text-sm text-foreground-muted">{label}</p>
    </div>
  )
}

/* ═══════════════════════════════════════════
   LANDING PAGE
   ═══════════════════════════════════════════ */
export default function LandingPage() {
  const features = [
    {
      icon: Terminal,
      title: 'Interactive Sandbox',
      description: 'Practice commands in a real terminal environment — right in your browser. No setup required.',
      gradient: 'from-emerald-500 to-cyan-500',
    },
    {
      icon: Brain,
      title: 'AI-Powered Explainer',
      description: 'Paste any command and get a plain-English breakdown with safety checks and flag explanations.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Trophy,
      title: 'XP & Leveling',
      description: 'Earn XP, unlock badges, climb leaderboards. Progress from Script Kiddie to Root Master.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: Layers,
      title: '200+ Commands',
      description: 'Linux, Git, Docker, Kubernetes, networking, cloud CLIs — comprehensive coverage across every major tool.',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Shield,
      title: 'Danger Indicators',
      description: 'Every command shows a danger level so you know what\'s safe to run and what needs caution.',
      gradient: 'from-red-500 to-rose-500',
    },
    {
      icon: BookOpen,
      title: 'Guided Paths',
      description: 'Structured learning paths from beginner to advanced for each CLI domain. Learn in the right order.',
      gradient: 'from-teal-500 to-emerald-500',
    },
  ]

  const steps = [
    { step: '01', title: 'Pick a Command', description: 'Browse 200+ commands organized by category, difficulty, and real-world use case.' },
    { step: '02', title: 'Learn the Syntax', description: 'Color-coded syntax breakdowns, flag tables, and practical examples with expected output.' },
    { step: '03', title: 'Practice in Sandbox', description: 'Try commands in a safe, sandboxed terminal environment with instant feedback.' },
    { step: '04', title: 'Complete Challenges', description: 'Solve scenario-based challenges, earn XP, and track your progression on the leaderboard.' },
  ]

  const testimonials = [
    { name: 'Sarah K.', role: 'Junior Developer', text: 'TerminalDojo turned the terminal from terrifying to my favorite tool. The interactive challenges are incredible.', avatar: '👩‍💻' },
    { name: 'Dev Patel', role: 'DevOps Engineer', text: 'Finally a platform that teaches Docker and Kubernetes CLI properly. The sandbox environment is game-changing.', avatar: '🧑‍💻' },
    { name: 'Lisa Chen', role: 'CS Student', text: 'I went from googling every command to building shell scripts in two weeks. The AI explainer is so helpful.', avatar: '👩‍🎓' },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* ═══ NAVBAR ═══ */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass fixed inset-x-0 top-0 z-50"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 shadow-lg shadow-primary/10">
              <Terminal className="h-5 w-5 text-primary" />
            </span>
            <span className="text-lg">Terminal<span className="text-primary">Dojo</span></span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-foreground-muted md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#how-it-works" className="transition-colors hover:text-foreground">How it Works</a>
            <a href="#testimonials" className="transition-colors hover:text-foreground">Testimonials</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="hidden rounded-lg px-4 py-2 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground sm:block">
              Log in
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20"
            >
              Start Learning <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.header>

      {/* ═══ HERO SECTION ═══ */}
      <section className="hero-mesh relative flex min-h-screen items-center pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-float" />
          <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-accent/5 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 rounded-full bg-secondary/5 blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Now with AI-powered command explanations</span>
            </div>

            <h1 className="text-5xl font-black leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
              Master the{' '}
              <span className="text-gradient-primary">Command Line</span>{' '}
              Like a Pro
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-foreground-muted">
              Learn Linux, Git, Docker, Kubernetes, and cloud CLIs through interactive terminal practice,
              AI-powered guidance, and gamified progression.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-bold text-black transition-all duration-300 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/25"
              >
                Start for Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background-secondary/50 px-7 py-3.5 text-base font-semibold transition-all duration-300 hover:border-border-hover hover:bg-background-tertiary/50"
              >
                Explore Commands
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-foreground-muted">
              <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-primary" /> No setup needed</span>
              <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> Safe sandbox</span>
              <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-primary" /> 100% free tier</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/10 via-transparent to-accent/10 blur-2xl" />
            <HeroTerminal />
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <FadeInSection>
        <section className="border-y border-border bg-background-secondary/30 py-16">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 md:grid-cols-4">
            <CountStat value="200+" label="CLI Commands" />
            <CountStat value="50+" label="Challenges" />
            <CountStat value="10K+" label="Learners" />
            <CountStat value="6" label="CLI Domains" />
          </div>
        </section>
      </FadeInSection>

      {/* ═══ FEATURES GRID ═══ */}
      <section id="features" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Features</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Everything You Need to{' '}
              <span className="text-gradient-primary">Master CLIs</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-muted">
              From interactive sandboxes to AI-powered explanations — we built every feature
              to make you fluent in the command line.
            </p>
          </FadeInSection>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <FadeInSection key={feature.title} delay={i * 0.1}>
                  <div className="glass-card group relative overflow-hidden p-6">
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                      style={{ backgroundImage: `linear-gradient(135deg, var(--primary-glow), var(--accent-glow))` }} />
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                      {feature.description}
                    </p>
                  </div>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="relative border-y border-border bg-background-secondary/20 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">How It Works</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              From Zero to <span className="text-gradient-primary">CLI Hero</span>
            </h2>
          </FadeInSection>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <FadeInSection key={step.step} delay={i * 0.15}>
                <div className="glass-card relative p-6">
                  <span className="text-gradient-primary text-5xl font-black opacity-30">{step.step}</span>
                  <h3 className="mt-2 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{step.description}</p>
                  {i < steps.length - 1 && (
                    <ChevronRight className="absolute -right-4 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-foreground-subtle lg:block" />
                  )}
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="testimonials" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Testimonials</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Loved by <span className="text-gradient-primary">Developers</span>
            </h2>
          </FadeInSection>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <FadeInSection key={t.name} delay={i * 0.1}>
                <div className="glass-card flex flex-col p-6">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-foreground-muted">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background-tertiary text-lg">
                      {t.avatar}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-foreground-muted">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section className="relative overflow-hidden border-y border-border py-24 lg:py-32">
        <div className="absolute inset-0 hero-mesh" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        <FadeInSection className="relative">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 animate-pulse-glow">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Ready to Level Up Your{' '}
              <span className="text-gradient-primary">CLI Skills?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-foreground-muted">
              Join thousands of developers mastering the command line. Free to start, no credit card required.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-black transition-all duration-300 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/25"
              >
                <Flame className="h-5 w-5" />
                Start Your Journey
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-border bg-background-secondary/20 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2 font-bold">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                  <Terminal className="h-4 w-4 text-primary" />
                </span>
                <span>Terminal<span className="text-primary">Dojo</span></span>
              </Link>
              <p className="mt-3 text-sm text-foreground-muted">
                Master the command line through interactive practice and AI-powered learning.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-foreground-subtle">Platform</p>
              <ul className="mt-4 space-y-2 text-sm text-foreground-muted">
                <li><Link href="/explore" className="transition-colors hover:text-foreground">Explore Commands</Link></li>
                <li><Link href="/challenges" className="transition-colors hover:text-foreground">Challenges</Link></li>
                <li><Link href="/playground" className="transition-colors hover:text-foreground">Playground</Link></li>
                <li><Link href="/leaderboard" className="transition-colors hover:text-foreground">Leaderboard</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-foreground-subtle">Learn</p>
              <ul className="mt-4 space-y-2 text-sm text-foreground-muted">
                <li><Link href="/explore" className="transition-colors hover:text-foreground">Linux Commands</Link></li>
                <li><Link href="/explore" className="transition-colors hover:text-foreground">Git CLI</Link></li>
                <li><Link href="/explore" className="transition-colors hover:text-foreground">Docker CLI</Link></li>
                <li><Link href="/explore" className="transition-colors hover:text-foreground">Kubernetes</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-foreground-subtle">Connect</p>
              <div className="mt-4 flex gap-3">
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground-muted transition-all hover:border-border-hover hover:text-foreground">
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground-muted transition-all hover:border-border-hover hover:text-foreground">
                  <Globe className="h-4 w-4" />
                </a>
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground-muted transition-all hover:border-border-hover hover:text-foreground">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 text-center text-xs text-foreground-subtle">
            © {new Date().getFullYear()} TerminalDojo. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
