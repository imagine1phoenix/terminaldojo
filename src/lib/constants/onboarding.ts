export type OnboardingPhilosophyId = 'shoshin' | 'kyudo' | 'shojin'

export interface CharacterAvatar {
  id: string
  name: string
  primary: string
  secondary: string
}

export interface AssessmentOption {
  id: string
  label: string
  value?: string
}

export interface AssessmentQuestion {
  id: string
  tier: 'tier1' | 'tier2' | 'tier3' | 'specialty'
  skill: 'linux' | 'bash' | 'git' | 'docker' | 'network' | 'cloud' | 'general'
  prompt: string
  options: AssessmentOption[]
  correctOptionId?: string
  followUpFor?: string
  followUpConditionValues?: string[]
}

export interface ScoreBand {
  id: string
  min: number
  max: number
  label: string
  message: string
  approach: string
  recommendedPath: string
  eta: string
}

export const suggestedNames = [
  'Taro',
  'Yuki',
  'Takeshi',
  'Kaito',
  'Sakura',
  'Midori',
  'Aoi',
  'Ren',
  'Kaede',
  'Haru',
]

export const profanityBlocklist = [
  'fuck',
  'shit',
  'bitch',
  'asshole',
  'bastard',
  'nigger',
  'cunt',
  'fag',
  'whore',
  'slut',
]

export const characterAvatars: CharacterAvatar[] = [
  { id: 'akira', name: 'Akira', primary: '#22c55e', secondary: '#15803d' },
  { id: 'fumie', name: 'Fumie', primary: '#3b82f6', secondary: '#1e3a8a' },
  { id: 'kenji', name: 'Kenji', primary: '#facc15', secondary: '#ca8a04' },
  { id: 'nao', name: 'Nao', primary: '#f97316', secondary: '#c2410c' },
  { id: 'sora', name: 'Sora', primary: '#22d3ee', secondary: '#0e7490' },
  { id: 'rin', name: 'Rin', primary: '#8b5cf6', secondary: '#5b21b6' },
  { id: 'haru', name: 'Haru', primary: '#ef4444', secondary: '#991b1b' },
  { id: 'kaoru', name: 'Kaoru', primary: '#14b8a6', secondary: '#0f766e' },
  { id: 'mei', name: 'Mei', primary: '#ec4899', secondary: '#9d174d' },
  { id: 'ren', name: 'Ren', primary: '#eab308', secondary: '#854d0e' },
]

export const philosophies = [
  {
    id: 'shoshin' as const,
    jp: 'Beginner Mindset',
    reading: 'Shoshin',
    title: "The Beginner's Mind",
    description: "I'm starting from scratch. I know nothing of the CLI.",
    detail: "You'll follow The Beginner's Journey learning path.",
    icon: 'White Belt',
    estimate: 'Est. time to Green Belt: 2 weeks',
    recommendedFor: 'Complete beginners, career switchers',
    colorClass: 'border-slate-300/40 bg-slate-200/5 text-slate-100',
  },
  {
    id: 'kyudo' as const,
    jp: 'Way of the Seeker',
    reading: 'Kyudo',
    title: "The Seeker's Path",
    description: 'I have some experience but want to fill knowledge gaps.',
    detail: "You'll get personalized path recommendations.",
    icon: 'Yellow Belt',
    estimate: 'Est. time to Green Belt: 1 week',
    recommendedFor: 'Junior developers, some CLI experience',
    colorClass: 'border-amber-400/45 bg-amber-500/10 text-amber-100',
  },
  {
    id: 'shojin' as const,
    jp: 'Disciplined Growth',
    reading: 'Shojin',
    title: 'Relentless Improvement',
    description: "I'm skilled but want mastery in specific areas.",
    detail: 'Advanced paths and specializations unlock immediately.',
    icon: 'Black Belt',
    estimate: 'Est. time to Black Belt: 2-3 weeks',
    recommendedFor: 'Experienced developers, DevOps aspirants',
    colorClass: 'border-yellow-400/45 bg-gradient-to-r from-black/40 to-yellow-900/20 text-yellow-100',
  },
]

