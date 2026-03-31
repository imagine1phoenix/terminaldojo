import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50)

    const leaderboard = await db
      .select({
        id: users.id,
        username: users.username,
        displayName: users.displayName,
        avatarUrl: users.avatarUrl,
        level: users.level,
        totalXp: users.totalXp,
        currentStreak: users.currentStreak,
      })
      .from(users)
      .orderBy(desc(users.totalXp))
      .limit(limit)

    return NextResponse.json({ data: leaderboard })
  } catch (error) {
    console.error('[LEADERBOARD_GET]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
