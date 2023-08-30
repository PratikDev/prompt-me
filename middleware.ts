import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const NOT_LOGGED_IN_ROUTES = ["/login"];
const LOGGED_IN_ROUTES = ["/edit-profile"];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  const AppwriteProject = process.env.APPWRITE_PROJECT_ID ?? "";

  const sessionNames = [
    `a_session_${AppwriteProject.toLowerCase()}`,
    `a_session_${AppwriteProject.toLowerCase()}_legacy`,
  ];

  const cookieStore = request.cookies;

  const isUserLoggedIn =
    cookieStore.has(sessionNames[0]) || cookieStore.has(sessionNames[1]);

  /*
    TODO: 
    Use below method to implement middleware validation.
    but before that, need to research with the `isomorphic-form-data` issue
  */
  // const { AppwriteServices } = await import("@/AppwriteServices");
  // const appwriteServices = new AppwriteServices();
  // const isUserLoggedIn = (await appwriteServices.getCurrentUser()) !== null;

  /*
    If the user is logged in and tries to access any
    `notLoggedInRoutes` route, redirect to the homepage
  */
  if (isUserLoggedIn && NOT_LOGGED_IN_ROUTES.includes(currentPath)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  /*
    If the user is not logged in and tries to access any
    `loggedInRoutes` route, redirect to the login page
  */
  if (!isUserLoggedIn && LOGGED_IN_ROUTES.includes(currentPath)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/edit-profile"],
};
