'use client'

import { useEffect, useRef, useCallback } from 'react'
import { Terminal as XTerm } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { WebLinksAddon } from '@xterm/addon-web-links'
import '@xterm/xterm/css/xterm.css'

export interface TerminalCommandResult {
  command: string
  success: boolean
  output?: string
  error?: string
  dangerLevel?: number
  cwd?: string
  clear?: boolean
}

interface TerminalEmulatorProps {
  className?: string
  onCommand?: (command: string) => void
  onCommandResult?: (result: TerminalCommandResult) => void
  sessionId?: string
}

const ANSI = {
  prompt: '\x1b[95m',
  command: '\x1b[96m',
  success: '\x1b[92m',
  error: '\x1b[91m',
  muted: '\x1b[90m',
  reset: '\x1b[0m',
}

const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms))

function promptString(cwd: string): string {
  return `${ANSI.prompt}sensei@dojo${ANSI.reset}:${ANSI.prompt}${cwd}${ANSI.reset}$ `
}

export function TerminalEmulator({ className, onCommand, onCommandResult, sessionId }: TerminalEmulatorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<XTerm | null>(null)
  const cwdRef = useRef('~')
  const disposedRef = useRef(false)
  const writingRef = useRef(false)

  const writePrompt = useCallback((newLine = true) => {
    const term = terminalRef.current
    if (!term) return
    if (newLine) {
      term.write('\r\n')
    }
    term.write(promptString(cwdRef.current))
  }, [])

  const writeAnimatedOutput = useCallback(async (text: string, kind: 'success' | 'error') => {
    const term = terminalRef.current
    if (!term || !text) return
    if (disposedRef.current) return

    const color = kind === 'error' ? ANSI.error : ANSI.success
    const safeText = text.replace(/\n/g, '\r\n')

    term.write(`\r\n${color}`)

    if (safeText.length > 1800) {
      term.write(safeText)
      term.write(ANSI.reset)
      return
    }

    writingRef.current = true
    const chunkSize = 16
    for (let i = 0; i < safeText.length; i += chunkSize) {
      if (disposedRef.current) break
      term.write(safeText.slice(i, i + chunkSize))
      await sleep(8)
    }
    writingRef.current = false
    term.write(ANSI.reset)
  }, [])

  const executeCommand = useCallback(async (command: string) => {
    const term = terminalRef.current
    if (!term || !command.trim()) {
      writePrompt()
      return
    }

    onCommand?.(command)

    try {
      const res = await fetch('/api/terminal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command, sessionId }),
      })

      const data = (await res.json()) as TerminalCommandResult

      if (!res.ok) {
        const message = data.error || 'Execution failed'
        await writeAnimatedOutput(message, 'error')
        onCommandResult?.({ command, success: false, error: message, dangerLevel: data.dangerLevel ?? 1, cwd: cwdRef.current })
        writePrompt()
        return
      }

      if (data.cwd) {
        cwdRef.current = data.cwd
      }

      if (data.clear) {
        term.clear()
        term.write(promptString(cwdRef.current))
        onCommandResult?.({ ...data, command, success: true })
        return
      }

      if (data.output) {
        await writeAnimatedOutput(data.output, 'success')
      }
      if (data.error) {
        await writeAnimatedOutput(data.error, 'error')
      }

      onCommandResult?.({
        command,
        success: Boolean(data.success),
        output: data.output,
        error: data.error,
        dangerLevel: data.dangerLevel ?? 1,
        cwd: data.cwd ?? cwdRef.current,
      })
    } catch {
      await writeAnimatedOutput('Connection error', 'error')
      onCommandResult?.({ command, success: false, error: 'Connection error', dangerLevel: 1, cwd: cwdRef.current })
    }

    writePrompt()
  }, [onCommand, onCommandResult, sessionId, writePrompt, writeAnimatedOutput])

  useEffect(() => {
    if (!containerRef.current) return

    disposedRef.current = false

    const term = new XTerm({
      theme: {
        background: '#030407',
        foreground: '#00ccff',
        cursor: '#ff00ff',
        cursorAccent: '#030407',
        selectionBackground: '#ff00ff33',
        black: '#030407',
        red: '#ff4444',
        green: '#00ff00',
        yellow: '#f59e0b',
        blue: '#00ccff',
        magenta: '#ff00ff',
        cyan: '#00ccff',
        white: '#d4d4d8',
      },
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      fontSize: 14,
      lineHeight: 1.4,
      cursorBlink: true,
      cursorStyle: 'bar',
      convertEol: true,
      allowTransparency: true,
    })

    const fitAddon = new FitAddon()
    const webLinksAddon = new WebLinksAddon()

    term.loadAddon(fitAddon)
    term.loadAddon(webLinksAddon)
    term.open(containerRef.current)

    try {
      fitAddon.fit()
    } catch {
      // ignore fit errors during init
    }

    terminalRef.current = term

    // Welcome message
    term.writeln(`${ANSI.muted}Type commands to practice. Use "help" for available commands.${ANSI.reset}`)
    term.writeln(`${ANSI.muted}────────────────────────────────────────────────────────${ANSI.reset}`)
    term.write(promptString(cwdRef.current))

    let line = ''
    let hIdx = -1
    const hist: string[] = []

    const dataDisposable = term.onData((data: string) => {
      if (writingRef.current) {
        return
      }

      const code = data.charCodeAt(0)

      if (data === '\r') {
        // Enter
        if (line.trim()) {
          hist.unshift(line)
        }
        hIdx = -1
        executeCommand(line)
        line = ''
      } else if (code === 12) {
        // Ctrl+L
        term.clear()
        term.write(promptString(cwdRef.current))
        line = ''
      } else if (code === 127) {
        // Backspace
        if (line.length > 0) {
          line = line.slice(0, -1)
          term.write('\b \b')
        }
      } else if (data === '\x1b[A') {
        // Up arrow — history
        if (hIdx < hist.length - 1) {
          hIdx++
          const cmd = hist[hIdx]
          // Clear current line
          term.write('\r\x1b[K')
          term.write(promptString(cwdRef.current) + `${ANSI.command}${cmd}${ANSI.reset}`)
          line = cmd
        }
      } else if (data === '\x1b[B') {
        // Down arrow
        if (hIdx > 0) {
          hIdx--
          const cmd = hist[hIdx]
          term.write('\r\x1b[K')
          term.write(promptString(cwdRef.current) + `${ANSI.command}${cmd}${ANSI.reset}`)
          line = cmd
        } else if (hIdx === 0) {
          hIdx = -1
          term.write('\r\x1b[K')
          term.write(promptString(cwdRef.current))
          line = ''
        }
      } else if (code >= 32) {
        // Printable character
        line += data
        term.write(`${ANSI.command}${data}${ANSI.reset}`)
      }
    })

    const fit = (): void => {
      try {
        fitAddon.fit()
      } catch {
        // ignore
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      fit()
    })
    resizeObserver.observe(containerRef.current)
    window.addEventListener('resize', fit)

    return () => {
      disposedRef.current = true
      dataDisposable.dispose()
      window.removeEventListener('resize', fit)
      resizeObserver.disconnect()
      term.dispose()
    }
  }, [executeCommand])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: '100%', minHeight: 300 }}
      aria-label="Cyberpunk dojo terminal"
    />
  )
}
