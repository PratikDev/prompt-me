import { AppwriteServices } from "@/AppwriteServices";
import { Prompt_Collection_ID } from "@/AppwriteServices/IDs";
import ContentSection from "@/components/ContentSection";
import BackButton from "@/components/helpers/BackButton";
import { Query } from "appwrite";
import { FC } from "react";

const appwriteServices = new AppwriteServices();

const page: FC<{ params: { userId: string } }> = async ({
  params: { userId },
}) => {
  const query = [Query.equal("createdBy", userId)];

  const posts = await appwriteServices.getDocuments({
    Collection_ID: Prompt_Collection_ID,
    query,
  });

  return (
    <>
      <BackButton />

      <div className="pt-16 pl-10">
        <ContentSection posts={posts} />
      </div>
    </>
  );
};

export default page;
