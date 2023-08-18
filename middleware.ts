import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const notLoggedInRoutes = ["/login"];
  const loggedInRoutes = ["/edit-profile"];

  const currentPath = request.nextUrl.pathname;

  const AppwriteProject = process.env.APPWRITE_PROJECT_ID ?? "";

  const sessionNames = [
    `a_session_${AppwriteProject.toLowerCase()}`,
    `a_session_${AppwriteProject.toLowerCase()}_legacy`,
  ];

  const cookieStore = request.cookies;

  const isUserLoggedIn =
    cookieStore.has(sessionNames[0]) || cookieStore.has(sessionNames[1]);

  // If the user is logged in and tries to access a `notLoggedInRoutes` route, redirect to the homepage
  if (isUserLoggedIn && notLoggedInRoutes.includes(currentPath))
    return NextResponse.redirect(new URL("/", request.url));

  // If the user is not logged in and tries to access a `loggedInRoutes` route, redirect to the login page
  if (!isUserLoggedIn && loggedInRoutes.includes(currentPath))
    return NextResponse.redirect(new URL("/login", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/edit-profile"],
};
