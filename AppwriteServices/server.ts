import { AppwriteException } from "appwrite";
import "server-only";

/**
 * Get Account
 *
 * Get currently logged in user data as JSON object.
 * @throws {AppwriteException}
 */
async function getCurrentUser() {
  try {
    const { AppwriteProject, account, client } = await import(".");
    const { cookies } = await import("next/headers");

    const sessionNames = [
      `a_session_${AppwriteProject.toLowerCase()}`,
      `a_session_${AppwriteProject.toLowerCase()}_legacy`,
    ];

    const cookieStore = cookies();
    const hash =
      cookieStore.get(sessionNames[0]) ??
      cookieStore.get(sessionNames[1]) ??
      null;

    const authCookies = {
      [`a_session_${AppwriteProject.toLowerCase()}`]: hash?.value || "",
    };

    client.headers["X-Fallback-Cookies"] = JSON.stringify(authCookies);

    return await account.get();
  } catch (e) {
    // if (e instanceof AppwriteException) {
    //   throw e;
    // }
    // throw new AppwriteException((<Error>e).message);
  }

  return null;
}

export { getCurrentUser };
