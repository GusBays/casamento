import { NextResponse, type NextRequest } from 'next/server'

import { updateSession } from '@/lib/supabase/proxy'

const adminPresentDefaults = {
  limit: '15',
  page: '1',
  sort: 'CREATED_AT',
  reverse: 'true'
}

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/admin') {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/presents'
    Object.entries(adminPresentDefaults).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })

    return NextResponse.redirect(url)
  }

  if (request.nextUrl.pathname === '/admin/presents') {
    const url = request.nextUrl.clone()
    let shouldRedirect = false

    Object.entries(adminPresentDefaults).forEach(([key, value]) => {
      if (!url.searchParams.has(key)) {
        url.searchParams.set(key, value)
        shouldRedirect = true
      }
    })

    if (shouldRedirect) return NextResponse.redirect(url)
  }

  return updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
}
