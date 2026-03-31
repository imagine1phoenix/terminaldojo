// TerminalDojo — Mock Data

export interface CommandItem {
  id: string
  name: string
  slug: string
  description: string
  category: string
  categoryIcon: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  status: 'not_started' | 'in_progress' | 'completed'
  dangerLevel: 'safe' | 'caution' | 'dangerous'
  flags: { flag: string; description: string }[]
  examples: { command: string; description: string; output?: string }[]
}

export interface ChallengeItem {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  xp: number
  category: string
  estimatedTime: string
  completions: number
  steps: string[]
}

export interface LeaderboardUser {
  rank: number
  name: string
  avatar: string
  level: number
  levelTitle: string
  xp: number
  streak: number
  badges: number
}

export interface BadgeItem {
  id: string
  name: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  earned: boolean
}

export interface ActivityDay {
  date: string
  count: number
}

export const userProfile = {
  name: 'Alex Chen',
  username: 'alexchen',
  avatar: '🥷',
  level: 5,
  levelTitle: 'Bash Enthusiast',
  totalXp: 1240,
  nextLevelXp: 1500,
  currentStreak: 7,
  longestStreak: 14,
  commandsLearned: 42,
  challengesSolved: 18,
  joinedDate: '2025-12-01',
  preferredShell: 'zsh',
}

