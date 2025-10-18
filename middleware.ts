import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
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