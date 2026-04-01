'use client'

import React from 'react'

interface TerminalErrorBoundaryProps {
  children: React.ReactNode
}

interface TerminalErrorBoundaryState {
  hasError: boolean
}

export class TerminalErrorBoundary extends React.Component<
  TerminalErrorBoundaryProps,
  TerminalErrorBoundaryState
> {
  state: TerminalErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): TerminalErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('[TERMINAL_BOUNDARY]', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full min-h-[360px] items-center justify-center rounded-2xl border border-red-500/40 bg-[#12070a] p-6 text-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-red-300">Terminal Failure</p>
            <p className="mt-2 text-sm text-red-100/90">The dojo terminal encountered an issue and could not render.</p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 rounded-lg border border-red-400/40 bg-red-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-red-100"
            >
              Retry Terminal
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
