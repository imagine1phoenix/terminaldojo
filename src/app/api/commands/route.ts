import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { commands, categories, commandFlags, commandExamples } from '@/lib/db/schema'
import { eq, ilike, and, SQL } from 'drizzle-orm'

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const difficulty = searchParams.get('difficulty')
    const search = searchParams.get('search')

    const conditions: SQL[] = []

    if (category && category !== 'all') {
      const [cat] = await db.select({ id: categories.id }).from(categories).where(eq(categories.slug, category)).limit(1)
      if (cat) conditions.push(eq(commands.categoryId, cat.id))
    }

    if (difficulty && difficulty !== 'all') {
      conditions.push(eq(commands.difficulty, difficulty as 'beginner' | 'intermediate' | 'advanced'))
    }

    if (search) {
      conditions.push(ilike(commands.name, `%${search}%`))
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined

    const results = await db
      .select({
        id: commands.id,
        name: commands.name,
        slug: commands.slug,
        shortDescription: commands.shortDescription,
        difficulty: commands.difficulty,
        dangerLevel: commands.dangerLevel,
        categoryId: commands.categoryId,
        categoryName: categories.name,
        categoryIcon: categories.icon,
      })
      .from(commands)
      .leftJoin(categories, eq(commands.categoryId, categories.id))
      .where(where)
      .orderBy(commands.sortOrder)

    return NextResponse.json({ data: results })
  } catch (error) {
    console.error('[COMMANDS_GET]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
