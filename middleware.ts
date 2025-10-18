import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected paths that require authentication
  const protectedPaths = [
    /\/shipping-address/,
    /\/payment-method/,
    /\/place-order/,
    /\/profile/,
    /\/user(.*)/,
    /\/order(.*)/,
    /\/admin/,
  ]

  // Check if current path is protected
  const isProtectedPath = protectedPaths.some((pattern) => pattern.test(pathname))

  // Get the token to check if user is authenticated
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // If protected path and no token, redirect to sign-in
  if (isProtectedPath && !token) {
    const signInUrl = new URL('/sign-in', request.url)
    signInUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(signInUrl)
  }

  // Check for session cart cookie
  if (!request.cookies.get('sessionCartId')) {
    const sessionCartId = crypto.randomUUID()
    const response = NextResponse.next()
    response.cookies.set('sessionCartId', sessionCartId)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*|images).*)',
  ],
}