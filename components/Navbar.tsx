import { ThemeToggle } from "@/components/theme/ThemeToggle";
import EmailIcon from "@/icons/login-providers/EmailIcon";
import GithubIcon from "@/icons/login-providers/GithubIcon";
import GoogleIcon from "@/icons/login-providers/GoogleIcon";
import Logo from "@/icons/Logo";
import Link from "next/link";
import { FC } from "react";

const Navbar: FC = () => {
  const iconClasses = "md:w-6 md:h-6 w-5 h-5";
  const loginOptions = [
    <GoogleIcon className={iconClasses} />,
    <GithubIcon className={iconClasses} />,
    <EmailIcon className={iconClasses} />,
  ];

  return (
    <>
      <header className="py-1.5 xs:py-2.5 border-b flex justify-between items-center pr-3 xs:pr-4 px-4 xs:px-6 md:px-16">
        <Link href={`/`} className="flex-center gap-4">
          <Logo className="w-8 h-16 xs:w-10 xs:h-20 md:w-12 md:h-20" />

          <p className="text-4xl md:text-5xl font-sans hidden xs:block pointer-events-none select-none">
            PromptMe
          </p>
        </Link>

        <div className="flex items-center gap-2.5 md:gap-5">
          <ThemeToggle />

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
                <button
                  key={index}
                  className={`border
                  rounded-full
                  bg-white
                  hover:bg-gray-200
                  dark:bg-black
                  dark:hover:bg-gray-800
                  text-black
                  dark:text-white
                  box-content
                  p-1`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
