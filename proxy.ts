import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isTeacherRoute = createRouteMatcher(["/teacher(.*)"]);
const isStudentRoute = createRouteMatcher(["/student(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const teacherRoute = isTeacherRoute(req);
  const studentRoute = isStudentRoute(req);

  if (!teacherRoute && !studentRoute) {
    return;
  }

  await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
