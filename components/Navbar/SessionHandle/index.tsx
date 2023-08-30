import { FC } from "react";

const SessionHandle: FC = async () => {
  let HandleUI = <></>;

  try {
    const { AppwriteServices } = await import("@/AppwriteServices");
    const appwriteServices = new AppwriteServices();
    const currentUser = await appwriteServices.getCurrentUser();
    // const currentUser = true;

    if (currentUser) {
      const { default: LoggedInUI } = await import("./LoggedInUI");
      HandleUI = <LoggedInUI currentUser={currentUser} />;
    } else {
      const { default: NotLoggedInUI } = await import("./NotLoggedInUI");
      HandleUI = <NotLoggedInUI />;
    }
  } catch (error) {
    console.error(error);
  }

  return HandleUI;
};

export default SessionHandle;
