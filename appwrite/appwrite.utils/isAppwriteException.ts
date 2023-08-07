import { AppwriteException } from "appwrite";

export function isAppwriteException(
  error: unknown
): error is AppwriteException {
  return error instanceof AppwriteException;
}
