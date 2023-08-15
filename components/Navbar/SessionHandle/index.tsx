import { FC } from "react";

const SessionHandle: FC = async () => {
  const { default: NotLoggedInUI } = await import("./NotLoggedInUI");
  let HandleUI = <NotLoggedInUI />;

  try {
    const { getCurrentUser } = await import("@/appwrite/appwrite.config");
    const currentUser = await getCurrentUser();

    if (currentUser) {
      const { default: LoggedInUI } = await import("./LoggedInUI");
      HandleUI = <LoggedInUI />;
    }
  } catch (error) {
    console.log(error);
  }

  return HandleUI;
};

export default SessionHandle;
