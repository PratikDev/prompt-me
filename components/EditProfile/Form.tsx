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
  SetStateAction,
  useRef,
  useState,
} from "react";
import { UserAvatar } from "../ui/avatar";

async function handleSubmit(e: FormEvent<HTMLFormElement>) {}

async function handleImageChange({
  e,
  setImage,
}: {
  e: FormEvent<HTMLInputElement>;
  setImage: Dispatch<SetStateAction<string | undefined>>;
}) {
  const file = e.currentTarget.files?.[0];

  if (!file) return;

  const { toast } = await import("react-hot-toast");
  if (file.size > 1024 * 1024 * 5) {
    toast.error("Image must be less than 5MB");
    return;
  }

  const acceptedFormats = ["image/png", "image/jpeg", "image/jpg"];
  if (!acceptedFormats.includes(file.type)) {
    toast.error("Image must be a PNG, JPG or JPEG");
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onloadend = () => {
    setImage(reader.result?.toString());
  };
}

const Form: FC<{ user: Models.User<Models.Preferences> | null }> = ({
  user,
}) => {
  if (!user) {
    window.location.href = "/login";
    return null;
  }

  const userImage: string | undefined = user.prefs.avatar;
  const userName = user.name || user.email.split("@")[0].substring(0, 25);

  const [pending, setPending] = useState(false);
  const [image, setImage] = useState<string | undefined>(userImage);
  const formRef = useRef<HTMLFormElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
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
