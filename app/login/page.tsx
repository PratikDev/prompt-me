import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingIcon from "@/icons/helpers/LoadingIcon";
import Image from "next/image";
import { FC } from "react";

const Login: FC = () => {
  const pending = false;

  return (
    <>
      <BackButton />

      <form method="get" className="max-w-sm flex flex-col gap-3 mx-auto pt-40">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
          <p className="text-[0.8rem] text-muted-foreground">
            Your email will be used as your username. You can change it anytime
          </p>
        </div>

        <Button type="submit" className="h-10" disabled={pending}>
          {pending && <LoadingIcon className="w-5 h-5 mr-2" />}
          Login
        </Button>

        <div className="w-full flex gap-2">
          <Button className="w-full border" variant={"secondary"}>
            <Image
              alt="Login with Google"
              src={`/icons/google-48.png`}
              width={20}
              height={20}
            />

            <span className="pl-1.5">Google</span>
          </Button>

          <Button className="w-full border" variant={"secondary"}>
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
