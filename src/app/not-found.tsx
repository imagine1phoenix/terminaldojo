'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="hero-mesh relative flex min-h-screen flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-background-secondary">
          <Terminal className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-gradient-primary text-7xl font-black tracking-tight">404</h1>
        <p className="mt-4 text-xl text-foreground-muted">
          Command not found. This path doesn&apos;t exist.
        </p>
        <div className="mt-6 rounded-xl border border-border bg-terminal-bg p-4 font-mono text-sm">
          <p className="text-terminal-prompt">learner@terminaldojo:~$</p>
          <p className="mt-1 text-red-400">bash: page: No such file or directory</p>
        </div>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20"
        >
          Return to home
        </Link>
      </motion.div>
    </div>
  )
}
