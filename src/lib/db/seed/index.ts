import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from '../schema'
import { categories, commands, commandFlags, commandExamples, challenges, badges, users } from '../schema'
import { hashSync } from 'bcryptjs'

async function seed(): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL not set')
    process.exit(1)
  }

  const sql = neon(databaseUrl)
  const db = drizzle(sql, { schema })

  console.log('🌱 Seeding database...')

  // ── Categories ──
  const [catLinux, catGit, catDocker, catK8s, catNetworking, catTextProcessing] = await db
    .insert(categories)
    .values([
      { name: 'Linux Core', slug: 'linux-core', description: 'Essential Linux/Unix commands', icon: '🐧', color: 'emerald', sortOrder: 1 },
      { name: 'Git CLI', slug: 'git-cli', description: 'Version control with Git', icon: '🌿', color: 'orange', sortOrder: 2 },
      { name: 'Docker', slug: 'docker', description: 'Container management commands', icon: '🐳', color: 'blue', sortOrder: 3 },
      { name: 'Kubernetes', slug: 'kubernetes', description: 'Cluster orchestration with kubectl', icon: '☸️', color: 'purple', sortOrder: 4 },
      { name: 'Networking', slug: 'networking', description: 'Network diagnostics and tools', icon: '🌐', color: 'cyan', sortOrder: 5 },
      { name: 'Text Processing', slug: 'text-processing', description: 'Text manipulation and analysis', icon: '📝', color: 'amber', sortOrder: 6 },
    ])
    .returning()

  console.log('  ✅ Categories seeded')

  // ── Commands ──
  const [cmdGrep, cmdFind, cmdAwk, cmdDockerRun, cmdKubectl, cmdGitRebase, cmdCurl, cmdSed, cmdChmod, cmdTar, cmdSsh, cmdXargs] = await db
    .insert(commands)
    .values([
      { categoryId: catLinux.id, name: 'grep', slug: 'grep', shortDescription: 'Search for patterns in files', syntaxTemplate: 'grep [OPTIONS] PATTERN [FILE...]', difficulty: 'beginner' as const, dangerLevel: 'safe' as const, fullDescription: 'grep searches for PATTERN in each FILE. By default, grep prints the matching lines. It supports basic and extended regular expressions.' },
      { categoryId: catLinux.id, name: 'find', slug: 'find', shortDescription: 'Find files and directories', syntaxTemplate: 'find [PATH] [EXPRESSION]', difficulty: 'beginner' as const, dangerLevel: 'safe' as const, fullDescription: 'find searches the directory tree rooted at each given starting-point by evaluating the given expression from left to right.' },
      { categoryId: catTextProcessing.id, name: 'awk', slug: 'awk', shortDescription: 'Process structured text by columns', syntaxTemplate: "awk [OPTIONS] 'PATTERN {ACTION}' [FILE...]", difficulty: 'advanced' as const, dangerLevel: 'safe' as const, fullDescription: 'awk is a powerful text-processing language. It scans each line, splits it into fields, and applies pattern-action pairs.' },
      { categoryId: catDocker.id, name: 'docker run', slug: 'docker-run', shortDescription: 'Start containers with custom options', syntaxTemplate: 'docker run [OPTIONS] IMAGE [COMMAND]', difficulty: 'intermediate' as const, dangerLevel: 'caution' as const, fullDescription: 'docker run creates and starts a new container from an image. You can configure networking, volumes, environment, and resource limits.' },
      { categoryId: catK8s.id, name: 'kubectl get', slug: 'kubectl-get', shortDescription: 'Inspect cluster resources', syntaxTemplate: 'kubectl get [RESOURCE] [FLAGS]', difficulty: 'intermediate' as const, dangerLevel: 'safe' as const, fullDescription: 'kubectl get displays one or many resources. Prints a table of the most relevant information about the specified resources.' },
      { categoryId: catGit.id, name: 'git rebase', slug: 'git-rebase', shortDescription: 'Reapply commits on another base', syntaxTemplate: 'git rebase [OPTIONS] [UPSTREAM]', difficulty: 'advanced' as const, dangerLevel: 'caution' as const, fullDescription: 'git rebase reapplies commits on top of another base tip. It can rewrite commit history.' },
      { categoryId: catNetworking.id, name: 'curl', slug: 'curl', shortDescription: 'Transfer data with URLs', syntaxTemplate: 'curl [OPTIONS] [URL]', difficulty: 'beginner' as const, dangerLevel: 'safe' as const, fullDescription: 'curl transfers data from or to a server using supported protocols including HTTP, HTTPS, FTP, and more.' },
      { categoryId: catTextProcessing.id, name: 'sed', slug: 'sed', shortDescription: 'Stream editor for text transformation', syntaxTemplate: "sed [OPTIONS] 'COMMAND' [FILE...]", difficulty: 'intermediate' as const, dangerLevel: 'safe' as const, fullDescription: 'sed is a stream editor used for text transformations on an input stream (a file or piped input).' },
      { categoryId: catLinux.id, name: 'chmod', slug: 'chmod', shortDescription: 'Change file permissions', syntaxTemplate: 'chmod [OPTIONS] MODE FILE', difficulty: 'beginner' as const, dangerLevel: 'caution' as const, fullDescription: 'chmod changes the file mode bits (permissions) of each given file.' },
      { categoryId: catLinux.id, name: 'tar', slug: 'tar', shortDescription: 'Archive and compress files', syntaxTemplate: 'tar [OPTIONS] [FILE...]', difficulty: 'beginner' as const, dangerLevel: 'safe' as const, fullDescription: 'tar creates, extracts, and manages archive files. Often combined with gzip or bzip2 compression.' },
      { categoryId: catNetworking.id, name: 'ssh', slug: 'ssh', shortDescription: 'Secure remote shell access', syntaxTemplate: 'ssh [OPTIONS] [USER@]HOST', difficulty: 'intermediate' as const, dangerLevel: 'safe' as const, fullDescription: 'ssh connects to a remote host securely using the SSH protocol for encrypted communication.' },
      { categoryId: catLinux.id, name: 'xargs', slug: 'xargs', shortDescription: 'Build command lines from stdin', syntaxTemplate: 'xargs [OPTIONS] [COMMAND]', difficulty: 'advanced' as const, dangerLevel: 'safe' as const, fullDescription: 'xargs reads items from standard input and executes a command with those items as arguments.' },
    ])
    .returning()

  console.log('  ✅ Commands seeded')

  // ── Flags for grep ──
  await db.insert(commandFlags).values([
    { commandId: cmdGrep.id, flag: '-i', description: 'Case-insensitive search', example: "grep -i 'error' log.txt", isCommon: true, sortOrder: 1 },
    { commandId: cmdGrep.id, flag: '-r', description: 'Recursive search through directories', example: "grep -r 'TODO' ./src", isCommon: true, sortOrder: 2 },
    { commandId: cmdGrep.id, flag: '-n', description: 'Show line numbers in output', example: "grep -n 'function' app.js", isCommon: true, sortOrder: 3 },
    { commandId: cmdGrep.id, flag: '-c', description: 'Count matching lines instead of printing', example: "grep -c 'error' server.log", isCommon: true, sortOrder: 4 },
    { commandId: cmdGrep.id, flag: '-v', description: 'Invert match — show non-matching lines', example: "grep -v 'debug' log.txt", isCommon: true, sortOrder: 5 },
    { commandId: cmdGrep.id, flag: '-l', description: 'Show only filenames with matches', example: "grep -rl 'password' /etc/", isCommon: true, sortOrder: 6 },
  ])

  // ── Flags for find ──
  await db.insert(commandFlags).values([
    { commandId: cmdFind.id, flag: '-name', description: 'Search by filename pattern', example: "find . -name '*.log'", isCommon: true, sortOrder: 1 },
    { commandId: cmdFind.id, flag: '-type', description: 'Filter by type (f=file, d=directory)', example: 'find /var -type d', isCommon: true, sortOrder: 2 },
    { commandId: cmdFind.id, flag: '-mtime', description: 'Find files modified N days ago', example: 'find . -mtime -7', isCommon: true, sortOrder: 3 },
    { commandId: cmdFind.id, flag: '-size', description: 'Filter by file size', example: 'find . -size +100M', isCommon: true, sortOrder: 4 },
    { commandId: cmdFind.id, flag: '-exec', description: 'Execute command on each match', example: "find . -name '*.tmp' -exec rm {} \\;", isCommon: true, sortOrder: 5 },
  ])

  // ── Flags for docker run ──
  await db.insert(commandFlags).values([
    { commandId: cmdDockerRun.id, flag: '-d', description: 'Run container in detached mode', example: 'docker run -d nginx', isCommon: true, sortOrder: 1 },
    { commandId: cmdDockerRun.id, flag: '-p', description: 'Map host port to container port', example: 'docker run -p 8080:80 nginx', isCommon: true, sortOrder: 2 },
    { commandId: cmdDockerRun.id, flag: '-v', description: 'Mount a volume', example: 'docker run -v ./data:/app/data myapp', isCommon: true, sortOrder: 3 },
    { commandId: cmdDockerRun.id, flag: '--name', description: 'Assign a name to the container', example: 'docker run --name myapp node:20', isCommon: true, sortOrder: 4 },
    { commandId: cmdDockerRun.id, flag: '-e', description: 'Set environment variables', example: 'docker run -e NODE_ENV=production myapp', isCommon: true, sortOrder: 5 },
  ])

  console.log('  ✅ Command flags seeded')

  // ── Examples for grep ──
  await db.insert(commandExamples).values([
    { commandId: cmdGrep.id, title: 'Search for errors in log file', commandText: "grep 'error' /var/log/syslog", explanation: 'Searches for the word error in the syslog file', expectedOutput: 'Mar 31 12:04:22 server error: connection timeout', sortOrder: 1 },
    { commandId: cmdGrep.id, title: 'Recursive search in source code', commandText: "grep -rn 'TODO' ./src/", explanation: 'Recursively search all files in src/ for TODO comments, showing line numbers', expectedOutput: './src/app.ts:42:  // TODO: add error handling', sortOrder: 2 },
    { commandId: cmdGrep.id, title: 'Count occurrences', commandText: "grep -c 'WARNING' server.log", explanation: 'Counts how many lines contain WARNING', expectedOutput: '23', sortOrder: 3 },
  ])

  // ── Examples for find ──
  await db.insert(commandExamples).values([
    { commandId: cmdFind.id, title: 'Find large files', commandText: 'find /var -size +100M -type f', explanation: 'Finds all files over 100MB in /var', expectedOutput: '/var/log/syslog.1\n/var/cache/apt/pkgcache.bin', sortOrder: 1 },
    { commandId: cmdFind.id, title: 'Find recently modified files', commandText: 'find . -mtime -1 -type f', explanation: 'Find files modified in the last 24 hours', expectedOutput: './src/app.ts\n./package.json', sortOrder: 2 },
  ])

  console.log('  ✅ Command examples seeded')

  // ── Challenges ──
  await db.insert(challenges).values([
    {
      title: 'Log File Detective',
      description: 'Find all .log files over 10MB in the /var directory',
      difficulty: 'intermediate' as const,
      xpReward: 40,
      category: 'Linux Core',
      estimatedTime: '~8 min',
      completionCount: 234,
      hints: ['Use the find command with -name and -size flags', 'The size flag uses + for greater than', "Try: find /var -name '*.log' -size +10M"],
      solutionCommands: ["find /var -name '*.log' -size +10M"],
      steps: ['Navigate to the root directory', 'Use find to locate .log files', 'Filter by size greater than 10MB'],
    },
    {
      title: 'Permission Fixer',
      description: 'Set correct permissions on a web server directory',
      difficulty: 'beginner' as const,
      xpReward: 25,
      category: 'Linux Core',
      estimatedTime: '~5 min',
      completionCount: 512,
      hints: ['chmod changes file permissions', '755 = rwxr-xr-x (owner can do all, others read+execute)'],
      solutionCommands: ['chmod 755 /var/www/html'],
      steps: ['Check current permissions with ls -la', 'Apply chmod 755 to the directory'],
    },
    {
      title: 'Docker Cleanup',
      description: 'Remove all stopped containers and unused images',
      difficulty: 'intermediate' as const,
      xpReward: 35,
      category: 'Docker',
      estimatedTime: '~6 min',
      completionCount: 189,
      hints: ['docker system prune removes unused data', 'Add -a flag to remove all unused images, not just dangling ones'],
      solutionCommands: ['docker system prune -af'],
      steps: ['List all containers', 'Remove stopped containers', 'Remove unused images'],
    },
    {
      title: 'Git History Surgery',
      description: 'Squash the last 3 commits into one meaningful commit',
      difficulty: 'advanced' as const,
      xpReward: 60,
      category: 'Git CLI',
      estimatedTime: '~12 min',
      completionCount: 98,
      hints: ['Use git rebase -i (interactive rebase)', 'HEAD~3 means the last 3 commits', 'Change "pick" to "squash" for commits to merge'],
      solutionCommands: ['git rebase -i HEAD~3'],
      steps: ['View recent commit history', 'Start interactive rebase', 'Mark commits to squash', 'Write new commit message'],
    },
    {
      title: 'Network Troubleshooter',
      description: 'Diagnose a connection issue to a remote server using network tools',
      difficulty: 'intermediate' as const,
      xpReward: 45,
      category: 'Networking',
      estimatedTime: '~10 min',
      completionCount: 156,
      hints: ['curl can test HTTP connections', 'Use -I to fetch headers only'],
      solutionCommands: ['curl -I https://api.example.com'],
      steps: ['Test basic connectivity', 'Check DNS resolution', 'Inspect HTTP headers'],
    },
    {
      title: 'Text Pipeline Master',
      description: 'Extract and sort unique IP addresses from an access log',
      difficulty: 'advanced' as const,
      xpReward: 55,
      category: 'Text Processing',
      estimatedTime: '~15 min',
      completionCount: 73,
      hints: ['Use awk to extract the first field', 'Pipe through sort and uniq'],
      solutionCommands: ["awk '{print $1}' access.log | sort | uniq -c | sort -rn"],
      steps: ['Extract IP column with awk', 'Sort and deduplicate', 'Count occurrences'],
    },
    {
      title: 'Kubernetes Pod Inspector',
      description: 'Find all pods in CrashLoopBackOff state across all namespaces',
      difficulty: 'advanced' as const,
      xpReward: 50,
      category: 'Kubernetes',
      estimatedTime: '~10 min',
      completionCount: 112,
      hints: ['kubectl get pods lists pods', '--all-namespaces shows everything', 'Use grep to filter by status'],
      solutionCommands: ["kubectl get pods --all-namespaces | grep CrashLoopBackOff"],
      steps: ['List all pods across namespaces', 'Filter for CrashLoopBackOff status'],
    },
    {
      title: 'Secret Finder',
      description: 'Find all files containing API keys or passwords in a project',
      difficulty: 'intermediate' as const,
      xpReward: 35,
      category: 'Linux Core',
      estimatedTime: '~7 min',
      completionCount: 267,
      hints: ["Use grep with -r for recursive search", "Search for patterns like 'password' or 'api_key'"],
      solutionCommands: ["grep -rn --include='*.env' -i 'password\\|api_key\\|secret' ."],
      steps: ['Search recursively for sensitive patterns', 'Filter by file type', 'Review matches'],
    },
  ])

  console.log('  ✅ Challenges seeded')

  // ── Badges ──
  await db.insert(badges).values([
    { name: 'First Command', description: 'Practiced your first command', icon: '🎯', xpReward: 10, rarity: 'common' as const },
    { name: 'Streak Starter', description: 'Maintained a 3-day streak', icon: '🔥', xpReward: 20, rarity: 'common' as const },
    { name: 'Week Warrior', description: 'Maintained a 7-day streak', icon: '⚡', xpReward: 50, rarity: 'rare' as const },
    { name: 'Grep Master', description: 'Completed all grep challenges', icon: '🔍', xpReward: 75, rarity: 'rare' as const },
    { name: 'Pipeline Pro', description: 'Used 5 piped commands successfully', icon: '🔗', xpReward: 100, rarity: 'epic' as const },
    { name: 'Terminal Sage', description: 'Reached Level 10', icon: '🧙', xpReward: 200, rarity: 'legendary' as const },
  ])

  console.log('  ✅ Badges seeded')

  // ── Demo user ──
  await db.insert(users).values({
    email: 'alex@example.com',
    username: 'alexchen',
    displayName: 'Alex Chen',
    passwordHash: hashSync('password123', 10),
    level: 5,
    totalXp: 1240,
    currentStreak: 7,
    longestStreak: 14,
  })

  console.log('  ✅ Demo user seeded (alex@example.com / password123)')
  console.log('✅ Seeding complete!')
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
