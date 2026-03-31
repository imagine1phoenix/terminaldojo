import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { hashSync } from 'bcryptjs'
import { eq, or } from 'drizzle-orm'
import { z } from 'zod'

const registerSchema = z.object({
  username: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().email(),
  password: z.string().min(6).max(100),
})

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json()
    const parsed = registerSchema.parse(body)

    // Check if user exists
    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(or(eq(users.email, parsed.email), eq(users.username, parsed.username)))
      .limit(1)

    if (existing.length > 0) {
      return NextResponse.json({ error: 'Email or username already taken' }, { status: 409 })
    }

    const passwordHash = hashSync(parsed.password, 10)

    await db.insert(users).values({
      email: parsed.email,
      username: parsed.username,
      displayName: parsed.username,
      passwordHash,
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 })
    }
    console.error('[REGISTER]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
