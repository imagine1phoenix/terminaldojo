import { NextRequest, NextResponse } from 'next/server'
import { execSync } from 'child_process'
import { validateCommand, getAvailableCommands } from '@/lib/terminal/validator'
import { tmpdir } from 'os'
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const TIMEOUT = parseInt(process.env.TERMINAL_TIMEOUT_MS || '5000', 10)

function getSessionDir(sessionId: string): string {
  const dir = join(tmpdir(), 'terminaldojo', sessionId)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  return dir
}

function getCwdFile(sessionId: string): string {
  return join(getSessionDir(sessionId), '.cwd')
}

function getSessionCwd(sessionId: string): string {
  const baseDir = getSessionDir(sessionId)
  const cwdFile = getCwdFile(sessionId)

  if (!existsSync(cwdFile)) {
    writeFileSync(cwdFile, baseDir, 'utf-8')
    return baseDir
  }

  try {
    const stored = readFileSync(cwdFile, 'utf-8').trim()
    return stored || baseDir
  } catch {
    return baseDir
  }
}

function setSessionCwd(sessionId: string, cwd: string): void {
  const cwdFile = getCwdFile(sessionId)
  writeFileSync(cwdFile, cwd, 'utf-8')
}

function normalizePromptPath(sessionId: string, cwd: string): string {
  const baseDir = getSessionDir(sessionId)
  if (cwd === baseDir) return '~'
  if (cwd.startsWith(`${baseDir}/`)) {
    return `~/${cwd.slice(baseDir.length + 1)}`
  }
  return cwd
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { command, sessionId = 'default' } = await request.json()

    if (!command || typeof command !== 'string') {
      return NextResponse.json({ error: 'No command provided' }, { status: 400 })
    }

    const trimmed = command.trim()
    const cwd = getSessionCwd(sessionId)

    // Built-in shell navigation for persistent session context
    if (trimmed === 'cd' || trimmed.startsWith('cd ')) {
      const rawTarget = trimmed === 'cd' ? '~' : trimmed.slice(3).trim()
      const baseDir = getSessionDir(sessionId)
      const target = rawTarget === '~' ? baseDir : rawTarget

      const nextPath = target.startsWith('/') ? target : join(cwd, target)
      const normalized = nextPath.replace(/\/+/g, '/').replace(/\/\.\//g, '/').replace(/\/[^/]+\/\.\./g, '')

      if (!existsSync(normalized)) {
        return NextResponse.json({
          success: false,
          command: trimmed,
          dangerLevel: 1,
          cwd: normalizePromptPath(sessionId, cwd),
          error: `cd: no such file or directory: ${rawTarget}`,
        })
      }

      setSessionCwd(sessionId, normalized)

      return NextResponse.json({
        success: true,
        command: trimmed,
        dangerLevel: 1,
        cwd: normalizePromptPath(sessionId, normalized),
        output: '',
      })
    }

    // Built-in commands
    if (trimmed === 'help') {
      const cmds = getAvailableCommands()
      return NextResponse.json({
        success: true,
        command: trimmed,
        dangerLevel: 1,
        cwd: normalizePromptPath(sessionId, cwd),
        output: `Available commands:\n${cmds.join('  ')}\n\nType any command to practice. Commands run in a sandboxed environment.`,
      })
    }

    if (trimmed === 'clear') {
      return NextResponse.json({
        success: true,
        command: trimmed,
        clear: true,
        dangerLevel: 1,
        cwd: normalizePromptPath(sessionId, cwd),
      })
    }

    // Validate
    const validation = validateCommand(trimmed)
    if (!validation.allowed) {
      return NextResponse.json({
        success: false,
        command: trimmed,
        dangerLevel: validation.dangerLevel,
        cwd: normalizePromptPath(sessionId, cwd),
        error: validation.reason,
      })
    }

    // Execute in sandbox directory
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

      const latestCwd = getSessionCwd(sessionId)

      return NextResponse.json({
        success: true,
        command: trimmed,
        dangerLevel: validation.dangerLevel,
        cwd: normalizePromptPath(sessionId, latestCwd),
        output: output || '',
      })
    } catch (err: unknown) {
      const error = err as { stderr?: string; status?: number; message?: string }
      const stderr = error.stderr || error.message || 'Command failed'
      const latestCwd = getSessionCwd(sessionId)

      return NextResponse.json({
        success: false,
        command: trimmed,
        dangerLevel: validation.dangerLevel,
        cwd: normalizePromptPath(sessionId, latestCwd),
        error: stderr.slice(0, 1000),
      })
    }
  } catch (error) {
    console.error('[TERMINAL]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
