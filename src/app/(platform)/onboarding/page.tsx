'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, LoaderCircle, Sparkles } from 'lucide-react'
import {
  characterAvatars,
  philosophies,
  hasProfanity,
  specialtyQuestions,
  suggestedNames,
  tier1Questions,
  tier2Questions,
  tier3Questions,
  type AssessmentQuestion,
} from '@/lib/constants/onboarding'
import { useOnboardingStore } from '@/lib/stores/onboarding'
import { ModalWrapper } from '@/components/onboarding/modal-wrapper'
import { FlowProgressBar } from '@/components/onboarding/flow-progress-bar'
import { CharacterInput } from '@/components/onboarding/character-input'
import { AvatarSelector } from '@/components/onboarding/avatar-selector'
import { PhilosophyCard } from '@/components/onboarding/philosophy-card'
import { QuestionCard } from '@/components/onboarding/question-card'
import { ReadinessResults } from '@/components/onboarding/readiness-results'

function optionValue(question: AssessmentQuestion, optionId: string | undefined): string | undefined {
  if (!optionId) return undefined
  return question.options.find((option) => option.id === optionId)?.value
}

function shouldAskQuestion(question: AssessmentQuestion, answers: Record<string, string>, allQuestions: AssessmentQuestion[]): boolean {
  if (!question.followUpFor) return true

  const parent = allQuestions.find((entry) => entry.id === question.followUpFor)
  if (!parent) return false
  const parentValue = optionValue(parent, answers[parent.id])

  if (!parentValue || !question.followUpConditionValues) return false
  return question.followUpConditionValues.includes(parentValue)
}

function getTier1Score(answers: Record<string, string>): number {
  const total = tier1Questions.filter((question) => question.correctOptionId).length
  if (total === 0) return 0

  const correct = tier1Questions.filter((question) => answers[question.id] === question.correctOptionId).length
  return Math.round((correct / total) * 100)
}

function buildQuestionFlow(tier1Score: number): AssessmentQuestion[] {
  const pool: AssessmentQuestion[] = [...tier1Questions]

  if (tier1Score >= 50) {
    pool.push(...tier2Questions)
  }
  if (tier1Score > 75) {
    pool.push(...tier3Questions)
  }

  pool.push(...specialtyQuestions)
  return pool
}

