"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingIcon from "@/icons/helpers/LoadingIcon";
import PenIcon from "@/icons/helpers/PenIcon";
import { Models } from "appwrite";
import {
  Dispatch,
  FC,
  FormEvent,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { UserAvatar } from "../ui/avatar";

async function uploadAvatar(
  file: File,
  userId: string,
  prefAvatarLinkAvailable: boolean
) {
  const { toast } = await import("react-hot-toast");
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    formData.append(
      "prefAvatarLinkAvailable",
      prefAvatarLinkAvailable.toString()
    );

    const options = {
      method: "POST",
      body: formData,
    };
    const res = await fetch("/api/upload-avatar", options);

    if (!res.ok) {
      const data = await res.json();
      toast.error(data.message);
      return;
    }

    toast.success("Avatar Updated Successfully");
  } catch (error) {
    toast.error("Something went wrong. Please try again later");
  }
}

async function updateName(username: string) {
  const { toast } = await import("react-hot-toast");

  try {
    const res = await fetch("/api/update-name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    if (!res.ok) {
      const data = await res.json();
      toast.error(data.message);
      return;
    }

    toast.success("Name Updated Successfully");
  } catch (error) {
    toast.error("Something went wrong. Please try again later");
  }
}

async function handleSubmit({
  e,
  formRef,
  userId,
  currentName,
  prefAvatarLinkAvailable,
  setPending,
}: {
  e: FormEvent<HTMLFormElement>;
  formRef: RefObject<HTMLFormElement>;
  userId: string;
  currentName: string;
  prefAvatarLinkAvailable: boolean;
  setPending: Dispatch<SetStateAction<boolean>>;
}) {
  e.preventDefault();

  const newUserName: string | null = formRef.current?.username?.value;

  const parsableObject = {
    userName: newUserName,
    userId,
  };

  const { editProfile } = await import("@/schema/schema");
  const schemaResponse = editProfile.safeParse(parsableObject);

  if (!schemaResponse.success) {
    const { toast } = await import("react-hot-toast");
    const message = schemaResponse.error.issues[0].message;
    toast.error(message);
    return;
  }

  /*
    doing all this, just to avoid
    unnecessary api calls and state changes
  */
  const { userName, userId: userId__data } = schemaResponse.data;
  const promiseArray = [];

  if (userName !== currentName) {
    promiseArray.push(updateName(userName));
  }

  const file = formRef.current?.image?.files?.[0];
  if (file) {
    promiseArray.push(
      uploadAvatar(file as File, userId__data, prefAvatarLinkAvailable)
    );
  }

  if (!promiseArray.length) return;
  try {
    setPending(true);
    await Promise.all(promiseArray);
  } finally {
    setPending(false);
  }
}

async function handleImageChange({
  e,
  setImage,
}: {
  e: FormEvent<HTMLInputElement>;
  setImage: Dispatch<SetStateAction<string | undefined>>;
}) {
  const file = e?.currentTarget?.files?.[0];
  if (!file) return;

  const { isImageValid } = await import("@/lib/isImageValid");
  const imageValidityCheck = isImageValid(file);
  if (!imageValidityCheck.success) {
    const { toast } = await import("react-hot-toast");
    toast.error(imageValidityCheck.message);
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(imageValidityCheck.file);

  reader.onloadend = () => {
    setImage(reader.result?.toString());
  };
}

const Form: FC<{ user: Models.User<Models.Preferences> }> = ({ user }) => {
  // TODO: Handle this in middleware
  if (!user) {
    window.location.href = "/login";
    return null;
  }

  const userImage: string | undefined = user.prefs.avatar;
  const userName = user.name || user.email.split("@")[0].substring(0, 25);
  const userId = user.$id;

  const [pending, setPending] = useState(false);
  const [image, setImage] = useState<string | undefined>(userImage);

  const formRef = useRef<HTMLFormElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <form
        ref={formRef}
        onSubmit={(e) =>
          handleSubmit({
            e,
            formRef,
            userId,
            currentName: userName,
            prefAvatarLinkAvailable: !!userImage,
            setPending,
          })
        }
        className="max-w-sm flex flex-col items-center gap-3 mx-auto pt-32"
      >
        <div
          className="group relative cursor-pointer rounded-full"
          aria-describedby="Change profile picture"
          onClick={(e) => {
            e.preventDefault();
            imageInputRef.current?.click();
          }}
        >
          <PenIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:z-10 transition" />

          <UserAvatar
            className="w-48 h-48 group-hover:opacity-30 group-hover:pointer-events-none transition border"
            src={image}
            fallBack="USER"
          />
        </div>

        <input
          ref={imageInputRef}
          onChange={(e) => handleImageChange({ e, setImage })}
          id="image"
          name="image"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          className="sr-only hidden"
        />

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            placeholder="username"
            defaultValue={userName}
            required
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email" className="opacity-50">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            readOnly
            disabled
            required
            value={user.email}
          />
        </div>

        <Button type="submit" className="w-full mt-2" disabled={pending}>
          {pending && <LoadingIcon className="w-5 h-5 mr-2" />}
          Update
        </Button>
      </form>
    </>
  );
};

export default Form;
