import { Models } from "appwrite";
import { FC } from "react";
import { Card } from "./Card";

const ContentSection: FC<{
  posts?: Models.DocumentList<Models.Document> | null;
}> = async ({ posts }) => {
  if (!posts) {
    return (
      <h2 className="text-2xl text-center text-gray-400 dark:text-gray-700 font-extralight">
        Nothing to show. Time for you to take the space...
      </h2>
    );
  }

  return (
    <>
      <section style={{ columnWidth: 320 }} className={`columns-4 gap-x-3`}>
        {posts?.documents?.map(
          ({ userName, prompt, tags, createdBy, $createdAt }, index) => {
            const postedAt = new Date($createdAt).toDateString();

            return (
              <Card
                key={index}
                user={userName}
                prompt={prompt}
                tags={tags}
                postedAt={postedAt}
                createdBy={createdBy}
              />
            );
          }
        )}
      </section>
    </>
  );
};

export default ContentSection;
