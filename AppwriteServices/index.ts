import { Account, Databases, Storage } from "appwrite";
import { AppwriteProject, client } from "./config";

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

class AppwriteServices {
  private async getCookieValue() {
    try {
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

      return hash?.value || "";
    } catch (error) {
      throw new Error((<Error>error).message);
    }
  }

  private async setSession() {
    try {
      const cookieValue = await this.getCookieValue();

      const authCookies = {
        [`a_session_${AppwriteProject.toLowerCase()}`]: cookieValue,
      };

      client.headers["X-Fallback-Cookies"] = JSON.stringify(authCookies);
    } catch (error) {
      throw new Error((<Error>error).message);
    }
  }

  /**
   * Get Account
   *
   * Get currently logged in user data as JSON object.
   * @throws {AppwriteException}
   */
  getCurrentUser = async () => {
    try {
      await this.setSession();

      return await account.get();
    } catch (error) {
      // throw new Error((<Error>error).message);
      /*
        Cannot throw an error here,
        cause in Appwrite's `account.get()`,
        catch means the user is not logged in.      
      */
    }

    return null;
  };

  /**
   * Create Magic URL session (confirmation)
   *
   * Use this endpoint to complete creating the session with the Magic URL. Both
   * the **userId** and **secret** arguments will be passed as query parameters
   * to the redirect URL you have provided when sending your request to the
   * [POST
   * /account/sessions/magic-url](/docs/client/account#accountCreateMagicURLSession)
   * endpoint.
   *
   * Please note that in order to avoid a [Redirect
   * Attack](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.md)
   * the only valid redirect URLs are the ones from domains you have set when
   * adding your platforms in the console interface.
   *
   * @param {Object} credentials
   * @param {string} credentials.userId
   * @param {string} credentials.secret
   * @throws {AppwriteException}
   */
  updateMagicURLSession = async ({
    userId,
    secret,
  }: {
    userId: string;
    secret: string;
  }) => {
    try {
      type Headers = {
        [key: string]: string;
      };

      const headers: Headers = {
        "Content-Type": "application/json",
        ...client.headers,
      };

      const payload = {
        userId,
        secret,
      };

      const options: RequestInit = {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
        credentials: "include",
      };

      const URL = `${client.config.endpoint}/account/sessions/magic-url`;

      return await fetch(URL, options);
    } catch (error) {
      throw new Error((<Error>error).message);
    }
  };

  private async deleteSession() {
    const { cookies } = await import("next/headers");

    const sessionNames = [
      `a_session_${AppwriteProject.toLowerCase()}`,
      `a_session_${AppwriteProject.toLowerCase()}_legacy`,
    ];

    const cookieStore = cookies();
    const hash = [
      cookieStore.get(sessionNames[0]),
      cookieStore.get(sessionNames[1]),
    ];

    // delete all cookies
    hash.forEach((cookie) => {
      /*
        check the cookie existence.
        it might be like your friends. (doesn't exist)
      */
      if (cookie) cookieStore.delete(cookie.name);
    });
  }

  logout = async () => {
    try {
      await account.deleteSession("current");

      /*
        delete the server cookies,
        once logging out is completed by appwrite
      */
      await this.deleteSession();
    } catch (error) {
      throw new Error((<Error>error).message);
    }
  };
}

export { AppwriteServices, account, database, storage };
