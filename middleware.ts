import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"
export async function middleware(req: NextRequest) {
  // Create Supabase client using request cookies (server-side)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: req.cookies }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isAuthenticated = Boolean(session)

  const isProtectedRoute =
    req.nextUrl.pathname.startsWith("/profile") ||
    req.nextUrl.pathname.startsWith("/watchlist") ||
    req.nextUrl.pathname.startsWith("/admin")

  const isAuthRoute =
    req.nextUrl.pathname.startsWith("/auth/signin") ||
    req.nextUrl.pathname.startsWith("/auth/signup")

  if (isProtectedRoute && !isAuthenticated) {
    const redirectUrl = new URL("/auth/signin", req.url)
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/profile/:path*", "/watchlist/:path*", "/admin/:path*", "/auth/signin", "/auth/signup"],
}







