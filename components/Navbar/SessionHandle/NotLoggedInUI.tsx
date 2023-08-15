import EmailIcon from "@/icons/login-providers/EmailIcon";
import GithubIcon from "@/icons/login-providers/GithubIcon";
import GoogleIcon from "@/icons/login-providers/GoogleIcon";
import { FC, Fragment } from "react";

const NotLoggedInUI: FC = () => {
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

export default NotLoggedInUI;
