import { FC } from "react";

async function getUser() {
  try {
    const { getCurrentUser } = await import("@/AppwriteServices/server");
    const currentUser = await getCurrentUser();
    if (currentUser) return currentUser;
  } catch (error) {}

  return false;
}

const SessionHandle: FC = async () => {
  let HandleUI = <></>;

  try {
    const currentUser = await getUser();
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
