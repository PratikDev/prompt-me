import { Button } from "@/components/ui/button";
import PlusIcon from "@/icons/PlusIcon";
import { FC } from "react";
import ProfileHandle from "./ProfileHandle";

const LoggedInUI: FC = () => {
  return (
    <>
      <ProfileHandle />

      <Button variant={`secondary`} size={`icon`} className="border">
        <PlusIcon className="w-5 xs:w-6 h-5 xs:h-6" />
      </Button>
    </>
  );
};

export default LoggedInUI;
