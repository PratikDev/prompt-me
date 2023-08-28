import { evnVariables } from "@/schema/schema";
import { z } from "zod";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof evnVariables> {}
  }
}

export {};
