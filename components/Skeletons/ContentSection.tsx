import { FC } from "react";
import CardSkeleton from "./Card";

const ContentSectionSkeleton: FC = () => {
  const skeletonLength = 16;

  return (
    <>
      <section style={{ columnWidth: 320 }} className={`columns-4 gap-x-3`}>
        {Array.from({ length: skeletonLength }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </section>
    </>
  );
};

export default ContentSectionSkeleton;