export default function OnboardingPage() {
  const {
    step,
    characterName,
    avatarId,
    philosophyId,
    answers,
    result,
    setStep,
    setCharacterName,
    setAvatarId,
    setPhilosophyId,
    setAnswer,
    setResult,
    setAssessmentAttemptId,
  } = useOnboardingStore()

  const [nameSuggestions, setNameSuggestions] = useState<string[]>(suggestedNames.slice(0, 6))
  const [availability, setAvailability] = useState<'unknown' | 'available' | 'taken'>('unknown')
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false)
  const [isSavingCharacter, setIsSavingCharacter] = useState(false)
  const [assessmentSubmitting, setAssessmentSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [activeQuestions, setActiveQuestions] = useState<AssessmentQuestion[]>(tier1Questions)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [hasExpandedQuestionSet, setHasExpandedQuestionSet] = useState(false)

  const validation = useMemo(() => {
    if (characterName.length === 0) {
      return { valid: false, message: 'Enter a practitioner name (3-20 characters).' }
    }
    if (characterName.length < 3) {
      return { valid: false, message: 'Minimum 3 characters required.' }
    }
    if (characterName.length > 20) {
      return { valid: false, message: 'Maximum 20 characters allowed.' }
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(characterName)) {
      return { valid: false, message: 'Use only letters, numbers, hyphens, and underscores.' }
    }
    if (hasProfanity(characterName)) {
      return { valid: false, message: 'Name is blocked by dojo profanity filter.' }
    }
    return { valid: true, message: 'Valid format.' }
  }, [characterName])

  useEffect(() => {
    if (!validation.valid) {
      setAvailability('unknown')
      return
    }

    const controller = new AbortController()
    const timer = window.setTimeout(async () => {
      setIsCheckingAvailability(true)

      try {
        const response = await fetch(`/api/auth/check-name-availability?name=${encodeURIComponent(characterName)}`, {
          signal: controller.signal,
        })

        const data = await response.json()
        setAvailability(data.available ? 'available' : 'taken')

        if (Array.isArray(data.suggestions) && data.suggestions.length > 0) {
          setNameSuggestions(data.suggestions)
        }
      } catch {
        setAvailability('unknown')
      } finally {
        setIsCheckingAvailability(false)
      }
    }, 280)

    return () => {
      controller.abort()
      window.clearTimeout(timer)
    }
  }, [characterName, validation.valid])

  const currentQuestion = activeQuestions[currentQuestionIndex]

  const visibleQuestionCount = useMemo(() => {
    return activeQuestions.filter((question) => shouldAskQuestion(question, answers, activeQuestions)).length
  }, [activeQuestions, answers])

  const visibleQuestionIndex = useMemo(() => {
    if (!currentQuestion) return 0
    return activeQuestions
      .filter((question) => shouldAskQuestion(question, answers, activeQuestions))
      .findIndex((question) => question.id === currentQuestion.id)
  }, [activeQuestions, answers, currentQuestion])

  const generateSuggestions = () => {
    const set = new Set<string>()
    while (set.size < 6) {
      const base = suggestedNames[Math.floor(Math.random() * suggestedNames.length)]
      const suffix = Math.floor(Math.random() * 90) + 10
      set.add(`${base}_${suffix}`)
    }
    setNameSuggestions(Array.from(set))
  }

  const goToNextCharacterStep = async () => {
    setErrorMessage('')

    if (step === 1) {
      if (!validation.valid || availability !== 'available') {
        setErrorMessage('Choose a valid and available name before continuing.')
        return
      }
      setStep(2)
      return
    }

    if (step === 2) {
      if (!avatarId) {
        setErrorMessage('Select an avatar to continue.')
        return
      }
      setStep(3)
      return
    }

    if (step === 3) {
      if (!philosophyId) {
        setErrorMessage('Choose one starting philosophy.')
        return
      }

      setIsSavingCharacter(true)
      try {
        const response = await fetch('/api/auth/create-character', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: characterName,
            avatarId,
            philosophyId,
          }),
        })

        if (!response.ok) {
          const data = await response.json()
          setErrorMessage(data.error || 'Failed to create character.')
          return
        }

        setStep(4)
      } catch {
        setErrorMessage('Unable to save character. Please try again.')
      } finally {
        setIsSavingCharacter(false)
      }
    }
  }

  const startAssessment = () => {
    setErrorMessage('')
    setActiveQuestions(tier1Questions)
    setCurrentQuestionIndex(0)
    setHasExpandedQuestionSet(false)
    setStep(5)
  }

  const getNextQuestionIndex = (
    fromIndex: number,
    questionList: AssessmentQuestion[],
    answerMap: Record<string, string>,
  ): number => {
    for (let index = fromIndex + 1; index < questionList.length; index += 1) {
      if (shouldAskQuestion(questionList[index], answerMap, questionList)) {
        return index
      }
    }
    return -1
  }

  const getPreviousQuestionIndex = (
    fromIndex: number,
    questionList: AssessmentQuestion[],
    answerMap: Record<string, string>,
  ): number => {
    for (let index = fromIndex - 1; index >= 0; index -= 1) {
      if (shouldAskQuestion(questionList[index], answerMap, questionList)) {
        return index
      }
    }
    return -1
  }

  const finalizeAssessment = async (finalAnswers: Record<string, string>) => {
    setAssessmentSubmitting(true)
    setErrorMessage('')

    try {
      const submitResponse = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalAnswers }),
      })

      const submitData = await submitResponse.json()
      if (!submitResponse.ok) {
        setErrorMessage(submitData.error || 'Assessment submission failed.')
        return
      }

      const attemptId = submitData.attemptId as string
      setAssessmentAttemptId(attemptId)

      const calculateResponse = await fetch(`/api/assessment/calculate?attemptId=${attemptId}`)
      const calculateData = await calculateResponse.json()

      if (!calculateResponse.ok) {
        setErrorMessage(calculateData.error || 'Failed to calculate readiness.')
        return
      }

      setResult(calculateData.result)
      setStep(6)
    } catch {
      setErrorMessage('Assessment services are temporarily unavailable.')
    } finally {
      setAssessmentSubmitting(false)
    }
  }

  const handleSelectOption = async (optionId: string) => {
    if (!currentQuestion || assessmentSubmitting) return

    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: optionId,
    }
    setAnswer(currentQuestion.id, optionId)

    let questionList = activeQuestions

    if (!hasExpandedQuestionSet && currentQuestion.tier === 'tier1' && currentQuestionIndex === tier1Questions.length - 1) {
      const tier1Score = getTier1Score(updatedAnswers)
      questionList = buildQuestionFlow(tier1Score)
      setActiveQuestions(questionList)
      setHasExpandedQuestionSet(true)
    }

    const nextIndex = getNextQuestionIndex(currentQuestionIndex, questionList, updatedAnswers)

    if (nextIndex === -1) {
      await finalizeAssessment(updatedAnswers)
      return
    }

    window.setTimeout(() => {
      setCurrentQuestionIndex(nextIndex)
    }, 140)
  }

  const canGoPrevious = currentQuestionIndex > 0

  const goPrevious = () => {
    const previousIndex = getPreviousQuestionIndex(currentQuestionIndex, activeQuestions, answers)
    if (previousIndex >= 0) {
      setCurrentQuestionIndex(previousIndex)
    }
  }

  const selectedAvatar = characterAvatars.find((avatar) => avatar.id === avatarId) ?? characterAvatars[0]

  return (
    <ModalWrapper>
      {step <= 3 && (
        <div className="space-y-5">
          <FlowProgressBar current={step} total={3} label="Character Creation" />

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-black text-white">What name will you take in the dojo?</h1>
                <p className="mt-1 text-sm text-slate-300">This will be your practitioner name.</p>
              </div>

              <CharacterInput
                value={characterName}
                onChange={setCharacterName}
                validationMessage={validation.message}
                isValid={validation.valid}
                isCheckingAvailability={isCheckingAvailability}
                availability={availability}
                suggestions={nameSuggestions}
                onSuggestionClick={setCharacterName}
                onGenerateSuggestions={generateSuggestions}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-black text-white">Choose your practitioner&apos;s appearance</h1>
                <p className="mt-1 text-sm text-slate-300">Select from enso-style avatar identities.</p>
              </div>

              <AvatarSelector
                avatars={characterAvatars}
                selectedAvatarId={avatarId}
                onSelect={setAvatarId}
                onSurprise={() => {
                  const randomAvatar = characterAvatars[Math.floor(Math.random() * characterAvatars.length)]
                  setAvatarId(randomAvatar.id)
                }}
                practitionerName={characterName}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-black text-white">What brings you to the dojo?</h1>
                <p className="mt-1 text-sm text-slate-300">Choose one philosophy to guide your training.</p>
              </div>

              <div className="grid gap-3">
                {philosophies.map((philosophy) => (
                  <PhilosophyCard
                    key={philosophy.id}
                    {...philosophy}
                    selected={philosophyId === philosophy.id}
                    onSelect={setPhilosophyId}
                  />
                ))}
              </div>

              <div className="rounded-xl border border-white/10 bg-black/25 p-3 text-sm text-slate-200">
                <p className="font-semibold">Current Preview</p>
                <p className="mt-1">{characterName || 'Unnamed Practitioner'} · {selectedAvatar.name} · White Belt · Ki: 0</p>
              </div>
            </div>
          )}

          {errorMessage && <p className="text-sm text-red-300">{errorMessage}</p>}

          <div className="flex items-center justify-end gap-2">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-slate-200"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={goToNextCharacterStep}
              disabled={isSavingCharacter}
              className="inline-flex items-center gap-1 rounded-lg bg-cyan-400 px-4 py-2 text-xs font-bold text-black disabled:opacity-60"
            >
              {isSavingCharacter ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : null}
              Continue <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">Entrance Trial</p>
          <h1 className="text-4xl font-black text-white">Before training begins, we must measure your readiness.</h1>
          <p className="mx-auto max-w-2xl text-sm text-slate-300">
            Answer 10-12 questions about your CLI knowledge. There&apos;s no penalty for choosing &quot;I don&apos;t know&quot;.
            This helps us personalize your learning path.
          </p>
          <div className="mx-auto flex w-full max-w-lg items-center justify-between rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-xs text-slate-300">
            <span>Estimated time: 5-7 minutes</span>
            <span>Difficulty: Progressive</span>
          </div>
          <button
            type="button"
            onClick={startAssessment}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-black shadow-[0_0_28px_rgba(34,211,238,0.35)]"
          >
            <Sparkles className="h-4 w-4" /> Start Assessment
          </button>
        </div>
      )}

      {step === 5 && currentQuestion && (
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            questionIndex={Math.max(0, visibleQuestionIndex)}
            totalQuestions={Math.max(visibleQuestionCount, 1)}
            selectedOptionId={answers[currentQuestion.id]}
            onSelect={handleSelectOption}
            onPrevious={goPrevious}
            canGoPrevious={canGoPrevious}
          />
        </AnimatePresence>
      )}

      {assessmentSubmitting && (
        <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-cyan-400/35 bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-100">
          <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> Calculating readiness...
        </div>
      )}

      {step === 6 && result && <ReadinessResults result={result} />}

      {errorMessage && step >= 4 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm text-red-300">
          {errorMessage}
        </motion.p>
      )}
    </ModalWrapper>
  )
}
