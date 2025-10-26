import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Array of regex patterns of paths we want to protect
  const protectedPaths = [
    /\/shipping-address/,
    /\/payment-method/,
    /\/place-order/,
    /\/profile/,
    /\/user(.*)/,
    /\/order(.*)/,
    /\/admin/,
  ]

  // Get the session token from cookies
  const sessionToken = request.cookies.get('authjs.session-token')?.value || 
                       request.cookies.get('__Secure-authjs.session-token')?.value

  // Check if user is not authenticated and accessing a protected path
  if (!sessionToken && protectedPaths.some((p) => p.test(pathname))) {
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
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api/auth).*)',
  ],
}