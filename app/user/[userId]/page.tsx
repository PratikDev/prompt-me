import ContentSection from "@/components/ContentSection";
import { FC } from "react";

const page: FC<{ params: { userId: string } }> = ({ params: { userId } }) => {
  return (
    <>
      <ContentSection createdBy={userId} />
    </>
  );
};

export default page;
