import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { OnboardingPhilosophyId } from '@/lib/constants/onboarding'

export interface OnboardingResultState {
  score: number
  bandLabel: string
  recommendations: string[]
  strengths: string[]
  growthAreas: string[]
  skillProfile: Record<string, number>
}

interface OnboardingStore {
  step: number
  characterName: string
  avatarId: string
  philosophyId: OnboardingPhilosophyId | null
  answers: Record<string, string>
  assessmentAttemptId: string | null
  result: OnboardingResultState | null
  setStep: (step: number) => void
  setCharacterName: (name: string) => void
  setAvatarId: (avatarId: string) => void
  setPhilosophyId: (philosophyId: OnboardingPhilosophyId) => void
  setAnswer: (questionId: string, optionId: string) => void
  setAssessmentAttemptId: (attemptId: string) => void
  setResult: (result: OnboardingResultState) => void
  reset: () => void
}

const initialState = {
  step: 1,
  characterName: '',
  avatarId: 'akira',
  philosophyId: null,
  answers: {},
  assessmentAttemptId: null,
  result: null,
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      ...initialState,
      setStep: (step) => set({ step }),
      setCharacterName: (characterName) => set({ characterName }),
      setAvatarId: (avatarId) => set({ avatarId }),
      setPhilosophyId: (philosophyId) => set({ philosophyId }),
      setAnswer: (questionId, optionId) =>
        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: optionId,
          },
        })),
      setAssessmentAttemptId: (assessmentAttemptId) => set({ assessmentAttemptId }),
      setResult: (result) => set({ result }),
      reset: () => set(initialState),
    }),
    {
      name: 'shellsensei-onboarding-v1',
      partialize: (state) => ({
        step: state.step,
        characterName: state.characterName,
        avatarId: state.avatarId,
        philosophyId: state.philosophyId,
        answers: state.answers,
        assessmentAttemptId: state.assessmentAttemptId,
        result: state.result,
      }),
    },
  ),
)
