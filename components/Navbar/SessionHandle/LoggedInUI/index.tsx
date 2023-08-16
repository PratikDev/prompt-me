import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PlusIcon from "@/icons/PlusIcon";
import { FC } from "react";
import CreatePostForm from "./CreatePostForm";
import ProfileHandle from "./ProfileHandle";

const LoggedInUI: FC = () => {
  return (
    <>
      <ProfileHandle />

      <Dialog>
        <DialogTrigger asChild>
          <Button variant={`secondary`} size={`icon`} className="border">
            <PlusIcon className="w-5 xs:w-6 h-5 xs:h-6" />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Post a Prompt</DialogTitle>

            <DialogDescription>
              Write a prompt that you found helpful. Add upto 5 tags
            </DialogDescription>
          </DialogHeader>

          <CreatePostForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoggedInUI;
