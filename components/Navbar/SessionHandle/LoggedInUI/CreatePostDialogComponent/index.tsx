"use client";

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
import { FC, useState } from "react";
import CreatePostForm from "./CreatePostForm";
import { CreatePostDialogComponentProps } from "./types";

const CreatePostDialogComponent: FC<CreatePostDialogComponentProps> = ({
  userId,
  userEmail,
  userName,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
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

          <CreatePostForm
            userId={userId}
            userEmail={userEmail}
            userName={userName}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatePostDialogComponent;
