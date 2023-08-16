"use client";

import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingIcon from "@/icons/helpers/LoadingIcon";
import Image from "next/image";
import Link from "next/link";
import {
  Dispatch,
  FC,
  FormEvent,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";

const handleSubmit = async ({
  e,
  formRef,
  setPending,
}: {
  e: FormEvent<HTMLFormElement>;
  formRef: RefObject<HTMLFormElement>;
  setPending: Dispatch<SetStateAction<boolean>>;
}) => {
  e.preventDefault();

  const email = formRef.current?.email.value;
  const formData = { email };

  const { loginSchema } = await import("@/schema/schema");
  const result = loginSchema.safeParse(formData);

  const { toast } = await import("react-hot-toast");
  if (!result.success) {
    toast.error(result.error.issues[0].message);
    return;
  }

  setPending(true);
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    const successToastJSX = () => (
      <div>
        <p className="text-sm">
          A login link has been sent to{" "}
          <Link href={`https://gmail.com`} className="text-blue-700 underline">
            {formData.email}
          </Link>
        </p>
      </div>
    );

    toast.success(successToastJSX, {
      duration: 5000,
    });
  } catch (error) {
    toast.error("Something went wrong. Please try again later");
  } finally {
    setPending(false);
  }
};

const Login: FC = () => {
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <BackButton />

      <form
        ref={formRef}
        onSubmit={(e) => handleSubmit({ e, formRef, setPending })}
        className="max-w-sm flex flex-col gap-3 mx-auto pt-40"
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">*Email</Label>
          <Input type="email" id="email" placeholder="Email" required />
          <p className="text-[0.8rem] text-muted-foreground">
            Your email will be used as your username. You can change it anytime
          </p>
        </div>

        <Button type="submit" className="h-10" disabled={pending}>
          {pending && <LoadingIcon className="w-5 h-5 mr-2" />}
          Login
        </Button>

        <div className="w-full flex gap-2">
          <Button type="button" className="w-full border" variant={"secondary"}>
            <Image
              alt="Login with Google"
              src={`/icons/google-48.png`}
              width={20}
              height={20}
            />

            <span className="pl-1.5">Google</span>
          </Button>

          <Button type="button" className="w-full border" variant={"secondary"}>
            <Image
              alt="Login with Github"
              src={`/icons/github-64.png`}
              width={25}
              height={25}
            />

            <span className="pl-1.5">Github</span>
          </Button>
        </div>
      </form>
    </>
  );
};

export default Login;
