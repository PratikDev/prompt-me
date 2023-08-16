import { FC } from "react";

const SessionHandle: FC = async () => {
  let HandleUI = <></>;

  try {
    const { getCurrentUser } = await import("@/AppwriteServices/server");
    const currentUser = await getCurrentUser();
    // const currentUser = true;

    if (currentUser) {
      const { default: LoggedInUI } = await import("./LoggedInUI");
      HandleUI = <LoggedInUI />;
    } else {
      const { default: NotLoggedInUI } = await import("./NotLoggedInUI");
      HandleUI = <NotLoggedInUI />;
    }
  } catch (error) {}

  return HandleUI;
};

export default SessionHandle;
