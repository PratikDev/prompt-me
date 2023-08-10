import { account } from "@/appwrite/appwrite.config";
import { FC } from "react";

const NotLoggedInUI: FC = async () => {
  const { default: EmailIcon } = await import(
    "@/icons/login-providers/EmailIcon"
  );
  const { default: GoogleIcon } = await import(
    "@/icons/login-providers/GoogleIcon"
  );
  const { default: GithubIcon } = await import(
    "@/icons/login-providers/GithubIcon"
  );
  const { Fragment } = await import("react");

  const iconClasses = "md:w-6 md:h-6 w-5 h-5";
  const loginOptions = [
    <GoogleIcon className={iconClasses} />,
    <GithubIcon className={iconClasses} />,
    <EmailIcon className={iconClasses} />,
  ];

  return (
    <div
      className={`flex
          items-center
          gap-2
          xs:gap-4
          border
          rounded-full
          bg-black
          hover:bg-gray-800
          dark:bg-white
          dark:hover:bg-gray-200
          text-white
          dark:text-black
          transition
          duration-150
          py-1.5
          xs:py-2
          md:py-2.5
          pl-4
          xs:pl-5
          md:pl-7
          pr-1.5
          xs:pr-2
          md:pr-2.5`}
    >
      <span className="pointer-events-none select-none font-light text-lg md:text-xl">
        Sign In
      </span>

      <div className="flex items-center gap-1.5 xs:gap-2.5">
        {loginOptions.map((icon, index) => (
          <Fragment key={index}>{icon}</Fragment>
        ))}
      </div>
    </div>
  );
};

const LoggedInUI: FC = async () => {
  const { default: PlusIcon } = await import("@/icons/PlusIcon");
  const { Button } = await import("@/components/ui/button");
  const { default: Image } = await import("next/image");
  const { default: Link } = await import("next/link");

  return (
    <>
      <Link href={`/`} className="rounded-full">
        <Image
          src={`https://picsum.photos/200`}
          alt="logged in user"
          width={40}
          height={40}
          className="border w-9 xs:w-10 h-9 xs:h-10 rounded-full bg-gray-300"
        />
      </Link>

      <Button variant={`secondary`} size={`icon`} className="border">
        <PlusIcon className="w-5 xs:w-6 h-5 xs:h-6" />
      </Button>
    </>
  );
};

const SessionHandle: FC = async () => {
  const isUserLoggedIn = true;

  try {
    const isUserLoggedIn = await account.get();
    console.log(isUserLoggedIn);
  } catch (error) {
    console.log(error);
  }

  return isUserLoggedIn ? <LoggedInUI /> : <NotLoggedInUI />;
};

export default SessionHandle;
