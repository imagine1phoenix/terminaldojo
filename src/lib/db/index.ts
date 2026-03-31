import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

function createDb() {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Create a Neon database at https://neon.tech and add the connection string to .env.local'
    )
  }
  const sql = neon(url)
  return drizzle(sql, { schema })
}

// Lazy initialization — only creates connection when first accessed
let _db: ReturnType<typeof createDb> | null = null

export function getDb() {
  if (!_db) {
    _db = createDb()
  }
  return _db
}

// Re-export for convenience (will throw if DATABASE_URL is missing)
export const db = new Proxy({} as ReturnType<typeof createDb>, {
  get(_target, prop) {
    return (getDb() as unknown as Record<string | symbol, unknown>)[prop]
  },
})