export const tier1Questions: AssessmentQuestion[] = [
  {
    id: 't1-q1',
    tier: 'tier1',
    skill: 'linux',
    prompt: "What does 'ls' do?",
    correctOptionId: 'a',
    options: [
      { id: 'a', label: 'Lists files in current directory' },
      { id: 'b', label: 'Locks the system' },
      { id: 'c', label: 'Loads a shell script' },
      { id: 'd', label: "I don't know" },
    ],
  },
  {
    id: 't1-q2',
    tier: 'tier1',
    skill: 'linux',
    prompt: "What's the purpose of 'cd'?",
    correctOptionId: 'a',
    options: [
      { id: 'a', label: 'Change directory' },
      { id: 'b', label: 'Copy data' },
      { id: 'c', label: 'Check disk space' },
      { id: 'd', label: "I don't know" },
    ],
  },
  {
    id: 't1-q3',
    tier: 'tier1',
    skill: 'bash',
    prompt: 'What does piping (|) do?',
    correctOptionId: 'a',
    options: [
      { id: 'a', label: 'Connects output of one command to input of another' },
      { id: 'b', label: 'Creates a temporary file' },
      { id: 'c', label: 'Redirects errors to a file' },
      { id: 'd', label: "I don't know" },
    ],
  },
  {
    id: 't1-q4',
    tier: 'tier1',
    skill: 'linux',
    prompt: "What does 'pwd' print?",
    correctOptionId: 'c',
    options: [
      { id: 'a', label: 'The previous command' },
      { id: 'b', label: 'The current user name' },
      { id: 'c', label: 'The current working directory' },
      { id: 'd', label: "I don't know" },
    ],
  },
  {
    id: 't1-q5',
    tier: 'tier1',
    skill: 'linux',
    prompt: "Which command removes files?",
    correctOptionId: 'b',
    options: [
      { id: 'a', label: 'mkdir' },
      { id: 'b', label: 'rm' },
      { id: 'c', label: 'touch' },
      { id: 'd', label: "I don't know" },
    ],
  },
  {
    id: 't1-q6',
    tier: 'tier1',
    skill: 'bash',
    prompt: 'What does > do in shell commands?',
    correctOptionId: 'a',
    options: [
      { id: 'a', label: 'Redirect command output to a file' },
      { id: 'b', label: 'Creates a pipe to another command' },
      { id: 'c', label: 'Runs command as root' },
      { id: 'd', label: "I don't know" },
    ],
  },
]

export const tier2Questions: AssessmentQuestion[] = [
  {
    id: 't2-q1',
    tier: 'tier2',
    skill: 'linux',
    prompt: "What does 'grep -r' do?",
    correctOptionId: 'a',
    options: [
      { id: 'a', label: 'Recursively search directories for a pattern' },
      { id: 'b', label: 'Remove files recursively' },
      { id: 'c', label: 'Reverse the output of grep' },
      { id: 'd', label: "I don't know" },
    ],
  },
  {
    id: 't2-q2',
    tier: 'tier2',
    skill: 'linux',
    prompt: "When would you use 'chmod 755'?",
    correctOptionId: 'a',
    options: [
      { id: 'a', label: 'Set permissions: owner full, others read+execute' },
      { id: 'b', label: "Change the file's modification time" },
      { id: 'c', label: 'Compress a file to 755 bytes' },
      { id: 'd', label: "I don't know" },
    ],
  },
  {
    id: 't2-q3',
    tier: 'tier2',
    skill: 'bash',
    prompt: "What's the difference between 'echo' and 'cat'?",
    correctOptionId: 'a',
    options: [
      { id: 'a', label: 'echo prints arguments; cat reads file contents' },
      { id: 'b', label: "They're identical" },
      { id: 'c', label: 'cat is always faster' },
      { id: 'd', label: "I don't know" },
    ],
  },
  {
    id: 't2-q4',
    tier: 'tier2',
    skill: 'network',
    prompt: 'What is curl primarily used for?',
    correctOptionId: 'c',
    options: [
      { id: 'a', label: 'Compiling C files' },
      { id: 'b', label: 'Managing docker containers' },
      { id: 'c', label: 'Making network requests from terminal' },
      { id: 'd', label: "I don't know" },
    ],
  },
]

export const tier3Questions: AssessmentQuestion[] = [
  {
    id: 't3-q1',
    tier: 'tier3',
    skill: 'linux',
    prompt: "What would 'find . -type f -mtime +7' find?",
    correctOptionId: 'a',
    options: [
      { id: 'a', label: 'Files modified more than 7 days ago' },
      { id: 'b', label: 'Files modified in the last 7 days' },
      { id: 'c', label: 'Directories modified in last 7 days' },
      { id: 'd', label: "I don't know" },
    ],
  },
  {
    id: 't3-q2',
    tier: 'tier3',
    skill: 'bash',
    prompt: 'How would you save STDERR to a file but show STDOUT?',
    correctOptionId: 'a',
    options: [
      { id: 'a', label: 'command 2>errors.txt' },
      { id: 'b', label: 'command > errors.txt 2>&1' },
      { id: 'c', label: 'command 2>errors.txt 1>&2' },
      { id: 'd', label: "I don't know" },
    ],
  },
  {
    id: 't3-q3',
    tier: 'tier3',
    skill: 'bash',
    prompt: "What does 'xargs' help with?",
    correctOptionId: 'b',
    options: [
      { id: 'a', label: 'Encrypting shell scripts' },
      { id: 'b', label: 'Building command arguments from stdin' },
      { id: 'c', label: 'Measuring command runtime' },
      { id: 'd', label: "I don't know" },
    ],
  },
]

