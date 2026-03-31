import { NextRequest } from 'next/server'
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { CHAT_SYSTEM_PROMPT } from '@/lib/ai/prompts'

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: 'AI chat requires an OpenAI API key. Set OPENAI_API_KEY in your .env.local file.',
      }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Messages array required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: CHAT_SYSTEM_PROMPT,
      messages: messages.slice(-20), // Max 20 messages
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('[AI_CHAT]', error)
    return new Response(
      JSON.stringify({ error: 'AI chat failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
