"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logout from "@/icons/profile-options/Logout";
import MyPrompts from "@/icons/profile-options/MyPrompts";
import Profile from "@/icons/profile-options/Profile";
import { Models } from "appwrite";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface LogoutComponentProps {
  loggingOut: boolean;
  setLoggingOut: Dispatch<SetStateAction<boolean>>;
}
const LogoutComponent: FC<LogoutComponentProps> = ({
  loggingOut,
  setLoggingOut,
}) => {
  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);

    const { toast } = await import("react-hot-toast");
    try {
      const response = await fetch("/api/auth/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      if (!response.ok) {
        toast.error(json.message);
        return;
      }

      toast.success(json.message);
      window.location.href = "/";
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <DropdownMenuItem
      onClick={handleLogout}
      className="cursor-pointer"
      disabled={loggingOut}
    >
      <Logout />
      <span>Logout</span>
    </DropdownMenuItem>
  );
};

const options = [
  {
    icon: <MyPrompts />,
    text: "My Prompts",
    link: (userId: string) => `/user/${userId}`,
  },
  {
    icon: <Profile />,
    text: "Edit Profile",
    link: () => `/edit-profile`,
  },
];

const ProfileHandle: FC<{ currentUser: Models.User<Models.Preferences> }> = ({
  currentUser,
}) => {
  const [loggingOut, setLoggingOut] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="p-0 h-auto rounded-full">
            <Image
              src={`https://picsum.photos/200`}
              alt="logged in user"
              width={40}
              height={40}
              className="border w-9 xs:w-10 h-9 xs:h-10 rounded-full bg-gray-300"
            />
            <span className="sr-only">Profile Options</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {options.map(({ text, link, icon }, index) => (
            <Link
              key={index}
              href={link(currentUser.$id)}
              className="flex items-center w-full"
            >
              <DropdownMenuItem className="cursor-pointer w-full">
                {icon}
                <span>{text}</span>
              </DropdownMenuItem>
            </Link>
          ))}

          <LogoutComponent
            loggingOut={loggingOut}
            setLoggingOut={setLoggingOut}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileHandle;