export const specialtyQuestions: AssessmentQuestion[] = [
  {
    id: 'sp-q1',
    tier: 'specialty',
    skill: 'git',
    prompt: 'Have you used Git before?',
    options: [
      { id: 'a', label: 'Extensively (I use it daily)', value: 'extensive' },
      { id: 'b', label: 'Some experience', value: 'some' },
      { id: 'c', label: 'Minimal / None', value: 'minimal' },
    ],
  },
  {
    id: 'sp-q1b',
    tier: 'specialty',
    skill: 'git',
    followUpFor: 'sp-q1',
    followUpConditionValues: ['extensive', 'some'],
    prompt: "What does 'git rebase' do?",
    correctOptionId: 'a',
    options: [
      { id: 'a', label: 'Rewrites commit history onto another branch' },
      { id: 'b', label: 'Reverses all changes' },
      { id: 'c', label: 'Branches from a specific commit' },
      { id: 'd', label: "I don't know" },
    ],
  },
  {
    id: 'sp-q2',
    tier: 'specialty',
    skill: 'docker',
    prompt: 'Have you used Docker before?',
    options: [
      { id: 'a', label: 'Extensively', value: 'extensive' },
      { id: 'b', label: 'Some experience', value: 'some' },
      { id: 'c', label: 'Minimal / None', value: 'minimal' },
    ],
  },
  {
    id: 'sp-q3',
    tier: 'specialty',
    skill: 'general',
    prompt: "What's your primary goal in the dojo?",
    options: [
      { id: 'a', label: 'Land a DevOps/SRE role (interview prep)', value: 'devops-role' },
      { id: 'b', label: 'Become more productive in my current role', value: 'productivity' },
      { id: 'c', label: 'Master the terminal completely', value: 'mastery' },
      { id: 'd', label: 'Fill specific knowledge gaps', value: 'gaps' },
    ],
  },
]

export const scoreBands: ScoreBand[] = [
  {
    id: 'shoshin',
    min: 0,
    max: 25,
    label: 'Shoshin - Pure Beginner',
    message: 'No prior experience. We start here.',
    approach: 'Hand-holding, baby steps, explanations',
    recommendedPath: "The Beginner's Journey",
    eta: 'Est. time to Green Belt: 2 weeks',
  },
  {
    id: 'gakusei',
    min: 26,
    max: 50,
    label: 'Gakusei - Student',
    message: 'Some basics under your belt. Ready for next level.',
    approach: 'Mix of fundamentals + new concepts',
    recommendedPath: 'The Way of Linux',
    eta: 'Est. time to Green Belt: 1 week',
  },
  {
    id: 'shodai',
    min: 51,
    max: 75,
    label: 'Shodai - Proficient',
    message: 'Solid foundations. Time for mastery.',
    approach: 'Advanced techniques, optimization, deep dives',
    recommendedPath: 'The Way of Advanced Linux',
    eta: 'Est. time to Black Belt: 3-4 weeks',
  },
  {
    id: 'renshi',
    min: 76,
    max: 99,
    label: 'Renshi - Teacher',
    message: 'Expert level. Advanced paths unlock.',
    approach: 'Mastery, teaching others, challenges',
    recommendedPath: 'Specialty Paths + Multiplayer Challenges',
    eta: 'Est. time to Black Belt: 2 weeks',
  },
  {
    id: 'senshi',
    min: 100,
    max: 100,
    label: 'Senshi - Master',
    message: 'You may know more than we do.',
    approach: 'Expert-level, teaching, community building',
    recommendedPath: 'Custom Learning + Community Contributions',
    eta: 'Create challenges for others unlocked',
  },
]

export function getScoreBand(score: number): ScoreBand {
  const safe = Math.max(0, Math.min(100, Math.round(score)))
  return scoreBands.find((band) => safe >= band.min && safe <= band.max) ?? scoreBands[0]
}

export function hasProfanity(value: string): boolean {
  const normalized = value.toLowerCase()
  return profanityBlocklist.some((word) => normalized.includes(word))
}

export function isValidCharacterName(value: string): boolean {
  return /^[a-zA-Z0-9_-]{3,20}$/.test(value) && !hasProfanity(value)
}
