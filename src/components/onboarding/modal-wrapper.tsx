'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ModalWrapperProps {
  children: React.ReactNode
  className?: string
}

export function ModalWrapper({ children, className }: ModalWrapperProps) {
  return (
    <div className="relative min-h-[calc(100vh-7rem)] overflow-hidden rounded-3xl border border-white/10 bg-[#03040a]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_90%_12%,rgba(0,204,255,0.15),transparent_35%),radial-gradient(circle_at_40%_95%,rgba(255,0,80,0.15),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.75))]" />

      <div className="relative z-10 grid min-h-[calc(100vh-7rem)] place-items-center p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className={cn('onboarding-brush-frame w-full max-w-4xl rounded-3xl bg-[#080b13]/92 p-5 sm:p-7', className)}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
