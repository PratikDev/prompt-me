declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APPWRITE_ENDPOINT: string;
      APPWRITE_PROJECT_ID: string;
    }
  }
}

export {};
