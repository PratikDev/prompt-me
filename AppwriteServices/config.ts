import { Client } from "appwrite";

const AppwriteProject = process.env.APPWRITE_PROJECT_ID;
const AppwriteEndpoint = process.env.APPWRITE_ENDPOINT;
const SSRhostName = process.env.SSR_HOSTNAME;
const AppwriteHostname = process.env.APPWRITE_HOSTNAME;

const client = new Client();
client.setEndpoint(AppwriteEndpoint).setProject(AppwriteProject);

export {
  AppwriteEndpoint,
  AppwriteHostname,
  AppwriteProject,
  SSRhostName,
  client,
};
