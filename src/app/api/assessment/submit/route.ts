import { randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { calculateAssessmentResult, storeAssessmentAttempt } from '@/lib/onboarding/assessment'

const submitSchema = z.object({
  answers: z.record(z.string(), z.string()),
})

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json()
    const parsed = submitSchema.parse(body)

    const result = calculateAssessmentResult(parsed.answers)
    const attemptId = randomUUID()

    storeAssessmentAttempt(attemptId, parsed.answers, result)

    return NextResponse.json({
      success: true,
      attemptId,
      score: result.score,
      bandLabel: result.bandLabel,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid assessment payload', details: error.issues }, { status: 400 })
    }

    console.error('[ASSESSMENT_SUBMIT]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
