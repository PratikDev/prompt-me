import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
});

const createPost = z.object({
  prompt: z
    .string({
      required_error: "Prompt is required",
    })
    .min(10, { message: "Prompt must be at least 10 characters long" })
    .max(1000, { message: "Prompt can be upto 500 characters long" }),
  tags: z
    .array(
      z
        .string()
        .min(2, { message: "Each tag must be at least 2 characters long" })
        .max(20, { message: "Each tag can be upto than 20 characters long" })
    )
    .nonempty({ message: "You must have at least 1 tag" })
    .max(5, { message: "You can only have 5 tags" }),
  createdBy: z
    .string()
    .min(10, { message: "Invalid user" })
    .max(36, { message: "Invalid user" }),
  userName: z
    .string()
    .min(1, { message: "Invalid username" })
    .max(25, { message: "Invalid username" }),
});

export { createPost, loginSchema };
