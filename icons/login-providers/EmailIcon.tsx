import { loginProviders } from "@/icons/className-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";

const EmailIcon: FC<{ className?: string }> = ({
  className: customClasses,
}) => {
  return (
    <Link
      href="/login"
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
      <svg
        className={cn(customClasses, loginProviders)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
      </svg>
    </Link>
  );
};

export default EmailIcon;
