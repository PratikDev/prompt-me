import { Button } from "@/components/ui/button";
import PlusIcon from "@/icons/PlusIcon";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const LoggedInUI: FC = () => {
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

export default LoggedInUI;