export const commandItems: CommandItem[] = [
  {
    id: '1',
    name: 'grep',
    slug: 'grep',
    description: 'Search for patterns in files using regular expressions',
    category: 'Linux Core',
    categoryIcon: '🐧',
    difficulty: 'beginner',
    status: 'completed',
    dangerLevel: 'safe',
    flags: [
      { flag: '-r', description: 'Search recursively through directories' },
      { flag: '-i', description: 'Case-insensitive matching' },
      { flag: '-n', description: 'Show line numbers in output' },
      { flag: '-l', description: 'Show only filenames with matches' },
      { flag: '-c', description: 'Count matching lines per file' },
      { flag: '-v', description: 'Invert match — show non-matching lines' },
    ],
    examples: [
      { command: "grep -rn 'TODO' src/", description: 'Find all TODO comments in source code', output: 'src/app.ts:34:// TODO: add validation' },
      { command: "grep -i 'error' /var/log/syslog", description: 'Search for errors in system log (case-insensitive)' },
      { command: "grep -c 'import' *.ts", description: 'Count import statements per TypeScript file' },
    ],
  },
  {
    id: '2',
    name: 'find',
    slug: 'find',
    description: 'Search for files and directories in the filesystem',
    category: 'Linux Core',
    categoryIcon: '🐧',
    difficulty: 'beginner',
    status: 'in_progress',
    dangerLevel: 'safe',
    flags: [
      { flag: '-name', description: 'Search by filename pattern' },
      { flag: '-type', description: 'Filter by type (f=file, d=directory)' },
      { flag: '-size', description: 'Filter by file size' },
      { flag: '-mtime', description: 'Filter by modification time' },
      { flag: '-exec', description: 'Execute command on each result' },
    ],
    examples: [
      { command: "find . -name '*.log' -size +10M", description: 'Find log files larger than 10MB' },
      { command: 'find /tmp -type f -mtime +7 -delete', description: 'Delete temp files older than 7 days' },
    ],
  },
  {
    id: '3',
    name: 'awk',
    slug: 'awk',
    description: 'Process and analyze structured text data by columns',
    category: 'Text Processing',
    categoryIcon: '📝',
    difficulty: 'advanced',
    status: 'not_started',
    dangerLevel: 'safe',
    flags: [
      { flag: '-F', description: 'Set field separator' },
      { flag: '-v', description: 'Set variable before execution' },
    ],
    examples: [
      { command: "awk '{print $1, $3}' data.csv", description: 'Print first and third columns' },
      { command: "awk -F: '{print $1}' /etc/passwd", description: 'List all usernames from passwd file' },
    ],
  },
  {
    id: '4',
    name: 'docker run',
    slug: 'docker-run',
    description: 'Create and start a new container from an image',
    category: 'Docker',
    categoryIcon: '🐳',
    difficulty: 'intermediate',
    status: 'not_started',
    dangerLevel: 'caution',
    flags: [
      { flag: '-d', description: 'Run container in background (detached)' },
      { flag: '-p', description: 'Publish container port to host' },
      { flag: '-v', description: 'Mount a volume' },
      { flag: '--name', description: 'Assign a name to the container' },
      { flag: '-e', description: 'Set environment variables' },
      { flag: '--rm', description: 'Automatically remove container when it stops' },
    ],
    examples: [
      { command: 'docker run -d -p 3000:3000 --name myapp node:18', description: 'Run Node.js container on port 3000' },
      { command: 'docker run --rm -it ubuntu bash', description: 'Start interactive Ubuntu shell' },
    ],
  },
  {
    id: '5',
    name: 'kubectl get',
    slug: 'kubectl-get',
    description: 'List and inspect Kubernetes cluster resources',
    category: 'Kubernetes',
    categoryIcon: '☸️',
    difficulty: 'intermediate',
    status: 'in_progress',
    dangerLevel: 'safe',
    flags: [
      { flag: '-n', description: 'Specify namespace' },
      { flag: '-o', description: 'Output format (yaml, json, wide)' },
      { flag: '--all-namespaces', description: 'List across all namespaces' },
      { flag: '-l', description: 'Filter by label selector' },
    ],
    examples: [
      { command: 'kubectl get pods -n production', description: 'List pods in production namespace' },
      { command: 'kubectl get svc -o wide', description: 'Show services with extra details' },
    ],
  },
  {
    id: '6',
    name: 'git rebase',
    slug: 'git-rebase',
    description: 'Reapply commits on top of another base branch',
    category: 'Git CLI',
    categoryIcon: '🌿',
    difficulty: 'advanced',
    status: 'not_started',
    dangerLevel: 'caution',
    flags: [
      { flag: '-i', description: 'Interactive rebase — edit, squash, reorder commits' },
      { flag: '--onto', description: 'Rebase onto a specific commit' },
      { flag: '--continue', description: 'Continue after resolving conflicts' },
      { flag: '--abort', description: 'Cancel the rebase and restore original state' },
    ],
    examples: [
      { command: 'git rebase -i HEAD~3', description: 'Interactively edit the last 3 commits' },
      { command: 'git rebase main', description: 'Rebase current branch onto main' },
    ],
  },
  {
    id: '7',
    name: 'curl',
    slug: 'curl',
    description: 'Transfer data to or from a server using various protocols',
    category: 'Networking',
    categoryIcon: '🌐',
    difficulty: 'beginner',
    status: 'completed',
    dangerLevel: 'safe',
    flags: [
      { flag: '-X', description: 'Specify HTTP method (GET, POST, PUT, DELETE)' },
      { flag: '-H', description: 'Add custom headers' },
      { flag: '-d', description: 'Send data in request body' },
      { flag: '-o', description: 'Write output to file' },
      { flag: '-v', description: 'Verbose output for debugging' },
      { flag: '-s', description: 'Silent mode — suppress progress bar' },
    ],
    examples: [
      { command: 'curl -s https://api.github.com/users/octocat | jq .name', description: 'Fetch GitHub user info and extract name' },
      { command: "curl -X POST -H 'Content-Type: application/json' -d '{\"key\":\"value\"}' https://api.example.com", description: 'Send a JSON POST request' },
    ],
  },
  {
    id: '8',
    name: 'chmod',
    slug: 'chmod',
    description: 'Change file and directory access permissions',
    category: 'Linux Core',
    categoryIcon: '🐧',
    difficulty: 'beginner',
    status: 'completed',
    dangerLevel: 'caution',
    flags: [
      { flag: '-R', description: 'Apply permissions recursively' },
      { flag: '+x', description: 'Add execute permission' },
      { flag: '755', description: 'Owner full, group/others read+execute' },
    ],
    examples: [
      { command: 'chmod +x deploy.sh', description: 'Make a script executable' },
      { command: 'chmod -R 755 /var/www', description: 'Set web directory permissions recursively' },
    ],
  },
  {
    id: '9',
    name: 'ssh',
    slug: 'ssh',
    description: 'Securely connect to remote servers over encrypted connections',
    category: 'Networking',
    categoryIcon: '🌐',
    difficulty: 'intermediate',
    status: 'in_progress',
    dangerLevel: 'safe',
    flags: [
      { flag: '-i', description: 'Specify identity (private key) file' },
      { flag: '-p', description: 'Connect on a specific port' },
      { flag: '-L', description: 'Local port forwarding' },
      { flag: '-v', description: 'Verbose mode for debugging' },
    ],
    examples: [
      { command: 'ssh -i ~/.ssh/mykey.pem user@192.168.1.100', description: 'Connect with a specific key file' },
      { command: 'ssh -L 3000:localhost:3000 dev@server', description: 'Forward local port 3000 to remote' },
    ],
  },
  {
    id: '10',
    name: 'tar',
    slug: 'tar',
    description: 'Archive and compress files into tarballs',
    category: 'Linux Core',
    categoryIcon: '🐧',
    difficulty: 'beginner',
    status: 'not_started',
    dangerLevel: 'safe',
    flags: [
      { flag: '-c', description: 'Create a new archive' },
      { flag: '-x', description: 'Extract files from archive' },
      { flag: '-z', description: 'Compress with gzip' },
      { flag: '-f', description: 'Specify archive filename' },
      { flag: '-v', description: 'Verbose — list files processed' },
    ],
    examples: [
      { command: 'tar -czf backup.tar.gz /home/user/docs', description: 'Create compressed backup of docs folder' },
      { command: 'tar -xzf archive.tar.gz -C /tmp/', description: 'Extract archive to /tmp directory' },
    ],
  },
  {
    id: '11',
    name: 'tmux',
    slug: 'tmux',
    description: 'Terminal multiplexer for managing multiple sessions',
    category: 'Power Tools',
    categoryIcon: '⚡',
    difficulty: 'intermediate',
    status: 'not_started',
    dangerLevel: 'safe',
    flags: [
      { flag: 'new -s', description: 'Create named session' },
      { flag: 'attach -t', description: 'Attach to existing session' },
      { flag: 'ls', description: 'List all sessions' },
    ],
    examples: [
      { command: 'tmux new -s dev', description: 'Start a new session named "dev"' },
      { command: 'tmux attach -t dev', description: 'Re-attach to the dev session' },
    ],
  },
  {
    id: '12',
    name: 'jq',
    slug: 'jq',
    description: 'Command-line JSON processor for parsing and transforming data',
    category: 'Power Tools',
    categoryIcon: '⚡',
    difficulty: 'intermediate',
    status: 'not_started',
    dangerLevel: 'safe',
    flags: [
      { flag: '.key', description: 'Access object property' },
      { flag: '.[]', description: 'Iterate array elements' },
      { flag: '-r', description: 'Raw output without quotes' },
      { flag: 'select()', description: 'Filter elements by condition' },
    ],
    examples: [
      { command: "cat data.json | jq '.users[] | .name'", description: 'Extract all user names from JSON' },
      { command: "curl -s api.example.com | jq '.results | length'", description: 'Count results from API response' },
    ],
  },
]

