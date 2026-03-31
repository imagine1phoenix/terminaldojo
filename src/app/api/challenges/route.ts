import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { challenges } from '@/lib/db/schema'
import { eq, ilike, and, SQL } from 'drizzle-orm'

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const difficulty = searchParams.get('difficulty')
    const category = searchParams.get('category')

    const conditions: SQL[] = []

    if (difficulty && difficulty !== 'all') {
      conditions.push(eq(challenges.difficulty, difficulty as 'beginner' | 'intermediate' | 'advanced'))
    }

    if (category && category !== 'all') {
      conditions.push(ilike(challenges.category, `%${category}%`))
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined

    const results = await db.select().from(challenges).where(where)

    return NextResponse.json({ data: results })
  } catch (error) {
    console.error('[CHALLENGES_GET]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
