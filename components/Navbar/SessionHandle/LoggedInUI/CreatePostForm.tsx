"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dispatch,
  FC,
  FormEvent,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";

/**
 * Validates the form data using zod and returns the form data if valid
 * @param {Object} param0
 * @param {string} param0.prompt - User inputted prompt string
 * @param {string} param0.tagsString - User inputted tags string
 */
const validation = async ({
  prompt,
  tagsString,
}: {
  prompt: string;
  tagsString: string;
}) => {
  const tags = tagsString
    ?.toString()
    .split(",")
    .map((tag: string) => tag.trim());

  const formData = { prompt, tags };

  const { createPost } = await import("@/schema/schema");
  const result = createPost.safeParse(formData);

  const { toast } = await import("react-hot-toast");
  if (!result.success) {
    toast.error(result.error.issues[0].message);
    return false;
  }

  return formData;
};

const handleSubmit = async ({
  e,
  formRef,
  pending,
  setPending,
}: {
  e: FormEvent<HTMLFormElement>;
  formRef: RefObject<HTMLFormElement>;
  pending: boolean;
  setPending: Dispatch<SetStateAction<boolean>>;
}) => {
  e.preventDefault();

  if (pending) return;

  const prompt = formRef.current?.prompt.value;
  const tagsString = formRef.current?.tags.value;

  const formData = await validation({ prompt, tagsString });
  if (!formData) return;

  setPending(true);
  const { toast } = await import("react-hot-toast");
  try {
    const res = await fetch("/api/create-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    toast.success("Post created successfully");
  } catch (error) {
    toast.error("Something went wrong. Please try again later");
  } finally {
    setPending(false);
  }
};

const CreatePostForm: FC = () => {
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <form
        ref={formRef}
        onSubmit={(e) => handleSubmit({ e, formRef, pending, setPending })}
        className="grid gap-4 pt-2"
      >
        <div className="grid w-full gap-1.5">
          <Label htmlFor="prompt">Your message</Label>
          <Textarea placeholder="Type your prompt here" id="prompt" required />
        </div>

        <div className="grid w-full gap-1.5">
          <Label htmlFor="tags">Tags</Label>

          <Input
            required
            id="tags"
            placeholder="life, history, career"
            className="col-span-3"
          />
        </div>

        <DialogFooter>
          <Button type="submit">Post</Button>
        </DialogFooter>
      </form>
    </>
  );
};

export default CreatePostForm;
