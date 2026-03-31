import { NextRequest } from 'next/server'
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { EXPLAIN_SYSTEM_PROMPT } from '@/lib/ai/prompts'

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: 'AI features require an OpenAI API key. Set OPENAI_API_KEY in your .env.local file.',
      }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    const { command } = await request.json()

    if (!command || typeof command !== 'string') {
      return new Response(
        JSON.stringify({ error: 'No command provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: EXPLAIN_SYSTEM_PROMPT,
      prompt: `Explain this command: ${command}`,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('[AI_EXPLAIN]', error)
    return new Response(
      JSON.stringify({ error: 'AI explanation failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
