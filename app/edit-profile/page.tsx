import { AppwriteServices } from "@/AppwriteServices";
import Form from "@/components/EditProfile/Form";
import BackButton from "@/components/helpers/BackButton";
import { Models } from "appwrite";
import { FC } from "react";

const appwriteServices = new AppwriteServices();
const page: FC = async () => {
  const user =
    (await appwriteServices.getCurrentUser()) as Models.User<Models.Preferences>;

  return (
    <section>
      <BackButton />

      <Form user={user} />
    </section>
  );
};

export default page;
