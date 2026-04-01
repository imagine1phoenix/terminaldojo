import {
  getScoreBand,
  specialtyQuestions,
  tier1Questions,
  tier2Questions,
  tier3Questions,
  type AssessmentQuestion,
} from '@/lib/constants/onboarding'

export interface AssessmentResult {
  score: number
  bandLabel: string
  recommendations: string[]
  strengths: string[]
  growthAreas: string[]
  skillProfile: Record<string, number>
}

export interface StoredAttempt {
  id: string
  answers: Record<string, string>
  result: AssessmentResult
  createdAt: number
}

const attempts = new Map<string, StoredAttempt>()

const questionBank: AssessmentQuestion[] = [
  ...tier1Questions,
  ...tier2Questions,
  ...tier3Questions,
  ...specialtyQuestions,
]

function optionValue(questionId: string, optionId: string | undefined): string | undefined {
  const question = questionBank.find((item) => item.id === questionId)
  if (!question || !optionId) return undefined
  return question.options.find((option) => option.id === optionId)?.value
}

function shouldIncludeQuestion(question: AssessmentQuestion, answers: Record<string, string>): boolean {
  if (!question.followUpFor) return true
  const parentAnswerId = answers[question.followUpFor]
  const parentValue = optionValue(question.followUpFor, parentAnswerId)
  if (!parentValue || !question.followUpConditionValues) return false
  return question.followUpConditionValues.includes(parentValue)
}

function getRecommendations(score: number, answers: Record<string, string>): string[] {
  const goal = optionValue('sp-q3', answers['sp-q3'])

  if (score <= 25) return ["The Beginner's Journey", 'The Way of Linux Foundations']
  if (score <= 50) return ['The Way of Linux', 'The Way of Bash']

  if (goal === 'devops-role') {
    return ['The Way of Advanced Linux', 'The Way of Cloud + Docker']
  }
  if (goal === 'mastery') {
    return ['The Way of Advanced Linux', 'Specialization Arena Challenges']
  }

  return ['The Way of Advanced Linux', 'The Way of the Script (Bash)']
}

export function calculateAssessmentResult(answers: Record<string, string>): AssessmentResult {
  const gradedQuestions = questionBank.filter(
    (question) => question.correctOptionId && shouldIncludeQuestion(question, answers),
  )

  let correct = 0
  const skillTotals = {
    linux: { total: 0, correct: 0 },
    bash: { total: 0, correct: 0 },
    git: { total: 0, correct: 0 },
    docker: { total: 0, correct: 0 },
    network: { total: 0, correct: 0 },
    cloud: { total: 0, correct: 0 },
  }

  for (const question of gradedQuestions) {
    const selected = answers[question.id]
    const isCorrect = selected === question.correctOptionId
    if (isCorrect) correct += 1

    if (question.skill in skillTotals) {
      const bucket = skillTotals[question.skill as keyof typeof skillTotals]
      bucket.total += 1
      if (isCorrect) bucket.correct += 1
    }
  }

  const score = gradedQuestions.length === 0 ? 0 : Math.round((correct / gradedQuestions.length) * 100)

  const skillProfile: Record<string, number> = {
    linux: skillTotals.linux.total ? Math.round((skillTotals.linux.correct / skillTotals.linux.total) * 100) : 0,
    bash: skillTotals.bash.total ? Math.round((skillTotals.bash.correct / skillTotals.bash.total) * 100) : 0,
    git: skillTotals.git.total ? Math.round((skillTotals.git.correct / skillTotals.git.total) * 100) : 0,
    docker: skillTotals.docker.total ? Math.round((skillTotals.docker.correct / skillTotals.docker.total) * 100) : 0,
    network: skillTotals.network.total ? Math.round((skillTotals.network.correct / skillTotals.network.total) * 100) : 0,
    cloud: skillTotals.cloud.total ? Math.round((skillTotals.cloud.correct / skillTotals.cloud.total) * 100) : 0,
  }

  const ranked = Object.entries(skillProfile).sort((a, b) => b[1] - a[1])

  const strengths = ranked.slice(0, 3).map(([skill]) => {
    if (skill === 'linux') return 'File system navigation'
    if (skill === 'bash') return 'Piping and shell flow'
    if (skill === 'git') return 'Version control fundamentals'
    if (skill === 'docker') return 'Container basics'
    if (skill === 'network') return 'Pattern matching and requests'
    return 'Cloud CLI foundations'
  })

  const growthAreas = ranked.slice(-3).map(([skill]) => {
    if (skill === 'linux') return 'Advanced permissions'
    if (skill === 'bash') return 'Stream redirection'
    if (skill === 'git') return 'History rewriting and recovery'
    if (skill === 'docker') return 'Container image lifecycle'
    if (skill === 'network') return 'Network debugging in CLI'
    return 'Cloud service orchestration'
  })

  const band = getScoreBand(score)

  return {
    score,
    bandLabel: band.label,
    recommendations: getRecommendations(score, answers),
    strengths,
    growthAreas,
    skillProfile,
  }
}

export function storeAssessmentAttempt(id: string, answers: Record<string, string>, result: AssessmentResult): void {
  attempts.set(id, {
    id,
    answers,
    result,
    createdAt: Date.now(),
  })
}

export function getAssessmentAttempt(id: string): StoredAttempt | undefined {
  return attempts.get(id)
}
