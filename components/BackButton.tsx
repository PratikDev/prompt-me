"use client";

import BackIcon from "@/icons/helpers/BackIcon";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Button } from "./ui/button";

const BackButton: FC = () => {
  const router = useRouter();

  return (
    <>
      <Button
        variant={`ghost`}
        className="pl-2 absolute top-0 left-0"
        onClick={() => router.back()}
      >
        <BackIcon />
        <span>Back</span>
      </Button>
    </>
  );
};

export default BackButton;
