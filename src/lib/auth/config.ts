import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

const authSecret =
  process.env.AUTH_SECRET ??
  process.env.NEXTAUTH_SECRET ??
  'local-dev-secret-change-me'

const hasDatabaseUrl = Boolean(process.env.DATABASE_URL)
const localDevDemoEmail = process.env.DEV_LOGIN_EMAIL ?? 'alex@example.com'
const localDevDemoPassword = process.env.DEV_LOGIN_PASSWORD ?? 'password123'

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: authSecret,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const email = credentials.email as string
        const password = credentials.password as string

        // Dev fallback when DATABASE_URL is unavailable.
        if (!hasDatabaseUrl && process.env.NODE_ENV !== 'production') {
          if (email === localDevDemoEmail && password === localDevDemoPassword) {
            return {
              id: 'local-dev-user',
              email: localDevDemoEmail,
              name: 'Alex Chen',
              image: null,
            }
          }
          return null
        }

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1)

        if (!user || !user.passwordHash) return null

        const isValid = await compare(password, user.passwordHash)
        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.displayName,
          image: user.avatarUrl,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})
