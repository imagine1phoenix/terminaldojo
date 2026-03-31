'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Terminal, Palette, Bell, Shield, LogOut } from 'lucide-react'

const shells = ['bash', 'zsh', 'fish', 'sh']
const themes = ['Dark', 'Light', 'System']

export default function SettingsPage() {
  const [selectedShell, setSelectedShell] = useState('zsh')
  const [selectedTheme, setSelectedTheme] = useState('Dark')
  const [notifications, setNotifications] = useState({ daily: true, streak: true, badges: true, weekly: false })

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      {/* Header */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-background-secondary/80 to-background-tertiary/30 p-6 md:p-8">
        <h1 className="text-3xl font-black tracking-tight md:text-4xl">Settings</h1>
        <p className="mt-2 text-foreground-muted">
          Manage your profile, shell preferences, and account settings.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile */}
        <section className="glass-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <User className="h-5 w-5 text-primary" /> Profile
          </h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-2xl font-bold text-black">
              A
            </div>
            <div>
              <p className="text-lg font-bold">Alex Chen</p>
              <p className="text-sm text-foreground-muted">@alexchen</p>
              <p className="mt-1 text-xs text-foreground-subtle">Level 5 · Bash Enthusiast</p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div>
              <label className="text-xs font-semibold text-foreground-subtle">Display Name</label>
              <input defaultValue="Alex Chen" className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-all focus:border-primary/40 focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground-subtle">Email</label>
              <input defaultValue="alex@example.com" className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-all focus:border-primary/40 focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
        </section>

        {/* Shell Preference */}
        <section className="glass-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Terminal className="h-5 w-5 text-primary" /> Preferred Shell
          </h2>
          <p className="mt-1 text-sm text-foreground-muted">
            Choose which shell environment to use in the sandbox.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {shells.map((shell) => (
              <button
                key={shell}
                onClick={() => setSelectedShell(shell)}
                className={`rounded-xl border px-4 py-3 text-left font-mono text-sm font-semibold transition-all ${
                  selectedShell === shell
                    ? 'border-primary/40 bg-primary/10 text-primary'
                    : 'border-border text-foreground-muted hover:border-border-hover hover:text-foreground'
                }`}
              >
                $ {shell}
              </button>
            ))}
          </div>
          {/* Terminal preview */}
          <div className="mt-4 rounded-xl border border-border bg-terminal-bg p-3 font-mono text-xs text-terminal-text">
            <p>
              <span className="text-terminal-prompt">learner@dojo</span>
              <span className="text-zinc-500">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-zinc-500">$ </span>
              echo $SHELL
            </p>
            <p className="text-zinc-400">/bin/{selectedShell}</p>
          </div>
        </section>

        {/* Theme */}
        <section className="glass-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Palette className="h-5 w-5 text-primary" /> Theme
          </h2>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {themes.map((theme) => (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                  selectedTheme === theme
                    ? 'border-primary/40 bg-primary/10 text-primary'
                    : 'border-border text-foreground-muted hover:border-border-hover hover:text-foreground'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </section>

        {/* Notifications */}
        <section className="glass-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Bell className="h-5 w-5 text-primary" /> Notifications
          </h2>
          <div className="mt-4 space-y-3">
            {[
              { key: 'daily', label: 'Daily challenge reminders' },
              { key: 'streak', label: 'Streak at risk alerts' },
              { key: 'badges', label: 'Badge earned notifications' },
              { key: 'weekly', label: 'Weekly progress report' },
            ].map((n) => (
              <div key={n.key} className="flex items-center justify-between">
                <span className="text-sm text-foreground-muted">{n.label}</span>
                <button
                  onClick={() => setNotifications((p) => ({ ...p, [n.key]: !p[n.key as keyof typeof p] }))}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    notifications[n.key as keyof typeof notifications] ? 'bg-primary' : 'bg-background-tertiary'
                  }`}
                >
                  <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    notifications[n.key as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Account actions */}
      <section className="glass-card p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Shield className="h-5 w-5 text-primary" /> Account
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground-muted transition-all hover:border-border-hover hover:text-foreground">
            Change Password
          </button>
          <button className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground-muted transition-all hover:border-border-hover hover:text-foreground">
            Export Data
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/5 px-5 py-2.5 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/10">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </section>
    </motion.div>
  )
}
