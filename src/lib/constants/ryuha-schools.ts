export type RyuhaSceneType =
  | 'docker'
  | 'git'
  | 'aws'
  | 'kubernetes'
  | 'bash'
  | 'curl'
  | 'homebrew'
  | 'node'
  | 'python'
  | 'cloud'

export interface RyuhaSchool {
  id: string
  slug: string
  kanji: string
  englishName: string
  schoolName: string
  philosophy: string
  lore: string
  route: string
  scene: RyuhaSceneType
  commandCount: number
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedLearningTime: string
  tools: string[]
  palette: {
    primary: string
    secondary: string
    glow: string
  }
}

export const ryuhaSchools: RyuhaSchool[] = [
  {
    id: 'docker-ryuha',
    slug: 'docker-cli',
    kanji: 'Container',
    englishName: 'Container School',
    schoolName: 'Yoki Ryuha',
    philosophy: 'Like water, adapt to any shape.',
    lore: 'Container warriors master encapsulation first, then mobility. They train to carry identical battle environments across machines without drift. The final kata is reproducibility under pressure, where every deployment remains calm and deterministic.',
    route: '/app/command/docker-run',
    scene: 'docker',
    commandCount: 42,
    difficulty: 'Intermediate',
    estimatedLearningTime: '2-3 weeks',
    tools: ['Docker', 'Compose', 'Container Runtime'],
    palette: {
      primary: '#0EA5E9',
      secondary: '#22D3EE',
      glow: 'rgba(34, 211, 238, 0.38)',
    },
  },
  {
    id: 'git-ryuha',
    slug: 'git-cli',
    kanji: 'Branches',
    englishName: 'Branching School',
    schoolName: 'Bunshi Ryuha',
    philosophy: 'Divide, then reunite.',
    lore: 'Branching masters split timelines with precision and return them without scars. Their discipline is parallel execution, careful review, and clean reintegration. Every rebase is treated like sword maintenance: exact, patient, and never rushed.',
    route: '/app/command/git-rebase',
    scene: 'git',
    commandCount: 42,
    difficulty: 'Intermediate',
    estimatedLearningTime: '2-3 weeks',
    tools: ['Git', 'Hooks', 'Rebase'],
    palette: {
      primary: '#F97316',
      secondary: '#F43F5E',
      glow: 'rgba(249, 115, 22, 0.36)',
    },
  },
  {
    id: 'aws-ryuha',
    slug: 'cloud-clis',
    kanji: 'Cloud',
    englishName: 'Cloud School',
    schoolName: 'Kumo Ryuha',
    philosophy: 'Power beyond boundaries.',
    lore: 'Cloud adepts command invisible infrastructure through ritualized CLI forms. They orchestrate identity, networking, and compute as a single combat posture. Their doctrine: scale decisively, recover quickly, and leave no wasted resource behind.',
    route: '/app/explore?school=aws',
    scene: 'aws',
    commandCount: 45,
    difficulty: 'Advanced',
    estimatedLearningTime: '3-4 weeks',
    tools: ['AWS CLI', 'IAM', 'EC2'],
    palette: {
      primary: '#F59E0B',
      secondary: '#FCD34D',
      glow: 'rgba(245, 158, 11, 0.35)',
    },
  },
  {
    id: 'gcloud-ryuha',
    slug: 'cloud-clis',
    kanji: 'Cartography',
    englishName: 'Sky Cartography School',
    schoolName: 'Seizu Ryuha',
    philosophy: 'Map the sky before you command it.',
    lore: 'Sky cartographers chart systems first and automate second. Their craft blends observability, policy, and fast route correction. Precision mapping turns chaotic cloud terrain into repeatable operating lanes.',
    route: '/app/explore?school=gcloud',
    scene: 'cloud',
    commandCount: 38,
    difficulty: 'Advanced',
    estimatedLearningTime: '3 weeks',
    tools: ['gcloud', 'Compute Engine', 'Cloud Run'],
    palette: {
      primary: '#60A5FA',
      secondary: '#22D3EE',
      glow: 'rgba(96, 165, 250, 0.34)',
    },
  },
  {
    id: 'azure-ryuha',
    slug: 'cloud-clis',
    kanji: 'Sky Vault',
    englishName: 'Azure Vault School',
    schoolName: 'Sokyu Ryuha',
    philosophy: 'Calm skies, precise control.',
    lore: 'Vault practitioners focus on controlled execution across enterprise-scale domains. They emphasize policy alignment, safe rollout cadence, and role hygiene. Their strength is composure while managing many moving parts.',
    route: '/app/explore?school=azure',
    scene: 'cloud',
    commandCount: 36,
    difficulty: 'Advanced',
    estimatedLearningTime: '3 weeks',
    tools: ['Azure CLI', 'Resource Groups', 'AKS'],
    palette: {
      primary: '#2563EB',
      secondary: '#38BDF8',
      glow: 'rgba(37, 99, 235, 0.34)',
    },
  },
  {
    id: 'terraform-ryuha',
    slug: 'cloud-clis',
    kanji: 'Foundation',
    englishName: 'Foundation School',
    schoolName: 'Ishizue Ryuha',
    philosophy: 'Declare intent, then let structure emerge.',
    lore: 'Foundation school students express desired state with disciplined declarations. Their kata is idempotence: safe repeated execution with predictable outcomes. They train to prevent configuration drift before it becomes operational debt.',
    route: '/app/explore?school=terraform',
    scene: 'cloud',
    commandCount: 30,
    difficulty: 'Advanced',
    estimatedLearningTime: '3 weeks',
    tools: ['Terraform', 'State', 'Plan/Apply'],
    palette: {
      primary: '#8B5CF6',
      secondary: '#A78BFA',
      glow: 'rgba(139, 92, 246, 0.34)',
    },
  },
  {
    id: 'kubernetes-ryuha',
    slug: 'kubernetes-kubectl',
    kanji: 'Orchestration',
    englishName: 'Orchestration School',
    schoolName: 'Tosei Ryuha',
    philosophy: 'From order comes power.',
    lore: 'Orchestration warriors coordinate many units as one coherent force. They train around declarative control loops, resilient rollouts, and failure isolation. Mastery means restoring service without panic, even at scale.',
    route: '/app/command/kubectl-get',
    scene: 'kubernetes',
    commandCount: 28,
    difficulty: 'Advanced',
    estimatedLearningTime: '3-4 weeks',
    tools: ['kubectl', 'Pods', 'Deployments'],
    palette: {
      primary: '#6366F1',
      secondary: '#A78BFA',
      glow: 'rgba(99, 102, 241, 0.34)',
    },
  },
  {
    id: 'bash-ryuha',
    slug: 'bash-scripting',
    kanji: 'Script',
    englishName: 'Script School',
    schoolName: 'Kyakuhon Ryuha',
    philosophy: 'From words come actions.',
    lore: 'Script school forges repeatable routines from simple commands. Students learn flow control, robust error handling, and defensive input validation. Their mantra is automation with clarity, never cleverness for its own sake.',
    route: '/app/command/awk',
    scene: 'bash',
    commandCount: 40,
    difficulty: 'Intermediate',
    estimatedLearningTime: '2 weeks',
    tools: ['Bash', 'Zsh', 'Shell Scripts'],
    palette: {
      primary: '#34D399',
      secondary: '#10B981',
      glow: 'rgba(16, 185, 129, 0.34)',
    },
  },
  {
    id: 'curl-ryuha',
    slug: 'curl-deep-dive',
    kanji: 'Web Thread',
    englishName: 'Web Thread School',
    schoolName: 'Ami Ryuha',
    philosophy: 'All things are connected.',
    lore: 'Web thread disciples probe services with deliberate request forms and signal reading. Their training covers headers, payloads, auth flows, and response timing under load. They turn network uncertainty into observable patterns and quick diagnosis.',
    route: '/app/command/curl',
    scene: 'curl',
    commandCount: 24,
    difficulty: 'Beginner',
    estimatedLearningTime: '1-2 weeks',
    tools: ['curl', 'HTTP', 'APIs'],
    palette: {
      primary: '#06B6D4',
      secondary: '#22D3EE',
      glow: 'rgba(6, 182, 212, 0.34)',
    },
  },
  {
    id: 'homebrew-ryuha',
    slug: 'homebrew-macos-linux',
    kanji: 'Artisan',
    englishName: 'Artisan School',
    schoolName: 'Shokunin Ryuha',
    philosophy: 'The tool is extension of master.',
    lore: 'Artisan school sharpens local developer workflow into reliable craft. Practitioners optimize install paths, version management, and environment consistency. Their victories are small but compounding, measured in saved minutes every session.',
    route: '/app/explore?school=homebrew',
    scene: 'homebrew',
    commandCount: 22,
    difficulty: 'Beginner',
    estimatedLearningTime: '1 week',
    tools: ['Homebrew', 'Formulae', 'Casks'],
    palette: {
      primary: '#FB923C',
      secondary: '#F59E0B',
      glow: 'rgba(251, 146, 60, 0.35)',
    },
  },
  {
    id: 'node-ryuha',
    slug: 'node-npm-yarn-cli',
    kanji: 'Fusion',
    englishName: 'Fusion School',
    schoolName: 'Ketsugo Ryuha',
    philosophy: 'Many become one, one becomes many.',
    lore: 'Fusion school coordinates dependency ecosystems and runtime orchestration. Its discipline focuses on deterministic installs, script pipelines, and package hygiene. Members learn to ship quickly without introducing unstable edges.',
    route: '/app/explore?school=node',
    scene: 'node',
    commandCount: 34,
    difficulty: 'Intermediate',
    estimatedLearningTime: '2 weeks',
    tools: ['Node', 'npm', 'npx'],
    palette: {
      primary: '#22C55E',
      secondary: '#84CC16',
      glow: 'rgba(34, 197, 94, 0.33)',
    },
  },
  {
    id: 'python-ryuha',
    slug: 'python-cli-tools',
    kanji: 'Serpent',
    englishName: 'Serpent School',
    schoolName: 'Hebi Ryuha',
    philosophy: 'Flexibility in constraint.',
    lore: 'Serpent school emphasizes expressive scripting with disciplined readability. Students learn composable tooling, environment control, and automation safety. Their highest form is fast experimentation that still produces maintainable systems.',
    route: '/app/explore?school=python',
    scene: 'python',
    commandCount: 31,
    difficulty: 'Intermediate',
    estimatedLearningTime: '2 weeks',
    tools: ['Python', 'pip', 'venv'],
    palette: {
      primary: '#3B82F6',
      secondary: '#EAB308',
      glow: 'rgba(59, 130, 246, 0.34)',
    },
  },
  {
    id: 'cloud-clis-ryuha',
    slug: 'cloud-clis',
    kanji: 'Sky Path',
    englishName: 'Sky Path School',
    schoolName: 'Tenro Ryuha',
    philosophy: 'Move between worlds with one command language.',
    lore: 'Sky path warriors switch clouds without losing operational posture. Their curriculum centers on shared patterns for auth, compute, storage, and networking. The end state is portability with discipline, not fragmented platform habits.',
    route: '/app/explore?school=cloud-clis',
    scene: 'cloud',
    commandCount: 52,
    difficulty: 'Advanced',
    estimatedLearningTime: '4 weeks',
    tools: ['AWS', 'gcloud', 'Azure CLI'],
    palette: {
      primary: '#A855F7',
      secondary: '#6366F1',
      glow: 'rgba(168, 85, 247, 0.34)',
    },
  },
]
