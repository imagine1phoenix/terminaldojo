import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getAssessmentAttempt } from '@/lib/onboarding/assessment'

const querySchema = z.object({
  attemptId: z.string().uuid(),
})

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)

  try {
    const parsed = querySchema.parse({ attemptId: searchParams.get('attemptId') })
    const attempt = getAssessmentAttempt(parsed.attemptId)

    if (!attempt) {
      return NextResponse.json({ error: 'Assessment attempt not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      attemptId: attempt.id,
      createdAt: attempt.createdAt,
      result: attempt.result,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid attempt id', details: error.issues }, { status: 400 })
    }

    console.error('[ASSESSMENT_CALCULATE]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
