import { NextRequest, NextResponse } from 'next/server'
import { execSync } from 'child_process'
import { validateCommand, getAvailableCommands } from '@/lib/terminal/validator'
import { tmpdir } from 'os'
import { mkdirSync, existsSync } from 'fs'
import { join } from 'path'

const TIMEOUT = parseInt(process.env.TERMINAL_TIMEOUT_MS || '5000', 10)

function getSessionDir(sessionId: string): string {
  const dir = join(tmpdir(), 'terminaldojo', sessionId)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  return dir
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { command, sessionId = 'default' } = await request.json()

    if (!command || typeof command !== 'string') {
      return NextResponse.json({ error: 'No command provided' }, { status: 400 })
    }

    const trimmed = command.trim()

    // Built-in commands
    if (trimmed === 'help') {
      const cmds = getAvailableCommands()
      return NextResponse.json({
        output: `Available commands:\n${cmds.join('  ')}\n\nType any command to practice. Commands run in a sandboxed environment.`,
      })
    }

    if (trimmed === 'clear') {
      return NextResponse.json({ clear: true })
    }

    // Validate
    const validation = validateCommand(trimmed)
    if (!validation.allowed) {
      return NextResponse.json({ error: validation.reason })
    }

    // Execute in sandbox directory
    const cwd = getSessionDir(sessionId)

    try {
      const output = execSync(trimmed, {
        cwd,
        timeout: TIMEOUT,
        encoding: 'utf-8',
        env: {
          ...process.env,
          HOME: cwd,
          USER: 'learner',
          SHELL: '/bin/bash',
          PATH: '/usr/local/bin:/usr/bin:/bin',
        },
        maxBuffer: 1024 * 512, // 512KB
        stdio: ['pipe', 'pipe', 'pipe'],
      })

      return NextResponse.json({ output: output || '' })
    } catch (err: unknown) {
      const error = err as { stderr?: string; status?: number; message?: string }
      const stderr = error.stderr || error.message || 'Command failed'
      return NextResponse.json({ error: stderr.slice(0, 1000) })
    }
  } catch (error) {
    console.error('[TERMINAL]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
