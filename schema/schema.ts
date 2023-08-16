import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
});

const createPost = z.object({
  prompt: z
    .string({
      required_error: "Prompt is required",
    })
    .min(10, "Prompt must be at least 10 characters long")
    .max(100, "Prompt can be upto 100 characters long"),
  tags: z
    .array(
      z
        .string()
        .min(2, "Each tag must be at least 2 characters long")
        .max(20, "Each tag can be upto than 20 characters long")
    )
    .min(1, "You must have at least 1 tag")
    .max(5, "You can only have 5 tags"),
});

export { createPost, loginSchema };
