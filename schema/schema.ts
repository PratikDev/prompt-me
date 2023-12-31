import { z } from "zod";

const evnVariables = z.object({
  APPWRITE_ENDPOINT: z.string().trim(),
  APPWRITE_PROJECT_ID: z.string().trim(),
  APPWRITE_HOSTNAME: z.string().trim(),
  SSR_HOSTNAME: z.string().trim(),
  SSR_URL: z.string().trim(),
});

const loginSchema = z.object({
  email: z.string().trim().email(),
});

// schema for username checking if only alphanumeric
const usernameSchema = z
  .string()
  .trim()
  .min(1, { message: "Username must have at least one character" })
  .max(25, { message: "Username can have upto 25 characters" })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username: Letters, numbers, and underscores only.",
  });

const userIdSchema = z
  .string()
  .trim()
  .min(10, { message: "Invalid user" })
  .max(36, { message: "Invalid user" });

const createPost = z.object({
  prompt: z
    .string({
      required_error: "Prompt is required",
    })
    .trim()
    .min(10, { message: "Prompt must be at least 10 characters long" })
    .max(1000, { message: "Prompt can be upto 500 characters long" }),
  tags: z
    .array(
      z
        .string()
        .trim()
        .min(2, { message: "Each tag must be at least 2 characters long" })
        .max(20, { message: "Each tag can be upto than 20 characters long" })
    )
    .nonempty({ message: "You must have at least 1 tag" })
    .max(5, { message: "You can only have 5 tags" }),
  createdBy: userIdSchema,
  userName: usernameSchema,
});

const editProfile = z.object({
  userName: usernameSchema,
  userId: userIdSchema,
});

export {
  createPost,
  editProfile,
  evnVariables,
  loginSchema,
  userIdSchema,
  usernameSchema,
};
