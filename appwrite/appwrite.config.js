import { Account, Client } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID);

const account = new Account(client);

export { account, client };