export const challengeItems: ChallengeItem[] = [
  {
    id: '101',
    title: 'Find all .log files over 10MB',
    description: 'Use the find command to locate large log files in a production server filesystem.',
    difficulty: 'intermediate',
    xp: 40,
    category: 'Linux Core',
    estimatedTime: '8 min',
    completions: 1243,
    steps: [
      'Navigate to the /var/log directory.',
      'Use find with -name and -size flags to locate large .log files.',
      'Submit your one-liner command.',
    ],
  },
  {
    id: '102',
    title: 'Extract top failing endpoints from logs',
    description: 'Combine grep, awk, sort, and uniq to analyze nginx error logs and find the most frequent 500 errors.',
    difficulty: 'advanced',
    xp: 55,
    category: 'Text Processing',
    estimatedTime: '15 min',
    completions: 412,
    steps: [
      'Filter lines containing HTTP 500 status codes.',
      'Extract the URL path from each matching line.',
      'Sort and count unique paths to find the top offenders.',
    ],
  },
  {
    id: '103',
    title: 'Cleanup dangling Docker images safely',
    description: 'Remove unused Docker images while keeping tagged images intact.',
    difficulty: 'beginner',
    xp: 30,
    category: 'Docker',
    estimatedTime: '5 min',
    completions: 2891,
    steps: [
      'List all dangling images.',
      'Use docker image prune to clean them up.',
      'Verify no tagged images were removed.',
    ],
  },
  {
    id: '104',
    title: 'Set up SSH key authentication',
    description: 'Generate an SSH key pair and configure password-less login to a remote server.',
    difficulty: 'beginner',
    xp: 25,
    category: 'Networking',
    estimatedTime: '10 min',
    completions: 3456,
    steps: [
      'Generate an SSH key pair using ssh-keygen.',
      'Copy the public key to the remote server.',
      'Test the connection without a password.',
    ],
  },
  {
    id: '105',
    title: 'Interactive Git rebase: squash and reorder',
    description: 'Clean up a messy git history by squashing 5 commits into 2 meaningful ones.',
    difficulty: 'advanced',
    xp: 60,
    category: 'Git CLI',
    estimatedTime: '12 min',
    completions: 567,
    steps: [
      'Start an interactive rebase for the last 5 commits.',
      'Mark commits for squashing and reordering.',
      'Write clean commit messages and complete the rebase.',
    ],
  },
  {
    id: '106',
    title: 'Parse API response with jq',
    description: 'Fetch JSON from a REST API and extract specific fields using jq pipelines.',
    difficulty: 'intermediate',
    xp: 35,
    category: 'Power Tools',
    estimatedTime: '8 min',
    completions: 1876,
    steps: [
      'Use curl to fetch the API response.',
      'Pipe the output to jq and extract the required fields.',
      'Format the output as a clean table.',
    ],
  },
  {
    id: '107',
    title: 'Create a compressed backup with tar',
    description: 'Archive and compress a project directory, excluding node_modules and .git.',
    difficulty: 'beginner',
    xp: 20,
    category: 'Linux Core',
    estimatedTime: '5 min',
    completions: 4231,
    steps: [
      'Use tar with --exclude to skip unwanted directories.',
      'Compress with gzip for smaller file size.',
      'Verify the archive contents without extracting.',
    ],
  },
  {
    id: '108',
    title: 'Deploy a multi-container app with Docker Compose',
    description: 'Write a docker-compose.yml to run a web app with Redis and PostgreSQL.',
    difficulty: 'advanced',
    xp: 50,
    category: 'Docker',
    estimatedTime: '20 min',
    completions: 289,
    steps: [
      'Define the web service with port mapping.',
      'Add Redis and PostgreSQL services.',
      'Configure networking and environment variables.',
    ],
  },
]

