import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { commands, commandFlags, commandExamples, categories } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
  try {
    const { slug } = await params

    const [command] = await db
      .select()
      .from(commands)
      .where(eq(commands.slug, slug))
      .limit(1)

    if (!command) {
      return NextResponse.json({ error: 'Command not found' }, { status: 404 })
    }

    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.id, command.categoryId))
      .limit(1)

    const flags = await db
      .select()
      .from(commandFlags)
      .where(eq(commandFlags.commandId, command.id))
      .orderBy(commandFlags.sortOrder)

    const examples = await db
      .select()
      .from(commandExamples)
      .where(eq(commandExamples.commandId, command.id))
      .orderBy(commandExamples.sortOrder)

    return NextResponse.json({
      data: {
        ...command,
        category,
        flags,
        examples,
      },
    })
  } catch (error) {
    console.error('[COMMAND_GET]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
