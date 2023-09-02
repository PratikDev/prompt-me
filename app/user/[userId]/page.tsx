import ContentSection from "@/components/ContentSection";
import BackButton from "@/components/helpers/BackButton";
import { FC } from "react";

const page: FC<{ params: { userId: string } }> = ({ params: { userId } }) => {
  return (
    <>
      <BackButton />

      <div className="pt-16 pl-10">
        <ContentSection createdBy={userId} />
      </div>
    </>
  );
};

export default page;
