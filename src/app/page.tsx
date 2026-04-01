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
  Play,
  Code2,
  Users,
  TrendingUp,
} from 'lucide-react'
import { HeroTerminal } from '@/components/landing/hero-terminal'

function FadeInSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StatCard({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="glass-card-static relative overflow-hidden p-6 text-center"
    >
      <div className="surface-gradient absolute inset-0 opacity-50" />
      <div className="relative">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <p className="text-3xl font-black text-gradient-primary">{value}</p>
        <p className="mt-1 text-sm text-foreground-muted">{label}</p>
      </div>
    </motion.div>
  )
}

export default function LandingPage() {
  const features = [
    {
      icon: Terminal,
      title: 'Interactive Sandbox',
      description: 'Practice commands in a real terminal environment. Zero setup, instant feedback.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Brain,
      title: 'AI Command Explainer',
      description: 'Paste any command and get instant breakdowns with safety ratings and examples.',
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: Trophy,
      title: 'XP & Rankings',
      description: 'Earn points, unlock achievements, and compete on global leaderboards.',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Layers,
      title: '200+ Commands',
      description: 'Linux, Git, Docker, K8s, and more — all with real-world examples.',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Every command rated for danger level. Know what\'s safe before you run.',
      color: 'from-rose-500 to-red-500',
    },
    {
      icon: BookOpen,
      title: 'Guided Paths',
      description: 'Structured learning tracks from beginner to advanced. Learn in order.',
      color: 'from-indigo-500 to-blue-500',
    },
  ]

  const steps = [
    { step: '01', title: 'Choose a Command', description: 'Browse by category, difficulty, or use case.' },
    { step: '02', title: 'Learn the Syntax', description: 'Interactive examples with expected output.' },
    { step: '03', title: 'Practice in Sandbox', description: 'Run commands safely with instant feedback.' },
    { step: '04', title: 'Earn XP & Level Up', description: 'Complete challenges and climb rankings.' },
  ]

  const testimonials = [
    { name: 'Sarah K.', role: 'Junior Developer', text: 'TerminalDojo turned the terminal from scary to my favorite tool. The challenges are incredible.', avatar: '👩‍💻' },
    { name: 'Dev Patel', role: 'DevOps Engineer', text: 'Finally a platform that teaches Docker CLI properly. The sandbox is game-changing.', avatar: '🧑‍💻' },
    { name: 'Lisa Chen', role: 'CS Student', text: 'I went from googling every command to writing scripts in two weeks flat.', avatar: '👩‍🎓' },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* ── NAVBAR ── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass fixed inset-x-0 top-0 z-50"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30"
            >
              <Terminal className="h-5 w-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold tracking-tight">Terminal<span className="text-primary">Dojo</span></span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="nav-link text-sm font-medium">Features</a>
            <a href="#how-it-works" className="nav-link text-sm font-medium">How it Works</a>
            <a href="#testimonials" className="nav-link text-sm font-medium">Testimonials</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden text-sm font-medium text-foreground-muted transition-colors hover:text-foreground sm:block"
            >
              Sign in
            </Link>
            <Link
              href="/dashboard"
              className="btn-primary text-sm"
            >
              Start Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.header>

      {/* ── HERO SECTION ── */}
      <section className="hero-mesh relative flex min-h-screen items-center pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[120px] animate-float" />
          <div className="absolute right-1/4 top-1/2 h-[400px] w-[400px] rounded-full bg-accent/8 blur-[100px] animate-float-delayed" />
          <div className="absolute left-1/2 top-2/3 h-[300px] w-[300px] rounded-full bg-secondary/6 blur-[80px] animate-float" style={{ animationDelay: '-2s' }} />
          
          {/* Decorative orbs */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-1/4 top-1/4 h-3 w-3 rounded-full bg-primary"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-1/3 top-2/3 h-2 w-2 rounded-full bg-accent"
          />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl gap-16 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-powered explanations now available</span>
            </motion.div>

            <h1 className="text-5xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Master the
              <br />
              <span className="text-gradient-primary">Command Line</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-foreground-muted">
              Learn Linux, Git, Docker, and Kubernetes through interactive practice,
              AI guidance, and gamified progression. No setup required.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/dashboard"
                className="group btn-primary text-base"
              >
                Start Learning
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/explore"
                className="btn-secondary text-base"
              >
                <Play className="h-5 w-5" />
                Browse Commands
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-8 text-sm text-foreground-muted">
              <span className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success animate-glow-pulse" />
                <Zap className="h-4 w-4 text-primary" /> Instant access
              </span>
              <span className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success animate-glow-pulse" />
                <Shield className="h-4 w-4 text-primary" /> Safe sandbox
              </span>
              <span className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success animate-glow-pulse" />
                <Star className="h-4 w-4 text-primary" /> Free to start
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-8 rounded-3xl bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 blur-3xl" />
            <HeroTerminal />
          </motion.div>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section className="relative -mt-20 pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard value="200+" label="CLI Commands" icon={Code2} />
            <StatCard value="50+" label="Challenges" icon={Target} />
            <StatCard value="10K+" label="Learners" icon={Users} />
            <StatCard value="6" label="CLI Domains" icon={Layers} />
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section id="features" className="relative py-32">
        <div className="absolute inset-0 hero-mesh opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeInSection className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Features</p>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Everything You Need to
              <br />
              <span className="text-gradient-primary">Master CLIs</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-foreground-muted">
              Built for developers who want to go from terminal novice to command-line master.
            </p>
          </FadeInSection>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <FadeInSection key={feature.title} delay={i * 0.08}>
                  <div className="glass-card group relative overflow-hidden p-7 hover-lift">
                    <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${feature.color} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`} />
                    <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="mt-3 leading-relaxed text-foreground-muted">
                      {feature.description}
                    </p>
                  </div>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="relative border-y border-border bg-background-secondary/30 py-32">
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeInSection className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">How It Works</p>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              From Zero to <span className="text-gradient-primary">CLI Hero</span>
            </h2>
          </FadeInSection>

          <div className="relative grid gap-8 lg:grid-cols-4">
            {steps.map((step, i) => (
              <FadeInSection key={step.step} delay={i * 0.1}>
                <div className="glass-card-static relative p-7">
                  <div className="absolute -right-3 -top-3 text-7xl font-black text-primary/10">{step.step}</div>
                  <h3 className="relative text-xl font-bold">{step.title}</h3>
                  <p className="relative mt-2 text-foreground-muted">{step.description}</p>
                  {i < steps.length - 1 && (
                    <ChevronRight className="absolute -right-6 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-foreground-subtle lg:block" />
                  )}
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="relative py-32">
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeInSection className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Testimonials</p>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Loved by <span className="text-gradient-primary">Developers</span>
            </h2>
          </FadeInSection>

          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <FadeInSection key={t.name} delay={i * 0.1}>
                <div className="glass-card flex h-full flex-col p-7">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="flex-1 text-foreground-muted">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center gap-3 border-t border-border pt-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xl">
                      {t.avatar}
                    </span>
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-foreground-muted">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 hero-mesh" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[150px]" />
        
        <FadeInSection className="relative">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 animate-pulse-glow"
            >
              <Target className="h-10 w-10 text-primary" />
            </motion.div>
            
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Ready to Level Up?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-foreground-muted">
              Join thousands of developers mastering the command line. Free to start, no credit card required.
            </p>
            
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/dashboard"
                className="group btn-primary text-base"
              >
                <Flame className="h-5 w-5" />
                Start Your Journey
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-foreground-muted">
              <span className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-success" />
                Track progress
              </span>
              <span className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-xp-gold" />
                Earn badges
              </span>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border bg-background-secondary/30 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                  <Terminal className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">Terminal<span className="text-primary">Dojo</span></span>
              </Link>
              <p className="mt-4 max-w-sm text-sm text-foreground-muted">
                Master the command line through interactive practice and AI-powered learning.
              </p>
              <div className="mt-5 flex gap-3">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground-muted transition-all hover:border-primary hover:text-primary">
                  <ExternalLink className="h-5 w-5" />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground-muted transition-all hover:border-primary hover:text-primary">
                  <Globe className="h-5 w-5" />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground-muted transition-all hover:border-primary hover:text-primary">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground-subtle">Platform</p>
              <ul className="space-y-3 text-sm text-foreground-muted">
                <li><Link href="/explore" className="hover:text-primary transition-colors">Explore</Link></li>
                <li><Link href="/challenges" className="hover:text-primary transition-colors">Challenges</Link></li>
                <li><Link href="/playground" className="hover:text-primary transition-colors">Playground</Link></li>
                <li><Link href="/leaderboard" className="hover:text-primary transition-colors">Leaderboard</Link></li>
              </ul>
            </div>

            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground-subtle">Commands</p>
              <ul className="space-y-3 text-sm text-foreground-muted">
                <li><Link href="/explore" className="hover:text-primary transition-colors">Linux</Link></li>
                <li><Link href="/explore" className="hover:text-primary transition-colors">Git CLI</Link></li>
                <li><Link href="/explore" className="hover:text-primary transition-colors">Docker</Link></li>
                <li><Link href="/explore" className="hover:text-primary transition-colors">Kubernetes</Link></li>
              </ul>
            </div>

            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground-subtle">Company</p>
              <ul className="space-y-3 text-sm text-foreground-muted">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-foreground-subtle">
            © {new Date().getFullYear()} TerminalDojo. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
