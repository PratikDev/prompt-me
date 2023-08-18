"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import LoadingIcon from "@/icons/helpers/LoadingIcon";
import {
  Dispatch,
  FC,
  FormEvent,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { CreatePostDialogComponentProps } from "./types";

/**
 * Validates the form data using zod and returns the form data if valid
 * @param {Object} param0
 * @param {string} param0.prompt - User inputted prompt string
 * @param {string} param0.tagsString - User inputted tags string
 */
const validation = async ({
  prompt,
  tagsString,
  createdBy,
  userName,
}: {
  prompt: string;
  tagsString: string;
  createdBy: string;
  userName: string;
}) => {
  // generate tags array from tags string. replace spaces with underscores
  const tags = tagsString
    ?.toString()
    .split(",")
    .map((tag: string) => tag.trim().replaceAll(" ", "_"));

  const formData = { prompt, tags, createdBy, userName };

  const { createPost } = await import("@/schema/schema");
  const result = createPost.safeParse(formData);

  const { toast } = await import("react-hot-toast");
  if (!result.success) {
    toast.error(result.error.issues[0].message);
    return false;
  }

  return formData;
};

interface handleSubmitProps {
  e: FormEvent<HTMLFormElement>;
  formRef: RefObject<HTMLFormElement>;
  pending: boolean;
  userInfo: CreatePostDialogComponentProps;
  setPending: Dispatch<SetStateAction<boolean>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const handleSubmit = async ({
  e,
  formRef,
  pending,
  userInfo,
  setPending,
  setOpen,
}: handleSubmitProps) => {
  e.preventDefault();

  if (pending) return;

  const prompt = formRef.current?.prompt.value;
  const tagsString = formRef.current?.tags.value;

  const createdBy = userInfo.userId;
  const userName =
    userInfo.userName || userInfo.userEmail.split("@")[0].substring(0, 25);

  const formData = await validation({
    prompt,
    tagsString,
    createdBy,
    userName,
  });
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
    setOpen(false);
  } catch (error) {
    toast.error("Something went wrong. Please try again later");
  } finally {
    setPending(false);
  }
};

interface CreatePostFormProps extends CreatePostDialogComponentProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreatePostForm: FC<CreatePostFormProps> = ({
  userId,
  userEmail,
  userName,
  setOpen,
}) => {
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const userInfo = { userId, userEmail, userName };

  return (
    <>
      <form
        ref={formRef}
        onSubmit={(e) =>
          handleSubmit({ e, formRef, pending, userInfo, setPending, setOpen })
        }
        className="grid gap-5 pt-2"
      >
        <div className="grid w-full gap-1.5">
          <Label htmlFor="prompt">Your Prompt</Label>
          <Textarea
            placeholder="Type your prompt here..."
            id="prompt"
            required
            minLength={10}
            maxLength={1000}
          />
        </div>

        <div className="grid w-full gap-1.5">
          <Label htmlFor="tags">Tags</Label>

          <Input
            type="text"
            required
            id="tags"
            placeholder="life, history, career"
            className="col-span-3"
          />

          <p className="text-xs text-muted-foreground">
            Separate tags with commas. White spaces between two words will be{" "}
            {` `}
            <i>replaced_with_underscores</i>.
          </p>
        </div>

        <DialogFooter>
          <Button type="submit" disabled={pending} className="w-full">
            {pending && <LoadingIcon className="w-5 h-5 mr-2" />}
            Post
          </Button>
        </DialogFooter>
      </form>
    </>
  );
};

export default CreatePostForm;
