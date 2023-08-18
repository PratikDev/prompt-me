import { FC } from "react";
import { Card } from "./Card";

const ContentSection: FC<{ createdBy?: string }> = async ({ createdBy }) => {
  const { Query } = await import("appwrite");
  const { database } = await import("@/AppwriteServices");
  const { Database_ID, Prompt_Collection_ID } = await import(
    "@/AppwriteServices/IDs"
  );

  const query = createdBy ? [Query.equal("createdBy", createdBy)] : undefined;
  const posts = await database.listDocuments(
    Database_ID,
    Prompt_Collection_ID,
    query
  );

  return (
    <>
      <section style={{ columnWidth: 320 }} className={`columns-4 gap-x-3`}>
        {posts.documents.map(
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
