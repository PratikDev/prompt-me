import { getCurrentUser } from "@/AppwriteServices/server";
import Form from "@/components/EditProfile/Form";
import BackButton from "@/components/helpers/BackButton";
import { FC } from "react";

const page: FC = async () => {
  const user = await getCurrentUser();

  return (
    <section>
      <BackButton />

      <Form user={user} />
    </section>
  );
};

export default page;
