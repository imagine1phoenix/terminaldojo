const WHITELIST = new Set([
  'ls', 'cat', 'echo', 'pwd', 'whoami', 'date', 'cal', 'uptime',
  'head', 'tail', 'wc', 'sort', 'uniq', 'tr', 'cut', 'paste',
  'grep', 'find', 'awk', 'sed', 'xargs',
  'mkdir', 'touch', 'cp', 'mv', 'ln',
  'chmod', 'chown',
  'diff', 'comm',
  'tar', 'gzip', 'gunzip',
  'env', 'export', 'printenv',
  'which', 'type', 'file', 'stat',
  'du', 'df',
  'basename', 'dirname', 'realpath',
  'seq', 'yes', 'true', 'false',
  'tee', 'rev', 'fold', 'fmt',
  'man', 'help', 'clear',
])

const BLACKLIST_PATTERNS = [
  /rm\s+(-rf?|--recursive)\s+\//,
  /sudo/,
  /shutdown/,
  /reboot/,
  /mkfs/,
  /dd\s+if=/,
  />\s*\/dev\//,
  /:()\s*{\s*:\|:\s*&\s*}/,  // fork bomb
  /curl.*\|\s*sh/,
  /wget.*\|\s*sh/,
  /eval\s/,
  /exec\s/,
  /\bkill\b/,
  /\bpkill\b/,
  /\bkillall\b/,
]

export interface ValidationResult {
  allowed: boolean
  reason?: string
  dangerLevel: number
}

export function validateCommand(input: string): ValidationResult {
  const trimmed = input.trim()

  if (!trimmed) {
    return { allowed: false, reason: 'Empty command', dangerLevel: 0 }
  }

  // Check blacklist patterns first
  for (const pattern of BLACKLIST_PATTERNS) {
    if (pattern.test(trimmed)) {
      return {
        allowed: false,
        reason: `Blocked: potentially dangerous operation`,
        dangerLevel: 5,
      }
    }
  }

  // Extract the base command (first word, handle pipes)
  const parts = trimmed.split(/\s*\|\s*/)
  for (const part of parts) {
    const baseCmd = part.trim().split(/\s+/)[0]
    if (!WHITELIST.has(baseCmd)) {
      return {
        allowed: false,
        reason: `Command '${baseCmd}' is not available in the sandbox. Use 'help' to see available commands.`,
        dangerLevel: 2,
      }
    }
  }

  // Check for cautious patterns
  const isCautious = /rm\s/.test(trimmed) || /chmod\s+7/.test(trimmed) || />\s/.test(trimmed)

  return {
    allowed: true,
    dangerLevel: isCautious ? 3 : 1,
  }
}

export function getAvailableCommands(): string[] {
  return Array.from(WHITELIST).sort()
}
