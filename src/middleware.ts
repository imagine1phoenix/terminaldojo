import { auth } from '@/lib/auth/config'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const session = await auth()
  const { pathname } = request.nextUrl

  const protectedRoutes = ['/dashboard', '/explore', '/challenges', '/playground', '/ai-explain', '/leaderboard', '/settings']
  const authRoutes = ['/login', '/register']

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/explore/:path*', '/challenges/:path*', '/playground/:path*', '/ai-explain/:path*', '/leaderboard/:path*', '/settings/:path*', '/login', '/register', '/command/:path*', '/challenge/:path*'],
}
