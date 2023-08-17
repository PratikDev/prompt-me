import { Models } from "appwrite";
import { FC } from "react";
import CreatePostDialogComponent from "./CreatePostDialogComponent";
import ProfileHandle from "./ProfileHandle";

interface LoggedInUIProps {
  currentUser: Models.User<Models.Preferences>;
}
const LoggedInUI: FC<LoggedInUIProps> = async ({ currentUser }) => {
  return (
    <>
      <ProfileHandle />

      <CreatePostDialogComponent
        userId={currentUser.$id}
        userEmail={currentUser.email}
        userName={currentUser.name}
      />
    </>
  );
};

export default LoggedInUI;
