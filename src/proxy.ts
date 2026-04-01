import { auth } from '@/lib/auth/config'
import { NextRequest, NextResponse } from 'next/server'

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl

  const legacyAppPrefixes = [
    '/dashboard',
    '/onboarding',
    '/explore',
    '/challenges',
    '/paths',
    '/scrolls',
    '/profile',
    '/playground',
    '/ai-explain',
    '/leaderboard',
    '/settings',
    '/command',
    '/challenge',
    '/login',
    '/register',
  ]

  if (legacyAppPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = `/app${pathname}`
    return NextResponse.redirect(redirectUrl)
  }

  if (pathname === '/app') {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/app/dashboard'
    return NextResponse.redirect(redirectUrl)
  }

  if (!pathname.startsWith('/app/')) {
    return NextResponse.next()
  }

  const session = await auth()

  const protectedRoutes = [
    '/app/dashboard',
    '/app/onboarding',
    '/app/explore',
    '/app/challenges',
    '/app/paths',
    '/app/scrolls',
    '/app/profile',
    '/app/playground',
    '/app/ai-explain',
    '/app/leaderboard',
    '/app/settings',
    '/app/command',
    '/app/challenge',
  ]
  const authRoutes = ['/app/login', '/app/register']

  const isProtected = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))
  const isAuthRoute = authRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/app/login', request.url))
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/app/dashboard', request.url))
  }

  const rewriteUrl = request.nextUrl.clone()
  rewriteUrl.pathname = pathname.replace(/^\/app/, '')
  return NextResponse.rewrite(rewriteUrl)
}

export const config = {
  matcher: ['/app/:path*', '/dashboard/:path*', '/onboarding/:path*', '/explore/:path*', '/challenges/:path*', '/paths/:path*', '/scrolls/:path*', '/profile/:path*', '/playground/:path*', '/ai-explain/:path*', '/leaderboard/:path*', '/settings/:path*', '/login', '/register', '/command/:path*', '/challenge/:path*'],
}