import { postedAt, prompt, tags, username } from "@/test-data/faker-data";
import Image from "next/image";
import Link from "next/link";

const Card = function ({
  prompt,
  user,
  tags,
  postedAt,
}: {
  prompt: string;
  user: string;
  postedAt: string;
  tags: string[];
}) {
  return (
    <div className="w-full mb-3 mx-auto border p-3 rounded-md break-inside-avoid shadow-sm">
      <div className="flex space-x-4">
        <Image
          className={`w-12 h-12 rounded-full`}
          src={`https://picsum.photos/200`}
          width={50}
          height={50}
          alt={user}
        />

        <div className="space-y-1">
          <Link href={`/`}>
            <h4 className="text-sm font-semibold">@{user}</h4>
          </Link>

          <p className="text-sm text-slate-800 dark:text-slate-400">{prompt}</p>

          <div className="flex items-center pt-2">
            <span className="text-xs text-muted-foreground">
              Posted {postedAt}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center flex-wrap gap-x-2 gap-y-1.5 text-sm">
        {tags.map((tag, index) => (
          <Link
            key={index}
            href={`/`}
            className={`bg-gray-200 dark:bg-gray-800 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 rounded-sm px-2 hover:underline`}
          >
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <main className="px-6 md:px-16 flex flex-col items-center gap-8 xs:gap-16">
        <div className="mt-8 xs:mt-12 text-4xl xs:text-5xl md:text-7xl font-extrabold text-center">
          <h1 className="text-stone-800 dark:text-gray-100">
            Explore and Share
          </h1>

          <h1
            style={{ WebkitTextFillColor: `transparent` }}
            className="mt-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text"
          >
            AI-Enhanced Prompts
          </h1>
        </div>

        <input
          type="text"
          className={`w-full
          md:w-4/5
          border
          border-gray-300
          focus:border-gray-400
          dark:border-gray-600
          dark:focus:border-gray-500
          outline-none
          rounded-md
          py-3
          px-5
          dark:bg-gray-900/50
          hover:bg-slate-50
          dark:hover:bg-gray-900
          focus:bg-slate-50
          dark:focus:bg-gray-900
          transition
          duration-150
          ease-in-out
          shadow-md
          placeholder:font-light`}
          placeholder="Search for any prompt or tag..."
        />

        <section
          style={{ columnWidth: 320 }}
          className={`columns-4 gap-x-3 mb-8`}
        >
          {Array.from({ length: 20 }).map((_, index) => (
            <Card
              key={index}
              user={username()}
              prompt={prompt()}
              tags={tags()}
              postedAt={postedAt()}
            />
          ))}
        </section>
      </main>
    </>
  );
}
