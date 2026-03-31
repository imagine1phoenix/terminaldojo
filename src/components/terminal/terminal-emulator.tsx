'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { Terminal as XTerm } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { WebLinksAddon } from '@xterm/addon-web-links'
import '@xterm/xterm/css/xterm.css'

interface TerminalEmulatorProps {
  className?: string
  onCommand?: (command: string) => void
  sessionId?: string
}

export function TerminalEmulator({ className, onCommand, sessionId }: TerminalEmulatorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<XTerm | null>(null)
  const fitAddonRef = useRef<FitAddon | null>(null)
  const [currentLine, setCurrentLine] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [cwd, setCwd] = useState('~')

  const prompt = useCallback(() => {
    const term = terminalRef.current
    if (!term) return
    term.write(`\r\n\x1b[32mlearner@dojo\x1b[0m:\x1b[34m${cwd}\x1b[0m$ `)
  }, [cwd])

  const executeCommand = useCallback(async (command: string) => {
    const term = terminalRef.current
    if (!term || !command.trim()) {
      prompt()
      return
    }

    onCommand?.(command)

    try {
      const res = await fetch('/api/terminal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command, sessionId }),
      })

      const data = await res.json()

      if (data.output) {
        term.write(`\r\n${data.output}`)
      }
      if (data.cwd) {
        setCwd(data.cwd)
      }
      if (data.error) {
        term.write(`\r\n\x1b[31m${data.error}\x1b[0m`)
      }
    } catch {
      term.write('\r\n\x1b[31mConnection error\x1b[0m')
    }

    prompt()
  }, [onCommand, sessionId, prompt])

  useEffect(() => {
    if (!containerRef.current) return

    const term = new XTerm({
      theme: {
        background: '#0a0e14',
        foreground: '#d4d4d8',
        cursor: '#10b981',
        cursorAccent: '#0a0e14',
        selectionBackground: '#10b98133',
        black: '#0a0e14',
        red: '#ef4444',
        green: '#10b981',
        yellow: '#f59e0b',
        blue: '#3b82f6',
        magenta: '#a855f7',
        cyan: '#06b6d4',
        white: '#d4d4d8',
      },
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      fontSize: 14,
      lineHeight: 1.4,
      cursorBlink: true,
      cursorStyle: 'block',
      convertEol: true,
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
    fitAddonRef.current = fitAddon

    // Welcome message
    term.writeln('\x1b[1;32mTerminalDojo Sandbox\x1b[0m')
    term.writeln('\x1b[90mType commands to practice. Use "help" for available commands.\x1b[0m')
    term.writeln('\x1b[90m─────────────────────────────────────\x1b[0m')
    term.write(`\x1b[32mlearner@dojo\x1b[0m:\x1b[34m~\x1b[0m$ `)

    let line = ''
    let hIdx = -1
    const hist: string[] = []

    term.onData((data: string) => {
      const code = data.charCodeAt(0)

      if (data === '\r') {
        // Enter
        if (line.trim()) {
          hist.unshift(line)
        }
        hIdx = -1
        executeCommand(line)
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
          term.write(`\x1b[32mlearner@dojo\x1b[0m:\x1b[34m~\x1b[0m$ ${cmd}`)
          line = cmd
        }
      } else if (data === '\x1b[B') {
        // Down arrow
        if (hIdx > 0) {
          hIdx--
          const cmd = hist[hIdx]
          term.write('\r\x1b[K')
          term.write(`\x1b[32mlearner@dojo\x1b[0m:\x1b[34m~\x1b[0m$ ${cmd}`)
          line = cmd
        } else if (hIdx === 0) {
          hIdx = -1
          term.write('\r\x1b[K')
          term.write(`\x1b[32mlearner@dojo\x1b[0m:\x1b[34m~\x1b[0m$ `)
          line = ''
        }
      } else if (code >= 32) {
        // Printable character
        line += data
        term.write(data)
      }
    })

    const handleResize = (): void => {
      try {
        fitAddon.fit()
      } catch {
        // ignore
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      term.dispose()
    }
  }, [executeCommand, prompt])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: '100%', minHeight: 300 }}
    />
  )
}
