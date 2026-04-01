import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth/config'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq, or } from 'drizzle-orm'
import { hasProfanity, isValidCharacterName } from '@/lib/constants/onboarding'

const bodySchema = z.object({
  name: z.string().trim().min(3).max(20).regex(/^[a-zA-Z0-9_-]+$/),
  avatarId: z.string().min(2).max(40),
  philosophyId: z.enum(['shoshin', 'kyudo', 'shojin']),
})

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const parsed = bodySchema.parse(body)

    if (hasProfanity(parsed.name) || !isValidCharacterName(parsed.name)) {
      return NextResponse.json({ error: 'Invalid character name' }, { status: 400 })
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ success: true, mock: true })
    }

    const duplicate = await db
      .select({ id: users.id })
      .from(users)
      .where(or(eq(users.username, parsed.name), eq(users.displayName, parsed.name)))
      .limit(1)

    if (duplicate.length > 0) {
      return NextResponse.json({ error: 'Name already taken' }, { status: 409 })
    }

    await db
      .update(users)
      .set({
        displayName: parsed.name,
        avatarUrl: `/avatars/${parsed.avatarId}.svg`,
      })
      .where(eq(users.id, session.user.id))

    return NextResponse.json({
      success: true,
      profile: {
        name: parsed.name,
        avatarId: parsed.avatarId,
        philosophyId: parsed.philosophyId,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 })
    }
    console.error('[CREATE_CHARACTER]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
