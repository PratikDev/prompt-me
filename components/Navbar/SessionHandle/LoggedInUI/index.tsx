import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PlusIcon from "@/icons/PlusIcon";
import { FC } from "react";
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

          <form className="grid gap-4 pt-2">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="prompt">Your message</Label>
              <Textarea placeholder="Type your prompt here" id="prompt" />
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="tags">Tags</Label>

              <Input
                required
                id="tags"
                placeholder="life, history, career"
                className="col-span-3"
              />
            </div>

            <DialogFooter>
              <Button type="submit">Post</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoggedInUI;
