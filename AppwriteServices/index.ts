import { Account, Client, Databases, Storage } from "appwrite";

const AppwriteProject = process.env.APPWRITE_PROJECT_ID;
const AppwriteEndpoint = process.env.APPWRITE_ENDPOINT;
const SSRhostName = process.env.SSR_HOSTNAME;
const AppwriteHostname = process.env.APPWRITE_HOSTNAME;

const client = new Client();
const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

client.setEndpoint(AppwriteEndpoint).setProject(AppwriteProject);

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
async function updateMagicURLSession({
  userId,
  secret,
}: {
  userId: string;
  secret: string;
}) {
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
}

export {
  AppwriteEndpoint,
  AppwriteHostname,
  AppwriteProject,
  SSRhostName,
  account,
  client,
  database,
  storage,
  updateMagicURLSession,
};
