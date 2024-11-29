import { clerkMiddleware } from '@clerk/nextjs/server'
import { createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/'])
const isTeacherRoute = createRouteMatcher(['/teacher(.*)'])
const isStudentRoute = createRouteMatcher(['/student(.*)'])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }

  if (isTeacherRoute(request) && (await auth()).sessionClaims?.metadata?.role !== 'TEACHER') {
    const url = new URL('/', request.url)
    return NextResponse.redirect(url)
  }

  if (isStudentRoute(request) && (await auth()).sessionClaims?.metadata?.role !== 'STUDENT') {
    const url = new URL('/', request.url)
    return NextResponse.redirect(url)
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}