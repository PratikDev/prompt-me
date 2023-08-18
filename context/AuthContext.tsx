import { getCurrentUser } from "@/AppwriteServices/server";
import { Models } from "appwrite";
import { createContext } from "react";

let user: Models.User<Models.Preferences> | null = null;

(async () => {
  user = await getCurrentUser();
})();

export const AuthContext = createContext(user);
