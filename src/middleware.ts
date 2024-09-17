import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV === 'development') return NextResponse.next()

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  // const cspHeader = `
  //   default-src 'self' vercel.live;
  //   script-src 'self' 'unsafe-eval' 'unsafe-inline' *.cloudflareinsights.com cdn.vercel-insights.com vercel.live va.vercel-scripts.com;
  //   style-src 'self' 'unsafe-inline' *.vercel-storage.com fonts.googleapis.com;
  //   img-src * blob: data: *.vercel-storage.com;
  //   media-src 'none';
  //   connect-src *;
  //   object-src 'none';
  //   base-uri 'none';
  //   form-action 'self';
  //   font-src 'self' *.public.blob.vercel-storage.com *.vercel-storage.com fonts.googleapis.com fonts.gstatic.com;
  //   frame-src 'self' https://verify.walletconnect.com/ https://verify.walletconnect.org/ https://vercel.live/;
  //   frame-ancestors 'self';
  //   block-all-mixed-content;
  //   upgrade-insecure-requests;
  // `

  const cspHeader = `
    worker-src 'self' 'unsafe-inline' *.cloudflareinsights.com cdn.vercel-insights.com vercel.live va.vercel-scripts.com blob:;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' *.cloudflareinsights.com cdn.vercel-insights.com vercel.live va.vercel-scripts.com;
    media-src 'none';
    connect-src *;
    object-src 'none';
    base-uri 'none';
    form-action 'self';
    frame-src 'self' https://verify.walletconnect.com/ https://verify.walletconnect.org/ https://vercel.live/ https://app.interface.social/;
    frame-ancestors 'self';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `

  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' }
      ]
    }
  ]
}
