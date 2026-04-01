import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users, userCommandProgress, userChallengeProgress, userDailyActivity } from '@/lib/db/schema'
import { eq, count } from 'drizzle-orm'
import { auth } from '@/lib/auth/config'

export async function GET(): Promise<NextResponse> {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const commandStats = await db
      .select({ count: count() })
      .from(userCommandProgress)
      .where(eq(userCommandProgress.userId, userId))

    const challengeStats = await db
      .select({ count: count() })
      .from(userChallengeProgress)
      .where(eq(userChallengeProgress.userId, userId))

    const activity = await db
      .select()
      .from(userDailyActivity)
      .where(eq(userDailyActivity.userId, userId))

    return NextResponse.json({
      data: {
        user: {
          id: user.id,
          displayName: user.displayName,
          username: user.username,
          level: user.level,
          totalXp: user.totalXp,
          currentStreak: user.currentStreak,
          longestStreak: user.longestStreak,
        },
        commandsLearned: commandStats[0]?.count ?? 0,
        challengesSolved: challengeStats[0]?.count ?? 0,
        activity,
      },
    })
  } catch (error) {
    console.error('[PROGRESS_GET]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
