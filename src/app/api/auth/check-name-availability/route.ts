import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq, or } from 'drizzle-orm'
import { hasProfanity, isValidCharacterName, suggestedNames } from '@/lib/constants/onboarding'

const nameSchema = z.object({
  name: z.string().trim().min(3).max(20).regex(/^[a-zA-Z0-9_-]+$/),
})

function fallbackTakenNames(name: string): boolean {
  const reserved = ['admin', 'root', 'system', 'sensei', 'moderator']
  return reserved.includes(name.toLowerCase())
}

function buildSuggestions(name: string): string[] {
  const cleaned = name.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 12)
  return suggestedNames
    .slice(0, 4)
    .map((base, index) => `${base}${cleaned ? `_${cleaned}` : ''}${index + 1}`)
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const rawName = searchParams.get('name') ?? ''

  try {
    const parsed = nameSchema.parse({ name: rawName })

    if (hasProfanity(parsed.name) || !isValidCharacterName(parsed.name)) {
      return NextResponse.json({
        available: false,
        reason: 'invalid',
        suggestions: buildSuggestions(parsed.name),
      })
    }

    if (!process.env.DATABASE_URL) {
      const taken = fallbackTakenNames(parsed.name)
      return NextResponse.json({
        available: !taken,
        reason: taken ? 'taken' : 'available',
        suggestions: taken ? buildSuggestions(parsed.name) : [],
      })
    }

    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(or(eq(users.username, parsed.name), eq(users.displayName, parsed.name)))
      .limit(1)

    const available = existing.length === 0

    return NextResponse.json({
      available,
      reason: available ? 'available' : 'taken',
      suggestions: available ? [] : buildSuggestions(parsed.name),
    })
  } catch {
    return NextResponse.json(
      {
        available: false,
        reason: 'invalid',
        suggestions: buildSuggestions(rawName),
      },
      { status: 200 },
    )
  }
}