export const categoryProgress = [
  { name: 'Linux Core', icon: '🐧', learned: 24, total: 85, color: 'from-emerald-500 to-cyan-400' },
  { name: 'Git CLI', icon: '🌿', learned: 10, total: 42, color: 'from-orange-500 to-amber-400' },
  { name: 'Docker CLI', icon: '🐳', learned: 6, total: 35, color: 'from-blue-500 to-indigo-400' },
  { name: 'Kubernetes', icon: '☸️', learned: 5, total: 28, color: 'from-purple-500 to-pink-400' },
  { name: 'Networking', icon: '🌐', learned: 8, total: 30, color: 'from-teal-500 to-emerald-400' },
  { name: 'Power Tools', icon: '⚡', learned: 3, total: 22, color: 'from-yellow-500 to-orange-400' },
]

export const leaderboardUsers: LeaderboardUser[] = [
  { rank: 1, name: 'Ari Nakamura', avatar: '👑', level: 9, levelTitle: 'Terminal Sage', xp: 7520, streak: 45, badges: 38 },
  { rank: 2, name: 'Priya Sharma', avatar: '🥈', level: 8, levelTitle: 'Shell Wizard', xp: 6380, streak: 32, badges: 31 },
  { rank: 3, name: 'Marcus Johnson', avatar: '🥉', level: 8, levelTitle: 'Shell Wizard', xp: 5915, streak: 28, badges: 27 },
  { rank: 4, name: 'Yuki Tanaka', avatar: '⚡', level: 7, levelTitle: 'CLI Ninja', xp: 4200, streak: 21, badges: 22 },
  { rank: 5, name: 'Alex Chen', avatar: '🥷', level: 5, levelTitle: 'Bash Enthusiast', xp: 1240, streak: 7, badges: 12 },
  { rank: 6, name: 'Sam Rivera', avatar: '🔥', level: 5, levelTitle: 'Bash Enthusiast', xp: 1180, streak: 14, badges: 11 },
  { rank: 7, name: 'Jordan Park', avatar: '💎', level: 4, levelTitle: 'Shell User', xp: 890, streak: 5, badges: 8 },
  { rank: 8, name: 'Casey Williams', avatar: '🚀', level: 4, levelTitle: 'Shell User', xp: 780, streak: 9, badges: 7 },
  { rank: 9, name: 'Taylor Kim', avatar: '🌟', level: 3, levelTitle: 'Command Liner', xp: 420, streak: 3, badges: 4 },
  { rank: 10, name: 'Morgan Lee', avatar: '🎯', level: 2, levelTitle: 'Terminal Newbie', xp: 180, streak: 2, badges: 2 },
]

