import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { challenges } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params

    const [challenge] = await db
      .select()
      .from(challenges)
      .where(eq(challenges.id, id))
      .limit(1)

    if (!challenge) {
      return NextResponse.json({ error: 'Challenge not found' }, { status: 404 })
    }

    return NextResponse.json({ data: challenge })
  } catch (error) {
    console.error('[CHALLENGE_GET]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
