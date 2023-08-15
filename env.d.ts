declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APPWRITE_ENDPOINT: string;
      APPWRITE_PROJECT_ID: string;
      APPWRITE_HOSTNAME: string;
      SSR_HOSTNAME: string;
    }
  }
}

export {};