export const badges: BadgeItem[] = [
  { id: 'b1', name: 'First Command', description: 'Ran your first command', icon: '🎯', rarity: 'common', earned: true },
  { id: 'b2', name: 'Pipe Master', description: 'Completed 5 piping challenges', icon: '🔗', rarity: 'rare', earned: true },
  { id: 'b3', name: 'Speed Demon', description: 'Completed a timed challenge under 60s', icon: '⚡', rarity: 'rare', earned: true },
  { id: 'b4', name: 'One-Liner King', description: 'Solved 10 challenges in a single line', icon: '👑', rarity: 'epic', earned: false },
  { id: 'b5', name: 'Streak Legend', description: 'Maintained a 30-day streak', icon: '🔥', rarity: 'epic', earned: false },
  { id: 'b6', name: 'Root Master', description: 'Reach Level 10', icon: '🏆', rarity: 'legendary', earned: false },
]

export const activityData: ActivityDay[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - (29 - i))
  return {
    date: date.toISOString().split('T')[0],
    count: Math.floor(Math.random() * 5),
  }
})

export const levelThresholds = [
  { level: 1, title: 'Script Kiddie', xp: 0 },
  { level: 2, title: 'Terminal Newbie', xp: 100 },
  { level: 3, title: 'Command Liner', xp: 300 },
  { level: 4, title: 'Shell User', xp: 600 },
  { level: 5, title: 'Bash Enthusiast', xp: 1000 },
  { level: 6, title: 'Power User', xp: 1500 },
  { level: 7, title: 'CLI Ninja', xp: 2500 },
  { level: 8, title: 'Shell Wizard', xp: 4000 },
  { level: 9, title: 'Terminal Sage', xp: 6000 },
  { level: 10, title: 'Root Master', xp: 10000 },
]
